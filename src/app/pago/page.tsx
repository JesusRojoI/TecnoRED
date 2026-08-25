'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/shared/Button';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { countries, mexicanStates } from '@/data/countries';

export default function PagoPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { state, subtotal, iva, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingData, setBillingData] = useState({
    name: '', lastname: '', country: 'MX', address: '', address2: '', city: '', state: 'CDMX', zip: '', phone: '', email: '', notes: '',
  });
  const [cardData, setCardData] = useState({ cardName: '', cardNumber: '', expiry: '', cvc: '' });

  if (state.items.length === 0) {
    router.push('/cart');
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
  };

  const getItemTitle = (item: any) => {
    if (item.custom) return t('solutions.customProductPage.title');
    return t(item.titleKey);
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    const groups = cleaned.match(/.{1,4}/g);
    return groups ? groups.join(' ') : cleaned;
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length > 2) return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!billingData.name || !billingData.lastname || !billingData.email || !cardData.cardName || !cardData.cardNumber) {
      toast.error(t('payment.validation.nameRequired'), { duration: 5000 });
      setIsProcessing(false);
      return;
    }

    try {
      const response = await fetch('/api/procesar-pago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombreTarjeta: cardData.cardName,
          numeroTarjeta: cardData.cardNumber,
          fechaTarjeta: cardData.expiry,
          cvv: cardData.cvc,
          monto: total,
          nombre: billingData.name,
          apellidos: billingData.lastname,
          email: billingData.email,
          direccion: billingData.address,
          poblacion: billingData.city,
          region: billingData.state,
          codigoPostal: billingData.zip,
          telefono: billingData.phone,
          notas: billingData.notes,
        }),
      });

      const result = await response.json();

      if (result.success) {
        try {
          await fetch('/api/enviar-correo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: billingData.email,
              orderData: {
                nombre: `${billingData.name} ${billingData.lastname}`,
                productos: state.items.map(item => ({ nombre: getItemTitle(item), cantidad: item.quantity, precio: item.price })),
                subtotal, descuento: 0, impuesto: iva, total,
                transactionId: result.transactionId,
                cupon: '',
              },
              language: i18n.language,
            }),
          });
        } catch (emailError) {
          console.error('Error enviando correo:', emailError);
        }

        clearCart();
        toast.success(t('payment.success'), { duration: 5000 });
        setTimeout(() => {
          router.push(`/pago-exitoso?orderId=${result.transactionId}&amount=${total}`);
        }, 1000);
      } else {
        toast.error(result.message || t('payment.error'), { duration: 5000 });
        setIsProcessing(false);
      }
    } catch (error) {
      toast.error(t('payment.error'), { duration: 5000 });
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner oscuro superior */}
      <div className="bg-gray-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="font-rubik text-4xl md:text-5xl font-bold text-white text-center">{t('payment.title')}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Forms */}
            <div className="lg:col-span-2 space-y-8">
              {/* Billing */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="font-rubik font-semibold text-xl text-text-primary mb-6">{t('payment.title')}</h2>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('payment.name')}</label>
                      <input type="text" required value={billingData.name} onChange={(e) => setBillingData({ ...billingData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('payment.lastname')}</label>
                      <input type="text" required value={billingData.lastname} onChange={(e) => setBillingData({ ...billingData, lastname: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('payment.country')}</label>
                    <select value={billingData.country} onChange={(e) => setBillingData({ ...billingData, country: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white">
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>{i18n.language === 'en' ? c.nameEn : c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('payment.address')}</label>
                    <input type="text" required value={billingData.address} onChange={(e) => setBillingData({ ...billingData, address: e.target.value })} placeholder={t('payment.addressPlaceholder')} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:outline-none" />
                  </div>
                  <input type="text" value={billingData.address2} onChange={(e) => setBillingData({ ...billingData, address2: e.target.value })} placeholder={t('payment.address2Placeholder')} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:outline-none" />
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('payment.city')}</label>
                    <input type="text" required value={billingData.city} onChange={(e) => setBillingData({ ...billingData, city: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('payment.state')}</label>
                    <select value={billingData.state} onChange={(e) => setBillingData({ ...billingData, state: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white">
                      {mexicanStates.map((s) => (
                        <option key={s.code} value={s.code}>{i18n.language === 'en' ? s.nameEn : s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('payment.zip')}</label>
                      <input type="text" required value={billingData.zip} onChange={(e) => setBillingData({ ...billingData, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })} className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('payment.phone')}</label>
                      <input type="tel" value={billingData.phone} onChange={(e) => setBillingData({ ...billingData, phone: e.target.value.replace(/\D/g, '') })} className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('payment.email')}</label>
                    <input type="email" required value={billingData.email} onChange={(e) => setBillingData({ ...billingData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('payment.notes')}</label>
                    <textarea rows={3} value={billingData.notes} onChange={(e) => setBillingData({ ...billingData, notes: e.target.value })} placeholder={t('payment.notesPlaceholder')} className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none" />
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-rubik font-semibold text-xl text-text-primary">{t('payment.cardTitle')}</h2>
                  <div className="flex items-center gap-3 px-4 py-2">
  <span className="font-inter text-xs text-text-secondary">{t('payment.securePayments')}</span>
  <div className="relative w-20 h-8">
    <Image src="/etomin_logo.svg" alt="Etomin" fill className="object-contain" />
  </div>
</div>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('payment.cardName')}</label>
                    <input type="text" required value={cardData.cardName} onChange={(e) => setCardData({ ...cardData, cardName: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('payment.cardNumber')}</label>
                    <input type="text" required value={cardData.cardNumber} onChange={(e) => setCardData({ ...cardData, cardNumber: formatCardNumber(e.target.value) })} placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('payment.cardExpiry')}</label>
                      <input type="text" required value={cardData.expiry} onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })} placeholder="MM/AA" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('payment.cardCvc')}</label>
                      <input type="password" required value={cardData.cvc} onChange={(e) => setCardData({ ...cardData, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} placeholder="•••" maxLength={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="font-rubik font-semibold text-lg text-text-primary mb-6">{t('payment.orderSummary')}</h2>
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-100">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div className="flex-grow">
                        <p className="font-inter text-sm font-medium text-text-primary">{getItemTitle(item)}</p>
                        <p className="font-inter text-xs text-text-secondary">× {item.quantity}</p>
                      </div>
                      <span className="font-inter text-sm text-text-primary ml-4">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-text-secondary"><span>{t('payment.subtotal')}</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between text-sm text-text-secondary"><span>{t('payment.iva')}</span><span>{formatPrice(iva)}</span></div>
                  <div className="flex justify-between font-rubik font-bold text-lg text-primary pt-3 border-t border-gray-100"><span>{t('payment.total')}</span><span>{formatPrice(total)} <span className="text-sm text-text-secondary">MXN</span></span></div>
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full mt-6" disabled={isProcessing}>
                  {isProcessing ? t('common.loading') : t('payment.submit')}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
