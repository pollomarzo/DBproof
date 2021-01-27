import { useState } from 'react';
import {
  Select,
  MenuItem,
  Paper,
  Typography,
  makeStyles,
  Button,
  InputLabel,
  FormControl,
  TextField,
} from '@material-ui/core';
import useFetch from 'react-fetch-hook';

import { PLAYLIST_URL, ITEM_URL, PROFILE_URL } from '../constants';
import PageGrid from '../PageGrid';
import PlaylistTable from '../tables/PlaylistTable';
import ProfileTable from '../tables/ProfileTable';
import ItemTable from '../tables/ItemTable';

/**
 * - insert new playlist:
 *   - nome, profilo
 *   - contenuti (add + lista)
 */

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
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
  inputsRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    '& > *': {
      flex: '0 1 48%',
    },
  },
}));

const Playlist = () => {
  const classes = useStyles();

  // selects and their contents, plus playlist name
  const [profile, setProfile] = useState('');
  const [item, setItem] = useState('');
  const [name, setName] = useState('');

  // initial data fetching
  const { data: playlists, isLoading: isLoadingPlaylists } = useFetch(
    PLAYLIST_URL
  );
  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);
  const { data: profiles, isLoading: isLoadingProfiles } = useFetch(
    PROFILE_URL
  );

  // list of contents selected for playlist
  const [inList, setInList] = useState([]);

  // result obtained from database query
  const [result, setResult] = useState([]);

  const isLoading = isLoadingPlaylists || isLoadingItems || isLoadingProfiles;

  const onSubmit = async (_) => {
    try {
      const resData = await fetch(PLAYLIST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          numeroProfilo: profile.numero,
          codiceAccount: profile.codice_account,
          contenuti: inList,
        }),
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
    <PageGrid>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1">
          Insert new playlist with related content
        </Typography>
        <div className={classes.inputsRow}>
          <TextField
            variant="filled"
            label="Nome playlist"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl variant="filled">
            <InputLabel id="profile-label">Profilo</InputLabel>
            <Select
              labelId="profile-label"
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
        </div>
        <div className={classes.inputsRow}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setInList([...inList, item])}
          disabled={
            item === '' ||
            !!inList.find((content) => item.codice === content.codice)
          }
          style={{ marginBottom: 8 }}
        >
          Aggiungi contenuto
        </Button>
        <Typography variant="body2" style={{ marginBottom: 8 }}>
          Currently in list:{' '}
        </Typography>
        {inList.map((item) => (
          <div key={item.codice} style={{ marginBottom: 8 }}>
            {item.nome}
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={profile === '' || name === '' || inList.length === 0}
        >
          Confirm
        </Button>
      </Paper>
      <PlaylistTable playlists={result.length > 0 ? result : playlists} />
      <ProfileTable profiles={profiles} />
      <ItemTable items={items} />
    </PageGrid>
  );
};

export default Playlist;
