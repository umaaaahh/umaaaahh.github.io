// ============ CONFIGURATION ============
mapboxgl.accessToken = 'pk.eyJ1IjoidW1hYnJpZGdlcyIsImEiOiJjbWdlbHM5YTkwdjRnMm1vN2M5MHI4ZWU4In0.VSHdE_aN47-FgZXo2-AsNg';

// ============ DATA STRUCTURE ============

// Waypoint types and their icons
const WAYPOINT_TYPES = {
  HUT: { icon: '🏠', color: '#8B4513', label: 'Hut' },
  CAMPSITE: { icon: '⛺', color: '#2E7D32', label: 'Campsite' },
  PEAK: { icon: '⛰️', color: '#D32F2F', label: 'Peak/Summit' },
  TRAILHEAD: { icon: '🅿️', color: '#1976D2', label: 'Trailhead' },
  WATER: { icon: '💧', color: '#0277BD', label: 'Water Source' }
};

const PARKS = [
  // ========== ALPINE NATIONAL PARK (Regional Breakdown) ==========
  {
    id: 'alpine-np',
    name: 'Alpine National Park',
    region: 'High Country',
    coords: [147.1000, -36.9000],
    hasRegions: true,
    boundary: [
      [146.80, -37.20],
      [147.50, -37.30],
      [147.80, -36.80],
      [147.70, -36.50],
      [147.20, -36.40],
      [146.70, -36.60],
      [146.80, -37.20]
    ],
    regions: [
      {
        id: 'mount-bogong-area',
        name: 'Mount Bogong Area',
        icon: '📍',
        coords: [147.3061, -36.7353],
        description: 'Victoria\'s highest peak at 1986m',
        trails: [
          {
            id: 'bogong-staircase',
            name: 'Mount Bogong via Staircase Spur',
            icon: '🥾',
            days: 1,
            distance: 15,
            grade: 'Hard',
            elevation: 1400,
            description: 'Most popular and direct route to the summit. Steep but well-defined track.',
            routeOptions: [
              'Direct ascent via Staircase Spur (steepest, most popular)',
              'Return via same route or create loop via Eskdale Spur'
            ]
          },
          {
            id: 'bogong-eskdale',
            name: 'Mount Bogong via Eskdale Spur',
            icon: '🥾',
            days: 1,
            distance: 13,
            grade: 'Hard',
            elevation: 1400,
            description: 'Longer but more gradual ascent. Can combine with Staircase for a circuit.',
            routeOptions: [
              'Eskdale Spur ascent (gentler gradient)',
              'Circuit: Up Eskdale, down Staircase (or reverse)'
            ]
          }
        ],
        waypoints: [
          { type: 'TRAILHEAD', name: 'Mountain Creek Campground', coords: [147.2856, -36.7589] },
          { type: 'HUT', name: 'Cleve Cole Hut', coords: [147.3089, -36.7356], description: 'Memorial hut near summit, built 1938' },
          { type: 'HUT', name: 'Bivouac Hut', coords: [147.2978, -36.7445], description: 'On Staircase Spur route' },
          { type: 'HUT', name: 'Michell Hut', coords: [147.2912, -36.7512], description: 'On Eskdale Spur, rebuilt after 2003 fires' },
          { type: 'PEAK', name: 'Mount Bogong Summit', coords: [147.3061, -36.7353], description: '1986m - Victoria\'s highest point' }
        ]
      },
      {
        id: 'mount-feathertop-area',
        name: 'Mount Feathertop Area',
        icon: '📍',
        coords: [147.1333, -36.8833],
        description: 'Victoria\'s second highest peak, iconic Razorback Ridge',
        trails: [
          {
            id: 'feathertop-razorback',
            name: 'Feathertop via Razorback Ridge',
            icon: '🥾',
            days: 2,
            distance: 22,
            grade: 'Hard',
            elevation: 1600,
            description: 'Spectacular exposed ridge walk. One of Victoria\'s most iconic alpine hikes.',
            routeOptions: [
              'Harrietville → MUMC Hut → Razorback → Feathertop → Bungalow Spur descent',
              'Circuit option: Return via Federation Hut',
              'Winter: Extremely exposed, for experienced alpine hikers only'
            ]
          }
        ],
        waypoints: [
          { type: 'TRAILHEAD', name: 'Harrietville Trailhead', coords: [147.0589, -36.9245] },
          { type: 'HUT', name: 'MUMC Hut', coords: [147.0956, -36.8912], description: 'Melbourne Uni Mountaineering Club Hut' },
          { type: 'HUT', name: 'Federation Hut', coords: [147.1245, -36.8756], description: 'On Bungalow Spur route' },
          { type: 'PEAK', name: 'Mount Feathertop Summit', coords: [147.1333, -36.8833], description: '1922m - Iconic pyramid peak' }
        ]
      },
      {
        id: 'bogong-high-plains',
        name: 'Bogong High Plains',
        icon: '📍',
        coords: [147.2500, -36.8500],
        description: 'Expansive alpine plateau with historic cattlemen huts',
        trails: [
          {
            id: 'wallace-heritage-circuit',
            name: 'Wallace Heritage Circuit',
            icon: '🥾',
            days: 1,
            distance: 6,
            grade: 'Easy',
            elevation: 50,
            description: 'Easy circuit visiting historic huts on the high plains.',
            routeOptions: [
              'Wallace Hut → Cope Hut → Rover Chalet → return',
              'Wheelchair accessible path to Wallace Hut available'
            ]
          },
          {
            id: 'falls-hotham-crossing',
            name: 'Falls Creek to Hotham Alpine Crossing',
            icon: '🥾',
            days: 3,
            distance: 35,
            grade: 'Moderate',
            elevation: 800,
            description: 'Classic high country traverse between ski resorts.',
            routeOptions: [
              'Via Cobungra Valley and Dibbins Hut (scenic)',
              'Via Cope Saddle (higher route, more exposed)',
              'Can be done in either direction'
            ]
          }
        ],
        waypoints: [
          { type: 'TRAILHEAD', name: 'Wallace Hut Car Park', coords: [147.2612, -36.8734] },
          { type: 'HUT', name: 'Wallace Hut', coords: [147.2623, -36.8745], description: 'Oldest hut in Alpine NP, built 1889' },
          { type: 'HUT', name: 'Cope Hut', coords: [147.2534, -36.8812], description: 'Popular ski touring hut' },
          { type: 'HUT', name: 'Rover Chalet', coords: [147.2656, -36.8723], description: 'Largest alpine lodge, built 1940' },
          { type: 'HUT', name: 'Edmondson Hut', coords: [147.2234, -36.8534], description: 'Cattleman\'s hut, circa 1930s' },
          { type: 'HUT', name: 'Dibbins Hut', coords: [147.1456, -36.9234], description: 'On Falls-Hotham route' }
        ]
      },
      {
        id: 'razorback-ridge',
        name: 'Razorback Ridge',
        icon: '📍',
        coords: [147.1200, -36.8900],
        description: 'Exposed alpine ridge between Feathertop and Hotham',
        trails: [
          {
            id: 'razorback-traverse',
            name: 'Razorback Ridge Traverse',
            icon: '🥾',
            days: 1,
            distance: 12,
            grade: 'Hard',
            elevation: 600,
            description: 'Spectacular exposed ridge. Amazing views but highly exposed to weather.',
            routeOptions: [
              'Mt Hotham → Razorback → MUMC Hut',
              'Best done in good weather, extremely exposed to wind'
            ]
          }
        ],
        waypoints: [
          { type: 'TRAILHEAD', name: 'Mount Hotham Village', coords: [147.1356, -36.9823] }
        ]
      }
    ],
    thruHikes: [
      {
        id: 'aawt-vic-section',
        name: 'Australian Alps Walking Track (VIC Section)',
        icon: '🏔️',
        distance: 300,
        days: '14-21',
        grade: 'Hard',
        description: '655km total (Walhalla to Canberra). Victorian section traverses Baw Baw, Alpine NP, and Bogong High Plains.',
        highlights: [
          'Starts in Walhalla, ends at NSW border',
          'Crosses Mount Bogong, Bogong High Plains, Falls Creek',
          'Multiple resupply points at Mt Baw Baw, Mt Hotham, Falls Creek',
          'Highly vExecutive.aible track quality - navigation skills essential'
        ],
        routeNotes: 'Track follows ridges and high plains. Many route vExecutive.aitions exist, especially in wilderness areas. GPS recommended.'
      }
    ]
  },

  // ========== GRAMPIANS NATIONAL PARK (Regional Breakdown) ==========
  {
    id: 'grampians',
    name: 'Grampians National Park',
    region: 'Grampians',
    coords: [142.5167, -37.2167],
    hasRegions: true,
    boundary: [
      [142.30, -37.40],
      [142.65, -37.45],
      [142.75, -37.15],
      [142.70, -36.95],
      [142.40, -36.90],
      [142.25, -37.10],
      [142.30, -37.40]
    ],
    regions: [
      {
        id: 'wonderland-range',
        name: 'Wonderland Range (Pinnacle Area)',
        icon: '📍',
        coords: [142.5234, -37.1945],
        description: 'Iconic rock formations and The Pinnacle lookout',
        trails: [
          {
            id: 'pinnacle-circuit',
            name: 'Pinnacle Circuit',
            icon: '🥾',
            days: 1,
            distance: 7.5,
            grade: 'Hard',
            elevation: 450,
            description: 'Steep climb to iconic Pinnacle lookout with panoramic views.',
            routeOptions: [
              'Halls Gap → Pinnacle → return via Grand Canyon (most popular)',
              'Alternative: via Wonderland Track loop',
              'Can extend to Venus Baths for swimming'
            ]
          }
        ],
        waypoints: [
          { type: 'TRAILHEAD', name: 'Halls Gap Visitor Centre', coords: [142.5167, -37.1467] },
          { type: 'PEAK', name: 'The Pinnacle Lookout', coords: [142.5234, -37.1945], description: 'Iconic rock platform with 270° views' }
        ]
      },
      {
        id: 'serra-range',
        name: 'Serra Range',
        icon: '📍',
        coords: [142.4567, -37.2834],
        description: 'Remote wilderness ridges in the southern Grampians',
        trails: [
          {
            id: 'serra-circuit',
            name: 'Serra Range Circuit',
            icon: '🥾',
            days: 2,
            distance: 26,
            grade: 'Hard',
            elevation: 900,
            description: 'Remote and challenging ridge walk. Less crowded, rugged terrain.',
            routeOptions: [
              'Clockwise from Halls Gap recommended',
              'Multiple creek crossings - check water levels',
              'Navigation skills required - track not always well-defined'
            ]
          }
        ],
        waypoints: [
          { type: 'CAMPSITE', name: 'Serra Range Campsite', coords: [142.4512, -37.2912], description: 'Basic bush camping' }
        ]
      },
      {
        id: 'northern-grampians',
        name: 'Northern Grampians (Mt Zero Area)',
        icon: '📍',
        coords: [142.3456, -36.9723],
        description: 'Northern ranges with Aboriginal rock art sites',
        trails: [
          {
            id: 'mount-zero',
            name: 'Mount Zero Summit',
            icon: '🥾',
            days: 1,
            distance: 8,
            grade: 'Moderate',
            elevation: 380,
            description: 'Northern endpoint of the Grampians with excellent views.',
            routeOptions: [
              'Direct ascent from car park (steep)',
              'Can combine with Flat Rock for extended day'
            ]
          }
        ],
        waypoints: [
          { type: 'TRAILHEAD', name: 'Mount Zero Car Park', coords: [142.3423, -36.9645] },
          { type: 'PEAK', name: 'Mount Zero Summit', coords: [142.3456, -36.9723] }
        ]
      }
    ],
    thruHikes: []
  },

  // ========== WILSONS PROMONTORY (Regional Breakdown) ==========
  {
    id: 'wilsons-prom',
    name: 'Wilsons Promontory National Park',
    region: 'Gippsland',
    coords: [146.4167, -39.0333],
    hasRegions: true,
    boundary: [
      [146.25, -39.15],
      [146.35, -39.20],
      [146.50, -39.15],
      [146.55, -38.95],
      [146.50, -38.85],
      [146.35, -38.90],
      [146.25, -39.00],
      [146.25, -39.15]
    ],
    regions: [
      {
        id: 'southern-circuit-area',
        name: 'Southern Circuit Area',
        icon: '📍',
        coords: [146.4500, -39.0800],
        description: 'Remote southern wilderness with pristine beaches',
        trails: [
          {
            id: 'southern-circuit',
            name: 'Southern Circuit',
            icon: '🥾',
            days: '3-5',
            distance: '45-59',
            grade: 'Moderate',
            elevation: 600,
            description: 'Victoria\'s most popular multi-day coastal hike. Multiple route options available.',
            routeOptions: [
              'Classic 3-day: Telegraph Saddle → Sealers Cove → Refuge Cove → Little Waterloo → return',
              'NOTE: Sealers Cove boardwalk currently CLOSED (adds 14km detour)',
              'Alternative: Telegraph → Waterloo → Lighthouse → Roaring Meg → return',
              'Extended 5-day: Include Oberon Bay and lighthouse',
              'Tide-dependent sections at Little Waterloo Bay'
            ]
          }
        ],
        waypoints: [
          { type: 'TRAILHEAD', name: 'Telegraph Saddle Car Park', coords: [146.3867, -38.9834] },
          { type: 'CAMPSITE', name: 'Sealers Cove', coords: [146.4712, -39.0145], description: 'Beautiful curved beach (boardwalk closed)' },
          { type: 'CAMPSITE', name: 'Refuge Cove', coords: [146.4834, -39.0356], description: 'Secluded beach, sheltered' },
          { type: 'CAMPSITE', name: 'Little Waterloo Bay', coords: [146.4723, -39.0823], description: 'Stunning beach, tide crossings' },
          { type: 'CAMPSITE', name: 'Waterloo Bay', coords: [146.4645, -39.0912], description: 'Near lighthouse' },
          { type: 'CAMPSITE', name: 'Roaring Meg', coords: [146.4234, -39.0734], description: 'Fern-covered gully' },
          { type: 'CAMPSITE', name: 'Oberon Bay', coords: [146.3912, -39.0445], description: 'West coast beach' },
          { type: 'PEAK', name: 'Wilsons Promontory Lighthouse', coords: [146.4223, -39.1334], description: 'Southernmost point, accommodation available' }
        ]
      },
      {
        id: 'northern-wilderness',
        name: 'Northern Wilderness',
        icon: '📍',
        coords: [146.4000, -38.9000],
        description: 'Remote wilderness zone, undefined tracks',
        trails: [
          {
            id: 'northern-circuit',
            name: 'Northern Circuit',
            icon: '🥾',
            days: '4-6',
            distance: '50+',
            grade: 'Hard',
            elevation: 800,
            description: 'WILDERNESS ROUTE: Experienced hikers only. Undefined tracks, navigation essential.',
            routeOptions: [
              'Multiple route vExecutive.aitions exist',
              'Track marked only with flagging tape in sections',
              'Requires advanced navigation and bushwalking skills',
              'Must complete Hiker Self-Assessment before permits issued'
            ]
          }
        ],
        waypoints: [
          { type: 'CAMPSITE', name: 'Five Mile Beach', coords: [146.3823, -38.8912], description: 'Remote northern beach' }
        ]
      },
      {
        id: 'tidal-river-area',
        name: 'Tidal River & Day Walks',
        icon: '📍',
        coords: [146.3234, -39.0156],
        description: 'Main visitor hub with easy access walks',
        trails: [
          {
            id: 'mount-oberon',
            name: 'Mount Oberon Summit',
            icon: '🥾',
            days: 1,
            distance: 7,
            grade: 'Moderate',
            elevation: 350,
            description: 'Popular summit walk with panoramic views over the Prom.',
            routeOptions: [
              'Telegraph Saddle → Summit → return (most popular)',
              'Sealed management track, some steps near summit'
            ]
          }
        ],
        waypoints: [
          { type: 'TRAILHEAD', name: 'Tidal River Campground', coords: [146.3234, -39.0089] },
          { type: 'PEAK', name: 'Mount Oberon Summit', coords: [146.3956, -38.9967], description: 'Best panoramic views of Wilsons Prom' }
        ]
      }
    ],
    thruHikes: []
  },

  // ========== SIMPLE PARKS (No Regional Breakdown) ==========
  {
    id: 'great-otway',
    name: 'Great Otway National Park',
    region: 'Great Ocean Road',
    coords: [143.5500, -38.6500],
    hasRegions: false,
    boundary: [
      [143.30, -38.80],
      [143.75, -38.85],
      [143.80, -38.50],
      [143.60, -38.40],
      [143.35, -38.45],
      [143.30, -38.80]
    ],
    trails: [
      {
        id: 'great-ocean-walk',
        name: 'Great Ocean Walk (Sections)',
        icon: '🥾',
        days: 3,
        distance: 35,
        grade: 'Easy',
        elevation: 320,
        description: 'Stunning coastal walk with ocean views and rainforest sections.',
        routeOptions: [
          'Full walk is 100km over 7 days (Apollo Bay to 12 Apostles)',
          'Popular 3-day section: Apollo Bay → Aire River',
          'Well-marked track with designated campsites'
        ]
      }
    ],
    waypoints: [
      { type: 'TRAILHEAD', name: 'Apollo Bay Visitor Centre', coords: [143.6689, -38.7589] },
      { type: 'CAMPSITE', name: 'Blanket Bay', coords: [143.5234, -38.7123] },
      { type: 'CAMPSITE', name: 'Cape Otway', coords: [143.5123, -38.8567] }
    ],
    thruHikes: []
  },

  {
    id: 'cathedral-range',
    name: 'Cathedral Range State Park',
    region: 'Central Highlands',
    coords: [145.9667, -37.4000],
    hasRegions: false,
    boundary: [
      [145.90, -37.45],
      [146.05, -37.47],
      [146.08, -37.35],
      [145.95, -37.32],
      [145.90, -37.45]
    ],
    trails: [
      {
        id: 'cathedral-southern',
        name: 'Southern Circuit',
        icon: '🥾',
        days: 2,
        distance: 18,
        grade: 'Hard',
        elevation: 920,
        description: 'Challenging rocky circuit with exposed scrambles over spectacular peaks.',
        routeOptions: [
          'Clockwise from Cooks Mill recommended',
          'Includes technical scrambles - not for beginners',
          'Razorback section exposed - avoid in bad weather'
        ]
      }
    ],
    waypoints: [
      { type: 'TRAILHEAD', name: 'Cooks Mill Car Park', coords: [145.9523, -37.4234] },
      { type: 'CAMPSITE', name: 'Farmyard Creek', coords: [145.9834, -37.4112] }
    ],
    thruHikes: []
  },

  {
    id: 'croajingolong',
    name: 'Croajingolong National Park',
    region: 'East Gippsland',
    coords: [149.9167, -37.5167],
    hasRegions: false,
    boundary: [
      [149.60, -37.70],
      [150.10, -37.75],
      [150.15, -37.35],
      [149.95, -37.25],
      [149.65, -37.30],
      [149.60, -37.70]
    ],
    trails: [
      {
        id: 'wilderness-coast',
        name: 'Wilderness Coast Walk',
        icon: '🥾',
        days: 3,
        distance: 45,
        grade: 'Moderate',
        elevation: 520,
        description: 'Remote coastal wilderness through pristine beaches. Tide-dependent.',
        routeOptions: [
          'Sydenham Inlet → Mallacoota Inlet (or reverse)',
          'Check tide times before departing',
          'Very remote - carry all supplies'
        ]
      }
    ],
    waypoints: [
      { type: 'TRAILHEAD', name: 'Sydenham Inlet', coords: [149.6234, -37.5523] },
      { type: 'CAMPSITE', name: 'Mueller Inlet', coords: [149.7834, -37.5234] }
    ],
    thruHikes: []
  },

  {
    id: 'mount-buffalo',
    name: 'Mount Buffalo National Park',
    region: 'High Country',
    coords: [146.7833, -36.7333],
    hasRegions: false,
    boundary: [
      [146.65, -36.80],
      [146.90, -36.82],
      [146.92, -36.65],
      [146.75, -36.62],
      [146.65, -36.80]
    ],
    trails: [
      {
        id: 'buffalo-gorge',
        name: 'Gorge Walk',
        icon: '🥾',
        days: 1,
        distance: 6,
        grade: 'Easy',
        elevation: 220,
        description: 'Gentle walk through mountain ash forest to stunning gorge views.',
        routeOptions: ['Loop track from Cresta Valley']
      },
      {
        id: 'the-horn',
        name: 'The Horn Summit',
        icon: '🥾',
        days: 1,
        distance: 8,
        grade: 'Moderate',
        elevation: 300,
        description: 'Summit walk with 360-degree alpine views from granite tors.',
        routeOptions: ['Various routes from Mount Buffalo Chalet area']
      }
    ],
    waypoints: [
      { type: 'PEAK', name: 'The Horn', coords: [146.7889, -36.7245], description: 'Iconic granite summit' }
    ],
    thruHikes: []
  },

  {
    id: 'baw-baw',
    name: 'Baw Baw National Park',
    region: 'Central Highlands',
    coords: [146.2833, -37.8333],
    hasRegions: false,
    boundary: [
      [146.20, -37.90],
      [146.40, -37.92],
      [146.42, -37.78],
      [146.28, -37.75],
      [146.20, -37.90]
    ],
    trails: [
      {
        id: 'baw-baw-plateau',
        name: 'Baw Baw Plateau Circuit',
        icon: '🥾',
        days: 2,
        distance: 20,
        grade: 'Moderate',
        elevation: 450,
        description: 'Subalpine plateau walk through snow gum forests and alpine meadows.',
        routeOptions: ['Part of AAWT route', 'Can be done as day sections']
      }
    ],
    waypoints: [
      { type: 'TRAILHEAD', name: 'Mount Baw Baw Alpine Resort', coords: [146.2734, -37.8412] }
    ],
    thruHikes: []
  }
];

// ============ STATE ============
let map;
let is3D = false;
let isSatellite = false;
let selectedPark = null;
let selectedRegion = null;
let currentView = 'overview';

// ============ NAVIGATION ============
function showMap() {
  document.getElementById('splashPage').classList.add('hidden');
  document.getElementById('mapPage').classList.remove('hidden');
  initMap();
}

function showSplash() {
  document.getElementById('mapPage').classList.add('hidden');
  document.getElementById('splashPage').classList.remove('hidden');
  closeSidebar();
}

function showMyTrips() {
  alert('My Trips feature - Coming soon! (Requires login)');
}

function closeSidebar() {
  document.getElementById('parkSidebar').classList.remove('active');
  selectedPark = null;
  selectedRegion = null;
  currentView = 'overview';
}

// ============ MAP INITIALIZATION ============
function initMap() {
  if (map) return;
  
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center: [144.5, -37.5],
    zoom: 6.5,
    pitch: 0,
    bearing: 0
  });
  
  map.on('load', () => {
    map.addSource('mapbox-dem', {
      type: 'raster-dem',
      url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      tileSize: 512,
      maxzoom: 14
    });
    
    addParkPolygons();
  });
}

function addParkPolygons() {
  PARKS.forEach(park => {
    const parkId = `park-${park.id}`;
    
    map.addSource(parkId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [park.boundary]
        },
        properties: {
          name: park.name,
          id: park.id
        }
      }
    });
    
    map.addLayer({
      id: `${parkId}-fill`,
      type: 'fill',
      source: parkId,
      paint: {
        'fill-color': '#047857',
        'fill-opacity': 0.3
      }
    });
    
    map.addLayer({
      id: `${parkId}-outline`,
      type: 'line',
      source: parkId,
      paint: {
        'line-color': '#047857',
        'line-width': 2
      }
    });
    
    map.on('mouseenter', `${parkId}-fill`, () => {
      map.getCanvas().style.cursor = 'pointer';
      map.setPaintProperty(`${parkId}-fill`, 'fill-opacity', 0.3);
      map.setPaintProperty(`${parkId}-outline`, 'line-width', 4);
    });
    
    map.on('mouseleave', `${parkId}-fill`, () => {
      map.getCanvas().style.cursor = '';
      map.setPaintProperty(`${parkId}-fill`, 'fill-opacity', 0.15);
      map.setPaintProperty(`${parkId}-outline`, 'line-width', 3);
    });
    
    map.on('click', `${parkId}-fill`, () => {
      showParkDetail(park);
    });
    
    map.addSource(`${parkId}-label`, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: park.coords
        },
        properties: {
          name: park.name
        }
      }
    });
    
    map.addLayer({
      id: `${parkId}-label`,
      type: 'symbol',
      source: `${parkId}-label`,
      layout: {
        'text-field': ['get', 'name'],
        'text-size': 13,
        'text-anchor': 'center',
        'text-offset': [0, 0],
        'text-font': ['DIN Pro Medium', 'Executive.ail Unicode MS Regular']
      },
      paint: {
        'text-color': '#059669',
        'text-halo-color': '#ffffff',
        'text-halo-width': 2,
        'text-halo-blur': 1
      }
    });
  });
}

// ============ PARK DETAIL VIEW ============
function showParkDetail(park) {
  selectedPark = park;
  currentView = 'park';
  
  const sidebar = document.getElementById('parkSidebar');
  const content = document.getElementById('sidebarContent');
  
  let html = `
    <div class="sidebar-header">
      <h2>${park.name}</h2>
      <button onclick="closeSidebar()" class="close-btn">✕</button>
    </div>
    <div class="sidebar-body">
      <p class="region-tag">${park.region}</p>
  `;
  
  if (park.hasRegions) {
    html += `<h3>Regions</h3><div class="regions-list">`;
    park.regions.forEach(region => {
      html += `
        <div class="region-card" onclick="showRegionDetail('${park.id}', '${region.id}')">
          <div class="region-icon">${region.icon}</div>
          <div>
            <h4>${region.name}</h4>
            <p>${region.description}</p>
          </div>
        </div>
      `;
    });
    html += `</div>`;
  } else {
    html += `<h3>Trails</h3>`;
    park.trails.forEach(trail => {
      html += renderTrailCard(trail);
    });
  }
  
  if (park.thruHikes && park.thruHikes.length > 0) {
    html += `<h3>Thru-Hikes</h3>`;
    park.thruHikes.forEach(hike => {
      html += renderThruHikeCard(hike);
    });
  }
  
  html += `</div>`;
  content.innerHTML = html;
  sidebar.classList.add('active');
  
  flyToPark(park);
}

function showRegionDetail(parkId, regionId) {
  const park = PARKS.find(p => p.id === parkId);
  const region = park.regions.find(r => r.id === regionId);
  
  selectedRegion = region;
  currentView = 'region';
  
  const content = document.getElementById('sidebarContent');
  
  let html = `
    <div class="sidebar-header">
      <button onclick="showParkDetail(${JSON.stringify(park).replace(/"/g, '&quot;')})" class="back-btn">← Back</button>
      <h2>${region.name}</h2>
      <button onclick="closeSidebar()" class="close-btn">✕</button>
    </div>
    <div class="sidebar-body">
      <p>${region.description}</p>
      <h3>Trails</h3>
  `;
  
  region.trails.forEach(trail => {
    html += renderTrailCard(trail);
  });
  
  if (region.waypoints && region.waypoints.length > 0) {
    html += `<h3>Waypoints</h3><div class="waypoints-list">`;
    region.waypoints.forEach(wp => {
      const wpType = WAYPOINT_TYPES[wp.type];
      html += `
        <div class="waypoint-item">
          <span class="waypoint-icon" style="color: ${wpType.color}">${wpType.icon}</span>
          <div>
            <strong>${wp.name}</strong>
            ${wp.description ? `<p>${wp.description}</p>` : ''}
          </div>
        </div>
      `;
    });
    html += `</div>`;
  }
  
  html += `</div>`;
  content.innerHTML = html;
  
  flyToRegion(region);
  addWaypoints(region.waypoints);
}

function renderTrailCard(trail) {
  return `
    <div class="trail-card">
      <div class="trail-header">
        <h4>${trail.icon} ${trail.name}</h4>
        <span class="grade-badge grade-${trail.grade.toLowerCase()}">${trail.grade}</span>
      </div>
      <div class="trail-stats">
        <span>📅 ${trail.days} day${trail.days > 1 ? 's' : ''}</span>
        <span>📏 ${trail.distance}km</span>
        <span>⛰️ ${trail.elevation}m</span>
      </div>
      <p>${trail.description}</p>
      ${trail.routeOptions ? `
        <details>
          <summary>Route Options</summary>
          <ul>
            ${trail.routeOptions.map(opt => `<li>${opt}</li>`).join('')}
          </ul>
        </details>
      ` : ''}
    </div>
  `;
}

function renderThruHikeCard(hike) {
  return `
    <div class="thruhike-card">
      <h4>${hike.icon} ${hike.name}</h4>
      <div class="trail-stats">
        <span>📅 ${hike.days} days</span>
        <span>📏 ${hike.distance}km</span>
        <span class="grade-badge grade-${hike.grade.toLowerCase()}">${hike.grade}</span>
      </div>
      <p>${hike.description}</p>
      ${hike.highlights ? `
        <details>
          <summary>Highlights</summary>
          <ul>
            ${hike.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </details>
      ` : ''}
      ${hike.routeNotes ? `<p class="route-notes"><strong>Route Notes:</strong> ${hike.routeNotes}</p>` : ''}
    </div>
  `;
}

// ============ MAP CONTROLS ============
function flyToPark(park) {
  const bounds = new mapboxgl.LngLatBounds();
  park.boundary.forEach(coord => bounds.extend(coord));
  
  map.fitBounds(bounds, {
    padding: { top: 50, bottom: 50, left: 450, right: 50 },
    duration: 1500
  });
}

function flyToRegion(region) {
  map.flyTo({
    center: region.coords,
    zoom: 12,
    duration: 1500,
    padding: { left: 400 }
  });
}

function addWaypoints(waypoints) {
  if (!waypoints) return;
  
  if (map.getLayer('waypoints')) {
    map.removeLayer('waypoints');
    map.removeSource('waypoints');
  }
  
  const features = waypoints.map(wp => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: wp.coords
    },
    properties: {
      name: wp.name,
      type: wp.type,
      icon: WAYPOINT_TYPES[wp.type].icon,
      description: wp.description || ''
    }
  }));
  
  map.addSource('waypoints', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: features
    }
  });
  
  map.addLayer({
    id: 'waypoints',
    type: 'symbol',
    source: 'waypoints',
    layout: {
      'text-field': ['get', 'icon'],
      'text-size': 20,
      'text-anchor': 'center'
    }
  });
  
  map.on('click', 'waypoints', (e) => {
    const props = e.features[0].properties;
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(`
        <strong>${props.name}</strong><br>
        ${props.description}
      `)
      .addTo(map);
  });
  
  map.on('mouseenter', 'waypoints', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  
  map.on('mouseleave', 'waypoints', () => {
    map.getCanvas().style.cursor = '';
  });
}

// ============ VIEW CONTROLS ============
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
  
  if (isSatellite) {
    map.setStyle('mapbox://styles/mapbox/satellite-streets-v12');
    btn.classList.add('active');
  } else {
    map.setStyle('mapbox://styles/mapbox/outdoors-v12');
    btn.classList.remove('active');
  }
  
  map.once('styledata', () => {
    map.addSource('mapbox-dem', {
      type: 'raster-dem',
      url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
      tileSize: 512,
      maxzoom: 14
    });
    
    if (is3D) {
      map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
    }
    
    addParkPolygons();
    
    if (selectedRegion && selectedRegion.waypoints) {
      addWaypoints(selectedRegion.waypoints);
    }
  });
}

function resetView() {
  map.flyTo({
    center: [144.5, -37.5],
    zoom: 6.5,
    pitch: 0,
    bearing: 0,
    duration: 1500
  });
  
  closeSidebar();
  
  if (map.getLayer('waypoints')) {
    map.removeLayer('waypoints');
    map.removeSource('waypoints');
  }
}