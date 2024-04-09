const express = require('express');
const dbConfig  = require('./conexionMysql.js');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2/promise');

const app = express();


const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Temerario123',
  database: 'parking',
  port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


const connection = mysql.createConnection(dbConfig);




app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});
app.get('/Admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'Public', 'Login.html'));
});

app.get('/conexion', (req, res) => {
  // Configura la conexión a la base de datos utilizando las variables importadas
  const connection = mysql.createConnection(dbConfig);

  // Intenta conectar a la base de datos
  connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      res.status(500).send('Error al conectar a la base de datos');
      return;
    }
    console.log('Conexión a la base de datos MySQL establecida correctamente');
    res.send('Conexión a la base de datos MySQL establecida correctamente');
    
    // Cierra la conexión cuando hayas terminado
    connection.end();
  });
});

app.get('/obtenerEstadoEstacionamientos', async (req, res) => {
  try {
      // Realizar la consulta SELECT a la base de datos
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.query('SELECT * FROM espacios_estacionamiento');
      connection.release();
      
      // Devolver los datos al cliente en formato JSON
      res.json(rows);
  } catch (error) {
      console.error('Error al obtener el estado de los estacionamientos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.post('/generarTicket', async (req, res) => {
  const lugarEstacionamiento = req.body.lugarEstacionamiento;

  try {
      // Actualizar el estacionamiento en la base de datos
      const [result] = await connection.execute(
          'UPDATE espacios_estacionamiento SET disponibilidad = ? WHERE lugar = ?',
          [false, lugarEstacionamiento]
      );

      if (result.affectedRows > 0) {
          console.log('Estacionamiento actualizado correctamente');
          res.json({ mensaje: 'Estacionamiento actualizado exitosamente' });
      } else {
          console.log('No se encontró el estacionamiento');
          res.status(404).json({ mensaje: 'No se encontró el estacionamiento' });
      }
  } catch (error) {
      console.error('Error al actualizar el estacionamiento:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});



app.post('/EspacioLibre', async (req, res) => {
  const lugarEstacionamiento = req.body.espacio;
  console.log(lugarEstacionamiento);
  try {
      // Actualizar el estacionamiento en la base de datos
      const [result] = await connection.execute(
          'UPDATE espacios_estacionamiento SET disponibilidad = ? WHERE lugar = ?',
          [true, lugarEstacionamiento]
      );

      if (result.affectedRows > 0) {
          console.log('Estacionamiento actualizado correctamente');
          res.json({ mensaje: 'Estacionamiento actualizado exitosamente' });
      } else {
          console.log('No se encontró el estacionamiento');
          res.status(404).json({ mensaje: 'No se encontró el estacionamiento' });
      }
  } catch (error) {
      //console.error('Error al actualizar el estacionamiento:', error);
      //res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log(username,password)
  // Consulta a la base de datos para verificar las credenciales
  const sql = `SELECT * FROM admin WHERE User = ? AND Password = ?`;
  connection.query(sql, [username, password], (err, result) => {
    if (err) {
      res.status(500).send('Error interno del servidor');
    } else {
      if (result.length > 0) {
        res.send('Inicio de sesión exitoso');
        res.sendFile(path.join(__dirname, 'Public', 'Admin.html'));
      } else {
        res.redirect('/Admin.html');
      }
    }
  });
});

  
    app.listen(process.env.PORT || 3000, () => {
      console.log('App listening on port 3000!');
    });