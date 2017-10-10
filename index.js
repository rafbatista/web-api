const mongodb = require('mongodb')
const { MongoClient, ObjectId } = mongodb
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

MongoClient.connect('mongodb://localhost/note-taker', (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  const notes = db.collection('notes')
  app.post('/notes', (req, res) => {
    notes
      .insertOne(req.body)
      .then(() => {
        res.sendStatus(201)
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.get('/notes', (req, res) => {
    notes
      .find()
      .toArray()
      .then(result => {
        res.json(result)
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.put('/notes/:_id', (req, res) => {
    notes
      .updateOne({ _id: ObjectId(req.params._id) }, req.body)
      .then(result => {
        res.sendStatus(200)
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.delete('/notes/:_id', (req, res) => {
    notes
      .deleteOne({ _id: ObjectId(req.params._id) })
      .then(result => {
        res.sendStatus(202)
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.listen(3000, () => console.log('Port available'))
})
