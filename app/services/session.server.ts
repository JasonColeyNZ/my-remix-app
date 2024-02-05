import { createCookieSessionStorage } from "@remix-run/node";
// import type { VercelResponse } from "@vercel/node";
import { invariantResponse } from "~/utils/misc.tsx";

invariantResponse(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function within<T>(
  promise: Promise<T>,
  duration: number,
  // timeoutError = new Error("Promise timed out"),
  // res: Response,
) {
  // create a promise that rejects in milliseconds
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => {
      // console.log("timeout");
      reject(new Error("Promise timed out"));
    }, duration * 1000);
  });

  // returns a race between timeout and the passed promise
  return Promise.race<T>([promise, timeout]);

  // const id = setTimeout(() => {
  //   res.json({ message: "There was an error with the upstream service!" });
  // }, duration);

  // try {
  //   const data = await fn();
  //   clearTimeout(id);
  //   res.json(data);
  // } catch (e: any) {
  //   res.status(500).json({ message: e.message });
  // }
}

// function promiseWithTimeout<T>(
//   promise: Promise<T>,
//   ms: number,
//   timeoutError = new Error("Promise timed out"),
// ): Promise<T> {
//   // create a promise that rejects in milliseconds
//   const timeout = new Promise<never>((_, reject) => {
//     setTimeout(() => {
//       reject(timeoutError);
//     }, ms);
//   });

//   // returns a race between timeout and the passed promise
//   return Promise.race<T>([promise, timeout]);
// }
