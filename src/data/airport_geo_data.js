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
  // Real-world calibration per MLIT & NGO Training Textbook (00空港の基本施設01.pdf p.2):
  //   - Artificial Island: ~4,370m (N-S) × 1,920m (E-W)
  //   - Single Runway 36/18: 3,500m × 60m (357° / 177°)
  //   - Parallel TWY A (+190m) & TWY B (+266m)
  //   - T1 Center Pier (300m long): Tip at exact +400m East of Runway -> Base at +700m!
  // -------------------------------------------------------------------
  NGO: {
    code: 'NGO',
    icao: 'RJGG',
    axisHeadingDeg: 357,
    nameJa: '中部国際空港（セントレア）',
    nameVi: 'Sân bay Quốc tế Chubu Centrair (NGO / RJGG)',
    nameEn: 'Chubu Centrair International Airport (NGO / RJGG)',
    regionJa: '愛知県常滑市・伊勢湾人工島（滑走路3,500m・ピア先端400m）',
    regionVi: 'Đảo nhân tạo Vịnh Ise, Aichi (RWY 3.500m×60m · Mũi Pier cách RWY 400m)',
    regionEn: 'Ise Bay Artificial Island, Aichi (3,500m×60m RWY · Pier Tip 400m)',
    terrainType: 'bay_island',
    waterColor: 0x0c4a6e,
    landColor: 0x4d6b53,
    hasBridge: true,
    hasSnow: false,
    origin: NGO_ORIGIN,
    boundary: fNGO.poly([
      [-380, -2185], [820, -2185], [1460, -1480], [1480, 1560],
      [840, 2185], [-380, 2185], [-440, 1780], [-440, -1780]
    ]),
    bridgePath: fNGO.poly([[1470, 180], [2950, 220]]),
    runways: [
      fNGO.runway('RWY-36-18', ['36', '18'], 0, 0, 3500, 60, 0, 4.6)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: fNGO.poly([[190, -1730], [190, 1730]]) },
      { id: 'TWY-B', widthM: 25, points: fNGO.poly([[266, -1540], [266, 1540]]) },
      { id: 'TWY-A1', widthM: 23, points: fNGO.poly([[0, -1720], [190, -1720]]) },
      { id: 'TWY-A4', widthM: 23, points: fNGO.poly([[0, -560], [266, -440]]) },
      { id: 'TWY-A6', widthM: 23, points: fNGO.poly([[0, 440], [266, 560]]) },
      { id: 'TWY-A10', widthM: 23, points: fNGO.poly([[0, 1720], [190, 1720]]) }
    ],
    aprons: [
      { id: 'APRON-MAIN', points: fNGO.poly([[290, -960], [920, -960], [920, 920], [290, 920]]) },
      { id: 'APRON-CARGO', points: fNGO.poly([[290, 940], [880, 940], [880, 1460], [290, 1460]]) },
      { id: 'APRON-T2', points: fNGO.poly([[420, -1520], [960, -1520], [960, -980], [420, -980]]) }
    ],
    terminals: [
      fNGO.terminal('T1-MAIN', 'Terminal 1 Main', 765, 0, 130, 440, 24, 0, 0xe2e8f0),
      // Exact 300m Center Pier: West tip at rightM = 550 - 150 = +400m from RWY 36/18!
      fNGO.terminal('T1-PIER', 'T1 Center Pier (Tip 400m from RWY)', 550, 0, 300, 48, 18, 0, 0xdbeafe),
      fNGO.terminal('T1-NWING', 'T1 North Wing (Domestic #2-#10)', 705, 390, 52, 420, 17, -12, 0xe2e8f0),
      fNGO.terminal('T1-SWING', 'T1 South Wing (Intl #12-#24)', 705, -390, 52, 440, 17, 12, 0xe2e8f0),
      fNGO.terminal('T2-LCC', 'Terminal 2 (LCC South)', 835, -1240, 88, 260, 14, 0, 0xf1f5f9),
      fNGO.terminal('CARGO-SHED', 'Cargo Warehouse Zone (#101-#109)', 810, 1180, 110, 380, 16, 0, 0xcbd5e1)
    ],
    atcTower: { ...fNGO.pt(915, 135), alt: 4.6, heightM: 86.75 },
    gseServiceRoad: fNGO.poly([
      [665, -860], [665, -62], [388, -62], [388, 62], [665, 62], [665, 1280]
    ]),
    spots: [
      fNGO.spot('S05', 'Spot 5 (T1 Domestic)', 625, 290, 90, { terminal: 'T1', entryDR: 40, entryDA: 85 }),
      fNGO.spot('S06', 'Spot 6 (T1 Domestic)', 635, 195, 90, { terminal: 'T1', entryDR: 35, entryDA: 85 }),
      fNGO.spot('S07', 'Spot 7 (Center Pier N)', 585, 74, 180, { terminal: 'T1', entryDR: 80, entryDA: -12 }),
      fNGO.spot('S08', 'Spot 8 (Center Pier Tip N)', 475, 74, 180, { terminal: 'T1', entryDR: 85, entryDA: -12 }),
      fNGO.spot('S15', 'Spot 15 (Center Pier Tip S)', 475, -74, 0, { terminal: 'T1', entryDR: 85, entryDA: 12 }),
      fNGO.spot('S18', 'Spot 18 (T1 Intl South)', 635, -210, 90, { terminal: 'T1', entryDR: 35, entryDA: -85 }),
      fNGO.spot('S71', 'Spot 71 (T2 LCC)', 745, -1200, 90, { terminal: 'T2', hasPbb: false, widebodyCapable: false, entryDR: 30, entryDA: 90 }),
      fNGO.spot('S101', 'Spot 102 (North Cargo Apron)', 640, 1120, 90, { terminal: 'CARGO', hasPbb: false, entryDR: 55, entryDA: -80 })
    ]
  },

  // -------------------------------------------------------------------
  // 2. TOKYO HANEDA INTERNATIONAL AIRPORT (HND / RJTT) — Tokyo Bay (4 Runways!)
  // Authentic real-world dimensions & spacing:
  //   - RWY C (34R/16L): 3,360m × 60m at (0, 0) [337°]
  //   - RWY A (34L/16R): 3,000m × 60m at rightM = -1,570m (exact 1.57km parallel spacing flanking T1 & T2!)
  //   - RWY B (04/22):   2,500m × 60m crosswind at 042° (+65° rel)
  //   - RWY D (05/23):   2,500m × 60m offshore hybrid pier island in Tokyo Bay at 052° (+75° rel)
  // -------------------------------------------------------------------
  HND: {
    code: 'HND',
    icao: 'RJTT',
    axisHeadingDeg: 337,
    nameJa: '東京国際空港（羽田）',
    nameVi: 'Sân bay Quốc tế Tokyo Haneda (HND / RJTT)',
    nameEn: 'Tokyo Haneda International Airport (HND / RJTT)',
    regionJa: '東京都大田区・東京湾（4滑走路：C 3,360m・A 3,000m・B/D 2,500m）',
    regionVi: 'Vịnh Tokyo (4 đường băng chuẩn tỷ lệ thật: 34R/16L 3.360m, 34L/16R 3.000m, 04/22 & 05/23 2.500m)',
    regionEn: 'Tokyo Bay (4 Real-Scale Runways: 34R/16L 3,360m, 34L/16R 3,000m, 04/22 & 05/23 2,500m)',
    terrainType: 'bay_island',
    waterColor: 0x0f3d5e,
    landColor: 0x526a58,
    hasBridge: false,
    hasSnow: false,
    hasSkyline: true,
    overviewCenter: { rightM: -680, alongM: -420 },
    overviewRadius: 3450,
    origin: HND_ORIGIN,
    boundary: fHND.poly([
      [-2380, -2150], [340, -2050], [420, 1920], [-420, 2100],
      [-2280, 1520], [-2420, -1450]
    ]),
    // Famous Runway D (05/23, 2,500m) offshore jacket/reclaimed island in Tokyo Bay!
    secondaryIsland: fHND.poly([
      [-680, -2960], [1860, -2280], [1750, -1860], [-790, -2540]
    ]),
    runways: [
      fHND.runway('RWY-34R-16L', ['34R', '16L'], 0, 0, 3360, 60, 0, 6.4),
      fHND.runway('RWY-34L-16R', ['34L', '16R'], -1570, -180, 3000, 60, 0, 6.4),
      fHND.runway('RWY-04-22', ['04', '22'], -1240, -1480, 2500, 60, 65, 6.4),
      fHND.runway('RWY-05-23', ['05', '23'], 560, -2410, 2500, 60, 75, 6.4)
    ],
    taxiways: [
      { id: 'TWY-C', widthM: 25, points: fHND.poly([[-215, -1650], [-215, 1650]]) },
      { id: 'TWY-E', widthM: 25, points: fHND.poly([[-345, -1350], [-345, 1350]]) },
      { id: 'TWY-L', widthM: 25, points: fHND.poly([[-1355, -1580], [-1355, 1280]]) },
      { id: 'TWY-A', widthM: 25, points: fHND.poly([[-1765, -1580], [-1765, 1180]]) },
      { id: 'TWY-N', widthM: 23, points: fHND.poly([[-1355, 560], [0, 560]]) },
      { id: 'TWY-S', widthM: 23, points: fHND.poly([[-1355, -620], [0, -620]]) },
      { id: 'TWY-D-BRIDGE', widthM: 32, points: fHND.poly([[-215, -1650], [-140, -2520]]) }
    ],
    aprons: [
      { id: 'APRON-T2', points: fHND.poly([[-620, -860], [-260, -860], [-260, 880], [-620, 880]]) },
      { id: 'APRON-T1', points: fHND.poly([[-1330, -860], [-980, -860], [-980, 820], [-1330, 820]]) },
      { id: 'APRON-T3', points: fHND.poly([[-2280, -1040], [-1810, -1040], [-1810, -140], [-2280, -140]]) }
    ],
    terminals: [
      fHND.terminal('HND-T2', 'Terminal 2 (ANA East)', -535, 40, 96, 840, 26, 0, 0xe2e8f0),
      fHND.terminal('HND-T1', 'Terminal 1 (JAL West)', -1045, -40, 96, 800, 26, 0, 0xf1f5f9),
      fHND.terminal('HND-T3', 'Terminal 3 (International)', -2120, -580, 115, 560, 25, 0, 0xdbeafe)
    ],
    atcTower: { ...fHND.pt(-790, -340), alt: 6.4, heightM: 115.7 },
    gseServiceRoad: fHND.poly([
      [-455, -720], [-455, 720]
    ]),
    spots: [
      fHND.spot('S51', 'Spot 51 (T2 North ANA)', -420, 340, 270, { terminal: 'T2', entryDR: -30, entryDA: -95 }),
      fHND.spot('S55', 'Spot 55 (T2 Center ANA)', -420, 225, 270, { terminal: 'T2', entryDR: -30, entryDA: -95 }),
      fHND.spot('S58', 'Spot 58 (T2 Widebody)', -420, 115, 270, { terminal: 'T2', entryDR: -30, entryDA: -95 }),
      fHND.spot('S61', 'Spot 61 (T2 Center)', -420, 10, 270, { terminal: 'T2', entryDR: -30, entryDA: -95 }),
      fHND.spot('S64', 'Spot 64 (T2 South)', -420, -105, 270, { terminal: 'T2', entryDR: -30, entryDA: 95 }),
      fHND.spot('S12', 'Spot 12 (T1 JAL Center)', -1165, 80, 90, { terminal: 'T1', entryDR: 35, entryDA: -90 }),
      fHND.spot('S105', 'Spot 105 (T3 Intl)', -1985, -470, 270, { terminal: 'T3', entryDR: -30, entryDA: 85 }),
      fHND.spot('S108', 'Spot 108 (T3 Intl)', -1985, -610, 270, { terminal: 'T3', entryDR: -30, entryDA: 85 })
    ]
  },

  // -------------------------------------------------------------------
  // 3. NARITA INTERNATIONAL AIRPORT (NRT / RJAA) — Chiba Inland Plateau
  // Authentic real-world dimensions & spacing:
  //   - RWY A (34L/16R): 4,000m × 60m at (0, 0) [335°, elev 43m]
  //   - RWY B (34R/16L): 2,500m × 60m at rightM = +2,450m, alongM = +880m (~2.45km NE separation!)
  //   - T1 (North/South Wings + Satellites) & T2 Main + Satellite + T3 in midfield
  // -------------------------------------------------------------------
  NRT: {
    code: 'NRT',
    icao: 'RJAA',
    axisHeadingDeg: 335,
    nameJa: '成田国際空港（Narita）',
    nameVi: 'Sân bay Quốc tế Tokyo Narita (NRT / RJAA)',
    nameEn: 'Narita International Airport (NRT / RJAA)',
    regionJa: '千葉県成田市・下総台地（A滑走路4,000m・B滑走路2,500m・間隔約2,450m）',
    regionVi: 'Cao nguyên Chiba (RWY A 4.000m & RWY B 2.500m song song cách thực tế ~2.450m)',
    regionEn: 'Chiba Plateau (RWY A 4,000m & RWY B 2,500m at true ~2,450m spacing)',
    terrainType: 'inland_grass',
    waterColor: 0x3b6e4c,
    landColor: 0x4b7447,
    hasBridge: false,
    hasSnow: false,
    overviewCenter: { rightM: 1150, alongM: 280 },
    overviewRadius: 3450,
    origin: NRT_ORIGIN,
    boundary: fNRT.poly([
      [-680, -2450], [3050, -2450], [3050, 2550], [-680, 2550]
    ]),
    runways: [
      fNRT.runway('RWY-34L-16R', ['34L', '16R'], 0, 0, 4000, 60, 0, 43.0),
      fNRT.runway('RWY-34R-16L', ['34R', '16L'], 2450, 880, 2500, 60, 0, 41.0)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: fNRT.poly([[215, -1960], [215, 1960]]) },
      { id: 'TWY-W', widthM: 25, points: fNRT.poly([[380, -1620], [380, 1620]]) },
      { id: 'TWY-B', widthM: 25, points: fNRT.poly([[2235, -350], [2235, 2110]]) },
      { id: 'TWY-K-LINK1', widthM: 25, points: fNRT.poly([[380, 320], [2235, 320]]) },
      { id: 'TWY-K-LINK2', widthM: 25, points: fNRT.poly([[380, 1180], [2235, 1180]]) }
    ],
    aprons: [
      { id: 'APRON-T1', points: fNRT.poly([[410, -960], [1160, -960], [1160, 520], [410, 520]]) },
      { id: 'APRON-T2', points: fNRT.poly([[1220, 420], [2180, 420], [2180, 1680], [1220, 1680]]) }
    ],
    terminals: [
      fNRT.terminal('NRT-T1S', 'Terminal 1 South Wing (ANA/Star)', 860, -340, 115, 480, 25, 0, 0xe2e8f0),
      fNRT.terminal('NRT-T1N', 'Terminal 1 North Wing (SkyTeam)', 860, 180, 115, 440, 25, 0, 0xe2e8f0),
      fNRT.terminal('NRT-T1SAT', 'T1 Satellite 4 & 5', 605, -280, 68, 280, 19, 0, 0xdbeafe),
      fNRT.terminal('NRT-T2M', 'Terminal 2 Main (JAL/Oneworld)', 1740, 920, 110, 680, 25, 0, 0xf1f5f9),
      fNRT.terminal('NRT-T2SAT', 'Terminal 2 Satellite', 1430, 920, 68, 360, 19, 0, 0xdbeafe),
      fNRT.terminal('NRT-T3', 'Terminal 3 (LCC)', 1860, 1480, 82, 310, 14, 0, 0xfef3c7)
    ],
    atcTower: { ...fNRT.pt(980, -60), alt: 43.0, heightM: 87.3 },
    gseServiceRoad: fNRT.poly([
      [755, -720], [755, 460], [1620, 620], [1620, 1280]
    ]),
    spots: [
      fNRT.spot('S21', 'Spot 21 (T1 North)', 740, 290, 90, { terminal: 'T1', entryDR: 25, entryDA: -95 }),
      fNRT.spot('S24', 'Spot 24 (T1 North)', 740, 175, 90, { terminal: 'T1', entryDR: 25, entryDA: -95 }),
      fNRT.spot('S32', 'Spot 32 (T1 Center)', 740, 45, 90, { terminal: 'T1', entryDR: 25, entryDA: -95 }),
      fNRT.spot('S41', 'Spot 41 (T1 South Wide)', 740, -210, 90, { terminal: 'T1', entryDR: 25, entryDA: 95 }),
      fNRT.spot('S45', 'Spot 45 (T1 South Heavy)', 740, -340, 90, { terminal: 'T1', entryDR: 25, entryDA: 95 }),
      fNRT.spot('S52', 'Spot 52 (T1 Sat 5)', 515, -280, 90, { terminal: 'T1', entryDR: 85, entryDA: 95 }),
      fNRT.spot('S62', 'Spot 62 (T2 Main JAL)', 1620, 820, 90, { terminal: 'T2', entryDR: 30, entryDA: -85 }),
      fNRT.spot('S71', 'Spot 71 (T2 Main JAL)', 1620, 960, 90, { terminal: 'T2', entryDR: 30, entryDA: -85 })
    ]
  },

  // -------------------------------------------------------------------
  // 4. KANSAI INTERNATIONAL AIRPORT (KIX / RJBB) — Osaka Bay Dual Islands
  // Authentic real-world dimensions & inter-island channel:
  //   - Island 1: 4,370m × 1,250m | RWY A (06R/24L): 3,500m × 60m | T1 Wing total span 1,660m!
  //   - Open Sea Channel between Island 1 & Island 2: ~1,300m
  //   - Island 2: 4,450m × 1,230m | RWY B (06L/24R): 4,000m × 60m | T2 Peach LCC
  // -------------------------------------------------------------------
  KIX: {
    code: 'KIX',
    icao: 'RJBB',
    axisHeadingDeg: 59,
    nameJa: '関西国際空港（KIX）',
    nameVi: 'Sân bay Quốc tế Kansai (KIX / RJBB)',
    nameEn: 'Kansai International Airport (KIX / RJBB)',
    regionJa: '大阪府泉佐野市・大阪湾人工2島（A滑走路3,500m・B滑走路4,000m・T1全長1.66km）',
    regionVi: 'Đảo kép Vịnh Osaka (Đảo 1 RWY 3.500m + T1 dài 1,66km; Đảo 2 RWY 4.000m cách kênh biển 1,3km)',
    regionEn: 'Osaka Bay Dual Islands (Island 1 RWY 3,500m + 1.66km T1; Island 2 RWY 4,000m across 1.3km channel)',
    terrainType: 'bay_island',
    waterColor: 0x0b486b,
    landColor: 0x4b6a58,
    hasBridge: true,
    hasSnow: false,
    overviewCenter: { rightM: -760, alongM: 0 },
    overviewRadius: 3500,
    origin: KIX_ORIGIN,
    // Island 1: 4,370m × 1,250m (-310 to +940)
    boundary: fKIX.poly([
      [-310, -2185], [940, -2185], [940, 2185], [-310, 2185]
    ]),
    // Island 2: 4,450m × 1,230m (-2840 to -1610, leaving exact 1,300m sea channel!)
    secondaryIsland: fKIX.poly([
      [-2840, -2225], [-1610, -2225], [-1610, 2225], [-2840, 2225]
    ]),
    // Sky Gate Bridge R connecting Island 1 SE to Rinku Town mainland!
    bridgePath: fKIX.poly([[930, 40], [3150, 40]]),
    runways: [
      fKIX.runway('RWY-06R-24L', ['06R', '24L'], 0, 0, 3500, 60, 0, 5.2),
      fKIX.runway('RWY-06L-24R', ['06L', '24R'], -2360, 80, 4000, 60, 0, 5.2)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: fKIX.poly([[205, -1730], [205, 1730]]) },
      { id: 'TWY-J', widthM: 25, points: fKIX.poly([[335, -1520], [335, 1520]]) },
      { id: 'TWY-R', widthM: 25, points: fKIX.poly([[-2145, -1960], [-2145, 1980]]) },
      { id: 'TWY-A5', widthM: 23, points: fKIX.poly([[0, -340], [335, -340]]) },
      { id: 'TWY-A7', widthM: 23, points: fKIX.poly([[0, 340], [335, 340]]) },
      // Dual Inter-Island Taxiway Bridges spanning the 1.3km Osaka Bay channel!
      { id: 'TWY-B-LINK1', widthM: 30, points: fKIX.poly([[-2145, -560], [205, -560]]) },
      { id: 'TWY-B-LINK2', widthM: 30, points: fKIX.poly([[-2145, 560], [205, 560]]) }
    ],
    aprons: [
      { id: 'APRON-T1', points: fKIX.poly([[355, -1040], [840, -1040], [840, 1040], [355, 1040]]) },
      { id: 'APRON-T2', points: fKIX.poly([[-2080, -220], [-1660, -220], [-1660, 740], [-2080, 740]]) }
    ],
    terminals: [
      // Renzo Piano Terminal 1: iconic 1,660m continuous airfoil span (340 + 660 + 660m)!
      fKIX.terminal('KIX-T1-MAIN', 'Terminal 1 Main Building', 715, 0, 102, 340, 28, 0, 0xe2e8f0),
      fKIX.terminal('KIX-T1-NWING', 'T1 North Wing (660m)', 675, 500, 44, 660, 18, 0, 0xdbeafe),
      fKIX.terminal('KIX-T1-SWING', 'T1 South Wing (660m)', 675, -500, 44, 660, 18, 0, 0xdbeafe),
      fKIX.terminal('KIX-T2', 'Terminal 2 (Peach LCC Island 2)', -1760, 260, 88, 360, 14, 0, 0xfce7f3)
    ],
    atcTower: { ...fKIX.pt(815, -150), alt: 5.2, heightM: 86.4 },
    gseServiceRoad: fKIX.poly([
      [615, -840], [615, 840]
    ]),
    spots: [
      fKIX.spot('S05', 'Spot 5 (T1 North Wing)', 580, 560, 90, { terminal: 'T1', entryDR: 30, entryDA: -95 }),
      fKIX.spot('S08', 'Spot 8 (T1 North Wing)', 580, 390, 90, { terminal: 'T1', entryDR: 30, entryDA: -95 }),
      fKIX.spot('S12', 'Spot 12 (T1 North Wide)', 580, 220, 90, { terminal: 'T1', entryDR: 30, entryDA: -95 }),
      fKIX.spot('S16', 'Spot 16 (T1 Center)', 580, 70, 90, { terminal: 'T1', entryDR: 30, entryDA: -95 }),
      fKIX.spot('S20', 'Spot 20 (T1 Center)', 580, -70, 90, { terminal: 'T1', entryDR: 30, entryDA: 95 }),
      fKIX.spot('S26', 'Spot 26 (T1 South Wing)', 580, -260, 90, { terminal: 'T1', entryDR: 30, entryDA: 95 }),
      fKIX.spot('S31', 'Spot 31 (T1 South Wing)', 580, -480, 90, { terminal: 'T1', entryDR: 30, entryDA: 95 }),
      fKIX.spot('S91', 'Spot 91 (T2 Peach Island 2)', -1890, 260, 270, { terminal: 'T2', hasPbb: false, widebodyCapable: false, entryDR: -30, entryDA: -85 })
    ]
  },

  // -------------------------------------------------------------------
  // 5. NEW CHITOSE AIRPORT (CTS / RJCC) — Hokkaido Plain (Snow Capable)
  // Authentic real-world dimensions & C-shaped Semi-Circular Domestic Terminal:
  //   - Dual close-parallel runways 01L/19R & 01R/19L: 3,000m × 60m spaced exact 300m apart!
  //   - Iconic Semi-Circular Domestic Terminal (18 gates arc) + Concourse + International Terminal West
  // -------------------------------------------------------------------
  CTS: {
    code: 'CTS',
    icao: 'RJCC',
    axisHeadingDeg: 1,
    nameJa: '新千歳空港（CTS・北海道）',
    nameVi: 'Sân bay Quốc tế New Chitose (CTS / RJCC - Hokkaido)',
    nameEn: 'New Chitose Airport (CTS / RJCC - Hokkaido)',
    regionJa: '北海道千歳市・石狩平野（3,000m平行2滑走路・中心間隔300m・半円形ターミナル）',
    regionVi: 'Đồng bằng Ishikari, Hokkaido (2 đường băng 3.000m cách tâm đúng 300m & Nhà ga bán nguyệt)',
    regionEn: 'Ishikari Plain, Hokkaido (Dual 3,000m Runways at 300m Spacing & Semi-Circular Terminal)',
    terrainType: 'hokkaido_snow',
    waterColor: 0xcbd5e1,
    landColor: 0xdbe5ef,
    hasBridge: false,
    hasSnow: true,
    overviewCenter: { rightM: -260, alongM: 0 },
    overviewRadius: 2550,
    origin: CTS_ORIGIN,
    boundary: fCTS.poly([
      [-1380, -1980], [920, -1980], [920, 1980], [-1380, 1980]
    ]),
    runways: [
      fCTS.runway('RWY-01L-19R', ['01L', '19R'], 0, 0, 3000, 60, 0, 25.0),
      fCTS.runway('RWY-01R-19L', ['01R', '19L'], 300, 0, 3000, 60, 0, 25.0)
    ],
    taxiways: [
      { id: 'TWY-A', widthM: 25, points: fCTS.poly([[-210, -1490], [-210, 1490]]) },
      { id: 'TWY-B', widthM: 25, points: fCTS.poly([[-350, -1320], [-350, 1320]]) },
      { id: 'TWY-A3', widthM: 23, points: fCTS.poly([[-350, -460], [300, -460]]) },
      { id: 'TWY-A6', widthM: 23, points: fCTS.poly([[-350, 460], [300, 460]]) }
    ],
    aprons: [
      { id: 'APRON-DOM', points: fCTS.poly([[-1160, -860], [-330, -860], [-330, 860], [-1160, 860]]) }
    ],
    terminals: [
      fCTS.terminal('CTS-DOM-C', 'Domestic Semi-Circular Center', -680, 0, 96, 300, 24, 0, 0xf1f5f9),
      fCTS.terminal('CTS-DOM-N', 'Domestic North Arc (ANA)', -595, 275, 58, 290, 19, -30, 0xe2e8f0),
      fCTS.terminal('CTS-DOM-S', 'Domestic South Arc (JAL)', -595, -275, 58, 290, 19, 30, 0xe2e8f0),
      fCTS.terminal('CTS-LINK', 'Center Mall Concourse', -840, -120, 220, 44, 16, 0, 0xe2e8f0),
      fCTS.terminal('CTS-INTL', 'International Terminal (West)', -1020, -240, 108, 360, 23, 0, 0xdbeafe)
    ],
    atcTower: { ...fCTS.pt(-805, 195), alt: 25.0, heightM: 68 },
    gseServiceRoad: fCTS.poly([
      [-515, -660], [-515, 660]
    ]),
    spots: [
      fCTS.spot('S03', 'Spot 3 (Domestic North ANA)', -485, 315, 270, { terminal: 'DOM', entryDR: -30, entryDA: -90 }),
      fCTS.spot('S05', 'Spot 5 (Domestic North ANA)', -495, 210, 270, { terminal: 'DOM', entryDR: -30, entryDA: -90 }),
      fCTS.spot('S07', 'Spot 7 (Domestic Center)', -535, 105, 270, { terminal: 'DOM', entryDR: -25, entryDA: -90 }),
      fCTS.spot('S09', 'Spot 9 (Domestic Center)', -545, 0, 270, { terminal: 'DOM', entryDR: -25, entryDA: -90 }),
      fCTS.spot('S11', 'Spot 11 (Domestic South JAL)', -535, -105, 270, { terminal: 'DOM', entryDR: -25, entryDA: 90 }),
      fCTS.spot('S14', 'Spot 14 (Domestic South JAL)', -495, -210, 270, { terminal: 'DOM', entryDR: -30, entryDA: 90 }),
      fCTS.spot('S65', 'Spot 65 (International)', -900, -160, 270, { terminal: 'INTL', entryDR: -30, entryDA: 85 }),
      fCTS.spot('S68', 'Spot 68 (International)', -900, -310, 270, { terminal: 'INTL', entryDR: -30, entryDA: 85 })
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
