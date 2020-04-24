import Song, { ISong } from "../../models/song";
import Artist, { IArtist } from "../../models/artist";
import User, { IUser } from "../../models/user";

export function getSongs(req, res) {
  const { userId } = req.session;

  const allOrByArtist = req.params.id
    ? { artist: req.params.id, $or: [{ isPublic: true }, { user: userId }] }
    : { $or: [{ isPublic: true }, { user: userId }] };

  Song.find(allOrByArtist, null, { sort: { title: 1 } })
    .select("-structure")
    .populate("artist", "name")
    .exec((err, songs) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(200).json({ songs });
    });
}

export function getSong(req, res) {
  const { userId } = req.session;

  Song.findById(req.params.id)
    .populate("artist", "name")
    .populate("user", "username")
    .exec((err, song) => {
      if (err || !song) {
        //hax
        return res.status(500).json({ message: err.message });
      }
      if (!song.isPublic && userId !== song.user._id.toString()) {
        return res
          .status(401)
          .json({ message: "Private song, please sign in" });
      }
      if (userId !== song.user._id.toString()) {
        return res.status(200).json({ song, editable: false });
      }
      res.status(200).json({ song, editable: true });
    });
}

export function postSong(req, res) {
  const { userId } = req.session;

  const song = req.body;
  const artistName = song.artist;
  const songTitle = song.title;

  function createSongWithArtist(artist, songTitle, user, res) {
    Song.create(
      { title: songTitle, artist: artist._id, user: user._id },
      (err, createdSong) => {
        if (err) {
          return res.status(500).json({ err: err.message });
        }

        user.songs.push(createdSong._id);
        user.save();

        artist.songs.push(createdSong._id);
        artist.modified = Date.now();
        artist.save();
        return res
          .status(201)
          .json({ song: createdSong, message: "Song created" });
      }
    );
  }

  // not sure about the following type
  const foundUserPromise: Promise<IUser | undefined | null> = new Promise(
    (resolve, reject) => {
      return User.findById(userId).exec((err, foundUser) => {
        if (err) {
          reject(err);
        }
        return resolve(foundUser);
      });
    }
  );

  // can result in: no artistName (undefined), artist doesn't exist (null) or artist exists
  const existingArtistPromise: Promise<IArtist | undefined | null> =
    artistName &&
    new Promise((resolve, reject) => {
      return Artist.findOne({ name: artistName }).exec(
        (err, existingArtist) => {
          if (err) {
            reject(err);
          }
          return resolve(existingArtist);
        }
      );
    });

  Promise.all([foundUserPromise, existingArtistPromise]).then(
    ([foundUser, existingArtist]) => {
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      if (existingArtist) {
        createSongWithArtist(existingArtist, songTitle, foundUser, res);
      }
      if (existingArtist === null) {
        Artist.create({ name: artistName, songs: [] }, (err, createdArtist) => {
          if (err) {
            return res.status(500).json({ err: err.message });
          }
          createSongWithArtist(createdArtist, songTitle, foundUser, res);
        });
      }
      if (existingArtist === undefined) {
        Song.create(
          { title: songTitle, user: foundUser._id },
          (err, createdSong) => {
            if (err) {
              return res.status(500).json({ err: err.message });
            }

            foundUser.songs.push(createdSong._id);
            foundUser.save();

            res
              .status(201)
              .json({ song: createdSong, message: "Song created" });
          }
        );
      }
    }
  );
}

function deleteArtistIfSongsEmpty(artist) {
  if (!artist.songs.length) {
    artist.remove();
  }
}

function updateSongArtist(song: ISong, newArtist: IArtist, res) {
  // rethink
  if (!song || !song.artist) {
    return;
  }

  if (song.artist.name === newArtist.name) {
    Artist.findById(song.artist._id).exec((err, existingArtist) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      // guess
      if (!existingArtist) {
        return res.status(404).json({ message: "artist not found" });
      }
      existingArtist.modified = Date.now();
      existingArtist.save();
      return res.status(200).json({ song, message: "Song and artist updated" });
    });
  } else {
    Artist.findById(song.artist._id).exec((err, oldArtist) => {
      if (!oldArtist) {
        return res.status(500).json({ message: "artist not found" });
      }
      const pullArtistPromise = new Promise((resolve, reject) => {
        oldArtist.songs.pull(song._id);
        resolve(oldArtist.save());
      });
      pullArtistPromise.then(artist => {
        deleteArtistIfSongsEmpty(artist);
      });
    });

    const newArtistId: Promise<IArtist> = new Promise((resolve, reject) => {
      Artist.findOne({ name: newArtist.name }).exec((err, foundArtist) => {
        if (err) {
          res.status(500).json({ err: err.message });
        }
        if (foundArtist) {
          foundArtist.songs.push(song._id);
          foundArtist.modified = Date.now();
          foundArtist.save();
          resolve(foundArtist._id);
        } else {
          Artist.create(
            { name: newArtist.name, songs: [song._id] },
            (err, createdArtist) => {
              if (err) {
                res.status(500).json({ err: err.message });
              }
              resolve(createdArtist._id);
            }
          );
        }
      });
    });
    newArtistId.then(artistId => {
      song.artist = artistId;
      song.save();
      res.status(200).json({ song, message: "Song updated" });
    });
  }
}

export function putSong(req, res) {
  const { userId } = req.session;
  const { id } = req.params;
  const song = req.body;

  Song.findByIdAndUpdate(id, {
    title: song.title,
    structure: song.structure,
    modified: Date.now()
  })
    .populate("artist", "name")
    .exec((err, songAsItExisted: ISong) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (userId !== songAsItExisted.user.toString()) {
        return res.status(401).json({ message: "Unauthorised" });
      }
      updateSongArtist(songAsItExisted, song.artist, res);
    });
}

export function deleteSong(req, res) {
  const { userId } = req.session;
  const { id } = req.params;

  Song.findByIdAndDelete(id).exec((err, song: ISong) => {
    if (err) {
      return res.status(500).json({ err: err.message });
    }
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    if (userId !== song.user.toString()) {
      return res.status(401).json({ message: "Unauthorised" });
    }
    if (song.artist) {
      Artist.findById(song.artist._id).exec((err, foundArtist) => {
        if (!foundArtist) {
          return res.status(404).json({ message: "Artist not found" });
        }
        const pullArtistPromise = new Promise((resolve, reject) => {
          foundArtist.songs.pull(song._id);
          resolve(foundArtist.save());
        });

        return pullArtistPromise.then(artist => {
          deleteArtistIfSongsEmpty(artist);
          res.status(200).json({ message: "Song deleted", songId: id });
        });
      });
    }
  });
}

export function togglePrivacy(req, res) {
  const { userId } = req.session;
  const { id } = req.params;

  Song.findById(id).exec((err, song) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    if (userId !== song.user.toString()) {
      return res.status(401).json({ message: "Unauthorised" });
    }
    song.isPublic = !song.isPublic;
    song.save();

    res.status(200).json({ isPublic: song.isPublic, message: "Song updated" });
  });
}
