import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import type {
  appClient,
  ImageUploadDataType,
  appTeamMember,
  appService,
} from "~/utils/types";

export type AppointmentType = {
  Id: string;
  Subject: string;
  StartTime: string;
  EndTime: string;

  IsAllDay: boolean;
  client: appClient;
  teamMember: appTeamMember;
  teamMemberId: string; //needed to match the resource in the Scheduler

  dragBetweenSlots: boolean;
  color: string;
  overlap: boolean;
  editable: boolean;
  dragInTime: boolean;
  resize: boolean;
  services: appService[];
};

export async function getBookingItems(locationId: string, sbUser: User) {
  const bookings = await authenticatedPrismaClient(sbUser).booking.findMany({
    where: {
      services: {
        every: {
          service: {
            locations: {
              some: {
                locationId: locationId,
              },
            },
          },
        },
      },
    },
    select: {
      id: true,
      title: true,
      startDate: true,
      endDate: true,
      allDay: true,
      description: true,
      client: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      services: {
        select: {
          service: {
            select: {
              name: true,
              color: true,
              category: {
                select: {
                  color: true,
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
    //orderBy: { updatedAt: "desc" },
  });
  return bookings
    .map((obj) => {
      return {
        Id: obj.id,
        Subject: obj.title,
        StartTime: obj.startDate ? obj.startDate.toUTCString() : "",
        EndTime: obj.endDate ? obj.endDate.toUTCString() : "",

        IsAllDay: obj.allDay,
        client: obj.client,
        teamMember: obj.user,
        teamMemberId: obj.user.id,
        color:
          obj.services && obj.services.length > 0
            ? obj.services[0].service.color
              ? obj.services[0].service.color
              : obj.services[0].service.category.color
            : "",
        overlap: false,
        editable: false,
        // dragInTime: false,
        // resize: false,
        services: obj.services.map((service) => {
          const { name, color } = service.service;
          return { name, color };
        }),
      } as AppointmentType;
    })
    .flat(1);
}

// export type BookingItemType = ThenArg<ReturnType<typeof getBookingItem>>;
// export async function getBookingItem(
//   id: string,
//   sbUser: User,
// ): Promise<MbscCalendarEvent> {
//   const booking = await authenticatedPrismaClient(sbUser).booking.findFirst({
//     where: { id },
//     select: {
//       id: true,
//       title: true,
//       allDay: true,
//       blockTime: true,
//       color: true,
//       description: true,
//       endDate: true,
//       clientId: true,
//       client: {
//         select: {
//           firstName: true,
//           lastName: true,
//         },
//       },
//       services: {
//         select: {
//           service: {
//             select: {
//               id: true,
//             },
//           },
//         },
//       },
//       startDate: true,
//       userId: true,
//       user: {
//         select: {
//           firstName: true,
//           lastName: true,
//         },
//       },
//     },
//   });
//   if (!booking) {
//     throw new Error("Booking not found");
//   }

//   return {
//     id: booking.id,
//     // title: booking.title,
//     allDay: booking.allDay,
//     blockTime: booking.blockTime,
//     color: booking.color,
//     description: booking.description,
//     endDate: booking.endDate,
//     clientId: booking.clientId,
//     client: booking.client,

//     startDate: booking.startDate,
//     userId: booking.userId,
//     user: booking.user,

//     services: booking.services.map((service) => {
//       const { id } = service.service;
//       return id;
//     }),
//   };
// }

export type BookingServiceType = {
  id: string;
  name: string;
  color: string;
  textColor: string;
};

export type ClientBookingItemType = {
  id: string;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  allDay: boolean;
  description: string;
  client: {
    id: string;
    firstName: string;
    lastName: string;
  };
  user: {
    firstName: string;
    lastName: string;
    avatarData: ImageUploadDataType | null;
  };
  services: BookingServiceType[];
};

export async function getClientBookings(clientId: string, sbUser: User) {
  const bookings = await authenticatedPrismaClient(sbUser).booking.findMany({
    where: {
      clientId,
      status: "BOOKED",
    },
    select: {
      id: true,
      title: true,
      startDate: true,
      endDate: true,
      allDay: true,
      description: true,
      client: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      services: {
        select: {
          service: {
            select: {
              id: true,
              name: true,
              color: true,
              textColor: true,
              category: {
                select: {
                  color: true,
                  textColor: true,
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
          avatarData: true,
        },
      },
    },
    //orderBy: { updatedAt: "desc" },
  });

  return bookings
    .map((obj) => {
      return {
        id: obj.id,
        title: obj.title,
        startDate: obj.startDate,
        endDate: obj.endDate,
        allDay: obj.allDay,
        description: obj.description,
        client: obj.client,
        user: obj.user,
        services: obj.services.map((service) => {
          const { id, name, color, textColor, category } = service.service;
          return {
            id,
            name,
            color: color ? color : category.color,
            textColor: textColor ? textColor : category.textColor,
          };
        }),
      };
    })
    .flat(1) as ClientBookingItemType[];
}

export async function getPreparingBookings(sbUser: User) {
  const bookings = await authenticatedPrismaClient(sbUser).booking.findMany({
    where: {
      status: "PREPARING",
    },
    select: {
      id: true,
      title: true,
      startDate: true,
      endDate: true,
      allDay: true,
      description: true,
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      services: {
        select: {
          service: {
            select: {
              id: true,
              name: true,
              color: true,
              textColor: true,
              category: {
                select: {
                  color: true,
                  textColor: true,
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
          avatarData: true,
        },
      },
    },
    //orderBy: { updatedAt: "desc" },
  });

  return bookings
    .map((obj) => {
      return {
        id: obj.id,
        title: obj.title,
        startDate: obj.startDate,
        endDate: obj.endDate,
        allDay: obj.allDay,
        description: obj.description,
        client: obj.client,
        user: obj.user,
        services: obj.services.map((service) => {
          const { id, name, color, textColor, category } = service.service;
          return {
            id,
            name,
            color: color ? color : category.color,
            textColor: textColor ? textColor : category.textColor,
          };
        }),
      };
    })
    .flat(1) as ClientBookingItemType[];
}

export async function getBookingBookingById(id: string, sbUser: User) {
  if (id === "new") {
    return {
      id: "new",
      client: null,
      services: [],
    };
  }

  const booking = await authenticatedPrismaClient(sbUser).booking.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      startDate: true,
      endDate: true,
      allDay: true,
      description: true,
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      services: {
        select: {
          service: {
            select: {
              id: true,
              name: true,
              color: true,
              textColor: true,
              category: {
                select: {
                  color: true,
                  textColor: true,
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          firstName: true,
          lastName: true,
          avatarData: true,
        },
      },
    },
    //orderBy: { updatedAt: "desc" },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  return {
    id: booking.id,
    title: booking.title,
    startDate: booking.startDate,
    endDate: booking.endDate,
    allDay: booking.allDay,
    description: booking.description,
    client: booking.client,
    user: booking.user,
    services: booking.services.map((service) => {
      const { id, name, color, textColor, category } = service.service;
      return {
        id,
        name,
        color: color ? color : category.color,
        textColor: textColor ? textColor : category.textColor,
      };
    }),
  };
}

export async function createBooking(
  booking: {
    clientId: string;
  },

  sbUser: User,
) {
  const newBooking = await authenticatedPrismaClient(sbUser).booking.create({
    data: {
      clientId: booking.clientId,
      userId: sbUser.id,
      createdBy: sbUser.id,
    },
  });
  return newBooking;
}

export async function updateBooking(
  booking: {
    id: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    clientId: string;
  },
  sbUser: User,
) {
  const updatedBooking = await authenticatedPrismaClient(sbUser).booking.update(
    {
      where: {
        id: booking.id,
      },
      data: {
        startDate: booking.startDate ? new Date(booking.startDate) : null,
        endDate: booking.endDate ? new Date(booking.endDate) : null,
        description: booking.description,
        clientId: booking.clientId,
      },
    },
  );

  return updatedBooking;
}

export async function getBookingConsents(
  { bookingId }: { bookingId: string },
  sbUser: User,
) {
  //get the services for the booking

  const services = await authenticatedPrismaClient(
    sbUser,
  ).servicesOnBookings.findMany({
    where: {
      bookingId,
    },
    select: {
      serviceId: true,
    },
  });

  //get the associated required consents for the services
  const consents = await authenticatedPrismaClient(
    sbUser,
  ).consentsOnServices.findMany({
    where: {
      serviceId: {
        in: services.map((service) => service.serviceId),
      },
    },
    select: {
      form: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return consents.map((consent) => {
    return {
      id: consent.form.id,
      name: consent.form.name,
    };
  });
}

export async function updateBookingClient(
  booking: {
    id: string;
    clientId: string;
  },
  sbUser: User,
) {
  const updatedBooking = await authenticatedPrismaClient(sbUser).booking.update(
    {
      where: {
        id: booking.id,
      },
      data: {
        clientId: booking.clientId,
      },
    },
  );

  return updatedBooking;
}

export async function updateBookingServices(
  booking: {
    id: string;
    services: string[];
  },
  sbUser: User,
) {
  if (Array.isArray(booking.services)) {
    for (let i = 0; i < booking.services.length; i++) {
      await authenticatedPrismaClient(sbUser).servicesOnBookings.upsert({
        where: {
          serviceId_bookingId: {
            serviceId: booking.services[i],
            bookingId: booking.id,
          },
        },
        update: {},
        create: {
          serviceId: booking.services[i],
          bookingId: booking.id,
        },
      });
    }
  }

  //remove locations not in locations array
  await authenticatedPrismaClient(sbUser).servicesOnBookings.deleteMany({
    where: {
      bookingId: booking.id,
      NOT: {
        serviceId: {
          in: booking.services,
        },
      },
    },
  });

  return true;
}
