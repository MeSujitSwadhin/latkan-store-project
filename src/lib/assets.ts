import manifest from "@/data/assets.json";
import localFiles from "@/data/local-images.json";
import type { Asset } from "@/types";

const assets = manifest.assets as unknown as Asset[];
const byId = new Map(assets.map((a) => [a.id, a]));

export function asset(id: string): Asset {
  const a = byId.get(id);
  if (a) return a;
  return {
    id,
    path: "",
    photographer: "",
    description: "Image pending",
    alt: "Image pending",
    usage: "",
    status: "placeholder",
    licence: "",
    orientation: "portrait",
  };
}

export const allAssets = () => assets;

const local = new Set<string>(localFiles as string[]);
/** True when `npm run images` (or you) placed this asset's file in /public. Brand-approved files without a remote are always local. */
export const hasLocalFile = (id: string) => local.has(id) || !byId.get(id)?.remote;
