import { useState } from 'react';
import {
  MenuItem,
  Paper,
  Typography,
  makeStyles,
  Button,
  Select
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import useFetch from 'react-fetch-hook';

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

  // selects and their contents, plus playlist name
  const [profile, setProfile] = useState("");
  const [item, setItem] = useState("");

  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);
  const { data: profiles, isLoading: isLoadingProfiles } = useFetch(
    PROFILE_URL
  );

  // result obtained from database query
  const [result, setResult] = useState("");

  const isLoading = isLoadingItems || isLoadingProfiles;

  const onSubmit = async (_) => {
    try {
      const resData = await fetch(WATCH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
          Insert new watched content for a profile
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
          <Button onClick={onSubmit} disabled={profile === "" || item === ""}>
            Confirm
          </Button>
        </div>
      </Paper>

      <Paper className={classes.paper}>
        <Typography>Watched content</Typography>
        <code>{JSON.stringify(result, null, 2)}</code>
      </Paper>
    </div>
  );
};

export default Watch;
