// src/pages/LocationSensorsPage.jsx
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLocationById, getSensorsByLocation } from '../services/openaqApi'
import SensorsTable from '../components/SensorsTable'
import StatusMessage from '../components/StatusMessage'

export default function LocationSensorsPage() {
  const { locationId } = useParams()
  const [location, setLocation] = useState(null)
  const [sensors, setSensors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function fetchData() {
      try {
        setLoading(true)
        const [locationData, sensorsData] = await Promise.all([
          getLocationById(locationId),
          getSensorsByLocation(locationId),
        ])
        if (active) {
          setLocation(locationData.results?.[0] ?? null)
          setSensors(sensorsData.results ?? [])
          setError(null)
        }
      } catch (err) {
        if (active) setError('No se pudo obtener la información de la estación.')
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchData()
    return () => {
      active = false
    }
  }, [locationId])

  return (
    <div className="page">
      <Link to="/estaciones" className="link-inline">
        ← Volver a estaciones
      </Link>

      <div className="section-heading">
        <h1>{location ? location.name : `Estación #${locationId}`}</h1>
        <p>Sensores registrados en esta estación de monitoreo.</p>
      </div>

      <StatusMessage loading={loading} error={error} />

      {!loading && !error && (
        <SensorsTable sensors={sensors} locationId={locationId} />
      )}
    </div>
  )
}
