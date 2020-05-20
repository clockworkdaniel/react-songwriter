export default function getIe11GridItemRules(
  itemName: string,
  templateRows: string[]
) {
  // capture group is required since negative lookbehind not supported in ie11
  const regEx = new RegExp(`[\\s'"](${itemName})(?!-)\\b`, "g");

  const accHits: {
    vertical: number;
    firstVertical: number | undefined;
    horizontal: number;
    firstHorizontal: number | undefined;
  } = templateRows.reduce(
    (acc, row, index) => {
      // the following is necessary to use capture group rather than match
      let match: RegExpExecArray | null;
      let matches: string[] = [];

      while ((match = regEx.exec(row)) !== null) {
        matches.push(match[1]);
      }

      let vertical, firstVertical, horizontal, firstHorizontal;

      if (matches.length) {
        vertical = !acc.firstVertical ? acc.vertical + 1 : acc.vertical + 2;
        if (!acc.firstVertical) {
          firstVertical = index * 2 + 1;
        }
      }

      if (matches.length && !acc.horizontal) {
        horizontal = (matches.length - 1) * 2 + 1;

        const matchedRow = row.match(/[^'\s]+/g);
        const matchedRowIndex = matchedRow
          ? matchedRow.findIndex(col => col === itemName)
          : undefined;
        firstHorizontal =
          typeof matchedRowIndex !== "undefined"
            ? matchedRowIndex * 2 + 1
            : undefined;
      }

      return {
        vertical: vertical || acc.vertical,
        firstVertical: firstVertical || acc.firstVertical,
        horizontal: horizontal || acc.horizontal,
        firstHorizontal: firstHorizontal || acc.firstHorizontal
      };
    },
    {
      vertical: 0,
      firstVertical: undefined,
      horizontal: 0,
      firstHorizontal: undefined
    }
  );

  return {
    "-ms-grid-column": accHits.firstHorizontal,
    "-ms-grid-row": accHits.firstVertical,
    "-ms-grid-column-span":
      accHits.horizontal > 1 ? accHits.horizontal : undefined,
    "-ms-grid-row-span": accHits.vertical > 1 ? accHits.vertical : undefined
  };
}
