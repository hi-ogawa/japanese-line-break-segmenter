import type { Token } from "./types";

// TODO: https://github.com/hi-ogawa/mecab-segmenter/blob/master/src/segmenter.py
export function segmentTokens(tokens: Token[]): Token[][] {
  tokens;
  return [];
}

// ideas are based on https://github.com/google/budou/blob/d45791a244e00d84f87da2a4678da2b63a9c232f/budou/mecabsegmenter.py#L95-L108

// const DEPENDENT_POS_FORWARD = ["接頭辞", "連体詞"];
// const DEPENDENT_POS_BACKWARD = ["助詞", "助動詞", "接尾辞"];
// const DEPENDENT_POS_PAIRS = [["名詞", "名詞"]];

// // https://en.wikipedia.org/wiki/Unicode_character_property
// const PUNCTUATION_OPEN = ["Ps", "Pi"];
// const PUNCTUATION_CLOSE = ["Pc", "Pd", "Pd", "Pe", "Pf", "Po"];

// function isDependentForward(token: Token): boolean {
//   return false;
// }

// function isDependentBackward(token: Token): boolean {
//   return false;
// }

// function isDependentPair(prev: Token, curr: Token): boolean {
//   return false;
// }
