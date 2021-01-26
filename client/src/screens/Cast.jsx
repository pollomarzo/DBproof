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
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { useForm } from 'react-hook-form';
import useFetch from 'react-fetch-hook';
import moment from 'moment';

import { CAST_URL, ITEM_URL } from '../constants';
import CastTable from '../tables/CastTable';
import ItemTable from '../tables/ItemTable';
import PageGrid from '../PageGrid';

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
 * - insert cast member
 *   - nome, cognome, data nascita, ruolo
 *   - select for movie he was participated in
 */

const Cast = () => {
  const classes = useStyles();

  // name, last name, birth date, role
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [birth, setBirth] = useState(new Date());

  // content
  const [item, setItem] = useState('');

  // initial data fetching
  const { data: cast, isLoading: isLoadingCast } = useFetch(CAST_URL);
  const { data: items, isLoading: isLoadingItems } = useFetch(ITEM_URL);

  // result obtained from database query
  const [result, setResult] = useState('');

  const isLoading = isLoadingCast || isLoadingItems;

  const onSubmit = async (_) => {
    try {
      const resData = await fetch(CAST_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: name,
          cognome: lastName,
          nascita: moment(birth).format('YYYY/MM/DD'),
          ruolo: role,
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
    <PageGrid>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1">Insert actor/role</Typography>
        <div className={classes.inputsRow}>
          <TextField
            variant="filled"
            label="Nome Attore"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="filled"
            label="Cognome Attore"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={classes.inputsRow}>
          <DatePicker
            label="Data di Nascita"
            inputVariant="filled"
            value={birth}
            onChange={setBirth}
          />
        </div>
        <div className={classes.inputsRow}>
          <TextField
            variant="filled"
            label="Ruolo"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
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
        <Button
          onClick={onSubmit}
          disabled={name === '' || lastName === '' || item === ''}
        >
          Confirm
        </Button>
      </Paper>
      <CastTable castMembers={cast} />
      <ItemTable items={items} />
    </PageGrid>
  );
};

export default Cast;
