import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const ManageCars = () => {
  const { isOwner, axios } = useAppContext();
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvalaibility = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this car?"
      );
      if (!confirm) return null;
      const { data } = await axios.post('/api/owner/delete-car',{ carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerCars();
    }
  }, [isOwner]);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage Cars</h3>
      <p className="text-muted">
        View all listed cars, update their details, or remove them from the
        booking platform.
      </p>

      <div className="table-responsive">
        <table className="table table-hover align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>Car</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td className="d-flex align-items-center">
                  <img
                    src={car.image}
                    alt={car.model}
                    style={{
                      width: "70px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                    className="me-3"
                  />
                  <div className="text-start">
                    <h6 className="mb-0">
                      {car.brand} {car.model}
                    </h6>
                    <small className="text-muted">
                      {car.seating_capacity} Seats • {car.transmission}
                    </small>
                  </div>
                </td>
                <td>{car.category}</td>
                <td>${car.pricePerDay}/day</td>
                <td>
                  {car.isAvailable ? (
                    <span className="badge bg-success">Available</span>
                  ) : (
                    <span className="badge bg-danger">Unavailable</span>
                  )}
                </td>
                <td>
  <div className="d-flex justify-content-center align-items-center gap-3">
    {/* Toggle Availability (Eye icon) */}
    <img
      src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
      alt="toggle"
      width={22}
      style={{ cursor: "pointer" }}
      onClick={() => toggleAvalaibility(car._id)}
    />

    {/* Delete (Trash icon) */}
    <img
      src={assets.delete_icon}
      alt="delete"
      width={22}
      style={{ cursor: "pointer" }}
      onClick={() => deleteCar(car._id)}
    />
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;