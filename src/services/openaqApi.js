// src/services/openaqApi.js
// Capa de servicios: centraliza toda la comunicación con la API de OpenAQ.
//
// - En desarrollo (npm run dev): las peticiones a "/api" pasan por el proxy
//   de Vite (ver vite.config.js), que agrega la cabecera X-API-Key en el
//   servidor. La key nunca viaja en el código del navegador.
// - En producción sin backend propio (build para GitHub Pages): no existe
//   servidor que agregue la cabecera, así que se llama directo a la API de
//   OpenAQ y la key se incluye en el bundle mediante VITE_OPENAQ_API_KEY.
//   Nota: en ese caso la key SÍ queda visible en el código del navegador.

const isDev = import.meta.env.DEV
const BASE_URL = isDev ? '/api' : 'https://api.openaq.org/v3'
const API_KEY = import.meta.env.VITE_OPENAQ_API_KEY

/**
 * Realiza un fetch a la API de OpenAQ y normaliza los errores.
 * @param {string} endpoint - ruta relativa, ej: "/locations"
 * @param {Object} params - query params opcionales
 */
async function request(endpoint, params = {}) {
  const url = new URL(BASE_URL + endpoint, window.location.origin)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  const headers = isDev ? {} : { 'X-API-Key': API_KEY ?? '' }
  const response = await fetch(url.toString(), { headers })

  if (!response.ok) {
    throw new Error(
      `Error ${response.status} al consultar OpenAQ: ${response.statusText}`
    )
  }

  const data = await response.json()
  return data
}

/**
 * Obtiene el listado de ubicaciones/estaciones de monitoreo.
 * @param {Object} options - { limit, page, country_iso, ... }
 */
export function getLocations(options = {}) {
  const { limit = 20, page = 1, ...rest } = options
  return request('/locations', { limit, page, ...rest })
}

/**
 * Obtiene el detalle de una ubicación puntual.
 * @param {number|string} locationId
 */
export function getLocationById(locationId) {
  return request(`/locations/${locationId}`)
}

/**
 * Obtiene los sensores que pertenecen a una ubicación.
 * @param {number|string} locationId
 */
export function getSensorsByLocation(locationId) {
  return request(`/locations/${locationId}/sensors`)
}

/**
 * Obtiene el detalle de un sensor puntual.
 * @param {number|string} sensorId
 */
export function getSensorById(sensorId) {
  return request(`/sensors/${sensorId}`)
}

/**
 * Obtiene las mediciones registradas por un sensor.
 * @param {number|string} sensorId
 * @param {Object} options - { limit, page, datetime_from, datetime_to }
 */
export function getMeasurementsBySensor(sensorId, options = {}) {
  const { limit = 50, page = 1, ...rest } = options
  return request(`/sensors/${sensorId}/measurements`, {
    limit,
    page,
    ...rest,
  })
}

export default {
  getLocations,
  getLocationById,
  getSensorsByLocation,
  getSensorById,
  getMeasurementsBySensor,
}
