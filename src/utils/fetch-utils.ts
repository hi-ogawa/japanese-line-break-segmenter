import { tinyassert } from "./tinyassert";

export async function fetchToJson(res: Response): Promise<any> {
  tinyassert(res.ok);
  tinyassert(res.headers.get("content-type")?.startsWith("application/json"));
  return res.json();
}
