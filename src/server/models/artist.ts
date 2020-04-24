import * as mongoose from "mongoose";
import { ISong } from "./song";

export interface IArtist extends mongoose.Document {
  name: string;
  songs: mongoose.Types.Array<ISong>;
  modified: number; // check
}

const artistSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  modified: { type: Date, required: true, default: Date.now }
});

export default mongoose.model<IArtist>("Artist", artistSchema);
