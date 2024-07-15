import React, { useEffect, useState } from "react";
import "./wallet.scss";
import { Header } from "../../components/header/header";
import { IoTrashOutline, IoWalletOutline } from "react-icons/io5";

const currencyList = [
  ["AED", "Dirham dos Emirados"],
  ["ARS", "Peso Argentino"],
  ["AUD", "Dólar Australiano"],
  ["BOB", "Boliviano"],
  ["BTC", "Bitcoin"],
  ["CAD", "Dólar Canadense"],
  ["CHF", "Franco Suíço"],
  ["CLP", "Peso Chileno"],
  ["CNY", "Yuan Chinês"],
  ["COP", "Peso Colombiano"],
  ["DKK", "Coroa Dinamarquesa"],
  ["DOGE", "Dogecoin"],
  ["ETH", "Ethereum"],
  ["EUR", "Euro"],
  ["GBP", "Libra Esterlina"],
  ["HKD", "Dólar de Hong Kong"], 
  ["ILS", "Novo Shekel Israelense"],
  ["INR", "Rúpia Indiana"],
  ["JPY", "Iene Japonês"],
  ["LTC", "Litecoin"],
  ["MXN", "Peso Mexicano"],
  ["NOK", "Coroa Norueguesa"],
  ["NZD", "Dólar Neozelandês"],
  ["PEN", "Sol do Peru"],
  ["PLN", "Zlóti Polonês"],
  ["PYG", "Guarani Paraguaio"],
  ["RUB", "Rublo Russo"],
  ["SAR", "Riyal Saudita"],
  ["SEK", "Coroa Sueca"],
  ["SGD", "Dólar de Cingapura"],
  ["THB", "Baht Tailandês"],
  ["TRY", "Nova Lira Turca"],
  ["TWD", "Dólar Taiuanês"],
  ["USD", "Dólar Americano"],
  ["UYU", "Peso Uruguaio"],
  ["VEF", "Bolívar Venezuelano"],
  ["XRP", "XRP"],
  ["ZAR", "Rand Sul-Africano"],
];

interface Currency {
  id: string;
  wallet_id: string;
  name: string;
}

interface Wallet {
  id: string;
  user_id: string;
  name: string;
  coins: Currency[];
}

interface ConversionRates {
  [key: string]: {
    code: string;
    codein: string;
    name: string;
    bid: string;
  };
}

const Wallet: React.FC = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [selectedCurrencies, setSelectedCurrencies] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentWalletId, setCurrentWalletId] = useState<string | null>(null);
  const [conversionRates, setConversionRates] = useState<ConversionRates>({});

  const fetchWallets = async () => {
    try {
      const token = localStorage.getItem("auth");
      const response = await fetch(process.env.COIN_API_URL + "/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setWallets(data.result);
    } catch (error) {
      console.error("Failed to fetch wallets:", error);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const fetchConversionRates = async (currencies: string[]) => {
    if (currencies?.length === 0) {
      return;
    }

    try {
      const response = await fetch(
        process.env.ECONOMIA_API_URL + `/json/last/${currencies.join(
          "-BRL,"
        )}-BRL`
      );
      const data: ConversionRates = await response.json();
      setConversionRates(data);
    } catch (error) {
      console.error("Failed to fetch conversion rates:", error);
    }
  };

  const handleCreateOrUpdateWallet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCurrencies.length > 10) {
      setError("Selecione até 10 moedas.");
      return;
    }

    if (selectedCurrencies.length === 0) {
      setError("Selecione pelo menos uma moeda.");
      return;
    }
    setError("");

    try {
      const token = localStorage.getItem("auth");
      const url = isEditing
        ? process.env.COIN_API_URL +`/wallet/${currentWalletId}`
        : process.env.COIN_API_URL + "/wallet";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          coins: selectedCurrencies,
        }),
      });

      const data = await response.json();

      if (data.status === "Ok!") {
        fetchWallets();
        setShowModal(false);
        setName("");
        setSelectedCurrencies([]);
        setIsEditing(false);
        setCurrentWalletId(null);
        setConversionRates({});
      } else {
        setError("Não foi possível salvar Carteira. Tente novamente.");
      }
    } catch (error) {
      setError("Não foi possível salvar Carteira. Tente novamente.");
    }
  };

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrencies((prev) => {
      const updatedCurrencies = prev.includes(currency)
        ? prev.filter((curr) => curr !== currency)
        : [...prev, currency];

      fetchConversionRates(updatedCurrencies);
      return updatedCurrencies;
    });
  };

  const handleDeleteWallet = async (id: string) => {
    try {
      const token = localStorage.getItem("auth");
      const response = await fetch(process.env.COIN_API_URL + `/wallet/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === "Ok!") {
        setWallets(wallets?.filter((wallet) => wallet.id !== id));
      } else {
        setError("Não foi possível remover Carteira. Tente novamente.");
      }
    } catch (error) {
      setError("Não foi possível remover Carteira. Tente novamente.");
    }
  };

  const handleEditWallet = (wallet: Wallet) => {
    setName(wallet.name);
    const selectedCurrencyCodes = wallet.coins.map((coin) => coin.name);
    setSelectedCurrencies(selectedCurrencyCodes);
    setCurrentWalletId(wallet.id);
    setIsEditing(true);
    setShowModal(true);
    fetchConversionRates(selectedCurrencyCodes);
  };

  const sortedCurrencyList =
    selectedCurrencies.length > 0
      ? [
          ...currencyList.filter(([code]) => selectedCurrencies.includes(code)),
          ...currencyList.filter(
            ([code]) => !selectedCurrencies.includes(code)
          ),
        ]
      : currencyList;

  return (
    <div className="root-wrapper">
      <Header />
      <div className="wallet-container">
        <h2>Carteiras</h2>
        <button
          className="create-button"
          onClick={() => {
            setShowModal(true);
            setIsEditing(false);
            setName("");
            setSelectedCurrencies([]);
          }}
        >
          <IoWalletOutline/>
        </button>

        <ul>
          {wallets?.map((wallet) => (
            <li key={wallet.id} onClick={() => handleEditWallet(wallet)}>
              {wallet.name}
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteWallet(wallet.id);
                }}
              >
                <IoTrashOutline/>
              </button>
            </li>
          ))}
        </ul>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h2>{isEditing ? "Editar Carteira" : "Criar Nova Carteira"}</h2>
              <form onSubmit={handleCreateOrUpdateWallet}>
                <div>
                  <label className="label-wallet">Nome da carteira:</label>
                  <input
                    className="input-text-wallet"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="checkbox-wrapper">
                  <label className="label-wallet">Selecione suas moedas:</label>
                  {sortedCurrencyList.map(([code, name]) => (
                    <div key={code}>
                      <input
                        className="input-checkbox-wallet"
                        type="checkbox"
                        id={code}
                        value={code}
                        onChange={() => handleCurrencyChange(code)}
                        checked={selectedCurrencies.includes(code)}
                      />
                      <label htmlFor={code} className="label-checkbox-wallet">
                        {name}
                        {selectedCurrencies.includes(code) &&
                          conversionRates[`${code}BRL`] && (
                            <span className="span-value-wallet">
                              - {conversionRates[`${code}BRL`].bid} BRL
                            </span>
                          )}
                      </label>
                    </div>
                  ))}
                </div>
                {error && <p className="error">{error}</p>}
                <button className="btn-submit-wallet" type="submit">
                  {isEditing ? "Atualizar Carteira" : "Criar Carteira"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;
