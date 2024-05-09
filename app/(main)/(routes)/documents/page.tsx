"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const DocumentsPage = () => {
    const { user } = useUser();
    return (
        <div
            className="h-full w-full flex flex-col items-center justify-center space-y-4"
        >
            <Image src={"/document-img.png"} alt="doc" width={170} height={170} />
            <div className="text-lg font-medium" >
                Welcome to {user?.firstName}&apos;s Notion
            </div>
            <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a note
            </Button>
        </div>);
};

export default DocumentsPage;