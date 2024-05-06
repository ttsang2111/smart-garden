"use client";

import React, { useState, useEffect } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { RESET_TIME } from '@/config';

const units = {
  temperature: "°C",
  humidity: "%",
  moisture: "%",  // Corrected spelling
};

export default function CardWrapper() {
  const [data, setData] = useState({ temperature: '...', humidity: '...', moisture: '...' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await fetchCardData();
        setData(newData);
      } catch (error) {
        return;
      }
    };

    // Call fetchData initially and set up an interval for it
    fetchData();
    const intervalId = setInterval(fetchData, RESET_TIME); // Fetch data every 3 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Temperature" value={data.temperature} type="temperature" />
      <Card title="Humidity" value={data.humidity} type="humidity" />
      <Card title="Moisture" value={data.moisture} type="moisture" /> {/* Corrected spelling */}
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'temperature' | 'humidity' | 'moisture'; // Corrected spelling
}) {
  const unit = units[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className={`${lusitana.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}>
        {value} {unit}
      </p>
    </div>
  );
}
