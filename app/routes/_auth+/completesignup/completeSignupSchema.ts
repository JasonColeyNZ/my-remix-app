import { z } from "zod";

export enum CompleteSignupStepIntent {
  PERSONAL = "personal-step",
  COMPANY = "company-step",
  DEMO = "demo-step",
  LEGAL = "legal-step",
  FINISH = "finish-step",
}

export const personalStepSchema = z.object({
  intent: z.literal(CompleteSignupStepIntent.PERSONAL),
  firstName: z.string().min(2, "Please enter a value"),
  lastName: z.string().min(2, "Please enter a value"),
  mobileNumber: z.string().optional(),
  workNumber: z.string().optional(),
  homeNumber: z.string().optional(),
  dateOfBirth: z
    .string()
    .optional()
    .transform((val) => (val ? val : null)),
});

export const companyStepSchema = z.object({
  intent: z.literal(CompleteSignupStepIntent.COMPANY),
  company: z.string().min(2, "Please enter a value"),
  locationId: z.string(),
  location: z.string().min(2, "Please enter a value"),
  // installDemo: z
  //   .string()
  //   .optional()
  //   .default("off")
  //   .transform((val) => val === "on"),
  // installDemo: z.string().optional(),
  // installDemo: zx.CheckboxAsString,
});

export const demoStepSchema = z.object({
  intent: z.literal(CompleteSignupStepIntent.DEMO),
  installDemo: z
    .string()
    .optional()
    .default("off")
    .transform((val) => val === "on"),
  // installDemo: z.string().optional(),
  // installDemo: zx.CheckboxAsString,
});

export const legalStepSchema = z.object({
  intent: z.literal(CompleteSignupStepIntent.LEGAL),
  agreeToTerms: z.string().transform((val) => val === "on"),
  agreeToPrivacy: z.string().transform((val) => val === "on"),
  //  agreeToPrivacy: zx.CheckboxAsString,
});

export const finishStepSchema = z.object({
  intent: z.literal(CompleteSignupStepIntent.FINISH),
});
export const completeSignupSchema = z.discriminatedUnion("intent", [
  personalStepSchema,
  companyStepSchema,
  demoStepSchema,
  legalStepSchema,
  finishStepSchema,
]);
