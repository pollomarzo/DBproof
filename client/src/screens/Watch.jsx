import { useState } from 'react';
import {
  MenuItem,
  Paper,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import useFetch from 'react-fetch-hook';

import Select from '../Select';
import { WATCH_URL, ITEM_URL, PROFILE_URL } from '../constants';

/**
 * - insert new rel
 *   - profilo, contenuto
 */

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  select: {
    display: 'inline-block',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '50%',
    '& > *': {
      width: '100%',
    },
  },
}));

const Watch = () => {
  const classes = useStyles();

  const { handleSubmit, control } = useForm();
  const { data: watchData, isLoading: isLoadingWatch } = useFetch(WATCH_URL);
  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);
  const { data: profiles, isLoading: isLoadingProfiles } = useFetch(
    PROFILE_URL
  );
  const [datino, setDatino] = useState('[]');

  const isLoading = isLoadingWatch || isLoadingItems || isLoadingProfiles;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const resData = await fetch(WATCH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      setDatino(resData);
      console.log(resData);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1">
          Insert new rel bit prof cont
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.select}>
            <Select
              variant="filled"
              label="Profilo"
              name="profilo"
              control={control}
              defaultValue=""
            >
              {profiles.map((profile) => (
                <MenuItem
                  key={`${profile.codice_account}_${profile.numero}`}
                  value={{
                    codice_account: profile.codice_account,
                    numero: profile.numero,
                  }}
                >
                  {profile.nickname}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={classes.select}>
            <Select
              variant="filled"
              label="Contenuto"
              name="codice_contenuto"
              control={control}
              defaultValue=""
            >
              {items.map((item) => (
                <MenuItem key={item.codice} value={item.codice}>
                  {item.nome}
                </MenuItem>
              ))}
            </Select>
          </div>
          <Button type="submit">Confirm</Button>
        </form>
      </Paper>
      <Paper className={classes.paper}>
        <Typography>Guarda</Typography>
        <code>{JSON.stringify(datino, null, 2)}</code>
      </Paper>
    </div>
  );
};

export default Watch;
