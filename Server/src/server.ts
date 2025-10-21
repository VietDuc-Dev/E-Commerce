import app from "./app";
import { config } from "./config/app.config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLIENT_NAME,
  api_key: config.CLOUDINARY_CLIENT_API,
  api_secret: config.CLOUDINARY_CLIENT_SECRET,
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
