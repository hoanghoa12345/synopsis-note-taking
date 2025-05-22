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
  viewport: string
  "theme-color": string
  description: string
  "twitter:site": string
  "twitter:image": string
  "twitter:domain": string
  "twitter:description": string
  "twitter:title": string
  "twitter:creator": string
  "twitter:card": string
  "og:type": string
  "og:image": string
  "article:publisher": string
  "article:published_time": string
  "og:site_name": string
  "og:title": string
  "og:description": string
  "og:url": string
  "google-site-verification": string
  robots: string
  "next-head-count": string
  title: string
};

async function fetchMetadata(url: string, { arg }: { arg: { url: string } }) {
  return fetch(`${url}/api/meta?url=${arg.url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": import.meta.env.VITE_METADATA_API_KEY,
    }
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
    import.meta.env.VITE_METADATA_API_URL,
    fetchMetadata,
    {
      populateCache: true,
      revalidate: false,
    }
  );

  const handleConvertLink = async () => {
    if (!block) return;

    try {
      editor.updateBlock(block, {
        type: "bookmark",
        props: {
          title: "Loading...",
          description: "",
          favicon: "",
          thumbnail: "",
          type: "",
        },
      });
      const result = await trigger({ url: props.url });
      editor.updateBlock(block, {
        type: "bookmark",
        props: {
          url: props.url,
          title: result.title,
          description: result.description,
          favicon: "",
          thumbnail: result["og:image"],
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
