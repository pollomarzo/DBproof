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
  RadioGroup,
} from '@material-ui/core';
import moment from 'moment';
import { DatePicker } from '@material-ui/pickers';
import useFetch from 'react-fetch-hook';

import { ACCOUNT_URL } from '../constants';
import AccountTable from '../tables/AccountTable';
import PageGrid from '../PageGrid';

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

/**
 * ops:
 * - insert new account: email, tipo_abb, nome, cognome, data nasc, tel, fatt_telefono, fatt_indirizzo, fatt_nome, fatt_cognome
 *   - profiles: nickname
 *   - payment method for account
 *     - insert new credit card (numero, nome, cognome, scadenza) or paypal (email, token generato a mano)
 */

const Account = () => {
  const classes = useStyles();

  const { data: accounts, isLoading: isLoadingAccounts } = useFetch(
    ACCOUNT_URL
  );

  // account info
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [level, setLevel] = useState('silver');
  const levels = ['silver', 'gold', 'platinum'];
  const [birth, setBirth] = useState(new Date());
  const [phone, setPhone] = useState('');

  // profiles and nicknames
  const [profiles, setProfiles] = useState([]);
  const [nickname, setNickname] = useState('');

  // payment
  const [payPhone, setPayPhone] = useState('');
  const [payAddress, setPayAddress] = useState('');
  const [payName, setPayName] = useState('');
  const [payLastName, setPayLastName] = useState('');

  // radio payment
  const [payment, setPayment] = useState('paypal');

  // credit card
  const [cardName, setCardName] = useState('');
  const [cardLastName, setCardLastName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState(new Date());
  const [cvv, setCvv] = useState('');

  // paypal
  const [paypalEmail, setPaypalEmail] = useState('');

  // result obtained from database query
  const [result, setResult] = useState([]);

  const submitBody = useMemo(
    () => ({
      account: {
        email,
        nome: name,
        cognome: lastName,
        abbonamento: level,
        data_nascita: moment(birth).format('YYYY-MM-DD'),
        telefono: phone,
        fatt_telefono: payPhone,
        fatt_indirizzo: payAddress,
        fatt_nome: payName,
        fatt_cognome: payLastName,
      },
      profili: profiles,
      pagamento: payment,
      paypal: {
        // rmenbed to put token here
        email: paypalEmail,
      },
      carta: {
        nome: cardName,
        cognome: cardLastName,
        numero: cardNumber,
        scadenza: cardDate,
        cvv,
      },
    }),
    [
      cardDate,
      cardLastName,
      cardName,
      cardNumber,
      cvv,
      email,
      lastName,
      level,
      name,
      payAddress,
      payLastName,
      payName,
      payPhone,
      payment,
      paypalEmail,
      phone,
      profiles,
      birth,
    ]
  );

  const onSubmit = async () => {
    try {
      const resData = await fetch(ACCOUNT_URL, {
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

  if (isLoadingAccounts) {
    return <div>Loading...</div>;
  }

  return (
    <PageGrid>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1">Insert new account</Typography>
        <div className={classes.inputsRow}>
          <TextField
            variant="filled"
            label="Nome account"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="filled"
            label="Cognome account"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className={classes.inputsRow}>
          <TextField
            variant="filled"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="filled"
            label="Numero di telefono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={classes.inputsRow}>
          <FormControl variant="filled">
            <InputLabel id="level-label">Livello</InputLabel>
            <Select
              labelId="level-label"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DatePicker
            inputVariant="filled"
            label="Data di Nascita"
            value={birth}
            onChange={setBirth}
          />
        </div>

        {/** profiles and nicknames */}
        <div className={classes.inputsRow}>
          <TextField
            variant="filled"
            label="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              setProfiles([
                ...profiles,
                {
                  numero: profiles.length,
                  nickname: nickname,
                },
              ])
            }
            disabled={profiles.length === 5}
          >
            Aggiungi profilo
          </Button>
        </div>
        <div>
          <Typography variant="body2" style={{ marginBottom: 16 }}>
            Current profiles in this account:
          </Typography>
          {profiles.map((prof, idx) => (
            <div key={idx}>{prof.nickname}</div>
          ))}

          {/** payment */}
          <div className={classes.inputsRow}>
            <TextField
              variant="filled"
              label="Telefono di fatturazione"
              value={payPhone}
              onChange={(e) => setPayPhone(e.target.value)}
            />
            <TextField
              variant="filled"
              label="Indirizzo di fatturazione"
              value={payAddress}
              onChange={(e) => setPayAddress(e.target.value)}
            />
          </div>
          <div className={classes.inputsRow}>
            <TextField
              variant="filled"
              label="Nome fatturazione"
              value={payName}
              onChange={(e) => setPayName(e.target.value)}
            />
            <TextField
              variant="filled"
              label="Cognome fatturazione"
              value={payLastName}
              onChange={(e) => setPayLastName(e.target.value)}
            />
          </div>
        </div>

        {/** radio for selecting payment type */}
        <div className={classes.inputsRow}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tipo di pagamento</FormLabel>
            <RadioGroup
              aria-label="payment_type"
              name="payment_type"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label="Paypal"
              />
              <FormControlLabel
                value="card"
                control={<Radio />}
                label="Carta di credito"
              />
            </RadioGroup>
          </FormControl>
        </div>

        {/** card */}
        {payment === 'card' && (
          <>
            <div className={classes.inputsRow}>
              <TextField
                variant="filled"
                label="Nome sulla carta"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <TextField
                variant="filled"
                label="Cognome sulla carta"
                value={cardLastName}
                onChange={(e) => setCardLastName(e.target.value)}
              />
            </div>
            <div className={classes.inputsRow}>
              <TextField
                variant="filled"
                label="Numero di carta"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <DatePicker
                inputVariant="filled"
                variant="inline"
                openTo="year"
                views={['year', 'month']}
                label="Expiry date"
                value={cardDate}
                onChange={setCardDate}
              />
            </div>
            <div className={classes.inputsRow}>
              <TextField
                variant="filled"
                label="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </>
        )}
        {/** paypal */}
        {payment === 'paypal' && (
          <div className={classes.inputsRow}>
            <TextField
              variant="filled"
              label="Paypal Email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
            />
          </div>
        )}

        <div className={classes.inputsRow}>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled={false}
          >
            Confirm
          </Button>
        </div>
      </Paper>
      <AccountTable accounts={result.length > 0 ? result : accounts} />
    </PageGrid>
  );
};

export default Account;
