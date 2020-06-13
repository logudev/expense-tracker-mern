const Transaction = require("../models/Transaction");
const mongoose = require("mongoose");

// @desc: GET all transactions
// @route: GET api/v1/transactions
// @access: Public
exports.getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc: Add new transaction
// @route: POST api/v1/transactions
// @access: Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map(
        (errVal) => errVal.message
      );
      return res.status(400).json({
        success: false,
        error: errorMessages,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: "Server Error",
      });
    }
    console.log(err.errors);
  }
};

// @desc: Delete a transaction
// @route: DELETE api/v1/transactions/:id
// @access: Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const isToDelete = req.params.id;
    if (mongoose.Types.ObjectId.isValid(isToDelete)) {
      const transaction = await Transaction.findById(req.params.id);
      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: "Transaction not found",
        });
      }
      await transaction.remove();
      return res.status(200).json({
        success: true,
        data: {
          message: "Transaction deleted",
        },
      });
    } else {
      return res.status(404).json({
        success: false,
        error: "Transaction not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
