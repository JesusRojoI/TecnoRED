'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { uxuiServices, devServices, packageServices } from '@/data/services';
import SectionWrapper from '@/components/shared/SectionWrapper';  
import Button from '@/components/shared/Button';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function SolucionesPage() {
 const { t } = useTranslation();
const { addItem } = useCart();
const router = useRouter();
const [currentPackage, setCurrentPackage] = useState(0);

const nextPackage = () => {
  setCurrentPackage((prev) => (prev + 1) % packageServices.length);
};

const prevPackage = () => {
  setCurrentPackage((prev) => (prev - 1 + packageServices.length) % packageServices.length);
};

  const handleContract = (serviceId: string) => {
    addItem(serviceId);
    toast.success(t('cart.itemAdded'), { duration: 5000 });
    router.push('/cart');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
           {/* ==================== HERO - Imagen de fondo con filtro ==================== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0">
          <Image
            src="/images/solutions-hero.jpg"
            alt={t('solutions.hero.title')}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-900/70" />
        </div>

        {/* Patrón decorativo sutil */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '25px 25px' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-rubik text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              {t('solutions.hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="font-inter text-xl text-gray-200 mb-10 leading-relaxed"
            >
              {t('solutions.hero.content')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Button href="/contacto" variant="primary" size="lg">
                {t('solutions.hero.cta')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES - Tarjetas con diseño asimétrico ==================== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-rubik text-4xl md:text-5xl font-bold text-text-primary mb-4">{t('solutions.servicesTitle')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>

          {/* UX/UI Services */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-primary flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="font-rubik text-3xl font-bold text-text-primary">{t('solutions.uxuiTitle')}</h3>
            </div>

            <div className="space-y-4">
              {uxuiServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                  className={`relative bg-white p-6 border-l-4 border-primary shadow-md hover:shadow-xl transition-all duration-300 ${
                    index % 2 === 0 ? 'ml-0 mr-0 md:mr-12' : 'ml-0 md:ml-12'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-grow">
                      <h4 className="font-rubik font-bold text-xl text-text-primary mb-2">{t(service.titleKey)}</h4>
                      <p className="font-inter text-sm text-text-secondary">{t(service.descKey)}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="font-rubik font-bold text-2xl text-primary whitespace-nowrap">
                        {formatPrice(service.price)} <span className="text-sm font-normal text-text-secondary">MXN</span>
                      </span>
                      <button
                        onClick={() => handleContract(service.id)}
                        className="bg-primary text-white px-5 py-2 font-rubik font-semibold text-sm hover:bg-primary-dark transition-colors whitespace-nowrap"
                      >
                        {t('solutions.contract')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Development Services */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gray-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-rubik text-3xl font-bold text-text-primary">{t('solutions.devTitle')}</h3>
            </div>

            <div className="space-y-4">
              {devServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.01 }}
                  className={`relative bg-white p-6 border-r-4 border-gray-900 shadow-md hover:shadow-xl transition-all duration-300 ${
                    index % 2 === 0 ? 'ml-0 md:ml-12' : 'ml-0 md:mr-12'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-grow">
                      <h4 className="font-rubik font-bold text-xl text-text-primary mb-2">{t(service.titleKey)}</h4>
                      <p className="font-inter text-sm text-text-secondary">{t(service.descKey)}</p>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="font-rubik font-bold text-2xl text-primary whitespace-nowrap">
                        {formatPrice(service.price)} <span className="text-sm font-normal text-text-secondary">MXN</span>
                      </span>
                      <button
                        onClick={() => handleContract(service.id)}
                        className="bg-gray-900 text-white px-5 py-2 font-rubik font-semibold text-sm hover:bg-gray-700 transition-colors whitespace-nowrap"
                      >
                        {t('solutions.contract')}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

            {/* ==================== PACKAGES - Rueda 3D ==================== */}
      <section className="py-20 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="font-rubik text-4xl md:text-5xl font-bold text-text-primary mb-4">{t('solutions.packagesTitle')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>

          {/* Carrusel 3D */}
          <div className="relative flex items-center justify-center">
            {/* Botón izquierdo */}
            <button
              onClick={prevPackage}
              className="absolute left-0 z-30 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Rueda de paquetes */}
            <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center perspective-1000">
              {packageServices.map((pkg, index) => {
                const offset = index - currentPackage;
                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 2;

                return (
                  <motion.div
                    key={pkg.id}
                    animate={{
                      x: offset * 200,
                      scale: isActive ? 1 : 0.7,
                      rotateY: offset * -15,
                      opacity: isVisible ? 1 : 0,
                      zIndex: 10 - Math.abs(offset),
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className={`absolute w-64 cursor-pointer ${isActive ? '' : 'pointer-events-none'}`}
                    onClick={() => !isActive && setCurrentPackage(index)}
                  >
                    <div className={`relative bg-white rounded-xl overflow-hidden shadow-2xl transition-all duration-300 ${isActive ? 'ring-4 ring-primary' : ''}`}>
                      <div className="relative h-40 overflow-hidden">
                        {pkg.image && (
                          <Image
                            src={pkg.image}
                            alt={t(pkg.titleKey)}
                            fill
                            className="object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-rubik font-bold text-base text-text-primary mb-2 line-clamp-1">{t(pkg.titleKey)}</h3>
                        <p className="font-inter text-xs text-text-secondary mb-3 line-clamp-2">{t(pkg.descKey)}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-rubik font-bold text-lg text-primary whitespace-nowrap">
                            {formatPrice(pkg.price)} <span className="text-xs font-normal text-text-secondary">MXN</span>
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleContract(pkg.id);
                            }}
                            className="bg-primary text-white px-3 py-1.5 rounded-lg font-rubik text-xs font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap"
                          >
                            {t('solutions.contract')}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Botón derecho */}
            <button
              onClick={nextPackage}
              className="absolute right-0 z-30 w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicadores */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {packageServices.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPackage(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentPackage ? 'w-6 bg-primary' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CUSTOM PRODUCT ==================== */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-xl" />
                <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                  <Image src="/images/custom-project.jpg" alt={t('solutions.customProduct.title')} fill className="object-cover" />
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-rubik text-4xl font-bold mb-6">{t('solutions.customProduct.title')}</h3>
              <p className="font-inter text-lg text-gray-300 mb-8 leading-relaxed">{t('solutions.customProduct.desc')}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="/contacto" variant="primary" size="lg">{t('solutions.customProduct.ctaQuote')}</Button>
                <Button href="/product/proyecto-desde-cero" variant="outline" size="lg">{t('solutions.customProduct.ctaPay')}</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
