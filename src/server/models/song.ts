import { Schema, Document, model } from "mongoose";
import { IArtist } from "./artist";
import { IUser } from "./user";

export interface ISong extends Document {
  title: string;
  artist?: IArtist;
  structure: Array<unknown>;
  user: IUser;
  created: number; // check
  modified: number; // check
  isPublic: boolean;
}

const songSchema = new Schema({
  title: { type: String, trim: true, required: true },
  artist: { type: Schema.Types.ObjectId, ref: "Artist" },
  structure: Array,
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created: { type: Date, required: true, default: Date.now },
  modified: { type: Date, required: true, default: Date.now },
  isPublic: { type: Boolean, default: false }
});

songSchema.post("save", (song, next) => {
  song
    .populate("artist")
    .execPopulate()
    .then(() => {
      next();
    });
});

export default model<ISong>("Song", songSchema);
