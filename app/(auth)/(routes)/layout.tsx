import { ReactNode } from "react";

const RootLayout = ({
    children,
}: {
    children: ReactNode
}) => {
    return (
        <div className="h-full" >
            {children}
        </div>
    );
}

export default RootLayout;