import type { PaletteItem } from "@workflowbuilder/sdk";

import { defaultPropertiesData } from "./default-properties-data";
import { type AmmeterNodeSchema, schema } from "./schema";
import { uischema } from "./uischema";

export const ammeter: PaletteItem<AmmeterNodeSchema> = {
  type: "ammeter",
  icon: "Gauge",
  label: "Ammeter",
  description: "Measures current flowing through a wire.",
  defaultPropertiesData,
  schema,
  uischema,
};
