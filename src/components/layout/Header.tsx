'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const { t, i18n } = useTranslation();
  const { totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isEnglish = i18n.language === 'en';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = isEnglish ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
        {/* Logo solo - 50% más grande (72px) */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-[72px] h-[72px] transition-transform duration-300 group-hover:scale-110">
            <Image
              src="/logo.svg"
              alt="TecnoRED"
              fill
              className={`object-contain transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert'}`}
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/soluciones"
            className={`font-inter font-medium transition-colors duration-300 hover:text-primary ${
              isScrolled ? 'text-text-primary' : 'text-white'
            }`}
          >
            {t('header.solutions')}
          </Link>
          <Link
            href="/contacto"
            className={`font-inter font-medium transition-colors duration-300 hover:text-primary ${
              isScrolled ? 'text-text-primary' : 'text-white'
            }`}
          >
            {t('header.contact')}
          </Link>

          {/* Language Switch - Toggle con idioma activo */}
          <button
            onClick={toggleLanguage}
            className={`relative w-[104px] h-9 rounded-full transition-colors duration-300 flex items-center overflow-hidden ${
              isScrolled ? 'bg-gray-200' : 'bg-white/20 backdrop-blur-sm'
            }`}
            title={t('header.language')}
          >
            {/* Slider que se mueve de izquierda a derecha */}
            <motion.div
              animate={{ x: isEnglish ? 42 : 2 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute top-1 left-0 w-[58px] h-7 bg-primary rounded-full shadow-md z-10 flex items-center justify-center gap-1.5"
            >
              {/* Contenido del slider: bandera + código según idioma */}
              <span className="text-sm leading-none">
                {isEnglish ? '🇺🇸' : '🇲🇽'}
              </span>
              <span className="text-[10px] font-rubik font-bold uppercase text-white leading-none">
                {isEnglish ? 'EN' : 'ES'}
              </span>
            </motion.div>

            {/* Texto fantasma en el lado opuesto (visible cuando slider no está ahí) */}
            <span className={`absolute right-3 text-[10px] font-rubik font-bold uppercase transition-opacity duration-200 ${isEnglish ? 'opacity-0' : 'opacity-40'}`}>
              EN
            </span>
            <span className={`absolute left-3 text-[10px] font-rubik font-bold uppercase transition-opacity duration-200 ${isEnglish ? 'opacity-40' : 'opacity-0'}`}>
              ES
            </span>
          </button>

          <Link
            href="/cart"
            className={`relative flex items-center gap-2 transition-colors duration-300 hover:text-primary ${
              isScrolled ? 'text-text-primary' : 'text-white'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden p-2 transition-colors ${isScrolled ? 'text-primary' : 'text-white'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link href="/soluciones" className="font-inter font-medium text-text-primary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                {t('header.solutions')}
              </Link>
              <Link href="/contacto" className="font-inter font-medium text-text-primary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                {t('header.contact')}
              </Link>

              {/* Mobile Language Switch */}
              <button
                onClick={toggleLanguage}
                className="relative w-[104px] h-9 rounded-full bg-gray-200 flex items-center overflow-hidden"
              >
                <motion.div
                  animate={{ x: isEnglish ? 42 : 2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="absolute top-1 left-0 w-[58px] h-7 bg-primary rounded-full shadow-md z-10 flex items-center justify-center gap-1.5"
                >
                  <span className="text-sm leading-none">{isEnglish ? '🇺🇸' : '🇲🇽'}</span>
                  <span className="text-[10px] font-rubik font-bold uppercase text-white leading-none">{isEnglish ? 'EN' : 'ES'}</span>
                </motion.div>
              </button>

              <Link href="/cart" className="flex items-center gap-2 text-text-primary hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                <span>{t('header.cart')}</span>
                {totalItems > 0 && (
                  <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">{totalItems}</span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
