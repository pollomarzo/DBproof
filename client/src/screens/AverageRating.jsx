import { useState } from 'react';
import {
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import useFetch from 'react-fetch-hook';

import { ITEM_URL, AVERAGERATING_URL } from '../constants';

const AverageRating = () => {
  const [item, setItem] = useState('');
  const [average, setAverage] = useState('');

  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);

  const onRequestAverage = async () => {
    try {
      const resData = await fetch(
        `${AVERAGERATING_URL}?itemCode=${item.codice}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => res.json());
      setAverage(resData);
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
      <Button variant="contained" color="primary" onClick={onRequestAverage}>
        Voto medio
      </Button>
      {average !== '' && (
        <div>
          <span>{item.nome}: </span>
          <span>{average}</span>
        </div>
      )}
    </>
  );
};

export default AverageRating;
