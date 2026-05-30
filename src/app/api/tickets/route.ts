import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { tickets } = body;

    if (!tickets || !Array.isArray(tickets)) {
      return NextResponse.json({ message: "No tickets provided" }, { status: 400 });
    }

    const createdTickets = [];
    const baseCode = "DK-" + Math.random().toString(36).substr(2, 4).toUpperCase();

    for (let i = 0; i < tickets.length; i++) {
      const item = tickets[i];
      // If a user bought quantity=2, we need to create 2 distinct ticket rows
      for (let j = 0; j < item.quantity; j++) {
        const ticket = await prisma.ticket.create({
          data: {
            userId: (session.user as any).id,
            event: "YOASOBI",
            date: "15 AUGUST 2026 | 15:00",
            location: "Istora Senayan",
            category: item.name,
            seat: "A-" + Math.floor(Math.random() * 100),
            bookingCode: baseCode + "-" + Math.random().toString(36).substr(2, 4).toUpperCase(),
            gate: "GATE 3",
            price: item.price,
            status: "upcoming"
          }
        });
        createdTickets.push(ticket);
      }
    }

    return NextResponse.json({ message: "Tickets purchased", tickets: createdTickets }, { status: 201 });
  } catch (error) {
    console.error("Purchase error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tickets = await prisma.ticket.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error("Fetch tickets error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
