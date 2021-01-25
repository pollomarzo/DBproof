const cors = require('cors');
const bodyParser = require('body-parser');
const app = require('express')();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let watchData = [];
let playlists = [];


app.get('/profile', (req, res) => {
  res.status(200).json([
    { codice_account: 123, numero: 1, nickname: 'giorgio' },
    { codice_account: 123, numero: 2, nickname: 'antonio' },
    { codice_account: 2, numero: 1, nickname: 'giovanni' },
  ]);
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

app.post('/account', (req, res) => {});
app.post('/cast', (req, res) => {});

app.post('/feedback', (req, res) => {});

app.post('/playlist', (req, res) => {
  playlists.push(req.body);
  res.status(200).json(playlists);
});

app.get('/watch', (req, res) => {
  res.status(200).json([]);
});

app.post('/watch', (req, res) => {
  watchData.push(req.body);
  res.status(200).json(watchData);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
