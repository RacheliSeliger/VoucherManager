const User = require('../models/user');

// User controller methods
exports.createUser = async (req, res) => {
  try {
    const { barcode, amount, createdAt } = req.body;
    const newUser = new User({
      barcode,
      amount,
      createdAt
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error); 
    res.status(500).json({ error: 'Internal server error' });
  }
};
// {
//   "barcode" : "1976754312",
//   "amount" : 30
//   }
  

exports.get = async (req, res) => {
  try {
    const amount = parseInt(req.query.amount);

    const vouchers = await User.find({ amount: { $lte: amount } }).sort({ amount: -1 });
    if (vouchers.length === 0) {
      res.status(404).json({ message: `No vouchers found that can cover the amount ${amount}` });
      return;
    }

    let remainingAmount = amount;
    const selectedVouchers = [];
    for (const voucher of vouchers) {
      if (remainingAmount >= voucher.amount) {
        selectedVouchers.push(voucher.barcode);
        remainingAmount -= voucher.amount;
        if (remainingAmount === 0) {
          break;
        }
      }
    }

    const response = {
      barcodes: selectedVouchers,
      totalAmount: amount - remainingAmount,
      remainingAmount: remainingAmount
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteVoucher =  async (req, res) => {

  try {
    const barcode = req.params.barcode;

    const deletedVoucher = await User.findOneAndDelete({ barcode });
    if (!deletedVoucher) {
      res.status(404).json({ error: 'voucher not found' });
    } else {
      res.json(deletedVoucher);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

