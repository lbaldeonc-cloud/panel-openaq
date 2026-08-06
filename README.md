# Panel de monitoreo ambiental — React + OpenAQ

Dashboard que consume la API REST v3 de [OpenAQ](https://openaq.org/) para
navegar jerárquicamente por estaciones de monitoreo, sus sensores y las
mediciones de calidad del aire que registran.

## Stack

- React 19 + Vite
- React Router DOM (rutas dinámicas con parámetros)
- Componentes funcionales y comunicación por props
- Capa de servicios separada (`src/services/openaqApi.js`)
- Proxy de Vite para desarrollo (evita CORS y oculta la API key del bundle del cliente)
- CSS responsivo (móvil / tablet / escritorio)

## Estructura del proyecto

```
src/
├── components/
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── SummaryCards.jsx
│   ├── LocationsTable.jsx
│   ├── SensorsTable.jsx
│   ├── MeasurementsTable.jsx
│   └── StatusMessage.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── LocationsPage.jsx
│   ├── LocationSensorsPage.jsx
│   └── SensorMeasurementsPage.jsx
├── services/
│   └── openaqApi.js
├── App.jsx
├── App.css
└── main.jsx
```

## Rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | `HomePage` | Resumen general e indicadores clave |
| `/estaciones` | `LocationsPage` | Listado completo de estaciones |
| `/estaciones/:locationId/sensores` | `LocationSensorsPage` | Sensores de una estación |
| `/estaciones/:locationId/sensores/:sensorId/mediciones` | `SensorMeasurementsPage` | Mediciones de un sensor |

## Puesta en marcha

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Obtener una API key gratuita en <https://explore.openaq.org/register> y
   crear un archivo `.env` en la raíz (basado en `.env.example`):

   ```bash
   cp .env.example .env
   ```

   ```
   OPENAQ_API_KEY=tu_api_key_aqui
   ```

3. Ejecutar en modo desarrollo:

   ```bash
   npm run dev
   ```

   El servidor de Vite expone las peticiones a `/api/...`, las reenvía a
   `https://api.openaq.org/v3` y agrega la cabecera `X-API-Key` en el
   servidor (ver `vite.config.js`), de modo que la key nunca se expone en
   el código del navegador.

4. Compilar para producción:

   ```bash
   npm run build
   ```

## Notas

- Por defecto las consultas de ubicaciones se filtran por `country_iso=EC`;
  puede modificarse en `HomePage.jsx` / `LocationsPage.jsx`.
- Al desplegar en un hosting estático (sin servidor propio), el proxy de
  desarrollo no aplica: para producción se necesitaría una función serverless
  o backend propio que agregue la cabecera `X-API-Key`.
