import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const IncomeExpense = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1;

  return (
    <div className="inc-exp-container">
      <div id="incomeWrapper">
        <h4 id="incomeLabel">Income</h4>
        <p id="incomeAmount" className="money plus">
          ${income}
        </p>
      </div>
      <div id="expenseWrapper">
        <h4 id="expenseLabel">Expense</h4>
        <p id="expenseAmount" className="money minus">
          ${expense}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpense;
