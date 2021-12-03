import {
  equals,
  ifElse,
  multiply,
  pick,
  pipe,
  prop,
  reduce,
  split,
} from "ramda";
import { give, negateWhenNot, Function, includedIn } from "../utils/index.js";
import {
  AdvancedPosition,
  Command,
  CommandEvaluator,
  Direction,
  Position,
} from "./types.js";

export const processCommandString = pipe(
  split(" "),
  ([direction, distance]) =>
    ({
      direction: direction as Direction,
      distance: parseInt(distance),
    } as Command),
);

const deriveIfCommandWillIncrease: CommandEvaluator<boolean> = ({
  direction,
}) => ["forward", "down"].includes(direction);

const deriveIfDirectionIsVertical: Function<[Direction], boolean> = includedIn([
  "up",
  "down",
]);

const deriveCommandAxis: CommandEvaluator<keyof Position> = pipe(
  prop("direction") as any,
  ifElse(
    deriveIfDirectionIsVertical,
    give<keyof Position>("depth"),
    give<keyof Position>("horizontal"),
  ),
);

export const computeNextPosition = (
  currentPosition: Position,
  command: Command,
): Position => ({
  ...currentPosition,
  [deriveCommandAxis(command)]:
    currentPosition[deriveCommandAxis(command)] +
    negateWhenNot(deriveIfCommandWillIncrease(command), command.distance),
});

const computeAdvancedCommandAimModifier: CommandEvaluator<number> = (command) =>
  deriveIfDirectionIsVertical(command.direction)
    ? negateWhenNot(deriveIfCommandWillIncrease(command), command.distance)
    : 0;

const computeAdvancedCommandDistanceModifier: CommandEvaluator<number> = ifElse(
  pipe(deriveCommandAxis, equals<keyof Position>("horizontal")),
  prop("distance"),
  give(0),
);

export const computeNextAdvancedPosition = (
  currentPosition: AdvancedPosition,
  command: Command,
): AdvancedPosition => {
  const distanceModifier = computeAdvancedCommandDistanceModifier(command);
  return {
    aim: currentPosition.aim + computeAdvancedCommandAimModifier(command),
    horizontal: currentPosition.horizontal + distanceModifier,
    depth: currentPosition.depth + distanceModifier * currentPosition.aim,
  };
};

export const computeFinalScore: Function<
  [Position | AdvancedPosition],
  number
> = pipe(
  pick(["depth", "horizontal"]),
  Object.values,
  reduce<number, number>(multiply, 1),
);
