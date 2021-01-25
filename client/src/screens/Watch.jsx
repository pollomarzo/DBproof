import { useState } from 'react';
import {
  MenuItem,
  Paper,
  Typography,
  makeStyles,
  Button,
  Select,
  InputLabel,
  FormControl,
  Grid,
} from '@material-ui/core';
import useFetch from 'react-fetch-hook';

import { WATCH_URL, ITEM_URL, PROFILE_URL } from '../constants';
import WatchTable from '../tables/WatchTable';
import ProfileTable from '../tables/ProfileTable';
import ItemTable from '../tables/ItemTable';

/**
 * - insert new rel
 *   - profilo, contenuto
 */

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
  btnWrapper: {
    textAlign: 'right',
  },
}));

const Watch = () => {
  const classes = useStyles();

  // selects and their contents, plus playlist name
  const [profile, setProfile] = useState('');
  const [item, setItem] = useState('');

  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);
  const { data: profiles, isLoading: isLoadingProfiles } = useFetch(
    PROFILE_URL
  );

  // result obtained from database query
  const [result, setResult] = useState([]);

  const isLoading = isLoadingItems || isLoadingProfiles;

  const onSubmit = async () => {
    try {
      const resData = await fetch(WATCH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profilo: profile.numero,
          account: profile.codice_account,
          contenuto: item.codice,
        }),
      }).then((res) => res.json());
      setResult(resData);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <Grid container style={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={6} className={classes.gridCell}>
            <Paper className={classes.paper}>
              <div className={classes.header}>
                <Typography variant="h4">Watch Content</Typography>
                <Typography variant="subtitle1">
                  Enter new watched content for a profile
                </Typography>
              </div>
              <div className={classes.inputs}>
                <FormControl variant="filled">
                  <InputLabel id="profile-label">Profilo</InputLabel>
                  <Select
                    labelid="profile-label"
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)}
                  >
                    {profiles.map((profile) => (
                      <MenuItem
                        key={`${profile.codice_account}_${profile.numero}`}
                        value={profile}
                      >
                        {profile.nickname}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl variant="filled">
                  <InputLabel id="item-label">Contenuto</InputLabel>
                  <Select
                    labelId="item-label"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  >
                    {items.map((item) => (
                      <MenuItem key={item.codice} value={item}>
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className={classes.btnWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onSubmit}
                  disabled={profile === '' || item === ''}
                >
                  Confirm
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.gridCell}>
            <WatchTable watch={result} />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} className={classes.gridCell}>
            <ProfileTable profiles={profiles} />
          </Grid>
          <Grid item xs={6} className={classes.gridCell}>
            <ItemTable items={items} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Watch;
