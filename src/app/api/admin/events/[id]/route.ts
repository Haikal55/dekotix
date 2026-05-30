import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || ((session.user as any).role !== "ADMIN" && session.user.email !== "admin@dekotix.com")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        title: data.title,
        location: data.location,
        capacity: parseInt(data.capacity),
        artistName: data.artistName,
        date: new Date(data.date),
        description: data.description,
        categories: {
          deleteMany: {},
          create: data.categories?.map((c: any) => ({
            name: c.name,
            subtitle: c.subtitle,
            price: parseInt(c.price),
            color: c.color,
            capacity: parseInt(c.capacity),
            benefits: c.benefits
          })) || []
        },
        schedules: {
          deleteMany: {},
          create: data.schedules?.map((s: any) => ({
            time: s.time,
            title: s.title,
            description: s.description
          })) || []
        },
        faqs: {
          deleteMany: {},
          create: data.faqs?.map((f: any) => ({
            question: f.question,
            answer: f.answer
          })) || []
        },
        sponsors: {
          deleteMany: {},
          create: data.sponsors?.map((s: any) => ({
            name: s.name,
            logo: s.logo
          })) || []
        }
      },
      include: {
        categories: true,
        schedules: true,
        faqs: true,
        sponsors: true
      }
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
