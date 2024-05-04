const { db } = require('@vercel/postgres');

async function seedRecords(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        
        // Create the "users" table if it doesn't exist
        const createRecord = await client.sql`
          CREATE TABLE IF NOT EXISTS records (
            action VARCHAR(255) NOT NULL,
            date TIMESTAMP NOT NULL,
            status VARCHAR(255) NOT NULL
          );
        `;
        console.log(`Created "records" table`);
    
        return {
          createRecord,
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