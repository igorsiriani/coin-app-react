import React, { useEffect, useLayoutEffect, useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Header } from "../../components/header/header";
import "./currency.scss";

interface BidData {
  bid: string;
  timestamp: string;
  create_date: string;
}

interface CurrencyData {
  code: string;
  codein: string;
  name: string;
  bid: string;
}

interface ApiResponse {
  [key: string]: CurrencyData;
}

const Currency: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [currencyData, setCurrencyData] = useState<CurrencyData[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [bidData, setBidData] = useState<BidData[]>([]);

  const fetchCurrencyData = async () => {
    try {
      const response = await fetch(
        process.env.ECONOMIA_API_URL + "/json/last/USD-BRL,EUR-BRL,JPY-BRL,GBP-BRL,AUD-BRL,CAD-BRL,CHF-BRL,LTC-BRL,HKD-BRL,NZD-BRL"
      );
      const data: ApiResponse = await response.json();

      const formattedData = Object.keys(data).map((key) => {
        data[key].name = data[key].name.split("/")[0];
        return data[key];
      });

      setCurrencyData(formattedData);
      localStorage.setItem("last_currency", JSON.stringify(formattedData));
    } catch (error) {
      console.error("Failed to fetch currency data:", error);
    }
  };

  useEffect(() => {
    let temp_last_currency = localStorage.getItem("last_currency");
    if (typeof temp_last_currency === "string") {
      setCurrencyData(JSON.parse(temp_last_currency));
    }

    fetchCurrencyData();
    const intervalId = setInterval(fetchCurrencyData, 30000); // Update every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  useLayoutEffect(() => {
    let temp_token = localStorage.getItem("auth");
    if (typeof temp_token === "string") {
        setToken(temp_token);
        getFavorite(temp_token);
    }
  }, []);

  const toggleFavorite = async (code: string) => {
    setFavorites((prev) => {
      if (prev.includes(code)) {
        const new_list = prev.filter((fav) => fav !== code);
        setFavoriteList(new_list);
        return new_list;
      } else {
        const new_list = [code, ...prev];
        setFavoriteList(new_list);
        return new_list;
      }
    });
  };

  const setFavoriteList = async (new_list: string[]) => {
    try {
      await fetch(process.env.COIN_API_URL + "/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          favorites: new_list,
        }),
      });

    } catch (error) {
      console.log(error);
    }
  }

  const getFavorite = async (token: string) => {
    try {
      const response = await fetch(process.env.COIN_API_URL + "/favorite", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === "Ok!") {
        setFavorites(data.result[0].fav_list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBidData = async (currencyCode: string) => {
    try {
      const response = await fetch(
        process.env.ECONOMIA_API_URL + `/json/daily/${currencyCode}-BRL/30`
      );
      const data: BidData[] = await response.json();
      setBidData(data);
    } catch (error) {
      console.error("Failed to fetch bid data:", error);
    }
  };

  const handleCardClick = (code: string) => {
    setSelectedCurrency(code);
    fetchBidData(code);
  };

  const sortedCurrencyData = [
    ...currencyData.filter((data) => favorites?.includes(data.code)),
    ...currencyData.filter((data) => !favorites?.includes(data.code)),
  ];

  return (
    <div className="root-wrapper">
      <Header />
      <div className="currency-container-wrapper">
        <div className="currency-container">
          {sortedCurrencyData.map((data) => (
            <div
              key={data.code}
              className="currency-card"
              onClick={() => handleCardClick(data.code)}
            >
              <div
                className={`star-icon full-star-icon ${
                  favorites?.includes(data.code) ? "show" : "hidden"
                }`}
                onClick={() => toggleFavorite(data.code)}
              >
                <IoStar />
              </div>
              <div
                className={`star-icon empty-star-icon ${
                  !favorites?.includes(data.code) ? "show" : "hidden"
                }`}
                onClick={() => toggleFavorite(data.code)}
              >
                <IoStarOutline />
              </div>
              <h3>{data.name}</h3>
              <p>$ {data.bid} BRL</p>
            </div>
          ))}
        </div>
      </div>
      <div className="currency-graph-wrapper">
        {selectedCurrency && bidData.length > 0 && (
          <div className="currency-graph">
            <h3>{selectedCurrency} Variação (30 Dias)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={bidData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="create_date" />
                <YAxis dataKey="bid" domain={["auto", "auto"]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bid"
                  stroke="#3B6E70"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Currency;
