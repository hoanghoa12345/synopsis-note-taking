import { useTheme } from "@/components/providers/theme-provider";
import {
  BlockNoteSchema,
  locales,
  defaultBlockSpecs,
  filterSuggestionItems,
  insertOrUpdateBlock,
  customizeCodeBlock,
} from "@blocknote/core";
import {
  SuggestionMenuController,
  useCreateBlockNote,
  getDefaultReactSlashMenuItems,
  LinkToolbarController,
} from "@blocknote/react";
import "@blocknote/shadcn/style.css";
import { useBuckets } from "@/hooks/use-buckets";
import { useUser } from "@/hooks/use-auth";
import { useParams } from "react-router-dom";
import { BlockNoteView } from "@blocknote/shadcn";
import Link from "@tiptap/extension-link";
import { YoutubeIcon } from "lucide-react";
import { Embed } from "@/components/editor/embeds/embed";
import LinkToolbar from "@/components/editor/components/link-toolbar/link-toolbar";
import { Bookmark } from "@/components/editor/components/bookmark";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    embed: Embed,
    codeBlock: customizeCodeBlock({
      defaultLanguage: "javascript",
      indentLineWithTab: true,
    }),
    bookmark: Bookmark,
  },
});

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

  const editor: typeof schema.BlockNoteEditor = useCreateBlockNote({
    schema,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as (typeof schema.PartialBlock)[])
      : undefined,
    uploadFile: handleUpload,
    dictionary: locales.en,
    _tiptapOptions: {
      extensions: [
        Link.configure({
          openOnClick: false,
          autolink: true,
        }),
      ],
    },
  });

  const handleChange = () => {
    onChange(JSON.stringify(editor.document, null, 2));
  };

  const getEditorTheme = () => {
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return theme === "system" ? (prefersDarkScheme ? "dark" : "light") : theme;
  };

  const insertYoutubeEmbedded = (editor: typeof schema.BlockNoteEditor) => {
    return {
      title: "Youtube",
      onItemClick: async () => {
        insertOrUpdateBlock(editor, {
          type: "embed",
          props: {
            type: "youtube",
          },
        });
      },
      group: "Embeds",
      subtext: "Insert a Youtube embedded video",
      aliases: ["youtube", "yt"],
      icon: <YoutubeIcon />,
    };
  };

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={getEditorTheme()}
        editable={editable}
        onChange={handleChange}
        slashMenu={false}
        linkToolbar={false}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            filterSuggestionItems(
              [
                ...getDefaultReactSlashMenuItems(editor),
                insertYoutubeEmbedded(editor),
              ],
              query
            )
          }
        />
        <LinkToolbarController
          linkToolbar={(props) => <LinkToolbar {...props} />}
        />
      </BlockNoteView>
    </div>
  );
};

export default Editor;
