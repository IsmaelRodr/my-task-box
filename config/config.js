require('dotenv').config();

module.exports = {
  // Configuração da porta do servidor
  port: process.env.PORT,

  // URL de conexão com o MongoDB (vinda do arquivo .env)
  mongoURI: process.env.MONGO_URI,

  // Configuração de autenticação JWT
  jwtSecret: process.env.JWT_SECRET,

  // Opções avançadas para a conexão com MongoDB
  mongoOptions: {
    useNewUrlParser: true, // Usa o novo sistema de parsing de URLs
    useUnifiedTopology: true, // Melhora a estabilidade da conexão
    useFindAndModify: false, // Evita métodos obsoletos de atualização
    autoIndex: false, // Desativa criação automática de índices (melhora performance em produção)
    connectTimeoutMS: 10000, // Tempo máximo de conexão antes de falhar (10 segundos)
    socketTimeoutMS: 45000, // Tempo máximo de espera para operações de banco (45 segundos)
    serverSelectionTimeoutMS: 5000, // Tempo máximo para tentar encontrar um servidor antes de falhar
    maxPoolSize: 10, // Limita o número máximo de conexões simultâneas no pool
  },
};
