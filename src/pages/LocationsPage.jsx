// src/pages/LocationsPage.jsx
import { useEffect, useState } from 'react'
import { getLocations } from '../services/openaqApi'
import LocationsTable from '../components/LocationsTable'
import StatusMessage from '../components/StatusMessage'

export default function LocationsPage() {
  const [locations, setLocations] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function fetchData() {
      try {
        setLoading(true)
        const data = await getLocations({ limit: 15, page, country_iso: 'EC' })
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
  }, [page])

  return (
    <div className="page">
      <div className="section-heading">
        <h1>Estaciones de monitoreo</h1>
        <p>Selecciona una estación para ver sus sensores.</p>
      </div>

      <StatusMessage loading={loading} error={error} />

      {!loading && !error && (
        <>
          <LocationsTable locations={locations} />

          <div className="pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← Anterior
            </button>
            <span>Página {page}</span>
            <button type="button" onClick={() => setPage((p) => p + 1)}>
              Siguiente →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
