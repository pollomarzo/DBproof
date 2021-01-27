const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = require('express')();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

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
let cash = 'a shitton of money babyyy';

app.get('/cast', (req, res) => {
  dbConnection.query('SELECT * FROM cast', (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
});

app.get('/cash', (req, res) => {
  // no params. expected result: total amount of money for a month. query 12
  dbConnection.query(
    `SELECT silver + gold + platinum as ricaviMensili FROM 
      (SELECT count(abbonamento) * 5 as silver from account where abbonamento="silver") temp, 
      (SELECT count(abbonamento) * 10 as gold from account where abbonamento="gold") temp2, 
      (SELECT count(abbonamento) * 15 as platinum from account where abbonamento="platinum") temp3`,
    (err, rows) => {
      if (err) throw err;
      res.status(200).json(rows[0].ricaviMensili);
    }
  );
});

app.get('/account', (req, res) => {
  // no params. exp res: all accounts
  dbConnection.query('SELECT * FROM account', (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
});

app.get('/profile', (req, res) => {
  // no params. exp res: all profiles
  dbConnection.query('SELECT * FROM profilo', (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
});

app.get('/item', (req, res) => {
  // no params. exp res: all contents
  dbConnection.query('SELECT * FROM contenuto', (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
});

app.get('/playlist', (req, res) => {
  // no params. exp res: all playlists
  dbConnection.query('SELECT * FROM playlist', (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
});

app.get('/feedback', (req, res) => {
  // no params. exp res: all feedbacks
  dbConnection.query('SELECT * FROM opinione', (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
});

app.get('/watch', (req, res) => {
  // no params. exp res: all watched content
  dbConnection.query('SELECT * FROM guarda', (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
});

app.get('/favorites', (req, res) => {
  // profileNumber, accountCode . exp res: favorite content associated with given profile
  let { profileNumber, accountCode } = req.query;
  /** QUERY */
  dbConnection.query(
    `SELECT c.nome, anno, descrizione, kind  
  FROM playlist as p  
  JOIN appartiene as a ON a.playlist = p.codice  
  JOIN contenuto as c ON a.contenuto=c.codice  
  WHERE p.nome = "preferiti" AND p.profilo = '${profileNumber}' AND p.account='${accountCode}'`,
    (err, rows) => {
      if (err) throw err;
      res.status(200).json(rows);
    }
  );
});

app.get('/rateprofile', (req, res) => {
  // range, profileNumber, accountCode, rating. exp res: get content with rating RANGE (higher/lower) than RATING for PROFILE
  // if range === 'higher' -> query 14
  // if range === 'lower' -> query 15
  let { range, rating, profileNumber, accountCode } = req.query;

  dbConnection.query(
    `SELECT c.nome, c.anno, c.descrizione, c.kind  
      FROM opinione as o  
      JOIN contenuto as c ON o.contenuto=c.codice  
      WHERE o.profilo = '${profileNumber}' and o.account='${accountCode}' and o.tipo="rating" and o.punteggio ${
      range === 'higher' ? '>=' : '<='
    } ${rating}`,
    (err, rows) => {
      if (err) throw err;
      res.status(200).json(rows);
    }
  );
});

app.get('/rateoverall', (req, res) => {
  // range, rating. exp res: get content with rating RANGE (higher/lower) than RATING
  // query 16
  let { range, rating } = req.query;
  dbConnection.query(
    `
    SELECT nome, anno, descrizione, kind
    FROM (SELECT avg(o.punteggio) as punteggio, c.nome, c.anno, c.descrizione, c.kind 
          FROM contenuto as c JOIN opinione as o ON o.contenuto = c.codice 
          WHERE o.tipo="rating" 
          GROUP BY o.contenuto) as temp 
    WHERE temp.punteggio ${range === 'higher' ? '>=' : '<='} ${rating}`,
    (err, rows) => {
      if (err) throw err;
      console.log(rows);
      res.status(200).json(rows);
    }
  );
});

app.get('/averagerating', (req, res) => {
  // itemCode. exp res: get average rating for ITEM
  let { itemCode } = req.query;
  dbConnection.query(
    `
  SELECT AVG(punteggio) as average
  FROM opinione 
  WHERE contenuto='${itemCode}'`,
    (err, rows) => {
      if (err) throw err;
      console.log(rows);
      res.status(200).json(rows[0].average);
    }
  );
});

app.get('/saga', (req, res) => {
  // itemCode. exp res: get all content in a saga
  // query 17
  let { itemCode } = req.query;
  dbConnection.query(
    `
  SELECT c.nome, c.anno, c.descrizione, c.kind  
  FROM saga as s JOIN contenuto as c ON c.codice=s.contenuto 
  WHERE s.codice='${itemCode}'`,
    (err, rows) => {
      if (err) throw err;
      console.log(rows);
      res.status(200).json(rows);
    }
  );
});

app.get('/tv', (req, res) => {
  // itemCode. exp res: get all episodes in a tv series
  // query 18
  let { itemCode } = req.query;
  dbConnection.query(
    `
  SELECT e.numero, e.stagione, e.nome, e.descrizione  
  FROM episodio as e  
  WHERE e.codice_contenuto='${itemCode}'`,
    (err, rows) => {
      if (err) throw err;
      console.log(rows);
      res.status(200).json(rows);
    }
  );
});

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

app.post('/account', (req, res) => {
  const { account, profili, pagamento, paypal, carta } = req.body;

  if (pagamento.toLowerCase() === 'paypal') {
    var info = {
      email: paypal.email,
      token: shuffle('THISISANAWESOMETOKEN'.split()),
    };
    dbConnection.query('INSERT INTO paypal SET ?', info, (err, dbRes) => {
      if (err) throw err;
      account.paypal = dbRes.insertId;
      // ricordati di tirare fuori il codice dell'account per inserire i profili
      dbConnection.query('INSERT INTO account SET ?', account, (err, dbRes) => {
        if (err) throw err;

        profili.forEach((profilo) => {
          console.log({ ...profilo, codice_account: dbRes.insertId });
          dbConnection.query(
            'INSERT INTO profilo SET ?',
            { ...profilo, codice_account: dbRes.insertId },
            (err) => {
              if (err) throw err;
            }
          );
        });

        dbConnection.query('SELECT * FROM account', (err, rows) => {
          if (err) throw err;
          res.status(200).json(rows);
        });
      });
    });
  } else {
    var info = {
      nome: carta.nome,
      cognome: carta.cognome,
      numero: carta.numero,
      scadenza: carta.scadenza,
      cvv: carta.cvv,
    };
    dbConnection.query('INSERT INTO carta SET ?', info, (err, dbRes) => {
      if (err) throw err;
      account.carta = dbRes.insertId;
      // ricordati di tirare fuori il codice dell'account per inserire i profili
      dbConnection.query('INSERT INTO account SET ?', account, (err, dbRes) => {
        if (err) throw err;

        profili.forEach((profilo) => {
          console.log({ ...profilo, codice_account: dbRes.insertId });
          dbConnection.query(
            'INSERT INTO profilo SET ?',
            { ...profilo, codice_account: dbRes.insertId },
            (err) => {
              if (err) throw err;
            }
          );
        });

        dbConnection.query('SELECT * FROM account', (err, rows) => {
          if (err) throw err;
          res.status(200).json(rows);
        });
      });
    });
  }
});

app.post('/cast', (req, res) => {
  cast.push(req.body);
  const { contenuto, ...member } = req.body;

  dbConnection.query(
    `SELECT * FROM cast WHERE nome = '${member.nome}' AND cognome = '${member.cognome}'`,
    (err, rows) => {
      if (err) console.log(err);
      if (rows.length > 0) {
        //cast member already exists
        var collabora = {
          contenuto: contenuto.codice,
          membro: rows[0].codice,
          ruolo: member.ruolo,
        };
        dbConnection.query('INSERT INTO collabora SET ?', collabora, (err) => {
          if (err) throw err;
          dbConnection.query('SELECT * FROM cast', (err, rows) => {
            if (err) throw err;
            res.status(200).json(rows);
          });
        });
      } else {
        const { ruolo, ...withoutRuolo } = member;
        //new member of cast
        dbConnection.query(
          'INSERT INTO cast SET ?',
          withoutRuolo,
          (err, result) => {
            if (err) throw err;

            var collabora = {
              contenuto: contenuto.codice,
              membro: result.insertId,
              ruolo,
            };
            dbConnection.query(
              'INSERT INTO collabora SET ?',
              collabora,
              (err) => {
                if (err) throw err;
              }
            );

            dbConnection.query('SELECT * FROM cast', (err, rows) => {
              if (err) throw err;
              res.status(200).json(rows);
            });
          }
        );
      }
    }
  );
});

app.post('/feedback', (req, res) => {
  const {
    numeroProfilo,
    codiceAccount,
    contenuto,
    commento,
    punteggio,
    tipo,
  } = req.body;
  const feedback = {
    profilo: numeroProfilo,
    account: codiceAccount,
    contenuto: contenuto.codice,
    testo: commento,
    punteggio,
    tipo,
  };
  dbConnection.query('INSERT INTO opinione SET ?', feedback, (err, rows) => {
    if (err) throw err;

    dbConnection.query('SELECT * FROM opinione', (err, rows) => {
      if (err) throw err;
      res.status(200).json(rows);
    });
  });
});

app.post('/item', (req, res) => {
  const { contenuto } = req.body;
  // remember to include item code in episodes
  // remember to handle saga
  dbConnection.query(
    'INSERT INTO contenuto SET ?',
    contenuto,
    (err, result) => {
      if (err) throw err;

      if (contenuto.kind === 'serieTV') {
        const { episodi } = req.body;
        episodi.forEach((ep) => {
          dbConnection.query(
            'INSERT INTO episodio SET ?',
            { ...ep, codice_contenuto: result.insertId },
            (err) => {
              if (err) throw err;
            }
          );
        });
      } else if (contenuto.kind === 'saga') {
        const { saga } = req.body;
        saga.forEach((contenuto) => {
          dbConnection.query(
            'INSERT INTO saga SET ?',
            { codice: result.insertId, contenuto },
            (err) => {
              if (err) throw err;
            }
          );
        });
      }

      dbConnection.query('SELECT * FROM contenuto', (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
      });
    }
  );
});

app.post('/playlist', (req, res) => {
  const { contenuti, nome, numeroProfilo, codiceAccount } = req.body;
  dbConnection.query(
    'INSERT INTO playlist SET ?',
    { nome, profilo: numeroProfilo, account: codiceAccount },
    (err, result) => {
      if (err) throw err;

      contenuti.forEach((contenuto) => {
        dbConnection.query(
          'INSERT INTO appartiene SET ?',
          { contenuto: contenuto.codice, playlist: result.insertId },
          (err) => {
            if (err) throw err;
          }
        );
      });

      dbConnection.query('SELECT * FROM playlist', (err, rows) => {
        if (err) throw err;
        res.status(200).json(rows);
      });
    }
  );
});

app.post('/watch', (req, res) => {
  const watch = req.body;
  dbConnection.query('INSERT INTO guarda SET ?', watch, (err) => {
    if (err) throw err;
    dbConnection.query('SELECT * FROM guarda', (err, rows) => {
      if (err) throw err;
      res.status(200).json(rows);
    });
  });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
