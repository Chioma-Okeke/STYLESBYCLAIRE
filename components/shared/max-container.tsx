import { cn } from "@/lib/utils"
import React from "react"

interface MaxContainerProps {
    children: React.ReactNode,
    className?: string
}

const MaxContainer = ({ children, className }: MaxContainerProps) => {
    return (
        <div className={cn('w-full max-w-7xl mx-auto', className)}>
            {children}
        </div>
    )
}

export default MaxContainer