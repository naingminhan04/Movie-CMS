export const ROUTE_GROUPS = {
  videos: "/videos",
  cms: "/cms",
  customers: "/customers",
  subscription: "/subscription",
  reporting: "/reporting",
  administration: "/administration",
  settings: "/settings",
} as const;

export const ROUTES = {
  auth: "/",
  login: "/login",
  forgotPassword: "/forgot-password",
  otpVerification: "/otp-verification",
  resetPassword: "/reset-password",
  dashboard: "/dashboard",

  videosList: "/videos/list",
  categories: "/videos/categories",
  genres: "/videos/genres",
  casts: "/videos/casts",
  roles: "/videos/roles",
  collections: "/videos/collections",
  viewCount: "/videos/view-count",

  programs: "/programs",

  banners: "/cms/banners",
  ads: "/cms/ads",

  customerList: "/customers/list",
  banList: "/customers/ban-list",

  packages: "/subscription/packages",
  promotions: "/subscription/promotions",
  transactions: "/transactions",

  announcements: "/announcements",

  videoAnalytics: "/reporting/video-analytics",
  programAnalytics: "/reporting/program-analytics",
  licensedVideos: "/reporting/licensed-videos",

  adminList: "/administration/admin-list",
  roleManagement: "/administration/role-management",
  userLogs: "/administration/user-logs",
  auditLogs: "/administration/audit-logs",

  reminders: "/settings/reminders",
  smtp: "/settings/smtp",
  faqs: "/settings/faqs",
  termAndConditions: "/settings/term-and-conditions",
  privacyAndPolicy: "/settings/privacy-policy",
} as const;
