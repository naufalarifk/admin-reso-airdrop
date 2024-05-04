/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useRef } from 'react';

interface TradingViewWidgetProps { }

// eslint-disable-next-line react-refresh/only-export-components
const TradingViewWidget: React.FC<TradingViewWidgetProps> = () => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(
        (): () => never => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "autosize": true,
          "symbol": "NASDAQ:AAPL",
          "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
          "enable_publishing": false,
          "hide_top_toolbar": true,
          "allow_symbol_change": true,
          "save_image": false,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
            if (container.current) {
                container?.current?.appendChild(script);
            }

            return () => container.current?.removeChild(script) as never
        },
        []
    );

    return (
        <div id='' className="tradingview-widget-container" ref={container} style={{ height: "full", width: "100%" }}>
            <div className="tradingview-widget-container__widget" style={{ height: "full", width: "100%" }}></div>
        </div>
    );
}


export default memo(TradingViewWidget) as React.FC<TradingViewWidgetProps>;