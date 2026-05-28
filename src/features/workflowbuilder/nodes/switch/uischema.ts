import {
  generalInformation,
  getScope,
  globalControls,
} from "@workflowbuilder/sdk";
import type { UISchema } from "@workflowbuilder/sdk";

import type { SwitchNodeSchema } from "./schema";

const scope = getScope<SwitchNodeSchema>;

export const uischema: UISchema = {
  type: "VerticalLayout",
  elements: [
    ...globalControls,
    ...(generalInformation ? [generalInformation] : []),
    {
      type: "HorizontalLayout",
      elements: [
        { type: "Label", text: "Switch state" },
        {
          type: "Switch",
          scope: scope("properties.isOn"),
        },
      ],
    },
  ],
};
