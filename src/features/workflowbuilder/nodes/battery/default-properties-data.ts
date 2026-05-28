import type { NodeDataProperties } from "@workflowbuilder/sdk";

import type { BatteryNodeSchema } from "./schema";

export const defaultPropertiesData: Required<
  NodeDataProperties<BatteryNodeSchema>
> = {
  label: "Battery",
  description:
    "Power source — provides voltage that pushes current through the circuit.",
  status: "active",
  voltage: 9,
};
