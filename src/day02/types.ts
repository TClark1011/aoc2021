export type Direction = "forward" | "up" | "down";

export interface Position {
  horizontal: number;
  depth: number;
}
export interface Command {
  direction: Direction;
  distance: number;
}
export interface AdvancedPosition extends Position {
  aim: number;
}

export type CommandEvaluator<Returns> = (c: Command) => Returns;
