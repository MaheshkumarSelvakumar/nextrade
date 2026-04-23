import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import TradeList from './TradeList'
import PortfolioSummary from './PortfolioSummary'
import AddTradeForm from './AddTradeForm'

function App() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortByValue, setSortByValue] = useState(false)
  const [tradeData, setTradeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/trades')
      .then(res => res.json())
      .then(data => {
        setTradeData(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to fetch trades. Is the server running?')
        setLoading(false)
      })
  }, [])

  const handleTradeAdded = newTrade => {
    setTradeData([...tradeData, newTrade])
  }

  let filteredTrades = filter === 'all'
    ? tradeData
    : tradeData.filter(trade => trade.status === filter)

  if (search) {
    filteredTrades = filteredTrades.filter(trade =>
      trade.symbol.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (sortByValue) {
    filteredTrades = [...filteredTrades].sort(
      (a, b) => (b.quantity * b.price) - (a.quantity * a.price)
    )
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        {loading ? (
          <div className="loading">
            <p>Fetching trades from market...</p>
          </div>
        ) : error ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <PortfolioSummary trades={tradeData} />
            <AddTradeForm onTradeAdded={handleTradeAdded} />
            <div className="toolbar">
              <input
                type="text"
                placeholder="Search symbol e.g. AAPL"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-input"
              />
              <button
                className={sortByValue ? 'active' : ''}
                onClick={() => setSortByValue(!sortByValue)}>
                {sortByValue ? 'Sorted by Value ↓' : 'Sort by Value'}
              </button>
            </div>
            <div className="filters">
              <button
                className={filter === 'all' ? 'active' : ''}
                onClick={() => setFilter('all')}>All</button>
              <button
                className={filter === 'executed' ? 'active' : ''}
                onClick={() => setFilter('executed')}>Executed</button>
              <button
                className={filter === 'pending' ? 'active' : ''}
                onClick={() => setFilter('pending')}>Pending</button>
              <button
                className={filter === 'failed' ? 'active' : ''}
                onClick={() => setFilter('failed')}>Failed</button>
            </div>
            <TradeList trades={filteredTrades} />
          </>
        )}
      </div>
    </div>
  )
}

export default App