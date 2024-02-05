import {
  // type Client,
  type Entity,
  type Form,
  Prisma,
  type PrismaClient,
  UserOnboarding,
} from "@prisma/client";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { AreaType } from "~/components/draggable-forms-editor/types.ts";
import { prisma } from "~/db.server";

// import { updateServiceLetters } from "~/models/services.server";

// import { insertGitHubUser } from "../../tests/mocks/github.ts";

export const createEntity = async (prisma: any, name: string) => {
  const entity = (await prisma.entity.findFirst({
    where: {
      name,
    },
  })) as Entity;
  if (entity) return entity;
  return await prisma.entity.create({
    data: {
      name,
    },
  });
};

export const updateEntity = async (
  prisma: any,
  id: string,
  ownerId: string,
) => {
  const entity = await prisma.entity.update({
    where: {
      id,
    },
    data: {
      ownerId,
    },
  });
  return entity;
};

export async function createSupabaseUser(
  supabase: SupabaseClient,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  entityId: string,
  // permissionId: string,
  memberDetailFormId: string,
) {
  let authData: {
    data: any;
    error: any;
  };

  authData = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (!authData.data.user) {
    //user probably exists
    console.log("user does not exist", firstName, lastName);

    authData = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
    });
    // console.log("authData", authData);
  }
  if (!authData.data.user) {
    throw new Error("Supabase User not created", authData.error);
  }

  //Really Important as this adds the entityId claim to the user
  const _entityId = '"' + entityId + '"';
  await prisma.$executeRaw`select set_claim(${
    authData.data!.user!.id
  }::UUID, 'entityId', ${_entityId}::jsonb)`;

  // console.log("findUser", authData.data!.user!.id);

  await prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', FALSE)`;
  const user = await prisma.user.findUnique({
    where: { id: authData.data!.user!.id },
  });

  if (!user) {
    // console.log("createUser");
    const user = await createUser(
      prisma,
      authData.data!.user!.id,
      entityId,
      firstName,
      lastName,
      email,
      // permissionId,
      memberDetailFormId,
      true,
    );
    return { user };
  } else {
    // console.log("updateUser");
    await prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', FALSE)`;
    const user = await updateUser(
      prisma,
      authData.data!.user!.id,
      entityId,
      firstName,
      lastName,
      // permissionId,
      memberDetailFormId,
      true,
    );
    return { user };
  }
}

export const permission = async (
  prisma: any,
  owner: boolean,
  admin: boolean,
  user: boolean,
) => {
  const userPermission = await prisma.userPermissions.findFirst({
    where: {
      owner,
      admin,
      user,
    },
  });
  if (userPermission) {
    return userPermission;
  }

  return await prisma.userPermissions.create({
    data: {
      owner,
      admin,
      user,
    },
  });
};

export const createUser = async (
  prisma: any,
  id: string,
  entityId: string,
  firstName: string,
  lastName: string,
  email: string,
  // userPermissionId: string,
  formId: string,
  demo: boolean,
) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    return user;
  }

  // console.log("passthroughGitHub", process.env.GITHUB_OAUTH_CLIENT_ID);

  // const githubUser = await insertGitHubUser(`MOCK_GITHUB_CODE_KODY`);

  const newUser = await prisma.user.create({
    data: {
      id,
      email,
      entityId,
      firstName,
      lastName,
      formId,
      // userPermissionId,
      onboardingStatus: UserOnboarding.COMPLETED,
      demo,
      // permissions: {
      //   connect: {
      //     id: userPermissionId,
      //   },
      // },
      // connections: {
      //   create: {
      //     provider: "github",
      //     providerId: githubUser.profile.id,
      //   },
      // },
    },
  });

  return newUser;
};

// const createConnection = async (
//   prisma: PrismaClient,
//   userId: string,
//   provider: string,
//   providerId: string,
// ) => {

//   const connectionData = await insertGitHubUser(
//     `MOCK_GITHUB_CODE_${firstName}_${lastName}`,
//   );

//   return await prisma.userConnection.upsert({
//     where: {
//       providerName_providerId: {
//         providerId: githubUser.profile.id,
//         providerName: "github",
//       },
//     },
//     update: {},
//     create: {
//       userId: id,
//       providerName: "github",
//       providerId: githubUser.profile.id,
//     },
//   });
// };

export const updateUser = async (
  prisma: PrismaClient,
  id: string,
  entityId: string,
  firstName: string,
  lastName: string,
  // userPermissionId: string,
  formId: string,
  demo: boolean,
) => {
  // console.log("passthroughGitHub", process.env.GITHUB_OAUTH_CLIENT_ID);

  // const githubUser = await insertGitHubUser(
  //   `MOCK_GITHUB_CODE_${firstName}_${lastName}`,
  // );
  // console.log("passthroughGitHub", githubUser);
  // console.log("entityId", entityId);
  // const connection = await prisma.userConnection.upsert({
  //   where: {
  //     providerName_providerId: {
  //       providerId: githubUser.profile.id,
  //       providerName: "github",
  //     },
  //   },
  //   update: {},
  //   create: {
  //     userId: id,
  //     providerName: "github",
  //     providerId: githubUser.profile.id,
  //   },
  // });
  // console.log("connection", connection);

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      entityId,
      // userPermissionId,
      formId,
      demo,
      onboardingStatus: UserOnboarding.COMPLETED,
      // userConnections: {
      //   connect: {
      //     id: connection.id,
      //   },
      // },
    },
  });
  return user;
};

// export const createClient = async (
//   prisma: PrismaClient,
//   email: Client["email"],
//   firstName: Client["firstName"],
//   lastName: Client["lastName"],
//   entityId: Client["entityId"],
//   defaultLocationId: Client["defaultLocationId"],
//   formId: Client["formId"],
//   formData: Client["formData"],
// ) => {
//   return prisma.client.upsert({
//     where: {
//       email,
//     },
//     update: {},
//     create: {
//       email,
//       firstName,
//       lastName,
//       defaultLocationId,
//       formId,
//       // formData,
//     },
//   });
// };

export const createLocation = async (
  prisma: any,
  name: string,
  demo = false,
) => {
  const location = await prisma.location.findFirst({
    where: {
      name,
    },
  });
  if (location) {
    return location;
  }

  return await prisma.location.create({
    data: {
      name,
      demo,
    },
  });
};

export const createLocationHours = async (
  prisma: any,
  dayOfWeek: string,
  locationId: string,
  start: string,
  end: string,
) => {
  const locationHours = await prisma.locationHours.findFirst({
    where: {
      dayOfWeek,
      locationId,
      start,
      end,
    },
  });
  if (locationHours) {
    return locationHours;
  }

  return await prisma.locationHours.create({
    data: {
      dayOfWeek,
      locationId,
      start,
      end,
    },
  });
};

// const prisma = new PrismaClient();

export const createUserHours = async (
  prisma: any,
  dayOfWeek: string,
  userId: string,
  locationId: string,
  start: string,
  end: string,
) => {
  console.log("createUserHours", dayOfWeek, userId, locationId, start, end);
  const userHours = await prisma.userHour.findFirst({
    where: {
      dayOfWeek,
      userId,
      locationId,
      start,
      end,
    },
  });
  if (userHours) {
    return userHours;
  }

  return await prisma.userHour.create({
    data: {
      dayOfWeek,
      userId,
      locationId,
      start,
      end,
    },
  });
};

export const createRoom = async (
  prisma: any,
  name: string,
  locationId: string,
) => {
  const room = await prisma.room.findFirst({
    where: {
      name,
      locationId,
    },
  });
  if (room) {
    return room;
  }

  return await prisma.room.create({
    data: {
      name,
      locationId,
    },
  });
};

export const createUserLocation = async (
  prisma: any,
  userId: string,
  locationId: string,
) => {
  const userLocation = await prisma.userLocation.findFirst({
    where: {
      userId,
      locationId,
    },
  });
  if (userLocation) {
    return userLocation;
  }

  return await prisma.userLocation.create({
    data: {
      userId,
      locationId,
    },
  });
};

// export const createCategory = async (
//   prisma: PrismaClient,
//   name: string,
//   color: string,
//   demo?: boolean,
// ) => {
//   const category = await prisma.category.findFirst({
//     where: {
//       name,
//     },
//   });
//   if (category) {
//     return category;
//   }

//   return await prisma.category.create({
//     data: {
//       name,
//       color,
//       demo,
//     },
//   });
// };

export const createTextTemplate = async (
  prisma: PrismaClient,
  entityId: string,
  name: string,
  description: string,
  text: string,
  cost: number,
  type: string,
) => {
  const textTemplate = await prisma.textTemplate.findFirst({
    where: {
      name,
      entityId,
    },
  });
  if (textTemplate) {
    return textTemplate;
  }

  return await prisma.textTemplate.create({
    data: {
      name,
      description,
      text,
      cost,
      type,
    },
  });
};

export const createTextsOnServices = async (
  prisma: PrismaClient,
  textTemplateId: string,
  serviceId: string,
) => {
  const textsOnServices = await prisma.textsOnServices.findFirst({
    where: {
      textTemplateId,
      serviceId,
    },
  });
  if (textsOnServices) {
    return textsOnServices;
  }

  return await prisma.textsOnServices.create({
    data: {
      textTemplateId,
      serviceId,
    },
  });
};

// export const createBooking = async (
//   prisma: PrismaClient,
//   userId: string,
//   clientId: string,
//   startDate: Date,
//   endDate: Date,
// ) => {
//   const booking = await prisma.booking.findFirst({
//     where: {
//       userId,
//       clientId,
//       startDate,
//       endDate,
//     },
//   });
//   if (booking) {
//     return booking;
//   }

//   return await prisma.booking.create({
//     data: {
//       userId,
//       clientId,
//       startDate,
//       endDate,
//     },
//   });
// };

// export const createServicesOnBookings = async (
//   prisma: PrismaClient,
//   serviceId: string,
//   bookingId: string,
// ) => {
//   const servicesOnBookings = await prisma.servicesOnBookings.findFirst({
//     where: {
//       bookingId,
//       serviceId,
//     },
//   });
//   if (servicesOnBookings) {
//     return servicesOnBookings;
//   }

//   return await prisma.servicesOnBookings.create({
//     data: {
//       bookingId,
//       serviceId,
//     },
//   });
// };

// export const createQuestionnaire = async (
//   prisma: PrismaClient,
//   entityId: string,
//   name: string,
//   description: string,
// ) => {
//   const questionnaire = await prisma.questionnaire.findFirst({
//     where: {
//       name,
//       entityId,
//     },
//   });
//   if (questionnaire) {
//     return questionnaire;
//   }

//   return await prisma.questionnaire.create({
//     data: {
//       name,
//       entityId,
//       description,
//     },
//   });
// };

// export const updateQuestionnaireQuestionOrder = async (
//   prisma: PrismaClient,
//   questionnaireId: string,
//   questionOrder: string[],
// ) => {
//   const questionnaire = await prisma.questionnaire.update({
//     where: {
//       id: questionnaireId,
//     },
//     data: {
//       questionOrder: questionOrder.join(","),
//     },
//   });
//   return questionnaire;
// };

// export const createQuestion = async (
//   prisma: PrismaClient,
//   questionnaireId: String,
//   question: String,
//   description: String,
//   type: String,
//   options: String, //Comma separated list of options
//   required: Boolean,
//   maxValue?: Number,
// ) => {
//   const questionObj = await prisma.question.findFirst({
//     where: {
//       question,
//       questionnaireId,
//     },
//   });
//   if (questionObj) {
//     return questionObj;
//   }

//   return await prisma.question.create({
//     data: {
//       question,
//       type,
//       options,
//       required,
//       questionnaireId,
//       description,
//       maxValue,
//     },
//   });
// };

export const createForm = async (
  prisma: any,
  entityId: Form["entityId"],
  name: Form["name"],
  description: Form["description"],
  formDefinition: Form["formDefinition"],
  area: AreaType,
  formDefault: Form["default"],
) => {
  const formObj = await prisma.form.findFirst({
    where: {
      name,
      entityId,
    },
  });
  if (formObj) {
    return formObj;
  }

  // const fd = JSON.parse(formDefinition as string);

  return await prisma.form.create({
    data: {
      name,
      description,
      formDefinition: formDefinition != null ? formDefinition : Prisma.JsonNull,
      area: area as any,
      default: formDefault,
    },
  });
};

// export const createFormField = async (
//   prisma: any,
//   formId: string,
//   fieldId: string
// ) => {
//   const formFieldObj = await prisma.formField.findFirst({
//     where: {
//       formId,
//       fieldId,
//     },
//   });
//   if (formFieldObj) {
//     return formFieldObj;
//   }

//   return await prisma.formField.create({
//     data: {
//       formId,
//       fieldId,
//     },
//   });
// };

// export const createField = async (
//   prisma: PrismaClient,
//   area: string,
//   label: string,
//   shortLabel: string,
//   description: string,
//   fieldType: string,
//   options: string,
//   validation: string,
// ) => {
//   const fieldObj = await prisma.field.findFirst({
//     where: {
//       area,
//       label,
//     },
//   });
//   if (fieldObj) {
//     return fieldObj;
//   }

//   return await prisma.field.create({
//     data: {
//       area,
//       formId,
//       label,
//       shortLabel,
//       description,
//       fieldType,
//       options,
//       validation,
//     },
//   });
// };

export const createProductType = async (
  prisma: PrismaClient,
  name: string,
  demo?: boolean,
) => {
  const productType = await prisma.productType.findFirst({
    where: {
      name,
    },
  });
  if (productType) {
    return productType;
  }

  return await prisma.productType.create({
    data: {
      name,
      demo,
    },
  });
};
