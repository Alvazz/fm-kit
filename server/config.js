module.exports = {
  SECRET: 'SomeSecretString',
  PORT: process.env.PORT || 3001,
  DB: process.env.MONGODB_URI || 'mongodb://localhost:27017/loginapi',
  JWT_KEY: 'secret'
}
