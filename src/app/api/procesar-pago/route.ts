import { NextResponse } from 'next/server';

const API_URL = process.env.ETOMIN_BASE_URL || 'https://api.etomin.com/v1';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      nombreTarjeta, 
      numeroTarjeta, 
      fechaTarjeta, 
      cvv, 
      monto, 
      nombre, 
      apellidos, 
      email, 
      direccion, 
      poblacion, 
      region, 
      codigoPostal, 
      telefono 
    } = body;

    const etominUser = process.env.ETOMIN_USER;
    const etominPassword = process.env.ETOMIN_PASSWORD;

    console.log('🔑 Etomin:', { 
      email: etominUser ? '✅' : '❌', 
      password: etominPassword ? '✅' : '❌' 
    });

    if (!etominUser || !etominPassword) {
      return NextResponse.json(
        { success: false, message: 'Configuración de pago incompleta' }, 
        { status: 500 }
      );
    }

    const amount = Number(monto);
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, message: 'Monto inválido' }, 
        { status: 400 }
      );
    }

    // 1. Autenticación con Etomin
    console.log('🔐 Autenticando con Etomin...');
    
    const authResponse = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: etominUser,
        password: etominPassword
      })
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      console.error('❌ Error de autenticación:', authResponse.status, errorText);
      return NextResponse.json(
        { success: false, message: 'Error de autenticación con Etomin' }, 
        { status: 500 }
      );
    }

    const authData = await authResponse.json();
    const authToken = authData.authToken;
    
    if (!authToken) {
      console.error('❌ No se recibió token');
      return NextResponse.json(
        { success: false, message: 'Token no recibido' }, 
        { status: 500 }
      );
    }

    console.log('✅ Autenticado');

    // 2. Tokenización de tarjeta
    const [month, year] = fechaTarjeta.split('/');
    console.log('💳 Tokenizando tarjeta...');
    
    const tokenResponse = await fetch(`${API_URL}/card/tokenizer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        cardData: {
          cardNumber: numeroTarjeta.replace(/\s/g, ''),
          cardholderName: nombreTarjeta,
          expirationYear: '20' + year,
          expirationMonth: month
        }
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('❌ Error tokenización:', tokenResponse.status, errorText);
      return NextResponse.json(
        { success: false, message: 'Error al tokenizar la tarjeta' }, 
        { status: 400 }
      );
    }

    const tokenData = await tokenResponse.json();
    const cardToken = tokenData.cardNumberToken;
    
    if (!cardToken) {
      return NextResponse.json(
        { success: false, message: 'No se pudo tokenizar la tarjeta' }, 
        { status: 400 }
      );
    }

    console.log('✅ Tarjeta tokenizada');

    // 3. Procesar venta
    const orderId = 'TXN-' + Date.now();
    console.log('💰 Procesando venta con Etomin...');
    
    const saleResponse = await fetch(`${API_URL}/sale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        amount: amount,
        currency: "484",
        reference: orderId,
        customerInformation: {
          firstName: (nombre || 'Cliente').trim(),
          lastName: (apellidos || 'TecnoRED').trim(),
          middleName: "",
          email: (email || 'cliente@tecnoredmx.com.mx').trim(),
          phone1: (telefono || '5555555555').trim(),
          city: (poblacion || 'Ciudad de México').trim(),
          address1: (direccion || 'Sin dirección').trim(),
          address2: "",
          postalCode: (codigoPostal || '06500').trim(),
          state: (region || 'Ciudad de México').trim(),
          country: "México",
          ip: request.headers.get('x-forwarded-for') || '127.0.0.1',
        },
        cardData: { 
          cardNumberToken: cardToken, 
          cvv: cvv 
        },
      })
    });

    const saleData = await saleResponse.json();
    console.log('✅ Venta:', JSON.stringify(saleData).substring(0, 200));

    // 4. Verificar respuesta
    if (saleData.status === "APPROVED") {
      return NextResponse.json({ 
        success: true, 
        transactionId: saleData.orderId || saleData.reference || orderId, 
        reference: saleData.reference || orderId, 
        status: saleData.status, 
        message: 'Pago aprobado' 
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          status: saleData.status, 
          message: saleData.responseMessage || saleData.message || 'Pago rechazado' 
        }, 
        { status: 400 }
      );
    }

  } catch (error: any) {
    console.error('❌ Error general Etomin:', error);
    return NextResponse.json(
      { success: false, message: 'Error procesando el pago' }, 
      { status: 500 }
    );
  }
}
