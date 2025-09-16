import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const AddCar = () => {
  const { axios, currency } = useAppContext();

  // Image state
  const [image, setImage] = useState(null);

  // Car details (backend ke schema ke hisaab se field names)
  const [carData, setCarData] = useState({
    brand: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    location: "",
    transmission: "",
    fuel_type: "",        // ✅ backend expects this
    category: "",
    seating_capacity: 0, // ✅ backend expects this
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Form submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(carData));

      const { data } = await axios.post("/api/owner/add-car", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCarData({
          brand: "",
          model: "",
          year: 0,
          price: 0,
          location: "",
          transmission: "",
          fuel_type: "",
          category: "",
          seating_capacity: 0,
          description: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container p-4">
      <h3 className="fw-bold mb-3">Add New Car</h3>
      <p className="text-muted mb-4">
        Fill the below details to add a new car for booking. Uploaded car image
        and car specifications will be saved.
      </p>

      <form onSubmit={onSubmitHandler} className="row g-3">
        {/* Brand */}
        <div className="col-md-6">
          <label className="form-label">Brand</label>
          <input
            type="text"
            className="form-control"
            name="brand"
            value={carData.brand}
            onChange={(e) =>
              setCarData({ ...carData, [e.target.name]: e.target.value })
            }
            placeholder="e.g. BMW, Toyota"
            required
          />
        </div>

        {/* Model */}
        <div className="col-md-6">
          <label className="form-label">Model</label>
          <input
            type="text"
            className="form-control"
            name="model"
            value={carData.model}
            onChange={(e) =>
              setCarData({ ...carData, [e.target.name]: e.target.value })
            }
            placeholder="e.g. Corolla, 3 Series"
            required
          />
        </div>

        {/* Year */}
        <div className="col-md-4">
          <label className="form-label">Year</label>
          <input
            type="number"
            className="form-control"
            name="year"
            value={carData.year}
            onChange={(e) =>
              setCarData({ ...carData, [e.target.name]: e.target.value })
            }
            placeholder="2023"
            required
          />
        </div>

        {/* Price */}
        <div className="col-md-4">
          <label className="form-label">Day Price ({currency})</label>
          <input
            type="number"
            className="form-control"
            name="pricePerDay"
            value={carData.pricePerDay}
            onChange={(e) =>
              setCarData({ ...carData, [e.target.name]: e.target.value })
            }
            placeholder="100"
            required
          />
        </div>

        {/* Seating Capacity */}
        <div className="col-md-4">
          <label className="form-label">Seating Capacity</label>
          <input
            type="number"
            className="form-control"
            name="seating_capacity" // ✅ matches backend
            value={carData.seating_capacity}
            onChange={(e) =>
              setCarData({ ...carData, [e.target.name]: e.target.value })
            }
            placeholder="5"
            required
          />
        </div>

        {/* Location */}
        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={carData.location}
            onChange={(e) =>
              setCarData({ ...carData, [e.target.name]: e.target.value })
            }
            placeholder="San Francisco, CA"
            required
          />
        </div>

        {/* Transmission */}
        <div className="col-md-6">
          <label className="form-label">Transmission</label>
          <select
            className="form-select"
            name="transmission"
            value={carData.transmission}
            onChange={(e) =>
              setCarData({ ...carData, [e.target.name]: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div className="col-md-6">
          <label className="form-label">Fuel Type</label>
          <select
            className="form-select"
            name="fuel_type" // ✅ matches backend
            value={carData.fuel_type}
            onChange={(e) =>
              setCarData({ ...carData, [e.target.name]: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Category */}
        <div className="col-md-6">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={carData.category}
            onChange={(e) =>
              setCarData({ ...carData, [e.target.name]: e.target.value })
            }
            required
          >
            <option value="">Select</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>

        {/* Description */}
        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={carData.description}
            onChange={(e) =>
              setCarData({ ...carData, [e.target.name]: e.target.value })
            }
            placeholder="Describe your car, its features, and condition..."
            rows="3"
          />
        </div>

        {/* Image Upload */}
        <div className="col-12">
          <label className="form-label">Upload Car Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            required
          />
          {image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                style={{ width: "150px", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            {isLoading ? "Listing..." : "Add Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;