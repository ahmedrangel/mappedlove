export { ErrorCode } from "~/types/enums/errors";
export { PremiumLimits, FreeLimits } from "~/types/enums/limits";
export { PayPalWebhook } from "~/types/enums/paypal";
export { isPasswordValid } from "~/utils/validators";
export { SITE } from "~/utils/site";
import { sha256 } from "ohash";

export const hash = (string: string, salt?: string) => {
  return sha256(salt ? string + salt : string);
};

export const createBondCode = (id: number) => {
  return Math.random().toString(36).substring(2, 6).toUpperCase() + id;
};

export const partnerIdFromCode = (code: string) => {
  return Number(code.substring(4));
};

export const isCodeDateExpired = (date: number) => {
  return Date.now() - date > 7 * 24 * 60 * 60 * 1000;
};

export const getGracePeriod = (date: number, days: number) => {
  return date + (days * 24 * 60 * 60 * 1000);
};
