import { useEffect, useState } from "react";
import { getCoinList } from "../../services/cryptoApi";
import TableCoin from "../module/TableCoin";
import Pagination from "../module/Pagination";
import Search from "../module/Search";
import Chart from "../module/Chart";

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const res = await fetch(getCoinList(page, currency));
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    };
    getData();
  }, [page, currency]);

  return (
    <div>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoin coins={coins} loading={loading} setChart={setChart} />
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart} />}
    </div>
  );
};

export default HomePage;
