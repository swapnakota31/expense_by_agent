const express = require("express");
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(protect);

router.route("/").post(addExpense).get(getExpenses);
router.route("/:id").put(updateExpense).delete(deleteExpense);

module.exports = router;
