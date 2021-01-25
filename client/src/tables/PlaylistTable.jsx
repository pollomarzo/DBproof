import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const PlaylistTable = ({ playlists }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codice</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Profilo</TableCell>
            <TableCell>Account</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playlists.map((playlist, index) => (
            <TableRow key={index}>
              <TableCell>{playlist.codice}</TableCell>
              <TableCell>{playlist.nome}</TableCell>
              <TableCell>{playlist.profilo}</TableCell>
              <TableCell>{playlist.account}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlaylistTable;
