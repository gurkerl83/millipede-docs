import { Box, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { ArcherContainer, ArcherElement } from '../../../modules/components/archer';

const useStyles = makeStyles(() =>
  createStyles({
    singleElement: {
      display: 'flex',
      justifyContent: 'center'
    },
    row: {
      margin: '100px 0',
      display: 'flex',
      justifyContent: 'space-between'
    },
    box: {
      padding: '10px',
      border: '3px solid black',
      // maxWidth: '150px',
      width: '200px',
      height: '200px',
      borderRadius: '100px',
      display: 'flex'
    },
    title: {
      whiteSpace: 'pre-wrap',
      textAlign: 'center',
      fontWeight: 'bold',
      margin: 'auto'
    }
  })
);

const Diagram = () => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <ArcherContainer noCurves strokeColor='gray'>
      <div className={classes.row}>
        <ArcherElement id='misinformation'>
          <Box bgcolor='error.main' className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('pages/ai/general/index:misinformation')}`}
            </Typography>
          </Box>
        </ArcherElement>
        <ArcherElement
          id='disinformation'
          relations={[
            {
              targetId: 'misinformation',
              targetAnchor: 'right',
              sourceAnchor: 'left'
            },
            {
              targetId: 'malinformation',
              targetAnchor: 'left',
              sourceAnchor: 'right'
            }
          ]}
        >
          <Box bgcolor='success.main' className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('pages/ai/general/index:disinformation')}`}
            </Typography>
          </Box>
        </ArcherElement>

        <ArcherElement id='malinformation'>
          <Box bgcolor='warning.main' className={classes.box}>
            <Typography variant='subtitle1' className={classes.title}>
              {`${t('pages/ai/general/index:malinformation')}`}
            </Typography>
          </Box>
        </ArcherElement>
      </div>
    </ArcherContainer>
  );
};

export default Diagram;
