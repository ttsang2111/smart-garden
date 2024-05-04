"use server";

import { unstable_noStore as noStore } from 'next/cache';
import { Record } from './definitions';
import { sql } from '@vercel/postgres';
import { get } from '@vercel/edge-config';
import { ITEMS_PER_PAGE } from '@/config';

const default_api_url = process.env.DEFAULT_API_URL || 'http://localhost:3000/api';

export async function fetchServerURL(type?: 'data' | 'actions') {
  let server_url: string;
  try {
    server_url = (await get('server_url'))!;
    await fetch(server_url);
  } catch (error) {
    switch (type) {
      case 'data':
        server_url = `${default_api_url}/data`;
        break;
      case 'actions':
        server_url = `${default_api_url}/actions`;
        break;
      default:
        server_url = default_api_url;
    }
  }
  return server_url;
}

export async function fetchData(server_url: string, data: string) {
  try {
    const response = await fetch(`${server_url}/${data}`);
    return response.text();
  } catch (error) {
    throw new Error("Failed to fetch data.");
  }
}

export async function fetchCardData() {
  noStore();
  try {
    const server_url = await fetchServerURL('data');
    const getData = fetchData.bind(null, server_url);
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
    const server_url = await fetchServerURL('data');
    const latestWateringData = await fetchData(server_url, 'latest-watering');
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
