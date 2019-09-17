import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import {conn} from '../dbConfig/mongoDB';

const pricePlanSchema = new mongoose.Schema(
  {
    seq: {type: Number},
    title: {type: String, required: true},
    price: {type: String, required: true},
    period: {type: String, required: true},
    channel: {type: String},
  }
);

const subscriptionSchema = new mongoose.Schema(
  {
    seq: {type: Number},
    name: {type: String, required: true, unique: true},
    price: {type: Number},
    paymentDate: {type: Date},
    channel: {type: String},
    pricePlan: pricePlanSchema,
  }
);

const userSchema = new mongoose.Schema(
  {
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nickname: {type: String, required: true},
    salt: {type: Number, required: true},
    role: {type: String, required: true},
    subscription: subscriptionSchema,
  },
  {
    timestamps: true, // createAt & modifiedAt
  }
);

autoIncrement.initialize(conn);
userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'seq',
  startAt: 1,
  incrementBy: 1,
});

export default mongoose.model('User', userSchema);
