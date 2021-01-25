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
import { PLAYLIST_URL, ITEM_URL, PROFILE_URL } from '../constants';

/**
 * - insert new playlist:
 *   - nome, profilo
 *   - contenuti (add + lista)
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

const Playlist = () => {
  const classes = useStyles();

  const [profile, setProfile] = useState('');
  const [item, setItem] = useState('');

  const { data: playlists, isLoading: isLoadingPlaylists } = useFetch(
    PLAYLIST_URL
  );
  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);
  const { data: profiles, isLoading: isLoadingProfiles } = useFetch(
    PROFILE_URL
  );
  const [inList, setInList] = useState([]);
  const [result, setResult] = useState('');

  const isLoading = isLoadingPlaylists || isLoadingItems || isLoadingProfiles;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const resData = await fetch(PLAYLIST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());
      setResult(resData);
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
          <div>
            <FormControl variant="filled">
              <InputLabel id="Profilo">Profilo</InputLabel>
              <Select
                labelId="Profilo"
                id="demo-simple-select-filled"
                value={playlist.profile}
                onChange={handleProfile}
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
            </FormControl>
          </div>
          <div>
            <div>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Age
                </InputLabel>
                <Select
                  variant="filled"
                  labelId="Contenuto"
                  id="content_form"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
              <Button
                variant="contained"
                onClick={() => inList.push(/**selected item */)}
              >
                Aggiungi contenuto
              </Button>
            </div>
            {inList.map((item) => (
              <div>{item.nome}</div>
            ))}
          </div>
          <Button type="submit">Confirm</Button>
        </form>
      </Paper>
      <Paper className={classes.paper}>
        <Typography>Playlists</Typography>
        <code>{JSON.stringify(result, null, 2)}</code>
      </Paper>
    </div>
  );
};

export default Playlist;
