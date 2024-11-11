"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getSession } from "../session";

import prisma from "../prisma";

import sharp from "sharp";
import { gzip } from "zlib";

import { extname } from "path";

export const uploadFile = async (file: File) => {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const { user } = session;
  const { id } = user;

  const { name, type } = file;
  const extension = extname(file.name).replace(".", "");

  let compressedValue: Buffer; // Explicitly type compressedValue as Buffer

  // Compress based on type
  const arrayBuffer = await file.arrayBuffer();
  const originalBuffer = Buffer.from(arrayBuffer);

  const needsCompression =
    type.startsWith("image/") || type.startsWith("text/");

  if (needsCompression) {
    if (type.startsWith("image/")) {
      compressedValue = await sharp(originalBuffer)
        .resize({ width: 1000 })
        .jpeg({ quality: 70 })
        .toBuffer();
    } else {
      compressedValue = await new Promise<Buffer>((resolve, reject) => {
        gzip(originalBuffer, (err, result) => {
          if (err) reject(err);
          else resolve(result as Buffer);
        });
      });
    }
  } else {
    compressedValue = originalBuffer; // Skip compression
  }
  let url = "";

  try {
    const newFile = await prisma.file.create({
      data: {
        extension,
        size: compressedValue.length, // Store the new compressed size
        name,
        type,
        url,
        value: compressedValue,
        user: {
          connect: {
            id,
          },
        },
      },
    });

    url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/file/${newFile.id}`;
    await prisma.file.update({
      where: { id: newFile.id },
      data: { url },
    });

    revalidatePath("/files");

    return { message: "File uploaded successfully", statusCode: 200 };
  } catch (error) {
    return { message: JSON.stringify(error), statusCode: 500 };
  }
};
