const ExpenseTable = ({ expenses, deleteExpens }) => {
  return (
    <div className="expense-list">
      {expenses.map((expense, index) => (
        <div key={index} className="expense-item">
          <div className="expense-description">{expense.text}</div>
          <div
            className={`expense-amount ${expense.amount > 0 ? "positive" : "negative"}`}
          >
            ₹{Math.abs(expense.amount).toFixed(2)}
          </div>
          <button
            className="delete-button"
            onClick={() => deleteExpens(expense._id)}
            title="Delete"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseTable;
