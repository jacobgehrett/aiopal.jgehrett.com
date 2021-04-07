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
  useNewUrlParser: true
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/horizonImages', async (req, res) => {
  const image = new hItem({
    name: req.body.name,
    path: req.body.path,
  });
  try {
    await image.save();
    res.send(image);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/groundImages', async (req, res) => {
  const image = new gItem({
    name: req.body.name,
    path: req.body.path,
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
  dest: '../front-end/public/hImages/',
  limits: {
    fileSize: 10000000
  }
});

const uploadG = multer({
  dest: '../front-end/public/gImages/',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for items in the museum: a title and a path to an image.
const horizonSchema = new mongoose.Schema({
  name: String,
  path: String,
});

const groundSchema = new mongoose.Schema({
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
    path: "/hImages/" + req.file.filename
  });
});

app.post('/api/groundphotos', uploadG.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/gImages/" + req.file.filename
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

app.get('/api/groundImages', async (req, res) => {
  try {
    let items = await gItem.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/horizonImages/:id', async (req, res) => {
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

app.delete('/api/groundImages/:id', async (req, res) => {
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

app.put('/api/horizonImages/:id', async (req, res) => {
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

app.put('/api/groundImages/:id', async (req, res) => {
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

app.listen(3001, () => console.log('Server listening on port 3001!'));
