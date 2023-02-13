import  ticketRepository  from "@/repositories/ticket-repository";
import  enrollmentRepository  from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import { forbiddenError } from "@/errors/forbidden-error";

async function getBookings(userId: number) {
  const booking = await bookingRepository.findBooking(userId);
  if(!booking) throw notFoundError();
  return booking;
}

async function findRoom(roomId: number) {
  const room = await bookingRepository.findRoom(roomId);
  if(!room) throw notFoundError();
  return room;
}

async function listBookings(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw forbiddenError();
  }
}

async function checkAvailability(roomId: number) {
  const room = await bookingRepository.findRoom(roomId);
  if(!room) throw notFoundError();
  const availability = room.capacity === room.Booking.length;
  if(availability) throw forbiddenError();
}

async function postBookings(roomId: number, userId: number) {
  await listBookings(userId);
  await findRoom(roomId);
  await checkAvailability(roomId);
 
  const booking = await bookingRepository.createBooking(roomId, userId);
  return booking;
}

async function updateBookings(roomId: number, bookingId: number, userId: number) {
  const findBooking = await bookingRepository.findBooking(userId);
  if(!findBooking) throw forbiddenError();
  await checkAvailability(roomId);
  const booking = await bookingRepository.updateBooking(bookingId, roomId);
  return booking;
}

const bookingService = {
  getBookings,
  postBookings,
  updateBookings,
};

export default bookingService;
