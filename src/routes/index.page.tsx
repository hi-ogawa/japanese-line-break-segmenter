import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast"; // using default export breaks vite/rakkas
import { Icon } from "../components/icon";
import { Spinner } from "../components/spinner";
import { fetchToJson } from "../utils/fetch-utils";
import { useDebounce } from "../utils/hooks";
import type { SegmentResponse } from "./api/segment.api";

// TODO: format the output as span with inline style

export default function PageComponent() {
  // form
  const form = useForm({ defaultValues: { source: "" } });
  const { source } = form.watch();

  // query
  const debounce = useDebounce(source, 500);
  const query = useSegmentApi(debounce.data, {
    onError: () => {
      toast.error("failed to process input. please try it again later.", {
        id: `${useSegmentApi.name}:error`,
      });
    },
  });

  return (
    <div className="h-full flex flex-col items-center p-6">
      <div className="w-2xl max-w-full flex flex-col gap-3">
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
            rows={3}
            {...form.register("source")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <label>Output</label>
            {(query.isFetching || debounce.isLoading) && (
              <Spinner size="18px" />
            )}
            {query.isError && (
              <Icon
                name="System/error-warning-line"
                className="w-5 h-5 fill-red-500"
              />
            )}
          </div>
          {/* TODO: different output mode: pre, span, inline style */}
          <pre className="p-1 border bg-white min-h-[200px]">
            {query.isSuccess && query.data.text}
          </pre>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <label>Detail</label>
          </div>
          <table className="w-full border bg-white">
            <thead>
              <tr className="px-2 border-b">
                <th className="px-2 py-1 text-left uppercase">text</th>
                <th className="px-2 py-1 text-left uppercase">pos</th>
                <th className="px-2 py-1 text-left uppercase">tags</th>
              </tr>
            </thead>
            {query.isSuccess && (
              <tbody>
                {query.data?.tokens.map((token) => (
                  <tr key={JSON.stringify(token)} className="border-t">
                    <td className="px-2 py-1">{token.text}</td>
                    <td className="px-2 py-1">{token.pos}</td>
                    <td className="px-2 py-1">
                      {token.tags.slice(1).join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}

const EXAMPLES = [
  // https://www.cryptact.com/
  "?????????????????????????????????????????????",
  // https://www.pafin.co/
  "?????????????????????????????????????????????????????????????????????????????????",
  "??????????????????????????????????????????????????????????????????????????????????????????????????????????????????IR????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????",
  "?????????50m????????????????????????????????????????????????????????????????????????????????????",
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
