import express from 'express'
import cors from 'cors'
import { upload, list } from './service/ar.js'
import fs from 'fs'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/upload', async (req, res) => {
  const key = JSON.parse(fs.readFileSync('./wallet.json').toString())
  try {
    const data = {
      in: req.body.in,
      conv2d_weights: req.body.conv2d_weights,
      conv2d_bias: req.body.conv2d_bias,
      batch_normalization_a: req.body.batch_normalization_a,
      dense_weights: req.body.dense_weights,
      dense_bias: req.body.dense_bias,
    }
    const response = await upload(data, key, 'mainnet')
    res.send(response)
  } catch (e) {
    res.send(`Error: ${e}`)
  }
})

app.post('/uploadTest', async (req, res) => {
  const key = JSON.parse(fs.readFileSync('./wallet.json').toString())
  try {
    const data = {
      in: req.body.in,
      conv2d_weights: req.body.conv2d_weights,
      conv2d_bias: req.body.conv2d_bias,
      batch_normalization_a: req.body.batch_normalization_a,
      dense_weights: req.body.dense_weights,
      dense_bias: req.body.dense_bias,
    }
    const response = await upload(data, key, 'local')
    res.send(response)
  } catch (e) {
    res.send(`Error: ${e}`)
  }
})

app.get('/uploadExample', async (req, res) => {
  const key = JSON.parse(fs.readFileSync('./wallet.json').toString())
  const data = JSON.parse(fs.readFileSync('./src/resource/model.json').toString())
  const tx = await upload(data, key, 'local')
  res.send(JSON.parse(tx))
})

app.post('/list', async (req, res) => {
  const data = req.body
  const response = await list(data.priv, data.name, data.url)
  res.send(response)
})
  app.listen(8080)
