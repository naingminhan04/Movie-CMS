const REMEMBER_EMAIL_KEY = "origin-admin-remembered-email";

export const getRememberedEmail = (): string | null =>
  localStorage.getItem(REMEMBER_EMAIL_KEY);

export const setRememberedEmail = (email: string): void => {
  localStorage.setItem(REMEMBER_EMAIL_KEY, email);
};

export const clearRememberedEmail = (): void => {
  localStorage.removeItem(REMEMBER_EMAIL_KEY);
};
