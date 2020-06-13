import React, { useContext, useEffect } from "react";
import Transaction from "./Transaction";
import { GlobalContext } from "../context/GlobalState";

const TransactionList = () => {
  const { transactions, getTransactions } = useContext(GlobalContext);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3 id="txnHistoryLabel">History</h3>
      <ul id="txnHistoryList" className="list">
        {transactions.map((trx) => (
          <Transaction transaction={trx} key={trx._id} />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
