import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Your English translations
          howItWorks: {
            steps: {
              step1: {
                title: 'Create Account',
                content: 'Sign up for a new account'
              },
              step2: {
                title: 'Verify Identity',
                content: 'Complete the verification process'
              },
              step3: {
                title: 'Secure Access',
                content: 'Set up secure access to your account'
              },
              step4: {
                title: 'Start Trading',
                content: 'Begin your trading journey'
              }
            }
          },
          about: {
            approach: {
              title: 'Our Approach',
              content: 'Advanced trading strategies'
            },
            partnership: {
              title: 'Partnership',
              content: 'Work together for success'
            },
            profitSharing: {
              title: 'Profit Sharing',
              content: 'Fair profit distribution'
            },
            transparency: {
              title: 'Transparency',
              content: 'Clear and open operations'
            },
            features: {
              approach: {
                description: 'Advanced trading approach'
              },
              partnership: {
                description: 'Strong partnership model'
              },
              profitSharing: {
                description: 'Fair profit sharing system'
              },
              transparency: {
                description: 'Complete transparency'
              }
            }
          }
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
