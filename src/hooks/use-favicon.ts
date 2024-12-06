import * as React from "react";

const TYPE_MAP = {
  ico: "image/x-icon",
  png: "image/png",
  svg: "image/svg+xml",
  gif: "image/gif",
};

type TFavicon = {
  emojiUrl: string;
  type: keyof typeof TYPE_MAP;
};

export const useFavicon = (
  newIcon: string = "",
  type: keyof typeof TYPE_MAP,
  rel: string = "shortcut icon"
) => {
  React.useLayoutEffect(() => {
    if (newIcon) {
      const linkElements = document.querySelectorAll(`link[rel*='icon']`);

      linkElements.forEach((linkEl) => {
        document.head.removeChild(linkEl);
      });

      const link = document.createElement("link");

      link.setAttribute("type", TYPE_MAP[type]);
      link.setAttribute("rel", rel);
      link.setAttribute("href", newIcon);
      document.head.appendChild(link);
    }
  }, [newIcon, rel]);
};

export const useEmojiIcon = () => {
  const [favicon, setFavicon] = React.useState<TFavicon>({
    emojiUrl: "",
    type: "png",
  });

  const setFaviconEmoji = React.useCallback(
    (emojiUrl: string, type: keyof typeof TYPE_MAP = "png") => {
      setFavicon({
        emojiUrl,
        type,
      });
    },
    []
  );

  useFavicon(favicon.emojiUrl, favicon.type);

  return { setFaviconEmoji, favicon };
};
