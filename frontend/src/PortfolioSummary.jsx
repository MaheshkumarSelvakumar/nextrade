function PortfolioSummary({ trades }) {
  const totalValue = trades.reduce(
    (sum, trade) => sum + (trade.quantity * trade.price), 0
  )

  const executedCount = trades.filter(t => t.status === 'executed').length
  const pendingCount = trades.filter(t => t.status === 'pending').length
  const failedCount = trades.filter(t => t.status === 'failed').length

  return (
    <div className="summary">
      <div className="summary-card">
        <h3>Total Value</h3>
        <p>${totalValue.toLocaleString()}</p>
      </div>
      <div className="summary-card">
        <h3>Executed</h3>
        <p>{executedCount}</p>
      </div>
      <div className="summary-card">
        <h3>Pending</h3>
        <p>{pendingCount}</p>
      </div>
      <div className="summary-card">
        <h3>Failed</h3>
        <p>{failedCount}</p>
      </div>
    </div>
  )
}

export default PortfolioSummary