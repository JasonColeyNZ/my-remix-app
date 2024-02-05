// import { getClientLocales } from "remix-utils/locales/server";
import { z } from "zod";

//import { zx } from "zodix";

// export const hourValidation = z.object({
//   id: z.string(),
//   start: z.string(),
//   end: z.string(),
//   dayOfWeek: z.string(),
// });

export const addEventValidation = z.object({
  intent: z.string(),
  memberId: z.string(),
  locationId: z.string(),
  start: z.string(),
  end: z.string(),
  dayOfWeek: z.string(),
});

export const updateEventValidation = z.object({
  id: z.string(),
  intent: z.string(),
  start: z.string(),
  end: z.string(),
  dayOfWeek: z.string(),
});

export const deleteEventValidation = z.object({
  intent: z.string(),
  id: z.string(),
});
