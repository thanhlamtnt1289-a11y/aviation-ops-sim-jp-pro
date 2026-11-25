// Pure Weight & Balance, Weather/Runway, Consequence Engine, Glass-Cockpit SVGs & 13 Unit Tests
import { AIRCRAFT_PROFILES, WB_SCENARIOS } from '../data/aircraft.js';

export const KG_TO_LB = 2.2046226218;
export function kgToLb(kg) { return kg * KG_TO_LB; }
export function lbToKg(lb) { return lb / KG_TO_LB; }
export function fmtWeight(kg, unit = 'kg', decimals = 0) {
  const val = unit === 'lb' ? kgToLb(kg) : kg;
  return val.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function interpolateCurve(points, weight) {
    if (weight <= points[0].w) return points[0].mac;
    const last = points[points.length - 1];
    if (weight >= last.w) return last.mac;
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      if (weight >= p1.w && weight <= p2.w) {
        const ratio = (weight - p1.w) / (p2.w - p1.w);
        return p1.mac + ratio * (p2.mac - p1.mac);
      }
    }
    return last.mac;
  }

  export function getEnvelopeLimitsAtWeight(profile, weight) {
    return {
      fwdMac: interpolateCurve(profile.envelope.fwd, weight),
      aftMac: interpolateCurve(profile.envelope.aft, weight)
    };
  }

  // HÀM THUẦN (PURE FUNCTION) TÍNH TOÁN WEIGHT & BALANCE
  // Đầu vào: input (tất cả trọng lượng tính bằng kg), profile (cấu hình máy bay)
  export function calculateWeightAndBalance(input, profile) {
    const dow = Math.max(0, Number(input.dow ?? profile.dow));
    const dowArm = Number(input.dowArm ?? profile.dowArm);
    const stdPaxWt = Math.max(1, Number(input.stdPaxWt ?? 75));

    const items = [];
    const violations = [];

    // 1. DOW (運航自重)
    const dowMoment = dow * dowArm;
    items.push({ key: 'DOW', labelJa: '運航自重 (DOW)', labelVi: 'Trọng lượng rỗng khai thác (DOW)', weight: dow, arm: dowArm, moment: dowMoment });

    // 2. Hành khách theo khoang (旅客)
    let totalPaxCount = 0;
    let totalPaxWeight = 0;
    let totalPaxMoment = 0;
    const paxByZone = {};
    profile.paxZones.forEach(z => {
      const count = Math.max(0, Number((input.pax && input.pax[z.id]) || 0));
      const wt = count * stdPaxWt;
      const mom = wt * z.arm;
      paxByZone[z.id] = { count, weight: wt, arm: z.arm, moment: mom, maxPax: z.maxPax };
      totalPaxCount += count;
      totalPaxWeight += wt;
      totalPaxMoment += mom;
      items.push({ key: `PAX_${z.id}`, labelJa: `旅客 ${z.labelJa} (${count}名)`, labelVi: `Hành khách ${z.labelVi} (${count})`, weight: wt, arm: z.arm, moment: mom });
      if (count > z.maxPax) {
        violations.push({
          code: 'PAX_ZONE_LIMIT',
          severity: 'error',
          zone: z.id,
          ja: `${z.labelJa}の定員超過（${count}名 / 上限${z.maxPax}名）`,
          vi: `Vượt số ghế ${z.labelVi} (${count} / tối đa ${z.maxPax} khách)`
        });
      }
    });

    // 3. Hành lý, hàng rời & ULD theo từng hầm
    const holdSummary = {};
    profile.holds.forEach(h => {
      const bag = Math.max(0, Number((input.holds && input.holds[h.id] && input.holds[h.id].bag) || 0));
      const cargo = Math.max(0, Number((input.holds && input.holds[h.id] && input.holds[h.id].cargo) || 0));
      const looseWt = bag + cargo;
      const looseMom = looseWt * h.arm;
      holdSummary[h.id] = {
        id: h.id,
        labelJa: h.labelJa,
        labelVi: h.labelVi,
        arm: h.arm,
        maxWeight: h.maxWeight,
        bag,
        cargo,
        uldWeight: 0,
        uldMoment: 0,
        totalWeight: looseWt,
        totalMoment: looseMom,
        ulds: []
      };
      if (looseWt > 0) {
        items.push({
          key: `HOLD_${h.id}`,
          labelJa: `${h.labelJa} (手荷物+バラ貨物)`,
          labelVi: `${h.labelVi} (Hành lý + Hàng rời)`,
          weight: looseWt,
          arm: h.arm,
          moment: looseMom
        });
      }
    });

    // Cộng dồn ULD vào từng vị trí và hầm tương ứng
    let totalUldWeight = 0;
    let totalUldMoment = 0;
    profile.uldPositions.forEach(pos => {
      const wt = Math.max(0, Number((input.ulds && input.ulds[pos.id]) || 0));
      const mom = wt * pos.arm;
      totalUldWeight += wt;
      totalUldMoment += mom;
      const hs = holdSummary[pos.holdId];
      if (hs) {
        hs.uldWeight += wt;
        hs.uldMoment += mom;
        hs.totalWeight += wt;
        hs.totalMoment += mom;
        hs.ulds.push({ id: pos.id, type: pos.type, weight: wt, arm: pos.arm, maxWeight: pos.maxWeight });
      }
      if (wt > 0) {
        items.push({
          key: `ULD_${pos.id}`,
          labelJa: `ULD位置 ${pos.id} (${pos.type})`,
          labelVi: `Vị trí ULD ${pos.id} (${pos.type})`,
          weight: wt,
          arm: pos.arm,
          moment: mom
        });
      }
      if (wt > pos.maxWeight) {
        violations.push({
          code: 'ULD_POS_LIMIT',
          severity: 'error',
          pos: pos.id,
          excessKg: wt - pos.maxWeight,
          ja: `ULD位置 ${pos.id} の許容重量超過（+${Math.round(wt - pos.maxWeight)} kg）`,
          vi: `Vị trí ULD ${pos.id} vượt tải cho phép (+${Math.round(wt - pos.maxWeight)} kg)`
        });
      }
    });

    // Kiểm tra giới hạn cấu trúc từng hầm
    let totalDeadloadWeight = 0;
    let totalDeadloadMoment = 0;
    Object.values(holdSummary).forEach(hs => {
      totalDeadloadWeight += hs.totalWeight;
      totalDeadloadMoment += hs.totalMoment;
      if (hs.totalWeight > hs.maxWeight) {
        violations.push({
          code: 'HOLD_LIMIT',
          severity: 'error',
          holdId: hs.id,
          excessKg: hs.totalWeight - hs.maxWeight,
          ja: `${hs.labelJa} 構造制限超過（${Math.round(hs.totalWeight)} / 上限 ${hs.maxWeight} kg、超過 +${Math.round(hs.totalWeight - hs.maxWeight)} kg）`,
          vi: `${hs.labelVi} vượt giới hạn cấu trúc (${Math.round(hs.totalWeight)} / tối đa ${hs.maxWeight} kg, dư +${Math.round(hs.totalWeight - hs.maxWeight)} kg)`
        });
      }
    });

    // 4. Tổng tải thương mại (Payload) & ZFW
    const payload = totalPaxWeight + totalDeadloadWeight;
    const zfw = dow + payload;
    const zfwMoment = dowMoment + totalPaxMoment + totalDeadloadMoment;
    const zfwCgArm = zfw > 0 ? zfwMoment / zfw : 0;
    const zfwMac = ((zfwCgArm - profile.lemac) / profile.mac) * 100;

    // 5. Nhiên liệu (Block, Taxi, Trip) & TOW, LW
    const blockFuel = Math.max(0, Number((input.fuel && input.fuel.block) || 0));
    const taxiFuel = Math.max(0, Number((input.fuel && input.fuel.taxi) || 0));
    const tripFuel = Math.max(0, Number((input.fuel && input.fuel.trip) || 0));

    const takeoffFuel = Math.max(0, blockFuel - taxiFuel);
    const landingFuel = Math.max(0, takeoffFuel - tripFuel);

    if (taxiFuel > blockFuel) {
      violations.push({
        code: 'FUEL_INVALID',
        severity: 'error',
        ja: 'タキシー燃料がブロック燃料を上回っています',
        vi: 'Taxi fuel lớn hơn Block fuel (dữ liệu nhiên liệu không hợp lệ)'
      });
    }
    if (tripFuel > takeoffFuel) {
      violations.push({
        code: 'FUEL_INSUFFICIENT',
        severity: 'error',
        ja: 'トリップ燃料が離陸時燃料を上回っています（予備燃料不足）',
        vi: 'Trip fuel lớn hơn nhiên liệu cất cánh (thiếu nhiên liệu bay)'
      });
    }
    if (blockFuel > profile.maxFuel) {
      violations.push({
        code: 'FUEL_TANK_LIMIT',
        severity: 'error',
        excessKg: blockFuel - profile.maxFuel,
        ja: `搭載燃料がタンク容量を超過（上限 ${profile.maxFuel} kg）`,
        vi: `Nhiên liệu vượt sức chứa bình chứa (tối đa ${profile.maxFuel} kg)`
      });
    }

    const tow = zfw + blockFuel - taxiFuel;
    const towFuelMoment = takeoffFuel * profile.fuelArm;
    const towMoment = zfwMoment + towFuelMoment;
    const towCgArm = tow > 0 ? towMoment / tow : 0;
    const towMac = ((towCgArm - profile.lemac) / profile.mac) * 100;

    const lw = tow - tripFuel;
    const lwFuelMoment = landingFuel * profile.fuelArm;
    const lwMoment = zfwMoment + lwFuelMoment;
    const lwCgArm = lw > 0 ? lwMoment / lw : 0;
    const lwMac = ((lwCgArm - profile.lemac) / profile.mac) * 100;

    // DOI & Index tham khảo
    const doi = profile.indexConstant + ((dow * (dowArm - profile.indexRefArm)) / profile.indexDivisor);
    const lizi = profile.indexConstant + ((zfw * (zfwCgArm - profile.indexRefArm)) / profile.indexDivisor);
    const litow = profile.indexConstant + ((tow * (towCgArm - profile.indexRefArm)) / profile.indexDivisor);

    // 6. Kiểm tra giới hạn trọng lượng cấu trúc (MZFW / MTOW / MLW)
    if (zfw > profile.mzfw) {
      violations.push({
        code: 'MZFW_EXCEEDED',
        severity: 'error',
        excessKg: zfw - profile.mzfw,
        ja: `ZFW超過（${Math.round(zfw)} kg > MZFW ${profile.mzfw} kg、超過 +${Math.round(zfw - profile.mzfw)} kg）`,
        vi: `Vượt MZFW (${Math.round(zfw)} kg > giới hạn ${profile.mzfw} kg, vượt +${Math.round(zfw - profile.mzfw)} kg)`
      });
    }
    if (tow > profile.mtow) {
      violations.push({
        code: 'MTOW_EXCEEDED',
        severity: 'error',
        excessKg: tow - profile.mtow,
        ja: `TOW超過（${Math.round(tow)} kg > MTOW ${profile.mtow} kg、超過 +${Math.round(tow - profile.mtow)} kg）`,
        vi: `Vượt MTOW (${Math.round(tow)} kg > giới hạn ${profile.mtow} kg, vượt +${Math.round(tow - profile.mtow)} kg)`
      });
    }
    if (lw > profile.mlw) {
      violations.push({
        code: 'MLW_EXCEEDED',
        severity: 'error',
        excessKg: lw - profile.mlw,
        ja: `LW超過（${Math.round(lw)} kg > MLW ${profile.mlw} kg、超過 +${Math.round(lw - profile.mlw)} kg）`,
        vi: `Vượt MLW (${Math.round(lw)} kg > giới hạn ${profile.mlw} kg, vượt +${Math.round(lw - profile.mlw)} kg)`
      });
    }

    // 7. Kiểm tra CG Envelope cho ZFW, TOW và LW
    const zfwLim = getEnvelopeLimitsAtWeight(profile, zfw);
    const towLim = getEnvelopeLimitsAtWeight(profile, tow);
    const lwLim = getEnvelopeLimitsAtWeight(profile, lw);

    const checkCg = (phase, mac, lim, wt) => {
      if (mac < lim.fwdMac) {
        violations.push({
          code: `CG_FWD_${phase}`,
          severity: 'error',
          phase,
          mac,
          limit: lim.fwdMac,
          weight: wt,
          ja: `${phase} 重心が前方限界を逸脱（${mac.toFixed(1)}% MAC < 前方限界 ${lim.fwdMac.toFixed(1)}% MAC）— 機首下げ傾向`,
          vi: `CG tại ${phase} quá lệch trước (${mac.toFixed(1)}% MAC < giới hạn trước ${lim.fwdMac.toFixed(1)}% MAC)`
        });
      } else if (mac > lim.aftMac) {
        violations.push({
          code: `CG_AFT_${phase}`,
          severity: 'error',
          phase,
          mac,
          limit: lim.aftMac,
          weight: wt,
          ja: `${phase} 重心が後方限界を逸脱（${mac.toFixed(1)}% MAC > 後方限界 ${lim.aftMac.toFixed(1)}% MAC）— 縦安定性低下・尻もち危険`,
          vi: `CG tại ${phase} quá lệch sau (${mac.toFixed(1)}% MAC > giới hạn sau ${lim.aftMac.toFixed(1)}% MAC) — nguy cơ mất ổn định dọc / tail-tipping`
        });
      }
    };

    checkCg('ZFW', zfwMac, zfwLim, zfw);
    checkCg('TOW', towMac, towLim, tow);
    checkCg('LW', lwMac, lwLim, lw);

    // Tính tải trọng tối đa còn lại trước LMC (Underload before LMC)
    const allowedPayloadByZfw = profile.mzfw - dow;
    const allowedPayloadByTow = profile.mtow - dow - takeoffFuel;
    const allowedPayloadByLw = profile.mlw - dow - landingFuel;
    const allowedTrafficLoad = Math.min(allowedPayloadByZfw, allowedPayloadByTow, allowedPayloadByLw);
    const underloadBeforeLmc = allowedTrafficLoad - payload;

    // Tính hiệu năng cất cánh, góc Trim đuôi ngang (THS) & biên độ đường băng theo Sân bay + Thời tiết (hàm thuần, mô phỏng đào tạo)
    const WB_AIRPORT_RWYS = { NGO: 3500, HND: 3000, NRT: 4000, KIX: 3500, CTS: 3000 };
    const env = (input && input.env) || { airport: 'NGO', oatC: 15, windKt: 0, surface: 'DRY' };
    const airportCode = WB_AIRPORT_RWYS[env.airport] ? env.airport : 'NGO';
    const runwayLengthM = WB_AIRPORT_RWYS[airportCode];
    const oatC = Number.isFinite(Number(env.oatC)) ? Number(env.oatC) : 15;
    const windKt = Number.isFinite(Number(env.windKt)) ? Number(env.windKt) : 0; // + Headwind, - Tailwind
    const surface = env.surface || 'DRY';

    const perfCfg = profile.perf || { v1Base: 140, vrBase: 146, v2Base: 154, minRunwayM: 1650, mtowRunwayM: 2400, tailStrikePitchDeg: 11.0, tipMacOffset: 2.5 };
    const trCfg = profile.trimRange || { fwdUnits: 3.2, aftUnits: -1.6, optMac: 27.0 };

    // Ảnh hưởng nhiệt độ cao (Hot OAT giảm mật độ không khí → giảm lực nâng/đẩy), gió xuôi/ngược và mặt băng ướt/tuyết!
    const hotDeltaC = Math.max(0, oatC - 15);
    const oatPenaltyKg = Math.round(hotDeltaC * profile.mtow * 0.0022); // ~0.22% MTOW/°C trên ISA
    const tailwindPenaltyKg = windKt < 0 ? Math.round(Math.abs(windKt) * profile.mtow * 0.0045) : 0;
    const surfacePenaltyKg = surface === 'SNOW' ? Math.round(profile.mtow * 0.055) : (surface === 'WET' ? Math.round(profile.mtow * 0.018) : 0);
    const effectiveMtow = Math.max(profile.mzfw, profile.mtow - oatPenaltyKg - tailwindPenaltyKg - surfacePenaltyKg);

    const wRatio = Math.max(0.55, tow / profile.mtow);
    const vScale = Math.sqrt(wRatio);
    const v1SurfaceAdj = surface === 'SNOW' ? -10 : (surface === 'WET' ? -4 : 0);
    const vrKt = Math.round(perfCfg.vrBase * vScale + hotDeltaC * 0.12);
    const v1Kt = Math.max(80, Math.min(vrKt - 2, Math.round(perfCfg.v1Base * vScale + v1SurfaceAdj)));
    const v2Kt = Math.round(perfCfg.v2Base * vScale + hotDeltaC * 0.12);

    // Nội suy góc Trim đuôi ngang (THS / Stabilizer Trim) từ %MAC tại TOW
    const macSpan = Math.max(1, towLim.aftMac - towLim.fwdMac);
    const macFrac = (towMac - towLim.fwdMac) / macSpan;
    const stabTrimUnits = trCfg.fwdUnits + macFrac * (trCfg.aftUnits - trCfg.fwdUnits);
    const stabTrimLabel = profile.trimStyle === 'airbus'
      ? (stabTrimUnits >= 0 ? `UP ${stabTrimUnits.toFixed(1)}` : `DN ${Math.abs(stabTrimUnits).toFixed(1)}`)
      : `${stabTrimUnits.toFixed(1)} U`;

    // Cự ly đường băng cần thiết (tính cả CG lệch trước, nhiệt độ cao, gió ngược/xuôi, đường băng ướt/tuyết và vượt MTOW!)
    const fwdPenaltyM = towMac < trCfg.optMac ? Math.round((trCfg.optMac - towMac) * 22) : 0;
    const overMtowPenaltyM = tow > profile.mtow ? Math.round(((tow - profile.mtow) / profile.mtow) * 4200) : 0;
    const normW = Math.max(0, (tow - profile.dow) / Math.max(1, profile.mtow - profile.dow));
    const baseFieldM = perfCfg.minRunwayM + (perfCfg.mtowRunwayM - perfCfg.minRunwayM) * Math.pow(normW, 1.35);
    const oatFactor = 1 + hotDeltaC * 0.0085;
    const windFactor = windKt >= 0 ? Math.max(0.78, 1 - windKt * 0.008) : (1 + Math.abs(windKt) * 0.028);
    const surfaceFactor = surface === 'SNOW' ? 1.34 : (surface === 'WET' ? 1.13 : 1.0);
    const requiredRunwayM = Math.round(baseFieldM * oatFactor * windFactor * surfaceFactor + fwdPenaltyM + overMtowPenaltyM);
    const envPenaltyM = Math.round(requiredRunwayM - (baseFieldM + fwdPenaltyM + overMtowPenaltyM));
    const ngoRunwayM = runwayLengthM;
    const runwayMarginM = runwayLengthM - requiredRunwayM;

    const zfwPct = (zfw / profile.mzfw) * 100;
    const towPct = (tow / profile.mtow) * 100;
    const lwPct = (lw / profile.mlw) * 100;
    const aftMarginZfw = zfwLim.aftMac - zfwMac;
    const aftMarginTow = towLim.aftMac - towMac;
    const fwdMarginTow = towMac - towLim.fwdMac;
    const tailTippingRisk = (zfwMac > zfwLim.aftMac + perfCfg.tipMacOffset) || (towMac > towLim.aftMac + perfCfg.tipMacOffset)
      ? 'CRITICAL'
      : ((aftMarginZfw < 0 || aftMarginTow < 0) ? 'HIGH' : (aftMarginTow < 2.0 ? 'ELEVATED' : 'LOW'));
    const tailStrikeRisk = (aftMarginTow < 0 || (perfCfg.tailStrikePitchDeg <= 10.0 && aftMarginTow < 2.5))
      ? (aftMarginTow < -1.5 ? 'CRITICAL' : 'HIGH')
      : (aftMarginTow < 3.0 ? 'ELEVATED' : 'LOW');

    const performance = {
      airportCode, oatC, windKt, surface,
      effectiveMtow, oatPenaltyKg, envPenaltyM,
      v1Kt, vrKt, v2Kt,
      stabTrimUnits,
      stabTrimLabel,
      requiredRunwayM,
      runwayLengthM,
      ngoRunwayM,
      runwayMarginM,
      fwdPenaltyM,
      zfwPct, towPct, lwPct,
      aftMarginZfw, aftMarginTow, fwdMarginTow,
      tailTippingRisk,
      tailStrikeRisk,
      tailStrikePitchDeg: perfCfg.tailStrikePitchDeg
    };

    const result = {
      status: violations.length === 0 ? 'PASS' : 'FAIL',
      dow,
      dowArm,
      doi,
      lizi,
      litow,
      totalPaxCount,
      totalPaxWeight,
      totalDeadloadWeight,
      payload,
      blockFuel,
      taxiFuel,
      tripFuel,
      takeoffFuel,
      landingFuel,
      zfw,
      zfwMoment,
      zfwCgArm,
      zfwMac,
      zfwLimits: zfwLim,
      tow,
      towMoment,
      towCgArm,
      towMac,
      towLimits: towLim,
      lw,
      lwMoment,
      lwCgArm,
      lwMac,
      lwLimits: lwLim,
      underloadBeforeLmc,
      performance,
      paxByZone,
      holdSummary,
      items,
      violations
    };

    result.suggestions = generateWbSuggestions(result, profile);
    return result;
  }

  // HÀM THUẦN PHÂN TÍCH HỆ QUẢ KHI TÍNH TOÁN SAI W&B HOẶC QUÊN KHAI BÁO TẢI (LMC ERROR)
  export function analyzeWbConsequences(input, plannedRes, profile, simError) {
    const err = simError || { unreportedAftKg: 0, unreportedFwdKg: 0 };
    const addAft = Math.max(0, Number(err.unreportedAftKg) || 0);
    const addFwd = Math.max(0, Number(err.unreportedFwdKg) || 0);
    const hasHiddenErr = addAft > 0 || addFwd > 0;

    // Tính trạng thái VẬT LÝ THỰC TẾ của tàu bay nếu có tải quên khai báo (không có trên Load Sheet!)
    let actualRes = plannedRes;
    if (hasHiddenErr) {
      const actualInput = structuredClone(input);
      actualInput.holds = actualInput.holds || {};
      const fwdHoldId = profile.holds[0].id;
      const aftHoldId = profile.holds[profile.holds.length > 1 ? 1 : 0].id;
      actualInput.holds[fwdHoldId] = actualInput.holds[fwdHoldId] || { bag: 0, cargo: 0 };
      actualInput.holds[aftHoldId] = actualInput.holds[aftHoldId] || { bag: 0, cargo: 0 };
      actualInput.holds[fwdHoldId].cargo = (Number(actualInput.holds[fwdHoldId].cargo) || 0) + addFwd;
      actualInput.holds[aftHoldId].cargo = (Number(actualInput.holds[aftHoldId].cargo) || 0) + addAft;
      actualRes = calculateWeightAndBalance(actualInput, profile);
    }

    const macShift = actualRes.towMac - plannedRes.towMac;
    const trimDelta = actualRes.performance.stabTrimUnits - plannedRes.performance.stabTrimUnits;
    const vrDelta = actualRes.performance.vrKt - plannedRes.performance.vrKt;
    const consequences = [];
    const stressFlags = { tailTip: false, tailStrike: false, noseHeavy: false, wingBend: false, gearCrush: false, floorCrack: false, rwyOverrun: false, trimMismatch: false };
    let visualPitchDeg = 0;

    // 1. Sai lệch Trim & V-Speed do quên khai báo LMC / nhập sai Load Sheet
    if (hasHiddenErr) {
      stressFlags.trimMismatch = true;
      consequences.push({
        id: 'LMC_TRIM_MISMATCH',
        severity: Math.abs(macShift) >= 3.0 || actualRes.status === 'FAIL' ? 'CRITICAL' : 'SEVERE',
        ja: `【LMC未報告・トリム誤設定】実重量が +${Math.round(addAft + addFwd)} kg 増加し、実CGが ${macShift >= 0 ? '+' : ''}${macShift.toFixed(1)}% MAC 移動！操縦席には誤ったトリム（${plannedRes.performance.stabTrimLabel} vs 真値 ${actualRes.performance.stabTrimLabel}）とVR（${vrDelta >= 0 ? '+' : ''}${vrDelta} kt誤差）が入力されます。`,
        vi: `[LỖI QUÊN KHAI BÁO LMC / SAI TRIM] Khối lượng thực tăng +${Math.round(addAft + addFwd)} kg kéo CG thực lệch ${macShift >= 0 ? '+' : ''}${macShift.toFixed(1)}% MAC! Phi công cài SAI Stabilizer Trim (${plannedRes.performance.stabTrimLabel} thay vì ${actualRes.performance.stabTrimLabel}) và sai tốc độ VR (${vrDelta >= 0 ? '+' : ''}${vrDelta} kt).`,
        sopJa: '対策: 最後の1個までLMC（Last Minute Change）をロードコントローラーへ即報告し、基準値超過時はLoad Sheetを再発行。',
        sopVi: 'Phòng ngừa: Mọi thay đổi giờ chót (LMC) vượt ngưỡng bắt buộc báo ngay Load Control để tái phát hành Load Sheet & cập nhật THS Trim.'
      });
    }

    // 2. Sập đuôi trên sân đỗ (Ground Tail-Tipping / 尻もち)
    if (actualRes.performance.tailTippingRisk === 'CRITICAL') {
      stressFlags.tailTip = true;
      visualPitchDeg = 14.5;
      consequences.push({
        id: 'GROUND_TAIL_TIPPING',
        severity: 'CRITICAL',
        ja: `【駐機中テールティッピング（尻もち事故）】実CG（ZFW ${actualRes.zfwMac.toFixed(1)}% MAC）が後方限界（${actualRes.zfwLimits.aftMac.toFixed(1)}%）を大幅超過！主脚を支点に機首が浮き上がり、後部胴体がエプロンへ激突して圧力隔壁が大破・作業員負傷の危険。`,
        vi: `[SẬP ĐUÔI TRÊN SÂN ĐỖ / TAIL-TIPPING] CG thực (${actualRes.zfwMac.toFixed(1)}% MAC) vượt xa giới hạn sau (${actualRes.zfwLimits.aftMac.toFixed(1)}%)! Càng mũi nhấc bổng khỏi mặt sân đỗ, đuôi máy bay đập mạnh xuống bê tông gây vỡ vách áp suất & tai nạn cho nhân viên mặt đất.`,
        sopJa: '対策: 搭載は「前部から積み、後部から降ろす（Fwd-first load / Aft-first offload）」原則を徹底。貨物機はテールスタンド使用。',
        sopVi: 'Phòng ngừa: Tuân thủ tuyệt đối nguyên tắc "Xếp từ hầm trước ra sau — Dỡ từ hầm sau lên trước"; dùng Tail Stand cho tàu bay chở hàng.'
      });
    }

    // 3. Quệt đuôi khi cất cánh & Mất ổn định dọc (Tail-Strike & Stall)
    if (actualRes.violations.some(v => v.code.startsWith('CG_AFT_'))) {
      stressFlags.tailStrike = true;
      if (visualPitchDeg < 9.5) visualPitchDeg = 11.0;
      consequences.push({
        id: 'AFT_CG_TAIL_STRIKE',
        severity: 'CRITICAL',
        ja: `【離陸時テールストライク・縦安定性喪失】TOW CG ${actualRes.towMac.toFixed(1)}% MAC > 後方限界 ${actualRes.towLimits.aftMac.toFixed(1)}%。機首上げ操作が過敏になり、VRで意図せず急ピッチアップ→滑走路に尾部接触（限界角 ${profile.perf.tailStrikePitchDeg}°）および失速（Stall）からの回復困難！`,
        vi: `[QUỆT ĐUÔI TAIL-STRIKE & MẤT ỔN ĐỊNH DỌC] CG cất cánh ${actualRes.towMac.toFixed(1)}% MAC > giới hạn sau ${actualRes.towLimits.aftMac.toFixed(1)}%. Mũi máy bay ngóc đột ngột vượt góc quệt đuôi (${profile.perf.tailStrikePitchDeg}°) tại VR, đồng thời giảm mạnh ổn định dọc — cực khó thoát thất tốc (Stall).`,
        sopJa: '対策: 後部/バルク貨物を前部貨物室へ移載し、旅客も前方ゾーンへ再配席して余裕のある%MACを確保。',
        sopVi: 'Phòng ngừa: Dời hàng/ULD từ hầm sau & Bulk lên hầm trước, điều phối khách ngồi đều về phía trước để kéo %MAC vào vùng giữa.'
      });
    }

    // 4. Nặng mũi không thể ngóc đầu cất cánh (Forward CG / Failure to Rotate)
    if (actualRes.violations.some(v => v.code.startsWith('CG_FWD_'))) {
      stressFlags.noseHeavy = true;
      visualPitchDeg = -5.5;
      consequences.push({
        id: 'FWD_CG_NO_ROTATE',
        severity: 'CRITICAL',
        ja: `【ノーズヘビー・機首上げ不能】TOW CG ${actualRes.towMac.toFixed(1)}% MAC < 前方限界 ${actualRes.towLimits.fwdMac.toFixed(1)}%。昇降舵（エレベーター）の操舵力が不足し、VRに達しても機首が上がらず滑走路逸脱（オーバーラン）や前脚過負荷・パンクを引き起こします。`,
        vi: `[NẶNG MŨI — KHÔNG THỂ NGÓC ĐẦU CẤT CÁNH] CG cất cánh ${actualRes.towMac.toFixed(1)}% MAC < giới hạn trước ${actualRes.towLimits.fwdMac.toFixed(1)}%. Cánh lái độ cao (Elevator) không đủ lực nâng mũi tại VR → kéo dài đà chạy băng, quá tải càng mũi và nguy cơ lao khỏi cuối đường băng.`,
        sopJa: '対策: 前部貨物/ULDを後部貨物室へ移載、または燃料・旅客ゾーンを見直して前方限界から+1.5%以上内側へ調整。',
        sopVi: 'Phòng ngừa: Chuyển ULD/hàng từ hầm trước ra hầm sau hoặc phân bổ lại ghế hành khách để đưa %MAC vượt giới hạn trước ít nhất +1.5%.'
      });
    }

    // 5. Vượt MTOW (hoặc Performance-Limited MTOW do thời tiết nóng/gió xuôi/tuyết) & Trượt đường băng
    const perfMtowEx = Math.max(0, Math.round(actualRes.tow - actualRes.performance.effectiveMtow));
    if (actualRes.tow > profile.mtow || actualRes.performance.runwayMarginM < 0 || perfMtowEx > 0) {
      stressFlags.rwyOverrun = true;
      const exMtow = Math.max(0, Math.round(actualRes.tow - profile.mtow));
      consequences.push({
        id: 'MTOW_RUNWAY_OVERRUN',
        severity: 'CRITICAL',
        ja: `【MTOW / 性能制限超過・滑走路距離不足】構造超過 +${exMtow} kg / 気象性能超過 +${perfMtowEx} kg（${actualRes.performance.airportCode} ${actualRes.performance.runwayLengthM}m・${actualRes.performance.surface}・OAT ${actualRes.performance.oatC}°C）。必要滑走路長 ${actualRes.performance.requiredRunwayM} m（余裕 ${actualRes.performance.runwayMarginM} m）となり、RTOブレーキ過熱や片発上昇不能の危険！`,
        vi: `[VƯỢT MTOW / GIỚI HẠN THỜI TIẾT — THIẾU ĐƯỜNG BĂNG] Vượt cấu trúc +${exMtow} kg / vượt hiệu năng thời tiết +${perfMtowEx} kg (${actualRes.performance.airportCode} ${actualRes.performance.runwayLengthM}m · ${actualRes.performance.surface} · OAT ${actualRes.performance.oatC}°C). Cần ${actualRes.performance.requiredRunwayM} m (dư ${actualRes.performance.runwayMarginM} m) → nguy cơ trượt cuối đường băng, cháy phanh RTO hoặc không đủ lực leo 1 động cơ!`,
        sopJa: '対策: 高温・追い風・湿潤/積雪路面ではペイロードまたは余剰燃料を削減し、性能制限MTOWと滑走路長余裕を確保してください。',
        sopVi: 'Phòng ngừa: Khi trời nóng, gió xuôi hoặc mặt băng ướt/tuyết, bắt buộc giảm Payload hoặc Extra Fuel để TOW ≤ Performance-Limited MTOW và đủ cự ly đường băng.'
      });
    }

    // 6. Vượt MZFW — Gãy/quá tải uốn gốc cánh
    if (actualRes.zfw > profile.mzfw) {
      stressFlags.wingBend = true;
      const exZfw = Math.round(actualRes.zfw - profile.mzfw);
      consequences.push({
        id: 'MZFW_WING_BENDING',
        severity: 'CRITICAL',
        ja: `【MZFW超過・主翼付け根曲げ過負荷（+${exZfw} kg）】胴体重量が過大となり、飛行中・乱気流通過時に主翼の揚力と胴体荷重の釣り合いが崩れ、主翼付け根（Wing Root）の構造疲労・亀裂が発生します（燃料を減らしても解消しません）。`,
        vi: `[VƯỢT MZFW +${exZfw} kg — QUÁ TẢI UỐN GỐC CÁNH (WING ROOT)] Trọng lượng thân máy bay quá lớn so với tải giảm uốn của nhiên liệu cánh → khi gặp nhiễu động khí quyển, lực nâng cánh bẻ gập gốc cánh vượt giới hạn kết cấu (giảm xăng KHÔNG sửa được lỗi này!).`,
        sopJa: '対策: 貨物・手荷物・旅客（ペイロード）自体を必ず削減すること。',
        sopVi: 'Phòng ngừa: Bắt buộc phải cắt giảm Payload (hàng hóa / hành lý / khách), tuyệt đối không nhầm lẫn với việc cắt nhiên liệu.'
      });
    }

    // 7. Vượt MLW — Gãy càng đáp & Cháy phanh khi hạ cánh
    if (actualRes.lw > profile.mlw) {
      stressFlags.gearCrush = true;
      const exLw = Math.round(actualRes.lw - profile.mlw);
      consequences.push({
        id: 'MLW_GEAR_OVERLOAD',
        severity: 'SEVERE',
        ja: `【MLW超過・主脚構造損傷・ブレーキ過熱（+${exLw} kg）】着陸接地時の衝撃エネルギーが設計上限を超え、主脚オレオ破損・タイヤバースト・ブレーキ過熱火災・着陸距離超過の危険があります。`,
        vi: `[VƯỢT MLW +${exLw} kg — HƯ HẠI CÀNG ĐÁP & QUÁ NHIỆT PHANH] Động năng chạm bánh vượt sức chịu tải kết cấu càng chính (Main Gear), gây hư trụ thủy lực, nổ lốp, cháy hệ thống phanh và trượt cuối đường băng khi hạ cánh.`,
        sopJa: '対策: 短距離便の過剰タンカリング燃料を削減するか、ペイロードを調整してLW ≤ MLWを厳守。',
        sopVi: 'Phòng ngừa: Tránh mang thừa nhiên liệu chặng ngắn (fuel tankering) hoặc giảm payload để bảo đảm LW ≤ MLW.'
      });
    }

    // 8. Vượt tải sàn hầm / vị trí ULD — Nứt dầm sàn & đứt đường ống thủy lực
    if (actualRes.violations.some(v => v.code === 'HOLD_LIMIT' || v.code === 'ULD_POS_LIMIT')) {
      stressFlags.floorCrack = true;
      consequences.push({
        id: 'FLOOR_BEAM_FAILURE',
        severity: 'SEVERE',
        ja: `【貨物室床面・ULDロック破損】個別貨物室またはULDポジションの床面荷重上限を超過！床下を通る油圧配管・操縦索を損傷し、乱気流時にコンテナロックが破断して重心急変事故へ直結します。`,
        vi: `[QUÁ TẢI SÀN HẦM HÀNG / GÃY CHỐT KHÓA ULD] Vượt sức chịu lực cục bộ sàn hầm hoặc chốt khóa vị trí ULD → có thể nứt dầm sàn đè lên đường ống thủy lực / dây cáp điều khiển bay, hoặc bung khóa ULD khi gặp nhiễu động làm trôi hàng thay đổi CG đột ngột.`,
        sopJa: '対策: 制限超過した貨物室・ULDポジションから他位置へ分散搭載し、必ず実測計量とロック指差呼称を行う。',
        sopVi: 'Phòng ngừa: San tải đều giữa các vị trí ULD/hầm hàng, cân chính xác từng kiện và kiểm tra指差呼称 tất cả chốt khóa ULD trước khi đóng cửa hầm.'
      });
    }

    return {
      hasHiddenErr,
      addAft,
      addFwd,
      plannedRes,
      actualRes,
      macShift,
      trimDelta,
      vrDelta,
      visualPitchDeg,
      stressFlags,
      consequences,
      overallRisk: consequences.some(c => c.severity === 'CRITICAL') ? 'CRITICAL' : (consequences.length > 0 ? 'SEVERE' : 'SAFE')
    };
  }

  // Hàm thuần tạo gợi ý điều chỉnh trọng lượng & trọng tâm
  export function generateWbSuggestions(res, profile) {
    const tips = [];
    const hasCode = prefix => res.violations.some(v => v.code.startsWith(prefix));

    const fwdHold = profile.holds[0];
    const aftHold = profile.holds[1] || profile.holds[0];
    const armDiff = Math.max(1, aftHold.arm - fwdHold.arm);

    if (hasCode('HOLD_LIMIT')) {
      res.violations.filter(v => v.code === 'HOLD_LIMIT').forEach(v => {
        tips.push({
          ja: `${v.holdId} の超過分 ${Math.ceil(v.excessKg)} kg を他貨物室へ移載またはオフロードしてください。`,
          vi: `Chuyển hoặc giảm ít nhất ${Math.ceil(v.excessKg)} kg khỏi hầm ${v.holdId} sang hầm còn dư tải hoặc offload.`
        });
      });
    }

    if (hasCode('ULD_POS_LIMIT')) {
      res.violations.filter(v => v.code === 'ULD_POS_LIMIT').forEach(v => {
        tips.push({
          ja: `ULD位置 ${v.pos} を ${Math.ceil(v.excessKg)} kg 減量し、他ポジションへ分散してください。`,
          vi: `Giảm ít nhất ${Math.ceil(v.excessKg)} kg tại vị trí ULD ${v.pos} hoặc chia sang vị trí khác.`
        });
      });
    }

    if (hasCode('MZFW_EXCEEDED')) {
      const ex = Math.ceil(res.zfw - profile.mzfw);
      tips.push({
        ja: `MZFW超過: 貨物・手荷物または旅客を合計 ${ex} kg 以上削減してください（燃料削減ではZFWは減りません）。`,
        vi: `Vượt MZFW: Phải giảm tối thiểu ${ex} kg tải thương mại (hàng hóa/hành lý/hành khách). Giảm nhiên liệu KHÔNG làm giảm ZFW.`
      });
    }

    if (hasCode('MTOW_EXCEEDED')) {
      const ex = Math.ceil(res.tow - profile.mtow);
      tips.push({
        ja: `MTOW超過: ペイロードまたは余剰燃料（Extra Fuel）を合計 ${ex} kg 以上削減してください。`,
        vi: `Vượt MTOW: Giảm tối thiểu ${ex} kg tổng payload hoặc nhiên liệu dự phòng thừa (Block Fuel).`
      });
    }

    if (hasCode('MLW_EXCEEDED')) {
      const ex = Math.ceil(res.lw - profile.mlw);
      tips.push({
        ja: `MLW超過: 着陸時重量を ${ex} kg 以上減らすため、搭載貨物削減または不要な余剰燃料（タンカリング）の削減を検討してください。`,
        vi: `Vượt MLW: Cần giảm ${ex} kg trọng lượng hạ cánh bằng cách giảm payload hoặc cắt nhiên liệu thừa (tránh fuel tankering).`
      });
    }

    // Gợi ý dịch chuyển CG khi quá sau (Aft)
    const aftViol = res.violations.find(v => v.code.startsWith('CG_AFT_'));
    if (aftViol) {
      const deltaMac = (aftViol.mac - aftViol.limit) + 1.5;
      const reqArmShift = (deltaMac / 100) * profile.mac;
      const shiftKg = Math.ceil((aftViol.weight * reqArmShift) / armDiff);
      const paxArmDiff = Math.max(1, profile.paxZones[2].arm - profile.paxZones[0].arm);
      const shiftPax = Math.ceil((aftViol.weight * reqArmShift) / (75 * paxArmDiff));
      tips.push({
        ja: profile.isFreighter
          ? `CG後方逸脱対策（貨物機）: 後部デッキ/ロワー貨物室から前部（${fwdHold.id}）へ約 ${shiftKg} kg 移載してください。`
          : `CG後方逸脱対策: 後部/バルク貨物室から前部貨物室へ約 ${shiftKg} kg 移載、またはZone C旅客を約 ${shiftPax} 名 Zone Aへ移動してください。`,
        vi: profile.isFreighter
          ? `Khắc phục CG quá sau (Tàu bay chở hàng): Chuyển khoảng ${shiftKg} kg từ khu vực sau (${aftHold.id}) lên phía trước (${fwdHold.id}).`
          : `Khắc phục CG quá sau: Chuyển khoảng ${shiftKg} kg hàng từ hầm sau/bulk lên hầm trước, hoặc dời ~${shiftPax} khách từ Zone C lên Zone A.`
      });
    }

    // Gợi ý dịch chuyển CG khi quá trước (Fwd)
    const fwdViol = res.violations.find(v => v.code.startsWith('CG_FWD_'));
    if (fwdViol) {
      const deltaMac = (fwdViol.limit - fwdViol.mac) + 1.5;
      const reqArmShift = (deltaMac / 100) * profile.mac;
      const shiftKg = Math.ceil((fwdViol.weight * reqArmShift) / armDiff);
      const paxArmDiff = Math.max(1, profile.paxZones[2].arm - profile.paxZones[0].arm);
      const shiftPax = Math.ceil((fwdViol.weight * reqArmShift) / (75 * paxArmDiff));
      tips.push({
        ja: profile.isFreighter
          ? `CG前方逸脱対策（貨物機）: 前部（${fwdHold.id}）から後部（${aftHold.id}）へ約 ${shiftKg} kg 移載してください。`
          : `CG前方逸脱対策: 前部貨物室/ULDから後部貨物室へ約 ${shiftKg} kg 移載、またはZone A旅客を約 ${shiftPax} 名 Zone Cへ移動してください。`,
        vi: profile.isFreighter
          ? `Khắc phục CG quá trước (Tàu bay chở hàng): Chuyển khoảng ${shiftKg} kg từ phía trước (${fwdHold.id}) ra phía sau (${aftHold.id}).`
          : `Khắc phục CG quá trước: Chuyển khoảng ${shiftKg} kg hàng từ hầm trước/ULD ra hầm sau, hoặc dời ~${shiftPax} khách từ Zone A xuống Zone C.`
      });
    }

    return tips;
  }

  // =========================================================================

export function renderWbRadialGaugeSvg(label, actualKg, maxKg, macVal, isOk, unit) {
    const pct = Math.max(0, (actualKg / Math.max(1, maxKg)) * 100);
    const clamped = Math.min(100, pct);
    const r = 34, cx = 50, cy = 48;
    const arcLen = Math.PI * r; // Bán nguyệt 180 độ
    const dashOff = arcLen * (1 - clamped / 100);
    const strokeCol = !isOk ? '#F43F5E' : (pct > 94 ? '#F59E0B' : '#38BDF8');
    const glowCol = !isOk ? 'rgba(244,63,94,0.55)' : (pct > 94 ? 'rgba(245,158,11,0.45)' : 'rgba(56,189,248,0.5)');
    return `
      <div class="efb-gauge-card ${isOk ? '' : 'err'}">
        <svg viewBox="0 0 100 62" width="100%" style="max-width:136px;display:block;margin:0 auto;">
          <path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="rgba(148,163,184,0.22)" stroke-width="7" stroke-linecap="round"/>
          <path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="${strokeCol}" stroke-width="7" stroke-linecap="round"
            stroke-dasharray="${arcLen.toFixed(1)}" stroke-dashoffset="${dashOff.toFixed(1)}" style="filter:drop-shadow(0 0 4px ${glowCol});"/>
          <text x="${cx}" y="${cy - 14}" text-anchor="middle" font-size="8.5" font-weight="700" fill="#94A3B8" font-family="monospace">${label}</text>
          <text x="${cx}" y="${cy - 1}" text-anchor="middle" font-size="13" font-weight="800" fill="${isOk ? '#F0F9FF' : '#FDA4AF'}" font-family="monospace">${pct.toFixed(1)}%</text>
          <text x="${cx}" y="${cy + 11}" text-anchor="middle" font-size="7.5" fill="#7DD3FC" font-family="monospace">${macVal.toFixed(1)}% MAC</text>
        </svg>
        <div style="font-family:var(--font-mono);font-size:12px;font-weight:700;color:${isOk ? '#E2EEF9' : '#FDA4AF'};margin-top:2px;">${fmtWeight(actualKg, unit)} ${unit}</div>
        <div style="font-family:var(--font-mono);font-size:10px;color:#94A3B8;">MAX ${fmtWeight(maxKg, unit)} ${unit}</div>
      </div>
    `;
  }

  // Vẽ biểu đồ SVG CG Envelope phong cách Glass-Cockpit Avionics tương lai (hỗ trợ cả điểm thực tế khi tính sai LMC)
  export function renderCgEnvelopeSvg(res, profile, conseq, unit = 'kg') {
    const W = 480, H = 295;
    const pad = { top: 20, right: 26, bottom: 38, left: 64 };
    const plotW = W - pad.left - pad.right;
    const plotH = H - pad.top - pad.bottom;

    const actRes = conseq && conseq.hasHiddenErr ? conseq.actualRes : res;
    const minMac = Math.floor(Math.min(...profile.envelope.fwd.map(p => p.mac), res.towMac, actRes.towMac) - 6);
    const maxMac = Math.ceil(Math.max(...profile.envelope.aft.map(p => p.mac), res.towMac, actRes.towMac) + 6);
    const minW = Math.floor(profile.dow * 0.92 / 1000) * 1000;
    const maxW = Math.ceil(Math.max(profile.mtow, res.tow, actRes.tow) * 1.06 / 1000) * 1000;

    const sx = mac => pad.left + ((mac - minMac) / Math.max(1, maxMac - minMac)) * plotW;
    const sy = wt => pad.top + plotH - ((wt - minW) / Math.max(1, maxW - minW)) * plotH;

    const polyPts = [
      ...profile.envelope.fwd.map(p => `${sx(p.mac).toFixed(1)},${sy(p.w).toFixed(1)}`),
      ...[...profile.envelope.aft].reverse().map(p => `${sx(p.mac).toFixed(1)},${sy(p.w).toFixed(1)}`)
    ].join(' ');

    let grid = '';
    const macStep = (maxMac - minMac) > 36 ? 10 : 5;
    for (let m = Math.ceil(minMac / macStep) * macStep; m <= maxMac; m += macStep) {
      const x = sx(m);
      grid += `<line x1="${x}" y1="${pad.top}" x2="${x}" y2="${pad.top + plotH}" stroke="rgba(56,189,248,0.14)" stroke-width="1"/>`;
      grid += `<text x="${x}" y="${H - 18}" text-anchor="middle" font-size="10" fill="#94A3B8" font-family="monospace">${m}%</text>`;
    }
    const wSteps = 5;
    for (let i = 0; i <= wSteps; i++) {
      const wVal = minW + ((maxW - minW) / wSteps) * i;
      const y = sy(wVal);
      grid += `<line x1="${pad.left}" y1="${y}" x2="${pad.left + plotW}" y2="${y}" stroke="rgba(56,189,248,0.14)" stroke-width="1"/>`;
      const disp = unit === 'lb' ? Math.round(kgToLb(wVal) / 1000) + 'k lb' : Math.round(wVal / 1000) + 't';
      grid += `<text x="${pad.left - 8}" y="${y + 3}" text-anchor="end" font-size="10" fill="#94A3B8" font-family="monospace">${disp}</text>`;
    }

    const refLine = (wt, label, color) => {
      const y = sy(wt);
      return `<line x1="${pad.left}" y1="${y}" x2="${pad.left + plotW}" y2="${y}" stroke="${color}" stroke-width="1.2" stroke-dasharray="4 3"/>
              <text x="${pad.left + plotW - 3}" y="${y - 3}" text-anchor="end" font-size="9.5" font-weight="700" fill="${color}" font-family="monospace">${label}</text>`;
    };

    const clampX = x => Math.max(pad.left + 4, Math.min(pad.left + plotW - 4, x));
    const clampY = y => Math.max(pad.top + 4, Math.min(pad.top + plotH - 4, y));

    const pts = [
      { id: 'ZFW', mac: res.zfwMac, w: res.zfw, ok: res.zfw <= profile.mzfw && res.zfwMac >= res.zfwLimits.fwdMac && res.zfwMac <= res.zfwLimits.aftMac, dy: 14 },
      { id: 'TOW', mac: res.towMac, w: res.tow, ok: res.tow <= profile.mtow && res.towMac >= res.towLimits.fwdMac && res.towMac <= res.towLimits.aftMac, dy: -8 },
      { id: 'LW', mac: res.lwMac, w: res.lw, ok: res.lw <= profile.mlw && res.lwMac >= res.lwLimits.fwdMac && res.lwMac <= res.lwLimits.aftMac, dy: 4 }
    ];

    const pZ = { x: clampX(sx(res.zfwMac)), y: clampY(sy(res.zfw)) };
    const pT = { x: clampX(sx(res.towMac)), y: clampY(sy(res.tow)) };
    const pL = { x: clampX(sx(res.lwMac)), y: clampY(sy(res.lw)) };

    let ghostSvg = '';
    if (conseq && conseq.hasHiddenErr) {
      const aT = { x: clampX(sx(actRes.towMac)), y: clampY(sy(actRes.tow)) };
      ghostSvg = `
        <line x1="${pT.x}" y1="${pT.y}" x2="${aT.x}" y2="${aT.y}" stroke="#F43F5E" stroke-width="2" stroke-dasharray="4 2"/>
        <circle cx="${aT.x}" cy="${aT.y}" r="7" fill="none" stroke="#F43F5E" stroke-width="2"/>
        <circle cx="${aT.x}" cy="${aT.y}" r="3.5" fill="#F43F5E"/>
        <text x="${aT.x + 10}" y="${aT.y - 4}" font-size="10" font-weight="800" fill="#FDA4AF" font-family="monospace">ACTUAL (${actRes.towMac.toFixed(1)}%)</text>
      `;
    }

    const dots = pts.map(p => {
      const x = clampX(sx(p.mac));
      const y = clampY(sy(p.w));
      const col = p.ok ? '#34D399' : '#F43F5E';
      return `<circle cx="${x}" cy="${y}" r="6" fill="${col}" fill-opacity="0.22"/>
              <circle cx="${x}" cy="${y}" r="4.5" fill="${col}" stroke="#060D18" stroke-width="1.6"/>
              <text x="${x + 9}" y="${y + p.dy / 2}" font-size="10.5" font-weight="700" fill="${col}" font-family="monospace">${p.id} (${p.mac.toFixed(1)}%)</text>`;
    }).join('');

    return `
      <svg viewBox="0 0 ${W} ${H}" width="100%" style="display:block;max-height:300px;">
        <defs>
          <linearGradient id="envFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="#0284C7" stop-opacity="0.12"/>
          </linearGradient>
        </defs>
        ${grid}
        <polygon points="${polyPts}" fill="url(#envFill)" stroke="#38BDF8" stroke-width="2"/>
        ${refLine(profile.mtow, 'MTOW', '#FB7185')}
        ${refLine(profile.mlw, 'MLW', '#FBBF24')}
        ${refLine(profile.mzfw, 'MZFW', '#38BDF8')}
        <polyline points="${pZ.x},${pZ.y} ${pT.x},${pT.y} ${pL.x},${pL.y}" fill="none" stroke="#E2E8F0" stroke-width="1.8" stroke-dasharray="3 2"/>
        ${dots}
        ${ghostSvg}
        <text x="${pad.left + plotW / 2}" y="${H - 3}" text-anchor="middle" font-size="10.5" fill="#7DD3FC" font-family="monospace">CG POSITION (% MAC) — SAFE FLIGHT ENVELOPE</text>
      </svg>
    `;
  }

  // Sơ đồ SVG mặt cắt tàu bay mô phỏng góc nghiêng Tail-Tipping / Tail-Strike / Ứng suất kết cấu khi tính sai
  export function renderConsequenceAircraftSvg(profile, conseq) {
    const sf = conseq.stressFlags;
    const pitch = conseq.visualPitchDeg || 0;
    const isProp = profile.visual3d && profile.visual3d.isProp;
    const isWide = profile.visual3d && profile.visual3d.isWide;
    const isFreighter = profile.isFreighter;
    const pivotX = 246, pivotY = 122; // Vị trí càng chính (Main Landing Gear) làm trục xoay thực tế!
    const actMac = conseq.actualRes.towMac;
    const aftLim = conseq.actualRes.towLimits.aftMac;
    const fwdLim = conseq.actualRes.towLimits.fwdMac;
    const cgNorm = Math.max(-0.35, Math.min(1.35, (actMac - fwdLim) / Math.max(1, aftLim - fwdLim)));
    const cgX = 212 + cgNorm * 52; // Quanh vùng cánh & càng chính

    const statusCol = conseq.overallRisk === 'CRITICAL' ? '#F43F5E' : (conseq.overallRisk === 'SEVERE' ? '#F59E0B' : '#34D399');
    const pitchLabel = pitch > 12 ? `TAIL-TIPPING +${pitch.toFixed(1)}°` : (pitch > 5 ? `TAIL-STRIKE RISK +${pitch.toFixed(1)}°` : (pitch < -2 ? `NOSE-HEAVY ${pitch.toFixed(1)}°` : 'ATTITUDE NOMINAL 0.0°'));

    return `
      <svg viewBox="0 0 480 164" width="100%" style="display:block;max-height:175px;">
        <!-- Đường chân trời & Mặt sân đỗ / Đường băng -->
        <line x1="16" y1="136" x2="464" y2="136" stroke="rgba(148,163,184,0.45)" stroke-width="2"/>
        <line x1="20" y1="142" x2="460" y2="142" stroke="rgba(56,189,248,0.18)" stroke-width="1" stroke-dasharray="8 6"/>
        ${sf.rwyOverrun ? `<rect x="355" y="131" width="105" height="9" fill="rgba(244,63,94,0.55)" rx="2"/><text x="407" y="154" text-anchor="middle" font-size="9" font-weight="700" fill="#FDA4AF" font-family="monospace">RUNWAY OVERRUN ZONE</text>` : ''}

        <!-- Tàu bay xoay quanh trục càng chính (pivotX, pivotY) theo trạng thái CG thực tế -->
        <g transform="rotate(${-pitch}, ${pivotX}, ${pivotY})">
          <!-- Thân máy bay -->
          <path d="M 96 106 Q 112 90 144 90 L 348 90 Q 378 92 404 102 L 392 114 L 138 114 Q 104 114 96 106 Z"
            fill="${isFreighter ? '#334155' : '#1E3A5F'}" stroke="#7DD3FC" stroke-width="1.6"/>
          <!-- Cánh đứng đuôi -->
          <path d="M 342 90 L 378 46 L 400 46 L 386 96 Z" fill="${sf.tailTip || sf.tailStrike ? '#E11D48' : '#0284C7'}" stroke="#BAE6FD" stroke-width="1.3"/>
          <!-- Cửa sổ hoặc khoang Main Deck Cargo -->
          ${isFreighter
            ? `<rect x="152" y="94" width="186" height="12" fill="rgba(245,158,11,0.28)" stroke="#F59E0B" stroke-width="1" stroke-dasharray="5 3"/>`
            : `<line x1="148" y1="98" x2="334" y2="98" stroke="#BAE6FD" stroke-width="2.5" stroke-dasharray="4 4"/>`
          }
          <!-- Cánh chính & Động cơ -->
          <polygon points="212,108 264,108 278,118 220,118" fill="${sf.wingBend ? '#F43F5E' : '#38BDF8'}" fill-opacity="0.85"/>
          ${isProp
            ? `<ellipse cx="222" cy="100" rx="4" ry="15" fill="none" stroke="#38BDF8" stroke-width="1.8"/>`
            : `<rect x="206" y="114" width="26" height="${isWide ? 11 : 9}" rx="4" fill="#475569" stroke="#94A3B8" stroke-width="1.2"/>`
          }
          <!-- Càng mũi & Càng chính -->
          <line x1="138" y1="114" x2="138" y2="132" stroke="${sf.noseHeavy ? '#F43F5E' : '#CBD5E1'}" stroke-width="2.5"/>
          <circle cx="138" cy="133" r="4" fill="${sf.noseHeavy ? '#F43F5E' : '#E2E8F0'}"/>
          <line x1="${pivotX}" y1="114" x2="${pivotX}" y2="132" stroke="${sf.gearCrush ? '#F43F5E' : '#CBD5E1'}" stroke-width="3.2"/>
          <circle cx="${pivotX}" cy="133" r="5" fill="${sf.gearCrush ? '#F43F5E' : '#E2E8F0'}"/>

          <!-- Điểm ứng suất kết cấu phát sáng đỏ khi xảy ra lỗi -->
          ${sf.wingBend ? `<circle cx="238" cy="109" r="14" fill="rgba(244,63,94,0.35)" stroke="#F43F5E" stroke-width="2"/><text x="238" y="80" text-anchor="middle" font-size="9" font-weight="800" fill="#FDA4AF" font-family="monospace">WING ROOT OVERLOAD</text>` : ''}
          ${sf.floorCrack ? `<rect x="266" y="106" width="66" height="9" fill="rgba(245,158,11,0.45)" stroke="#FBBF24" stroke-width="1.4"/><text x="299" y="82" text-anchor="middle" font-size="8.5" font-weight="800" fill="#FDE68A" font-family="monospace">FLOOR LIMIT!</text>` : ''}
          ${sf.tailTip || sf.tailStrike ? `<circle cx="390" cy="112" r="13" fill="rgba(244,63,94,0.42)" stroke="#F43F5E" stroke-width="2"/>` : ''}
          ${sf.gearCrush ? `<circle cx="${pivotX}" cy="132" r="12" fill="rgba(244,63,94,0.38)" stroke="#F43F5E" stroke-width="2"/>` : ''}

          <!-- Con trỏ CG thực tế trên thân tàu bay -->
          <polygon points="${cgX},126 ${cgX - 5},116 ${cgX + 5},116" fill="${statusCol}"/>
          <text x="${cgX}" y="152" text-anchor="middle" font-size="9" font-weight="800" fill="${statusCol}" font-family="monospace">CG ${actMac.toFixed(1)}%</text>
        </g>

        <!-- Nhãn HUD trên cùng -->
        <text x="14" y="18" font-size="10" font-weight="700" fill="#7DD3FC" font-family="monospace">${profile.id} · ${profile.category.toUpperCase()}</text>
        <text x="466" y="18" text-anchor="end" font-size="10" font-weight="800" fill="${statusCol}" font-family="monospace">${pitchLabel}</text>
        <text x="14" y="32" font-size="9" fill="#94A3B8" font-family="monospace">TAIL-STRIKE LIMIT: ${profile.perf.tailStrikePitchDeg}° | THS: ${conseq.actualRes.performance.stabTrimLabel}</text>
      </svg>
    `;
  }

export function makeBalancedDefaultInput(p) {
  const holds = {};
  p.holds.forEach((h, idx) => {
    if (p.isFreighter) {
      holds[h.id] = { bag: 0, cargo: Math.round(h.maxWeight * (idx < 2 ? 0.25 : 0.2)) };
    } else {
      holds[h.id] = { bag: Math.round(h.maxWeight * 0.2), cargo: Math.round(h.maxWeight * 0.1) };
    }
  });
  const ulds = {};
  p.uldPositions.forEach(pos => { ulds[pos.id] = Math.round(pos.maxWeight * 0.45); });
  return {
    pax: {
      A: Math.round(p.paxZones[0].maxPax * (p.isFreighter ? 0.5 : 0.72)),
      B: Math.round(p.paxZones[1].maxPax * 0.72),
      C: Math.round(p.paxZones[2].maxPax * 0.72)
    },
    holds,
    ulds,
    fuel: {
      block: Math.round(p.maxFuel * 0.38),
      taxi: Math.round(Math.min(800, Math.max(120, p.maxFuel * 0.01))),
      trip: Math.round(p.maxFuel * 0.24)
    }
  };
}

export function runWbUnitTests() {
    const a320 = AIRCRAFT_PROFILES.A320;
    const b738 = AIRCRAFT_PROFILES.B738;
    const tests = [];

    const assert = (name, cond, detail) => tests.push({ name, pass: Boolean(cond), detail });

    // Test 1: Công thức Moment, CG_arm, %MAC chuẩn xác
    {
      const res = calculateWeightAndBalance({
        dow: 42600, dowArm: 17.65, stdPaxWt: 75,
        pax: { A: 40, B: 60, C: 40 },
        holds: { H1: { bag: 1000, cargo: 0 }, H3: { bag: 1000, cargo: 0 }, H5: { bag: 0, cargo: 0 } },
        ulds: {},
        fuel: { block: 6200, taxi: 200, trip: 3000 }
      }, a320);
      const expectedZfw = 42600 + 140 * 75 + 2000; // 55,100 kg
      const expectedMoment = 42600 * 17.65 + (40 * 75) * 11.2 + (60 * 75) * 17.6 + (40 * 75) * 24.0 + 1000 * 12.2 + 1000 * 22.8;
      const expectedArm = expectedMoment / expectedZfw;
      const expectedMac = ((expectedArm - 16.50) / 4.19) * 100;
      const ok = Math.abs(res.zfw - expectedZfw) < 1e-6 &&
                 Math.abs(res.zfwCgArm - expectedArm) < 1e-6 &&
                 Math.abs(res.zfwMac - expectedMac) < 1e-6;
      assert('T1: Exact Moment, CG_arm & %MAC formula', ok,
        `ZFW=${res.zfw}kg, Arm=${res.zfwCgArm.toFixed(4)}m (exp ${expectedArm.toFixed(4)}), %MAC=${res.zfwMac.toFixed(2)}%`);
    }

    // Test 2: Công thức ZFW, TOW, LW theo Block/Taxi/Trip fuel
    {
      const res = calculateWeightAndBalance({
        dow: 42600, dowArm: 17.65, stdPaxWt: 75,
        pax: { A: 20, B: 20, C: 20 },
        holds: { H1: { bag: 500, cargo: 500 }, H3: { bag: 500, cargo: 500 }, H5: { bag: 0, cargo: 0 } },
        ulds: {},
        fuel: { block: 8500, taxi: 300, trip: 4200 }
      }, a320);
      const ok = res.zfw === 49100 && res.tow === 57300 && res.lw === 53100;
      assert('T2: ZFW / TOW / LW fuel arithmetic', ok,
        `ZFW=${res.zfw} (49100), TOW=${res.tow} (57300), LW=${res.lw} (53100)`);
    }

    // Test 3: Phát hiện vượt MZFW
    {
      const res = calculateWeightAndBalance(WB_SCENARIOS[1].input, a320);
      const hasMzfw = res.violations.some(v => v.code === 'MZFW_EXCEEDED');
      assert('T3: Detect MZFW exceedance (Scenario 02)', res.status === 'FAIL' && hasMzfw,
        `ZFW=${res.zfw}kg > MZFW=${a320.mzfw}kg, violations=${res.violations.map(v => v.code).join(',')}`);
    }

    // Test 4: Phát hiện vượt MLW trên chặng ngắn (TOW hợp lệ nhưng LW vượt)
    {
      const res = calculateWeightAndBalance(WB_SCENARIOS[6].input, b738);
      const hasMlw = res.violations.some(v => v.code === 'MLW_EXCEEDED');
      const noMtow = !res.violations.some(v => v.code === 'MTOW_EXCEEDED');
      assert('T4: Detect MLW exceedance while TOW valid (Scenario 07)', hasMlw && noMtow,
        `TOW=${res.tow}kg <= ${b738.mtow}kg, LW=${res.lw}kg > ${b738.mlw}kg`);
    }

    // Test 5: Phát hiện CG lệch sau (Aft CG out-of-envelope)
    {
      const res = calculateWeightAndBalance(WB_SCENARIOS[3].input, a320);
      const hasAft = res.violations.some(v => v.code.startsWith('CG_AFT_'));
      assert('T5: Detect Aft CG out of envelope (Scenario 04)', res.status === 'FAIL' && hasAft,
        `ZFW %MAC=${res.zfwMac.toFixed(1)}% > aft limit ${res.zfwLimits.aftMac.toFixed(1)}%`);
    }

    // Test 6: Phát hiện CG lệch trước (Fwd CG out-of-envelope)
    {
      const res = calculateWeightAndBalance(WB_SCENARIOS[4].input, a320);
      const hasFwd = res.violations.some(v => v.code.startsWith('CG_FWD_'));
      assert('T6: Detect Forward CG out of envelope (Scenario 05)', res.status === 'FAIL' && hasFwd,
        `TOW %MAC=${res.towMac.toFixed(1)}% < fwd limit ${res.towLimits.fwdMac.toFixed(1)}%`);
    }

    // Test 7: Phát hiện quá tải hầm & quá tải vị trí ULD
    {
      const resHold = calculateWeightAndBalance(WB_SCENARIOS[2].input, a320);
      const resUld = calculateWeightAndBalance(WB_SCENARIOS[8].input, a320);
      const ok = resHold.violations.some(v => v.code === 'HOLD_LIMIT') &&
                 resUld.violations.some(v => v.code === 'ULD_POS_LIMIT');
      assert('T7: Detect Hold & ULD position structural limits', ok,
        `H3 limit caught=${resHold.violations.some(v => v.code === 'HOLD_LIMIT')}, 11P limit caught=${resUld.violations.some(v => v.code === 'ULD_POS_LIMIT')}`);
    }

    // Test 8: Chuyển đổi kg/lb chính xác & Toàn bộ 10 dòng máy bay hợp lệ
    {
      const profList = Object.values(AIRCRAFT_PROFILES);
      const badProfs = profList.filter(p => !(p.dow > 0 && p.mzfw > p.dow && p.mtow >= p.mlw && p.perf && p.visual3d));
      const convOk = Math.abs(lbToKg(kgToLb(62500)) - 62500) < 1e-6;
      assert('T8: 10-Aircraft Fleet integrity & kg↔lb precision', profList.length === 10 && badProfs.length === 0 && convOk,
        `Profiles=${profList.length} (${profList.map(p => p.id).join(',')}), kg↔lb exact`);
    }

    // Test 9: Công thức V-Speeds, THS Trim & cự ly đường băng tăng theo TOW
    {
      const light = calculateWeightAndBalance({ pax: { A: 10, B: 10, C: 10 }, holds: {}, ulds: {}, fuel: { block: 4000, taxi: 200, trip: 2000 } }, a320);
      const heavy = calculateWeightAndBalance({ pax: { A: 50, B: 60, C: 50 }, holds: { H1: { bag: 1500, cargo: 1000 }, H3: { bag: 1500, cargo: 1000 } }, ulds: {}, fuel: { block: 14000, taxi: 200, trip: 9000 } }, a320);
      const ok = heavy.performance.vrKt > light.performance.vrKt &&
                 heavy.performance.v2Kt > heavy.performance.vrKt &&
                 heavy.performance.vrKt > heavy.performance.v1Kt &&
                 heavy.performance.requiredRunwayM > light.performance.requiredRunwayM;
      assert('T9: Takeoff V1<VR<V2 & Runway distance scale with TOW', ok,
        `Light VR=${light.performance.vrKt}kt (${light.performance.requiredRunwayM}m) < Heavy VR=${heavy.performance.vrKt}kt (${heavy.performance.requiredRunwayM}m)`);
    }

    // Test 10: Phát hiện hậu quả Tail-Tipping (B77F) & Quên khai báo LMC (+2,000kg hàng sau)
    {
      const b77f = AIRCRAFT_PROFILES.B77F;
      const resTip = calculateWeightAndBalance(WB_SCENARIOS[11].input, b77f);
      const cTip = analyzeWbConsequences(WB_SCENARIOS[11].input, resTip, b77f, { unreportedAftKg: 0, unreportedFwdKg: 0 });
      const resBase = calculateWeightAndBalance(WB_SCENARIOS[0].input, a320);
      const cLmc = analyzeWbConsequences(WB_SCENARIOS[0].input, resBase, a320, { unreportedAftKg: 2000, unreportedFwdKg: 0 });
      const ok = cTip.stressFlags.tailTip &&
                 cLmc.hasHiddenErr &&
                 cLmc.macShift > 2.0 &&
                 cLmc.consequences.some(c => c.id === 'LMC_TRIM_MISMATCH');
      assert('T10: Consequence Engine catches B77F Tail-Tipping & hidden LMC shift', ok,
        `B77F tailTip=${cTip.stressFlags.tailTip} (pitch +${cTip.visualPitchDeg}°), LMC shift=+${cLmc.macShift.toFixed(1)}% MAC`);
    }

    // Test 11: Phát hiện lỗi ban đầu ở 4 kịch bản mới (S11 A321, S12 B77F, S13 DHC8, S14 A359)
    {
      const newScs = WB_SCENARIOS.slice(10);
      const allFailInitially = newScs.every(s => calculateWeightAndBalance(s.input, AIRCRAFT_PROFILES[s.aircraft]).status === 'FAIL');
      assert('T11: New fleet scenarios (S11-S14) trigger expected FAIL conditions', newScs.length === 4 && allFailInitially,
        newScs.map(s => `${s.id}(${s.aircraft}):FAIL`).join(', '));
    }

    // Test 12: Toàn bộ 14/14 lời giải mẫu đều PASS 100%
    {
      const failedSols = [];
      WB_SCENARIOS.forEach(s => {
        const prof = AIRCRAFT_PROFILES[s.aircraft];
        const r = calculateWeightAndBalance(s.solutionInput, prof);
        if (r.status !== 'PASS') failedSols.push(`${s.id}:${r.violations.map(v => v.code).join('+')}`);
      });
      assert(`T12: All ${WB_SCENARIOS.length}/${WB_SCENARIOS.length} scenario solutions PASS`, failedSols.length === 0,
        failedSols.length === 0 ? `All ${WB_SCENARIOS.length}/${WB_SCENARIOS.length} solutions PASS` : `Failed: ${failedSols.join('; ')}`);
    }

    // Test 13: Ảnh hưởng thời tiết (OAT nóng, gió xuôi, tuyết) lên Effective MTOW & cự ly cất cánh
    {
      const dry = calculateWeightAndBalance({ ...WB_SCENARIOS[0].input, env: { airport: 'NGO', oatC: 15, windKt: 10, surface: 'DRY' } }, a320);
      const snowHot = calculateWeightAndBalance({ ...WB_SCENARIOS[0].input, env: { airport: 'CTS', oatC: 32, windKt: -10, surface: 'SNOW' } }, a320);
      const ok = snowHot.performance.requiredRunwayM > dry.performance.requiredRunwayM + 400 &&
                 snowHot.performance.effectiveMtow < dry.performance.effectiveMtow &&
                 snowHot.performance.v1Kt < dry.performance.v1Kt;
      assert('T13: Weather/Runway physics (Hot OAT + Tailwind + Snow degrades perf)', ok,
        `DRY/Headwind=${dry.performance.requiredRunwayM}m (V1 ${dry.performance.v1Kt}kt) vs SNOW/Hot/Tail=${snowHot.performance.requiredRunwayM}m (V1 ${snowHot.performance.v1Kt}kt)`);
    }

    return tests;
  }

  // =========================================================================
