import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const { id } = context.params; 
  const songId = Number(id);

  const song = await prisma.song.findUnique({
    where: {
      id: songId,
    },
  });

  return NextResponse.json({ song });
};
