import {
  generalInformation,
  getScope,
  globalControls,
} from "@workflowbuilder/sdk";
import type { UISchema } from "@workflowbuilder/sdk";

import type { BatteryNodeSchema } from "./schema";

const scope = getScope<BatteryNodeSchema>;

export const uischema: UISchema = {
  type: "VerticalLayout",
  elements: [
    ...globalControls,
    ...(generalInformation ? [generalInformation] : []),
    {
      type: "Text",
      scope: scope("properties.voltage"),
      label: "Voltage (V)",
      placeholder: "9",
    },
  ],
};
