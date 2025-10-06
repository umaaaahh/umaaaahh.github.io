// Planning Page JavaScript

// State
let planningMap;
let currentMode = 'existing';
let selectedParkData = null;
let selectedRegionData = null;
let selectedTrailData = null;
let customWaypoints = [];
let currentTrip = {
  mode: 'existing',
  trail: null,
  customRoute: null,
  startDate: null,
  endDate: null,
  groupSize: 1,
  vehicleDetails: '',
  checklist: [],
  emergencyContact: {
    name: '',
    phone: '',
    email: '',
    checkinTime: null,
    autoAlert: false
  }
};

// Gear checklist templates based on difficulty
const CHECKLIST_TEMPLATES = {
  easy: {
    'Navigation': ['Map & compass', 'GPS device or phone', 'Trail guide'],
    'Safety': ['First aid kit', 'Emergency whistle', 'Headlamp with spare batteries'],
    'Shelter': ['Tent', 'Sleeping bag', 'Sleeping mat'],
    'Clothing': ['Hiking boots', 'Rain jacket', 'Warm layers', 'Sun hat', 'Sunglasses'],
    'Food & Water': ['Water bottles (2L+)', 'Water filter/purifier', 'Meals', 'Snacks'],
    'Personal': ['Sunscreen', 'Insect repellent', 'Toilet paper', 'Medications']
  },
  moderate: {
    'Navigation': ['Topographic map', 'Compass', 'GPS device', 'PLB or satellite messenger'],
    'Safety': ['Comprehensive first aid kit', 'Emergency whistle', 'Fire starter', 'Emergency blanket', 'Headlamp with spare batteries'],
    'Shelter': ['Tent with guy lines', 'Sleeping bag (appropriate rating)', 'Sleeping mat', 'Tent repair kit'],
    'Clothing': ['Hiking boots (broken in)', 'Rain jacket & pants', 'Insulating layers', 'Base layers', 'Gaiters', 'Sun hat', 'Warm hat', 'Gloves'],
    'Food & Water': ['Water bottles/bladder (3L+)', 'Water filter/purifier', 'Stove & fuel', 'Cooking pot', 'Utensils', 'Meals for all days', 'Extra snacks'],
    'Personal': ['Sunscreen (SPF 50+)', 'Insect repellent', 'Toilet paper & trowel', 'Personal hygiene items', 'Medications', 'Blister treatment']
  },
  hard: {
    'Navigation': ['Topographic maps (waterproof)', 'Compass', 'GPS device with extra batteries', 'PLB or satellite messenger (essential)', 'Altimeter'],
    'Safety': ['Advanced first aid kit', 'Emergency whistle', 'Fire starter (multiple methods)', 'Emergency blanket', 'Headlamp + backup light', 'Knife/multi-tool', 'Repair kit (tent, stove, etc.)'],
    'Shelter': ['4-season tent', 'Sleeping bag (temp rated)', 'Insulated sleeping mat', 'Tent stakes for all conditions', 'Extra cord'],
    'Clothing': ['Mountaineering boots', 'Waterproof jacket & pants (quality)', 'Insulating layers (multiple)', 'Base layers (merino/synthetic)', 'Gaiters', 'Sun protection', 'Warm hat & gloves', 'Extra socks'],
    'Food & Water': ['Water capacity 4L+', 'Water filter & purification tablets', 'Reliable stove system', 'Fuel (extra)', 'Cooking pot & utensils', 'High-calorie meals', 'Emergency food'],
    'Personal': ['Sunscreen & lip balm (high SPF)', 'Insect repellent', 'Sanitation supplies', 'Personal medications', 'Blister kit', 'Moleskin', 'Personal locator beacon']
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initPlanningMap();
  populateParkOptions();
  setMinDates();
  loadSavedTrip();
});

// Initialize map
function initPlanningMap() {
  mapboxgl.accessToken = 'pk.eyJ1IjoidW1hYnJpZGdlcyIsImEiOiJjbWdlbHM5YTkwdjRnMm1vN2M5MHI4ZWU4In0.VSHdE_aN47-FgZXo2-AsNg';
  
  planningMap = new mapboxgl.Map({
    container: 'planningMap',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [144.5, -37.5],
    zoom: 6
  });

  planningMap.on('load', () => {
    addMapControls();
  });
}

function addMapControls() {
  planningMap.addControl(new mapboxgl.NavigationControl());
  planningMap.addControl(new mapboxgl.FullscreenControl());
}

// Populate park dropdown
function populateParkOptions() {
  const parkSelect = document.getElementById('parkSelect');
  PARKS.forEach(park => {
    const option = document.createElement('option');
    option.value = park.id;
    option.textContent = park.name;
    parkSelect.appendChild(option);
  });
}

// Set minimum dates to today
function setMinDates() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('startDate').min = today;
  document.getElementById('endDate').min = today;
  
  document.getElementById('startDate').addEventListener('change', (e) => {
    document.getElementById('endDate').min = e.target.value;
  });
}

// Mode switching
function switchMode(mode) {
  currentMode = mode;
  currentTrip.mode = mode;
  
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.mode === mode) {
      btn.classList.add('active');
    }
  });
  
  document.getElementById('existingMode').style.display = mode === 'existing' ? 'block' : 'none';
  document.getElementById('customMode').style.display = mode === 'custom' ? 'block' : 'none';
  
  if (mode === 'custom') {
    enableCustomRouteMode();
  } else {
    disableCustomRouteMode();
  }
}

// Update trail options when park selected
function updateTrailOptions() {
  const parkId = document.getElementById('parkSelect').value;
  const park = PARKS.find(p => p.id === parkId);
  
  if (!park) {
    document.getElementById('regionGroup').style.display = 'none';
    document.getElementById('trailGroup').style.display = 'none';
    document.getElementById('trailInfo').style.display = 'none';
    return;
  }
  
  selectedParkData = park;
  
  if (park.hasRegions) {
    const regionSelect = document.getElementById('regionSelect');
    regionSelect.innerHTML = '<option value="">Choose a region...</option>';
    park.regions.forEach(region => {
      const option = document.createElement('option');
      option.value = region.id;
      option.textContent = region.name;
      regionSelect.appendChild(option);
    });
    document.getElementById('regionGroup').style.display = 'block';
    document.getElementById('trailGroup').style.display = 'none';
  } else {
    document.getElementById('regionGroup').style.display = 'none';
    const trailSelect = document.getElementById('trailSelect');
    trailSelect.innerHTML = '<option value="">Choose a trail...</option>';
    park.trails.forEach((trail, idx) => {
      const option = document.createElement('option');
      option.value = idx;
      option.textContent = trail.name;
      trailSelect.appendChild(option);
    });
    document.getElementById('trailGroup').style.display = 'block';
  }
  
  flyToParkOnPlanningMap(park);
}

function updateTrailsForRegion() {
  const regionId = document.getElementById('regionSelect').value;
  if (!regionId || !selectedParkData) return;
  
  const region = selectedParkData.regions.find(r => r.id === regionId);
  selectedRegionData = region;
  
  const trailSelect = document.getElementById('trailSelect');
  trailSelect.innerHTML = '<option value="">Choose a trail...</option>';
  region.trails.forEach((trail, idx) => {
    const option = document.createElement('option');
    option.value = idx;
    option.textContent = trail.name;
    trailSelect.appendChild(option);
  });
  
  document.getElementById('trailGroup').style.display = 'block';
  
  if (region.coords) {
    planningMap.flyTo({
      center: region.coords,
      zoom: 11,
      duration: 1500
    });
  }
}

function selectTrail() {
  const trailIdx = document.getElementById('trailSelect').value;
  if (trailIdx === '') {
    document.getElementById('trailInfo').style.display = 'none';
    return;
  }
  
  let trail;
  if (selectedRegionData) {
    trail = selectedRegionData.trails[parseInt(trailIdx)];
  } else if (selectedParkData) {
    trail = selectedParkData.trails[parseInt(trailIdx)];
  }
  
  selectedTrailData = trail;
  currentTrip.trail = trail;
  displayTrailInfo(trail);
  showTripSections();
  generateChecklist(trail.grade.toLowerCase());
}

function displayTrailInfo(trail) {
  const infoCard = document.getElementById('trailInfo');
  const days = typeof trail.days === 'string' ? trail.days : `${trail.days} day${trail.days > 1 ? 's' : ''}`;
  const distance = typeof trail.distance === 'string' ? trail.distance : `${trail.distance}km`;
  
  infoCard.innerHTML = `
    <h3>${trail.icon} ${trail.name}</h3>
    <div class="trail-stats">
      <span>📅 ${days}</span>
      <span>📏 ${distance}</span>
      <span>⛰️ ${trail.elevation}m</span>
      <span class="grade-badge grade-${trail.grade.toLowerCase()}">${trail.grade}</span>
    </div>
    <p>${trail.description}</p>
  `;
  infoCard.style.display = 'block';
}

function flyToParkOnPlanningMap(park) {
  if (!park.boundary) return;
  
  const bounds = new mapboxgl.LngLatBounds();
  park.boundary.forEach(coord => bounds.extend(coord));
  
  planningMap.fitBounds(bounds, {
    padding: 50,
    duration: 1500
  });
}

// Custom route mode
function enableCustomRouteMode() {
  planningMap.getCanvas().style.cursor = 'crosshair';
  
  PARKS.forEach(park => {
    if (park.hasRegions) {
      park.regions.forEach(region => {
        if (region.waypoints) {
          addClickableWaypoints(region.waypoints);
        }
      });
    } else if (park.waypoints) {
      addClickableWaypoints(park.waypoints);
    }
  });
}

function disableCustomRouteMode() {
  planningMap.getCanvas().style.cursor = '';
  customWaypoints = [];
  updateCustomWaypointsList();
}

function addClickableWaypoints(waypoints) {
  waypoints.forEach(wp => {
    const el = document.createElement('div');
    el.className = 'waypoint-marker';
    el.innerHTML = WAYPOINT_TYPES[wp.type]?.icon || '📍';
    el.style.cursor = 'pointer';
    el.style.fontSize = '24px';
    
    const marker = new mapboxgl.Marker(el)
      .setLngLat(wp.coords)
      .addTo(planningMap);
    
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCustomRoute(wp);
    });
  });
}

function addToCustomRoute(waypoint) {
  customWaypoints.push(waypoint);
  updateCustomWaypointsList();
  updateRouteStats();
  
  if (customWaypoints.length === 1) {
    showTripSections();
  }
}

function updateCustomWaypointsList() {
  const container = document.getElementById('waypointsList');
  
  if (customWaypoints.length === 0) {
    container.innerHTML = '<p class="empty-state">Click waypoints on the map to add them to your route</p>';
    return;
  }
  
  container.innerHTML = customWaypoints.map((wp, idx) => `
    <div class="waypoint-item">
      <span class="waypoint-icon">${WAYPOINT_TYPES[wp.type]?.icon || '📍'}</span>
      <div class="waypoint-info">
        <span class="waypoint-name">${wp.name}</span>
        <span class="waypoint-type">${WAYPOINT_TYPES[wp.type]?.label || 'Waypoint'}</span>
      </div>
      <button class="remove-waypoint" onclick="removeWaypoint(${idx})">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  `).join('');
}

function removeWaypoint(idx) {
  customWaypoints.splice(idx, 1);
  updateCustomWaypointsList();
  updateRouteStats();
}

function updateRouteStats() {
  const statsDiv = document.getElementById('routeStats');
  
  if (customWaypoints.length < 2) {
    statsDiv.style.display = 'none';
    return;
  }
  
  document.getElementById('waypointCount').textContent = customWaypoints.length;
  
  let totalDistance = 0;
  for (let i = 0; i < customWaypoints.length - 1; i++) {
    const dist = calculateDistance(
      customWaypoints[i].coords,
      customWaypoints[i + 1].coords
    );
    totalDistance += dist;
  }
  
  document.getElementById('estimatedDistance').textContent = `${totalDistance.toFixed(1)} km`;
  statsDiv.style.display = 'grid';
}

function calculateDistance(coord1, coord2) {
  const R = 6371;
  const dLat = (coord2[1] - coord1[1]) * Math.PI / 180;
  const dLon = (coord2[0] - coord1[0]) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[1] * Math.PI / 180) * Math.cos(coord2[1] * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Show trip sections after trail/route selected
function showTripSections() {
  document.getElementById('tripDetailsSection').style.display = 'block';
  document.getElementById('checklistSection').style.display = 'block';
  document.getElementById('safetySection').style.display = 'block';
  document.getElementById('actionButtons').style.display = 'flex';
}

// Generate checklist
function generateChecklist(difficulty = 'moderate') {
  const template = CHECKLIST_TEMPLATES[difficulty] || CHECKLIST_TEMPLATES.moderate;
  currentTrip.checklist = [];
  
  const container = document.getElementById('checklistItems');
  container.innerHTML = '';
  
  Object.keys(template).forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'checklist-category';
    
    const categoryTitle = document.createElement('div');
    categoryTitle.className = 'category-title';
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);
    
    template[category].forEach(item => {
      const itemDiv = createChecklistItem(item, category);
      categoryDiv.appendChild(itemDiv);
      currentTrip.checklist.push({ category, item, checked: false });
    });
    
    container.appendChild(categoryDiv);
  });
}

function createChecklistItem(itemText, category) {
  const div = document.createElement('div');
  div.className = 'checklist-item';
  
  const id = `item-${Date.now()}-${Math.random()}`;
  
  div.innerHTML = `
    <input type="checkbox" id="${id}" onchange="toggleChecklistItem(this, '${itemText}')">
    <label for="${id}">${itemText}</label>
    <button class="delete-item" onclick="deleteChecklistItem(this, '${itemText}')">
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </button>
  `;
  
  return div;
}

function toggleChecklistItem(checkbox, itemText) {
  const item = currentTrip.checklist.find(i => i.item === itemText);
  if (item) {
    item.checked = checkbox.checked;
  }
  
  checkbox.parentElement.classList.toggle('checked', checkbox.checked);
  saveToLocalStorage();
}

function deleteChecklistItem(button, itemText) {
  const idx = currentTrip.checklist.findIndex(i => i.item === itemText);
  if (idx !== -1) {
    currentTrip.checklist.splice(idx, 1);
  }
  
  button.parentElement.remove();
  saveToLocalStorage();
}

function addCustomItem() {
  const itemText = prompt('Enter item name:');
  if (!itemText) return;
  
  const container = document.getElementById('checklistItems');
  let customCategory = container.querySelector('[data-category="custom"]');
  
  if (!customCategory) {
    customCategory = document.createElement('div');
    customCategory.className = 'checklist-category';
    customCategory.dataset.category = 'custom';
    
    const title = document.createElement('div');
    title.className = 'category-title';
    title.textContent = 'Custom Items';
    customCategory.appendChild(title);
    
    container.appendChild(customCategory);
  }
  
  const itemDiv = createChecklistItem(itemText, 'Custom');
  customCategory.appendChild(itemDiv);
  currentTrip.checklist.push({ category: 'Custom', item: itemText, checked: false });
  saveToLocalStorage();
}

// Save trip
function saveTrip() {
  updateTripData();
  
  if (!validateTrip()) {
    return;
  }
  
  saveToLocalStorage();
  alert('Trip saved successfully! You can access it from "My Trips" on the home page.');
}

function updateTripData() {
  currentTrip.startDate = document.getElementById('startDate').value;
  currentTrip.endDate = document.getElementById('endDate').value;
  currentTrip.groupSize = document.getElementById('groupSize').value;
  currentTrip.vehicleDetails = document.getElementById('vehicleDetails').value;
  currentTrip.emergencyContact = {
    name: document.getElementById('emergencyName').value,
    phone: document.getElementById('emergencyPhone').value,
    email: document.getElementById('emergencyEmail').value,
    checkinTime: document.getElementById('checkinTime').value,
    autoAlert: document.getElementById('autoAlert').checked
  };
  
  if (currentMode === 'custom') {
    currentTrip.customRoute = {
      name: document.getElementById('customTripName').value || 'Custom Trip',
      waypoints: customWaypoints
    };
  }
}

function validateTrip() {
  if (currentMode === 'existing' && !selectedTrailData) {
    alert('Please select a trail');
    return false;
  }
  
  if (currentMode === 'custom' && customWaypoints.length < 2) {
    alert('Please add at least 2 waypoints to your custom route');
    return false;
  }
  
  if (!currentTrip.startDate || !currentTrip.endDate) {
    alert('Please enter start and end dates');
    return false;
  }
  
  if (new Date(currentTrip.endDate) < new Date(currentTrip.startDate)) {
    alert('End date must be after start date');
    return false;
  }
  
  return true;
}

function saveToLocalStorage() {
  const trips = JSON.parse(localStorage.getItem('victorianHikingTrips') || '[]');
  const existingIdx = trips.findIndex(t => t.id === currentTrip.id);
  
  if (existingIdx !== -1) {
    trips[existingIdx] = currentTrip;
  } else {
    currentTrip.id = Date.now();
    currentTrip.createdAt = new Date().toISOString();
    trips.push(currentTrip);
  }
  
  localStorage.setItem('victorianHikingTrips', JSON.stringify(trips));
}

function loadSavedTrip() {
  const urlParams = new URLSearchParams(window.location.search);
  const tripId = urlParams.get('trip');
  
  if (!tripId) return;
  
  const trips = JSON.parse(localStorage.getItem('victorianHikingTrips') || '[]');
  const trip = trips.find(t => t.id === parseInt(tripId));
  
  if (trip) {
    currentTrip = trip;
    // Populate form fields with saved data
    // Implementation for loading saved trip data
  }
}

// Save for offline
function saveOffline() {
  updateTripData();
  
  if (!validateTrip()) {
    return;
  }
  
  const offlineData = {
    trip: currentTrip,
    savedAt: new Date().toISOString(),
    parkData: selectedParkData,
    regionData: selectedRegionData
  };
  
  const blob = new Blob([JSON.stringify(offlineData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `trip-${currentTrip.trail?.name || 'custom'}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  alert('Trip data downloaded! Save this file to access offline. You can also take screenshots of this page.');
}

// Share trip
function shareTrip() {
  updateTripData();
  saveToLocalStorage();
  
  const shareUrl = `${window.location.origin}${window.location.pathname}?trip=${currentTrip.id}`;
  document.getElementById('shareLink').value = shareUrl;
  document.getElementById('shareModal').style.display = 'flex';
}

function closeShareModal() {
  document.getElementById('shareModal').style.display = 'none';
}

function copyShareLink() {
  const input = document.getElementById('shareLink');
  input.select();
  document.execCommand('copy');
  alert('Link copied to clipboard!');
}

// Check-in reminder system (simplified version)
function scheduleCheckinReminder() {
  if (!currentTrip.emergencyContact.autoAlert || !currentTrip.emergencyContact.checkinTime) {
    return;
  }
  
  const checkinTime = new Date(currentTrip.emergencyContact.checkinTime);
  const now = new Date();
  
  if (checkinTime > now) {
    const timeUntilCheckin = checkinTime - now;
    
    if ('Notification' in window && Notification.permission === 'granted') {
      setTimeout(() => {
        new Notification('Check-in Reminder', {
          body: 'Time to check in from your hike! Let your emergency contact know you\'re safe.',
          icon: '/icon.png'
        });
      }, timeUntilCheckin);
    }
  }
}

// Request notification permission
if ('Notification' in window && Notification.permission === 'default') {
  document.getElementById('autoAlert')?.addEventListener('change', (e) => {
    if (e.target.checked) {
      Notification.requestPermission();
    }
  });
}

// Create gear list from trip
function createGearList() {
  updateTripData();
  
  if (!validateTrip()) {
    return;
  }
  
  // Build URL with trip context
  let gearUrl = 'gear-list.html?';
  const params = [];
  
  // Calculate trip duration
  if (currentTrip.startDate && currentTrip.endDate) {
    const start = new Date(currentTrip.startDate);
    const end = new Date(currentTrip.endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    params.push(`tripDuration=${duration}`);
  }
  
  // Add difficulty
  if (currentMode === 'existing' && selectedTrailData) {
    params.push(`difficulty=${selectedTrailData.grade.toLowerCase()}`);
  } else {
    params.push(`difficulty=moderate`);
  }
  
  // Add season (determine from start date)
  if (currentTrip.startDate) {
    const month = new Date(currentTrip.startDate).getMonth();
    let season = 'summer';
    if (month >= 2 && month <= 4) season = 'autumn';
    else if (month >= 5 && month <= 7) season = 'winter';
    else if (month >= 8 && month <= 10) season = 'spring';
    params.push(`season=${season}`);
  }
  
  // Add park ID
  if (selectedParkData) {
    params.push(`parkId=${selectedParkData.id}`);
  }
  
  // Add group size
  params.push(`groupSize=${currentTrip.groupSize || 1}`);
  
  window.location.href = gearUrl + params.join('&');
}