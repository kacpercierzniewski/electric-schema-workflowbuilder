import { sharedProperties, statusOptions } from "@workflowbuilder/sdk";
import type { NodeSchema } from "@workflowbuilder/sdk";

export const schema = {
  properties: {
    ...sharedProperties,
    status: {
      type: "string",
      options: Object.values(statusOptions),
    },
    voltage: {
      type: "number",
      minimum: 0,
    },
  },
} satisfies NodeSchema;

export type BatteryNodeSchema = typeof schema;
