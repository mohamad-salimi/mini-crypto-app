import TableRow from "./TableRow";
import { RotatingLines } from "react-loader-spinner";
import styles from "./TableCoin.module.css";

const TableCoin = ({ coins, loading, setChart }) => {
  return (
    <div className={styles.container}>
      {loading ? (
        <RotatingLines strokeColor="#3874ff" strokeWidth="2" />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24H</th>
              <th>Total Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow key={coin.id} coin={coin} setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TableCoin;
