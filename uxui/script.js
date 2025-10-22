// ============ CONFIGURATION ============
mapboxgl.accessToken = 'pk.eyJ1IjoidW1hYnJpZGdlcyIsImEiOiJjbWdlbHM5YTkwdjRnMm1vN2M5MHI4ZWU4In0.VSHdE_aN47-FgZXo2-AsNg';

// ============ VICTORIAN MULTI-DAY TRAILS DATA ============
const TRAILS = [
  {
    id: 'grampians-peaks-trail',
    name: 'Grampians Peaks Trail',
    region: 'Grampians (Gariwerd) National Park',
    coords: [142.5000, -37.1500],
    difficulty: 'advanced',
    distance: 160,
    days: 13,
    elevation: 'Variable',
    description: 'Victoria\'s premier long-distance trail from Mt Zero to Dunkeld. World-class ridge walking with spectacular views across the Grampians.',
    highlights: [
      'Iconic ridgeline hiking with 360° views',
      'Rock scrambling and exposed sections',
      '12 purpose-built campsites with facilities',
      'Luxury camp-to-camp or standard camping options',
      'Can be done in shorter sections'
    ],
    booking: 'Bookings essential via Parks Victoria or commercial operators',
    link: 'https://www.parks.vic.gov.au/things-to-do/hiking-and-bushwalking/where-to-hike/long-distance-hikes',
    bestTime: 'Autumn (Mar-May) and Spring (Sep-Nov)'
  },
  {
    id: 'great-ocean-walk',
    name: 'Great Ocean Walk',
    region: 'Great Ocean Road',
    coords: [143.4000, -38.7500],
    difficulty: 'intermediate',
    distance: 104,
    days: '7-8',
    elevation: 'Moderate',
    description: 'Spectacular coastal walk from Apollo Bay to the 12 Apostles. Beaches, forests, clifftops, and stunning ocean views throughout.',
    highlights: [
      'World-famous 12 Apostles',
      'Pristine beaches and coastal heathland',
      'Well-maintained hike-in camps with facilities',
      'Can do shorter sections',
      'Regular shuttle services available'
    ],
    booking: 'Book campsites in advance via Parks Victoria',
    link: 'https://www.parks.vic.gov.au/things-to-do/hiking-and-bushwalking/where-to-hike/long-distance-hikes',
    bestTime: 'Autumn and Spring (avoid summer crowds)'
  },
  {
    id: 'wilsons-prom-southern',
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
    link: 'https://www.parks.vic.gov.au/places-to-see/parks/wilsons-promontory-national-park',
    bestTime: 'Autumn and Spring',
    alert: 'Telegraph Saddle to Sealers Cove section currently closed'
  },
  {
    id: 'burchell-trail',
    name: 'Burchell Trail',
    region: 'Brisbane Ranges National Park',
    coords: [144.2000, -37.8500],
    difficulty: 'beginner',
    distance: 40,
    days: 3,
    elevation: 'Low',
    description: 'Perfect first overnight hike! Well-marked trail through forest with facilities. Easy access from Melbourne.',
    highlights: [
      'Great beginner multi-day trail',
      'Two hike-in campgrounds with facilities',
      'Historic Steiglitz ghost town',
      'Can do shorter out-and-back sections',
      'Close to Melbourne (1.5 hours)'
    ],
    booking: 'Book via Parks Victoria website',
    link: 'https://www.parks.vic.gov.au/places-to-see/parks/brisbane-ranges-national-park',
    bestTime: 'Autumn and Spring (can be hot in summer)'
  },
  {
    id: 'beeripmo-walk',
    name: 'Beeripmo Walk',
    region: 'Mount Cole / Mount Buangor State Park',
    coords: [143.2500, -37.4500],
    difficulty: 'beginner',
    distance: 21,
    days: 2,
    elevation: 'Moderate',
    description: 'Beautiful 2-day loop with stunning views of the Grampians. Well-maintained with facilities at camp.',
    highlights: [
      'Fern gullies and tall forests',
      'Panoramic views from Mt Buangor',
      'Water tank and toilet at Beeripmo Camp',
      'Loop trail returns to start',
      'Great training hike for beginners'
    ],
    booking: 'Book Beeripmo Campground via Parks Victoria',
    link: 'https://www.parks.vic.gov.au/places-to-see/parks/mount-buangor-state-park',
    bestTime: 'Autumn and Spring'
  },
  {
    id: 'mount-feathertop',
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
      'Federation Hut camping area',
      'Can descend via multiple routes'
    ],
    booking: 'No booking required for Federation Hut area',
    link: 'https://www.parks.vic.gov.au/places-to-see/parks/alpine-national-park',
    bestTime: 'November-April (avoid winter unless experienced)',
    alert: 'Exposed ridge, check weather. Snow possible even in summer.'
  },
  {
    id: 'falls-to-hotham',
    name: 'Falls to Hotham Alpine Crossing',
    region: 'Alpine National Park',
    coords: [147.1500, -36.9000],
    difficulty: 'intermediate',
    distance: 37,
    days: '3 days / 2 nights',
    elevation: 'High',
    description: 'High plains trek between Falls Creek and Mt Hotham. Open grassy plains, snow gums, and mountain wetlands.',
    highlights: [
      'Above tree line hiking',
      'Pristine alpine wilderness',
      'Cope Hut and Dibbins Hut',
      'Spectacular high country scenery',
      'Point-to-point walk (car shuffle needed)'
    ],
    booking: 'Permits required - book via Parks Victoria',
    link: 'https://www.parks.vic.gov.au/things-to-do/hiking-and-bushwalking/where-to-hike/long-distance-hikes',
    bestTime: 'November-April only (snow in winter)'
  },
  {
    id: 'great-south-west-walk',
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
      'Cape Bridgewater and Discovery Bay',
      'Can do shorter sections'
    ],
    booking: 'Limited facilities - check track conditions',
    link: 'https://www.parks.vic.gov.au/things-to-do/hiking-and-bushwalking/where-to-hike/long-distance-hikes',
    bestTime: 'Autumn and Spring'
  },
  {
    id: 'little-desert-discovery',
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
      'Spring wildflower displays (September-November)',
      'Great for stargazing',
      'Three campsites along route',
      'Well-marked trail'
    ],
    booking: 'Book campsites via Parks Victoria',
    link: 'https://www.parks.vic.gov.au/places-to-see/parks/little-desert-national-park',
    bestTime: 'Spring for wildflowers (Sep-Nov)'
  },
  {
    id: 'wilderness-coast-walk',
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
      'Wildlife spotting (seals, whales in season)',
      'Basic campsites',
      'True backcountry experience',
      'Can extend into NSW'
    ],
    booking: 'Check Parks Victoria for camping areas',
    link: 'https://www.parks.vic.gov.au/places-to-see/parks/croajingolong-national-park',
    bestTime: 'Autumn and Spring'
  },
  {
    id: 'northern-prom-circuit',
    name: 'Northern Wilsons Prom Circuit',
    region: 'Wilsons Promontory National Park',
    coords: [146.3500, -38.9000],
    difficulty: 'advanced',
    distance: 'Variable',
    days: '4+',
    elevation: 'Moderate',
    description: 'For experienced hikers only! Remote terrain with river crossings and headland traverses. Self-assessment required.',
    highlights: [
      'True wilderness experience',
      'Five Mile Beach and remote camps',
      'Minimal trail markers',
      'River crossings and navigation challenges',
      'Five hike-in campgrounds'
    ],
    booking: 'Self-assessment form required. Permits from Parks Victoria.',
    link: 'https://www.parks.vic.gov.au/places-to-see/parks/wilsons-promontory-national-park',
    bestTime: 'Summer (avoid winter)',
    alert: 'Expert navigation essential. Remote with no trail markers in sections.'
  },
  {
    id: 'aawt-victoria',
    name: 'Australian Alps Walking Track (VIC section)',
    region: 'Alpine National Park',
    coords: [146.9000, -37.0000],
    difficulty: 'advanced',
    distance: 655,
    days: 'Multiple weeks',
    elevation: 'Extreme',
    description: 'One of Australia\'s great long-distance trails. Victoria section from Walhalla through Alpine NP. Extensive planning required.',
    highlights: [
      'Australia\'s premier alpine trail',
      'Highest peaks in Victoria',
      'Mt Bogong, Mt Feathertop, and more',
      'Expert navigation required',
      'Continues into NSW if desired'
    ],
    booking: 'Extensive planning and support needed',
    link: 'https://www.parks.vic.gov.au/things-to-do/hiking-and-bushwalking/where-to-hike/long-distance-hikes',
    bestTime: 'November-March',
    alert: 'Expert only. Requires extensive experience and navigation skills.'
  }
];

// ============ MAP INITIALIZATION ============
let map;
let is3D = false;
let isSatellite = false;

function initMap() {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [145.0, -37.5], // Victoria center
    zoom: 6.5,
    pitch: 0,
    bearing: 0
  });

  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.FullscreenControl());

  map.on('load', () => {
    // Add terrain source for 3D
    map.addSource('mapbox-dem', {
      'type': 'raster-dem',
      'url': 'mapbox://mapbox.terrain-rgb'
    });

    // Add trail markers
    addTrailMarkers();
  });
}

function addTrailMarkers() {
  TRAILS.forEach(trail => {
    // Create marker element
    const el = document.createElement('div');
    el.className = `trail-marker ${trail.difficulty}-marker`;
    
    // Create popup content
    const popupContent = `
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

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(popupContent);

    const marker = new mapboxgl.Marker(el)
      .setLngLat(trail.coords)
      .setPopup(popup)
      .addTo(map);

    // Click to show sidebar
    el.addEventListener('click', () => {
      showTrailDetails(trail);
    });
  });
}

function getDifficultyColor(difficulty) {
  const colors = {
    beginner: '#d1fae5; color: #065f46',
    intermediate: '#fef3c7; color: #92400e',
    advanced: '#fee2e2; color: #991b1b'
  };
  return colors[difficulty] || colors.intermediate;
}

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

  // Fly to trail location
  map.flyTo({
    center: trail.coords,
    zoom: 10,
    duration: 1500
  });
}

function closeSidebar() {
  document.getElementById('trailSidebar').classList.remove('active');
}

// ============ MAP CONTROLS ============
function toggle3D() {
  is3D = !is3D;
  const btn = document.getElementById('btn3D');
  
  if (is3D) {
    map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
    map.easeTo({ pitch: 60, duration: 1000 });
    btn.classList.add('active');
  } else {
    map.setTerrain(null);
    map.easeTo({ pitch: 0, duration: 1000 });
    btn.classList.remove('active');
  }
}

function toggleSatellite() {
  isSatellite = !isSatellite;
  const btn = document.getElementById('btnSatellite');
  
  const style = isSatellite ? 
    'mapbox://styles/mapbox/satellite-streets-v12' : 
    'mapbox://styles/mapbox/outdoors-v12';
  
  map.setStyle(style);
  btn.classList.toggle('active');
  
  // Re-add markers after style load
  map.once('style.load', () => {
    if (is3D) {
      map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.terrain-rgb'
      });
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
    }
    addTrailMarkers();
  });
}

function resetView() {
  map.flyTo({
    center: [145.0, -37.5],
    zoom: 6.5,
    pitch: 0,
    bearing: 0,
    duration: 1500
  });
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