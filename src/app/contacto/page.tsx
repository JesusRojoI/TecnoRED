'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/shared/SectionWrapper';
import Button from '@/components/shared/Button';
import toast from 'react-hot-toast';

export default function ContactoPage() {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enviar-correo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: formData.email,
          subject: 'Nuevo mensaje de contacto - TecnoRED',
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          type: 'contact',
          language: i18n.language,
        }),
      });

      if (response.ok) {
        toast.success(t('contact.form.success'), { duration: 5000 });
        setFormData({ name: '', company: '', email: '', phone: '', message: '' });
      } else {
        toast.error(t('contact.form.error'), { duration: 5000 });
      }
    } catch (error) {
      toast.error(t('contact.form.error'), { duration: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <SectionWrapper className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-gray-900 to-footer text-white">
        <div className="section-padding text-center">
          <h1 className="font-rubik text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t('contact.hero.title')}</h1>
          <p className="font-inter text-lg text-gray-300 max-w-2xl mx-auto">{t('contact.hero.subtitle')}</p>
        </div>
      </SectionWrapper>

      {/* Contact Form */}
      <SectionWrapper className="py-16 md:py-24 bg-white" id="form">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="lg:col-span-2">
              <h2 className="font-rubik text-2xl font-bold text-text-primary mb-8">{t('contact.info.title')}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary">✉️</span>
                  </div>
                  <div>
                    <p className="font-rubik font-semibold text-text-primary">{t('contact.info.emailLabel')}</p>
                    <p className="font-inter text-text-secondary">{t('contact.info.email')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary">📞</span>
                  </div>
                  <div>
                    <p className="font-rubik font-semibold text-text-primary">{t('contact.info.phoneLabel')}</p>
                    <p className="font-inter text-text-secondary">{t('contact.info.phone')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-primary">📍</span>
                  </div>
                  <div>
                    <p className="font-rubik font-semibold text-text-primary">{t('contact.info.addressLabel')}</p>
                    <p className="font-inter text-text-secondary">{t('contact.info.address')}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="font-inter text-sm text-text-secondary mb-3">{t('contact.info.paymentMethods')}</p>
                <div className="flex items-center gap-4">
                  <Image src="/visa.svg" alt="Visa" width={50} height={30} className="opacity-70" />
                  <Image src="/mastercard.svg" alt="Mastercard" width={45} height={30} className="opacity-70" />
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} className="lg:col-span-3">
              <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
                <h2 className="font-rubik text-2xl font-bold text-text-primary mb-8">{t('contact.form.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-inter text-sm font-medium text-text-primary mb-2">{t('contact.form.name')}</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 bg-white rounded-lg focus:border-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block font-inter text-sm font-medium text-text-primary mb-2">{t('contact.form.company')}</label>
                      <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full px-4 py-3 border border-gray-200 bg-white rounded-lg focus:border-primary focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-inter text-sm font-medium text-text-primary mb-2">{t('contact.form.email')}</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 bg-white rounded-lg focus:border-primary focus:outline-none" />
                    </div>
                    <div>
                      <label className="block font-inter text-sm font-medium text-text-primary mb-2">{t('contact.form.phone')}</label>
                      <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-200 bg-white rounded-lg focus:border-primary focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-inter text-sm font-medium text-text-primary mb-2">{t('contact.form.message')}</label>
                    <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 border border-gray-200 bg-white rounded-lg focus:border-primary focus:outline-none resize-none" />
                  </div>
                  <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? t('common.loading') : t('contact.form.submit')}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
