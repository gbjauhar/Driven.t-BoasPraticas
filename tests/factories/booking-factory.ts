import faker from "@faker-js/faker";
import { User } from "@prisma/client";

import { createUser } from "./users-factory";
import { prisma } from "@/config";

export async function createBooking(user?: User) {
  const incomingUser = user || (await createUser());

  return prisma.booking.create({
    data: {
     id: faker.datatype.number(),
      Room: createRoomWithHotelId
      },
    },
    include: {
      Address: true,
    },
  });
}