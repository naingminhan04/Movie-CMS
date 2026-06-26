import { ROUTES } from "@/routes/path";

import FaqsPage from "./faqs/page";
import PrivacyPolicyPage from "./privacy-policy/page";
import RemindersPage from "./reminders/page";
import SmtpPage from "./smtp/page";
import TermAndConditionsPage from "./term-and-conditions/page";

export const settingsRoutes = [
  { path: ROUTES.reminders, element: <RemindersPage /> },
  { path: ROUTES.smtp, element: <SmtpPage /> },
  { path: ROUTES.faqs, element: <FaqsPage /> },
  { path: ROUTES.termAndConditions, element: <TermAndConditionsPage /> },
  { path: ROUTES.privacyAndPolicy, element: <PrivacyPolicyPage /> },
];
