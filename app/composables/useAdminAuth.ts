// Basic-Auth token (base64 user:pass) kept in sessionStorage so a reload within
// the tab stays logged in, but it is not sent on every request like a cookie.
const STORAGE_KEY = "nx-admin";

export function useAdminAuth() {
  const token = useState<string | null>("admin-token", () => null);

  if (import.meta.client && !token.value) {
    token.value = sessionStorage.getItem(STORAGE_KEY);
  }

  const isAuthed = computed(() => Boolean(token.value));

  function set(user: string, pass: string) {
    token.value = btoa(`${user}:${pass}`);
    if (import.meta.client) sessionStorage.setItem(STORAGE_KEY, token.value);
  }

  function clear() {
    token.value = null;
    if (import.meta.client) sessionStorage.removeItem(STORAGE_KEY);
  }

  const authHeaders = (): Record<string, string> =>
    token.value ? { authorization: `Basic ${token.value}` } : {};

  return { token, isAuthed, set, clear, authHeaders };
}
