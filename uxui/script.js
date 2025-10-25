// ============ INDEX PAGE SPECIFIC FUNCTIONALITY ============
// This file handles the index.html page behavior
// Map functionality is in map.js, trail data is in trails-data.js

// ============ STATE ============
let map = null;
let is3D = false;
let isSatellite = false;

// ============ MAP INITIALIZATION ============
function initMap() {
  map = createTrailMap('map', {
    onMarkerClick: showTrailDetails,
    enable3D: true,
    zoom: 6.5,
    center: [145.0, -37.5]
  });
}

// ============ TRAIL DETAILS SIDEBAR ============
function showTrailDetails(trail) {
  const sidebar = document.getElementById('trailSidebar');
  const content = sidebar.querySelector('.sidebar-content');

  const alertHTML = trail.alert ? `
    <div style="background: #fef2f2; border-left: 4px solid #dc2626; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
      <strong style="color: #991b1b;">⚠️ Alert:</strong>
      <p style="color: #7f1d1d; margin-top: 0.5rem; font-size: 0.875rem;">${trail.alert}</p>
    </div>
  ` : '';

  content.innerHTML = `
    <div class="sidebar-header">
      <div>
        <h2 class="trail-name">${trail.name}</h2>
        <p class="trail-region">${trail.region}</p>
      </div>
      <button class="close-btn" onclick="closeSidebar()">✕</button>
    </div>

    ${alertHTML}

    <div class="trail-info-grid">
      <div class="info-item">
        <div class="info-label">Distance</div>
        <div class="info-value">${trail.distance}km</div>
      </div>
      <div class="info-item">
        <div class="info-label">Duration</div>
        <div class="info-value">${trail.days} days</div>
      </div>
      <div class="info-item">
        <div class="info-label">Difficulty</div>
        <div class="info-value" style="text-transform: capitalize;">${trail.difficulty}</div>
      </div>
      <div class="info-item">
        <div class="info-label">Elevation</div>
        <div class="info-value">${trail.elevation}</div>
      </div>
    </div>

    <div class="section-heading">About This Trail</div>
    <p class="trail-description">${trail.description}</p>

    <div class="section-heading">Trail Highlights</div>
    <ul class="highlights-list">
      ${trail.highlights.map(h => `<li>${h}</li>`).join('')}
    </ul>

    <div class="booking-info">
      <strong>Booking:</strong> ${trail.booking}
    </div>

    <div style="background: #f0fdf4; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0;">
      <strong style="color: #065f46;">Best Time to Hike:</strong>
      <p style="color: #047857; margin-top: 0.5rem; font-size: 0.875rem;">${trail.bestTime}</p>
    </div>

    <a href="${trail.link}" target="_blank" class="external-link">
      View on Parks Victoria →
    </a>

    <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid #e5e7eb;">
      <div style="font-size: 0.875rem; color: #6b7280;">
        <p style="margin-bottom: 0.5rem;"><strong>Before you go:</strong></p>
        <ul style="padding-left: 1.5rem; line-height: 1.6;">
          <li>Book campsites in advance</li>
          <li>Check fire danger rating</li>
          <li>Download offline maps</li>
          <li>Tell someone your plans</li>
        </ul>
      </div>
    </div>
  `;

  sidebar.classList.add('active');

  // Fly to trail location using shared function
  flyToTrail(map, trail, 10);
}

function closeSidebar() {
  document.getElementById('trailSidebar').classList.remove('active');
}

// ============ MAP CONTROLS ============
function toggle3D() {
  is3D = toggle3DTerrain(map, is3D);
  const btn = document.getElementById('btn3D');
  btn.classList.toggle('active', is3D);
}

function toggleSatellite() {
  isSatellite = toggleSatelliteView(map, isSatellite, is3D, () => {
    // Re-add markers after style change
    addTrailMarkers(map, showTrailDetails);
  });
  
  const btn = document.getElementById('btnSatellite');
  btn.classList.toggle('active', isSatellite);
}

function resetView() {
  resetMapView(map);
  closeSidebar();
}

// ============ PAGE NAVIGATION ============
function showMap() {
  document.getElementById('splashPage').classList.add('hidden');
  document.getElementById('mapPage').classList.remove('hidden');
  
  if (!map) {
    initMap();
  } else {
    map.resize();
  }
}

function showSplash() {
  document.getElementById('mapPage').classList.add('hidden');
  document.getElementById('splashPage').classList.remove('hidden');
  closeSidebar();
}

function showBookingLinks() {
  const links = `
    🏕️ ParkStay Victoria: https://www.parkstay.vic.gov.au/overnight-walks
    
    🏞️ Parks Victoria: https://www.parks.vic.gov.au/
    
    🚨 VicEmergency: https://www.emergency.vic.gov.au/
    
    📱 Book campsites 2-6 months in advance for popular trails!
  `;
  
  if (confirm('Open booking resources?\n\n' + links)) {
    window.open('https://www.parkstay.vic.gov.au/overnight-walks', '_blank');
  }
}

// ============ INITIALIZE ============
document.addEventListener('DOMContentLoaded', () => {
  // Map will be initialized when user clicks "Explore Map"
  console.log('Victorian Multi-Day Hiking Hub loaded!');
  console.log(`${TRAILS.length} trails available`);
});