import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
console.log('cloud_name=', CLOUDINARY_CLOUD_NAME);
console.log('api_key=', CLOUDINARY_API_KEY ? CLOUDINARY_API_KEY.length : 'undefined');
console.log('api_secret=', CLOUDINARY_API_SECRET ? CLOUDINARY_API_SECRET.length : 'undefined');
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

try {
  const result = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/sample.jpg');
  console.log('upload success', result.secure_url);
} catch (error) {
  console.error('upload error', error);
  if (error.http_code) console.error('http_code', error.http_code);
  if (error.request && error.request.path) console.error('request path', error.request.path);
  process.exit(1);
}
