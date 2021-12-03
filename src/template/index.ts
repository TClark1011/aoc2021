import run from "aocrunner";
import { pipe } from "ramda";
import { splitStringByNewLine } from "../utils/index.js";
import {} from "./constants.js";
import {} from "./utils.js";
import {} from "./types.js";

const processInput = pipe(splitStringByNewLine);

const part1 = pipe(processInput, console.log);

const part2 = pipe(processInput, console.log);

const exampleInput = ``;
run({
  part1: {
    tests: [{ input: exampleInput, expected: 0 }],
    solution: part1,
  },
  part2: {
    tests: [{ input: exampleInput, expected: 0 }],
    solution: part2,
  },
  trimTestInputs: true,
});
