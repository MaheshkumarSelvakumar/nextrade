import TradeCard from './TradeCard'

function TradeList({ trades }) {
  return (
    <div>
      <div className="trade-grid">
        {trades.map(trade => (
          <TradeCard key={trade._id} trade={trade} />
        ))}
      </div>
    </div>
  )
}

export default TradeList