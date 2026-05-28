import { sharedProperties, statusOptions } from "@workflowbuilder/sdk";
import type { NodeSchema } from "@workflowbuilder/sdk";

export const schema = {
  properties: {
    ...sharedProperties,
    status: {
      type: "string",
      options: Object.values(statusOptions),
    },
    isOn: {
      type: "boolean",
    },
  },
} satisfies NodeSchema;

export type SwitchNodeSchema = typeof schema;
