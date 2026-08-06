// src/components/SummaryCards.jsx
// Componente puramente presentacional: recibe los datos por props.
export default function SummaryCards({ stats }) {
  const cards = [
    { label: 'Total de estaciones', value: stats.totalLocations, icon: '📍' },
    { label: 'Total de sensores', value: stats.totalSensors, icon: '🌿' },
    { label: 'Estaciones fijas', value: stats.fixedLocations, icon: '🏛️' },
    { label: 'Estaciones móviles', value: stats.mobileLocations, icon: '🚐' },
  ]

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div className="summary-card" key={card.label}>
          <span className="summary-card__icon">{card.icon}</span>
          <div>
            <p className="summary-card__label">{card.label}</p>
            <p className="summary-card__value">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
