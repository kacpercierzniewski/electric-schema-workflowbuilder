import type { PaletteItem } from "@workflowbuilder/sdk";

import { defaultPropertiesData } from "./default-properties-data";
import { type VoltmeterNodeSchema, schema } from "./schema";
import { uischema } from "./uischema";

export const voltmeter: PaletteItem<VoltmeterNodeSchema> = {
  type: "voltmeter",
  icon: "Gauge",
  label: "Voltmeter",
  description: "Measures voltage across two points.",
  defaultPropertiesData,
  schema,
  uischema,
};
