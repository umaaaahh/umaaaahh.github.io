// ─────────────────────────────────────────────
//  HERD SAFETY — Map Controller
//  Initialises Mapbox, coordinates layers,
//  handles day/night mode toggle and
//  auto-refresh cycle.
// ─────────────────────────────────────────────

class HerdMap {
  constructor() {
    this.mode = this.detectMode(); // auto-detect from time
    this.pedestrianLayer = null;
    this.lightingLayer = null;
    this.refreshTimer = null;
    this.lastRefresh = null;

    this.initMap();
  }

  // Default to night mode between 6pm–6am, day otherwise
  detectMode() {
    const hour = new Date().getHours();
    return (hour >= 18 || hour < 6) ? 'night' : 'day';
  }

  initMap() {
    mapboxgl.accessToken = CONFIG.MAPBOX_TOKEN;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.mode === 'night'
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11',
      center: CONFIG.MAP_CENTER,
      zoom: CONFIG.MAP_ZOOM,
      pitch: 20,
      bearing: -10,
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    this.map.addControl(
      new mapboxgl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }),
      'bottom-right'
    );

    this.map.on('load', () => this.onMapLoad());
  }

  async onMapLoad() {
    this.pedestrianLayer = new PedestrianLayer(this.map);
    this.lightingLayer = new LightingLayer(this.map);

    this.updateStatus('loading', 'Fetching sensor data...');

    // Load lighting first (static, no refresh needed)
    await this.lightingLayer.init();

    // Load pedestrian data
    await this.pedestrianLayer.fetch();
    this.pedestrianLayer.setMode(this.mode);
    this.pedestrianLayer.addToMap();

    // Lighting only visible at night
    this.lightingLayer.setVisible(this.mode === 'night');

    this.lastRefresh = new Date();
    this.updateStatus('live', this.getRefreshLabel());
    this.startRefreshCycle();
    this.updateModeUI();
  }

  startRefreshCycle() {
    clearInterval(this.refreshTimer);
    this.refreshTimer = setInterval(async () => {
      this.updateStatus('loading', 'Refreshing...');
      await this.pedestrianLayer.refresh();
      this.lastRefresh = new Date();
      this.updateStatus('live', this.getRefreshLabel());
    }, CONFIG.REFRESH_INTERVAL);
  }

  getRefreshLabel() {
    if (!this.lastRefresh) return 'Loading...';
    return `Updated ${this.lastRefresh.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}`;
  }

  async toggleMode() {
    this.mode = this.mode === 'night' ? 'day' : 'night';

    // Swap map base style
    this.map.setStyle(
      this.mode === 'night'
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11'
    );

    // Re-add layers after style reload (Mapbox wipes layers on style change)
    this.map.once('style.load', async () => {
      this.pedestrianLayer = new PedestrianLayer(this.map);
      this.lightingLayer = new LightingLayer(this.map);

      await this.lightingLayer.init();
      await this.pedestrianLayer.fetch();
      this.pedestrianLayer.setMode(this.mode);
      this.pedestrianLayer.addToMap();
      this.lightingLayer.setVisible(this.mode === 'night');
    });

    this.updateModeUI();
  }

  toggleLighting(visible) {
    if (this.lightingLayer) {
      this.lightingLayer.setVisible(visible && this.mode === 'night');
    }
  }

  togglePedestrians(visible) {
    if (this.pedestrianLayer) {
      this.pedestrianLayer.setVisible(visible);
    }
  }

  updateModeUI() {
    const modeBtn = document.getElementById('mode-toggle');
    const modeLabel = document.getElementById('mode-label');
    const mapEl = document.getElementById('map-container');

    if (this.mode === 'night') {
      modeBtn.textContent = '☀ Day Mode';
      modeLabel.textContent = 'NIGHT — Find the Herd';
      modeLabel.className = 'mode-label night';
      mapEl.className = 'night';
    } else {
      modeBtn.textContent = '🌙 Night Mode';
      modeLabel.textContent = 'DAY — Find the Gap';
      modeLabel.className = 'mode-label day';
      mapEl.className = 'day';
    }
  }

  updateStatus(state, text) {
    const dot = document.getElementById('status-dot');
    const label = document.getElementById('status-label');
    dot.className = `status-dot ${state}`;
    label.textContent = text;
  }
}

// ── Boot ──────────────────────────────────────
let herdMap;
document.addEventListener('DOMContentLoaded', () => {
  herdMap = new HerdMap();

  // Mode toggle button
  document.getElementById('mode-toggle').addEventListener('click', () => {
    herdMap.toggleMode();
  });

  // Layer toggles
  document.getElementById('toggle-pedestrians').addEventListener('change', e => {
    herdMap.togglePedestrians(e.target.checked);
  });

  document.getElementById('toggle-lighting').addEventListener('change', e => {
    herdMap.toggleLighting(e.target.checked);
  });
});