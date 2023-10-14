import { useDark } from "@/hooks/useDark";
import {
  Bars3Icon,
  ArrowPathIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const data = [
  {
    id: "19020b49-a6f6-421a-b5d7-92b89116e831",
    user_id: "5acae777-9d09-438c-868a-2cf4f280974e",
    title: "React Native Course",
    pinned: false,
    created_at: "2021-11-16T09:28:06.000000Z",
    updated_at: "2021-11-16T09:28:06.000000Z",
  },
  {
    id: "3f2fc39d-faaa-455f-9f4a-b49d4a2ea30e",
    user_id: "5acae777-9d09-438c-868a-2cf4f280974e",
    title: "Mapstruct not map propeties fields",
    pinned: false,
    created_at: "2022-08-10T10:01:03.000000Z",
    updated_at: "2022-08-10T10:02:06.000000Z",
  },
  {
    id: "f292e402-9ee7-4b82-8053-580360cf3214",
    user_id: "5acae777-9d09-438c-868a-2cf4f280974e",
    title: "Vim Tutorial",
    pinned: false,
    created_at: "2021-10-24T13:26:01.000000Z",
    updated_at: "2021-10-24T13:26:01.000000Z",
  },
  {
    id: "896fb160-28c0-445d-91ca-6b48ab36d384",
    user_id: "5acae777-9d09-438c-868a-2cf4f280974e",
    title: "Convert m3u8 file to mp4 file",
    pinned: false,
    created_at: "2021-10-24T10:28:06.000000Z",
    updated_at: "2021-10-24T10:29:11.000000Z",
  },
];

type Note = (typeof data)[0];

const Notes = () => {
  const [note, setNote] = useState<Note>();
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(true);
  const { isDark, toggleDark } = useDark();

  return (
    <div className="flex flex-col h-screen dark:bg-secondary-500 dark:text-gray-50">
      <div className="h-[52px] flex justify-between items-center">
        <div className="w-[300px] flex items-center">
          <span className="uppercase text-xl font-mono font-bold text-center flex-1 hidden md:block">
            Plainpad
          </span>
          <button
            type="button"
            className="px-2 py-2"
            title="Menu"
            onClick={() => setToggleSidebar((prev) => !prev)}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex space-x-6 px-4">
          <button type="button" className="">
            <ArrowPathIcon className="w-8 h-8 text-primary-500 dark:text-gray-50" />
          </button>
          <button type="button" onClick={toggleDark}>
            {isDark ? (
              <MoonIcon className="w-8 h-8 text-primary-500 dark:text-gray-50" />
            ) : (
              <SunIcon className="w-8 h-8 text-primary-500 dark:text-gray-50" />
            )}
          </button>
          <button type="button">
            <UserCircleIcon className="w-8 h-8 text-primary-500 dark:text-gray-50" />
          </button>
          <button
            type="button"
            onClick={() => toast.success("Successfully toasted!")}
          >
            <DocumentTextIcon className="w-8 h-8 text-primary-500 dark:text-gray-50" />
          </button>
        </div>
      </div>
      <div className="flex flex-1 border-t border-gray-200 dark:border-gray-600">
        <div
          className={`flex flex-col w-[300px] border-r border-gray-200 dark:border-gray-600 transition-transform sm:translate-x-0 ${
            toggleSidebar ? " -translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="flex px-4 py-3 items-center border-b border-gray-200 dark:border-gray-600">
            <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
            <input
              type="text"
              className="text-sm outline-none dark:bg-secondary-500"
              placeholder="Filter"
            />
          </div>
          <div className="border-b border-gray-200 dark:border-gray-600">
            <button
              type="button"
              className="flex px-4 py-3 items-center text-sm"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              <span>New note</span>
            </button>
          </div>
          <div className="flex-1">
            <ul>
              {data.map((note) => (
                <li
                  key={note.id}
                  className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-secondary-600 cursor-pointer text-sm"
                  onClick={() => setNote(note)}
                >
                  {note.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-xs text-gray-400 px-4 py-2">
            <span>Version 1.0.0</span> - <span>07/10/2023</span>
          </div>
        </div>
        <div className="flex-1 px-4 py-2">
          {note ? (
            <textarea
              className="w-full h-full outline-none text-sm font-mono resize-none dark:bg-secondary-500 px-6 py-4"
              spellCheck="false"
              value={note.title}
            />
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <h3 className="text-3xl font-bold text-gray-800">
                  Welcome!
                </h3>
                <p className="text-sm text-center">
                  Select or create new one.
                </p>
                <button className="px-3 py-2 inline-flex text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:hover:bg-primary-400 disabled:cursor-not-allowed">
                  <PlusIcon className="w-5 h-5 mr-2" />
                  New note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
};

export default Notes;
