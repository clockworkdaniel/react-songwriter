import { LoremIpsum } from "lorem-ipsum";
import * as React from "react";
import ReactGrid from "./ReactGrid";

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

const styles = {
  gridTemplateAreas: `'. blah .'
    'copy copyTwo copyTwo'
    'copy copyTwo copyTwo'`,
  gridGap: "1rem",
  gridTemplateColumns: "repeat(3, 1fr)",
  ["@media (max-width: 600px)"]: {
    gridTemplateAreas: `'blah .'
        'copy copyTwo'
        'copy copyTwo'`,
    gridTemplateColumns: "3fr 2fr"
  }
};

type GridItemName = { itemName: string };

const Header = ({ title }: { title: string } & GridItemName) => (
  <h1>{`${title}`}</h1>
);
const Copy = ({ copy }: { copy: string } & GridItemName) => <p>{`${copy}`}</p>;

const GridDemo = () => (
  <ReactGrid gridStyles={styles}>
    <Header title="Doggos" itemName="blah" />
    <Copy copy={lorem.generateSentences(5)} itemName="copy" />
    <Copy copy={lorem.generateSentences(5)} itemName="copyTwo" />
  </ReactGrid>
);

export default GridDemo;
