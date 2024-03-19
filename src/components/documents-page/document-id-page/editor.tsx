import { useTheme } from "@/components/providers/theme-provider";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useBuckets } from "@/hooks/use-buckets";
import { useUser } from "@/hooks/use-auth";
import { useParams } from "react-router-dom";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { theme } = useTheme();
  const { uploadImageDocument, getPublicURL } = useBuckets();
  const { user } = useUser();
  const params = useParams();

  const handleUpload = async (file: File) => {
    if (user?.uid && params.documentId) {
      const response = await uploadImageDocument(
        user?.uid,
        params.documentId,
        file
      );

      if (response.data) return getPublicURL(response.data?.path);
    }

    return "";
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={
          theme === "system"
            ? "dark"
            : window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
        }
      />
    </div>
  );
};

export default Editor;
