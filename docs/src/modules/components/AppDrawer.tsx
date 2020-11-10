import { useHoux } from '@houx';
import {
  createStyles,
  Divider,
  Drawer,
  IconButton,
  Link,
  makeStyles,
  SwipeableDrawer,
  Theme,
  useTheme,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import { RootState } from '../redux/reducers';
import { Tree } from './tree/Tree';

const drawerWidth = 280;

const useDrawerStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1
      }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      // at original
      // padding: theme.spacing(0, 1),
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    toolbarTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '0 8px',
      ...theme.mixins.toolbar
    },
    paper: {
      width: drawerWidth
    }
  })
);

// disalbe iOS detection for now
// const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

interface AppDrawerProps {
  isDrawerExpanded: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  mobileOpen: boolean;
}

const AppDrawer = (props: AppDrawerProps) => {
  const {
    mobileOpen,
    isDrawerExpanded,
    handleDrawerOpen,
    handleDrawerClose
  } = props;

  const classes = useDrawerStyles();

  const theme: Theme = useTheme();

  const {
    state: {
      navigation: { pages, activePage },
      view: { isMobile }
    }
  }: { state: RootState } = useHoux();

  const { t } = useTranslation();

  const renderMobileDrawer = () => {
    return (
      <SwipeableDrawer
        variant='temporary'
        classes={{
          paper: classes.paper
        }}
        // disableBackdropTransition={!iOS}
        open={mobileOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        ModalProps={{
          keepMounted: true
        }}
      >
        <div className={classes.toolbar}>
          <Link
            className={classes.toolbarTitle}
            href='/'
            onClick={handleDrawerClose}
            variant='h6'
            color='inherit'
          >
            {t('common:application-title')}
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Tree data={pages} activePage={activePage} />
      </SwipeableDrawer>
    );
  };

  const renderDesktopDrawer = () => {
    return (
      <Drawer
        variant='permanent'
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isDrawerExpanded,
          [classes.drawerClose]: !isDrawerExpanded
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isDrawerExpanded,
            [classes.drawerClose]: !isDrawerExpanded
          })
        }}
        open={isDrawerExpanded}
      >
        <div className={classes.toolbar}>
          <Link
            className={classes.toolbarTitle}
            href='/'
            onClick={handleDrawerClose}
            variant='h6'
            color='inherit'
          >
            {t('common:application-title')}
          </Link>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Tree data={pages} activePage={activePage} />
      </Drawer>
    );
  };

  if (pages && pages.length > 0) {
    if (isMobile) {
      return renderMobileDrawer();
    }
    return renderDesktopDrawer();
  }
  return null;
};

export default AppDrawer;
