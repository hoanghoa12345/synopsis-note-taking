import { TDocument, useDocuments } from "@/hooks/use-documents";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: string;
  level?: number;
  data?: TDocument[];
}

export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const {documents, getSidebar} = useDocuments();

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    navigate(`/documents/${documentId}`);
  };

  
  useEffect(() => {
    getSidebar(parentDocumentId ? parentDocumentId : null)
  }, [])

  if (documents === null) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }  

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents?.map((document: TDocument) => (
        <div key={document.id}>
          <Item id={document.id}
          onClick={() => onRedirect(document.id)}
          label={document.title}
          icon={FileIcon}
          documentIcon={document.icon}
          active={params.documentId === document.id}
          level={level}
          onExpand={() => onExpand(document.id)}
          expanded={expanded[document.id]}
          />
          {expanded[document.id] && (
            <DocumentList
            parentDocumentId={document.id}
            level={level+1}
            />
          )}
        </div>
      ))}
    </>
  );
};
