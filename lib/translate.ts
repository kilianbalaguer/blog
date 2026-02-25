// Translation service for blog post content
// Uses Google Translate's free public API (no key required, unlimited, fast)

const TRANSLATION_CACHE_KEY = 'blog_translations';
const CACHE_EXPIRY_DAYS = 30; // Cache longer since it's free

interface TranslationCache {
  [key: string]: {
    text: string;
    timestamp: number;
  };
}

// Get cached translations from localStorage
function getCache(): TranslationCache {
  if (typeof window === 'undefined') return {};
  try {
    const cached = localStorage.getItem(TRANSLATION_CACHE_KEY);
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
}

// Save translations to localStorage cache
function saveToCache(key: string, text: string) {
  if (typeof window === 'undefined') return;
  try {
    const cache = getCache();
    cache[key] = {
      text,
      timestamp: Date.now(),
    };
    localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // Ignore storage errors
  }
}

// Check if cached translation is still valid
function isCacheValid(timestamp: number): boolean {
  const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - timestamp < expiryTime;
}

// Language code mapping for Google Translate
const languageMap: Record<string, string> = {
  en: 'en',
  fr: 'fr',
  ar: 'ar',
  nl: 'nl',
  de: 'de',
  es: 'es',
  ko: 'ko',
};

/**
 * Translate text using Google Translate's free API
 * Fast, unlimited, no API key required
 */
export async function translateText(
  text: string,
  targetLanguage: string
): Promise<string> {
  // Don't translate if target is English or text is empty
  if (targetLanguage === 'en' || !text.trim()) {
    return text;
  }

  // Check cache first
  const cacheKey = `${text.substring(0, 100)}_${targetLanguage}_v2`;
  const cache = getCache();
  const cached = cache[cacheKey];
  
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.text;
  }

  try {
    const langCode = languageMap[targetLanguage] || targetLanguage;
    
    // Use Google Translate's free endpoint
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${langCode}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(`Translation failed: ${response.status}`);
      return text;
    }

    const data = await response.json();
    
    // Google Translate returns nested arrays: [[[translated, original, ...]]]
    let translatedText = '';
    if (data && data[0]) {
      for (const item of data[0]) {
        if (item[0]) {
          translatedText += item[0];
        }
      }
    }
    
    const result = translatedText || text;

    // Save to cache
    saveToCache(cacheKey, result);

    return result;
  } catch (error) {
    console.error('Translation error:', error);
    return text;
  }
}

/**
 * Translate markdown content
 * Translates all paragraphs in parallel for maximum speed
 * Fast and unlimited
 */
export async function translateMarkdown(
  markdown: string,
  targetLanguage: string
): Promise<string> {
  if (targetLanguage === 'en' || !markdown.trim()) {
    return markdown;
  }

  // Check cache for the full markdown
  const cacheKey = `md_${markdown.substring(0, 100)}_${targetLanguage}_v2`;
  const cache = getCache();
  const cached = cache[cacheKey];
  
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.text;
  }

  try {
    // Split by double newlines (paragraphs)
    const paragraphs = markdown.split(/\n\n+/);
    
    // Translate all paragraphs in parallel for speed
    const translationPromises = paragraphs.map(paragraph => {
      if (!paragraph.trim()) {
        return Promise.resolve(paragraph);
      }
      return translateText(paragraph, targetLanguage);
    });

    const translatedParagraphs = await Promise.all(translationPromises);
    const result = translatedParagraphs.join('\n\n');
    
    // Save to cache
    saveToCache(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error('Markdown translation error:', error);
    return markdown;
  }
}

/**
 * Batch translate multiple texts in parallel
 * Super fast with Google Translate
 */
export async function batchTranslate(
  texts: string[],
  targetLanguage: string
): Promise<string[]> {
  if (targetLanguage === 'en') {
    return texts;
  }

  // Translate all in parallel
  const translationPromises = texts.map(text => translateText(text, targetLanguage));
  return Promise.all(translationPromises);
}
