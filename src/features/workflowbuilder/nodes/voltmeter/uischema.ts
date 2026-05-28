import { generalInformation, getScope, globalControls } from '@workflowbuilder/sdk';
import type { UISchema } from '@workflowbuilder/sdk';

import type { VoltmeterNodeSchema } from './schema';

const scope = getScope<VoltmeterNodeSchema>;

export const uischema: UISchema = {
  type: 'VerticalLayout',
  elements: [
    ...globalControls,
    ...(generalInformation ? [generalInformation] : []),
    {
      type: 'Text',
      scope: scope('properties.displayValue'),
      label: 'Reading (V)',
      placeholder: '9',
    },
  ],
};
