require('dotenv').config()
const mongoose = require('mongoose')
const Trade = require('./models/Trade')

const trades = [
  // US Tech
  { symbol: "AAPL", type: "BUY", quantity: 100, price: 189.5, status: "executed" },
  { symbol: "AAPL", type: "SELL", quantity: 50, price: 192.0, status: "executed" },
  { symbol: "GOOGL", type: "BUY", quantity: 30, price: 140.0, status: "executed" },
  { symbol: "GOOGL", type: "SELL", quantity: 20, price: 138.5, status: "pending" },
  { symbol: "MSFT", type: "BUY", quantity: 200, price: 310.0, status: "executed" },
  { symbol: "MSFT", type: "SELL", quantity: 75, price: 315.0, status: "executed" },
  { symbol: "NVDA", type: "BUY", quantity: 50, price: 450.0, status: "executed" },
  { symbol: "NVDA", type: "BUY", quantity: 25, price: 460.0, status: "pending" },
  { symbol: "META", type: "BUY", quantity: 40, price: 320.0, status: "executed" },
  { symbol: "META", type: "SELL", quantity: 15, price: 318.0, status: "failed" },

  // US Finance
  { symbol: "JPM", type: "BUY", quantity: 60, price: 195.0, status: "executed" },
  { symbol: "JPM", type: "SELL", quantity: 30, price: 198.0, status: "pending" },
  { symbol: "GS", type: "BUY", quantity: 20, price: 380.0, status: "executed" },
  { symbol: "GS", type: "SELL", quantity: 10, price: 375.0, status: "failed" },
  { symbol: "BAC", type: "BUY", quantity: 150, price: 32.0, status: "executed" },
  { symbol: "MS", type: "BUY", quantity: 80, price: 88.0, status: "pending" },

  // US Energy & Others
  { symbol: "TSLA", type: "SELL", quantity: 75, price: 220.0, status: "failed" },
  { symbol: "TSLA", type: "BUY", quantity: 40, price: 215.0, status: "executed" },
  { symbol: "AMZN", type: "BUY", quantity: 30, price: 178.0, status: "pending" },
  { symbol: "AMZN", type: "BUY", quantity: 20, price: 180.0, status: "executed" },
  { symbol: "NFLX", type: "SELL", quantity: 25, price: 400.0, status: "executed" },
  { symbol: "NFLX", type: "BUY", quantity: 15, price: 395.0, status: "pending" },

  // Indian Markets
  { symbol: "INFY", type: "BUY", quantity: 500, price: 145.0, status: "executed" },
  { symbol: "INFY", type: "SELL", quantity: 200, price: 148.0, status: "executed" },
  { symbol: "TCS", type: "BUY", quantity: 100, price: 380.0, status: "executed" },
  { symbol: "TCS", type: "SELL", quantity: 50, price: 382.0, status: "pending" },
  { symbol: "WIPRO", type: "BUY", quantity: 300, price: 95.0, status: "executed" },
  { symbol: "HDFCBANK", type: "BUY", quantity: 150, price: 160.0, status: "failed" },
  { symbol: "RELIANCE", type: "BUY", quantity: 80, price: 245.0, status: "executed" },
  { symbol: "RELIANCE", type: "SELL", quantity: 40, price: 248.0, status: "pending" },

  // European Markets
  { symbol: "ASML", type: "BUY", quantity: 15, price: 680.0, status: "executed" },
  { symbol: "SAP", type: "BUY", quantity: 40, price: 175.0, status: "pending" },
  { symbol: "NESN", type: "SELL", quantity: 60, price: 105.0, status: "executed" },

  // Fixed Income / ETFs
  { symbol: "SPY", type: "BUY", quantity: 100, price: 450.0, status: "executed" },
  { symbol: "SPY", type: "SELL", quantity: 50, price: 452.0, status: "executed" },
  { symbol: "QQQ", type: "BUY", quantity: 75, price: 380.0, status: "pending" },
  { symbol: "BND", type: "BUY", quantity: 200, price: 72.0, status: "executed" },
  { symbol: "GLD", type: "BUY", quantity: 50, price: 185.0, status: "executed" },
  { symbol: "GLD", type: "SELL", quantity: 25, price: 187.0, status: "failed" }
]

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB')
    await Trade.deleteMany()
    await Trade.insertMany(trades)
    console.log(`${trades.length} trades seeded successfully!`)
    process.exit()
  })
  .catch(err => console.log(err))