import type { PaletteItem } from '@workflowbuilder/sdk';

import { defaultPropertiesData } from './default-properties-data';
import { type StatsNodeSchema, schema } from './schema';
import { uischema } from './uischema';

export const stats: PaletteItem<StatsNodeSchema> = {
  type: 'stats',
  icon: 'ChartLine',
  label: 'Energy Stats',
  description: 'Energy use and cost calculator for the circuit.',
  defaultPropertiesData,
  schema,
  uischema,
};
