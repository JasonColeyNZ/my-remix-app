import { z } from "zod";

export enum letterIntent {
  ADD_LETTER = "ADD_LETTER",
  UPDATE = "UPDATE",
  RENAME = "RENAME",
}

export const addLetterSchema = z.object({
  intent: z.nativeEnum(letterIntent),
  name: z.string().min(2, "Please include a name"),
});
