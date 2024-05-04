"use server";

import { unstable_noStore as noStore } from 'next/cache';
import { Record } from './definitions';
import { sql } from '@vercel/postgres';

const server_url = process.env.SERVER_URL || 'http://localhost:3000/api/data';

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
    console.error('Server Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchLatestWateringData() {
  noStore();
  try {
    let response = await fetch(`${server_url}/latest-watering`);
    const latestWateringData = await response.text();
    return latestWateringData.split('\n');
  } catch (error) {
    console.error('Server Error:', error);
    throw new Error('Failed to fetch latest watering data.');
  }
}

const ITEMS_PER_PAGE = 6;
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
        records.date ILIKE ${`%${query}%`}
      ORDER BY records.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return records.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch records.');
  }
}
