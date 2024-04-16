import { Text } from "@/components"

export const SwapTable = ({ row, col }: { row: [], col: [] }) => {
    return (
        <>
            <div className={``}>
                {row.map((item) => <Text>{item}</Text>)}
            </div>
            <div>
                {col}
            </div>
        </>
    )
}