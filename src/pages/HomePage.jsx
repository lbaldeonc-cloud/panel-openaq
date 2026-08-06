// src/pages/HomePage.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getLocations } from '../services/openaqApi'
import SummaryCards from '../components/SummaryCards'
import LocationsTable from '../components/LocationsTable'
import StatusMessage from '../components/StatusMessage'

export default function HomePage() {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function fetchData() {
      try {
        setLoading(true)
        const data = await getLocations({ limit: 8, country_iso: 'EC' })
        if (active) {
          setLocations(data.results ?? [])
          setError(null)
        }
      } catch (err) {
        if (active) setError('No se pudo conectar con la API de OpenAQ.')
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchData()
    return () => {
      active = false
    }
  }, [])

  const stats = {
    totalLocations: locations.length,
    totalSensors: locations.reduce((acc, l) => acc + (l.sensors?.length ?? 0), 0),
    fixedLocations: locations.filter((l) => !l.isMobile).length,
    mobileLocations: locations.filter((l) => l.isMobile).length,
  }

  return (
    <div className="page">
      <section className="panel-hero">
        <div className="panel-hero__text">
          <p className="panel-hero__eyebrow">Panel principal</p>
          <h1>Monitoreo ambiental en tiempo real</h1>
          <p>
            Explora el estado general de las estaciones registradas y revisa
            los indicadores clave del sistema OpenAQ.
          </p>
        </div>
        <span className="panel-hero__badge">{stats.totalLocations} estaciones activas</span>
      </section>

      <StatusMessage loading={loading} error={error} />

      {!loading && !error && (
        <>
          <SummaryCards stats={stats} />

          <div className="section-heading">
            <h2>Resumen de estaciones</h2>
            <p>Vista rápida de las estaciones más relevantes registradas.</p>
            <Link to="/estaciones" className="link-inline">
              Ver todas las estaciones →
            </Link>
          </div>

          <LocationsTable locations={locations} />
        </>
      )}
    </div>
  )
}
