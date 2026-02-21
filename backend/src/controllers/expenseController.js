const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || amount === undefined || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = await Expense.create({
      user: req.user._id,
      title,
      amount,
      category,
      date,
    });

    return res.status(201).json({ message: "Expense added", expense });
  } catch (error) {
    return res.status(500).json({ message: "Failed to add expense", error: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const { category } = req.query;

    const query = { user: req.user._id };
    if (category) {
      query.category = category;
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

    return res.status(200).json({ expenses, totalAmount });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch expenses", error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    const { title, amount, category, date } = req.body;

    expense.title = title ?? expense.title;
    expense.amount = amount ?? expense.amount;
    expense.category = category ?? expense.category;
    expense.date = date ?? expense.date;

    const updatedExpense = await expense.save();

    return res.status(200).json({ message: "Expense updated", expense: updatedExpense });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update expense", error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, user: req.user._id });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.deleteOne();

    return res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete expense", error: error.message });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};
