import Song from "./song";

export default interface Artist {
  _id: string;
  name: string;
  songs: Song[];
  modified: number;
}
