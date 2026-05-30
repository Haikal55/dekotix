"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Ticket, Settings, LogOut, Calendar, MapPin, ExternalLink, Edit2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventData } from "@/data/event";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState<"tickets" | "profile">("tickets");
  const [myTickets, setMyTickets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile State
  const [profile, setProfile] = useState({ firstName: "", lastName: "", email: "", phone: "", passport: "" });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ticketsRes, profileRes] = await Promise.all([
          fetch("/api/tickets"),
          fetch("/api/user/profile")
        ]);
        
        if (ticketsRes.ok) {
          const ticketsData = await ticketsRes.json();
          setMyTickets(ticketsData);
        }
        
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          const names = profileData.name ? profileData.name.split(" ") : ["", ""];
          setProfile({
            firstName: names[0] || "",
            lastName: names.slice(1).join(" ") || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            passport: profileData.passport || ""
          });
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `${profile.firstName} ${profile.lastName}`.trim(), phone: profile.phone, passport: profile.passport })
      });
      if (res.ok) {
        setIsEditingProfile(false);
      } else {
        alert("Failed to save profile");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen pt-24 pb-32 bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32 bg-background relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute top-0 w-full h-[400px] bg-gradient-to-b from-primary/10 to-transparent -z-10" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Menu */}
          <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{profile.firstName ? `${profile.firstName} ${profile.lastName}` : "Loading..."}</h2>
                <p className="text-sm text-muted-foreground">{profile.email || "Loading..."}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("tickets")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "tickets" ? "bg-primary text-primary-foreground" : "hover:bg-card text-muted-foreground hover:text-foreground"}`}
              >
                <Ticket className="w-5 h-5" />
                My Tickets
              </button>
              <button 
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-card text-muted-foreground hover:text-foreground"}`}
              >
                <Settings className="w-5 h-5" />
                Account Settings
              </button>
              <div className="border-t border-border/50 my-2" />
              {((session?.user as any)?.role === "ADMIN" || session?.user?.email === "admin@dekotix.com") && (
                <Link href="/admin">
                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium hover:bg-primary/10 text-primary">
                    <ShieldCheck className="w-5 h-5" />
                    Admin Panel
                  </button>
                </Link>
              )}
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium hover:bg-destructive/10 text-destructive"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === "tickets" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
                </div>

                <div className="flex flex-col gap-4">
                  {isLoading ? (
                    <div className="flex justify-center p-10">
                      <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    </div>
                  ) : myTickets.length === 0 ? (
                    <Card className="border-border/50 bg-card/40 p-10 text-center">
                      <p className="text-muted-foreground mb-4">You don't have any tickets yet.</p>
                      <Link href="/buy-tickets">
                        <Button>Browse Events</Button>
                      </Link>
                    </Card>
                  ) : myTickets.map((ticket, i) => (
                    <Card key={ticket.id} 
                      className={`border-0 overflow-hidden transition-all hover:scale-[1.01] shadow-xl ${ticket.status === 'past' ? 'opacity-60 grayscale' : ''}`}
                      style={{
                        background: ticket.status === 'upcoming' ? "linear-gradient(135deg, #7c2275 0%, #3e1666 40%, #151a5a 100%)" : undefined
                      }}
                    >
                      <div className="flex flex-col sm:flex-row h-full">
                        <div className={`w-full sm:w-32 flex flex-col items-center justify-center p-4 relative ${ticket.status === 'upcoming' ? 'border-r border-white/10' : 'bg-muted text-muted-foreground border-r border-border/50'}`}>
                          {ticket.status === 'upcoming' && (
                            <>
                              <div className="absolute top-[-10px] right-[-10px] w-5 h-5 rounded-full bg-background hidden sm:block" />
                              <div className="absolute bottom-[-10px] right-[-10px] w-5 h-5 rounded-full bg-background hidden sm:block" />
                            </>
                          )}
                          <span className={`text-sm font-bold uppercase tracking-widest ${ticket.status === 'upcoming' ? 'text-fuchsia-400' : ''}`}>{ticket.status}</span>
                        </div>
                        
                        <div className={`flex-1 p-5 sm:p-6 flex flex-col justify-between ${ticket.status === 'upcoming' ? 'text-white' : ''}`}>
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-black text-2xl uppercase tracking-wide drop-shadow-md">{ticket.event}</h3>
                              <span className={`text-xs font-mono px-2 py-1 rounded hidden sm:block ${ticket.status === 'upcoming' ? 'bg-white/10 border border-white/20' : 'bg-background border border-border/50'}`}>
                                ID: {ticket.bookingCode}
                              </span>
                            </div>
                            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm font-medium mb-6 ${ticket.status === 'upcoming' ? 'text-white/80' : 'text-muted-foreground'}`}>
                              <span className="flex items-center gap-1.5 font-bold tracking-widest"><Calendar className="w-4 h-4" /> {ticket.date}</span>
                              <span className={`flex items-center gap-1.5 uppercase ${ticket.status === 'upcoming' ? 'text-cyan-400' : ''}`}><MapPin className="w-4 h-4" /> {ticket.location}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-6">
                              <div className="flex flex-col">
                                <span className={`text-[10px] uppercase tracking-widest ${ticket.status === 'upcoming' ? 'text-fuchsia-400' : 'text-muted-foreground'}`}>Category</span>
                                <span className="font-bold">{ticket.category}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className={`text-[10px] uppercase tracking-widest ${ticket.status === 'upcoming' ? 'text-fuchsia-400' : 'text-muted-foreground'}`}>Seat</span>
                                <span className="font-bold">{ticket.seat}</span>
                              </div>
                            </div>
                            
                            {ticket.status === 'upcoming' && (
                              <Link href={`/ticket?id=${ticket.id}`}>
                                <Button size="sm" className="gap-2 bg-white text-black hover:bg-white/90">
                                  View Ticket <ExternalLink className="w-3.5 h-3.5" />
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
                </div>

                <Card className="border-border/50 bg-card/40 backdrop-blur-md mb-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Manage your details and contact info.</CardDescription>
                    </div>
                    {isEditingProfile ? (
                      <Button onClick={handleSaveProfile} disabled={isSavingProfile} className="gap-2">
                        {isSavingProfile ? "Saving..." : "Save Changes"}
                      </Button>
                    ) : (
                      <Button onClick={() => setIsEditingProfile(true)} variant="outline" size="icon">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">First Name</span>
                        {isEditingProfile ? (
                          <input 
                            value={profile.firstName} 
                            onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          />
                        ) : (
                          <p className="font-medium text-lg">{profile.firstName || "-"}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Last Name</span>
                        {isEditingProfile ? (
                          <input 
                            value={profile.lastName} 
                            onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          />
                        ) : (
                          <p className="font-medium text-lg">{profile.lastName || "-"}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Email Address</span>
                        <p className="font-medium text-lg text-muted-foreground">{profile.email || "-"}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Phone Number</span>
                        {isEditingProfile ? (
                          <input 
                            value={profile.phone} 
                            onChange={(e) => setProfile({...profile, phone: e.target.value})}
                            placeholder="+62 812..."
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          />
                        ) : (
                          <p className="font-medium text-lg">{profile.phone || "-"}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">ID / Passport</span>
                        {isEditingProfile ? (
                          <input 
                            value={profile.passport} 
                            onChange={(e) => setProfile({...profile, passport: e.target.value})}
                            placeholder="Passport / KTP"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          />
                        ) : (
                          <p className="font-medium text-lg">{profile.passport || "-"}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/40 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle>Security</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
