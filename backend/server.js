import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true
}

import { PORT, NODE_ENV } from '../config.js';
const __dirname = path.resolve();

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import notificationRoutes from './routes/notification.route.js';
import connectionRoutes from './routes/connection.route.js';

import { connectDB } from './lib/db.js';

const app = express();

if(NODE_ENV !== 'production'){
  app.use(cors(corsOptions));
}

app.use(express.json({limit: '5mb'}));
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/connections', connectionRoutes);

if(NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})