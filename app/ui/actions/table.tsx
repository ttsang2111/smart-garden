import RecordStatus from '@/app/ui/actions/status';
import { fetchFilteredActions } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function ActionsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const records = await fetchFilteredActions(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-3 py-5 font-medium">
                  Action
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {records?.map((record) => (
                <tr
                  key={record.action}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  
                  <td className="whitespace-nowrap px-3 py-3">
                    {record.action}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(record.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <RecordStatus status={record.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
