import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
// import { useToast } from "@/components/ui/use-toast";
import { ModeToggle } from "@/components/mode-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  DownloadCloudIcon,
  FileText,
  MenuIcon,
  PinIcon,
  PlusIcon,
  RefreshCw,
  SearchIcon,
  Share2Icon,
  Trash2Icon,
} from "lucide-react";
import useSWR from "swr";
import { useScreenWidth } from "@/hooks/use-screen-width";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserDropdown } from "@/components/menu/user-dropdown";

export interface Note {
  id: string;
  user_id: string;
  title: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
}

const Notes = () => {
  const [note, setNote] = useState<Note>();
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR("/data.json", fetcher);
  // const { toast } = useToast();
  const { isMobile } = useScreenWidth();
  const { noteId } = useParams();
  const refreshIconRef = useRef<SVGSVGElement>(null)

  const notes = useMemo(() => {
    return data?.filter((note: Note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, data]);

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.classList.add("animate-pulse");
    setTimeout(() => {
      target.classList.remove("animate-pulse");
    }, 200);
    if (note) {
      setNote({ ...note, title: e.target.value });
    }
  };

  const handleRefreshData = () => {
    if(refreshIconRef.current) {
      refreshIconRef.current.classList.add("animate-spin");
      setTimeout(() => {
        refreshIconRef.current?.classList.remove("animate-spin");
      }, 2000)
    }
  }

  useEffect(() => {
    setNote(notes?.find((note: Note) => note.id === noteId));
  }, [noteId, notes]);

  useEffect(() => {
    if (isMobile) {
      setIsOpenSidebar(false);
      setIsOpenAction(false);
    } else {
      setIsOpenSidebar(true);
      setIsOpenAction(true);
    }
  }, [isMobile]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="h-[52px] flex justify-between items-center">
        <div className="w-[300px] flex items-center">
          <span className="uppercase text-xl font-mono font-bold text-center flex-1 hidden md:block">
            <Link to="/notes">Plainpad</Link>
          </span>
          <Button
            type="button"
            className="px-2 py-2"
            variant="ghost"
            onClick={() => setIsOpenSidebar((prev) => !prev)}
          >
            <MenuIcon className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex space-x-6 px-2">
          <Button type="button" variant="ghost" size="icon" onClick={handleRefreshData}>
            <RefreshCw ref={refreshIconRef} className="w-6 h-6" />
          </Button>
          <ModeToggle />
          {/* <Button type="button" variant="ghost" size="icon">
            <UserCircle2 className="w-6 h-6" />
          </Button> */}
          <UserDropdown/>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsOpenAction((prev) => !prev)}
          >
            <FileText className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="h-[calc(100vh-52px)] flex flex-1 border-t border-gray-200 dark:border-gray-600">
        <div
          className={cn(
            "flex flex-shrink-0 w-64 overflow-y-auto flex-col border-r border-gray-200 dark:border-gray-600",
            isOpenSidebar
              ? "animate-in slide-in-from-left-64"
              : "animate-out slide-out-to-left-64 w-0",
            "duration-150 fill-mode-forwards"
          )}
        >
          <div className="flex px-4 py-3 items-center border-b border-gray-200 dark:border-gray-600">
            <SearchIcon className="w-5 h-5 mr-2" />
            <input
              type="text"
              className="text-sm outline-none dark:bg-background"
              placeholder="Filter"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
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
            {isLoading ? (
              <div className="space-y-3 px-2 py-4">
                {[...Array(10).keys()].map((skeleton) => (
                  <Skeleton key={skeleton} className="h-4 w-60" />
                ))}
              </div>
            ) : error ? (
              <div className="text-primary p-2 text-sm">
                Error: {error.message}
              </div>
            ) : (
              <ScrollArea className="h-[calc(100vh-200px)]">
                {notes.map((note: Note) => (
                  <div
                    key={note.id}
                    className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-secondary cursor-pointer text-sm"
                    onClick={() => navigate(`/notes/${note.id}`)}
                  >
                    {note.title}
                  </div>
                ))}
              </ScrollArea>
            )}
          </div>
          <div className="text-xs text-gray-400 px-4 py-2">
            <span>Version 1.0.0</span> - <span>14/10/2023</span>
          </div>
        </div>
        <div className="flex-1 px-4 py-2">
          {note ? (
            <textarea
              className="w-full h-full outline-none text-sm font-mono resize-none dark:bg-background px-6 py-4"
              spellCheck="false"
              value={note.title}
              onChange={handleChangeText}
            />
          ) : (
            <div className="h-[300px] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <h3 className="text-3xl font-bold">Welcome!</h3>
                <p className="text-sm text-center">Select or create new one.</p>
                <Button>
                  <PlusIcon className="w-5 h-5 mr-2" />
                  <span>New note</span>
                </Button>
              </div>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex flex-shrink-0 w-64 overflow-y-auto flex-col border-l border-gray-200 dark:border-gray-600",
            isOpenAction
              ? "animate-in slide-in-from-right-64"
              : "animate-out slide-out-to-right-64 w-0",
            "duration-150 fill-mode-forwards"
          )}
        >
          {note ? (
            <div>
              <h2 className="text-lg font-semibold py-4 border-b border-gray-200 dark:border-gray-600 px-3">
                {note.title}
              </h2>
              <ul className="text-sm px-3 py-4 space-y-4 border-b border-gray-200 dark:border-gray-600">
                <li>
                  <b>Created:</b>{" "}
                  {new Date(note.created_at).toLocaleDateString()}
                </li>
                <li>
                  <b>Updated:</b>{" "}
                  {new Date(note.updated_at).toLocaleDateString()}
                </li>
              </ul>
              <ul className="text-sm px-3 py-4 space-y-4">
                <Button
                  variant="default"
                  className="w-full gap-1 inline-flex items-center"
                >
                  <PinIcon size={16} /> Pin
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-1 inline-flex items-center"
                >
                  <DownloadCloudIcon size={16} /> Download
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-1 inline-flex items-center"
                >
                  <Share2Icon size={16} />
                  Share
                </Button>
                <Button
                  variant="destructive"
                  className="w-full gap-1 inline-flex items-center"
                >
                  <Trash2Icon size={16} />
                  Delete
                </Button>
              </ul>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold py-4 border-b border-gray-200 dark:border-gray-600 px-3">
                Select a note
              </h2>
              <p className="text-sm px-3 py-4">
                This panel will display useful information and actions once you
                select a note from the note list.
              </p>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Notes;
