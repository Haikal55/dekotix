import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Ticket, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const usersCount = await prisma.user.count();
  const ticketsCount = await prisma.ticket.count();
  const eventsCount = await prisma.event.count();
  
  // Calculate total revenue
  const tickets = await prisma.ticket.findMany({ select: { price: true } });
  const totalRevenue = tickets.reduce((acc, t) => acc + t.price, 0);

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your events, users, and ticket sales.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {totalRevenue.toLocaleString("id-ID")}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tickets Sold</CardTitle>
            <Ticket className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ticketsCount}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersCount}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Events</CardTitle>
            <Calendar className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventsCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="bg-card/50 backdrop-blur border-border/50 p-6 flex flex-col justify-center items-center h-64 text-center">
            <h3 className="font-bold text-xl mb-2">Recent Transactions</h3>
            <p className="text-muted-foreground">Coming soon: A detailed table of recent user purchases.</p>
         </Card>
         <Link href="/admin/events" className="transition-all hover:scale-[1.02]">
           <Card className="bg-card/50 backdrop-blur border-border/50 p-6 flex flex-col justify-center items-center h-64 text-center hover:border-primary/50 cursor-pointer h-full">
              <h3 className="font-bold text-xl mb-2">Event Management</h3>
              <p className="text-muted-foreground">Manage your events, update details, and change dates dynamically.</p>
           </Card>
         </Link>
      </div>
    </div>
  );
}
