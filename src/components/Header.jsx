// src/components/Header.jsx
export default function Header() {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__logo">AQ</span>
        <span className="app-header__title">Panel de calidad del aire</span>
      </div>
      <div className="app-header__user">
        <span className="app-header__avatar">CZ</span>
        <span className="app-header__username">Administrador</span>
      </div>
    </header>
  )
}
