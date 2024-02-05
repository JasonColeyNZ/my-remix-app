// import { withAccelerate } from "@prisma/extension-accelerate";
import type { User } from "@supabase/supabase-js";

// import type { PrismaClient } from "../db.server.ts";
import { prisma } from "../db.server.ts";

export interface SupabaseRowLevelSecurityOptions {
  /**
   * The client extension name
   * @default 'supabaseRowLevelSecurity'
   */
  name?: string;
  /**
   * The name of the Postgres setting to use for the claims, `request.jwt.claims` by default.
   * Supabase sets using set_config() and get with current_setting()
   *
   * @default 'request.jwt.claims'
   */
  claimsSetting?: string;
  /**
   * A function that returns the JWT claims to use for the current request decoded from the Supabase access token.
   *
   * E.g.:
   *
   * {
   *   "aud": "authenticated",
   *   "exp": 1675711033,
   *   "sub": "00000000-0000-0000-0000-000000000000",
   *   "email": "user@example.com",
   *   "phone": "",
   *   "app_metadata": {
   *     "provider": "email",
   *     "providers": [
   *       "email"
   *     ]
   *   },
   *   "user_metadata": {},
   *   "role": "authenticated",
   *   "aal": "aal1",
   *   "amr": [
   *     {
   *       "method": "otp",
   *       "timestamp": 1675696651
   *     }
   *   ],
   *   "session_id": "000000000000-0000-0000-0000-000000000000"
   *  }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  claimsFn?: undefined | (() => Record<string, any>);
  /**
   * The error to throw when the policy check fails.
   */
  policyError?: Error;
  /**
   * Log errors to the console.
   * @default false
   */
  logging?: boolean;
}

const defaultSupabaseRowLevelSecurityOptions: SupabaseRowLevelSecurityOptions =
  {
    name: "useSupabaseRowLevelSecurity",
    claimsSetting: "request.jwt.claims",
    claimsFn: undefined,
    policyError: new Error("Not authorized."),
    logging: false,
  };

export const supabaseRowLevelSecurity = (
  options: SupabaseRowLevelSecurityOptions = defaultSupabaseRowLevelSecurityOptions,
) => {
  // const name = options.name || defaultSupabaseRowLevelSecurityOptions.name;
  const claimsFn =
    options.claimsFn || defaultSupabaseRowLevelSecurityOptions.claimsFn;
  const claimsSetting =
    options.claimsSetting ||
    defaultSupabaseRowLevelSecurityOptions.claimsSetting;
  const policyError =
    options.policyError || defaultSupabaseRowLevelSecurityOptions.policyError;

  return prisma
    .$extends({
      name: defaultSupabaseRowLevelSecurityOptions.name,
      query: {
        $allModels: {
          async $allOperations({ args, query }) {
            const claims = claimsFn ? JSON.stringify(claimsFn() || {}) : "";
            // console.log("claimsSetting", claimsSetting);
            // console.log("claims", claims);
            // console.log("query", query.toString());
            try {
              const [, result] = await prisma.$transaction([
                prisma.$executeRaw`SELECT set_config(${claimsSetting}, ${claims}, TRUE)`,
                query(args),
              ]);

              return result;
            } catch (e) {
              console.log("e", e);
              if (options.logging) console.error(e);
              throw policyError || e;
            }
          },
        },
      },
    })
    .$extends({
      result: {
        user: {
          fullName: {
            needs: { firstName: true, lastName: true },
            compute(user) {
              return `${user.firstName} ${user.lastName}`;
            },
          },
        },
      },
    }); //.$extends(withAccelerate());
  //Add Accelerate to production
  // if (process.env.NODE_ENV === "production") {
  // p.$extends(withAccelerate());
  // }
  // return p;
};

export const authenticatedPrismaClient = (sbUser: User) => {
  //return //prisma.$extends(
  // console.log("sbUser", sbUser);
  return supabaseRowLevelSecurity({
    claimsFn: () => ({ ...sbUser }),
    logging: true,
  });
  //);
};
