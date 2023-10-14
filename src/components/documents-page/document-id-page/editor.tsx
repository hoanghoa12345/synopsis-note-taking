import { useTheme } from "@/components/providers/theme-provider";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useBuckets } from "@/hooks/use-buckets";
import { useUser } from "@/hooks/use-auth";
import { useParams } from "react-router-dom";

// import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { theme } = useTheme();
  const { uploadImageDocument } = useBuckets();
  const { user } = useUser();
  const params = useParams();

  const handleUpload = async (file: File) => {
    if (user?.uid && params.documentId) {
      const response = await uploadImageDocument(
        user?.uid,
        params.documentId,
        file
      );

      if (response.data) return response.data?.path;
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
        theme={theme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
