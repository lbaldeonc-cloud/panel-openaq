// src/components/MeasurementsTable.jsx
export default function MeasurementsTable({ measurements }) {
  if (!measurements || measurements.length === 0) {
    return <p className="empty-state">No hay mediciones disponibles para este sensor.</p>
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>Fecha (UTC)</th>
            <th>Valor</th>
            <th>Unidad</th>
            <th>Parámetro</th>
          </tr>
        </thead>
        <tbody>
          {measurements.map((m, index) => (
            <tr key={`${m.period?.datetimeFrom?.utc ?? index}-${index}`}>
              <td>{m.period?.datetimeFrom?.utc ?? 'No disponible'}</td>
              <td>{m.value}</td>
              <td>{m.parameter?.units ?? '—'}</td>
              <td>{m.parameter?.displayName ?? m.parameter?.name ?? '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
