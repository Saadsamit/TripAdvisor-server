import { model, Schema } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import { userRole } from '../../const/user';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    picture: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(userRole),
      default: 'user',
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.Bcrypt_Hash_Round),
  );
  next();
});

userSchema.statics.isPasswordMatched = async function (
  textPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(textPassword, hashPassword);
};

const user = model<TUser, TUserModel>('User', userSchema);

export default user;
