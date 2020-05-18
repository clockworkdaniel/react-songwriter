import { createUseStyles } from "react-jss";
import * as React from "react";

import { getIe11GridRules } from "./getIe11GridRules";

// idealy this should be more specific about styles we accept
// but can't get that to work with typescript :(
export interface BaseGridStyles {
  [name: string]: string | number;
}

// including potential nested media query
export interface GridStyles {
  [name: string]: string | number | BaseGridStyles;
}

type Props = {
  children: JSX.Element[];
  gridStyles: GridStyles;
};

const ReactGrid: React.FunctionComponent<Props> = ({
  children,
  gridStyles
}) => {
  if (!children) {
    return null;
  }

  let mediaQueryStyles = {};

  for (let [key, value] of Object.entries(gridStyles)) {
    if (key.match(/@media/) && typeof value === "object") {
      mediaQueryStyles[key] = {
        ...value,
        ...getIe11GridRules(
          value.gridTemplateAreas,
          // fallback to base gridGap if not specified within this media query
          // note how this could differ from CSS rule application logic
          value.gridGap || gridStyles.gridGap,
          value.gridTemplateColumns,
          children
        )
      };
    }
  }

  const classes = createUseStyles({
    reactGrid: {
      display: "-ms-grid",
      ...gridStyles,
      ...getIe11GridRules(
        gridStyles.gridTemplateAreas,
        gridStyles.gridGap,
        gridStyles.gridTemplateColumns,
        children
      ),
      // doing this because I'm not sure how to have 2 display rules otherwise
      ["@supports (display: grid)"]: {
        display: "grid"
      },
      ...mediaQueryStyles
    }
  })();

  return <div className={classes.reactGrid}>{children}</div>;
};

export default ReactGrid;
