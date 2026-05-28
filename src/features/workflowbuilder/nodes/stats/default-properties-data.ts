import type { NodeDataProperties } from '@workflowbuilder/sdk';

import type { StatsNodeSchema } from './schema';

export const defaultPropertiesData: Required<NodeDataProperties<StatsNodeSchema>> = {
  label: 'Energy Stats',
  description: 'Daily, monthly and yearly energy consumption and cost for the current circuit.',
  status: 'active',
  hoursPerDay: 5,
  costPerKwh: 0.3,
  currency: '$',
};
