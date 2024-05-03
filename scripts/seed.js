const { db } = require('@vercel/postgres');
const { records } = require('../app/lib/placeholder-data.js');

async function seedRecords(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        // Create the "users" table if it doesn't exist
        const createRecord = await client.sql`
          CREATE TABLE IF NOT EXISTS records (
            action VARCHAR(255) NOT NULL,
            date DATE NOT NULL,
            status VARCHAR(255) NOT NULL
          );
        `;
    
        console.log(`Created "records" table`);
    
        // Insert data into the "users" table
        const insertedRecords = await Promise.all(
          records.map(async (record) => 
            client.sql`
            INSERT INTO records (action, date, status)
            VALUES (${record.action}, ${record.date}, ${record.status})
          `,
          ),
        );
    
        console.log(`Seeded ${insertedRecords.length} users`);
    
        return {
          createRecord,
          records: insertedRecords,
        };
      } catch (error) {
        console.error('Error seeding records:', error);
        throw error;
      }
}

async function main() {
    const client = await db.connect();
  
   await seedRecords(client);
  
    await client.end();
  }
  
  main().catch((err) => {
    console.error(
      'An error occurred while attempting to seed the database:',
      err,
    );
  });