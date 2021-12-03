import { AdvancedPosition, Position } from "./types.js";

export const startingPosition: Position = {
  depth: 0,
  horizontal: 0,
};

export const advancedStartingPosition: AdvancedPosition = {
  ...startingPosition,
  aim: 0,
};
