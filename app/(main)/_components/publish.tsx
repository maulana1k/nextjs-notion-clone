"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { init } from "next/dist/compiled/webpack/webpack";
import { useState } from "react";
import { toast } from "sonner";

interface PublishProps {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: PublishProps) => {
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const origin = useOrigin();
  const update = useMutation(api.documents.update);
  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setSubmitting(false));
    toast.promise(promise, {
      loading: "Publishing...",
      success: "Page published",
      error: "Failed to publish the page",
    });
  };
  const onUnPublish = () => {
    setSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setSubmitting(false));
    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Page unpublished",
      error: "Failed to unpublish the page",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(true);
    }, 1000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"}>
          Publish
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-5 h-5 ml-2 animate-pulse" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="text-sky-500 animate-pulse h-4 w-4" />
              <span>This note is live on web</span>
            </div>
            <div className="flex items-center">
              <input
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                disabled
                value={url}
              />
              <Button
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size={"sm"}
              className="w-full text-xs"
              disabled={submitting}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium mb-2">Publish this note</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share this page with others
            </span>
            <Button
              disabled={submitting}
              onClick={onPublish}
              className="w-full text-xs"
              size="sm"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Publish;
