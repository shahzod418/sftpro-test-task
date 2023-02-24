import type en from './en';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof en;
  }
}
