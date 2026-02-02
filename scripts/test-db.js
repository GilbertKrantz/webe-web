import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  console.error('❌ POSTGRES_URL is not set in environment or .env file');
  process.exit(1);
}

console.log('🔗 Connection string found (length):', connectionString.length);
const sql = neon(connectionString);

async function testConnection() {
  try {
    console.log('⏳ Attempting to fetch experiences...');
    const rows = await sql`SELECT * FROM experiences LIMIT 1`;
    console.log('✅ Success! Found', rows.length, 'rows.');
    console.log('Sample data:', rows[0]);
  } catch (error) {
    console.error('❌ Database error:', error);
  }
}

testConnection();
