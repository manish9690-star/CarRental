

import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const ManageBookings = () => {
  const { currency, axios } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/owner");
      data.success ? setBookings(data.bookings) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post("/api/bookings/change-status", {
        bookingId,
        status,
      });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 fw-bold">Manage Bookings</h2>
      <p className="text-muted mb-4">
        Track all customer bookings, approve or cancel requests, and manage
        booking statuses.
      </p>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">Car</th>
              <th scope="col">Date Range</th>
              <th scope="col">Total</th>
              <th scope="col">Payment</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  {/* Car details */}
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={booking?.car?.image || "/placeholder-car.png"}
                        alt={booking?.car?.model || "Car"}
                        className="rounded me-3"
                        style={{
                          width: "60px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />
                      <span className="fw-semibold">
                        {booking?.car
                          ? `${booking.car.brand} ${booking.car.model}`
                          : "Car not available"}
                      </span>
                    </div>
                  </td>

                  {/* Date Range */}
                  <td>
                    {new Date(booking.pickupDate)
                      .toISOString()
                      .split("T")[0]}{" "}
                    to{" "}
                    {new Date(booking.returnDate)
                      .toISOString()
                      .split("T")[0]}
                  </td>

                  {/* Total */}
                  <td className="fw-bold">
                    {currency}
                    {booking?.price ?? 0}
                  </td>

                  {/* Payment */}
                  <td>
                    <span className="badge bg-secondary">Offline</span>
                  </td>

                  {/* Actions */}
                  <td className="p-3">
                    {booking.status === "pending" ? (
                      <select
                        onChange={(e) =>
                          changeBookingStatus(booking._id, e.target.value)
                        }
                        value={booking.status}
                        className="form-select form-select-sm mt-1"
                        aria-label="Change booking status"
                      >
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="confirmed">Confirmed</option>
                      </select>
                    ) : (
                      <span
                        className={`badge rounded-pill small ${
                          booking.status === "confirmed"
                            ? "bg-success text-white"
                            : "bg-danger text-white"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;