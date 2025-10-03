/**
 * CORS Proxy utilities
 * Sử dụng các public CORS proxy để bypass CORS restrictions
 */

// Danh sách các CORS proxy public
export const CORS_PROXIES = [
  {
    name: 'CORS Anywhere (Heroku) - KHUYÊN DÙNG',
    url: 'https://cors-anywhere.herokuapp.com/',
    note: 'Stable, cần request access 1 lần tại corsdemo'
  },
  {
    name: 'AllOrigins',
    url: 'https://api.allorigins.win/raw?url=',
    note: 'Backup option, có thể chậm'
  },
  {
    name: 'CORS.SH',
    url: 'https://cors.sh/',
    note: 'Giới hạn 50 requests/hour'
  },
  {
    name: 'ThingProxy',
    url: 'https://thingproxy.freeboard.io/fetch/',
    note: 'Backup option'
  },
  {
    name: 'Custom Proxy',
    url: '',
    note: 'Tự host proxy server'
  }
];

// Default proxy (CORS Anywhere)
export const DEFAULT_PROXY = 'https://cors-anywhere.herokuapp.com/';

/**
 * Wrap URL với CORS proxy
 * @param {string} originalUrl - URL gốc cần gọi
 * @param {string} proxyUrl - CORS proxy URL (optional)
 * @returns {string} - URL đã được wrap
 */
export const wrapWithProxy = (originalUrl, proxyUrl = '') => {
  if (!proxyUrl) {
    return originalUrl;
  }
  
  // Nếu proxy là AllOrigins, encode URL
  if (proxyUrl.includes('allorigins.win')) {
    return `${proxyUrl}${encodeURIComponent(originalUrl)}`;
  }
  
  // Các proxy khác thường chỉ cần concat
  return `${proxyUrl}${originalUrl}`;
};

/**
 * Check xem có đang dùng proxy không
 * @param {string} url - URL cần check
 * @returns {boolean}
 */
export const isUsingProxy = (url) => {
  return CORS_PROXIES.some(proxy => 
    proxy.url && url.includes(proxy.url)
  );
};

/**
 * Extract original URL từ proxied URL
 * @param {string} proxiedUrl - URL đã được proxy
 * @returns {string} - Original URL
 */
export const extractOriginalUrl = (proxiedUrl) => {
  for (const proxy of CORS_PROXIES) {
    if (proxy.url && proxiedUrl.startsWith(proxy.url)) {
      const originalUrl = proxiedUrl.replace(proxy.url, '');
      
      // Nếu là AllOrigins, decode URL
      if (proxy.url.includes('allorigins.win')) {
        return decodeURIComponent(originalUrl);
      }
      
      return originalUrl;
    }
  }
  
  return proxiedUrl;
};

