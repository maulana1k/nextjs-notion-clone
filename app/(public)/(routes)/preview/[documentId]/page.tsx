"use client";

import { Cover } from "@/components/cover";
import { Toolbar } from "@/components/toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import "@blocknote/mantine/style.css";
import { Editor } from "@/components/editor";
import { cn } from "@/lib/utils";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.documents.getPreview, {
    documentId: params.documentId,
  });
  if (document === undefined) {
    return (
      <div className="w-full">
        <Cover.Skeleton />
        <div className="md:max-w-3xl   w-max-4xl mx-auto mt-10">
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
    throw new Error();
  }

  return (
    <div
      className={cn(
        "pb-40 w-full ",
        !!document.coverImage && "h-[1000px]",
        !document.coverImage && "h-[800px]"
      )}
    >
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          initialContent={document.content}
          documentId={document._id}
        />
      </div>
    </div>
  );
};

export default DocumentIdPage;
