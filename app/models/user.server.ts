import type { User } from "@prisma/client";
import type {
  SupabaseClient,
  User as supabaseUser,
} from "@supabase/supabase-js";
import crypto from "node:crypto";
import { type FormDefinition } from "~/components/draggable-forms-editor/types.ts";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import { Prisma, prisma } from "~/db.server.ts";
import { getFormById } from "~/models/form.server.ts";
import getSupabaseServerClient from "~/services/supabase";
import { saveImageToSupabase } from "~/services/supabase-bucket";
import { invariantResponse } from "~/utils/misc.tsx";
import { type ImageUploadDataType, UserOnboarding } from "~/utils/types.ts";

export type { User } from "@prisma/client";

export async function checkUserIdValid(id: User["id"]) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      email: true,
    },
  });
}

export type UserItemType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  maritalStatus: string;
  mobileNumber: string;
  dateOfBirth: string;
  homeNumber: string;
  workNumber: string;
  formId: string;
  formData: User["formData"];
  entityId: string;
  avatarData: Partial<ImageUploadDataType> | null;
  onboardingStatus: UserOnboarding;
  role: {
    name: string;
  };
  entity: {
    id: string;
    name: string;
  };
  defaults: {
    bookingView: string;
    roomView: string;
    staffView: string;
    locationId: string;
  };
};

export async function getUserById(id: User["id"], sbUser: supabaseUser) {
  if (id === "new") {
    return {
      id: "new",
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      dateOfBirth: "",
      homeNumber: "",
      maritalStatus: "",
      workNumber: "",
      formData: {},
      formId: "",
      onboardingStatus: UserOnboarding.NOT_STARTED,
      role: {
        name: "",
      },
      avatarData: {
        fileName: "",
        storageKey: "",
        publicUrl: "",
        signedUrl: "",
        storedFileName: "",
      },
      entityId: "",
      entity: {
        id: "",
        name: "",
      },
      defaults: {
        bookingView: "",
        roomView: "",
        staffView: "",
        locationId: "",
      },
    };
  }

  const data = await authenticatedPrismaClient(sbUser).user.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,

      email: true,
      maritalStatus: true,
      mobileNumber: true,
      dateOfBirth: true,
      homeNumber: true,
      workNumber: true,
      entityId: true,
      avatarData: true,
      onboardingStatus: true,
      role: {
        select: {
          name: true,
        },
      },
      entity: {
        select: {
          id: true,
          name: true,
        },
      },
      formId: true,
      formData: true,

      defaults: {
        select: {
          bookingView: true,
          roomView: true,
          staffView: true,
          locationId: true,
        },
      },
    },
    // cacheStrategy: { ttl: 60 },
  });
  // console.log("data: ", data);
  invariantResponse(data, "Member not found for id: " + id);

  // if (!data) return null;
  //   throw new Error(`User not found for id: ${id} and email: ${sbUser.email}`);
  // console.log("data: ", data);
  return {
    ...data,
    dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString() : "",
    avatarData:
      data.avatarData ||
      `{ "fileName": "", "storageKey": "", "publicUrl": "", "signedUrl": ""}`,
  } as UserItemType;
}

export type AddUpdateUserItemType = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  maritalStatus?: string;
  mobileNumber?: string;
  dateOfBirth?: string | null;
  homeNumber?: string;
  workNumber?: string;
  formId?: string;
  formData?: User["formData"];
  entityId?: string;
  onboardingStatus?: UserOnboarding;
  avatarData?: Partial<ImageUploadDataType> | null;
};
export async function addUpdateUser(
  user: AddUpdateUserItemType,
  sbUser: supabaseUser,
  supabase: SupabaseClient | null,
): Promise<AddUpdateUserItemType> {
  const { id, ...data } = user;

  if (id === "new" && supabase) {
    function dec2hex(dec: number) {
      return dec.toString(16).padStart(2, "0");
    }

    const array = new Uint32Array(2);
    crypto.getRandomValues(array);
    const password = Array.from(array, dec2hex).join("");

    return await createSupabaseUser(supabase, user, password);
  }

  // console.log("user: ", user);
  if (user.avatarData?.file && supabase) {
    // console.log("avatarData: ", avatarData);
    const { file, ...rest } = user.avatarData;
    user.avatarData = rest;
    const savedData = await saveImageToSupabase(
      supabase,
      sbUser,
      id,
      "avatarData",
      file,
      user.avatarData?.storedFileName || "",
    );
    user.avatarData = {
      fileName: user.avatarData.fileName,
      storageKey: savedData.storageKey,
      publicUrl: savedData.publicUrl,
      signedUrl: "",
      storedFileName: savedData.storedFileName,
    };
  }
  // console.log("user: ", user);

  const result = await authenticatedPrismaClient(sbUser).user.update({
    where: { id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      homeNumber: data.homeNumber,
      workNumber: data.workNumber,
      maritalStatus: data.maritalStatus,
      dateOfBirth: data.dateOfBirth === "" ? null : data.dateOfBirth,
      // entityId: data.entityId,
      formId: data.formId,
      onboardingStatus: data.onboardingStatus,
      formData: data.formData != null ? data.formData : Prisma.JsonNull,
      avatarData: user.avatarData != null ? user.avatarData : Prisma.JsonNull,
    },
  });
  return {
    ...result,
    dateOfBirth: result.dateOfBirth ? result.dateOfBirth.toISOString() : "",
    avatarData:
      result.avatarData ||
      `{ "fileName": "", "storageKey": "", "publicUrl": "", "signedUrl": ""}`,
  } as AddUpdateUserItemType;
}

export async function addUpdateUserAvatar(
  {
    id,
    avatarData,
  }: {
    id: User["id"];
    avatarData: string;
  },
  sbUser: supabaseUser,
) {
  try {
    const user = await authenticatedPrismaClient(sbUser).user.update({
      data: {
        avatarData: avatarData != null ? avatarData : Prisma.JsonNull,
      },
      where: {
        id,
      },
    });
    return {
      ...user,
      avatarData: JSON.parse(user.avatarData?.toString() || "{}"),
    };
  } catch (e) {}
}

async function createSupabaseUser(
  supabase: SupabaseClient,
  user: AddUpdateUserItemType,
  password: string,
) {
  if (!user.email)
    throw new Error("Email is required to create a new user account");
  let authData: {
    data: any;
    error: any;
  };
  try {
    authData = await supabase.auth.signUp({
      email: user.email,
      password: password,
    });
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
  //console.log("data: ", authData.data);
  console.log("authData: ", authData);
  console.log("error: ", authData.error);

  if (!authData.data.user) {
    //throw new Error("User not created");
    return user as AddUpdateUserItemType;
  }

  await supabase.auth.resetPasswordForEmail(user.email);

  const _entityId = '"' + user.entityId + '"';
  //set claim in jwt

  //console.log("set_claim");
  await prisma.$executeRaw`select set_claim(${authData.data.user.id}::UUID, 'entityId', ${_entityId}::jsonb)`;

  //console.log("app.bypass_rls: on");
  await prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', FALSE)`;

  // console.log("update");
  // console.log("entityId: ", entityId);
  // console.log("firstName: ", firstName);
  // console.log("lastName: ", lastName);
  // console.log("email: ", email);
  // console.log("dateOfBirth: ", dateOfBirth);
  // console.log("mobileNumber: ", mobileNumber);
  // console.log("homeNumber: ", homeNumber);
  // console.log("workNumber: ", workNumber);
  // console.log("maritalStatus: ", maritalStatus);
  // console.log("userPermissionId: ", userPermissionId);
  // console.log("formId: ", formId);

  const updatedUser = await prisma.user.update({
    where: {
      id: authData.data.user.id,
    },
    data: {
      entityId: user.entityId,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      mobileNumber: user.mobileNumber,
      homeNumber: user.homeNumber,
      workNumber: user.workNumber,
      maritalStatus: user.maritalStatus,
      //      userPermissionId,
      formId: user.formId,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      dateOfBirth: true,
      mobileNumber: true,
      homeNumber: true,
      workNumber: true,
      maritalStatus: true,
      entityId: true,
      avatarData: true,
      onboardingStatus: true,
      entity: {
        select: {
          id: true,
          name: true,
        },
      },
      formId: true,
      formData: true,
      defaults: {
        select: {
          bookingView: true,
          roomView: true,
          staffView: true,
          locationId: true,
        },
      },
    },
  });

  //console.log("app.bypass_rls: off");
  await prisma.$executeRaw`SELECT set_config('app.bypass_rls', '', FALSE)`;

  return {
    ...updatedUser,
    dateOfBirth: updatedUser.dateOfBirth
      ? updatedUser.dateOfBirth.toISOString()
      : "",
    avatarData:
      updatedUser.avatarData ||
      `{ "fileName": "", "storageKey": "", "publicUrl": "", "signedUrl": ""}`,
  } as AddUpdateUserItemType;
}

//This will check to see if the user has an entity assigned to them
//If not, it will create one and assign it to them

export async function createNewEntity(
  userId: string,
  firstName: string,
  lastName: string,
  request: Request,
) {
  const response = new Response();
  const supabaseClient = getSupabaseServerClient(request, response, {
    admin: true,
  });

  //check to see if an entity already exists for this user
  // const { data, error } =
  await supabaseClient.rpc("initial_setup", {
    user_id: userId,
    first_name: firstName,
    last_name: lastName,
  });
  // console.log("error: ", error);
  // console.log("data: ", data);

  // await prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', FALSE)`;
  // const existingEntity = await prisma.entity.findFirst({
  //   where: {
  //     ownerId: userId,
  //   },
  // });

  // // console.log("existingEntity: ", existingEntity);

  // if (existingEntity) {
  //   await prisma.$executeRaw`SELECT set_config('app.bypass_rls', '', FALSE)`;
  //   return false;
  // }

  // //create the new entity
  // const entity = await prisma.entity.create({
  //   data: {
  //     name: "New Company",
  //     ownerId: userId,
  //   },
  // });

  // //create the new location
  // const location = await prisma.location.create({
  //   data: {
  //     name: "Default Location",
  //     entityId: entity.id,
  //   },
  // });

  // await prisma.userLocation.create({
  //   data: {
  //     userId: userId,
  //     locationId: location.id,
  //   },
  // });

  // //update the user with the new entity id
  // await prisma.user.update({
  //   where: {
  //     id: userId,
  //   },
  //   data: {
  //     entityId: entity.id,
  //     firstName,
  //     lastName,
  //   },
  // });

  // // const _entityId = '"' + entityId + '"';
  // //await prisma.$executeRaw`select set_claim(${authData.data!.user!.id}::UUID, 'entityId', ${_entityId}::jsonb)`;

  // //update the supabase user with the new entity id
  //  const _entityId = '"' + entity.id + '"';
  // // const _onboarding = '"' + true + '"';
  // await prisma.$executeRaw`select set_claim(${userId}::UUID, 'entityId', ${_entityId}::jsonb)`;
  // // await prisma.$executeRaw`select set_claim(${userId}::UUID, 'onBoarding', ${_onboarding}::jsonb)`;
  // await prisma.$executeRaw`SELECT set_config('app.bypass_rls', '', FALSE)`;

  return true;
}

// export async function createUser({
//   email,
//   firstName,
//   lastName,
//   password,
// }: {
//   email: User["email"];
//   firstName: User["firstName"];
//   lastName: User["lastName"];
//   password: string;
// }) {
//   const hashedPassword = await bcrypt.hash(password, 10);

//   return prisma.user.create({
//     data: {
//       email,
//       firstName,
//       lastName,
//       //      entityId,
//       //      userPermissionId,
//       password: {
//         create: {
//           hash: hashedPassword,
//         },
//       },
//     },
//   });
// }

// export async function deleteUserByEmail(
//   email: User["email"],
//   entityId: User["entityId"]
// ) {
//   return prisma.user.delete({ where: { entityId_email: { email, entityId } } });
// }

// export async function verifyLogin(
//   email: User["email"],
//   password: Password["hash"]
// ) {
//   const userWithPassword = await prisma.user.findFirst({
//     where: { email },
//     include: {
//       password: true,
//     },
//   });

//   if (!userWithPassword || !userWithPassword.password) {
//     return null;
//   }

//   const isValid = await bcrypt.compare(
//     password,
//     userWithPassword.password.hash
//   );

//   if (!isValid) {
//     return null;
//   }

//   const { password: _password, ...userWithoutPassword } = userWithPassword;

//   return userWithoutPassword;
// }
export type GetUserItemsType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarData: Partial<ImageUploadDataType> | null;
  role: {
    id: string;
    name: string;
  };
};

export type GetUsersItemsType = GetUserItemsType[];
export async function getUsers(sbUser: supabaseUser) {
  const users = await authenticatedPrismaClient(sbUser).user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      avatarData: true,
      role: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      lastName: "asc",
    },
    // cacheStrategy: { ttl: 120 },
  });
  return users.map((user) => ({
    ...user,
    avatarData:
      user.avatarData ||
      `{ "fileName": "", "storageKey": "", "publicUrl": "", "signedUrl": ""}`,
  })) as GetUsersItemsType;
}

export async function updateUserRole(
  userRole: { userId: string; roleId: string },
  sbUser: supabaseUser,
) {
  return await authenticatedPrismaClient(sbUser).user.update({
    where: {
      id: userRole.userId,
    },
    data: {
      roleId: userRole.roleId,
    },
  });
}

// export type UserHourItemsType = {
//   userId: string;
//   hours: MbscCalendarEvent[];
// };

// export async function getLocationUserHours(
//   locationId: Location["id"],
//   sbUser: supabaseUser,
//   memberId: User["id"],
// ) {
//   // console.log("locationId: ", locationId);
//   // console.log("memberId: ", memberId);
//   const userHours = await authenticatedPrismaClient(sbUser).userHour.findMany({
//     where: {
//       userId: memberId,
//       locationId: locationId,
//     },
//     select: {
//       id: true,
//       dayOfWeek: true,
//       start: true,
//       end: true,
//     },
//   });
//   // console.log("userHours: ", userHours);
//   return userHours.map((hour) => ({
//     id: hour.id,
//     start: hour.start,
//     end: hour.end,
//     title: "Available",
//     recurring: { repeat: "weekly", weekDays: hour.dayOfWeek },
//   })) as MbscCalendarEvent[];

//   // return {
//   //   userId: user?.id,
//   //   hours: user?.hours.map((hour) => ({
//   //     id: hour.id,
//   //     start: hour.start,
//   //     end: hour.end,
//   //     title: "Available",
//   //     recurring: { repeat: "weekly", weekDays: hour.dayOfWeek },
//   //   })),
//   // } as UserHourItemsType;
// }

export async function addUserLocationHours(
  userID: string,
  locationID: string,
  hour: { start: string; end: string; dayOfWeek: string },
  sbUser: supabaseUser,
) {
  console.log("hour: ", hour);
  return await authenticatedPrismaClient(sbUser).userHour.create({
    data: {
      start: hour.start,
      end: hour.end,
      dayOfWeek: hour.dayOfWeek,
      userId: userID,
      locationId: locationID,
    },
  });
}

// export async function updateUserLocationHours(
//   hour: UserHour,
//   sbUser: supabaseUser,
// ) {
//   return await authenticatedPrismaClient(sbUser).userHour.update({
//     where: {
//       id: hour.id,
//     },
//     data: {
//       start: hour.start,
//       end: hour.end,
//       dayOfWeek: hour.dayOfWeek,
//     },
//   });
// }

export async function deleteUserLocationHours(
  id: string,
  sbUser: supabaseUser,
) {
  return await authenticatedPrismaClient(sbUser).userHour.delete({
    where: {
      id,
    },
  });
}

type UpdateUserHourType = {
  id: string;
  start: string;
  end: string;
  dayOfWeek: string;
};

export async function updateUserLocationHours(
  hour: UpdateUserHourType,
  sbUser: supabaseUser,
) {
  return await authenticatedPrismaClient(sbUser).userHour.update({
    where: {
      id: hour.id,
    },
    data: {
      start: hour.start,
      end: hour.end,
      dayOfWeek: hour.dayOfWeek,
    },
  });
}

export async function processUserFormData(
  user: UserItemType,
  formDefinition: FormDefinition,
  sbUser: supabaseUser,
) {
  console.log("user: ", user);

  if (!user) throw new Error("Member not found");
  const form = await getFormById({ id: user.formId }, sbUser);
  if (!form) {
    throw new Error("Form not found");
  }
  user = { ...user, ...formDefinition.usedFormFields };
  if (user.formData && typeof user.formData === "object") {
    user = { ...user, ...user.formData };
    user.formData = null; // Prisma.JsonNull;
  }

  return { user, formDefinition };
}

// export async function processUserFormData(
//   user: UserItemType,
//   formDefinition: FormDefinition,
//   sbUser: supabaseUser,
//   supabase: SupabaseClient,
// ) {
//   if (!user) throw new Error("User not found");
//   const form = await getFormById({ id: user.formId }, sbUser);
//   if (!form) {
//     throw new Error("Form not found");
//   }

//   //process form definition to look for imageUploads to get signed urls
//   if (user.formData && typeof user.formData === "object") {
//     for (const row of formDefinition.rows) {
//       for (const control of row.controls) {
//         if (control.field.fieldType === FieldType.IMAGEUPLOAD) {
//           //find the formData for this control
//           if (!user.formData) user.formData = {};
//           if (user.formData.hasOwnProperty(control.id)) {
//             const controlIdTyped = control.id as keyof typeof user.formData;
//             const obj = user.formData[controlIdTyped] as ImageUploadDataType;
//             if (obj && typeof obj === "object") {
//               //console.log("obj: ", obj);
//               const publicUrlTyped = "publicUrl" as keyof typeof obj;
//               const publicUrl = obj[publicUrlTyped] as string;
//               if (publicUrl === "" || !publicUrl) {
//                 //Get a signed url from supabase storage
//                 const storageKeyTyped = "storageKey" as keyof typeof obj;
//                 const storageKey = obj[storageKeyTyped] as string;
//                 if (storageKey !== "") {
//                   //get signed url
//                   const imageUrl = (await supabase.storage
//                     .from("entity-public")
//                     .createSignedUrl(storageKey, 120)) as {
//                     data: { signedUrl: string };
//                   };

//                   //add signed url to formData
//                   obj.signedUrl =
//                     imageUrl && imageUrl.data && imageUrl.data.signedUrl;
//                 }
//               }
//             }
//           }
//           //console.log("user.formData: ", user.formData);
//         }
//       }
//     }
//   }

//   user = { ...user, ...formDefinition.usedFormFields };
//   if (user.formData && typeof user.formData === "object") {
//     //console.log("user.formData: ", user.formData);
//     user = { ...user, ...user.formData };
//     user.formData = {};
//     //console.log("user: ", user);
//   }

//   return { user, formDefinition } as {
//     user: UserItemType;
//     formDefinition: FormDefinition;
//   };
// }
