'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-footer text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="inline-block group">
              <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/logo.svg"
                  alt="TecnoRED"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </Link>
            <p className="text-gray-400 font-inter text-sm leading-relaxed mt-4">
              {t('footer.description')}
            </p>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-rubik font-semibold text-lg mb-4 text-primary">
              {t('footer.legalTitle')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/aviso-de-privacidad" className="text-gray-400 hover:text-primary transition-colors font-inter text-sm">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terminos-y-condiciones" className="text-gray-400 hover:text-primary transition-colors font-inter text-sm">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link href="/politica-de-reembolsos-y-devoluciones" className="text-gray-400 hover:text-primary transition-colors font-inter text-sm">
                  {t('footer.refund')}
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-rubik font-semibold text-lg mb-4 text-primary">
              {t('footer.contactTitle')}
            </h3>
            <ul className="space-y-3 text-gray-400 font-inter text-sm">
              <li>{t('footer.email')}</li>
              <li>{t('footer.phone')}</li>
              <li>{t('footer.location')}</li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 font-inter text-xs">
            © {new Date().getFullYear()} TecnoRED. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <Image src="/visa.svg" alt="Visa" width={40} height={25} className="opacity-60" />
            <Image src="/mastercard.svg" alt="Mastercard" width={35} height={25} className="opacity-60" />
          </div>
        </div>
      </div>
    </footer>
  );
}
