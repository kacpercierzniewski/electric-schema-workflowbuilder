import type { PaletteItem } from "@workflowbuilder/sdk";

import { defaultPropertiesData } from "./default-properties-data";
import { type WattmeterNodeSchema, schema } from "./schema";
import { uischema } from "./uischema";

export const wattmeter: PaletteItem<WattmeterNodeSchema> = {
  type: "wattmeter",
  icon: "Gauge",
  label: "Wattmeter",
  description: "Measures power in watts.",
  defaultPropertiesData,
  schema,
  uischema,
};
