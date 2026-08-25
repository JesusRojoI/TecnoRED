export interface ServiceItem {
  id: string;
  titleKey: string;
  descKey: string;
  price: number;
  image?: string;
}

export const uxuiServices: ServiceItem[] = [
  { id: 'uxui-basic', titleKey: 'solutions.services.uxuiBasic.title', descKey: 'solutions.services.uxuiBasic.desc', price: 13500 },
  { id: 'uxui-standard', titleKey: 'solutions.services.uxuiStandard.title', descKey: 'solutions.services.uxuiStandard.desc', price: 22700 },
  { id: 'uxui-redesign', titleKey: 'solutions.services.uxuiRedesign.title', descKey: 'solutions.services.uxuiRedesign.desc', price: 30000 },
];

export const devServices: ServiceItem[] = [
  { id: 'web-static', titleKey: 'solutions.services.webStatic.title', descKey: 'solutions.services.webStatic.desc', price: 13800 },
  { id: 'web-dynamic', titleKey: 'solutions.services.webDynamic.title', descKey: 'solutions.services.webDynamic.desc', price: 19600 },
  { id: 'ecommerce', titleKey: 'solutions.services.ecommerce.title', descKey: 'solutions.services.ecommerce.desc', price: 25100 },
  { id: 'app-simple', titleKey: 'solutions.services.appSimple.title', descKey: 'solutions.services.appSimple.desc', price: 45000 },
  { id: 'app-complex', titleKey: 'solutions.services.appComplex.title', descKey: 'solutions.services.appComplex.desc', price: 80100 },
  { id: 'api-integration', titleKey: 'solutions.services.apiIntegration.title', descKey: 'solutions.services.apiIntegration.desc', price: 10000 },
];

export const packageServices: ServiceItem[] = [
  { id: 'landing-ultra', titleKey: 'solutions.packages.landingUltra.title', descKey: 'solutions.packages.landingUltra.desc', price: 100, image: '/images/landing-ultra.jpg' },
  { id: 'page-simple', titleKey: 'solutions.packages.pageSimple.title', descKey: 'solutions.packages.pageSimple.desc', price: 3250, image: '/images/page-simple.jpg' },
  { id: 'digital-card', titleKey: 'solutions.packages.digitalCard.title', descKey: 'solutions.packages.digitalCard.desc', price: 500, image: '/images/digital-card.jpg' },
  { id: 'landing-promo', titleKey: 'solutions.packages.landingPromo.title', descKey: 'solutions.packages.landingPromo.desc', price: 2500, image: '/images/landing-promo.jpg' },
  { id: 'one-page', titleKey: 'solutions.packages.onePage.title', descKey: 'solutions.packages.onePage.desc', price: 4850, image: '/images/one-page.jpg' },
  { id: 'catalog', titleKey: 'solutions.packages.catalog.title', descKey: 'solutions.packages.catalog.desc', price: 7580, image: '/images/catalog.jpg' },
  { id: 'blog', titleKey: 'solutions.packages.blog.title', descKey: 'solutions.packages.blog.desc', price: 9120, image: '/images/blog.jpg' },
  { id: 'institutional', titleKey: 'solutions.packages.institutional.title', descKey: 'solutions.packages.institutional.desc', price: 12460, image: '/images/institutional.jpg' },
];

export interface CartItem {
  id: string;
  titleKey: string;
  price: number;
  quantity: number;
  image?: string;
  custom?: boolean;
  title?: string;
  quoteNumber?: string;
}

export const getServiceById = (id: string): ServiceItem | undefined => {
  return [...uxuiServices, ...devServices, ...packageServices].find(s => s.id === id);
};
