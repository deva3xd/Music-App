import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const songs = await prisma.song.findMany({});
  return NextResponse.json({ songs });
};

export const POST = async (req: NextRequest) => {
  const { title, artist, audio } = await req.json();

  const song = await prisma.song.create({
    data: {
      title,
      artist,
      audio, 
    },
  });

  return NextResponse.json({ song });
};

// Upload thumbnail 
// if (thumbnail) {
//   const uploadRes = await fetch("https://uploadthing.com/api/upload", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${process.env.UPLOADTHING_TOKEN}`,
//     },
//     body: (() => {
//       const fd = new FormData();
//       fd.append("files", thumbnail);
//       return fd;
//     })(),
//   });
//   const data = await uploadRes.json();
//   thumbnailUrl = data[0]?.url || null;
// }

// // Action to delete
// export const DELETE = async (req: NextRequest) => {
//   const url = new URL(req.url).searchParams;
//   const id = Number(url.get("id")) || 0;

//   const post = await prisma.post.delete({
//     where: {
//       id: id,
//     },
//   });

//   if (!post) {
//     return NextResponse.json(
//       {
//         message: "Error",
//       },
//       {
//         status: 500,
//       }
//     );
//   }

//   return NextResponse.json({});
// };

// // Action to update or edit
// export const PUT = async (req: NextRequest) => {
//   const { title, content, id } = await req.json();

//   const post = await prisma.post.update({
//     where: {
//       id: Number(id),
//     },

//     data: {
//       title,
//       content,
//     },
//   });

//   return NextResponse.json({
//     post,
//   });
// };