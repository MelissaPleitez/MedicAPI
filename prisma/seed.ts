import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  await prisma.appointment.deleteMany();
  await prisma.timeBlock.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: hashedPassword,
      name: 'User One',
      role: 'USER',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: hashedPassword,
      name: 'User Two',
      role: 'ADMIN',
    },
  });


  const timeblock1 = await prisma.timeBlock.create({
    data: {
      startTime: new Date('2026-12-01T09:00:00Z'),
      endTime: new Date('2026-12-01T10:00:00Z'), 
    },
  });

  const timeblock2 = await prisma.timeBlock.create({
    data: {
      startTime: new Date('2026-12-01T10:00:00Z'),
      endTime: new Date('2026-12-01T11:00:00Z'), 
    },
  });


  await prisma.appointment.create({
    data: {
      date: new Date('2026-12-01T09:00:00Z'),
      user: { connect: { id: user1.id } },
      timeBlock: { connect: { id: timeblock1.id } },
    },
  });

  await prisma.appointment.create({
    data: {
      date: new Date('2026-12-01T09:00:00Z'),
      user: { connect: { id: user2.id } },
      timeBlock: { connect: { id: timeblock2.id } },
    },
  });

  console.log('The seed was successfully executed!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());