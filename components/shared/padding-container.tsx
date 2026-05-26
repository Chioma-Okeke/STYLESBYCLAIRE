import { cn } from "@/lib/utils"
import React from "react"

interface PaddingContainerProps {
    children: React.ReactNode
}

const PaddingContainer = ({children}: PaddingContainerProps) => {
    return (
        <div className={cn("px-5 md:px-10 xl:px-25")}>
            {children}
        </div>
    )
}

export default PaddingContainer