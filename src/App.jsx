import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import ServicesManager from './components/ServicesManager'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'services' && <ServicesManager />}
        {activeTab !== 'dashboard' && activeTab !== 'services' && (
          <div className="empty-state animate-fade-in">
            <h2>Feature Coming Soon</h2>
            <p>This section is under development.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
