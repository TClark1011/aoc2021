import run from "aocrunner";
import { map, pipe, reduce, tap } from "ramda";
import { splitStringByNewLine } from "../utils/index.js";
import {
  computeNextPosition,
  computeFinalScore,
  computeNextAdvancedPosition,
  processCommandString,
} from "./utils.js";
import { startingPosition, advancedStartingPosition } from "./constants.js";

const processInput = pipe(splitStringByNewLine, map(processCommandString));

const part1 = pipe(
  processInput,
  reduce(computeNextPosition, startingPosition),
  computeFinalScore,
);

const part2 = pipe(
  processInput,
  reduce(computeNextAdvancedPosition, advancedStartingPosition),
  tap(console.log),
  computeFinalScore,
);

run({
  part1: {
    tests: [
      // { input: ``, expected: "" },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        forward 5
        down 5
        forward 8
        up 3
        down 8
        forward 2
      `,
        expected: 900,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
});
