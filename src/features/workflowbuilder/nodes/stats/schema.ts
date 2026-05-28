import { sharedProperties, statusOptions } from "@workflowbuilder/sdk";
import type { NodeSchema } from "@workflowbuilder/sdk";

export const schema = {
  properties: {
    ...sharedProperties,
    status: {
      type: "string",
      options: Object.values(statusOptions),
    },
    hoursPerDay: {
      type: "number",
      minimum: 0,
      maximum: 24,
    },
    costPerKwh: {
      type: "number",
      minimum: 0,
    },
    currency: {
      type: "string",
    },
  },
} satisfies NodeSchema;

export type StatsNodeSchema = typeof schema;
