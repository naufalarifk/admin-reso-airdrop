import { cn } from "@/utils";
import { ReactNode, FC, useState, useRef, useEffect, useMemo } from "react";
import { useListTrade } from "./hooks/useHistoryTrade";
import { useWalletStore } from "../ButtonConnectWalletV2";

interface TabsData {
  label: string;
  content: ReactNode;
}

type TabsProps = {
  items: TabsData[];
  getCurrentIndex?: (index: number) => void;
  isBetween?: boolean;
  classNameWrapper?: string;
  rightContent?: ReactNode;
  classNameButtons?: string;
};

export const HistoryTrade = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { getMyTradeOrder, trade } = useListTrade();
  const { connected } = useWalletStore();

  useEffect(() => {
    if (currentIndex === 2 && connected) {
      getMyTradeOrder();
    }
  }, [connected, getMyTradeOrder, currentIndex]);

  const tabs = useMemo(
    () => [
      {
        label: "Pool Swaps",
        content: <>Pool swap</>,
      },
      {
        label: "Owners Chart",
        content: <>Owner chart</>,
      },
      {
        label: "My Trade",
        content: (
          <>
            <div className="relative overflow-x-scroll max-h-80">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-soft uppercase sticky-top-0 bg-dark2">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Assets
                    </th>
                    <th scope="col" className="px-6 py-3 text-nowrap">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-darkSoft/30">
                  {trade?.length <= 0 ||
                  trade === undefined ||
                  trade === null ? (
                    <tr>
                      <td
                        className="text-gray-200 pt-28 py-4 text-center"
                        colSpan={12}
                      >
                        No Data Available
                      </td>
                    </tr>
                  ) : (
                    trade?.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4  whitespace-nowrap">
                          {item.created_at}
                        </td>
                        <td className="px-6 py-4 uppercase">{item.market}</td>
                        <td className="px-6 py-4 text-center">
                          {item.order_id}
                        </td>
                        <td className="px-6 py-4 text-center">{item.price}</td>
                        <td className="px-6 py-4 text-center">{item.amount}</td>
                        <td className="px-6 py-4 text-center">
                          {item.market_type ?? "-"}
                        </td>
                        <td className="px-6 py-4 text-right">{item.total}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        ),
      },
    ],
    [trade]
  );

  return (
    <div>
      <Tabs
        items={tabs}
        getCurrentIndex={(currIdx) => setCurrentIndex(currIdx)}
      />
    </div>
  );
};

const Tabs: FC<TabsProps> = ({
  items,
  getCurrentIndex,
  isBetween = false,
  classNameWrapper,
  rightContent,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef<Array<HTMLButtonElement>>([]);

  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [activeTabIndex]);

  const contents = useMemo(
    () => items[activeTabIndex].content,
    [activeTabIndex, items]
  );

  const handleTabClick = (index: number) => {
    setActiveTabIndex(index);
    getCurrentIndex && getCurrentIndex(index);
  };

  return (
    <>
      <div className="bg-dark2 relative grid place-items-center md:flex  gap-5 md:gap-0  md:justify-between  border-b  border-b-primary/45">
        <div
          className={
            (cn(
              `flex ${
                isBetween ? "items-center justify-between" : "gap-4"
              } rounded-lg  p-1 px-1`
            ),
            classNameWrapper)
          }
        >
          {items.map((tab, idx) => (
            <button
              key={idx}
              type="button"
              ref={(el: HTMLButtonElement | null) =>
                (tabsRef.current[idx] = el as HTMLButtonElement)
              }
              className={`text-center py-3 text-xs border-b-2 px-4 font-semibold ${
                activeTabIndex === idx
                  ? "border-primary text-white"
                  : "text-soft border-transparent"
              }`}
              onClick={() => handleTabClick(idx)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span
          className="absolute bottom-3 block h-1 rounded-lg bg-primary-1 transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
        {rightContent}
      </div>
      {typeof contents === "string" ? (
        <div className="mt-4">{contents}</div>
      ) : (
        contents
      )}
    </>
  );
};
