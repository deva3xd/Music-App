// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import type { song } from "@prisma/client";

// const prisma = new PrismaClient();

// export const POST = async(request: Request) => {
//     const body: Todos = await request.json();
//     const todo = await prisma.todos.create({
//         data: {
//             name: body.name
//         }
//     })
//     return NextResponse.json(todo, {status: 201});
// }

// export const GET = async () => {
//     try {
//         const todos = await prisma.todos.findMany();
//         const count = await prisma.todos.count();

//         return NextResponse.json({
//             data: todos,
//             count: count,
//         });
//     } catch (error) {
//         console.error("Error fetching todos:", error);
//     }
// };