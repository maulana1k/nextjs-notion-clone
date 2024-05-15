"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";

export const CoverImageModal = () => {
  const coverImage = useCoverImage();

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg ">Cover Image</h2>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
