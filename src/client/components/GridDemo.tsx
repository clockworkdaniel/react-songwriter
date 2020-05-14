import * as React from "react";
import { LoremIpsum } from "lorem-ipsum";
import { createUseStyles } from "react-jss";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

type Props = {
  children: JSX.Element[];
  styles: Partial<CSSStyleDeclaration>;
};

const ReactGrid: React.FunctionComponent<Props> = ({ children, styles }) => {
  if (!children) {
    return null;
  }

  const gridGap = styles.gridGap;

  const regexp = /['"].+?['"]/gm;
  const templateRows = styles.gridTemplateAreas?.match(regexp);
  const topRow = templateRows ? templateRows[0] : undefined;
  const colCount = topRow?.match(/[^'\s]+/g)?.length;
  const fr = "1fr";

  if (!templateRows || !topRow || !colCount) {
    return null;
  }

  const additionalStylesIncIE = {
    gridTemplateColumns: `repeat(${colCount}, ${fr})`,
    "-ms-grid-columns": `${fr} ${gridGap} `.repeat(colCount - 1).concat(fr),
    "-ms-grid-rows": `auto gridGap `.repeat(colCount - 1).concat("auto")
  };

  const gridAreas = children.reduce((acc, child, index) => {
    const { itemName } = child.props;

    let verticalHits = 0;
    let firstVerticalHit: number | undefined = undefined;
    let horizontalHits = 0;
    let firstHorizontalHit: number | undefined = undefined;
    let horizontalHitsGathered = false;

    const reg = new RegExp(`\\b(?<!-)${itemName}(?!-)\\b`, "g");

    templateRows.map((row, index) => {
      const test = row.match(reg);
      console.log(test);
      if (!!test && test.length > 0 && !horizontalHitsGathered) {
        horizontalHits = test.length;
        horizontalHitsGathered = true;
        const rowIndex = row
          .match(/[^'\s]+/g)
          ?.findIndex(blah => blah === itemName);
        firstHorizontalHit =
          firstHorizontalHit !== undefined || typeof rowIndex === undefined
            ? firstHorizontalHit
            : rowIndex! + 1;
      }
      if (!!test && test.length > 0) {
        verticalHits++;
        firstVerticalHit =
          firstVerticalHit !== undefined ? firstVerticalHit : index + 1;
      }
    });

    return {
      ...acc,
      [`& > :nth-child(${index + 1})`]: {
        gridArea: `${child.props.itemName}`,
        "-ms-grid-column-span": horizontalHits,
        "-ms-grid-row-span": verticalHits,
        "-ms-grid-column": firstHorizontalHit,
        "-ms-grid-row": firstVerticalHit
      }
    };
  }, {});

  const classes = createUseStyles({
    reactGrid: {
      display: "grid",
      ...styles,
      ...additionalStylesIncIE,
      ...gridAreas
    }
  })();

  return <div className={classes.reactGrid}>{children}</div>;
};

const styles = {
  gridTemplateAreas: `'. blah .'
    'copy copyTwo copyTwo'
    'copy copyTwo copyTwo'`,
  gridGap: "1rem"
  // seeing as how
  // gridTemplateColumns: "repeat(3, 1fr)"
};

type GridItemName = { itemName: string };

const Header = ({ title }: { title: string } & GridItemName) => (
  <h1>{`${title}`}</h1>
);
const Copy = ({ copy }: { copy: string } & GridItemName) => <p>{`${copy}`}</p>;

const GridDemo = () => (
  <ReactGrid styles={styles}>
    <Header title="Doggos" itemName="blah" />
    <Copy copy={lorem.generateSentences(5)} itemName="copy" />
    <Copy copy={lorem.generateSentences(5)} itemName="copyTwo" />
  </ReactGrid>
);

export default GridDemo;
