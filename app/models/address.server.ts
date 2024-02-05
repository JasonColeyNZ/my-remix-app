import { prisma } from "~/db.server.ts";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type AddressType = {
  id: string | null;
  streetAddress: string | null;
  streetAddress2: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
};

export type EntityItemType = ThenArg<ReturnType<typeof createAddress>>;
export async function createAddress(data: AddressType) {
  const address = await prisma.address.create({
    data: {
      streetAddress: data.streetAddress,
      streetAddress2: data.streetAddress2,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country,
    },
  });
  return address;
}
