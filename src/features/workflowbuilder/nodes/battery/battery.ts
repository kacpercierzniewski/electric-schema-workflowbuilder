import type { PaletteItem } from '@workflowbuilder/sdk';

import { defaultPropertiesData } from './default-properties-data';
import { type BatteryNodeSchema, schema } from './schema';
import { uischema } from './uischema';

export const battery: PaletteItem<BatteryNodeSchema> = {
  type: 'battery',
  icon: 'BatteryFull',
  label: 'Battery',
  description: 'Power source providing voltage to the circuit.',
  defaultPropertiesData,
  schema,
  uischema,
};
