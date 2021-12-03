import { pipe, prop, reduce, sum } from "ramda";
import { getMapIndex, truthy } from "../utils/index.js";
import { ResultTracker } from "./index";

const compareResults = (
  { result, previousNumber }: ResultTracker,
  currentNumber: number,
): ResultTracker => ({
  previousNumber: currentNumber,
  result: result + (currentNumber > previousNumber ? 1 : 0),
});

export const evaluateDepthChanges = pipe(
  reduce<number, ResultTracker>(compareResults, {
    previousNumber: 0,
    result: -1,
  }),
  prop("result"),
);

const addUpThreeElements = (numbers: number[]) => (startingIndex: number) => {
  const windowElements = [
    numbers?.[startingIndex],
    numbers?.[startingIndex + 1],
    numbers?.[startingIndex + 2],
  ];
  return windowElements.reduce(truthy, true) ? sum(windowElements) : -1;
};

export const sumSlidingTripletWindow = (numbers: number[]) =>
  numbers.map(pipe(getMapIndex, addUpThreeElements(numbers)));
