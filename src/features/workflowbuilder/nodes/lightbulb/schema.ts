import { sharedProperties, statusOptions } from "@workflowbuilder/sdk";
import type { NodeSchema } from "@workflowbuilder/sdk";

export const schema = {
  properties: {
    ...sharedProperties,
    status: {
      type: "string",
      options: Object.values(statusOptions),
    },
    nominalVoltage: {
      type: "number",
      minimum: 0,
    },
    nominalPower: {
      type: "number",
      minimum: 0,
    },
    lumensPerWatt: {
      type: "number",
      minimum: 0,
    },
  },
} satisfies NodeSchema;

export type LightbulbNodeSchema = typeof schema;
