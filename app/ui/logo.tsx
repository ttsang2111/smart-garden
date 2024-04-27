import { GlobeAltIcon, SunIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-col items-center leading-none text-white`}
    >
      <SunIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Smart Garden</p>
    </div>
  );
}
