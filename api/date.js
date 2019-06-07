const express = require('express');

const app = express();

app.get('*', (req, res) => {
  res.set('Content-Type', 'text/plain');
  const currentTime = (new Date).toString();
  res.status(200).send(currentTime);
});

module.exports = app;
