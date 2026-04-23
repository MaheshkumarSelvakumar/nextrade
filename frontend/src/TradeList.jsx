import TradeCard from './TradeCard'

function TradeList({ trades, livePrices }) {
  return (
    <div>
      <div className="trade-grid">
        {trades.map(trade => (
          <TradeCard
            key={trade._id}
            trade={trade}
            livePrice={livePrices[trade.symbol]}
          />
        ))}
      </div>
    </div>
  )
}

export default TradeList