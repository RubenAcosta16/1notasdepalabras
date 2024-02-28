import { connect, connection } from "mongoose";

import Verb from '../models/Verb'

const conn = {
  isConnected: false,
};

export async function dbConnect() {
  if (conn.isConnected) {
    return; 
  }

  const db = await connect(
    process.env.MONGODB_URL
  );
  // console.log(db.connection.db.databaseName);
  conn.isConnected = db.connections[0].readyState;
}

connection.on("connected mongodb conectado", () => console.log("Mongodb connected to db"));

connection.on("error al conectar", (err) => console.error("Mongodb Errro:", err.message));




// Eliminar el índice existente
Verb.collection.dropIndex('name_1', (err, result) => {
  if (err) {
    console.error('Error al eliminar el índice:', err);
  } else {
    console.log('Índice eliminado con éxito:', result);
  }
});

// Crear un nuevo índice sin la opción única
Verb.collection.createIndex({ name: 1 }, { unique: false }, (err, result) => {
  if (err) {
    console.error('Error al crear el índice:', err);
  } else {
    console.log('Índice creado con éxito:', result);
  }
});