const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let watchData = [];
let playlists = [];
let cast = [];
let feedback = [];
let profiles = [
  { codice_account: 123, numero: 1, nickname: 'giorgio' },
  { codice_account: 123, numero: 2, nickname: 'antonio' },
  { codice_account: 2, numero: 1, nickname: 'giovanni' },
];

app.get('/profile', (req, res) => {
  res.status(200).json(profiles);
}); //codice_account, numero

app.get('/item', (req, res) => {
  res.status(200).json([
    { codice: 1234, nome: 'alien' },
    { codice: 234, nome: 'fuck you' },
    { codice: 34, nome: 'idiot' },
  ]);
}); //codice, nome

app.get('/playlist', (req, res) => {
  res.status(200).json(playlists);
});

app.get('/cast', (req, res) => {
  res.status(200).json(cast);
});

app.get('/feedback', (req, res) => {
  res.status(200).json(feedback);
});

app.post('/account', (req, res) => {
  // remember to add codice in every profile after inserting it into DB
  // generate paypal token
});

app.post('/cast', (req, res) => {
  cast.push(req.body);
  res.status(200).json(cast);
});

app.post('/feedback', (req, res) => {
  feedback.push(req.body);
  res.status(200).json(feedback);
});

app.post('/playlist', (req, res) => {
  playlists.push(req.body);
  res.status(200).json(playlists);
});

app.get('/watch', (req, res) => {
  res.status(200).json(watchData);
});

app.post('/watch', (req, res) => {
  watchData.push(req.body);
  res.status(200).json(watchData);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
