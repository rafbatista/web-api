const mongodb = require('mongodb')
const { MongoClient } = mongodb
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
        console.log(req.body)
        res.sendStatus(201)
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(500)
      })
  })
  app.get('/notes', (req, res) => {
    notes
      .find({})
      .toArray()
      .then(() => {
        console.log(req.body)
        res.sendStatus(200)
      })
      .catch(err => {
        console.error(err)
        res.sendStatus(404)
      })
      .then(() => db.close())
  })
  app.listen(3000, () => console.log('Post it'))
})
