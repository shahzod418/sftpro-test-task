import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import texts from './texts';

use(initReactI18next).init<typeof texts>({
  fallbackLng: 'en',
  resources: { en: texts },
});
