import { useState, useMemo } from 'react';
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
  Divider,
} from '@material-ui/core';
import useFetch from 'react-fetch-hook';

import { ITEM_URL, PROFILE_URL, FEEDBACK_URL } from '../constants';
import PageGrid from '../PageGrid';
import ItemTable from '../tables/ItemTable';
import ProfileTable from '../tables/ProfileTable';
import FeedbackTable from '../tables/FeedbackTable';
import HigherLower from './HigherLower';

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

  // profile, item
  const [profile, setProfile] = useState('');
  const [item, setItem] = useState('');

  // radio value
  const [type, setType] = useState('rating');

  // rating and comment
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');

  // initial data fetching
  const { data: feedbacks, isLoading: isLoadingFeedbacks } = useFetch(
    FEEDBACK_URL
  );
  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);
  const { data: profiles, isLoading: isLoadingProfiles } = useFetch(
    PROFILE_URL
  );

  // result obtained from database query
  const [result, setResult] = useState([]);

  const isLoading = isLoadingItems || isLoadingProfiles || isLoadingFeedbacks;

  const submitBody = useMemo(
    () =>
      type === 'rating'
        ? {
            numeroProfilo: profile.numero,
            codiceAccount: profile.codice_account,
            contenuto: item,
            punteggio: rating,
            tipo: type,
          }
        : {
            numeroProfilo: profile.numero,
            codiceAccount: profile.codice_account,
            contenuto: item,
            commento: comment,
            tipo: type,
          },
    [profile, item, rating, comment, type]
  );

  const onSubmit = async (_) => {
    try {
      const resData = await fetch(FEEDBACK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitBody),
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
          Insert new rating on content
        </Typography>
        <div className={classes.inputsRow}>
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
          <FormControl variant="filled">
            <InputLabel id="item-label">Contenuto</InputLabel>
            <Select
              variant="filled"
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
        <FormControl component="fieldset">
          <FormLabel component="legend">Tipo di Opinione</FormLabel>
          <RadioGroup
            aria-label="feedback_type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <FormControlLabel value="rating" control={<Radio />} label="Voto" />
            <FormControlLabel
              value="commento"
              control={<Radio />}
              label="Commento"
            />
          </RadioGroup>
        </FormControl>
        {/** will keep rating and comment cleanly apart for clarity. confirm button is NOT shared */}
        {/**RATING SECTION */}
        {type === 'rating' && (
          <>
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
            <Button
              onClick={onSubmit}
              disabled={profile === '' || item === '' || rating === ''}
            >
              Confirm
            </Button>
          </>
        )}
        {/**COMMENT SECTION */}
        {type === 'commento' && (
          <>
            <div>
              <TextField
                variant="filled"
                id="comment_box"
                label="Commento"
                multiline
                value={comment}
                onChange={(e) =>
                  e.target.value.length <= 200 && setComment(e.target.value)
                }
                error={comment.length === 200}
                helperText={comment.length === 200 && 'Commento troppo lungo'}
              />
            </div>
            <Button
              onClick={onSubmit}
              disabled={profile === '' || item === '' || comment === ''}
            >
              Confirm
            </Button>
          </>
        )}
        <Divider />
        <div style={{ marginTop: 10 }}>
          <HigherLower />
        </div>
      </Paper>
      <FeedbackTable feedbacks={result.length > 0 ? result : feedbacks} />
      <ProfileTable profiles={profiles} />
      <ItemTable items={items} />
    </PageGrid>
  );
};

export default Feedback;
