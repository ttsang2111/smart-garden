import { unstable_noStore as noStore } from 'next/cache';

const server_url = process.env.SERVER_URL || 'http://localhost:3000';

export async function fetchCardData() {
    noStore();
    try {
      let response = await fetch(`${server_url}/temperature`);
      const temperature = await response.text();
      response = await fetch(`${server_url}/humidity`);
      const humidity = await response.text();
      response = await fetch(`${server_url}/moisture`);
      const moisture = await response.text();
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