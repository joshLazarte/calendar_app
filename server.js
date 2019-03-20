require('dotenv').config();
const express        = require('express'),
      app            = express(),
      bodyParser     = require('body-parser'),
      databaseConfig = require('./config/database'),
      mongoose       = require('mongoose');
      
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json());

mongoose.connect(databaseConfig.database, databaseConfig.options);

app.get('/', (req, res) => res.json({status: 'working'}));

app.listen(process.env.PORT, () => console.log(`server started on port ${process.env.PORT}`));