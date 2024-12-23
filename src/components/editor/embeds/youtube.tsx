import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const YoutubeEmbed = (props: any) => {
  if (!props.block.props.url) {
    const handleSubmit = (e: any) => {
      e.preventDefault();
      const url = e.target.url.value;
      props.editor.updateBlock(props.block, {
        type: "embed",
        props: {
          ...props.block.props,
          type: "youtube",
          url,
        },
      });
    };
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <Input placeholder="Enter the Youtube URL" name="url" id="url" />
          <Button type="submit">Embed</Button>
        </form>
      </div>
    );
  }
  const videoId = new URL(props.block.props.url).searchParams.get("v");
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
