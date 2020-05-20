export function getIe11GridContainerRules(
  gridTemplateAreasByRow: string[],
  gridGap: number | string,
  gridTemplateColumns: string
) {
  const lineNamesRemoved = gridTemplateColumns.replace(/\[\S+/g, "");
  const repeatReplaced = lineNamesRemoved.replace(
    /repeat\((\d+),\s(\w+)\)/g,
    (repeat, c, value) => {
      const count = Number(c);

      let msGridColumns = "";
      for (let i = count; i > 0; i--) {
        msGridColumns += `${value} `;
      }
      return msGridColumns.trim();
    }
  );
  const gapsAdded = repeatReplaced.replace(/\s+/g, ` ${gridGap} `);

  return {
    "-ms-grid-columns": gapsAdded,
    "-ms-grid-rows": `auto ${gridGap} `
      .repeat(gridTemplateAreasByRow.length - 1)
      .concat("auto")
  };
}
