"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import {
  Archive,
  ArchiveIcon,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Icon,
  LucideIcon,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
}

export const Item = ({
  id,
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  expanded,
  isSearch,
  level = 0,
  onExpand,
}: ItemProps) => {
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const router = useRouter();
  const { user } = useUser();
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    onExpand?.();
  };

  const onArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;

    const promise = archive({ id });

    toast.promise(promise, {
      loading: "Deleting new note...",
      success: "Note deleted",
      error: "Failed to delete note",
    });
  };

  const onCreate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (docId) => {
        if (!expanded) onExpand?.();
        // router.push(`/documents/${docId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating new note...",
      success: "Note created",
      error: "Failed to create note",
    });
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        role="button"
        style={{ paddingLeft: level ? `${level * 12 + 12}px` : "6px" }}
        className={cn(
          "group flex min-h-[27px] text-sm pr-3 py-2 w-full rounded-md hover:bg-primary/5  items-center  text-muted-foreground font-medium",
          active && "bg-primary/5 text-primary"
          // expanded && "flex"
        )}
      >
        {!!id && (
          <div
            role="button"
            className="h-full rounded-sm hover:bg-zinc-300 dark:hover:bg-zinc-600 mr-1 p-[2px]"
            onClick={handleExpand}
          >
            <ChevronIcon className="w-4 h-4" />
          </div>
        )}
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
        )}
        <span className="truncate">{label}</span>
        {isSearch && (
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span>Ctrl+K</span>
          </kbd>
        )}
        {!!id && (
          <div className="ml-auto flex items-center gap-x-2 ">
            <DropdownMenu>
              <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                <div
                  role="button"
                  className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-zinc-300 dark:hover:bg-zinc-600 p-[2px]"
                >
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60 "
                align="start"
                side="right"
                forceMount
              >
                <DropdownMenuItem onClick={onArchive}>
                  <ArchiveIcon className="h-4 w-4 mr-2" /> Archive
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foreground p-2">
                  Last edited by: {user?.fullName}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              role="button"
              onClick={onCreate}
              className="ml-auto flex items-center gap-x-2"
            >
              <div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-zinc-300 dark:hover:bg-zinc-600 p-[2px]">
                <Plus className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}>
      <Skeleton className="h-4 w-4 rounded-md " />
    </div>
  );
};
