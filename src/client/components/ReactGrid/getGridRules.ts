import getIe11GridItemRules from "./getIe11GridItemRules";
import { getIe11GridContainerRules } from "./getIe11GridContainerRules";

export const getGridRules = (
  children: JSX.Element[],
  gridTemplateAreas?: string,
  gridGap?: string | number,
  gridTemplateColumns?: string,
  supportIe11 = false
) => {
  const gridAreaRegex = /['"].+?['"]/gm;
  const gridTemplateAreasByRow = gridTemplateAreas
    ? gridTemplateAreas.match(gridAreaRegex)
    : undefined;

  if (
    supportIe11 &&
    !(gridTemplateAreasByRow && gridTemplateColumns && gridGap)
  ) {
    console.log(gridTemplateAreasByRow, gridTemplateColumns, gridGap);
    console.error(`ie11 support requires defined grid styles at this level`);
  }

  const ie11GridContainerRules =
    supportIe11 && gridTemplateAreasByRow && gridTemplateColumns && gridGap
      ? getIe11GridContainerRules(
          gridTemplateAreasByRow,
          gridGap,
          gridTemplateColumns
        )
      : {};

  const gridAreas = children.reduce((acc, child, index) => {
    const { itemName } = child.props;

    return {
      ...acc,
      [`& > :nth-child(${index + 1})`]: {
        gridArea: `${itemName}`,
        ...(supportIe11 &&
        gridTemplateAreasByRow &&
        gridTemplateColumns &&
        gridGap
          ? getIe11GridItemRules(itemName, gridTemplateAreasByRow)
          : {})
      }
    };
  }, {});

  return {
    ...ie11GridContainerRules,
    ...gridAreas
  };
};
