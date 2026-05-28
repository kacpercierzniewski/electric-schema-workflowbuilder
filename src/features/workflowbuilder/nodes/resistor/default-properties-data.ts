import type { NodeDataProperties } from "@workflowbuilder/sdk";

import type { ResistorNodeSchema } from "./schema";

export const defaultPropertiesData: Required<
  NodeDataProperties<ResistorNodeSchema>
> = {
  label: "Resistor",
  description: "Limits the current by adding resistance to the circuit.",
  status: "active",
  resistance: 50,
};
