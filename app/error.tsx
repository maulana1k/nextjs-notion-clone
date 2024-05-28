"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <h2 className="text-4xl text-slate-600">
        😣 Ooops! Something went wrong.
      </h2>
      <div className="pt-8">
        <Button asChild>
          <Link href={"/documents"}>Go Back</Link>
        </Button>
      </div>
    </div>
  );
};

export default Error;
