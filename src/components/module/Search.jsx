import { useEffect, useState } from "react";
import { searchCoin } from "../../services/cryptoApi";
import { RotatingLines } from "react-loader-spinner";
import styles from "./Search.module.css";

const Search = ({ currency, setCurrency }) => {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setCoins([]);
    if (!text) {
      setLoading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await res.json();
        if (json.coins) {
          setCoins(json.coins);
          setLoading(false);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };

    setLoading(true);
    search();

    return () => controller.abort();
  }, [text]);

  return (
    <div className={styles.serachBox}>
      <input
        type="text"
        value={text}
        placeholder="Search"
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value={"usd"}>Usd</option>
        <option value={"eur"}>Eur</option>
        <option value={"jpy"}>Jpy</option>
      </select>
      {(!!coins.length || loading) && (
        <div className={styles.searchResult}>
          {loading && (
            <RotatingLines width="50px" strokeWidth="2" strokeColor="#3874ff" />
          )}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb} alt={coin.name} />
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
