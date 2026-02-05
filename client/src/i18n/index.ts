import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from './ar.json'
import en from './en.json'

export const CATEGORIES = [
  { slug: 'events', arKey: 'events', enKey: 'events' },
  { slug: 'restaurants', arKey: 'restaurants', enKey: 'restaurants' },
  { slug: 'activity', arKey: 'activity', enKey: 'activity' },
  { slug: 'concerts', arKey: 'concerts', enKey: 'concerts' },
  { slug: 'experiences', arKey: 'experiences', enKey: 'experiences' },
  { slug: 'entertainment', arKey: 'entertainment', enKey: 'entertainment' },
  { slug: 'theatrical', arKey: 'theatrical', enKey: 'theatrical' },
  { slug: 'entry', arKey: 'entry', enKey: 'entry' },
  { slug: 'shop', arKey: 'shop', enKey: 'shop' },
  { slug: 'cinemas', arKey: 'cinemas', enKey: 'cinemas' },
] as const

export type CategorySlug = (typeof CATEGORIES)[number]['slug']

i18n.use(initReactI18next).init({
  resources: { ar: { translation: ar }, en: { translation: en } },
  lng: 'ar',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
