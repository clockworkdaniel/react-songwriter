import React from 'react';
import { Link } from 'react-router-dom';

export default function SongUser({ user, _id }) {
  return (
    <div className="songsheet__user ss-user">
      <span className="ss-user__by">Uploaded by</span>
      <Link to={`/user/${_id}`}>
        <p className="ss-user__heading">
          {user}
        </p>
      </Link>
    </div>
  );
}
