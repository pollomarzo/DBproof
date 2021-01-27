import { useState } from 'react';
import {
  MenuItem,
  Button,
  Select,
  InputLabel,
  FormControl,
  makeStyles,
} from '@material-ui/core';
import useFetch from 'react-fetch-hook';

import { FAVORITES_URL, PROFILE_URL } from '../constants';

const useStyles = makeStyles((theme) => ({
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

const FavoriteContent = () => {
  const classes = useStyles();

  const [profile, setProfile] = useState('');
  const [favorites, setFavorites] = useState([]);

  const { data: profiles, isLoading: isLoadingProfiles } = useFetch(
    PROFILE_URL
  );
  const onRequestFavorites = async () => {
    try {
      const resData = await fetch(
        `${FAVORITES_URL}?profileNumber=${profile.numero}&accountCode=${profile.codice_account}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json());
      setFavorites(resData);
    } catch (err) {
      console.error(err);
    }
  };
  const isLoading = isLoadingProfiles;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.inputsRow}>
      {/** favorite content */}
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
      <Button variant="contained" color="primary" onClick={onRequestFavorites}>
        Richiedi preferiti
      </Button>
      {favorites.length > 0 &&
        favorites.map((film, idx) => <div key={idx}>{film.nome}</div>)}
    </div>
  );
};

export default FavoriteContent;
