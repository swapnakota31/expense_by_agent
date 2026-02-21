export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  totalExpenses: number;
  numberOfTransactions: number;
  latestTransactions: Expense[];
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
