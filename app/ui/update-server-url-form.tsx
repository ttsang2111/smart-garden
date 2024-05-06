'use client';

import { lusitana } from '@/app/ui/fonts';
import { useEffect, useState } from 'react';
import { getServerUrl } from '@/app/lib/data';

export default function UpdateServerURLForm() {
  const [serverUrl, setServerUrl] = useState("");

  useEffect(() => {
    setServerUrl(getServerUrl());
  }, []);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <p className="mb-3 mt-5 block text-xs font-medium text-gray-900">
        Server URL
      </p>
      <h1 className={`${lusitana.className} mb-3`}>
        {serverUrl}
      </h1>
    </div>
  );
}