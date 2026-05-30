const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create first admin user if not exists
  const adminEmail = 'admin@dekotix.com';
  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  
  if (!admin) {
    // using a dummy hashed password for 'admin123'
    // in real life we would require bcrypt
    admin = await prisma.user.create({
      data: {
        name: 'Super Admin',
        email: adminEmail,
        password: '$2a$10$WqB4h611c0KzU4/8H4vXy.60fD23Ue8m5J2GvX6g5Y3jL4P5Q6Y', 
        role: 'ADMIN'
      }
    });
    console.log('Created Admin User: admin@dekotix.com / password: (must reset/dummy)');
  }

  // Clear existing event data to prevent duplicates on re-run
  await prisma.sponsor.deleteMany({});
  await prisma.fAQ.deleteMany({});
  await prisma.schedule.deleteMany({});
  await prisma.ticketCategory.deleteMany({});
  await prisma.event.deleteMany({});

  // 1. Create Event
  const event = await prisma.event.create({
    data: {
      title: "YOASOBI | THE LIVE EXPERIENCE 2026",
      date: new Date("2026-08-15T18:00:00+07:00"),
      location: "Istora Senayan",
      address: "Istora Senayan, Gelora Bung Karno Sports Complex, Senayan Gate 1, Gelora, Tanah Abang, Central Jakarta 10270, Indonesia",
      capacity: 7000,
      duration: "180 Minutes",
      description: "Experience the most anticipated J-Pop phenomenon live in Jakarta. Featuring state-of-the-art stage design, exclusive merchandise, and an unforgettable setlist spanning their greatest hits.",
      artistName: "YOASOBI",
      artistBio: "YOASOBI is a Japanese music superduo composed of Vocaloid producer Ayase and singer-songwriter ikura. Known for turning novels into music, they have become a global sensation.",
      artistImages: [
        "https://www.billboard.com/wp-content/uploads/2024/12/YOASOBI-Photo-Mayuka-bb-japan-2024-billboard-1548.jpg",
        "https://assets.teenvogue.com/photos/63b98a0effed78bd420c4383/16:9/w_2560%2Cc_limit/YOASOBI_A%25E5%2586%2599_2021_12.jpg",
        "https://gbk.id/upload/1619165011-Istora_1.jpg"
      ],
      heroImage: "https://assets.teenvogue.com/photos/63b98a0effed78bd420c4383/16:9/w_2560%2Cc_limit/YOASOBI_A%25E5%2586%2599_2021_12.jpg",
      venueImage: "https://gbk.id/upload/1619165011-Istora_1.jpg"
    }
  });

  // 2. Create Categories
  await prisma.ticketCategory.createMany({
    data: [
      { eventId: event.id, name: "VIP", subtitle: "NUMBERED SEATING", price: 2750000, color: "bg-[#1e40af]", benefits: ["1 (ONE) CAT 1 TICKET (NUMBERED SEATING)", "DEDICATED MERCHANDISE LANE", "EXCLUSIVE YOASOBI DIGITAL SIGNED POSTCARD", "EXCLUSIVE YOASOBI VIP CARD & LANYARD"] },
      { eventId: event.id, name: "CAT 1", subtitle: "NUMBERED SEATING", price: 2000000, color: "bg-[#5eead4]", benefits: [] },
      { eventId: event.id, name: "FESTIVAL", subtitle: "FREE STANDING", price: 1750000, color: "bg-[#ef4444]", benefits: [] },
      { eventId: event.id, name: "CAT 2", subtitle: "NUMBERED SEATING", price: 1550000, color: "bg-[#22c55e]", benefits: [] },
      { eventId: event.id, name: "CAT 3", subtitle: "NUMBERED SEATING", price: 1450000, color: "bg-[#f59e0b]", benefits: [] },
    ]
  });

  // 3. Create Schedules
  await prisma.schedule.createMany({
    data: [
      { eventId: event.id, time: "15:00", title: "Gate Open", description: "Merchandise booths and food stalls open. VIP entry begins." },
      { eventId: event.id, time: "17:30", title: "Opening Act", description: "Special guest performance." },
      { eventId: event.id, time: "19:00", title: "Main Performance", description: "YOASOBI takes the stage." },
      { eventId: event.id, time: "22:00", title: "Event End", description: "Safe travels home." },
    ]
  });

  // 4. Create FAQs
  await prisma.fAQ.createMany({
    data: [
      { eventId: event.id, question: "What is the refund policy?", answer: "Tickets are strictly non-refundable unless the event is cancelled or rescheduled by the promoter." },
      { eventId: event.id, question: "What are the entry requirements?", answer: "You must present a valid e-ticket and an original government-issued ID matching the name on the ticket." },
      { eventId: event.id, question: "Are there any age restrictions?", answer: "Attendees must be at least 14 years old. Minors under 18 must be accompanied by an adult." },
      { eventId: event.id, question: "What payment methods are accepted?", answer: "We accept all major credit cards, bank transfers, and local e-wallets including GoPay and OVO." },
      { eventId: event.id, question: "Can I transfer my ticket to someone else?", answer: "Ticket transfers are not allowed. The name on the ticket must match your physical ID at the gate." },
    ]
  });

  // 5. Create Sponsors
  await prisma.sponsor.createMany({
    data: [
      { eventId: event.id, name: "Sponsor 1", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
      { eventId: event.id, name: "Sponsor 2", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
      { eventId: event.id, name: "Sponsor 3", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
      { eventId: event.id, name: "Sponsor 4", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" },
    ]
  });

  console.log('Database seeded successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
