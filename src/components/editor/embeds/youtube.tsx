import {
  CustomBlockConfig,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
} from "@blocknote/core";
import {
  ReactCustomBlockRenderProps,
  useComponentsContext,
  useDictionary,
} from "@blocknote/react";
import { ChangeEvent, useCallback, useState } from "react";

export const YoutubeEmbed = <
  B extends CustomBlockConfig = CustomBlockConfig,
  I extends InlineContentSchema = DefaultInlineContentSchema,
  S extends StyleSchema = DefaultStyleSchema
>(
  props: ReactCustomBlockRenderProps<B, I, S>
) => {
  const Components = useComponentsContext()!;
  const dict = useDictionary();

  const [currentURL, setCurrentURL] = useState<string>("");

  const { block, editor } = props;

  const handleURLChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCurrentURL(event.currentTarget.value);
    },
    []
  );

  const handleURLEnter = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        editor.updateBlock(block, {
          type: "embed",
          props: {
            ...block.props,
            type: "youtube",
            url: currentURL,
          },
        });
      }
    },
    [editor, block, currentURL]
  );

  const handleURLClick = useCallback(() => {
    editor.updateBlock(block, {
      type: "embed",
      props: {
        ...block.props,
        type: "youtube",
        url: currentURL,
      },
    });
  }, [editor, block, currentURL]);

  if (!block.props.url) {
    return (
      <Components.FilePanel.TabPanel className="bn-tab-panel">
        <Components.FilePanel.TextInput
          className={"bn-text-input"}
          placeholder={dict.file_panel.embed.url_placeholder + " (Youtube)"}
          value={currentURL}
          onChange={handleURLChange}
          onKeyDown={handleURLEnter as any}
          data-test={"embed-input"}
        />
        <Components.FilePanel.Button
          className={"bn-button"}
          onClick={handleURLClick}
          data-test="embed-input-button"
        >
          {dict.file_panel.embed.embed_button["video"]}
        </Components.FilePanel.Button>
      </Components.FilePanel.TabPanel>
    );
  }
  const videoId = new URL(props.block.props.url as string).searchParams.get(
    "v"
  );
  return (
    <div
      style={{
        left: 0,
        width: "100%",
        height: 0,
        position: "relative",
        paddingBottom: "56.25%",
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
          border: 0,
        }}
        allowFullScreen={true}
        scrolling="no"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      ></iframe>
    </div>
  );
};
