import { json } from "@hattip/response";
import type { RequestContext } from "rakkasjs";
import { segmentTokens } from "../../utils/segment";
import * as sudachi from "../../utils/sudachi";
import type { Token } from "../../utils/types";

export interface SegmentResponse {
  tokens: Token[];
  segments: Token[][];
  text: string;
  sudachiOutput: string;
}

export async function post(ctx: RequestContext) {
  await sudachi.setup();
  let source = await ctx.request.text();
  source = source.replaceAll(/\s/g, " "); // normalize white space since new lines would break sudachi)
  const { tokens, sudachiOutput } = await sudachi.run(source);
  const segments = segmentTokens(tokens);
  const text = segments
    .map((seg) => seg.map((tok) => tok.text).join(""))
    .join("\n");
  const res: SegmentResponse = {
    tokens,
    segments,
    text,
    sudachiOutput,
  };
  return json(res);
}
