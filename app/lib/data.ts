"use server";

import { unstable_noStore as noStore } from 'next/cache';
import { Record } from './definitions';
import { sql } from '@vercel/postgres';
import { ITEMS_PER_PAGE } from '@/config';
import { SERVER_URL } from '@/config';


export async function fetchData(data: string) {
  try {
    const response = await fetch(`${SERVER_URL}/${data}`);
    return response.text();
  } catch (error) {
    throw new Error("Failed to fetch data from server.");
  }
}

export async function fetchCardData() {
  noStore();
  try {
    const getData = fetchData.bind(null);
    const data = await Promise.all([
      getData('temperature'),
      getData('humidity'),
      getData('moisture')
    ]);

    return {
      temperature: data[0],
      humidity: data[1],
      moisture: data[2],
    };
  } catch (error) {
    console.error('Server Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchLatestWateringData() {
  noStore();
  try {
    const latestWateringData = await fetchData('latest-watering');
    return latestWateringData.split('\n');
  } catch (error) {
    console.error('Server Error:', error);
    throw new Error('Failed to fetch latest watering data.');
  }
}

export async function fetchActionsPages(query?: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM records
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of records.');
  }
}

export async function fetchFilteredActions(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const records = await sql<Record>`
      SELECT
        records.action,
        records.status,
        records.date
      FROM records
      WHERE
        records.action ILIKE ${`%${query}%`} OR
        records.status ILIKE ${`%${query}%`} OR
        records.date::text ILIKE ${`%${query}%`}
      ORDER BY records.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return records.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch records.');
  }
}
