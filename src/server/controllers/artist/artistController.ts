import Artist from "../../models/artist";

export function getArtists(req, res) {
  const { userId } = req.session;

  Artist.find({}, null, { sort: { name: 1 } })
    .populate({
      path: "songs",
      match: { $or: [{ isPublic: true }, { user: userId }] },
      select: "title created modified",
      options: {
        sort: { modified: -1 }
        // limit: 5
      }
    })
    .exec((err, artists) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ artists });
    });
}

export function getArtist(req, res) {
  const { userId } = req.session;

  Artist.findOne({ _id: req.params.id })
    .populate({
      path: "songs",
      match: { $or: [{ isPublic: true }, { user: userId }] },
      select: "title created modified",
      options: {
        sort: { modified: -1 }
      }
    })
    .exec((err, artist) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({ artists: [artist] });
    });
}
