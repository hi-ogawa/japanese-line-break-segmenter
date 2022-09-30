import { json } from "@hattip/response";
import type { RequestContext } from "rakkasjs";
import { segmentTokens } from "../../utils/segment";
import * as sudachi from "../../utils/sudachi";
import type { Token } from "../../utils/types";

interface SegmentResponse {
  tokens: Token[];
  segments: Token[][];
}

export async function post(ctx: RequestContext) {
  await sudachi.setup();
  const source = await ctx.request.text();
  const tokens = await sudachi.run(source);
  const segments = segmentTokens(tokens);
  const res: SegmentResponse = {
    tokens,
    segments,
  };
  return json(res);
}
