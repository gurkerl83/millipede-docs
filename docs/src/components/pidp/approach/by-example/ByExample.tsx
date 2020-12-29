import { Stepper } from '@app/components';
import { ContentTypes } from '@app/types';
import { isArray } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

import Step1 from '../../../../../../src/assets/pidp/approach/byExample/Step1';
import Step2 from '../../../../../../src/assets/pidp/approach/byExample/Step2';

const templates: Array<ContentTypes.Content> = [
  {
    step: 0,
    size: 6,
    image: <Step1 style={{ width: '100%' }} />
  },
  {
    step: 0,
    size: 6,
    image: <Step1 style={{ width: '100%' }} />
  },
  {
    step: 1,
    size: 12,
    image: <Step2 style={{ width: '100%' }} />
  }
];

export const ByExample: FC = () => {
  const { t } = useTranslation();

  const steps = t<Array<ContentTypes.Content>>(
    'pages/pidp/approach/by-example/index:steps',
    {},
    { returnObjects: true }
  );

  const stepsProcessed =
    isArray(steps) && steps.length > 0
      ? steps.map((step, index) => {
          return {
            ...step,
            ...templates[index]
          };
        })
      : null;

  return stepsProcessed != null && stepsProcessed.length > 0 ? (
    <Stepper.StepperContent
      elements={stepsProcessed}
      labelBack={t('common:back')}
      labelNext={t('common:next')}
    />
  ) : null;
};
