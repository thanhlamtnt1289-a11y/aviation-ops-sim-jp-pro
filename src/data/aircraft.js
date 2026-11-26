// 10 Japanese Aviation Aircraft Profiles & 14 Load Planning Scenarios (Training Illustrative Data)
export const AIRCRAFT_PROFILES = {
    DHC8: {
      id: 'DHC8',
      name: 'De Havilland Dash 8-Q400 (模擬 / Regional Turboprop · 74席)',
      nameVi: 'De Havilland Dash 8-Q400 (Mô phỏng / Cánh quạt vùng · 74 ghế)',
      nameEn: 'De Havilland Dash 8-Q400 (Sim / Regional Turboprop · 74 Seats)',
      category: 'Regional Turboprop',
      gseType: 'Bulk Belt / Manual (Không dùng High-Loader)',
      gseTypeEn: 'Bulk Belt / Manual (No High-Loader)',
      isFreighter: false,
      dow: 17185,
      dowArm: 14.30,
      lemac: 13.70,
      mac: 2.57,
      indexRefArm: 14.30,
      indexDivisor: 500,
      indexConstant: 50,
      mzfw: 25855,
      mtow: 29257,
      mlw: 28009,
      fuelArm: 14.20,
      maxFuel: 5318,
      trimStyle: 'boeing',
      trimRange: { fwdUnits: 6.5, aftUnits: 1.5, optMac: 26.0 },
      perf: { v1Base: 108, vrBase: 113, v2Base: 120, minRunwayM: 1050, mtowRunwayM: 1425, tailStrikePitchDeg: 9.0, tipMacOffset: 2.0 },
      visual3d: { isWide: false, isProp: true, isFreighter: false, fuseLen: 26, wingHalf: 14, tailColor: [14, 116, 144], bodyColor: [250, 252, 255], reg: 'JA461A' },
      paxZones: [
        { id: 'A', labelJa: '前部キャビン (Zone A)', labelVi: 'Khoang trước (Zone A)', labelEn: 'Fwd Cabin (Zone A)', maxPax: 24, arm: 9.20 },
        { id: 'B', labelJa: '中部キャビン (Zone B)', labelVi: 'Khoang giữa (Zone B)', labelEn: 'Mid Cabin (Zone B)', maxPax: 26, arm: 14.30 },
        { id: 'C', labelJa: '後部キャビン (Zone C)', labelVi: 'Khoang sau (Zone C)', labelEn: 'Aft Cabin (Zone C)', maxPax: 24, arm: 19.40 }
      ],
      holds: [
        { id: 'H1', labelJa: '前部手荷物室 (Fwd Baggage)', labelVi: 'Hầm hành lý trước (前部 H1)', labelEn: 'Fwd Baggage', maxWeight: 680, arm: 7.40 },
        { id: 'H3', labelJa: '後部貨物室 (Aft Baggage)', labelVi: 'Hầm hành lý sau (後部 H3)', labelEn: 'Aft Baggage', maxWeight: 1814, arm: 21.60 },
        { id: 'H5', labelJa: '尾部バルク室 (Tail Bulk)', labelVi: 'Hầm đuôi Bulk (バルク H5)', labelEn: 'Tail Bulk', maxWeight: 320, arm: 23.20 }
      ],
      uldPositions: [],
      envelope: {
        fwd: [{ w: 17000, mac: 17.0 }, { w: 25855, mac: 20.0 }, { w: 29257, mac: 21.5 }],
        aft: [{ w: 17000, mac: 35.0 }, { w: 25855, mac: 34.5 }, { w: 29257, mac: 33.5 }]
      }
    },
    E190: {
      id: 'E190',
      name: 'Embraer E190 (模擬 / Regional Jet · 95席)',
      nameVi: 'Embraer E190 (Mô phỏng / Phản lực vùng · 95 ghế)',
      nameEn: 'Embraer E190 (Sim / Regional Jet · 95 Seats)',
      category: 'Regional Jet',
      gseType: 'Bulk Belt Loader Only',
      gseTypeEn: 'Bulk Belt Loader Only',
      isFreighter: false,
      dow: 28080,
      dowArm: 16.95,
      lemac: 16.05,
      mac: 3.35,
      indexRefArm: 16.95,
      indexDivisor: 800,
      indexConstant: 50,
      mzfw: 40900,
      mtow: 51800,
      mlw: 44000,
      fuelArm: 16.85,
      maxFuel: 12970,
      trimStyle: 'boeing',
      trimRange: { fwdUnits: 6.0, aftUnits: 1.0, optMac: 25.0 },
      perf: { v1Base: 126, vrBase: 132, v2Base: 140, minRunwayM: 1480, mtowRunwayM: 2100, tailStrikePitchDeg: 10.2, tipMacOffset: 2.5 },
      visual3d: { isWide: false, isProp: false, isFreighter: false, fuseLen: 31, wingHalf: 15, tailColor: [185, 28, 28], bodyColor: [252, 253, 255], reg: 'JA245J' },
      paxZones: [
        { id: 'A', labelJa: '前部キャビン (Zone A)', labelVi: 'Khoang trước (Zone A)', labelEn: 'Fwd Cabin (Zone A)', maxPax: 31, arm: 11.10 },
        { id: 'B', labelJa: '中部キャビン (Zone B)', labelVi: 'Khoang giữa (Zone B)', labelEn: 'Mid Cabin (Zone B)', maxPax: 34, arm: 16.95 },
        { id: 'C', labelJa: '後部キャビン (Zone C)', labelVi: 'Khoang sau (Zone C)', labelEn: 'Aft Cabin (Zone C)', maxPax: 30, arm: 22.80 }
      ],
      holds: [
        { id: 'H1', labelJa: '前部貨物室 (Fwd Hold)', labelVi: 'Hầm trước (前部 H1)', labelEn: 'Fwd Hold', maxWeight: 2250, arm: 12.10 },
        { id: 'H3', labelJa: '後部貨物室 (Aft Hold)', labelVi: 'Hầm sau (後部 H3)', labelEn: 'Aft Hold', maxWeight: 2100, arm: 21.90 },
        { id: 'H5', labelJa: 'バルク室 (Bulk Hold)', labelVi: 'Hầm Bulk (バルク H5)', labelEn: 'Bulk Hold', maxWeight: 650, arm: 24.60 }
      ],
      uldPositions: [],
      envelope: {
        fwd: [{ w: 28000, mac: 15.0 }, { w: 40900, mac: 17.5 }, { w: 51800, mac: 20.0 }],
        aft: [{ w: 28000, mac: 36.0 }, { w: 40900, mac: 35.0 }, { w: 51800, mac: 33.5 }]
      }
    },
    A320: {
      id: 'A320',
      name: 'Airbus A320-200 (模擬 / Narrow-body · 180席)',
      nameVi: 'Airbus A320-200 (Mô phỏng / Thân hẹp · 180 ghế)',
      nameEn: 'Airbus A320-200 (Sim / Narrow-body · 180 Seats)',
      category: 'Narrow-body',
      gseType: 'Low-Deck High-Lift (AKH) + Bulk Belt',
      gseTypeEn: 'Low-Deck High-Lift (AKH) + Bulk Belt',
      isFreighter: false,
      dow: 42600,
      dowArm: 17.65,
      lemac: 16.50,
      mac: 4.19,
      indexRefArm: 17.75,
      indexDivisor: 1000,
      indexConstant: 50,
      mzfw: 62500,
      mtow: 77000,
      mlw: 66000,
      fuelArm: 17.50,
      maxFuel: 19000,
      trimStyle: 'airbus',
      trimRange: { fwdUnits: 3.2, aftUnits: -1.6, optMac: 28.0 },
      perf: { v1Base: 138, vrBase: 144, v2Base: 151, minRunwayM: 1620, mtowRunwayM: 2180, tailStrikePitchDeg: 11.7, tipMacOffset: 2.5 },
      visual3d: { isWide: false, isProp: false, isFreighter: false, fuseLen: 36, wingHalf: 18, tailColor: [27, 79, 156], bodyColor: [252, 253, 255], reg: 'JA102J' },
      paxZones: [
        { id: 'A', labelJa: '前部キャビン (Zone A)', labelVi: 'Khoang trước (Zone A)', labelEn: 'Fwd Cabin (Zone A)', maxPax: 54, arm: 11.20 },
        { id: 'B', labelJa: '中部キャビン (Zone B)', labelVi: 'Khoang giữa (Zone B)', labelEn: 'Mid Cabin (Zone B)', maxPax: 66, arm: 17.60 },
        { id: 'C', labelJa: '後部キャビン (Zone C)', labelVi: 'Khoang sau (Zone C)', labelEn: 'Aft Cabin (Zone C)', maxPax: 60, arm: 24.00 }
      ],
      holds: [
        { id: 'H1', labelJa: '第1貨物室・前部 (Fwd Hold 1)', labelVi: 'Hầm trước (前部貨物室 H1)', labelEn: 'Fwd Hold 1', maxWeight: 3400, arm: 12.20 },
        { id: 'H3', labelJa: '第3/4貨物室・後部 (Aft Hold 3/4)', labelVi: 'Hầm sau (後部貨物室 H3/4)', labelEn: 'Aft Hold 3/4', maxWeight: 4500, arm: 22.80 },
        { id: 'H5', labelJa: 'バルク貨物室 (Bulk Hold 5)', labelVi: 'Hầm Bulk (バルク室 H5)', labelEn: 'Bulk Hold 5', maxWeight: 1490, arm: 26.80 }
      ],
      uldPositions: [
        { id: '11P', holdId: 'H1', type: 'AKH', arm: 11.40, maxWeight: 1588 },
        { id: '12P', holdId: 'H1', type: 'AKH', arm: 13.00, maxWeight: 1588 },
        { id: '31P', holdId: 'H3', type: 'AKH', arm: 21.80, maxWeight: 1588 },
        { id: '32P', holdId: 'H3', type: 'AKH', arm: 23.40, maxWeight: 1588 },
        { id: '41P', holdId: 'H3', type: 'AKH', arm: 24.80, maxWeight: 1588 }
      ],
      envelope: {
        fwd: [{ w: 42000, mac: 17.0 }, { w: 60000, mac: 18.5 }, { w: 77000, mac: 21.5 }],
        aft: [{ w: 42000, mac: 38.0 }, { w: 62500, mac: 37.0 }, { w: 77000, mac: 35.0 }]
      }
    },
    B738: {
      id: 'B738',
      name: 'Boeing 737-800 (模擬 / Narrow-body · 177席)',
      nameVi: 'Boeing 737-800 (Mô phỏng / Thân hẹp · 177 ghế)',
      nameEn: 'Boeing 737-800 (Sim / Narrow-body · 177 Seats)',
      category: 'Narrow-body',
      gseType: 'Bulk Belt Loader Only (Không dùng High-Loader)',
      gseTypeEn: 'Bulk Belt Loader Only (No High-Loader)',
      isFreighter: false,
      dow: 41400,
      dowArm: 18.12,
      lemac: 17.10,
      mac: 3.96,
      indexRefArm: 18.10,
      indexDivisor: 1000,
      indexConstant: 50,
      mzfw: 61680,
      mtow: 79010,
      mlw: 65310,
      fuelArm: 17.95,
      maxFuel: 20800,
      trimStyle: 'boeing',
      trimRange: { fwdUnits: 7.0, aftUnits: 3.2, optMac: 24.0 },
      perf: { v1Base: 142, vrBase: 148, v2Base: 155, minRunwayM: 1700, mtowRunwayM: 2380, tailStrikePitchDeg: 11.0, tipMacOffset: 2.3 },
      visual3d: { isWide: false, isProp: false, isFreighter: false, fuseLen: 37, wingHalf: 18, tailColor: [185, 28, 28], bodyColor: [252, 253, 255], reg: 'JA342J' },
      paxZones: [
        { id: 'A', labelJa: '前部キャビン (Zone A)', labelVi: 'Khoang trước (Zone A)', labelEn: 'Fwd Cabin (Zone A)', maxPax: 54, arm: 11.80 },
        { id: 'B', labelJa: '中部キャビン (Zone B)', labelVi: 'Khoang giữa (Zone B)', labelEn: 'Mid Cabin (Zone B)', maxPax: 66, arm: 18.10 },
        { id: 'C', labelJa: '後部キャビン (Zone C)', labelVi: 'Khoang sau (Zone C)', labelEn: 'Aft Cabin (Zone C)', maxPax: 57, arm: 24.40 }
      ],
      holds: [
        { id: 'H1', labelJa: '前部貨物室 (Fwd Hold)', labelVi: 'Hầm trước (前部貨物室)', labelEn: 'Fwd Hold', maxWeight: 3870, arm: 12.60 },
        { id: 'H3', labelJa: '後部貨物室 (Aft Hold)', labelVi: 'Hầm sau (後部貨物室)', labelEn: 'Aft Hold', maxWeight: 4670, arm: 23.60 },
        { id: 'H5', labelJa: 'バルク室 (Bulk Hold)', labelVi: 'Hầm Bulk (バルク室)', labelEn: 'Bulk Hold', maxWeight: 1100, arm: 27.20 }
      ],
      uldPositions: [
        { id: '11B', holdId: 'H1', type: 'SECT', arm: 11.80, maxWeight: 1800 },
        { id: '12B', holdId: 'H1', type: 'SECT', arm: 13.40, maxWeight: 1800 },
        { id: '31B', holdId: 'H3', type: 'SECT', arm: 22.40, maxWeight: 1800 },
        { id: '32B', holdId: 'H3', type: 'SECT', arm: 24.20, maxWeight: 1800 },
        { id: '41B', holdId: 'H3', type: 'SECT', arm: 25.40, maxWeight: 1500 }
      ],
      envelope: {
        fwd: [{ w: 41000, mac: 14.0 }, { w: 62000, mac: 16.5 }, { w: 79010, mac: 19.5 }],
        aft: [{ w: 41000, mac: 34.0 }, { w: 62000, mac: 33.0 }, { w: 79010, mac: 31.0 }]
      }
    },
    A321: {
      id: 'A321',
      name: 'Airbus A321neo (模擬 / Stretched Narrow-body · 220席)',
      nameVi: 'Airbus A321neo (Mô phỏng / Thân hẹp kéo dài · 220 ghế)',
      nameEn: 'Airbus A321neo (Sim / Stretched Narrow-body · 220 Seats)',
      category: 'Stretched Narrow-body',
      gseType: 'Low-Deck High-Lift (AKH) + Bulk Belt',
      gseTypeEn: 'Low-Deck High-Lift (AKH) + Bulk Belt',
      isFreighter: false,
      dow: 50100,
      dowArm: 21.45,
      lemac: 20.10,
      mac: 4.19,
      indexRefArm: 21.45,
      indexDivisor: 1200,
      indexConstant: 50,
      mzfw: 75600,
      mtow: 93500,
      mlw: 79200,
      fuelArm: 21.20,
      maxFuel: 23700,
      trimStyle: 'airbus',
      trimRange: { fwdUnits: 3.4, aftUnits: -1.8, optMac: 27.5 },
      perf: { v1Base: 146, vrBase: 152, v2Base: 158, minRunwayM: 1850, mtowRunwayM: 2580, tailStrikePitchDeg: 9.7, tipMacOffset: 2.0 },
      visual3d: { isWide: false, isProp: false, isFreighter: false, fuseLen: 43, wingHalf: 19, tailColor: [3, 105, 161], bodyColor: [252, 253, 255], reg: 'JA151A' },
      paxZones: [
        { id: 'A', labelJa: '前部キャビン (Zone A)', labelVi: 'Khoang trước (Zone A)', labelEn: 'Fwd Cabin (Zone A)', maxPax: 68, arm: 12.60 },
        { id: 'B', labelJa: '中部キャビン (Zone B)', labelVi: 'Khoang giữa (Zone B)', labelEn: 'Mid Cabin (Zone B)', maxPax: 80, arm: 21.40 },
        { id: 'C', labelJa: '後部キャビン (Zone C)', labelVi: 'Khoang sau (Zone C)', labelEn: 'Aft Cabin (Zone C)', maxPax: 72, arm: 30.20 }
      ],
      holds: [
        { id: 'H1', labelJa: '前部貨物室 (Fwd Hold 1/2)', labelVi: 'Hầm trước (前部 H1/2)', labelEn: 'Fwd Hold 1/2', maxWeight: 5670, arm: 13.80 },
        { id: 'H3', labelJa: '後部貨物室 (Aft Hold 3/4)', labelVi: 'Hầm sau (後部 H3/4)', labelEn: 'Aft Hold 3/4', maxWeight: 5670, arm: 28.60 },
        { id: 'H5', labelJa: 'バルク室 (Bulk Hold 5)', labelVi: 'Hầm Bulk (バルク H5)', labelEn: 'Bulk Hold 5', maxWeight: 1490, arm: 33.40 }
      ],
      uldPositions: [
        { id: '11P', holdId: 'H1', type: 'AKH', arm: 12.60, maxWeight: 1588 },
        { id: '12P', holdId: 'H1', type: 'AKH', arm: 14.40, maxWeight: 1588 },
        { id: '13P', holdId: 'H1', type: 'AKH', arm: 16.00, maxWeight: 1588 },
        { id: '31P', holdId: 'H3', type: 'AKH', arm: 27.00, maxWeight: 1588 },
        { id: '32P', holdId: 'H3', type: 'AKH', arm: 28.80, maxWeight: 1588 },
        { id: '41P', holdId: 'H3', type: 'AKH', arm: 30.40, maxWeight: 1588 }
      ],
      envelope: {
        fwd: [{ w: 50000, mac: 18.0 }, { w: 75600, mac: 20.5 }, { w: 93500, mac: 23.0 }],
        aft: [{ w: 50000, mac: 37.5 }, { w: 75600, mac: 36.0 }, { w: 93500, mac: 34.0 }]
      }
    },
    B763: {
      id: 'B763',
      name: 'Boeing 767-300ER (模擬 / Medium Wide-body · 261席)',
      nameVi: 'Boeing 767-300ER (Mô phỏng / Thân rộng tầm trung · 261 ghế)',
      nameEn: 'Boeing 767-300ER (Sim / Medium Wide-body · 261 Seats)',
      category: 'Medium Wide-body',
      gseType: 'Wide-Body Low-Deck (LD2/AKE) + Bulk Belt',
      gseTypeEn: 'Wide-Body Low-Deck (LD2/AKE) + Bulk Belt',
      isFreighter: false,
      dow: 90010,
      dowArm: 26.80,
      lemac: 25.10,
      mac: 5.76,
      indexRefArm: 26.80,
      indexDivisor: 4000,
      indexConstant: 50,
      mzfw: 133810,
      mtow: 186880,
      mlw: 145150,
      fuelArm: 26.55,
      maxFuel: 73000,
      trimStyle: 'boeing',
      trimRange: { fwdUnits: 7.2, aftUnits: 2.5, optMac: 25.5 },
      perf: { v1Base: 145, vrBase: 151, v2Base: 160, minRunwayM: 1820, mtowRunwayM: 2680, tailStrikePitchDeg: 10.6, tipMacOffset: 2.6 },
      visual3d: { isWide: true, isProp: false, isFreighter: false, fuseLen: 44, wingHalf: 22, tailColor: [30, 64, 175], bodyColor: [252, 253, 255], reg: 'JA623J' },
      paxZones: [
        { id: 'A', labelJa: '前部 J/Cクラス (Zone A)', labelVi: 'Khoang trước J/C (Zone A)', labelEn: 'Fwd Premium Cabin (Zone A)', maxPax: 45, arm: 15.20 },
        { id: 'B', labelJa: '中部 Y1クラス (Zone B)', labelVi: 'Khoang giữa Y1 (Zone B)', labelEn: 'Mid Economy Y1 (Zone B)', maxPax: 106, arm: 26.80 },
        { id: 'C', labelJa: '後部 Y2クラス (Zone C)', labelVi: 'Khoang sau Y2 (Zone C)', labelEn: 'Aft Economy Y2 (Zone C)', maxPax: 110, arm: 38.40 }
      ],
      holds: [
        { id: 'H1', labelJa: '前部貨物室 (Fwd Hold)', labelVi: 'Hầm trước (前部 H1)', labelEn: 'Fwd Hold', maxWeight: 13200, arm: 17.50 },
        { id: 'H3', labelJa: '後部貨物室 (Aft Hold)', labelVi: 'Hầm sau (後部 H3)', labelEn: 'Aft Hold', maxWeight: 11800, arm: 35.60 },
        { id: 'H5', labelJa: 'バルク室 (Bulk Hold)', labelVi: 'Hầm Bulk (バルク H5)', labelEn: 'Bulk Hold', maxWeight: 2600, arm: 41.80 }
      ],
      uldPositions: [
        { id: '11L', holdId: 'H1', type: 'AKE', arm: 15.50, maxWeight: 3175 },
        { id: '12R', holdId: 'H1', type: 'AKE', arm: 18.20, maxWeight: 3175 },
        { id: '21P', holdId: 'H1', type: 'PMC', arm: 20.60, maxWeight: 4626 },
        { id: '31L', holdId: 'H3', type: 'AKE', arm: 33.40, maxWeight: 3175 },
        { id: '32R', holdId: 'H3', type: 'AKE', arm: 36.20, maxWeight: 3175 },
        { id: '41P', holdId: 'H3', type: 'PMC', arm: 38.80, maxWeight: 4626 }
      ],
      envelope: {
        fwd: [{ w: 88000, mac: 15.5 }, { w: 133810, mac: 18.0 }, { w: 186880, mac: 21.0 }],
        aft: [{ w: 88000, mac: 38.0 }, { w: 133810, mac: 36.5 }, { w: 186880, mac: 34.5 }]
      }
    },
    B788: {
      id: 'B788',
      name: 'Boeing 787-8 (模擬 / Wide-body · 264席)',
      nameVi: 'Boeing 787-8 (Mô phỏng / Thân rộng · 264 ghế)',
      nameEn: 'Boeing 787-8 (Sim / Wide-body · 264 Seats)',
      category: 'Wide-body',
      gseType: '2× Wide-Body Low-Deck (AKE/PMC) + Bulk Belt',
      gseTypeEn: '2× Wide-Body Low-Deck (AKE/PMC) + Bulk Belt',
      isFreighter: false,
      dow: 119950,
      dowArm: 27.95,
      lemac: 26.20,
      mac: 6.27,
      indexRefArm: 27.95,
      indexDivisor: 5000,
      indexConstant: 50,
      mzfw: 161020,
      mtow: 227930,
      mlw: 172360,
      fuelArm: 27.60,
      maxFuel: 101000,
      trimStyle: 'boeing',
      trimRange: { fwdUnits: 7.5, aftUnits: 2.2, optMac: 27.0 },
      perf: { v1Base: 148, vrBase: 155, v2Base: 164, minRunwayM: 1920, mtowRunwayM: 2820, tailStrikePitchDeg: 11.4, tipMacOffset: 2.8 },
      visual3d: { isWide: true, isProp: false, isFreighter: false, fuseLen: 46, wingHalf: 24, tailColor: [15, 118, 110], bodyColor: [252, 253, 255], reg: 'JA801A' },
      paxZones: [
        { id: 'A', labelJa: '前部 Cクラス (Zone A)', labelVi: 'Khoang trước J/C (Zone A)', labelEn: 'Fwd Premium Cabin (Zone A)', maxPax: 42, arm: 15.80 },
        { id: 'B', labelJa: '中部 Y1クラス (Zone B)', labelVi: 'Khoang giữa Y1 (Zone B)', labelEn: 'Mid Economy Y1 (Zone B)', maxPax: 108, arm: 27.80 },
        { id: 'C', labelJa: '後部 Y2クラス (Zone C)', labelVi: 'Khoang sau Y2 (Zone C)', labelEn: 'Aft Economy Y2 (Zone C)', maxPax: 114, arm: 39.80 }
      ],
      holds: [
        { id: 'H1', labelJa: '前部貨物室 (Fwd Hold)', labelVi: 'Hầm trước (前部貨物室)', labelEn: 'Fwd Hold', maxWeight: 16500, arm: 18.20 },
        { id: 'H3', labelJa: '後部貨物室 (Aft Hold)', labelVi: 'Hầm sau (後部貨物室)', labelEn: 'Aft Hold', maxWeight: 14500, arm: 36.80 },
        { id: 'H5', labelJa: 'バルク貨物室 (Bulk Hold)', labelVi: 'Hầm Bulk (バルク室)', labelEn: 'Bulk Hold', maxWeight: 3500, arm: 43.20 }
      ],
      uldPositions: [
        { id: '11L', holdId: 'H1', type: 'AKE', arm: 16.00, maxWeight: 3500 },
        { id: '12R', holdId: 'H1', type: 'AKE', arm: 18.40, maxWeight: 3500 },
        { id: '21P', holdId: 'H1', type: 'PMC', arm: 21.20, maxWeight: 4626 },
        { id: '31L', holdId: 'H3', type: 'AKE', arm: 34.20, maxWeight: 3500 },
        { id: '32R', holdId: 'H3', type: 'AKE', arm: 36.80, maxWeight: 3500 },
        { id: '41P', holdId: 'H3', type: 'PMC', arm: 39.40, maxWeight: 4626 }
      ],
      envelope: {
        fwd: [{ w: 118000, mac: 16.0 }, { w: 165000, mac: 18.5 }, { w: 227930, mac: 21.5 }],
        aft: [{ w: 118000, mac: 39.0 }, { w: 165000, mac: 38.0 }, { w: 227930, mac: 35.5 }]
      }
    },
    B789: {
      id: 'B789',
      name: 'Boeing 787-9 Dreamliner (模擬 / Wide-body · 290席 · 62.8m)',
      nameVi: 'Boeing 787-9 Dreamliner (Mô phỏng / Thân rộng · 290 ghế · 62.8m)',
      nameEn: 'Boeing 787-9 Dreamliner (Sim / Wide-body · 290 Seats · 62.8m)',
      category: 'Wide-body',
      gseType: '2× Wide-Body High-Loader (LD3/PMC) + Bulk Belt',
      gseTypeEn: '2× Wide-Body High-Loader (LD3/PMC) + Bulk Belt',
      isFreighter: false,
      dow: 128850,
      dowArm: 30.80,
      lemac: 28.90,
      mac: 6.27,
      indexRefArm: 30.80,
      indexDivisor: 5500,
      indexConstant: 50,
      mzfw: 181437,
      mtow: 254011,
      mlw: 192777,
      fuelArm: 30.40,
      maxFuel: 101520,
      trimStyle: 'boeing',
      trimRange: { fwdUnits: 7.5, aftUnits: 2.2, optMac: 27.2 },
      perf: { v1Base: 152, vrBase: 159, v2Base: 168, minRunwayM: 2040, mtowRunwayM: 2920, tailStrikePitchDeg: 10.6, tipMacOffset: 2.7 },
      visual3d: { isWide: true, isProp: false, isFreighter: false, fuseLen: 50, wingHalf: 25, tailColor: [11, 59, 140], bodyColor: [252, 253, 255], reg: 'JA899A' },
      paxZones: [
        { id: 'A', labelJa: '前部 Cクラス (Zone A)', labelVi: 'Khoang trước C (Zone A)', labelEn: 'Fwd Premium Cabin (Zone A)', maxPax: 48, arm: 17.20 },
        { id: 'B', labelJa: '中部 Y1クラス (Zone B)', labelVi: 'Khoang giữa Y1 (Zone B)', labelEn: 'Mid Economy Y1 (Zone B)', maxPax: 118, arm: 30.60 },
        { id: 'C', labelJa: '後部 Y2クラス (Zone C)', labelVi: 'Khoang sau Y2 (Zone C)', labelEn: 'Aft Economy Y2 (Zone C)', maxPax: 124, arm: 44.20 }
      ],
      holds: [
        { id: 'H1', labelJa: '前部貨物室 (Fwd Hold)', labelVi: 'Hầm trước (前部貨物室)', labelEn: 'Fwd Hold', maxWeight: 19500, arm: 19.60 },
        { id: 'H3', labelJa: '後部貨物室 (Aft Hold)', labelVi: 'Hầm sau (後部貨物室)', labelEn: 'Aft Hold', maxWeight: 17500, arm: 41.20 },
        { id: 'H5', labelJa: 'バルク貨物室 (Bulk Hold)', labelVi: 'Hầm Bulk (バルク室)', labelEn: 'Bulk Hold', maxWeight: 3800, arm: 48.20 }
      ],
      uldPositions: [
        { id: '11L', holdId: 'H1', type: 'AKE', arm: 17.40, maxWeight: 3500 },
        { id: '12R', holdId: 'H1', type: 'AKE', arm: 19.80, maxWeight: 3500 },
        { id: '21P', holdId: 'H1', type: 'PMC', arm: 22.80, maxWeight: 4626 },
        { id: '31L', holdId: 'H3', type: 'AKE', arm: 38.60, maxWeight: 3500 },
        { id: '32R', holdId: 'H3', type: 'AKE', arm: 41.20, maxWeight: 3500 },
        { id: '41P', holdId: 'H3', type: 'PMC', arm: 44.00, maxWeight: 4626 }
      ],
      envelope: {
        fwd: [{ w: 128000, mac: 16.0 }, { w: 181437, mac: 18.5 }, { w: 254011, mac: 21.5 }],
        aft: [{ w: 128000, mac: 39.5 }, { w: 181437, mac: 38.2 }, { w: 254011, mac: 35.8 }]
      }
    },
    A359: {
      id: 'A359',
      name: 'Airbus A350-900 (模擬 / Next-Gen Wide-body · 369席)',
      nameVi: 'Airbus A350-900 (Mô phỏng / Thân rộng thế hệ mới · 369 ghế)',
      nameEn: 'Airbus A350-900 (Sim / Next-Gen Wide-body · 369 Seats)',
      category: 'Next-Gen Wide-body',
      gseType: '2× Wide-Body Low-Deck (AKE/PMC) + Bulk Belt',
      gseTypeEn: '2× Wide-Body Low-Deck (AKE/PMC) + Bulk Belt',
      isFreighter: false,
      dow: 142400,
      dowArm: 32.10,
      lemac: 30.20,
      mac: 7.28,
      indexRefArm: 32.10,
      indexDivisor: 6000,
      indexConstant: 50,
      mzfw: 195700,
      mtow: 280000,
      mlw: 207000,
      fuelArm: 31.80,
      maxFuel: 110000,
      trimStyle: 'airbus',
      trimRange: { fwdUnits: 3.8, aftUnits: -1.5, optMac: 28.5 },
      perf: { v1Base: 152, vrBase: 158, v2Base: 166, minRunwayM: 2050, mtowRunwayM: 2950, tailStrikePitchDeg: 10.8, tipMacOffset: 2.7 },
      visual3d: { isWide: true, isProp: false, isFreighter: false, fuseLen: 50, wingHalf: 26, tailColor: [185, 28, 28], bodyColor: [252, 253, 255], reg: 'JA01XJ' },
      paxZones: [
        { id: 'A', labelJa: '前部 F/Jクラス (Zone A)', labelVi: 'Khoang trước F/J (Zone A)', labelEn: 'Fwd Premium Cabin (Zone A)', maxPax: 68, arm: 18.00 },
        { id: 'B', labelJa: '中部 Y1クラス (Zone B)', labelVi: 'Khoang giữa Y1 (Zone B)', labelEn: 'Mid Economy Y1 (Zone B)', maxPax: 144, arm: 32.00 },
        { id: 'C', labelJa: '後部 Y2クラス (Zone C)', labelVi: 'Khoang sau Y2 (Zone C)', labelEn: 'Aft Economy Y2 (Zone C)', maxPax: 157, arm: 46.00 }
      ],
      holds: [
        { id: 'H1', labelJa: '前部貨物室 (Fwd Hold)', labelVi: 'Hầm trước (前部 H1)', labelEn: 'Fwd Hold', maxWeight: 22500, arm: 21.00 },
        { id: 'H3', labelJa: '後部貨物室 (Aft Hold)', labelVi: 'Hầm sau (後部 H3)', labelEn: 'Aft Hold', maxWeight: 19500, arm: 42.50 },
        { id: 'H5', labelJa: 'バルク貨物室 (Bulk Hold)', labelVi: 'Hầm Bulk (バルク H5)', labelEn: 'Bulk Hold', maxWeight: 4200, arm: 50.50 }
      ],
      uldPositions: [
        { id: '11L', holdId: 'H1', type: 'AKE', arm: 18.50, maxWeight: 3500 },
        { id: '12R', holdId: 'H1', type: 'AKE', arm: 21.50, maxWeight: 3500 },
        { id: '21P', holdId: 'H1', type: 'PMC', arm: 24.50, maxWeight: 4626 },
        { id: '31L', holdId: 'H3', type: 'AKE', arm: 39.50, maxWeight: 3500 },
        { id: '32R', holdId: 'H3', type: 'AKE', arm: 42.50, maxWeight: 3500 },
        { id: '41P', holdId: 'H3', type: 'PMC', arm: 45.50, maxWeight: 4626 }
      ],
      envelope: {
        fwd: [{ w: 140000, mac: 16.5 }, { w: 195700, mac: 19.0 }, { w: 280000, mac: 22.0 }],
        aft: [{ w: 140000, mac: 40.0 }, { w: 195700, mac: 38.5 }, { w: 280000, mac: 36.0 }]
      }
    },
    B773: {
      id: 'B773',
      name: 'Boeing 777-300ER (模擬 / Heavy Wide-body · 390席)',
      nameVi: 'Boeing 777-300ER (Mô phỏng / Thân rộng cỡ lớn · 390 ghế)',
      nameEn: 'Boeing 777-300ER (Sim / Heavy Wide-body · 390 Seats)',
      category: 'Heavy Wide-body',
      gseType: '2× Heavy Low-Deck (AKE/PMC) + Bulk Belt',
      gseTypeEn: '2× Heavy Low-Deck (AKE/PMC) + Bulk Belt',
      isFreighter: false,
      dow: 167800,
      dowArm: 36.20,
      lemac: 34.00,
      mac: 7.07,
      indexRefArm: 36.20,
      indexDivisor: 7000,
      indexConstant: 50,
      mzfw: 237680,
      mtow: 351530,
      mlw: 251290,
      fuelArm: 35.80,
      maxFuel: 145500,
      trimStyle: 'boeing',
      trimRange: { fwdUnits: 7.8, aftUnits: 2.0, optMac: 28.0 },
      perf: { v1Base: 160, vrBase: 168, v2Base: 176, minRunwayM: 2250, mtowRunwayM: 3250, tailStrikePitchDeg: 9.8, tipMacOffset: 2.4 },
      visual3d: { isWide: true, isProp: false, isFreighter: false, fuseLen: 54, wingHalf: 27, tailColor: [27, 79, 156], bodyColor: [252, 253, 255], reg: 'JA789A' },
      paxZones: [
        { id: 'A', labelJa: '前部 F/Cクラス (Zone A)', labelVi: 'Khoang trước F/C (Zone A)', labelEn: 'Fwd Premium Cabin (Zone A)', maxPax: 72, arm: 20.50 },
        { id: 'B', labelJa: '中部 Y1クラス (Zone B)', labelVi: 'Khoang giữa Y1 (Zone B)', labelEn: 'Mid Economy Y1 (Zone B)', maxPax: 158, arm: 36.00 },
        { id: 'C', labelJa: '後部 Y2クラス (Zone C)', labelVi: 'Khoang sau Y2 (Zone C)', labelEn: 'Aft Economy Y2 (Zone C)', maxPax: 160, arm: 51.50 }
      ],
      holds: [
        { id: 'H1', labelJa: '前部貨物室 (Fwd Hold)', labelVi: 'Hầm trước (前部 H1)', labelEn: 'Fwd Hold', maxWeight: 26500, arm: 23.50 },
        { id: 'H3', labelJa: '後部貨物室 (Aft Hold)', labelVi: 'Hầm sau (後部 H3)', labelEn: 'Aft Hold', maxWeight: 22500, arm: 48.00 },
        { id: 'H5', labelJa: 'バルク貨物室 (Bulk Hold)', labelVi: 'Hầm Bulk (バルク H5)', labelEn: 'Bulk Hold', maxWeight: 4800, arm: 56.50 }
      ],
      uldPositions: [
        { id: '11L', holdId: 'H1', type: 'AKE', arm: 20.50, maxWeight: 3500 },
        { id: '12R', holdId: 'H1', type: 'AKE', arm: 23.50, maxWeight: 3500 },
        { id: '21P', holdId: 'H1', type: 'PMC', arm: 27.00, maxWeight: 5035 },
        { id: '31L', holdId: 'H3', type: 'AKE', arm: 44.50, maxWeight: 3500 },
        { id: '32R', holdId: 'H3', type: 'AKE', arm: 48.00, maxWeight: 3500 },
        { id: '41P', holdId: 'H3', type: 'PMC', arm: 51.50, maxWeight: 5035 }
      ],
      envelope: {
        fwd: [{ w: 165000, mac: 16.0 }, { w: 237680, mac: 19.0 }, { w: 351530, mac: 22.5 }],
        aft: [{ w: 165000, mac: 40.5 }, { w: 237680, mac: 39.0 }, { w: 351530, mac: 36.5 }]
      }
    },
    B77F: {
      id: 'B77F',
      name: 'Boeing 777F Freighter (模擬 / 貨物専用機 · Main Deck 5.2m)',
      nameVi: 'Boeing 777F Freighter (Mô phỏng / Chuyên chở hàng · Sàn chính 5.2m)',
      nameEn: 'Boeing 777F Freighter (Sim / All-Cargo Freighter · Main Deck 5.2m)',
      category: 'All-Cargo Freighter',
      gseType: 'Main-Deck High-Lift (5.2m) + Low-Deck Loader (No PBB)',
      gseTypeEn: 'Main-Deck High-Lift (5.2m) + Low-Deck Loader (No PBB)',
      isFreighter: true,
      dow: 144400,
      dowArm: 31.80,
      lemac: 29.80,
      mac: 7.07,
      indexRefArm: 31.80,
      indexDivisor: 7000,
      indexConstant: 50,
      mzfw: 248115,
      mtow: 347815,
      mlw: 260815,
      fuelArm: 31.40,
      maxFuel: 145500,
      trimStyle: 'boeing',
      trimRange: { fwdUnits: 7.6, aftUnits: 2.0, optMac: 27.5 },
      perf: { v1Base: 162, vrBase: 170, v2Base: 178, minRunwayM: 2280, mtowRunwayM: 3320, tailStrikePitchDeg: 10.5, tipMacOffset: 1.8 },
      visual3d: { isWide: true, isProp: false, isFreighter: true, fuseLen: 50, wingHalf: 26, tailColor: [234, 88, 12], bodyColor: [241, 245, 249], reg: 'JA771F' },
      paxZones: [
        { id: 'A', labelJa: '添乗員・乗務員席 (Supernumerary)', labelVi: 'Ghế nhân viên áp tải hàng (Supernumerary)', labelEn: 'Supernumerary / Courier Seats', maxPax: 4, arm: 11.50 },
        { id: 'B', labelJa: 'メインデッキ予備 (Reserved)', labelVi: 'Khoang giữa (Không chở khách)', labelEn: 'Main Deck (Cargo Only)', maxPax: 0, arm: 31.80 },
        { id: 'C', labelJa: '後部予備 (Reserved)', labelVi: 'Khoang sau (Không chở khách)', labelEn: 'Aft Deck (Cargo Only)', maxPax: 0, arm: 46.00 }
      ],
      holds: [
        { id: 'M1', labelJa: 'メインデッキ前部 (Main Deck Fwd)', labelVi: 'Tầng chính trước (Main Deck M1)', labelEn: 'Main Deck Fwd', maxWeight: 48000, arm: 21.50 },
        { id: 'M2', labelJa: 'メインデッキ後部 (Main Deck Aft)', labelVi: 'Tầng chính sau (Main Deck M2)', labelEn: 'Main Deck Aft', maxWeight: 46000, arm: 42.50 },
        { id: 'H1', labelJa: 'ロワー前部貨物室 (Lower Fwd)', labelVi: 'Hầm dưới trước (Lower H1)', labelEn: 'Lower Fwd', maxWeight: 18500, arm: 21.00 },
        { id: 'H3', labelJa: 'ロワー後部貨物室 (Lower Aft)', labelVi: 'Hầm dưới sau (Lower H3)', labelEn: 'Lower Aft', maxWeight: 16500, arm: 41.50 },
        { id: 'H5', labelJa: 'バルク室 (Bulk Hold)', labelVi: 'Hầm Bulk (バルク H5)', labelEn: 'Bulk Hold', maxWeight: 3200, arm: 49.00 }
      ],
      uldPositions: [
        { id: 'ML1', holdId: 'M1', type: 'PMC-MD', arm: 17.50, maxWeight: 11340 },
        { id: 'ML2', holdId: 'M1', type: 'PMC-MD', arm: 24.50, maxWeight: 11340 },
        { id: 'MR1', holdId: 'M2', type: 'PMC-MD', arm: 39.00, maxWeight: 11340 },
        { id: 'MR2', holdId: 'M2', type: 'PMC-MD', arm: 46.00, maxWeight: 11340 },
        { id: '11P', holdId: 'H1', type: 'PMC', arm: 21.00, maxWeight: 4626 },
        { id: '31P', holdId: 'H3', type: 'PMC', arm: 41.50, maxWeight: 4626 }
      ],
      envelope: {
        fwd: [{ w: 144000, mac: 15.0 }, { w: 248115, mac: 18.0 }, { w: 347815, mac: 21.0 }],
        aft: [{ w: 144000, mac: 41.0 }, { w: 248115, mac: 39.5 }, { w: 347815, mac: 37.0 }]
      }
    }
  };

export const WB_SCENARIOS = [
    {
      id: 'S01',
      aircraft: 'A320',
      titleJa: '01. 標準国内線（バランス良好ベースライン）',
      titleVi: '01. Chuyến nội địa tiêu chuẩn (Cân bằng chuẩn)',
      titleEn: '01. Standard Domestic Sector (Balanced Baseline)',
      descJa: '羽田→中部（HND-NGO）想定。標準的な旅客・手荷物・燃料搭載で全制限値内に収まる基本パターンを確認します。',
      descVi: 'Mô phỏng chuyến HND→NGO cân bằng tốt. Kiểm tra công thức Moment, %MAC, ZFW/TOW/LW khi tất cả đều đạt chuẩn.',
      descEn: 'Simulated HND→NGO flight with balanced passengers, baggage, and fuel well inside all structural and CG limits.',
      input: {
        pax: { A: 42, B: 56, C: 44 },
        holds: { H1: { bag: 650, cargo: 300 }, H3: { bag: 700, cargo: 400 }, H5: { bag: 200, cargo: 0 } },
        ulds: { '11P': 600, '12P': 500, '31P': 650, '32P': 500, '41P': 0 },
        fuel: { block: 6800, taxi: 200, trip: 3200 }
      },
      solutionNoteJa: 'すでに全項目PASS（基準内）です。ZFW・TOW・LWのCG位置がエンベロープ中央付近にあることを確認してください。',
      solutionNoteVi: 'Kịch bản này đã PASS toàn bộ. Hãy đối chiếu ZFW/TOW/LW và vị trí điểm CG nằm gọn trong vùng an toàn của envelope.',
      solutionNoteEn: 'Already PASS across all checks. Observe ZFW, TOW, and LW CG points positioned squarely near the center of the envelope.',
      solutionInput: {
        pax: { A: 42, B: 56, C: 44 },
        holds: { H1: { bag: 650, cargo: 300 }, H3: { bag: 700, cargo: 400 }, H5: { bag: 200, cargo: 0 } },
        ulds: { '11P': 600, '12P': 500, '31P': 650, '32P': 500, '41P': 0 },
        fuel: { block: 6800, taxi: 200, trip: 3200 }
      }
    },
    {
      id: 'S02',
      aircraft: 'A320',
      titleJa: '02. 満席フライト（MZFW近接・高負荷）',
      titleVi: '02. Khoang đầy khách (Full Cabin, cận MZFW)',
      titleEn: '02. Full-Cabin Holiday Flight (MZFW & MLW Exceeded)',
      descJa: '連休の満席便（180名）。手荷物・貨物が多くMZFW（62,500kg）を超過しています。貨物を調整して全制限内に収めてください。',
      descVi: 'Chuyến bay kín 180 khách dịp lễ. Hành lý + hàng hóa làm vượt MZFW (62,500 kg). Hãy điều chỉnh tải để đạt chuẩn.',
      descEn: 'Full 180-passenger holiday sector where heavy baggage and loose cargo push ZFW above MZFW (62,500 kg). Offload cargo to pass.',
      input: {
        pax: { A: 54, B: 66, C: 60 },
        holds: { H1: { bag: 1100, cargo: 700 }, H3: { bag: 1400, cargo: 900 }, H5: { bag: 650, cargo: 250 } },
        ulds: { '11P': 900, '12P': 600, '31P': 900, '32P': 600, '41P': 400 },
        fuel: { block: 8200, taxi: 250, trip: 4800 }
      },
      solutionNoteJa: 'MZFW超過（+2,000kg）およびMLW超過を解消するため、H3バラ貨物900kg・ULD 41P 400kg・H1貨物700kg・H5貨物250kgをオフロード（計2,250kg削減）。',
      solutionNoteVi: 'Vượt MZFW (+2,000 kg) và MLW. Giảm hàng rời H3 (900→0), ULD 41P (400→0), hàng H1 (700→0) và hàng H5 (250→0) — tổng giảm 2,250 kg để ZFW=62,250 kg, LW=65,400 kg.',
      solutionNoteEn: 'Offload 900 kg loose cargo in H3, 400 kg in ULD 41P, 700 kg in H1, and 250 kg in H5 (-2,250 kg total) to bring ZFW to 62,250 kg and LW within MLW.',
      solutionInput: {
        pax: { A: 54, B: 66, C: 60 },
        holds: { H1: { bag: 1100, cargo: 0 }, H3: { bag: 1400, cargo: 0 }, H5: { bag: 650, cargo: 0 } },
        ulds: { '11P': 900, '12P': 600, '31P': 900, '32P': 600, '41P': 0 },
        fuel: { block: 8200, taxi: 250, trip: 4800 }
      }
    },
    {
      id: 'S03',
      aircraft: 'A320',
      titleJa: '03. 後部貨物室 過積載（重量貨物集中）',
      titleVi: '03. Hàng nặng dồn hầm sau (Vượt giới hạn hầm H3)',
      titleEn: '03. Aft Hold Structural Overload (H3 > 4,500 kg)',
      descJa: '後部貨物室（H3）に手荷物とULDが集中し、構造上限（4,500kg）を超過、重心も後方寄りです。前部貨物室へ再配分してください。',
      descVi: 'Hầm sau (H3) quá tải cấu trúc (>4,500 kg) do dồn cả hành lý lẫn 3 ULD, đồng thời kéo CG về sau. Hãy phân bổ lại lên hầm trước.',
      descEn: 'Baggage and three AKH ULDs concentrated in Aft Hold H3 exceed its 4,500 kg structural limit and shift CG aft. Redistribute forward.',
      input: {
        pax: { A: 36, B: 50, C: 48 },
        holds: { H1: { bag: 300, cargo: 0 }, H3: { bag: 1200, cargo: 600 }, H5: { bag: 500, cargo: 0 } },
        ulds: { '11P': 400, '12P': 0, '31P': 1300, '32P': 1200, '41P': 1100 },
        fuel: { block: 7400, taxi: 200, trip: 4000 }
      },
      solutionNoteJa: 'H3合計5,400kg（上限4,500kg超過）。ULD 41P(1,100kg)を12Pへ移設し、H3バラ貨物600kgをH1へ移動。',
      solutionNoteVi: 'H3 đạt 5,400 kg (vượt 900 kg). Chuyển ULD 41P (1,100 kg) lên 12P và chuyển 600 kg hàng H3 sang H1.',
      solutionNoteEn: 'H3 totals 5,400 kg (+900 kg over). Move ULD 41P (1,100 kg) to forward position 12P and shift 600 kg loose cargo from H3 to H1.',
      solutionInput: {
        pax: { A: 36, B: 50, C: 48 },
        holds: { H1: { bag: 300, cargo: 600 }, H3: { bag: 1200, cargo: 0 }, H5: { bag: 500, cargo: 0 } },
        ulds: { '11P': 400, '12P': 1100, '31P': 1300, '32P': 1200, '41P': 0 },
        fuel: { block: 7400, taxi: 200, trip: 4000 }
      }
    },
    {
      id: 'S04',
      aircraft: 'A320',
      titleJa: '04. CG後方逸脱（テールヘビー危険状態）',
      titleVi: '04. CG quá sau (Out of Aft Envelope)',
      titleEn: '04. Out of Aft CG Envelope (Severe Tail-Heavy Risk)',
      descJa: '団体客が後部Zone Cに集中し、さらにバルクと後部ULDに満載されたため、%MACが後方限界を超過しています。',
      descVi: 'Đoàn khách ngồi hết Zone C cộng thêm hàng nặng ở hầm sau và Bulk khiến CG vượt giới hạn sau. Điều chỉnh để đưa CG vào vùng an toàn.',
      descEn: 'A tour group seated in Zone C combined with heavy aft ULDs and bulk cargo drives %MAC beyond the Aft CG limit.',
      input: {
        pax: { A: 6, B: 28, C: 58 },
        holds: { H1: { bag: 150, cargo: 0 }, H3: { bag: 900, cargo: 700 }, H5: { bag: 900, cargo: 450 } },
        ulds: { '11P': 0, '12P': 0, '31P': 1100, '32P': 1000, '41P': 600 },
        fuel: { block: 6500, taxi: 200, trip: 3100 }
      },
      solutionNoteJa: '後部ULD(32P・41P)を前部(11P・12P)へ移し、バルク貨物450kgをH1へ移載、さらにZone Cから18名をZone Aへ再配席。',
      solutionNoteVi: 'Chuyển ULD 32P (1000 kg) → 11P, 41P (600 kg) → 12P, chuyển 450 kg hàng Bulk sang H1 và điều 18 khách Zone C lên Zone A.',
      solutionNoteEn: 'Relocate ULDs 32P (1,000 kg) → 11P and 41P (600 kg) → 12P, shift 450 kg bulk cargo to H1, and reseat 18 passengers from Zone C to Zone A.',
      solutionInput: {
        pax: { A: 24, B: 28, C: 40 },
        holds: { H1: { bag: 150, cargo: 450 }, H3: { bag: 900, cargo: 700 }, H5: { bag: 900, cargo: 0 } },
        ulds: { '11P': 1000, '12P': 600, '31P': 1100, '32P': 0, '41P': 0 },
        fuel: { block: 6500, taxi: 200, trip: 3100 }
      }
    },
    {
      id: 'S05',
      aircraft: 'A320',
      titleJa: '05. CG前方逸脱（ノーズヘビー状態）',
      titleVi: '05. CG quá trước (Out of Forward Envelope)',
      titleEn: '05. Out of Forward CG Envelope (Nose-Heavy Condition)',
      descJa: '前方客室と前部貨物室に重量が偏り、CGが前方限界を下回っています。後部へ分散してください。',
      descVi: 'Khách ngồi kín khoang trước và 2 ULD nặng đặt ở hầm trước trong khi phía sau trống, khiến CG vượt giới hạn trước.',
      descEn: 'Passengers concentrated in Zone A plus two heavy forward ULDs with empty aft holds push CG forward of the minimum %MAC limit.',
      input: {
        pax: { A: 52, B: 30, C: 4 },
        holds: { H1: { bag: 400, cargo: 200 }, H3: { bag: 100, cargo: 0 }, H5: { bag: 0, cargo: 0 } },
        ulds: { '11P': 1400, '12P': 1350, '31P': 0, '32P': 0, '41P': 0 },
        fuel: { block: 9200, taxi: 200, trip: 4800 }
      },
      solutionNoteJa: 'ULD 12P(1,350kg)を後部31Pへ移動し、Zone Aの旅客16名をZone Cへ移すことで全フェーズのCGが正常範囲に入ります。',
      solutionNoteVi: 'Chuyển ULD 12P (1,350 kg) ra vị trí sau 31P và dời 16 khách từ Zone A xuống Zone C để kéo CG vào trong envelope.',
      solutionNoteEn: 'Move ULD 12P (1,350 kg) aft to 31P and reseat 16 passengers from Zone A to Zone C to bring all flight phases inside the envelope.',
      solutionInput: {
        pax: { A: 36, B: 30, C: 20 },
        holds: { H1: { bag: 400, cargo: 200 }, H3: { bag: 100, cargo: 0 }, H5: { bag: 0, cargo: 0 } },
        ulds: { '11P': 1400, '12P': 0, '31P': 1350, '32P': 0, '41P': 0 },
        fuel: { block: 9200, taxi: 200, trip: 4800 }
      }
    },
    {
      id: 'S06',
      aircraft: 'A320',
      titleJa: '06. 高燃料・MTOW超過（長距離・悪天候予備燃料）',
      titleVi: '06. Nhiên liệu cao & Vượt MTOW (Cận ngưỡng cất cánh)',
      titleEn: '06. High Weather Reserve Fuel & MTOW Exceeded',
      descJa: '目的地悪天候のため予備燃料を大量搭載し、ZFWは基準内ですがTOWがMTOW(77,000kg)を超過しています。',
      descVi: 'Do thời tiết xấu phải mang nhiều nhiên liệu dự phòng; ZFW hợp lệ nhưng TOW vượt MTOW (77,000 kg). Hãy giảm tải hoặc cân đối nhiên liệu.',
      descEn: 'Bad destination weather requires heavy reserve fuel; ZFW is legal, but TOW exceeds MTOW (77,000 kg).',
      input: {
        pax: { A: 48, B: 60, C: 52 },
        holds: { H1: { bag: 900, cargo: 800 }, H3: { bag: 1000, cargo: 900 }, H5: { bag: 400, cargo: 200 } },
        ulds: { '11P': 800, '12P': 700, '31P': 900, '32P': 700, '41P': 0 },
        fuel: { block: 16200, taxi: 300, trip: 11800 }
      },
      solutionNoteJa: 'TOW 77,800kg（+800kg超過）。非優先貨物（H1貨物500kg・H3貨物500kg、計1,000kg）をオフロードしてTOW 76,800kgに調整。',
      solutionNoteVi: 'TOW đang 77,800 kg (vượt 800 kg). Offload 500 kg hàng H1 và 500 kg hàng H3 (giữ cân bằng CG) để đưa TOW xuống 76,800 kg.',
      solutionNoteEn: 'TOW is 77,800 kg (+800 kg over). Offload 500 kg non-priority cargo from H1 and 500 kg from H3 (-1,000 kg symmetrical) for TOW = 76,800 kg.',
      solutionInput: {
        pax: { A: 48, B: 60, C: 52 },
        holds: { H1: { bag: 900, cargo: 300 }, H3: { bag: 1000, cargo: 400 }, H5: { bag: 400, cargo: 200 } },
        ulds: { '11P': 800, '12P': 700, '31P': 900, '32P': 700, '41P': 0 },
        fuel: { block: 16200, taxi: 300, trip: 11800 }
      }
    },
    {
      id: 'S07',
      aircraft: 'B738',
      titleJa: '07. B737-800 短距離便・MLW超過（着陸重量制限）',
      titleVi: '07. B737-800 Chặng ngắn vượt MLW (Trọng lượng hạ cánh)',
      titleEn: '07. B737-800 Short Sector Fuel Tankering (MLW Exceeded)',
      descJa: '伊丹→羽田の短距離便。帰路用燃料を積んだ（タンカリング）結果、TOWは問題ないのにLWがMLW(65,310kg)を超過しました。',
      descVi: 'Chuyến bay chặng ngắn mang thừa nhiên liệu (tankering). TOW đạt chuẩn nhưng do tiêu thụ ít nên LW vượt MLW (65,310 kg).',
      descEn: 'Short ITM→HND flight carrying return-sector tankered fuel: TOW is legal, but low trip burn leaves LW above MLW (65,310 kg).',
      input: {
        pax: { A: 50, B: 62, C: 50 },
        holds: { H1: { bag: 900, cargo: 600 }, H3: { bag: 1000, cargo: 700 }, H5: { bag: 300, cargo: 0 } },
        ulds: { '11B': 700, '12B': 600, '31B': 700, '32B': 500, '41B': 0 },
        fuel: { block: 10500, taxi: 250, trip: 2200 }
      },
      solutionNoteJa: 'LW 67,600kg（MLW比 +2,290kg超過）。余剰なタンカリング燃料を3,000kg削減（Block 7,500kg）すれば安全に着陸可能です。',
      solutionNoteVi: 'LW = 67,600 kg (vượt MLW 2,290 kg). Cắt 3,000 kg nhiên liệu tankering thừa (Block Fuel 10,500 → 7,500 kg) để LW = 64,600 kg.',
      solutionNoteEn: 'LW is 67,600 kg (+2,290 kg over MLW). Reduce excess tankered Block Fuel by 3,000 kg (10,500 → 7,500 kg) so LW = 64,600 kg.',
      solutionInput: {
        pax: { A: 50, B: 62, C: 50 },
        holds: { H1: { bag: 900, cargo: 600 }, H3: { bag: 1000, cargo: 700 }, H5: { bag: 300, cargo: 0 } },
        ulds: { '11B': 700, '12B': 600, '31B': 700, '32B': 500, '41B': 0 },
        fuel: { block: 7500, taxi: 250, trip: 2200 }
      }
    },
    {
      id: 'S08',
      aircraft: 'B738',
      titleJa: '08. B737-800 バルク室過積載（直前手荷物集中）',
      titleVi: '08. B737-800 Quá tải hầm Bulk (Hành lý giờ chót)',
      titleEn: '08. B737-800 Bulk Hold Overload (Last-Minute Gate Bags)',
      descJa: '搭乗口預け手荷物や乗継急送手荷物をすべてバルク室に入れたため、バルク上限(1,100kg)を超過しました。',
      descVi: 'Hành lý gate-check và hành lý nối chuyến gấp bị dồn hết vào hầm Bulk làm vượt mức tối đa (1,100 kg) và kéo CG ra sau.',
      descEn: 'Gate-checked and rush transfer bags were all loaded into Bulk Hold H5, exceeding its 1,100 kg structural limit.',
      input: {
        pax: { A: 40, B: 55, C: 45 },
        holds: { H1: { bag: 600, cargo: 400 }, H3: { bag: 800, cargo: 300 }, H5: { bag: 1350, cargo: 300 } },
        ulds: { '11B': 500, '12B': 500, '31B': 600, '32B': 400, '41B': 0 },
        fuel: { block: 8000, taxi: 200, trip: 4200 }
      },
      solutionNoteJa: 'バルク室1,650kg（+550kg超過）。手荷物550kgをH3へ、貨物300kgをH1へ分散してバルクを800kgに抑制。',
      solutionNoteVi: 'Hầm Bulk đang 1,650 kg (vượt 550 kg). Chuyển 550 kg hành lý sang H3 và 300 kg hàng sang H1 để Bulk còn 800 kg.',
      solutionNoteEn: 'Bulk H5 is at 1,650 kg (+550 kg over). Redistribute 550 kg baggage to H3 and 300 kg cargo to H1, reducing H5 to 800 kg.',
      solutionInput: {
        pax: { A: 40, B: 55, C: 45 },
        holds: { H1: { bag: 600, cargo: 700 }, H3: { bag: 1350, cargo: 300 }, H5: { bag: 800, cargo: 0 } },
        ulds: { '11B': 500, '12B': 500, '31B': 600, '32B': 400, '41B': 0 },
        fuel: { block: 8000, taxi: 200, trip: 4200 }
      }
    },
    {
      id: 'S09',
      aircraft: 'A320',
      titleJa: '09. ULDポジション単体上限超過（重量コンテナ誤配置）',
      titleVi: '09. ULD vượt tải trọng đơn lẻ (AKH > 1,588 kg)',
      titleEn: '09. Single ULD Position Overload (AKH 11P > 1,588 kg)',
      descJa: '11PポジションにAKHコンテナ許容重量(1,588kg)を超える2,100kgのコンテナが割り当てられています。2基に分割してください。',
      descVi: 'Vị trí 11P đang xếp container nặng 2,100 kg vượt ngưỡng 1,588 kg của AKH. Hãy chia tải sang vị trí 12P hoặc 31P.',
      descEn: 'Position 11P is assigned a 2,100 kg container exceeding the 1,588 kg AKH position limit. Split load across two positions.',
      input: {
        pax: { A: 40, B: 54, C: 46 },
        holds: { H1: { bag: 500, cargo: 0 }, H3: { bag: 700, cargo: 300 }, H5: { bag: 300, cargo: 0 } },
        ulds: { '11P': 2100, '12P': 400, '31P': 900, '32P': 700, '41P': 0 },
        fuel: { block: 7600, taxi: 200, trip: 4100 }
      },
      solutionNoteJa: '11P(2,100kg)から800kgを12Pへ分割し、11P=1,300kg / 12P=1,200kg とすることでポジション・貨物室上限ともにクリア。',
      solutionNoteVi: 'Chia 800 kg từ 11P sang 12P (11P=1,300 kg, 12P=1,200 kg) để vừa đạt giới hạn vị trí AKH vừa giữ tổng hầm H1 hợp lệ.',
      solutionNoteEn: 'Split 800 kg from 11P into 12P (11P = 1,300 kg, 12P = 1,200 kg), clearing both position and H1 compartment limits.',
      solutionInput: {
        pax: { A: 40, B: 54, C: 46 },
        holds: { H1: { bag: 500, cargo: 0 }, H3: { bag: 700, cargo: 300 }, H5: { bag: 300, cargo: 0 } },
        ulds: { '11P': 1300, '12P': 1200, '31P': 900, '32P': 700, '41P': 0 },
        fuel: { block: 7600, taxi: 200, trip: 4100 }
      }
    },
    {
      id: 'S10',
      aircraft: 'B788',
      titleJa: '10. B787-8 国際線・高貨物搭載（複合制約の最適化）',
      titleVi: '10. B787-8 Quốc tế tải hàng nặng (Tối ưu đa ràng buộc)',
      titleEn: '10. B787-8 International Heavy Cargo (Multi-Constraint Optimization)',
      descJa: '成田発国際線想定。MZFW・MLWと後部貨物室上限が同時に逼迫しています。ULD再配置と貨物調整で全制約をクリアしてください。',
      descVi: 'Chuyến quốc tế khởi hành từ Narita trên B787-8. Đồng thời bị vượt giới hạn hầm sau, MZFW và MLW. Cần điều chỉnh tổng hợp.',
      descEn: 'Long-haul NRT departure simultaneously exceeding MZFW, MLW, and Aft Hold H3 structural limit.',
      input: {
        pax: { A: 38, B: 98, C: 104 },
        holds: { H1: { bag: 2200, cargo: 1500 }, H3: { bag: 2800, cargo: 2200 }, H5: { bag: 1400, cargo: 400 } },
        ulds: { '11L': 2600, '12R': 2800, '21P': 3800, '31L': 3200, '32R': 3100, '41P': 4200 },
        fuel: { block: 62000, taxi: 600, trip: 51000 }
      },
      solutionNoteJa: 'ZFW 168,150kg（+7,130kg超過）・H3 15,500kg（+1,000kg超過）。H3貨物2,200kg、ULD 41P(4,200kg→1,200kg)、21P(3,800kg→1,600kg)を調整してMZFW・MLW・H3すべてPASS。',
      solutionNoteVi: 'Vượt MZFW (+7,130 kg), MLW và H3. Cắt hàng rời H3 (2,200→0), giảm ULD 41P (4,200→1,200) và 21P (3,800→1,600) để tất cả đạt chuẩn an toàn.',
      solutionNoteEn: 'Remove 2,200 kg loose cargo from H3 and reduce pallets 41P (4,200→1,200 kg) and 21P (3,800→1,600 kg) to satisfy MZFW, MLW, and H3 limits.',
      solutionInput: {
        pax: { A: 38, B: 98, C: 104 },
        holds: { H1: { bag: 2200, cargo: 1500 }, H3: { bag: 2800, cargo: 0 }, H5: { bag: 1400, cargo: 400 } },
        ulds: { '11L': 2600, '12R': 2800, '21P': 1600, '31L': 3200, '32R': 3100, '41P': 1200 },
        fuel: { block: 62000, taxi: 600, trip: 51000 }
      }
    },
    {
      id: 'S11',
      aircraft: 'A321',
      titleJa: '11. A321neo 胴体延長機・後方CGテールストライク危険',
      titleVi: '11. A321neo Thân dài — CG lệch sau nguy cơ quệt đuôi (Tail-Strike)',
      titleEn: '11. A321neo Stretched Fuselage — Aft CG Tail-Strike Hazard',
      descJa: '胴体が長いA321neoは離陸時テールストライク角が9.7°と極めて厳しい。後部偏重でCGが後方限界を超過しており、早急な前方移載が必要です。',
      descVi: 'A321neo thân kéo dài có góc quệt đuôi chỉ 9.7°. Tải dồn phía sau làm CG vượt giới hạn hậu, gây nguy cơ Tail-Strike & Tail-Tipping cực cao.',
      descEn: 'The stretched A321neo has a tight 9.7° tail-strike pitch angle. Heavy aft loading exceeds the Aft CG limit — shift load forward.',
      input: {
        pax: { A: 20, B: 60, C: 70 },
        holds: { H1: { bag: 200, cargo: 0 }, H3: { bag: 1100, cargo: 800 }, H5: { bag: 1000, cargo: 300 } },
        ulds: { '11P': 0, '12P': 0, '13P': 0, '31P': 1300, '32P': 1300, '41P': 1100 },
        fuel: { block: 12400, taxi: 300, trip: 7500 }
      },
      solutionNoteJa: '後部ULD(31P/32P/41P)の一部を前部11P/12P/13Pへ移設し、H3貨物・バルクを前部へ分散、Zone Cから30名をZone Aへ再配席して%MACを25.6%の中央へ安定化。',
      solutionNoteVi: 'Chuyển ULD từ sau lên 11P/12P/13P, dời hàng H3/Bulk sang H1 và điều 30 khách từ Zone C lên Zone A để kéo %MAC về 25.6% an toàn.',
      solutionNoteEn: 'Move aft ULDs to forward positions 11P/12P/13P, shift H3/Bulk cargo to H1, and reseat 30 passengers from Zone C to Zone A (~25.6% MAC).',
      solutionInput: {
        pax: { A: 50, B: 60, C: 40 },
        holds: { H1: { bag: 600, cargo: 800 }, H3: { bag: 700, cargo: 0 }, H5: { bag: 400, cargo: 0 } },
        ulds: { '11P': 1300, '12P': 1300, '13P': 600, '31P': 1100, '32P': 900, '41P': 0 },
        fuel: { block: 12400, taxi: 300, trip: 7500 }
      }
    },
    {
      id: 'S12',
      aircraft: 'B77F',
      titleJa: '12. B777F 貨物専用機・メインデッキ後部偏重（尻もち危険）',
      titleVi: '12. B777F Máy bay chở hàng — Quá tải đuôi tầng chính (Tail-Tipping)',
      titleEn: '12. B777F All-Cargo Freighter — Main Deck Aft Tail-Tipping Risk',
      descJa: 'メインデッキ後部（M2）とロワー後部に重量パレットが集中し、駐機中の尻もち（テールティッピング）危険領域に入っています。前後デッキを再配分してください。',
      descVi: 'Tàu bay chở hàng B777F bị dồn pallet nặng ở tầng chính sau (M2) & hầm sau, vượt sâu giới hạn CG hậu — nguy cơ sập đuôi ngay trên sân đỗ!',
      descEn: 'Heavy main-deck pallets concentrated in M2 and lower aft holds place the B777F in critical ground tail-tipping territory.',
      input: {
        pax: { A: 2, B: 0, C: 0 },
        holds: { M1: { bag: 0, cargo: 4000 }, M2: { bag: 0, cargo: 22000 }, H1: { bag: 0, cargo: 1000 }, H3: { bag: 0, cargo: 8000 }, H5: { bag: 0, cargo: 2000 } },
        ulds: { ML1: 3000, ML2: 4000, MR1: 10500, MR2: 11000, '11P': 1500, '31P': 4400 },
        fuel: { block: 68000, taxi: 900, trip: 58000 }
      },
      solutionNoteJa: 'メインデッキ後部の重量パレットとバラ貨物をM1（ML1/ML2）へ移設し、ロワー前後も均等化。原則通り「前部から積み、後部から降ろす」ことで25.4% MACに安定。',
      solutionNoteVi: 'Phân bổ lại pallet PMC tầng chính (ML1/ML2) & hàng M1/M2 cân bằng trước-sau, hạ tải H5 Bulk → đưa %MAC về 25.4% hoàn toàn an toàn.',
      solutionNoteEn: 'Rebalance main-deck pallets/cargo forward into M1 (ML1/ML2) and equalize lower holds (\'Load Forward First\'), stabilizing CG at ~25.4% MAC.',
      solutionInput: {
        pax: { A: 2, B: 0, C: 0 },
        holds: { M1: { bag: 0, cargo: 14000 }, M2: { bag: 0, cargo: 12000 }, H1: { bag: 0, cargo: 4500 }, H3: { bag: 0, cargo: 4500 }, H5: { bag: 0, cargo: 1000 } },
        ulds: { ML1: 9000, ML2: 9500, MR1: 8500, MR2: 7500, '11P': 3500, '31P': 3000 },
        fuel: { block: 68000, taxi: 900, trip: 58000 }
      }
    },
    {
      id: 'S13',
      aircraft: 'DHC8',
      titleJa: '13. Dash 8-Q400 リージョナル機・極端なCG感度（後方逸脱）',
      titleVi: '13. Dash 8-Q400 Máy bay cánh quạt — Độ nhạy CG cực cao',
      titleEn: '13. Dash 8-Q400 Turboprop — High CG Sensitivity (Aft Excursion)',
      descJa: '機体が軽いプロペラ機（Q400）は旅客数名と後部手荷物だけでCGが大きく後方へ動きます。Zone C偏重と後部手荷物を前方へ調整してください。',
      descVi: 'Tàu bay phản lực cánh quạt nhẹ (Q400) có cánh tay đòn nhạy; chỉ cần khách dồn khoang sau + hành lý hầm sau là CG vọt quá 50% MAC!',
      descEn: 'On a light regional turboprop, Zone C passenger clustering plus aft baggage drives CG past 50% MAC!',
      input: {
        pax: { A: 4, B: 18, C: 24 },
        holds: { H1: { bag: 50, cargo: 0 }, H3: { bag: 900, cargo: 450 }, H5: { bag: 250, cargo: 0 } },
        ulds: {},
        fuel: { block: 2600, taxi: 100, trip: 1400 }
      },
      solutionNoteJa: 'Zone Cから16名をZone Aへ移動し、後部手荷物550kgを前部H1へ移載してZFW/TOWとも22% MAC前後の安全圏へ復帰。',
      solutionNoteVi: 'Chuyển 16 khách từ Zone C lên Zone A và chuyển 550 kg hành lý từ H3/H5 lên H1 để kéo %MAC từ 57% về ~22% trong vùng an toàn.',
      solutionNoteEn: 'Reseat 16 passengers from Zone C to Zone A and transfer 550 kg of baggage from H3/H5 forward to H1 (~22% MAC).',
      solutionInput: {
        pax: { A: 20, B: 18, C: 8 },
        holds: { H1: { bag: 600, cargo: 0 }, H3: { bag: 600, cargo: 250 }, H5: { bag: 200, cargo: 0 } },
        ulds: {},
        fuel: { block: 2600, taxi: 100, trip: 1400 }
      }
    },
    {
      id: 'S14',
      aircraft: 'A359',
      titleJa: '14. A350-900 長距離大型機・MZFW/MTOW/MLW三重超過の最適化',
      titleVi: '14. A350-900 Đường dài — Quá tải đồng thời MZFW, MTOW & MLW',
      titleEn: '14. A350-900 Long-Haul — Triple MZFW / MTOW / MLW Exceedance',
      descJa: '満席に近い長距離便で貨物・余剰燃料とも過積載となり、MZFW・MTOW・MLWの3限界をすべて超過。必要滑走路長も逼迫しています。',
      descVi: 'Chuyến đường dài A350-900 bị vượt đồng thời cả 3 giới hạn MZFW, MTOW, MLW và kéo dài cự ly đường băng. Hãy cắt hàng & nhiên liệu thừa cân đối.',
      descEn: 'Near-full long-haul flight overloaded with both cargo and discretionary fuel, breaching MZFW, MTOW, MLW, and runway margin.',
      input: {
        pax: { A: 62, B: 138, C: 148 },
        holds: { H1: { bag: 3600, cargo: 2500 }, H3: { bag: 3800, cargo: 2500 }, H5: { bag: 1500, cargo: 500 } },
        ulds: { '11L': 2800, '12R': 2800, '21P': 4000, '31L': 2800, '32R': 2800, '41P': 3800 },
        fuel: { block: 92000, taxi: 800, trip: 79000 }
      },
      solutionNoteJa: 'バラ貨物5,500kgおよびパレット21P/41Pから5,800kgを削減してZFW 190.6tへ圧縮、さらに余剰燃料3,500kg削減でMTOW・MLW・滑走路長すべてPASS。',
      solutionNoteVi: 'Cắt 5,500 kg hàng rời + giảm 5,800 kg trên pallet 21P/41P (đưa ZFW về 190.6t) và cắt 3,500 kg Extra Fuel (Block 88.5t) để đạt toàn bộ chuẩn.',
      solutionNoteEn: 'Offload 5,500 kg loose cargo + 5,800 kg from pallets 21P/41P (ZFW 190.6 t) and trim 3,500 kg Extra Fuel (Block 88.5 t) to pass all limits.',
      solutionInput: {
        pax: { A: 62, B: 138, C: 148 },
        holds: { H1: { bag: 3600, cargo: 0 }, H3: { bag: 3800, cargo: 0 }, H5: { bag: 1500, cargo: 0 } },
        ulds: { '11L': 2800, '12R': 2800, '21P': 1000, '31L': 2800, '32R': 2800, '41P': 1000 },
        fuel: { block: 88500, taxi: 800, trip: 79000 }
      }
    }
  ];
