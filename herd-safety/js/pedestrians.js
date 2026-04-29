// ─────────────────────────────────────────────
//  HERD SAFETY — Pedestrian Layer
//  Fetches the Melbourne "Past Hour" per-minute
//  directional sensor data, aggregates it per
//  sensor location, and renders Mapbox markers.
//
//  Loitering proxy logic:
//    flow_ratio = |dir1 - dir2| / (dir1 + dir2)
//    If total count is low but ratio is near 0
//    (roughly equal in both directions = people
//    milling, not flowing), flag as STATIONARY.
//    This is a proxy — sensors can't see standstill.
// ─────────────────────────────────────────────

class PedestrianLayer {
  constructor(map) {
    this.map = map;
    this.markers = [];
    this.data = [];
    this.mode = 'night'; // 'night' | 'day'
    this.sourceId = 'pedestrian-source';
    this.layerId = 'pedestrian-layer';
    this.heatLayerId = 'pedestrian-heat';
  }

  async fetch() {
    try {
      // Step 1: fetch sensor locations (has the coords)
      const locRes = await fetch(CONFIG.SENSOR_LOCATIONS_API);
      const locJson = await locRes.json();
      const locations = {};
      for (const r of (locJson.results || [])) {
        // Coerce ID to string so numeric keys always match
        const id = String(r.sensor_id ?? r.location_id ?? r.id ?? '');
        if (!id) continue;
        locations[id] = {
          // Try every possible coord field name
          lon: r.longitude ?? r.location?.lon ?? r.geo_point_2d?.lon ?? r.long ?? r.lon,
          lat: r.latitude  ?? r.location?.lat ?? r.geo_point_2d?.lat ?? r.lat,
          sensor_name: r.sensor_description ?? r.sensor_name ?? r.name ?? `Sensor ${id}`,
        };
      }

      console.log('[PedestrianLayer] Sensor locations loaded:', Object.keys(locations).length);
      const sampleLoc = Object.values(locations)[0];
      console.log('[PedestrianLayer] Sample location entry:', sampleLoc);
      console.log('[PedestrianLayer] Sample location keys:', Object.keys(locJson.results?.[0] || {}));

      // Step 2: fetch past-hour counts
      const countRes = await fetch(CONFIG.PEDESTRIAN_API);
      const countJson = await countRes.json();
      const records = countJson.results || [];

      console.log('[PedestrianLayer] Count records returned:', records.length);
      if (records.length > 0) console.log('[PedestrianLayer] Sample count record:', records[0]);

      // Step 3: aggregate per sensor, joining on string-coerced ID
      const byLocation = {};
      for (const r of records) {
        const id = String(r.sensor_id ?? r.location_id ?? r.id ?? '');
        if (!id) continue;

        const loc = locations[id] || {};

        if (!byLocation[id]) {
          byLocation[id] = {
            location_id: id,
            sensor_name: loc.sensor_name ?? r.sensor_name ?? `Sensor ${id}`,
            lon: loc.lon,
            lat: loc.lat,
            total_count: 0,
            direction_1: 0,
            direction_2: 0,
            readings: 0,
          };
        }
        // API returns total_of_directions OR direction_1+direction_2
        const d1 = r.direction_1 || 0;
        const d2 = r.direction_2 || 0;
        const total = r.total_of_directions ?? (d1 + d2);
        byLocation[id].total_count += total;
        byLocation[id].direction_1 += d1;
        byLocation[id].direction_2 += d2;
        byLocation[id].readings++;
      }

      this.data = Object.values(byLocation).filter(d => d.lat && d.lon);
      console.log('[PedestrianLayer] Sensors with coords after join:', this.data.length);
      if (this.data.length === 0) {
        console.warn('[PedestrianLayer] Zero coords matched — location ID mismatch likely. Location keys sample:', Object.keys(locations).slice(0, 5), '| Count IDs sample:', records.slice(0, 5).map(r => String(r.sensor_id ?? r.location_id ?? r.id)));
      }
      return this.data;
    } catch (err) {
      console.error('[PedestrianLayer] Fetch failed:', err);
      return [];
    }
  }

  // Flow ratio: 0 = perfectly bidirectional (possible loitering signal)
  //             1 = all one direction (clear movement)
  getFlowRatio(d) {
    const total = d.direction_1 + d.direction_2;
    if (total === 0) return null;
    return Math.abs(d.direction_1 - d.direction_2) / total;
  }

  // Zone classification depends on current mode
  classify(d) {
    const count = d.total_count;
    const flow = this.getFlowRatio(d);

    // Loitering proxy: low flow ratio + moderate count
    const possibleLoitering =
      flow !== null && flow < 0.2 && count > CONFIG.COUNT_LOW && count < CONFIG.COUNT_HIGH;

    if (this.mode === 'night') {
      // Night: busy = safe (gold), quiet = grey, loitering = amber warning
      if (possibleLoitering) return 'loitering';
      if (count >= CONFIG.COUNT_HIGH) return 'gold';
      if (count >= CONFIG.COUNT_MED) return 'amber';
      return 'dim';
    } else {
      // Day: busy = avoid (red), quiet = calm (gold)
      if (count >= CONFIG.COUNT_HIGH) return 'avoid';
      if (count >= CONFIG.COUNT_MED) return 'moderate';
      return 'clear';
    }
  }

  getColor(zone) {
    const nightColors = {
      gold: '#FFD700',
      amber: '#FFA500',
      loitering: '#FF6B35',
      dim: '#4a4a6a',
    };
    const dayColors = {
      clear: '#4ade80',
      moderate: '#facc15',
      avoid: '#f87171',
    };
    return this.mode === 'night'
      ? nightColors[zone] || '#4a4a6a'
      : dayColors[zone] || '#4ade80';
  }

  getRadius(count) {
    // Scale circle size with count, clamped
    const min = 6, max = 28;
    const scale = Math.min(count / CONFIG.COUNT_HIGH, 1);
    return min + (max - min) * scale;
  }

  buildGeoJSON() {
    return {
      type: 'FeatureCollection',
      features: this.data.map(d => {
        const zone = this.classify(d);
        const flow = this.getFlowRatio(d);
        return {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [d.lon, d.lat] },
          properties: {
            sensor_name: d.sensor_name,
            total_count: d.total_count,
            direction_1: d.direction_1,
            direction_2: d.direction_2,
            flow_ratio: flow !== null ? Math.round(flow * 100) / 100 : null,
            zone,
            color: this.getColor(zone),
            radius: this.getRadius(d.total_count),
            label: this.getLabel(zone, d.total_count),
          },
        };
      }),
    };
  }

  getLabel(zone, count) {
    const labels = {
      // Night
      gold: `Active — ${count} pedestrians`,
      amber: `Moderate — ${count} pedestrians`,
      loitering: `⚠ Stationary group detected`,
      dim: `Quiet — ${count} pedestrians`,
      // Day
      avoid: `Busy — avoid if possible`,
      moderate: `Moderate traffic`,
      clear: `Clear — low foot traffic`,
    };
    return labels[zone] || `${count} pedestrians`;
  }

  addToMap() {
    const geojson = this.buildGeoJSON();

    if (this.map.getSource(this.sourceId)) {
      this.map.getSource(this.sourceId).setData(geojson);
      return;
    }

    this.map.addSource(this.sourceId, { type: 'geojson', data: geojson });

    // Heatmap layer (behind circles)
    this.map.addLayer({
      id: this.heatLayerId,
      type: 'heatmap',
      source: this.sourceId,
      maxzoom: 15,
      paint: {
        'heatmap-weight': [
          'interpolate', ['linear'],
          ['get', 'total_count'], 0, 0, CONFIG.COUNT_HIGH, 1
        ],
        'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 10, 1, 15, 3],
        'heatmap-color': [
          'interpolate', ['linear'], ['heatmap-density'],
          0, 'rgba(0,0,0,0)',
          0.2, this.mode === 'night' ? 'rgba(100,60,180,0.4)' : 'rgba(74,222,128,0.3)',
          0.5, this.mode === 'night' ? 'rgba(255,165,0,0.5)' : 'rgba(250,204,21,0.5)',
          1, this.mode === 'night' ? 'rgba(255,215,0,0.8)' : 'rgba(248,113,113,0.8)',
        ],
        'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 10, 20, 15, 40],
        'heatmap-opacity': 0.6,
      },
    });

    // Circle layer (on top of heatmap)
    this.map.addLayer({
      id: this.layerId,
      type: 'circle',
      source: this.sourceId,
      minzoom: 13,
      paint: {
        'circle-radius': ['get', 'radius'],
        'circle-color': ['get', 'color'],
        'circle-opacity': 0.85,
        'circle-stroke-width': 1.5,
        'circle-stroke-color': 'rgba(255,255,255,0.2)',
        'circle-blur': 0.2,
      },
    });

    // Popup on click
    this.map.on('click', this.layerId, e => {
      const props = e.features[0].properties;
      new mapboxgl.Popup({ className: 'herd-popup' })
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(`
          <div class="popup-content">
            <div class="popup-sensor">${props.sensor_name}</div>
            <div class="popup-label">${props.label}</div>
            ${props.flow_ratio !== null ? `
              <div class="popup-flow">
                Flow ratio: <strong>${props.flow_ratio}</strong>
                <span class="popup-hint">${props.flow_ratio < 0.2 ? '(low — bidirectional)' : '(directional movement)'}</span>
              </div>
              <div class="popup-dirs">
                ← ${props.direction_1} &nbsp; ${props.direction_2} →
              </div>
            ` : ''}
          </div>
        `)
        .addTo(this.map);
    });

    this.map.on('mouseenter', this.layerId, () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });
    this.map.on('mouseleave', this.layerId, () => {
      this.map.getCanvas().style.cursor = '';
    });
  }

  setMode(mode) {
    this.mode = mode;
    if (this.map.getSource(this.sourceId)) {
      this.map.getSource(this.sourceId).setData(this.buildGeoJSON());
    }
  }

  setVisible(visible) {
    if (!this.map.getLayer(this.layerId)) return;
    const v = visible ? 'visible' : 'none';
    this.map.setLayoutProperty(this.layerId, 'visibility', v);
    this.map.setLayoutProperty(this.heatLayerId, 'visibility', v);
  }

  async refresh() {
    await this.fetch();
    this.addToMap();
  }
}