/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { init, dispose } from 'klinecharts'

const TradingViewV2 = ({ data }: { data: any }) => {
    useEffect(() => {
        // console.log('data', data)

        const convertedData = data?.map((item: any) => {
            return {
                timestamp: item[0],
                open: item[1],
                high: item[2],
                low: item[3],
                close: item[4],
                volume: item[5]
            }
        })
        console.log('convertedData', convertedData)
        // initialize the chart
        const chart = init('chart')

        // add data to the chart
        chart?.applyNewData(convertedData)

        return () => {
            // destroy chart
            dispose('chart')
        }
    }, [data])

    return <div id="chart" style={{ width: '100%', height: '100%' }} />
}

export default TradingViewV2