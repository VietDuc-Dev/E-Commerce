import app from "./app";
import { createTables } from "./common/utils/createTables";
import { connectDatabase } from "./database/db";
import { config } from "./config/app.config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLIENT_NAME,
  api_key: config.CLOUDINARY_CLIENT_API,
  api_secret: config.CLOUDINARY_CLIENT_SECRET,
});

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT}`);
  await connectDatabase();
  await createTables();
});
