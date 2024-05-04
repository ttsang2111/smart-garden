import type { NextApiRequest, NextApiResponse } from "next";
import { getRandomNumber } from "@/helper";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const data = getRandomNumber(0, 100);

    res.setHeader('Content-Type', 'text/plain');
    res.send(data);
}