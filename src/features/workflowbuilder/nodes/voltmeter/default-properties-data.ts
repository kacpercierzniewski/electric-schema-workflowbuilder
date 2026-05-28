import type { NodeDataProperties } from "@workflowbuilder/sdk";

import type { VoltmeterNodeSchema } from "./schema";

export const defaultPropertiesData: Required<
  NodeDataProperties<VoltmeterNodeSchema>
> = {
  label: "Voltmeter",
  description:
    "Measures the voltage (electrical pressure) between two points in the circuit.",
  status: "active",
  displayValue: 9,
};
