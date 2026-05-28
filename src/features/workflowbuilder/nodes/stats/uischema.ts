import {
  generalInformation,
  getScope,
  globalControls,
} from "@workflowbuilder/sdk";
import type { UISchema } from "@workflowbuilder/sdk";

import type { StatsNodeSchema } from "./schema";

const scope = getScope<StatsNodeSchema>;

export const uischema: UISchema = {
  type: "VerticalLayout",
  elements: [
    ...globalControls,
    ...(generalInformation ? [generalInformation] : []),
    {
      type: "Text",
      scope: scope("properties.hoursPerDay"),
      label: "Usage (hours per day)",
      placeholder: "5",
    },
    {
      type: "Text",
      scope: scope("properties.costPerKwh"),
      label: "Electricity cost per kWh",
      placeholder: "0.30",
    },
    {
      type: "Text",
      scope: scope("properties.currency"),
      label: "Currency",
      placeholder: "$",
    },
  ],
};
