import { DeleteLinkButton, EditLinkButton, LinkToolbar as LinkToolbarComponent, LinkToolbarProps, OpenLinkButton } from "@blocknote/react";
import { ReactNode } from "react";
import { ConvertLinkButton } from "./buttons/convert-link-button";

const LinkToolbar = ( props: LinkToolbarProps & { children?: ReactNode }) => {
  return (
    <LinkToolbarComponent {...props}>
      <EditLinkButton
        url={props.url}
        text={props.text}
        editLink={props.editLink}
      />
      <OpenLinkButton url={props.url} />
      <DeleteLinkButton deleteLink={props.deleteLink} />
      <ConvertLinkButton url={props.url} />
    </LinkToolbarComponent>
  );
};

export default LinkToolbar;
