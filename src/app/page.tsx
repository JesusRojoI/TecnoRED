'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';
import Button from '@/components/shared/Button';

const ServiceIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    design: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    identity: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    content: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    dev: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    custom: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    maintenance: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
  };
  return icons[type] || icons.design;
};

export default function HomePage() {
  const { t } = useTranslation();

  const services = [
    { title: t('home.services.websiteDesign'), desc: t('home.services.websiteDesignDesc'), icon: 'design' },
    { title: t('home.services.styleGuide'), desc: t('home.services.styleGuideDesc'), icon: 'identity' },
    { title: t('home.services.contentStrategy'), desc: t('home.services.contentStrategyDesc'), icon: 'content' },
    { title: t('home.services.webDev'), desc: t('home.services.webDevDesc'), icon: 'dev' },
    { title: t('home.services.customCreation'), desc: t('home.services.customCreationDesc'), icon: 'custom' },
    { title: t('home.services.maintenance'), desc: t('home.services.maintenanceDesc'), icon: 'maintenance' },
  ];

  return (
    <>
      {/* ==================== HERO - SE MANTIENE IGUAL ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(200,0,0,0.3) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
          <Image src="/images/hero-image.jpg" alt="TecnoRED" fill className="object-cover" priority />
        </div>
        <div className="absolute -left-40 top-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-2xl" />

        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-32">
            <div className="max-w-xl">
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-rubik text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                {t('home.hero.title')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-inter text-xl text-gray-300 mb-10 leading-relaxed"
              >
                {t('home.hero.subtitle')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button href="/soluciones" variant="primary" size="lg">
                  {t('home.hero.cta')}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES - Mosaico tipo Windows mejorado ==================== */}
      <SectionWrapper className="py-20 bg-gray-100">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-rubik text-4xl md:text-5xl font-bold text-text-primary mb-4">{t('home.services.title')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          {/* Contenedor mosaico */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2 bg-gray-200 rounded-2xl shadow-2xl max-w-5xl mx-auto"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className={`group relative p-6 flex flex-col justify-between overflow-hidden cursor-pointer min-h-[180px] ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 min-h-[250px] bg-gradient-to-br from-primary to-primary-dark text-white' :
                  index === 1 ? 'bg-gray-900 text-white' :
                  index === 2 ? 'bg-white text-text-primary' :
                  index === 3 ? 'md:col-span-2 bg-gray-50 text-text-primary' :
                  index === 4 ? 'bg-primary text-white' :
                  'md:col-span-2 bg-white text-text-primary'
                }`}
              >
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                  index === 0 || index === 1 || index === 4 ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                }`}>
                  <ServiceIcon type={service.icon} />
                </div>
                <div>
                  <h3 className={`font-rubik font-semibold text-lg mb-2 ${service.title}`}>{service.title}</h3>
                  <p className={`font-inter text-sm leading-relaxed ${
                    index === 0 || index === 1 || index === 4 ? 'text-gray-100' : 'text-text-secondary'
                  }`}>{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ==================== ABOUT - Texto grande + imagen de fondo ==================== */}
<section className="relative py-32 overflow-hidden">
  {/* Imagen de fondo a todo lo ancho */}
  <div className="absolute inset-0">
    <Image src="/images/about-image.jpg" alt={t('home.about.title')} fill className="object-cover" />
    <div className="absolute inset-0 bg-gray-900/80" />
  </div>

  {/* Contenido */}
  <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 lg:px-16 text-center">
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="font-rubik text-5xl md:text-6xl font-bold text-white mb-8"
    >
      {t('home.about.title')}
    </motion.h2>
    <div className="w-24 h-1 bg-primary mx-auto mb-8" />
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="font-inter text-xl md:text-2xl text-gray-200 leading-relaxed"
    >
      {t('home.about.content')}
    </motion.p>
  </div>
</section>

{/* ==================== MISSION & VISION - Formal y simple ==================== */}
<section className="py-20 bg-white">
  <div className="max-w-4xl mx-auto px-4 md:px-8">
    <div className="space-y-12">
      {/* Misión */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="font-rubik text-2xl font-bold text-text-primary mb-4 inline-block border-b-2 border-primary pb-2">
          {t('home.mission.title')}
        </h3>
        <p className="font-inter text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
          {t('home.mission.content')}
        </p>
      </motion.div>

      {/* Separador */}
      <div className="flex items-center justify-center gap-4">
        <div className="h-px bg-gray-200 flex-grow max-w-[150px]" />
        <div className="w-3 h-3 bg-primary rotate-45" />
        <div className="h-px bg-gray-200 flex-grow max-w-[150px]" />
      </div>

      {/* Visión */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h3 className="font-rubik text-2xl font-bold text-text-primary mb-4 inline-block border-b-2 border-primary pb-2">
          {t('home.vision.title')}
        </h3>
        <p className="font-inter text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
          {t('home.vision.content')}
        </p>
      </motion.div>

      {/* Separador */}
      <div className="flex items-center justify-center gap-4">
        <div className="h-px bg-gray-200 flex-grow max-w-[150px]" />
        <div className="w-3 h-3 bg-primary rotate-45" />
        <div className="h-px bg-gray-200 flex-grow max-w-[150px]" />
      </div>

      {/* Valores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="font-rubik text-2xl font-bold text-text-primary mb-8 text-center inline-block border-b-2 border-primary pb-2">
          {t('home.values.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {[
            t('home.values.innovation'),
            t('home.values.commitment'),
            t('home.values.quality'),
            t('home.values.accessibility'),
            t('home.values.collaboration'),
            t('home.values.transparency'),
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="w-2 h-2 bg-primary mt-2 flex-shrink-0" />
              <p className="font-inter text-text-secondary leading-relaxed text-base">
                {value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* ==================== DISTINGUISH - Mejorado ==================== */}
      <SectionWrapper className="py-20 bg-gradient-to-b from-gray-100 to-white">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch shadow-2xl rounded-xl overflow-hidden max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative min-h-[350px]"
            >
              <Image src="/images/distinguish-image.jpg" alt={t('home.distinguish.title')} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900 p-10 flex flex-col justify-center"
            >
              <h2 className="font-rubik text-4xl font-bold text-white mb-6">{t('home.distinguish.title')}</h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="font-inter text-lg text-gray-300 leading-relaxed">{t('home.distinguish.content')}</p>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ==================== OBJECTIVE - Mejorado ==================== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/objective-image.jpg" alt={t('home.objective.title')} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-transparent" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '25px 25px' }} />
        </div>
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="max-w-lg"
            >
              <h2 className="font-rubik text-4xl md:text-5xl font-bold text-white mb-6">{t('home.objective.title')}</h2>
              <p className="font-inter text-xl text-white/90 mb-6 leading-relaxed">{t('home.objective.content')}</p>
              <p className="font-inter text-base text-white/70 italic border-l-4 border-white pl-4">{t('home.objective.subtitle')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CTA - Mejorado ==================== */}
      <SectionWrapper className="py-24 bg-gradient-to-br from-gray-900 via-footer to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, rgba(200,0,0,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="section-padding text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-rubik text-4xl md:text-5xl lg:text-6xl font-bold mb-10"
          >
            {t('home.cta.title')}
          </motion.h2>
          <Button href="/contacto" variant="primary" size="lg">
            {t('home.cta.button')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>
      </SectionWrapper>
    </>
  );
}
