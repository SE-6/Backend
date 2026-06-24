import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'se006_posts',
    resource_type: 'image', // gif included
    format: 'webp',
    transformation: [{ width: 1024, height: 1024, crop: 'limit' }],
    limits: {
      fileSize: 8 * 1024 * 1024, // 8MB
    },
  } as any,
});

const upload = multer({ storage });

export default upload;
