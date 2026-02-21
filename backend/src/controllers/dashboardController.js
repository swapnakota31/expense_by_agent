const Expense = require("../models/Expense");

const getDashboardData = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });

    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const numberOfTransactions = expenses.length;
    const latestTransactions = expenses.slice(0, 5);

    return res.status(200).json({
      totalExpenses,
      numberOfTransactions,
      latestTransactions,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch dashboard data", error: error.message });
  }
};

module.exports = { getDashboardData };
