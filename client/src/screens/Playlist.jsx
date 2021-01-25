import { useState } from "react";
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
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import useFetch from "react-fetch-hook";

import { PLAYLIST_URL, ITEM_URL, PROFILE_URL } from "../constants";

/**
 * - insert new playlist:
 *   - nome, profilo
 *   - contenuti (add + lista)
 */

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    display:'flex',
    flexDirection: 'column',
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  select: {
    display: "inline-block",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: "50%",
    "& > *": {
      width: "100%",
    },
  },
}));

const Playlist = () => {
  const classes = useStyles();

  // selects and their contents, plus playlist name
  const [profile, setProfile] = useState("");
  const [item, setItem] = useState("");
  const [name, setName] = useState("");

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
  const [result, setResult] = useState("");

  const isLoading = isLoadingPlaylists || isLoadingItems || isLoadingProfiles;

  const onSubmit = async (_) => {
    try {
      const resData = await fetch(PLAYLIST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: name,
          profilo: profile,
          account: profile.codice_account,
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
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1">
          Insert new rel bit prof cont
        </Typography>
          <div>
            <TextField
              label="Nome playlist"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <Button
              variant="contained"
              onClick={() => setInList([...inList, item])}
              disabled={item === "" || !!inList.find((content) => item.codice === content.codice)}
            >
              Aggiungi contenuto
            </Button>
            <Typography variant="body2">Currently in list: </Typography>
            {inList.map((item) => (
              <div key={item.codice}>{item.nome}</div>
            ))}
          </div>
          <Button onClick={onSubmit} disabled={profile === '' || name === '' || inList == []}>Confirm</Button>
      </Paper>
      <Paper className={classes.paper}>
        <Typography>Playlists</Typography>
        <code>{JSON.stringify(result, null, 2)}</code>
      </Paper>
    </div>
  );
};

export default Playlist;
