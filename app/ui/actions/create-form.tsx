import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { sendActionToServer } from '@/app/lib/actions';


export default function Form() {
  return (
    <form action={sendActionToServer}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Select the action
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="watering"
                  name="action"
                  type="radio"
                  value="watering"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="watering"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Watering
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="lighting"
                  name="action"
                  type="radio"
                  value="lighting"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="lighting"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Lighting
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="heating"
                  name="action"
                  type="radio"
                  value="heating"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="heating"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Heating
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/actions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
