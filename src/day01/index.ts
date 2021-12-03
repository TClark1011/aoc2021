import run from "aocrunner";
import { map, pipe } from "ramda";
import { splitStringByNewLine } from "../utils/index.js";
import { evaluateDepthChanges, sumSlidingTripletWindow } from "./utils.js";

export type ResultTracker = {
  result: number;
  previousNumber: number;
};

const processInput = pipe(splitStringByNewLine, map(parseInt));

const part1 = pipe(processInput, evaluateDepthChanges);
const part2 = pipe(processInput, sumSlidingTripletWindow, evaluateDepthChanges);

const exampleInput = `
  199
  200
  208
  210
  200
  207
  240
  269
  260
  263
`;
run({
  part1: {
    tests: [
      {
        input: exampleInput,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [{ input: exampleInput, expected: 5 }],
    solution: part2,
  },
  trimTestInputs: true,
});
