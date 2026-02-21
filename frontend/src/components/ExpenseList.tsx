import type { Expense } from "../types";

interface ExpenseListProps {
  expenses: Expense[];
  isLoading: boolean;
  onEdit: (expense: Expense) => void;
  onDelete: (expenseId: string) => Promise<void>;
}

const ExpenseList = ({ expenses, isLoading, onEdit, onDelete }: ExpenseListProps) => {
  if (isLoading) {
    return <div className="rounded-lg bg-white p-4 shadow">Loading expenses...</div>;
  }

  if (expenses.length === 0) {
    return <div className="rounded-lg bg-white p-4 shadow">No expenses found.</div>;
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3">Title</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Category</th>
            <th className="p-3">Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id} className="border-t">
              <td className="p-3">{expense.title}</td>
              <td className="p-3">${expense.amount.toFixed(2)}</td>
              <td className="p-3">{expense.category}</td>
              <td className="p-3">{new Date(expense.date).toLocaleDateString()}</td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="rounded bg-yellow-400 px-2 py-1 text-xs text-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(expense._id)}
                    className="rounded bg-red-500 px-2 py-1 text-xs text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
