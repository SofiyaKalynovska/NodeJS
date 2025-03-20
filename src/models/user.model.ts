import { IUser } from 'interfaces/user.interface';
import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    phone: { type: String, required: false },
    registrationDate: { type: Date, default: Date.now },
    isDelete: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

export const User = model<IUser>('users', userSchema);
