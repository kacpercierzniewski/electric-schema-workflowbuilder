import type { PaletteItem } from "@workflowbuilder/sdk";

import { defaultPropertiesData } from "./default-properties-data";
import { type LightbulbNodeSchema, schema } from "./schema";
import { uischema } from "./uischema";

export const lightbulb: PaletteItem<LightbulbNodeSchema> = {
  type: "lightbulb",
  icon: "Lightbulb",
  label: "Lightbulb",
  description: "A load that lights up when enough voltage is supplied.",
  defaultPropertiesData,
  schema,
  uischema,
};
