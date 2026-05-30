export const eventData = {
  title: "YOASOBI | THE LIVE EXPERIENCE 2026",
  date: "2026-08-15T18:00:00+07:00",
  formattedDate: "August 15, 2026",
  location: "Istora Senayan",
  address: "Istora Senayan, Gelora Bung Karno Sports Complex, Senayan Gate 1, Gelora, Tanah Abang, Central Jakarta 10270, Indonesia",
  capacity: "7,000",
  duration: "180 Minutes",
  mapEmbedUrl: "https://www.google.com/maps?q=Istora+Senayan&output=embed",
  mapExternalUrl: "https://www.google.com/maps?q=Istora+Senayan",
  description: "Experience the most anticipated J-Pop phenomenon live in Jakarta. Featuring state-of-the-art stage design, exclusive merchandise, and an unforgettable setlist spanning their greatest hits.",
  artist: {
    name: "YOASOBI",
    image: "https://www.billboard.com/wp-content/uploads/2024/12/YOASOBI-Photo-Mayuka-bb-japan-2024-billboard-1548.jpg", // placeholder concert image
    bio: "YOASOBI is a Japanese music superduo composed of Vocaloid producer Ayase and singer-songwriter ikura. Known for turning novels into music, they have become a global sensation."
  },
  images: {
    hero: "https://assets.teenvogue.com/photos/63b98a0effed78bd420c4383/16:9/w_2560%2Cc_limit/YOASOBI_A%25E5%2586%2599_2021_12.jpg",
    venue: "https://gbk.id/upload/1619165011-Istora_1.jpg"
  }
};

export const scheduleData = [
  {
    time: "15:00",
    title: "Gate Open",
    description: "Merchandise booths and food stalls open. VIP entry begins."
  },
  {
    time: "17:30",
    title: "Opening Act",
    description: "Special guest performance."
  },
  {
    time: "19:00",
    title: "Main Performance",
    description: "YOASOBI takes the stage."
  },
  {
    time: "22:00",
    title: "Event End",
    description: "Safe travels home."
  }
];

export const ticketsData = [
  {
    id: "vip",
    name: "VIP",
    subtitle: "NUMBERED SEATING",
    price: "IDR 2.750.000",
    color: "bg-[#1e40af]", // Dark Blue
    benefits: [
      "1 (ONE) CAT 1 TICKET (NUMBERED SEATING)",
      "DEDICATED MERCHANDISE LANE",
      "EXCLUSIVE YOASOBI DIGITAL SIGNED POSTCARD",
      "EXCLUSIVE YOASOBI VIP CARD & LANYARD"
    ]
  },
  {
    id: "cat1",
    name: "CAT 1",
    subtitle: "NUMBERED SEATING",
    price: "IDR 2.000.000",
    color: "bg-[#5eead4]", // Cyan
    benefits: []
  },
  {
    id: "festival",
    name: "FESTIVAL",
    subtitle: "FREE STANDING",
    price: "IDR 1.750.000",
    color: "bg-[#ef4444]", // Red
    benefits: []
  },
  {
    id: "cat2",
    name: "CAT 2",
    subtitle: "NUMBERED SEATING",
    price: "IDR 1.550.000",
    color: "bg-[#22c55e]", // Green
    benefits: []
  },
  {
    id: "cat3",
    name: "CAT 3",
    subtitle: "NUMBERED SEATING",
    price: "IDR 1.450.000",
    color: "bg-[#f59e0b]", // Orange
    benefits: []
  }
];

export const faqData = [
  {
    question: "What is the refund policy?",
    answer: "Tickets are strictly non-refundable unless the event is cancelled or rescheduled by the promoter."
  },
  {
    question: "What are the entry requirements?",
    answer: "You must present a valid e-ticket and an original government-issued ID matching the name on the ticket."
  },
  {
    question: "Are there any age restrictions?",
    answer: "Attendees must be at least 14 years old. Minors under 18 must be accompanied by an adult."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major credit cards, bank transfers, and local e-wallets including GoPay and OVO."
  },
  {
    question: "Can I transfer my ticket to someone else?",
    answer: "Ticket transfers are not allowed. The name on the ticket must match your physical ID at the gate."
  }
];

export const sponsorsData = [
  { id: 1, name: "Sponsor 1", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: 2, name: "Sponsor 2", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { id: 3, name: "Sponsor 3", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
  { id: 4, name: "Sponsor 4", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" },
];

export const onSaleData = [
  {
    id: "day1",
    title: "General On-Sale Day 1",
    subtitle: "(26 February 2025)",
    description: "Starts on Saturday, 15 August 2026 at 03PM\n(GMT +7 / Jakarta Local Time)",
    link: "/buy-tickets"
  },
  {
    id: "day2",
    title: "General On-Sale Day 2",
    subtitle: "(27 February 2025)",
    description: "Starts on Saturday, 15 August 2026 at 03PM\n(GMT +7 / Jakarta Local Time)",
    link: "/buy-tickets"
  }
];
