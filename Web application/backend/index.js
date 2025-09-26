const express = require('express');
const db = require('./src/firebase'); // Import Firebase
const userRoutes = require('./src/users/user.route');

const app = express();
app.use(express.json());
app.use('/api', userRoutes);

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});