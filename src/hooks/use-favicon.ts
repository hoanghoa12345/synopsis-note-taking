import * as React from "react";

const TYPE_MAP = {
  ico: "image/x-icon",
  png: "image/png",
  svg: "image/svg+xml",
  gif: "image/gif",
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
  const [favicon, setFavicon] = React.useState<string>("");

  const setFaviconEmoji = React.useCallback((emoji: string) => {
    setFavicon(emojiToDataUrl(emoji));
  }, []);

  const emojiToDataUrl = (emoji: string) => {
    const size = 32;
    const font = `26px Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#000";
      context.font = font;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText(emoji, size / 2, size / 2 + 2);
    }

    return canvas.toDataURL("image/png");
  };

  useFavicon(favicon, "png");

  return { setFaviconEmoji, favicon };
};
