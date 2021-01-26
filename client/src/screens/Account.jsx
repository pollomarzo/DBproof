import { useState, useMemo } from "react";
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
} from "@material-ui/core";
import moment from "moment";
import { DatePicker } from "@material-ui/pickers";

import { ACCOUNT_URL } from "../constants";

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
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

/**
 * ops:
 * - insert new account: email, tipo_abb, nome, cognome, data nasc, tel, fatt_telefono, fatt_indirizzo, fatt_nome, fatt_cognome
 *   - profiles: nickname
 *   - payment method for account
 *     - insert new credit card (numero, nome, cognome, scadenza) or paypal (email, token generato a mano)
 */

const Account = () => {
  const classes = useStyles();

  // account info
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [level, setLevel] = useState("silver");
  const levels = ["silver", "gold", "platinum"];
  const [birth, setBirth] = useState(new Date());
  const [phone, setPhone] = useState("");

  // profiles and nicknames
  const [profiles, setProfiles] = useState([]);
  const [nickname, setNickname] = useState("");

  // payment
  const [payPhone, setPayPhone] = useState("");
  const [payAddress, setPayAddress] = useState("");
  const [payName, setPayName] = useState("");
  const [payLastName, setPayLastName] = useState("");

  // radio payment
  const [payment, setPayment] = useState("paypal");

  // credit card
  const [cardName, setCardName] = useState("");
  const [cardLastName, setCardLastName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState(new Date());
  const [cvv, setCvv] = useState("");

  // paypal
  const [paypalEmail, setPaypalEmail] = useState("");

  // result obtained from database query
  const [result, setResult] = useState("");

  const submitBody = useMemo(
    () => ({
      account: {
        email,
        nome: name,
        cognome: lastName,
        abbonamento: level,
        data_nascita: moment(birth).format("MM/YYYY"),
        telefono: phone,
        fatt_telefono: payPhone,
        fatt_indirizzo: payAddress,
        fatt_nome: payName,
        fatt_cognome: payLastName,
      },
      profili: profiles,
      pagamento: payment,
      paypal: {
        paypalEmail,
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
    ]
  );

  const onSubmit = async () => {
    try {
      const resData = await fetch(ACCOUNT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitBody),
      }).then((res) => res.json());
      setResult(resData);
      console.log(resData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="subtitle1">Insert new account</Typography>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Nome account"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Cognome account"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Select
          label="Livello"
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          {levels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
        <DatePicker value={birth} onChange={setBirth} />
        <TextField
          label="Numero di telefono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/** profiles and nicknames */}
        <TextField
          label="Nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Button
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
        <Typography variant="body2">
          Current profiles in this account:
        </Typography>
        {profiles.map((prof, idx) => (
          <div key={idx}>{prof.nickname}</div>
        ))}

        {/** payment */}
        <TextField
          label="Numero di telefono pagamento"
          value={payPhone}
          onChange={(e) => setPayPhone(e.target.value)}
        />
        <TextField
          label="Indirizzo di fatturazione"
          value={payAddress}
          onChange={(e) => setPayAddress(e.target.value)}
        />
        <TextField
          label="Nome fatturazione"
          value={payName}
          onChange={(e) => setPayName(e.target.value)}
        />
        <TextField
          label="Cognome fatturazione"
          value={payLastName}
          onChange={(e) => setPayLastName(e.target.value)}
        />

        {/** radio for selecting payment type */}
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

        {/** card */}
        {payment === "card" && (
          <>
            <TextField
              label="Nome sulla carta"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />
            <TextField
              label="Cognome sulla carta"
              value={cardLastName}
              onChange={(e) => setCardLastName(e.target.value)}
            />
            <TextField
              label="Numero di carta"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <DatePicker
              variant="inline"
              openTo="year"
              views={["year", "month"]}
              label="Expiry date"
              value={cardDate}
              onChange={setCardDate}
            />
            <TextField
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </>
        )}
        {/** paypal */}
        {payment === "paypal" && (
          <>
            <TextField
              label="Paypal Email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
            />
          </>
        )}

        <Button onClick={onSubmit} disabled={false}>
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

export default Account;
