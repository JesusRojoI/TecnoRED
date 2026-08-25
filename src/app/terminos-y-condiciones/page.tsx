'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';

export default function TerminosCondicionesPage() {
  const { t } = useTranslation();
  return (
    <SectionWrapper className="pt-32 pb-16 min-h-screen bg-gray-50">
      <div className="section-padding text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">📄</div>
          <h1 className="font-rubik text-3xl font-bold text-text-primary mb-4">{t('legal.comingSoon')}</h1>
          <p className="font-inter text-lg text-text-secondary">{t('legal.description')}</p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
