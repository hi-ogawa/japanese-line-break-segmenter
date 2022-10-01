import { json } from "@hattip/response";
import type { RequestContext } from "rakkasjs";
import { segmentTokens } from "../../utils/segment";
import * as sudachi from "../../utils/sudachi";
import type { Token } from "../../utils/types";

interface SegmentResponse {
  tokens: Token[];
  segments: Token[][];
  text: string;
}

export async function post(ctx: RequestContext) {
  await sudachi.setup();
  const source = await ctx.request.text();
  const tokens = await sudachi.run(source);
  const segments = segmentTokens(tokens);
  const text = segments
    .map((seg) => seg.map((tok) => tok.text).join(""))
    .join("\n");
  const res: SegmentResponse = {
    tokens,
    segments,
    text,
  };
  return json(res);
}
