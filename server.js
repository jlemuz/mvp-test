const express = require('express');
const fileUpload = require("express-fileupload");
const path = require("path");





//initializes the db connection
const sequelize = require('./config/connection');

//initializes the app
const app = express();
const PORT = process.env.PORT || 3001;


//routes are defined and exists as 
//api/users/
//api/users/1
const routes = require('./controllers/');



const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


//enables the use off express-fileupload
app.use(
    fileUpload()
  );

//creates the directory for the static files, including the images
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public/javascript')));

app.use(express.static(path.join(__dirname, 'public/uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});