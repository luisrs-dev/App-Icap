import { Schema, model } from "mongoose";
import { Session } from "../interfaces/session.interface";

const SessionSchema = new Schema<Session>(
  {
    date: {
      type: String,
      required: true,
      default: new Date().toLocaleDateString()
    },
    type: {
      type: String,
      required: true,
    },    
    rut: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SessionModel = model('sessions', SessionSchema);

export default SessionModel;