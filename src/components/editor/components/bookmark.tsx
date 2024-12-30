import { Card, CardContent } from "@/components/ui/card";
import { createReactBlockSpec } from "@blocknote/react";

export const Bookmark = createReactBlockSpec(
  {
    type: "bookmark",
    propSchema: {
      url: {
        default: "",
      },
      title: {
        default: "",
      },
      description: {
        default: "",
      },
      favicon: {
        default: "",
      },
      thumbnail: {
        default: "",
      },
      type: {
        default: "",
      },
    },
    content: "none",
  },
  {
    render: (props) => {
      const { block } = props;
      const { url, title, description, favicon, thumbnail } = block.props;
      return (
        <Card className="w-full !border hover:bg-muted mb-2">
          <CardContent className="flex flex-col md:flex-row space-x-1 p-4 pt-4">
            <a
              className="flex-1 space-y-1 w-full md:w-3/5 !no-underline"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              role="link"
            >
              <div className="flex flex-col gap-y-2">
                <h4 className="!text-sm !font-bold !text-black dark:!text-white overflow-hidden text-ellipsis whitespace-nowrap">
                  {title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 !text-sm overflow-hidden text-ellipsis line-clamp-2 break-words">
                  {description}
                </p>
                <div className="flex space-x-1 overflow-hidden">
                  {favicon && (
                    <img src={favicon} alt="favicon" className="w-4 h-4" />
                  )}
                  <span className="!text-xs !text-black dark:!text-white overflow-hidden text-ellipsis whitespace-nowrap">
                    {url}
                  </span>
                </div>
              </div>
            </a>
            <div className="flex-[0_0_131px] md:flex-[0_0_180px]">
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="thumbnail"
                  className="w-full h-full"
                />
              )}
            </div>
          </CardContent>
        </Card>
      );
    },
  }
);
