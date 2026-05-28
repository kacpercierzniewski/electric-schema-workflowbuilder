import type { NodeDataProperties } from "@workflowbuilder/sdk";

import type { SwitchNodeSchema } from "./schema";

export const defaultPropertiesData: Required<
  NodeDataProperties<SwitchNodeSchema>
> = {
  label: "Switch",
  description: "Opens or closes the circuit. When OFF, no current flows.",
  status: "active",
  isOn: false,
};
