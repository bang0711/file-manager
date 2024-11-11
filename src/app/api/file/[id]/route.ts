import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
// import { ImageResponse } from "next/og";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export const GET = async (req: Request, { params }: Props) => {
  const { id } = await params;

  const file = await prisma.file.findUnique({
    where: {
      id,
    },
  });
  const headers = new Headers();
  if (!file) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/photo.png`,
    );

    const blob = await res.blob();
    const image = await blob.arrayBuffer();

    headers.set("Content-Type", "image/png");

    return new NextResponse(image, {
      status: 200,
      statusText: "OK",
      headers,
    });
  }

  headers.set("Content-Type", file?.type);

  return new NextResponse(file?.value, {
    status: 200,
    statusText: "OK",
    headers,
  });
};
