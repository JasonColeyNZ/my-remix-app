import { z } from "zod";

export type ProviderMarketing = {
  id: string;
  email: string;
  username?: string;
  name?: string;
  imageUrl?: string;
};

export interface MarketingProvider {
  integration: any;
  connect(): Promise<Response>;
  check(): Promise<Response>;
  disconnect(): Promise<void>;
  getLists(): Promise<any>;
  getTags(): Promise<any>;
  createTag(tagName: string): Promise<any>;
}

const MAILCHIMP_PROVIDER_NAME = "mailchimp";
const SENDGRID_PROVIDER_NAME = "sendGrid";

export const marketingProviderNames = [
  MAILCHIMP_PROVIDER_NAME,
  SENDGRID_PROVIDER_NAME,
] as const;
export const MarketingProviderNameSchema = z.enum(marketingProviderNames);
export type MarketingProviderName = z.infer<typeof MarketingProviderNameSchema>;
