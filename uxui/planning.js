// ============ VICTORIAN MULTI-DAY TRAILS DATA ============
const TRAILS_DATA = {
  'burchell-trail': {
    name: 'Burchell Trail',
    region: 'Brisbane Ranges National Park',
    coords: [144.2000, -37.8500],
    difficulty: 'beginner',
    distance: 40,
    days: 3,
    elevation: 'Low',
    description: 'Perfect first overnight hike! Well-marked trail through forest with facilities. Easy access from Melbourne (1.5 hours drive).',
    highlights: [
      'Great beginner multi-day trail',
      'Two hike-in campgrounds with facilities',
      'Historic Steiglitz ghost town',
      'Can do shorter out-and-back sections'
    ],
    booking: 'Book via Parks Victoria website',
    bestTime: 'Autumn and Spring (can be hot in summer)'
  },
  'beeripmo-walk': {
    name: 'Beeripmo Walk',
    region: 'Mount Cole / Mount Buangor State Park',
    coords: [143.2500, -37.4500],
    difficulty: 'beginner',
    distance: 21,
    days: 2,
    elevation: 'Moderate',
    description: 'Beautiful 2-day loop with stunning views of the Grampians. Well-maintained with water tank and toilet facilities at camp.',
    highlights: [
      'Fern gullies and tall forests',
      'Panoramic views from Mt Buangor',
      'Loop trail returns to start',
      'Great training hike for beginners'
    ],
    booking: 'Book Beeripmo Campground via Parks Victoria',
    bestTime: 'Autumn and Spring'
  },
  'wilsons-prom-southern': {
    name: 'Wilsons Promontory Southern Circuit',
    region: 'Wilsons Promontory National Park',
    coords: [146.4000, -39.0000],
    difficulty: 'intermediate',
    distance: 43,
    days: '3-4',
    elevation: 'Moderate',
    description: 'Victoria\'s most iconic coastal multi-day hike. Pristine beaches, granite headlands, and coastal heathlands.',
    highlights: [
      'Oberon Bay, Little Waterloo Bay',
      'Wilsons Prom Lighthouse',
      'Spectacular coastal scenery',
      'Well-equipped campsites',
      'Wildlife spotting opportunities'
    ],
    booking: 'Book months in advance via ParkStay - very popular!',
    bestTime: 'Autumn and Spring',
    alert: 'Telegraph Saddle to Sealers Cove section currently closed'
  },
  'mount-feathertop': {
    name: 'Mount Feathertop Overnight',
    region: 'Alpine National Park',
    coords: [147.1333, -36.8833],
    difficulty: 'intermediate',
    distance: 22,
    days: 2,
    elevation: 'High (1600m gain)',
    description: 'Victoria\'s second-highest peak! Stunning alpine scenery with panoramic summit views. Camp near Federation Hut.',
    highlights: [
      'Best summit views in Victoria',
      'Iconic Razorback Ridge traverse',
      'Alpine vegetation and snow gums',
      'Federation Hut camping area'
    ],
    booking: 'No booking required for Federation Hut area',
    bestTime: 'November-April (avoid winter unless experienced)',
    alert: 'Exposed ridge, check weather. Snow possible even in summer.'
  },
  'falls-to-hotham': {
    name: 'Falls to Hotham Alpine Crossing',
    region: 'Alpine National Park',
    coords: [147.1500, -36.9000],
    difficulty: 'intermediate',
    distance: 37,
    days: 3,
    elevation: 'High',
    description: 'High plains trek between Falls Creek and Mt Hotham. Open grassy plains, snow gums, and mountain wetlands.',
    highlights: [
      'Above tree line hiking',
      'Pristine alpine wilderness',
      'Cope Hut and Dibbins Hut',
      'Spectacular high country scenery'
    ],
    booking: 'Permits required - book via Parks Victoria',
    bestTime: 'November-April only (snow in winter)'
  },
  'great-ocean-walk': {
    name: 'Great Ocean Walk',
    region: 'Great Ocean Road',
    coords: [143.4000, -38.7500],
    difficulty: 'intermediate',
    distance: 104,
    days: '7-8',
    elevation: 'Moderate',
    description: 'Spectacular coastal walk from Apollo Bay to the 12 Apostles. Beaches, forests, clifftops, and stunning ocean views.',
    highlights: [
      'World-famous 12 Apostles',
      'Pristine beaches and coastal heathland',
      'Well-maintained hike-in camps',
      'Can do shorter sections',
      'Regular shuttle services available'
    ],
    booking: 'Book campsites in advance via Parks Victoria',
    bestTime: 'Autumn and Spring (avoid summer crowds)'
  },
  'little-desert-discovery': {
    name: 'Little Desert Discovery Walk',
    region: 'Little Desert National Park',
    coords: [141.7000, -36.5000],
    difficulty: 'intermediate',
    distance: 74,
    days: 4,
    elevation: 'Low',
    description: 'Unique desert landscape with wildflowers in spring. Well-signed trail through mallee scrub and open plains.',
    highlights: [
      'Different ecosystem - desert hiking',
      'Spring wildflower displays',
      'Great for stargazing',
      'Three campsites along route'
    ],
    booking: 'Book campsites via Parks Victoria',
    bestTime: 'Spring for wildflowers (Sep-Nov)'
  },
  'grampians-peaks-trail': {
    name: 'Grampians Peaks Trail',
    region: 'Grampians (Gariwerd) National Park',
    coords: [142.5000, -37.1500],
    difficulty: 'advanced',
    distance: 160,
    days: 13,
    elevation: 'Variable',
    description: 'Victoria\'s premier long-distance trail from Mt Zero to Dunkeld. World-class ridge walking with spectacular views.',
    highlights: [
      'Iconic ridgeline hiking',
      'Rock scrambling and exposed sections',
      '12 purpose-built campsites',
      'Luxury or standard camping options',
      'Can do shorter sections'
    ],
    booking: 'Bookings essential via Parks Victoria or commercial operators',
    bestTime: 'Autumn (Mar-May) and Spring (Sep-Nov)'
  },
  'great-south-west-walk': {
    name: 'Great South West Walk',
    region: 'Portland / Discovery Bay',
    coords: [141.6000, -38.3500],
    difficulty: 'advanced',
    distance: 250,
    days: '12-14',
    elevation: 'Low',
    description: 'Epic coastal loop combining beaches, forests, and rivers. Remote sections require good navigation.',
    highlights: [
      'Diverse coastal and forest landscapes',
      'Remote wilderness sections',
      'Loop trail returns to Portland',
      'Cape Bridgewater and Discovery Bay'
    ],
    booking: 'Limited facilities - check track conditions',
    bestTime: 'Autumn and Spring'
  },
  'wilderness-coast-walk': {
    name: 'Wilderness Coast Walk',
    region: 'Croajingolong National Park',
    coords: [149.3000, -37.5000],
    difficulty: 'advanced',
    distance: '100+',
    days: '7-8',
    elevation: 'Low',
    description: 'Remote coastal wilderness walk through untouched beaches and forests. Navigation skills essential.',
    highlights: [
      'Pristine wilderness beaches',
      'Wildlife spotting (seals, whales)',
      'Basic campsites',
      'True backcountry experience'
    ],
    booking: 'Check Parks Victoria for camping areas',
    bestTime: 'Autumn and Spring'
  },
  'northern-prom-circuit': {
    name: 'Northern Wilsons Prom Circuit',
    region: 'Wilsons Promontory National Park',
    coords: [146.3500, -38.9000],
    difficulty: 'advanced',
    distance: 'Variable',
    days: '4+',
    elevation: 'Moderate',
    description: 'For experienced hikers only! Remote terrain with river crossings and headland traverses.',
    highlights: [
      'True wilderness experience',
      'Five Mile Beach and remote camps',
      'Minimal trail markers',
      'River crossings required'
    ],
    booking: 'Self-assessment form required. Permits from Parks Victoria.',
    bestTime: 'Summer (avoid winter)',
    alert: 'Expert navigation essential. Remote with no trail markers in sections.'
  },
  'aawt-victoria': {
    name: 'Australian Alps Walking Track (VIC section)',
    region: 'Alpine National Park',
    coords: [146.9000, -37.0000],
    difficulty: 'advanced',
    distance: 655,
    days: 'Multiple weeks',
    elevation: 'Extreme',
    description: 'One of Australia\'s great long-distance trails. Victoria section from Walhalla through Alpine NP.',
    highlights: [
      'Australia\'s premier alpine trail',
      'Highest peaks in Victoria',
      'Mt Bogong, Mt Feathertop, and more',
      'Expert navigation required'
    ],
    booking: 'Extensive planning and support needed',
    bestTime: 'November-March',
    alert: 'Expert only. Requires extensive experience and navigation skills.'
  }
};

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
  
  planningMap = new mapboxgl.Map({
    container: 'planningMap',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [145.0, -37.5],
    zoom: 6,
    pitch: 0,
    bearing: 0
  });

  planningMap.addControl(new mapboxgl.NavigationControl());
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
    planningMap.flyTo({
      center: trail.coords,
      zoom: 10,
      duration: 1500
    });
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
    <span class="grade-badge grade-${trail.difficulty}">${trail.difficulty}</span>
    <h3>${trail.name}</h3>
    <div class="trail-stats">
      <span>📏 ${trail.distance}km</span>
      <span>⏱️ ${trail.days} days</span>
      <span>⛰️ ${trail.elevation}</span>
    </div>
    <p>${trail.description}</p>
    
    ${alertHTML}
    
    <div class="trail-highlights">
      <strong>Highlights:</strong>
      <ul>
        ${trail.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>
    
    <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #d1fae5; font-size: 0.875rem;">
      <strong style="color: #065f46;">Booking:</strong> ${trail.booking}<br>
      <strong style="color: #065f46;">Best Time:</strong> ${trail.bestTime}
    </div>
  `;
  infoCard.style.display = 'block';
}

function showTripSections() {
  document.getElementById('tripDetailsSection').style.display = 'block';
  document.getElementById('gearSection').style.display = 'block';
  document.getElementById('safetySection').style.display = 'block';
  document.getElementById('actionButtons').style.display = 'block';
  
  // Populate gear checklist
  populateGearChecklist();
}

function hideAllSections() {
  document.getElementById('tripDetailsSection').style.display = 'none';
  document.getElementById('gearSection').style.display = 'none';
  document.getElementById('safetySection').style.display = 'none';
  document.getElementById('actionButtons').style.display = 'none';
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
  end.setDate(end.getDate() + days);
  
  const endDateStr = end.toISOString().split('T')[0];
  document.getElementById('endDate').value = endDateStr;
  
  currentTrip.startDate = startDate;
  currentTrip.endDate = endDateStr;
}

// ============ GEAR CHECKLIST ============
function populateGearChecklist() {
  const container = document.getElementById('gearChecklist');
  
  let html = '';
  for (const [category, items] of Object.entries(GEAR_CHECKLIST)) {
    html += `
      <div class="checklist-category">
        <div class="category-title">${category}</div>
    `;
    
    items.forEach((item, index) => {
      const itemId = `gear-${category}-${index}`;
      const isChecked = currentTrip.gearChecked[itemId] || false;
      const essentialClass = item.essential ? 'item-essential' : '';
      
      html += `
        <div class="checklist-item ${isChecked ? 'checked' : ''}">
          <input type="checkbox" 
                 id="${itemId}" 
                 ${isChecked ? 'checked' : ''} 
                 onchange="toggleGearItem('${itemId}')">
          <label for="${itemId}" class="${essentialClass}">
            ${item.item}${item.essential ? ' *' : ''}
          </label>
        </div>
      `;
    });
    
    html += `</div>`;
  }
  
  html += `<p style="font-size: 0.75rem; color: #6b7280; margin-top: 1rem;">* Essential items</p>`;
  
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
      const trailId = Object.keys(TRAILS_DATA).find(
        key => TRAILS_DATA[key].name === currentTrip.trail.name
      );
      if (trailId) {
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