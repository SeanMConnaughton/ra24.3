const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;


