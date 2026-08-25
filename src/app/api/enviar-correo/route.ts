import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, name, company, email, phone, message, type, orderData, language } = body;
    const resend = new Resend(process.env.RESEND_API_KEY);
    const isEnglish = language === 'en';

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminEmail2 = process.env.ADMIN_EMAIL_2;
    const redirectionEmail = process.env.REDIRECTION_EMAIL;

    const adminRecipients: string[] = [adminEmail, adminEmail2]
      .filter((email): email is string => Boolean(email))
      .filter((email, index, arr) => arr.indexOf(email) === index);

    const ccRecipients: string[] = [redirectionEmail]
      .filter((email): email is string => Boolean(email))
      .filter((email, index, arr) => arr.indexOf(email) === index);

    console.log('📧 Configuración de correo:');
    console.log('  • Destinatarios admin:', adminRecipients);
    console.log('  • CC (redirección):', ccRecipients);

    if (type === 'contact') {
      const contactHTML = `
        <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#C80000,#8B0000);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? '📨 New Contact Message' : '📨 Nuevo mensaje de contacto'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p><strong>${isEnglish ? 'Name:' : 'Nombre:'}</strong> ${name}</p>
            <p><strong>${isEnglish ? 'Company:' : 'Compañía:'}</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>${isEnglish ? 'Phone:' : 'Teléfono:'}</strong> ${phone}</p>
            <p><strong>${isEnglish ? 'Message:' : 'Mensaje:'}</strong></p>
            <p style="background:#f1f5f9;padding:15px;border-radius:8px;">${message}</p>
          </div>
        </div>`;

      if (adminRecipients.length > 0) {
        for (const recipient of adminRecipients) {
          try {
            const result = await resend.emails.send({
              from: process.env.EMAIL_FROM || 'gestion@tecnoredmx.com.mx',
              to: recipient,
              cc: ccRecipients.length > 0 ? ccRecipients : undefined,
              subject: isEnglish ? '[FWD] New Contact Message - TecnoRED' : '[FWD] Nuevo mensaje de contacto - TecnoRED',
              html: contactHTML,
            });
            console.log(`✅ Forward enviado a ${recipient} (CC: ${ccRecipients.join(', ') || 'N/A'})`);
          } catch (forwardError: any) {
            console.error(`❌ Error forward a ${recipient}:`, forwardError.message);
          }
        }
      }

      const clientHTML = `
        <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#C80000,#8B0000);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? '✅ Message Received' : '✅ Mensaje recibido'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p>${isEnglish ? `Hello <strong>${name}</strong>,` : `Hola <strong>${name}</strong>,`}</p>
            <p>${isEnglish ? 'We have received your message and will contact you soon.' : 'Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.'}</p>
            <p style="color:#6B7280;">TecnoRED - tecnoredmx.com.mx</p>
          </div>
        </div>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'gestion@tecnoredmx.com.mx',
        to: to,
        subject: isEnglish ? 'Message Received - TecnoRED' : 'Mensaje recibido - TecnoRED',
        html: clientHTML,
      });

      return NextResponse.json({ success: true });
    }

    if (orderData) {
      const productosHTML = orderData.productos
        .map((p: any) => `<tr><td style="padding:8px;border-bottom:1px solid rgba(200,0,0,0.2);color:#1F2937;">${p.nombre} × ${p.cantidad}</td><td style="padding:8px;border-bottom:1px solid rgba(200,0,0,0.2);text-align:right;color:#C80000;">$${p.precio.toFixed(2)}</td></tr>`)
        .join('');

      const emailHTML = `
        <div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background-color:#f8fafc;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#C80000,#8B0000);padding:30px;text-align:center;">
            <h1 style="color:#f8fafc;margin:0;font-size:24px;">${isEnglish ? '✅ Purchase Confirmed!' : '✅ ¡Compra confirmada!'}</h1>
          </div>
          <div style="padding:30px;color:#1F2937;">
            <p>${isEnglish ? `Hello <strong>${orderData.nombre}</strong>,` : `Hola <strong>${orderData.nombre}</strong>,`}</p>
            <p>${isEnglish ? 'Your order has been processed successfully.' : 'Tu pedido ha sido procesado correctamente.'}</p>
            <h2 style="color:#1F2937;font-size:18px;border-bottom:2px solid #C80000;padding-bottom:8px;">${isEnglish ? 'Order Summary' : 'Resumen de tu pedido'}</h2>
            <table style="width:100%;border-collapse:collapse;">${productosHTML}</table>
            <div style="margin-top:20px;padding:20px;background:#FEE2E2;border-radius:8px;">
              <p><strong>${isEnglish ? 'Subtotal:' : 'Subtotal:'}</strong> <span style="color:#C80000;">$${orderData.subtotal.toFixed(2)}</span></p>
              <p><strong>${isEnglish ? 'Tax (16%):' : 'IVA (16%):'}</strong> <span style="color:#C80000;">$${orderData.impuesto.toFixed(2)}</span></p>
              <p style="font-size:18px;"><strong>${isEnglish ? 'Total:' : 'Total:'}</strong> <span style="color:#C80000;">$${orderData.total.toFixed(2)} MXN</span></p>
            </div>
            <p style="color:#6B7280;"><strong>${isEnglish ? 'Transaction:' : 'Transacción:'}</strong> ${orderData.transactionId}</p>
            <p>${isEnglish ? 'Thank you for your purchase at' : 'Gracias por tu compra en'} <strong style="color:#C80000;">TecnoRED</strong>.</p>
          </div>
        </div>`;

      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'gestion@tecnoredmx.com.mx',
        to: to,
        subject: isEnglish ? 'Purchase Confirmed! - TecnoRED' : '¡Compra confirmada! - TecnoRED',
        html: emailHTML,
      });

      if (adminRecipients.length > 0) {
        for (const recipient of adminRecipients) {
          try {
            await resend.emails.send({
              from: process.env.EMAIL_FROM || 'gestion@tecnoredmx.com.mx',
              to: recipient,
              cc: ccRecipients.length > 0 ? ccRecipients : undefined,
              subject: isEnglish ? `[FWD] New Purchase - ${orderData.nombre}` : `[FWD] Nueva compra - ${orderData.nombre}`,
              html: `<div style="font-family:'Inter',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border-radius:12px;overflow:hidden;"><div style="background:#C80000;padding:20px;"><h2 style="color:#f8fafc;margin:0;">${isEnglish ? '📦 New Purchase' : '📦 Nueva compra'}</h2></div><div style="padding:20px;"><p><strong>${isEnglish ? 'Customer:' : 'Cliente:'}</strong> ${orderData.nombre}</p><p><strong>Total:</strong> <span style="color:#C80000;">$${orderData.total.toFixed(2)} MXN</span></p></div>${emailHTML}</div>`,
            });
            console.log(`✅ Forward compra a ${recipient}`);
          } catch (forwardError: any) {
            console.error(`❌ Error forward a ${recipient}:`, forwardError.message);
          }
        }
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ Error general:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
