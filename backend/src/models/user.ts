import { Schema, Types, model, Model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    rut: {
      type: String,
      required: true,
      unique: true
    },
    
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }  
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model('users', UserSchema);

export default UserModel;