import { isEqual, zip } from "lodash";
import { tinyassert } from "./tinyassert";
import type { Token } from "./types";

export function segmentTokens(tokens: Token[]): Token[][] {
  if (tokens.length === 0) {
    return [];
  }
  const result: Token[][] = [tokens.slice(0, 1)];
  for (const [prev, curr] of zip(tokens.slice(0, -1), tokens.slice(1))) {
    tinyassert(prev);
    tinyassert(curr);
    if (checkDependency(prev, curr)) {
      result.at(-1)?.push(curr);
    } else {
      result.push([curr]);
    }
  }
  return result;
}

// based on https://github.com/google/budou/blob/d45791a244e00d84f87da2a4678da2b63a9c232f/budou/mecabsegmenter.py#L95-L108

const POS_FORWARD = ["接頭辞", "連体詞"];
const POS_BACKWARD = ["助詞", "助動詞", "接尾辞"];
const POS_PAIRS = [["名詞", "名詞"]];
const TAG_FORWARD = ["括弧開"];
const TAG_BACKWARD = ["括弧閉"];

function checkDependency(t1: Token, t2: Token): boolean {
  return checkForward(t1) || checkBackward(t2) || checkPair(t1, t2);
}

function checkForward(t: Token): boolean {
  return (
    POS_FORWARD.includes(t.pos) ||
    t.tags.some((tag) => TAG_FORWARD.includes(tag))
  );
}

function checkBackward(t: Token): boolean {
  return (
    POS_BACKWARD.includes(t.pos) ||
    t.tags.some((tag) => TAG_BACKWARD.includes(tag))
  );
}

function checkPair(t1: Token, t2: Token): boolean {
  return POS_PAIRS.some((pair) => isEqual(pair, [t1.pos, t2.pos]));
}
