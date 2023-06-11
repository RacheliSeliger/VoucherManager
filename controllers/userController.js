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
    const amount = req.query.amount; // Get the desired amount from the query parameters
    const voucher = await User.findOne({ amount }).sort({ createdAt: 1 }); // Add a filter for the desired amount
    if (!voucher) {
      res.status(404).json({ message: `No voucher found with amount ${amount}` });
      return;
    }
    res.json(voucher.barcode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { barcode, amount } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.deleteVoucher =  async (req, res) => {

  try {
    const barcode = req.params.barcode;

    const deletedVoucher = await User.findOneAndDelete({ barcode });
    if (!deletedVoucher) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(deletedVoucher);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

