'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import SectionWrapper from '@/components/shared/SectionWrapper';
import Button from '@/components/shared/Button';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { t } = useTranslation();
  const { state, removeItem, updateQuantity, subtotal, iva, total } = useCart();
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
  };

  const getItemTitle = (item: any) => {
    if (item.custom) return t('solutions.customProductPage.title');
    return t(item.titleKey);
  };

  const handleApplyCoupon = () => {
    toast.error(t('cart.couponInvalid'), { duration: 5000 });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Banner oscuro superior */}
        <div className="bg-gray-900 pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center">
            <h1 className="font-rubik text-4xl md:text-5xl font-bold text-white">{t('cart.title')}</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-16 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
            </div>
            <h2 className="font-rubik text-2xl font-bold text-text-primary mb-4">{t('cart.empty')}</h2>
            <p className="font-inter text-text-secondary mb-8">{t('cart.emptyDesc')}</p>
            <Button href="/soluciones" variant="primary">{t('cart.continueShopping')}</Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner oscuro superior */}
      <div className="bg-gray-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="font-rubik text-4xl md:text-5xl font-bold text-white text-center">{t('cart.title')}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {state.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex-grow">
                    <h3 className="font-rubik font-semibold text-text-primary">{getItemTitle(item)}</h3>
                    <p className="font-inter text-sm text-text-secondary mt-1">{formatPrice(item.price)} {t('cart.each')}</p>
                    {item.custom && item.quoteNumber && (
                      <p className="font-inter text-xs text-text-secondary mt-1">{t('cart.quoteNumber')}: {item.quoteNumber}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-white transition-colors font-bold">−</button>
                      <span className="w-10 h-8 flex items-center justify-center font-inter text-sm border-x border-gray-200">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-white transition-colors font-bold">+</button>
                    </div>
                    <span className="font-rubik font-bold text-primary min-w-[100px] text-right">{formatPrice(item.price * item.quantity)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors p-2" title={t('cart.remove')}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-xl shadow-md p-6">
              <h2 className="font-rubik font-semibold text-lg text-text-primary mb-6">{t('cart.totals')}</h2>
              <div className="mb-6">
                <button onClick={() => setShowCoupon(!showCoupon)} className="font-inter text-sm text-primary hover:text-primary-dark transition-colors">{t('cart.coupon')}</button>
                <AnimatePresence>
                  {showCoupon && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-3 flex gap-2">
                        <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder={t('cart.couponCode')} className="flex-grow px-3 py-2 border border-gray-200 rounded-lg text-sm" />
                        <button onClick={handleApplyCoupon} className="bg-primary text-white px-4 py-2 text-sm font-rubik rounded-lg">{t('cart.couponApply')}</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="space-y-3 py-4 border-t border-gray-100">
                <div className="flex justify-between font-inter text-text-secondary"><span>{t('cart.subtotal')}</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between font-inter text-text-secondary"><span>{t('cart.iva')}</span><span>{formatPrice(iva)}</span></div>
                <div className="flex justify-between font-rubik font-bold text-lg text-primary pt-3 border-t border-gray-100"><span>{t('cart.estimatedTotal')}</span><span>{formatPrice(total)} <span className="text-sm text-text-secondary">MXN</span></span></div>
              </div>
              <Button href="/pago" variant="primary" size="lg" className="w-full mt-6">{t('cart.checkout')}</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
