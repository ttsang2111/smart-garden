'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  LinkIcon
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormStatus } from 'react-dom';
import { updateServerURL } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import { fetchServerURL } from '../lib/data';

export default function UpdateServerURLForm() {
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    const fetchURL = async () => {
        const url = await fetchServerURL();
        setCurrentURL(url);
      };

      fetchURL();
  })

  return (
    <form action={updateServerURL} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <p className="mb-3 mt-5 block text-xs font-medium text-gray-900">
          Server URL
        </p>
        <h1 className={`${lusitana.className} mb-3`}>
          {currentURL}
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="url"
            >
              New URL
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="url"
                type="url"
                name="url"
                placeholder="http://..."
                required
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <UpdateButton />
      </div>
    </form>
  );
}

function UpdateButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      Update <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}