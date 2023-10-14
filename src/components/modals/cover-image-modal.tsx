import { useCoverImage } from "@/hooks/use-cover-image";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { SingleImageDropzone } from "../dropzones/single-image-dropzone";
import { useDocuments } from "@/hooks/use-documents";
import { useBuckets } from "@/hooks/use-buckets";
import { useUser } from "@/hooks/use-auth";

export const CoverImageModal = () => {
  const params = {
    documentId: window.location.pathname.split('/')[2]
  }

  const { updateCover } = useDocuments();
  const { uploadImage } = useBuckets();
  const coverImage = useCoverImage();
  const { user } = useUser();

  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      if (user?.uid && params.documentId) {
        const res = await uploadImage(user?.uid, params.documentId, file);
        console.log("File uploaded: ", res.data?.path);
        if (res.data?.path)
          await updateCover(params.documentId, res.data?.path);
      }

      onClose();
    }
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Cover Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
