import User from "./user";
import Artist from "./artist";

export interface Character {
  character: string;
  chord: string;
}

export interface Line {
  fullLine: string;
  characters: Character[];
}

export interface Section {
  sectionName: string;
  lines: Line[];
}
export type Structure = Section[];

export default interface Song {
  _id: string;
  title: string;
  artist?: Artist;
  structure: Structure;
  user?: User;
  created?: Date;
  modified?: Date;
  isPublic: boolean;
}
