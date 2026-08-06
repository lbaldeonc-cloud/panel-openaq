// src/components/SensorsTable.jsx
import { Link } from 'react-router-dom'

export default function SensorsTable({ sensors, locationId }) {
  if (!sensors || sensors.length === 0) {
    return <p className="empty-state">Esta estación no tiene sensores registrados.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Sensor</th>
            <th>Parámetro</th>
            <th>Unidad</th>
            <th>Última lectura</th>
          </tr>
        </thead>
        <tbody>
          {sensors.map((sensor) => (
            <tr key={sensor.id}>
              <td>{sensor.id}</td>
              <td>
                <Link
                  to={`/estaciones/${locationId}/sensores/${sensor.id}/mediciones`}
                  className="table-link"
                >
                  {sensor.name}
                </Link>
              </td>
              <td>{sensor.parameter?.displayName ?? sensor.parameter?.name}</td>
              <td>{sensor.parameter?.units ?? '—'}</td>
              <td>{sensor.latest?.value ?? 'Sin datos recientes'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
