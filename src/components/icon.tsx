import { mapKeys } from "lodash";
import { tinyassert } from "../utils/tinyassert";

export function Icon(
  props: { name: IconName } & React.SVGProps<SVGSVGElement>
) {
  const { name, ...rest } = props;
  return <svg dangerouslySetInnerHTML={{ __html: glob2[name] }} {...rest} />;
}

//
// go around with multiple hacks to get the nice typing (note that `import.meta.blob` only accepts literal syntacally)
//

type HackGlob = <T extends readonly string[]>(
  paths: T,
  ...args: any[]
) => Record<T[number], string>;

type HackIconName<K extends string> = K extends `remixicon/icons/${infer I}.svg`
  ? I
  : never;

type IconName = HackIconName<keyof typeof glob>;

const glob = (import.meta.glob as HackGlob)(
  // https://remixicon.com/
  [
    "remixicon/icons/Logos/github-fill.svg",
    "remixicon/icons/System/error-warning-line.svg",
  ] as const,
  {
    as: "raw",
    eager: true,
  }
);

const glob2 = mapKeys(glob, (_, key) => {
  // strip off internal path e.g. node_modules/.pnpm/remixicon@2.5.0/node_modules/remixicon/icons/...
  const iconKey = key.match(/^.*\/remixicon\/icons\/(.*)\.svg$/)?.[1];
  tinyassert(iconKey);
  return iconKey;
}) as Record<IconName, string>;
