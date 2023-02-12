import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getBookings, postBookings, updateBooking } from "@/controllers/booking-controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", getBookings)
  .post("/", postBookings)
  .put("/:bookingId", updateBooking);

export { bookingRouter };
