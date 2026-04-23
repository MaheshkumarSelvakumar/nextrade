require('dotenv').config()
const mongoose = require('mongoose')
const Trade = require('./models/Trade')

const trades = [
  { symbol: "AAPL", type: "BUY", quantity: 100, price: 189.5, status: "executed" },
  { symbol: "GOOGL", type: "SELL", quantity: 50, price: 140.0, status: "pending" },
  { symbol: "MSFT", type: "BUY", quantity: 200, price: 310.0, status: "executed" },
  { symbol: "TSLA", type: "SELL", quantity: 75, price: 220.0, status: "failed" },
  { symbol: "AMZN", type: "BUY", quantity: 30, price: 178.0, status: "pending" },
  { symbol: "INFY", type: "BUY", quantity: 500, price: 145.0, status: "executed" }
]

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB')
    await Trade.deleteMany()
    await Trade.insertMany(trades)
    console.log('Trades seeded successfully!')
    process.exit()
  })
  .catch(err => console.log(err))