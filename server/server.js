import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import "dotenv/config";
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/db.js';
import ownerRouter from './routes/ownerRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => 
  res.send('Server is running'));

app.use('/api/user',userRouter);
app.use('/api/owner',ownerRouter);
app.use('/api/bookings',bookingRouter)


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});