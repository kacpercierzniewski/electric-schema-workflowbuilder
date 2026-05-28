import {
  generalInformation,
  getScope,
  globalControls,
} from "@workflowbuilder/sdk";
import type { UISchema } from "@workflowbuilder/sdk";

import type { ResistorNodeSchema } from "./schema";

const scope = getScope<ResistorNodeSchema>;

export const uischema: UISchema = {
  type: "VerticalLayout",
  elements: [
    ...globalControls,
    ...(generalInformation ? [generalInformation] : []),
    {
      type: "Text",
      scope: scope("properties.resistance"),
      label: "Resistance (Ω)",
      placeholder: "50",
    },
  ],
};
