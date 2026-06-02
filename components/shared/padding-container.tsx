import { cn } from "@/lib/utils"
import React from "react"

interface PaddingContainerProps {
    children: React.ReactNode,
    className?: string
}

const PaddingContainer = ({children, className}: PaddingContainerProps) => {
    return (
        <div className={cn("px-5 md:px-10 xl:px-25", className)}>
            {children}
        </div>
    )
}

export default PaddingContainer