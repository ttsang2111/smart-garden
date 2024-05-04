"use client";

import { fetchLatestWateringData } from '@/app/lib/data';
import React, { useState, useEffect } from 'react';


const HistoricalRecords = () => {
  const [records, setRecords] = useState<string[]>();

  useEffect(() => {
    const fetchData = async() => {
        const newData = await fetchLatestWateringData();
        setRecords(newData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Latest watering</h2>
      <ul>
        {records?.map((record, index) => (
          <li key={index}>
            <strong>Date:</strong> {record}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HistoricalRecords;
