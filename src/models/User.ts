import { UserRole } from "@/constants/roles";
import mongoose, { model, models, Schema } from "mongoose";

export type UserDocument = {
  _id : mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: string;
  roles: UserRole[];
  photo?: String,
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const userSchema = new Schema<UserDocument>(
    {
        name: {
         type: String,
         required: true,
        trim: true,
        },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    roles :{
        type : [String],
        enum : Object.values(UserRole),
        default: [UserRole.CUSTOMER],
        required: true
    },
    photo:{
      type: String,
      trim: true      
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    }, {timestamps:true}
);
const User = models.User || model<UserDocument>("User", userSchema)
export default User;