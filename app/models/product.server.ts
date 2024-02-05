import type { Product, ProductType, TrackingType } from "@prisma/client";
import { UnitOfMeasure } from "@prisma/client";
import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import { invariantResponse } from "~/utils/misc";
import type { ProductOnServiceType } from "~/utils/types";

// type ServicesOnProductsType = {
//   id: string;
//   productId: string;
//   serviceId: string;
//   trackingType: string;
//   qty: number;
// };

export type ProductItemsType = {
  id: Product["id"];
  name: Product["name"];
  description: Product["description"];
  unitOfMeasure: Product["unitOfMeasure"];
  productType: ProductType["name"];
  productTypeId: Product["productTypeId"];
  price: string;
  services: ProductOnServiceType[];
  // effectiveDate: ProductPrice["effectiveDate"];

  // prices: {
  //   //  effectiveDate: ProductPrice["effectiveDate"];
  //   // price: ProductPrice["price"];
  // }[];
};

// export type ClientsItemType = {
//   id: Client["id"];
//   firstName: Client["firstName"];
//   lastName: Client["lastName"];
//   email: Client["email"];
//   mobileNumber: Client["mobileNumber"];
//   avatarData: ImageUploadDataType;
// };

export type ProductTypeType = {
  id: string;
  name: string;
};

export type ProductsItemsType = ProductItemsType[];
export async function getProducts(sbUser: User) {
  const data = await authenticatedPrismaClient(sbUser).product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      unitOfMeasure: true,
      productType: {
        select: {
          id: true,
          name: true,
        },
      },
      //select only the latest price
      prices: {
        orderBy: [{ effectiveDate: "desc" }],
        take: 1,
        select: {
          price: true,
        },
      },
    },
    orderBy: [{ name: "asc" }],
  });

  return data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    unitOfMeasure: product.unitOfMeasure,
    productType: product.productType.name,
    productTypeId: product.productType.id,
    price:
      product.prices.length > 0
        ? product.prices.map((price) => price.price)[0].toString()
        : "",
  })) as ProductItemsType[];
}

export async function getProductTypes(sbUser: User) {
  const data = await authenticatedPrismaClient(sbUser).productType.findMany({
    select: {
      id: true,
      name: true,
    },
    orderBy: [{ name: "asc" }],
  });
  return data as ProductTypeType[];
}

export async function getProductById(id: string, sbUser: User) {
  if (id === "new") {
    return {
      id: "new",
      name: "",
      description: "",
      unitOfMeasure: "each",
      price: "",
      productType: "",
      productTypeId: "",
      services: [],
      prices: [],
    } as ProductItemsType;
  }
  const data = await authenticatedPrismaClient(sbUser).product.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      unitOfMeasure: true,
      productType: true,
      prices: {
        select: {
          price: true,
          effectiveDate: true,
        },
      },
      services: {
        select: {
          id: true,
          serviceId: true,
          quantity: true,
          trackingType: true,
        },
        orderBy: {
          service: {
            name: "asc",
          },
        },
      },
    },
  });
  return {
    ...data,
    productTypeId: data?.productType.id,
    productType: data?.productType.name,
    services:
      data?.services && data?.services.length > 0
        ? data?.services.map((service) => {
            return {
              // id: service.id,
              serviceId: service.serviceId,
              trackingType: service.trackingType,
              qty: service.quantity,
            };
          })
        : [],
    // prices: data?.prices.map((price) => ({
    //   effectiveDate: price.effectiveDate.toISOString(),
    //   price: price.price,
    // })),
  };
}

export async function createProduct(
  product: Partial<ProductItemsType>,
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).product.create({
    data: {
      name: product.name ?? "",
      description: product.description,
      unitOfMeasure: product.unitOfMeasure ?? UnitOfMeasure.each,
      productType: {
        connect: {
          id: product.productTypeId,
        },
      },
    },
  });
  return data;
}

export async function updateProduct(
  product: Partial<ProductItemsType>,
  sbUser: User,
) {
  // console.log(product);
  invariantResponse(product.id, "product id is required");
  const data = await authenticatedPrismaClient(sbUser).product.update({
    where: {
      id: product.id,
    },
    data: {
      name: product.name,
      description: product.description ?? "",
      unitOfMeasure: product.unitOfMeasure,
      productType: {
        connect: {
          id: product.productTypeId,
        },
      },
    },
  });

  await updateServiceProducts(
    { id: product.id, services: product.services },
    sbUser,
  );
  return data;
}

export async function updateServiceProducts(
  {
    id,
    services,
  }: {
    id: string;
    services?: ProductOnServiceType[];
  },
  sbUser: User,
) {
  // console.log("products", products);
  if (Array.isArray(services)) {
    for (let i = 0; i < services.length; i++) {
      if (!services[i].serviceId) return;
      await authenticatedPrismaClient(sbUser).productsOnServices.upsert({
        where: {
          uq_ps_product_id_service_id: {
            serviceId: services[i].serviceId || "",
            productId: id,
          },
        },
        update: {
          trackingType: services[i].trackingType as TrackingType,
          quantity: services[i].qty,
        },
        create: {
          serviceId: services[i].serviceId || "",
          productId: id,
          trackingType: services[i].trackingType as TrackingType,
          quantity: services[i].qty,
        },
      });
    }
  }
  //remove forms not in forms array
  await authenticatedPrismaClient(sbUser).productsOnServices.deleteMany({
    where: {
      productId: id,
      NOT: {
        serviceId: {
          in: services?.map((service) => service.serviceId || ""),
        },
      },
    },
  });
}

export async function deleteProduct(id: string, sbUser: User) {
  const data = await authenticatedPrismaClient(sbUser).product.delete({
    where: {
      id: id,
    },
  });
  return data;
}

export const createProductType = async (
  name: string,
  sbUser: User,
  demo: boolean = false,
) => {
  const productType = await authenticatedPrismaClient(
    sbUser,
  ).productType.findFirst({
    where: {
      name,
    },
  });
  if (productType) {
    return productType;
  }

  return await authenticatedPrismaClient(sbUser).productType.create({
    data: {
      name,
      demo,
    },
  });
};

export function getUnitsOfMeasure() {
  return Object.values(UnitOfMeasure).map((unit) => ({
    id: unit,
    name: unit,
  }));
}

// export async function getLocationProducts(locationId: string, sbUser: User) {
//   const data = await authenticatedPrismaClient(sbUser).product.findMany({
//     where: {
//       prices: {
//         some: {
//           locationId: locationId,
//         },
//       },
//     },
//     select: {
//       id: true,
//       name: true,
//       description: true,
//       unitOfMeasure: true,
//       productType: true,
//       prices: {
//         select: {
//           price: true,
//           location: {
//             select: {
//               name: true,
//             },
//           },
//         },
//       },
//     },
//     orderBy: [{ name: "asc" }],
//   });
//   return data as ProductsItemsType;
// }
