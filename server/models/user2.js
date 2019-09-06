import mongoose from 'mongoose';

const pricePlanSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    content: { type: String },
  }
);

const subscriptionSchema = new mongoose.Schema(
  {
    seq: { type: Number },
    title: { type: String, required: true, unique: true },
    price: { type: Number },
    paymentDate: { type: Date },
    channel: { type: String },
    pricePlan: pricePlanSchema,
  }
);

const user2Schema = new mongoose.Schema(
  {
    seq: { type: Number },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: { type: String },
    role: { type: String },
    subscription: subscriptionSchema,
    createdAt: { type: Date, default: Date.now },

  },
);

export default mongoose.model('User2', user2Schema);