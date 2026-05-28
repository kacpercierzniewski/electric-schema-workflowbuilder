import type { PaletteItem } from '@workflowbuilder/sdk';

import { defaultPropertiesData } from './default-properties-data';
import { type SwitchNodeSchema, schema } from './schema';
import { uischema } from './uischema';

export const switchNode: PaletteItem<SwitchNodeSchema> = {
  type: 'switch',
  icon: 'Power',
  label: 'Switch',
  description: 'Turns the circuit on or off.',
  defaultPropertiesData,
  schema,
  uischema,
};
