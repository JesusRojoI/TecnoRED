'use client';

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function AvisoPrivacidadPage() {
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
            {t('privacyPolicy.title')}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Section I */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section1.title')}</h2>
            {renderList(getArray('privacyPolicy.section1.items'))}
          </section>

          {/* Section II */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section2.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section2.intro')}</p>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('privacyPolicy.section2.transparencyTitle')}</h3>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section2.transparency')}</p>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('privacyPolicy.section2.controlTitle')}</h3>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section2.control')}</p>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('privacyPolicy.section2.minimizationTitle')}</h3>
            <p className="font-inter text-text-secondary leading-relaxed">{t('privacyPolicy.section2.minimization')}</p>
          </section>

          {/* Section III */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section3.title')}</h2>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('privacyPolicy.section3.contactTitle')}</h3>
            {renderList(getArray('privacyPolicy.section3.contactItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('privacyPolicy.section3.projectTitle')}</h3>
            {renderList(getArray('privacyPolicy.section3.projectItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('privacyPolicy.section3.technicalTitle')}</h3>
            {renderList(getArray('privacyPolicy.section3.technicalItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('privacyPolicy.section3.commercialTitle')}</h3>
            {renderList(getArray('privacyPolicy.section3.commercialItems'))}
          </section>

          {/* Section IV */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section4.title')}</h2>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('privacyPolicy.section4.serviceTitle')}</h3>
            {renderList(getArray('privacyPolicy.section4.serviceItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('privacyPolicy.section4.managementTitle')}</h3>
            {renderList(getArray('privacyPolicy.section4.managementItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('privacyPolicy.section4.improvementTitle')}</h3>
            {renderList(getArray('privacyPolicy.section4.improvementItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('privacyPolicy.section4.legalTitle')}</h3>
            {renderList(getArray('privacyPolicy.section4.legalItems'))}
          </section>

          {/* Section V */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section5.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section5.intro')}</p>
            {renderList(getArray('privacyPolicy.section5.items'))}
          </section>

          {/* Section VI */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section6.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section6.content')}</p>
            {renderList(getArray('privacyPolicy.section6.items'))}
          </section>

          {/* Section VII */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section7.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section7.intro')}</p>
            <h3 className="font-rubik font-semibold text-text-primary mb-2">{t('privacyPolicy.section7.technicalTitle')}</h3>
            {renderList(getArray('privacyPolicy.section7.technicalItems'))}
            <h3 className="font-rubik font-semibold text-text-primary mb-2 mt-4">{t('privacyPolicy.section7.organizationalTitle')}</h3>
            {renderList(getArray('privacyPolicy.section7.organizationalItems'))}
          </section>

          {/* Section VIII */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section8.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section8.intro')}</p>
            {renderList(getArray('privacyPolicy.section8.items'))}
            <p className="font-inter text-text-secondary leading-relaxed mt-3">{t('privacyPolicy.section8.footer')}</p>
          </section>

          {/* Section IX */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section9.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section9.intro')}</p>
            {renderList(getArray('privacyPolicy.section9.items'))}
          </section>

          {/* Section X */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section10.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section10.intro')}</p>
            <p className="font-inter text-text-primary font-semibold mb-3">{t('privacyPolicy.section10.send')}</p>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section10.include')}</p>
            {renderList(getArray('privacyPolicy.section10.items'))}
            <p className="font-inter text-text-secondary leading-relaxed mt-3 font-semibold">{t('privacyPolicy.section10.footer')}</p>
          </section>

          {/* Section XI */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section11.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section11.intro')}</p>
            {renderList(getArray('privacyPolicy.section11.items'))}
            <p className="font-inter text-text-secondary leading-relaxed mt-3">{t('privacyPolicy.section11.footer')}</p>
          </section>

          {/* Section XII */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section12.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed">{t('privacyPolicy.section12.content')}</p>
          </section>

          {/* Section XIII */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section13.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section13.intro')}</p>
            {renderList(getArray('privacyPolicy.section13.items'))}
            <p className="font-inter text-text-secondary leading-relaxed mt-3">{t('privacyPolicy.section13.footer')}</p>
          </section>

          {/* Section XIV */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section14.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section14.intro')}</p>
            <p className="font-inter text-text-primary font-semibold">{t('privacyPolicy.section14.website')}</p>
          </section>

          {/* Section XV */}
          <section className="mb-8">
            <h2 className="font-rubik text-xl font-bold text-primary mb-3">{t('privacyPolicy.section15.title')}</h2>
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.section15.intro')}</p>
            {renderList(getArray('privacyPolicy.section15.items'))}
          </section>

          <div className="border-t border-gray-200 pt-6 mt-8">
            <p className="font-inter text-text-secondary leading-relaxed mb-3">{t('privacyPolicy.footer1')}</p>
            <p className="font-inter text-text-secondary font-semibold">{t('privacyPolicy.footer2')}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}