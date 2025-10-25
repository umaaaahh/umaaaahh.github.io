// ============ SHARED MAP FUNCTIONALITY ============
// This file is used by both index.html and planning.html

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidW1hYnJpZGdlcyIsImEiOiJjbWdlbHM5YTkwdjRnMm1vN2M5MHI4ZWU4In0.VSHdE_aN47-FgZXo2-AsNg';

// ============ MAP CREATION ============
/**
 * Creates a Mapbox map instance with trail markers
 * @param {string} containerId - ID of the HTML element to contain the map
 * @param {Object} options - Configuration options
 * @param {Function} options.onMarkerClick - Callback when a trail marker is clicked
 * @param {boolean} options.enable3D - Whether to enable 3D controls (default: false)
 * @param {number} options.zoom - Initial zoom level (default: 6.5)
 * @param {Array} options.center - Initial center coordinates (default: Victoria center)
 * @returns {Object} Mapbox map instance
 */
function createTrailMap(containerId, options = {}) {
  const {
    onMarkerClick = () => {},
    enable3D = false,
    zoom = 6.5,
    center = [145.0, -37.5]
  } = options;

  // Create map instance
  const map = new mapboxgl.Map({
    container: containerId,
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: center,
    zoom: zoom,
    pitch: 0,
    bearing: 0
  });

  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl());

  // Add 3D terrain source if enabled
  if (enable3D) {
    map.on('load', () => {
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.terrain-rgb'
      });
    });
  }

  // Add trail markers after map loads
  map.on('load', () => {
    addTrailMarkers(map, onMarkerClick);
  });

  return map;
}

// ============ TRAIL MARKERS ============
/**
 * Adds clickable trail markers to the map
 * @param {Object} map - Mapbox map instance
 * @param {Function} onMarkerClick - Callback function when marker is clicked
 */
function addTrailMarkers(map, onMarkerClick) {
  TRAILS.forEach(trail => {
    // Create marker element
    const el = document.createElement('div');
    el.className = `trail-marker ${trail.difficulty}-marker`;
    
    // Create popup content
    const popupContent = createMarkerPopup(trail);

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(popupContent);

    const marker = new mapboxgl.Marker(el)
      .setLngLat(trail.coords)
      .setPopup(popup)
      .addTo(map);

    // Add click handler
    el.addEventListener('click', () => {
      onMarkerClick(trail);
    });
  });
}

/**
 * Creates HTML content for marker popup
 * @param {Object} trail - Trail data object
 * @returns {string} HTML string for popup
 */
function createMarkerPopup(trail) {
  return `
    <div style="min-width: 250px;">
      <strong style="font-size: 1.1rem; color: #1f2937;">${trail.name}</strong>
      <div style="color: #6b7280; font-size: 0.875rem; margin: 0.5rem 0;">
        ${trail.region}
      </div>
      <div style="display: flex; gap: 1rem; font-size: 0.875rem; margin: 0.75rem 0;">
        <span>📏 ${trail.distance}km</span>
        <span>⏱️ ${trail.days} days</span>
      </div>
      <div style="margin-top: 0.5rem;">
        <span style="display: inline-block; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.75rem; font-weight: bold; background: ${getDifficultyColor(trail.difficulty)};">
          ${trail.difficulty.charAt(0).toUpperCase() + trail.difficulty.slice(1)}
        </span>
      </div>
    </div>
  `;
}

/**
 * Gets color styling for difficulty badge
 * @param {string} difficulty - Trail difficulty level
 * @returns {string} CSS color styling
 */
function getDifficultyColor(difficulty) {
  const colors = {
    beginner: '#d1fae5; color: #065f46',
    intermediate: '#fef3c7; color: #92400e',
    advanced: '#fee2e2; color: #991b1b'
  };
  return colors[difficulty] || colors.intermediate;
}

// ============ MAP CONTROLS ============
/**
 * Toggles 3D terrain on a map
 * @param {Object} map - Mapbox map instance
 * @param {boolean} is3D - Current 3D state
 * @returns {boolean} New 3D state
 */
function toggle3DTerrain(map, is3D) {
  const new3DState = !is3D;
  
  if (new3DState) {
    map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
    map.easeTo({ pitch: 60, duration: 1000 });
  } else {
    map.setTerrain(null);
    map.easeTo({ pitch: 0, duration: 1000 });
  }
  
  return new3DState;
}

/**
 * Toggles satellite view on a map
 * @param {Object} map - Mapbox map instance
 * @param {boolean} isSatellite - Current satellite state
 * @param {boolean} has3D - Whether map has 3D terrain enabled
 * @param {Function} onStyleLoad - Callback after style loads (to re-add markers)
 * @returns {boolean} New satellite state
 */
function toggleSatelliteView(map, isSatellite, has3D, onStyleLoad) {
  const newSatelliteState = !isSatellite;
  
  const style = newSatelliteState ? 
    'mapbox://styles/mapbox/satellite-streets-v12' : 
    'mapbox://styles/mapbox/outdoors-v12';
  
  map.setStyle(style);
  
  // Re-add 3D terrain and markers after style loads
  map.once('style.load', () => {
    if (has3D) {
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.terrain-rgb'
      });
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
    }
    if (onStyleLoad) {
      onStyleLoad();
    }
  });
  
  return newSatelliteState;
}

/**
 * Resets map view to default Victoria overview
 * @param {Object} map - Mapbox map instance
 */
function resetMapView(map) {
  map.flyTo({
    center: [145.0, -37.5],
    zoom: 6.5,
    pitch: 0,
    bearing: 0,
    duration: 1500
  });
}

/**
 * Flies map to a specific trail location
 * @param {Object} map - Mapbox map instance
 * @param {Object} trail - Trail data object with coords property
 * @param {number} zoom - Zoom level (default: 10)
 */
function flyToTrail(map, trail, zoom = 10) {
  map.flyTo({
    center: trail.coords,
    zoom: zoom,
    duration: 1500
  });
}