// ============ VICTORIAN MULTI-DAY TRAILS DATA ============
// This data is shared between index.html and planning.html

const TRAILS_DATA = {
  'burchell-trail': {
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
  'beeripmo-walk': {
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
  'wilsons-prom-southern': {
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
  'mount-feathertop': {
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
  'falls-to-hotham': {
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
  'great-ocean-walk': {
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
  'little-desert-discovery': {
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
  'grampians-peaks-trail': {
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
  'great-south-west-walk': {
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
  'wilderness-coast-walk': {
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
  'northern-prom-circuit': {
    id: 'northern-prom-circuit',
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
      'River crossings required',
      'Can customize route length'
    ],
    booking: 'Self-assessment form required. Permits from Parks Victoria.',
    link: 'https://www.parks.vic.gov.au/places-to-see/parks/wilsons-promontory-national-park',
    bestTime: 'Summer (avoid winter)',
    alert: 'Expert navigation essential. Remote with no trail markers in sections.'
  },
  'aawt-victoria': {
    id: 'aawt-victoria',
    name: 'Australian Alps Walking Track - VIC section',
    region: 'Alpine National Park',
    coords: [146.9000, -37.0000],
    difficulty: 'advanced',
    distance: 655,
    days: 'Multiple weeks',
    elevation: 'Extreme',
    description: 'One of Australia\'s great long-distance trails. Victoria section from Walhalla through Alpine National Park.',
    highlights: [
      'Australia\'s premier alpine trail',
      'Highest peaks in Victoria',
      'Mt Bogong, Mt Feathertop, and more',
      'Expert navigation required',
      'Historic huts along the way'
    ],
    booking: 'Extensive planning and support needed',
    link: 'https://www.parks.vic.gov.au/things-to-do/hiking-and-bushwalking/where-to-hike/long-distance-hikes',
    bestTime: 'November-March',
    alert: 'Expert only. Requires extensive experience and navigation skills.'
  }
};

// Convert to array for easier iteration (used by index.html map)
const TRAILS = Object.values(TRAILS_DATA);