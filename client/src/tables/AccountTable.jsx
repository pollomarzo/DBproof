import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const AccountTable = ({ accounts }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codice</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Tipologia Abbonamento</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Cognome</TableCell>
            <TableCell>Data di Nascita</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Fatt. Nome</TableCell>
            <TableCell>Fatt. Cognome</TableCell>
            <TableCell>Fatt. Indirizzo</TableCell>
            <TableCell>Fatt. Telefono</TableCell>
            <TableCell>Paypal</TableCell>
            <TableCell>Carta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account, index) => (
            <TableRow key={index}>
              <TableCell>{account.codice}</TableCell>
              <TableCell>{account.email}</TableCell>
              <TableCell>{account.tipologia_abbonamento}</TableCell>
              <TableCell>{account.nome}</TableCell>
              <TableCell>{account.cognome}</TableCell>
              <TableCell>{account.data_nascita}</TableCell>
              <TableCell>{account.telefono}</TableCell>
              <TableCell>{account.fatt_nome}</TableCell>
              <TableCell>{account.fatt_cognome}</TableCell>
              <TableCell>{account.fatt_indirizzo}</TableCell>
              <TableCell>{account.fatt_telefono}</TableCell>
              <TableCell>{account.paypal}</TableCell>
              <TableCell>{account.carta}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountTable;
