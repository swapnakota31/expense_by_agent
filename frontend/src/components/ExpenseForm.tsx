import { useEffect, useState } from "react";
import type { Expense } from "../types";

interface ExpenseFormProps {
  onSubmit: (payload: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => Promise<void>;
  onCancelEdit: () => void;
  editingExpense: Expense | null;
  isSubmitting: boolean;
}

const defaultForm = {
  title: "",
  amount: "",
  category: "Food",
  date: "",
};

const categories = ["Food", "Transport", "Bills", "Shopping", "Health", "Other"];

const ExpenseForm = ({
  onSubmit,
  onCancelEdit,
  editingExpense,
  isSubmitting,
}: ExpenseFormProps) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        amount: String(editingExpense.amount),
        category: editingExpense.category,
        date: editingExpense.date.split("T")[0],
      });
    } else {
      setForm(defaultForm);
    }
  }, [editingExpense]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit({
      title: form.title,
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
    });

    if (!editingExpense) {
      setForm(defaultForm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-5">
      <input
        type="text"
        name="title"
        placeholder="Expense title"
        value={form.title}
        onChange={handleChange}
        className="rounded border p-2"
        required
      />
      <input
        type="number"
        min="0"
        step="0.01"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="rounded border p-2"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="rounded border p-2"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="rounded border p-2"
        required
      />
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-600 px-3 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : editingExpense ? "Update" : "Add"}
        </button>
        {editingExpense && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded bg-gray-200 px-3 py-2 text-gray-700"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
