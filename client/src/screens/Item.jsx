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
  TextField,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import useFetch from 'react-fetch-hook';

import { ITEM_URL } from '../constants';
import PageGrid from '../PageGrid';
import PlaylistTable from '../tables/PlaylistTable';
import ProfileTable from '../tables/ProfileTable';
import ItemTable from '../tables/ItemTable';
import FavoriteContent from './FavoriteContent';
import AverageRating from './AverageRating';

/**
 * - insert item
 *   - nome, anno, descrizione, tipo
 *   - se serie, episodi:
 *     - stagione, nome, descrizione
 *   - se saga:
 *     - quali contenuti (add + lista)
 */

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
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

const Item = () => {
  const classes = useStyles();

  // content type-agnostic data
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');

  // kind select
  const [kind, setKind] = useState('film');
  const kinds = ['film', 'serieTV', 'saga'];

  // TV series episodes
  const [episodes, setEpisodes] = useState([]);
  const [number, setNumber] = useState('');
  const [season, setSeason] = useState('');
  const [episodeName, setEpisodeName] = useState('');
  const [episodeDescription, setEpisodeDescription] = useState('');

  // Saga
  const [sagaItems, setSagaItems] = useState([]);
  const [item, setItem] = useState({});

  // result obtained from database query
  const [result, setResult] = useState([]);

  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);

  const submitBody = useMemo(
    () => ({
      contenuto: {
        nome: name,
        anno: year,
        descrizione: description,
        kind,
      },
      episodi: episodes,
      saga: sagaItems.map((item) => item.codice),
    }),
    [name, year, description, kind, episodes, sagaItems]
  );

  const onSubmit = async () => {
    try {
      const resData = await fetch(ITEM_URL, {
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

  const isLoading = isLoadingItems;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageGrid>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1">
          Insert new playlist with related content
        </Typography>

        {/** content properties */}
        <div className={classes.inputsRow}>
          <TextField
            variant="filled"
            label="Nome contenuto"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="filled"
            label="Anno contenuto"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className={classes.inputsRow}>
          <TextField
            variant="filled"
            label="Descrizione contenuto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/** kind select */}
        <div style={{ marginBottom: 16 }}>
          <FormControl variant="filled" fullWidth>
            <InputLabel id="kind-label">Tipo</InputLabel>
            <Select
              labelId="kind-label"
              id="type"
              value={kind}
              onChange={(e) => setKind(e.target.value)}
            >
              {kinds.map((kind, idx) => (
                <MenuItem key={idx} value={kind}>
                  {kind}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/** TV series */}
        {kind === 'serieTV' && (
          <div>
            <div className={classes.inputsRow}>
              <TextField
                variant="filled"
                label="Numero episodio"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <TextField
                variant="filled"
                label="Stagione"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              />
            </div>
            <div className={classes.inputsRow}>
              <TextField
                variant="filled"
                label="Nome episodio"
                value={episodeName}
                onChange={(e) => setEpisodeName(e.target.value)}
              />
              <TextField
                variant="filled"
                label="Descrizione episodio"
                value={episodeDescription}
                onChange={(e) => setEpisodeDescription(e.target.value)}
              />
            </div>
            <Button
              onClick={() =>
                setEpisodes([
                  ...episodes,
                  {
                    numero: number,
                    stagione: season,
                    nome: episodeName,
                    descrizione: episodeDescription,
                  },
                ])
              }
            >
              Aggiungi episodio
            </Button>
            <Typography variant="body2">Inclusi nella serie TV:</Typography>
            {episodes.map((episode, idx) => (
              <div key={idx}>{episode.nome}</div>
            ))}
          </div>
        )}

        {/** Saga */}
        {kind === 'saga' && (
          <>
            <Typography variant="body2" style={{ marginBottom: 16 }}>
              Saga:{' '}
            </Typography>
            <FormControl
              variant="filled"
              fullWidth
              style={{ marginBottom: 16 }}
            >
              <InputLabel id="saga-item-label">Contenuto</InputLabel>
              <Select
                labelId="saga-item-label"
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
            <Button
              variant="contained"
              onClick={() => setSagaItems([...sagaItems, item])}
              disabled={
                item === '' ||
                !!sagaItems.find((content) => item.codice === content.codice)
              }
              style={{ marginBottom: 16 }}
            >
              Aggiungi contenuto
            </Button>
            <Typography variant="body2">Currently in list: </Typography>
            {sagaItems.map((item) => (
              <div key={item.codice}>{item.nome}</div>
            ))}
          </>
        )}
        <Button onClick={onSubmit} disabled={name === ''}>
          Confirm
        </Button>
      </Paper>
      <Paper>
        <AverageRating />{' '}
      </Paper>
      <FavoriteContent />
      <ItemTable items={result.length > 0 ? result : items} />
    </PageGrid>
  );
};

export default Item;
