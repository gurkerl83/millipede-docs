import { ContentTypes } from '@app/types';
import { CardContent, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import React, { FC, useState } from 'react';

import { Stepper, TranslationProps } from './Stepper';
import { getStepsLength, selectContent } from './StepperContent.svc';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      justifyContent: 'center',
      padding: theme.spacing(2)
    }
  })
);

export const renderTitleAndDescription = (
  items: Array<ContentTypes.Content> = []
) => {
  const classes = useStyles();

  return items.map((item, index) => {
    return (
      <Grid
        item
        xs={item.size}
        className={classes.row}
        key={`title-description-${index}`}
      >
        <Typography variant='h6' gutterBottom>
          {item.title}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {item.description}
        </Typography>
      </Grid>
    );
  });
};

export type StepperContentWithTranslationProps = TranslationProps &
  ContentTypes.Stack;

export const StepperContent: FC<StepperContentWithTranslationProps> = ({
  elements = [],
  labelBack,
  labelNext
}) => {
  const [step, setStep] = useState(0);

  const max = getStepsLength(elements);

  const stepContent = selectContent(elements, step);

  const [{ image }] = stepContent;

  return (
    <Grid container>
      {image ? (
        <Grid item xs={12}>
          <CardContent>{image}</CardContent>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Stepper
          steps={max + 1}
          setStepCb={(currentStep: number) => {
            setStep(currentStep);
          }}
          labelBack={labelBack}
          labelNext={labelNext}
        />
      </Grid>
      {renderTitleAndDescription(stepContent)}
    </Grid>
  );
};
