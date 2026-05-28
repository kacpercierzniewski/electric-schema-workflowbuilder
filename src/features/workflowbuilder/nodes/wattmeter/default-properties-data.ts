import type { NodeDataProperties } from '@workflowbuilder/sdk';

import type { WattmeterNodeSchema } from './schema';

export const defaultPropertiesData: Required<NodeDataProperties<WattmeterNodeSchema>> = {
  label: 'Wattmeter',
  description: 'Measures the power (in watts) dissipated by the upstream component.',
  status: 'active',
};
