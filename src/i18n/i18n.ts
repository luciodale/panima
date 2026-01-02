import { translations, type Language } from './translations';

export type { Language };
export const defaultLanguage: Language = 'it';

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return defaultLanguage;
  const stored = localStorage.getItem('panima-lang');
  return (stored === 'en' || stored === 'it') ? stored : defaultLanguage;
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('panima-lang', lang);
}

export function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let result: unknown = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  
  return typeof result === 'string' ? result : path;
}

export function t(key: string, lang: Language = defaultLanguage): string {
  return getNestedValue(translations[lang] as unknown as Record<string, unknown>, key);
}

export function initI18n(): void {
  const lang = getStoredLanguage();
  document.documentElement.lang = lang;
  updateAllTranslations(lang);
  updateLanguageSwitchers(lang);
}

export function switchLanguage(lang: Language): void {
  setStoredLanguage(lang);
  document.documentElement.lang = lang;
  updateAllTranslations(lang);
  updateLanguageSwitchers(lang);
}

function updateAllTranslations(lang: Language): void {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const translation = t(key, lang);
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = translation;
      } else {
        el.textContent = translation;
      }
    }
  });
  
  // Update aria-labels
  const ariaElements = document.querySelectorAll('[data-i18n-aria]');
  ariaElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) {
      el.setAttribute('aria-label', t(key, lang));
    }
  });
}

function updateLanguageSwitchers(lang: Language): void {
  const switchers = document.querySelectorAll('.lang-switch');
  switchers.forEach((switcher) => {
    const buttons = switcher.querySelectorAll('button');
    buttons.forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  });
}

