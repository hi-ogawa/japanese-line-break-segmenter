import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Icon } from "../components/icon";
import { Spinner } from "../components/spinner";
import { fetchToJson } from "../utils/fetch-utils";
import { useDebounce } from "../utils/hooks";
import type { SegmentResponse } from "./api/segment.api";

// TODO: message for unexpected error
// TODO: format the output as span with inline style

export default function PageComponent() {
  // form
  const form = useForm({ defaultValues: { source: "" } });
  const { source } = form.watch();

  // query
  const debounce = useDebounce(source, 500);
  const query = useSegmentApi(debounce.data, {
    onError: () => {},
  });

  return (
    <div className="h-full flex flex-col items-center p-3">
      <div className="w-2xl max-w-full flex flex-col gap-3 p-3 px-6">
        <div className="flex items-center gap-2 mb-3">
          <h1 className="text-xl">Japanese Sentence Line Break Segmentation</h1>
          <a
            className="opacity-[0.7] hover:opacity-100"
            href="https://github.com/hi-ogawa/japanese-line-break-segmenter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="w-6 h-6" name="Logos/github-fill" />
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justigap-3">
            <label>Input</label>
            <span className="flex-1"></span>
            <select
              className="border border-gray-300 px-1"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) {
                  form.setValue("source", e.target.value);
                }
              }}
            >
              <option value="">select example</option>
              {EXAMPLES.map((text, i) => (
                <option key={text} value={text}>
                  example {i + 1}
                </option>
              ))}
            </select>
          </div>
          <textarea
            className="p-1 border"
            rows={5}
            {...form.register("source")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <label>Output</label>
            {(query.isFetching || debounce.isLoading) && (
              <Spinner size="18px" />
            )}
          </div>
          {/* TODO: different output mode: pre, span, inline style */}
          <pre className="p-1 border bg-white min-h-[300px]">
            {query.isSuccess && query.data.text}
          </pre>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <label>Detail</label>
          </div>
          <div className="p-1 border bg-white">
            <table className="w-full">
              <thead>
                <tr>
                  <th>text</th>
                  <th>pos</th>
                  <th>tags</th>
                </tr>
              </thead>
              {query.isSuccess && (
                <tbody>
                  {query.data?.tokens.map((token) => (
                    <tr key={JSON.stringify(token)}>
                      <td>{token.text}</td>
                      <td>{token.pos}</td>
                      <td>{token.tags.slice(1).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const EXAMPLES = [
  // https://www.cryptact.com/
  "仮想通貨の確定申告もこれで安心",
  // https://www.pafin.co/
  "当社サービスに関するニュースや最新情報をお届けします。",
  "アナリストによる企業分析、ヘッジファンド出身者によるマーケットレビュー、企業IRからの情報など、ここでしか見られない高品質な情報を元に、投資アイデアのシミュレーションや交換ができます。",
  "水面下50mまで潜って魚を捕らえることができる「自由自在」な鳥です。",
];

//
// query
//

function useSegmentApi(
  source: string,
  options?: { onError: (e: unknown) => void }
) {
  const args = ["/api/segment", { method: "POST", body: source }] as const;
  return useQuery({
    queryKey: args,
    queryFn: () => fetch(...args).then(fetchToJson) as Promise<SegmentResponse>,
    enabled: source.length >= 2,
    staleTime: 60 * 1000,
    ...options,
  });
}
