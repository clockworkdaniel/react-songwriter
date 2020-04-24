import { Schema, Document, model } from "mongoose";
import * as bcrypt from "bcrypt";
import { ISong } from "./song";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  realName?: string;
  songs: ISong[];
}

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  realName: { type: String },
  songs: [{ type: Schema.Types.ObjectId, ref: "Song" }]
});

userSchema.pre("save", function hashPassword(next) {
  const user = this as IUser;
  // NOTE: when I come to allow password change this will need updating
  if (user.isNew) {
    const { password } = user;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds).then(hash => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

// PROBLEM prevents array pushing/saving in async?

export default model<IUser>("User", userSchema);
