/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useRef } from 'react';
// import { init, dispose, Chart, LineType, CandleType, PolygonType, TooltipShowRule, TooltipShowType } from "klinecharts";
// import generateDataList from './generateDataList';
// import { selectKline } from '@/modules';
// import { useSelector } from 'react-redux';
// import { Currencies } from '@/pages/Dummy/types';
import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets';
import { useParams } from 'react-router-dom';

// const TradingViewV2 = ({ data, currency }: { data: any; currency: Currencies; }) => {
const TradingViewV2 = () => {
   const params = useParams();
   const marketId = params?.market?.replace('-', '');
   const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone as any;

   // console.log('TIMEZONE', timezone);

   // useEffect(() => {
   //     const convertedData = data?.map((item: any) => {
   //         return {
   //             timestamp: Math.floor(item[0] / 1000),
   //             open: item[1],
   //             high: item[2],
   //             low: item[3],
   //             close: item[4],
   //             volume: item[5],
   //             turnover: (item[1] + item[2] + item[3] + item[4]) / 4 * item[5]
   //         };
   //     });

   //     chart.current?.applyNewData(convertedData);

   //     chart.current?.setPriceVolumePrecision(currency?.precision, currency?.precision);
   //     chart.current?.setTimezone('en');

   //     return () => {
   //         dispose("real-time-k-line");
   //     };
   // }, [data]);''

   // return <TradingChart />

   return (
      // <div>
      <AdvancedRealTimeChart
         symbol={marketId}
         locale="en"
         theme="dark"
         autosize
         height={'100%'}
         width={'100%'}
         allow_symbol_change={false}
         timezone={timezone}
         hide_side_toolbar
         // disabled_features={['control_bar']}
      />
      // </div>
   );
};

export default TradingViewV2;

// import { createChart, ColorType } from 'lightweight-charts';
// import React, { useEffect, useRef } from 'react';

// const TradingViewV2 = ({ data }: { data: any; }) => {

//     const chartContainerRef = useRef();

//     useEffect(
//         () => {
//             const handleResize = () => {
//                 chart.applyOptions({ width: chartContainerRef?.current?.clientWidth });
//             };

//                  const convertedData = data?.map((item: any) => {
//                     return {
//                         time: item[0],
//                         open: item[1],
//                         high: item[2],
//                         low: item[3],
//                         close: item[4],
//                     };
//                 });

//             const chart = createChart(chartContainerRef?.current, {
//                 layout: {
//                     background: { type: ColorType.Solid, color: '#181924' },
//                     textColor: '#c4c4c4',
//                 },
//                 grid: {
//                     horzLines: {
//                         color: '#c4c4c4',
//                     },
//                     vertLines: {
//                         color: '#c4c4c4',
//                     }
//                 },

//                 width: chartContainerRef?.current?.clientWidth,
//                 height: 375,
//                 autoSize: true
//             });
//             chart.timeScale().fitContent();

//             const candlestickSeries = chart.addCandlestickSeries({
//                 upColor: '#26a69a',
//                 downColor: '#ef5350',
//                 borderVisible: false,
//                 wickUpColor: '#26a69a',
//                 wickDownColor: '#ef5350',
//                 baseLineWidth: 2,

//             });

//             if (data) {
//                 candlestickSeries.setData(convertedData!)
//             }
//             window.addEventListener('resize', handleResize);

//             return () => {
//                 window.removeEventListener('resize', handleResize);

//                 chart.remove();
//             };
//         },
//         [data]
//     );

//     return (
//         <div
//             ref={chartContainerRef}
//         />
//     );
// };

// export default TradingViewV2;
