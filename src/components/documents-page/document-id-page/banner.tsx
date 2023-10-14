import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useDocuments } from "@/hooks/use-documents";
import { useNavigate } from "react-router-dom";
import {toast} from 'sonner'

interface BannerProps {
  documentId: string;
}

export const Banner = ({
  documentId
}: BannerProps) => {
  const navigate = useNavigate();

  const {removeDoc, restoreDoc} = useDocuments()

  const onRemove = () => {
    const promise = removeDoc(documentId)

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note."
    });

    navigate("/documents");
  };

  const onRestore = () => {
    const promise = restoreDoc(documentId)

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note."
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>
        This page is in the Trash.
      </p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  )
}