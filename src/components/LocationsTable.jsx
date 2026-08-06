// src/components/LocationsTable.jsx
import { Link } from 'react-router-dom'

export default function LocationsTable({ locations }) {
  if (!locations || locations.length === 0) {
    return <p className="empty-state">No se encontraron estaciones.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Estación</th>
            <th>País</th>
            <th>Localidad</th>
            <th>Sensores</th>
            <th>Coordenadas</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc) => (
            <tr key={loc.id}>
              <td>{loc.id}</td>
              <td>
                <Link to={`/estaciones/${loc.id}/sensores`} className="table-link">
                  {loc.name}
                </Link>
              </td>
              <td>{loc.country?.name ?? 'No disponible'}</td>
              <td>{loc.locality ?? 'No disponible'}</td>
              <td>{loc.sensors?.length ?? 0}</td>
              <td>
                {loc.coordinates
                  ? `${loc.coordinates.latitude?.toFixed(4)}, ${loc.coordinates.longitude?.toFixed(4)}`
                  : 'No disponible'}
              </td>
              <td>
                <span
                  className={
                    loc.isMobile ? 'badge badge--mobile' : 'badge badge--fixed'
                  }
                >
                  {loc.isMobile ? 'Móvil' : 'Fija'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
