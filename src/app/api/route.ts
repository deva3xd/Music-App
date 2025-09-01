import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const songs = await prisma.song.findMany({});
  return NextResponse.json({ songs });
};

export const POST = async (req: NextRequest) => {
  try {
    // Get data
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const artist = formData.get("artist") as string;
    const thumbnail = formData.get("thumbnail") as File | null;
    const audio = formData.get("audio") as File;
    
    let thumbnailUrl: string | null = null;

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

    const song = await prisma.song.create({
      data: {
        title,
        artist,
        thumbnail: thumbnailUrl, 
        audio: audio.name, 
      },
    });
    return NextResponse.json({ song });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};

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