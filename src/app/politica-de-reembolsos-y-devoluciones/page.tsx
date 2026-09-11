'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function PoliticaReembolsosPage() {
  const { t } = useTranslation();

  const getArray = (key: string): string[] => {
    return t(key, { returnObjects: true }) as unknown as string[];
  };

  const renderList = (items: string[]) => (
    <ul className="space-y-2 pl-5 list-disc">
      {items.map((item, index) => (
        <li key={index} className="font-inter text-text-secondary leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner oscuro superior */}
      <div className="bg-gray-900 pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="font-rubik text-4xl md:text-5xl font-bold text-white text-center">
            {t('refund.title')}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Información de contacto */}
          <div className="space-y-3 mb-8 p-6 bg-white rounded-xl shadow-md">
            <p className="font-inter text-text-primary font-semibold">{t('refund.company')}</p>
            <p className="font-inter text-text-primary">{t('refund.website')}</p>
            <p className="font-inter text-text-primary">{t('refund.email')}</p>
            <p className="font-inter text-text-primary">{t('refund.address')}</p>
          </div>

          <div className="space-y-4 mb-8">
            <p className="font-inter text-text-secondary leading-relaxed">{t('refund.intro1')}</p>
            <p className="font-inter text-text-secondary leading-relaxed">{t('refund.intro2')}</p>
          </div>

          {/* Section 1 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('refund.section1.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('refund.section1.content')}</p>
            {renderList(getArray('refund.section1.items'))}
          </section>

          {/* Section 2 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('refund.section2.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('refund.section2.content')}</p>
            {renderList(getArray('refund.section2.items'))}
            <p className="font-inter text-text-secondary leading-relaxed mt-3 font-semibold">{t('refund.section2.footer')}</p>
          </section>

          {/* Section 3 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('refund.section3.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed">{t('refund.section3.content')}</p>
          </section>

          {/* Section 4 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('refund.section4.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('refund.section4.content')}</p>
            {renderList(getArray('refund.section4.items'))}
          </section>

          {/* Section 5 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('refund.section5.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('refund.section5.content')}</p>
            {renderList(getArray('refund.section5.items'))}
            <p className="font-inter text-text-secondary leading-relaxed mt-3">{t('refund.section5.footer')}</p>
          </section>

          {/* Section 6 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('refund.section6.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('refund.section6.content')}</p>
            {renderList(getArray('refund.section6.items'))}
          </section>

          {/* Section 7 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('refund.section7.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed">{t('refund.section7.content')}</p>
          </section>

          {/* Section 8 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('refund.section8.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed">{t('refund.section8.content')}</p>
          </section>

          {/* Section 9 */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('refund.section9.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed">{t('refund.section9.content')}</p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}