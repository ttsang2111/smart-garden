import { unstable_noStore as noStore } from 'next/cache';

const server_url = process.env.SERVER_URL || 'http://localhost:7878';

export async function fetchCardData() {
    noStore();
    try {
        const temperature = 30.10;
        const humidity = 30.10;
        const moisture = 30.10;
      return {
        temperature,
        humidity,
        moisture,
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch card data.');
    }
  }