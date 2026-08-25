'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import SectionWrapper from '@/components/shared/SectionWrapper';
import Button from '@/components/shared/Button';
import toast from 'react-hot-toast';

export default function ProyectoDesdeCeroPage() {
  const { t } = useTranslation();
  const { addCustomItem } = useCart();
  const [quoteNumber, setQuoteNumber] = useState('');
  const [investment, setInvestment] = useState('1.00');
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setInvestment(value);
    }
  };

  const handleAddToCart = () => {
    if (!quoteNumber.trim()) {
      toast.error(t('solutions.customProductPage.validation.quoteRequired'), { duration: 5000 });
      return;
    }
    const investmentNum = parseFloat(investment);
    if (!investment || isNaN(investmentNum) || investmentNum <= 0) {
      toast.error(t('solutions.customProductPage.validation.investmentRequired'), { duration: 5000 });
      return;
    }

    addCustomItem({
      id: `custom-${quoteNumber.trim()}`,
      title: t('solutions.customProductPage.title'),
      titleKey: 'solutions.customProductPage.title',
      price: investmentNum,
      quantity: quantity,
      custom: true,
      quoteNumber: quoteNumber.trim(),
    });

    setAddedMessage(`${quantity} × "${t('solutions.customProductPage.title')}" ${t('solutions.customProductPage.addedToCart')}`);
    toast.success(`${quantity} × "${t('solutions.customProductPage.title')}" ${t('solutions.customProductPage.addedToCart')}`, { duration: 5000 });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner oscuro superior con título */}
      <div className="bg-gray-900 pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="font-rubik text-4xl md:text-5xl font-bold text-white text-center">
            {t('solutions.customProductPage.title')}
          </h1>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden shadow-xl">
              <Image src="/images/custom-project.jpg" alt={t('solutions.customProductPage.title')} fill className="object-cover" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <p className="font-inter text-lg text-text-primary mb-4 leading-relaxed">
              {t('solutions.customProductPage.subtitle')}
            </p>
            <p className="font-inter text-base text-text-secondary mb-8 leading-relaxed">
              {t('solutions.customProductPage.desc')}
            </p>

            {addedMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
              >
                <p className="font-inter text-sm text-green-800">{addedMessage}</p>
              </motion.div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                  {t('solutions.customProductPage.quoteNumber')}
                </label>
                <input
                  type="text"
                  value={quoteNumber}
                  onChange={(e) => setQuoteNumber(e.target.value)}
                  placeholder={t('solutions.customProductPage.quotePlaceholder')}
                  className="w-full px-4 py-3 border border-gray-200 bg-white rounded-lg focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                  {t('solutions.customProductPage.investment')}
                </label>
                <input
                  type="text"
                  value={investment}
                  onChange={handleInvestmentChange}
                  className="w-full px-4 py-3 border border-gray-200 bg-white rounded-lg focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-inter text-sm font-medium text-text-primary mb-2">
                  {t('solutions.customProductPage.quantity')}
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q > 1 ? q - 1 : q)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center font-inter text-sm border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleAddToCart} variant="primary" size="lg">
                  {t('solutions.customProductPage.addToCart')}
                </Button>
                {addedMessage && (
                  <Button href="/cart" variant="secondary" size="lg">
                    {t('solutions.customProductPage.viewCart')}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
