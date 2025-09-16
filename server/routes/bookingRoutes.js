import express from "express";
import {
    changeBookingStatus,
    checkAvailabilityOfCar,
    createBooking,
    getOwnerBookings,
    getUserBookings,
} from "../Controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

// Check availability of a car
bookingRouter.post("/check-availability", checkAvailabilityOfCar);

// Create a booking (requires authentication)
bookingRouter.post("/create", protect, createBooking);

// Get all bookings of a user (requires authentication)
bookingRouter.get("/user", protect, getUserBookings);

// Get all bookings for an owner (requires authentication)
bookingRouter.get("/owner", protect, getOwnerBookings);

// Change booking status (requires authentication)
bookingRouter.post("/change-status", protect, changeBookingStatus);

export default bookingRouter;