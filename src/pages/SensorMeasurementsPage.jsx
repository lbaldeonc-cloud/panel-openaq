// src/pages/SensorMeasurementsPage.jsx
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSensorById, getMeasurementsBySensor } from '../services/openaqApi'
import MeasurementsTable from '../components/MeasurementsTable'
import StatusMessage from '../components/StatusMessage'

export default function SensorMeasurementsPage() {
  const { locationId, sensorId } = useParams()
  const [sensor, setSensor] = useState(null)
  const [measurements, setMeasurements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function fetchData() {
      try {
        setLoading(true)
        const [sensorData, measurementsData] = await Promise.all([
          getSensorById(sensorId),
          getMeasurementsBySensor(sensorId, { limit: 25 }),
        ])
        if (active) {
          setSensor(sensorData.results?.[0] ?? null)
          setMeasurements(measurementsData.results ?? [])
          setError(null)
        }
      } catch (err) {
        if (active) setError('No se pudieron obtener las mediciones del sensor.')
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchData()
    return () => {
      active = false
    }
  }, [sensorId])

  return (
    <div className="page">
      <Link to={`/estaciones/${locationId}/sensores`} className="link-inline">
        ← Volver a sensores
      </Link>

      <div className="section-heading">
        <h1>{sensor ? sensor.name : `Sensor #${sensorId}`}</h1>
        <p>
          {sensor?.parameter?.displayName
            ? `Mediciones de ${sensor.parameter.displayName} (${sensor.parameter.units})`
            : 'Mediciones registradas por este sensor.'}
        </p>
      </div>

      <StatusMessage loading={loading} error={error} />

      {!loading && !error && <MeasurementsTable measurements={measurements} />}
    </div>
  )
}
