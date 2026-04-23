const mongoose = require('mongoose')

const tradeSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  type: { type: String, enum: ['BUY', 'SELL'], required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['executed', 'pending', 'failed'], 
    required: true 
  }
}, { timestamps: true })

module.exports = mongoose.model('Trade', tradeSchema)