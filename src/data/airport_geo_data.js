// Authentic Geographic & Infrastructure Database for 5 Major Japanese Airports
// Coordinates in WGS84 (Lat/Lon degrees, Elevation meters AMSL) + Exact Meter Cartesian Converter
// Origin (0, 0, 0) for each airport = geometric center of Primary Runway

const DEG_TO_RAD = Math.PI / 180;

/**
 * Convert geographic coordinates (Lat, Lon, Alt) into local Cartesian 3D coordinates (X, Y, Z) in meters.
 * Convention (Three.js right-handed, Y-up):
 *   +X = East (meters)
 *   +Y = Altitude above airport origin elevation (meters)
 *   -Z = North (meters), +Z = South (meters)
 * Origin (0, 0, 0) sits at `origin` (primary runway center).
 */
export function latLonAltToCartesian(lat, lon, alt = 0, origin = { lat: 34.85841, lon: 136.80541, alt: 4.6 }) {
  const lat0Rad = origin.lat * DEG_TO_RAD;
  // High-precision WGS84 ellipsoidal meridional & prime-vertical arc lengths (m/deg)
  const metersPerDegLat = 111132.92 - 559.82 * Math.cos(2 * lat0Rad) + 1.175 * Math.cos(4 * lat0Rad);
  const metersPerDegLon = 111412.84 * Math.cos(lat0Rad) - 93.5 * Math.cos(3 * lat0Rad);

  const dLat = lat - origin.lat;
  const dLon = lon - origin.lon;
  const x = dLon * metersPerDegLon;   // East (+X)
  const z = -dLat * metersPerDegLat;  // North (-Z), South (+Z)
  const y = (alt ?? origin.alt) - (origin.alt ?? 0);
  return { x, y, z };
}

/**
 * Inverse helper: offset in meters (eastM, northM) from origin -> { lat, lon }
 * Used internally to guarantee exact geometric alignment between real thresholds, aprons, terminals & spots.
 */
function offsetLatLon(origin, eastM, northM) {
  const lat0Rad = origin.lat * DEG_TO_RAD;
  const metersPerDegLat = 111132.92 - 559.82 * Math.cos(2 * lat0Rad) + 1.175 * Math.cos(4 * lat0Rad);
  const metersPerDegLon = 111412.84 * Math.cos(lat0Rad) - 93.5 * Math.cos(3 * lat0Rad);
  return {
    lat: Number((origin.lat + northM / metersPerDegLat).toFixed(6)),
    lon: Number((origin.lon + eastM / metersPerDegLon).toFixed(6))
  };
}

/**
 * Helper to create a runway threshold pair from center, length (m), true heading (deg).
 */
function buildRunwayGeo(origin, id, designators, centerEastM, centerNorthM, lengthM, widthM, headingDeg, elevM) {
  const rad = headingDeg * DEG_TO_RAD;
  const dx = Math.sin(rad) * (lengthM * 0.5);
  const dn = Math.cos(rad) * (lengthM * 0.5);
  const thrA = offsetLatLon(origin, centerEastM - dx, centerNorthM - dn);
  const thrB = offsetLatLon(origin, centerEastM + dx, centerNorthM + dn);
  return {
    id,
    designators, // e.g. ['36', '18']
    label: `${designators[0]}/${designators[1]}`,
    lengthM,
    widthM,
    headingDeg,
    elevationM: elevM,
    thresholdA: { ...thrA, alt: elevM },
    thresholdB: { ...thrB, alt: elevM }
  };
}

function buildPoly(origin, ptsMeters) {
  return ptsMeters.map(([e, n]) => offsetLatLon(origin, e, n));
}

function buildSpot(origin, id, label, eastM, northM, headingDeg, opts = {}) {
  const ll = offsetLatLon(origin, eastM, northM);
  return {
    id,
    label,
    lat: ll.lat,
    lon: ll.lon,
    alt: origin.alt,
    headingDeg, // Aircraft nose compass heading (0 = North, 90 = East, 180 = South, 270 = West)
    hasPbb: opts.hasPbb !== false,
    terminal: opts.terminal || 'T1',
    widebodyCapable: opts.widebodyCapable !== false,
    // Service road entry & staging waypoints relative to spot in local meters (east, north)
    gseEntry: offsetLatLon(origin, eastM + (opts.entryDE ?? 85), northM + (opts.entryDN ?? 52))
  };
}

// =====================================================================
// 5 MAJOR JAPANESE AIRPORTS — REAL WGS84 GEOGRAPHIC DATABASE
// =====================================================================
const NGO_ORIGIN = { lat: 34.858410, lon: 136.805410, alt: 4.6 };
const HND_ORIGIN = { lat: 35.552260, lon: 139.779690, alt: 6.4 };
const NRT_ORIGIN = { lat: 35.764720, lon: 140.386390, alt: 43.0 };
const KIX_ORIGIN = { lat: 34.427300, lon: 135.244000, alt: 5.2 };
const CTS_ORIGIN = { lat: 42.775200, lon: 141.692280, alt: 25.0 };

export const AIRPORT_GEO_DATA = {
  // -------------------------------------------------------------------
  // 1. CHUBU CENTRAIR INTERNATIONAL AIRPORT (NGO / RJGG) — Ise Bay Island
  // -------------------------------------------------------------------
  NGO: {
    code: 'NGO',
    icao: 'RJGG',
    nameJa: '中部国際空港（セントレア）',
    nameVi: 'Sân bay Quốc tế Chubu Centrair (NGO / RJGG)',
    nameEn: 'Chubu Centrair International Airport (NGO / RJGG)',
    regionJa: '愛知県常滑市・伊勢湾人工島',
    regionVi: 'Đảo nhân tạo Vịnh Ise, Tokoname, Aichi',
    regionEn: 'Ise Bay Artificial Island, Aichi',
    terrainType: 'bay_island', // Reflective bay water shader + seawall
    waterColor: 0x0c4a6e,
    landColor: 0x4d6b53,
    hasBridge: true,
    hasSnow: false,
    origin: NGO_ORIGIN,
    // Authentic trapezoidal artificial island outline (~4.2km N-S x 1.7km E-W)
    boundary: buildPoly(NGO_ORIGIN, [
      [-430, -2100], [640, -2100], [1180, -1420], [1220, 1520],
      [680, 2120], [-430, 2120], [-520, 1680], [-520, -1680]
    ]),
    // Connecting Centrair Bridge to Tokoname mainland (East)
    bridgePath: buildPoly(NGO_ORIGIN, [[1180, 180], [2650, 240]]),
    runways: [
      buildRunwayGeo(NGO_ORIGIN, 'RWY-36-18', ['36', '18'], 0, 0, 3500, 60, 357, 4.6)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: buildPoly(NGO_ORIGIN, [[210, -1720], [210, 1720]]) },
      { id: 'TWY-B', widthM: 25, points: buildPoly(NGO_ORIGIN, [[340, -1480], [340, 1480]]) },
      { id: 'TWY-A1', widthM: 23, points: buildPoly(NGO_ORIGIN, [[0, -1710], [210, -1710]]) },
      { id: 'TWY-A4', widthM: 23, points: buildPoly(NGO_ORIGIN, [[0, -520], [340, -420]]) },
      { id: 'TWY-A6', widthM: 23, points: buildPoly(NGO_ORIGIN, [[0, 420], [340, 520]]) },
      { id: 'TWY-A9', widthM: 23, points: buildPoly(NGO_ORIGIN, [[0, 1710], [210, 1710]]) }
    ],
    aprons: [
      {
        id: 'APRON-MAIN',
        points: buildPoly(NGO_ORIGIN, [[360, -920], [920, -920], [920, 880], [360, 880]])
      },
      {
        id: 'APRON-T2',
        points: buildPoly(NGO_ORIGIN, [[520, -1460], [940, -1460], [940, -960], [520, -960]])
      }
    ],
    // Signature T-shaped Terminal 1 (Center Pier + North/South Wings) + Terminal 2 (LCC)
    terminals: [
      { id: 'T1-MAIN', name: 'Terminal 1 Main', shape: 'box', center: offsetLatLon(NGO_ORIGIN, 830, 0), widthM: 120, depthM: 420, heightM: 24, rotDeg: 0, color: 0xe2e8f0 },
      { id: 'T1-PIER', name: 'T1 Center Pier (T-Shape)', shape: 'box', center: offsetLatLon(NGO_ORIGIN, 645, 0), widthM: 250, depthM: 46, heightM: 18, rotDeg: 0, color: 0xdbeafe },
      { id: 'T1-NWING', name: 'T1 North Wing (Domestic)', shape: 'box', center: offsetLatLon(NGO_ORIGIN, 775, 360), widthM: 52, depthM: 320, heightM: 17, rotDeg: 0, color: 0xe2e8f0 },
      { id: 'T1-SWING', name: 'T1 South Wing (Intl)', shape: 'box', center: offsetLatLon(NGO_ORIGIN, 775, -360), widthM: 52, depthM: 320, heightM: 17, rotDeg: 0, color: 0xe2e8f0 },
      { id: 'T2-LCC', name: 'Terminal 2 (LCC)', shape: 'box', center: offsetLatLon(NGO_ORIGIN, 840, -1220), widthM: 88, depthM: 210, heightM: 14, rotDeg: 0, color: 0xf1f5f9 }
    ],
    atcTower: { ...offsetLatLon(NGO_ORIGIN, 955, 115), alt: 4.6, heightM: 87 },
    gseServiceRoad: buildPoly(NGO_ORIGIN, [
      [735, -820], [735, -62], [505, -62], [505, 62], [735, 62], [735, 760]
    ]),
    spots: [
      buildSpot(NGO_ORIGIN, 'S05', 'Spot 5 (T1 Domestic)', 700, 260, 90, { terminal: 'T1', entryDE: 35, entryDN: 85 }),
      buildSpot(NGO_ORIGIN, 'S06', 'Spot 6 (T1 Domestic)', 700, 175, 90, { terminal: 'T1', entryDE: 35, entryDN: 85 }),
      buildSpot(NGO_ORIGIN, 'S07', 'Spot 7 (Center Pier N)', 615, 75, 180, { terminal: 'T1', entryDE: 95, entryDN: -10 }),
      buildSpot(NGO_ORIGIN, 'S08', 'Spot 8 (Center Pier N)', 535, 75, 180, { terminal: 'T1', entryDE: 95, entryDN: -10 }),
      buildSpot(NGO_ORIGIN, 'S15', 'Spot 15 (Center Pier S)', 535, -75, 0, { terminal: 'T1', entryDE: 95, entryDN: 10 }),
      buildSpot(NGO_ORIGIN, 'S18', 'Spot 18 (T1 Intl South)', 700, -190, 90, { terminal: 'T1', entryDE: 35, entryDN: -85 }),
      buildSpot(NGO_ORIGIN, 'S71', 'Spot 71 (T2 LCC)', 755, -1180, 90, { terminal: 'T2', hasPbb: false, widebodyCapable: false, entryDE: 30, entryDN: 90 }),
      buildSpot(NGO_ORIGIN, 'S101', 'Spot 101 (Cargo Apron)', 560, 620, 90, { terminal: 'CARGO', hasPbb: false, entryDE: 65, entryDN: -80 })
    ]
  },

  // -------------------------------------------------------------------
  // 2. TOKYO HANEDA INTERNATIONAL AIRPORT (HND / RJTT) — Tokyo Bay
  // -------------------------------------------------------------------
  HND: {
    code: 'HND',
    icao: 'RJTT',
    nameJa: '東京国際空港（羽田）',
    nameVi: 'Sân bay Quốc tế Tokyo Haneda (HND / RJTT)',
    nameEn: 'Tokyo Haneda International Airport (HND / RJTT)',
    regionJa: '東京都大田区・東京湾埋立地',
    regionVi: 'Khu lấn biển Vịnh Tokyo, Ota-ku, Tokyo',
    regionEn: 'Tokyo Bay Reclaimed Land, Tokyo',
    terrainType: 'bay_island',
    waterColor: 0x0f3d5e,
    landColor: 0x526a58,
    hasBridge: false,
    hasSnow: false,
    hasSkyline: true,
    origin: HND_ORIGIN,
    boundary: buildPoly(HND_ORIGIN, [
      [-1450, -1900], [820, -1900], [1150, -1100], [1050, 1850],
      [-280, 2050], [-1620, 1150], [-1620, -1350]
    ]),
    runways: [
      buildRunwayGeo(HND_ORIGIN, 'RWY-34R-16L', ['34R', '16L'], 0, 0, 3360, 60, 337, 6.4),
      buildRunwayGeo(HND_ORIGIN, 'RWY-34L-16R', ['34L', '16R'], -980, -120, 3000, 60, 337, 6.4)
    ],
    taxiways: [
      { id: 'TWY-C', widthM: 25, points: buildPoly(HND_ORIGIN, [[-230, -1520], [-230, 1520]]) },
      { id: 'TWY-E', widthM: 25, points: buildPoly(HND_ORIGIN, [[-410, -1350], [-410, 1350]]) },
      { id: 'TWY-X1', widthM: 23, points: buildPoly(HND_ORIGIN, [[-410, 0], [0, 0]]) },
      { id: 'TWY-X2', widthM: 23, points: buildPoly(HND_ORIGIN, [[-410, 620], [0, 620]]) }
    ],
    aprons: [
      { id: 'APRON-T2', points: buildPoly(HND_ORIGIN, [[-760, -820], [-290, -820], [-290, 820], [-760, 820]]) }
    ],
    terminals: [
      { id: 'HND-T2', name: 'Terminal 2 (ANA Domestic/Intl)', shape: 'box', center: offsetLatLon(HND_ORIGIN, -530, 40), widthM: 92, depthM: 680, heightM: 26, rotDeg: 0, color: 0xe2e8f0 },
      { id: 'HND-T1', name: 'Terminal 1 (JAL Big Bird)', shape: 'box', center: offsetLatLon(HND_ORIGIN, -780, -40), widthM: 92, depthM: 640, heightM: 26, rotDeg: 0, color: 0xf1f5f9 },
      { id: 'HND-T3', name: 'Terminal 3 (International)', shape: 'box', center: offsetLatLon(HND_ORIGIN, -1240, -520), widthM: 120, depthM: 420, heightM: 24, rotDeg: 18, color: 0xdbeafe }
    ],
    atcTower: { ...offsetLatLon(HND_ORIGIN, -650, -395), alt: 6.4, heightM: 116 },
    gseServiceRoad: buildPoly(HND_ORIGIN, [
      [-455, -620], [-455, 620]
    ]),
    spots: [
      buildSpot(HND_ORIGIN, 'S51', 'Spot 51 (T2 North)', -430, 310, 270, { terminal: 'T2', entryDE: -25, entryDN: -95 }),
      buildSpot(HND_ORIGIN, 'S55', 'Spot 55 (T2 Center)', -430, 215, 270, { terminal: 'T2', entryDE: -25, entryDN: -95 }),
      buildSpot(HND_ORIGIN, 'S58', 'Spot 58 (T2 Widebody)', -430, 120, 270, { terminal: 'T2', entryDE: -25, entryDN: -95 }),
      buildSpot(HND_ORIGIN, 'S61', 'Spot 61 (T2 Center)', -430, 25, 270, { terminal: 'T2', entryDE: -25, entryDN: -95 }),
      buildSpot(HND_ORIGIN, 'S64', 'Spot 64 (T2 South)', -430, -70, 270, { terminal: 'T2', entryDE: -25, entryDN: 95 }),
      buildSpot(HND_ORIGIN, 'S67', 'Spot 67 (T2 South)', -430, -165, 270, { terminal: 'T2', entryDE: -25, entryDN: 95 }),
      buildSpot(HND_ORIGIN, 'S105', 'Spot 105 (T3 Intl)', -1120, -430, 270, { terminal: 'T3', entryDE: -25, entryDN: 85 }),
      buildSpot(HND_ORIGIN, 'S108', 'Spot 108 (T3 Intl)', -1120, -540, 270, { terminal: 'T3', entryDE: -25, entryDN: 85 })
    ]
  },

  // -------------------------------------------------------------------
  // 3. NARITA INTERNATIONAL AIRPORT (NRT / RJAA) — Chiba Inland Plateau
  // -------------------------------------------------------------------
  NRT: {
    code: 'NRT',
    icao: 'RJAA',
    nameJa: '成田国際空港（Narita）',
    nameVi: 'Sân bay Quốc tế Tokyo Narita (NRT / RJAA)',
    nameEn: 'Narita International Airport (NRT / RJAA)',
    regionJa: '千葉県成田市・下総台地（内陸）',
    regionVi: 'Cao nguyên Shimousa, Thành phố Narita, Chiba',
    regionEn: 'Chiba Inland Plateau, Narita',
    terrainType: 'inland_grass',
    waterColor: 0x3b6e4c,
    landColor: 0x4b7447,
    hasBridge: false,
    hasSnow: false,
    origin: NRT_ORIGIN,
    boundary: buildPoly(NRT_ORIGIN, [
      [-950, -2350], [1850, -2350], [1950, 2350], [-950, 2350]
    ]),
    runways: [
      buildRunwayGeo(NRT_ORIGIN, 'RWY-34L-16R', ['34L', '16R'], 0, 0, 4000, 60, 335, 43.0),
      buildRunwayGeo(NRT_ORIGIN, 'RWY-34R-16L', ['34R', '16L'], 1420, 460, 2500, 60, 335, 41.0)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: buildPoly(NRT_ORIGIN, [[240, -1850], [240, 1850]]) },
      { id: 'TWY-W', widthM: 25, points: buildPoly(NRT_ORIGIN, [[420, -1450], [420, 1450]]) },
      { id: 'TWY-A5', widthM: 23, points: buildPoly(NRT_ORIGIN, [[0, -450], [420, -450]]) },
      { id: 'TWY-A7', widthM: 23, points: buildPoly(NRT_ORIGIN, [[0, 450], [420, 450]]) }
    ],
    aprons: [
      { id: 'APRON-T1', points: buildPoly(NRT_ORIGIN, [[440, -880], [1080, -880], [1080, 920], [440, 920]]) }
    ],
    terminals: [
      { id: 'NRT-T1S', name: 'Terminal 1 South Wing (ANA/Star)', shape: 'box', center: offsetLatLon(NRT_ORIGIN, 830, -240), widthM: 110, depthM: 460, heightM: 25, rotDeg: 0, color: 0xe2e8f0 },
      { id: 'NRT-T1N', name: 'Terminal 1 North Wing', shape: 'box', center: offsetLatLon(NRT_ORIGIN, 830, 310), widthM: 110, depthM: 420, heightM: 25, rotDeg: 0, color: 0xe2e8f0 },
      { id: 'NRT-T1SAT', name: 'T1 Satellite 4/5', shape: 'box', center: offsetLatLon(NRT_ORIGIN, 605, -240), widthM: 64, depthM: 260, heightM: 19, rotDeg: 0, color: 0xdbeafe },
      { id: 'NRT-T2', name: 'Terminal 2 (JAL/Oneworld)', shape: 'box', center: offsetLatLon(NRT_ORIGIN, 1080, 860), widthM: 105, depthM: 520, heightM: 24, rotDeg: 0, color: 0xf1f5f9 }
    ],
    atcTower: { ...offsetLatLon(NRT_ORIGIN, 940, 30), alt: 43.0, heightM: 87.3 },
    gseServiceRoad: buildPoly(NRT_ORIGIN, [
      [740, -680], [740, 680]
    ]),
    spots: [
      buildSpot(NRT_ORIGIN, 'S21', 'Spot 21 (T1 North)', 720, 420, 90, { terminal: 'T1', entryDE: 25, entryDN: -95 }),
      buildSpot(NRT_ORIGIN, 'S24', 'Spot 24 (T1 North)', 720, 315, 90, { terminal: 'T1', entryDE: 25, entryDN: -95 }),
      buildSpot(NRT_ORIGIN, 'S32', 'Spot 32 (T1 Center)', 720, 210, 90, { terminal: 'T1', entryDE: 25, entryDN: -95 }),
      buildSpot(NRT_ORIGIN, 'S41', 'Spot 41 (T1 South Wide)', 720, -110, 90, { terminal: 'T1', entryDE: 25, entryDN: 95 }),
      buildSpot(NRT_ORIGIN, 'S45', 'Spot 45 (T1 South Heavy)', 720, -220, 90, { terminal: 'T1', entryDE: 25, entryDN: 95 }),
      buildSpot(NRT_ORIGIN, 'S52', 'Spot 52 (T1 Sat 5)', 520, -240, 90, { terminal: 'T1', entryDE: 85, entryDN: 95 }),
      buildSpot(NRT_ORIGIN, 'S62', 'Spot 62 (T2 Main)', 960, 760, 90, { terminal: 'T2', entryDE: 30, entryDN: -85 }),
      buildSpot(NRT_ORIGIN, 'S71', 'Spot 71 (T2 Main)', 960, 870, 90, { terminal: 'T2', entryDE: 30, entryDN: -85 })
    ]
  },

  // -------------------------------------------------------------------
  // 4. KANSAI INTERNATIONAL AIRPORT (KIX / RJBB) — Osaka Bay Dual Islands
  // -------------------------------------------------------------------
  KIX: {
    code: 'KIX',
    icao: 'RJBB',
    nameJa: '関西国際空港（KIX）',
    nameVi: 'Sân bay Quốc tế Kansai (KIX / RJBB)',
    nameEn: 'Kansai International Airport (KIX / RJBB)',
    regionJa: '大阪府泉佐野市・大阪湾人工島（2島）',
    regionVi: 'Đảo nhân tạo kép Vịnh Osaka, Izumisano, Osaka',
    regionEn: 'Osaka Bay Dual Artificial Islands, Osaka',
    terrainType: 'bay_island',
    waterColor: 0x0b486b,
    landColor: 0x4b6a58,
    hasBridge: true,
    hasSnow: false,
    origin: KIX_ORIGIN,
    // Island 1 (4.3km x 1.25km)
    boundary: buildPoly(KIX_ORIGIN, [
      [-640, -2120], [820, -2120], [880, 2120], [-640, 2120]
    ]),
    // Island 2 (Second Runway & T2 LCC)
    secondaryIsland: buildPoly(KIX_ORIGIN, [
      [-1820, -2050], [-820, -2050], [-820, 2050], [-1820, 2050]
    ]),
    bridgePath: buildPoly(KIX_ORIGIN, [[840, 40], [2650, 40]]),
    runways: [
      buildRunwayGeo(KIX_ORIGIN, 'RWY-06R-24L', ['06R', '24L'], 0, 0, 3500, 60, 59, 5.2),
      buildRunwayGeo(KIX_ORIGIN, 'RWY-06L-24R', ['06L', '24R'], -1280, 120, 4000, 60, 59, 5.2)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: buildPoly(KIX_ORIGIN, [[220, -1720], [220, 1720]]) },
      { id: 'TWY-J', widthM: 25, points: buildPoly(KIX_ORIGIN, [[355, -1480], [355, 1480]]) },
      { id: 'TWY-A5', widthM: 23, points: buildPoly(KIX_ORIGIN, [[0, -320], [355, -320]]) },
      { id: 'TWY-A7', widthM: 23, points: buildPoly(KIX_ORIGIN, [[0, 320], [355, 320]]) }
    ],
    aprons: [
      { id: 'APRON-T1', points: buildPoly(KIX_ORIGIN, [[370, -960], [790, -960], [790, 960], [370, 960]]) }
    ],
    // Signature 1.7km Renzo Piano Wing Terminal 1 + T2 LCC
    terminals: [
      { id: 'KIX-T1-MAIN', name: 'Terminal 1 Main Wing (Renzo Piano)', shape: 'box', center: offsetLatLon(KIX_ORIGIN, 680, 0), widthM: 96, depthM: 340, heightM: 28, rotDeg: 0, color: 0xe2e8f0 },
      { id: 'KIX-T1-NWING', name: 'T1 North Wing (700m)', shape: 'box', center: offsetLatLon(KIX_ORIGIN, 645, 480), widthM: 44, depthM: 640, heightM: 18, rotDeg: 0, color: 0xdbeafe },
      { id: 'KIX-T1-SWING', name: 'T1 South Wing (700m)', shape: 'box', center: offsetLatLon(KIX_ORIGIN, 645, -480), widthM: 44, depthM: 640, heightM: 18, rotDeg: 0, color: 0xdbeafe },
      { id: 'KIX-T2', name: 'Terminal 2 (Peach LCC Island 2)', shape: 'box', center: offsetLatLon(KIX_ORIGIN, -1040, 320), widthM: 86, depthM: 280, heightM: 14, rotDeg: 0, color: 0xfce7f3 }
    ],
    atcTower: { ...offsetLatLon(KIX_ORIGIN, 770, -140), alt: 5.2, heightM: 86.4 },
    gseServiceRoad: buildPoly(KIX_ORIGIN, [
      [590, -760], [590, 760]
    ]),
    spots: [
      buildSpot(KIX_ORIGIN, 'S05', 'Spot 5 (T1 North Wing)', 565, 420, 90, { terminal: 'T1', entryDE: 25, entryDN: -95 }),
      buildSpot(KIX_ORIGIN, 'S08', 'Spot 8 (T1 North Wing)', 565, 315, 90, { terminal: 'T1', entryDE: 25, entryDN: -95 }),
      buildSpot(KIX_ORIGIN, 'S12', 'Spot 12 (T1 North Wide)', 565, 210, 90, { terminal: 'T1', entryDE: 25, entryDN: -95 }),
      buildSpot(KIX_ORIGIN, 'S16', 'Spot 16 (T1 Center)', 565, 65, 90, { terminal: 'T1', entryDE: 25, entryDN: -95 }),
      buildSpot(KIX_ORIGIN, 'S20', 'Spot 20 (T1 Center)', 565, -65, 90, { terminal: 'T1', entryDE: 25, entryDN: 95 }),
      buildSpot(KIX_ORIGIN, 'S26', 'Spot 26 (T1 South Wing)', 565, -240, 90, { terminal: 'T1', entryDE: 25, entryDN: 95 }),
      buildSpot(KIX_ORIGIN, 'S31', 'Spot 31 (T1 South Wing)', 565, -355, 90, { terminal: 'T1', entryDE: 25, entryDN: 95 }),
      buildSpot(KIX_ORIGIN, 'S91', 'Spot 91 (T2 Peach LCC)', -955, 320, 270, { terminal: 'T2', hasPbb: false, widebodyCapable: false, entryDE: -30, entryDN: -85 })
    ]
  },

  // -------------------------------------------------------------------
  // 5. NEW CHITOSE AIRPORT (CTS / RJCC) — Hokkaido Plain (Snow Capable)
  // -------------------------------------------------------------------
  CTS: {
    code: 'CTS',
    icao: 'RJCC',
    nameJa: '新千歳空港（CTS・北海道）',
    nameVi: 'Sân bay Quốc tế New Chitose (CTS / RJCC - Hokkaido)',
    nameEn: 'New Chitose Airport (CTS / RJCC - Hokkaido)',
    regionJa: '北海道千歳市・石狩平野（積雪寒冷地）',
    regionVi: 'Đồng bằng Ishikari, Chitose, Hokkaido (Mùa đông tuyết)',
    regionEn: 'Ishikari Plain, Hokkaido (Winter Operations)',
    terrainType: 'hokkaido_snow',
    waterColor: 0xcbd5e1,
    landColor: 0xdbe5ef,
    hasBridge: false,
    hasSnow: true,
    origin: CTS_ORIGIN,
    boundary: buildPoly(CTS_ORIGIN, [
      [-1150, -1950], [1250, -1950], [1250, 1950], [-1150, 1950]
    ]),
    runways: [
      buildRunwayGeo(CTS_ORIGIN, 'RWY-01L-19R', ['01L', '19R'], 0, 0, 3000, 60, 1, 25.0),
      buildRunwayGeo(CTS_ORIGIN, 'RWY-01R-19L', ['01R', '19L'], 300, 0, 3000, 60, 1, 25.0)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: buildPoly(CTS_ORIGIN, [[-230, -1500], [-230, 1500]]) },
      { id: 'TWY-B', widthM: 25, points: buildPoly(CTS_ORIGIN, [[-390, -1250], [-390, 1250]]) },
      { id: 'TWY-A3', widthM: 23, points: buildPoly(CTS_ORIGIN, [[-390, -420], [0, -420]]) },
      { id: 'TWY-A6', widthM: 23, points: buildPoly(CTS_ORIGIN, [[-390, 420], [0, 420]]) }
    ],
    aprons: [
      { id: 'APRON-DOM', points: buildPoly(CTS_ORIGIN, [[-820, -780], [-360, -780], [-360, 780], [-820, 780]]) }
    ],
    // Signature C-Shaped Semi-Circular Domestic Terminal + International Wing
    terminals: [
      { id: 'CTS-DOM-C', name: 'Domestic Terminal Center (Semi-Circle)', shape: 'box', center: offsetLatLon(CTS_ORIGIN, -650, 0), widthM: 96, depthM: 320, heightM: 24, rotDeg: 0, color: 0xf1f5f9 },
      { id: 'CTS-DOM-N', name: 'Domestic North Pier (ANA)', shape: 'box', center: offsetLatLon(CTS_ORIGIN, -585, 290), widthM: 58, depthM: 290, heightM: 18, rotDeg: -22, color: 0xe2e8f0 },
      { id: 'CTS-DOM-S', name: 'Domestic South Pier (JAL)', shape: 'box', center: offsetLatLon(CTS_ORIGIN, -585, -290), widthM: 58, depthM: 290, heightM: 18, rotDeg: 22, color: 0xe2e8f0 },
      { id: 'CTS-INTL', name: 'International Terminal', shape: 'box', center: offsetLatLon(CTS_ORIGIN, -780, -560), widthM: 88, depthM: 260, heightM: 22, rotDeg: 0, color: 0xdbeafe }
    ],
    atcTower: { ...offsetLatLon(CTS_ORIGIN, -775, 160), alt: 25.0, heightM: 68 },
    gseServiceRoad: buildPoly(CTS_ORIGIN, [
      [-515, -580], [-515, 580]
    ]),
    spots: [
      buildSpot(CTS_ORIGIN, 'S03', 'Spot 3 (Domestic North ANA)', -490, 310, 270, { terminal: 'DOM', entryDE: -25, entryDN: -90 }),
      buildSpot(CTS_ORIGIN, 'S05', 'Spot 5 (Domestic North ANA)', -490, 215, 270, { terminal: 'DOM', entryDE: -25, entryDN: -90 }),
      buildSpot(CTS_ORIGIN, 'S07', 'Spot 7 (Domestic Center)', -490, 110, 270, { terminal: 'DOM', entryDE: -25, entryDN: -90 }),
      buildSpot(CTS_ORIGIN, 'S09', 'Spot 9 (Domestic Center)', -490, 10, 270, { terminal: 'DOM', entryDE: -25, entryDN: -90 }),
      buildSpot(CTS_ORIGIN, 'S11', 'Spot 11 (Domestic South JAL)', -490, -100, 270, { terminal: 'DOM', entryDE: -25, entryDN: 90 }),
      buildSpot(CTS_ORIGIN, 'S14', 'Spot 14 (Domestic South JAL)', -490, -210, 270, { terminal: 'DOM', entryDE: -25, entryDN: 90 }),
      buildSpot(CTS_ORIGIN, 'S65', 'Spot 65 (International)', -675, -500, 270, { terminal: 'INTL', entryDE: -30, entryDN: 85 }),
      buildSpot(CTS_ORIGIN, 'S68', 'Spot 68 (International)', -675, -605, 270, { terminal: 'INTL', entryDE: -30, entryDN: 85 })
    ]
  }
};

/**
 * Convert an entire airport entry from WGS84 Lat/Lon/Alt into local Three.js scene meters (X, Y, Z).
 * Primary runway center = (0, 0, 0).
 */
export function convertAirportToCartesian(airportCode) {
  const ap = AIRPORT_GEO_DATA[airportCode] || AIRPORT_GEO_DATA.NGO;
  const o = ap.origin;
  const toXYZ = pt => latLonAltToCartesian(pt.lat, pt.lon, pt.alt ?? o.alt, o);

  return {
    ...ap,
    boundaryXYZ: ap.boundary.map(toXYZ),
    secondaryIslandXYZ: ap.secondaryIsland ? ap.secondaryIsland.map(toXYZ) : null,
    bridgeXYZ: ap.bridgePath ? ap.bridgePath.map(toXYZ) : null,
    runwaysXYZ: ap.runways.map(r => {
      const a = toXYZ(r.thresholdA);
      const b = toXYZ(r.thresholdB);
      const cx = (a.x + b.x) * 0.5;
      const cz = (a.z + b.z) * 0.5;
      const dx = b.x - a.x;
      const dz = b.z - a.z;
      const actualLen = Math.hypot(dx, dz);
      // Angle around Y so runway local +Z points from A -> B
      const rotY = Math.atan2(dx, dz);
      return { ...r, a, b, cx, cz, actualLen, rotY };
    }),
    taxiwaysXYZ: ap.taxiways.map(tw => ({ ...tw, pointsXYZ: tw.points.map(toXYZ) })),
    apronsXYZ: ap.aprons.map(apr => ({ ...apr, pointsXYZ: apr.points.map(toXYZ) })),
    terminalsXYZ: ap.terminals.map(tm => ({ ...tm, pos: toXYZ(tm.center) })),
    atcTowerXYZ: { ...ap.atcTower, pos: toXYZ(ap.atcTower) },
    gseServiceRoadXYZ: ap.gseServiceRoad.map(toXYZ),
    spotsXYZ: ap.spots.map(sp => ({
      ...sp,
      pos: toXYZ(sp),
      gseEntryPos: toXYZ(sp.gseEntry),
      // Convert compass heading (0=North/-Z, 90=East/+X, 180=South/+Z, 270=West/-X)
      // into Three.js Y rotation for an aircraft whose nose points along +Z:
      // rotY = PI - headingRad  (verify: heading 0 -> rotY=PI -> local +Z points -Z North!
      //                          heading 90 -> rotY=PI/2 -> local +Z points +X East!
      //                          heading 180 -> rotY=0 -> local +Z points +Z South!
      //                          heading 270 -> rotY=-PI/2 -> local +Z points -X West!)
      rotY: Math.PI - sp.headingDeg * DEG_TO_RAD
    }))
  };
}
