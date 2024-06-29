const express = require('express');
const endpoints = require('express-list-endpoints');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./app/routes/userRoutes'); // Percorso corretto per userRoutes

dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connesso'))
  .catch((err) => console.error('MongoDB non connesso', err));

const PORT = process.env.PORT || 5000;

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta: ${PORT}`);
  console.log('Endpoint disponibili:');
  console.table(endpoints(app));
});
