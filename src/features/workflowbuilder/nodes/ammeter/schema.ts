import { sharedProperties, statusOptions } from '@workflowbuilder/sdk';
import type { NodeSchema } from '@workflowbuilder/sdk';

export const schema = {
  properties: {
    ...sharedProperties,
    status: {
      type: 'string',
      options: Object.values(statusOptions),
    },
    displayValue: {
      type: 'number',
    },
  },
} satisfies NodeSchema;

export type AmmeterNodeSchema = typeof schema;
