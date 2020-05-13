import { Schema, Document, model } from "mongoose";
import { IArtist } from "./artist";
import { IUser } from "./user";

interface ICharacter {
  character: string;
  chord: string;
}

interface ILine {
  fullLine: string;
  characters: ICharacter[];
}

interface ISection {
  sectionName: string;
  lines: ILine[];
}

export interface ISong extends Document {
  title: string;
  artist?: IArtist;
  structure: ISection[];
  user: IUser;
  created: number;
  modified: number;
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
