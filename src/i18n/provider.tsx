import { ReactNode, createContext, useContext, useEffect, useMemo, useSyncExternalStore } from 'react';
import { Platform } from 'react-native';

export type Locale = 'de' | 'en';

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  tx: (de: string, en: string) => string;
};

const STORAGE_KEY = 'safefloor.locale';
const I18nContext = createContext<I18nContextValue | null>(null);
const localeListeners = new Set<() => void>();
let memoryLocale: Locale = 'de';

function getStoredLocale(): Locale {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return memoryLocale;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'en' ? 'en' : 'de';
}

function subscribeLocale(listener: () => void) {
  localeListeners.add(listener);
  const handleStorage = () => listener();
  if (Platform.OS === 'web' && typeof window !== 'undefined') window.addEventListener('storage', handleStorage);
  return () => {
    localeListeners.delete(listener);
    if (Platform.OS === 'web' && typeof window !== 'undefined') window.removeEventListener('storage', handleStorage);
  };
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore<Locale>(subscribeLocale, getStoredLocale, () => 'de');

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    memoryLocale = nextLocale;
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    }
    localeListeners.forEach((listener) => listener());
  };

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    tx: (de, en) => locale === 'de' ? de : en,
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}
