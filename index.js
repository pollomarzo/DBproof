const cors = require('cors');
const bodyParser = require('body-parser');
const express = require("express")
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(process.env.NODE_ENV === "development"  ? cors() : cors({origin: "http://34.65.94.226"}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

let watchData = [];
let playlists = [];
let cast = [];
let feedback = [];
let profiles = [
  { codice_account: 123, numero: 1, nickname: 'giorgio' },
  { codice_account: 123, numero: 2, nickname: 'antonio' },
  { codice_account: 2, numero: 1, nickname: 'giovanni' },
];
let items = [
  { codice: 1234, nome: 'alien' },
  { codice: 234, nome: 'fuck you' },
  { codice: 34, nome: 'idiot' },
];

app.get('/profile', (req, res) => {
  res.status(200).json(profiles);
}); //codice_account, numero

app.get('/item', (req, res) => {
  res.status(200).json(items);
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

app.post('/item', (req, res) => {
  // remember to include item code in episodes
  res.status(200).json(items);
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

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
