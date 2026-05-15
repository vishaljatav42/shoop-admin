import React from 'react'
import { LayoutDashboard, Users, Settings, CalendarCheck, Droplets, Tag } from 'lucide-react'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'All Bookings', icon: CalendarCheck },
    { id: 'services', label: 'Services', icon: Tag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <Droplets className="sidebar-brand-icon" size={28} />
        Clean & Care
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <div 
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
