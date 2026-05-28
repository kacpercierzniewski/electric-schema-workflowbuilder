import type { PaletteItem } from "@workflowbuilder/sdk";

import { defaultPropertiesData } from "./default-properties-data";
import { type ResistorNodeSchema, schema } from "./schema";
import { uischema } from "./uischema";

export const resistor: PaletteItem<ResistorNodeSchema> = {
  type: "resistor",
  icon: "WaveSawtooth",
  label: "Resistor",
  description: "Adds resistance to the circuit.",
  defaultPropertiesData,
  schema,
  uischema,
};
