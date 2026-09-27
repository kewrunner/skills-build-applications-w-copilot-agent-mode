import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
]

function Dashboard() {
  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <h5 className="card-title text-uppercase text-muted">OctoFit Tracker</h5>
              <h2 className="mt-3">Wellness and performance dashboard</h2>
              <p className="text-secondary mt-3 mb-0">
                Track athlete progress, team activity, and workout plans in one streamlined app.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm h-100 border-0 bg-primary-subtle">
            <div className="card-body">
              <h5 className="text-uppercase text-primary-emphasis">This week</h5>
              <div className="display-6 fw-bold mt-3">92%</div>
              <p className="text-primary-emphasis mb-0">Participation rate across all squads</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav ms-auto flex-row flex-wrap gap-2">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => `nav-link px-3 rounded ${isActive ? 'bg-light text-dark' : 'text-white-50'}`}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
