import { Text } from "@/components"
import { ReactNode } from "react"

export const SwapTable = ({ row, col }: { row: string[], col: ReactNode[] }) => {
    return (
        <>
            <div className={`grid grid-cols-${row.length} my-4 border-b text-center`}>
                {row.map((item) => <Text>{item}</Text>)}
            </div>
            {col}
        </>
    )
}