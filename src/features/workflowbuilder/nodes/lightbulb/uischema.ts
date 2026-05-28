import {
  generalInformation,
  getScope,
  globalControls,
} from "@workflowbuilder/sdk";
import type { UISchema } from "@workflowbuilder/sdk";

import type { LightbulbNodeSchema } from "./schema";

const scope = getScope<LightbulbNodeSchema>;

export const uischema: UISchema = {
  type: "VerticalLayout",
  elements: [
    ...globalControls,
    ...(generalInformation ? [generalInformation] : []),
    {
      label: "Label",
      type: "Text",
      scope: scope("properties.label"),
    },
    {
      type: "Text",
      scope: scope("properties.nominalVoltage"),
      label: "Nominal Voltage (V)",
      placeholder: "9",
    },
    {
      type: "Text",
      scope: scope("properties.nominalPower"),
      label: "Nominal Power (W)",
      placeholder: "1",
    },
    {
      type: "Text",
      scope: scope("properties.lumensPerWatt"),
      label: "Efficiency (lm/W) — 15 incandescent, 100 LED",
      placeholder: "15",
    },
  ],
};
