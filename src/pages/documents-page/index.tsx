import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-auth";
import { useDocuments } from "@/hooks/use-documents";
import { Timestamp } from "firebase/firestore";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const { createDocument } = useDocuments();
  const onCreate = () => {
    const promise = createDocument({
      title: "Untitled",
      userId: user?.uid,
      isArchived: false,
      parentDocument: null,
      content: "",
      coverImage: "",
      icon: "",
      isPublished: false,
      creationTime: Timestamp.now(),
    });
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <img
        className="dark:invert dark:grayscale"
        src="https://illustrations.popsy.co/amber/designer.svg"
        width={300}
        height={300}
        alt=""
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.displayName}&apos;s Synopsis
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
