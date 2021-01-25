import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const FeedbackTable = ({ feedbacks }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codice</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Punteggio</TableCell>
            <TableCell>Testo</TableCell>
            <TableCell>Upvotes</TableCell>
            <TableCell>Profilo</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Contenuto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map((feedback, index) => (
            <TableRow key={index}>
              <TableCell>{feedback.codice}</TableCell>
              <TableCell>{feedback.tipo}</TableCell>
              <TableCell>{feedback.punteggio}</TableCell>
              <TableCell>{feedback.testo}</TableCell>
              <TableCell>{feedback.upvotes}</TableCell>
              <TableCell>{feedback.profilo}</TableCell>
              <TableCell>{feedback.account}</TableCell>
              <TableCell>{feedback.contenuto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedbackTable;
