const express = require('express');
const app = express();
const setupSwagger = require('./swagger');
const PORT = process.env.PORT || 8080;
const { connectToDatabase } = require('./db/connection');

app.use(express.json());

const contactsRoute = require('./routes/contacts');
app.use('/contacts', contactsRoute);

connectToDatabase().then(() => {
   app.get('/', (req, res) => {
   res.send('👋 Welcome to the Contacts API');
 });
  
 setupSwagger(app);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
