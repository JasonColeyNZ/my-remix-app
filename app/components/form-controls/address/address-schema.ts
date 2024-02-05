import { z } from "zod";

export const addressSchema = {
  id: z
    .string()
    .nullish()
    .transform((val) => val || null),
  streetAddress: z
    .string()
    .nullish()
    .transform((val) => val || null),
  streetAddress2: z
    .string()
    .nullish()
    .transform((val) => val || null),
  city: z
    .string()
    .nullish()
    .transform((val) => val || null),
  zipCode: z
    .string()
    .nullish()
    .transform((val) => val || null),
  state: z
    .string()
    .nullish()
    .transform((val) => val || null),
  country: z
    .string()
    .nullish()
    .transform((val) => val || null),
};
