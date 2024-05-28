"use client";

import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Block, PartialBlock } from "@blocknote/core";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

interface EditorProps {
  onChange?: (val: string) => void;
  initialContent?: string;
  editable?: boolean;
  documentId: Id<"documents">;
}

export const Editor = ({
  initialContent,
  documentId,
  editable,
}: EditorProps) => {
  //   const params = useParams();
  const { resolvedTheme } = useTheme();
  //   const [blocks, setBlocks] = useState<Block[]>([]);
  const editor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : [{ type: "paragraph", content: "" }],
  });

  const update = useMutation(api.documents.update);
  const handleChange = () => {
    // setBlocks(editor.document);
    console.log("block: ", editor.document);
    const stringContent = JSON.stringify(editor.document, null, 2);
    update({ id: documentId, content: stringContent });
  };
  return (
    <BlockNoteView
      editable={editable}
      editor={editor}
      onChange={handleChange}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};
