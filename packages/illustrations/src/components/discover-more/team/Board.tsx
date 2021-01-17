import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { GitHub, LinkedIn } from '@material-ui/icons';
import { Translate } from 'next-translate';
import useTranslation from 'next-translate/useTranslation';
import React, { FC } from 'react';

export const getActiveCoreMembers = (t: Translate) => [
  {
    name: 'Gritsch Markus',
    github: 'gurkerl83',
    linkedIn: 'markus-gritsch-70952126',
    flag: t('common:founder'),
    city: `${t('common:munich')}, ${t('common:germany')}`
  }
];

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    row: {
      display: 'flex',
      flexDirection: 'row'
    },
    column: {
      display: 'flex',
      flexDirection: 'column'
    },
    avatar: {
      margin: theme.spacing(2)
    },
    title: {
      fontSize: theme.spacing(3),
      margin: `${theme.spacing(2)} 0`
    }
  })
);

interface GroupProps {
  title: string;
  members: Array<any>;
}

const Group: FC<GroupProps> = ({ title, members }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant='h2'>{title}</Typography>
      <Grid container>
        {members.map(member => {
          const { name, flag, city, github, linkedIn } = member;

          return (
            <Grid key={name} item xs={12} md={6}>
              <div className={classes.row}>
                <div className={classes.column}>
                  <Avatar
                    className={classes.avatar}
                    src={`https://github.com/${github}.png`}
                  />
                </div>
                <div className={classes.column}>
                  <Typography variant='h6' className={classes.title}>
                    {name}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {flag}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {city}
                  </Typography>
                  <div className={classes.row}>
                    {github && (
                      <IconButton
                        component='a'
                        href={`https://github.com/${github}`}
                      >
                        <GitHub />
                      </IconButton>
                    )}
                    {linkedIn && (
                      <IconButton
                        component='a'
                        href={`https://www.linkedin.com/in/${linkedIn}`}
                      >
                        <LinkedIn />
                      </IconButton>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export const Board: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Group
        title={t('common:active-core-team-title')}
        members={getActiveCoreMembers(t)}
      />
    </>
  );
};
