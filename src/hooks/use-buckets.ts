import { supabase } from "@/services/supabase";

export const NOTION_BUCKET = "notionBuckets";

export const useBuckets = () => {
  const uploadImage = (userId: string, documentId: string, file: File) =>
    supabase.storage
      .from(NOTION_BUCKET)
      .upload(
        `${userId}/${documentId}/banner.${file.name.split(".").pop()}`,
        file,
        {
          cacheControl: "3600",
          upsert: true,
        }
      );
  const getPublicURL = (path: string) =>
    `${
      import.meta.env.VITE_SUPABASE_PROJECT_URL
    }/storage/v1/object/public/${NOTION_BUCKET}/${path}`;

  const removeImage = (path: string) =>
    supabase.storage.from(NOTION_BUCKET).remove([path]);

  const uploadImageDocument = (
    userId: string,
    documentId: string,
    file: File
  ) =>
    supabase.storage
      .from(NOTION_BUCKET)
      .upload(
        `${userId}/${documentId}/${file.name}.${file.name.split(".").pop()}`,
        file,
        {
          cacheControl: "3600",
          upsert: false,
        }
      );

  return { uploadImage, getPublicURL, removeImage, uploadImageDocument };
};
