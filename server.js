const http = require('http');
const app = require('./api/newsapi.js');

port = 3333;

app.get('/*', (req, res) => {
  res.sendStatus(404);
});

http.createServer(app).listen(port, function () {
  console.log(`Express server listening on port ${port}`);
});
