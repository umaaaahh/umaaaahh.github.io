// ─────────────────────────────────────────────
//  HERD SAFETY — Lighting Layer
//  Pulls two datasets:
//    1. Street lights with lux levels (council)
//    2. Feature lighting (wattage + type)
//  Merges them and renders a warm glow layer.
//  Only visible in NIGHT mode.
// ─────────────────────────────────────────────

class LightingLayer {
  constructor(map) {
    this.map = map;
    this.sourceId = 'lighting-source';
    this.glowLayerId = 'lighting-glow';
    this.pointLayerId = 'lighting-points';
  }

  async fetchLux() {
    try {
      const res = await fetch(CONFIG.LIGHTING_API);
      const json = await res.json();
      return (json.results || []).map(r => ({
        lon: r.geo_point_2d?.lon,
        lat: r.geo_point_2d?.lat,
        lux: parseFloat(r.label) || 0,
        type: 'street',
        source: 'council',
      })).filter(d => d.lat && d.lon);
    } catch (err) {
      console.error('[LightingLayer] Lux fetch failed:', err);
      return [];
    }
  }

  async fetchFeature() {
    try {
      const res = await fetch(CONFIG.FEATURE_LIGHTING_API);
      const json = await res.json();
      return (json.results || []).map(r => ({
        lon: r.geo_point_2d?.lon,
        lat: r.geo_point_2d?.lat,
        wattage: parseFloat(r.lamp_rating_w) || 0,
        type: r.light_type || 'feature',
        source: 'feature',
        // Rough lux proxy from wattage (LED ~100lm/W, lux at ~5m distance)
        lux: Math.round((parseFloat(r.lamp_rating_w) || 0) * 0.8),
      })).filter(d => d.lat && d.lon);
    } catch (err) {
      console.error('[LightingLayer] Feature fetch failed:', err);
      return [];
    }
  }

  classifyLux(lux) {
    if (lux >= CONFIG.LUX_BRIGHT) return 'bright';
    if (lux >= CONFIG.LUX_DIM) return 'moderate';
    return 'dim';
  }

  getLuxColor(lux) {
    // Warm amber to cool white gradient based on brightness
    if (lux >= CONFIG.LUX_BRIGHT) return '#FFF5C0'; // bright warm white
    if (lux >= CONFIG.LUX_DIM) return '#FFD97D';    // amber
    return '#FF9B3C';                                 // dim orange
  }

  buildGeoJSON(lights) {
    return {
      type: 'FeatureCollection',
      features: lights.map(d => ({
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [d.lon, d.lat] },
        properties: {
          lux: d.lux,
          type: d.type,
          source: d.source,
          brightness: this.classifyLux(d.lux),
          color: this.getLuxColor(d.lux),
          // Glow radius scales with lux
          glow_radius: Math.max(8, Math.min(d.lux * 2, 40)),
        },
      })),
    };
  }

  async fetch() {
    const [luxLights, featureLights] = await Promise.all([
      this.fetchLux(),
      this.fetchFeature(),
    ]);
    this.lights = [...luxLights, ...featureLights];
    return this.lights;
  }

  addToMap() {
    const geojson = this.buildGeoJSON(this.lights);

    if (this.map.getSource(this.sourceId)) {
      this.map.getSource(this.sourceId).setData(geojson);
      return;
    }

    this.map.addSource(this.sourceId, { type: 'geojson', data: geojson });

    // Soft glow halo (wide, low opacity)
    this.map.addLayer({
      id: this.glowLayerId,
      type: 'circle',
      source: this.sourceId,
      paint: {
        'circle-radius': ['get', 'glow_radius'],
        'circle-color': ['get', 'color'],
        'circle-opacity': 0.08,
        'circle-blur': 1,
        'circle-stroke-width': 0,
      },
    });

    // Tight light point
    this.map.addLayer({
      id: this.pointLayerId,
      type: 'circle',
      source: this.sourceId,
      paint: {
        'circle-radius': 3,
        'circle-color': ['get', 'color'],
        'circle-opacity': 0.7,
        'circle-stroke-width': 0,
      },
    });

    // Popup on click
    this.map.on('click', this.pointLayerId, e => {
      const props = e.features[0].properties;
      new mapboxgl.Popup({ className: 'herd-popup' })
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(`
          <div class="popup-content">
            <div class="popup-sensor">${props.type} light</div>
            <div class="popup-label">
              ${props.lux > 0 ? `${props.lux} lux — ${props.brightness}` : 'Wattage-only data'}
            </div>
            <div class="popup-hint">${props.source === 'council' ? 'Council street light' : 'Feature lighting'}</div>
          </div>
        `)
        .addTo(this.map);
    });
  }

  setVisible(visible) {
    if (!this.map.getLayer(this.glowLayerId)) return;
    const v = visible ? 'visible' : 'none';
    this.map.setLayoutProperty(this.glowLayerId, 'visibility', v);
    this.map.setLayoutProperty(this.pointLayerId, 'visibility', v);
  }

  async init() {
    await this.fetch();
    this.addToMap();
  }
}