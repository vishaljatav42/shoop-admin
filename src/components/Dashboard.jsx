import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CalendarCheck, Users, TrendingUp, RefreshCw, ArchiveRestore } from 'lucide-react'

const Dashboard = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchBookings = async () => {
    try {
      setIsRefreshing(true)
      const response = await axios.get('http://localhost:5000/api/bookings')
      setBookings(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching bookings:', err)
      setError('Failed to load bookings. Make sure the backend server is running.')
    } finally {
      setLoading(false)
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const totalBookings = bookings.length
  const todayBookings = bookings.filter(b => {
    const today = new Date().toISOString().split('T')[0]
    // Assuming backend returns date string like YYYY-MM-DD or we can try formatting
    // A simple approximation for "recent" or matching today's date based on createdAt
    if (b.createdAt) {
      return b.createdAt.startsWith(today)
    }
    return false
  }).length

  return (
    <div className="animate-fade-in">
      <div className="header">
        <h1 className="header-title">Dashboard Overview</h1>
        <div className="header-actions">
          <button 
            className="btn btn-outline" 
            onClick={fetchBookings}
            disabled={isRefreshing}
          >
            <RefreshCw size={18} className={isRefreshing ? 'loader' : ''} />
            Refresh
          </button>
          <button className="btn btn-primary">
            Export Data
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon-wrapper blue">
            <CalendarCheck size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-label">Total Bookings</div>
            <div className="metric-value">{loading ? '-' : totalBookings}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper green">
            <TrendingUp size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-label">New Today</div>
            <div className="metric-value">{loading ? '-' : todayBookings}</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrapper orange">
            <Users size={24} />
          </div>
          <div className="metric-content">
            <div className="metric-label">Active Customers</div>
            <div className="metric-value">{loading ? '-' : new Set(bookings.map(b => b.phone)).size}</div>
          </div>
        </div>
      </div>

      <div className="glass-panel">
        <div className="panel-header">
          <h2 className="panel-title">Recent Bookings</h2>
        </div>
        
        {loading ? (
          <div className="empty-state">
            <div className="loader" style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: '#3b82f6', width: '32px', height: '32px', marginBottom: '16px' }}></div>
            <p>Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <p style={{ color: 'var(--danger)' }}>{error}</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <ArchiveRestore className="empty-icon" />
            <h3>No Bookings Found</h3>
            <p>Waiting for new customers to book services.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Address</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr 
                    key={booking._id} 
                    style={{ 
                      animation: `fadeIn 0.5s ease forwards`,
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0 
                    }}
                  >
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>{booking.name}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{booking.phone}</div>
                    </td>
                    <td>
                      <span className="badge service">{booking.service}</span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{booking.date}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{booking.time}</div>
                    </td>
                    <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={booking.address}>
                      {booking.address}
                    </td>
                    <td>
                      <span className="badge status-confirmed">Confirmed</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
