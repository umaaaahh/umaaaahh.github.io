// ============ PLANNING PAGE SPECIFIC FUNCTIONALITY ============
// This file handles the planning.html page behavior
// Map functionality is in map.js, trail data is in trails-data.js

// Essential Gear Checklist
const GEAR_CHECKLIST = {
  'Big Three': [
    { item: 'Backpack (50-65L)', essential: true },
    { item: 'Tent (waterproof)', essential: true },
    { item: 'Sleeping bag + mat', essential: true }
  ],
  'Cooking': [
    { item: 'Stove + fuel', essential: true },
    { item: 'Pot/pan', essential: false },
    { item: 'Utensils & cup', essential: false },
    { item: 'Water filter/purification', essential: true },
    { item: 'Waterproof matches/lighter', essential: true },
    { item: 'Food (dehydrated meals, snacks)', essential: true }
  ],
  'Clothing': [
    { item: 'Base layer (merino/synthetic)', essential: true },
    { item: 'Insulation layer (fleece/down)', essential: true },
    { item: 'Rain jacket + pants', essential: true },
    { item: 'Hiking pants/shorts', essential: false },
    { item: 'Extra socks (2-3 pairs)', essential: true },
    { item: 'Warm camp clothes', essential: false },
    { item: 'Beanie + gloves', essential: false }
  ],
  'Navigation & Safety': [
    { item: 'Offline maps (phone + paper)', essential: true },
    { item: 'PLB/satellite device', essential: true },
    { item: 'First aid kit', essential: true },
    { item: 'Headlamp + batteries', essential: true },
    { item: 'Compass', essential: false },
    { item: 'Whistle', essential: false },
    { item: 'Emergency blanket', essential: false }
  ],
  'Sun & Hygiene': [
    { item: 'Sunscreen SPF50+', essential: true },
    { item: 'Hat + sunglasses', essential: true },
    { item: 'Trowel for toileting', essential: true },
    { item: 'Toilet paper + bags', essential: true },
    { item: 'Biodegradable soap', essential: false },
    { item: 'Toothbrush/paste', essential: false },
    { item: 'Insect repellent', essential: false }
  ],
  'Other': [
    { item: 'Trekking poles', essential: false },
    { item: 'Power bank', essential: false },
    { item: 'Dry bags', essential: false },
    { item: 'Rope/cord', essential: false },
    { item: 'Duct tape', essential: false },
    { item: 'Knife/multi-tool', essential: false },
    { item: 'Rubbish bags', essential: true }
  ]
};

// ============ STATE ============
let currentTrip = {
  trail: null,
  startDate: null,
  endDate: null,
  groupSize: 1,
  vehicleDetails: '',
  emergencyContact: {},
  gearChecked: {}
};

let planningMap = null;

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
  initPlanningMap();
  loadSavedTrip();
});

function initPlanningMap() {
  if (!document.getElementById('planningMap')) return;
  
  // Create map with marker click handler that selects the trail
  planningMap = createTrailMap('planningMap', {
    onMarkerClick: handlePlanningMarkerClick,
    enable3D: false,
    zoom: 6,
    center: [145.0, -37.5]
  });
}

// ============ MARKER CLICK HANDLER ============
/**
 * Handles when a trail marker is clicked on the planning page
 * - Selects the trail in the dropdown
 * - Shows the trail info card
 * - Reveals all form sections
 */
function handlePlanningMarkerClick(trail) {
  // Set the dropdown to the clicked trail
  document.getElementById('trailSelect').value = trail.id;
  
  // Trigger the trail selection (which shows all the forms)
  selectTrail();
  
  // Scroll to the trail info card smoothly
  setTimeout(() => {
    const trailInfo = document.getElementById('trailInfo');
    if (trailInfo) {
      trailInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, 100);
}

// ============ TRAIL SELECTION ============
function selectTrail() {
  const trailId = document.getElementById('trailSelect').value;
  
  if (!trailId) {
    document.getElementById('trailInfo').style.display = 'none';
    hideAllSections();
    return;
  }

  const trail = TRAILS_DATA[trailId];
  if (!trail) return;

  currentTrip.trail = trail;
  displayTrailInfo(trail);
  showTripSections();
  
  // Fly to trail on map
  if (planningMap) {
    flyToTrail(planningMap, trail, 10);
  }
}

function displayTrailInfo(trail) {
  const alertHTML = trail.alert ? `
    <div class="alert-box">
      <strong>⚠️ Alert</strong>
      <p>${trail.alert}</p>
    </div>
  ` : '';

  const infoCard = document.getElementById('trailInfo');
  infoCard.innerHTML = `
    <h3>${trail.name}</h3>
    <div class="trail-stats">
      <span>📏 ${trail.distance}km</span>
      <span>⏱️ ${trail.days} days</span>
      <span>📍 ${trail.region}</span>
    </div>
    <p>${trail.description}</p>
    
    <div class="trail-highlights">
      <strong>Trail Highlights:</strong>
      <ul>
        ${trail.highlights.slice(0, 3).map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>
    
    <span class="grade-badge grade-${trail.difficulty}">
      ${trail.difficulty}
    </span>
    
    ${alertHTML}
  `;
  
  infoCard.style.display = 'block';
}

function hideAllSections() {
  document.getElementById('tripDetailsSection').style.display = 'none';
  document.getElementById('gearSection').style.display = 'none';
  document.getElementById('safetySection').style.display = 'none';
  document.getElementById('actionButtons').style.display = 'none';
}

function showTripSections() {
  document.getElementById('tripDetailsSection').style.display = 'block';
  document.getElementById('gearSection').style.display = 'block';
  document.getElementById('safetySection').style.display = 'block';
  document.getElementById('actionButtons').style.display = 'flex';
  
  showGearChecklist();
  
  // Set default check-in time if not set
  if (!document.getElementById('checkinTime').value) {
    const defaultCheckin = new Date();
    defaultCheckin.setDate(defaultCheckin.getDate() + parseInt(currentTrip.trail.days) + 1);
    defaultCheckin.setHours(18, 0);
    document.getElementById('checkinTime').value = defaultCheckin.toISOString().slice(0, 16);
  }
}

// ============ TRIP DATES ============
function updateTripDates() {
  const startDate = document.getElementById('startDate').value;
  if (!startDate || !currentTrip.trail) return;
  
  const start = new Date(startDate);
  const days = typeof currentTrip.trail.days === 'number' ? 
    currentTrip.trail.days : 
    parseInt(currentTrip.trail.days.split('-')[0]);
  
  const end = new Date(start);
  end.setDate(start.getDate() + days);
  
  document.getElementById('endDate').value = end.toISOString().split('T')[0];
  
  currentTrip.startDate = startDate;
  currentTrip.endDate = end.toISOString().split('T')[0];
}

// ============ GEAR CHECKLIST ============
function showGearChecklist() {
  const container = document.getElementById('gearChecklist');
  
  let html = '';
  for (const [category, items] of Object.entries(GEAR_CHECKLIST)) {
    html += `
      <div class="checklist-category">
        <div class="category-title">
          ${category === 'Big Three' ? '🎒' : 
            category === 'Cooking' ? '🍳' : 
            category === 'Clothing' ? '👕' : 
            category === 'Navigation & Safety' ? '🧭' : 
            category === 'Sun & Hygiene' ? '☀️' : '📦'} ${category}
        </div>
        ${items.map((item, idx) => {
          const itemId = `${category}-${idx}`;
          const checked = currentTrip.gearChecked[itemId] ? 'checked' : '';
          const checkedClass = checked ? 'checked' : '';
          
          return `
            <div class="checklist-item ${checkedClass}">
              <input 
                type="checkbox" 
                id="${itemId}" 
                ${checked}
                onchange="toggleGearItem('${itemId}')"
              >
              <label for="${itemId}">
                ${item.item}
                ${item.essential ? '<span class="item-essential">*</span>' : ''}
              </label>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
  
  html += '<p style="font-size: 0.75rem; color: #6b7280; margin-top: 1rem;"><span class="item-essential">*</span> = Essential item</p>';
  
  container.innerHTML = html;
}

function toggleGearItem(itemId) {
  const checkbox = document.getElementById(itemId);
  currentTrip.gearChecked[itemId] = checkbox.checked;
  
  const item = checkbox.closest('.checklist-item');
  if (checkbox.checked) {
    item.classList.add('checked');
  } else {
    item.classList.remove('checked');
  }
  
  saveTrip();
}

// ============ SAVE & SHARE ============
function saveTrip() {
  // Collect all trip data
  currentTrip.groupSize = document.getElementById('groupSize').value;
  currentTrip.vehicleDetails = document.getElementById('vehicleDetails').value;
  currentTrip.emergencyContact = {
    name: document.getElementById('emergencyName').value,
    phone: document.getElementById('emergencyPhone').value,
    email: document.getElementById('emergencyEmail').value,
    checkinTime: document.getElementById('checkinTime').value
  };
  
  // Save to localStorage
  localStorage.setItem('victorianHikingTrip', JSON.stringify(currentTrip));
  
  alert('✓ Trip saved! You can access it anytime from this device.');
}

function loadSavedTrip() {
  const saved = localStorage.getItem('victorianHikingTrip');
  if (!saved) return;
  
  try {
    currentTrip = JSON.parse(saved);
    
    // Restore form values
    if (currentTrip.trail) {
      // Find and select the trail
      const trailId = currentTrip.trail.id;
      if (trailId && TRAILS_DATA[trailId]) {
        document.getElementById('trailSelect').value = trailId;
        selectTrail();
      }
    }
    
    if (currentTrip.startDate) {
      document.getElementById('startDate').value = currentTrip.startDate;
      document.getElementById('endDate').value = currentTrip.endDate;
    }
    
    if (currentTrip.groupSize) {
      document.getElementById('groupSize').value = currentTrip.groupSize;
    }
    
    if (currentTrip.vehicleDetails) {
      document.getElementById('vehicleDetails').value = currentTrip.vehicleDetails;
    }
    
    if (currentTrip.emergencyContact) {
      document.getElementById('emergencyName').value = currentTrip.emergencyContact.name || '';
      document.getElementById('emergencyPhone').value = currentTrip.emergencyContact.phone || '';
      document.getElementById('emergencyEmail').value = currentTrip.emergencyContact.email || '';
      document.getElementById('checkinTime').value = currentTrip.emergencyContact.checkinTime || '';
    }
  } catch (e) {
    console.error('Error loading saved trip:', e);
  }
}

function downloadPDF() {
  if (!currentTrip.trail) {
    alert('Please select a trail first!');
    return;
  }
  
  // Create printable version
  const content = generateTripSummary();
  const printWindow = window.open('', '_blank');
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.print();
}

function generateTripSummary() {
  const trail = currentTrip.trail;
  const emergencyContact = currentTrip.emergencyContact || {};
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Trip Plan: ${trail.name}</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }
        h1 { color: #2d5016; }
        h2 { color: #4a7c2c; margin-top: 2rem; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1rem 0; }
        .info-item { padding: 0.5rem; background: #f9fafb; border-radius: 0.5rem; }
        .info-label { font-weight: bold; color: #6b7280; font-size: 0.875rem; }
        .checklist { list-style: none; padding: 0; }
        .checklist li { padding: 0.5rem 0; border-bottom: 1px solid #e5e7eb; }
        .essential { color: #dc2626; font-weight: bold; }
        @media print { button { display: none; } }
      </style>
    </head>
    <body>
      <h1>${trail.name}</h1>
      <p><strong>Region:</strong> ${trail.region}</p>
      
      <h2>Trip Details</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Distance</div>
          <div>${trail.distance}km</div>
        </div>
        <div class="info-item">
          <div class="info-label">Duration</div>
          <div>${trail.days} days</div>
        </div>
        <div class="info-item">
          <div class="info-label">Start Date</div>
          <div>${currentTrip.startDate || 'Not set'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">End Date</div>
          <div>${currentTrip.endDate || 'Not set'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Group Size</div>
          <div>${currentTrip.groupSize} hikers</div>
        </div>
        <div class="info-item">
          <div class="info-label">Vehicle</div>
          <div>${currentTrip.vehicleDetails || 'Not specified'}</div>
        </div>
      </div>
      
      <h2>Emergency Contact</h2>
      <div class="info-grid">
        <div class="info-item">
          <div class="info-label">Name</div>
          <div>${emergencyContact.name || 'Not set'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Phone</div>
          <div>${emergencyContact.phone || 'Not set'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Email</div>
          <div>${emergencyContact.email || 'Not set'}</div>
        </div>
        <div class="info-item">
          <div class="info-label">Expected Return</div>
          <div>${emergencyContact.checkinTime || 'Not set'}</div>
        </div>
      </div>
      
      <h2>Essential Gear Checklist</h2>
      <ul class="checklist">
        ${Object.entries(GEAR_CHECKLIST).map(([category, items]) => 
          items.filter(item => item.essential).map(item => 
            `<li><span class="essential">✓</span> ${item.item}</li>`
          ).join('')
        ).join('')}
      </ul>
      
      <h2>Important Information</h2>
      <p><strong>Booking:</strong> ${trail.booking}</p>
      <p><strong>Best Time:</strong> ${trail.bestTime}</p>
      <p><strong>Emergency:</strong> Call 000</p>
      <p><strong>Resources:</strong></p>
      <ul>
        <li>Parks Victoria: parks.vic.gov.au</li>
        <li>VicEmergency: emergency.vic.gov.au</li>
        <li>BOM Weather: bom.gov.au</li>
      </ul>
    </body>
    </html>
  `;
}

function printChecklist() {
  downloadPDF();
}

function shareTrip() {
  document.getElementById('shareModal').style.display = 'flex';
}

function closeShareModal() {
  document.getElementById('shareModal').style.display = 'none';
}

function copyTripInfo() {
  if (!currentTrip.trail) {
    alert('No trip selected!');
    return;
  }
  
  const trail = currentTrip.trail;
  const text = `
🥾 ${trail.name}
📍 ${trail.region}
📏 ${trail.distance}km | ⏱️ ${trail.days} days
📅 ${currentTrip.startDate || 'Date TBD'} to ${currentTrip.endDate || 'Date TBD'}
👥 ${currentTrip.groupSize} hikers

Emergency Contact: ${currentTrip.emergencyContact.name || 'Not set'}
Phone: ${currentTrip.emergencyContact.phone || 'Not set'}

Booking: ${trail.booking}
Best Time: ${trail.bestTime}
  `.trim();
  
  navigator.clipboard.writeText(text).then(() => {
    alert('✓ Trip info copied to clipboard!');
    closeShareModal();
  }).catch(err => {
    alert('Failed to copy. Please copy manually.');
  });
}