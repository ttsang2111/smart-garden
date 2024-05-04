import clsx from 'clsx';

export default function RecordAction({ action }: { action: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded px-2 py-1 text-white text-sm',
        {
          'bg-blue-500': action === 'watering',
          'bg-yellow-500': action === 'lighting',
          'bg-red-500': action === 'heating',
        }
      )}
    >
      {action === 'watering' ? (
        <>
          Watering
        </>
      ) : null}
      {action === 'lighting' ? (
        <>
          Lighting
        </>
      ) : null}
      {action === 'heating' ? (
        <>
          Heating
        </>
      ) : null}
    </span>
  );
}
