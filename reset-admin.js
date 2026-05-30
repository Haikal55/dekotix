const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@dekotix.com' },
    update: { password: hash, role: 'ADMIN' },
    create: { email: 'admin@dekotix.com', name: 'Super Admin', password: hash, role: 'ADMIN' }
  });
  console.log('Admin password successfully updated to admin123');
}

main().catch(console.error).finally(() => prisma.$disconnect());
