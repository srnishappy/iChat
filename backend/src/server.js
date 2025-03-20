import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import express from 'express';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';
import { connectDb } from './lib/db.js';
import { app, server } from './lib/socket.js';
import cors from 'cors';

const PORT = process.env.PORT || 5000;
app;
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

server.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
  connectDb();
});
