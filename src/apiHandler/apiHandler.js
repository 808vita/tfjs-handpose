import mongoose from "mongoose";
import OrderData from "@/models/orderModel";
import DbConnect from "@/utils/DbConnect";

export const addOrder = async (req, res) => {
  //add order to db

  try {
    await DbConnect();
    const order = await OrderData.create(req.body);
    res.status(201).json({ order });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getOrders = async (req, res) => {
  //add order to db

  try {
    await DbConnect();
    const order = await OrderData.find().sort({ updatedAt: -1 });
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error });
  }
};
