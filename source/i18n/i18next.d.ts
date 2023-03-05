import type texts from './texts';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof texts;
  }
}
