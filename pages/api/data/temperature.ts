import type { NextApiRequest, NextApiResponse } from "next";
import { getRandomNumber } from "@/helper";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const temperature = getRandomNumber(20, 40);

    res.setHeader('Content-Type', 'text/plain');
    res.send(temperature);
}