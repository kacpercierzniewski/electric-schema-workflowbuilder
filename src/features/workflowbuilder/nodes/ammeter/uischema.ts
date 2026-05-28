import {
  generalInformation,
  getScope,
  globalControls,
} from "@workflowbuilder/sdk";
import type { UISchema } from "@workflowbuilder/sdk";

import type { AmmeterNodeSchema } from "./schema";

const scope = getScope<AmmeterNodeSchema>;

export const uischema: UISchema = {
  type: "VerticalLayout",
  elements: [
    ...globalControls,
    ...(generalInformation ? [generalInformation] : []),
    {
      type: "Text",
      scope: scope("properties.displayValue"),
      label: "Reading (A)",
      placeholder: "0.09",
    },
  ],
};
