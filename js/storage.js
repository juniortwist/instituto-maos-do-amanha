const prefix = 'ima-demo:';
export function getStored(key, fallback) {
  try {
    const raw = localStorage.getItem(prefix + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch { return fallback; }
}
export function setStored(key, value) {
  try { localStorage.setItem(prefix + key, JSON.stringify(value)); return true; }
  catch { return false; }
}
export function saveForm(kind, data) {
  const existing = getStored(kind, []);
  const records = Array.isArray(existing) ? existing : [];
  return setStored(kind, [...records, { ...data, createdAt: new Date().toISOString() }]);
}
export function clearFormData() {
  try { localStorage.removeItem(prefix + 'voluntarios'); localStorage.removeItem(prefix + 'mensagens'); return true; }
  catch { return false; }
}
