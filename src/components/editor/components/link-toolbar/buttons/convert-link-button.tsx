import { schema } from "@/components/documents-page/document-id-page/editor";
import type { InlineContentSchema, StyleSchema } from "@blocknote/core";
import {
  LinkToolbarProps,
  useBlockNoteEditor,
  useComponentsContext,
  useSelectedBlocks,
} from "@blocknote/react";
import { GalleryVertical } from "lucide-react";
import useSWRMutation from "swr/mutation";

type ResponseData = {
  title: string;
  description: string;
  image: string;
  poweredBy: string;
};

async function fetchMetadata(url: string, { arg }: { arg: { url: string } }) {
  return fetch(`${url}?url=${arg.url}`, {
    method: "GET",
  }).then((res) => res.json() as Promise<ResponseData>);
}

export const ConvertLinkButton = (props: Pick<LinkToolbarProps, "url">) => {
  const Components = useComponentsContext()!;
  const editor = useBlockNoteEditor<
    typeof schema.blockSchema,
    InlineContentSchema,
    StyleSchema
  >();
  const selectedBlocks = useSelectedBlocks(editor);
  const block = selectedBlocks.length === 1 ? selectedBlocks[0] : undefined;
  const { trigger } = useSWRMutation(
    import.meta.env.VITE_API_METADATA_URL,
    fetchMetadata,
    {
      populateCache: true,
      revalidate: false,
    }
  );

  const handleConvertLink = async () => {
    if (!block) return;

    try {
      const result = await trigger({ url: props.url });
      editor.updateBlock(block, {
        type: "bookmark",
        props: {
          url: props.url,
          title: result.title,
          description: result.description,
          favicon: "",
          thumbnail: result.image,
          type: "",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Components.LinkToolbar.Button
      className={"bn-button"}
      mainTooltip={"Convert to bookmark"}
      label={"Convert"}
      isSelected={false}
      onClick={() => handleConvertLink()}
      icon={<GalleryVertical size={14} />}
    />
  );
};
