const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/minhaapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB.');
});

module.exports = mongoose;


