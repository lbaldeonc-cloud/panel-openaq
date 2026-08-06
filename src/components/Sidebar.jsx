// src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
          }
        >
          Inicio
        </NavLink>
        <NavLink
          to="/estaciones"
          className={({ isActive }) =>
            isActive ? 'sidebar__link sidebar__link--active' : 'sidebar__link'
          }
        >
          Estaciones
        </NavLink>
      </nav>
      <div className="sidebar__footer">
        Aplicaciones Telemáticas
        <br />
        UTPL
      </div>
    </aside>
  )
}
