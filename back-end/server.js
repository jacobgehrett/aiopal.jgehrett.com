const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/opal', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/horizonimages', validUser, async (req, res) => {
  const image = new hItem({
    name: req.body.name,
    path: req.body.path,
    user: req.user,
  });
  try {
    await image.save();
    res.send(image);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/groundimages', validUser, async (req, res) => {
  const image = new gItem({
    name: req.body.name,
    path: req.body.path,
    user: req.user,
  });
  try {
    await image.save();
    res.send(image);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const uploadH = multer({
  dest: '../front-end/public/himages/',
  limits: {
    fileSize: 50000000
  }
});

const uploadG = multer({
  dest: '../front-end/public/gimages/',
  limits: {
    fileSize: 50000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const horizonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: String,
  path: String,
});

const groundSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: String,
  path: String,
});

// Create a model for items in the museum.
const hItem = mongoose.model('hItem', horizonSchema);
const gItem = mongoose.model('gItem', groundSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/horizonphotos', uploadH.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/himages/" + req.file.filename
  });
});

app.post('/api/groundphotos', uploadG.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/gimages/" + req.file.filename
  });
});

// Get a list of all of the items in the museum.
app.get('/api/horizonImages', async (req, res) => {
  try {
    let items = await hItem.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/groundimages', async (req, res) => {
  try {
    let items = await gItem.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/horizonuserimages', validUser, async (req, res) => {
  try {
    let items = await hItem.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/grounduserimages', validUser, async (req, res) => {
  try {
    let items = await gItem.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/horizonimages/:id', validUser, async (req, res) => {
  try {
    await hItem.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/groundimages/:id', validUser, async (req, res) => {
  try {
    await gItem.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/horizonimages/:id', validUser, async (req, res) => {
  try {
    let item = await hItem.findOne({
      _id: req.params.id
    });
    item.name = req.body.name;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/groundimages/:id', validUser, async (req, res) => {
  try {
    let item = await gItem.findOne({
      _id: req.params.id
    });
    item.name = req.body.name;
    item.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// import the users module and setup its API path
app.use("/api/users", users.routes);

app.listen(3001, () => console.log('Server listening on port 3001!'));
