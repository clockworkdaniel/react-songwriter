import Song from "./song";

export default interface User {
  _id: string;
  username: string;
  email: string;
  // maybe shouldn't expose this
  // password: string;
  realName: string;
  songs: Song[];
}
