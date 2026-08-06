// src/components/StatusMessage.jsx
export default function StatusMessage({ loading, error }) {
  if (loading) {
    return <p className="status-message">Cargando datos desde OpenAQ...</p>
  }
  if (error) {
    return <p className="status-message status-message--error">{error}</p>
  }
  return null
}
