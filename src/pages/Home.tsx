import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import PerformanceSection from '../components/sections/PerformanceSection';
import FaqSection from '../components/sections/FaqSection';
import ContactSection from '../components/sections/ContactSection';

const Home: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Update document title when component mounts
    document.title = t('common.siteTitle');
  }, [t]);

  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <PerformanceSection />
      <FaqSection />
      <ContactSection />
    </Layout>
  );
};

export default Home;