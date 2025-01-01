import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const configContent = `
export const {
  MONGO_URI,
  PORT,
  JWT_KEY,
  NODE_ENV,
  MAILTRAP_TOKEN,
  EMAIL_FROM,
  EMAIL_FROM_NAME,
  CLIENT_URL,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = process.env;
`;
fs.writeFileSync('./config.js', configContent);
console.log('Config file generated.');
