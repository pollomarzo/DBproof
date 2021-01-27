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
import { ITEM_URL, TV_URL } from '../constants';

const TV = () => {
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
      <Typography variant="h5">Richiedi i contenuti di una serie TV</Typography>
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
      <Button onClick={onRequestEpisodes} disabled={!item}>
        Episodi associati
      </Button>
      {episodes.length > 0 &&
        episodes.map((episode, idx) => <div key={idx}>{episode.nome}</div>)}
    </>
  );
};

export default TV;
