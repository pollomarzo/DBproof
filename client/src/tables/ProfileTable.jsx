import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const ProfileTable = ({ profiles }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Numero</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Nickname</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profiles.map((profile, index) => (
            <TableRow key={index}>
              <TableCell>{profile.numero}</TableCell>
              <TableCell>{profile.codice_account}</TableCell>
              <TableCell>{profile.nickname}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfileTable;
