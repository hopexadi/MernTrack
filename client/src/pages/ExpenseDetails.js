function ExpenseDetails({ incomeAmt, expenseAmt }) {
  return (
    <div className="login-card">
      <h2>Balance: ₹{incomeAmt - expenseAmt}</h2>
      <div className="amounts-container">
        <div>
          <strong>Income:</strong>
          <span className="income-amount"> ₹{incomeAmt}</span>
        </div>
        <div>
          <strong>Expense:</strong>
          <span className="expense-amount"> ₹{expenseAmt}</span>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetails;
