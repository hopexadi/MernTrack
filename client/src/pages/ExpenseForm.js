import { useState } from "react";
import { handleError } from "../utils";

function ExpenseForm({ addTransaction }) {
  const [expenseInfo, setExpenseInfo] = useState({ amount: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInfo((prev) => ({ ...prev, [name]: value }));
  };

  const addExpenses = (e) => {
    e.preventDefault();
    const { amount, text } = expenseInfo;
    if (!amount || !text) return handleError("Please add Expense Details");
    addTransaction(expenseInfo);
    setExpenseInfo({ amount: "", text: "" });
  };

  return (
    <div className="login-card">
      <h2>Expense Tracker</h2>
      <form onSubmit={addExpenses}>
        <label>Expense Detail</label>
        <input name="text" type="text" onChange={handleChange} value={expenseInfo.text} placeholder="Enter your Expense Detail..." />
        <label>Amount</label>
        <input name="amount" type="number" onChange={handleChange} value={expenseInfo.amount} placeholder="Enter your Amount..." />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
