const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

// Our trade data living on the server
const trades = [
  { id: 1, symbol: "AAPL", type: "BUY", quantity: 100, price: 189.5, status: "executed" },
  { id: 2, symbol: "GOOGL", type: "SELL", quantity: 50, price: 140.0, status: "pending" },
  { id: 3, symbol: "MSFT", type: "BUY", quantity: 200, price: 310.0, status: "executed" },
  { id: 4, symbol: "TSLA", type: "SELL", quantity: 75, price: 220.0, status: "failed" },
  { id: 5, symbol: "AMZN", type: "BUY", quantity: 30, price: 178.0, status: "pending" },
  { id: 6, symbol: "INFY", type: "BUY", quantity: 500, price: 145.0, status: "executed" }
]

// GET all trades
app.get('/api/trades', (req, res) => {
  res.json(trades)
})

// GET single trade by id
app.get('/api/trades/:id', (req, res) => {
  const trade = trades.find(t => t.id === parseInt(req.params.id))
  if (!trade) return res.status(404).json({ message: 'Trade not found' })
  res.json(trade)
})

app.listen(PORT, () => {
  console.log(`NexTrade server running on http://localhost:${PORT}`)
})