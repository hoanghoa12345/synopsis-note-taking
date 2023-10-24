import { MenuIcon } from "lucide-react";
import { Title } from "./title";
import { TDocument, useDocuments } from "@/hooks/use-documents";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Banner } from "./banner";
import { Menu } from "./menu";
import { Publish } from "./publish";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const { document, getById } = useDocuments();
  const { documentId } = useParams();

  useEffect(() => {
    documentId && getById(documentId);
  }, [documentId]);

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
        {isCollapsed && (
          <MenuIcon
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document as TDocument} />
          <div className="flex items-center gap-x-2">
            <Publish initialData={document as TDocument} />
            <Menu documentId={document.id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document.id} />}
    </>
  );
};
