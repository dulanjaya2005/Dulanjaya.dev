import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  file: string | Buffer,
  folder: string = "portfolio"
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(
    typeof file === "string" ? file : `data:image/png;base64,${file.toString("base64")}`,
    {
      folder,
      transformation: [
        { width: 1200, height: 800, crop: "fill", quality: "auto" },
      ],
    }
  );
  return { url: result.secure_url, publicId: result.public_id };
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
