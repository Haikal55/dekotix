const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.ticket.updateMany({
    data: {
      event: 'YOASOBI',
      date: '15 AUGUST 2026 | 15:00'
    }
  });
  console.log('Successfully updated all existing tickets!');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
