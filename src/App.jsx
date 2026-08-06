// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import HomePage from './pages/HomePage'
import LocationsPage from './pages/LocationsPage'
import LocationSensorsPage from './pages/LocationSensorsPage'
import SensorMeasurementsPage from './pages/SensorMeasurementsPage'
import './App.css'

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Header />
        <main className="app-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/estaciones" element={<LocationsPage />} />
            <Route
              path="/estaciones/:locationId/sensores"
              element={<LocationSensorsPage />}
            />
            <Route
              path="/estaciones/:locationId/sensores/:sensorId/mediciones"
              element={<SensorMeasurementsPage />}
            />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
