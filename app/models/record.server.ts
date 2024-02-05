import type { User } from "@supabase/supabase-js";
import type { SavedFormDefinition } from "~/components/draggable-forms-editor/schemas/saved-form-schema";
// import {
//   getAreaFields,
//   getWorkingFormDefinitionFromSaved,
// } from "~/components/draggable-forms-editor/formUtils.ts";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import type { Record, Service } from "~/db.server.ts";
import { Prisma, prisma } from "~/db.server.ts";
import type { ImageUploadDataType, ThenArg } from "~/utils/types.ts";

// import { getAreaCustomFields } from "./field.server.ts";

//import { captureException } from "@sentry/remix"; // whatever package you're using

//export type RecordItemType = ThenArg<ReturnType<typeof createRecord>>;
export async function createRecord({
  clientId,
  title,
  userId,
  locationId,
  //formId,
  //formData,
  datetime,
}: {
  clientId: Record["clientId"];
  title: Record["title"];
  userId: Record["userId"];
  locationId: Record["locationId"];
  //formId: Record["formId"];
  //formData: Record["formData"];
  datetime: Record["datetime"];
}) {
  const record = await prisma.record.create({
    data: {
      title,
      //formData: formData != null ? formData : Prisma.JsonNull,
      //formId,
      datetime,
      user: {
        connect: {
          id: userId,
        },
      },
      location: {
        connect: {
          id: locationId,
        },
      },
      client: {
        connect: {
          id: clientId,
        },
      },
      creator: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return record;
}

export type RecordAndServicesByRecordIdType = {
  record: RecordByIdType;
  services: {
    id: string;
    name: string;
    location: string;
    forms: {
      id: string;
      name: string;
      formDefinition: SavedFormDefinition | undefined;
      formData: Prisma.JsonValue | undefined;
    }[];
  }[];
};

export type RecordServiceType = {
  actualCost: Prisma.Decimal;
  actualDuration: number | null;
  serviceCost: Prisma.Decimal;
  serviceDuration: number | null;
  //  service: ServiceType;
  id: string;
  name: string;
  location: string;
  forms: ServiceFormType[];
};

export type ServiceFormType = {
  id: string;
  name: string;
  formDefinition: SavedFormDefinition;
  // formData: {};
};

export type RecordByIdType = {
  id: Record["id"];
  datetime: string;
  totalCost: Record["totalCost"];
  totalDuration: Record["totalDuration"];
  bloodPressure: Record["bloodPressure"];
  clientId: Record["clientId"];
  userId: Record["userId"];

  locationId: Record["locationId"];
  location: string;
  user: {
    firstName: string;
    lastName: string;
  };
  services: RecordServiceType[];
};

export async function getRecordAndServicesByRecordId(
  { id }: { id: Record["id"] },
  sbUser: User,
) {
  //console.log("getRecordById", id);
  if (id === "new") {
    return {
      record: {
        id: "new",
        //title: "",
        datetime: new Date().toISOString(),
        //description: "",
        totalCost: new Prisma.Decimal(0),
        totalDuration: 0,
        bloodPressure: "",
        clientId: "",
        userId: "",
        user: { firstName: "", lastName: "" },
        locationId: "",
        location: "",
        services: [] as RecordServiceType[],
      } as RecordByIdType,
      services: [] as RecordServiceType[],
    };
  }

  const recordData = await authenticatedPrismaClient(sbUser).record.findUnique({
    where: { id },
    select: {
      id: true,
      datetime: true,
      totalCost: true,
      totalDuration: true,
      bloodPressure: true,
      clientId: true,
      userId: true,
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      locationId: true,
      location: {
        select: {
          name: true,
        },
      },
      services: {
        select: {
          actualCost: true,
          actualDuration: true,
          serviceCost: true,
          serviceDuration: true,
          service: {
            select: {
              id: true,
              name: true,
              // location: {
              //   select: {
              //     id: true,
              //     name: true,
              //   },
              // },
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
          },
        },
      },
    },
  });

  // as (Product & {
  //   productType: ProductType;
  //   prices: ProductPrice[];
  // })[];

  if (!recordData) {
    throw new Error("Record not found");
  }
  const record = {
    ...recordData,
    datetime: recordData.datetime.toISOString(),
    location: recordData.location.name,
    locationId: recordData.locationId,
    services: recordData.services.map((s) => {
      const {
        actualCost,
        actualDuration,
        serviceCost,
        serviceDuration,
        service,
      } = s;
      return {
        actualCost,
        actualDuration,
        serviceCost,
        serviceDuration,

        id: service.id,
        name: service.name,
        // location: service.location.name,
        // forms: service.forms.map((form) => {
        //   const { id, name, formDefinition } = form.form;
        //   return {
        //     id,
        //     name,
        //     formDefinition,
        //   };
        // }),
      };
    }),
  } as RecordByIdType;

  // const area = "ClientRecord";

  const recordServices = recordData.services.map((service) => {
    const { id, name } = service.service;
    const { actualCost, actualDuration, serviceCost, serviceDuration } =
      service;

    return {
      id,
      name,
      actualCost,
      actualDuration,
      serviceCost,
      serviceDuration,
      location,
      // forms,
    };
  });

  //Get FormIds into an array
  // const formIds = recordData.services.reduce((acc: string[], curr) => {
  //   return [...acc, ...curr.service.forms.map((form) => form.form.id)];
  // }, []);

  //create missing form data for formIds
  // for (const formId of formIds) {
  //   await prisma.formData.upsert({
  //     where: {
  //       formId_objectId_objectType: {
  //         formId,
  //         objectId: id,
  //         objectType: area,
  //       },
  //     },
  //     create: {
  //       formId,
  //       objectType: area,
  //       objectId: id,
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
  //     objectId: id,
  //   },
  //   select: {
  //     id: true,
  //     formId: true,
  //     data: true,
  //   },
  // });

  // const areaCustomFields = await getAreaCustomFields({ area }, sbUser);
  // const areaFields = getAreaFields(area);
  //console.log("formDataRecords", formDataRecords);

  // const workingFormDefinitions = recordData.services
  //   .map((service) => {
  //     const { forms } = service.service;
  //     return forms.map((form) => {
  //       const { formDefinition } = form.form;
  //       return {
  //         formId: form.form.id,
  //         formDefinition: getWorkingFormDefinitionFromSaved(
  //           formDefinition as SavedFormDefinition,
  //           areaFields,
  //           areaCustomFields,
  //           form.form.id,
  //           area as AreaType,
  //         ),
  //       };
  //     });
  //   })
  //   .flat(1);

  // const processedFormData = formDataRecords.map((formDataRecord) => {
  //   const { formId, data, id: dataId } = formDataRecord;
  //   const workingForm = workingFormDefinitions.find(
  //     (fd) => fd.formId === formId,
  //   );

  //   if (data && typeof data === "object" && workingForm)
  //     return {
  //       formId,
  //       formData: {
  //         id: dataId,
  //         ...(workingForm && workingForm.formDefinition
  //           ? workingForm.formDefinition.usedFormFields
  //           : null),
  //         ...data,
  //       },
  //     };
  //   else if (workingForm) {
  //     return {
  //       formId,
  //       formData: {
  //         id: dataId,
  //         ...(workingForm && workingForm.formDefinition
  //           ? workingForm.formDefinition.usedFormFields
  //           : null),
  //       },
  //     };
  //   }
  //   return {
  //     formId,
  //     formData: data,
  //   };
  // });

  return {
    record,
    services: recordServices.map((service) => {
      const {
        id,
        name,
        // forms,
        location,
        actualCost,
        actualDuration,
        serviceCost,
        serviceDuration,
      } = service;
      return {
        id,
        name,
        actualCost,
        actualDuration,
        serviceCost,
        serviceDuration,
        location: location,
        // forms: forms.map((form) => {
        //   const { id, name } = form.form;

        //   return {
        //     id,
        //     name,
        //     formDefinition: workingFormDefinitions.find(
        //       (fd) => fd.formId === id,
        //     )?.formDefinition,
        //     formData: processedFormData.find((fd) => fd.formId === id)
        //       ?.formData,
        //   };
        // }),
      };
    }),
  };
}

// export type RecordAndServicesByRecordIdType = {
//   record: RecordByIdType;
//   services: {
//     id: string;
//     name: string;
//     location: string;
//     forms: {
//       id: string;
//       name: string;
//       formDefinition: SavedFormDefinition;
//       formData: Prisma.JsonValue;
//     }[];
//   }[];
// };

export type ServiceOnRecordType = {
  id: string;
  name: string;
  color: string;
  actualCost: number;
  actualDuration: number | null;
  serviceCost: number;
  serviceDuration: number | null;
};

export type GetRecordsItemType = {
  id: Record["id"];
  datetime: string;
  totalCost: number;
  totalDuration: Record["totalDuration"];
  bloodPressure: Record["bloodPressure"];
  location: string;
  user: {
    firstName: string;
    lastName: string;
    avatarData: ImageUploadDataType | null;
  };

  services: ServiceOnRecordType[];
};

export type RecordItemsType = ThenArg<ReturnType<typeof getRecords>>;

type RecordItemsType2 = {
  id: Record["id"];
  datetime: Record["datetime"];
  totalCost: Record["totalCost"];
  totalDuration: Record["totalDuration"];
  bloodPressure: Record["bloodPressure"];
  location: {
    name: string;
  };
  user: {
    firstName: string;
    lastName: string;
  };
  services: {
    actualCost: Prisma.Decimal;
    actualDuration: number | null;
    serviceCost: Prisma.Decimal;
    serviceDuration: number | null;
    service: {
      id: string;
      name: string;
      color: string;
    };
  }[];
};

export async function getRecords(
  {
    clientId,
  }: {
    clientId: Record["clientId"];
  },
  sbUser: User,
) {
  const records = (await authenticatedPrismaClient(sbUser).record.findMany({
    where: { clientId },
    select: {
      id: true,
      datetime: true,
      totalCost: true,
      totalDuration: true,
      bloodPressure: true,
      location: {
        select: {
          name: true,
        },
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
          avatarData: true,
        },
      },
      services: {
        select: {
          actualCost: true,
          actualDuration: true,
          serviceCost: true,
          serviceDuration: true,
          service: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
        },
      },
    },
  })) as RecordItemsType2[];

  return records.map((record) => {
    const {
      id,
      datetime,
      totalCost,
      totalDuration,
      bloodPressure,
      location,
      user,
      services,
    } = record;
    return {
      id,
      datetime: datetime.toISOString(),
      totalCost: Number(totalCost),
      totalDuration,
      bloodPressure,
      location: location.name,
      user,
      services: services.map((service) => {
        const { id, name, color } = service.service;
        const { actualCost, actualDuration, serviceCost, serviceDuration } =
          service;
        return {
          id,
          name,
          color,
          actualCost: Number(actualCost),
          actualDuration,
          serviceCost: Number(serviceCost),
          serviceDuration,
        };
      }),
    };
  });
}

export type AddUpdateRecordItemType = ThenArg<ReturnType<typeof addEditRecord>>;
export async function addEditRecord(
  {
    id,
    clientId,
    userId,
    locationId,
    datetime,
    //title,
    //description,
    totalCost,
    totalDuration,
    bloodPressure,
  }: {
    id: Record["id"];
    clientId: Record["clientId"];
    userId: Record["userId"];
    locationId: Record["locationId"];
    datetime: Record["datetime"];
    //title: Record["title"];
    //description: Record["description"];
    totalCost: Record["totalCost"] | number;
    totalDuration: Record["totalDuration"];
    bloodPressure?: Record["bloodPressure"];
  },
  sbUser: User,
) {
  if (id === "new") {
    const newRecord = await authenticatedPrismaClient(sbUser).record.create({
      data: {
        //title,
        //description,
        datetime,
        totalCost,
        totalDuration,
        bloodPressure,
        user: {
          connect: {
            id: userId,
          },
        },
        location: {
          connect: {
            id: locationId,
          },
        },
        client: {
          connect: {
            id: clientId,
          },
        },
        creator: {
          connect: {
            id: sbUser.id,
          },
        },
      },
    });
    return newRecord;
  } else {
    console.log("updateRecord", id);
    const updatedRecord = await authenticatedPrismaClient(sbUser).record.update(
      {
        where: { id },
        data: {
          //title,
          //description,
          datetime,
          totalCost,
          totalDuration,
          bloodPressure,
          // user: {
          //   connect: {
          //     id: userId,
          //   },
          // },
          // location: {
          //   connect: {
          //     id: locationId,
          //   },
          // },
          // client: {
          //   connect: {
          //     id: clientId,
          //   },
          // },
        },
      },
    );
    return updatedRecord;
  }
}
const durationStringToNumber = (value?: string) => {
  if (!value) return 0;
  const [hours, minutes] = value.split(":");
  return Number(hours) * 60 + Number(minutes);
};

export type UpdateRecordServicesType = ThenArg<
  ReturnType<typeof updateRecordServices>
>;

export async function updateRecordServices(
  {
    id,
    services,
  }: {
    id: Record["id"];
    services: string;
  },
  sbUser: User,
) {
  if (services !== "") {
    const servicesArray = services.trim().split(";");
    const servicesObjects = (await authenticatedPrismaClient(
      sbUser,
    ).service.findMany({
      where: {
        id: {
          in: servicesArray.map((service) => service),
        },
      },
      select: {
        id: true,
        price: true,
        duration: true,
      },
    })) as Service[];

    const record = await authenticatedPrismaClient(sbUser).record.update({
      where: { id },
      data: {
        services: {
          deleteMany: {
            serviceId: {
              notIn: servicesArray.map((serviceId) => serviceId),
            },
          },
          upsert: servicesArray.map((service) => {
            return {
              where: {
                serviceId_recordId: {
                  recordId: id,
                  serviceId: service,
                },
              },
              create: {
                service: {
                  connect: {
                    id: service,
                  },
                },
                serviceCost: servicesObjects.find(
                  (serviceObject) => serviceObject.id === service,
                )?.price,
                serviceDuration: durationStringToNumber(
                  servicesObjects.find(
                    (serviceObject) => serviceObject.id === service,
                  )?.duration,
                ),
                actualCost: servicesObjects.find(
                  (serviceObject) => serviceObject.id === service,
                )?.price,
                actualDuration: durationStringToNumber(
                  servicesObjects.find(
                    (serviceObject) => serviceObject.id === service,
                  )?.duration,
                ),
              },

              update: {
                service: {
                  connect: {
                    id: service,
                  },
                },
              },
            };
          }),
        },
      },
    });
    return record;
  } else {
    const record = await authenticatedPrismaClient(sbUser).record.update({
      where: { id },
      data: {
        services: {
          deleteMany: {
            serviceId: {
              notIn: [],
            },
          },
        },
      },
    });
    return record;
  }

  //We need the formIds for each service in the array???
  //Maybe this is moved to the loader to create them if needed?
}

export async function deleteRecord({ id }: { id: Record["id"] }, sbUser: User) {
  await authenticatedPrismaClient(sbUser).servicesOnRecords.deleteMany({
    where: { recordId: id },
  });

  const record = await authenticatedPrismaClient(sbUser).record.delete({
    where: { id },
  });
  return record;
}

// export async function getFormData({
//   objectId,
//   objectType,
// }: {
//   objectId: String;
//   objectType: "ClientRecord" | "ClientNote";
// }) {
//   //we need the list of services in order to get the formIds
//   const data = await prisma.servicesOnRecords.findMany({
//     where: { recordId },
//     select: {
//       service: {
//         select: {
//           forms: {
//             select: {
//               formId: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   //Get FormIds into an array
//   const formIds = data.reduce((acc: string[], curr) => {
//     return [...acc, ...curr.service.forms.map((form) => form.formId)];
//   }, []);

//   //create missing form data for formIds
//   for (const formId of formIds) {
//     await prisma.formData.upsert({
//       where: {
//         formId_objectId_objectType: {
//           formId,
//           objectId: recordId,
//           objectType,
//         },
//       },
//       create: {
//         formId,
//         objectType,
//         objectId: recordId,
//         data: Prisma.JsonNull,
//       },
//       update: {},
//     });
//   }

//   //Get the form data for each formId
//   const formDataRecord = await prisma.formData.findMany({
//     where: {
//       formId: {
//         in: formIds,
//       },
//       objectType,
//       objectId: recordId,
//     },
//     select: {
//       formId: true,
//       data: true,
//     },
//   });

//   const areaCustomFields = await getAreaCustomFields({ area: "ClientRecord" });

//     (record = { ...record, ...formDefinition.formData });
//  if (record.formData && typeof record.formData === "object") {
//    record = { ...record, ...record.formData };
//    record.formData = Prisma.JsonNull;
//  }

//   return formDataRecord;
// }

// export async function processClientFormData(
//   client: ClientItemType,
//   formDefinition: FormDefinition
// ) {
//   if (!client) throw new Error("Client not found");
//   const form = await getFormById({ id: client.formId });
//   if (!form) {
//     throw new Error("Form not found");
//   }

//   client = { ...client, ...formDefinition.formData };
//   if (client.formData && typeof client.formData === "object") {
//     client = { ...client, ...client.formData };
//     client.formData = Prisma.JsonNull;
//   }

//   return { client, formDefinition };
// }

// export async function processRecordFormData(
//   record: RecordItemType,
//   formDefinition: FormDefinition
// ) {
//   if (!record) throw new Error("Record not found");
//   const form = await getFormById({ id: record.formId });
//   if (!form) {
//     throw new Error("Form not found");
//   }

//   record = { ...record, ...formDefinition.formData };
//   if (record.formData && typeof record.formData === "object") {
//     record = { ...record, ...record.formData };
//     record.formData = Prisma.JsonNull;
//   }

//   return { record, formDefinition };
// }
