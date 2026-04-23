require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const axios = require('axios')
const Trade = require('./models/Trade')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB error:', err))

// GET all trades
app.get('/api/trades', async (req, res) => {
  try {
    const trades = await Trade.find()
    res.json(trades)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// GET single trade
app.get('/api/trades/:id', async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id)
    if (!trade) return res.status(404).json({ message: 'Trade not found' })
    res.json(trade)
  } catch {
    res.status(500).json({ message: 'Server error' })
  }
})

// POST — create new trade
app.post('/api/trades', async (req, res) => {
  try {
    const trade = new Trade(req.body)
    await trade.save()
    res.status(201).json(trade)
  } catch {
    res.status(400).json({ message: 'Invalid trade data' })
  }
})

// GET live price for a symbol
app.get('/api/price/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params
    const response = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${process.env.FINNHUB_API_KEY}`
    )
    res.json({
      symbol,
      currentPrice: response.data.c,
      change: response.data.d,
      percentChange: response.data.dp
    })
  } catch {
    res.status(500).json({ message: 'Failed to fetch price' })
  }
})

app.listen(PORT, () => {
  console.log(`NexTrade server running on http://localhost:${PORT}`)
})