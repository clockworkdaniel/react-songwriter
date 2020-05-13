import * as React from "react";

type Props = {
  label: string;
  onClick?(): void;
};

export default function HeaderLink({ label, onClick }: Props) {
  return (
    <li className="header__li">
      <button className="header__link" type="button" onClick={onClick}>
        {label}
      </button>
    </li>
  );
}
