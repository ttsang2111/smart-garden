// pages/api/dates.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateDateList, padToTwoDigits } from '@/helper';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            // Generate a list of dates
            const dates = generateDateList(new Date(), 5);

            // Convert dates to a formatted string
            const formattedDates = dates.map(date => 
                `${date.getFullYear()}-${padToTwoDigits(date.getMonth() + 1)}-${padToTwoDigits(date.getDate())}`
            ).join('\n'); // Each date in new line

            // Set header to 'text/plain'
            res.setHeader('Content-Type', 'text/plain');

            // Send the data as plain text
            res.status(200).send(formattedDates);
        } catch (error) {
            // Handle potential errors
            res.status(500).send('Server error');
        }
    } else {
        // If the request is not GET, return 405 Method Not Allowed
        res.setHeader('Allow', ['GET']);
        res.status(405).end('Method Not Allowed');
    }
}
