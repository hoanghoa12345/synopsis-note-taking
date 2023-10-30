import { Cover } from "@/components/documents-page/document-id-page/cover";
import { Toolbar } from "@/components/documents-page/document-id-page/toolbar";
import Error from "@/components/documents-page/error";
import { Skeleton } from "@/components/ui/skeleton";
import { TDocument, useDocuments } from "@/hooks/use-documents";
import { useEmojiIcon } from "@/hooks/use-favicon";
import { lazy, useEffect, useMemo, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
const DocumentIdPage = () => {
  const { documentId } = useParams();

  const { document, updateContent, getDocDetail } = useDocuments();
  const [text, setText] = useState<string>();
  const debouncedValue = useDebounce<string | undefined>(text, 1000);

  const {setFaviconEmoji} = useEmojiIcon()

  useMemo(() => {
    if(document && document.icon) {
      setFaviconEmoji(document.icon)
    }else {
      setFaviconEmoji('📄')
    }
  },[document?.id])

  const Editor = useMemo(
    () =>
      lazy(() => import("@/components/documents-page/document-id-page/editor")),
    []
  );

  useEffect(() => {
    const unsubscribe = getDocDetail(documentId);
    return () => {
      unsubscribe();
    };
  }, [documentId]);

  const onChange = (content: string) => {
    setText(content);
    // handle update text content
  };

  useEffect(() => {
    if (debouncedValue) {
      updateContent(document?.id, debouncedValue);
      // console.log("updated document");
    }
  }, [debouncedValue]);

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <Error />;
  }

  return (
    <div className="pb-40">
      <Cover url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document as TDocument} />
        <Suspense
          fallback={
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
              <div className="space-y-4 pl-8 pt-4">
                <Skeleton className="h-14 w-[50%]" />
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[40%]" />
                <Skeleton className="h-4 w-[60%]" />
              </div>
            </div>
          }
        >
          <Editor
            key={document.id}
            onChange={onChange}
            initialContent={document.content}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default DocumentIdPage;
