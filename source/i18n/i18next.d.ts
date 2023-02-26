import type { I18n } from '@interfaces/i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: I18n;
  }
}
