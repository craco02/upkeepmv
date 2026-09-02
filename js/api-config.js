/* Configuración centralizada de la API para el frontend */
const API_BASE_URL = ['3000', '3001'].includes(window.location.port) && /^https?:$/i.test(window.location.protocol)
  ? window.location.origin
  : 'https://192.168.23.164:3000';

const API_URL = (path) => {
  if (!path) return API_BASE_URL;
  let normalized = String(path).trim();

  if (/^https?:\/\//i.test(normalized)) return normalized;
  if (/^file:\/\//i.test(normalized)) {
    try {
      const parsed = new URL(normalized);
      normalized = parsed.pathname + (parsed.search || '');
    } catch {
      return API_BASE_URL;
    }
  }
  if (normalized.startsWith('//')) {
    return `${window.location.protocol}${normalized}`;
  }
  if (normalized.startsWith('/')) {
    return `${API_BASE_URL}${normalized}`;
  }
  return `${API_BASE_URL}/${normalized}`;
};

const API_JSON_HEADERS = { 'Content-Type': 'application/json' };

const API_FETCH = (path, options = {}) => {
  return fetch(API_URL(path), options);
};
