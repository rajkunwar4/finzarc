import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.route';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

 // Start of Selection
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/', (req, res)=>{
  res.send('Hello World');
})

const start = async () => {
    try {
      await prisma.$connect();
      console.log('Connected to database');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    } catch (error) {
      console.error('Unable to connect to database:', error);
      process.exit(1);
    }
  };
  
  start();