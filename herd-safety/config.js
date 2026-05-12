// ─────────────────────────────────────────────
//  HERD SAFETY — Config
//  Replace MAPBOX_TOKEN before running.
//  Do NOT commit this file if you add your real token.
// ─────────────────────────────────────────────

const CONFIG = {
  // MAPBOX_TOKEN: 'pk.eyJ1IjoidW1hYnJpZGdlcyIsImEiOiJjbWdlbHM5YTkwdjRnMm1vN2M5MHI4ZWU4In0.VSHdE_aN47-FgZXo2-AsNg', // local only — gitignored

  // Melbourne CBD centre
  MAP_CENTER: [144.9631, -37.8136],
  MAP_ZOOM: 14.5,

  // City of Melbourne Open Data — Past Hour (per minute, directional, updates every 15 min)
  PEDESTRIAN_API:
    'https://melbournetestbed.opendatasoft.com/api/explore/v2.1/catalog/datasets/pedestrian-counting-system-past-hour-counts-per-minute/records?limit=100&order_by=sensing_date%20DESC',

  // Sensor locations (lat/lon + status)
  SENSOR_LOCATIONS_API:
    'https://melbournetestbed.opendatasoft.com/api/explore/v2.1/catalog/datasets/pedestrian-counting-system-sensor-locations/records?limit=100',

  // Street lights with lux levels (council-owned)
  LIGHTING_API:
    'https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/street-lights-with-emitted-lux-level-council-owned-lights-only/records?limit=100',

  // Feature lighting (wattage, type, location)
  FEATURE_LIGHTING_API:
    'https://data.melbourne.vic.gov.au/api/explore/v2.1/catalog/datasets/feature-lighting-including-light-type-wattage-and-location/records?limit=100',

  // How often to refresh pedestrian data (ms)
  REFRESH_INTERVAL: 15 * 60 * 1000, // 15 minutes

  // Thresholds for pedestrian count classification
  COUNT_HIGH: 300,   // "gold" — very busy
  COUNT_MED: 100,    // "amber" — moderate
  COUNT_LOW: 30,     // "dim" — quiet

  // Lux thresholds for lighting classification
  LUX_BRIGHT: 15,
  LUX_DIM: 5,
};