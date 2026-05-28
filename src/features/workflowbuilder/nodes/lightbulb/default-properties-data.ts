import type { NodeDataProperties } from '@workflowbuilder/sdk';

import type { LightbulbNodeSchema } from './schema';

export const defaultPropertiesData: Required<NodeDataProperties<LightbulbNodeSchema>> = {
  label: 'Lightbulb',
  description: 'Load that turns electrical energy into light when enough voltage is applied.',
  status: 'active',
  nominalVoltage: 9,
  nominalPower: 1,
  lumensPerWatt: 15,
};
