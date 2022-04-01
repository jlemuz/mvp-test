const express = require('express');
//routes are defined and exists as 
//api/users/
//api/users/1
const routes = require('./routes');

//initializes the db connection
const sequelize = require('./config/connection');

//initializes the app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});