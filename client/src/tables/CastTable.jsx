import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import moment from 'moment';

const CastTable = ({ castMembers }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codice</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Cognome</TableCell>
            <TableCell>Data di Nascita</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {castMembers.map((member, index) => (
            <TableRow key={index}>
              <TableCell>{member.codice}</TableCell>
              <TableCell>{member.nome}</TableCell>
              <TableCell>{member.cognome}</TableCell>
              <TableCell>
                {moment(member.nascita).format('DD/MM/YYYY')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CastTable;
