import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const roastRecords = await prisma.roastRecord.findMany();
  const tastingRecords = await prisma.tastingRecord.findMany();
  const shopVisits = await prisma.shopVisit.findMany();
  const espressoRecords = await prisma.espressoRecord.findMany();

  console.log('=== Roast Records ===');
  console.dir(roastRecords, { depth: null });
  console.log('=== Tasting Records ===');
  console.dir(tastingRecords, { depth: null });
  console.log('=== Shop Visits ===');
  console.dir(shopVisits, { depth: null });
  console.log('=== Espresso Records ===');
  console.dir(espressoRecords, { depth: null });
}

main()
  .catch(e => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 