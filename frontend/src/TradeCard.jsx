import { useState, useEffect } from 'react'

function TradeCard({ trade }) {
  const [livePrice, setLivePrice] = useState(null)
  const [priceChange, setPriceChange] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/price/${trade.symbol}`)
      .then(res => res.json())
      .then(data => {
        setLivePrice(data.currentPrice)
        setPriceChange(data.percentChange)
      })
      .catch(() => console.log('Price fetch failed'))
  }, [trade.symbol])

  return (
    <div className="trade-card">
      <h3>{trade.symbol}</h3>
      <p>Type: <span className={trade.type === 'BUY' ? 'type-buy' : 'type-sell'}>{trade.type}</span></p>
      <p>Quantity: <span>{trade.quantity}</span></p>
      <p>Trade Price: <span>${trade.price}</span></p>
      <p>Live Price: <span className={livePrice ? 'live-price' : ''}>
        {livePrice ? `$${livePrice}` : 'Loading...'}
      </span></p>
      {priceChange !== null && (
        <p>Change: <span className={priceChange >= 0 ? 'type-buy' : 'type-sell'}>
          {priceChange >= 0 ? '+' : ''}{priceChange?.toFixed(2)}%
        </span></p>
      )}
      <p>Total: <span>${(trade.quantity * trade.price).toLocaleString()}</span></p>
      <p><span className={`status ${trade.status}`}>{trade.status}</span></p>
    </div>
  )
}

export default TradeCard