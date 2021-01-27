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
  Radio,
  FormControlLabel,
  FormLabel,
  TextField,
  Slider,
  RadioGroup,
} from '@material-ui/core';
import useFetch from 'react-fetch-hook';

import WatchTable from '../tables/WatchTable';
import ProfileTable from '../tables/ProfileTable';
import ItemTable from '../tables/ItemTable';
import PageGrid from '../PageGrid';
import {
  FAVORITES_URL,
  PROFILE_URL,
  RATEPROFILE_URL,
  RATEOVERALL_URL,
} from '../constants';

const HigherLower = () => {
  // either profile or overall
  const [type, setType] = useState('profile');
  const [profile, setProfile] = useState('');
  const [result, setResult] = useState([]);

  // either higher or lower
  const [range, setRange] = useState('higher');

  const [rating, setRating] = useState(3);

  const { data: profiles, isLoading: isLoadingProfiles } = useFetch(
    PROFILE_URL
  );

  const onRequestProfile = async () => {
    try {
      const resData = await fetch(
        `${RATEPROFILE_URL}?range=${range}&rating=${rating}&profileNumber=${profile.number}&accountCode=${profile.codice_account}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json());
      setResult(resData);
    } catch (err) {
      console.error(err);
    }
  };

  const onRequestOverall = async () => {
    try {
      const resData = await fetch(
        `${RATEOVERALL_URL}?range=${range}&rating=${rating}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json());
      setResult(resData);
    } catch (err) {
      console.error(err);
    }
  };
  const isLoading = isLoadingProfiles;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">Maggiore o minore</FormLabel>
        <RadioGroup
          name="maggiore_minore"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          <FormControlLabel
            value="higher"
            control={<Radio />}
            label="Più alto"
          />
          <FormControlLabel
            value="lower"
            control={<Radio />}
            label="Più basso"
          />
        </RadioGroup>
      </FormControl>
      <Slider
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        marks
        min={0}
        max={5}
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Tipo di richiesta</FormLabel>
        <RadioGroup
          name="tipo_richiesta"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <FormControlLabel
            value="profilo"
            control={<Radio />}
            label="Profilo"
          />
          <FormControlLabel
            value="overall"
            control={<Radio />}
            label="In media"
          />
        </RadioGroup>
      </FormControl>

      {type === 'profilo' && (
        <>
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
          <Button
            variant="contained"
            color="primary"
            onClick={onRequestProfile}
          >
            Richiedi contenuti
          </Button>
        </>
      )}

      {type === 'overall' && (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={onRequestOverall}
          >
            Richiedi contenuti
          </Button>
        </>
      )}
      {result.length > 0 &&
        result.map((res, idx) => <div key={idx}>{res.nome}</div>)}
    </>
  );
};

export default HigherLower;
