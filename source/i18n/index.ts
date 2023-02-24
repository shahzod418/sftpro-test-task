import { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en';
import ru from './ru';

use(initReactI18next).init<typeof en>({
  fallbackLng: 'en',
  resources: {
    ru,
    en,
  },
});
