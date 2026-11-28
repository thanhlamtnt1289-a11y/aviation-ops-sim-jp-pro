// Realistic 3D ULD Buildup Simulator Game — Pure Trilingual (JA / VI / EN)
// Strictly faithful to JEAE SSW-I & SSW-II Official Textbooks + ANA Dimension Guide (pp. 104–121)
// Supports Pallets (PMC Lower/Main Deck, PLA, PGA 20ft, PAG) & Containers (AKE LD-3, AKH LD-3-46)
// Two authentic handling modes:
//   1. ✋ 手積み (Manual Hand Stacking for light cargo ≤35kg: Heavy-Bottom, Brick Interlock across 2 boxes, Care Marks)
//   2. 🚜 フォークリフト搭載 (Forklift Loading for heavy cargo >35kg: Wooden/Plastic Pallets T11 110×110, ISO 120×100, Euro 120×80, Skid + Spreader Planks 補強板, Tuna Pan, Bike Skid)
import * as THREE from 'three';
import { applySkyEnvironment } from '../three3d/envLighting.js';
import { appState, saveState, updateProgressBadges, t } from '../core/state.js';

// =====================================================================
// 1. EXACT ULD SPECIFICATIONS & 3D CONTOUR PROFILES (CM & KG)
// Coordinate convention inside ULD Simulator (1 unit = 1 meter = 100 cm):
//   X = Length axis (cm: -usableL/2 .. +usableL/2; e.g. 318cm base -> 302cm usable)
//   Z = Width / Depth axis (cm: -usableW/2 .. +usableW/2; e.g. 244cm base -> 228cm usable)
//   Y = Height above ULD deck floor (cm: 0 .. maxH)
// =====================================================================
export const ULD_SIM_SPECS = {
  PMC_LD: {
    id: 'PMC_LD',
    code: 'PMC (Lower Deck)',
    kind: 'pallet',
    baseL: 318, baseW: 244,
    usableL: 302, usableW: 228,
    maxH: 163,
    tareKg: 110,
    maxGrossKg: 5102,
    floorLimitKgM2: 1460,
    dimsLabel: '318×244×163 cm (125×96×64 in)',
    acLabel: 'B777 / B787 / B767ER / A350 Lower Deck',
    noteJa: 'ロアデッキ96×125in主力パレット（最大5,102kg）。下部片側/上部機体曲面のコンター制限（高さ163cm）を厳守。',
    noteVi: 'Mâm Pallet 96×125 in khoang bụng tàu thân rộng (Max 5.102 kg, cao tối đa 163 cm vát theo bụng tàu).',
    noteEn: 'Widebody lower-deck 96×125 in pallet (Max Gross 5,102 kg, 163 cm lower-hold contour).',
    // Max allowed height (cm) at local (xCm, zCm) inside usable footprint; returns <=0 if outside footprint
    contourMaxY(xCm, zCm) {
      if (Math.abs(xCm) > 151 || Math.abs(zCm) > 114) return 0;
      // Lower-deck outboard fuselage curvature tapers above y=114cm along +X/+Z outboard edge
      const outX = Math.max(0, Math.abs(xCm) - 112); // last 39cm tapers from 163 -> 118cm
      return Math.round(163 - (outX / 39) * 45);
    }
  },
  PMC_MD: {
    id: 'PMC_MD',
    code: 'PMC (Main Deck 244cm)',
    kind: 'pallet',
    baseL: 318, baseW: 244,
    usableL: 302, usableW: 228,
    maxH: 244,
    tareKg: 110,
    maxGrossKg: 6803,
    floorLimitKgM2: 1950,
    dimsLabel: '318×244×244 cm (125×96×96 in)',
    acLabel: 'B767F / B777F Freighter Main Deck',
    noteJa: '貨物専用機メインデッキ仕様PMC（最大6,803kg＝15,000lbs、高さ244cm、上部テーパー）。',
    noteVi: 'Pallet PMC xếp khoang chính tàu chở hàng B767F/B777F (Max 6.803 kg, cao 244 cm vát vòm trên).',
    noteEn: 'Freighter Main-Deck PMC profile (Max Gross 6,803 kg / 15,000 lbs, height 244 cm).',
    contourMaxY(xCm, zCm) {
      if (Math.abs(xCm) > 151 || Math.abs(zCm) > 114) return 0;
      const outX = Math.max(0, Math.abs(xCm) - 108);
      return Math.round(244 - (outX / 43) * 56);
    }
  },
  PLA: {
    id: 'PLA',
    code: 'PLA (Half Pallet)',
    kind: 'pallet',
    baseL: 318, baseW: 153,
    usableL: 300, usableW: 139,
    maxH: 163,
    tareKg: 100,
    maxGrossKg: 3175,
    floorLimitKgM2: 1460,
    dimsLabel: '318×153×163 cm (125×60.4×64 in)',
    acLabel: 'B787 / A380 (3,175kg) · B777 (2,449kg)',
    noteJa: 'ハーフ幅（153cm）パレット。幅が狭いため左右の偏荷重と長尺物のタイダウン固縛に特に注意！',
    noteVi: 'Pallet nửa bề rộng (153×318 cm, Max 3.175 kg). Bề ngang hẹp nên cần căn tâm thật chuẩn & chằng đai kỹ!',
    noteEn: 'Half-width 60.4×125 in pallet (Max 3,175 kg). Narrow 139 cm usable width requires careful lateral CG control.',
    contourMaxY(xCm, zCm) {
      if (Math.abs(xCm) > 150 || Math.abs(zCm) > 69.5) return 0;
      const outX = Math.max(0, Math.abs(xCm) - 114);
      return Math.round(163 - (outX / 36) * 42);
    }
  },
  PGA: {
    id: 'PGA',
    code: 'PGA (20-ft Main Deck)',
    kind: 'pallet',
    baseL: 606, baseW: 244,
    usableL: 580, usableW: 228,
    maxH: 299,
    tareKg: 500,
    maxGrossKg: 11339,
    floorLimitKgM2: 1950,
    dimsLabel: '606×244×299 cm (238.5×96×118 in)',
    acLabel: 'B777F / B747F Main Deck (Max 11,339 kg)',
    noteJa: '超大型20フィートパレット（自重500kg・最大11,339kg）。高さ195cmから上部胴体曲面に沿って299cmへ絞るコンター厳守！',
    noteVi: 'Siêu Pallet 20-ft khoang chính tàu hàng (606×244 cm, Max 11.339 kg); từ độ cao 195 cm vát vòm lên đỉnh 299 cm.',
    noteEn: '20-ft freighter pallet (606×244 cm, Tare 500 kg, Max 11,339 kg); tapers from 195 cm wall to 299 cm crown.',
    contourMaxY(xCm, zCm) {
      if (Math.abs(xCm) > 290 || Math.abs(zCm) > 114) return 0;
      // Across width Z (±114cm), fuselage upper arch tapers from Z=±56cm (299cm) down to Z=±114cm (195cm)!
      const outZ = Math.max(0, Math.abs(zCm) - 56);
      return Math.round(299 - (outZ / 58) * 104);
    }
  },
  PAG: {
    id: 'PAG',
    code: 'PAG (88-in Pallet)',
    kind: 'pallet',
    baseL: 318, baseW: 224,
    usableL: 302, usableW: 208,
    maxH: 163,
    tareKg: 100,
    maxGrossKg: 4676,
    floorLimitKgM2: 1460,
    dimsLabel: '318×224×163 cm (125×88×64 in)',
    acLabel: 'B777 / B787 Lower Deck (Max 4,676 kg)',
    noteJa: '標準88×125インチパレット（自重100kg、最大4,676kg）。',
    noteVi: 'Mâm Pallet tiêu chuẩn 88×125 inch (318×224×163 cm, Max Gross 4.676 kg).',
    noteEn: 'Standard 88×125 in lower-deck pallet (318×224×163 cm, Max Gross 4,676 kg).',
    contourMaxY(xCm, zCm) {
      if (Math.abs(xCm) > 151 || Math.abs(zCm) > 104) return 0;
      const outX = Math.max(0, Math.abs(xCm) - 112);
      return Math.round(163 - (outX / 39) * 44);
    }
  },
  AKE: {
    id: 'AKE',
    code: 'AKE (LD-3 Container)',
    kind: 'container',
    baseL: 156, baseW: 153,
    topL: 200,
    usableL: 148, usableW: 140,
    maxH: 158,
    extH: 163,
    tareKg: 71,
    maxGrossKg: 1587,
    floorLimitKgM2: 980,
    dimsLabel: '底156×153 / 上幅200 × 高163 cm (Max 1,587 kg)',
    acLabel: 'B777 / B787 / B767 / A350 Lower Deck',
    noteJa: '標準LD-3コンテナ（自重71kg・最大1,587kg）。手積み中心で隙間なくレンガ積みし、最後にドア「クローズ・アンド・ロック」！',
    noteVi: 'Thùng Container LD-3 phổ biến nhất (Max 1.587 kg). Xếp tay khít thùng theo nguyên tắc Nặng dưới - Nhẹ trên & Khóa cửa bạt!',
    noteEn: 'Standard LD-3 widebody container (Tare 71 kg, Max 1,587 kg). Hand-stack tightly and verify door Close & Lock.',
    contourMaxY(xCm, zCm) {
      if (Math.abs(xCm) > 74 || Math.abs(zCm) > 70) return 0;
      return 158;
    }
  },
  AKH: {
    id: 'AKH',
    code: 'AKH (LD-3-46 A320/321)',
    kind: 'container',
    baseL: 156, baseW: 153,
    topL: 241,
    usableL: 144, usableW: 138,
    maxH: 106,
    extH: 114,
    tareKg: 95,
    maxGrossKg: 1134,
    floorLimitKgM2: 980,
    dimsLabel: '底156×153 / 上幅241 × 低高114 cm (Max 1,134 kg)',
    acLabel: 'A320 (Max 7) / A321 (Max 10) Narrowbody',
    noteJa: 'A320/A321専用の低床コンテナ（外寸高さ114cm・内寸高さ約106cm・最大総重量1,134kg＝2,500lbs）。高さオーバー厳禁！',
    noteVi: 'Thùng Container thấp 114 cm chuyên cho A320/A321 (lọt lòng cao ~106 cm, Max Gross 1.134 kg). Cấm xếp vượt trần!',
    noteEn: 'Low-profile 114 cm container for A320/A321 (usable H 106 cm, Max Gross 1,134 kg / 2,500 lbs). Watch roof height!',
    contourMaxY(xCm, zCm) {
      if (Math.abs(xCm) > 72 || Math.abs(zCm) > 69) return 0;
      return 106;
    }
  }
};

// =====================================================================
// 2. BASE PALLETS, SKIDS & SPREADER PLANKS FOR FORKLIFT LOADING
// =====================================================================
export const BASE_PALLET_CATALOG = {
  NONE: {
    id: 'NONE', lCm: 0, wCm: 0, hCm: 0, wtKg: 0, factor: 1.0,
    ja: 'なし（直置き — ⚠ 重量物は床面強度超過・爪抜き不可）',
    vi: 'Không kê đế (Đặt trực tiếp — ⚠ Quá tải sàn & kẹt càng nâng!)',
    en: 'None (Direct floor placement — ⚠ High floor load & no fork gap!)'
  },
  T11_110: {
    id: 'T11_110', lCm: 110, wCm: 110, hCm: 14, wtKg: 20, factor: 1.35,
    ja: 'JIS T11 標準木製/樹脂パレット (110 × 110 × 14 cm · 20kg)',
    vi: 'Pallet chuẩn Nhật JIS T11 (110 × 110 × 14 cm · 20 kg)',
    en: 'JIS T11 Standard Pallet (110 × 110 × 14 cm · 20 kg)'
  },
  ISO_120x100: {
    id: 'ISO_120x100', lCm: 120, wCm: 100, hCm: 14, wtKg: 22, factor: 1.45,
    ja: '国際輸出パレット (120 × 100 × 14 cm · 22kg)',
    vi: 'Pallet xuất khẩu quốc tế ISO (120 × 100 × 14 cm · 22 kg)',
    en: 'ISO Export Pallet (120 × 100 × 14 cm · 22 kg)'
  },
  EURO_120x80: {
    id: 'EURO_120x80', lCm: 120, wCm: 80, hCm: 14, wtKg: 18, factor: 1.30,
    ja: 'ユーロパレット (120 × 80 × 14 cm · 18kg — PLA等の狭幅向け)',
    vi: 'Euro Pallet (120 × 80 × 14 cm · 18 kg — Hợp mâm hẹp PLA)',
    en: 'Euro Pallet (120 × 80 × 14 cm · 18 kg — Fits narrow PLA)'
  },
  SKID_SPREADER: {
    id: 'SKID_SPREADER', lCm: 150, wCm: 120, hCm: 12, wtKg: 28, factor: 2.10,
    ja: '角材スキッド ＋ 補強板スプレッダー (150 × 120 × 12 cm · 28kg — 大型重量物必須)',
    vi: 'Đế Skid + Ván phân tải 補強板 Spreader (150 × 120 × 12 cm · 28 kg — Chuẩn hàng siêu nặng)',
    en: 'Timber Skid + Spreader Planks (150 × 120 × 12 cm · 28 kg — Heavy Load Shoring)'
  },
  TUNA_PAN: {
    id: 'TUNA_PAN', lCm: 184, wCm: 149, hCm: 15, wtKg: 150, factor: 2.20, waterproofPan: true,
    ja: 'ツナパン / 大型防水パン (184 × 149 × 15 cm · 150kg — 生鮮マグロ・塩水貨物用)',
    vi: 'Khay cá ngừ ツナパン chống rò nước muối (184 × 149 × 15 cm · 150 kg)',
    en: 'Tuna Waterproof Pan (184 × 149 × 15 cm · 150 kg — Saltwater Corrosion Protection)'
  },
  BIKE_SKID: {
    id: 'BIKE_SKID', lCm: 208, wCm: 74, hCm: 14, wtKg: 180, factor: 1.95, bikeSkid: true,
    ja: '専用バイクスキッド (208 × 74 × 14 cm · 180kg — 二輪車固定用)',
    vi: 'Khung đế Mô-tô バイクスキッド (208 × 74 × 14 cm · 180 kg)',
    en: 'Dedicated Motorcycle Skid (208 × 74 × 14 cm · 180 kg)'
  }
};

// =====================================================================
// 3. CARGO TEMPLATES (LIGHT HAND-LOAD vs HEAVY FORKLIFT CARGO)
// =====================================================================
export const CARGO_TEMPLATES = {
  BOX_STD_28: {
    tpl: 'BOX_STD_28', mode: 'hand', lCm: 60, wCm: 50, hCm: 40, wtKg: 28, color: 0xb48246,
    marks: ['THIS_SIDE_UP'],
    ja: '自動車部品カートン (60×50×40cm · 28kg) [天地無用]',
    vi: 'Thùng phụ tùng ô tô (60×50×40 cm · 28 kg) [天地無用 Đúng chiều]',
    en: 'Auto Parts Carton (60×50×40 cm · 28 kg) [This Side Up]'
  },
  BOX_APPAREL_14: {
    tpl: 'BOX_APPAREL_14', mode: 'hand', lCm: 60, wCm: 50, hCm: 36, wtKg: 14, color: 0xd6a86e,
    marks: ['KEEP_DRY'],
    ja: 'アパレル衣料箱 (60×50×36cm · 14kg) [水濡れ厳禁]',
    vi: 'Thùng hàng may mặc nhẹ (60×50×36 cm · 14 kg) [水濡れ厳禁 Chống ướt]',
    en: 'Apparel Carton (60×50×36 cm · 14 kg) [Keep Dry]'
  },
  BOX_PHARMA_18: {
    tpl: 'BOX_PHARMA_18', mode: 'hand', lCm: 50, wCm: 45, hCm: 34, wtKg: 18, color: 0xe2e8f0,
    marks: ['THIS_SIDE_UP', 'KEEP_DRY', 'STACK_MAX_2'],
    ja: '医薬品保冷箱 (50×45×34cm · 18kg) [天地無用・水濡れ厳禁]',
    vi: 'Thùng dược phẩm (50×45×34 cm · 18 kg) [天地無用 · Cấm ướt]',
    en: 'Medical Box (50×45×34 cm · 18 kg) [This Side Up · Keep Dry]'
  },
  BOX_FRAGILE_10: {
    tpl: 'BOX_FRAGILE_10', mode: 'hand', lCm: 56, wCm: 46, hCm: 32, wtKg: 10, color: 0xfef3c7,
    marks: ['FRAGILE', 'THIS_SIDE_UP', 'SHOCKWATCH'],
    ja: '精密光学レンズ (56×46×32cm · 10kg) [こわれもの・ショックウォッチ]',
    vi: 'Thấu kính quang học (56×46×32 cm · 10 kg) [Dễ vỡ · ShockWatch — Xếp trên cùng!]',
    en: 'Precision Optics (56×46×32 cm · 10 kg) [Fragile · ShockWatch — Top Tier Only!]'
  },
  BOX_SEAFOOD_20: {
    tpl: 'BOX_SEAFOOD_20', mode: 'hand', lCm: 60, wCm: 45, hCm: 32, wtKg: 20, color: 0xbae6fd,
    marks: ['WET', 'THIS_SIDE_UP'],
    ja: '鮮魚発泡スチロール箱 (60×45×32cm · 20kg) [水濡れ・塩水注意]',
    vi: 'Thùng xốp hải sản tươi (60×45×32 cm · 20 kg) [Hàng ướt WET — Cần bọc chống thấm]',
    en: 'Fresh Seafood Styrofoam (60×45×32 cm · 20 kg) [Wet Cargo — Waterproofing Req.]'
  },
  BAG_SUITCASE_23: {
    tpl: 'BAG_SUITCASE_23', mode: 'hand', lCm: 72, wCm: 48, hCm: 30, wtKg: 23, color: 0x38bdf8,
    marks: [],
    ja: '大型スーツケース手荷物 (72×48×30cm · 23kg)',
    vi: 'Vali hành lý ký gửi cỡ lớn (72×48×30 cm · 23 kg)',
    en: 'Checked Hard Suitcase (72×48×30 cm · 23 kg)'
  },
  BAG_PRIO_15: {
    tpl: 'BAG_PRIO_15', mode: 'hand', lCm: 58, wCm: 42, hCm: 26, wtKg: 15, color: 0xf97316,
    marks: ['FRAGILE'],
    ja: 'プライオリティ手荷物・楽器 (58×42×26cm · 15kg) [取扱注意]',
    vi: 'Hành lý Priority / Nhạc cụ dễ vỡ (58×42×26 cm · 15 kg) [Xếp tầng trên]',
    en: 'Priority Fragile Bag (58×42×26 cm · 15 kg) [Fragile Top Layer]'
  },
  HEAVY_CNC_680: {
    tpl: 'HEAVY_CNC_680', mode: 'forklift', lCm: 104, wCm: 96, hCm: 88, wtKg: 680, color: 0x92400e,
    marks: ['HEAVY', 'THIS_SIDE_UP'],
    recPallets: ['T11_110', 'ISO_120x100', 'SKID_SPREADER'],
    ja: '工作機械スピンドル木枠 (104×96×88cm · 680kg) [重量物 HEA・要パレット/補強板]',
    vi: 'Kiện gỗ máy CNC nặng (104×96×88 cm · 680 kg) [HEA — Bắt buộc Forklift + Pallet/Spreader]',
    en: 'CNC Spindle Wooden Crate (104×96×88 cm · 680 kg) [HEA — Forklift + Pallet/Spreader]'
  },
  HEAVY_SEMI_820: {
    tpl: 'HEAVY_SEMI_820', mode: 'forklift', lCm: 112, wCm: 102, hCm: 104, wtKg: 820, color: 0x64748b,
    marks: ['HEAVY', 'FRAGILE', 'THIS_SIDE_UP', 'SHOCKWATCH'],
    recPallets: ['SKID_SPREADER', 'ISO_120x100'],
    ja: '半導体露光ユニット (112×102×104cm · 820kg) [重量精密機器・上積み厳禁・要補強板]',
    vi: 'Máy quang khắc bán dẫn (112×102×104 cm · 820 kg) [ShockWatch · Cấm chồng lên · Cần Spreader]',
    en: 'Semiconductor Litho Unit (112×102×104 cm · 820 kg) [ShockWatch · No Top-Load · Spreader Req.]'
  },
  HEAVY_ENGINE_1180: {
    tpl: 'HEAVY_ENGINE_1180', mode: 'forklift', lCm: 140, wCm: 110, hCm: 96, wtKg: 1180, color: 0x475569,
    marks: ['HEAVY', 'THIS_SIDE_UP'],
    recPallets: ['SKID_SPREADER'],
    ja: '産業タービン部品 (140×110×96cm · 1,180kg) [超重量物・角材スキッド＋補強板必須]',
    vi: 'Cụm tua-bin công nghiệp (140×110×96 cm · 1.180 kg) [Siêu nặng — Bắt buộc Skid + 補強板 Spreader]',
    en: 'Turbine Assembly (140×110×96 cm · 1,180 kg) [Heavy — Mandatory Skid + Spreader Planks]'
  },
  HEAVY_EV_480: {
    tpl: 'HEAVY_EV_480', mode: 'forklift', lCm: 112, wCm: 74, hCm: 68, wtKg: 260, color: 0x0f766e,
    marks: ['HEAVY', 'THIS_SIDE_UP'],
    recPallets: ['EURO_120x80', 'ISO_120x100', 'T11_110', 'SKID_SPREADER'],
    ja: 'EV駆動モーターモジュール (112×74×68cm · 260kg) [重量物・ユーロパレット適合]',
    vi: 'Mô-đun động cơ EV (112×74×68 cm · 260 kg) [Hàng nặng — Vừa đẹp Euro Pallet 120×80]',
    en: 'EV Drive Motor Crate (112×74×68 cm · 260 kg) [Heavy — Fits Euro Pallet 120×80]'
  },
  HEAVY_TUNA_380: {
    tpl: 'HEAVY_TUNA_380', mode: 'forklift', lCm: 172, wCm: 132, hCm: 56, wtKg: 380, color: 0x0284c7,
    marks: ['HEAVY', 'WET', 'THIS_SIDE_UP'],
    recPallets: ['TUNA_PAN'],
    ja: '生鮮本マグロ氷詰大型箱 (172×132×56cm · 380kg) [塩水漏洩防止：ツナパン必須！]',
    vi: 'Kiện cá ngừ đại dương ướp đá (172×132×56 cm · 380 kg) [Nước muối — Bắt buộc kê ツナパン!]',
    en: 'Fresh Bluefin Tuna Iced Coffin (172×132×56 cm · 380 kg) [Mandatory Tuna Waterproof Pan!]'
  },
  HEAVY_BIKE_260: {
    tpl: 'HEAVY_BIKE_260', mode: 'forklift', lCm: 204, wCm: 68, hCm: 110, wtKg: 260, color: 0xdc2626,
    marks: ['HEAVY', 'THIS_SIDE_UP', 'FRAGILE'],
    recPallets: ['BIKE_SKID'],
    ja: '輸出用大型オートバイ (204×68×110cm · 260kg) [専用バイクスキッド＋タイダウン必須]',
    vi: 'Mô-tô phân khối lớn xuất khẩu (204×68×110 cm · 260 kg) [Bắt buộc kê バイクスキッド + Tie-down]',
    en: 'Export Sport Motorcycle (204×68×110 cm · 260 kg) [Mandatory Bike Skid + Tie-Down]'
  }
};

// =====================================================================
// 4. 5 GRADED MISSIONS + FREE SANDBOX
// =====================================================================
export const ULD_MISSIONS = [
  {
    id: 'ULD_M1',
    uldId: 'PMC_LD',
    titleJa: '課題1: PMCロアデッキ混載（フォークリフト重量物＋手積みレンガ積み）',
    titleVi: 'Bài 1: Đóng mâm PMC Lower Deck hỗn hợp (Xe nâng hàng nặng + Xếp tay gối gạch)',
    titleEn: 'Mission 1: PMC Lower-Deck Mixed Build (Forklift Heavy Crate + Hand Brick-Stack)',
    briefJa: '① フォークリフトで680kg機械木枠に「スキッド＋補強板」または「T11パレット」を敷いてパレット中央付近に搭載（偏荷重防止！） → ② 手積みモードで重い部品箱を下段、衣料・精密箱を上段に「2つの箱にまたがるレンガ積み」で配置 → ③ 防水シート・タイダウン・ネット掛けを実施！',
    briefVi: '① Chọn chế độ Xe nâng Forklift + kê Skid+補強板 (hoặc Pallet T11) đặt kiện máy CNC 680kg gần TÂM mâm (tránh 偏荷重!) → ② Đổi sang Xếp tay (手積み): xếp thùng nặng 28kg ở dưới, thùng nhẹ 14kg & kính dễ vỡ 10kg gối lên 2 thùng dưới (レンガ積み) → ③ Bọc bạt chống nước, chằng dây Tie-down & phủ lưới!',
    briefEn: '① Use Forklift + Skid+Spreader (or T11 Pallet) to load the 680 kg CNC crate near pallet CENTER → ② Switch to Hand Mode: place 28 kg cartons on bottom, interlock 14 kg & 10 kg Fragile cartons across 2 lower boxes → ③ Apply waterproof sheet, tie-down straps & cargo net!',
    manifest: [
      { id: 'm1_c1', tpl: 'HEAVY_CNC_680', ideal: { xCm: -8, zCm: 0, rot90: false, palletId: 'SKID_SPREADER' } },
      { id: 'm1_c2', tpl: 'BOX_STD_28', ideal: { xCm: 102, zCm: -52, rot90: false, palletId: 'NONE' } },
      { id: 'm1_c3', tpl: 'BOX_STD_28', ideal: { xCm: 102, zCm: 0, rot90: false, palletId: 'NONE' } },
      { id: 'm1_c4', tpl: 'BOX_STD_28', ideal: { xCm: 102, zCm: 52, rot90: false, palletId: 'NONE' } },
      { id: 'm1_c5', tpl: 'BOX_APPAREL_14', ideal: { xCm: 102, zCm: -26, rot90: false, palletId: 'NONE' } },
      { id: 'm1_c6', tpl: 'BOX_PHARMA_18', ideal: { xCm: 102, zCm: 28, rot90: false, palletId: 'NONE' } },
      { id: 'm1_c7', tpl: 'BOX_FRAGILE_10', ideal: { xCm: 102, zCm: 0, rot90: false, palletId: 'NONE' } }
    ],
    idealFinish: { waterproof: true, tiedown: true, netOrDoor: true }
  },
  {
    id: 'ULD_M2',
    uldId: 'AKE',
    titleJa: '課題2: AKE（LD-3コンテナ）手積みビルドアップ ＆ クローズ・アンド・ロック',
    titleVi: 'Bài 2: Đóng thùng AKE (LD-3) xếp tay chống móp vỡ & Khóa cửa Container',
    titleEn: 'Mission 2: AKE (LD-3 Container) Hand Stacking & Door Close-and-Lock',
    briefJa: 'B787搭載用AKE（最大1,587kg）。重いスーツケース・部品箱を1段目、軽い衣料・優先手荷物・精密機器を上段へレンガ積みし、最後にコンテナ扉を「クローズ・アンド・ロック」してください。',
    briefVi: 'Thùng AKE cho tàu B787 (Max 1.587 kg). Xếp tay vali 23kg & thùng 28kg ở đáy, hàng nhẹ & dễ vỡ ở tầng trên gối qua 2 kiện dưới, không vượt khung rồi bấm Đóng & Khóa cửa Container!',
    briefEn: 'Build an AKE LD-3 container for B787: heavy suitcases/boxes on the floor, light & fragile items interlocked on upper tiers, then Close & Lock the container door.',
    manifest: [
      { id: 'm2_c1', tpl: 'BAG_SUITCASE_23', ideal: { xCm: -36, zCm: -30, rot90: false, palletId: 'NONE' } },
      { id: 'm2_c2', tpl: 'BAG_SUITCASE_23', ideal: { xCm: 36, zCm: -30, rot90: false, palletId: 'NONE' } },
      { id: 'm2_c3', tpl: 'BOX_STD_28', ideal: { xCm: -32, zCm: 30, rot90: false, palletId: 'NONE' } },
      { id: 'm2_c4', tpl: 'BOX_STD_28', ideal: { xCm: 32, zCm: 30, rot90: false, palletId: 'NONE' } },
      { id: 'm2_c5', tpl: 'BOX_APPAREL_14', ideal: { xCm: 0, zCm: 30, rot90: false, palletId: 'NONE' } },
      { id: 'm2_c6', tpl: 'BAG_PRIO_15', ideal: { xCm: 0, zCm: -30, rot90: false, palletId: 'NONE' } },
      { id: 'm2_c7', tpl: 'BOX_FRAGILE_10', ideal: { xCm: 0, zCm: 30, rot90: false, palletId: 'NONE' } }
    ],
    idealFinish: { waterproof: false, tiedown: false, netOrDoor: true }
  },
  {
    id: 'ULD_M3',
    uldId: 'AKH',
    titleJa: '課題3: AKH（A320/321 低床114cmコンテナ）高さ制限＆天地無用チャレンジ',
    titleVi: 'Bài 3: Đóng thùng thấp AKH (A320/321 cao 114cm · Max 1.134kg)',
    titleEn: 'Mission 3: AKH Low-Profile (114 cm / 1,134 kg) Height & Care-Mark Challenge',
    briefJa: 'A320専用AKHは内寸高さ約106cm（外寸114cm）！3段積みすると天井コンターを突き抜けます。2段以内で重下軽上・レンガ積みを完成させ、ドアロックしてください。',
    briefVi: 'Thùng AKH của A320/A321 chỉ cao 114 cm (lọt lòng ~106 cm, Max 1.134 kg)! Nếu chồng 3 tầng sẽ đụng trần vượt Contour ngay. Hãy dàn đều trong 2 tầng và khóa cửa thùng!',
    briefEn: 'A320 AKH has only 106 cm usable internal height (114 cm external)! Keep stacks to 2 tiers max with zero roof overhang and lock the door.',
    manifest: [
      { id: 'm3_c1', tpl: 'BOX_STD_28', ideal: { xCm: -32, zCm: -28, rot90: false, palletId: 'NONE' } },
      { id: 'm3_c2', tpl: 'BOX_STD_28', ideal: { xCm: 32, zCm: -28, rot90: false, palletId: 'NONE' } },
      { id: 'm3_c3', tpl: 'BOX_SEAFOOD_20', ideal: { xCm: -32, zCm: 28, rot90: false, palletId: 'NONE' } },
      { id: 'm3_c4', tpl: 'BOX_PHARMA_18', ideal: { xCm: 28, zCm: 28, rot90: false, palletId: 'NONE' } },
      { id: 'm3_c5', tpl: 'BOX_APPAREL_14', ideal: { xCm: 0, zCm: -28, rot90: false, palletId: 'NONE' } },
      { id: 'm3_c6', tpl: 'BOX_FRAGILE_10', ideal: { xCm: -2, zCm: 28, rot90: false, palletId: 'NONE' } }
    ],
    idealFinish: { waterproof: true, tiedown: false, netOrDoor: true }
  },
  {
    id: 'ULD_M4',
    uldId: 'PLA',
    titleJa: '課題4: PLAハーフパレット（輸出バイクスキッド ＋ EVモジュール搭載）',
    titleVi: 'Bài 4: Đóng mâm hẹp PLA (153×318cm) — Mô-tô xuất khẩu + Động cơ EV bằng Forklift',
    titleEn: 'Mission 4: PLA Half-Width Pallet — Motorcycle Skid & EV Module Forklift Load',
    briefJa: '有効幅わずか139cmのPLA（最大3,175kg）へ、二輪車（専用バイクスキッド必須）と260kg EVモーター（ユーロパレット120×80cm・90°回転推奨）をフォークリフトでバランス良く搭載し、タイダウン＋ネット掛け！',
    briefVi: 'Mâm PLA chỉ rộng 139 cm lọt lòng! Hãy dùng Forklift kê đúng Khung バイクスキッド cho chiếc Mô-tô 260kg và Euro Pallet (120×80 cm xoay 90°) cho động cơ EV 260kg, căn cân bằng tâm rồi chằng đai Tie-down + Lưới!',
    briefEn: 'Load the 260 kg Motorcycle (on Bike Skid) and 260 kg EV Motor (on 120×80 cm Euro Pallet rotated 90°) onto the narrow PLA half-pallet via Forklift, balance CG, and apply tie-downs + net!',
    manifest: [
      { id: 'm4_c1', tpl: 'HEAVY_BIKE_260', ideal: { xCm: -38, zCm: 0, rot90: false, palletId: 'BIKE_SKID' } },
      { id: 'm4_c2', tpl: 'HEAVY_EV_480', ideal: { xCm: 108, zCm: 0, rot90: true, palletId: 'EURO_120x80' } }
    ],
    idealFinish: { waterproof: false, tiedown: true, netOrDoor: true }
  },
  {
    id: 'ULD_M5',
    uldId: 'PGA',
    titleJa: '課題5: PGA 20フィート大型メインデッキ（超重量タービン中央配置・マグロ・精密装置）',
    titleVi: 'Bài 5: Siêu Pallet 20-ft PGA (606×244×299cm · B777F Main Deck 11.339kg)',
    titleEn: 'Mission 5: PGA 20-ft Freighter Main-Deck Heavy Shoring & Tuna Pan Build',
    briefJa: '全長606cmのPGAへ、最重量1,180kgタービンを中央（スキッド＋補強板）、820kg半導体装置を左（スキッド＋補強板）、380kg生鮮本マグロを右（ツナパン必須！）にフォークリフト配置し、防水・タイダウン・ネットを完了せよ！',
    briefVi: 'Trên siêu mâm PGA dài 6,06 m của B777F: đặt Tua-bin nặng nhất 1.180kg (Skid+補強板) ở GIỮA mâm, Máy bán dẫn 820kg bên trái, Cá ngừ 380kg (kê khay ツナパン) bên phải, xếp thêm kiện phụ tùng, bọc chống nước, chằng đai & phủ lưới!',
    briefEn: 'On the 606 cm B777F PGA pallet: place heaviest 1,180 kg Turbine at CENTER (Skid+Spreader), 820 kg Litho unit left, 380 kg Bluefin Tuna right (Tuna Pan!), add cartons, waterproof, strap & net!',
    manifest: [
      { id: 'm5_c1', tpl: 'HEAVY_ENGINE_1180', ideal: { xCm: 0, zCm: 0, rot90: false, palletId: 'SKID_SPREADER' } },
      { id: 'm5_c2', tpl: 'HEAVY_SEMI_820', ideal: { xCm: -165, zCm: 0, rot90: false, palletId: 'SKID_SPREADER' } },
      { id: 'm5_c3', tpl: 'HEAVY_TUNA_380', ideal: { xCm: 175, zCm: 0, rot90: false, palletId: 'TUNA_PAN' } },
      { id: 'm5_c4', tpl: 'BOX_STD_28', ideal: { xCm: 0, zCm: -26, rot90: false, palletId: 'NONE' } },
      { id: 'm5_c5', tpl: 'BOX_STD_28', ideal: { xCm: 0, zCm: 26, rot90: false, palletId: 'NONE' } },
      { id: 'm5_c6', tpl: 'BOX_FRAGILE_10', ideal: { xCm: 0, zCm: 0, rot90: false, palletId: 'NONE' } }
    ],
    idealFinish: { waterproof: true, tiedown: true, netOrDoor: true }
  }
];

// =====================================================================
// 5. ULD BUILDUP PHYSICS, STACKING & JEAE TEXTBOOK GRADING ENGINE
// =====================================================================
export const uldSimState = {
  missionId: 'ULD_M1', // or 'FREE'
  uldId: 'PMC_LD',
  handlingMode: 'forklift', // 'hand' | 'forklift'
  selectedPalletId: 'SKID_SPREADER',
  selectedQueueId: 'm1_c1',
  freeTpl: 'HEAVY_CNC_680',
  rot90: false,
  invertTest: false, // test violating 天地無用 to educate student!
  cursorXCm: 0,
  cursorZCm: 0,
  showContour: true,
  waterproof: false,
  tiedown: false,
  netOrDoor: false,
  queue: [],       // { id, tpl, placed }
  placedItems: [], // { uid, queueId, tpl, xCm, yBottomCm, zCm, lCm, wCm, hCm, cargoLCm, cargoWCm, cargoHCm, palletId, palletHCm, wtKg, totalWtKg, inverted, modeUsed }
  lastAlert: null, // { type: 'ok'|'warn'|'danger', msgJa, msgVi, msgEn }
  gradeReport: null
};

let freeCounter = 1;

export function initUldMission(missionId = 'ULD_M1') {
  uldSimState.missionId = missionId;
  uldSimState.placedItems = [];
  uldSimState.waterproof = false;
  uldSimState.tiedown = false;
  uldSimState.netOrDoor = false;
  uldSimState.invertTest = false;
  uldSimState.rot90 = false;
  uldSimState.cursorXCm = 0;
  uldSimState.cursorZCm = 0;
  uldSimState.gradeReport = null;
  uldSimState.lastAlert = null;

  if (missionId === 'FREE') {
    const uld = ULD_SIM_SPECS[uldSimState.uldId] || ULD_SIM_SPECS.PMC_LD;
    uldSimState.uldId = uld.id;
    uldSimState.queue = [];
    uldSimState.selectedQueueId = null;
    uldSimState.handlingMode = uld.kind === 'container' ? 'hand' : 'forklift';
    uldSimState.selectedPalletId = uld.kind === 'container' ? 'NONE' : 'T11_110';
  } else {
    const m = ULD_MISSIONS.find(x => x.id === missionId) || ULD_MISSIONS[0];
    uldSimState.uldId = m.uldId;
    uldSimState.queue = m.manifest.map(it => ({ ...it, placed: false }));
    const first = uldSimState.queue[0];
    uldSimState.selectedQueueId = first ? first.id : null;
    if (first) {
      const cTpl = CARGO_TEMPLATES[first.tpl];
      uldSimState.handlingMode = cTpl.mode;
      uldSimState.selectedPalletId = cTpl.mode === 'forklift'
        ? (cTpl.recPallets?.[0] || 'T11_110')
        : 'NONE';
    }
  }
}

initUldMission('ULD_M1');

export function computeFootprintDims(tplId, palletId, rot90, inverted) {
  const c = CARGO_TEMPLATES[tplId] || CARGO_TEMPLATES.BOX_STD_28;
  const pal = BASE_PALLET_CATALOG[palletId] || BASE_PALLET_CATALOG.NONE;
  let cL = c.lCm, cW = c.wCm, cH = c.hCm;
  if (inverted) {
    // Laying box on its side swaps height with width!
    const tmp = cH;
    cH = cW;
    cW = tmp;
  }
  if (rot90) {
    const tmp = cL;
    cL = cW;
    cW = tmp;
  }
  let pL = pal.lCm, pW = pal.wCm;
  if (rot90 && pL > 0) {
    const tmp = pL;
    pL = pW;
    pW = tmp;
  }
  const footL = Math.max(cL, pL);
  const footW = Math.max(cW, pW);
  const totalH = cH + pal.hCm;
  const totalWt = c.wtKg + pal.wtKg;
  return {
    cargoLCm: cL, cargoWCm: cW, cargoHCm: cH,
    palletLCm: pL, palletWCm: pW, palletHCm: pal.hCm,
    lCm: footL, wCm: footW, hCm: totalH,
    wtKg: c.wtKg, palletWtKg: pal.wtKg, totalWtKg: totalWt
  };
}

function rectsOverlap(ax, az, aL, aW, bx, bz, bL, bW, shrinkCm = 0.8) {
  return (
    Math.abs(ax - bx) < (aL + bL) * 0.5 - shrinkCm &&
    Math.abs(az - bz) < (aW + bW) * 0.5 - shrinkCm
  );
}

function overlapAreaCm2(ax, az, aL, aW, bx, bz, bL, bW) {
  const ox = Math.max(0, Math.min(ax + aL * 0.5, bx + bL * 0.5) - Math.max(ax - aL * 0.5, bx - bL * 0.5));
  const oz = Math.max(0, Math.min(az + aW * 0.5, bz + bW * 0.5) - Math.max(az - aW * 0.5, bz - bW * 0.5));
  return ox * oz;
}

export function computeStackBaseY(xCm, zCm, lCm, wCm, placedItems) {
  let yBase = 0;
  for (const it of placedItems) {
    if (rectsOverlap(xCm, zCm, lCm, wCm, it.xCm, it.zCm, it.lCm, it.wCm, 1.0)) {
      yBase = Math.max(yBase, it.yBottomCm + it.hCm);
    }
  }
  return yBase;
}

export function checkItemContourOverhang(uld, item) {
  const x0 = item.xCm - item.lCm * 0.5;
  const x1 = item.xCm + item.lCm * 0.5;
  const z0 = item.zCm - item.wCm * 0.5;
  const z1 = item.zCm + item.wCm * 0.5;
  const topY = item.yBottomCm + item.hCm;
  const pts = [
    [x0, z0], [x1, z0], [x0, z1], [x1, z1],
    [item.xCm, z0], [item.xCm, z1], [x0, item.zCm], [x1, item.zCm]
  ];
  for (const [px, pz] of pts) {
    const allowedY = uld.contourMaxY(px, pz);
    if (allowedY <= 0 || topY > allowedY + 0.5) {
      return { overhang: true, allowedY, topY };
    }
  }
  return { overhang: false, allowedY: uld.maxH, topY };
}

export function analyzeUldBuild(state = uldSimState) {
  const uld = ULD_SIM_SPECS[state.uldId] || ULD_SIM_SPECS.PMC_LD;
  const items = state.placedItems;
  let cargoNetKg = 0;
  let palletAuxKg = 0;
  let momentX = 0;
  let momentZ = 0;
  let usedVolCm3 = 0;
  let maxPeakFloorKgM2 = 0;
  let overhangCount = 0;
  let careViolations = [];
  let brickPairs = 0;
  let floatingWarnings = 0;
  let heavyWithoutSpreader = 0;
  let wetCargoPresent = false;
  let heavyCargoPresent = false;

  for (const it of items) {
    const tpl = CARGO_TEMPLATES[it.tpl];
    const pal = BASE_PALLET_CATALOG[it.palletId] || BASE_PALLET_CATALOG.NONE;
    cargoNetKg += it.wtKg;
    palletAuxKg += it.palletWtKg;
    momentX += it.totalWtKg * it.xCm;
    momentZ += it.totalWtKg * it.zCm;
    usedVolCm3 += it.cargoLCm * it.cargoWCm * it.cargoHCm;

    if (tpl.marks.includes('WET') || tpl.marks.includes('KEEP_DRY')) wetCargoPresent = true;
    if (it.wtKg >= 150) heavyCargoPresent = true;

    // 1. Contour check
    const cCheck = checkItemContourOverhang(uld, it);
    if (cCheck.overhang) overhangCount++;

    // 2. Floor contact pressure (kg/m²) for bottom-tier items
    if (it.yBottomCm === 0) {
      const areaM2 = Math.max(0.05, (it.lCm * it.wCm) / 10000);
      const effPressure = (it.totalWtKg / areaM2) / (pal.factor || 1.0);
      maxPeakFloorKgM2 = Math.max(maxPeakFloorKgM2, Math.round(effPressure));
      if (it.wtKg >= 200 && it.palletId === 'NONE') {
        heavyWithoutSpreader++;
      }
      if (it.tpl === 'HEAVY_TUNA_380' && !pal.waterproofPan) {
        careViolations.push({
          ja: '生鮮マグロ重量箱に「ツナパン（防水パン）」が使用されていません（塩水腐食リスク）',
          vi: 'Kiện cá ngừ 380 kg chưa kê khay chống thấm ツナパン (nguy cơ rò nước muối ăn mòn tàu bay!)',
          en: 'Fresh Bluefin Tuna crate lacks a Tuna Waterproof Pan (saltwater corrosion hazard!)'
        });
      }
      if (it.tpl === 'HEAVY_BIKE_260' && !pal.bikeSkid) {
        careViolations.push({
          ja: 'オートバイに専用「バイクスキッド」が使用されていません（転倒リスク）',
          vi: 'Mô-tô xuất khẩu chưa kê khung đế chuyên dụng バイクスキッド!',
          en: 'Motorcycle is not mounted on a dedicated Bike Skid!'
        });
      }
    }

    // 3. This Side Up (天地無用) check
    if (it.inverted && tpl.marks.includes('THIS_SIDE_UP')) {
      careViolations.push({
        ja: `「天地無用」違反: ${tpl.ja.split(' ')[0]} が横倒しになっています！`,
        vi: `Vi phạm nhãn 天地無用: ${tpl.vi.split(' (')[0]} đang bị đặt nằm ngang/lật chiều!`,
        en: `This-Side-Up violation: ${tpl.en.split(' (')[0]} is laid on its side!`
      });
    }

    // 4. Upper-tier support, Heavy-Bottom/Light-Top (重下軽上), Fragile crush, & Interlocking Brick Stack (レンガ積み)
    if (it.yBottomCm > 0) {
      const supporters = items.filter(low =>
        Math.abs((low.yBottomCm + low.hCm) - it.yBottomCm) <= 2.5 &&
        overlapAreaCm2(it.xCm, it.zCm, it.lCm, it.wCm, low.xCm, low.zCm, low.lCm, low.wCm) > 45
      );
      const supportedArea = supporters.reduce((s, low) =>
        s + overlapAreaCm2(it.xCm, it.zCm, it.lCm, it.wCm, low.xCm, low.zCm, low.lCm, low.wCm), 0
      );
      const selfArea = it.lCm * it.wCm;
      if (supportedArea < selfArea * 0.62) {
        floatingWarnings++;
      }
      if (supporters.length >= 2) {
        brickPairs++;
      }
      for (const low of supporters) {
        const lowTpl = CARGO_TEMPLATES[low.tpl];
        if (lowTpl.marks.includes('FRAGILE') || lowTpl.marks.includes('SHOCKWATCH')) {
          careViolations.push({
            ja: `「こわれもの / ショックウォッチ」破損危険: ${lowTpl.ja.split(' ')[0]} の上に貨物を積んでいます！`,
            vi: `Nguy cơ móp vỡ hàng Dễ vỡ / ShockWatch: Đang chất hàng đè lên ${lowTpl.vi.split(' (')[0]}!`,
            en: `Fragile / ShockWatch crush hazard: Cargo stacked on top of ${lowTpl.en.split(' (')[0]}!`
          });
        }
        if (it.totalWtKg > low.totalWtKg + 4) {
          careViolations.push({
            ja: `「重下軽上」違反: 軽い箱（${low.wtKg}kg）の上に重い貨物（${it.wtKg}kg）が載っています！`,
            vi: `Ngược quy tắc Nặng dưới - Nhẹ trên (重下軽上): Kiện ${it.wtKg}kg đang đè lên kiện nhẹ ${low.wtKg}kg!`,
            en: `Heavy-on-Top violation: ${it.wtKg} kg item placed on top of lighter ${low.wtKg} kg package!`
          });
        }
      }
    }
  }

  const payloadKg = cargoNetKg + palletAuxKg;
  const grossKg = uld.tareKg + payloadKg;
  const cgXCm = payloadKg > 0 ? momentX / payloadKg : 0;
  const cgZCm = payloadKg > 0 ? momentZ / payloadKg : 0;
  const eccXPct = Math.round((Math.abs(cgXCm) / (uld.usableL * 0.5)) * 100);
  const eccZPct = Math.round((Math.abs(cgZCm) / (uld.usableW * 0.5)) * 100);
  const maxEccPct = items.length > 0 ? Math.max(eccXPct, eccZPct) : 0;
  const uldMaxVolCm3 = uld.usableL * uld.usableW * uld.maxH * 0.86;
  const volPct = Math.min(100, Math.round((usedVolCm3 / Math.max(1, uldMaxVolCm3)) * 100));

  // Compute 0–100 Textbook Grade
  let score = 100;
  const deductions = [];
  const unplacedCount = state.missionId !== 'FREE' ? state.queue.filter(q => !q.placed).length : 0;
  if (items.length === 0) {
    score = 0;
    deductions.push({ ja: '貨物がまだ搭載されていません', vi: 'Chưa xếp kiện hàng nào lên ULD', en: 'No cargo items placed on ULD yet' });
  }
  if (unplacedCount > 0) {
    score -= unplacedCount * 12;
    deductions.push({
      ja: `未搭載の貨物が ${unplacedCount} 個残っています (-${unplacedCount * 12}pt)`,
      vi: `Còn ${unplacedCount} kiện hàng trong danh sách chưa xếp lên ULD (-${unplacedCount * 12}đ)`,
      en: `${unplacedCount} manifest items still unplaced (-${unplacedCount * 12}pt)`
    });
  }
  if (grossKg > uld.maxGrossKg) {
    score -= 30;
    deductions.push({
      ja: `最大総重量超過: ${grossKg}kg > 上限 ${uld.maxGrossKg}kg (-30pt)`,
      vi: `Vượt trọng lượng tối đa ULD: ${grossKg} kg > ${uld.maxGrossKg} kg (-30đ)`,
      en: `Max Gross Weight exceeded: ${grossKg} kg > ${uld.maxGrossKg} kg (-30pt)`
    });
  }
  if (overhangCount > 0) {
    score -= overhangCount * 22;
    deductions.push({
      ja: `コンター逸脱（オーバーハング）が ${overhangCount} 箇所あります (-${overhangCount * 22}pt)`,
      vi: `Có ${overhangCount} kiện hàng nhô ra ngoài khung biên dạng Contour (-${overhangCount * 22}đ)`,
      en: `${overhangCount} item(s) protrude outside the ULD contour gauge (-${overhangCount * 22}pt)`
    });
  }
  if (heavyWithoutSpreader > 0 || maxPeakFloorKgM2 > uld.floorLimitKgM2) {
    score -= 20;
    deductions.push({
      ja: `床面強度違反: 重量物にパレット/スキッド＋補強板（スプレッダー）が不足しています (-20pt)`,
      vi: `Vi phạm chịu tải sàn (床面強度): Hàng nặng chưa kê Pallet/Skid + ván 補強板 Spreader (-20đ)`,
      en: `Floor load limit exceeded: Heavy cargo requires Pallet/Skid + Spreader planks (-20pt)`
    });
  }
  if (maxEccPct > 18) {
    score -= 16;
    deductions.push({
      ja: `偏荷重（重心ズレ ${maxEccPct}%）が大きすぎます（基準18%以内）(-16pt)`,
      vi: `Lệch trọng tâm 偏荷重 quá lớn (${maxEccPct}% > giới hạn 18%) (-16đ)`,
      en: `Excessive CG eccentricity (${maxEccPct}% > 18% limit) (-16pt)`
    });
  }
  if (floatingWarnings > 0) {
    score -= floatingWarnings * 12;
    deductions.push({
      ja: `上段貨物の足場が不安定（デッドスペース過大・荷崩れ危険）(-${floatingWarnings * 12}pt)`,
      vi: `Kiện tầng trên kê chênh vênh thiếu chân đỡ (nguy cơ sập hàng 荷崩れ) (-${floatingWarnings * 12}đ)`,
      en: `Unstable upper-tier overhang with insufficient support (-${floatingWarnings * 12}pt)`
    });
  }
  if (careViolations.length > 0) {
    const pen = Math.min(36, careViolations.length * 15);
    score -= pen;
    careViolations.slice(0, 3).forEach(v => deductions.push(v));
  }
  if (uld.kind === 'pallet' && wetCargoPresent && !state.waterproof) {
    score -= 10;
    deductions.push({
      ja: '水濡れ厳禁・鮮魚貨物に対する「ビニールシート防水処置」が未実施です (-10pt)',
      vi: 'Chưa phủ bạt chống thấm (ビニールシート) cho hàng kỵ nước / hải sản (-10đ)',
      en: 'Missing vinyl waterproof sheeting for Keep-Dry / Wet cargo (-10pt)'
    });
  }
  if (uld.kind === 'pallet' && heavyCargoPresent && !state.tiedown) {
    score -= 12;
    deductions.push({
      ja: 'パレット上の重量物に対する「タイダウンベルト固縛」が未実施です (-12pt)',
      vi: 'Hàng nặng trên Pallet chưa chằng dây đai tăng đơ (タイダウンベルト) (-12đ)',
      en: 'Heavy cargo on pallet lacks Tie-Down strap restraint (-12pt)'
    });
  }
  if (!state.netOrDoor) {
    score -= 15;
    deductions.push({
      ja: uld.kind === 'pallet' ? 'パレットの「ネット掛け」が未完了です (-15pt)' : 'コンテナ扉の「クローズ・アンド・ロック」が未完了です (-15pt)',
      vi: uld.kind === 'pallet' ? 'Chưa phủ và móc khóa Lưới chằng Pallet (ネット掛け) (-15đ)' : 'Chưa đóng & gài khóa cửa Container (クローズ・アンド・ロック) (-15đ)',
      en: uld.kind === 'pallet' ? 'Cargo Net is not rigged and latched (-15pt)' : 'Container door Close-and-Lock is incomplete (-15pt)'
    });
  }

  // Bonus recognition note for brick stacking
  score = Math.max(0, Math.min(100, score));

  return {
    uld,
    cargoNetKg,
    palletAuxKg,
    payloadKg,
    grossKg,
    cgXCm: Math.round(cgXCm),
    cgZCm: Math.round(cgZCm),
    eccXPct,
    eccZPct,
    maxEccPct,
    volPct,
    maxPeakFloorKgM2,
    overhangCount,
    brickPairs,
    floatingWarnings,
    heavyWithoutSpreader,
    careViolations,
    deductions,
    score,
    passed: score >= 80 && items.length > 0 && unplacedCount === 0 && overhangCount === 0 && grossKg <= uld.maxGrossKg
  };
}

// =====================================================================
// 6. THREE.JS 3D INTERACTIVE ULD BUILDUP SCENE (HAND + FORKLIFT ANIMATION)
// =====================================================================
class UldBuildupScene3D {
  constructor(canvas, onPickPosition) {
    this.canvas = canvas;
    this.onPickPosition = onPickPosition;
    this.disposed = false;
    this.rafId = null;
    this.lastTime = 0;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b1526);
    applySkyEnvironment(this.renderer, this.scene, 'overcast'); // warehouse-like soft reflections

    this.camera = new THREE.PerspectiveCamera(44, 16 / 9, 0.1, 80);
    this.orbit = {
      target: new THREE.Vector3(0, 0.75, 0),
      radius: 5.4,
      theta: 0.68,
      phi: 1.02,
      dragging: false,
      moved: false,
      downX: 0,
      downY: 0,
      lastX: 0,
      lastY: 0
    };

    // Warehouse lighting
    const hemi = new THREE.HemisphereLight(0xdbeafe, 0x1e293b, 0.7);
    this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xfffbeb, 1.85);
    dir.position.set(5.5, 9.0, 6.0);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    dir.shadow.camera.left = -5;
    dir.shadow.camera.right = 5;
    dir.shadow.camera.top = 5;
    dir.shadow.camera.bottom = -5;
    this.scene.add(dir);

    // Cargo Warehouse Epoxy Floor + Yellow Safety Lines
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.82, metalness: 0.08 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.18;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const grid = new THREE.GridHelper(14, 28, 0x38bdf8, 0x334155);
    grid.position.y = -0.175;
    grid.material.opacity = 0.28;
    grid.material.transparent = true;
    this.scene.add(grid);

    this.uldGroup = new THREE.Group();
    this.itemsGroup = new THREE.Group();
    this.finishGroup = new THREE.Group();
    this.ghostGroup = new THREE.Group();
    this.forkliftGroup = this._buildForklift3D();
    this.forkliftGroup.visible = false;
    this.forkliftAnim = { active: false, t: 0, targetX: 0, targetY: 0, targetZ: 0 };

    this.scene.add(this.uldGroup);
    this.scene.add(this.itemsGroup);
    this.scene.add(this.finishGroup);
    this.scene.add(this.ghostGroup);
    this.scene.add(this.forkliftGroup);

    // Invisible raycast plane on ULD deck (y = 0)
    this.pickPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 5),
      new THREE.MeshBasicMaterial({ visible: false })
    );
    this.pickPlane.rotation.x = -Math.PI / 2;
    this.scene.add(this.pickPlane);
    this.raycaster = new THREE.Raycaster();

    this._bindEvents();
    this.syncAll();
  }

  _buildForklift3D() {
    const g = new THREE.Group();
    const yellow = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.38, metalness: 0.25 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7, metalness: 0.35 });
    const steel = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.32, metalness: 0.78 });

    // Counterbalance body
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.82, 1.85), yellow);
    body.position.set(0, 0.48, 1.25);
    body.castShadow = true;
    g.add(body);

    // Overhead guard cage
    [[-0.48, 0.55], [0.48, 0.55], [-0.48, 1.85], [0.48, 1.85]].forEach(([px, pz]) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.05, 8), dark);
      post.position.set(px, 1.38, pz);
      g.add(post);
    });
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.06, 0.06, 1.42), dark);
    roof.position.set(0, 1.9, 1.2);
    g.add(roof);

    // Amber safety strobe + 1.5m safety ring on floor!
    this.forkBeacon = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xfef08a })
    );
    this.forkBeacon.position.set(0, 2.02, 1.55);
    g.add(this.forkBeacon);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(1.45, 1.56, 36),
      new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide, transparent: true, opacity: 0.65 })
    );
    halo.rotation.x = -Math.PI / 2;
    halo.position.set(0, -0.16, 0.6);
    g.add(halo);

    // Mast & Forks (-Z front)
    [-0.36, 0.36].forEach(mx => {
      const mast = new THREE.Mesh(new THREE.BoxGeometry(0.09, 2.25, 0.11), dark);
      mast.position.set(mx, 1.0, 0.25);
      g.add(mast);
    });
    this.forkCarriage = new THREE.Group();
    const backplate = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.45, 0.06), dark);
    backplate.position.set(0, 0.25, 0.18);
    this.forkCarriage.add(backplate);
    [-0.28, 0.28].forEach(fx => {
      const tine = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.045, 1.15), steel);
      tine.position.set(fx, 0.03, -0.42);
      this.forkCarriage.add(tine);
    });
    g.add(this.forkCarriage);

    // 4 industrial tires
    [[-0.54, 0.58, 0.26], [0.54, 0.58, 0.26], [-0.48, 1.88, 0.21], [0.48, 1.88, 0.21]].forEach(([wx, wz, r]) => {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.2, 14), dark);
      w.rotation.z = Math.PI / 2;
      w.position.set(wx, r - 0.17, wz);
      g.add(w);
    });
    return g;
  }

  triggerForkliftPlacement(xCm, yBottomCm, zCm) {
    this.forkliftAnim = {
      active: true,
      t: 0,
      targetX: xCm * 0.01,
      targetY: yBottomCm * 0.01,
      targetZ: zCm * 0.01
    };
    this.forkliftGroup.visible = true;
  }

  _bindEvents() {
    const el = this.canvas;
    const toRayPoint = e => {
      const rect = el.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      this.raycaster.setFromCamera(ndc, this.camera);
      const targets = [...this.itemsGroup.children, this.pickPlane];
      const hits = this.raycaster.intersectObjects(targets, true);
      if (hits.length > 0) {
        const pt = hits[0].point;
        const uld = ULD_SIM_SPECS[uldSimState.uldId] || ULD_SIM_SPECS.PMC_LD;
        const snap = 4; // 4cm precision snap
        const cx = Math.round((pt.x * 100) / snap) * snap;
        const cz = Math.round((pt.z * 100) / snap) * snap;
        return {
          xCm: Math.max(-uld.baseL * 0.52, Math.min(uld.baseL * 0.52, cx)),
          zCm: Math.max(-uld.baseW * 0.52, Math.min(uld.baseW * 0.52, cz))
        };
      }
      return null;
    };

    this._onDown = e => {
      this.orbit.dragging = true;
      this.orbit.moved = false;
      this.orbit.downX = e.clientX;
      this.orbit.downY = e.clientY;
      this.orbit.lastX = e.clientX;
      this.orbit.lastY = e.clientY;
    };
    this._onMove = e => {
      if (this.orbit.dragging) {
        const dx = e.clientX - this.orbit.lastX;
        const dy = e.clientY - this.orbit.lastY;
        if (Math.hypot(e.clientX - this.orbit.downX, e.clientY - this.orbit.downY) > 6) {
          this.orbit.moved = true;
        }
        this.orbit.lastX = e.clientX;
        this.orbit.lastY = e.clientY;
        this.orbit.theta -= dx * 0.007;
        this.orbit.phi = Math.max(0.22, Math.min(1.45, this.orbit.phi - dy * 0.006));
      } else {
        const pt = toRayPoint(e);
        if (pt) {
          uldSimState.cursorXCm = pt.xCm;
          uldSimState.cursorZCm = pt.zCm;
          this.syncGhost();
        }
      }
    };
    this._onUp = e => {
      const wasClick = this.orbit.dragging && !this.orbit.moved && e.button === 0;
      this.orbit.dragging = false;
      if (wasClick) {
        const pt = toRayPoint(e);
        if (pt && this.onPickPosition) {
          uldSimState.cursorXCm = pt.xCm;
          uldSimState.cursorZCm = pt.zCm;
          this.onPickPosition(pt.xCm, pt.zCm);
        }
      }
    };
    this._onWheel = e => {
      e.preventDefault();
      this.orbit.radius = Math.max(2.2, Math.min(11.5, this.orbit.radius * (e.deltaY > 0 ? 1.1 : 0.9)));
    };

    el.addEventListener('pointerdown', this._onDown);
    window.addEventListener('pointermove', this._onMove);
    window.addEventListener('pointerup', this._onUp);
    el.addEventListener('wheel', this._onWheel, { passive: false });
  }

  setCameraView(preset) {
    const uld = ULD_SIM_SPECS[uldSimState.uldId] || ULD_SIM_SPECS.PMC_LD;
    const span = Math.max(uld.baseL, uld.baseW) * 0.01;
    if (preset === 'top') {
      this.orbit.theta = 0;
      this.orbit.phi = 0.24;
      this.orbit.radius = span * 1.45 + 1.8;
    } else if (preset === 'front') {
      this.orbit.theta = 0;
      this.orbit.phi = 1.38;
      this.orbit.radius = span * 1.35 + 1.6;
    } else {
      this.orbit.theta = 0.68;
      this.orbit.phi = 1.02;
      this.orbit.radius = span * 1.38 + 1.9;
    }
  }

  _clearGroup(grp) {
    while (grp.children.length > 0) {
      const ch = grp.children.pop();
      grp.remove(ch);
    }
  }

  _makeCareMarkTexture(tpl, inverted) {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d');
    const hex = '#' + tpl.color.toString(16).padStart(6, '0');
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, 256, 256);

    // Corrugated box seam / wood crate slats
    ctx.strokeStyle = 'rgba(15,23,42,0.34)';
    ctx.lineWidth = 5;
    ctx.strokeRect(8, 8, 240, 240);
    if (tpl.mode === 'forklift') {
      ctx.beginPath();
      ctx.moveTo(12, 12); ctx.lineTo(244, 244);
      ctx.moveTo(244, 12); ctx.lineTo(12, 244);
      ctx.stroke();
    }

    // White shipping label + Care Marks
    ctx.fillStyle = 'rgba(255,255,255,0.92)';
    ctx.fillRect(22, 22, 212, 92);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 21px monospace';
    ctx.fillText(`${tpl.wtKg} kg`, 32, 50);

    let bx = 32;
    if (tpl.marks.includes('THIS_SIDE_UP')) {
      ctx.fillStyle = inverted ? '#dc2626' : '#0f172a';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(inverted ? '⚠横倒NG' : '↑↑天地', bx, 86);
      bx += 86;
    }
    if (tpl.marks.includes('FRAGILE')) {
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('🍷取扱注意', bx, 86);
    }
    if (tpl.marks.includes('SHOCKWATCH')) {
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(150, 28, 76, 24);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('SHOCKWATCH', 153, 44);
    }
    if (tpl.marks.includes('WET') || tpl.marks.includes('KEEP_DRY')) {
      ctx.fillStyle = '#0284c7';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText('☂水濡注意', 32, 108);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  _buildCargoUnitMesh(item, isGhost = false, ghostValid = true) {
    const grp = new THREE.Group();
    const tpl = CARGO_TEMPLATES[item.tpl] || CARGO_TEMPLATES.BOX_STD_28;
    const pH = item.palletHCm * 0.01;
    const cH = item.cargoHCm * 0.01;
    const cL = item.cargoLCm * 0.01;
    const cW = item.cargoWCm * 0.01;

    // 1. Optional Base Pallet / Skid / Spreader Planks / Tuna Pan / Bike Skid
    if (item.palletId && item.palletId !== 'NONE' && pH > 0) {
      const pL = item.palletLCm * 0.01;
      const pW = item.palletWCm * 0.01;
      const isMetalPan = item.palletId === 'TUNA_PAN' || item.palletId === 'BIKE_SKID';
      const palCol = isGhost ? (ghostValid ? 0x34d399 : 0xf87171) : (isMetalPan ? 0x94a3b8 : 0xd97706);
      const palMat = new THREE.MeshStandardMaterial({
        color: palCol,
        roughness: isMetalPan ? 0.35 : 0.78,
        metalness: isMetalPan ? 0.65 : 0.05,
        transparent: isGhost,
        opacity: isGhost ? 0.55 : 1.0
      });

      if (item.palletId === 'SKID_SPREADER' && !isGhost) {
        // Yellow/wood Spreader Planks (補強板) underneath + 3 heavy timber skids leaving forklift tine channels!
        const spreaderMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.65 });
        [-pW * 0.36, 0, pW * 0.36].forEach(sz => {
          const plank = new THREE.Mesh(new THREE.BoxGeometry(pL * 1.06, 0.025, 0.18), spreaderMat);
          plank.position.set(0, 0.0125, sz);
          grp.add(plank);
        });
        [-pL * 0.38, 0, pL * 0.38].forEach(sx => {
          const runner = new THREE.Mesh(new THREE.BoxGeometry(0.12, pH - 0.05, pW * 0.96), palMat);
          runner.position.set(sx, 0.025 + (pH - 0.05) * 0.5, 0);
          grp.add(runner);
        });
        const topDeck = new THREE.Mesh(new THREE.BoxGeometry(pL, 0.025, pW), palMat);
        topDeck.position.set(0, pH - 0.0125, 0);
        grp.add(topDeck);
      } else if (isMetalPan && !isGhost) {
        // Leak-proof raised lip Tuna Pan / Bike Skid
        const pan = new THREE.Mesh(new THREE.BoxGeometry(pL, pH, pW), palMat);
        pan.position.set(0, pH * 0.5, 0);
        grp.add(pan);
      } else {
        // Standard Forklift Pallet with visible fork pockets!
        [-pL * 0.4, 0, pL * 0.4].forEach(sx => {
          const block = new THREE.Mesh(new THREE.BoxGeometry(0.12, pH * 0.65, pW), palMat);
          block.position.set(sx, pH * 0.325, 0);
          grp.add(block);
        });
        const deck = new THREE.Mesh(new THREE.BoxGeometry(pL, pH * 0.35, pW), palMat);
        deck.position.set(0, pH * 0.825, 0);
        grp.add(deck);
      }
    }

    // 2. Cargo Box / Crate / Motorcycle Body
    let mat;
    if (isGhost) {
      mat = new THREE.MeshStandardMaterial({
        color: ghostValid ? 0x10b981 : 0xef4444,
        transparent: true,
        opacity: 0.52,
        roughness: 0.4
      });
    } else {
      const tex = this._makeCareMarkTexture(tpl, item.inverted);
      mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.62, metalness: 0.08 });
    }
    const box = new THREE.Mesh(new THREE.BoxGeometry(cL, cH, cW), mat);
    box.position.set(0, pH + cH * 0.5, 0);
    if (!isGhost) {
      box.castShadow = true;
      box.receiveShadow = true;
    }
    grp.add(box);

    // Crisp edge outline
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(cL, cH, cW)),
      new THREE.LineBasicMaterial({ color: isGhost ? (ghostValid ? 0x6ee7b7 : 0xfca5a5) : 0x0f172a })
    );
    edges.position.copy(box.position);
    grp.add(edges);

    grp.position.set(item.xCm * 0.01, item.yBottomCm * 0.01, item.zCm * 0.01);
    return grp;
  }

  syncUldStructure() {
    this._clearGroup(this.uldGroup);
    const uld = ULD_SIM_SPECS[uldSimState.uldId] || ULD_SIM_SPECS.PMC_LD;
    const bL = uld.baseL * 0.01;
    const bW = uld.baseW * 0.01;
    const uL = uld.usableL * 0.01;
    const uW = uld.usableW * 0.01;
    const mH = uld.maxH * 0.01;

    // Dolly rollers underneath ULD
    const dollyMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6, roughness: 0.4 });
    const frame = new THREE.Mesh(new THREE.BoxGeometry(bL + 0.16, 0.12, bW + 0.16), dollyMat);
    frame.position.y = -0.10;
    this.uldGroup.add(frame);

    // Aluminum ULD Base Sheet + Blue/Silver Edge Seat-Track Rail
    const aluMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.72, roughness: 0.28 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(bL, 0.04, bW), aluMat);
    base.position.y = -0.02;
    base.receiveShadow = true;
    this.uldGroup.add(base);

    // Usable inner boundary line (Yellow-Orange Seat Track)
    const railPts = [
      new THREE.Vector3(-uL * 0.5, 0.005, -uW * 0.5),
      new THREE.Vector3(uL * 0.5, 0.005, -uW * 0.5),
      new THREE.Vector3(uL * 0.5, 0.005, uW * 0.5),
      new THREE.Vector3(-uL * 0.5, 0.005, uW * 0.5),
      new THREE.Vector3(-uL * 0.5, 0.005, -uW * 0.5)
    ];
    this.uldGroup.add(new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(railPts),
      new THREE.LineBasicMaterial({ color: 0xfacc15 })
    ));

    // Container aluminum walls (semi-transparent on front +Z side so inside stacking is 100% visible!)
    if (uld.kind === 'container') {
      const wallMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0, metalness: 0.55, roughness: 0.32, transparent: true, opacity: 0.34, side: THREE.DoubleSide
      });
      const backWall = new THREE.Mesh(new THREE.PlaneGeometry(uL, mH), wallMat);
      backWall.position.set(0, mH * 0.5, -uW * 0.5);
      this.uldGroup.add(backWall);
      [-uL * 0.5, uL * 0.5].forEach(wx => {
        const sw = new THREE.Mesh(new THREE.PlaneGeometry(uW, mH), wallMat);
        sw.rotation.y = Math.PI / 2;
        sw.position.set(wx, mH * 0.5, 0);
        this.uldGroup.add(sw);
      });
      const roof = new THREE.Mesh(new THREE.PlaneGeometry(uL, uW), wallMat);
      roof.rotation.x = Math.PI / 2;
      roof.position.set(0, mH, 0);
      this.uldGroup.add(roof);
    }

    // 3D Contour Gauge Envelope (Green when clean, Red when any item overhangs!)
    if (uldSimState.showContour) {
      const rep = analyzeUldBuild(uldSimState);
      const col = rep.overhangCount > 0 ? 0xef4444 : 0x22c55e;
      const lineMat = new THREE.LineBasicMaterial({ color: col });
      const samplesX = [-uL * 0.5, -uL * 0.36, 0, uL * 0.36, uL * 0.5];
      const samplesZ = [-uW * 0.5, -uW * 0.25, 0, uW * 0.25, uW * 0.5];

      // Draw longitudinal & transverse contour ribs matching exact `contourMaxY`!
      for (const zM of [-uW * 0.5, 0, uW * 0.5]) {
        const pts = [new THREE.Vector3(-uL * 0.5, 0, zM)];
        for (const xM of samplesX) {
          const yM = uld.contourMaxY(xM * 100 * 0.999, zM * 100 * 0.999) * 0.01;
          pts.push(new THREE.Vector3(xM, yM, zM));
        }
        pts.push(new THREE.Vector3(uL * 0.5, 0, zM));
        this.uldGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
      }
      for (const xM of [-uL * 0.5, 0, uL * 0.5]) {
        const pts = [new THREE.Vector3(xM, 0, -uW * 0.5)];
        for (const zM of samplesZ) {
          const yM = uld.contourMaxY(xM * 100 * 0.999, zM * 100 * 0.999) * 0.01;
          pts.push(new THREE.Vector3(xM, yM, zM));
        }
        pts.push(new THREE.Vector3(xM, 0, uW * 0.5));
        this.uldGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
      }
    }

    this.pickPlane.scale.set(1, 1, 1);
  }

  syncPlacedItems() {
    this._clearGroup(this.itemsGroup);
    const uld = ULD_SIM_SPECS[uldSimState.uldId] || ULD_SIM_SPECS.PMC_LD;
    for (const it of uldSimState.placedItems) {
      const m = this._buildCargoUnitMesh(it, false, true);
      const ov = checkItemContourOverhang(uld, it);
      if (ov.overhang) {
        const warnBox = new THREE.Mesh(
          new THREE.BoxGeometry(it.lCm * 0.01 + 0.03, it.hCm * 0.01 + 0.03, it.wCm * 0.01 + 0.03),
          new THREE.MeshBasicMaterial({ color: 0xef4444, wireframe: true })
        );
        warnBox.position.y = it.hCm * 0.005;
        m.add(warnBox);
      }
      this.itemsGroup.add(m);
    }
  }

  syncFinishLayers() {
    this._clearGroup(this.finishGroup);
    const uld = ULD_SIM_SPECS[uldSimState.uldId] || ULD_SIM_SPECS.PMC_LD;
    if (uldSimState.placedItems.length === 0 && !uldSimState.netOrDoor) return;

    const uL = uld.usableL * 0.01;
    const uW = uld.usableW * 0.01;
    let maxStackM = 0.4;
    uldSimState.placedItems.forEach(it => {
      maxStackM = Math.max(maxStackM, (it.yBottomCm + it.hCm) * 0.01);
    });
    const capH = Math.min(uld.maxH * 0.01, maxStackM + 0.03);

    // 1. Waterproof Vinyl Sheet (ビニールシート防水処置)
    if (uldSimState.waterproof) {
      const sheet = new THREE.Mesh(
        new THREE.BoxGeometry(uL * 0.96, capH, uW * 0.96),
        new THREE.MeshPhysicalMaterial({
          color: 0xbae6fd, transparent: true, opacity: 0.22, roughness: 0.15, clearcoat: 1.0
        })
      );
      sheet.position.y = capH * 0.5;
      this.finishGroup.add(sheet);
    }

    // 2. Orange Tie-Down Ratchet Straps (タイダウンベルト固縛) anchored to Seat Track
    if (uldSimState.tiedown && uld.kind === 'pallet') {
      const strapMat = new THREE.LineBasicMaterial({ color: 0xf97316 });
      for (const it of uldSimState.placedItems.filter(x => x.wtKg >= 100 || uldSimState.placedItems.length <= 3)) {
        const ix = it.xCm * 0.01, iz = it.zCm * 0.01;
        const topY = (it.yBottomCm + it.hCm) * 0.01 + 0.015;
        const hl = it.lCm * 0.005;
        [-hl * 0.5, hl * 0.5].forEach(dx => {
          const pts = [
            new THREE.Vector3(ix + dx, 0.01, -uW * 0.5),
            new THREE.Vector3(ix + dx, topY, iz - it.wCm * 0.005),
            new THREE.Vector3(ix + dx, topY, iz + it.wCm * 0.005),
            new THREE.Vector3(ix + dx, 0.01, uW * 0.5)
          ];
          this.finishGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), strapMat));
        });
      }
    }

    // 3. Pallet Cargo Net (ネット掛け) OR Container Door Close-and-Lock (クローズ・アンド・ロック)
    if (uldSimState.netOrDoor) {
      if (uld.kind === 'pallet') {
        const netBox = new THREE.Mesh(
          new THREE.BoxGeometry(uL * 0.99, capH + 0.02, uW * 0.99, 8, 5, 6),
          new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.52 })
        );
        netBox.position.y = (capH + 0.02) * 0.5;
        this.finishGroup.add(netBox);
      } else {
        // Closed Blue ANA/JEAE Curtain Door + Red/Silver Lock Latches on +Z front!
        const mH = uld.maxH * 0.01;
        const curtain = new THREE.Mesh(
          new THREE.PlaneGeometry(uL, mH),
          new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.62, side: THREE.DoubleSide })
        );
        curtain.position.set(0, mH * 0.5, uW * 0.5 + 0.01);
        this.finishGroup.add(curtain);
        [-uL * 0.35, 0, uL * 0.35].forEach(lx => {
          const latch = new THREE.Mesh(
            new THREE.BoxGeometry(0.10, 0.05, 0.04),
            new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.3 })
          );
          latch.position.set(lx, 0.08, uW * 0.5 + 0.025);
          this.finishGroup.add(latch);
        });
      }
    }
  }

  syncGhost() {
    this._clearGroup(this.ghostGroup);
    const activeTplId = getActiveSelectedTemplateId();
    if (!activeTplId) return;
    const uld = ULD_SIM_SPECS[uldSimState.uldId] || ULD_SIM_SPECS.PMC_LD;
    const palId = uldSimState.handlingMode === 'forklift' ? uldSimState.selectedPalletId : 'NONE';
    const dims = computeFootprintDims(activeTplId, palId, uldSimState.rot90, uldSimState.invertTest);
    const yBottomCm = computeStackBaseY(uldSimState.cursorXCm, uldSimState.cursorZCm, dims.lCm, dims.wCm, uldSimState.placedItems);
    const ghostItem = {
      tpl: activeTplId,
      palletId: palId,
      xCm: uldSimState.cursorXCm,
      zCm: uldSimState.cursorZCm,
      yBottomCm,
      inverted: uldSimState.invertTest,
      ...dims
    };
    const cCheck = checkItemContourOverhang(uld, ghostItem);
    const tpl = CARGO_TEMPLATES[activeTplId];
    const modeOk = (tpl.mode === 'hand' && uldSimState.handlingMode === 'hand') ||
                   (tpl.mode === 'forklift' && uldSimState.handlingMode === 'forklift');
    const valid = !cCheck.overhang && modeOk;
    this.ghostGroup.add(this._buildCargoUnitMesh(ghostItem, true, valid));
  }

  syncAll() {
    this.syncUldStructure();
    this.syncPlacedItems();
    this.syncFinishLayers();
    this.syncGhost();
  }

  start() {
    if (this.rafId || this.disposed) return;
    this.lastTime = performance.now();
    const loop = now => {
      if (this.disposed) { this.rafId = null; return; }
      const dt = Math.min(0.05, (now - this.lastTime) * 0.001);
      this.lastTime = now;
      this.update(dt, now * 0.001);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  update(dt, timeSec) {
    const w = this.canvas.clientWidth || 640;
    const h = this.canvas.clientHeight || 440;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    if (this.canvas.width !== Math.floor(w * dpr) || this.canvas.height !== Math.floor(h * dpr)) {
      this.renderer.setPixelRatio(dpr);
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }

    // Animate 3D Forklift delivery & retraction
    if (this.forkliftAnim.active) {
      this.forkliftAnim.t += dt * 0.85;
      const p = this.forkliftAnim.t;
      const uld = ULD_SIM_SPECS[uldSimState.uldId] || ULD_SIM_SPECS.PMC_LD;
      const edgeZ = uld.baseW * 0.005 + 0.55;
      if (p < 1.0) {
        const approach = p < 0.5 ? (p / 0.5) : (1 - (p - 0.5) / 0.5);
        const zPos = edgeZ + (1 - approach) * 2.2;
        this.forkliftGroup.position.set(this.forkliftAnim.targetX, 0, zPos);
        this.forkliftGroup.rotation.y = 0;
        if (this.forkCarriage) {
          this.forkCarriage.position.y = Math.max(0.02, this.forkliftAnim.targetY + (1 - approach) * 0.18);
        }
        if (this.forkBeacon) {
          this.forkBeacon.material.color.setHex(Math.sin(timeSec * 16) > 0 ? 0xfacc15 : 0x78350f);
        }
      } else {
        this.forkliftAnim.active = false;
        this.forkliftGroup.visible = false;
      }
    }

    const { radius, theta, phi, target } = this.orbit;
    this.camera.position.set(
      target.x + radius * Math.sin(phi) * Math.sin(theta),
      Math.max(0.35, target.y + radius * Math.cos(phi)),
      target.z + radius * Math.sin(phi) * Math.cos(theta)
    );
    this.camera.lookAt(target);
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    this.stop();
    this.canvas.removeEventListener('pointerdown', this._onDown);
    window.removeEventListener('pointermove', this._onMove);
    window.removeEventListener('pointerup', this._onUp);
    this.canvas.removeEventListener('wheel', this._onWheel);
    this.renderer.dispose();
  }
}

// =====================================================================
// 7. DOM CONTROLLER & MODULE ENTRYPOINT
// =====================================================================
let uldScene = null;

function getActiveSelectedTemplateId() {
  if (uldSimState.missionId === 'FREE') return uldSimState.freeTpl;
  const q = uldSimState.queue.find(x => x.id === uldSimState.selectedQueueId && !x.placed);
  return q ? q.tpl : null;
}

export function stopUldBuildup3D() {
  if (uldScene) {
    uldScene.dispose();
    uldScene = null;
  }
}

function placeSelectedAt(xCm, zCm) {
  const tplId = getActiveSelectedTemplateId();
  if (!tplId) {
    uldSimState.lastAlert = {
      type: 'info',
      msgJa: 'すべての予定貨物を搭載済みです！右下の「仕上げ処置」と「合格判定」を行ってください。',
      msgVi: 'Đã xếp hết kiện hàng trong danh sách! Hãy bật các bước hoàn thiện (Bạt/Dây đai/Lưới/Khóa cửa) và bấm Chấm điểm.',
      msgEn: 'All manifest items are placed! Complete finishing steps (Sheet/Straps/Net/Door) and click Verify Grade.'
    };
    renderUldBuildupUI();
    return;
  }

  const uld = ULD_SIM_SPECS[uldSimState.uldId] || ULD_SIM_SPECS.PMC_LD;
  const tpl = CARGO_TEMPLATES[tplId];

  // Enforce authentic Hand vs Forklift safety rule!
  if (tpl.mode === 'forklift' && uldSimState.handlingMode === 'hand') {
    uldSimState.lastAlert = {
      type: 'danger',
      msgJa: `🚨 安全違反ブロック: ${tpl.wtKg}kgの重量物を「✋ 手積み」することは労働災害防止規定で厳禁です！「🚜 フォークリフト搭載」に切り替えてパレット/補強板を選択してください。`,
      msgVi: `🚨 Chặn an toàn: CẤM bê tay (手積み) kiện hàng nặng ${tpl.wtKg} kg! Hãy chuyển sang chế độ "🚜 Xe nâng Forklift" và chọn Pallet / Ván 補強板 phù hợp.`,
      msgEn: `🚨 Safety Block: Manual hand-lifting of ${tpl.wtKg} kg heavy cargo is prohibited! Switch to "🚜 Forklift Mode" and select a base pallet/spreader.`
    };
    renderUldBuildupUI();
    return;
  }
  if (tpl.mode === 'hand' && uldSimState.handlingMode === 'forklift') {
    uldSimState.lastAlert = {
      type: 'warn',
      msgJa: `💡 軽量カートン（${tpl.wtKg}kg）は「✋ 手積み」モードに切り替えて隙間なくレンガ積みしてください。`,
      msgVi: `💡 Thùng hàng nhẹ (${tpl.wtKg} kg) cần chuyển sang chế độ "✋ Xếp tay (手積み)" để xếp gối gạch khít khe hở!`,
      msgEn: `💡 Switch to "✋ Manual Hand Mode" to brick-stack light cartons (${tpl.wtKg} kg) cleanly.`
    };
    renderUldBuildupUI();
    return;
  }
  if (uld.kind === 'container' && tpl.mode === 'forklift') {
    uldSimState.lastAlert = {
      type: 'danger',
      msgJa: '⚠ 小型コンテナ内へ大型フォークリフト貨物は直接投入できません（PMC/PLA/PGAパレットを使用）。',
      msgVi: '⚠ Không đưa kiện máy siêu nặng Forklift vào thùng nhỏ AKE/AKH (dùng mâm PMC/PLA/PGA).',
      msgEn: '⚠ Heavy forklift crates must be built on aircraft pallets (PMC/PLA/PGA).'
    };
    renderUldBuildupUI();
    return;
  }

  const palId = uldSimState.handlingMode === 'forklift' ? uldSimState.selectedPalletId : 'NONE';
  const dims = computeFootprintDims(tplId, palId, uldSimState.rot90, uldSimState.invertTest);
  const yBottomCm = computeStackBaseY(xCm, zCm, dims.lCm, dims.wCm, uldSimState.placedItems);

  const newItem = {
    uid: 'u_' + Date.now() + '_' + (freeCounter++),
    queueId: uldSimState.missionId === 'FREE' ? null : uldSimState.selectedQueueId,
    tpl: tplId,
    palletId: palId,
    xCm,
    yBottomCm,
    zCm,
    rot90: uldSimState.rot90,
    inverted: uldSimState.invertTest,
    modeUsed: uldSimState.handlingMode,
    ...dims
  };

  uldSimState.placedItems.push(newItem);
  if (newItem.queueId) {
    const qEntry = uldSimState.queue.find(x => x.id === newItem.queueId);
    if (qEntry) qEntry.placed = true;
    const nextUnplaced = uldSimState.queue.find(x => !x.placed);
    uldSimState.selectedQueueId = nextUnplaced ? nextUnplaced.id : null;
    if (nextUnplaced) {
      const nextTpl = CARGO_TEMPLATES[nextUnplaced.tpl];
      uldSimState.handlingMode = nextTpl.mode;
      uldSimState.selectedPalletId = nextTpl.mode === 'forklift' ? (nextTpl.recPallets?.[0] || 'T11_110') : 'NONE';
    }
  }

  const ov = checkItemContourOverhang(uld, newItem);
  if (ov.overhang) {
    uldSimState.lastAlert = {
      type: 'danger',
      msgJa: `⚠ コンター逸脱（オーバーハング）発生！高さまたは端が許容枠（${ov.allowedY}cm）を超えています。「↩ 1つ戻す」で修正してください。`,
      msgVi: `⚠ VƯỢT KHUNG CONTOUR (Overhang)! Kiện vừa đặt bị nhô ra ngoài biên dạng cho phép (${ov.allowedY} cm). Hãy bấm "↩ Hoàn tác" để đặt lại!`,
      msgEn: `⚠ CONTOUR OVERHANG! Item protrudes beyond the ${ov.allowedY} cm contour limit. Click Undo to reposition.`
    };
  } else {
    uldSimState.lastAlert = {
      type: 'ok',
      msgJa: `✓ 搭載完了: (${xCm}cm, ${zCm}cm, 段高 ${yBottomCm}cm) — ${uldSimState.handlingMode === 'forklift' ? '🚜 フォークリフト（1.5m安全離隔・後進退避）' : '✋ 手積み配置'}`,
      msgVi: `✓ Đã xếp tại (${xCm}cm, ${zCm}cm, cao đáy ${yBottomCm}cm) bằng ${uldSimState.handlingMode === 'forklift' ? '🚜 Xe nâng Forklift' : '✋ Xếp tay'}!`,
      msgEn: `✓ Placed at (${xCm}cm, ${zCm}cm, base Y ${yBottomCm}cm) via ${uldSimState.handlingMode === 'forklift' ? '🚜 Forklift' : '✋ Hand Stack'}!`
    };
  }

  if (uldScene) {
    if (newItem.modeUsed === 'forklift') {
      uldScene.triggerForkliftPlacement(xCm, yBottomCm, zCm);
    }
    uldScene.syncAll();
  }
  renderUldBuildupUI();
}

function runAutoDemoBuild() {
  if (uldSimState.missionId === 'FREE') {
    initUldMission('ULD_M1');
  } else {
    initUldMission(uldSimState.missionId);
  }
  const m = ULD_MISSIONS.find(x => x.id === uldSimState.missionId) || ULD_MISSIONS[0];
  for (const entry of m.manifest) {
    const idl = entry.ideal;
    const dims = computeFootprintDims(entry.tpl, idl.palletId || 'NONE', !!idl.rot90, false);
    const yBottomCm = computeStackBaseY(idl.xCm, idl.zCm, dims.lCm, dims.wCm, uldSimState.placedItems);
    uldSimState.placedItems.push({
      uid: 'demo_' + entry.id,
      queueId: entry.id,
      tpl: entry.tpl,
      palletId: idl.palletId || 'NONE',
      xCm: idl.xCm,
      yBottomCm,
      zCm: idl.zCm,
      rot90: !!idl.rot90,
      inverted: false,
      modeUsed: CARGO_TEMPLATES[entry.tpl].mode,
      ...dims
    });
    const q = uldSimState.queue.find(x => x.id === entry.id);
    if (q) q.placed = true;
  }
  uldSimState.selectedQueueId = null;
  uldSimState.waterproof = !!m.idealFinish.waterproof;
  uldSimState.tiedown = !!m.idealFinish.tiedown;
  uldSimState.netOrDoor = !!m.idealFinish.netOrDoor;
  uldSimState.gradeReport = analyzeUldBuild(uldSimState);
  uldSimState.lastAlert = {
    type: 'ok',
    msgJa: '✨ 特定技能テキスト基準のお手本ビルドアップ（重下軽上・レンガ積み・補強板・コンター適合・固縛完了）を再現しました！3D画面を回転して確認してください。',
    msgVi: '✨ Đã dựng mẫu chuẩn 100 điểm theo giáo trình JEAE (Nặng dưới-Nhẹ trên, xếp gạch レンガ積み, ván Spreader, đúng Contour & chằng lưới)! Hãy xoay 3D để quan sát.',
    msgEn: '✨ Loaded ideal 100-pt textbook build (Heavy-bottom, brick interlock, spreader shoring, contour compliant & secured)! Drag 3D view to inspect.'
  };
  if (uldScene) {
    uldScene.triggerForkliftPlacement(0, 0, 0);
    uldScene.syncAll();
  }
  renderUldBuildupUI();
}

function ensureUldScene() {
  const canvas = document.getElementById('uld-3d-canvas');
  if (!canvas) return;
  if (!uldScene || uldScene.canvas !== canvas) {
    if (uldScene) uldScene.dispose();
    uldScene = new UldBuildupScene3D(canvas, (xCm, zCm) => placeSelectedAt(xCm, zCm));
    uldScene.setCameraView('iso');
  }
  uldScene.syncAll();
  uldScene.start();
}

export function renderUldBuildupUI() {
  const host = document.getElementById('uld-buildup-host');
  if (!host) return;

  // Preserve canvas across UI re-renders by updating controls + HUD without destroying WebGL context!
  let shell = document.getElementById('uld-sim-shell');
  if (!shell) {
    host.innerHTML = `
      <div id="uld-sim-topbars"></div>
      <div class="uld-sim-grid" id="uld-sim-shell">
        <div>
          <div class="uld-stage-wrap">
            <canvas id="uld-3d-canvas" class="uld-stage-canvas"></canvas>
            <div class="uld-hud-top" id="uld-hud-top"></div>
            <div class="uld-hud-bottom" id="uld-hud-bottom"></div>
          </div>
          <div id="uld-telemetry-panel"></div>
        </div>
        <div id="uld-controls-panel"></div>
      </div>
    `;
  }

  const rep = analyzeUldBuild(uldSimState);
  const uld = rep.uld;
  const solvedList = appState.uldSolved || [];

  // 1. Top Mission & ULD Selector Bar
  const topEl = document.getElementById('uld-sim-topbars');
  if (topEl) {
    const activeMission = ULD_MISSIONS.find(m => m.id === uldSimState.missionId);
    topEl.innerHTML = `
      <div class="card" style="padding:12px 14px;margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <div>
            <strong class="ja" style="font-size:14.5px;">🏗 ${t(
              'リアル3D ULDビルドアップ実習ゲーム（手積み ＆ フォークリフト・パレット/補強板・コンター判定）',
              'Trò chơi Thực hành Đóng hàng ULD 3D Thực tế (Xếp tay & Xe nâng Forklift · Kê Pallet/Spreader · Đo Contour)',
              'Realistic 3D ULD Build-up Simulator (Manual Hand Stack & Forklift · Pallets/Spreaders · Live Contour Gauge)'
            )}</strong>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button class="btn btn-sm" id="uld-btn-autodemo">✨ ${t('お手本自動ビルド', 'Xem đóng mẫu chuẩn 100đ', 'Auto-Build Textbook Demo')}</button>
            <button class="btn btn-sm" id="uld-btn-reset">↺ ${t('最初からやり直す', 'Làm lại từ đầu', 'Reset ULD')}</button>
          </div>
        </div>

        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px;">
          ${ULD_MISSIONS.map(m => `
            <button class="btn btn-sm ${uldSimState.missionId === m.id ? 'btn-primary' : ''}" data-uld-mission="${m.id}">
              ${solvedList.includes(m.id) ? '✓ ' : ''}${m.id.replace('ULD_', '')}: ${ULD_SIM_SPECS[m.uldId].code.split(' ')[0]}
            </button>
          `).join('')}
          <button class="btn btn-sm ${uldSimState.missionId === 'FREE' ? 'btn-primary' : ''}" data-uld-mission="FREE">
            🛠 ${t('自由サンドボックス（全ULD選択可）', 'Tự chọn ULD & Hàng tự do', 'Free Sandbox (All ULDs)')}
          </button>
        </div>

        ${uldSimState.missionId === 'FREE' ? `
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px;">
            ${Object.values(ULD_SIM_SPECS).map(u => `
              <button class="btn btn-sm ${uldSimState.uldId === u.id ? 'btn-primary' : ''}" data-uld-pick="${u.id}">${u.code}</button>
            `).join('')}
          </div>
        ` : `
          <div class="alert alert-info" style="margin:6px 0 0;padding:8px 12px;font-size:12.5px;">
            <strong class="ja">${t(activeMission.titleJa, activeMission.titleVi, activeMission.titleEn)}</strong>
            <div class="ja" style="margin-top:3px;">${t(activeMission.briefJa, activeMission.briefVi, activeMission.briefEn)}</div>
          </div>
        `}
      </div>
    `;
  }

  // 2. 3D Viewport HUD Overlays
  const hudTop = document.getElementById('uld-hud-top');
  if (hudTop) {
    hudTop.innerHTML = `
      <span class="ta-hud-pill">${uld.code} · ${uld.dimsLabel}</span>
      <span class="ta-hud-pill" style="border-color:${rep.overhangCount > 0 ? '#EF4444' : '#22C55E'};color:${rep.overhangCount > 0 ? '#FCA5A5' : '#86EFAC'};">
        ${rep.overhangCount > 0
          ? t(`🚨 コンター逸脱 ${rep.overhangCount}個`, `🚨 Vượt khung Contour: ${rep.overhangCount}`, `🚨 Overhang: ${rep.overhangCount}`)
          : t('✓ コンター適合 (Overhang 0)', '✓ Đạt biên dạng Contour (0 nhô)', '✓ Contour OK (0 Overhang)')}
      </span>
    `;
  }

  const hudBot = document.getElementById('uld-hud-bottom');
  if (hudBot) {
    hudBot.innerHTML = `
      <div style="display:flex;gap:5px;flex-wrap:wrap;">
        <button class="btn btn-sm" data-uld-cam="iso">🎥 ${t('3D斜め', '3D chéo', '3D Iso')}</button>
        <button class="btn btn-sm" data-uld-cam="front">📐 ${t('正面コンター', 'Contour chính diện', 'Front Contour')}</button>
        <button class="btn btn-sm" data-uld-cam="top">🗺 ${t('真上(偏荷重)', 'Nhìn từ trên (lệch tải)', 'Top View (Off-center Load)')}</button>
        <button class="btn btn-sm ${uldSimState.showContour ? 'btn-primary' : ''}" id="uld-toggle-contour">
          📏 ${t('コンター枠', 'Khung Contour', 'Contour Gauge')}
        </button>
      </div>
      <div style="font-size:11px;color:#BAE6FD;font-family:var(--font-mono);background:rgba(7,14,28,0.8);padding:4px 9px;border-radius:999px;">
        🖱 ${t('3D床/箱をクリックで配置・ドラッグで回転', 'Click lên mặt mâm/thùng 3D để đặt · Kéo để xoay', 'Click 3D deck/box to place · Drag to orbit')}
      </div>
    `;
  }

  // 3. Live Telemetry, CG Eccentricity Crosshair & Grade Report
  const telEl = document.getElementById('uld-telemetry-panel');
  if (telEl) {
    const dotLeft = Math.max(8, Math.min(92, 50 + (rep.cgXCm / Math.max(1, uld.usableL * 0.5)) * 42));
    const dotTop = Math.max(8, Math.min(92, 50 + (rep.cgZCm / Math.max(1, uld.usableW * 0.5)) * 42));
    const cgOk = rep.maxEccPct <= 18;
    const wtOk = rep.grossKg <= uld.maxGrossKg;
    const flOk = rep.maxPeakFloorKgM2 <= uld.floorLimitKgM2 && rep.heavyWithoutSpreader === 0;

    telEl.innerHTML = `
      <div class="uld-kpi-strip">
        <div class="uld-kpi-box">
          <div style="font-size:11px;color:var(--text-muted);">${t('総重量 Gross / 上限', 'Tổng Gross / Giới hạn', 'Gross / Max Wt')}</div>
          <div style="font-family:var(--font-mono);font-size:14px;font-weight:800;color:${wtOk ? 'var(--ok)' : 'var(--danger)'};">
            ${rep.grossKg.toLocaleString()} / ${uld.maxGrossKg.toLocaleString()} kg
          </div>
          <div style="font-size:10.5px;color:var(--text-secondary);">Tare ${uld.tareKg} + Pal ${rep.palletAuxKg} + Cargo ${rep.cargoNetKg}kg</div>
        </div>

        <div class="uld-kpi-box">
          <div style="font-size:11px;color:var(--text-muted);">${t('最大床面荷重 / 強度上限', 'Tải mặt sàn / Giới hạn', 'Floor Load / Limit')}</div>
          <div style="font-family:var(--font-mono);font-size:14px;font-weight:800;color:${flOk ? 'var(--ok)' : 'var(--danger)'};">
            ${rep.maxPeakFloorKgM2} / ${uld.floorLimitKgM2} kg/m²
          </div>
          <div style="font-size:10.5px;color:var(--text-secondary);">${t('補強板で面圧低減', 'Giảm áp nhờ Spreader', 'Reduced via Spreader')}</div>
        </div>

        <div class="uld-kpi-box">
          <div style="font-size:11px;color:var(--text-muted);">${t('容積効率 ＆ レンガ積み', 'Thể tích & Khóa gạch', 'Volume & Brick Lock')}</div>
          <div style="font-family:var(--font-mono);font-size:14px;font-weight:800;color:var(--accent);">
            ${rep.volPct}% · 🧱 ${rep.brickPairs}
          </div>
          <div style="font-size:10.5px;color:var(--text-secondary);">${t('2梱包またぎ数', 'Số kiện gối 2 thùng dưới', 'Bridged upper boxes')}</div>
        </div>

        <div class="uld-kpi-box" style="display:flex;align-items:center;gap:8px;">
          <div class="uld-cg-pad" title="CG Eccentricity Map">
            <div class="uld-cg-dot" style="left:${dotLeft}%;top:${dotTop}%;background:${cgOk ? '#10B981' : '#EF4444'};"></div>
          </div>
          <div>
            <div style="font-size:11px;color:var(--text-muted);">${t('偏荷重 CGズレ', 'Độ lệch tâm CG', 'CG Offset')}</div>
            <div style="font-family:var(--font-mono);font-size:14px;font-weight:800;color:${cgOk ? 'var(--ok)' : 'var(--danger)'};">${rep.maxEccPct}%</div>
            <div style="font-size:10px;color:var(--text-secondary);">≤18% OK</div>
          </div>
        </div>
      </div>

      <div style="margin-top:8px;font-size:12px;color:var(--text-secondary);" class="ja">
        <strong>✈ ${uld.acLabel}:</strong> ${t(uld.noteJa, uld.noteVi, uld.noteEn)}
      </div>

      ${uldSimState.lastAlert ? `
        <div class="alert alert-${uldSimState.lastAlert.type}" style="margin-top:10px;margin-bottom:0;font-size:12.5px;">
          <span class="ja">${t(uldSimState.lastAlert.msgJa, uldSimState.lastAlert.msgVi, uldSimState.lastAlert.msgEn)}</span>
        </div>
      ` : ''}

      ${uldSimState.gradeReport ? `
        <div class="card" style="margin-top:10px;border:1.5px solid ${uldSimState.gradeReport.passed ? 'var(--ok)' : 'var(--danger)'};">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <strong class="ja" style="font-size:15px;color:${uldSimState.gradeReport.passed ? 'var(--ok)' : 'var(--danger)'};">
              ${uldSimState.gradeReport.passed
                ? t('🎉 ビルドアップ検査 合格（航空機搭載許可）！', '🎉 ĐẠT CHUẨN ĐÓNG HÀNG ULD (CHO PHÉP KÉO RA TÀU BAY)!', '🎉 ULD BUILD-UP PASSED — CLEARED FOR RAMP LOADING!')
                : t('⚠ 再調整が必要です（不適合項目あり）', '⚠ CHƯA ĐẠT — CẦN CHỈNH SỬA CÁC LỖI BÊN DƯỚI', '⚠ REQUIRES ADJUSTMENT — CHECK ITEMS BELOW')}
            </strong>
            <span class="badge ${uldSimState.gradeReport.passed ? 'badge-ok' : 'badge-danger'}" style="font-size:14px;">
              SCORE: ${uldSimState.gradeReport.score} / 100
            </span>
          </div>
          ${uldSimState.gradeReport.deductions.length === 0 ? `
            <div class="ja" style="font-size:12.5px;color:var(--ok);margin-top:6px;">
              ✓ ${t('総重量・床面強度（補強板）・偏荷重・重下軽上・ケアマーク・コンター・固縛すべて満点基準です！',
                    'Tổng trọng lượng, tải sàn (Spreader), cân bằng tâm, Nặng dưới-Nhẹ trên, Care Marks, Contour & Chằng lưới đều đạt tuyệt đối!',
                    'Gross weight, floor shoring, CG balance, heavy-bottom brick stack, care marks, contour, and restraint are all 100% compliant!')}
            </div>
          ` : `
            <ul style="margin:8px 0 0;padding-left:18px;font-size:12.5px;color:var(--text-primary);">
              ${uldSimState.gradeReport.deductions.map(d => `<li class="ja">${t(d.ja, d.vi, d.en)}</li>`).join('')}
            </ul>
          `}
        </div>
      ` : ''}
    `;
  }

  // 4. Right-Side Interactive Handling Controls (Hand vs Forklift + Pallet Sizes + Cargo Queue + Finishing)
  const ctrlEl = document.getElementById('uld-controls-panel');
  if (ctrlEl) {
    const activeTplId = getActiveSelectedTemplateId();
    const activeTpl = activeTplId ? CARGO_TEMPLATES[activeTplId] : null;

    ctrlEl.innerHTML = `
      <div class="card" style="padding:14px;">
        <div class="card-title" style="margin-bottom:8px;">
          <span class="ja">1. ${t('荷役モード選択（手積み vs フォークリフト）', 'Chọn Chế độ Bốc xếp (Xếp tay vs Xe nâng)', 'Select Handling Mode (Hand vs Forklift)')}</span>
        </div>
        <div class="uld-mode-switch">
          <button class="uld-mode-btn hand ${uldSimState.handlingMode === 'hand' ? 'active' : ''}" data-uld-mode="hand">
            <div>✋ ${t('手積み (Hand Load)', 'Xếp tay (軽量貨物)', 'Hand Stack (≤35 kg)')}</div>
            <div style="font-size:11px;font-weight:500;color:var(--text-secondary);margin-top:2px;">
              ${t('重下軽上・2梱包またぎレンガ積み', 'Nặng dưới nhẹ trên · Gối qua 2 kiện', 'Heavy-bottom · Brick interlock')}
            </div>
          </button>
          <button class="uld-mode-btn forklift ${uldSimState.handlingMode === 'forklift' ? 'active' : ''}" data-uld-mode="forklift">
            <div>🚜 ${t('フォークリフト搭載', 'Xe nâng Forklift (重量物)', 'Forklift (>35 kg HEA)')}</div>
            <div style="font-size:11px;font-weight:500;color:var(--text-secondary);margin-top:2px;">
              ${t('パレット/補強板選択・後進・1.5m離隔', 'Kê Pallet/Spreader · Lùi xe · Cách 1,5m', 'Select Pallet/Spreader · >1.5m clear')}
            </div>
          </button>
        </div>

        ${uldSimState.handlingMode === 'forklift' ? `
          <div class="field" style="margin-bottom:10px;">
            <label class="ja">🪵 ${t('フォークリフト用 敷きパレット / スキッド / 補強板サイズ:', 'Chọn kích thước Pallet / Skid / Ván phân tải 補強板:', 'Base Pallet / Skid / Spreader Size:')}</label>
            <select id="uld-pallet-sel">
              ${Object.values(BASE_PALLET_CATALOG).map(p => `
                <option value="${p.id}" ${uldSimState.selectedPalletId === p.id ? 'selected' : ''}>
                  ${t(p.ja, p.vi, p.en)}
                </option>
              `).join('')}
            </select>
          </div>
        ` : ''}

        <div class="card-title" style="margin:10px 0 6px;">
          <span class="ja">2. ${uldSimState.missionId === 'FREE'
            ? t('搭載する貨物種類を選択', 'Chọn loại kiện hàng muốn xếp', 'Choose Cargo Package to Spawn')
            : t('搭載待ち貨物リスト（クリックして選択）', 'Danh sách kiện hàng cần đóng (Click chọn)', 'Cargo Manifest Queue')}</span>
          <span class="badge badge-neutral">${uldSimState.placedItems.length} ${t('個搭載済', 'đã xếp', 'placed')}</span>
        </div>

        ${uldSimState.missionId === 'FREE' ? `
          <div class="field" style="margin-bottom:10px;">
            <select id="uld-free-tpl">
              ${Object.values(CARGO_TEMPLATES).map(ct => `
                <option value="${ct.tpl}" ${uldSimState.freeTpl === ct.tpl ? 'selected' : ''}>
                  ${ct.mode === 'forklift' ? '🚜 ' : '✋ '}${t(ct.ja, ct.vi, ct.en)}
                </option>
              `).join('')}
            </select>
          </div>
        ` : `
          <div class="uld-queue-list" style="margin-bottom:10px;">
            ${uldSimState.queue.map((q, idx) => {
              const ct = CARGO_TEMPLATES[q.tpl];
              const isSel = uldSimState.selectedQueueId === q.id && !q.placed;
              return `
                <button class="uld-cargo-item ${isSel ? 'selected' : ''} ${q.placed ? 'placed' : ''}" data-uld-q="${q.id}" ${q.placed ? 'disabled' : ''}>
                  <div>
                    <div class="ja" style="font-size:12.5px;font-weight:700;">
                      ${idx + 1}. ${ct.mode === 'forklift' ? '🚜' : '✋'} ${t(ct.ja, ct.vi, ct.en)}
                    </div>
                  </div>
                  <span class="badge ${q.placed ? 'badge-ok' : (ct.mode === 'forklift' ? 'badge-warn' : 'badge-accent')}">
                    ${q.placed ? '✓' : ct.wtKg + 'kg'}
                  </span>
                </button>
              `;
            }).join('')}
          </div>
        `}

        <div style="padding:9px 10px;border-radius:8px;background:var(--surface-2);border:1px solid var(--border);margin-bottom:10px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:6px;">
            <span style="font-size:12px;font-weight:700;" class="ja">
              🎯 ${t('位置微調整 ＆ 回転・配置', 'Chỉnh tọa độ, Xoay 90° & Đặt hàng', 'Position Nudge, Rotate & Place')}
              <span style="font-family:var(--font-mono);color:var(--accent);">(${uldSimState.cursorXCm}, ${uldSimState.cursorZCm} cm)</span>
            </span>
            <div style="display:flex;gap:5px;">
              <button class="btn btn-sm ${uldSimState.rot90 ? 'btn-primary' : ''}" id="uld-btn-rot">↻ 90°</button>
              <button class="btn btn-sm ${uldSimState.invertTest ? 'btn-danger' : ''}" id="uld-btn-invert" title="天地無用テスト">
                ↕ ${t('横倒し', 'Đặt nằm', 'Lay Side')}
              </button>
            </div>
          </div>
          <div style="display:flex;gap:5px;flex-wrap:wrap;align-items:center;">
            <button class="btn btn-sm" data-uld-nudge="-20,0">◀ X</button>
            <button class="btn btn-sm" data-uld-nudge="20,0">X ▶</button>
            <button class="btn btn-sm" data-uld-nudge="0,-20">▲ Z</button>
            <button class="btn btn-sm" data-uld-nudge="0,20">▼ Z</button>
            <button class="btn btn-sm btn-primary" id="uld-btn-place" style="flex:1;" ${!activeTpl ? 'disabled' : ''}>
              ${uldSimState.handlingMode === 'forklift' ? '🚜 ' : '✋ '}${t('この位置へ搭載', 'Đặt kiện vào vị trí này', 'Place Item Here')}
            </button>
            <button class="btn btn-sm" id="uld-btn-undo" ${uldSimState.placedItems.length === 0 ? 'disabled' : ''}>
              ↩ ${t('1つ戻す', 'Hoàn tác', 'Undo')}
            </button>
          </div>
        </div>

        <div class="card-title" style="margin:8px 0 6px;">
          <span class="ja">3. ${t('仕上げ処置・固縛 ＆ コンター最終検査', 'Hoàn thiện Chống thấm, Chằng buộc & Chấm điểm', 'Finishing Restraints & Final Inspection')}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
          <label style="display:flex;align-items:center;gap:8px;font-size:12.5px;cursor:pointer;">
            <input type="checkbox" id="uld-chk-wp" ${uldSimState.waterproof ? 'checked' : ''} />
            <span class="ja">💧 ${t('ビニールシート防水処置（水濡れ厳禁・鮮魚）', 'Phủ bạt nilon chống thấm (ビニールシート)', 'Apply Waterproof Vinyl Sheeting')}</span>
          </label>
          ${uld.kind === 'pallet' ? `
            <label style="display:flex;align-items:center;gap:8px;font-size:12.5px;cursor:pointer;">
              <input type="checkbox" id="uld-chk-td" ${uldSimState.tiedown ? 'checked' : ''} />
              <span class="ja">⛓ ${t('タイダウンベルト固縛（重量物・長尺スキッド必須）', 'Chằng dây đai tăng đơ Tie-down vào rãnh Pallet', 'Rig Tie-Down Straps to Pallet Seat-Track')}</span>
            </label>
          ` : ''}
          <label style="display:flex;align-items:center;gap:8px;font-size:12.5px;cursor:pointer;">
            <input type="checkbox" id="uld-chk-net" ${uldSimState.netOrDoor ? 'checked' : ''} />
            <span class="ja">${uld.kind === 'pallet'
              ? `🕸 ${t('パレットネット掛け ＆ コーナー留め金ロック', 'Phủ lưới Pallet & Cài khóa móc sàn (ネット掛け)', 'Rig & Latch Pallet Cargo Net')}`
              : `🚪 ${t('コンテナ扉「クローズ・アンド・ロック」確認', 'Đóng kín & Cài chốt khóa cửa Container (Close & Lock)', 'Verify Container Door Close & Lock')}`}</span>
          </label>
        </div>

        <button class="btn btn-primary" id="uld-btn-grade" style="width:100%;font-weight:800;padding:10px;">
          ✓ ${t('ビルドアップ完成・合格採点 (0〜100点)', 'Hoàn tất & Chấm điểm Đóng hàng ULD (0–100đ)', 'Complete & Grade ULD Build-up (0–100pt)')}
        </button>
      </div>
    `;
  }

  // Bind Event Listeners cleanly
  host.querySelectorAll('[data-uld-mission]').forEach(b => {
    b.onclick = () => {
      initUldMission(b.dataset.uldMission);
      if (uldScene) { uldScene.setCameraView('iso'); uldScene.syncAll(); }
      renderUldBuildupUI();
    };
  });
  host.querySelectorAll('[data-uld-pick]').forEach(b => {
    b.onclick = () => {
      uldSimState.uldId = b.dataset.uldPick;
      initUldMission('FREE');
      if (uldScene) { uldScene.setCameraView('iso'); uldScene.syncAll(); }
      renderUldBuildupUI();
    };
  });
  const demoBtn = document.getElementById('uld-btn-autodemo');
  if (demoBtn) demoBtn.onclick = () => runAutoDemoBuild();
  const rstBtn = document.getElementById('uld-btn-reset');
  if (rstBtn) rstBtn.onclick = () => { initUldMission(uldSimState.missionId); if (uldScene) uldScene.syncAll(); renderUldBuildupUI(); };

  host.querySelectorAll('[data-uld-cam]').forEach(b => {
    b.onclick = () => { if (uldScene) uldScene.setCameraView(b.dataset.uldCam); };
  });
  const cntBtn = document.getElementById('uld-toggle-contour');
  if (cntBtn) {
    cntBtn.onclick = () => {
      uldSimState.showContour = !uldSimState.showContour;
      if (uldScene) uldScene.syncUldStructure();
      renderUldBuildupUI();
    };
  }

  host.querySelectorAll('[data-uld-mode]').forEach(b => {
    b.onclick = () => {
      uldSimState.handlingMode = b.dataset.uldMode;
      if (uldSimState.handlingMode === 'hand') uldSimState.selectedPalletId = 'NONE';
      else if (uldSimState.selectedPalletId === 'NONE') uldSimState.selectedPalletId = 'T11_110';
      if (uldScene) uldScene.syncGhost();
      renderUldBuildupUI();
    };
  });

  const palSel = document.getElementById('uld-pallet-sel');
  if (palSel) {
    palSel.onchange = () => {
      uldSimState.selectedPalletId = palSel.value;
      if (uldScene) uldScene.syncGhost();
      renderUldBuildupUI();
    };
  }
  const freeSel = document.getElementById('uld-free-tpl');
  if (freeSel) {
    freeSel.onchange = () => {
      uldSimState.freeTpl = freeSel.value;
      const ct = CARGO_TEMPLATES[uldSimState.freeTpl];
      uldSimState.handlingMode = ct.mode;
      uldSimState.selectedPalletId = ct.mode === 'forklift' ? (ct.recPallets?.[0] || 'T11_110') : 'NONE';
      if (uldScene) uldScene.syncGhost();
      renderUldBuildupUI();
    };
  }

  host.querySelectorAll('[data-uld-q]').forEach(b => {
    b.onclick = () => {
      uldSimState.selectedQueueId = b.dataset.uldQ;
      const q = uldSimState.queue.find(x => x.id === uldSimState.selectedQueueId);
      if (q) {
        const ct = CARGO_TEMPLATES[q.tpl];
        uldSimState.handlingMode = ct.mode;
        uldSimState.selectedPalletId = ct.mode === 'forklift' ? (ct.recPallets?.[0] || 'T11_110') : 'NONE';
      }
      if (uldScene) uldScene.syncGhost();
      renderUldBuildupUI();
    };
  });

  const rotBtn = document.getElementById('uld-btn-rot');
  if (rotBtn) {
    rotBtn.onclick = () => {
      uldSimState.rot90 = !uldSimState.rot90;
      if (uldScene) uldScene.syncGhost();
      renderUldBuildupUI();
    };
  }
  const invBtn = document.getElementById('uld-btn-invert');
  if (invBtn) {
    invBtn.onclick = () => {
      uldSimState.invertTest = !uldSimState.invertTest;
      if (uldScene) uldScene.syncGhost();
      renderUldBuildupUI();
    };
  }

  host.querySelectorAll('[data-uld-nudge]').forEach(b => {
    b.onclick = () => {
      const [dx, dz] = b.dataset.uldNudge.split(',').map(Number);
      uldSimState.cursorXCm = Math.max(-uld.baseL * 0.5, Math.min(uld.baseL * 0.5, uldSimState.cursorXCm + dx));
      uldSimState.cursorZCm = Math.max(-uld.baseW * 0.5, Math.min(uld.baseW * 0.5, uldSimState.cursorZCm + dz));
      if (uldScene) uldScene.syncGhost();
      renderUldBuildupUI();
    };
  });

  const placeBtn = document.getElementById('uld-btn-place');
  if (placeBtn) placeBtn.onclick = () => placeSelectedAt(uldSimState.cursorXCm, uldSimState.cursorZCm);

  const undoBtn = document.getElementById('uld-btn-undo');
  if (undoBtn) {
    undoBtn.onclick = () => {
      const popped = uldSimState.placedItems.pop();
      if (popped && popped.queueId) {
        const q = uldSimState.queue.find(x => x.id === popped.queueId);
        if (q) q.placed = false;
        uldSimState.selectedQueueId = popped.queueId;
      }
      uldSimState.gradeReport = null;
      if (uldScene) uldScene.syncAll();
      renderUldBuildupUI();
    };
  }

  const chkWp = document.getElementById('uld-chk-wp');
  if (chkWp) chkWp.onchange = () => { uldSimState.waterproof = chkWp.checked; if (uldScene) uldScene.syncFinishLayers(); renderUldBuildupUI(); };
  const chkTd = document.getElementById('uld-chk-td');
  if (chkTd) chkTd.onchange = () => { uldSimState.tiedown = chkTd.checked; if (uldScene) uldScene.syncFinishLayers(); renderUldBuildupUI(); };
  const chkNet = document.getElementById('uld-chk-net');
  if (chkNet) chkNet.onchange = () => { uldSimState.netOrDoor = chkNet.checked; if (uldScene) uldScene.syncFinishLayers(); renderUldBuildupUI(); };

  const gradeBtn = document.getElementById('uld-btn-grade');
  if (gradeBtn) {
    gradeBtn.onclick = () => {
      const res = analyzeUldBuild(uldSimState);
      uldSimState.gradeReport = res;
      if (res.passed && uldSimState.missionId !== 'FREE') {
        if (!Array.isArray(appState.uldSolved)) appState.uldSolved = [];
        if (!appState.uldSolved.includes(uldSimState.missionId)) {
          appState.uldSolved.push(uldSimState.missionId);
          saveState();
          updateProgressBadges();
        }
      }
      renderUldBuildupUI();
    };
  }

  ensureUldScene();
}
