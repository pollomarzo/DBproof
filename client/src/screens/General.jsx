import { useState } from 'react';
import {
  Paper,
  Typography,
  makeStyles,
  Button,
  Divider,
} from '@material-ui/core';
import useFetch from 'react-fetch-hook';

import ProfileTable from '../tables/ProfileTable';
import ItemTable from '../tables/ItemTable';
import PageGrid from '../PageGrid';
import { CASH_URL, ITEM_URL, PROFILE_URL } from '../constants';
import Saga from './Saga';
import TV from './TV';

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    display: 'flex',
    '& > *': {
      width: '50%',
    },
  },
  gridCell: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
  header: {
    '& > :first-child': {
      marginBottom: theme.spacing(1),
    },
    '& > :last-child': {
      marginBottom: theme.spacing(3),
    },
  },
  inputs: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      width: '100%',
      marginBottom: theme.spacing(4),
    },
  },
}));

const General = () => {
  const classes = useStyles();

  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);
  const { data: profiles, isLoading: isLoadingProfiles } = useFetch(
    PROFILE_URL
  );

  // result obtained from database query
  const [cash, setCash] = useState('');

  const isLoading = isLoadingItems || isLoadingProfiles;

  const onRequestCash = async () => {
    try {
      const resData = await fetch(CASH_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      setCash(resData);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageGrid>
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Typography variant="h4">General queries</Typography>
          <Typography variant="subtitle1">
            Where we put stuff that didn't really have a home
          </Typography>
        </div>
        {/** ask for cash */}
        <div style={{ marginBottom: 16 }}>
          <Button variant="contained" color="primary" onClick={onRequestCash}>
            Richiedi entrate
          </Button>
        </div>
        <div>{cash !== '' && cash}</div>
        <Divider style={{ marginBottom: 10 }} />
        <Saga />
        <Divider style={{ marginBottom: 10 }} />
        <TV />
      </Paper>
      <ProfileTable profiles={profiles} />
      <ItemTable items={items} />
    </PageGrid>
  );
};

export default General;
