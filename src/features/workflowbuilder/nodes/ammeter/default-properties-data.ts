import type { NodeDataProperties } from "@workflowbuilder/sdk";

import type { AmmeterNodeSchema } from "./schema";

export const defaultPropertiesData: Required<
  NodeDataProperties<AmmeterNodeSchema>
> = {
  label: "Ammeter",
  description:
    "Measures the electric current (flow of charge) passing through a wire.",
  status: "active",
  displayValue: 0.09,
};
