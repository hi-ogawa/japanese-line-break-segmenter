import { mapKeys } from "lodash";
import { tinyassert } from "./tinyassert";

const raw = import.meta.glob(["remixicon/icons/Logos/github-line.svg"], {
  as: "raw",
  eager: true,
});

// strip off "/node_modules/.pnpm/remixicon@2.5.0/node_modules/remixicon/icons/..."
const raw2 = mapKeys(
  raw,
  (_, key) => key.match(/^.*\/remixicon\/icons\/(.*)\.svg$/)?.[1]
);

// e.g. icons("Logos/github-line")
export function icon(key: string) {
  const icon = raw2[key];
  tinyassert(icon);
  return icon;
}
