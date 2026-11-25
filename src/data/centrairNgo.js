// Official Chubu Centrair International Airport (NGO) Airside Vehicle Driving Course Data
// Source: 中部国際空港株式会社 空港運用本部 車両運転講習 教材1 / 教材2 / 空港の基本施設 (J01–J08)
// Pure Trilingual: Japanese (ja) · Vietnamese (vi) · English (en)

export const NGO_LIGHT_GUN_SIGNALS = [
  {
    id: 'steady_red',
    color: '#EF4444',
    mode: 'steady',
    labelJa: '赤・不動光',
    labelVi: 'Đỏ sáng đứng (Không nhấp nháy)',
    labelEn: 'Steady Red',
    meaningJa: '停止（待機）せよ',
    meaningVi: 'Dừng lại (chờ đợi)',
    meaningEn: 'STOP (Hold position)',
    detailJa: '滑走路・誘導路上で無線通信不能時に赤不動光を受けたら、直ちに停止し待機する。',
    detailVi: 'Khi mất liên lạc vô tuyến trên đường băng/đường lăn và thấy đèn đỏ sáng đứng, phải dừng ngay và chờ.',
    detailEn: 'Stop immediately and hold position when receiving a steady red light signal during radio failure.'
  },
  {
    id: 'flashing_red',
    color: '#EF4444',
    mode: 'flash',
    labelJa: '赤・閃光',
    labelVi: 'Đỏ nhấp nháy',
    labelEn: 'Flashing Red',
    meaningJa: '滑走路または誘導路の外へ出よ',
    meaningVi: 'Rời ngay khỏi đường băng hoặc đường lăn',
    meaningEn: 'CLEAR the runway or taxiway immediately',
    detailJa: '航空機の接近等のため、速やかに滑走路または誘導路の外側の安全区域へ退避する。',
    detailVi: 'Nhanh chóng di chuyển ra khỏi đường băng hoặc đường lăn tới vị trí an toàn.',
    detailEn: 'Vacate the active runway or taxiway immediately to a safe clear area.'
  },
  {
    id: 'steady_green',
    color: '#22C55E',
    mode: 'steady',
    labelJa: '緑・不動光',
    labelVi: 'Xanh lá sáng đứng',
    labelEn: 'Steady Green',
    meaningJa: '横断（進行）支障なし',
    meaningVi: 'Được phép băng qua / tiếp tục di chuyển',
    meaningEn: 'CLEARED to cross / proceed',
    detailJa: '周囲の航空機安全を確認のうえ、指定方向へ横断または進行してよい。',
    detailVi: 'Không có trở ngại — kiểm tra an toàn xung quanh và băng qua / di chuyển.',
    detailEn: 'Proceed or cross safely after verifying visual clearance.'
  },
  {
    id: 'alt_red_green',
    color: '#F59E0B',
    mode: 'alt',
    labelJa: '赤→緑・交互閃光',
    labelVi: 'Đỏ ↔ Xanh lá nhấp nháy luân phiên',
    labelEn: 'Alternating Red & Green',
    meaningJa: '注意せよ',
    meaningVi: 'Chú ý / Cảnh giác cao độ',
    meaningEn: 'EXERCISE EXTREME CAUTION',
    detailJa: '周囲の状況や航空機の動向に最大限の注意を払って行動する。',
    detailVi: 'Quan sát cực kỳ cẩn trọng môi trường xung quanh và hướng di chuyển của tàu bay.',
    detailEn: 'Exercise extreme caution and closely monitor surrounding aircraft and vehicle traffic.'
  },
  {
    id: 'flashing_white',
    color: '#F8FAFC',
    mode: 'flash',
    labelJa: '白色・閃光',
    labelVi: 'Trắng nhấp nháy',
    labelEn: 'Flashing White',
    meaningJa: '飛行場の出発点に帰れ',
    meaningVi: 'Quay trở lại điểm xuất phát của sân bay',
    meaningEn: 'RETURN to starting point on the airport',
    detailJa: '作業を中断し、安全を確認しながら飛行場の出発点（待機場所）へ戻る。',
    detailVi: 'Kết thúc thao tác và lái xe quay về điểm xuất phát ban đầu trong sân bay.',
    detailEn: 'Return safely to your starting point on the aerodrome.'
  }
];

export const ICAO_PHONETIC_CODE = [
  ['A', 'Alfa', 'アルファ'], ['B', 'Bravo', 'ブラボー'], ['C', 'Charlie', 'チャーリー'],
  ['D', 'Delta', 'デルタ'], ['E', 'Echo', 'エコー'], ['F', 'Foxtrot', 'フォックストロット'],
  ['G', 'Golf', 'ゴルフ'], ['H', 'Hotel', 'ホテル'], ['I', 'India', 'インディア'],
  ['J', 'Juliett', 'ジュリエット'], ['K', 'Kilo', 'キロ'], ['L', 'Lima', 'リマ'],
  ['M', 'Mike', 'マイク'], ['N', 'November', 'ノベンバー'], ['O', 'Oscar', 'オスカー'],
  ['P', 'Papa', 'パパ'], ['Q', 'Quebec', 'ケベック'], ['R', 'Romeo', 'ロミオ'],
  ['S', 'Sierra', 'シエラ'], ['T', 'Tango', 'タンゴ'], ['U', 'Uniform', 'ユニフォーム'],
  ['V', 'Victor', 'ビクター'], ['W', 'Whiskey', 'ウィスキー'], ['X', 'X-ray', 'エクスレイ'],
  ['Y', 'Yankee', 'ヤンキー'], ['Z', 'Zulu', 'ズールー'],
  ['0', 'Zero', 'ゼロ'], ['1', 'One', 'ワン'], ['2', 'Two', 'トゥー'],
  ['3', 'Three', 'トゥリー'], ['4', 'Four', 'フォウアー'], ['5', 'Five', 'ファイブ'],
  ['6', 'Six', 'シックス'], ['7', 'Seven', 'セブン'], ['8', 'Eight', 'エイト'], ['9', 'Nine', 'ナイナー']
];

export const NGO_MCA_RADIO_DRILLS = [
  {
    step: 1,
    phaseJa: '1. 航空機走行区域への進入前準備',
    phaseVi: '1. Chuẩn bị trước khi vào Khu vực tàu bay di chuyển',
    phaseEn: '1. Pre-Entry Preparation (Movement Area)',
    towerLine: '[SYSTEM] 滑走路・誘導路（着陸帯緑地部含む）の手前に到着しました。',
    qJa: '管制塔と交信する前に、車両側で必ず行う操作はどれですか？',
    qVi: 'Trước khi gọi Đài kiểm soát không lưu xin phép vào đường lăn/đường băng, lái xe bắt buộc phải làm gì?',
    qEn: 'Before contacting the Control Tower for clearance into the aircraft movement area, what must you do?',
    opts: [
      { ok: true, ja: '黄色回転灯を点灯し、航空機走行区域等の手前で停車して管制塔と交信する', vi: 'Bật đèn xoay vàng, dừng hẳn trước vạch ranh giới khu tàu bay chạy rồi liên lạc Đài kiểm soát', en: 'Turn on the yellow rotating beacon, stop short of the movement area, and contact the Tower' },
      { ok: false, ja: '進入してから走りながら無線で事後報告する', vi: 'Chạy thẳng vào trước rồi vừa lái vừa báo cáo qua bộ đàm', en: 'Enter first and report via radio while driving' },
      { ok: false, ja: 'ハザードランプだけで無許可進入する', vi: 'Chỉ cần bật đèn khẩn cấp hazard rồi tự đi vào', en: 'Use hazard lights only and enter without clearance' }
    ],
    expJa: '進入前は①回転灯点灯 ②手前で停車 ③管制塔の許可取得、の3手順が必須です（単独整備車両も同様）。',
    expVi: 'Trước khi vào bắt buộc đủ 3 bước: (1) Bật đèn xoay, (2) Dừng trước ranh giới, (3) Xin phép Đài kiểm soát (kể cả xe kỹ thuật đi 1 mình).',
    expEn: 'Prior to entry you must: (1) switch on rotating beacon, (2) stop short of the movement area, and (3) obtain Tower clearance.'
  },
  {
    step: 2,
    phaseJa: '2. 管制塔への進入許可要求（MCA無線）',
    phaseVi: '2. Xin phép vào đường lăn/đường băng qua MCA Radio',
    phaseEn: '2. Requesting Entry Clearance via MCA Radio',
    towerLine: '[TOWER] 作業者A、こちら管制塔です。（どうぞ）',
    qJa: '作業予定日報に記載されたコールサインを使い、正しく進入許可を求める言い方は？',
    qVi: 'Dùng đúng Callsign ghi trên kế hoạch công việc ngày, câu xin phép chuẩn là gì?',
    qEn: 'Using your assigned callsign from the daily work schedule, what is the proper clearance request?',
    opts: [
      { ok: true, ja: '「現在地〇〇です。〇〇経由で××地区まで、車両1台の走行よろしいでしょうか。」', vi: '“Vị trí hiện tại tại XX. Xin phép cho 1 xe đi qua tuyến A→B đến khu vực YY được không?”', en: '"Position at XX. Requesting permission for 1 vehicle to proceed via A→B to area YY."' },
      { ok: false, ja: '「今から入ります。お願いします。」（位置・台数・経路を省略）', vi: '“Tôi vào bây giờ nhé.” (bỏ qua vị trí, lộ trình, số lượng xe)', en: '"Entering now, thanks." (omitting position, route, and vehicle count)' },
      { ok: false, ja: '自分のニックネームで呼びかける', vi: 'Dùng biệt danh cá nhân thay cho Callsign', en: 'Use a personal nickname instead of the official callsign' }
    ],
    expJa: 'コールサインは必ず作業予定日報記載のものを使い、現在地・経路・目的地・車両台数を明確に伝えます。',
    expVi: 'Luôn dùng đúng Callsign trên phiếu kế hoạch ngày, nêu rõ vị trí hiện tại, tuyến đi, đích đến và số lượng xe.',
    expEn: 'Always use the callsign listed on the daily work plan and state current position, route, destination, and vehicle count.'
  },
  {
    step: 3,
    phaseJa: '3. 管制許可の復唱（リードバック）と作業中監視',
    phaseVi: '3. Nhắc lại lệnh (Readback) & Nghe trực bộ đàm liên tục',
    phaseEn: '3. Clearance Readback & Continuous Monitoring',
    towerLine: '[TOWER] 〇〇からB経由で××地区まで、車両1台、走行支障ありません。',
    qJa: '許可を受けた直後の応答と、作業中の無線管理として正しいのは？',
    qVi: 'Phản hồi ngay sau khi nhận phép và cách quản lý bộ đàm trong lúc làm việc là gì?',
    qEn: 'How must you acknowledge the clearance and manage radio communication during work?',
    opts: [
      { ok: true, ja: '経路と目的地を復唱して「了解しました」と応答し、作業中は管制無線を常時傍受する', vi: 'Nhắc lại lộ trình & đích đến rồi xác nhận “Đã rõ”, đồng thời luôn mở bộ đàm nghe trực liên tục suốt quá trình làm việc', en: 'Read back the route and destination, acknowledge, and monitor the Tower frequency continuously while working' },
      { ok: false, ja: '作業に集中するため到着後は無線の電源を切る', vi: 'Tắt nguồn bộ đàm sau khi tới điểm làm việc để tập trung', en: 'Switch off the radio after arriving so you can focus' },
      { ok: false, ja: '無言のまま発信ボタンだけ2回押す', vi: 'Không nói gì, chỉ bấm nút PTT 2 lần', en: 'Click the mic twice without speaking' }
    ],
    expJa: '許可内容は必ず復唱し、作業中は管制無線を常時傍受します。無線不調時は指向信号灯（ライトガン）に従います。',
    expVi: 'Phải đọc lại (readback) nội dung lệnh và luôn nghe trực tần số Đài kiểm soát; nếu mất sóng phải tuân theo đèn Light Gun.',
    expEn: 'Always read back clearances and maintain a continuous listening watch; obey Light Gun signals if radio fails.'
  },
  {
    step: 4,
    phaseJa: '4. 滑走路・誘導路からの離脱許可と完了報告',
    phaseVi: '4. Xin phép rời khỏi khu vực & Báo cáo hoàn tất',
    phaseEn: '4. Exit Clearance & Vacated Report',
    towerLine: '[SYSTEM] 作業終了。航空機走行区域から退出しようとしています。',
    qJa: '退出から完了報告までの正しい手順はどれですか？',
    qVi: 'Trình tự chuẩn từ lúc rút ra khỏi đường lăn/đường băng cho đến khi hoàn tất là gì?',
    qEn: 'What is the required procedure for vacating the movement area?',
    opts: [
      { ok: true, ja: '管制塔に退出許可を得て復唱 → 離脱後に安全な場所で停車 → 離脱完了を管制塔へ報告', vi: 'Xin phép Đài kiểm soát rút ra & đọc lại → ra khỏi ranh giới dừng ở nơi an toàn → báo cáo đã rời khỏi khu vực hoàn tất', en: 'Obtain and read back exit clearance → vacate and stop at a safe area → report clear of the movement area to Tower' },
      { ok: false, ja: '退出は許可不要でそのままエプロンへ戻る', vi: 'Lúc đi ra không cần xin phép, cứ tự lái về sân đỗ', en: 'No clearance is needed to exit; simply drive back to the apron' },
      { ok: false, ja: '離脱途中で走行しながら完了報告だけ先にする', vi: 'Đang chạy dở trên đường lăn đã báo cáo rời khỏi xong', en: 'Report clear while still driving inside the taxiway' }
    ],
    expJa: '退出時も必ず管制塔の許可を得て、完全に離脱し安全な場所で停車してから「離脱完了しました」と報告します。',
    expVi: 'Khi rút ra cũng bắt buộc xin phép Đài kiểm soát; chỉ báo hoàn tất sau khi đã ra hẳn khu an toàn và dừng xe.',
    expEn: 'Exit also requires Tower clearance; only report vacated after completely leaving the movement area and stopping safely.'
  }
];

export const NGO_QUICK_REFERENCE = {
  speeds: [
    { areaJa: '場周道路（空港外周）', areaVi: 'Đường vành đai sân bay (場周道路)', areaEn: 'Airport Perimeter Road', limit: '40 km/h', noteJa: '滑走路南北延長部のSTOPで一時停止', noteVi: 'Dừng bắt buộc tại STOP đầu bắc/nam đường băng', noteEn: 'Mandatory STOP at N/S runway extensions' },
    { areaJa: 'GSE・制限区域・エプロン・サービスレーン', areaVi: 'Đường GSE, Apron, Service Lane', areaEn: 'GSE Lanes, Apron & Service Lanes', limit: '30 km/h', noteJa: '原則左側通行・夜間ロービーム常時', noteVi: 'Đi bên trái, ban đêm luôn bật đèn cốt (chiếu gần)', noteEn: 'Keep left; always use low-beam headlights at night' },
    { areaJa: 'カート・無動力車を牽引中', areaVi: 'Khi đang kéo rơ-moóc / xe đẩy không động cơ', areaEn: 'Towing Carts / Non-motorized Dollies', limit: '15 km/h', noteJa: '最大6台牽引（牽引車含め7台連結まで）', noteVi: 'Tối đa 6 moóc (tổng 7 xe gồm đầu kéo)', noteEn: 'Max 6 towed carts (7 units total incl. tractor)' },
    { areaJa: '航空機周辺 30m以内', areaVi: 'Trong bán kính 30m quanh tàu bay', areaEn: 'Within 30m of an Aircraft', limit: '15 km/h', noteJa: '周囲監視・急操作禁止', noteVi: 'Giảm tốc, quan sát kỹ xung quanh', noteEn: 'Reduce speed and maintain full clearance' },
    { areaJa: '航空機に向かって走行（5m以内）', areaVi: 'Tiến thẳng về phía tàu bay (trong phạm vi 5m)', areaEn: 'Approaching Aircraft (within 5m)', limit: '10 km/h', noteJa: '後退時は車外誘導員必須', noteVi: 'Lùi sát tàu bay bắt buộc có người xi-nhan ngoài xe', noteEn: 'Guide person outside vehicle mandatory when reversing' },
    { areaJa: '航空機を牽引中', areaVi: 'Đang lai dắt tàu bay', areaEn: 'Towing an Aircraft', limit: '10 km/h', noteJa: '赤実線横断の例外対象', noteVi: 'Thuộc diện ngoại lệ được qua vạch đỏ ABL/ERA', noteEn: 'Authorized exception for crossing red boundary lines' },
    { areaJa: '手荷物荷捌き場内（電気駆動車のみ）', areaVi: 'Trong khu phân loại hành lý (chỉ xe điện)', areaEn: 'Baggage Make-up Area (Electric vehicles only)', limit: '10 km/h', noteJa: '内燃車両進入不可・歩行者注意', noteVi: 'Chỉ xe chạy điện, chú ý người đi bộ', noteEn: 'Electric-powered GSE only; watch for staff' }
  ],
  passes: [
    { color: '#2563EB', nameJa: '標準パス（青）', nameVi: 'Thẻ Tiêu chuẩn (Xanh dương)', nameEn: 'Standard Pass (Blue)', issuer: 'CJIAC', scopeJa: 'CJIAC管理の制限区域（着陸・エプ・場周・G制・内保）', scopeVi: 'Khu hạn chế do CJIAC quản lý (không gồm khu Hải quan)', scopeEn: 'CJIAC restricted areas (Landing Strip, Apron, Perimeter, GSE, Domestic Security)' },
    { color: '#EAB308', nameJa: '共通パス（黄）', nameVi: 'Thẻ Chung — Không 船陸交通 (Vàng)', nameEn: 'Common Pass — No Ramp-Vessel Transfer (Yellow)', issuer: 'CJIAC + Customs', scopeJa: 'CJIAC区域＋税関区域（船陸交通等許可なし）', scopeVi: 'Khu CJIAC + Khu Hải quan (không có phép giao nhận hàng tàu-đất)', scopeEn: 'CJIAC + Customs areas (without vessel/aircraft goods-transfer permit)' },
    { color: '#DC2626', nameJa: '共通パス（赤）', nameVi: 'Thẻ Chung — Có 船陸交通 (Đỏ)', nameEn: 'Common Pass — With Transfer Permit (Red)', issuer: 'CJIAC + Customs', scopeJa: 'CJIAC区域＋税関区域（船陸交通等許可あり）', scopeVi: 'Khu CJIAC + Khu Hải quan (có phép giao nhận hàng 船陸交通)', scopeEn: 'CJIAC + Customs areas (with goods-transfer permit)' },
    { color: '#38BDF8', nameJa: '特別パス / ビジターパス（水色）', nameVi: 'Thẻ Đặc biệt (<1 tháng) / Khách CJIAC (<24h) (Xanh nhạt)', nameEn: 'Special (<1 mo) / Visitor Pass (<24h) (Light Blue)', issuer: 'CJIAC', scopeJa: '特別：他空港有効パス保持者（1ヶ月未満）／ビジター：一時立入（24H未満）', scopeVi: 'Đặc biệt: người có thẻ sân bay nội địa khác (<1 tháng) / Khách tạm (<24h)', scopeEn: 'Special: holders of other JP airport passes (<1 mo) / Visitor: temporary CJIAC (<24h)' },
    { color: '#9333EA', nameJa: '税関ビジターパス（紫）', nameVi: 'Thẻ Khách Hải quan CIQ (Tím)', nameEn: 'Customs Visitor Pass (Purple)', issuer: 'Customs (税関)', scopeJa: '税関管理の国際保安区域・CIQ構内への一時立入（7日未満）', scopeVi: 'Vào tạm khu vực Hải quan CIQ / An ninh Quốc tế (<7 ngày)', scopeEn: 'Temporary entry into Customs-controlled International CIQ area (<7 days)' }
  ],
  pushbackSigns: [
    { ja: '機体からGSEが離れている', vi: 'Các xe/thiết bị GSE đã tách rời khỏi thân tàu bay', en: 'All GSE vehicles/equipment are clear of the aircraft' },
    { ja: 'PBB（またはPBR・ステップ車）が外されている', vi: 'Ống lồng PBB (hoặc PBR / xe thang) đã rút ra khỏi cửa', en: 'PBB (or PBR / passenger stairs) is detached' },
    { ja: 'けん引車の黄色の回転灯が点灯している（※自走アウト時はけん引車なし！）', vi: 'Đèn xoay vàng trên xe kéo bật sáng (*Lưu ý: Tự chạy ra sẽ KHÔNG có xe kéo!)', en: 'Tug yellow rotating beacon is ON (*Note: No tug during self-taxi-out!)' },
    { ja: 'ナビゲーションライトとアンチコリジョンライトが点灯している', vi: 'Đèn định vị (Navigation) và đèn chống va chạm đỏ (Anti-collision) đang bật', en: 'Navigation lights and red Anti-collision beacon are ON' },
    { ja: '運航係員がパイロットに出発OKの合図をしている', vi: 'Nhân viên mặt đất đang ra hiệu OK khởi hành cho phi công', en: 'Ground crew gives departure-OK hand signal to flight crew' },
    { ja: 'チョーク（車輪止め）が外されている（※エンジン試運転時はチョーク設置のまま！）', vi: 'Chèn bánh (Chocks) đã được tháo (*Khi thử nổ động cơ thì chèn bánh vẫn giữ nguyên!)', en: 'Wheel chocks are removed (*During engine run-up, chocks remain IN place!)' }
  ],
  coc: {
    nameJa: 'COC（セントレア・オペレーション・センター）',
    nameVi: 'COC — Trung tâm Điều hành Centrair (Centrair Operation Center)',
    nameEn: 'COC — Centrair Operation Center',
    tel: '0569-38-1500 (Ext. 3000) · 24/365',
    itemsJa: ['立入証等の紛失（税関へも連絡）', '施設・車両事故（※現場保存）', 'モノの飛散（FOD）', '燃料等の流出', '不審者・不審物の発見', '車両の走行不能', '急患発生時（救急車直接要請後もCOCへ必ず報告）'],
    itemsVi: ['Mất thẻ ra vào (báo cả Hải quan)', 'Tai nạn phương tiện / hư hại hạ tầng (*Giữ nguyên hiện trường)', 'Vật thể bay vương vãi (FOD)', 'Tràn đổ nhiên liệu / hóa chất', 'Phát hiện người/vật khả nghi', 'Xe hỏng không thể di chuyển', 'Cấp cứu khẩn cấp (gọi xe cứu thương trực tiếp xong bắt buộc báo COC dẫn đường)'],
    itemsEn: ['Lost airport ID pass (also notify Customs)', 'Facility or vehicle accident (*Preserve the scene)', 'Debris / FOD scatter', 'Fuel or hazardous spill', 'Suspicious person or unattended item', 'Disabled / broken-down vehicle', 'Medical emergency (always notify COC after calling ambulance for airside escort)']
  }
};

// 26 Additional Official NGO Centrair Airside Dictionary Terms (Pure Trilingual JA/VI/EN)
export const NGO_EXTRA_DICTIONARY = [
  { ja: 'スポット後方車両通行帯', kana: 'すぽっとこうほうしゃりょうつうこうたい', en: 'Behind-Stand Vehicle Road', vi: 'Đường xe chạy phía sau bãi đỗ (cấm đi bộ/xe đạp)', cat: 'ramp' },
  { ja: '前方航空機優先標識', kana: 'ぜんぽうこうくうきゆうせんひょうしき', en: 'Aircraft Priority Ahead Sign', vi: 'Biển báo ưu tiên tàu bay phía trước (tam giác viền đỏ)', cat: 'safety' },
  { ja: '機材制限区域 (ERA)', kana: 'きざいせいげんくいき', en: 'Equipment Restraint Area (ERA)', vi: 'Khu vực hạn chế thiết bị quanh bãi đỗ (vạch đỏ liền)', cat: 'safety' },
  { ja: 'PBB危険区域', kana: 'ぴーびーびーきけんくいき', en: 'PBB Danger Zone (Red Hatched)', vi: 'Khu vực nguy hiểm bánh ống lồng PBB (gạch chéo đỏ)', cat: 'safety' },
  { ja: '自走アウト', kana: 'じそうあうと', en: 'Self-Taxi-Out (Power-out)', vi: 'Tàu bay tự nổ máy lăn ra không cần xe kéo', cat: 'ramp' },
  { ja: 'ブラスト注意区域', kana: 'ぶらすとちゅういくいき', en: 'Jet Blast Caution Zone (#71 / #77)', vi: 'Khu vực cảnh báo luồng phản lực (Spot #71, #77 T2)', cat: 'safety' },
  { ja: 'エンジンランナップ', kana: 'えんじんらんなっぷ', en: 'Engine Run-Up (Ground Test)', vi: 'Chạy thử động cơ tại bãi đỗ (24h mọi spot, còn chock)', cat: 'ramp' },
  { ja: 'サービスレーン', kana: 'さーびすれーん', en: 'Service Lane (No-ATC Crossing)', vi: 'Làn cắt ngang đường lăn tự chịu trách nhiệm (không cần gọi ATC)', cat: 'ramp' },
  { ja: '交互破線', kana: 'こうごはせん', en: 'Alternating Dashed Line', vi: 'Vạch đứt so le màu trắng viền ngoài Service Lane', cat: 'safety' },
  { ja: 'エプロン境界線 (ABL)', kana: 'えぷろんきょうかいせん', en: 'Apron Boundary Line (ABL)', vi: 'Vạch đỏ ranh giới giữa Apron Taxiway và Spot', cat: 'safety' },
  { ja: 'スポット誘導経路境界線', kana: 'すぽっとゆうどうけいろきょうかいせん', en: 'Aircraft Stand Taxilane Boundary Line', vi: 'Vạch đỏ ranh giới giữa đường lăn vào spot và bãi đỗ', cat: 'safety' },
  { ja: 'エプロン誘導路', kana: 'えぷろんゆうどうろ', en: 'Apron Taxiway', vi: 'Đường lăn chính tiếp giáp dọc sân đỗ Apron', cat: 'ramp' },
  { ja: 'スポット誘導経路', kana: 'すぽっとゆうどうけいろ', en: 'Aircraft Stand Taxilane', vi: 'Đường lăn nội bộ trong Apron dẫn vào từng bãi đỗ', cat: 'ramp' },
  { ja: '場周道路', kana: 'じょうしゅうどうろ', en: 'Airport Perimeter Road (40 km/h)', vi: 'Đường vành đai quanh bờ kè sân bay (giới hạn 40 km/h)', cat: 'ramp' },
  { ja: 'ILS制限区域', kana: 'あいえるえすせいげんくいき', en: 'ILS Critical / Restricted Area', vi: 'Khu vực hạn chế bảo vệ sóng dẫn đường hạ cánh ILS', cat: 'safety' },
  { ja: '着陸帯等', kana: 'ちゃくりくたいとう', en: 'Landing Strip / Movement Area', vi: 'Khu dải cất hạ cánh & đường lăn (kể cả thảm cỏ bên trong)', cat: 'safety' },
  { ja: '指向信号灯 (ライトガン)', kana: 'しこうしんごうとう', en: 'ATC Light Gun Signal', vi: 'Đèn tín hiệu định hướng từ Đài kiểm soát (khi mất sóng radio)', cat: 'safety' },
  { ja: '並走禁止', kana: 'へいそうきんし', en: 'No Driving Abreast (Parallel Driving Prohibited)', vi: 'Cấm chạy song song 2 làn tại mọi ngã tư & khúc cua (đặc biệt #1)', cat: 'safety' },
  { ja: '車両通行帯境界線', kana: 'しゃりょうつうこうたいきょうかいせん', en: 'Traffic Lane Boundary Line (Solid vs Dashed)', vi: 'Vạch phân chia 2 làn cùng chiều (nét liền cấm chuyển làn)', cat: 'safety' },
  { ja: '歩行者・自転車通行帯', kana: 'ほこうしゃ・じてんしゃつうこうたい', en: 'Pedestrian & Bicycle Lane (Green — Yield to GSE)', vi: 'Làn đi bộ/xe đạp sơn xanh lá (KHÔNG ưu tiên người đi bộ)', cat: 'safety' },
  { ja: '標準パス・共通パス', kana: 'ひょうじゅんぱす・きょうつうぱす', en: 'Standard (Blue) / Common Pass (Yellow/Red)', vi: 'Thẻ ra vào chuẩn CJIAC (Xanh) / Thẻ chung kèm Hải quan (Vàng/Đỏ)', cat: 'safety' },
  { ja: '船陸交通', kana: 'せんりくこうつう', en: 'Aircraft/Vessel Goods-Transfer Access', vi: 'Hoạt động giao nhận vật phẩm trực tiếp với tàu bay/tàu thủy (Thẻ Đỏ)', cat: 'cargo' },
  { ja: 'COC (セントレア運用センター)', kana: 'しーおーしー', en: 'Centrair Operation Center (0569-38-1500 / Ext.3000)', vi: 'Trung tâm Điều hành Centrair — Đầu mối báo khẩn 24/365', cat: 'safety' },
  { ja: 'MCA無線', kana: 'えむしーえーむせん', en: 'Digital Airport MCA Radio System', vi: 'Hệ thống bộ đàm số sân bay liên lạc Đài kiểm soát (mượn tại COC)', cat: 'ramp' },
  { ja: 'フォネティックコード', kana: 'ふぉねてぃっくこーど', en: 'ICAO Phonetic Alphabet (Alfa–Zulu)', vi: 'Bảng đánh vần vô tuyến chuẩn ICAO (Alfa, Bravo, Charlie...)', cat: 'ramp' },
  { ja: '沖留スポット', kana: 'おきどめすぽっと', en: 'Remote Parking Stand (#200–#500)', vi: 'Bãi đỗ xa không nối ống lồng PBB (#200–#500)', cat: 'ramp' }
];

// 8 Crisp Bespoke Vector SVGs for Centrair NGO Driving Exam & Quick Study
export function renderNgoVisualSvg(type) {
  if (type === 'ngo_front_priority') {
    return `<svg viewBox="0 0 360 155" style="width:100%;max-width:380px;display:block;margin:0 auto;border-radius:8px;background:#334155;">
      <rect x="0" y="0" width="360" height="155" fill="#475569"/>
      <line x1="24" y1="128" x2="336" y2="128" stroke="#FFFFFF" stroke-width="6"/>
      <polygon points="180,112 115,24 245,24" fill="#DC2626" stroke="#FFFFFF" stroke-width="3"/>
      <polygon points="180,96 134,34 226,34" fill="#CBD5E1"/>
      <path d="M180 42 L185 56 L205 63 L205 68 L185 65 L184 78 L192 83 L192 87 L180 84 L168 87 L168 83 L176 78 L175 65 L155 68 L155 63 L175 56 Z" fill="#DC2626"/>
      <text x="180" y="146" text-anchor="middle" fill="#F8FAFC" font-size="11" font-weight="700" font-family="sans-serif">STOP LINE / 停止線 (MANDATORY FULL STOP)</text>
    </svg>`;
  }
  if (type === 'ngo_pass_colors') {
    const cards = [
      { x: 10, col: '#2563EB', t1: 'BLUE', t2: 'CJIAC' },
      { x: 80, col: '#EAB308', t1: 'YELLOW', t2: 'No Transfer' },
      { x: 150, col: '#DC2626', t1: 'RED', t2: '+Transfer' },
      { x: 220, col: '#38BDF8', t1: 'LT-BLUE', t2: 'Spec/Vis' },
      { x: 290, col: '#9333EA', t1: 'PURPLE', t2: 'CIQ <7d' }
    ];
    return `<svg viewBox="0 0 360 120" style="width:100%;max-width:380px;display:block;margin:0 auto;border-radius:8px;background:#0F172A;">
      ${cards.map(c => `
        <rect x="${c.x}" y="14" width="60" height="82" rx="6" fill="#F8FAFC" stroke="${c.col}" stroke-width="3"/>
        <rect x="${c.x}" y="14" width="60" height="20" rx="4" fill="${c.col}"/>
        <text x="${c.x + 30}" y="27" text-anchor="middle" fill="#FFFFFF" font-size="8.5" font-weight="800" font-family="monospace">${c.t1}</text>
        <circle cx="${c.x + 20}" cy="52" r="9" fill="#94A3B8"/>
        <rect x="${c.x + 34}" y="46" width="18" height="4" fill="#64748B"/>
        <rect x="${c.x + 34}" y="54" width="14" height="4" fill="#94A3B8"/>
        <rect x="${c.x + 6}" y="72" width="48" height="16" rx="2" fill="${c.col}" fill-opacity="0.18"/>
        <text x="${c.x + 30}" y="83" text-anchor="middle" fill="#0F172A" font-size="7.5" font-weight="700">${c.t2}</text>
      `).join('')}
      <text x="180" y="112" text-anchor="middle" fill="#CBD5E1" font-size="9.5" font-family="monospace">CODES: 着陸 · エプ · 場周 · G制 · 内保 · 際保 (× = NO ENTRY)</text>
    </svg>`;
  }
  if (type === 'ngo_service_lane') {
    return `<svg viewBox="0 0 360 155" style="width:100%;max-width:380px;display:block;margin:0 auto;border-radius:8px;background:#334155;">
      <rect x="0" y="0" width="360" height="155" fill="#475569"/>
      <rect x="0" y="34" width="360" height="86" fill="#334155"/>
      <line x1="0" y1="34" x2="360" y2="34" stroke="#EF4444" stroke-width="4"/>
      <line x1="0" y1="120" x2="360" y2="120" stroke="#EF4444" stroke-width="4"/>
      <line x1="142" y1="10" x2="142" y2="145" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="10,8"/>
      <line x1="147" y1="18" x2="147" y2="145" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="10,8"/>
      <line x1="213" y1="10" x2="213" y2="145" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="10,8"/>
      <line x1="218" y1="18" x2="218" y2="145" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="10,8"/>
      <line x1="180" y1="10" x2="180" y2="145" stroke="#FFFFFF" stroke-width="2.5"/>
      <line x1="146" y1="136" x2="180" y2="136" stroke="#FFFFFF" stroke-width="4"/>
      <polygon points="163,130 152,115 174,115" fill="#DC2626"/>
      <text x="70" y="74" text-anchor="middle" fill="#FDE047" font-size="11" font-weight="800">TAXILANE</text>
      <text x="70" y="88" text-anchor="middle" fill="#CBD5E1" font-size="9">AIRCRAFT PRIORITY</text>
      <text x="292" y="25" text-anchor="middle" fill="#FCA5A5" font-size="9.5" font-weight="700">EXIT RED LINE: DO NOT STOP</text>
      <text x="292" y="142" text-anchor="middle" fill="#93C5FD" font-size="9.5" font-weight="700">30 km/h · NO OVERTAKING</text>
    </svg>`;
  }
  if (type === 'ngo_blast_100m') {
    return `<svg viewBox="0 0 360 150" style="width:100%;max-width:380px;display:block;margin:0 auto;border-radius:8px;background:#1E293B;">
      <defs>
        <linearGradient id="blastG" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#EF4444" stop-opacity="0.95"/>
          <stop offset="65%" stop-color="#F97316" stop-opacity="0.65"/>
          <stop offset="100%" stop-color="#FACC15" stop-opacity="0.1"/>
        </linearGradient>
      </defs>
      <ellipse cx="215" cy="54" rx="110" ry="18" fill="url(#blastG)"/>
      <ellipse cx="215" cy="96" rx="110" ry="18" fill="url(#blastG)"/>
      <circle cx="88" cy="54" r="14" fill="#EF4444" fill-opacity="0.45"/>
      <circle cx="88" cy="96" r="14" fill="#EF4444" fill-opacity="0.45"/>
      <path d="M40 75 L125 75 M78 75 L108 32 M78 75 L108 118 M116 75 L130 58 M116 75 L130 92" stroke="#F8FAFC" stroke-width="5" stroke-linecap="round"/>
      <line x1="125" y1="128" x2="325" y2="128" stroke="#38BDF8" stroke-width="2.5"/>
      <text x="225" y="143" text-anchor="middle" fill="#38BDF8" font-size="11.5" font-weight="800" font-family="monospace">◄──── ≥ 100 m (≈ 2 SPOTS) SAFE CLEARANCE ────►</text>
      <text x="72" y="22" fill="#FCA5A5" font-size="9.5" font-weight="700">INTAKE SUCTION</text>
      <text x="220" y="22" fill="#FDBA74" font-size="10" font-weight="700">JET BLAST DANGER ZONE</text>
    </svg>`;
  }
  if (type === 'ngo_pbb_danger') {
    return `<svg viewBox="0 0 360 150" style="width:100%;max-width:380px;display:block;margin:0 auto;border-radius:8px;background:#334155;">
      <defs>
        <pattern id="redHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="12" stroke="#EF4444" stroke-width="4"/>
        </pattern>
      </defs>
      <rect x="75" y="28" width="195" height="92" fill="url(#redHatch)" stroke="#EF4444" stroke-width="3"/>
      <rect x="20" y="54" width="165" height="26" rx="4" fill="#CBD5E1" stroke="#0F172A" stroke-width="2"/>
      <circle cx="165" cy="86" r="10" fill="#F59E0B" stroke="#0F172A" stroke-width="2"/>
      <text x="102" y="71" text-anchor="middle" fill="#0F172A" font-size="10.5" font-weight="800">PBB TUNNEL</text>
      <rect x="278" y="34" width="72" height="80" rx="6" fill="#0F172A" fill-opacity="0.88"/>
      <text x="314" y="54" text-anchor="middle" fill="#FCA5A5" font-size="9" font-weight="800">VEHICLES:</text>
      <text x="314" y="68" text-anchor="middle" fill="#EF4444" font-size="9.5" font-weight="800">NO ENTRY</text>
      <text x="314" y="88" text-anchor="middle" fill="#93C5FD" font-size="9" font-weight="800">STAFF:</text>
      <text x="314" y="102" text-anchor="middle" fill="#4ADE80" font-size="8.5" font-weight="700">BEACON OFF</text>
      <text x="172" y="140" text-anchor="middle" fill="#FCA5A5" font-size="10" font-weight="800">NO VEHICLES IN RED HATCH &amp; NEVER DRIVE UNDER PBB</text>
    </svg>`;
  }
  if (type === 'ngo_solid_dashed') {
    return `<svg viewBox="0 0 360 145" style="width:100%;max-width:380px;display:block;margin:0 auto;border-radius:8px;background:#1E293B;">
      <rect x="16" y="14" width="154" height="116" rx="6" fill="#334155"/>
      <line x1="93" y1="22" x2="93" y2="122" stroke="#FFFFFF" stroke-width="3.5" stroke-dasharray="12,8"/>
      <rect x="44" y="74" width="24" height="36" rx="4" fill="#38BDF8"/>
      <path d="M56 72 C56 48 118 52 118 32" fill="none" stroke="#4ADE80" stroke-width="2.5" marker-end="url(#arr)"/>
      <text x="93" y="18" text-anchor="middle" fill="#4ADE80" font-size="9.5" font-weight="800">DASHED (破線): OK</text>
      <rect x="190" y="14" width="154" height="116" rx="6" fill="#334155"/>
      <line x1="267" y1="22" x2="267" y2="122" stroke="#FFFFFF" stroke-width="4"/>
      <rect x="218" y="74" width="24" height="36" rx="4" fill="#38BDF8"/>
      <path d="M230 72 C230 50 288 52 288 34" fill="none" stroke="#EF4444" stroke-width="2.5"/>
      <text x="292" y="54" fill="#EF4444" font-size="22" font-weight="900">✕</text>
      <text x="267" y="18" text-anchor="middle" fill="#FCA5A5" font-size="9.5" font-weight="800">SOLID (実線): PROHIBITED</text>
    </svg>`;
  }
  if (type === 'ngo_ils_sign') {
    return `<svg viewBox="0 0 360 150" style="width:100%;max-width:380px;display:block;margin:0 auto;border-radius:8px;background:#0F172A;">
      <circle cx="180" cy="24" r="14" fill="#EF4444"/>
      <circle cx="180" cy="24" r="20" fill="#EF4444" fill-opacity="0.28"/>
      <rect x="64" y="42" width="232" height="72" rx="6" fill="#F8FAFC" stroke="#DC2626" stroke-width="4"/>
      <text x="180" y="68" text-anchor="middle" fill="#DC2626" font-size="16" font-weight="900">ILS RESTRICTED AREA</text>
      <text x="180" y="88" text-anchor="middle" fill="#0F172A" font-size="11.5" font-weight="700">RED LAMP ON = NO ENTRY (DETOUR)</text>
      <text x="180" y="104" text-anchor="middle" fill="#475569" font-size="9.5">50m ZONE: NO STOPPING / PARKING AT ANY TIME</text>
      <text x="180" y="136" text-anchor="middle" fill="#93C5FD" font-size="10" font-family="monospace">Protects Instrument Landing System radio beams</text>
    </svg>`;
  }
  if (type === 'ngo_light_gun') {
    const rows = [
      { y: 16, c: '#EF4444', dash: '', lbl: 'STEADY RED', act: 'STOP / HOLD' },
      { y: 42, c: '#EF4444', dash: 'flash', lbl: 'FLASHING RED', act: 'CLEAR RWY/TWY' },
      { y: 68, c: '#22C55E', dash: '', lbl: 'STEADY GREEN', act: 'CLEARED TO CROSS' },
      { y: 94, c: '#F59E0B', dash: 'alt', lbl: 'RED ↔ GREEN', act: 'EXERCISE CAUTION' },
      { y: 120, c: '#F8FAFC', dash: 'flash', lbl: 'FLASHING WHITE', act: 'RETURN TO START' }
    ];
    return `<svg viewBox="0 0 360 150" style="width:100%;max-width:380px;display:block;margin:0 auto;border-radius:8px;background:#0F172A;">
      ${rows.map(r => `
        <circle cx="34" cy="${r.y + 8}" r="9" fill="${r.c}" stroke="${r.dash ? '#FDE047' : 'none'}" stroke-width="2" stroke-dasharray="3,2"/>
        <text x="58" y="${r.y + 12}" fill="#E2E8F0" font-size="10.5" font-weight="800" font-family="monospace">${r.lbl}</text>
        <text x="205" y="${r.y + 12}" fill="#38BDF8" font-size="10.5" font-weight="700">${r.act}</text>
      `).join('')}
    </svg>`;
  }
  return '';
}

// 50 Official Chubu Centrair (NGO) Airside Vehicle Driving License Questions (Pure JA / VI / EN)
export const NGO_DRIVING_QUIZ = [
  {
    id: 'NGO01', topic: 'ngo_driving', visual: 'ngo_pass_colors',
    qJa: '中部国際空港の「制限区域」で制限されている3つの事項の組み合わせとして正しいのはどれですか？',
    qVi: '3 nội dung bị hạn chế trong Khu vực hạn chế (制限区域) tại Sân bay Chubu Centrair (NGO) là gì?',
    qEn: 'Which three activities are controlled inside the Restricted Area at Chubu Centrair International Airport (NGO)?',
    optsJa: ['人の立入・車両の運転・車両の使用', '航空機の着陸・旅客の購入・写真撮影', '燃料給油・貨物検査・駐車場利用', '乗務員交代・清掃・警備巡回'],
    optsVi: ['Ra vào của con người · Lái phương tiện · Sử dụng phương tiện', 'Hạ cánh tàu bay · Mua sắm · Chụp ảnh', 'Tra dầu · Soi chiếu hàng · Đỗ xe công cộng', 'Đổi phi hành đoàn · Vệ sinh · Tuần tra'],
    optsEn: ['Entry of persons, driving of vehicles, and use of vehicles', 'Aircraft landing, passenger shopping, and photography', 'Refueling, cargo screening, and public parking', 'Crew change, cleaning, and security patrols'],
    ans: 0,
    expJa: '制限区域（J01）では運航の安全と秩序維持のため「人の立入」「車両の運転」「車両の使用」の3つを制限しています。',
    expVi: 'Tài liệu J01 quy định Khu vực hạn chế kiểm soát 3 yếu tố: ra vào của người, lái xe và sử dụng phương tiện để đảm bảo an toàn khai thác.',
    expEn: 'Centrair J01 restricts entry of persons, driving of vehicles, and use of vehicles to maintain operational safety and order.'
  },
  {
    id: 'NGO02', topic: 'ngo_driving', visual: 'ngo_pass_colors',
    qJa: '中部国際空港の制限区域立入証のうち、CJIAC管理区域と税関管理区域の両方に入り「船陸交通等許可あり」を示すパスの色は？',
    qVi: 'Thẻ ra vào khu vực hạn chế Centrair nào cho phép vào cả khu CJIAC và khu Hải quan CÓ giấy phép giao nhận hàng (船陸交通等許可あり)?',
    qEn: 'Which Centrair Restricted Area pass color grants access to both CJIAC and Customs areas WITH a goods-transfer permit (船陸交通)?',
    optsJa: ['青色（標準パス）', '黄色（共通パス）', '赤色（共通パス）', '紫色（ビジターパス）'],
    optsVi: ['Màu Xanh dương (Thẻ Tiêu chuẩn)', 'Màu Vàng (Thẻ Chung không phép)', 'Màu Đỏ (Thẻ Chung có phép)', 'Màu Tím (Thẻ Khách Hải quan)'],
    optsEn: ['Blue (Standard Pass)', 'Yellow (Common Pass without transfer permit)', 'Red (Common Pass with transfer permit)', 'Purple (Customs Visitor Pass)'],
    ans: 2,
    expJa: '青＝標準パス（CJIACのみ）、黄＝共通パス（船陸交通許可なし）、赤＝共通パス（船陸交通許可あり）、水色＝特別/CJIACビジター、紫＝税関CIQビジターです。',
    expVi: 'Xanh dương = chuẩn CJIAC; Vàng = thẻ chung không phép 船陸交通; Đỏ = thẻ chung CÓ phép 船陸交通; Xanh nhạt = Đặc biệt/Khách CJIAC; Tím = Khách Hải quan CIQ.',
    expEn: 'Blue = CJIAC Standard, Yellow = Common (no transfer), Red = Common (with transfer permit), Light Blue = Special/CJIAC Visitor, Purple = Customs CIQ Visitor.'
  },
  {
    id: 'NGO03', topic: 'ngo_driving', visual: 'ngo_pass_colors',
    qJa: '制限区域立入証の略号表記で「G制」「場周」「際保」が表す区域の正しい組み合わせはどれですか？',
    qVi: 'Các ký hiệu viết tắt trên thẻ ra vào NGO: 「G制」「場周」「際保」 tương ứng với khu vực nào?',
    qEn: 'On a Centrair ID pass, what do the abbreviations "G制", "場周", and "際保" stand for?',
    optsJa: ['GSE・制限 ／ 場周道路 ／ 国際保安区域', 'ゲート制御 ／ 駐車場周囲 ／ 際内連絡路', '地上整備 ／ 場外周回 ／ 国際貨物上屋', '貨物制限 ／ 場内周遊 ／ 国際到着口'],
    optsVi: ['Đường GSE hạn chế / Đường vành đai / Khu an ninh quốc tế', 'Kiểm soát cổng / Bãi đỗ xe / Đường nội bộ', 'Bảo dưỡng mặt đất / Đường ngoài / Kho hàng quốc tế', 'Hạn chế hàng hóa / Vòng quanh sân / Ga đến quốc tế'],
    optsEn: ['GSE-lane / Airport Perimeter Road / International Security Area', 'Gate Control / Parking Perimeter / International Corridor', 'Ground Maintenance / Outer Loop / International Cargo', 'Goods Restricted / Field Loop / International Arrivals'],
    ans: 0,
    expJa: 'パス略号は「着陸＝着陸帯等」「エプ＝エプロン」「場周＝場周道路」「G制＝GSE・制限」「内保＝国内保安区域」「際保＝国際保安区域」です。×印の区域は立入厳禁です。',
    expVi: '6 ký hiệu chuẩn: 着陸 (Dải hạ cánh), エプ (Sân đỗ Apron), 場周 (Đường vành đai), G制 (Đường GSE), 内保 (An ninh nội địa), 際保 (An ninh quốc tế). Khu bị gạch × cấm tuyệt đối.',
    expEn: 'Pass notations: 着陸 (Landing Strip), エプ (Apron), 場周 (Perimeter Road), G制 (GSE-lane), 内保 (Domestic Security), 際保 (International Security).'
  },
  {
    id: 'NGO04', topic: 'ngo_driving',
    qJa: '税関が発行する紫色のビジターパス（国際保安区域・CIQ構内一時立入）およびCJIACビジターパスの有効期限はそれぞれ？',
    qVi: 'Thời hạn hiệu lực của Thẻ Khách Hải quan màu Tím (CIQ) và Thẻ Khách CJIAC màu Xanh nhạt lần lượt là bao lâu?',
    qEn: 'What are the maximum validity periods for the Purple Customs Visitor Pass and Light-Blue CJIAC Visitor Pass?',
    optsJa: ['紫色：7日未満 ／ 水色ビジター：24時間未満', '紫色：1ヶ月未満 ／ 水色ビジター：7日未満', '紫色：24時間未満 ／ 水色ビジター：1年未満', '両方とも3ヶ月未満'],
    optsVi: ['Thẻ Tím: dưới 7 ngày / Thẻ Xanh nhạt (Visitor): dưới 24 giờ', 'Thẻ Tím: dưới 1 tháng / Thẻ Xanh nhạt: dưới 7 ngày', 'Thẻ Tím: dưới 24 giờ / Thẻ Xanh nhạt: dưới 1 năm', 'Cả hai đều dưới 3 tháng'],
    optsEn: ['Purple: under 7 days / Light-Blue Visitor: under 24 hours', 'Purple: under 1 month / Light-Blue Visitor: under 7 days', 'Purple: under 24 hours / Light-Blue Visitor: under 1 year', 'Both are valid for under 3 months'],
    ans: 0,
    expJa: '特別パス（水色）＝1ヶ月未満、CJIACビジターパス（水色）＝24H未満、税関ビジターパス（紫）＝7日未満です。',
    expVi: 'Thẻ Đặc biệt (xanh nhạt) < 1 tháng; Thẻ Khách CJIAC (xanh nhạt) < 24 giờ; Thẻ Khách Hải quan (tím) < 7 ngày.',
    expEn: 'Special Pass < 1 month; CJIAC Visitor Pass < 24 hours; Customs CIQ Visitor Pass < 7 days.'
  },
  {
    id: 'NGO05', topic: 'ngo_driving',
    qJa: '制限区域内で許可されていない区域の扉を操作してしまった場合、どうなりますか？',
    qVi: 'Điều gì xảy ra nếu bạn tự ý thao tác mở cửa dẫn sang khu vực không được cấp phép trên thẻ?',
    qEn: 'What happens if you operate a door leading to an area not authorized on your ID pass?',
    optsJa: ['警備所に警報が発報されるため、操作自体が厳禁である', '自動で解除されるので問題ない', '5分後に記録だけが残る', '共通パスならどの扉でも開けてよい'],
    optsVi: ['Hệ thống sẽ báo động trực tiếp về phòng an ninh nên tuyệt đối cấm thao tác', 'Cửa tự mở không có vấn đề gì', 'Chỉ ghi lại nhật ký sau 5 phút', 'Có thẻ chung thì được mở mọi cửa'],
    optsEn: ['An alarm is immediately triggered at the security office; operating unauthorized doors is strictly prohibited', 'The door unlocks automatically without issue', 'Only a passive log is saved after 5 minutes', 'A Common Pass allows opening any door'],
    ans: 0,
    expJa: '許可されていない区域への立入および扉の操作は厳禁であり、操作すると警備所に警報が鳴ります。',
    expVi: 'Cấm tuyệt đối đi vào hoặc bấm mở cửa khu vực không được cấp phép vì sẽ kích hoạt chuông báo động tại phòng bảo vệ.',
    expEn: 'Entering or even operating doors to unauthorized areas is strictly forbidden and triggers a security office alarm.'
  },
  {
    id: 'NGO06', topic: 'ngo_driving',
    qJa: '制限区域の大原則である「航空機最優先」の4つの理由に含まれないものはどれですか？',
    qVi: 'Lý do nào KHÔNG nằm trong 4 lý do giải thích nguyên tắc tối thượng "Ưu tiên tàu bay tuyệt đối" (航空機最優先)?',
    qEn: 'Which of the following is NOT one of the 4 official reasons for the "Aircraft Always Have Priority" rule?',
    optsJa: ['コックピットからは死角が多い', '機体の特性上、機敏な動きができない', '大量の可燃性物質を積載しており、航空機は大変高価である', '航空機にはブレーキ装置が装備されていない'],
    optsVi: ['Buồng lái có rất nhiều điểm mù', 'Đặc tính tàu bay không thể chuyển hướng/dừng linh hoạt', 'Chở lượng lớn nhiên liệu dễ cháy và giá trị tàu bay cực kỳ đắt đỏ', 'Tàu bay không được trang bị hệ thống phanh'],
    optsEn: ['Many blind spots from the cockpit', 'Aircraft cannot maneuver nimbly', 'Carries large amounts of flammable fuel and is extremely expensive', 'Aircraft are not equipped with brakes'],
    ans: 3,
    expJa: '航空機最優先の4理由は①コックピットの死角が多い ②機敏な動きができない ③大量の可燃性物質を積載 ④大変高価である、です。',
    expVi: '4 lý do chính thức: (1) Nhiều điểm mù từ buồng lái, (2) Không thể cơ động linh hoạt, (3) Mang lượng lớn nhiên liệu dễ cháy, (4) Giá trị cực cao.',
    expEn: 'The 4 official reasons are cockpit blind spots, limited agility, large quantities of flammable fuel, and extremely high cost.'
  },
  {
    id: 'NGO07', topic: 'ngo_driving',
    qJa: '制限区域内で夜間走行する場合の前照灯（ヘッドライト）の正しい使い方は？',
    qVi: 'Khi lái xe ban đêm trong khu vực hạn chế sân bay, đèn pha (前照灯) phải để chế độ nào?',
    qEn: 'How must vehicle headlights be operated when driving at night inside the airport restricted area?',
    optsJa: ['常に下向き（ロービーム）とする（空港内で上向きにはしない）', '見通しが悪い場所では上向き（ハイビーム）にする', '滑走路側を走るときは消灯する', 'ハザードランプのみ点滅させる'],
    optsVi: ['Luôn để chiếu gần (Low Beam), tuyệt đối không bật đèn chiếu xa trong sân bay', 'Bật đèn pha chiếu xa ở chỗ tối', 'Tắt toàn bộ đèn khi đi gần đường băng', 'Chỉ bật đèn khẩn cấp hazard'],
    optsEn: ['Always keep headlights on low beam (never use high beams inside the airport)', 'Switch to high beams in dark areas', 'Turn headlights completely off near the runway', 'Flash hazard lights only'],
    ans: 0,
    expJa: 'パイロットや他の作業員の眩惑を防ぐため、空港内の夜間走行では前照灯は常に下向き（ロービーム）とします。',
    expVi: 'Để tránh làm chói mắt phi công và nhân viên sân đỗ, khi chạy ban đêm trong sân bay luôn để đèn chiếu gần (cốt).',
    expEn: 'Headlights must always remain on low beam at night to prevent blinding pilots and ground personnel.'
  },
  {
    id: 'NGO08', topic: 'ngo_driving',
    qJa: '制限区域内で車両同士が正面または近い角度で向かい合って接近した場合の正しい行動は？',
    qVi: 'Khi hai xe chạy đối đầu hoặc tiến lại gần nhau ở góc hẹp trong khu vực hạn chế, hai xe phải xử lý thế nào?',
    qEn: 'When two vehicles approach each other head-on or at a near-head-on angle in the restricted area, what must they do?',
    optsJa: ['速度を落とし、お互いに左へ進路を変える', 'クラクションを鳴らして右へ避ける', '大型車がそのまま直進する', 'その場で後退する'],
    optsVi: ['Giảm tốc độ và cả hai cùng chuyển hướng sang bên TRÁI', 'Bấm còi và đánh lái sang bên phải', 'Xe lớn hơn cứ đi thẳng', 'Dừng lại rồi lùi ngay tại chỗ'],
    optsEn: ['Slow down and both steer to the LEFT', 'Honk and swerve to the right', 'The larger vehicle continues straight', 'Reverse immediately in place'],
    ans: 0,
    expJa: '制限区域内は原則左側通行であり、向かい合って接近する車両同士は速度を落とし互いに左へ進路を変えます。',
    expVi: 'Nguyên tắc chung là đi bên trái; khi tiến sát đối đầu nhau phải giảm tốc và cả hai cùng tránh về bên trái.',
    expEn: 'Keep-left rules apply: both approaching vehicles slow down and alter course to the left.'
  },
  {
    id: 'NGO09', topic: 'ngo_driving',
    qJa: '中部国際空港の制限速度として、正しい組み合わせはどれですか？',
    qVi: 'Tổ hợp tốc độ giới hạn nào ĐÚNG chuẩn theo quy định Sân bay Chubu Centrair (NGO)?',
    qEn: 'Which set of speed limits matches Chubu Centrair (NGO) airside regulations?',
    optsJa: ['場周道路40km/h・GSE通行帯30km/h・牽引中15km/h・航空機牽引10km/h', '場周道路60km/h・GSE通行帯40km/h・牽引中20km/h・航空機牽引15km/h', '場周道路50km/h・GSE通行帯30km/h・牽引中25km/h・航空機牽引10km/h', '全区域一律30km/h'],
    optsVi: ['Đường vành đai 40 km/h · Đường GSE 30 km/h · Kéo rơ-moóc 15 km/h · Kéo tàu bay 10 km/h', 'Đường vành đai 60 km/h · Đường GSE 40 km/h · Kéo moóc 20 km/h · Kéo tàu bay 15 km/h', 'Đường vành đai 50 km/h · Đường GSE 30 km/h · Kéo moóc 25 km/h · Kéo tàu bay 10 km/h', 'Toàn sân bay đồng nhất 30 km/h'],
    optsEn: ['Perimeter Road 40 km/h · GSE Lane 30 km/h · Towing Carts 15 km/h · Towing Aircraft 10 km/h', 'Perimeter Road 60 km/h · GSE Lane 40 km/h · Towing Carts 20 km/h · Towing Aircraft 15 km/h', 'Perimeter Road 50 km/h · GSE Lane 30 km/h · Towing Carts 25 km/h · Towing Aircraft 10 km/h', '30 km/h uniformly everywhere'],
    ans: 0,
    expJa: '場周道路40km/h、場周道路以外（GSE・エプロン）30km/h、カート牽引中・航空機周辺30m以内15km/h、航空機牽引・手荷物荷捌場内・航空機へ5m以内10km/hです。',
    expVi: 'Đường vành đai 40; GSE/Apron 30; Kéo moóc & trong 30m quanh máy bay 15; Kéo máy bay, khu hành lý (xe điện) & tiến sát 5m là 10 km/h.',
    expEn: 'Perimeter 40, GSE/Apron 30, towing carts or within 30m of aircraft 15, towing aircraft / baggage hall / within 5m approaching aircraft 10 km/h.'
  },
  {
    id: 'NGO10', topic: 'ngo_driving',
    qJa: '航空機周辺を走行する際の距離別制限速度として正しいのはどれですか？',
    qVi: 'Giới hạn tốc độ theo khoảng cách khi lái xe gần tàu bay là bao nhiêu?',
    qEn: 'What are the distance-based speed limits around an aircraft?',
    optsJa: ['航空機周辺30m以内：15km/h ／ 航空機に向かって5m以内：10km/h', '航空機周辺50m以内：20km/h ／ 航空機に向かって10m以内：15km/h', '航空機周辺20m以内：20km/h ／ 航空機に向かって5m以内：5km/h', '距離による速度制限はない'],
    optsVi: ['Trong phạm vi 30m quanh tàu bay: 15 km/h / Tiến về phía tàu bay trong 5m: 10 km/h', 'Trong phạm vi 50m: 20 km/h / Trong 10m: 15 km/h', 'Trong phạm vi 20m: 20 km/h / Trong 5m: 5 km/h', 'Không có giới hạn tốc độ theo khoảng cách'],
    optsEn: ['Within 30m of aircraft: 15 km/h / Approaching within 5m: 10 km/h', 'Within 50m: 20 km/h / Within 10m: 15 km/h', 'Within 20m: 20 km/h / Within 5m: 5 km/h', 'No distance-based speed limit exists'],
    ans: 0,
    expJa: '航空機周辺30m以内は15km/h、航空機に向かって走行し5m以内は10km/hが規定です。',
    expVi: 'Trong bán kính 30m quanh tàu bay tối đa 15 km/h; khi tiến thẳng về phía tàu bay trong 5m tối đa 10 km/h.',
    expEn: 'Maximum 15 km/h within 30m of an aircraft, and 10 km/h when approaching within 5m.'
  },
  {
    id: 'NGO11', topic: 'ngo_driving',
    qJa: '手荷物荷捌き場内（バゲージメイクアップ）の走行ルールとして正しいのはどれですか？',
    qVi: 'Quy định chạy xe bên trong khu phân loại hành lý (手荷物荷捌き場内) là gì?',
    qEn: 'What rule applies inside the Baggage Make-up Area (手荷物荷捌き場内)?',
    optsJa: ['制限速度10km/h・電気駆動車のみ通行可', '制限速度15km/h・ディーゼル車も通行可', '制限速度30km/h・全GSE通行可', '車両は一切進入不可'],
    optsVi: ['Giới hạn tốc độ 10 km/h và chỉ cho phép xe chạy điện', 'Giới hạn 15 km/h, xe diesel được vào', 'Giới hạn 30 km/h cho mọi xe GSE', 'Cấm hoàn toàn mọi loại xe'],
    optsEn: ['10 km/h speed limit, electric-powered vehicles only', '15 km/h speed limit, diesel vehicles permitted', '30 km/h speed limit for all GSE', 'No vehicles permitted at all'],
    ans: 0,
    expJa: '手荷物荷捌き場内は屋内空間のため排気ガス防止・安全確保から「10km/h・電気駆動車のみ」と定められています。',
    expVi: 'Vì là khu vực trong nhà nên quy định bắt buộc tối đa 10 km/h và chỉ dùng xe chạy điện (電気駆動車のみ).',
    expEn: 'Inside the indoor baggage handling area, only electric-powered vehicles are permitted at max 10 km/h.'
  },
  {
    id: 'NGO12', topic: 'ngo_driving',
    qJa: '中部国際空港で全高が何メートルを超える車両は「固定橋下部」「センターピアトンネル」「南ウイング2ゲート付近」を通行できませんか？',
    qVi: 'Xe có chiều cao vượt quá bao nhiêu mét bị cấm đi qua gầm cầu cố định, hầm Center Pier và khu vực gần Gate 2 cánh Nam?',
    qEn: 'Vehicles exceeding what height cannot pass under fixed bridges, the Center Pier tunnel, or near South Wing Gate 2?',
    optsJa: ['3.0 m', '3.5 m', '3.8 m', '4.2 m'],
    optsVi: ['3.0 m', '3.5 m', '3.8 m', '4.2 m'],
    optsEn: ['3.0 m', '3.5 m', '3.8 m', '4.2 m'],
    ans: 2,
    expJa: '全高3.8mを超える車両（ハイリフト車・タラップ車等）は固定橋下やトンネルを通行できず、スポット後方車両通行帯を通行します。',
    expVi: 'Xe cao trên 3.8m không được qua gầm cầu cố định và hầm T1, phải đi vòng theo Đường xe sau bãi đỗ (スポット後方車両通行帯).',
    expEn: 'Vehicles taller than 3.8m cannot pass under fixed bridges or T1 tunnels and must detour via the behind-stand vehicle road.'
  },
  {
    id: 'NGO13', topic: 'ngo_driving',
    qJa: '全高3.8m超の車両がセンターピア先端（スポット12〜13の間）を通過する際の正しいルールは？',
    qVi: 'Khi xe cao trên 3.8m đi vòng qua mũi Center Pier (giữa Spot #12 và #13), quy tắc nào đúng?',
    qEn: 'What rules apply when a vehicle taller than 3.8m travels around the tip of the Center Pier (between Spots 12 and 13)?',
    optsJa: ['3.8m超車両限定ルートであり、赤線（ABL）を絶対越えず、幅が狭いため譲り合って通行する', 'どの普通車両でも近道として自由にすれ違ってよい', '誘導路側の赤線を少しまたいで通過する', '制限速度は40km/hである'],
    optsVi: ['Chỉ dành riêng cho xe >3.8m, tuyệt đối không lấn qua vạch đỏ (ABL) và đường hẹp không tránh nhau được nên phải nhường đường', 'Mọi xe thường đều được đi tắt và tránh nhau thoải mái', 'Được phép đè nhẹ sang vạch đỏ đường lăn', 'Giới hạn tốc độ là 40 km/h'],
    optsEn: ['Restricted to >3.8m vehicles only; never cross the red ABL line; narrow single-width passage requiring yielding', 'Any normal vehicle may use it as a two-way shortcut', 'Slightly crossing the red taxiway line is acceptable', 'Speed limit is 40 km/h'],
    ans: 0,
    expJa: 'センターピア先端とエプロン境界線（ABL）の間は①3.8m超車両限定 ②赤線絶対厳守 ③狭隘ですれ違い不可のため譲り合い、が必須です。',
    expVi: 'Đoạn mũi Center Pier sát vạch đỏ ABL chỉ dành riêng xe >3.8m, tuyệt đối không vượt vạch đỏ, và đường hẹp không tránh nhau được nên phải nhường nhau.',
    expEn: 'The Center Pier tip corridor along the red ABL is exclusively for >3.8m vehicles, red line crossing is forbidden, and drivers must yield as two vehicles cannot pass abreast.'
  },
  {
    id: 'NGO14', topic: 'ngo_driving', visual: 'ngo_solid_dashed',
    qJa: 'GSE通行帯等において、路面の中央線や車線間の白線が「実線」と「破線」の場合の違いは？',
    qVi: 'Trên đường GSE trong khu vực hạn chế, sự khác nhau giữa vạch trắng nét liền (実線) và nét đứt (破線) là gì?',
    qEn: 'In the restricted area, what is the difference between white solid lines (実線) and white dashed lines (破線)?',
    optsJa: ['実線ははみ出し・車線変更・追い越し禁止、破線は安全確認のうえ可能', '一般道と同じで実線でも自由に車線変更できる', '破線が追い越し禁止、実線が追い越し可能', 'どちらも意味は同じである'],
    optsVi: ['Nét liền cấm lấn làn/đổi làn/vượt; nét đứt được phép chuyển làn hoặc vượt sau khi kiểm tra an toàn', 'Giống đường thường, nét liền vẫn đổi làn thoải mái', 'Nét đứt cấm vượt, nét liền được vượt', 'Cả hai có ý nghĩa giống nhau'],
    optsEn: ['Solid line prohibits crossing/lane change/overtaking; dashed line permits it when safe', 'Just like public roads, crossing a solid lane line is allowed', 'Dashed prohibits overtaking while solid allows it', 'Both have identical meanings'],
    ans: 0,
    expJa: '制限区域内では一般道と異なり、車線間の白線（車両通行帯境界線）も中央線と同様に「実線＝はみ出し・車線変更禁止」「破線＝可能」です。',
    expVi: 'Khác đường công cộng, trong sân bay cả vạch tim đường và vạch phân làn cùng chiều đều quy định: Nét liền = cấm lấn/chuyển làn; Nét đứt = được phép.',
    expEn: 'Unlike public roads, inside the restricted area both centerlines and lane boundary lines follow: solid = no crossing/lane change, dashed = permitted when safe.'
  },
  {
    id: 'NGO15', topic: 'ngo_driving', visual: 'ngo_solid_dashed',
    qJa: '片側2車線のGSE道路で「並走禁止」となっている場所および対象車両は？',
    qVi: 'Quy định "Cấm chạy song song" (並走禁止) trên đường 2 làn áp dụng tại những vị trí nào và cho đối tượng nào?',
    qEn: 'Where does the "No Driving Abreast" (並走禁止) rule apply, and to which vehicles?',
    optsJa: ['すべての交差点付近・曲線道路区間（特に1番スポット脇カーブ）で「すべての車両」が対象', '大型バスとトーイングカーのみ対象', '1番スポット脇のカーブのみ対象', '夜間のみ対象'],
    optsVi: ['Tại TẤT CẢ khu vực gần ngã tư và đoạn đường cong (đặc biệt cua Spot #1), áp dụng cho TẤT CẢ các phương tiện', 'Chỉ áp dụng cho xe buýt lớn và xe kéo máy bay', 'Chỉ áp dụng duy nhất tại khúc cua Spot #1', 'Chỉ áp dụng vào ban đêm'],
    optsEn: ['All intersections and curved road sections (especially Spot #1 curve), applying to ALL vehicles', 'Only large buses and pushback tractors', 'Only at the Spot #1 curve', 'Only during nighttime'],
    ans: 0,
    expJa: '大型車・牽引車の内輪差やオーバーハングによる接触事故を防ぐため、すべての交差点付近・曲線区間で「全車両」の並走が禁止です。',
    expVi: 'Để tránh va chạm do chênh lệch bán kính quay/đuôi xe văng của xe lớn và xe kéo, CẤM MỌI XE chạy song song ở tất cả các ngã tư và đoạn cua.',
    expEn: 'To prevent sideswipes from off-tracking and overhang, parallel driving is prohibited for ALL vehicles at every intersection and curve.'
  },
  {
    id: 'NGO16', topic: 'ngo_driving',
    qJa: 'カート類や無動力車を牽引してGSEレーンを走行するときの正しいルールは？',
    qVi: 'Quy tắc đúng khi kéo rơ-moóc (カート類 / 無動力車) chạy trên đường GSE là gì?',
    qEn: 'Which rules govern towing baggage carts or non-motorized dollies on GSE lanes?',
    optsJa: ['制限速度15km/h・牽引は6台まで（牽引車含め最大7台連結）・左側（2車線は左車線の左側）を走行', '制限速度20km/h・牽引は8台まで・右車線を走行', '制限速度30km/h・台数制限なし', '制限速度10km/h・牽引は3台まで'],
    optsVi: ['Tối đa 15 km/h · Kéo tối đa 6 rơ-moóc (tổng 7 xe gồm đầu kéo) · Đi sát bên trái (làn trái nếu có 2 làn)', 'Tối đa 20 km/h · Kéo tối đa 8 moóc · Đi làn phải', 'Tối đa 30 km/h · Không giới hạn số moóc', 'Tối đa 10 km/h · Kéo tối đa 3 moóc'],
    optsEn: ['Max 15 km/h, max 6 towed carts (7 units total incl. tractor), keep left (left side of left lane on 2-lane roads)', 'Max 20 km/h, max 8 carts, use right lane', 'Max 30 km/h, no cart limit', 'Max 10 km/h, max 3 carts'],
    ans: 0,
    expJa: '牽引中は15km/h、牽引台数は6台まで（引っ張る車両を含め最大7台連結）、1車線は左側・片側2車線は左車線の左側を走行します。',
    expVi: 'Tốc độ khi kéo là 15 km/h, tối đa 6 rơ-moóc (tổng 7 xe gồm đầu kéo), chạy sát mép trái làn trái và bố trí người quan sát nếu cần.',
    expEn: 'Towing speed is 15 km/h, max 6 towed units (7 total), keeping to the left side of the left lane with an escort if needed.'
  },
  {
    id: 'NGO17', topic: 'ngo_driving',
    qJa: '空港消防所前を通行する際、①②の「赤色回転灯」が点灯しているときの正しい対応は？',
    qVi: 'Khi đi ngang Trạm cứu hỏa sân bay và thấy đèn xoay đỏ (赤色回転灯) ① hoặc ② đang bật sáng, bạn phải làm gì?',
    qEn: 'When passing the Airport Fire Station while the red rotating beacons (①/②) are illuminated, what must you do?',
    optsJa: ['消防車両出動のため、駐停車禁止標識の手前で停止し、地上監視員の指示（不在時は安全確認）に従う', '駐停車禁止区域内に入ってすぐ端に寄せて止まる', '消防車より先に素早く通過する', 'そのまま30km/hで直進する'],
    optsVi: ['Xe cứu hỏa sắp xuất phát: phải DỪNG TRƯỚC khu vực biển cấm dừng đỗ và tuân theo hiệu lệnh nhân viên hướng dẫn (hoặc quan sát an toàn nếu không có người)', 'Lái vào giữa khu cấm dừng đỗ rồi mới tấp lề dừng lại', 'Tăng tốc chạy vượt qua trước khi xe cứu hỏa ra', 'Cứ chạy thẳng 30 km/h bình thường'],
    optsEn: ['Fire apparatus are deploying: stop BEFORE the No-Stopping zone sign and follow the ground marshaller (or verify clearance if unattended)', 'Enter the No-Stopping zone and pull over inside it', 'Accelerate to pass ahead of the fire truck', 'Proceed straight at 30 km/h'],
    ans: 0,
    expJa: '赤色回転灯点灯時は消火救難車両が出動するため、駐停車禁止標識の「手前」で停止して監視員の指示に従います。標識内は駐停車禁止です。',
    expVi: 'Khi đèn đỏ bật tức là xe cứu hỏa xuất kích: dừng TRƯỚC vạch cấm dừng đỗ để không cản lối ra của xe chữa cháy.',
    expEn: 'Red beacons warn of fire truck dispatch; stop short of the No-Stopping zone and yield completely.'
  },
  {
    id: 'NGO18', topic: 'ngo_driving',
    qJa: '路面の停止表示で「STOP標識＋停止線」と「停止線のみ」の箇所の違いとして正しいのは？',
    qVi: 'Sự khác nhau giữa nơi có 「STOP + vạch dừng (停止線)」 và nơi 「chỉ có vạch dừng」 là gì?',
    qEn: 'What is the difference between a "STOP + Stop Line" marking and a "Stop Line Only" marking?',
    optsJa: ['STOP＋停止線は必ず一時停止、停止線のみは直進車停止不要・右折時は基本停止（周囲安全確認できれば徐行可）', 'どちらも毎回必ず完全停止しなければならない', 'STOP標識は大型車のみ一時停止が必要', '停止線のみの場所では右折時も徐行不要'],
    optsVi: ['Có STOP + vạch dừng: BẮT BUỘC dừng hẳn. Chỉ có vạch dừng: xe đi thẳng không cần dừng; xe rẽ phải cơ bản dừng quan sát (nếu trống hoàn toàn có thể đi chậm rẽ)', 'Cả hai nơi đều bắt buộc dừng tuyệt đối', 'Biển STOP chỉ áp dụng cho xe tải lớn', 'Chỉ có vạch dừng thì rẽ phải không cần giảm tốc'],
    optsEn: ['STOP + line requires a mandatory full stop; line-only requires no stop for straight traffic and caution/stop for turning traffic (slow turn allowed if completely clear)', 'Both require a mandatory full stop for all directions', 'STOP only applies to heavy vehicles', 'No slowing down is required at line-only turns'],
    ans: 0,
    expJa: 'STOP標識がある箇所は必ず一時停止。停止線だけの箇所は直進車は停止不要、右折時は安全確認し周囲に車・人が全くなければ徐行で曲がれます。',
    expVi: 'Có chữ STOP thì luôn phải dừng hẳn. Chỉ có vạch dừng thì xe đi thẳng đi tiếp, xe rẽ phải quan sát an toàn (nếu tuyệt đối không có xe/người có thể rẽ chậm).',
    expEn: 'Always come to a full stop at STOP + line. At line-only markings, straight traffic proceeds; turning vehicles yield/stop unless completely clear to turn slowly.'
  },
  {
    id: 'NGO19', topic: 'ngo_driving',
    qJa: 'ターミナルビル前の「横断歩道（スポット8・9付近）」と緑色の「歩行者・自転車通行帯」の優先関係の違いは？',
    qVi: 'Sự khác nhau về quyền ưu tiên giữa Vạch sang đường (横断歩道 gần Spot #8, #9) và Làn đi bộ/xe đạp màu xanh lá (歩行者・自転車通行帯) là gì?',
    qEn: 'How does right-of-way differ between the Crosswalks (near Spots 8 & 9) and the green Pedestrian/Bicycle Lanes?',
    optsJa: ['横断歩道は歩行者優先（横断者いれば一時停止）、緑の歩行者・自転車通行帯は横断歩道ではなく車両優先（歩行者が譲る）', 'どちらも歩行者優先で車両は必ず一時停止する', 'どちらも車両優先である', '9番スポット付近は乗客は通らない'],
    optsVi: ['Vạch sang đường (横断歩道) ưu tiên người đi bộ (phải dừng nhường, nhất là khách ở #9); Làn xanh lá KHÔNG phải vạch sang đường nên người đi bộ/xe đạp phải nhường xe', 'Cả hai đều ưu tiên tuyệt đối cho người đi bộ', 'Cả hai đều ưu tiên xe cơ giới', 'Khu vực Spot #9 không có hành khách đi qua'],
    optsEn: ['Crosswalks give priority to pedestrians (yield/stop, esp. passengers near Spot 9); Green lanes are NOT crosswalks so pedestrians/cyclists must yield to vehicles', 'Both give absolute priority to pedestrians', 'Both give priority to vehicles', 'Passengers never use the Spot 9 crosswalk'],
    ans: 0,
    expJa: 'スポット8・9付近の横断歩道（特にお客様が通る9番付近）は歩行者優先。一方、緑色の歩行者・自転車通行帯は歩行者優先ではなく、車両の通行を妨げてはいけません。',
    expVi: 'Vạch sang đường ở #8/#9 ưu tiên người đi bộ (Spot #9 có hành khách đi bộ ra xe buýt). Ngược lại, làn sơn xanh lá không ưu tiên người đi bộ — người đi bộ phải nhường xe GSE.',
    expEn: 'Crosswalks near Spots 8 & 9 give pedestrian priority (passengers cross near Spot 9), whereas green pedestrian/bicycle lanes require pedestrians to yield to GSE vehicles.'
  },
  {
    id: 'NGO20', topic: 'ngo_driving',
    qJa: '国際線バスラウンジ棟周辺の通行方法として正しいのはどれですか？',
    qVi: 'Quy định lưu thông xung quanh nhà chờ xe buýt quốc tế (国際バスラウンジ棟) là gì?',
    qEn: 'What is the traffic flow rule around the International Bus Lounge building?',
    optsJa: ['反時計回りの一方通行（大型車両は23番スポット近くのGSE通行帯から乗り入れる）', '時計回りの一方通行', '対面通行（双方向）', '大型車両は進入禁止'],
    optsVi: ['Đường một chiều chạy NGƯỢC chiều kim đồng hồ (xe lớn nhập vào từ đường GSE gần Spot #23)', 'Đường một chiều theo chiều kim đồng hồ', 'Đường hai chiều thông thường', 'Cấm mọi xe cỡ lớn vào khu vực này'],
    optsEn: ['Counter-clockwise one-way loop (large vehicles enter from the GSE lane near Spot 23)', 'Clockwise one-way loop', 'Two-way traffic', 'All large vehicles are prohibited'],
    ans: 0,
    expJa: '国際線バスラウンジ棟の周囲は反時計回りの一方通行で、大型車両は23番スポット付近のGSE通行帯から進入します。お客様のバスの妨げにならないよう注意します。',
    expVi: 'Xung quanh nhà chờ xe buýt quốc tế là đường 1 chiều ngược chiều kim đồng hồ; xe cỡ lớn đi vào từ làn GSE gần Spot #23 và không cản trở xe buýt chở khách.',
    expEn: 'The International Bus Lounge perimeter is a counter-clockwise one-way loop; large vehicles enter near Spot 23 and must not impede passenger buses.'
  },
  {
    id: 'NGO21', topic: 'ngo_driving',
    qJa: 'センターピア根元のトンネル交差点における優先車線はどれですか？',
    qVi: 'Tại ngã tư cửa hầm gốc Center Pier, hướng xe nào được quyền ưu tiên?',
    qEn: 'At the Center Pier root tunnel intersection, which traffic has priority?',
    optsJa: ['本館に沿って南北からトンネルに入る車およびトンネルから出る車が優先（センターピア側から来る車はSTOPで必ず停止）', 'センターピア側から本館に向かう車が優先', '先に進入した車が優先', '大型車両が常に優先'],
    optsVi: ['Xe dọc nhà ga chính hướng Bắc–Nam đi vào hầm và xe từ trong hầm đi ra được ưu tiên (xe từ hướng Center Pier tới phải dừng hẳn ở STOP nhường đường)', 'Xe từ hướng Center Pier chạy về nhà ga chính được ưu tiên', 'Xe nào tới trước đi trước', 'Xe lớn luôn được ưu tiên'],
    optsEn: ['Traffic entering the tunnel along the main building (N/S) and traffic exiting the tunnel have priority (Center Pier traffic must STOP and yield)', 'Traffic coming from the Center Pier toward the main building has priority', 'First vehicle to arrive has priority', 'Larger vehicles always have priority'],
    ans: 0,
    expJa: 'センターピア根元トンネルでは、本館沿いに南北から入る車・トンネルから出る車が優先で、センターピア方向から来る車はSTOP表示で必ず停止し道を譲ります。',
    expVi: 'Xe dọc nhà ga chính (Bắc–Nam) vào hầm và xe thoát ra khỏi hầm được ưu tiên; xe từ hướng Center Pier bắt buộc dừng ở vạch STOP nhường đường.',
    expEn: 'Vehicles entering along the main terminal N/S or exiting the tunnel have right-of-way; vehicles arriving from the Center Pier must STOP and yield.'
  },
  {
    id: 'NGO22', topic: 'ngo_driving',
    qJa: '第2ターミナル周辺の「管理道路」に関する正しい説明はどれですか？',
    qVi: 'Mô tả nào ĐÚNG về "Đường quản lý" (管理道路) quanh Nhà ga T2?',
    qEn: 'Which statement accurately describes the Management Road (管理道路) around Terminal 2?',
    optsJa: ['対面1車線・舗装強度弱くトーイングカー走行不可・照明なしのため、緊急時（空港維持関連除く）以外は走行禁止', 'トーイングカー専用の高速迂回路である', '2車線で24時間誰でも自由に通行できる', '制限速度は40km/hである'],
    optsVi: ['Đường 1 làn hai chiều, mặt đường yếu cấm xe kéo nặng, không có đèn chiếu sáng nên CẤM chạy ngoại trừ trường hợp khẩn cấp (và xe bảo trì sân bay)', 'Là đường tránh tốc độ cao dành riêng cho xe kéo tàu bay', 'Đường 2 làn mở tự do 24/24 cho mọi GSE', 'Giới hạn tốc độ 40 km/h'],
    optsEn: ['Single-lane two-way, weak pavement (no towing tractors), unlit — prohibited except for emergencies and airport maintenance vehicles', 'High-speed bypass dedicated to pushback tractors', 'Two-lane road open 24/7 to all GSE', '40 km/h speed limit'],
    ans: 0,
    expJa: 'T2周辺の管理道路は対面1車線、舗装強度が弱くトーイングカー不可、照明なしのため、空港維持関連車両を除き緊急時以外は走行禁止です。',
    expVi: 'Đường quản lý quanh T2 chỉ 1 làn đối đầu, nền yếu cấm xe kéo nặng và không có đèn nên cấm lưu thông ngoài tình huống khẩn cấp.',
    expEn: 'The T2 management road is unlit, narrow, and lacks pavement strength for heavy tugs; it is off-limits except for emergencies or maintenance.'
  },
  {
    id: 'NGO23', topic: 'ngo_driving',
    qJa: '第2ターミナル周辺のブラストフェンスに「隙間」が設けられている理由と通行時の注意点は？',
    qVi: 'Tại sao hàng rào chắn luồng phản lực (Blast Fence) quanh T2 có "khe hở" và lái xe cần chú ý gì?',
    qEn: 'Why is there a gap in the Terminal 2 blast fence, and how should drivers behave there?',
    optsJa: ['トーイングカー退避用の隙間であり、航空機後方が向いている場合は横切らず手前で停止する', '近道用の歩行者出入口である', 'ブラストを弱める通風孔なので気にせず通過してよい', '工事中の仮設開口部である'],
    optsVi: ['Là khe dành cho xe kéo tàu bay tránh vào; nếu đuôi máy bay đang hướng vào khe này thì phải dừng trước đó, không băng qua', 'Là lối đi tắt cho người đi bộ', 'Là khe thông gió giảm lực phản lực nên đi qua bình thường', 'Là chỗ mở tạm thời đang thi công'],
    optsEn: ['It is a tug refuge gap; if an aircraft tail faces the gap, stop short and do not cross behind it', 'It is a pedestrian shortcut', 'It is a vent that weakens jet blast so you may pass normally', 'It is a temporary construction opening'],
    ans: 0,
    expJa: 'トーイングカー退避場所のためブラストフェンスに隙間があり、ブラスト注意区間となっています。航空機後方が向いているときは横切らず手前で停止します。',
    expVi: 'Khe hở làm nơi đậu tránh cho xe kéo nên tạo thành điểm hở luồng phản lực; tuyệt đối dừng trước khe nếu đuôi máy bay hướng về phía đó.',
    expEn: 'The gap serves as a towing-tractor refuge; never cross when an aircraft tail is pointed toward the opening.'
  },
  {
    id: 'NGO24', topic: 'ngo_driving',
    qJa: '航空機周辺での車両操作として、正しい記述はどれですか？',
    qVi: 'Thao tác lái xe nào ĐÚNG chuẩn khi hoạt động xung quanh tàu bay?',
    qEn: 'Which vehicle operation rule around an aircraft is correct?',
    optsJa: ['航空機前方・後方・下部での車両操作は禁止。航空機に向かって後退するときは必ず車外に誘導員を配置する', 'バックカメラがあれば誘導員なしで航空機へ後退してよい', '主翼の下を通過すれば移動時間を短縮できる', '停車時はエンジンをかけたままニュートラルにして離れる'],
    optsVi: ['Cấm thao tác xe phía trước, phía sau và dưới gầm tàu bay; khi lùi về phía tàu bay BẮT BUỘC có người đứng ngoài xe xi-nhan hướng dẫn', 'Có camera lùi thì không cần người xi-nhan', 'Được phép chạy tắt dưới cánh tàu bay để tiết kiệm thời gian', 'Đỗ sát máy bay để nguyên máy nổ và về số N'],
    optsEn: ['No vehicle operations directly ahead, behind, or underneath aircraft; always use an external marshaller when reversing toward an aircraft', 'Backup cameras eliminate the need for a guide person', 'Driving under the wing saves time', 'Leave the engine running in neutral when parked near an aircraft'],
    ans: 0,
    expJa: '航空機前方・後方・下部での操作は禁止。後退時は車外誘導員必須。直近停車時は①エンジン停止 ②ギアP ③パーキングブレーキ ④必要に応じ車輪止め、の4点を実施します。',
    expVi: 'Cấm thao tác trước/sau/dưới gầm máy bay; lùi phải có người xi-nhan ngoài xe; dừng sát máy bay phải tắt máy, về số P, kéo phanh tay và chèn bánh.',
    expEn: 'Never maneuver directly ahead/behind/under aircraft; always use an external guide when reversing; when parking nearby, turn off engine, shift to Park, set parking brake, and chock wheels.'
  },
  {
    id: 'NGO25', topic: 'ngo_driving',
    qJa: '地上作業のため航空機直近で車両を停止・駐車するときに実施すべき4つの措置は？',
    qVi: '4 biện pháp bắt buộc khi dừng/đỗ xe sát tàu bay để làm nghiệp vụ mặt đất là gì?',
    qEn: 'What four steps must be taken when stopping a GSE vehicle immediately next to an aircraft for ground servicing?',
    optsJa: ['ギアをP・サイドブレーキ・エンジン停止・必要に応じて車輪止め', 'ハザード点灯・アイドリング維持・ギアN・ドアロック', 'エアコンON・ギアD・クラッチ踏み・窓閉め', 'ライト上向き・エンジン稼働・駐車ブレーキのみ'],
    optsVi: ['Về số P · Kéo phanh tay · Tắt động cơ · Chèn bánh xe khi cần thiết', 'Bật đèn hazard · Để máy nổ chờ · Về số N · Khóa cửa', 'Bật điều hòa · Số D · Đạp côn · Đóng kính', 'Bật pha cao · Để máy chạy · Chỉ kéo phanh tay'],
    optsEn: ['Shift to Park (P), apply parking brake, shut off engine, and chock wheels as needed', 'Hazard lights on, keep idling, Neutral, lock doors', 'AC on, Drive gear, clutch in, close windows', 'High beams on, engine running, parking brake only'],
    ans: 0,
    expJa: '誤発進による航空機接触事故を防ぐため、エンジン停止・ギアP・サイドブレーキ・車輪止めを徹底します。',
    expVi: 'Để ngăn xe tự trôi va quệt thân tàu bay: Tắt máy, về số P, kéo phanh tay và chèn bánh xe.',
    expEn: 'To prevent unintended vehicle movement into the fuselage: shut down engine, shift to Park, set parking brake, and place chocks.'
  },
  {
    id: 'NGO26', topic: 'ngo_driving',
    qJa: 'スポット内に引かれた赤い実線「ERA（機材制限区域）」の説明として正しいのはどれですか？',
    qVi: 'Giải thích nào ĐÚNG về vạch đỏ nét liền ERA (機材制限区域) kẻ trong bãi đỗ?',
    qEn: 'What does the solid red ERA (Equipment Restraint Area) line painted around an aircraft stand signify?',
    optsJa: ['航空機がスポットに出入りする際、「人」および「機材」の進入を禁止する区域（担当整備士・翼端監視員・トーイングカー等は例外）', 'GSE機材を一時仮置きしてよい専用エリア', '旅客が歩いて搭乗してよい安全歩道', '清掃車のみ自由に出入りできる区域'],
    optsVi: ['Khu vực CẤM người và thiết bị đi vào khi tàu bay đang vào/ra bãi đỗ (ngoại trừ kỹ sư, người canh đầu cánh, xe kéo phục vụ trực tiếp)', 'Khu vực dành riêng để tập kết tạm thiết bị GSE', 'Lối đi bộ an toàn cho hành khách', 'Chỉ dành cho xe vệ sinh chạy tự do'],
    optsEn: ['Area where personnel and equipment are prohibited while aircraft enter/exit the stand (except assigned engineers, wing walkers, and towing tractors)', 'Temporary staging zone for spare GSE', 'Safe walkway for passengers', 'Free zone for cleaning trucks'],
    ans: 0,
    expJa: 'ERA（機材制限区域）は航空機の出入り時に人や機材の進入を禁止する赤実線区域です。業務上必要な整備士・翼端監視員・トーイングカー等は例外となります。',
    expVi: 'ERA là vạch đỏ nét liền cấm người & thiết bị xâm nhập khi tàu bay vào/ra bãi (chỉ ngoại lệ nhân sự phục vụ trực tiếp như kỹ sư, wing walker, xe kéo).',
    expEn: 'ERA keeps people and GSE clear during aircraft arrival/departure; only essential handling crew (engineers, wing walkers, tug) are exempted.'
  },
  {
    id: 'NGO27', topic: 'ngo_driving', visual: 'ngo_pbb_danger',
    qJa: '赤い斜線で示された「PBB危険区域」への立ち入りルール（人・車両）およびPBB下部の通行について正しいのは？',
    qVi: 'Quy tắc vào "Khu vực nguy hiểm PBB" (gạch chéo đỏ) đối với Người & Xe, và việc chạy xe dưới gầm PBB là gì?',
    qEn: 'What are the entry rules for the red-hatched PBB Danger Zone (people vs. vehicles) and driving underneath a PBB?',
    optsJa: ['車両は例外なく進入・駐停車禁止（PBB下通過も禁止）／人はPBB回転灯消灯時のみ進入可', 'PBBが止まっていれば車両も赤斜線内をショートカット通過できる', '高さ3.8m以下ならPBBの下を車両で通過してよい', 'PBB回転灯点灯中でも人なら走って横断できる'],
    optsVi: ['Xe CẤM TUYỆT ĐỐI không ngoại lệ (kể cả cấm dừng đỗ & cấm chui dưới gầm PBB); Người chỉ được vào khi đèn xoay PBB đã TẮT', 'Khi PBB dừng thì xe có thể chạy tắt qua vùng gạch chéo đỏ', 'Xe thấp dưới 3.8m được chạy chui dưới gầm PBB', 'Khi đèn xoay PBB đang bật người vẫn chạy nhanh qua được'],
    optsEn: ['Vehicles are strictly prohibited with NO exceptions (and NEVER drive under a PBB); staff may enter ONLY when the PBB rotating beacon is OFF', 'Vehicles may cut across when the PBB is stationary', 'Vehicles under 3.8m may drive beneath the PBB', 'Staff may run across even while the PBB beacon is flashing'],
    ans: 0,
    expJa: 'PBB危険区域は車両は例外なく進入・駐停車禁止。人は回転灯消灯時のみ可。さらにPBBは高さが変化するため、下を車両で通過することも全面禁止です。',
    expVi: 'Vùng gạch chéo đỏ PBB: xe cấm 100% không ngoại lệ; người chỉ vào khi đèn xoay tắt; và cấm tuyệt đối chạy xe chui gầm PBB vì độ cao PBB thay đổi dễ va chạm.',
    expEn: 'Vehicles have ZERO exceptions in the PBB danger zone and may never drive under a PBB (its height changes). Personnel may enter only when the beacon is off.'
  },
  {
    id: 'NGO28', topic: 'ngo_driving',
    qJa: 'スポット後方車両通行帯の正しい特徴はどれですか？',
    qVi: 'Đặc điểm nào ĐÚNG về "Đường xe chạy sau bãi đỗ" (スポット後方車両通行帯)?',
    qEn: 'Which statement correctly describes the Behind-Stand Vehicle Road (スポット後方車両通行帯)?',
    optsJa: ['車両専用（徒歩・自転車禁止）で、航空機が出入りのため横断し、反対側は赤線の先がスポット誘導経路である', '歩行者と自転車も自由に通行できる', '航空機は絶対に横断しない安全通路である', '赤線を越えてスポット誘導経路側へ避けてよい'],
    optsVi: ['Chỉ dành cho xe (cấm đi bộ/xe đạp), tàu bay cắt ngang khi vào/ra bãi đỗ, phía đối diện bên kia vạch đỏ là đường lăn Spot Taxilane', 'Người đi bộ và xe đạp được đi thoải mái', 'Tàu bay không bao giờ đi cắt qua tuyến này', 'Được phép lấn qua vạch đỏ sang đường lăn để tránh xe'],
    optsEn: ['Vehicles only (no pedestrians/bicycles), aircraft cross it entering/exiting stands, and a red line borders the Spot Taxilane on the opposite side', 'Open to pedestrians and cyclists', 'Aircraft never cross this road', 'Drivers may cross the red line into the taxilane to pass'],
    ans: 0,
    expJa: 'スポット後方車両通行帯は車両専用（徒歩・自転車禁止）。航空機最優先であり、スポット誘導経路との間の赤線を越えてはいけません。可能なら建物脇GSE通行帯の利用が推奨されます。',
    expVi: 'Đường sau bãi đỗ chỉ dành cho xe cơ giới (cấm đi bộ/xe đạp), phải tuyệt đối nhường tàu bay và không vượt vạch đỏ; nếu xe không cao >3.8m nên đi làn GSE sát nhà ga.',
    expEn: 'It is for vehicles only, crossed by aircraft, and bounded by a red line; normal-height vehicles are encouraged to use the terminal-side GSE road whenever possible.'
  },
  {
    id: 'NGO29', topic: 'ngo_driving', visual: 'ngo_front_priority',
    qJa: '中部国際空港で「スポット後方車両通行帯」と「ERA（機材制限区域）」が交差している4カ所はどこですか？',
    qVi: '4 vị trí giao cắt giữa Đường xe sau bãi đỗ và vùng ERA tại Sân bay Chubu Centrair (cần dừng ở biển ưu tiên tàu bay) là ở đâu?',
    qEn: 'Where are the 4 locations at Centrair where the Behind-Stand Vehicle Road intersects an ERA (requiring a stop at the Aircraft Priority sign)?',
    optsJa: ['#7〜#8間・#18〜#19間・#76南側・#77南側の4カ所', '#1〜#2間・#10〜#11間・#24〜#25間・#80南側', '#101〜#102間・#201〜#202間・#301〜#302間・#401〜#402間', '交差している場所はない'],
    optsVi: ['Giữa #7–#8, giữa #18–#19, phía Nam #76 và phía Nam #77 (4 điểm)', 'Giữa #1–#2, #10–#11, #24–#25 và Nam #80', 'Giữa #101–#102, #201–#202, #301–#302 và #401–#402', 'Không có điểm giao cắt nào'],
    optsEn: ['Between #7–#8, between #18–#19, South of #76, and South of #77 (4 locations)', 'Between #1–#2, #10–#11, #24–#25, and South of #80', 'Between #101–#102, #201–#202, #301–#302, and #401–#402', 'There are no such intersections'],
    ans: 0,
    expJa: 'ERAと通行帯が交差する4カ所（#7-#8間、#18-#19間、#76南側、#77南側）では、必ず手前の「前方航空機優先標識」で一時停止し航空機動向を確認します。',
    expVi: 'Tại 4 giao điểm (#7-#8, #18-#19, Nam #76, Nam #77), bắt buộc dừng hẳn trước biển "Ưu tiên tàu bay phía trước" để quan sát trước khi qua.',
    expEn: 'At all 4 intersections (#7–#8, #18–#19, S of #76, S of #77), stop at the Aircraft Priority Ahead sign and verify aircraft movement.'
  },
  {
    id: 'NGO30', topic: 'ngo_driving',
    qJa: '航空機の「プッシュバック開始の目安（6つの状況）」に含まれないものはどれですか？',
    qVi: 'Dấu hiệu nào KHÔNG nằm trong 6 dấu hiệu nhận biết tàu bay sắp bắt đầu Pushback?',
    qEn: 'Which item is NOT one of the 6 indicators that an aircraft is about to begin pushback?',
    optsJa: ['機体からGSEが離れ、PBBとチョーク（車輪止め）が外されている', 'けん引車の黄色回転灯および航空機のナビ・アンチコリジョンライトが点灯している', '運航係員がパイロットに出発OKの合図をしている', '貨物室のドアが開いておりハイリフトローダーが接続されている'],
    optsVi: ['GSE đã tách khỏi máy bay, PBB và chèn bánh (Chocks) đã tháo', 'Đèn xoay vàng của xe kéo, đèn Navigation và Anti-collision đang bật sáng', 'Nhân viên mặt đất ra hiệu OK khởi hành cho phi công', 'Cửa hầm hàng đang mở và xe High-Lift Loader đang áp sát'],
    optsEn: ['GSE clear, PBB detached, and wheel chocks removed', 'Tug yellow beacon plus aircraft navigation and anti-collision lights ON', 'Ground staff signaling departure OK to pilots', 'Cargo doors open with High-Lift Loader still docked'],
    ans: 3,
    expJa: 'プッシュバック開始の6つの目安：①GSE離脱 ②PBB外れ ③けん引車黄回転灯点灯 ④ナビ・アンチコリジョンライト点灯 ⑤出発OK合図 ⑥チョーク外れ、です。',
    expVi: '6 dấu hiệu Pushback: GSE rời máy bay, PBB rút, đèn xoay vàng xe kéo bật, đèn Nav + Anti-collision bật, nhân viên báo OK, chèn bánh đã tháo.',
    expEn: 'The 6 signs: GSE clear, PBB detached, tug yellow beacon on, nav & anti-collision lights on, ground OK signal, and chocks removed.'
  },
  {
    id: 'NGO31', topic: 'ngo_driving',
    qJa: '「自走アウト」と「プッシュバック」を見分ける最大の注意点は何ですか？',
    qVi: 'Điểm khác biệt lớn nhất cần đặc biệt cảnh giác khi nhận biết "Tàu bay tự chạy ra" (自走アウト) so với Pushback là gì?',
    qEn: 'What is the most critical difference to watch for when spotting a "Self-Taxi-Out" (自走アウト) versus a pushback?',
    optsJa: ['けん引車がいなくても航空機が自らのエンジン推進力で動き出し、後方に強烈なブラストを吹き出す点', 'アンチコリジョンライトを消灯して動く点', 'PBBを付けたまま動き出す点', '地上監視員が一切配置されない点'],
    optsVi: ['KHÔNG CÓ XE KÉO nhưng tàu bay vẫn tự nổ máy lăn ra và thổi luồng phản lực (jet blast) cực mạnh về phía sau', 'Tàu bay tắt đèn Anti-collision khi di chuyển', 'Tàu bay chạy ra khi vẫn gắn PBB', 'Không bố trí nhân viên giám sát mặt đất'],
    optsEn: ['There is NO pushback tug, yet the aircraft starts engines in the stand and blasts powerful jet exhaust rearward', 'Anti-collision lights are turned off', 'The aircraft moves with the PBB still attached', 'No ground spotters are deployed'],
    ans: 0,
    expJa: '自走アウトはけん引車がいない状態で動くため見落としがちです。アンチコリジョンライト点灯と地上監視員（T2周囲は2名以上）の指示に必ず従ってください。',
    expVi: 'Tự chạy ra không có xe kéo nên rất dễ chủ quan; phải nhìn đèn Anti-collision đỏ, quan sát lực phản lực và tuân theo 2+ nhân viên giám sát.',
    expEn: 'Because no tug is attached, drivers may not expect movement; always watch the red anti-collision beacon and obey the 2+ ground spotters.'
  },
  {
    id: 'NGO32', topic: 'ngo_driving',
    qJa: '中部国際空港のターミナル2周辺で、自走アウト時にブラストを受ける「ブラスト注意区域（黄色線枠）」が設けられている2つのスポットは？',
    qVi: 'Tại Nhà ga T2 của NGO, 2 bãi đỗ nào có "Khu vực cảnh báo luồng phản lực" (ブラスト注意区域 viền sơn vàng) trên đường xe bên cạnh?',
    qEn: 'Around Terminal 2 at NGO, which two stands have yellow-outlined "Blast Caution Zones" on the adjacent vehicle lanes?',
    optsJa: ['スポット71番とスポット77番', 'スポット1番とスポット8番', 'スポット18番とスポット19番', 'スポット78番とスポット80番'],
    optsVi: ['Spot #71 và Spot #77', 'Spot #1 và Spot #8', 'Spot #18 và Spot #19', 'Spot #78 và Spot #80'],
    optsEn: ['Spot #71 and Spot #77', 'Spot #1 and Spot #8', 'Spot #18 and Spot #19', 'Spot #78 and Spot #80'],
    ans: 0,
    expJa: 'T2周辺のブラスト注意区域はスポット71番と77番の2カ所。自走アウト時は進入・停車禁止です（航空機進入時はブラスト注意区域の規制はないが、前方航空機優先標識には従う）。',
    expVi: '2 khu vực cảnh báo luồng phản lực ở T2 là Spot #71 và #77 (cấm đi vào/dừng xe khi tàu bay tự chạy ra; khi tàu bay đi VÀO thì tuân theo biển ưu tiên tàu bay phía trước).',
    expEn: 'Blast Caution Zones exist at Spots #71 and #77. Never enter or stop there during self-taxi-out; during aircraft arrival, obey the Aircraft Priority sign.'
  },
  {
    id: 'NGO33', topic: 'ngo_driving',
    qJa: '中部国際空港で「航空機のエンジンランナップ（試運転）」が実施可能なスポットと時間帯、および見分け方は？',
    qVi: 'Tại Sân bay Centrair, việc thử nổ động cơ (Engine Run-up) được phép thực hiện ở bãi đỗ nào, khung giờ nào và dấu hiệu nhận biết là gì?',
    qEn: 'At Centrair, where and when may aircraft Engine Run-Ups occur, and how can drivers recognize one?',
    optsJa: ['全スポット・24時間いつでも可能。目印は「アンチコリジョンライト点灯＋チョーク設置のまま」および地上監視員の配置', '貨物地区（101〜119番）のみで昼間のみ可能', '沖留スポット（200〜500番台）のみで夜間禁止', 'アンチコリジョンライト消灯・チョーク外れが目印'],
    optsVi: ['Tất cả mọi spot · 24/24 bất cứ lúc nào. Dấu hiệu: Đèn Anti-collision ĐANG BẬT + Chèn bánh (Chocks) VẪN CÒN + có nhân viên giám sát', 'Chỉ làm ban ngày tại khu Hàng hóa (#101–#119)', 'Chỉ làm tại bãi đỗ xa #200–#500 và cấm ban đêm', 'Dấu hiệu là tắt đèn đỏ và đã tháo chèn bánh'],
    optsEn: ['ALL stands, 24 hours a day. Indicators: Anti-collision beacon ON while wheel chocks remain IN place, plus ground spotters', 'Cargo stands (#101–119) during daytime only', 'Remote stands (#200–500) only; prohibited at night', 'Anti-collision off and chocks removed'],
    ans: 0,
    expJa: 'エンジン試運転は全スポットで24時間実施可能です。赤点滅ビーコン＋チョーク設置が目印であり、後方のスポット後方車両通行帯は通行不可のため停止または迂回します。',
    expVi: 'Thử nổ động cơ có thể xảy ra 24/24 ở mọi bãi đỗ; dấu hiệu là đèn đỏ nhấp nháy trong khi vẫn chèn bánh. Không được đi phía sau máy bay — hãy dừng hoặc đi đường vòng.',
    expEn: 'Engine run-ups can happen at any stand 24/7. Red beacon ON with chocks still IN signals a run-up; behind-stand traffic is blocked so stop or detour.'
  },
  {
    id: 'NGO34', topic: 'ngo_driving', visual: 'ngo_service_lane',
    qJa: '「サービスレーン」とはどのような通路ですか？',
    qVi: '"Service Lane" (サービスレーン) trong sân bay NGO là loại đường gì?',
    qEn: 'What is the purpose of a "Service Lane" at Chubu Centrair Airport?',
    optsJa: ['管制官との無線交信なしで、通行者の自己責任により航空機走行経路を横断できる自動車専用通路（徒歩・自転車禁止）', '歩行者と自転車が沖留スポットへ歩くための歩道', '管制塔と無線交信した車両だけが通れる滑走路横断道', '追い越し自由のGSE高速道路'],
    optsVi: ['Làn cắt ngang đường lăn tàu bay cho phép xe qua lại tự chịu trách nhiệm KHÔNG cần gọi bộ đàm Đài kiểm soát (chỉ dành cho ô tô, cấm đi bộ/xe đạp)', 'Lối đi bộ và xe đạp ra bãi đỗ xa', 'Đường cắt ngang đường băng bắt buộc gọi bộ đàm ATC', 'Đường cao tốc GSE được phép vượt tự do'],
    optsEn: ['A vehicle-only lane (no walking/bicycles) permitting drivers to cross aircraft taxilanes on their own responsibility without ATC radio clearance', 'A walkway/bike path to remote stands', 'A runway crossing requiring ATC radio clearance', 'An unrestricted GSE expressway allowing overtaking'],
    ans: 0,
    expJa: '200〜500番台へ行くため管制交信の代わりに通路を限定し、自己責任で横断を許されたのがサービスレーンです（車両専用・徒歩自転車禁止・追越禁止）。',
    expVi: 'Service Lane thay thế thủ tục xin phép Đài kiểm soát để sang bãi #200–#500 bằng trách nhiệm tự quan sát của lái xe (chỉ dành cho xe, cấm đi bộ/xe đạp/vượt).',
    expEn: 'Service Lanes allow drivers to cross aircraft paths to remote stands (#200–500) without ATC radio, strictly under self-responsibility and vehicle-only rules.'
  },
  {
    id: 'NGO35', topic: 'ngo_driving', visual: 'ngo_blast_100m',
    qJa: 'サービスレーン入口の前方航空機優先標識で停止中、航空機が通過した後どれくらい離れてから横断すべきですか？',
    qVi: 'Khi dừng trước biển ưu tiên tàu bay ở đầu Service Lane, sau khi máy bay chạy qua phải đợi cách ít nhất bao xa mới được băng qua?',
    qEn: 'After an aircraft passes in front of a Service Lane stop line, what minimum distance must you wait behind it before crossing?',
    optsJa: ['100m以上（目安として約2スポット分）離れてから横断する', '20m以上離れればすぐ横断してよい', '尾翼が通り過ぎた瞬間にすぐ横断する', '50m離れれば安全である'],
    optsVi: ['Ít nhất 100m trở lên (ước lượng khoảng 2 bãi đỗ) để tránh luồng phản lực Jet Blast', 'Chỉ cần cách 20m là qua ngay được', 'Vừa qua đuôi máy bay là chạy qua luôn', 'Cách 50m là đủ an toàn'],
    optsEn: ['At least 100 meters (roughly 2 aircraft stands) to avoid jet blast danger', '20 meters is sufficient', 'Immediately after the tail passes', '50 meters is always safe'],
    ans: 0,
    expJa: '航空機直後のジェットブラストは車両を吹き飛ばすほど危険なため、後方100m以上（約2スポット分）の離隔を取ってから横断します。',
    expVi: 'Luồng phản lực sau đuôi đủ sức thổi lật xe nên bắt buộc đợi tàu bay đi xa ít nhất 100m (tương đương ~2 spot) mới băng qua.',
    expEn: 'Jet blast behind taxiing aircraft can overturn vehicles; always maintain at least 100m (~2 stands) separation before crossing.'
  },
  {
    id: 'NGO36', topic: 'ngo_driving', visual: 'ngo_service_lane',
    qJa: 'サービスレーンの通過中および離脱時のルールとして誤っている（違反となる）ものはどれですか？',
    qVi: 'Hành động nào sau đây là VI PHẠM quy tắc khi đang đi qua và thoát khỏi Service Lane?',
    qEn: 'Which action is a VIOLATION while traversing or exiting a Service Lane?',
    optsJa: ['出口にある赤線（スポット誘導経路境界線）の手前で一旦停止する', '制限速度30km/h（牽引中15km/h）を守り速やかに通過する', 'センターラインおよび両端の白色交互破線をはみ出さない', '追い越し・追い抜き・Uターン・駐停車を行わない'],
    optsVi: ['Dừng lại tại vạch đỏ ở lối ra (スポット誘導経路境界線)', 'Giữ tốc độ 30 km/h (kéo moóc 15 km/h) và băng qua dứt khoát', 'Không đè vạch tim đường và không lấn ra ngoài vạch trắng đứt so le hai bên', 'Không vượt, không quay đầu U-turn và không dừng đỗ'],
    optsEn: ['Stopping at the exit red line (Aircraft Stand Taxilane Boundary Line)', 'Proceeding briskly within 30 km/h (15 km/h if towing)', 'Staying inside the solid centerline and alternating white dashed borders', 'No overtaking, U-turns, or stopping'],
    ans: 0,
    expJa: 'サービスレーンは優先通路であり、出口の赤線で停止すると機体走行路上に車体が残るため「出口の赤線では停止せず速やかに通り抜ける」のがルールです。',
    expVi: 'Lối ra Service Lane có vạch đỏ nhưng KHÔNG ĐƯỢC DỪNG LẠI ở vạch đỏ đó — phải chạy thoát hẳn qua vạch đỏ để giải phóng đường lăn cho tàu bay!',
    expEn: 'Never stop at the exit red line of a Service Lane—you must clear past the red line promptly so the aircraft taxilane is vacated.'
  },
  {
    id: 'NGO37', topic: 'ngo_driving',
    qJa: 'サービスレーン入口で待機中、向かい側のサービスレーンから車両が出てきた場合の優先関係は？',
    qVi: 'Khi đang dừng chờ vào Service Lane và thấy có xe đang chạy từ trong Service Lane đi ra, xe nào được ưu tiên?',
    qEn: 'When waiting to enter a Service Lane as another vehicle is exiting it, who has right-of-way?',
    optsJa: ['サービスレーンから出てくる車両を優先する', 'これから進入する車両が優先', '大型車両が優先', '右側から来る車両が優先'],
    optsVi: ['Ưu tiên xe đang đi RA khỏi Service Lane (để xe đó thoát nhanh khỏi đường lăn tàu bay)', 'Ưu tiên xe chuẩn bị đi vào', 'Ưu tiên xe lớn hơn', 'Ưu tiên xe bên phải'],
    optsEn: ['Vehicles exiting the Service Lane have priority (so they clear the aircraft path quickly)', 'Vehicles entering have priority', 'Larger vehicles have priority', 'Traffic from the right has priority'],
    ans: 0,
    expJa: '航空機が通る走行経路をいち早く解放するため、サービスレーンを通行・離脱してくる車両が最優先されます。',
    expVi: 'Để giải phóng nhanh khu vực đường lăn của tàu bay, luôn ưu tiên xe đang chạy trong và thoát ra khỏi Service Lane.',
    expEn: 'Vehicles exiting a Service Lane always have priority to clear the aircraft movement zone immediately.'
  },
  {
    id: 'NGO38', topic: 'ngo_driving',
    qJa: '国際線沖留スポット300・400・500番台をつなぐE3・E4横断サービスレーン特有の追加ルールは？',
    qVi: 'Quy tắc bổ sung đặc thù chỉ áp dụng cho Service Lane cắt ngang E3/E4 nối bãi đỗ xa #300, #400, #500 là gì?',
    qEn: 'What additional restriction applies specifically to the E3/E4 crossing Service Lanes connecting remote stands #300, #400, and #500?',
    optsJa: ['手前・通行後のどちらかのスポットに航空機が駐機中（受入準備中含む）は通行禁止、かつ滑走路近くでは着陸機の高速接近に注意', '駐機中でも翼の下をくぐって通行できる', '徒歩なら通行してもよい', '制限速度が40km/hに引き上げられる'],
    optsVi: ['Cấm đi qua nếu bãi đỗ phía trước HOẶC phía sau đang có tàu bay đỗ (kể cả đang chuẩn bị đón tàu bay), và cực kỳ chú ý máy bay vừa hạ cánh chạy tốc độ cao từ đường lăn thoát nhanh A4', 'Vẫn được chạy chui qua dưới cánh khi có máy bay đỗ', 'Được phép đi bộ qua làn này', 'Tốc độ giới hạn tăng lên 40 km/h'],
    optsEn: ['Prohibited if EITHER the entry or exit stand is occupied (or preparing for arrival), and watch closely for high-speed landing aircraft exiting via rapid-exit taxiway A4', 'May pass under wings if occupied', 'Pedestrians are allowed here', 'Speed limit increases to 40 km/h'],
    ans: 0,
    expJa: 'E3・E4横断サービスレーンは手前・先のスポット駐機中（受入ハンドリング中含む）は通行不可。また滑走路に近い2カ所は高速離脱誘導路（A4等）からの高速接近機に要警戒です。',
    expVi: 'Làn E3/E4 cấm chạy qua nếu spot đầu vào hoặc đầu ra có máy bay đỗ/đang chuẩn bị đón khách; gần đường băng phải đề phòng tàu bay vừa hạ cánh thoát ra rất nhanh.',
    expEn: 'E3/E4 lanes are closed whenever either adjacent stand is occupied or preparing for arrival, and drivers near the runway must watch for fast-exiting landing aircraft.'
  },
  {
    id: 'NGO39', topic: 'ngo_driving',
    qJa: '第2ターミナル脇の「スポット誘導経路P横断サービスレーン」で特に注意すべき点は？',
    qVi: 'Điểm đặc biệt nguy hiểm cần chú ý tại Service Lane cắt ngang đường lăn P ngay cạnh Nhà ga T2 là gì?',
    qEn: 'What are the key hazards at the Service Lane crossing Spot Taxilane P beside Terminal 2?',
    optsJa: ['T2脇のため徒歩横断禁止を徹底し、北→南横断時は障害物でE・E3方向の視界が極めて悪いため曲がって来る前提で待機する', 'T2直結のため徒歩横断が許可されている', '航空機はJ方向からしか来ない', '見通しが良いため一時停止不要'],
    optsVi: ['Tuyệt đối cấm đi bộ cắt ngang dù sát T2; khi lái từ Bắc sang Nam tầm nhìn về phía E/E3 bị che khuất nặng nên phải giả định máy bay sẽ rẽ về phía mình mà dừng chờ', 'Được phép đi bộ cắt ngang vì nối thẳng T2', 'Tàu bay chỉ đi tới từ hướng J', 'Tầm nhìn thoáng nên không cần dừng'],
    optsEn: ['Strictly NO walking despite being next to T2; when crossing North-to-South, obstacles severely block the view toward E/E3 so wait assuming aircraft will turn toward you', 'Walking across is permitted due to T2 proximity', 'Aircraft only approach from taxiway J', 'Clear visibility eliminates the need to stop'],
    ans: 0,
    expJa: 'P横断サービスレーンは徒歩・自転車禁止。北から南への横断時は右斜め後方（E・E3）の視界が悪く、E2/E3/EやJから進入する航空機が曲がって来る前提で待機します。',
    expVi: 'Dù sát nhà ga T2 nhưng tuyệt đối cấm đi bộ; khi qua theo chiều Bắc→Nam bị khuất tầm nhìn phía E/E3, cần chờ đến khi chắc chắn an toàn.',
    expEn: 'Never walk across Taxilane P. Crossing North-to-South has poor visibility toward E/E3; always hold assuming approaching aircraft may turn into P.'
  },
  {
    id: 'NGO40', topic: 'ngo_driving',
    qJa: '路面に引かれた赤い実線の名称として、「エプロン誘導路との境」と「スポット誘導経路との境」の正しい組み合わせは？',
    qVi: 'Tên gọi chính xác của hai loại vạch đỏ nét liền giữa (1) Apron Taxiway với Spot và (2) Spot Taxilane với Spot là gì?',
    qEn: 'What are the official names of the solid red lines bordering (1) the Apron Taxiway and (2) a Spot Taxilane?',
    optsJa: ['①エプロン境界線（ABL） ／ ②スポット誘導経路境界線', '①滑走路境界線 ／ ②誘導路中心線', '①停止線 ／ ②ERA制限線', '①PBB危険線 ／ ②サービスレーン線'],
    optsVi: ['(1) Vạch ranh giới Apron (エプロン境界線 / ABL) · (2) Vạch ranh giới đường lăn Spot (スポット誘導経路境界線)', '(1) Vạch đường băng · (2) Tim đường lăn', '(1) Vạch dừng · (2) Vạch ERA', '(1) Vạch PBB · (2) Vạch Service Lane'],
    optsEn: ['(1) Apron Boundary Line (ABL) / (2) Aircraft Stand Taxilane Boundary Line', '(1) Runway Boundary / (2) Taxiway Centerline', '(1) Stop Line / (2) ERA Line', '(1) PBB Line / (2) Service Lane Line'],
    ans: 0,
    expJa: 'エプロン誘導路との境＝エプロン境界線（ABL）、スポット誘導経路との境＝スポット誘導経路境界線です。例外（牽引作業・緊急/維持管理・サービスレーン通行）を除き赤実線を越えることは禁止です。',
    expVi: 'Giáp Apron Taxiway gọi là ABL (エプロン境界線); giáp Spot Taxilane gọi là スポット誘導経路境界線. Tuyệt đối không tùy tiện vượt vạch đỏ (trừ 3 ngoại lệ: kéo tàu bay, khẩn cấp/bảo trì, đi qua Service Lane).',
    expEn: 'ABL borders the Apron Taxiway; Aircraft Stand Taxilane Boundary Line borders the taxilane. Crossing is forbidden except for aircraft towing, emergency/maintenance, or Service Lanes.'
  },
  {
    id: 'NGO41', topic: 'ngo_driving',
    qJa: '「場周道路」の制限速度と、滑走路南北延長上を通過するときの正しい操作は？',
    qVi: 'Giới hạn tốc độ trên Đường vành đai sân bay (場周道路) và quy tắc khi băng qua phần kéo dài đầu Bắc/Nam đường băng là gì?',
    qEn: 'What is the speed limit on the Airport Perimeter Road (場周道路), and how must you cross the North/South runway extensions?',
    optsJa: ['制限速度40km/h。延長部はSTOP標識・停止線で一旦停止し、離着陸機がないことを確認して速やかに横断する', '制限速度30km/h。延長部は徐行のみで停止不要', '制限速度50km/h。着陸機がいても先を急いで通過する', '制限速度40km/h。緑地部も場周道路に含まれる'],
    optsVi: ['Giới hạn 40 km/h; tại phần kéo dài đường băng phải dừng hẳn ở biển STOP, quan sát không có máy bay cất/hạ cánh mới băng qua nhanh', 'Giới hạn 30 km/h; chỉ cần đi chậm không cần dừng', 'Giới hạn 50 km/h; chạy nhanh qua trước khi máy bay đáp', 'Giới hạn 40 km/h; dải cỏ bên trong cũng thuộc đường vành đai'],
    optsEn: ['40 km/h limit; come to a full stop at the STOP sign on runway extensions, verify no landing/departing aircraft, then cross promptly', '30 km/h; slow down without stopping', '50 km/h; hurry across ahead of landing aircraft', '40 km/h; the inner grass strip is part of the perimeter road'],
    ans: 0,
    expJa: '場周道路は40km/h。滑走路延長部はSTOPで一時停止し離着陸機を確認。また舗装より内側の緑地部は直ちに「着陸帯等」となるため立入厳禁です。',
    expVi: 'Đường vành đai 40 km/h; đầu bắc/nam đường băng bắt buộc dừng tại STOP quan sát tàu bay đáp/cất cánh; chú ý thảm cỏ ngay mép trong đã là khu 着陸帯等 cấm vào.',
    expEn: 'Perimeter Road is 40 km/h. Stop at STOP signs on N/S runway extensions. Note that the grass strip immediately inside the pavement is already the restricted Landing Strip.'
  },
  {
    id: 'NGO42', topic: 'ngo_driving', visual: 'ngo_ils_sign',
    qJa: '場周道路の「ILS制限区域」で看板上部の【赤灯】が点灯しているとき、どのように行動すべきですか？',
    qVi: 'Khi thấy ĐÈN ĐỎ trên biển báo "Khu vực hạn chế ILS" (ILS制限区域) trên đường vành đai đang sáng, bạn phải làm gì?',
    qEn: 'When the RED beacon atop the ILS Restricted Area sign on the Perimeter Road is illuminated, what must you do?',
    optsJa: ['ILS誘導電波保護のため通行止めなので進入せず、反対側へ迂回する', '徐行しながらそのまま通過する', '金属車体でなければ進入してよい', '停車して青信号になるまで30分待つ'],
    optsVi: ['Cấm đi vào để tránh nhiễu sóng dẫn đường ILS — phải quay lại đi vòng sang phía đầu đối diện của sân bay', 'Giảm tốc độ chạy chậm qua', 'Xe nhỏ thì vẫn đi qua được', 'Đỗ ngay trong vùng đó đợi tắt đèn'],
    optsEn: ['Entry is prohibited to prevent ILS radio interference — do NOT enter and detour around the opposite end of the airport', 'Slow down and proceed through carefully', 'Smaller vehicles may pass through', 'Park inside the zone and wait 30 minutes'],
    ans: 0,
    expJa: '天候悪化時にILS精度を保つため、着陸側道路の赤灯が点灯し通行止めとなります（金属車両が電波を乱すため）。反対側は通行できるため迂回します。',
    expVi: 'Khi thời tiết xấu, xe kim loại sẽ phản xạ làm nhiễu sóng hạ cánh ILS nên phía máy bay đáp sẽ bật đèn đỏ cấm đường; hãy chạy vòng phía ngược lại.',
    expEn: 'During low-visibility ILS operations, metal vehicles distort guidance beams. The landing end is closed (red lamp ON); detour via the opposite side.'
  },
  {
    id: 'NGO43', topic: 'ngo_driving', visual: 'ngo_ils_sign',
    qJa: '場周道路内の「ILS制限 駐停車禁止区間（50m）」のルールとして正しいのは？',
    qVi: 'Quy định tại "Đoạn cấm dừng đỗ hạn chế ILS (50m)" nằm trên đường vành đai là gì?',
    qEn: 'What rule applies to the 50m "ILS Restricted No-Stopping/Parking Zone" along the Perimeter Road?',
    optsJa: ['航空機の着陸方向・天候に関係なく常時駐停車禁止（緑地部・ガレ場・機材放置も禁止）。ただし一旦停止は不要', '赤灯が点灯しているときだけ駐停車禁止', '必ず停止線で一旦停止しなければならない', '道路舗装部以外は駐車してよい'],
    optsVi: ['Cấm dừng & cấm đỗ 24/24 BẤT KỂ hướng hạ cánh hay thời tiết (cấm cả trên bãi cỏ, bãi đá và cấm đặt thiết bị lớn), nhưng KHÔNG cần dừng tạm thời khi đi qua', 'Chỉ cấm dừng đỗ khi đèn đỏ ILS sáng', 'Bắt buộc phải dừng hẳn tại vạch kẻ rồi mới đi tiếp', 'Được đỗ trên phần thảm cỏ bên cạnh đường'],
    optsEn: ['No stopping or parking AT ANY TIME regardless of landing direction or weather (including grass/gravel areas & equipment), though passing vehicles need not make a mandatory stop', 'Only applies when the red ILS lamp is on', 'Mandatory full stop required before entering', 'Parking on adjacent grass is permitted'],
    ans: 0,
    expJa: 'ILS駐停車禁止区間は天候や進入方向に関係なく常時駐停車禁止（緑地・ガレ場・機材も不可）。通行自体は可能で一旦停止は不要です。',
    expVi: 'Đoạn 50m này cấm dừng/đỗ mọi lúc không phụ thuộc hướng đáp hay thời tiết (kể cả cỏ/bãi đá/thiết bị); xe chạy qua bình thường không cần dừng tạm.',
    expEn: 'Stopping, parking, or placing large equipment is prohibited 24/7 regardless of weather or runway direction, including grass/gravel shoulders; moving traffic need not stop.'
  },
  {
    id: 'NGO44', topic: 'ngo_driving',
    qJa: '航空機走行区域等（着陸帯緑地部含む）へ単独で立ち入る場合の手順として正しいのは？',
    qVi: 'Trình tự chuẩn khi 1 xe (kể cả xe kỹ thuật) muốn vào khu vực tàu bay chạy (着陸帯等 gồm cả bãi cỏ) là gì?',
    qEn: 'What is the mandatory procedure for entering the Aircraft Movement Area (including landing strip grass) alone?',
    optsJa: ['回転灯点灯→手前で停車→管制塔の走行許可取得→作業中は管制無線常時傍受→退出許可取得→安全場所停車後に離脱完了報告', '制限パスに「着陸」があれば管制塔への連絡なしでいつでも進入可', '整備車両なら許可不要で単独走行可', '進入許可だけ取り、退出時は無言で離脱してよい'],
    optsVi: ['Bật đèn xoay → Dừng trước ranh giới → Xin phép Đài kiểm soát → Nghe trực bộ đàm liên tục → Xin phép rút ra → Dừng nơi an toàn mới báo cáo rời khỏi xong', 'Có dấu 「着陸」 trên thẻ thì tự do chạy vào không cần gọi Đài', 'Xe kỹ thuật đi 1 mình được miễn xin phép', 'Chỉ cần xin phép lúc vào, lúc ra không cần báo'],
    optsEn: ['Beacon ON → stop short → obtain Tower clearance → monitor ATC radio continuously → get exit clearance → stop safely outside and report clear', 'Having "着陸" on your pass lets you enter without ATC clearance', 'Maintenance vehicles do not need clearance', 'Only entry clearance is needed; exit silently'],
    ans: 0,
    expJa: '制限パスがあっても無許可立入は厳禁です。進入前・作業中・退出後の全手順で管制塔とMCA無線交信を行います（MCA未所有事業者はCOCから貸与）。',
    expVi: 'Dù thẻ có dấu 「着陸」 vẫn cấm tự ý vào; bắt buộc xin phép vào, nghe trực bộ đàm liên tục, xin phép ra và báo cáo hoàn tất (ai chưa có bộ đàm MCA mượn tại COC).',
    expEn: 'Even with pass access, unauthorized entry is forbidden. Full Tower clearance, continuous watch, exit clearance, and vacated report are mandatory (MCA radios can be borrowed from COC).'
  },
  {
    id: 'NGO45', topic: 'ngo_driving', visual: 'ngo_light_gun',
    qJa: '着陸帯等で管制塔との無線通信に支障が出た際、指向信号灯（ライトガン）の「赤の閃光」が意味する指示は？',
    qVi: 'Khi mất sóng bộ đàm trên đường băng/đường lăn và Đài kiểm soát chiếu Light Gun "Đỏ nhấp nháy" (赤の閃光), ý nghĩa là gì?',
    qEn: 'During radio failure on a runway/taxiway, what does a "Flashing Red" Light Gun signal from the Tower mean?',
    optsJa: ['滑走路または誘導路の外へ出よ', '停止（待機）せよ', '横断（進行）支障なし', '飛行場の出発点に帰れ'],
    optsVi: ['Rời ngay khỏi đường băng hoặc đường lăn', 'Dừng lại (chờ đợi)', 'Được phép băng qua / tiếp tục đi', 'Quay trở lại điểm xuất phát của sân bay'],
    optsEn: ['Clear the runway or taxiway immediately', 'Stop and hold position', 'Cleared to cross / proceed', 'Return to the starting point on the airport'],
    ans: 0,
    expJa: 'ライトガン5種：赤不動光＝停止（待機）、赤閃光＝滑走路・誘導路の外へ出よ、緑不動光＝横断支障なし、赤緑交互閃光＝注意せよ、白閃光＝出発点に帰れ。',
    expVi: '5 tín hiệu Light Gun: Đỏ đứng = Dừng chờ; Đỏ nháy = Rời ngay đường băng/đường lăn; Xanh đứng = Được qua; Đỏ-Xanh luân phiên = Chú ý; Trắng nháy = Về điểm xuất phát.',
    expEn: 'Light Gun signals: Steady Red = Stop; Flashing Red = Clear runway/taxiway; Steady Green = Cleared to cross; Alt Red/Green = Caution; Flashing White = Return to start.'
  },
  {
    id: 'NGO46', topic: 'ngo_driving', visual: 'ngo_light_gun',
    qJa: '指向信号灯（ライトガン）の「白色の閃光」および「赤→緑の交互閃光」の意味の組み合わせは？',
    qVi: 'Ý nghĩa của tín hiệu Light Gun "Trắng nhấp nháy" (白色閃光) và "Đỏ ↔ Xanh nhấp nháy luân phiên" (交互閃光) lần lượt là gì?',
    qEn: 'What do "Flashing White" and "Alternating Red & Green" Light Gun signals mean respectively?',
    optsJa: ['白色閃光：飛行場の出発点に帰れ ／ 赤緑交互閃光：注意せよ', '白色閃光：横断支障なし ／ 赤緑交互閃光：停止せよ', '白色閃光：滑走路外へ出よ ／ 赤緑交互閃光：出発点に帰れ', '白色閃光：緊急車両優先 ／ 赤緑交互閃光：エンジン停止'],
    optsVi: ['Trắng nhấp nháy: Quay về điểm xuất phát / Đỏ–Xanh luân phiên: Chú ý cao độ', 'Trắng nhấp nháy: Được qua / Đỏ–Xanh luân phiên: Dừng lại', 'Trắng nhấp nháy: Rời đường băng / Đỏ–Xanh luân phiên: Quay về điểm xuất phát', 'Trắng nhấp nháy: Nhường xe cứu hỏa / Đỏ–Xanh luân phiên: Tắt máy'],
    optsEn: ['Flashing White: Return to starting point / Alternating Red-Green: Exercise extreme caution', 'Flashing White: Cleared to cross / Alternating Red-Green: Stop', 'Flashing White: Clear runway / Alternating Red-Green: Return to start', 'Flashing White: Yield to fire truck / Alternating Red-Green: Shut down engine'],
    ans: 0,
    expJa: '白閃光＝「飛行場の出発点に帰れ」、赤→緑交互閃光＝「注意せよ」です。車両の見やすい場所に一覧を掲示して必ず暗記します。',
    expVi: 'Trắng nhấp nháy = Quay về điểm xuất phát; Đỏ–Xanh luân phiên = Chú ý. Tài liệu khuyên ép plastic bảng này dán trong cabin xe và học thuộc lòng.',
    expEn: 'Flashing White = Return to starting point; Alternating Red/Green = Exercise caution. Keep a laminated chart visible inside airside vehicles.'
  },
  {
    id: 'NGO47', topic: 'ngo_driving',
    qJa: '無線通信のフォネティックコードで「C」「J」「N」「W」「9」の正しい読み方の組み合わせは？',
    qVi: 'Cách đọc chuẩn theo bảng ICAO Phonetic Code của các ký tự "C", "J", "N", "W", "9" là gì?',
    qEn: 'What is the correct ICAO phonetic pronunciation for "C", "J", "N", "W", and "9"?',
    optsJa: ['Charlie / Juliett / November / Whiskey / Nine（ナイナー）', 'Canada / Japan / Nancy / Water / Nine（ナイン）', 'Cat / Jet / North / Wing / Niner', 'Cargo / Jumbo / Night / Wind / Nine'],
    optsVi: ['Charlie / Juliett / November / Whiskey / Nine (Niner)', 'Canada / Japan / Nancy / Water / Nine', 'Cat / Jet / North / Wing / Niner', 'Cargo / Jumbo / Night / Wind / Nine'],
    optsEn: ['Charlie / Juliett / November / Whiskey / Niner', 'Canada / Japan / Nancy / Water / Nine', 'Cat / Jet / North / Wing / Niner', 'Cargo / Jumbo / Night / Wind / Nine'],
    ans: 0,
    expJa: '世界共通のフォネティックコード（無線局運用規則）：C＝Charlie、J＝Juliett、N＝November、W＝Whiskey、9＝Nine（発音：ナイナー）です。',
    expVi: 'Chuẩn ICAO toàn cầu: C = Charlie, J = Juliett, N = November, W = Whiskey, 9 = Niner (ナイナー) để tránh nghe nhầm qua sóng vô tuyến.',
    expEn: 'Standard ICAO phonetic alphabet: C=Charlie, J=Juliett, N=November, W=Whiskey, 9=Niner (to prevent radio mishearing).'
  },
  {
    id: 'NGO48', topic: 'ngo_driving',
    qJa: '制限区域内で車両事故や走行不能、燃料流出、立入証紛失などの異常事態が起きたとき、まず一報すべき連絡先は？',
    qVi: 'Khi xảy ra tai nạn xe, xe chết máy, tràn dầu, rơi vật thể hay mất thẻ ra vào trong khu vực hạn chế NGO, đầu mối cần báo ĐẦU TIÊN là đâu?',
    qEn: 'In the event of a vehicle accident, breakdown, fuel spill, FOD scatter, or lost pass inside NGO restricted areas, who must be notified first?',
    optsJa: ['COC（セントレア・オペレーション・センター：0569-38-1500 / 内線3000・24時間365日）※事故時は現場保存', '翌朝に自社の上司へメール報告するだけ', 'ターミナル案内カウンターへ歩いて行く', '現場を片付けて証拠を消してから連絡する'],
    optsVi: ['COC (Trung tâm Điều hành Centrair: 0569-38-1500 / nội bộ 3000 · 24/365) — *Tai nạn phải giữ nguyên hiện trường', 'Đợi sáng hôm sau nhắn tin báo quản lý công ty', 'Đi bộ lên quầy thông tin nhà ga hỏi', 'Tự dọn sạch hiện trường rồi mới báo'],
    optsEn: ['COC (Centrair Operation Center: 0569-38-1500 / Ext. 3000, 24/365) — *Preserve the scene in vehicle accidents', 'Email your supervisor the next morning', 'Walk to the terminal information desk', 'Clean up the scene first before calling'],
    ans: 0,
    expJa: '異常事態はまずCOC（内線3000）へ一報します。車両事故は現場保存。着陸帯等で管制交信中なら管制塔にも報告。救急・消防へ直接通報した場合も緊急車両誘導のため必ずCOCへ連絡します。',
    expVi: 'Mọi sự cố đều báo ngay COC (nội bộ 3000); tai nạn xe phải giữ nguyên hiện trường; nếu đang trong đường lăn/đường băng phải báo cả Đài kiểm soát; nếu gọi cấp cứu trực tiếp vẫn phải báo COC để dẫn đường xe cứu thương.',
    expEn: 'Always alert COC (Ext. 3000) immediately and preserve accident scenes. Also notify Tower if in the movement area, and always inform COC after calling an ambulance so they can escort emergency vehicles.'
  },
  {
    id: 'NGO49', topic: 'ngo_driving',
    qJa: '中部国際空港の施設配置について正しい記述はどれですか？',
    qVi: 'Mô tả nào ĐÚNG về bố trí thực tế của Sân bay Quốc tế Chubu Centrair (NGO)?',
    qEn: 'Which description of Chubu Centrair International Airport (NGO) layout is accurate?',
    optsJa: ['滑走路は長さ3500m（センターピア先端から西へ約400m）。センターピア右が国内線・左が国際線（12番は国際線、10・11番は切替）。101〜119番は貨物地区', '滑走路は2本あり各2500mである', 'センターピアの右が国際線、左が国内線である', '101〜119番はすべて国内線旅客スポットである'],
    optsVi: ['Đường băng dài 3.500m (cách đầu Center Pier ~400m về phía Tây); bên phải Center Pier là Quốc nội, bên trái là Quốc tế (Spot #12 là Quốc tế, #10–11 chuyển đổi); #101–119 là khu Hàng hóa', 'Sân bay có 2 đường băng song song dài 2.500m', 'Bên phải Center Pier là Quốc tế, bên trái là Quốc nội', 'Spot #101–119 hoàn toàn là bãi đỗ khách nội địa'],
    optsEn: ['Single 3,500m runway (~400m west of Center Pier tip); Domestic is right of Center Pier, International is left (#12 International, #10–11 swing gates); #101–119 are Cargo stands', 'Two parallel 2,500m runways', 'International is right of Center Pier and Domestic is left', '#101–119 are exclusively domestic passenger stands'],
    ans: 0,
    expJa: 'J08基本施設：滑走路3500m、センターピア右＝国内線・左＝国際線（12番国際、10・11番切替）、600番代は主に貨物機（400・500番代も使用）、101〜119番は貨物地区・北側N地区は小型機・海保・航空局です。',
    expVi: 'Tài liệu J08: Đường băng 3.500m; phải Center Pier = Quốc nội, trái = Quốc tế (#12 Quốc tế, #10–11 chuyển đổi); #600 chuyên hàng hóa; #101–119 khu Hàng hóa & phía Bắc là khu N (tàu bay nhỏ, Hải bảo).',
    expEn: 'NGO J08 layout: 3,500m runway; Center Pier right = Domestic, left = International (#12 Int\'l, #10–11 swing); #600 primarily freighters; #101–119 Cargo area & north N-area for GA/Coast Guard.'
  },
  {
    id: 'NGO50', topic: 'ngo_driving',
    qJa: '中部国際空港エプロン運用規程第14条により、エプロンにおいて禁止されている行為はどれですか？',
    qVi: 'Theo Điều 14 Quy định vận hành Sân đỗ Chubu Centrair, hành vi nào bị CẤM trên Apron?',
    qEn: 'Under Article 14 of the Chubu Centrair Apron Operations Regulations, what is prohibited on the apron?',
    optsJa: ['許可なく車両・機材その他の物件を放置すること（ハンドリング妨害や緊急車両動線閉塞の恐れ）', '白線で指定された置き場所にGSE機材を整頓して駐機すること', '乗客の乗降および貨物の積み卸しを行うこと', '航空機の給油および軽微な整備を行うこと'],
    optsVi: ['Tự ý bỏ lại / để phương tiện, thiết bị hoặc vật dụng khác không được phép trên sân đỗ (gây cản trở phục vụ bay & lối xe khẩn cấp)', 'Đỗ gọn gàng xe GSE đúng ô vạch trắng quy định', 'Thực hiện đón trả khách và chất xếp hàng hóa', 'Tra nạp nhiên liệu và bảo dưỡng nhẹ cho tàu bay'],
    optsEn: ['Leaving or abandoning vehicles, equipment, or other objects without permission (impeding handling and emergency access)', 'Parking GSE neatly inside designated white-line bays', 'Boarding passengers and loading cargo', 'Refueling and minor line maintenance'],
    ans: 0,
    expJa: 'エプロン運用規程第14条により「車両、機材その他の物件を放置すること」は禁止されています。GSEは必ず白線で指示された所定の置き場所へ戻します。',
    expVi: 'Điều 14 nghiêm cấm để xe, thiết bị, vật dụng tùy tiện trên sân đỗ; mọi xe GSE sau khi dùng xong phải đỗ đúng vị trí kẻ vạch trắng quy định.',
    expEn: 'Article 14 prohibits abandoning vehicles, equipment, or items on the apron. Always return GSE to designated white-lined parking bays.'
  }
];
