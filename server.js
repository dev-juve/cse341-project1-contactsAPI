const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const { connectToDatabase } = require('./db/connection');

app.use(express.json());

const contactsRoute = require('./routes/contacts');
app.use('/contacts', contactsRoute);

// Connect to DB before starting server
connectToDatabase().then(() => {
   app.get('/', (req, res) => {
   res.send('👋 Welcome to the Contacts API');
 });
  
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
