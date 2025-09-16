import User from '../models/User.js';
import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Car from '../models/Car.js';
import Booking from '../models/Booking.js';



export const changeRoleToOwner = async (req, res) => {
    try {
        const { userId } = req.body;
        await User.findByIdAndUpdate(userId, { role: "owner" });
        res.json({ success: true, message: "Role changed to owner" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}



export const addCar = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    
    
    
    try {
        const { _id } = req.user;
        let car = JSON.parse(req.body.carData);
        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        });

        var optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                {  width:"1280"},
                {quality:"auto"},
                {format:"webp"}
            ]
        });

        const image=optimizedImageUrl ;
        await Car.create({ ...car, owner: _id, image });
        res.json({ success: true, message: "Car added successfully" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}


// API to Get Cars of Logged In Owner
export const getOwnerCars = async (req, res) => {
  try {
    const { _id } = req.user;   // Logged in owner ka id
    const cars = await Car.find({ owner: _id });   // Sare cars us owner ke

    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// API to Toggle Car Availability
// Toggle Car Availability Controller
export const toggleCarAvailability = async (req, res) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;
    const car = await Car.findById(carId);

    // Checking if car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.isAvailable = !car.isAvailable;
    await car.save();

    res.json({ success: true, message: "Availability Toggled" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


  export const deleteCar = async (req, res) => {
  try {
    const { carId } = req.body;
    const { _id } = req.user; // login user ki id

    const car = await Car.findById(carId);

    // Checking if car belongs to the user
    if (car.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    car.owner = null;
    car.isAvailable = false;

    await Car.findByIdAndDelete(carId);

    res.json({ success: true, message: "Car Removed" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};


// API to get Dashboard Data
// ownerController.js



export const getDashboardData = async (req, res) => {
  try {
    const { _id, role } = req.user;

    // Only owner can access this
    if (role !== "owner") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Fetch cars owned by this owner
    const cars = await Car.find({ owner: _id });

    // Fetch all bookings of this owner's cars
    const bookings = await Booking.find({ owner: _id })
      .populate("car")
      .sort({ createdAt: -1 });

    // Pending bookings
    const pendingBookings = await Booking.find({
      owner: _id,
      status: "pending",
    }).populate("car");

    // Completed bookings
    const completedBookings = await Booking.find({
      owner: _id,
      status: "completed",
    }).populate("car");

    
    // Calculate monthlyRevenue from bookings where status is confirmed
const monthlyRevenue = bookings
  .slice()
  .filter(booking => booking.status === 'confirmed')
  .reduce((acc, booking) => acc + booking.price, 0);

const dashboardData = {
  totalCars: cars.length,
  totalBookings: bookings.length,
  pendingBookings: pendingBookings.length,
  completedBookings: completedBookings.length,
  recentBookings: bookings.slice(0,3), // last 5 bookings, latest first
  monthlyRevenue
};



res.json({success:true,dashboardData})

  } catch (error) {
    console.error("Dashboard error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const updateUserImage=async(req,res)=>{
    try{
        const {_id}=req.user;
        const imageFile = req.file;

        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        });

        var optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                {  width:"400"},
                {quality:"auto"},
                {format:"webp"}
            ]
        });

        const image=optimizedImageUrl ;
        await User.findByIdAndUpdate(_id,{image});
        res.json({success:true,message:"Image Upload"})

    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}