import { Typography } from '@material-ui/core';

/**
 * ops:
 * - insert new account: email, tipo_abb, nome, cognome, data nasc, tel, fatt_telefono, fatt_indirizzo, fatt_nome, fatt_cognome
 *   - profiles: nickname
 *   - payment method for account
 *     - insert new credit card (numero, nome, cognome, scadenza) or paypal (email, token generato a mano)
 */

const Account = () => {
  return (
    <div>
      <Typography>Account</Typography>
      <form></form>
    </div>
  );
};

export default Account;
