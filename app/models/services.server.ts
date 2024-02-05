import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import { Prisma } from "~/db.server.ts";
import {
  TrackingType,
  type ProductOnServiceType,
  type ThenArg,
} from "~/utils/types.ts";

import { getLocationDefault } from "./user.default.server.ts";
import type { ServiceMemberSchemaType } from "~/components/form-controls/service-members/serviceMemberSchema.ts";
// import { ServiceAddonSchemaType } from "~/components/form-controls/service-addon/serviceAddonSchema.ts";

export type EntityServicesType = {
  id: string;
  name: string;
  locationId: string;
  location: string;
};
//  ThenArg<ReturnType<typeof getEntityServices>>;
export async function getEntityServices(sbUser: User) {
  const data = await authenticatedPrismaClient(sbUser).service.findMany({
    select: {
      id: true,
      name: true,
      locations: {
        select: {
          location: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  return data.map(
    (service: {
      id: string;
      name: string;
      locations: {
        location: {
          id: string;
          name: string;
        };
      }[];
    }) => {
      const { id, name, locations } = service;
      return {
        id,
        name,
        locations: locations.map((location) => {
          const { id, name } = location.location;
          return { id, name };
        }),
      };
    },
  );
}

type _textTemplateType = {
  textTemplate: {
    id: string;
    name: string;
  };
};

type _ServiceItemType = {
  id: string;
  name: string;
  textTemplates: _textTemplateType[];
};
type _ServiceItemsType = _ServiceItemType[];

export type ServiceItemsType = ThenArg<ReturnType<typeof getLocationServices>>;
export async function getLocationServices(locationId: string, sbUser: User) {
  const data = (await authenticatedPrismaClient(sbUser).service.findMany({
    where: {
      locations: {
        some: {
          locationId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      textTemplates: {
        select: {
          textTemplate: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  })) as _ServiceItemsType;
  return data.map((service) => {
    const { id, name, textTemplates } = service;
    return {
      id,
      name,
      textTemplates: textTemplates.map((textTemplate) => {
        const { id, name } = textTemplate.textTemplate;
        return { id, name };
      }),
    };
  });
  //     services: {
  //       select: {
  //         id: true,
  //         name: true,
  //       },
  //     },
  //   },
  // });
  // return data
  //   .map((service) => {
  //     const { services } = service;
  //     return services.map((obj) => obj);
  //   })
  //   .flat(1);
}

export type ServiceAndFormItemsType = ThenArg<
  ReturnType<typeof getServicesAndForms>
>;
// type initialServiceAndFormType = {
//   id: string;
//   name: string;
//   color: string;
//   locations: {
//     id: string;
//     name: string;
//   }[];
//   forms: {
//     form: {
//       id: string;
//       name: string;
//       formDefinition: Prisma.JsonValue;
//     };
//   }[];
// };

export async function getServicesAndForms(sbUser: User) {
  const userLocationId = await getLocationDefault(sbUser.id, sbUser);
  const data = await authenticatedPrismaClient(sbUser).service.findMany({
    select: {
      id: true,
      name: true,
      color: true,
      textColor: true,
      locations: {
        select: {
          location: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      // forms: {
      //   select: {
      //     form: {
      //       select: {
      //         id: true,
      //         name: true,
      //         formDefinition: true,
      //       },
      //     },
      //   },
      // },
    },
    where: {
      locations: {
        some: {
          locationId: {
            equals: userLocationId,
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return data.map((service) => {
    const { id, name, color, locations, textColor } = service;
    return {
      id,
      name,
      color,
      textColor,
      location: locations[0].location,
      // forms: forms.map((form) => {
      //   const { id, name } = form.form;

      //   return {
      //     id,
      //     name,
      //   };
      // }),
    };
  });

  //return data;

  // //Get FormIds into an array
  // const formIds = data.reduce((acc: string[], curr) => {
  //   return [...acc, ...curr.forms.map((form) => form.form.id)];
  // }, []);

  // //create missing form data for formIds
  // for (const formId of formIds) {
  //   await prisma.formData.upsert({
  //     where: {
  //       formId_objectId_objectType: {
  //         formId,
  //         objectId,
  //         objectType: area,
  //       },
  //     },
  //     create: {
  //       formId,
  //       objectType: area,
  //       objectId,
  //       data: Prisma.JsonNull,
  //     },
  //     update: {},
  //   });
  // }

  //Get the form data for each formId
  // const formDataRecords = await prisma.formData.findMany({
  //   where: {
  //     formId: {
  //       in: formIds,
  //     },
  //     objectType: area,
  //     objectId,
  //   },
  //   select: {
  //     formId: true,
  //     data: true,
  //   },
  // });

  // const areaCustomFields = await getAreaCustomFields({ area });
  // const areaFields = getAreaFields(area);
  //console.log("formDataRecords", formDataRecords);

  // const processedFormDefinitions = data
  //   .map((service) => {
  //     const { forms } = service;
  //     return forms.map((form) => {
  //       const { formDefinition } = form.form;
  //       return {
  //         formId: form.form.id,
  //         formDefinition: processSavedFormDefinition(
  //           formDefinition as FormDefinition,
  //           areaFields,
  //           areaCustomFields
  //         ),
  //       };
  //     });
  //   })
  //   .flat(1);
  //console.log("processedFormDefinitions", processedFormDefinitions);

  //   record = { ...record, ...formDefinition.formData };
  //   if (record.formData && typeof record.formData === "object") {
  //     record = { ...record, ...record.formData };
  //     record.formData = Prisma.JsonNull;
  //   }

  // const processedFormData = formDataRecords.map((formDataRecord) => {
  //   const { formId, data } = formDataRecord;
  //   const processedForm = processedFormDefinitions.find(
  //     (fd) => fd.formId === formId
  //   );

  //   if (data && typeof data === "object" && processedForm)
  //     return {
  //       formId,
  //       formData: { ...processedForm.formDefinition.formData, ...data },
  //     };
  //   else if (processedForm) {
  //     return {
  //       formId,
  //       formData: processedForm.formDefinition.formData,
  //     };
  //   }
  //   return {
  //     formId,
  //     formData: data,
  //   };
  // });
  //console.log("processedFormData", processedFormData);

  // return data.map((service) => {
  //   const { id, name, location, forms } = service;
  //   return {
  //     id,
  //     name,
  //     locationId: location.id,
  //     location: location.name,
  //     forms: forms.map((form) => {
  //       const { id, name } = form.form;

  //       return {
  //         id,
  //         name,
  //         formDefinition: processedFormDefinitions.find(
  //           (fd) => fd.formId === id
  //         )?.formDefinition,
  //         formData: processedFormData.find((fd) => fd.formId === id)?.formData,
  //       };
  //     }),
  //   };
  // });
  //     services: {
  //       select: {
  //         id: true,
  //         name: true,
  //       },
  //     },
  //   },
  // });
  // return data
  //   .map((service) => {
  //     const { services } = service;
  //     return services.map((obj) => obj);
  //   })
  //   .flat(1);
}

// export type ServiceTextItemsType = ThenArg<ReturnType<typeof getServicesTexts>>;
// export async function getServicesTexts({
//   entityId,
// }: {
//   entityId: Entity["id"];
// }) {
//   const data = await prisma.location.findMany({
//     where: { entityId },
//     select: {
//       services: {
//         select: {
//           id: true,
//           name: true,
//           location: {
//             select: {
//               id: true,
//               name: true,
//             },
//           },
//           textTemplates: {
//             select: {
//               textTemplate: {
//                 select: {
//                   id: true,
//                   name: true,
//                 },
//               },
//             },
//           },
//         },
//         orderBy: {
//           name: "asc",
//         },
//       },
//     },
//   });
//   return data
//     .map((service) => {
//       const { services } = service;
//       return services.map((obj) => {
//         return {
//           id: obj.id,
//           name: obj.name,
//           location: obj.location.name,
//           textTemplates: obj.textTemplates.map((textTemplate) => {
//             const { id, name } = textTemplate.textTemplate;
//             return { id, name };
//           }),
//         };
//       });
//     })
//     .flat(1);
// }

export type GroupedServicesType = {
  id: string;
  name: string;
  color?: string;
  textColor?: string;
};

export type GroupedServicesAndCategoriesType = {
  id: string;
  name: string;
  color: string;
  textColor: string;
  services: GroupedServicesType[];
};
export async function getGroupedServicesAndCategories(sbUser: User) {
  const userLocationId = await getLocationDefault(sbUser.id, sbUser);
  if (userLocationId === "new") return [];
  // console.log("userLocationId", userLocationId);
  const data = await authenticatedPrismaClient(sbUser).category.findMany({
    where: {
      services: {
        some: {
          locations: {
            some: {
              locationId: {
                equals: userLocationId,
              },
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      color: true,
      textColor: true,
      services: {
        select: {
          id: true,
          name: true,
          color: true,
          textColor: true,
        },
        where: {
          locations: {
            some: {
              locationId: {
                equals: userLocationId,
              },
            },
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  }); // as initialServiceAndFormType[];

  // console.log("service data", userLocationId, data);

  const categories = data.map((category) => {
    const { id, name, color, services } = category;
    return {
      id,
      name,
      color,
      textColor: category.textColor,
      services: services
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase()),
        )
        .map((service) => {
          const { id, name, color, textColor } = service;
          return {
            id,
            name,
            color,
            textColor,
          };
        }),
    };
  });

  // console.log("categories", categories);
  return categories as GroupedServicesAndCategoriesType[];
}

// type form = {
//   formId: string;
// };
type user = {
  userId: string;
};

type ServiceAddonType = {
  isAddon: boolean;
  addonPrice?: Prisma.Decimal | number;
  addonDuration?: string;
  addonTimeMargin?: string;
  servicesAddon: string[];
};

export type ServiceItemType = {
  id: string;
  name: string;
  categoryId: string;
  color: string;
  textColor: string;
  description: string | null;
  duration: string;
  locations: string[];
  maximumConcurrentBookings: number;
  price: Prisma.Decimal;
  timeMargin: string | null;
  products: ProductOnServiceType[];
  consents: string[];
  users: user[];
  addon: ServiceAddonType;
  category: {
    color: string;
    textColor: string;
  };
};
export async function getServiceById({ id }: { id: string }, sbUser: User) {
  if (id === "new") {
    return {
      id: "new",
      name: "",
      categoryId: "",
      color: "#FFFFFF",
      textColor: "#000000",
      description: "",
      duration: "",
      // forms: [],
      locations: [],
      maximumConcurrentBookings: 0,
      price: new Prisma.Decimal(0),
      timeMargin: "",
      users: [],
      products: [],
      consents: [],
      category: {
        color: "#FFFFFF",
        textColor: "#000000",
      },
      addon: {
        isAddon: false,
        servicesAddon: [],
      },
    } as ServiceItemType;
  }

  const data = await authenticatedPrismaClient(sbUser).service.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      categoryId: true,
      color: true,
      textColor: true,
      description: true,
      duration: true,
      //formId: true,
      products: {
        select: {
          productId: true,
          trackingType: true,
          quantity: true,
        },
        orderBy: {
          product: {
            name: "asc",
          },
        },
      },
      locations: {
        select: {
          locationId: true,
        },
      },

      maximumConcurrentBookings: true,
      price: true,
      timeMargin: true,
      users: {
        select: {
          userId: true,
        },
      },
      // forms: {
      //   select: {
      //     formId: true,
      //   },
      // },
      category: {
        select: {
          color: true,
          textColor: true,
        },
      },
      isAddon: true,
      addonPrice: true,
      addonDuration: true,
      addonTimeMargin: true,
      servicesAddon: {
        select: {
          serviceId: true,
        },
      },
      consents: {
        select: {
          formId: true,
        },
      },
    },
  });
  if (!data) return null;
  const users =
    data.users.length > 0
      ? data.users.map((user) => {
          return { userId: user.userId };
        })
      : [];
  // const forms =
  //   data.forms.length > 0 ? data.forms.map((form) => form.formId) : [];
  const consents =
    data.consents.length > 0
      ? data.consents.map((consent) => consent.formId)
      : [];
  const products =
    data.products.length > 0
      ? data.products.map((product) => {
          return {
            productId: product.productId,
            trackingType:
              product.trackingType === TrackingType.UNIT ? "on" : null,
            qty: product.quantity,
          };
        })
      : [];
  const locations =
    data.locations.length > 0
      ? data.locations.map((location) => location.locationId)
      : [];

  return {
    ...data,
    users,
    // forms,
    products,
    consents,
    locations,
    color: data.color,
    textColor: data.textColor,
    addon: {
      isAddon: data.isAddon,
      addonPrice: data.addonPrice,
      addonDuration: data.addonDuration,
      addonTimeMargin: data.addonTimeMargin,
      servicesAddon: data.servicesAddon.map((service) => service.serviceId),
    },
  } as ServiceItemType;
}

export async function addService(
  {
    name,
    categoryId,
    color,
    textColor,
    duration,
    locations,
    maximumConcurrentBookings,
    price,
    timeMargin,
    users,
    forms,
    products,
    consents,
  }: {
    name: string;
    categoryId: string;
    color: string;
    textColor: string;
    duration: string;
    locations: string[];
    maximumConcurrentBookings: number;
    price: number;
    timeMargin: string | null;
    users?: ServiceMemberSchemaType[];
    forms?: string[];
    products?: ProductOnServiceType[];
    consents?: string[];
  },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).service.create({
    data: {
      name,
      categoryId,
      color,
      textColor,
      duration,
      entityId: sbUser.user_metadata.entityId,
      maximumConcurrentBookings,
      price,
      timeMargin,
    },
  });

  await Promise.all([
    changeDemoCategory({ id: categoryId }, sbUser),
    updateServiceLocations({ id: data.id, locations }, sbUser),
    // updateServiceForms({ id: data.id, forms }, sbUser),
    updateServiceProducts({ id: data.id, products }, sbUser),
    updateServiceUsers({ id: data.id, users }, sbUser),
    updateServiceConsents({ id: data.id, consents }, sbUser),
  ]);

  return await getServiceById({ id: data.id }, sbUser);
}
export async function updateService(
  {
    id,
    name,
    categoryId,
    color,
    textColor,
    duration,
    locations,
    maximumConcurrentBookings,
    price,
    timeMargin,
    users,
    forms,
    products,
    consents,
    addon,
  }: {
    id: string;
    name: string;
    categoryId: string;
    color: string;
    textColor: string;
    duration: string;
    locations: string[];
    maximumConcurrentBookings: number;
    price: number;
    timeMargin: string | null;
    users?: ServiceMemberSchemaType[];
    forms?: string[];
    products?: ProductOnServiceType[];
    consents?: string[];
    addon: ServiceAddonType;
  },
  sbUser: User,
) {
  try {
    const data = await authenticatedPrismaClient(sbUser).service.update({
      where: { id },
      data: {
        name,
        categoryId,
        color,
        textColor,
        duration,
        maximumConcurrentBookings,
        price,
        timeMargin,
        isAddon: addon.isAddon,
        addonPrice: addon.addonPrice,
        addonDuration: addon.addonDuration,
        addonTimeMargin: addon.addonTimeMargin,
      },
    });

    await Promise.all([
      changeDemoCategory({ id: categoryId }, sbUser),
      updateServiceLocations({ id: data.id, locations }, sbUser),
      // updateServiceForms({ id: data.id, forms }, sbUser),
      updateServiceProducts({ id: data.id, products }, sbUser),
      updateServiceUsers({ id: data.id, users }, sbUser),
      updateServiceConsents({ id: data.id, consents }, sbUser),
    ]);

    return {
      // service: await getServiceById({ id: data.id }, sbUser),
      successful: true,
    };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

async function updateServiceLocations(
  {
    id,
    locations,
  }: {
    id: string;
    locations?: string[];
  },
  sbUser: User,
) {
  if (Array.isArray(locations)) {
    for (let i = 0; i < locations.length; i++) {
      await authenticatedPrismaClient(sbUser).servicesOnLocations.upsert({
        where: {
          serviceId_locationId: {
            locationId: locations[i],
            serviceId: id,
          },
        },
        update: {},
        create: {
          locationId: locations[i],
          serviceId: id,
        },
      });
    }
  }

  //remove locations not in locations array
  await authenticatedPrismaClient(sbUser).servicesOnLocations.deleteMany({
    where: {
      serviceId: id,
      NOT: {
        locationId: {
          in: locations,
        },
      },
    },
  });

  //update service demo if more than 0 locations are not demo
  const nonDemoLocations = await authenticatedPrismaClient(
    sbUser,
  ).location.count({
    where: {
      id: {
        in: locations,
      },
      demo: false,
    },
  });
  await authenticatedPrismaClient(sbUser).service.update({
    where: { id },
    data: {
      demo: nonDemoLocations === 0,
    },
  });

  //update any LettersOfConsent that are linked to this service
  // const lettersOfConsent = await authenticatedPrismaClient(
  //   sbUser,
  // ).letterOfConsent.findMany({
  //   where: {
  //     services: {
  //       some: {
  //         serviceId: id,
  //       },
  //     },
  //   },
  //   select: {
  //     id: true,
  //   },
  // });
  // await authenticatedPrismaClient(sbUser).letterOfConsent.updateMany({
  //   where: {
  //     id: {
  //       in: lettersOfConsent.map((letter) => letter.id),
  //     },
  //   },
  //   data: {
  //     demo: nonDemoLocations === 0,
  //   },
  // });
}

async function updateServiceUsers(
  {
    id,
    users,
  }: {
    id: string;
    users?: ServiceMemberSchemaType[];
  },
  sbUser: User,
) {
  if (Array.isArray(users)) {
    for (let i = 0; i < users.length; i++) {
      await authenticatedPrismaClient(sbUser).usersOnServices.upsert({
        where: {
          userId_serviceId: {
            userId: users[i].userId,
            serviceId: id,
          },
        },
        update: {},
        create: {
          userId: users[i].userId,
          serviceId: id,
        },
      });
    }
  }

  //remove users not in users array
  await authenticatedPrismaClient(sbUser).usersOnServices.deleteMany({
    where: {
      serviceId: id,
      NOT: {
        userId: {
          in: users?.map((user) => user.userId),
        },
      },
    },
  });
}

// async function updateServiceForms(
//   {
//     id,
//     forms,
//   }: {
//     id: string;
//     forms?: string[];
//   },
//   sbUser: User,
// ) {
//   if (Array.isArray(forms)) {
//     for (let i = 0; i < forms.length; i++) {
//       await authenticatedPrismaClient(sbUser).formsOnServices.upsert({
//         where: {
//           formId_serviceId: {
//             formId: forms[i],
//             serviceId: id,
//           },
//         },
//         update: {},
//         create: {
//           formId: forms[i],
//           serviceId: id,
//         },
//       });
//     }
//   }
//   //remove forms not in forms array
//   await authenticatedPrismaClient(sbUser).formsOnServices.deleteMany({
//     where: {
//       serviceId: id,
//       NOT: {
//         formId: {
//           in: forms,
//         },
//       },
//     },
//   });
// }

export async function updateServiceProducts(
  {
    id,
    products,
  }: {
    id: string;
    products?: ProductOnServiceType[];
  },
  sbUser: User,
) {
  // console.log("products", products);
  if (Array.isArray(products)) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].productId !== undefined) {
        await authenticatedPrismaClient(sbUser).productsOnServices.upsert({
          where: {
            uq_ps_product_id_service_id: {
              productId: products[i].productId || "",
              serviceId: id,
            },
          },
          update: {
            trackingType: products[i].trackingType as TrackingType,
            quantity: products[i].qty,
          },
          create: {
            productId: products[i].productId || "",
            serviceId: id,
            trackingType: products[i].trackingType as TrackingType,
            quantity: products[i].qty,
          },
        });
      }
    }
  }
  //remove forms not in forms array
  await authenticatedPrismaClient(sbUser).productsOnServices.deleteMany({
    where: {
      serviceId: id,
      NOT: {
        productId: {
          in: products?.map((product) => product.productId || ""),
        },
      },
    },
  });
}

async function changeDemoCategory(
  {
    id,
  }: {
    id: string;
  },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).category.update({
    where: { id },
    data: {
      demo: false,
    },
  });
  return data;
}

async function updateServiceConsents(
  {
    id,
    consents,
  }: {
    id: string;
    consents?: string[];
  },
  sbUser: User,
) {
  if (Array.isArray(consents)) {
    for (let i = 0; i < consents.length; i++) {
      await authenticatedPrismaClient(sbUser).consentsOnServices.upsert({
        where: {
          formId_serviceId: {
            formId: consents[i],
            serviceId: id,
          },
        },
        update: {},
        create: {
          serviceId: id,
          formId: consents[i],
        },
      });
    }
  }
  //remove letters not in letters array
  await authenticatedPrismaClient(sbUser).consentsOnServices.deleteMany({
    where: {
      serviceId: id,
      NOT: {
        formId: {
          in: consents,
        },
      },
    },
  });
}
