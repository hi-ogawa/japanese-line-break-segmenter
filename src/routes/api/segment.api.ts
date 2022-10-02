import { json } from "@hattip/response";
import type { MorphemeJs } from "@hiogawa/sudachi.js";
import type { RequestContext } from "rakkasjs";
import { segmentTokens } from "../../utils/segment";
import * as sudachi from "../../utils/sudachi";
import type { Token } from "../../utils/types";

export interface SegmentResponse {
  tokens: Token[];
  segments: Token[][];
  text: string;
  morphemes: MorphemeJs[];
}

export async function post(ctx: RequestContext) {
  let source = await ctx.request.text();
  source = source.replaceAll(/\s/g, " "); // normalize white space since new lines would break sudachi
  const morphemes = await sudachi.run(source);
  const tokens = morphemes.map(sudachi.morphmeToToken);
  const segments = segmentTokens(tokens);
  const text = segments
    .map((seg) => seg.map((tok) => tok.text).join(""))
    .join("\n");
  const res: SegmentResponse = {
    morphemes,
    tokens,
    segments,
    text,
  };
  return json(res);
}
