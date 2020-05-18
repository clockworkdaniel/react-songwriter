import getIe11GridItemRules from "./getIe11GridItemRules";
import { getIe11GridContainerRules } from "./getIe11GridContainerRules";
import { BaseGridStyles } from "./ReactGrid";

export const getIe11GridRules = (
  gridTemplateAreas: string | number | BaseGridStyles,
  gridGap: string | number | BaseGridStyles,
  gridTemplateColumns: string | number | BaseGridStyles,
  children: JSX.Element[]
) => {
  // can remove if I can improve GridStyles typing
  if (
    typeof gridTemplateAreas !== "string" ||
    typeof gridTemplateColumns !== "string"
  ) {
    console.error("gridTemplateAreas/Columns of incorrect type");
    return null;
  }

  if (typeof gridGap !== "string" && typeof gridGap !== "number") {
    console.error("gridGap of incorrect type");
    return null;
  }

  const gridAreaRegex = /['"].+?['"]/gm;
  const gridTemplateAreasByRow = gridTemplateAreas.match(gridAreaRegex);

  if (!gridTemplateAreasByRow) {
    console.error("faulty grid template");
    return null;
  }

  const gridContainerTemplate = getIe11GridContainerRules(
    gridTemplateAreasByRow,
    gridGap as string | number,
    gridTemplateColumns
  );

  const gridAreas = children.reduce((acc, child, index) => {
    const { itemName } = child.props;

    return {
      ...acc,
      [`& > :nth-child(${index + 1})`]: {
        gridArea: `${itemName}`,
        ...getIe11GridItemRules(itemName, gridTemplateAreasByRow)
      }
    };
  }, {});

  return {
    ...gridContainerTemplate,
    ...gridAreas
  };
};
