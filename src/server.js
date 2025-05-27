
const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const routes = require('./routers'); // Ajuste o caminho conforme seu projeto
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(routes);

// Conexão com MongoDB usando a URI e as opções definidas em config.js
mongoose.connect(config.mongoURI, config.mongoOptions)
  .then(() => {
    console.log('✅ Conectado ao MongoDB Atlas');
    app.listen(config.port, () =>
      console.log(`🚀 Servidor rodando na porta ${config.port}`)
    );
  })
  .catch(err => console.error('❌ Erro ao conectar:', err));
