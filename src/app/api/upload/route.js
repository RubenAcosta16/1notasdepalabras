import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "djfxw2r3m",
  api_key: "513429885957311",
  api_secret: "BeDGZrRsJ8yNo7yrmMP5bqI5gis",
});

// un try catch y un loading para el dashboard

export async function POST(request) {
  const data = await request.formData();
  const img = data.get("img");

  console.log(img)

  if (!img) {
    return NextResponse.json("No se envio ninguna imagen", {
      status: 400,
    });
  }

  const bytes = await img.arrayBuffer();
  const buffer = Buffer.from(bytes);

  //   //   guardar en archivo
  // //   aqui es para guardar en el sistema operativo pero no sirve
  //   const filePath = path.join(process.cwd(), "public", img.name);
  // //   await writeFile(filePath, buffer);

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) reject(err);
        resolve(result);
      })
      .end(buffer);
  }); 

  // hasta aqui ya esta
  //   console.log(response.secure_url);

  return NextResponse.json({ message: "img subida", url: response.secure_url });
}
