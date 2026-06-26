declare module "js-cookie" {
  type CookieAttributes = {
    expires?: number | Date;
    secure?: boolean;
    sameSite?: "strict" | "lax" | "none";
  };

  const Cookies: {
    set(name: string, value: string, options?: CookieAttributes): void;
    get(name: string): string | undefined;
    remove(name: string): void;
  };

  export default Cookies;
}
