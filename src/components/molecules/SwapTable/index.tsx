import { Text } from "@/components"
import { cn } from "@/utils"
import { ReactNode } from "react"

export const SwapTable = ({ row, col, className }: { row: string[], col: ReactNode[], className?: string }) => {
    return (
        <>
            <div className={cn(`grid grid-cols-${row.length} my-4 border-b text-center`, className)}>
                {row.map((item) => <Text>{item}</Text>)}
            </div>
            {col}
        </>
    )
}