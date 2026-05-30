"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Edit, Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EventsClient({ initialEvents }: { initialEvents: any[] }) {
  const [events, setEvents] = useState(initialEvents);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  const startEdit = (event: any) => {
    setEditingId(event.id);
    
    // Fix timezone issue for datetime-local input
    const d = new Date(event.date);
    const localTime = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);

    setEditForm({ 
      ...event, 
      date: localTime,
      categories: event.categories || [],
      schedules: event.schedules || [],
      faqs: event.faqs || [],
      sponsors: event.sponsors || []
    });
    setActiveTab("general");
  };

  const handleSave = async (id: string) => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editForm,
          date: new Date(editForm.date).toISOString(),
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setEvents(events.map(e => e.id === id ? updated : e));
        setEditingId(null);
      } else {
        alert("Failed to save event");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const addArrayItem = (key: string, item: any) => {
    setEditForm({ ...editForm, [key]: [...editForm[key], item] });
  };

  const removeArrayItem = (key: string, index: number) => {
    const newArr = [...editForm[key]];
    newArr.splice(index, 1);
    setEditForm({ ...editForm, [key]: newArr });
  };

  const updateArrayItem = (key: string, index: number, field: string, value: any) => {
    const newArr = [...editForm[key]];
    newArr[index][field] = value;
    setEditForm({ ...editForm, [key]: newArr });
  };

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="text-muted-foreground flex items-center gap-2 hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Event Management</h1>
          <p className="text-muted-foreground">Manage your live events.</p>
        </div>
        <Button disabled>+ Create New Event</Button>
      </div>

      <div className="grid gap-6">
        {events.map(event => (
          <Card key={event.id} className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
              {editingId === event.id ? (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setEditingId(null)} disabled={isSaving}>Cancel</Button>
                  <Button onClick={() => handleSave(event.id)} disabled={isSaving} className="gap-2 bg-green-600 hover:bg-green-700 text-white">
                    <Save className="w-4 h-4" /> {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => startEdit(event)} className="gap-2">
                  <Edit className="w-4 h-4" /> Edit Event
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {editingId === event.id ? (
                <div className="flex flex-col gap-6">
                  {/* Tabs */}
                  <div className="flex gap-2 border-b border-border/50 pb-2 overflow-x-auto">
                    {['general', 'categories', 'schedules', 'faqs', 'sponsors'].map(tab => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 capitalize font-semibold rounded-lg transition-colors ${activeTab === tab ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-muted'}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {activeTab === 'general' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-background/50 p-6 rounded-xl border border-border/50">
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Event Title</label>
                        <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Artist / Headliner</label>
                        <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.artistName} onChange={e => setEditForm({...editForm, artistName: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Location (Venue)</label>
                        <input type="text" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Date & Time</label>
                        <input type="datetime-local" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.date} onChange={e => setEditForm({...editForm, date: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Capacity</label>
                        <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.capacity} onChange={e => setEditForm({...editForm, capacity: e.target.value})} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Description</label>
                        <textarea className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                      </div>
                    </div>
                  )}

                  {activeTab === 'faqs' && (
                    <div className="space-y-4">
                      {editForm.faqs.map((faq: any, idx: number) => (
                        <div key={idx} className="flex gap-4 items-start bg-background/50 p-4 rounded-xl border border-border/50">
                          <div className="flex-1 space-y-4">
                            <input placeholder="Question" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-bold" value={faq.question} onChange={e => updateArrayItem('faqs', idx, 'question', e.target.value)} />
                            <textarea placeholder="Answer" className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={faq.answer} onChange={e => updateArrayItem('faqs', idx, 'answer', e.target.value)} />
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeArrayItem('faqs', idx)} className="text-destructive"><Trash2 className="w-5 h-5"/></Button>
                        </div>
                      ))}
                      <Button variant="outline" onClick={() => addArrayItem('faqs', { question: '', answer: '' })} className="w-full gap-2 border-dashed">
                        <Plus className="w-4 h-4"/> Add FAQ
                      </Button>
                    </div>
                  )}

                  {activeTab === 'schedules' && (
                    <div className="space-y-4">
                      {editForm.schedules.map((sch: any, idx: number) => (
                        <div key={idx} className="flex gap-4 items-start bg-background/50 p-4 rounded-xl border border-border/50">
                          <div className="flex-1 space-y-4">
                            <div className="flex gap-4">
                               <input placeholder="Time (e.g. 15:00)" className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm font-bold font-mono" value={sch.time} onChange={e => updateArrayItem('schedules', idx, 'time', e.target.value)} />
                               <input placeholder="Title" className="flex h-10 flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm font-bold" value={sch.title} onChange={e => updateArrayItem('schedules', idx, 'title', e.target.value)} />
                            </div>
                            <textarea placeholder="Description" className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={sch.description} onChange={e => updateArrayItem('schedules', idx, 'description', e.target.value)} />
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeArrayItem('schedules', idx)} className="text-destructive"><Trash2 className="w-5 h-5"/></Button>
                        </div>
                      ))}
                      <Button variant="outline" onClick={() => addArrayItem('schedules', { time: '', title: '', description: '' })} className="w-full gap-2 border-dashed">
                        <Plus className="w-4 h-4"/> Add Schedule Item
                      </Button>
                    </div>
                  )}

                  {activeTab === 'categories' && (
                    <div className="space-y-4">
                      {editForm.categories.map((cat: any, idx: number) => (
                        <div key={idx} className="flex gap-4 items-start bg-background/50 p-4 rounded-xl border border-border/50">
                          <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                               <div className="space-y-1">
                                 <label className="text-[10px] uppercase text-muted-foreground font-bold">Category Name</label>
                                 <input placeholder="CAT 1" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-bold" value={cat.name} onChange={e => updateArrayItem('categories', idx, 'name', e.target.value)} />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10px] uppercase text-muted-foreground font-bold">Subtitle</label>
                                 <input placeholder="SEATING" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={cat.subtitle} onChange={e => updateArrayItem('categories', idx, 'subtitle', e.target.value)} />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10px] uppercase text-muted-foreground font-bold">Price (IDR)</label>
                                 <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono" value={cat.price} onChange={e => updateArrayItem('categories', idx, 'price', e.target.value)} />
                               </div>
                               <div className="space-y-1">
                                 <label className="text-[10px] uppercase text-muted-foreground font-bold">Color Class</label>
                                 <input placeholder="bg-[#ff0000]" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono" value={cat.color} onChange={e => updateArrayItem('categories', idx, 'color', e.target.value)} />
                               </div>
                            </div>
                            <div className="space-y-1">
                               <label className="text-[10px] uppercase text-muted-foreground font-bold">Benefits (Comma Separated)</label>
                               <input placeholder="Benefit 1, Benefit 2" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={cat.benefits?.join(', ') || ''} onChange={e => updateArrayItem('categories', idx, 'benefits', e.target.value.split(',').map((b:string)=>b.trim()).filter(Boolean))} />
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeArrayItem('categories', idx)} className="text-destructive"><Trash2 className="w-5 h-5"/></Button>
                        </div>
                      ))}
                      <Button variant="outline" onClick={() => addArrayItem('categories', { name: '', subtitle: '', price: 0, color: 'bg-primary', capacity: 1000, benefits: [] })} className="w-full gap-2 border-dashed">
                        <Plus className="w-4 h-4"/> Add Ticket Category
                      </Button>
                    </div>
                  )}

                  {activeTab === 'sponsors' && (
                    <div className="space-y-4">
                      {editForm.sponsors.map((spo: any, idx: number) => (
                        <div key={idx} className="flex gap-4 items-center bg-background/50 p-4 rounded-xl border border-border/50">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <input placeholder="Sponsor Name" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-bold" value={spo.name} onChange={e => updateArrayItem('sponsors', idx, 'name', e.target.value)} />
                            <input placeholder="Logo URL" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={spo.logo} onChange={e => updateArrayItem('sponsors', idx, 'logo', e.target.value)} />
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeArrayItem('sponsors', idx)} className="text-destructive"><Trash2 className="w-5 h-5"/></Button>
                        </div>
                      ))}
                      <Button variant="outline" onClick={() => addArrayItem('sponsors', { name: '', logo: '' })} className="w-full gap-2 border-dashed">
                        <Plus className="w-4 h-4"/> Add Sponsor
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground bg-background/50 px-4 py-3 rounded-lg border border-border/30">
                      <MapPin className="w-5 h-5 text-primary" /> 
                      <span className="font-medium text-foreground">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground bg-background/50 px-4 py-3 rounded-lg border border-border/30">
                      <Calendar className="w-5 h-5 text-primary" /> 
                      <span className="font-medium text-foreground">{new Date(event.date).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex gap-8">
                    <div className="flex-1 bg-background/50 p-4 rounded-lg border border-border/30">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">Artist</span>
                      <p className="font-bold text-xl">{event.artistName}</p>
                    </div>
                    <div className="flex-1 bg-background/50 p-4 rounded-lg border border-border/30">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">Capacity</span>
                      <p className="font-bold text-xl">{event.capacity} People</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
