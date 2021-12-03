import { split, curry } from "ramda";

export const splitStringByNewLine = split("\n");

export const getMapIndex = (a: any, index: number) => index;
export const indexes = <T>(array: T[]) => array.map(getMapIndex);

export const truthy = (item: any) => !!item;

export const give =
  <T>(value: T) =>
  () =>
    value;

export type Function<Params extends any[], Returns> = (...p: Params) => Returns;

export const negateWhenNot = curry(
  (predicate: boolean, number: number) => number * (predicate ? 1 : -1),
);

const _includedIn_ = <T>(arr: T[], item: T) => arr.includes(item);
export const includedIn = curry(_includedIn_);
