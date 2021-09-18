import { APP_CONTENT_HEADER_HEIGHT } from '@app/layout/src/recoil/features/layout/reducer';
import { scrollStates, ScrollTypes } from '@demonstrators-social/shared';
import { Close, Share } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React, { FC, useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';

import { Icon } from './Icon';

export interface DockMenuItem {
  id: string;
  title: string;
}

const getSliceOptions = (_t: Translate) => {
  return [
    {
      id: 'header',
      title: 'Header'
    },
    {
      id: 'media',
      title: 'media'
    },
    {
      id: 'content',
      title: 'content'
    },
    {
      id: 'sentiment',
      title: 'sentiment'
    },
    {
      id: 'comments',
      title: 'comments'
    }
  ];
};

const createIcons =
  (
    hideSpeedDial: () => void,
    interactionOption: ScrollTypes.Interaction.InteractionOption,
    setInteractionOption: SetterOrUpdater<ScrollTypes.Interaction.InteractionOption>
  ) =>
  ({ id, title }: DockMenuItem) => {
    return {
      title,
      icon: <Icon id={id} />,
      action: () => {
        const { activeIds } = interactionOption;
        const selectedInteractionOption = activeIds[id];
        setInteractionOption({
          ...interactionOption,
          activeIds: {
            ...interactionOption.activeIds,
            [id]: !selectedInteractionOption
          }
        });
        hideSpeedDial();
      }
    };
  };

const createButton = ({ title, icon, action }) => (
  <SpeedDialAction
    key={title}
    icon={icon}
    tooltipTitle={title}
    onClick={action}
    tooltipPlacement={'left'}
  />
);

const createButtons = (
  hideSpeedDial: () => void,
  t: Translate,
  interactionOption: ScrollTypes.Interaction.InteractionOption,
  setInteractionOption: SetterOrUpdater<ScrollTypes.Interaction.InteractionOption>
) => {
  const buttonsInfo = getSliceOptions(t).map(
    createIcons(hideSpeedDial, interactionOption, setInteractionOption)
  );

  return buttonsInfo.map(createButton);
};

export const SliceOptions: FC = () => {
  const { t } = useTranslation();

  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  const {
    interaction: { interactionOptionsState }
  } = scrollStates;

  const [interactionOption, setInteractionOption] = useRecoilState(
    interactionOptionsState
  );

  const handleSpeedDialOpen = () => {
    setSpeedDialOpen(true);
  };

  const handleSpeedDialClose = () => {
    setSpeedDialOpen(false);
  };

  const handleSpeedDialCloseWithFeedback = () => {
    setSpeedDialOpen(false);
  };

  const theme = useTheme();

  return (
    <div
      style={{
        width: theme.spacing(APP_CONTENT_HEADER_HEIGHT),
        height: theme.spacing(APP_CONTENT_HEADER_HEIGHT),
        margin: theme.spacing(2.75, 2, 2.75),
        zIndex: 1050
      }}
    >
      <SpeedDial
        ariaLabel={'select-interaction'}
        icon={<SpeedDialIcon icon={<Share />} openIcon={<Close />} />}
        onClose={handleSpeedDialClose}
        onOpen={handleSpeedDialOpen}
        open={speedDialOpen}
        direction='down'
      >
        {createButtons(
          handleSpeedDialCloseWithFeedback,
          t,
          interactionOption,
          setInteractionOption
        )}
      </SpeedDial>
    </div>
  );
};
