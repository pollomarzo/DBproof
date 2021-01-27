const mysql = require('mysql');

const dbConnection = mysql.createConnection({
  host: 'eu-cdbr-west-03.cleardb.net',
  user: 'bbeed202ff8e38',
  password: '0d6d5aca',
  database: 'heroku_3b70c2a35721f9d',
});

dbConnection.connect((err) => {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
//working
// const account = {
//   email: 'test@test.com',
//   abbonamento: 'silver',
//   nome: 'test',
//   cognome: 'test',
//   data_nascita: '1999-01-01',
//   telefono: '1234',
//   fatt_telefono: '1234',
//   fatt_indirizzo: 'via del null',
//   fatt_nome: 'test',
//   fatt_cognome: 'test',
//   carta: '1',
// };

// dbConnection.query('INSERT INTO account SET ?', account, (err, rows) => {
//   if (err) console.log(err);
//   console.log(rows);
// });

//working
// const profile = {
//   numero: '2',
//   codice_account: '3',
//   nickname: 'test',
// };
// dbConnection.query('INSERT INTO profilo SET ?', profile, (err, rows) => {
//     if (err) console.log(err);
//     console.log(rows);
//   });

//working
// const item = {
//   nome: 'test1',
//   anno: '2019-01-20',
//   descrizione: 'test',
//   kind: 'film',
// };

// dbConnection.query('INSERT INTO contenuto SET ?', item, (err, rows) => {
//     if (err) console.log(err);
//     console.log(rows);
//   });

// const playlist = {
//   nome: 'test1',
//   profilo: '1',
//   account: '3',
// };

// dbConnection.query('INSERT INTO playlist SET ?', playlist, (err, rows) => {
//     if (err) console.log(err);
//     console.log(rows);
//   });

// const opinione = {
//   testo: 'test',
//   tipo: 'commento',
//   profilo: '1',
//   account: '3',
//   contenuto: '13',
//   upvotes: '100',
// };
// dbConnection.query('INSERT INTO opinione SET ?', opinione, (err, rows) => {
//     if (err) console.log(err);
//     console.log(rows);
//   });

// const paypal = {
//   token: 'fw879fheiufh',
//   email: 'test@test.gmail',
// };
// dbConnection.query('INSERT INTO paypal SET ?', paypal, (err, rows) => {
//     if (err) console.log(err);
//     console.log(rows);
//   });

// const appartiene = {
//   playlist: '1',
//   contenuto: '13',
// };
// dbConnection.query('INSERT INTO appartiene SET ?', appartiene, (err, rows) => {
//   if (err) console.log(err);
//   console.log(rows);
// });

// const carta = {
//   nome: 'gino',
//   cognome: 'pino',
//   numero: '0987654321',
//   scadenza: '2020-02-20',
//   cvv: '600',
// };
// dbConnection.query('INSERT INTO carta SET ?', carta, (err, rows) => {
//     if (err) console.log(err);
//     console.log(rows);
//   });

// const cast = {
//   nome: 'mario',
//   cognome: 'rossi',
//   nascita: '1954-03-23',
// };
// dbConnection.query('INSERT INTO cast SET ?', cast, (err, rows) => {
//     if (err) console.log(err);
//     console.log(rows);
//   });

// const collabora = {
//   contenuto: '13',
//   membro: '8',
//   ruolo: 'attore',
// };
// dbConnection.query('INSERT INTO collabora SET ?', collabora, (err, rows) => {
//     if (err) console.log(err);
//     console.log(rows);
//   });

// const episodio = {
//   numero: '1',
//   codice_contenuto: '20',
//   stagione: '1',
//   nome: 'ep 1',
//   descrizione: 'test',
// };
// dbConnection.query('INSERT INTO episodio SET ?', episodio, (err, rows) => {
//     if (err) console.log(err);
//     console.log(rows);
//   });

// const guarda = {
//   profilo: '1',
//   account: '3',
//   contenuto: '17',
// };

// dbConnection.query('INSERT INTO guarda SET ?', guarda, (err, rows) => {
//   if (err) console.log(err);
//   console.log(rows);
// });

var nome = 'Leonardo';
var cognome = 'Di Caprio';

dbConnection.query(
  `SELECT * FROM cast WHERE nome = '${nome}' AND cognome = '${cognome}'`,
  (err, rows) => {
    if (err) console.log(err);
    console.log(rows);
  }
);
