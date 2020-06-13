import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount > 0 ? "+" : "-";
  return (
    <li
      id={`txn-${transaction.id}-item`}
      key={transaction.id}
      className={transaction.amount > 0 ? "plus" : "minus"}
    >
      {transaction.text}{" "}
      <span id={`txn-${transaction.id}-amt`}>{`${sign}$${Math.abs(
        transaction.amount
      )}`}</span>
      <button
        id={`txn-${transaction.id}-delete`}
        className="delete-btn"
        onClick={() => deleteTransaction(transaction._id)}
      >
        x
      </button>
    </li>
  );
};

export default Transaction;
