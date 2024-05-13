"use client";

import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { ArchiveRestore, Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const TrashBox = () => {
  const router = useRouter();
  const param = useParams();
  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSeach] = useState("");
  const filterDocuments = documents?.filter((doc) => {
    return doc.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (docId: string) => {
    router.push(`/documents/${docId}`);
  };

  const onRestore = (e: React.MouseEvent, docId: Id<"documents">) => {
    e.stopPropagation();
    const promise = restore({ id: docId });
    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored",
      error: "Failed to restore note",
    });
  };

  const onRemove = (e: React.MouseEvent, docId: Id<"documents">) => {
    e.stopPropagation();
    const promise = remove({ id: docId });
    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted",
      error: "Failed to delete note",
    });
    if (param.documentId == docId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size={"lg"} />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSeach(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found
        </p>
        {filterDocuments?.map((doc) => (
          <div
            key={doc._id}
            role="button"
            onClick={() => onClick(doc._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate p-2">{doc.title}</span>
            <div className="flex items-center">
              <div
                role="button"
                onClick={(e) => onRestore(e, doc._id)}
                className="rounded-sm p-2 hover:bg-zinc-200 dark:hover:bg-zinc-600"
              >
                <ArchiveRestore className="h-4 w-4 text-muted-foreground" />
              </div>
              <div
                role="button"
                onClick={(e) => onRemove(e, doc._id)}
                className="rounded-sm p-2 hover:bg-zinc-200 dark:hover:bg-zinc-600"
              >
                <Trash className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
