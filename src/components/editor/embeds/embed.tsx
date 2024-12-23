import { createReactBlockSpec } from "@blocknote/react";
import { YoutubeEmbed } from "./youtube";

export const embedsType = [
  {
    title: "Youtube",
    url: "",
    type: "youtube",
  },
] as const;

export const Embed = createReactBlockSpec(
  {
    type: "embed",
    propSchema: {
      title: {
        default: "",
      },
      url: {
        default: "",
      },
      type: {
        default: "",
        values: embedsType.map((t) => t.type),
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      const embedType = embedsType.find(
        (t) => t.type === props.block.props.type
      );
      if (embedType?.type === "youtube") {
        return YoutubeEmbed(props);
      }
      if (!embedType) {
        return props.block.props.url;
      }
    },
  }
);
