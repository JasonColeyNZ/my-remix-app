import { z } from "zod";

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../../utils/types.ts";

export const uploadImageValidation = z.object({
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    ),
  objectId: z.string(),
  fieldId: z.string(),
  objectType: z.string(),
});

export const uploadUploadedValidation = z.object({
  image: z.string(),
  objectId: z.string(),
  fieldId: z.string(),
  objectType: z.string(),
});

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB

export const ImageFieldsetSchema = z.object({
  id: z.string().optional(),
  publicUrl: z.string().optional(),
  signedUrl: z.string().optional(),
  storedFileName: z.string().optional(),
  file: z
    .any()
    .refine((files) => files?.length === 0, "Image is required.") // if no file files?.length === 0, if file files?.length === 1
    .refine(
      (files) => files?.[0]?.size >= MAX_UPLOAD_SIZE,
      `Max file size is 5MB.`,
    ) // this should be greater than or equals (>=) not less that or equals (<=)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted.",
    )
    .optional(),

  altText: z.string().optional(),
});

export type ImageFieldsetSchemaType = z.infer<typeof ImageFieldsetSchema>;
