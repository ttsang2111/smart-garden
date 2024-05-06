"use client";

import { fetchLatestWateringData } from '@/app/lib/data';
import React, { useState, useEffect } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { Table } from '@geist-ui/react'


const HistoricalRecords = () => {
  const [records, setRecords] = useState<{date: string}[]>();

  useEffect(() => {
    const fetchData = async() => {
        try {
          const dates = await fetchLatestWateringData();
          const tableData = dates.map(date => ({ date }));
          setRecords(tableData);
        } catch (error) {
          return;
        }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest auto-watering
      </h2>
      <Table data={records}>
      <Table.Column prop="date" label="Time" width={150} />
    </Table>
    </div>
  );
}

export default HistoricalRecords;
