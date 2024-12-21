import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from '../config.js';

import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import notificationRoutes from './routes/notification.route.js';
import connectionRoutes from './routes/connection.route.js';

import { connectDB } from './lib/db.js';

const app = express();

app.use(express.json({limit: '5mb'}));
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/connections', connectionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
})