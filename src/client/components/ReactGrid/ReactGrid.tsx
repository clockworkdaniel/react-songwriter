import { createUseStyles } from "react-jss";
import * as React from "react";

import { getGridRules } from "./getGridRules";

export type GridStyles = {
  gridGap: string | number;
  gridTemplateAreas: string;
  gridTemplateColumns: string;
  supportIe11?: boolean;
};

type Props = {
  children: JSX.Element[];
  gridStyles: GridStyles & {
    // to allow for media query
    [key: string]: Partial<GridStyles> | string | number | boolean;
  };
};

const ReactGrid: React.FunctionComponent<Props> = ({
  children,
  gridStyles
}) => {
  if (!children) {
    return null;
  }

  // only top level supportIe11 is separated here
  const { supportIe11, ...rest } = gridStyles;

  let mediaQueryStyles = {};
  let gridMainStyles = {};
  for (let [key, value] of Object.entries(rest)) {
    if (key.match(/@media/) && typeof value === "object") {
      const {
        supportIe11,
        gridTemplateAreas,
        gridGap,
        gridTemplateColumns,
        ...mediaQueryOtherStyles
      } = value;

      mediaQueryStyles[key] = {
        reactGrid: {
          ...mediaQueryOtherStyles,
          ...getGridRules(
            children,
            gridTemplateAreas,
            gridGap,
            gridTemplateColumns,
            supportIe11
          )
        }
      };
    } else {
      gridMainStyles[key] = value;
    }
  }

  const classes = createUseStyles({
    reactGrid: {
      display: supportIe11 ? "-ms-grid" : "grid",
      // doing this because I'm not sure how to have two display rules otherwise
      ...(supportIe11
        ? {
            ["@supports (display: grid)"]: {
              display: "grid"
            }
          }
        : {}),
      ...gridMainStyles,
      ...getGridRules(
        children,
        gridStyles.gridTemplateAreas,
        gridStyles.gridGap,
        gridStyles.gridTemplateColumns,
        supportIe11
      )
    },
    ...mediaQueryStyles
  });

  return <div className={classes().reactGrid}>{children}</div>;
};

export default ReactGrid;
