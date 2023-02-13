import { prisma } from "@/config";

async function findBooking(userId: number) {
  return prisma.booking.findFirst({ where: { userId: userId }, include: { Room: true } });
}

async function findRoom(roomId: number) {
  return prisma.room.findFirst({ where: { id: roomId }, include: { Booking: true } });
}

async function createBooking(roomId: number, userId: number) {
  return prisma.booking.create({ data: { roomId: roomId, userId: userId } });
}

async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({ where: { id: bookingId }, data: { roomId: roomId } });
}
const bookingRepository = {
  findBooking,
  createBooking,
  findRoom,
  updateBooking,
};

export default bookingRepository;
