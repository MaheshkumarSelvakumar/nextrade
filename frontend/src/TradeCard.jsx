function TradeCard({ trade, livePrice }) {
  return (
    <div className="trade-card">
      <h3>{trade.symbol}</h3>
      <p>Type: <span className={trade.type === 'BUY' ? 'type-buy' : 'type-sell'}>{trade.type}</span></p>
      <p>Quantity: <span>{trade.quantity}</span></p>
      <p>Trade Price: <span>${trade.price}</span></p>
      <p>Live Price: <span className={livePrice ? 'live-price' : ''}>
        {livePrice ? `$${livePrice.currentPrice}` : 'Loading...'}
      </span></p>
      {livePrice?.percentChange !== undefined && (
        <p>Change: <span className={livePrice.percentChange >= 0 ? 'type-buy' : 'type-sell'}>
          {livePrice.percentChange >= 0 ? '+' : ''}{livePrice.percentChange?.toFixed(2)}%
        </span></p>
      )}
      <p>Total: <span>${(trade.quantity * trade.price).toLocaleString()}</span></p>
      <p><span className={`status ${trade.status}`}>{trade.status}</span></p>
    </div>
  )
}

export default TradeCard