'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  LinkIcon,
} from '@heroicons/react/24/outline';
import { Button } from './button';
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '@/config';

export default function UpdateServerURLForm() {

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <p className="mb-3 mt-5 block text-xs font-medium text-gray-900">
        Server URL
      </p>
      <h1 className={`${lusitana.className} mb-3`}>
        {SERVER_URL}
      </h1>
    </div>
  );
}