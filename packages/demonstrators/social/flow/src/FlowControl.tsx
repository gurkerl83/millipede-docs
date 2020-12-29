import { Archer, Stepper } from '@app/components';
import { scrollStates } from '@demonstrators-social/shared';
import {
  Checkbox,
  createStyles,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListSubheader,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { usePrevious } from 'ahooks';
import get from 'lodash/get';
import useTranslation from 'next-translate/useTranslation';
import React, { ChangeEvent, CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { ProgressiveStepBuilder } from './components/navigation/ProgressiveStepBuilder';
import { ScenarioControlNWithN } from './components/navigation/ScenarioControlNWithN';
import { FlowControlObserver } from './components/observer/FlowControlObserver';
import { SliceOptions } from './components/options/SliceOptions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto'
    },
    listSection: {
      backgroundColor: 'inherit'
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0
    },
    root2: {
      flexGrow: 1
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default
    }
  })
);

interface ScenarioNavigatorProps {}

const ScenarioNavigator: FC<ScenarioNavigatorProps> = () => {
  const { t } = useTranslation();

  const {
    timeline: { nodesWithRelationsWithEdgeState }
  } = scrollStates;

  const [
    { nodesWithRelations, activeId },
    setNodesWithRelationsWithEdge
  ] = useRecoilState(nodesWithRelationsWithEdgeState);

  const [steps, currentStep] = useMemo(() => {
    return [
      Object.keys(nodesWithRelations).length,
      Object.keys(nodesWithRelations).findIndex(n => n === activeId)
    ];
  }, [nodesWithRelations, activeId]);

  return (
    <Stepper.Stepper
      steps={steps}
      step={currentStep}
      setStepCb={(currentStep: number) => {
        setNodesWithRelationsWithEdge(state => {
          return {
            ...state,
            activeId: Object.keys(nodesWithRelations)[currentStep]
          };
        });
      }}
      labelBack={t('common:back')}
      labelNext={t('common:next')}
    />
  );
};

interface ScenarioDetailNavigatorProps {}

const ScenarioDetailNavigator: FC<ScenarioDetailNavigatorProps> = () => {
  const { t } = useTranslation();

  const classes = useStyles();

  const {
    timeline: { nodesWithRelationsWithEdgeState }
  } = scrollStates;

  const [selectedKey, setSelectedKey] = useState({
    row: '',
    column: 0
  });

  const { nodesWithRelations, activeId } = useRecoilValue(
    nodesWithRelationsWithEdgeState
  );

  useEffect(() => {
    setSelectedKey(prevState => {
      return { ...prevState, row: activeId };
    });
  }, [activeId]);

  const [currentStep, setCurrentStep] = useState(0);

  const { refs } = Archer.ArcherContext.useRefState();

  const [id, setId] = useState('');

  // does not work in concurrent mode
  const previousId = usePrevious(id);

  const currentNodesWithRelations = useMemo(() => {
    const currentNodesWithRelations = get(nodesWithRelations, activeId);
    return currentNodesWithRelations;
  }, [nodesWithRelations, activeId]);

  const [
    selectedNodeWithRelationsValue,
    nodeWithRelations,
    steps
  ] = useMemo(() => {
    const selectedNodeWithRelationsValue =
      currentNodesWithRelations &&
      currentNodesWithRelations.values &&
      currentNodesWithRelations.values[selectedKey.column];

    const nodeWithRelations =
      (selectedNodeWithRelationsValue &&
        selectedNodeWithRelationsValue.nodeWithRelations) ||
      [];

    const steps = (nodeWithRelations && nodeWithRelations.length) || 0;

    return [selectedNodeWithRelationsValue, nodeWithRelations, steps];
  }, [currentNodesWithRelations, selectedKey.column]);

  useEffect(() => {
    if (refs != null && previousId && id) {
      const previousRef = get(refs, previousId);
      const currentRef = get(refs, id);

      if (
        previousRef &&
        previousRef.dynamicRef &&
        previousRef.dynamicRef.current
      ) {
        previousRef.dynamicRef.current.unSelect();
      }

      if (
        currentRef &&
        currentRef.dynamicRef &&
        currentRef.dynamicRef.current
      ) {
        currentRef.dynamicRef.current.select();
      }
    }
  }, [refs, previousId, id]);

  useEffect(() => {
    if (selectedNodeWithRelationsValue) {
      setCurrentStep(
        selectedNodeWithRelationsValue.ltr
          ? 0
          : selectedNodeWithRelationsValue.nodeWithRelations.length - 1
      );
    }
  }, [selectedNodeWithRelationsValue]);

  useEffect(() => {
    const id =
      (nodeWithRelations &&
        nodeWithRelations[currentStep] &&
        nodeWithRelations[currentStep].node.id) ||
      '';
    setId(id);
  }, [nodeWithRelations, currentStep]);

  const handleListItemClick = (position: number, index: number) => {
    setSelectedKey(prevState => {
      return { ...prevState, column: index };
    });

    // reset
    setCurrentStep(position);
  };

  return currentNodesWithRelations ? (
    <>
      <List
        dense
        className={classes.root}
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            {`I'm sticky ${currentNodesWithRelations.id}`}
          </ListSubheader>
        }
      >
        {currentNodesWithRelations.values.map((value, index) => {
          return (
            <ListItem
              button
              key={index}
              selected={selectedKey.column === index}
              onClick={_event =>
                handleListItemClick(
                  value.ltr ? 0 : value.nodeWithRelations.length - 1,
                  index
                )
              }
            >
              {value.nodeWithRelations.length}
            </ListItem>
          );
        })}
      </List>

      <div className={classes.root2}>
        <Paper square elevation={0} className={classes.header}>
          <Typography>
            {t(`pages/pidp/use-case/recognition/index:${id}`)}
          </Typography>
        </Paper>
        <Stepper.Stepper
          steps={steps}
          step={currentStep}
          setStepCb={(newStep: number) => {
            setCurrentStep(newStep);
          }}
          labelNext={t('common:next')}
          labelBack={t('common:back')}
        />
      </div>
    </>
  ) : null;
};

interface ScenarioControlProps {
  leftTimelineId?: string;
  rightTimelineId?: string;
}

const ScenarioControl: FC<ScenarioControlProps> = (
  // eslint-disable-next-line no-empty-pattern
  { leftTimelineId, rightTimelineId }
) => {
  const [state, setState] = useState({
    ltr: false
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div style={{ display: 'flex' }}>
      <SliceOptions />
      <ScenarioControlNWithN
        ltr={state.ltr}
        leftTimelineId={leftTimelineId}
        rightTimelineId={rightTimelineId}
      />

      <ProgressiveStepBuilder
        // ltr={state.ltr}
        ltr
        leftTimelineId={leftTimelineId}
        rightTimelineId={rightTimelineId}
      />

      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.ltr}
              onChange={handleChange}
              name='ltr'
              color='primary'
            />
          }
          label='LTR'
        />
      </FormGroup>
    </div>
  );
};

interface FlowControl {
  leftTimelineId: string;
  rightTimelineId: string;
  handleControlOffset?: (value: number) => void;
  style?: CSSProperties;
}

export const FlowControl: FC<FlowControl> = ({
  handleControlOffset,
  leftTimelineId,
  rightTimelineId,
  style
}) => {
  return handleControlOffset ? (
    <FlowControlObserver
      handleControlOffset={handleControlOffset}
      style={style}
    >
      <ScenarioControl
        leftTimelineId={leftTimelineId}
        rightTimelineId={rightTimelineId}
      />
      <ScenarioNavigator />
      <ScenarioDetailNavigator />
    </FlowControlObserver>
  ) : (
    <>
      <ScenarioControl
        leftTimelineId={leftTimelineId}
        rightTimelineId={rightTimelineId}
      />
      <ScenarioNavigator />
      <ScenarioDetailNavigator />
    </>
  );
};
