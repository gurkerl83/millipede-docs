import MuiAppBar from '@material-ui/core/AppBar';
import { CSSObject, styled, Theme } from '@material-ui/core/styles';
import React, { FC } from 'react';

import { AppBarProps } from '.';
import { MAX_DRAWER_WIDTH } from '../../recoil/features/layout/reducer';

const openAnimation = (theme: Theme): CSSObject => ({
  width: `calc(100% - ${MAX_DRAWER_WIDTH}px)`,
  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  })
});

const closeAnimation = (theme: Theme): CSSObject => ({
  width: '100%',
  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  })
});

const AppBar = styled(MuiAppBar)<AppBarProps>(
  ({ theme, isDrawerExpanded }) => ({
    zIndex: theme.zIndex.drawer + 1,
    ...(isDrawerExpanded && openAnimation(theme)),
    ...(!isDrawerExpanded && closeAnimation(theme))
  })
);

export const AppToolBar: FC<AppBarProps> = ({ isDrawerExpanded, children }) => {
  return (
    <AppBar position={'fixed'} isDrawerExpanded={isDrawerExpanded}>
      {children}
    </AppBar>
  );
};
