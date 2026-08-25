'use client';

import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/shared/Button';
import SectionWrapper from '@/components/shared/SectionWrapper';

function PagoExitosoContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'N/A';
  const amount = searchParams.get('amount') || '0';

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(price));
  };

  return (
    <div className="min-h-screen pt-32 pb-16 bg-gradient-to-br from-gray-900 to-footer">
      <div className="relative z-10">
        <SectionWrapper>
          <div className="section-padding">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="max-w-2xl mx-auto text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.3, type: 'spring', stiffness: 200 }} className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h1 className="font-rubik text-3xl md:text-4xl font-bold text-white mb-4">{t('success.title')}</h1>
              <p className="font-inter text-lg text-gray-300 mb-8">{t('success.subtitle')}</p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8 mb-8 text-left">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-inter text-gray-300">{t('success.orderNumber')}</span>
                    <span className="font-rubik font-bold text-primary">{orderId}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="font-inter text-gray-300">{t('success.amount')}</span>
                    <span className="font-rubik font-bold text-white text-xl">{formatPrice(amount)} <span className="text-sm font-normal text-gray-300">MXN</span></span>
                  </div>
                </div>
              </motion.div>
              <p className="font-inter text-gray-300 mb-8">{t('success.email')} <strong className="text-primary">tecnoredmx.com.mx</strong></p>
              <Button href="/" variant="primary" size="lg">{t('success.continue')}</Button>
            </motion.div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}

export default function PagoExitosoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    }>
      <PagoExitosoContent />
    </Suspense>
  );
}
