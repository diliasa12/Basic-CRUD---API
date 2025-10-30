const Account = require("../models/model.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const postAccount = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingEmail = await Account.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).send("email has been registered");
    }
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const account = await Account.create({
      email,
      password: hashPassword,
    });
    res
      .status(200)
      .json({ message: "Account successfully register", data: account });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAccount = async (req, res) => {
  try {
    const account = await Account.find({});
    res.status(200).json({ account });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const existingId = await Account.findById(id);
    if (!existingId) {
      return res.status(400).json({ message: "Couldn't find ID" });
    }
    res.status(200).json(existingId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const putById = async (req, res) => {
  try {
    const { id } = req.params;
    if (await Account.findOne({ email: req.body.email })) {
      res.status(404).json({ message: "Email has been registered" });
    }
    const account = await Account.findOneAndUpdate({ _id: id }, req.body);
    if (!account) {
      return res.status(400).json({ message: "Can't find ID" });
    }
    const updateAccount = await Account.findById(id);
    res
      .status(200)
      .json({ message: "Account succesfully updated", data: updateAccount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await Account.findOneAndDelete({ _id: id });
    if (!account) {
      return res.status(400).json({ message: "ID hasn't register yet" });
    }
    res
      .status(200)
      .json({ message: "Account sucessfully deleted", data: account });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAccount,
  getById,
  putById,
  postAccount,
  deleteById,
};
