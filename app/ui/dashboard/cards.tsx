import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';

const units = {
  temperature: "°C",
  humidity: "%",
  moisure: "%",
};

export default async function CardWrapper() {
  const {
    temperature,
    humidity,
    moisture,
  } = await fetchCardData();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Temperature" value={temperature} type="temperature" />
      <Card title="Humidity" value={humidity} type="humidity" />
      <Card title="Moisure" value={moisture} type="moisure" />
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
  type: 'temperature' | 'humidity' | 'moisure';
}) {
  const unit = units[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value} {unit} 
      </p>
    </div>
  );
}
