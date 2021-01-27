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

import WatchTable from '../tables/WatchTable';
import ProfileTable from '../tables/ProfileTable';
import ItemTable from '../tables/ItemTable';
import PageGrid from '../PageGrid';
import { CASH_URL, FAVORITES_URL, ITEM_URL, PROFILE_URL } from '../constants';

const FavoriteContent = () => {
  const [profile, setProfile] = useState('');
  const [favorites, setFavorites] = useState([]);

  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);
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
  const isLoading = isLoadingItems || isLoadingProfiles;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
    </>
  );
};

export default FavoriteContent;
