const express = require('express');

// https://expressjs.com/en/resources/middleware/cors.html
const cors = require('cors');
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

// https://www.npmjs.com/package/query-string
const queryString = require('query-string');

// http://podvorny.com/vendor/api?category=business&country=us&feed=newsapi&size=100&type=top
const getData = async function(qsParams) {
  const qs = queryString.stringify(qsParams);
  const url = `http://podvorny.com/vendor/api?${qs}`;
  let response = await fetch(url);
  let json = await response.json();
  return json;
};

const app = express();

app.get('/api', cors(corsOptions), async (req, res) => {
  res.type('application/json');
  const {query} = req;
  let data = {};
  if (query.feed === 'newsapi') {
    //const {category, country, size, type} = req.query;
    try {
      data = await getData(query);
      //console.log('########### Data:\n' + JSON.stringify(data, null, 2));
      if (data.error) {
        res.status(404);
      }
    } catch (x) {
      res.status(500);
      data.error = 'Shit happened: ' + x;
    }
  } else {
    res.status(400);
    data.error = 'Bad request';
  }
  res.end(JSON.stringify(data));
});

app.get('/*', (req, res) => {
  res.status(404);
  res.type('application/json');
  res.end(JSON.stringify({error: '404 Not Found'}));
});

module.exports = app;
