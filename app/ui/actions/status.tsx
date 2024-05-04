import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function RecordStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs text-white',
        {
          'bg-red-500': status === 'failure',
          'bg-green-500': status === 'success',
        },
      )}
    >
      {status === 'failure' ? (
        <>
          Failure
        </>
      ) : null}
      {status === 'success' ? (
        <>
          Success
        </>
      ) : null}
    </span>
  );
}
