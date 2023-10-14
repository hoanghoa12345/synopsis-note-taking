import { TDocument, useDocuments } from "@/hooks/use-documents";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast} from 'sonner'
import { Spinner } from "../spinner/spinner";
import { Input } from "../ui/input";
import { Search, Trash, Undo } from "lucide-react";
import { ConfirmModal } from "../modals/confirm-modal";

export const TrashBox = () => {
  const navigate = useNavigate();
  const params = useParams();
  const {trashDocuments, restoreDoc, removeDoc, getTrash} = useDocuments();
  const documents = useMemo(() => trashDocuments, [trashDocuments])

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document:TDocument) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    navigate(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: string,
  ) => {
    event.stopPropagation();
    const promise = restoreDoc(documentId);

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error:" Failed to restore note."
    });
  };

  const onRemove = (
    documentId: string,
  ) => {
    const promise = removeDoc(documentId)

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error:" Failed to delete note."
    });

    if (params.documentId === documentId) {
      navigate("/documents");
    }
  };

  useEffect(() => {
    getTrash()
    // console.log('get trash', documents, trashDocuments);    
  },[])

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found.
        </p>
        {filteredDocuments?.map((document: TDocument) => (
          <div
            key={document.id}
            role="button"
            onClick={() => onClick(document.id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">
              {document.title}
            </span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document.id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document.id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}