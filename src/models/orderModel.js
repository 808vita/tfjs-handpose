import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderData = models.order || model("order", orderSchema);
export default OrderData;
