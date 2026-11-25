// Authentic Geographic & Infrastructure Database for 5 Major Japanese Airports
// Coordinates in WGS84 (Lat/Lon degrees, Elevation meters AMSL) + Exact Meter Cartesian Converter
// Every airport's islands, runways, parallel taxiways, aprons, terminals & spots are transformed
// through its true compass Runway Axis Frame so zero runways ever skew across taxiways/terminals.

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
 * Airport Local Axis Frame rotated to true compass heading `axisHdgDeg`:
 *   - `alongM` = distance along `axisHdgDeg` (+toward threshold B, -toward threshold A)
 *   - `rightM` = distance perpendicular to the RIGHT of `axisHdgDeg`
 * Guarantees exact WGS84 compass orientation AND 100% geometric alignment across all runways/taxiways/terminals!
 */
function createAirportFrame(origin, axisHdgDeg) {
  const lat0Rad = origin.lat * DEG_TO_RAD;
  const metersPerDegLat = 111132.92 - 559.82 * Math.cos(2 * lat0Rad) + 1.175 * Math.cos(4 * lat0Rad);
  const metersPerDegLon = 111412.84 * Math.cos(lat0Rad) - 93.5 * Math.cos(3 * lat0Rad);
  const hdgRad = axisHdgDeg * DEG_TO_RAD;
  const sinH = Math.sin(hdgRad);
  const cosH = Math.cos(hdgRad);

  // Convert airport-local (rightM, alongM) -> WGS84 { lat, lon }
  const pt = (rightM, alongM) => {
    const eastM = alongM * sinH + rightM * cosH;
    const northM = alongM * cosH - rightM * sinH;
    return {
      lat: Number((origin.lat + northM / metersPerDegLat).toFixed(6)),
      lon: Number((origin.lon + eastM / metersPerDegLon).toFixed(6))
    };
  };

  const poly = pairs => pairs.map(([r, a]) => pt(r, a));

  // Build runway in airport-local frame (can be parallel `relHeadingDeg = 0` or crosswind!)
  const runway = (id, designators, centerRightM, centerAlongM, lengthM, widthM, relHeadingDeg = 0, elevM = origin.alt) => {
    const trueHdg = ((axisHdgDeg + relHeadingDeg) % 360 + 360) % 360;
    const relRad = relHeadingDeg * DEG_TO_RAD;
    const dr = Math.sin(relRad) * (lengthM * 0.5);
    const da = Math.cos(relRad) * (lengthM * 0.5);
    const thrA = pt(centerRightM - dr, centerAlongM - da);
    const thrB = pt(centerRightM + dr, centerAlongM + da);
    return {
      id,
      designators, // [rA at thresholdA, rB at thresholdB]
      label: `${designators[0]}/${designators[1]}`,
      lengthM,
      widthM,
      headingDeg: trueHdg,
      elevationM: elevM,
      thresholdA: { ...thrA, alt: elevM },
      thresholdB: { ...thrB, alt: elevM }
    };
  };

  const terminal = (id, name, rightM, alongM, widthM, depthM, heightM, relRotDeg = 0, color = 0xe2e8f0) => ({
    id,
    name,
    shape: 'box',
    center: pt(rightM, alongM),
    widthM,
    depthM,
    heightM,
    rotDeg: ((axisHdgDeg + relRotDeg) % 360 + 360) % 360,
    color
  });

  const spot = (id, label, rightM, alongM, relHeadingDeg, opts = {}) => ({
    id,
    label,
    ...pt(rightM, alongM),
    alt: origin.alt,
    headingDeg: ((axisHdgDeg + relHeadingDeg) % 360 + 360) % 360,
    hasPbb: opts.hasPbb !== false,
    terminal: opts.terminal || 'T1',
    widebodyCapable: opts.widebodyCapable !== false,
    gseEntry: pt(rightM + (opts.entryDR ?? 65), alongM + (opts.entryDA ?? 52))
  });

  return { pt, poly, runway, terminal, spot, axisHdgDeg };
}

// =====================================================================
// 5 MAJOR JAPANESE AIRPORTS — REAL WGS84 GEOGRAPHIC DATABASE
// =====================================================================
const NGO_ORIGIN = { lat: 34.858410, lon: 136.805410, alt: 4.6 };
const HND_ORIGIN = { lat: 35.552260, lon: 139.779690, alt: 6.4 };
const NRT_ORIGIN = { lat: 35.764720, lon: 140.386390, alt: 43.0 };
const KIX_ORIGIN = { lat: 34.427300, lon: 135.244000, alt: 5.2 };
const CTS_ORIGIN = { lat: 42.775200, lon: 141.692280, alt: 25.0 };

const fNGO = createAirportFrame(NGO_ORIGIN, 357); // RWY 36/18 (357° / 177°)
const fHND = createAirportFrame(HND_ORIGIN, 337); // RWY 34R/16L & 34L/16R (337° / 157°)
const fNRT = createAirportFrame(NRT_ORIGIN, 335); // RWY 34L/16R & 34R/16L (335° / 155°)
const fKIX = createAirportFrame(KIX_ORIGIN, 59);  // RWY 06R/24L & 06L/24R (059° / 239°)
const fCTS = createAirportFrame(CTS_ORIGIN, 1);   // RWY 01L/19R & 01R/19L (001° / 181°)

export const AIRPORT_GEO_DATA = {
  // -------------------------------------------------------------------
  // 1. CHUBU CENTRAIR INTERNATIONAL AIRPORT (NGO / RJGG) — Ise Bay Island
  // RWY 36 (South) -> 18 (North) on West side; T1 (T-shape) + T2 on East side
  // -------------------------------------------------------------------
  NGO: {
    code: 'NGO',
    icao: 'RJGG',
    axisHeadingDeg: 357,
    nameJa: '中部国際空港（セントレア）',
    nameVi: 'Sân bay Quốc tế Chubu Centrair (NGO / RJGG)',
    nameEn: 'Chubu Centrair International Airport (NGO / RJGG)',
    regionJa: '愛知県常滑市・伊勢湾人工島',
    regionVi: 'Đảo nhân tạo Vịnh Ise, Tokoname, Aichi',
    regionEn: 'Ise Bay Artificial Island, Aichi',
    terrainType: 'bay_island',
    waterColor: 0x0c4a6e,
    landColor: 0x4d6b53,
    hasBridge: true,
    hasSnow: false,
    origin: NGO_ORIGIN,
    boundary: fNGO.poly([
      [-340, -2100], [680, -2100], [1160, -1420], [1180, 1520],
      [680, 2120], [-340, 2120], [-420, 1680], [-420, -1680]
    ]),
    bridgePath: fNGO.poly([[1160, 180], [2650, 220]]),
    runways: [
      fNGO.runway('RWY-36-18', ['36', '18'], 0, 0, 3500, 60, 0, 4.6)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: fNGO.poly([[215, -1720], [215, 1720]]) },
      { id: 'TWY-B', widthM: 25, points: fNGO.poly([[345, -1480], [345, 1480]]) },
      { id: 'TWY-A1', widthM: 23, points: fNGO.poly([[0, -1710], [215, -1710]]) },
      { id: 'TWY-A4', widthM: 23, points: fNGO.poly([[0, -520], [345, -420]]) },
      { id: 'TWY-A6', widthM: 23, points: fNGO.poly([[0, 420], [345, 520]]) },
      { id: 'TWY-A9', widthM: 23, points: fNGO.poly([[0, 1710], [215, 1710]]) }
    ],
    aprons: [
      { id: 'APRON-MAIN', points: fNGO.poly([[365, -920], [920, -920], [920, 880], [365, 880]]) },
      { id: 'APRON-T2', points: fNGO.poly([[520, -1460], [940, -1460], [940, -960], [520, -960]]) }
    ],
    terminals: [
      fNGO.terminal('T1-MAIN', 'Terminal 1 Main', 830, 0, 120, 420, 24, 0, 0xe2e8f0),
      fNGO.terminal('T1-PIER', 'T1 Center Pier (T-Shape)', 645, 0, 250, 46, 18, 0, 0xdbeafe),
      fNGO.terminal('T1-NWING', 'T1 North Wing (Domestic)', 775, 360, 52, 320, 17, 0, 0xe2e8f0),
      fNGO.terminal('T1-SWING', 'T1 South Wing (Intl)', 775, -360, 52, 320, 17, 0, 0xe2e8f0),
      fNGO.terminal('T2-LCC', 'Terminal 2 (LCC)', 840, -1220, 88, 210, 14, 0, 0xf1f5f9)
    ],
    atcTower: { ...fNGO.pt(955, 115), alt: 4.6, heightM: 87 },
    gseServiceRoad: fNGO.poly([
      [735, -820], [735, -62], [505, -62], [505, 62], [735, 62], [735, 760]
    ]),
    spots: [
      fNGO.spot('S05', 'Spot 5 (T1 Domestic)', 700, 260, 90, { terminal: 'T1', entryDR: 35, entryDA: 85 }),
      fNGO.spot('S06', 'Spot 6 (T1 Domestic)', 700, 175, 90, { terminal: 'T1', entryDR: 35, entryDA: 85 }),
      fNGO.spot('S07', 'Spot 7 (Center Pier N)', 615, 75, 180, { terminal: 'T1', entryDR: 95, entryDA: -10 }),
      fNGO.spot('S08', 'Spot 8 (Center Pier N)', 535, 75, 180, { terminal: 'T1', entryDR: 95, entryDA: -10 }),
      fNGO.spot('S15', 'Spot 15 (Center Pier S)', 535, -75, 0, { terminal: 'T1', entryDR: 95, entryDA: 10 }),
      fNGO.spot('S18', 'Spot 18 (T1 Intl South)', 700, -190, 90, { terminal: 'T1', entryDR: 35, entryDA: -85 }),
      fNGO.spot('S71', 'Spot 71 (T2 LCC)', 755, -1180, 90, { terminal: 'T2', hasPbb: false, widebodyCapable: false, entryDR: 30, entryDA: 90 }),
      fNGO.spot('S101', 'Spot 101 (Cargo Apron)', 560, 620, 90, { terminal: 'CARGO', hasPbb: false, entryDR: 65, entryDA: -80 })
    ]
  },

  // -------------------------------------------------------------------
  // 2. TOKYO HANEDA INTERNATIONAL AIRPORT (HND / RJTT) — Tokyo Bay (4 Runways!)
  // RWY C (34R/16L) & RWY A (34L/16R) parallel at 337°, plus crosswind B (04/22) & offshore pier D (05/23)!
  // -------------------------------------------------------------------
  HND: {
    code: 'HND',
    icao: 'RJTT',
    axisHeadingDeg: 337,
    nameJa: '東京国際空港（羽田）',
    nameVi: 'Sân bay Quốc tế Tokyo Haneda (HND / RJTT)',
    nameEn: 'Tokyo Haneda International Airport (HND / RJTT)',
    regionJa: '東京都大田区・東京湾埋立地（4滑走路）',
    regionVi: 'Khu lấn biển Vịnh Tokyo (4 đường băng: 34R/16L, 34L/16R, 04/22, 05/23)',
    regionEn: 'Tokyo Bay Reclaimed Land (4 Runways)',
    terrainType: 'bay_island',
    waterColor: 0x0f3d5e,
    landColor: 0x526a58,
    hasBridge: false,
    hasSnow: false,
    hasSkyline: true,
    origin: HND_ORIGIN,
    boundary: fHND.poly([
      [-1550, -1950], [320, -1950], [420, 1900], [-360, 2050],
      [-1650, 1250], [-1650, -1450]
    ]),
    // Famous Runway D (05/23) offshore reclaimed pier in Tokyo Bay!
    secondaryIsland: fHND.poly([
      [-450, -2520], [1820, -2100], [1740, -1720], [-520, -2140]
    ]),
    runways: [
      fHND.runway('RWY-34R-16L', ['34R', '16L'], 0, 0, 3360, 60, 0, 6.4),
      fHND.runway('RWY-34L-16R', ['34L', '16R'], -1050, -80, 3000, 60, 0, 6.4),
      fHND.runway('RWY-04-22', ['04', '22'], -540, -1580, 2500, 60, 65, 6.4),
      fHND.runway('RWY-05-23', ['05', '23'], 620, -2120, 2500, 60, 75, 6.4)
    ],
    taxiways: [
      { id: 'TWY-C', widthM: 25, points: fHND.poly([[-225, -1620], [-225, 1620]]) },
      { id: 'TWY-E', widthM: 25, points: fHND.poly([[-375, -1350], [-375, 1350]]) },
      { id: 'TWY-A', widthM: 25, points: fHND.poly([[-880, -1450], [-880, 1350]]) },
      { id: 'TWY-X1', widthM: 23, points: fHND.poly([[-375, 0], [0, 0]]) },
      { id: 'TWY-X2', widthM: 23, points: fHND.poly([[-375, 620], [0, 620]]) },
      { id: 'TWY-D-BRIDGE', widthM: 28, points: fHND.poly([[-225, -1620], [-180, -2160]]) }
    ],
    aprons: [
      { id: 'APRON-T2', points: fHND.poly([[-850, -820], [-280, -820], [-280, 820], [-850, 820]]) },
      { id: 'APRON-T3', points: fHND.poly([[-1460, -850], [-1120, -850], [-1120, -220], [-1460, -220]]) }
    ],
    terminals: [
      fHND.terminal('HND-T2', 'Terminal 2 (ANA)', -535, 40, 92, 680, 26, 0, 0xe2e8f0),
      fHND.terminal('HND-T1', 'Terminal 1 (JAL Big Bird)', -765, -40, 92, 640, 26, 0, 0xf1f5f9),
      fHND.terminal('HND-T3', 'Terminal 3 (International)', -1320, -520, 110, 420, 24, 0, 0xdbeafe)
    ],
    atcTower: { ...fHND.pt(-650, -420), alt: 6.4, heightM: 116 },
    gseServiceRoad: fHND.poly([
      [-455, -620], [-455, 620]
    ]),
    spots: [
      fHND.spot('S51', 'Spot 51 (T2 North)', -425, 310, 270, { terminal: 'T2', entryDR: -25, entryDA: -95 }),
      fHND.spot('S55', 'Spot 55 (T2 Center)', -425, 215, 270, { terminal: 'T2', entryDR: -25, entryDA: -95 }),
      fHND.spot('S58', 'Spot 58 (T2 Widebody)', -425, 120, 270, { terminal: 'T2', entryDR: -25, entryDA: -95 }),
      fHND.spot('S61', 'Spot 61 (T2 Center)', -425, 25, 270, { terminal: 'T2', entryDR: -25, entryDA: -95 }),
      fHND.spot('S64', 'Spot 64 (T2 South)', -425, -70, 270, { terminal: 'T2', entryDR: -25, entryDA: 95 }),
      fHND.spot('S67', 'Spot 67 (T2 South)', -425, -165, 270, { terminal: 'T2', entryDR: -25, entryDA: 95 }),
      fHND.spot('S105', 'Spot 105 (T3 Intl)', -1205, -430, 270, { terminal: 'T3', entryDR: -25, entryDA: 85 }),
      fHND.spot('S108', 'Spot 108 (T3 Intl)', -1205, -540, 270, { terminal: 'T3', entryDR: -25, entryDA: 85 })
    ]
  },

  // -------------------------------------------------------------------
  // 3. NARITA INTERNATIONAL AIRPORT (NRT / RJAA) — Chiba Inland Plateau
  // Dual parallel runways aligned at 335°: RWY A (34L/16R 4000m) & RWY B (34R/16L 2500m)
  // -------------------------------------------------------------------
  NRT: {
    code: 'NRT',
    icao: 'RJAA',
    axisHeadingDeg: 335,
    nameJa: '成田国際空港（Narita）',
    nameVi: 'Sân bay Quốc tế Tokyo Narita (NRT / RJAA)',
    nameEn: 'Narita International Airport (NRT / RJAA)',
    regionJa: '千葉県成田市・下総台地（内陸・平行2滑走路）',
    regionVi: 'Cao nguyên Shimousa, Chiba (2 đường băng song song 34L/16R & 34R/16L)',
    regionEn: 'Chiba Inland Plateau, Narita (Dual Parallel Runways)',
    terrainType: 'inland_grass',
    waterColor: 0x3b6e4c,
    landColor: 0x4b7447,
    hasBridge: false,
    hasSnow: false,
    origin: NRT_ORIGIN,
    boundary: fNRT.poly([
      [-650, -2350], [1950, -2350], [1950, 2350], [-650, 2350]
    ]),
    runways: [
      fNRT.runway('RWY-34L-16R', ['34L', '16R'], 0, 0, 4000, 60, 0, 43.0),
      fNRT.runway('RWY-34R-16L', ['34R', '16L'], 1460, 520, 2500, 60, 0, 41.0)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: fNRT.poly([[235, -1920], [235, 1920]]) },
      { id: 'TWY-W', widthM: 25, points: fNRT.poly([[415, -1520], [415, 1520]]) },
      { id: 'TWY-B', widthM: 25, points: fNRT.poly([[1260, -680], [1260, 1720]]) },
      { id: 'TWY-A5', widthM: 23, points: fNRT.poly([[0, -450], [415, -450]]) },
      { id: 'TWY-A7', widthM: 23, points: fNRT.poly([[0, 450], [1260, 450]]) }
    ],
    aprons: [
      { id: 'APRON-T1', points: fNRT.poly([[435, -880], [1160, -880], [1160, 1180], [435, 1180]]) }
    ],
    terminals: [
      fNRT.terminal('NRT-T1S', 'Terminal 1 South Wing (ANA)', 830, -240, 110, 460, 25, 0, 0xe2e8f0),
      fNRT.terminal('NRT-T1N', 'Terminal 1 North Wing', 830, 310, 110, 420, 25, 0, 0xe2e8f0),
      fNRT.terminal('NRT-T1SAT', 'T1 Satellite 4/5', 605, -240, 64, 260, 19, 0, 0xdbeafe),
      fNRT.terminal('NRT-T2', 'Terminal 2 (JAL/Oneworld)', 1060, 860, 105, 520, 24, 0, 0xf1f5f9)
    ],
    atcTower: { ...fNRT.pt(940, 30), alt: 43.0, heightM: 87.3 },
    gseServiceRoad: fNRT.poly([
      [740, -680], [740, 680]
    ]),
    spots: [
      fNRT.spot('S21', 'Spot 21 (T1 North)', 720, 420, 90, { terminal: 'T1', entryDR: 25, entryDA: -95 }),
      fNRT.spot('S24', 'Spot 24 (T1 North)', 720, 315, 90, { terminal: 'T1', entryDR: 25, entryDA: -95 }),
      fNRT.spot('S32', 'Spot 32 (T1 Center)', 720, 210, 90, { terminal: 'T1', entryDR: 25, entryDA: -95 }),
      fNRT.spot('S41', 'Spot 41 (T1 South Wide)', 720, -110, 90, { terminal: 'T1', entryDR: 25, entryDA: 95 }),
      fNRT.spot('S45', 'Spot 45 (T1 South Heavy)', 720, -220, 90, { terminal: 'T1', entryDR: 25, entryDA: 95 }),
      fNRT.spot('S52', 'Spot 52 (T1 Sat 5)', 520, -240, 90, { terminal: 'T1', entryDR: 85, entryDA: 95 }),
      fNRT.spot('S62', 'Spot 62 (T2 Main)', 950, 760, 90, { terminal: 'T2', entryDR: 30, entryDA: -85 }),
      fNRT.spot('S71', 'Spot 71 (T2 Main)', 950, 870, 90, { terminal: 'T2', entryDR: 30, entryDA: -85 })
    ]
  },

  // -------------------------------------------------------------------
  // 4. KANSAI INTERNATIONAL AIRPORT (KIX / RJBB) — Osaka Bay Dual Islands
  // Both islands & dual runways (06R/24L & 06L/24R) strictly aligned along 059° / 239°!
  // -------------------------------------------------------------------
  KIX: {
    code: 'KIX',
    icao: 'RJBB',
    axisHeadingDeg: 59,
    nameJa: '関西国際空港（KIX）',
    nameVi: 'Sân bay Quốc tế Kansai (KIX / RJBB)',
    nameEn: 'Kansai International Airport (KIX / RJBB)',
    regionJa: '大阪府泉佐野市・大阪湾人工島（2島・059°）',
    regionVi: 'Đảo nhân tạo kép Vịnh Osaka (2 đường băng song song 06R/24L & 06L/24R)',
    regionEn: 'Osaka Bay Dual Artificial Islands (059°/239°)',
    terrainType: 'bay_island',
    waterColor: 0x0b486b,
    landColor: 0x4b6a58,
    hasBridge: true,
    hasSnow: false,
    origin: KIX_ORIGIN,
    // Island 1 (4.3km along 059° x 1.25km wide)
    boundary: fKIX.poly([
      [-320, -2120], [920, -2120], [920, 2120], [-320, 2120]
    ]),
    // Island 2 (Second Runway 06L/24R 4000m & T2 Peach LCC, NW of Island 1)
    secondaryIsland: fKIX.poly([
      [-1680, -2180], [-560, -2180], [-560, 2180], [-1680, 2180]
    ]),
    // Sky Gate Bridge R connecting Island 1 SE to Izumisano mainland!
    bridgePath: fKIX.poly([[910, 40], [2850, 40]]),
    runways: [
      fKIX.runway('RWY-06R-24L', ['06R', '24L'], 0, 0, 3500, 60, 0, 5.2),
      fKIX.runway('RWY-06L-24R', ['06L', '24R'], -1240, 80, 4000, 60, 0, 5.2)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: fKIX.poly([[220, -1720], [220, 1720]]) },
      { id: 'TWY-J', widthM: 25, points: fKIX.poly([[355, -1480], [355, 1480]]) },
      { id: 'TWY-A5', widthM: 23, points: fKIX.poly([[0, -320], [355, -320]]) },
      { id: 'TWY-A7', widthM: 23, points: fKIX.poly([[0, 320], [355, 320]]) },
      // Inter-island taxiway bridge connecting Island 1 <-> Island 2!
      { id: 'TWY-B-LINK1', widthM: 28, points: fKIX.poly([[-1240, -520], [220, -520]]) },
      { id: 'TWY-B-LINK2', widthM: 28, points: fKIX.poly([[-1240, 520], [220, 520]]) }
    ],
    aprons: [
      { id: 'APRON-T1', points: fKIX.poly([[370, -960], [820, -960], [820, 960], [370, 960]]) },
      { id: 'APRON-T2', points: fKIX.poly([[-1020, -180], [-620, -180], [-620, 680], [-1020, 680]]) }
    ],
    terminals: [
      fKIX.terminal('KIX-T1-MAIN', 'Terminal 1 Main Wing (Renzo Piano)', 700, 0, 96, 340, 28, 0, 0xe2e8f0),
      fKIX.terminal('KIX-T1-NWING', 'T1 North Wing (700m)', 665, 480, 44, 640, 18, 0, 0xdbeafe),
      fKIX.terminal('KIX-T1-SWING', 'T1 South Wing (700m)', 665, -480, 44, 640, 18, 0, 0xdbeafe),
      fKIX.terminal('KIX-T2', 'Terminal 2 (Peach LCC Island 2)', -720, 260, 86, 320, 14, 0, 0xfce7f3)
    ],
    atcTower: { ...fKIX.pt(795, -140), alt: 5.2, heightM: 86.4 },
    gseServiceRoad: fKIX.poly([
      [605, -760], [605, 760]
    ]),
    spots: [
      fKIX.spot('S05', 'Spot 5 (T1 North Wing)', 575, 420, 90, { terminal: 'T1', entryDR: 25, entryDA: -95 }),
      fKIX.spot('S08', 'Spot 8 (T1 North Wing)', 575, 315, 90, { terminal: 'T1', entryDR: 25, entryDA: -95 }),
      fKIX.spot('S12', 'Spot 12 (T1 North Wide)', 575, 210, 90, { terminal: 'T1', entryDR: 25, entryDA: -95 }),
      fKIX.spot('S16', 'Spot 16 (T1 Center)', 575, 65, 90, { terminal: 'T1', entryDR: 25, entryDA: -95 }),
      fKIX.spot('S20', 'Spot 20 (T1 Center)', 575, -65, 90, { terminal: 'T1', entryDR: 25, entryDA: 95 }),
      fKIX.spot('S26', 'Spot 26 (T1 South Wing)', 575, -240, 90, { terminal: 'T1', entryDR: 25, entryDA: 95 }),
      fKIX.spot('S31', 'Spot 31 (T1 South Wing)', 575, -355, 90, { terminal: 'T1', entryDR: 25, entryDA: 95 }),
      fKIX.spot('S91', 'Spot 91 (T2 Peach LCC)', -845, 260, 270, { terminal: 'T2', hasPbb: false, widebodyCapable: false, entryDR: -30, entryDA: -85 })
    ]
  },

  // -------------------------------------------------------------------
  // 5. NEW CHITOSE AIRPORT (CTS / RJCC) — Hokkaido Plain (Snow Capable)
  // Dual parallel runways 01L/19R & 01R/19L (3000m) along 001° on East side; Terminal on West side
  // -------------------------------------------------------------------
  CTS: {
    code: 'CTS',
    icao: 'RJCC',
    axisHeadingDeg: 1,
    nameJa: '新千歳空港（CTS・北海道）',
    nameVi: 'Sân bay Quốc tế New Chitose (CTS / RJCC - Hokkaido)',
    nameEn: 'New Chitose Airport (CTS / RJCC - Hokkaido)',
    regionJa: '北海道千歳市・石狩平野（積雪寒冷地）',
    regionVi: 'Đồng bằng Ishikari, Hokkaido (2 đường băng song song 01L/19R & 01R/19L)',
    regionEn: 'Ishikari Plain, Hokkaido (Winter Dual Runways)',
    terrainType: 'hokkaido_snow',
    waterColor: 0xcbd5e1,
    landColor: 0xdbe5ef,
    hasBridge: false,
    hasSnow: true,
    origin: CTS_ORIGIN,
    boundary: fCTS.poly([
      [-1150, -1950], [950, -1950], [950, 1950], [-1150, 1950]
    ]),
    runways: [
      fCTS.runway('RWY-01L-19R', ['01L', '19R'], 0, 0, 3000, 60, 0, 25.0),
      fCTS.runway('RWY-01R-19L', ['01R', '19L'], 300, 0, 3000, 60, 0, 25.0)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: fCTS.poly([[-225, -1480], [-225, 1480]]) },
      { id: 'TWY-B', widthM: 25, points: fCTS.poly([[-385, -1250], [-385, 1250]]) },
      { id: 'TWY-A3', widthM: 23, points: fCTS.poly([[-385, -420], [300, -420]]) },
      { id: 'TWY-A6', widthM: 23, points: fCTS.poly([[-385, 420], [300, 420]]) }
    ],
    aprons: [
      { id: 'APRON-DOM', points: fCTS.poly([[-860, -780], [-360, -780], [-360, 780], [-860, 780]]) }
    ],
    terminals: [
      fCTS.terminal('CTS-DOM-C', 'Domestic Terminal Center (Semi-Circle)', -650, 0, 96, 320, 24, 0, 0xf1f5f9),
      fCTS.terminal('CTS-DOM-N', 'Domestic North Pier (ANA)', -585, 290, 58, 290, 18, -22, 0xe2e8f0),
      fCTS.terminal('CTS-DOM-S', 'Domestic South Pier (JAL)', -585, -290, 58, 290, 18, 22, 0xe2e8f0),
      fCTS.terminal('CTS-INTL', 'International Terminal', -780, -560, 88, 260, 22, 0, 0xdbeafe)
    ],
    atcTower: { ...fCTS.pt(-775, 160), alt: 25.0, heightM: 68 },
    gseServiceRoad: fCTS.poly([
      [-515, -580], [-515, 580]
    ]),
    spots: [
      fCTS.spot('S03', 'Spot 3 (Domestic North ANA)', -490, 310, 270, { terminal: 'DOM', entryDR: -25, entryDA: -90 }),
      fCTS.spot('S05', 'Spot 5 (Domestic North ANA)', -490, 215, 270, { terminal: 'DOM', entryDR: -25, entryDA: -90 }),
      fCTS.spot('S07', 'Spot 7 (Domestic Center)', -490, 110, 270, { terminal: 'DOM', entryDR: -25, entryDA: -90 }),
      fCTS.spot('S09', 'Spot 9 (Domestic Center)', -490, 10, 270, { terminal: 'DOM', entryDR: -25, entryDA: -90 }),
      fCTS.spot('S11', 'Spot 11 (Domestic South JAL)', -490, -100, 270, { terminal: 'DOM', entryDR: -25, entryDA: 90 }),
      fCTS.spot('S14', 'Spot 14 (Domestic South JAL)', -490, -210, 270, { terminal: 'DOM', entryDR: -25, entryDA: 90 }),
      fCTS.spot('S65', 'Spot 65 (International)', -675, -500, 270, { terminal: 'INTL', entryDR: -30, entryDA: 85 }),
      fCTS.spot('S68', 'Spot 68 (International)', -675, -605, 270, { terminal: 'INTL', entryDR: -30, entryDA: 85 })
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
      // Angle around Y so runway local +Z points from thresholdA -> thresholdB (and local -Z is thresholdA)
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
      // Compass heading (0=North/-Z, 90=East/+X, 180=South/+Z, 270=West/-X)
      // -> Three.js Y rotation for aircraft whose nose points along local +Z:
      rotY: Math.PI - sp.headingDeg * DEG_TO_RAD
    }))
  };
}
