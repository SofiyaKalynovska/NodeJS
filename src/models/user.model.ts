import { model, Schema } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { RoleEnum } from '../enums/role.enum';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long']
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: RoleEnum,
      default: RoleEnum.USER
    },
    phone: {
      type: String,
      required: false,
      match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    registrationDate: {
      type: Date,
      default: Date.now
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: 'tasks'
    }]
  },
  { timestamps: true, versionKey: false }
);

export const User = model<IUser>('users', userSchema);
