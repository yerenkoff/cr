import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from "chart.js";
import logo from "../assets/logo.svg";
import share from "../assets/share.svg";
import welcome_polosa from "../assets/welcome-polosa.svg";
import up from "../assets/progress-up.svg";
import down from "../assets/progress-down.svg";
import line_market from "../assets/market-line.svg";
import btcIcon from "../assets/btc.svg";
import ethIcon from "../assets/btc.svg";
import solIcon from "../assets/btc.svg";
import xrpIcon from "../assets/btc.svg";
import adaIcon from "../assets/btc.svg";
import bnbIcon from "../assets/btc.svg";
import dogeIcon from "../assets/btc.svg";
import maticIcon from "../assets/btc.svg";
import tradingLine from "../assets/trading-line.svg";
import account from "../assets/account.svg";
import verify from "../assets/verify.svg";
import wallet from "../assets/wallet.svg";
import trading from "../assets/trading.svg";


import "../css/Home.css";
import laptop from "../assets/laptop.png";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip
);

const MARKET_CRYPTO_PAIRS = [
  { symbol: "BTCUSDT", name: "Bitcoin", short: "BTC", icon: btcIcon },
  { symbol: "ETHUSDT", name: "Ethereum", short: "ETH", icon: ethIcon },
  { symbol: "BNBUSDT", name: "Binance Coin", short: "BNB", icon: bnbIcon },
  { symbol: "SOLUSDT", name: "Solana", short: "SOL", icon: solIcon },
  { symbol: "XRPUSDT", name: "Ripple", short: "XRP", icon: xrpIcon },
  { symbol: "ADAUSDT", name: "Cardano", short: "ADA", icon: adaIcon },
];

const MarketCard = ({ data }) => {
  const changeValue =
    typeof data.change === "string" ? parseFloat(data.change) : data.change;

  const generateChartData = (currentPrice, isPositive) => {
    const dataPoints = [];
    let value = currentPrice * (isPositive ? 0.9 : 1.1);

    for (let i = 0; i < 7; i++) {
      const fluctuation = Math.random() * 0.05;
      value = value * (1 + (isPositive ? fluctuation : -fluctuation));
      dataPoints.push(value);
    }
    dataPoints.push(currentPrice);

    return dataPoints;
  };

  const chartData = {
    labels: ["", "", "", "", "", "", "", ""],
    datasets: [
      {
        data: generateChartData(data.price, changeValue >= 0),
        borderColor: changeValue >= 0 ? "#06B470" : "#F6465D",
        borderWidth: 2,
        tension: 0.4,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="market-card">
      <div className="card-header">
        <img src={data.icon} alt={data.name} className="crypto-icon" />
        <div className="crypto-info">
          <h3>{data.name}</h3>
          <span>{data.short}</span>
        </div>
      </div>

      <div className="card-chart">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
            scales: { y: { display: false }, x: { display: false } },
          }}
        />
      </div>

      <div className="card-footer">
        <div
          className={`percentage ${changeValue >= 0 ? "positive" : "negative"}`}
        >
          <img src={changeValue >= 0 ? up : down} alt="" />
          {changeValue >= 0 ? "+" : ""}
          {changeValue.toFixed(2)}%
        </div>
        <div className="price">
          ${" "}
          {data.price > 1000
            ? data.price.toLocaleString("en-US", { maximumFractionDigits: 2 })
            : data.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              })}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [cryptoData, setCryptoData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const formatPrice = (price) => {
    const number = parseFloat(price);
    if (number > 1000) {
      return number.toLocaleString("en-US", { maximumFractionDigits: 2 });
    }
    return number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  };

  const fetchCryptoData = async () => {
    try {
      setIsAnimating(true);

      // Для верхних карточек
      const topPairs = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "ADAUSDT"];
      const topResults = await Promise.all(
        topPairs.map((symbol) =>
          fetch(
            `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
          ).then((res) => res.json())
        )
      );

      setCryptoData(
        topResults.map((data, index) => ({
          pair: `${topPairs[index].replace("USDT", "")}/USDT`,
          change: parseFloat(data.priceChangePercent),
          price: formatPrice(data.lastPrice),
          rawPrice: data.lastPrice,
        }))
      );

      // Для маркет секции - реальные данные
      const marketResults = await Promise.all(
        MARKET_CRYPTO_PAIRS.map((pair) =>
          fetch(
            `https://api.binance.com/api/v3/ticker/24hr?symbol=${pair.symbol}`
          )
            .then((res) => res.json())
            .catch(() => null)
        )
      );

      const validMarketData = marketResults
        .filter((data) => data !== null)
        .map((data, index) => ({
          ...MARKET_CRYPTO_PAIRS[index],
          price: parseFloat(data.lastPrice),
          change: parseFloat(data.priceChangePercent),
        }));

      setMarketData(validMarketData);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="header-container">
          <div className="header-left">
            <img src={logo} alt="CrypioBrains" className="header-logo" />
            <div className="polosa-header"></div>
          </div>

          <nav className="header-nav">
            <a href="#" className="nav-link">
              Market
            </a>
            <a href="#" className="nav-link">
              Trade
            </a>
            <a href="#" className="nav-link">
              Earn
            </a>
            <a href="#" className="nav-link">
              About
            </a>
          </nav>

          <div className="header-right">
            <button className="login-button">
              <a href="login">Log In</a>
            </button>
            <button className="register-button">
              <a href="#">Sign In</a>
            </button>
          </div>
        </div>
      </header>

      <div className="welcome-title">
        <div className="container">
          <div className="left">
            <div className="top">
              <div className="title-wrapper">
                <div className="polosa"></div>
                <h2>Crypto Brains</h2>
              </div>
              <h1>
                Buy & Sell Crypto Easy <br /> With Crypto Brains
              </h1>
              <img src={welcome_polosa} alt="" />
              <p className="desk-welcome">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </div>

            <div className="links">
              <a className="start" href="#">
                <span className="start-content">
                  Start now
                  <span className="icon-wrapper">
                    <img src={share} alt="" className="share-icon" />
                  </span>
                </span>
              </a>
              <a className="guide" href="#">
                Beginner's Guide
              </a>
            </div>
          </div>
          <div className="right">
            <img src={laptop} alt="Crypto platform" className="laptop-img" />
          </div>
        </div>
      </div>

      <div className="begunok">
        <div className="container">
          {cryptoData.map((item, index) => (
            <React.Fragment key={index}>
              <div
                className={`card ${
                  isAnimating ? "card-fade-out" : "card-fade-in"
                }`}
              >
                <div className="top">
                  <p className="cryptoName">{item.pair}</p>
                  <div className="price-change">
                    <img
                      src={item.change >= 0 ? up : down}
                      alt={item.change >= 0 ? "Рост" : "Падение"}
                      className="change-icon"
                    />
                    <span
                      className={`point ${
                        item.change >= 0 ? "positive" : "negative"
                      }`}
                    >
                      {item.change >= 0 ? "+" : ""}
                      {item.change.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <div className="bottom">
                  <p>$ {item.price}</p>
                </div>
              </div>
              {index < cryptoData.length - 1 && (
                <div className="polosa-progress"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="market">
        <div className="container">
          <div className="market-header">
            <h1>Market Trends</h1>
            <ul>
              <li>
                <a href="#">All</a>
              </li>
              <li>
                <a href="#">Top Gainers</a>
              </li>
              <li>
                <a href="#">Top Losers</a>
              </li>
              <li>
                <a href="#">New Listing</a>
              </li>
              <li>
                <a href="#">Defi</a>
              </li>
              <li>
                <a href="#">Metaverse</a>
              </li>
            </ul>
          </div>
          <img className="line-market" src={line_market} alt="" />
          <div className="cards-container">
            {marketData.map((crypto, index) => (
              <MarketCard key={index} data={crypto} />
            ))}
          </div>
        </div>
      </div>

      <div className="button-see">
        <div className="container">
          <a href="#">See All Market <img src={share} alt="" /></a>
        </div>
      </div>

      <div className="start-trading">
        <div className="container">
          <h1 className="starting">Start Trading In Simple Process</h1>
          <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <img src={tradingLine} alt="" width={"100%"} />
          <div className="cards">
            <div className="card">
              <img src={account} alt="" />
              <h2>Create Account</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <a className="a-card" href="">Sign Up Now</a>
            </div>
            <div className="card">
              <img src={verify} alt="" />
              <h2>Verify Bank Account</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <a className="a-card" href="">Verify Now</a>
            </div>
            <div className="card">
              <img src={wallet} alt="" />
              <h2>Add Fund in Wallet</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <a className="a-card" href="">Add Now</a>
            </div>
            <div className="card">
              <img src={trading} alt="" />
              <h2>Start Trading</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <a className="a-card" href="">Start Now</a>
            </div>
          </div>
        </div>
      </div>

      <div className="why-chose">
        <div className="container">
          <h1>Why Choose Crypto Brains!</h1>
          <p>When an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
      </div>

    </>
  );
}