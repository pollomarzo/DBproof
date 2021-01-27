import { useState } from 'react';
import {
  Select,
  MenuItem,
  Typography,
  Button,
  InputLabel,
  FormControl,
  makeStyles,
} from '@material-ui/core';
import useFetch from 'react-fetch-hook';

import { ITEM_URL, TV_URL } from '../constants';

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

const TV = () => {
  const classes = useStyles();

  const [item, setItem] = useState('');
  const [episodes, setEpisodes] = useState([]);

  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);

  const onRequestEpisodes = async () => {
    try {
      const resData = await fetch(`${TV_URL}?itemCode=${item.codice}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json());
      setEpisodes(resData);
    } catch (err) {
      console.error(err);
    }
  };

  const isLoading = isLoadingItems;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        Richiedi i contenuti di una serie TV
      </Typography>
      <div className={classes.inputsRow}>
        <FormControl variant="filled">
          <InputLabel id="item-label">Contenuto</InputLabel>
          <Select
            labelId="item-label"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          >
            {items
              .filter((item) => item.kind === 'serieTV')
              .map((item) => (
                <MenuItem key={item.codice} value={item}>
                  {item.nome}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={onRequestEpisodes}
          disabled={!item}
        >
          Episodi associati
        </Button>
      </div>
      {episodes.length > 0 &&
        episodes.map((episode, idx) => <div key={idx}>{episode.nome}</div>)}
    </>
  );
};

export default TV;
