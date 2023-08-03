const { MongoClient } = require('mongodb');
const config = require('./config');

const { dbUrl } = config;
const client = new MongoClient(dbUrl);
// eslint-disable-next-line no-unused-vars

async function connect() {
  // TODO: Conexión a la Base de Datos
  try {
    await client.connect();
    // const db = client.db(dbUrl);
    // eslint-disable-next-line no-console
    console.log('Se conecto la base de datos'); // Nombre de la base de datos
    // return db;
  } catch (error) {
    console.error('Error al conectar a la base de datos');
  }
}

module.exports = { connect };
