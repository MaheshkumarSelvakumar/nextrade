import { useState } from 'react'

function AddTradeForm({ onTradeAdded }) {
  const [formData, setFormData] = useState({
    symbol: '',
    type: 'BUY',
    quantity: '',
    price: '',
    status: 'pending'
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('http://localhost:5000/api/trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
          price: Number(formData.price)
        })
      })

      const newTrade = await response.json()
      onTradeAdded(newTrade)
      setFormData({ symbol: '', type: 'BUY', quantity: '', price: '', status: 'pending' })
    } catch {
      console.log('Failed to add trade')
    }

    setSubmitting(false)
  }

  return (
    <div className="add-trade-form">
      <h2>Add New Trade</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            name="symbol"
            placeholder="Symbol e.g. AAPL"
            value={formData.symbol}
            onChange={handleChange}
            required
          />
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="BUY">BUY</option>
            <option value="SELL">SELL</option>
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="executed">Executed</option>
            <option value="failed">Failed</option>
          </select>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Adding...' : '+ Add Trade'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTradeForm