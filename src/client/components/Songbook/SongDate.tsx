import * as React from "react";
import niceDate from "../../functions/niceDate";

interface Props {
  label: string;
  date?: string;
}

export default function SongDate({ label, date }: Props) {
  const formattedDate = niceDate(date);

  return formattedDate ? (
    <p className="song__date">
      <span className="song__date-type">{`${label} on: `}</span>
      <span className="song__date-date">{formattedDate}</span>
    </p>
  ) : null;
}
