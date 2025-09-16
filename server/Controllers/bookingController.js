import Booking from "../models/Booking.js";
import Car from "../models/Car.js";


  const checkAvailability = async (car, pickupDate, returnDate) => {


const start=new Date(pickupDate);
start.setHours(0,0,0,0);
const end=new Date(returnDate);
end.setHours(23,59,59,999);

console.log(start,end);



    const bookings = await Booking.find({
        car: car,
        pickupDate: { $lte: end},
        returnDate: { $gte: start},
    });
    console.log(bookings);
    
    return bookings.length === 0;
}



export const checkAvailabilityOfCar = async (req, res) => {
    try {
      const {location,pickupDate,returnDate}=req.body;
      const cars=await Car.find({location,isAvailable:true});
    

      const availablecarPromises=cars.map(async(car)=>{
        const isAvailable=await checkAvailability(car._id,pickupDate,returnDate);
       
return {...car._doc,isAvailable:isAvailable};
      });

      let availableCars=await Promise.all(availablecarPromises);
      availableCars=availableCars.filter(car=>car.isAvailable===true);
      res.json({success:true,cars:availableCars})
    }catch (error) {
        console.log(error.message);
      res.json({success:false,message:error.message})
    }
}



export const createBooking=async(req,res)=>{
    try {
        const {carId,pickupDate,returnDate}=req.body;
        const { _id } = req.user;

        const isAvailable=await checkAvailability(carId,pickupDate,returnDate);
        console.log(isAvailable);
        
        if(!isAvailable){
            return res.json({success:false,message:"Car is not available for the selected dates"})
        }
        console.log("car availabe");
        
        const carData=await Car.findById(carId);

        const picked=new Date(pickupDate);
        picked.setHours(0,0,0,0);
        const returned=new Date(returnDate);
        returned.setHours(23,59,59,999);
        const noOfDays=Math.ceil((returned.getTime()-picked.getTime())/(1000*3600*24))+1;
        const price=carData.pricePerDay*noOfDays;
        await Booking.create({
            car:carId,
            user:_id,
            owner:carData.owner,
            pickupDate:new Date(pickupDate),
            returnDate:new Date(returnDate),
            price
        });
        res.json({success:true,message:"Booking created successfully"})
    } catch (error) {
        console.log(error.message);
      res.json({success:false,message:error.message})
    }
}
export const getUserBookings=async(req,res)=>{
    try {
        const { _id } = req.user;
        const bookings=await Booking.find({user:_id}).populate("car").sort({createdAt:-1})
        res.json({success:true,bookings})
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}


// API to get Owner Bookings
export const getOwnerBookings = async (req, res) => {
  try {
    // Check if user is owner
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Fetch bookings for this owner
    const bookings = await Booking.find({ owner: req.user._id })
      .populate("car user")              // populate car and user data
      .select("-user.password")          // exclude user password
      .sort({ createdAt: -1 });          // latest first

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};



// bookingController.js

export const changeBookingStatus = async (req, res) => {
  try {
    const { _id } = req.user; // Logged-in owner's ID
    const { bookingId, status } = req.body;

    // Find booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found" });
    }

    // Check if the logged-in user is the owner of this booking
    if (booking.owner.toString() !== _id.toString()) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Update booking status
    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Booking status updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};