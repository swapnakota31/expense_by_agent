import { useEffect, useMemo, useState } from "react";
import api from "../api/client";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import SummaryCard from "../components/SummaryCard";
import { useAuth } from "../context/AuthContext";
import type { DashboardData, Expense } from "../types";

const DashboardPage = () => {
  const { user, logout } = useAuth();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [loadingExpenses, setLoadingExpenses] = useState(true);
  const [submittingExpense, setSubmittingExpense] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    const { data } = await api.get<DashboardData>("/dashboard");
    setDashboard(data);
  };

  const fetchExpenses = async (category?: string) => {
    setLoadingExpenses(true);
    const query = category ? `?category=${encodeURIComponent(category)}` : "";
    const { data } = await api.get<{ expenses: Expense[] }>(`/expenses${query}`);
    setExpenses(data.expenses);
    setLoadingExpenses(false);
  };

  const loadData = async (category?: string) => {
    try {
      setError("");
      await Promise.all([fetchDashboard(), fetchExpenses(category)]);
    } catch (apiError: any) {
      setError(apiError?.response?.data?.message || "Failed to load dashboard");
      setLoadingExpenses(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFilterChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    setCategoryFilter(category);
    await loadData(category || undefined);
  };

  const handleExpenseSubmit = async (payload: {
    title: string;
    amount: number;
    category: string;
    date: string;
  }) => {
    try {
      setSubmittingExpense(true);
      setError("");

      if (editingExpense) {
        await api.put(`/expenses/${editingExpense._id}`, payload);
        setEditingExpense(null);
      } else {
        await api.post("/expenses", payload);
      }

      await loadData(categoryFilter || undefined);
    } catch (apiError: any) {
      setError(apiError?.response?.data?.message || "Failed to save expense");
    } finally {
      setSubmittingExpense(false);
    }
  };

  const handleDelete = async (expenseId: string) => {
    try {
      setError("");
      await api.delete(`/expenses/${expenseId}`);
      await loadData(categoryFilter || undefined);
    } catch (apiError: any) {
      setError(apiError?.response?.data?.message || "Failed to delete expense");
    }
  };

  const latestTransactions = useMemo(
    () => dashboard?.latestTransactions ?? [],
    [dashboard]
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-4">
        <header className="flex flex-col justify-between gap-2 rounded-lg bg-white p-4 shadow md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Expense Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
          </div>
          <button onClick={logout} className="rounded bg-gray-800 px-4 py-2 text-white">
            Logout
          </button>
        </header>

        {error && <p className="rounded bg-red-100 p-3 text-sm text-red-700">{error}</p>}

        <section className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            label="Total Expenses"
            value={`$${(dashboard?.totalExpenses ?? 0).toFixed(2)}`}
          />
          <SummaryCard label="Transactions" value={dashboard?.numberOfTransactions ?? 0} />
          <SummaryCard label="Latest Transactions" value={latestTransactions.length} />
        </section>

        <section>
          <ExpenseForm
            onSubmit={handleExpenseSubmit}
            onCancelEdit={() => setEditingExpense(null)}
            editingExpense={editingExpense}
            isSubmitting={submittingExpense}
          />
        </section>

        <section className="rounded-lg bg-white p-4 shadow">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filter Expenses</h2>
            <select
              value={categoryFilter}
              onChange={handleFilterChange}
              className="rounded border p-2"
            >
              <option value="">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Shopping">Shopping</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <ExpenseList
            expenses={expenses}
            isLoading={loadingExpenses}
            onEdit={setEditingExpense}
            onDelete={handleDelete}
          />
        </section>

        <section className="rounded-lg bg-white p-4 shadow">
          <h2 className="mb-3 text-lg font-semibold">Latest 5 Transactions</h2>
          {latestTransactions.length === 0 ? (
            <p className="text-sm text-gray-600">No recent transactions.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {latestTransactions.map((item) => (
                <li key={item._id} className="flex justify-between rounded bg-gray-50 p-2">
                  <span>
                    {item.title} ({item.category})
                  </span>
                  <span>${item.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
