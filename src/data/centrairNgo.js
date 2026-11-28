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
    optsJa: ['人の立入・車両の運転・車両の使用', '航空機の着陸・旅客の案内・手荷物検査', '燃料の給油・貨物の搭載・駐車場の管理', '乗務員の交代・機内清掃・警備所の巡回'],
    optsVi: ['Ra vào của con người · Lái phương tiện · Sử dụng phương tiện', 'Hạ cánh tàu bay · Hướng dẫn hành khách · Soi chiếu hành lý', 'Tra nạp nhiên liệu · Xếp dỡ hàng hóa · Quản lý bãi đỗ xe công', 'Thay đổi phi hành đoàn · Vệ sinh khoang · Tuần tra an ninh'],
    optsEn: ['Entry of persons, driving of vehicles, and use of vehicles', 'Aircraft landing, passenger guidance, and baggage screening', 'Fueling operations, cargo loading, and public lot management', 'Crew changeovers, cabin cleaning, and perimeter security patrols'],
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
    optsJa: ['青色（標準・CJIAC専用）', '黄色（共通・許可なし）', '赤色（共通・許可あり）', '紫色（税関ビジター）'],
    optsVi: ['Màu Xanh dương (Thẻ Tiêu chuẩn CJIAC)', 'Màu Vàng (Thẻ Chung không phép chuyển)', 'Màu Đỏ (Thẻ Chung có phép chuyển)', 'Màu Tím (Thẻ Khách Hải quan CIQ)'],
    optsEn: ['Blue (CJIAC Standard Pass only)', 'Yellow (Common Pass without transfer)', 'Red (Common Pass with transfer)', 'Purple (Customs CIQ Visitor Pass)'],
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
    optsJa: ['GSE・制限 ／ 場周道路 ／ 国際保安区域', 'ゲート制御 ／ 駐車場周囲 ／ 際内連絡通路', '地上整備 ／ 場外周回線 ／ 国際貨物上屋', '貨物制限 ／ 場内周遊路 ／ 国際線到着口'],
    optsVi: ['Đường GSE hạn chế / Đường vành đai / Khu an ninh quốc tế', 'Kiểm soát cổng vào / Quanh bãi đỗ xe / Hành lang nối ga', 'Bảo dưỡng mặt đất / Tuyến ngoài đảo / Kho hàng quốc tế', 'Hạn chế hàng hóa / Đường vòng nội bộ / Sảnh đến quốc tế'],
    optsEn: ['GSE-lane / Airport Perimeter Road / International Security Area', 'Gate Control / Public Parking Loop / Domestic-Int\'l Corridor', 'Ground Maintenance / Outer Island Loop / Int\'l Cargo Warehouse', 'Goods Restricted / Inner Sightseeing Loop / Int\'l Arrivals Hall'],
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
    optsJa: ['紫色：7日未満 ／ 水色ビジター：24時間未満', '紫色：1ヶ月未満 ／ 水色ビジター：7日間未満', '紫色：24時間未満 ／ 水色ビジター：1年間未満', '紫色：3ヶ月未満 ／ 水色ビジター：3ヶ月未満'],
    optsVi: ['Thẻ Tím: dưới 7 ngày / Thẻ Xanh nhạt: dưới 24 giờ', 'Thẻ Tím: dưới 1 tháng / Thẻ Xanh nhạt: dưới 7 ngày', 'Thẻ Tím: dưới 24 giờ / Thẻ Xanh nhạt: dưới 1 năm', 'Thẻ Tím: dưới 3 tháng / Thẻ Xanh nhạt: dưới 3 tháng'],
    optsEn: ['Purple: under 7 days / Light-Blue Visitor: under 24 hours', 'Purple: under 1 month / Light-Blue Visitor: under 7 days', 'Purple: under 24 hours / Light-Blue Visitor: under 1 year', 'Purple: under 3 months / Light-Blue Visitor: under 3 months'],
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
    optsJa: ['警備所に警報が発報されるため、操作自体が厳禁', '警報は鳴らず5分後に自動解除され記録のみ残る', '警備員が巡回するまで扉の横でそのまま待機する', '共通パスを所持していればどの扉でも開扉できる'],
    optsVi: ['Hệ thống báo động về phòng an ninh nên cấm thao tác', 'Cửa tự mở khóa sau 5 phút và chỉ lưu lại nhật ký', 'Đứng chờ ngay cạnh cửa tới khi nhân viên an ninh tới', 'Có thẻ chung thì được phép mở mọi cửa trong khu vực'],
    optsEn: ['Alarm triggers at security; operating it is strictly forbidden', 'The door unlocks automatically and only saves a passive log', 'Wait beside the door until a security patrol officer arrives', 'Holders of a Common Pass are permitted to open any airport door'],
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
    optsJa: ['コックピットからは死角が極めて多い', '機体の特性上、機敏な動きができない', '大量の可燃性燃料を積み大変高価である', '航空機には車輪ブレーキが装備されない'],
    optsVi: ['Buồng lái có rất nhiều điểm mù phía trước và bên', 'Đặc tính tàu bay không thể chuyển hướng hay dừng gấp', 'Chở nhiều nhiên liệu dễ cháy và giá trị rất đắt đỏ', 'Tàu bay không được trang bị hệ thống phanh bánh xe'],
    optsEn: ['Many blind spots exist from the flight deck', 'Aircraft cannot maneuver or stop nimbly on ground', 'They carry flammable fuel and are extremely costly', 'Aircraft are not equipped with wheel braking systems'],
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
    optsJa: ['常に下向き（ロービーム）で走行する', '見通しが悪い場所では上向き（ハイビーム）にする', '滑走路に並行する道路を走るときは全灯を消灯する', '前照灯は消灯しハザードランプのみを点滅させる'],
    optsVi: ['Luôn để đèn chiếu gần (Low Beam), cấm bật pha xa', 'Bật đèn pha chiếu xa khi chạy qua khu vực tối', 'Tắt toàn bộ đèn pha khi chạy gần đường băng', 'Tắt đèn chính và chỉ bật đèn cảnh báo Hazard'],
    optsEn: ['Always keep headlights on low beam inside the airport', 'Switch to high beams in unlit perimeter areas', 'Turn headlights completely off near the active runway', 'Drive with headlights off and hazard flashers only'],
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
    optsJa: ['速度を落とし、お互いに左へ進路を変える', 'クラクションを鳴らし互いに右へ避けて通過', '車体の大きい車両がそのまま中央を直進する', 'その場で急停止し双方が後退して道を譲る'],
    optsVi: ['Giảm tốc độ và cả hai cùng chuyển hướng sang TRÁI', 'Bấm còi cảnh báo và cả hai tránh sang bên PHẢI', 'Xe có kích thước lớn hơn giữ nguyên làn đi thẳng', 'Dừng khẩn cấp tại chỗ rồi cả hai cùng lùi lại'],
    optsEn: ['Slow down and both vehicles steer to the LEFT', 'Sound horn and both vehicles steer to the RIGHT', 'The larger vehicle holds its course straight ahead', 'Stop immediately and both vehicles reverse in place'],
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
    optsJa: ['場周40km/h・GSE30km/h・牽引15km/h・機体牽引10km/h', '場周60km/h・GSE40km/h・牽引20km/h・機体牽引15km/h', '場周50km/h・GSE30km/h・牽引25km/h・機体牽引10km/h', '場周30km/h・GSE30km/h・牽引30km/h・機体牽引30km/h'],
    optsVi: ['Vành đai 40 · GSE 30 · Kéo moóc 15 · Kéo tàu bay 10 km/h', 'Vành đai 60 · GSE 40 · Kéo moóc 20 · Kéo tàu bay 15 km/h', 'Vành đai 50 · GSE 30 · Kéo moóc 25 · Kéo tàu bay 10 km/h', 'Vành đai 30 · GSE 30 · Kéo moóc 30 · Kéo tàu bay 30 km/h'],
    optsEn: ['Perimeter 40 · GSE 30 · Carts 15 · Aircraft Tow 10 km/h', 'Perimeter 60 · GSE 40 · Carts 20 · Aircraft Tow 15 km/h', 'Perimeter 50 · GSE 30 · Carts 25 · Aircraft Tow 10 km/h', 'Perimeter 30 · GSE 30 · Carts 30 · Aircraft Tow 30 km/h'],
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
    optsJa: ['機体周辺30m以内：15km/h ／ 機体へ5m以内：10km/h', '機体周辺50m以内：20km/h ／ 機体へ10m以内：15km/h', '機体周辺20m以内：20km/h ／ 機体へ5m以内：5km/h', '機体周辺30m以内：30km/h ／ 機体へ5m以内：15km/h'],
    optsVi: ['Trong 30m quanh tàu: 15 km/h / Tiến vào 5m: 10 km/h', 'Trong 50m quanh tàu: 20 km/h / Tiến vào 10m: 15 km/h', 'Trong 20m quanh tàu: 20 km/h / Tiến vào 5m: 5 km/h', 'Trong 30m quanh tàu: 30 km/h / Tiến vào 5m: 15 km/h'],
    optsEn: ['Within 30m of aircraft: 15 km/h / Within 5m: 10 km/h', 'Within 50m of aircraft: 20 km/h / Within 10m: 15 km/h', 'Within 20m of aircraft: 20 km/h / Within 5m: 5 km/h', 'Within 30m of aircraft: 30 km/h / Within 5m: 15 km/h'],
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
    optsJa: ['制限速度10km/h・電気駆動車のみ通行可', '制限速度15km/h・ディーゼル車も通行可', '制限速度30km/h・全GSE車両が通行可', '屋内エリアのため全車両とも進入禁止'],
    optsVi: ['Tối đa 10 km/h và chỉ xe chạy điện được vào', 'Tối đa 15 km/h, xe chạy dầu diesel vẫn được vào', 'Tối đa 30 km/h áp dụng cho tất cả mọi xe GSE', 'Là khu vực trong nhà nên cấm hoàn toàn mọi xe'],
    optsEn: ['10 km/h speed limit, electric-powered vehicles only', '15 km/h speed limit, diesel tractors also permitted', '30 km/h speed limit, open to all GSE vehicle types', 'Indoor area — all motorized vehicles are prohibited'],
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
    optsJa: ['3.8m超車両限定で赤線厳守、狭隘なため譲り合う', '普通車両も近道として自由に対面すれ違いできる', '誘導路側の赤線を少しまたいで通過してもよい', '3.8m超車両専用だが制限速度は40km/hである'],
    optsVi: ['Chỉ dành riêng xe >3.8m, cấm đè vạch đỏ và phải nhường nhau', 'Mọi xe thường đều được đi tắt và tránh nhau hai chiều tự do', 'Được phép lấn nhẹ sang bên kia vạch đỏ đường lăn khi tránh', 'Dành riêng xe >3.8m nhưng tốc độ tối đa tới 40 km/h'],
    optsEn: ['>3.8m vehicles only; never cross red ABL; narrow so yield', 'Any normal vehicle may use it as a two-way shortcut', 'Slightly crossing the red taxiway line to pass is permitted', 'Reserved for >3.8m vehicles with a 40 km/h speed limit'],
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
    optsJa: ['実線ははみ出し・車線変更禁止、破線は安全確認で可能', '一般道とまったく同じで実線でも自由に車線変更できる', '破線が追い越し禁止で、実線が追い越し可能を意味する', '実線と破線に法的な違いはなく同じ意味で使われている'],
    optsVi: ['Nét liền cấm lấn/đổi làn; nét đứt được đổi khi an toàn', 'Giống hệt đường phố, nét liền vẫn chuyển làn bình thường', 'Nét đứt cấm vượt, còn nét liền thì được phép vượt thoải mái', 'Cả hai loại vạch nét liền và nét đứt đều có nghĩa như nhau'],
    optsEn: ['Solid line forbids crossing/lane change; dashed allows when safe', 'Exactly like public roads, crossing solid lane lines is allowed', 'Dashed lines forbid overtaking while solid lines always permit it', 'Both solid and dashed white lines share the exact same meaning'],
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
    optsJa: ['すべての交差点付近・曲線区間で「すべての車両」が対象', 'すべての交差点付近・曲線区間で大型バスと牽引車のみ', '第1ターミナル北側1番スポット脇のカーブのみが対象', '夜間22時から早朝6時までの時間帯のみ全車両が対象'],
    optsVi: ['Mọi ngã tư và đoạn cong, áp dụng cho TẤT CẢ phương tiện', 'Mọi ngã tư và đoạn cong, chỉ áp dụng xe buýt và xe kéo', 'Chỉ áp dụng duy nhất tại khúc cua cạnh Spot #1 cánh Bắc', 'Chỉ áp dụng cho các phương tiện trong khung giờ ban đêm'],
    optsEn: ['All intersections and curves, applying to ALL vehicles', 'All intersections and curves, for buses and tugs only', 'Only at the curve beside Spot #1 on the North Wing', 'Only enforced for all vehicles during nighttime hours'],
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
    optsJa: ['15km/h・牽引6台まで（計7台）・左側を走行', '20km/h・牽引8台まで（計9台）・右車線を走行', '30km/h・牽引台数に上限なし・中央寄りを走行', '10km/h・牽引3台まで（計4台）・右側を走行'],
    optsVi: ['15 km/h · tối đa 6 moóc (tổng 7) · đi sát bên trái', '20 km/h · tối đa 8 moóc (tổng 9) · đi làn bên phải', '30 km/h · không giới hạn số moóc · đi giữa đường', '10 km/h · tối đa 3 moóc (tổng 4) · đi sát bên phải'],
    optsEn: ['15 km/h, max 6 carts (7 total), keep to the left', '20 km/h, max 8 carts (9 total), use the right lane', '30 km/h, no cart limit, keep toward the centerline', '10 km/h, max 3 carts (4 total), keep to the right'],
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
    optsJa: ['駐停車禁止標識の手前で停止し、監視員の指示に従う', '駐停車禁止区域内に入ってから端に寄せて停止する', '消防車両が出動する前に加速して素早く通過する', '赤色回転灯が片側だけならそのまま30km/hで直進'],
    optsVi: ['Dừng trước biển cấm dừng đỗ và tuân theo giám sát viên', 'Đi vào trong khu cấm dừng đỗ rồi mới tấp sát lề', 'Tăng ga vượt nhanh qua cổng trước khi xe cứu hỏa ra', 'Nếu chỉ sáng 1 bên đèn đỏ thì cứ chạy thẳng 30 km/h'],
    optsEn: ['Stop BEFORE the No-Stopping sign and obey the spotter', 'Enter the No-Stopping zone and pull over inside it', 'Accelerate past the gate before fire trucks exit', 'Proceed straight at 30 km/h if only one beacon flashes'],
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
    optsJa: ['STOPは必ず停止、停止線のみは直進不要・右折時基本停止', 'STOP標識も停止線のみも毎回必ず完全停止しなければならない', 'STOP標識は大型車のみ停止、普通車は停止線のみで通過可能', '停止線のみの場所では右折時も徐行や安全確認を行う必要なし'],
    optsVi: ['STOP bắt buộc dừng; chỉ vạch dừng: đi thẳng qua, rẽ phải dừng', 'Cả nơi có STOP và nơi chỉ có vạch dừng đều bắt buộc dừng hẳn', 'Biển STOP chỉ bắt buộc xe tải lớn, xe con không cần dừng lại', 'Tại nơi chỉ có vạch dừng thì rẽ phải không cần giảm tốc độ'],
    optsEn: ['STOP requires full stop; line-only: straight goes, turns stop', 'Both STOP and line-only markings always require a mandatory stop', 'STOP signs apply only to heavy trucks, not light towing tractors', 'At line-only markings, right-turning traffic need not yield'],
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
    optsJa: ['横断歩道は歩行者優先、緑の通行帯は車両優先（歩行者が譲る）', '横断歩道も緑の歩行者・自転車通行帯もともに歩行者が常に優先', '横断歩道も緑の歩行者・自転車通行帯もともに車両が常に優先', '8・9番スポット付近には横断歩道や乗客の歩行導線は一切ない'],
    optsVi: ['Vạch sang đường ưu tiên người đi bộ; làn xanh ưu tiên xe GSE', 'Cả vạch sang đường và làn xanh lá đều ưu tiên người đi bộ', 'Cả vạch sang đường và làn xanh lá đều ưu tiên xe cơ giới', 'Khu vực Spot #8 và #9 hoàn toàn không có hành khách đi qua'],
    optsEn: ['Crosswalks yield to pedestrians; green lanes yield to vehicles', 'Both crosswalks and green lanes always give pedestrians priority', 'Both crosswalks and green lanes always give vehicles priority', 'No passenger crosswalks exist anywhere near Spots 8 or 9'],
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
    optsJa: ['反時計回り一方通行（大型車は23番付近GSE帯から進入）', '時計回り一方通行（大型車は18番付近GSE帯から進入）', '対面双方向通行（大型車も一般車も双方向から進入）', 'バス専用区域のためGSEや大型車両は一切進入禁止'],
    optsVi: ['Một chiều ngược chiều kim đồng hồ (xe lớn vào từ Spot #23)', 'Một chiều thuận chiều kim đồng hồ (xe lớn vào từ Spot #18)', 'Đường hai chiều đối đầu cho cả xe buýt và các xe GSE', 'Khu vực dành riêng xe buýt, cấm mọi xe lớn khác đi vào'],
    optsEn: ['Counter-clockwise one-way (large GSE enter near Spot 23)', 'Clockwise one-way loop (large GSE enter near Spot 18)', 'Two-way traffic open to buses and GSE from both ends', 'Bus-only zone — all large GSE vehicles are prohibited'],
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
    optsJa: ['本館沿いの進入・退出車が優先（ピア側はSTOPで停止）', 'センターピア側から本館に向かう車両が常に優先', '進行方向に関係なく交差点へ先に進入した車が優先', '車体の大きい大型車両や牽引車が常に最優先である'],
    optsVi: ['Xe hướng dọc nhà ga vào/ra hầm ưu tiên (hướng Pier dừng STOP)', 'Xe từ hướng Center Pier chạy về nhà ga chính được ưu tiên', 'Không phân biệt hướng, xe nào tới ngã tư trước được đi trước', 'Xe có tải trọng lớn hơn hoặc xe đang kéo moóc luôn ưu tiên'],
    optsEn: ['Main-terminal N/S tunnel traffic leads; Pier traffic STOPs', 'Traffic arriving from the Center Pier always has priority', 'Whichever vehicle reaches the intersection first goes first', 'Heavier trucks or towing trains always have right-of-way'],
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
    optsJa: ['1車線・舗装弱くトーイング不可・無灯で緊急時以外禁止', 'トーイングカー専用の高速迂回路として24時間開放', '片側2車線で照明完備のため全GSEが自由に通行可能', '一般GSE専用道路で制限速度は場周と同じ40km/h'],
    optsVi: ['1 làn, nền yếu cấm xe kéo nặng, tối — cấm trừ khẩn cấp', 'Là đường tránh tốc độ cao mở 24/24 cho xe kéo tàu bay', 'Đường 2 làn có đèn chiếu sáng cho mọi xe GSE đi tự do', 'Đường chuyên dùng GSE với tốc độ tối đa 40 km/h'],
    optsEn: ['Single-lane, weak pavement, unlit — emergency/maint. only', 'High-speed bypass open 24/7 for aircraft pushback tugs', 'Two-lane well-lit arterial open to all GSE vehicles', 'Standard GSE service road with a 40 km/h speed limit'],
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
    optsJa: ['トーイングカー退避用の隙間で後方機向き時は停止', '徒歩や自転車がT2からエプロンへ抜けるための通路', 'ジェットブラストを拡散する通風孔でそのまま通過可', '工事車両が資材を搬入するための仮設開口部である'],
    optsVi: ['Khe tránh cho xe kéo; đuôi máy bay hướng vào phải dừng', 'Lối đi tắt cho nhân viên đi bộ và xe đạp từ nhà ga T2', 'Khe thông gió giảm luồng phản lực nên xe chạy qua bình thường', 'Cửa mở tạm thời phục vụ xe chở vật liệu đang thi công'],
    optsEn: ['Tug refuge gap; stop short whenever an aircraft tail faces it', 'Pedestrian and cyclist shortcut connecting T2 to the apron', 'Ventilation slot that weakens jet blast so traffic may pass', 'Temporary construction opening for material delivery trucks'],
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
    optsJa: ['前後・下部操作禁止。機体への後退時は車外誘導員必須', 'バックカメラ装備車なら誘導員なしで機体へ後退可', '主翼の下を通過すれば移動時間を短縮でき許可される', '機体直近に停車時はエンジンをかけたままNで離れる'],
    optsVi: ['Cấm trước/sau/gầm máy bay; lùi vào phải có người xi-nhan', 'Xe có camera lùi thì không cần người đứng ngoài xi-nhan', 'Được phép chạy tắt dưới gầm cánh để rút ngắn quãng đường', 'Dừng sát tàu bay thì để máy nổ không tải và gạt về số N'],
    optsEn: ['No ops ahead/behind/under; external guide required reversing', 'Backup cameras remove the need for an external guide person', 'Driving under wings is allowed when no crew are nearby', 'Leave the engine idling in neutral when parked by aircraft'],
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
    optsJa: ['ギアP・サイドブレーキ・エンジン停止・必要時輪止め', 'ハザード点灯・アイドリング維持・ギアN・ドア施錠', 'エアコンON・ギアD維持・フットブレーキ・窓全閉', '前照灯上向き・エンジン稼働・駐車ブレーキのみ実施'],
    optsVi: ['Về số P · Kéo phanh tay · Tắt máy · Chèn bánh khi cần', 'Bật Hazard · Để máy nổ · Về số N · Khóa cửa cabin', 'Bật điều hòa · Giữ số D · Đạp phanh · Đóng kín cửa kính', 'Bật pha xa · Giữ máy nổ · Chỉ kéo phanh tay đơn thuần'],
    optsEn: ['Shift to Park, parking brake ON, engine OFF, chock as needed', 'Hazard lights ON, engine idling, Neutral, lock doors', 'AC ON, keep in Drive, hold foot brake, close windows', 'High beams ON, engine running, set parking brake only'],
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
    optsJa: ['機体出入時に人や機材の進入を禁じる赤線（担当者は例外）', '予備のGSE機材を一時的に仮置きしてよい専用エリア', '搭乗する旅客が歩いて通行するための安全な歩道帯', '清掃車やケータリング車のみ自由に出入りできる区域'],
    optsVi: ['Cấm người & xe khi tàu bay vào/ra (trừ tổ phục vụ)', 'Khu vực dành riêng để tập kết tạm thời xe GSE dự phòng', 'Lối đi bộ an toàn cho hành khách ra vào khu vực lên tàu', 'Khu vực chỉ dành cho xe vệ sinh và suất ăn ra vào tự do'],
    optsEn: ['Keeps people/GSE clear on aircraft move (crew exempted)', 'Designated staging area for temporarily parking spare GSE', 'Marked safe pedestrian walkway for boarding passengers', 'Free-access zone reserved for cleaning and catering trucks'],
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
    optsJa: ['車両進入・PBB下通過禁止 ／ 人は回転灯消灯時のみ可', 'PBB停止中なら車両も赤斜線内をショートカット通過可', '全高3.8m以下であればPBBの下を車両で通過してよい', 'PBB回転灯が点灯中でも歩行者なら走って横断できる'],
    optsVi: ['Cấm xe 100% & cấm chui gầm PBB / Người chỉ vào khi tắt đèn', 'Khi PBB dừng hẳn thì xe được chạy tắt qua vùng gạch chéo', 'Xe thấp dưới 3.8m được phép chạy xuyên dưới gầm ống PBB', 'Đèn xoay PBB đang sáng nhưng người đi bộ vẫn chạy qua được'],
    optsEn: ['Vehicles & under-PBB strictly banned; staff only if beacon OFF', 'Vehicles may shortcut through when the PBB is stationary', 'Vehicles under 3.8m tall may drive underneath the PBB', 'Staff may run across even while the PBB beacon is flashing'],
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
    optsJa: ['車両専用（徒歩・自転車不可）で機体横断あり・赤線厳守', '歩行者と自転車も車両と共用して自由に通行できる通路である', '航空機は絶対に横断しない純粋な一般車両専用道路である', '対向車を避ける際は赤線を越えてスポット誘導経路側へ避ける'],
    optsVi: ['Chỉ dành cho xe (cấm đi bộ/xe đạp), tàu bay cắt ngang, giữ vạch đỏ', 'Người đi bộ và xe đạp được phép đi chung tự do với các xe GSE', 'Tàu bay không bao giờ lăn cắt ngang qua tuyến đường sau bãi đỗ', 'Khi tránh xe ngược chiều được phép lấn qua vạch đỏ đường lăn Spot'],
    optsEn: ['Vehicles only (no walk/bike), aircraft cross, stay inside red', 'Shared corridor open to pedestrians, cyclists, and all GSE', 'Aircraft never cross any portion of this behind-stand vehicle road', 'Drivers may cross the red boundary into the taxilane to pass'],
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
    optsJa: ['#7〜#8間・#18〜#19間・#76南側・#77南側の4カ所', '#1〜#2間・#10〜#11間・#24〜#25間・#80南側', '#101〜#102間・#201〜#202間・#301〜#302間・#401〜#402間', 'ERAと通行帯が交差している場所は空港内に存在しない'],
    optsVi: ['Giữa #7–#8, #18–#19, phía Nam #76 và phía Nam #77 (4 điểm)', 'Giữa #1–#2, #10–#11, #24–#25 và phía Nam #80 (4 điểm)', 'Giữa #101–#102, #201–#202, #301–#302 và #401–#402', 'Không có giao điểm nào giữa đường sau bãi đỗ và ERA'],
    optsEn: ['Between #7–#8, #18–#19, South of #76, and South of #77', 'Between #1–#2, #10–#11, #24–#25, and South of #80', 'Between #101–#102, #201–#202, #301–#302, and #401–#402', 'There are no intersections between the road and any ERA'],
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
    optsJa: ['機体からGSEが離れ、PBBとチョークが外されている', 'けん引車黄回転灯と機体のナビ・衝突防止灯が点灯中', '地上運航係員がパイロットに出発OKの合図をしている', '貨物室ドアが開いておりハイリフトローダーが接続中'],
    optsVi: ['GSE đã tách ra, ống PBB rút và chèn bánh đã tháo', 'Đèn vàng xe kéo, đèn Nav và Anti-collision đang bật', 'Nhân viên mặt đất ra hiệu OK khởi hành cho cơ trưởng', 'Cửa hầm hàng đang mở và High-Lift Loader vẫn áp sát'],
    optsEn: ['GSE clear, PBB retracted, and wheel chocks removed', 'Tug yellow beacon, nav, and anti-collision lights ON', 'Ground staff signaling departure OK to the flight deck', 'Cargo doors open with High-Lift Loader still docked'],
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
    optsJa: ['けん引車なしでも自走で動き出し後方ブラストが出る点', 'アンチコリジョンライトを消灯したまま静かに動く点', 'PBBを機体へ接続したまま後方へ動き始める点', '地上監視員が周囲に一人も配置されずに動き出す点'],
    optsVi: ['Không có xe kéo nhưng máy bay tự nổ máy thổi phản lực sau', 'Tàu bay tắt hết đèn Anti-collision khi tự di chuyển ra', 'Tàu bay lăn bánh khi ống lồng PBB vẫn đang gắn ở cửa', 'Không bố trí bất kỳ nhân viên giám sát mặt đất nào quanh đó'],
    optsEn: ['No tug is attached, yet engines start and blast jet exhaust', 'Anti-collision beacons remain OFF while taxiing out', 'The aircraft begins moving with the PBB still attached', 'No ground spotters are stationed anywhere around the stand'],
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
    optsJa: ['全スポット・24時間可能（赤灯＋チョーク設置が目印）', '貨物地区（101〜119番）の昼間のみ実施が許可される', '沖留スポット（200〜500番台）のみで夜間は禁止', '赤ビーコン消灯・チョーク撤去済が試運転中の目印'],
    optsVi: ['Mọi bãi đỗ · 24/24 (dấu hiệu: đèn đỏ bật + còn chèn bánh)', 'Chỉ được phép thực hiện ban ngày tại khu Cargo (#101–#119)', 'Chỉ được phép tại bãi đỗ xa #200–#500 và cấm ban đêm', 'Dấu hiệu nhận biết là đèn đỏ tắt và đã tháo hết chèn bánh'],
    optsEn: ['All stands, 24/7 (red beacon ON while chocks remain IN)', 'Cargo stands (#101–119) during daytime hours only', 'Remote stands (#200–500) only; prohibited at night', 'Identified by beacon OFF and wheel chocks already removed'],
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
    optsJa: ['管制交信なしで自己責任により横断する自動車専用通路', '歩行者と自転車が沖留スポットへ歩いて移動する歩道', '管制塔と無線交信した車両だけが通れる滑走路横断道', '追い越し・追い抜きが自由に許可されたGSE高速道'],
    optsVi: ['Đường ô tô tự quan sát cắt ngang đường lăn không cần ATC', 'Lối đi bộ và xe đạp cho nhân viên ra các bãi đỗ xa', 'Đường cắt ngang đường băng bắt buộc gọi bộ đàm Đài ATC', 'Đường cao tốc nội bộ GSE được phép vượt xe thoải mái'],
    optsEn: ['Vehicle-only crossing under self-watch without ATC radio', 'Walkway and bike path leading out to remote stands', 'Runway crossing requiring explicit ATC Tower radio clearance', 'High-speed GSE expressway where overtaking is allowed'],
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
    optsJa: ['100m以上（約2スポット分）離れてから横断する', '20m以上（約半スポット分）離れれば横断してよい', '尾翼が通り過ぎた直後に周囲を見てすぐ横断する', '50m以上（約1スポット分）離れれば安全に横断可'],
    optsVi: ['Ít nhất 100m trở lên (khoảng 2 bãi đỗ) mới qua', 'Chỉ cần cách 20m trở lên (nửa bãi) là qua được', 'Ngay sau khi đuôi máy bay vừa lướt qua là chạy qua', 'Cách 50m trở lên (khoảng 1 bãi đỗ) là đủ an toàn'],
    optsEn: ['At least 100 meters (roughly 2 stands) before crossing', '20 meters (about half a stand) is sufficient clearance', 'Immediately after the aircraft tail clears the lane', '50 meters (roughly 1 stand) is always safe to cross'],
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
    optsJa: ['出口にある赤線（誘導経路境界線）の手前で一旦停止する', '制限速度30km/h（牽引中15km/h）を守り速やかに通過する', 'センターラインおよび両端の白色交互破線をはみ出さない', '追い越し・追い抜き・Uターン・駐停車を絶対に行わない'],
    optsVi: ['Dừng lại tại vạch đỏ ở lối ra (ranh giới đường lăn)', 'Giữ tốc độ 30 km/h (kéo 15 km/h) và thoát qua dứt khoát', 'Không đè vạch tim và không lấn ra ngoài vạch đứt hai bên', 'Tuyệt đối không vượt, không quay đầu U-turn, không dừng đỗ'],
    optsEn: ['Stopping at the exit red line (taxilane boundary line)', 'Proceeding steadily within 30 km/h (15 km/h towing)', 'Staying inside the centerline and dashed edge lines', 'Never overtaking, making U-turns, or stopping inside'],
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
    optsJa: ['サービスレーンから出てくる車両を優先する', 'これからサービスレーンへ進入する車両が優先', '進行方向に関係なく大型・重量車両が優先', '交差点の右側方向から進入してくる車両が優先'],
    optsVi: ['Ưu tiên xe đang đi RA khỏi Service Lane trước', 'Ưu tiên xe đang chuẩn bị đi VÀO Service Lane', 'Ưu tiên xe kích thước lớn bất kể chiều chạy', 'Ưu tiên xe đang tiến tới từ phía bên phải'],
    optsEn: ['Vehicles exiting the Service Lane have priority', 'Vehicles preparing to enter have priority', 'Larger vehicles have priority regardless of direction', 'Traffic approaching from the right has priority'],
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
    optsJa: ['前後スポット駐機中は通行禁止、着陸機の高速接近に注意', '前後スポットに機体がいても翼の下をくぐって通行できる', '他のサービスレーンと異なり徒歩や自転車でも通行可', '滑走路に近いため制限速度が場周と同じ40km/hになる'],
    optsVi: ['Cấm qua nếu spot trước/sau có tàu; chú ý máy bay từ A4', 'Dù spot có tàu bay đỗ vẫn được chạy chui dưới đầu cánh', 'Khác làn thường, đoạn E3/E4 cho phép đi bộ cắt ngang', 'Do gần đường băng nên tốc độ nâng lên tối đa 40 km/h'],
    optsEn: ['Closed if either stand is occupied; watch fast A4 exits', 'May pass beneath wingtips even if stands are occupied', 'Unlike other lanes, pedestrians are permitted on E3/E4', 'Speed limit increases to 40 km/h near the runway'],
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
    optsJa: ['徒歩横断禁止・北→南横断時はE/E3方向の死角に要注意', 'T2に直結しているため徒歩・自転車での横断も許可される', '航空機は常に誘導路J方向からのみ進入してくる', '見通しが非常に良いため一時停止せずそのまま通過可'],
    optsVi: ['Cấm đi bộ; chiều Bắc→Nam khuất tầm nhìn hướng E/E3', 'Do nối thẳng T2 nên nhân viên được đi bộ cắt ngang qua', 'Tàu bay luôn chỉ tiến vào từ duy nhất hướng đường lăn J', 'Tầm nhìn rất thoáng nên không cần dừng quan sát trước'],
    optsEn: ['No walking; N→S crossing blocked toward E/E3 — hold safe', 'Walking across is permitted due to direct T2 access', 'Aircraft approach exclusively from taxiway J only', 'Wide visibility eliminates the need to stop and check'],
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
    optsJa: ['①エプロン境界線（ABL） ／ ②スポット誘導経路境界線', '①滑走路進入禁止境界線 ／ ②誘導路中心線マーキング', '①GSE一時停止線表示 ／ ②ERA機材制限区域境界線', '①PBB危険区域境界線 ／ ②サービスレーン境界線'],
    optsVi: ['① Vạch ranh giới Apron (ABL) / ② Ranh giới đường lăn Spot', '① Vạch ranh giới đường băng / ② Vạch tim đường lăn chính', '① Vạch dừng GSE sân đỗ / ② Vạch ranh giới khu vực cấm ERA', '① Vạch vùng nguy hiểm PBB / ② Vạch ranh giới Service Lane'],
    optsEn: ['① Apron Boundary Line (ABL) / ② Spot Taxilane Boundary', '① Runway Holding Position / ② Taxiway Centerline Marking', '① GSE Apron Stop Line / ② Equipment Restraint Area Line', '① PBB Danger Zone Line / ② Service Lane Boundary Edge Line'],
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
    optsJa: ['40km/h。延長部はSTOPで一時停止し離着陸機を確認横断', '30km/h。滑走路延長部は徐行のみで一旦停止は不要', '50km/h。着陸機が見えていても急いで先に通過する', '40km/h。舗装内側の緑地帯も場周道路の一部である'],
    optsVi: ['40 km/h; dừng hẳn tại STOP đầu băng, quan sát rồi qua nhanh', '30 km/h; chỉ giảm tốc đi chậm, không cần dừng hẳn tại STOP', '50 km/h; thấy máy bay đang hạ cánh vẫn phóng nhanh qua trước', '40 km/h; dải cỏ sát mép trong đường cũng thuộc đường vành đai'],
    optsEn: ['40 km/h; full STOP at runway extensions, verify clear & cross', '30 km/h; slow down at runway extensions without stopping', '50 km/h; hurry across even with landing traffic visible', '40 km/h; the inner grass strip is part of the perimeter road'],
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
    optsJa: ['ILS電波保護のため通行止め。進入せず反対側へ迂回', '徐行運転に切り替えればそのまま通過して差し支えない', '金属車体の大型車でなく軽車両なら進入してよい', '看板の手前に車両を駐車して30分間消灯を待機する'],
    optsVi: ['Cấm vào để bảo vệ sóng ILS — quay đầu đi vòng phía kia', 'Chỉ cần giảm tốc độ đi thật chậm qua là không ảnh hưởng', 'Xe nhỏ hoặc xe điện nhẹ thì vẫn được phép chạy thẳng qua', 'Đỗ xe lại ngay trước biển báo chờ 30 phút tới khi tắt đèn'],
    optsEn: ['Closed to protect ILS beam — do NOT enter, detour opposite', 'Slow down and proceed carefully through the red-lit zone', 'Smaller light vehicles may pass through without detouring', 'Park right in front of the sign and wait 30 minutes'],
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
    optsJa: ['常時駐停車禁止（緑地・機材含む）。ただし一旦停止不要', '看板上部の赤灯が点灯している時間帯のみ駐停車が禁止', '通行車両はすべて区間入口の停止線で一旦停止が必須である', '道路舗装面を外れた緑地部・ガレ場であれば駐車してよい'],
    optsVi: ['Cấm dừng đỗ 24/24 (cả cỏ/đồ đạc), xe chạy qua không cần dừng', 'Chỉ cấm dừng đỗ vào thời điểm đèn đỏ phía trên đang bật sáng', 'Mọi xe đi qua đoạn 50m này đều phải dừng hẳn tại vạch đầu vào', 'Được phép đỗ tạm lên phần bãi cỏ hoặc bãi đá nằm ven đường'],
    optsEn: ['No stopping/parking 24/7 (incl. grass), though traffic flows', 'Only enforced when the overhead red ILS lamp is illuminated', 'All passing vehicles must make a full stop at the zone entry', 'Parking on the adjacent grass or gravel shoulder is permitted'],
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
    optsJa: ['回転灯→停車→管制許可→無線傍受→退出許可→離脱報告', '制限パスに「着陸」印があれば管制連絡なしで進入可', '空港維持・整備車両の単独作業なら無許可で進入可', '進入時だけ管制許可を取り、退出時は無言で離脱してよい'],
    optsVi: ['Đèn xoay→Dừng→Xin phép ATC→Trực đài→Xin ra→Báo xong', 'Thẻ có ký hiệu 「着陸」 thì tự do vào không cần gọi Đài', 'Xe bảo trì kỹ thuật đi một mình được miễn thủ tục xin phép', 'Chỉ cần xin phép lúc vào, lúc thoát ra thì lặng lẽ rời đi'],
    optsEn: ['Beacon→Stop→ATC entry→Monitor→Exit clearance→Clear report', 'Pass notation \'着陸\' allows entry without Tower clearance', 'Maintenance vehicles operating solo need no ATC clearance', 'Only entry clearance is needed; exit silently when finished'],
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
    optsJa: ['滑走路または誘導路の外へ出よ', 'その場で直ちに停止（待機）せよ', '安全確認のうえ横断（進行）支障なし', '飛行場の所定の出発点へ帰還せよ'],
    optsVi: ['Rời ngay khỏi đường băng hoặc đường lăn', 'Dừng lại và giữ nguyên vị trí chờ đợi', 'Được phép băng qua hoặc tiếp tục đi', 'Quay trở về điểm xuất phát trên sân bay'],
    optsEn: ['Clear the runway or taxiway immediately', 'Stop and hold your current position', 'Cleared to cross or proceed ahead', 'Return to starting point on airport'],
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
    optsJa: ['白色閃光：出発点に帰れ ／ 赤緑交互閃光：注意せよ', '白色閃光：横断支障なし ／ 赤緑交互閃光：停止せよ', '白色閃光：滑走路外へ出よ ／ 赤緑交互閃光：帰還せよ', '白色閃光：緊急車両優先 ／ 赤緑交互閃光：エンジン停止'],
    optsVi: ['Trắng nháy: Về điểm xuất phát / Đỏ-Xanh: Chú ý cao độ', 'Trắng nháy: Được phép băng qua / Đỏ-Xanh: Dừng lại ngay', 'Trắng nháy: Rời khỏi đường băng / Đỏ-Xanh: Quay về gốc', 'Trắng nháy: Nhường xe cứu hỏa / Đỏ-Xanh: Tắt động cơ'],
    optsEn: ['Flashing White: Return to start / Alt Red-Green: Caution', 'Flashing White: Cleared to cross / Alt Red-Green: Stop', 'Flashing White: Clear runway / Alt Red-Green: Return', 'Flashing White: Yield fire truck / Alt Red-Green: Cut engine'],
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
    optsJa: ['Charlie / Juliett / November / Whiskey / Nine（ナイナー）', 'Canada / Japan / Nancy / Water / Nine（ナインとそのまま発音）', 'Control / Jumbo / North / Wing / Nine（ナインとそのまま発音）', 'Cargo / Jet / Night / Wind / Nine（ナイナーと無線で発音する）'],
    optsVi: ['Charlie / Juliett / November / Whiskey / Nine (Niner)', 'Canada / Japan / Nancy / Water / Nine (đọc là Nine)', 'Control / Jumbo / North / Wing / Nine (đọc là Nine)', 'Cargo / Jet / Night / Wind / Nine (đọc là Niner)'],
    optsEn: ['Charlie / Juliett / November / Whiskey / Niner', 'Canada / Japan / Nancy / Water / Nine (standard)', 'Control / Jumbo / North / Wing / Nine (standard)', 'Cargo / Jet / Night / Wind / Niner (variant)'],
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
    optsJa: ['COC（0569-38-1500 / 内線3000）※事故時は現場保存', '翌朝に出社してから自社の上司へメールまたは日報で報告する', '最寄りのターミナル旅客案内カウンターへ歩いて直接届け出る', '車両を安全な場所へ移動し現場を片付けてから事後に連絡する'],
    optsVi: ['COC (0569-38-1500 / nội bộ 3000) — *Giữ nguyên hiện trường', 'Sáng hôm sau gửi email hoặc báo cáo ca cho quản lý công ty', 'Đi bộ lên quầy thông tin hành khách trong nhà ga báo cáo', 'Dời xe khỏi vị trí va chạm và dọn sạch rồi mới gọi báo'],
    optsEn: ['COC (0569-38-1500 / Ext. 3000) — *Preserve accident scene', 'Email your company supervisor the following morning shift', 'Walk to the nearest terminal passenger information counter', 'Move the vehicle and clean up debris before calling security'],
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
    optsJa: ['滑走路3500m・ピア右が国内線／左が国際線・101〜119貨物', '滑走路は平行2本で各2500m・101〜119番は国内線旅客用', 'センターピアの右側が国際線、左側が国内線スポット', '滑走路3500m・ピア先端から東へ800m・600番台は旅客専用'],
    optsVi: ['Băng 3.500m · Phải Pier = Nội địa / Trái = Quốc tế · #101-119 Cargo', 'Có 2 đường băng song song 2.500m · #101-119 là bãi khách nội địa', 'Bên phải Center Pier là Quốc tế, bên trái là Quốc nội', 'Băng 3.500m · Cách mũi Pier 800m · #600 chuyên khách nội địa'],
    optsEn: ['3,500m RWY; Pier right=Dom / left=Int\'l; #101-119 Cargo', 'Two 2,500m parallel runways; #101-119 are domestic gates', 'Right of Center Pier is Int\'l and left side is Domestic', '3,500m RWY; 800m from Pier tip; #600 is passenger-only'],
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
    optsJa: ['許可なく車両・機材その他の物件を放置すること', '白線で指定された置き場所にGSE機材を整頓駐機すること', '定位置で乗客の乗降および貨物の積み卸しを行うこと', '許可を得て航空機の給油および軽微な整備を行うこと'],
    optsVi: ['Tự ý bỏ lại xe cộ, thiết bị hoặc vật dụng không phép', 'Đỗ gọn gàng xe GSE vào đúng ô vạch trắng quy định', 'Thực hiện đón trả khách và chất xếp hàng đúng vị trí', 'Tra nạp nhiên liệu và bảo dưỡng nhẹ theo đúng phép'],
    optsEn: ['Abandoning vehicles, GSE, or items without permission', 'Parking GSE neatly inside designated white-line bays', 'Boarding passengers and loading cargo at assigned stands', 'Performing authorized aircraft refueling and maintenance'],
    ans: 0,
    expJa: 'エプロン運用規程第14条により「車両、機材その他の物件を放置すること」は禁止されています。GSEは必ず白線で指示された所定の置き場所へ戻します。',
    expVi: 'Điều 14 nghiêm cấm để xe, thiết bị, vật dụng tùy tiện trên sân đỗ; mọi xe GSE sau khi dùng xong phải đỗ đúng vị trí kẻ vạch trắng quy định.',
    expEn: 'Article 14 prohibits abandoning vehicles, equipment, or items on the apron. Always return GSE to designated white-lined parking bays.'
  }
];
