// Set up a simple Express app that allows for the following:

// Variable routes that save data to a JSON file

// A route that allows the user to view the entire contents of the JSON file

// Push your app to Github using a Gitignore file that ignores your node_modules, 
// and submit the link to your repo via NYU Classes.

var express = require('express');

var app = express();

var fs = require('fs');

var cors = require('cors');
app.use(cors());

app.use(express.static('public'));


var fests;
var exists = fs.existsSync('fests.json');
if (exists) {
  console.log('loading fests.json file');
  var txt = fs.readFileSync('fests.json', 'utf8');
  fests = JSON.parse(txt);
} else {
  console.log('The file is empty');
  fests = {};
}


var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
  console.log('listening');
}


app.get('/add/:festival/:date', addFest);

function addFest(req, res) {

  var festival = req.params.festival;

  var date = req.params.date;

  fests[festival] = date;

  var reply = {
    status: 'success',
    festival: festival,
    date: date
  }

  console.log('adding: ' + JSON.stringify(reply));


  var json = JSON.stringify(fests, null, 2);
  fs.writeFile('fests.json', json, 'utf8', finished);
  function finished(err) {
    console.log('Finished writing fests.json file');
    res.send(reply);
  }
}


app.get('/all', showAll);

function showAll(req, res) {
  res.send(fests);
}