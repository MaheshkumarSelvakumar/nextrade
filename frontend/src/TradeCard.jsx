function TradeCard({ trade }) {
  return (
    <div className="trade-card">
      <h3>{trade.symbol}</h3>
      <p>Type: <span className={trade.type === 'BUY' ? 'type-buy' : 'type-sell'}>{trade.type}</span></p>
      <p>Quantity: <span>{trade.quantity}</span></p>
      <p>Price: <span>${trade.price}</span></p>
      <p>Total: <span>${(trade.quantity * trade.price).toLocaleString()}</span></p>
      <p><span className={`status ${trade.status}`}>{trade.status}</span></p>
    </div>
  )
}

export default TradeCard