import { HistoryTrade } from "@/components";
import { HistorySwap } from "@/components/molecules/HistorySwap";
// import { useListMarketOrder } from "@/components/molecules/HistorySwap/hooks/useMarketOder";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Currencies, Market } from "./types";

const baseUrl = import.meta.env.VITE_API_URL;

export const Dummy = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [currMarket] = useState<Market | null>(null);

  const getCurrencies = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/api/v2/trade/public/currencies?limit=100&page=1&ordering=asc&order_by=position`
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const { data: listCurrencies, isLoading: unitLoading } = useQuery<
    Currencies[],
    string
  >({
    queryKey: ["curencies"],
    queryFn: getCurrencies,
  });

  const [market, setMarket] = useState<Market[]>([]);
  const marketId = params?.market?.replace("-", "")?.toLowerCase();

  const getCurrentMarket = market.find(
    (item) => item.id.toLowerCase() === marketId
  );

  const getCurrentPair = listCurrencies?.find(
    (item) => item.id === getCurrentMarket?.quote_unit
  );

  const getMarkets = async () => {
    try {
      const response: AxiosResponse = await axios.get(
        `${baseUrl}/api/v2/trade/public/markets?limit=100&page=1&ordering=asc&order_by=position`
      );
      setMarket(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  // const handleRoute = (item: Market) => {
  //   setCurrMarket(item);
  // };

  useEffect(() => {
    if (currMarket) {
      navigate(`/swap/${currMarket?.id.toLocaleUpperCase()}`, {
        state: {
          name: currMarket?.name,
          id: currMarket?.id,
        },
      });
    }
  }, [currMarket, navigate]);

  useEffect(() => {
    getMarkets();
  }, []);

  return (
    <>
      {/* <div className="gap-5 flex">
        {market.map((item) => (
          <button
            onClick={() => {
              handleRoute(item);
            }}
          >
            {item.name}
          </button>
        ))}
      </div> */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7">
        <div className="bg-dark2 p-4 order-2 lg:order-1 rounded-2xl h-[452px]">
          <HistoryTrade />
        </div>
        <div className="bg-dark2 p-4 order-1 lg:order-2 rounded-2xl h-full lg:h-[452px] overflow-hidden">
          <HistorySwap
            unitLoading={unitLoading}
            getCurrentPair={getCurrentPair!}
            getCurrentMarket={getCurrentMarket!}
          />
        </div>
      </div>
    </>
  );
};
