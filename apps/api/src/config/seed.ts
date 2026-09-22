import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../db/schema';
import dotenv from 'dotenv';

dotenv.config();

// Dummy data seeder sesuai data frontend
async function seed() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(pool, { schema });

  console.log('🌱 Seeding database...');

  // 1. Seed Categories
  const categories = await db.insert(schema.categories).values([
    { name: 'Sembako', description: 'Bahan pokok sehari-hari' },
    { name: 'Minuman', description: 'Kopi, teh, dan minuman lainnya' },
    { name: 'Snack', description: 'Makanan ringan' },
    { name: 'Toiletry', description: 'Sabun, sampo, dan keperluan mandi' },
  ]).returning();
  console.log(`  ✅ ${categories.length} categories seeded`);

  // 2. Seed Products
  const categoryMap: Record<string, string> = {};
  for (const cat of categories) {
    categoryMap[cat.name] = cat.id;
  }

  const products = await db.insert(schema.products).values([
    { name: 'Beras Premium 5kg', sku: 'BRS-005', categoryId: categoryMap['Sembako'], price: 65000, costPrice: 55000 },
    { name: 'Minyak Goreng 1L', sku: 'MNY-001', categoryId: categoryMap['Sembako'], price: 18000, costPrice: 14000 },
    { name: 'Gula Pasir 1kg', sku: 'GLA-001', categoryId: categoryMap['Sembako'], price: 16000, costPrice: 12000 },
    { name: 'Tepung Terigu 1kg', sku: 'TPG-001', categoryId: categoryMap['Sembako'], price: 12000, costPrice: 9000 },
    { name: 'Sabun Mandi Cair 400ml', sku: 'SBN-400', categoryId: categoryMap['Toiletry'], price: 25000, costPrice: 18000 },
    { name: 'Kopi Bubuk 200g', sku: 'KPI-200', categoryId: categoryMap['Minuman'], price: 15000, costPrice: 10000 },
    { name: 'Teh Celup Isi 25', sku: 'TEH-025', categoryId: categoryMap['Minuman'], price: 8500, costPrice: 5500 },
    { name: 'Mie Instan Goreng', sku: 'MIE-GRG', categoryId: categoryMap['Snack'], price: 3000, costPrice: 2200 },
  ]).returning();
  console.log(`  ✅ ${products.length} products seeded`);

  // 3. Seed Stocks (sesuai data Products.tsx)
  const productMap: Record<string, string> = {};
  for (const p of products) {
    productMap[p.sku] = p.id;
  }

  const stocksData = await db.insert(schema.stocks).values([
    { productId: productMap['BRS-005'], quantity: 50, minQuantity: 10 },
    { productId: productMap['MNY-001'], quantity: 5, minQuantity: 10 },
    { productId: productMap['GLA-001'], quantity: 2, minQuantity: 15 },
    { productId: productMap['TPG-001'], quantity: 30, minQuantity: 10 },
    { productId: productMap['SBN-400'], quantity: 15, minQuantity: 5 },
    { productId: productMap['KPI-200'], quantity: 45, minQuantity: 15 },
    { productId: productMap['TEH-025'], quantity: 60, minQuantity: 20 },
    { productId: productMap['MIE-GRG'], quantity: 120, minQuantity: 40 },
  ]).returning();
  console.log(`  ✅ ${stocksData.length} stock records seeded`);

  // 4. Seed Suppliers
  const suppliers = await db.insert(schema.suppliers).values([
    { name: 'PT Sumber Berkah', contactName: 'Pak Hasan', phone: '081234567890', email: 'hasan@sumberberkah.id', address: 'Jl. Raya Industri No. 12, Bandung' },
    { name: 'CV Makmur Jaya', contactName: 'Ibu Sari', phone: '082345678901', email: 'sari@makmurjaya.id', address: 'Jl. Niaga No. 5, Cimahi' },
    { name: 'UD Harapan', contactName: 'Pak Budi', phone: '083456789012', email: 'budi@udharapan.id', address: 'Jl. Pasar Baru No. 8, Garut' },
    { name: 'PT Indo Grosir', contactName: 'Pak Andi', phone: '084567890123', email: 'andi@indogrosir.id', address: 'Jl. Sudirman No. 100, Jakarta' },
  ]).returning();
  console.log(`  ✅ ${suppliers.length} suppliers seeded`);

  console.log('\n🎉 Seeding completed!');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
