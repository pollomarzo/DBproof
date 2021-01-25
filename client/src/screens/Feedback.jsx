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
  Slider,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import useFetch from 'react-fetch-hook';

import { ITEM_URL, PROFILE_URL, FEEDBACK_URL } from '../constants';

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    display: 'flex',
    '& > *': {
      width: '50%',
    },
  },
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
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

/**
 * - insert new feedback:
 *   - tipo
 *   - punteggio/testo
 *   - profilo
 *   - contenuto
 *   - punteggio del coso
 */

const Feedback = () => {
  const classes = useStyles();

  // profile, item, rating
  const [profile, setProfile] = useState('');
  const [item, setItem] = useState('');
  const [rating, setRating] = useState(3);

  // initial data fetching
  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);
  const { data: profiles, isLoading: isLoadingProfiles } = useFetch(
    PROFILE_URL
  );

  // result obtained from database query
  const [result, setResult] = useState('');

  const isLoading = isLoadingItems || isLoadingProfiles;

  const onSubmit = async (_) => {
    try {
      const resData = await fetch(FEEDBACK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          punteggio: rating,
          profilo: profile,
          contenuto: item,
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
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1">
          Insert new rating on content
        </Typography>
        <div>
          <Select
            label="Profilo"
            id="profilo"
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
        </div>
        <div>
          <div>
            <Select
              variant="filled"
              label="Contenuto"
              id="content_form"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            >
              {items.map((item) => (
                <MenuItem key={item.codice} value={item}>
                  {item.nome}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <Slider
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              step={1}
              marks
              min={0}
              max={5}
            />
          </div>
        </div>
        <Button
          onClick={onSubmit}
          disabled={profile === '' || item === '' || rating === ''}
        >
          Confirm
        </Button>
      </Paper>
      <Paper className={classes.paper}>
        <Typography>Ratings</Typography>
        <code>{JSON.stringify(result, null, 2)}</code>
      </Paper>
    </div>
  );
};

export default Feedback;
