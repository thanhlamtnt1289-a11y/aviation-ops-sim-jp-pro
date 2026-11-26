// All Japanese Airports, Turnaround, Pax, Cargo/DGR, Safety & 3D Ops Metadata

export const JP_AIRPORTS = {
    NGO: {
      code: 'NGO',
      nameJa: '中部国際空港（セントレア / Centrair）',
      nameVi: 'Sân bay Quốc tế Chubu Centrair (NGO)',
      nameEn: 'Chubu Centrair International Airport (NGO)',
      targetMin: 40,
      windRisk: 0.45,
      ruleJa: '海上人工島（伊勢湾）：3,500m×60m単一滑走路（36/18）、センターピア先端〜滑走路約400m。強風時の高所作業・コンテナ扉開閉に厳重注意。',
      ruleVi: 'Đảo nhân tạo Vịnh Ise: đường băng đơn 3.500m×60m (36/18), mũi Center Pier cách đường băng ~400m. Chú ý gió ngang mạnh khi mở cửa hầm/làm việc trên cao.',
      ruleEn: 'Ise Bay artificial island: single 3,500m×60m RWY (36/18), Center Pier tip ~400m from runway. Strict high-wind precautions for elevated work & cargo doors.'
    },
    NRT: {
      code: 'NRT',
      nameJa: '成田国際空港（Narita）',
      nameVi: 'Sân bay Quốc tế Narita (NRT)',
      nameEn: 'Tokyo Narita International Airport (NRT)',
      targetMin: 55,
      windRisk: 0.25,
      ruleJa: '千葉県下総台地：A滑走路4,000m（34L/16R）・B滑走路2,500m（34R/16L）。大型貨物機・ULDビルドアップ量が多く、カーフュー（運用時間制限）管理が重要。',
      ruleVi: 'Cao nguyên Chiba: RWY A 4.000m (34L/16R) & RWY B 2.500m (34R/16L) cách nhau ~2.450m. Tỷ lệ tàu rộng & hàng ULD lớn, lưu ý giờ giới nghiêm (curfew).',
      ruleEn: 'Chiba inland plateau: RWY A 4,000m (34L/16R) & RWY B 2,500m (34R/16L) spaced ~2,450m apart. Heavy widebody/freighter ULD volume & curfew management.'
    },
    HND: {
      code: 'HND',
      nameJa: '東京国際空港（羽田 / Haneda）',
      nameVi: 'Sân bay Quốc tế Haneda (HND)',
      nameEn: 'Tokyo Haneda International Airport (HND)',
      targetMin: 35,
      windRisk: 0.30,
      ruleJa: '東京湾埋立地（4滑走路：A 3,000m・B 2,500m・C 3,360m・D 2,500m桟橋島）。超高密度発着のためプッシュバック許可と車両交錯防止が最重要。',
      ruleVi: 'Vịnh Tokyo (4 đường băng: A 3.000m, B 2.500m, C 3.360m, D 2.500m đảo cầu cảng). Mật độ cực cao, thời gian quay đầu 35 phút rất gấp.',
      ruleEn: 'Tokyo Bay (4 runways: A 3,000m, B 2,500m, C 3,360m, D 2,500m offshore pier). Ultra-high density 35-min turnarounds & strict pushback coordination.'
    },
    KIX: {
      code: 'KIX',
      nameJa: '関西国際空港（Kansai）',
      nameVi: 'Sân bay Quốc tế Kansai (KIX)',
      nameEn: 'Kansai International Airport (KIX)',
      targetMin: 45,
      windRisk: 0.40,
      ruleJa: '大阪湾人工2島（24時間運用）：1期島A滑走路3,500m＆全長約1.7kmのT1ウイング、2期島B滑走路4,000m。強風・台風対策と国際貨物乗継（機移し）が鍵。',
      ruleVi: 'Đảo nhân tạo kép Vịnh Osaka (24h): Đảo 1 RWY A 3.500m + nhà ga T1 dài ~1,7km; Đảo 2 RWY B 4.000m. Lưu ý gió bão & hàng chuyển tiếp quốc tế.',
      ruleEn: 'Osaka Bay 24h dual islands: Island 1 RWY 06R/24L (3,500m) + 1.66km T1 wing; Island 2 RWY 06L/24R (4,000m). Typhoon wind & ship-to-ship cargo focus.'
    },
    CTS: {
      code: 'CTS',
      nameJa: '新千歳空港（Shin-Chitose）',
      nameVi: 'Sân bay Shin-Chitose (CTS - Hokkaido)',
      nameEn: 'New Chitose Airport (CTS - Hokkaido)',
      targetMin: 45,
      windRisk: 0.35,
      ruleJa: '北海道石狩平野：3,000m平行2滑走路（01L/19R・01R/19L、間隔300m）と半円形ターミナル。冬季は凍結路低速走行・60℃以上の防除氷液散布（クリーン・エアクラフト）が必須。',
      ruleVi: 'Hokkaido: 2 đường băng song song 3.000m cách tâm 300m & nhà ga bán nguyệt. Mùa đông bắt buộc chạy chậm chống trượt & phun De-icing ≥60°C.',
      ruleEn: 'Hokkaido plain: 3,000m close-parallel runways (300m spacing) & C-shaped terminal. Winter snow ops require ≥60°C de-icing (Clean Aircraft Concept).'
    }
  };

  // Danh sách 12 bước nghiệp vụ Turnaround từ On-block đến Off-block (Chuẩn giáo trình JEAE SSW-I/II)
  export const TA_STEPS = [
    { id: 'marshal', duration: 2, req: [], outdoor: true,
      ja: '駐機誘導（マーシャリング・ウォッチマン配置）', vi: 'Hướng dẫn máy bay vào bãi đỗ (Marshalling & Watchman)', en: 'Aircraft Marshalling & Wingwalker/Watchman Positioning',
      detailJa: '停止線確認・パドル誘導・両翼端クリアランス（目測誤差±3m注意）・エンジン外側5m以上離隔', detailVi: 'Canh vạch dừng, dẫn hướng chuẩn, canh đầu cánh (sai số mắt ±3m) & đứng cách vỏ ngoài động cơ ≥5m', detailEn: 'Verify stop bar, standard wand signals, wingtip clearance (±3m pilot visual error) & stay ≥5m outside engines' },
    { id: 'chock', duration: 2, req: ['marshal'], outdoor: true,
      ja: '輪止め設置（チョックオン）＆ コーン配置', vi: 'Chèn bánh máy bay (Chock On) & Đặt cọc tiêu', en: 'Wheel Chocks Inserted & Safety Cones Placed',
      detailJa: 'エンジン停止・衝突防止灯（赤色ビーコン）消灯確認後に前輪・主輪へ輪止め、機首・翼端・エンジン前へコーン設置', detailVi: 'Đợi tắt đèn beacon đỏ & động cơ dừng hẳn mới chèn bánh mũi/chính và đặt cọc tiêu mũi, đầu cánh, động cơ', detailEn: 'Wait for engine spool-down & red beacon OFF before inserting nose/main chocks and placing safety cones' },
    { id: 'arrcheck', duration: 2, req: ['chock'], outdoor: true,
      ja: '到着外部点検・FOD確認・指差呼称', vi: 'Kiểm tra ngoại quan đến, FOD & Chỉ tay hô xác nhận (指差呼称)', en: 'Arrival Walkaround, FOD Check & Point-and-Call',
      detailJa: '機体損傷・油漏れ・FOD（異物）有無を指差呼称で確認（機体接近車両は5m手前で一旦停止・10km/h以下）', detailVi: 'Kiểm tra thân vỏ, rò dầu, FOD bằng 指差呼称 (xe GSE dừng hẳn cách tàu 5m, tiến vào ≤10 km/h)', detailEn: 'Check fuselage damage, leaks & FOD via Point-and-Call (GSE brake-check stop at 5m, approach ≤10 km/h)' },
    { id: 'gpu', duration: 2, req: ['chock', 'arrcheck'], outdoor: true,
      ja: 'GPU / eGPU 接続（AC 115V / 400Hz 地上電源）', vi: 'Kết nối nguồn điện mặt đất GPU / eGPU (AC 115V / 400Hz)', en: 'Connect GPU / eGPU Ground Power (AC 115V / 400Hz)',
      detailJa: 'プラグ・ケーブル損傷点検後に右舷機首レセプタクルへ接続し、AC 115V / 400Hz 供給ランプを確認', detailVi: 'Kiểm tra đầu cắm, nối ổ điện mũi phải cấp nguồn chuẩn AC 115V / 400Hz và xác nhận đèn báo ổn định', detailEn: 'Inspect plug/cable, connect to starboard nose receptacle (AC 115V / 400Hz), and verify power-on indicator' },
    { id: 'unload', duration: 8, req: ['chock', 'arrcheck'], outdoor: true,
      ja: '降機（PBB/ステップ）＆ 手荷物・ULD取卸し', vi: 'Khách xuống (PBB/Xe thang) & Dỡ hành lý/ULD', en: 'Passenger Deplaning & Baggage / ULD Offloading',
      detailJa: 'ドアモード解除確認後に開扉、ハイリフトローダー（ULD）/ ベルトローダー（バルク間隔50cm）で取卸し', detailVi: 'Xác nhận Disarm cửa trước khi mở; dùng High-Lift Loader dỡ ULD và Belt Loader dỡ hàng rời (cách 50cm)', detailEn: 'Confirm slide disarmed before door open; offload ULDs via High-Lift Loader & bulk bags at 50cm spacing' },
    { id: 'fuel', duration: 10, req: ['chock', 'arrcheck'], outdoor: true,
      ja: '給油作業（ハイドラント・サービサー / 30kL給油車）', vi: 'Tra nạp nhiên liệu Jet A-1 (Hydrant Servicer / Xe bồn ≤30kL)', en: 'Jet A-1 Refueling (Hydrant Servicer / ≤30kL Refueler)',
      detailJa: '乙種第4類有資格者管理・ボンディング/アース接続（赤ピット）・消火器待機・給油車両前方の退避経路確保', detailVi: 'Chứng chỉ 乙種第4類, kẹp dây tiếp địa (hố đỏ), bình chữa cháy sẵn sàng & giữ trống lối thoát phía trước xe dầu', detailEn: 'HazMat Class 4 cert, bonding/grounding wire (red pit), fire extinguishers ready & clear forward escape path' },
    { id: 'lav', duration: 6, req: ['chock', 'arrcheck'], outdoor: true,
      ja: 'ラバトリー汚水処理（2,000L汚水＋2,000L洗浄水）', vi: 'Xử lý vệ sinh bồn thải Lavatory (2.000L thải + 2.000L rửa)', en: 'Lavatory Servicing (2,000L Waste + 2,000L Flush)',
      detailJa: '防護具着用・ダンプバルブ確実閉鎖・飲料水補給車との衛生分離を厳守', detailVi: 'Đeo đồ bảo hộ, đóng chặt van xả chống rò rỉ đóng băng trên cao, tách biệt tuyệt đối với xe nước sạch', detailEn: 'Wear PPE, verify dump valve lock/seal to prevent blue-ice leaks, and maintain strict separation from potable water' },
    { id: 'water', duration: 5, req: ['chock', 'arrcheck'], outdoor: true,
      ja: '飲料水補給（最大4,000L・水圧3.0kg/cm²・当日水）', vi: 'Cấp nước sạch sinh hoạt (Bồn 4.000L · Áp lực 3,0kg/cm²)', en: 'Potable Water Service (4,000L Tank · 3.0 kg/cm²)',
      detailJa: 'タンク内に1日以上保管した水は使用禁止！ホース先端消毒・衛生管理を徹底', detailVi: 'Cấm dùng nước lưu trong bồn xe quá 1 ngày! Giữ sạch đầu vòi cấp nước theo Luật Vệ sinh Thực phẩm', detailEn: 'Never use water stored ≥1 day in tank! Maintain sanitary nozzle handling at 3.0 kg/cm² pump pressure' },
    { id: 'clean', duration: 8, req: ['unload'], outdoor: false,
      ja: '機内清掃・ケータリング搭載（床面-19cm・アウトリガー）', vi: 'Vệ sinh cabin & Nạp suất ăn (Sàn thấp hơn 19cm · Chân chống)', en: 'Cabin Cleaning & Catering Load (-19cm Floor · Outriggers)',
      detailJa: 'フードローダーはアウトリガー（安定脚）張出、機内床より約19cm低くセットして接触防止（走行8km/h以下）', detailVi: 'Xe suất ăn bắt buộc hạ chân chống (Outriggers), căn sàn thấp hơn sàn tàu ~19cm chống cạ cửa (chạy ≤8km/h)', detailEn: 'Deploy catering truck outriggers, set van floor ~19cm below cabin sill, and observe ≤8 km/h high-CG speed' },
    { id: 'load', duration: 10, req: ['unload'], outdoor: true,
      ja: '手荷物・ULD搭載（LIR照合・コンター＆ロック確認）', vi: 'Xếp hành lý & ULD theo LIR (Kiểm tra Contour & Khóa sàn)', en: 'Baggage & ULD Loading (LIR Match, Contour & Sill Locks)',
      detailJa: 'LIR位置とULDタグ照合、偏荷重・コンター異常なし確認、重量パレット手押し移動は必ず2名以上で実施', detailVi: 'Đối chiếu thẻ ULD với LIR, không lệch trọng tâm/vượt contour, đẩy tay pallet nặng bắt buộc ≥2 người, gạt đủ chốt khóa', detailEn: 'Match ULD tags to LIR positions, verify contour/CG, use ≥2 crew for manual heavy pallet transfer & raise all locks' },
    { id: 'board', duration: 10, req: ['clean'], outdoor: false,
      ja: '乗客搭乗（PRM優先・機内持込手荷物＆PPBM確認）', vi: 'Hành khách lên tàu (Ưu tiên PRM · Kiểm tra xách tay & PPBM)', en: 'Passenger Boarding (PRM Priority, Carry-on & PPBM)',
      detailJa: 'WCHC/WCHS/WCHR優先案内、ゲート預け切り替え時は予備リチウム電池を必ず取り出し確認', detailVi: 'Hỗ trợ khách xe lăn lên trước; nếu chuyển vali xuống hầm tại gate bắt buộc lấy sạc dự phòng/pin lithium ra', detailEn: 'Board PRM first; remove all spare lithium batteries/power banks before gate-checking any carry-on bag' },
    { id: 'pushback', duration: 4, req: ['gpu', 'fuel', 'lav', 'water', 'load', 'board'], outdoor: true,
      ja: '全ドア閉鎖・GSE退避・バイパスピン確認・プッシュバック', vi: 'Đóng cửa, rút GSE khỏi ERA, rút Bypass Pin & Pushback', en: 'Doors Closed, ERA Clear, Bypass Pin & Pushback',
      detailJa: '全扉閉鎖・PBB/GSEがERA外へ完全退避・ウォークアラウンド・バイパスピン抜去左前方提示・お見送り', detailVi: 'Đóng kín cửa, rút hết GSE ra ngoài vạch đỏ ERA, kiểm tra vòng cuối, đẩy lùi, giơ cờ Bypass Pin bên trái & vẫy chào', detailEn: 'Verify all doors closed, GSE clear of ERA, walkaround complete, pushback, show bypass pin on left & wave off' }
  ];

  // Các sự kiện ngẫu nhiên trong Turnaround
  export const TA_EVENTS = [
    {
      id: 'weather',
      titleJa: '雷接近・強風警報（ランプ作業一時中断指示）',
      titleVi: 'Cảnh báo sét & gió mạnh — Yêu cầu tạm dừng sân đỗ (Ramp Closure)',
      descJa: '空港周辺で落雷および強風警報が発令されました。給油・貨物搭載など屋外ランプ作業が危険な状態です。どう対応しますか？',
      descVi: 'Phát hiện sét gần sân bay và gió giật mạnh. Mọi hoạt động ngoài sân đỗ (tra dầu, bốc xếp) đang cực kỳ nguy hiểm. Bạn xử lý thế nào?',
      options: [
        { ok: true, timeDelta: 5, safetyDelta: 0, procDelta: 0,
          ja: '直ちに給油・屋外ランプ作業を中断し、作業員を屋内へ退避（解除後に再開）',
          vi: 'Tạm dừng ngay lập tức tra dầu & thao tác ngoài trời, sơ tán nhân viên vào nơi an toàn (+5 phút chờ tạnh)' },
        { ok: false, timeDelta: 0, safetyDelta: -18, procDelta: -5,
          ja: '定時出発を優先し、小雨のうちに給油と積み込みを続行する',
          vi: 'Ưu tiên đúng giờ, cố tiếp tục tra dầu và xếp hàng trước khi mưa lớn' }
      ],
      reasonJa: '雷警報発令中のランプ作業・給油続行は感電・引火の重大リスクがあり、定時性より人命安全が絶対優先です。',
      reasonVi: 'Tuyệt đối không làm việc ngoài trời hay tra dầu khi có cảnh báo sét. An toàn tính mạng luôn đặt trên chỉ tiêu đúng giờ.'
    },
    {
      id: 'defect',
      titleJa: '機材不具合発見（後部貨物室ドア付近の軽微な凹み・油漏れ疑い）',
      titleVi: 'Phát hiện lỗi kỹ thuật (Vết móp cửa hầm hàng / nghi rò rỉ dầu thủy lực)',
      descJa: '搭載作業員が後部貨物室フレーム付近に傷と液体のにじみを発見しました。',
      descVi: 'Nhân viên bốc xếp phát hiện vết xước móp gần khung cửa hầm hàng sau kèm vệt chất lỏng nghi dầu.',
      options: [
        { ok: true, timeDelta: 4, safetyDelta: 0, procDelta: 0,
          ja: '作業を一時停止し、直ちに整備士（Maintenance）へ報告して耐空性点検を依頼',
          vi: 'Dừng thao tác khu vực đó và báo ngay cho Kỹ thuật viên bảo dưỡng (整備士) kiểm tra xác nhận (+4 phút)' },
        { ok: false, timeDelta: 0, safetyDelta: -20, procDelta: -10,
          ja: '軽微に見えるため拭き取って報告せず、そのままドアを閉めて出発させる',
          vi: 'Thấy vết nhỏ nên lau sạch, không báo cáo để khỏi trễ chuyến' }
      ],
      reasonJa: '機体損傷や油漏れの隠蔽・未報告は重大航空事故に直結します。疑わしい事象は必ず整備部門へ報告します。',
      reasonVi: 'Che giấu hư hỏng thân vỏ hay rò rỉ kỹ thuật có thể dẫn đến tai nạn nghiêm trọng. Mọi bất thường bắt buộc phải báo Maintenance.'
    },
    {
      id: 'late_cargo',
      titleJa: '遅着乗継手荷物・緊急貨物（120kg）が締切直前に到着',
      titleVi: 'Hành lý nối chuyến / Hàng khẩn (120 kg) đến sát giờ đóng hầm',
      descJa: '他便からの遅着乗継手荷物120kgが到着しました。すでにLoad Sheet暫定版が出ています。',
      descVi: '120 kg hành lý nối chuyến từ chuyến bay trễ vừa tới sân đỗ khi Load Sheet tạm đã phát hành.',
      options: [
        { ok: true, timeDelta: 3, safetyDelta: 0, procDelta: 0,
          ja: 'ロードコントロールへ連絡し、LMC（直前変更）と制限重量・CGを確認した上で搭載可否を決定',
          vi: 'Báo Load Control kiểm tra giới hạn tải/CG và lập LMC (Last Minute Change) trước khi xếp lên hầm (+3 phút)' },
        { ok: false, timeDelta: 0, safetyDelta: -15, procDelta: -12,
          ja: '時間が惜しいためロードマスターに報告せずバルク室へそのまま積み込む',
          vi: 'Gấp quá nên cứ chất đại lên hầm Bulk mà không báo Load Control' }
      ],
      reasonJa: '無報告搭載は重量重心計算（Load Sheet）の誤差を生み、離陸性能やCG制限逸脱を引き起こす重大違反です。',
      reasonVi: 'Xếp tải không khai báo làm sai lệch Load Sheet và trọng tâm máy bay (CG) — vi phạm an toàn bay nghiêm trọng.'
    },
    {
      id: 'staff',
      titleJa: '人員不足発生（隣接スポット遅延により応援要員が遅れ）',
      titleVi: 'Thiếu nhân lực đột xuất (Nhân sự hỗ trợ bị kẹt ở bãi đỗ kế bên)',
      descJa: '搭載チームが2名不足しています。安全手順を守りながら遅延を最小化する対応は？',
      descVi: 'Đội bốc xếp thiếu 2 người do chuyến kế bên trễ. Cách xử lý tối ưu vừa đảm bảo an toàn vừa giảm trễ là gì?',
      options: [
        { ok: true, timeDelta: 3, safetyDelta: 0, procDelta: 0,
          ja: 'スーパーバイザーへ応援要請し、クリティカルパス（降機・清掃・搭載）を優先しつつ安全確認は省略しない',
          vi: 'Báo Supervisor điều phối hỗ trợ, ưu tiên đường găng (dỡ/vệ sinh/xếp) và KHÔNG cắt bỏ bước kiểm tra an toàn (+3 phút)' },
        { ok: false, timeDelta: 0, safetyDelta: -14, procDelta: -10,
          ja: '時間短縮のため安全監視員（ガイドマン）や指差呼称を省いて一人で車両を後退させる',
          vi: 'Bỏ người xi-nhan (guideman) và bỏ bước 指差呼称 để lùi xe GSE nhanh hơn' }
      ],
      reasonJa: '人員不足時こそ車両接触事故が多発します。ガイドマン配置や指差呼称などの安全基本動作は絶対に省略できません。',
      reasonVi: 'Thiếu người là lúc dễ xảy ra va chạm xe GSE vào tàu bay nhất. Tuyệt đối không được cắt bỏ người xi-nhan hay bước 指差呼称.'
    },
    {
      id: 'delay_arr',
      titleJa: '到着遅延（機材繰りにより5分遅れでオンブロック）',
      titleVi: 'Tàu bay đến trễ 5 phút (Arrival Delay)',
      descJa: '到着が5分遅れ、定時出発までの余裕が圧迫されています。どう進めますか？',
      descVi: 'Chuyến bay vào bãi trễ 5 phút, quỹ thời gian turnaround bị thu hẹp. Bạn điều phối ra sao?',
      options: [
        { ok: true, timeDelta: 4, safetyDelta: 0, procDelta: 0,
          ja: '安全条件を満たす並行作業（降機取卸し・給油・ラバトリー等）を効率化し、関係部門へ見込み出発時刻を共有',
          vi: 'Tối ưu làm song song các công việc hợp lệ (dỡ hàng, tra dầu, vệ sinh) đúng chuẩn an toàn và báo sớm giờ ETD mới' },
        { ok: false, timeDelta: 1, safetyDelta: -15, procDelta: -10,
          ja: '輪止め設置とエンジン完全停止を待たずに車両を接近させ作業を開始する',
          vi: 'Cho xe GSE lao vào tiếp cận trước khi chèn bánh và tắt đèn beacon để tiết kiệm thời gian' }
      ],
      reasonJa: 'エンジン稼働中・衝突防止灯点灯中の接近は吸込・ブラストによる死亡事故リスクがあり厳禁です。',
      reasonVi: 'Tiếp cận tàu bay khi đèn beacon còn sáng / động cơ chưa tắt hoàn toàn là lỗi cực kỳ nguy hiểm (rủi ro hút vào động cơ / luồng phản lực).'
    }
  ];

export const PAX_SCENARIOS = [
    {
      id: 'P1',
      titleJa: 'ケース1: オーバーブッキング（座席超過）発生',
      titleVi: 'Case 1: Overbooking (Bán vé vượt số ghế thực tế)',
      descJa: '羽田発便が満席で2名分の座席が不足しています。地上係員として最初に取るべき適切な対応は？',
      descVi: 'Chuyến khởi hành từ Haneda bị dư 2 khách so với số ghế thực tế. Nhân viên mặt đất nên xử lý bước đầu thế nào?',
      options: [
        { ok: true, ja: '搭乗口でフレキシブル・トラベラー（協力金・振替便提供のボランティア）を募集し、丁寧にお詫びと代替便手配を行う', vi: 'Thông báo tìm hành khách tình nguyện đổi chuyến (Volunteer) kèm bồi thường + chuyển chuyến thay thế và xin lỗi trang trọng' },
        { ok: false, ja: '一番最後にチェックインした乗客を事前説明なしで強制降機させる', vi: 'Tự ý từ chối khách check-in cuối cùng mà không kêu gọi tình nguyện viên trước' },
        { ok: false, ja: '補助席（ジャンプシート）に一般旅客を座らせて出発する', vi: 'Cho hành khách thường ngồi tạm ghế jumpseat của tiếp viên' },
        { ok: false, ja: '出発直前まで告知せず搭乗口を閉鎖する', vi: 'Im lặng tới sát giờ rồi đóng cửa boarding gate' }
      ],
      expJa: '日本の航空実務ではまず協力者（ボランティア）を募り、協力金・代替便・宿泊等の補償案内を行うのが原則です。',
      expVi: 'Theo thông lệ hàng không Nhật Bản & quốc tế, luôn kêu gọi tình nguyện viên (Flex Traveler) kèm bồi thường/đổi chuyến trước khi áp dụng từ chối vận chuyển bắt buộc.'
    },
    {
      id: 'P2',
      titleJa: 'ケース2: 国際線チェックイン時のパスポート紛失',
      titleVi: 'Case 2: Hành khách làm mất hộ chiếu tại quầy check-in quốc tế',
      descJa: '成田発国際線のお客様が「空港内でパスポートを落とした、写真コピーならスマホにある」と申し出ました。',
      descVi: 'Hành khách chuyến quốc tế tại Narita báo rơi hộ chiếu trong sân bay và chỉ có ảnh chụp hộ chiếu trên điện thoại.',
      options: [
        { ok: true, ja: '原本なしでは搭乗不可であることを丁寧に説明し、空港遺失物センター・警察届出・予約変更・手荷物返却を案内する', vi: 'Giải thích lịch sự rằng ảnh chụp không thể xuất cảnh, hỗ trợ báo trung tâm thất lạc/cảnh sát sân bay, đổi vé & trả hành lý nếu đã gửi' },
        { ok: false, ja: 'スマホの鮮明な画像があれば搭乗券を発券して出国審査へ案内する', vi: 'Ảnh chụp rõ nét nên vẫn cấp thẻ lên tàu cho khách đi qua hải quan' },
        { ok: false, ja: '誓約書を書かせて搭乗させる', vi: 'Cho khách viết giấy cam kết rồi cho lên máy bay' },
        { ok: false, ja: '手荷物だけ先に目的地へ送る', vi: 'Vẫn gửi hành lý ký gửi đi trước cho nhẹ' }
      ],
      expJa: '国際線は有効なパスポート原本が必須です。また旅客が搭乗しない手荷物を単独搭載すること（PPBM違反）は航空保安上厳禁です。',
      expVi: 'Bay quốc tế bắt buộc có hộ chiếu gốc hợp lệ. Đặc biệt cấm gửi hành lý khi hành khách không lên máy bay (vi phạm nguyên tắc an ninh PPBM).'
    },
    {
      id: 'P3',
      titleJa: 'ケース3: 預け入れ手荷物が1個36kg（単体重量上限超過）',
      titleVi: 'Case 3: Một kiện hành lý ký gửi nặng 36 kg (Vượt ngưỡng đơn kiện 32 kg)',
      descJa: 'お客様が大型スーツケース1個（36kg）を預けたいと希望。超過料金を払うからこのまま預けてほしいと言っています。',
      descVi: 'Hành khách mang 1 vali nặng 36 kg và sẵn sàng đóng phí quá cân để gửi nguyên kiện.',
      options: [
        { ok: true, ja: '地上作業員の労働安全および航空会社規定（単体最大32kg）を説明し、2個に分割していただくか航空貨物扱いをご案内する', vi: 'Giải thích quy định an toàn lao động tối đa 32 kg/kiện, đề nghị chia sang 2 kiện nhỏ hơn hoặc chuyển gửi theo đường hàng hóa (Cargo)' },
        { ok: false, ja: '超過料金を徴収すれば何キロでもHEAVYタグを貼って受託する', vi: 'Chỉ cần thu đủ phí quá cân và dán nhãn HEAVY là nhận không giới hạn' },
        { ok: false, ja: '計量器の表示を32kgと手入力で修正して通す', vi: 'Nhập tay 32 kg lên hệ thống cho xong thủ tục' },
        { ok: false, ja: 'そのまま機内持込手荷物にしてもらう', vi: 'Bảo khách xách tay luôn lên cabin' }
      ],
      expJa: '多くの航空会社・労働安全基準では1個あたり最大32kgが上限です。重量虚偽入力はW&B計算の誤差を招き絶対厳禁です。',
      expVi: 'Quy chuẩn an toàn sân đỗ giới hạn tối đa 32 kg/kiện để tránh chấn thương nhân viên bốc xếp. Tuyệt đối không khai sai trọng lượng vì làm sai lệch W&B.'
    },
    {
      id: 'P4',
      titleJa: 'ケース4: 搭乗口での機内持込サイズ超過（ゲートチェック）',
      titleVi: 'Case 4: Hành lý xách tay quá kích thước tại cửa lên tàu (Gate Check)',
      descJa: '搭乗口で規格外キャリーケースを貨物室預け（ゲートチェック）に切り替える際、必ず確認すべき最重要事項は？',
      descVi: 'Khi phải chuyển vali xách tay quá khổ xuống hầm hàng ngay tại cửa lên tàu (gate-check), điều quan trọng nhất phải kiểm tra là gì?',
      options: [
        { ok: true, ja: 'モバイルバッテリー・予備リチウム電池・電子タバコ・貴重品・常備薬を必ず取り出して機内へお持ちいただく', vi: 'Bắt buộc yêu cầu khách lấy ra toàn bộ pin dự phòng/pin lithium rời, thuốc lá điện tử, giấy tờ & đồ quý giá mang lên cabin' },
        { ok: false, ja: 'タグだけ貼ってそのまま素早く貨物室へ運ぶ', vi: 'Dán thẻ ngay và chuyển thẳng xuống hầm hàng cho kịp giờ' },
        { ok: false, ja: '電源が切れていればモバイルバッテリーは入れたままでよい', vi: 'Pin dự phòng tắt nguồn rồi thì để nguyên trong vali ký gửi được' },
        { ok: false, ja: 'お客様に自分で貨物室ベルトまで運んでもらう', vi: 'Nhờ khách tự mang xuống băng chuyền sân đỗ' }
      ],
      expJa: '予備リチウムイオン電池（モバイルバッテリー）は発火リスクのため貨物室への預け入れが法令・IATA規定で禁止されています。',
      expVi: 'Pin lithium rời / sạc dự phòng bị CẤM tuyệt đối trong hành lý ký gửi do nguy cơ cháy nhiệt trong hầm hàng không thể dập trực tiếp.'
    },
    {
      id: 'P5',
      titleJa: 'ケース5: 電動車椅子（WCHC）旅客とタイトな乗継',
      titleVi: 'Case 5: Hành khách xe lăn điện (WCHC) & Nối chuyến thời gian sát',
      descJa: '歩行困難で電動車椅子を使用されるお客様（WCHC）がチェックイン。乗継時間も短めです。適切な対応は？',
      descVi: 'Hành khách không tự đi lại được dùng xe lăn điện (WCHC) làm thủ tục và có chuyến nối tiếp khá sát giờ. Cần làm gì?',
      options: [
        { ok: true, ja: 'バッテリー種別（乾式/湿式/リチウム）と短絡防止措置を確認し、非常口以外の適切な座席指定・搭乗口/乗継先への事前連携を行う', vi: 'Kiểm tra loại ắc quy/pin & ngắt cực chống đoản mạch, xếp ghế phù hợp (KHÔNG phải hàng thoát hiểm), thông báo trước cho cửa khởi hành & điểm nối chuyến' },
        { ok: false, ja: '足元が広いため非常口座席（Exit Row）を割り当てる', vi: 'Xếp khách vào hàng ghế thoát hiểm (Exit Row) vì chỗ để chân rộng' },
        { ok: false, ja: '電動車椅子はそのままバッテリー点検なしで貨物室に載せる', vi: 'Cứ đưa xe lăn điện xuống hầm hàng mà không cần kiểm tra pin' },
        { ok: false, ja: '乗継先への連絡はお客様自身に行ってもらう', vi: 'Để khách tự liên hệ nhân viên ở sân bay nối chuyến' }
      ],
      expJa: '非常口座席は緊急脱出援助ができる旅客限定です。電動車椅子は危険物規定に基づきバッテリー確認・絶縁処理、WCHCは事前連携と優先搭乗が必須です。',
      expVi: 'Hàng ghế thoát hiểm cấm xếp hành khách PRM/xe lăn. Xe lăn điện phải kiểm tra pin & cách điện theo quy định DGR, đồng thời phối hợp sớm với cổng nối chuyến.'
    }
  ];

export const ULD_CATALOG = [
    {
      code: 'AKE (LD-3)',
      type: 'container',
      dimsCm: '156 × 153 × 163 cm (上幅 200 cm)',
      dimsIn: '61.5 × 60.4 × 64 in (Top 79 in)',
      volM3: 4.4,
      tare: 71,
      maxGross: 1587,
      ac: 'B777 / B787 / B767 / A350 / A380',
      noteJa: '最も標準的なロアデッキ・ハーフサイズコンテナ（下部片側斜めカット）。フォークリフト用穴付きAKNは自重120kg。',
      noteVi: 'Container nửa khoang bụng phổ biến nhất cho tàu thân rộng (vát chéo 1 góc đáy). Bản có lỗ càng nâng AKN nặng 120 kg.',
      noteEn: 'Standard widebody lower-deck half-width LD-3 container with outboard lower bevel (forkliftable AKN tare: 120 kg).'
    },
    {
      code: 'AKH (LD-3-46 / LD3-45W)',
      type: 'container',
      dimsCm: '156 × 153 × 114 cm (上幅 241 cm)',
      dimsIn: '61.5 × 60.4 × 45 in (Top 95 in)',
      volM3: 3.3,
      tare: 95,
      maxGross: 1134,
      ac: 'A320 (Max 7) / A321 (Max 10) / B777 / B787 / B767※',
      noteJa: 'A320・A321対応の低床両側カットコンテナ（高さ114cm、最大総重量1,134kg＝2,500lbs）。※B767搭載時は機内固縛が必要。',
      noteVi: 'Container thấp 114 cm vát hai bên chuyên dụng cho dòng A320/A321 (Max Gross 1.134 kg / 2.500 lbs; xếp lên B767 cần chằng buộc).',
      noteEn: 'Low-profile 114 cm (45 in) bilateral-bevel container for A320/A321 narrowbodies (Max Gross 1,134 kg / 2,500 lbs).'
    },
    {
      code: 'DQP (LD-4)',
      type: 'container',
      dimsCm: '244 × 153 × 163 cm',
      dimsIn: '96 × 60.4 × 64 in',
      volM3: 5.5,
      tare: 120,
      maxGross: 2449,
      ac: 'B777 / B767 / B787 (横積み2,449kg・縦積み1,587kg)',
      noteJa: '長方形フル幅ロアデッキコンテナ（A350搭載不可）。長尺物の収納に適する。',
      noteVi: 'Container chữ nhật toàn chiều ngang hầm dưới (244×153×163 cm, Max 2.449 kg; không xếp trên A350).',
      noteEn: 'Full-width rectangular LD-4 lower-deck container (96×60.4×64 in, Max Gross 2,449 kg; not compatible with A350).'
    },
    {
      code: 'AMF (LD-36)',
      type: 'container',
      dimsCm: '318 × 244 × 163 cm (上幅 396 cm)',
      dimsIn: '125 × 96 × 64 in (Top 156 in)',
      volM3: 12.5,
      tare: 280,
      maxGross: 5102,
      ac: 'B777 / B787 / B767ER / A350',
      noteJa: '大型ロアデッキ・フルサイズコンテナ（両端スロープ形状、最大5,102kg）。',
      noteVi: 'Container cỡ lớn khoang bụng thân rộng vát hai đầu (12,5 m³, Max Gross 5.102 kg).',
      noteEn: 'Large lower-deck full-span contoured container (12.5 m³, Max Gross 5,102 kg / 11,250 lbs).'
    },
    {
      code: 'RKN (LD-3 保冷・定温)',
      type: 'container',
      dimsCm: '156 × 153 × 163 cm',
      dimsIn: '61.5 × 60.4 × 64 in',
      volM3: 2.9,
      tare: 265,
      maxGross: 1587,
      ac: 'B777 / B787 / B767 / A350',
      noteJa: 'ドライアイス＋バッテリー温度制御コンテナ（-20℃〜+20℃）。医薬品・半導体・生鮮品向け（大型版はRAP：最大5,102kg）。',
      noteVi: 'Container kiểm soát nhiệt độ (-20°C đến +20°C) dùng đá khô & ắc quy cho dược phẩm, bán dẫn (bản lớn là RAP).',
      noteEn: 'Active temperature-controlled LD-3 container (-20°C to +20°C) for pharma & perishables (large pallet-sized version: RAP).'
    },
    {
      code: 'PMC (96-inch Pallet)',
      type: 'pallet',
      dimsCm: '318 × 244 cm（内寸 302 × 228 cm・LD高163 / MD高244 cm）',
      dimsIn: '125 × 96 in (Lower 64 in / Main 96 in)',
      volM3: 11.2,
      tare: 110,
      maxGross: 5102,
      maxGrossMain: 6803,
      ac: 'Lower: B777/B787/B767ER/A350 (5,102kg) · Main: B767F/B777F (6,803kg)',
      noteJa: '最も汎用的な96×125インチ大型アルミパレット。ロアデッキ最大5,102kg（11,250lbs）、貨物機メインデッキ最大6,803kg（15,000lbs）。',
      noteVi: 'Mâm Pallet 96×125 inch chủ lực nhất: hầm dưới tối đa 5.102 kg (cao 163 cm), khoang chính tàu hàng tối đa 6.803 kg (cao 244 cm).',
      noteEn: 'Primary 96×125 in aircraft pallet: Lower Deck max 5,102 kg (H 163 cm beveled), Freighter Main Deck max 6,803 kg (H 244 cm).'
    },
    {
      code: 'PAG / PAJ (88-inch Pallet)',
      type: 'pallet',
      dimsCm: '318 × 224 cm（内寸 302 × 208 cm・高163 cm）',
      dimsIn: '125 × 88 in (H 64 in)',
      volM3: 10.3,
      tare: 100,
      maxGross: 4676,
      maxGrossMain: 6803,
      ac: 'B777 / B787 (4,676kg) · B767ER (5,102kg) · Freighter MD (6,803kg)',
      noteJa: '標準88×125インチパレット（自重100kg、B777/B787ロアデッキ最大4,676kg）。ネット掛け・補強板を併用。',
      noteVi: 'Mâm Pallet tiêu chuẩn 88×125 inch (nặng 100 kg, hầm dưới B777/B787 tối đa 4.676 kg).',
      noteEn: 'Standard 88×125 in pallet (Tare 100 kg, B777/B787 Lower Deck max 4,676 kg / 10,310 lbs).'
    },
    {
      code: 'PLA (Half Pallet)',
      type: 'pallet',
      dimsCm: '318 × 153 × 163 cm（内寸 300 × 139 cm）',
      dimsIn: '125 × 60.4 × 64 in',
      volM3: 6.8,
      tare: 100,
      maxGross: 3175,
      ac: 'B787 / A380 (3,175kg) · B777 (2,449kg)',
      noteJa: 'ハーフ幅（60.4×125インチ）パレット。LD-3区画を横断して長尺・中重量物を搭載可能（最大3,175kg / B777は2,449kg）。',
      noteVi: 'Mâm Pallet nửa bề rộng (153×318 cm, Tare 100 kg), tối đa 3.175 kg trên B787/A380 (2.449 kg trên B777).',
      noteEn: 'Half-width 60.4×125 in lower-deck pallet (Tare 100 kg; Max Gross 3,175 kg on B787/A380, 2,449 kg on B777).'
    },
    {
      code: 'PRA (16-ft Pallet)',
      type: 'pallet',
      dimsCm: '498 × 244 × 244 cm（内寸 481 × 228 cm）',
      dimsIn: '196 × 96 × 96 in (16 ft)',
      volM3: 26.8,
      tare: 469,
      maxGross: 11339,
      ac: 'Freighter Main Deck: B777F (11,339kg) / B767F (10,437kg)',
      noteJa: '貨物専用機メインデッキ用16フィート大型パレット（長尺機械・パイプ・大型装置向け）。',
      noteVi: 'Mâm Pallet 16-ft chuyên dụng khoang chính tàu chở hàng (498×244×244 cm, Max Gross 11.339 kg trên B777F).',
      noteEn: '16-ft freighter main-deck pallet (196×96×96 in, Tare 469 kg, Max Gross 11,339 kg on B777F).'
    },
    {
      code: 'PGA (20-ft Main Deck Pallet)',
      type: 'pallet',
      dimsCm: '606 × 244 × 299 cm（内寸 580 × 228 cm・上部テーパー）',
      dimsIn: '238.5 × 96 × 118 in (20 ft)',
      volM3: 33.5,
      tare: 500,
      maxGross: 11339,
      ac: 'Freighter Main Deck: B777F / B747F (最大 11,339 kg = 25,000 lbs)',
      noteJa: '超大型20フィート（606×244cm）パレット。高さ195cmから上部胴体曲面に沿って299cmまで絞るコンター制限厳守！',
      noteVi: 'Siêu Pallet 20-ft (606×244 cm, Tare 500 kg, Max 11.339 kg) khoang chính tàu hàng; từ cao 195 cm phải thu vát theo vòm trần tới 299 cm.',
      noteEn: '20-ft heavy main-deck pallet (606×244 cm, Tare 500 kg, Max 11,339 kg); upper fuselage contour tapers from 195 cm to 299 cm.'
    },
    {
      code: '防水パン / ツナパン / バイクスキッド',
      type: 'special',
      dimsCm: 'LD3防水パン 135×127×38cm (25kg) · ツナパン 184×149×65cm (150kg)',
      dimsIn: 'Waterproof Pan / Tuna Pan / Motorbike Skid (220×74cm)',
      volM3: 1.8,
      tare: 150,
      maxGross: 1587,
      ac: 'Wet Cargo (WET) / Fresh Tuna / Motorcycles',
      noteJa: '機体腐食を防ぐ塩水・水漏れ防止パン（防水パン・ツナパン）および二輪車固定用バイクスキッド（180kg）。',
      noteVi: 'Khay chống thấm (防水パン), khay cá ngừ tươi (ツナパン, 150kg) ngăn nước muối ăn mòn khung tàu & khung cố định mô-tô (180kg).',
      noteEn: 'Leak-proof Waterproof Pans, Tuna Pans (prevents salt-water fuselage corrosion), and Motorbike Skids (180 kg).'
    }
  ];

  export const EXPORT_STEPS = [
    { ja: '1. 貨物搬入・受託点検（Acceptance & Care Marks）', vi: '1. Tiếp nhận & Kiểm tra kiện hàng xuất (Acceptance)', en: '1. Cargo Acceptance & Care Mark Check',
      descJa: 'AWB（8桁目Mod-7）・個数・実重量/容積重量・外装ダメージ・ケアマーク（天地無用/取扱注意/水濡れ厳禁）・危険物有無を確認', descVi: 'Kiểm tra AWB (Mod-7), số kiện, cân nặng/thể tích, tình trạng bao bì, nhãn Care Marks và sàng lọc hàng nguy hiểm', descEn: 'Verify AWB (Mod-7 check digit), piece count, gross/volume weight, packaging integrity, care marks & hidden DG' },
    { ja: '2. 保安検査・爆発物検査（Security Screening）', vi: '2. Kiểm tra an ninh soi chiếu (Security Screening)', en: '2. Aviation Security Screening (X-Ray / ETD)',
      descJa: 'X線検査・爆発物痕跡検知（ETD）等で未申告危険物（ガス缶・予備リチウム電池等）や不審物を排除', descVi: 'Soi chiếu X-ray, quét vết nổ ETD phát hiện hàng nguy hiểm ẩn (bình gas, pin lithium rời) và vật cấm', descEn: 'Screen via X-ray and ETD to intercept undeclared dangerous goods (gas canisters, loose lithium batteries) & threats' },
    { ja: '3. 輸出通関・保税管理（NACCS Export Customs）', vi: '3. Thông quan xuất khẩu điện tử (NACCS)', en: '3. Export Customs Clearance (NACCS)',
      descJa: '保税蔵置場へ搬入し、NACCS申告・税関審査/検査を経て輸出許可書を取得（国際乗継は仮陸揚げ・保税運送）', descVi: 'Đưa vào kho ngoại quan, khai báo NACCS và nhận giấy phép xuất khẩu (hàng quá cảnh làm thủ tục 仮陸揚げ / 保税運送)', descEn: 'Process in bonded warehouse via Japan NACCS customs system to obtain export permit (or bonded transit for connections)' },
    { ja: '4. ULDビルドアップ（手積み / フォークリフト・コンター確認）', vi: '4. Đóng hàng ULD Buildup (Xếp tay / Forklift & Contour)', en: '4. ULD Build-up (Hand / Forklift, Shoring & Contour)',
      descJa: '重下軽上・2梱包またぎ積み（荷崩れ防止）、重量物はパレット/スキッド＋補強板（スプレッダー）で床面荷重分散、防水シート・タイダウン・ネット掛け・コンターゲージ確認', descVi: 'Nặng dưới nhẹ trên, xếp gối chồng lên 2 kiện chống đổ; hàng nặng kê Pallet/Skid + ván 補強板 phân tải sàn, phủ bạt chống nước, chằng dây/lưới & đo khung Contour', descEn: 'Heavy-bottom/light-top, interlocking brick stack across 2 boxes, pallet/skid + spreader planks for heavy cargo, waterproof sheet, tie-down/net & contour check' },
    { ja: '5. 計量・LIR照合・ランプ搬送・機体ロック固定', vi: '5. Cân ULD, đối chiếu LIR & Xếp khóa lên tàu bay', en: '5. ULD Weighing, LIR Match & Aircraft Lock-in',
      descJa: 'ULDタグ記載重量・偏荷重なきことを確認し、ドーリー牽引（15km/h以下）→ハイリフトローダー搭載→クローズ・アンド・ロック確認', descVi: 'Gắn thẻ ULD, kiểm tra không lệch tâm, kéo dolly (≤15 km/h), nâng bằng High-Lift Loader và khóa chặt chốt sàn (Close & Lock)', descEn: 'Verify ULD tag weight & balanced CG, tow via dolly (≤15 km/h), load with High-Lift Loader & engage all floor locks' }
  ];

  export const IMPORT_STEPS = [
    { ja: '1. 取卸し・保税上屋搬入（Offloading & Bonded Transfer）', vi: '1. Dỡ ULD & Đưa vào kho ngoại quan (保税蔵置場)', en: '1. Offloading & Bonded Warehouse Transfer',
      descJa: '到着機からULD取卸し、外装ダメージ・濡れ・封印異常を確認して保税蔵置場へ搬入（乗継便は機移し SHIP TO SHIP）', descVi: 'Dỡ ULD từ tàu đến, kiểm tra hư hỏng/ướt/niêm phong và chuyển vào kho ngoại quan (hàng nối chuyến chuyển tàu SHIP TO SHIP)', descEn: 'Offload ULDs, inspect for damage/wetness/seal integrity, and transfer to bonded warehouse (or Ship-to-Ship transfer)' },
    { ja: '2. ブレイクダウン・貨物照合（ULD Breakdown）', vi: '2. Dỡ hàng khỏi ULD & Kiểm đếm (Breakdown)', en: '2. ULD Breakdown & Irregularity Check',
      descJa: 'ネット・ビニールの順序で丁寧に解体し、AWB単位で仕分け。過不足・破損（ダメージレポート）を即時記録（バール直接床使用厳禁）', descVi: 'Tháo lưới/bạt cẩn thận, phân loại theo AWB, lập biên bản bất thường nếu thiếu/vỡ (cấm dùng xà beng nậy trực tiếp xuống sàn)', descEn: 'Remove nets/sheeting carefully, sort by AWB, log any damage/shortage immediately (never pry directly against floor with crowbar)' },
    { ja: '3. 到着案内（Arrival Notice）', vi: '3. Thông báo hàng đến (Arrival Notice)', en: '3. Consignee / Forwarder Arrival Notice',
      descJa: '荷受人・通関業者（フォワーダー）へ貨物到着とAWB関係書類を通知し、生鮮・保冷品は定温庫へ格納', descVi: 'Thông báo cho người nhận/forwarder kèm chứng từ AWB; đưa ngay hàng tươi sống/dược phẩm vào kho lạnh', descEn: 'Notify consignee/customs broker of arrival documents and store perishables/pharma in temperature-controlled rooms' },
    { ja: '4. 検疫・輸入通関（Quarantine & NACCS Import）', vi: '4. Kiểm dịch & Thông quan nhập khẩu (NACCS)', en: '4. Quarantine & Import Customs Clearance (NACCS)',
      descJa: '動植物検疫・食品検査（必要な場合）およびNACCS輸入申告・関税納付を経て輸入許可書を取得', descVi: 'Kiểm dịch động thực vật/thực phẩm (nếu có), khai NACCS, nộp thuế và nhận giấy phép thông quan nhập khẩu', descEn: 'Complete animal/plant/food quarantine where applicable, file NACCS import declaration, pay duties & obtain import permit' },
    { ja: '5. 貨物引渡し（Delivery & Release）', vi: '5. Bàn giao hàng nhập (Delivery)', en: '5. Cargo Release & Delivery',
      descJa: '輸入許可書・荷渡指図書（D/O）・本人確認書類・個数を指差呼称で照合し、受領サインを得て引き渡す', descVi: 'Đối chiếu giấy phép nhập khẩu, lệnh giao hàng (D/O), giấy tờ tùy thân và số kiện bằng 指差呼称 trước khi ký giao', descEn: 'Verify import permit, Delivery Order (D/O), ID & piece count via Point-and-Call before obtaining release signature' }
  ];

  export const DGR_CASES = [
    {
      id: 'D1',
      labelType: 'class9_li',
      titleJa: 'DGR-1: リチウムイオン電池組込機器（UN3481 / Section II）',
      titleVi: 'DGR-1: Pin Lithium-ion đóng kèm thiết bị (UN3481 / Section II)',
      descJa: 'ノートPC 5台（1梱包あたり電池100Wh以下）。外装に「リチウム電池マーク（UN3481）」が明瞭に貼付され、損傷なし。旅客便への受託は？',
      descVi: '5 laptop (pin ≤100Wh/pin), kiện nguyên vẹn, dán rõ nhãn Lithium Battery Mark (UN3481). Có chấp nhận lên chuyến chở khách không?',
      options: [
        { ok: true, ja: '受託可（ACCEPT）— Section II基準およびリチウム電池マーク・梱包健全性を満たす', vi: 'CHẤP NHẬN (ACCEPT) — Đạt tiêu chuẩn Section II, nhãn UN3481 rõ ràng, bao bì nguyên vẹn' },
        { ok: false, ja: '受託不可（REJECT）— リチウム電池はすべて貨物専用機（CAO）のみ', vi: 'TỪ CHỐI (REJECT) — Mọi pin lithium đều cấm lên máy bay chở khách' }
      ],
      expJa: 'UN3481（機器同梱/組込）でSection II基準を満たし適切に表示・梱包されていれば、旅客機へ受託可能です（UN3480単体電池は旅客機禁止）。',
      expVi: 'UN3481 (pin kèm/trong thiết bị) đạt chuẩn Section II được phép đi máy bay chở khách. Ngược lại, pin rời UN3480 bị cấm trên máy bay chở khách.'
    },
    {
      id: 'D2',
      labelType: 'class9_dryice',
      titleJa: 'DGR-2: ドライアイス（UN1845 / Class 9）保冷貨物',
      titleVi: 'DGR-2: Đá khô bảo quản lạnh (UN1845 / Class 9)',
      descJa: '生鮮食品の保冷用ドライアイス（正味3.0kg）。ガス抜き可能な発泡箱、Class 9ラベル＋UN1845＋正味重量(3.0kg)記載あり。危険物申告書（DGD）は無い。',
      descVi: 'Đá khô làm lạnh thực phẩm (3.0 kg net), thùng xốp thoát khí tốt, có nhãn Class 9 + UN1845 + ghi 3.0 kg net, KHÔNG kèm tờ khai DGD.',
      options: [
        { ok: true, ja: '受託可（ACCEPT）— 非危険物の保冷用ドライアイスはAWB記載・Class 9表示・正味重量表示があればDGD不要', vi: 'CHẤP NHẬN (ACCEPT) — Đá khô dùng làm lạnh hàng thường không cần DGD nếu đã có nhãn Class 9, UN1845, ghi net weight & khai trên AWB' },
        { ok: false, ja: '受託不可（REJECT）— 密閉容器に入れ替えさせないと受託できない', vi: 'TỪ CHỐI (REJECT) — Phải yêu cầu đóng kín khí hoàn toàn mới nhận' }
      ],
      expJa: 'ドライアイスは昇華してCO2ガスを発生するため、密閉容器は破裂の危険があり厳禁です。換気可能容器＋正味重量表示＋NOTOC確認が重要です。',
      expVi: 'Đá khô thăng hoa sinh khí CO2 nên CẤM đóng kín khí (nguy cơ nổ thùng). Cần bao bì thoát khí, ghi rõ khối lượng tịnh và báo NOTOC cho cơ trưởng.'
    },
    {
      id: 'D3',
      labelType: 'class3',
      titleJa: 'DGR-3: 香水類（UN1266 / Class 3 引火性液体）— 梱包濡れ・申告書不備',
      titleVi: 'DGR-3: Nước hoa (UN1266 / Class 3 Chất lỏng dễ cháy) — Thùng ướt & thiếu DGD',
      descJa: 'Class 3ラベル貼付の段ボール箱に液漏れによるシミがあり、危険物申告書（Shipper\'s Declaration）の荷送人署名も抜けています。',
      descVi: 'Thùng hàng dán nhãn Class 3 có vết ẩm ướt nghi rò rỉ chất lỏng, tờ khai Shipper\'s Declaration thiếu chữ ký người gửi.',
      options: [
        { ok: false, ja: '受託可（ACCEPT）— テープで補強し、係員が代わりに署名して搭載する', vi: 'CHẤP NHẬN (ACCEPT) — Dán băng keo gia cố lại và nhân viên ký thay cho kịp chuyến' },
        { ok: true, ja: '受託拒否（REJECT）— 液漏れ疑い・梱包損傷・DGD不備はいずれもIATA DGRチェックリスト不合格', vi: 'TỪ CHỐI (REJECT) — Rò rỉ/hư hỏng bao bì và thiếu chữ ký trên DGD đều không đạt IATA DGR Acceptance Checklist' }
      ],
      expJa: '漏れや損傷がある危険物、および申告書不備のある貨物は絶対に受託できません。係員による代筆・改ざんも厳禁です。',
      expVi: 'Kiện hàng nguy hiểm bị rò rỉ/rách hoặc thiếu chữ ký chủ hàng trên DGD bắt buộc phải TỪ CHỐI. Tuyệt đối không sửa hộ tờ khai.'
    },
    {
      id: 'D4',
      labelType: 'class2',
      titleJa: 'DGR-4: 一般貨物申告だが「キャンプ用品」からガス缶反応（未申告危険物）',
      titleVi: 'DGR-4: Hàng thường khai "Đồ cắm trại" nhưng X-ray phát hiện bình gas (Hàng nguy hiểm không khai báo)',
      descJa: '「Camping Equipment（一般貨物）」として搬入された箱をX線検査したところ、カセットガスボンベ（引火性ガス Class 2.1）が複数本写りました。',
      descVi: 'Kiện hàng khai là "Camping Equipment" (hàng thường) nhưng soi X-ray thấy nhiều bình gas mini (Class 2.1 Khí dễ cháy).',
      options: [
        { ok: true, ja: '即時受託停止・隔離し、未申告危険物（Undeclared DG）として保安・安全部門および当局規程に従い報告する', vi: 'Dừng tiếp nhận & cách ly ngay, báo cáo theo quy trình Hàng nguy hiểm không khai báo (Undeclared DG)' },
        { ok: false, ja: '一般貨物としてそのまま搭載し、到着後に注意する', vi: 'Cho qua lần này rồi nhắc nhở người gửi sau' }
      ],
      expJa: '未申告危険物（Hidden / Undeclared DG）は航空火災の最大要因の一つです。発見時は即時受託拒否・所定報告を行います。',
      expVi: 'Hàng nguy hiểm ẩn / không khai báo (Undeclared DG) là mối nguy cháy nổ hàng đầu trên không. Phải từ chối và lập báo cáo sự cố ngay.'
    },
    {
      id: 'D5',
      labelType: 'cao',
      titleJa: 'DGR-5: 「CAO（Cargo Aircraft Only）」ラベル貼付貨物を旅客便へ予約',
      titleVi: 'DGR-5: Kiện hàng dán nhãn CAO (Chỉ bay tàu chở hàng) đặt chỗ trên chuyến chở khách',
      descJa: '腐食性物質（Class 8）にオレンジ色の「CARGO AIRCRAFT ONLY（CAO）」ラベルが貼られた貨物が、旅客便（A320）の搭載予定リストに入っています。',
      descVi: 'Kiện chất ăn mòn (Class 8) có dán nhãn cam "CARGO AIRCRAFT ONLY (CAO)" được lên danh sách xếp lên chuyến bay chở khách A320.',
      options: [
        { ok: true, ja: '旅客便への搭載を拒否（REJECT）し、貨物専用機（Freighter）への振替を手配する', vi: 'TỪ CHỐI xếp lên chuyến chở khách và yêu cầu chuyển sang tàu bay chuyên chở hàng (Freighter)' },
        { ok: false, ja: 'バルク室の奥に積めば旅客室と離れているので搭載してよい', vi: 'Xếp sâu vào hầm Bulk cho xa khoang khách là bay được' }
      ],
      expJa: 'CAOラベルは「旅客機搭載厳禁・貨物専用機のみ」を意味します。いかなる貨物室であっても旅客便には搭載できません。',
      expVi: 'Nhãn CAO (Cargo Aircraft Only) cấm tuyệt đối xếp lên máy bay chở hành khách dưới mọi hình thức.',
      expEn: 'CAO (Cargo Aircraft Only) packages are strictly forbidden on passenger flights regardless of hold location.'
    },
    {
      id: 'D6',
      labelType: 'class7_ti',
      titleJa: 'DGR-6: 放射性物質（Class 7）の輸送指数（TI: Transport Index）上限確認',
      titleVi: 'DGR-6: Kiểm tra tổng Chỉ số Vận chuyển (TI) của Chất phóng xạ (Class 7) trên tàu chở khách',
      titleEn: 'DGR-6: Radioactive Material (Class 7) Total Transport Index (TI) Limit on Passenger Aircraft',
      descJa: '医療用アイソトープ（Class 7 黄色ラベル）複数口を旅客便（B787）へ搭載予定。1機あたりの合計「輸送指数（TI）」が 54.0 となっています。',
      descVi: 'Lô đồng vị phóng xạ y tế (Class 7 nhãn vàng) dự kiến xếp lên chuyến chở khách B787 có tổng Chỉ số vận chuyển (TI) toàn tàu là 54,0.',
      descEn: 'Multiple medical radioactive packages (Class 7 Yellow label) planned for a passenger B787 total a combined Transport Index (TI) of 54.0.',
      options: [
        { ok: true, ja: 'そのまま全量は搭載不可 — 旅客機1機あたりの合計TI上限は「50以下」のため、50以下に減らすか別便へ分割手配する', vi: 'KHÔNG ĐƯỢC xếp toàn bộ — Tổng chỉ số TI tối đa cho phép trên 1 máy bay chở khách là ≤ 50 (phải tách bớt sang chuyến khác)', en: 'HOLD / SPLIT — Passenger aircraft total TI limit is 50.0 max; split excess packages onto another flight' },
        { ok: false, ja: 'TIは100まで旅客機に積めるので全量そのまま搭載する', vi: 'Máy bay chở khách được xếp tới TI 100 nên cứ chất hết lên', en: 'Load all packages since passenger aircraft allow up to TI 100' }
      ],
      expJa: '特定技能2号教材（航空法・IATA DGR）：旅客機1機あたりの放射性物質の合計輸送指数（TI）は「50以下」と定められています（不法な危険物輸送には50万円以下の罰金）。',
      expVi: 'Theo giáo trình 特定技能 2号 & Luật Hàng không Nhật Bản: tổng Chỉ số vận chuyển (TI) chất phóng xạ trên tàu chở khách không được vượt quá 50 (vận chuyển trái phép DGR bị phạt tiền tới 50 vạn Yên).',
      expEn: 'Per Japan Civil Aeronautics Act & SSW-II textbook: total Radioactive Transport Index (TI) on a passenger aircraft must not exceed 50 (illegal DG transport carries up to ¥500,000 fine).'
    }
  ];

  // Vẽ nhãn nguy hiểm IATA DGR dạng SVG sắc nét
  export function renderDgrSvg(type) {
    const diamond = (bg, fg, clsNum, line1, line2 = '') => `
      <svg width="74" height="74" viewBox="0 0 80 80" style="flex-shrink:0;">
        <polygon points="40,4 76,40 40,76 4,40" fill="${bg}" stroke="#111" stroke-width="2.5"/>
        <polygon points="40,9 71,40 40,71 9,40" fill="none" stroke="${fg}" stroke-width="1"/>
        <text x="40" y="37" text-anchor="middle" font-size="9.5" font-weight="700" fill="${fg}">${line1}</text>
        <text x="40" y="48" text-anchor="middle" font-size="8.5" font-weight="700" fill="${fg}">${line2}</text>
        <text x="40" y="64" text-anchor="middle" font-size="12" font-weight="800" fill="${fg}">${clsNum}</text>
      </svg>`;
    if (type === 'class2') return diamond('#D92D20', '#FFF', '2', 'FLAMMABLE', 'GAS');
    if (type === 'class3') return diamond('#D92D20', '#FFF', '3', 'FLAMMABLE', 'LIQUID');
    if (type === 'class7_ti') return `
      <svg width="74" height="74" viewBox="0 0 80 80" style="flex-shrink:0;">
        <polygon points="40,4 76,40 40,76 4,40" fill="#FFF" stroke="#111" stroke-width="2.5"/>
        <polygon points="40,4 76,40 4,40" fill="#FACC15" stroke="#111" stroke-width="1.5"/>
        <circle cx="40" cy="26" r="6" fill="#111"/>
        <text x="40" y="51" text-anchor="middle" font-size="7.8" font-weight="900" fill="#111">RADIOACTIVE</text>
        <text x="40" y="60" text-anchor="middle" font-size="7.5" font-weight="800" fill="#B91C1C">TI MAX ≤ 50</text>
        <text x="40" y="71" text-anchor="middle" font-size="11" font-weight="900" fill="#111">7</text>
      </svg>`;
    if (type === 'class9_dryice') return `
      <svg width="74" height="74" viewBox="0 0 80 80" style="flex-shrink:0;">
        <polygon points="40,4 76,40 40,76 4,40" fill="#FFF" stroke="#111" stroke-width="2.5"/>
        <line x1="25" y1="20" x2="25" y2="40" stroke="#111" stroke-width="3"/>
        <line x1="33" y1="12" x2="33" y2="40" stroke="#111" stroke-width="3"/>
        <line x1="40" y1="6" x2="40" y2="40" stroke="#111" stroke-width="3"/>
        <line x1="47" y1="12" x2="47" y2="40" stroke="#111" stroke-width="3"/>
        <line x1="55" y1="20" x2="55" y2="40" stroke="#111" stroke-width="3"/>
        <text x="40" y="53" text-anchor="middle" font-size="8.5" font-weight="700" fill="#111">UN1845</text>
        <text x="40" y="66" text-anchor="middle" font-size="12" font-weight="800" fill="#111">9</text>
      </svg>`;
    if (type === 'class9_li') return `
      <svg width="80" height="74" viewBox="0 0 90 80" style="flex-shrink:0;">
        <rect x="4" y="6" width="82" height="68" fill="#FFF" stroke="#D92D20" stroke-width="4" stroke-dasharray="8 4"/>
        <text x="45" y="34" text-anchor="middle" font-size="10" font-weight="800" fill="#111">LITHIUM</text>
        <text x="45" y="48" text-anchor="middle" font-size="10" font-weight="800" fill="#111">UN3481</text>
        <text x="45" y="63" text-anchor="middle" font-size="8" fill="#555">BATTERY MARK</text>
      </svg>`;
    return `
      <svg width="84" height="74" viewBox="0 0 96 80" style="flex-shrink:0;">
        <rect x="4" y="8" width="88" height="64" rx="4" fill="#F97316" stroke="#111" stroke-width="2.5"/>
        <text x="48" y="32" text-anchor="middle" font-size="11" font-weight="800" fill="#111">CARGO</text>
        <text x="48" y="46" text-anchor="middle" font-size="10" font-weight="800" fill="#111">AIRCRAFT</text>
        <text x="48" y="60" text-anchor="middle" font-size="11" font-weight="800" fill="#111">ONLY</text>
      </svg>`;
  }

export const SAFETY_CHECKLIST_GROUPS = [
    {
      groupJa: '1. ランプ安全・保護具・高所作業 (Ramp PPE, Engine & Elevated Work)',
      groupVi: '1. An toàn sân đỗ, Động cơ & Làm việc trên cao (≥2m / 10m)',
      groupEn: '1. Ramp PPE, Engine Hazard & Elevated Work (≥2m / 10m)',
      items: [
        { id: 's1', ja: '高視認性ベスト・安全靴・ヘルメット・防音保護具（耳栓/イヤーマフ）を着用している', vi: 'Luôn mặc áo phản quang, giày bảo hộ, mũ bảo hiểm và nút/chụp tai chống ồn', en: 'Wear high-vis vest, safety shoes, helmet, and hearing protection at all times' },
        { id: 's2', ja: '衝突防止灯（赤ビーコン）点灯中は絶対接近せず、エンジン監視員はエンジン外側から5m以上離れている', vi: 'Không tiếp cận khi đèn Beacon đỏ còn nháy; Watchman luôn đứng cách vỏ ngoài động cơ ≥ 5 m', en: 'Never approach while red beacon is ON; engine watchman stays ≥5 m outside nacelle' },
        { id: 's3', ja: '吸込危険区域（B777アイドル前方4.6m/吸引力140kg）と後方ブラスト（53.4m）を回避している', vi: 'Tránh xa vùng hút trước động cơ (4,6 m / lực hút 140 kg) và luồng Jet Blast phía sau (53,4 m)', en: 'Stay clear of engine intake suction (4.6 m / 140 kg at idle) and aft jet blast (53.4 m)' },
        { id: 's4', ja: '高さ2m以上の高所作業では手すり作業床またはフルハーネスを使用し、雷警報時は即時退避する', vi: 'Làm việc trên cao ≥ 2 m bắt buộc có lan can hoặc dây đai toàn thân (フルハーネス); sét đánh dừng ngay', en: 'Use guardrails or full-body harness at heights ≥2 m, and evacuate immediately upon lightning alert' }
      ]
    },
    {
      groupJa: '2. FOD対策・エプロンピット・SMS報告 (FOD, Utility Pits & SMS)',
      groupVi: '2. Phòng chống FOD, Hố ngầm Sân đỗ & Văn hóa SMS (1:29:300)',
      groupEn: '2. FOD Control, Apron Utility Pits & SMS Just Culture',
      items: [
        { id: 's5', ja: '到着前・出発前にスポット内のFOD（ボルト・タグ屑・木片）を点検回収し専用箱へ廃棄した', vi: 'Kiểm tra và nhặt sạch FOD (ốc vít, dây tag, mảnh gỗ pallet) bỏ vào thùng FOD trước giờ tàu vào/ra', en: 'Sweep spot for FOD (bolts, tag scraps, wood splinters) before arrival and departure' },
        { id: 's6', ja: 'エプロン地下ピット（白＝燃料・青＝空調・赤＝電力/アース・黄＝避雷）上に車両を駐停車させていない', vi: 'Không đỗ xe đè lên nắp hố ngầm sân đỗ (Trắng=Xăng, Xanh=Điều hòa, Đỏ=Điện/Tiếp địa, Vàng=Chống sét)', en: 'Never park over utility pits (White=Fuel, Blue=PC-Air, Red=Power/Earth, Yellow=Lightning)' },
        { id: 's7', ja: '機体部品と思われる金属片や損傷発見時は隠さず直ちに整備士・スーパーバイザーへ報告する', vi: 'Phát hiện mảnh kim loại nghi của máy bay hoặc vết trầy móp phải báo ngay cho Bảo dưỡng (整備士)', en: 'Immediately report any suspected aircraft part or skin damage to Maintenance without concealment' },
        { id: 's8', ja: 'ハインリッヒの法則（1:29:300）・SHELLモデルに基づき、ヒヤリハットを積極的に共有している', vi: 'Chủ động báo cáo sự cố suýt xảy ra (ヒヤリハット) theo quy luật Heinrich 1:29:300 & mô hình SHELL', en: 'Actively report near-misses under Heinrich\'s 1:29:300 law and ICAO SHELL human factors' }
      ]
    },
    {
      groupJa: '3. 制限区域車両・フォークリフト安全 (GSE & Forklift Rules)',
      groupVi: '3. Quy tắc lái xe GSE & Xe nâng Forklift (40/30/15/10/5 km/h)',
      groupEn: '3. Airside GSE & Forklift Safety Rules (40/30/15/10/5 km/h)',
      items: [
        { id: 's9', ja: '航空機最優先（自走機の前方40m以内横断禁止、コックピット前方死角15m・翼端±3mに注意）', vi: 'Nhường tuyệt đối tàu bay (cấm cắt ngang trong 40 m trước mũi tàu tự lăn; nhớ điểm mù 15 m & đầu cánh ±3 m)', en: 'Yield to aircraft (never cross within 40 m ahead; respect 15 m nose blind spot & ±3 m wingtip error)' },
        { id: 's10', ja: '速度厳守（場周40・車両通路30・30m内/牽引15・接近10・高重心8・機側TT 5km/h以下）と5m手前一旦停止', vi: 'Tuân thủ tốc độ (chu vi 40, đường xe 30, trong 30m/kéo 15, tiếp cận 10, xe cao 8, TT sát tàu ≤5 km/h) & dừng thử phanh ở 5 m', en: 'Obey speed limits (40/30/15/10/8/≤5 km/h) and execute full brake-check stop 5 m from aircraft' },
        { id: 's11', ja: '機体接近後退時はガイドマンホイッスル合図（ピッピッ＝誘導／ピーッ＝停止）に従う', vi: 'Khi lùi tiếp cận tàu bay bắt buộc có Guideman thổi còi (Pi-pi = di chuyển / Piii dài = DỪNG NGAY)', en: 'Follow guideman whistle signals (short beeps = move slowly / long blast = STOP) when backing near aircraft' },
        { id: 's12', ja: 'フォークリフトは視界不良時「後進基本」、稼働爪から1.5m以上離隔、降車時はPブレーキ＆輪止め実施', vi: 'Forklift bị hàng che mắt phải đi LÙI, người đứng cách càng >1,5 m; rời xe kéo phanh tay & chèn bánh', en: 'Drive forklifts in reverse when view blocked, stay >1.5 m from moving forks, and set brake + chocks when parking' }
      ]
    },
    {
      groupJa: '4. ULDビルドアップ・W&B・危険物最終確認 (ULD, W&B & DGR)',
      groupVi: '4. Kiểm tra Đóng hàng ULD, Cân bằng tải W&B & Hàng nguy hiểm',
      groupEn: '4. ULD Build-up, W&B & Dangerous Goods Final Check',
      items: [
        { id: 's13', ja: 'ULDビルドアップで重下軽上・レンガ積み・重量物への補強板（スプレッダー）・コンター逸脱ゼロを確認した', vi: 'Đóng ULD đúng Nặng dưới-Nhẹ trên, xếp gạch khóa kiện, lót ván Spreader cho hàng nặng & không vượt Contour', en: 'Verified heavy-bottom brick stacking, spreader planks under heavy cargo, and zero contour overhang' },
        { id: 's14', ja: 'LIRと現物ULDタグ・搭載位置が一致し、全フロアロック（クローズ・アンド・ロック）を施錠した', vi: 'Đối chiếu thẻ ULD khớp 100% vị trí LIR và đã gạt khóa chặt toàn bộ chốt sàn (Close & Lock)', en: 'Matched physical ULD tags to LIR positions and engaged all cargo floor locks (Close & Lock)' },
        { id: 's15', ja: '直前変更（LMC）反映後のZFW・TOW・LWおよび%MACがすべて許容範囲内である', vi: 'Đã cập nhật mọi thay đổi giờ chót (LMC); ZFW, TOW, LW và %MAC đều nằm trong Envelope an toàn', en: 'Confirmed ZFW, TOW, LW, and %MAC remain inside envelope after all Last Minute Changes (LMC)' },
        { id: 's16', ja: '危険物（CAO禁止・旅客機放射性TI合計≤50）を照合し、NOTOCを機長へ確実に手交した', vi: 'Kiểm tra kỹ DGR (không lẫn hàng CAO lên tàu khách, tổng TI phóng xạ ≤ 50) và đã giao NOTOC cho Cơ trưởng', en: 'Verified DGR rules (no CAO on pax aircraft, total radioactive TI ≤50) and delivered signed NOTOC to Captain' }
      ]
    }
  ];

export const A3D_SPOTS = [
    { id: '101', ngoNo: '6', name: 'NGO Spot 6 (B737-800 / Bulk)', acType: 'B738', cx: -68, cz: 10, wingHalf: 18, fuseLen: 37, bodyColor: [242, 245, 250], tailColor: [27, 79, 156], era: { x1: -90, x2: -45, z1: -14, z2: 34 }, loadPt: { x: -78, z: 20 } },
    { id: '102', ngoNo: '7', name: 'NGO Spot 7 (A320 / AKH+Bulk)', acType: 'A320', cx: 0, cz: 10, wingHalf: 18, fuseLen: 36, bodyColor: [245, 247, 250], tailColor: [20, 92, 168], era: { x1: -22, x2: 22, z1: -14, z2: 34 }, loadPt: { x: -10, z: 20 } },
    { id: '103', ngoNo: '14', name: 'NGO Spot 14 (B787-8 / Dual PBB)', acType: 'B788', cx: 68, cz: 10, wingHalf: 22, fuseLen: 42, bodyColor: [244, 246, 250], tailColor: [30, 64, 128], era: { x1: 44, x2: 94, z1: -16, z2: 35 }, loadPt: { x: 56, z: 21 } }
  ];

  // Các vật cản cứng (tòa nhà, tháp, bồn xăng) để chống xe đi xuyên tường
  export const A3D_OBSTACLES = [
    { id: 'terminal', x1: -98, x2: 46, z1: 62, z2: 92 },
    { id: 'tower', x1: -127, x2: -113, z1: 69, z2: 83 },
    { id: 'cargo', x1: 58, x2: 126, z1: 62, z2: 92 },
    { id: 'fire', x1: 114, x2: 136, z1: -24, z2: 0 },
    { id: 'fuel', x1: 114, x2: 136, z1: 8, z2: 30 }
  ];

  // Danh mục các hạng mục sân bay chuẩn mô phỏng NGO (Centrair)
  export const A3D_FACILITIES = [
    {
      id: 'runway', cam: { tx: 0, ty: 0, tz: -95, dist: 145, yaw: 0.3, pitch: 0.52 }, badge: 'FORBIDDEN', badgeCls: 'badge-danger',
      ja: '滑走路 RWY 36/18（伊勢湾海上空港モデル）', vi: 'Đường băng RWY 36/18 (Mô phỏng đảo nhân tạo NGO)',
      ruleJa: '【絶対進入禁止】中部国際空港（NGO）準拠の単一滑走路36/18。地上車両（GSE）の無許可進入は滑走路誤進入（Runway Incursion）となります。',
      ruleVi: '[CẤM TUYỆT ĐỐI] Đường băng đơn 36/18 mô phỏng theo Centrair NGO trên vịnh Ise. Cấm tuyệt đối xe GSE đi vào.'
    },
    {
      id: 'taxiway', cam: { tx: -25, ty: 0, tz: -55, dist: 115, yaw: 0.45, pitch: 0.52 }, badge: 'FORBIDDEN', badgeCls: 'badge-danger',
      ja: '誘導路 A（Taxiway Alpha）', vi: 'Đường lăn song song A (誘導路 A)',
      ruleJa: '【進入禁止】航空機専用。地上車両はエプロン境界赤線より北側へ出てはなりません。',
      ruleVi: '[CẤM LÁI VÀO] Đường lăn chỉ dành cho tàu bay. Xe GSE không vượt qua vạch đỏ ranh giới sân đỗ.'
    },
    {
      id: 'engine', cam: { tx: -68, ty: 2, tz: 8, dist: 64, yaw: 0.65, pitch: 0.55 }, badge: 'DANGER', badgeCls: 'badge-danger',
      ja: 'エンジン吸込・ブラスト危険区域 & 翼下禁止', vi: 'Vùng hút động cơ, Luồng phản lực & Dưới cánh',
      ruleJa: '【危険区域】赤色ビーコン点灯時はエンジン前方（吸込）・後方（ジェットブラスト）へ絶対接近禁止。消灯時も翼下・胴体下走行は厳禁。',
      ruleVi: '[NGUY HIỂM] Khi đèn beacon sáng cấm vào vùng hút phía trước & luồng phản lực sau. Luôn cấm lái xe luồn dưới cánh/bụng máy bay.'
    },
    {
      id: 'gse_holds', cam: { tx: -8, ty: 2.5, tz: 12, dist: 56, yaw: -0.95, pitch: 0.45 }, badge: 'GSE MATCH', badgeCls: 'badge-accent',
      ja: '右舷貨物室 GSE配置（Low-Deck High-Loader vs Belt Loader）', vi: 'Vị trí GSE Hầm hàng Phải: Low-Deck High-Loader & Belt Loader',
      ruleJa: '【機材別GSE使い分け】A320(Spot 7)・B787(Spot 14)の前・後部コンテナ室は「ローデッキ・ハイリフトローダー」、バルク室とB737(Spot 6)全室は「ベルトローダー」を右舷側へ装着。貨物機用メインデッキローダーは貨物上屋に待機。',
      ruleVi: '[CHUẨN DÙNG ĐÚNG GSE] Hầm container A320 (Spot 7) & B787 (Spot 14) dùng Low-Deck High-Lift Loader; hầm Bulk & toàn bộ B737 (Spot 6) dùng Belt Loader ở bên PHẢI thân máy bay. Main-Deck Loader cao nằm bên kho hàng Cargo.'
    },
    {
      id: 'pbb_ngo', cam: { tx: 16, ty: 5, tz: 24, dist: 58, yaw: 0.72, pitch: 0.42 }, badge: 'PORT SIDE', badgeCls: 'badge-warn',
      ja: 'NGO準拠 PBB（左舷側ロータンダから直角装着）＆ スカイデッキ', vi: 'Ống lồng PBB tiến ngang từ mạn Trái (L1/L2) & Sky Deck NGO',
      ruleJa: '【PBB標準動線】PBB（搭乗橋）は機首正面ではなく左舷（Port側）の固定橋ロータンダからL1/L2ドアへ真横（直角）に接続。可動範囲下の駐車・通過は厳禁。',
      ruleVi: '[CHUẨN PBB] Ống lồng PBB tiến VUÔNG GÓC từ tháp xoay Rotunda bên hông TRÁI (Port) vào cửa L1 (và L2 trên B787) — tuyệt đối không đi chéo qua mũi tàu bay.'
    },
    {
      id: 'serviceroad', cam: { tx: 0, ty: 0, tz: 48, dist: 120, yaw: 0.15, pitch: 0.56 }, badge: 'MAX 30km/h', badgeCls: 'badge-ok',
      ja: '構内車両通路 (Service Road)', vi: 'Đường chạy xe nội bộ GSE (構内通路)',
      ruleJa: '【走行可能】白線で区画されたGSE専用通路。制限速度30km/h以下・航空機最優先・一時停止線厳守。',
      ruleVi: '[ĐƯỢC PHÉP LÁI] Đường quy định cho xe GSE có vạch trắng. Giới hạn ≤30 km/h, luôn nhường đường tàu bay.'
    },
    {
      id: 'gse', cam: { tx: -116, ty: 2, tz: 18, dist: 78, yaw: 0.72, pitch: 0.55 }, badge: 'MAX 15km/h', badgeCls: 'badge-ok',
      ja: 'GSE待機エリア (GSE Staging Area)', vi: 'Khu đỗ & tập kết xe GSE (GSE待機エリア)',
      ruleJa: '【待機・駐車区域】トーイングトラクター・ベルトローダー・ローデッキローダー等の所定待機場所。',
      ruleVi: '[KHU TẬP KẾT GSE] Nơi đỗ xe đầu kéo, băng chuyền, Low-Deck Loader đúng ô vàng; rời xe phải kéo phanh tay.'
    },
    {
      id: 'tower', cam: { tx: -120, ty: 18, tz: 76, dist: 85, yaw: 0.7, pitch: 0.38 }, badge: 'ATC', badgeCls: 'badge-accent',
      ja: '中部管制塔 (Chubu Tower / ATC)', vi: 'Đài kiểm soát không lưu Chubu (管制塔)',
      ruleJa: '滑走路36/18・誘導路Aの航空機およびプッシュバック・牽引許可を統括する中枢施設。',
      ruleVi: 'Trung tâm điều hành cấp huấn lệnh đường băng 36/18, đường lăn A và đẩy lùi (Pushback).'
    },
    {
      id: 'cargo_fire', cam: { tx: 102, ty: 5, tz: 35, dist: 125, yaw: -0.65, pitch: 0.5 }, badge: 'CARGO / FIRE', badgeCls: 'badge-accent',
      ja: '貨物上屋・Main-Deck Loader・消防署・給油施設', vi: 'Kho Cargo, Main-Deck Loader, Cứu hỏa & Kho xăng',
      ruleJa: '貨物専用機用メインデッキ・ハイリフトローダー（高床5.5m）、ULDヤード、消防動線（駐車厳禁）、JET A-1タンク。',
      ruleVi: 'Khu tập kết Main-Deck High-Loader (cao 5.5m cho tàu hàng), bãi ULD, trạm cứu hỏa và kho nhiên liệu JET A-1.'
    }
  ];

  // 3 Nhiệm vụ lái xe GSE có hướng dẫn (Cập nhật chuẩn bên PHẢI -X của hầm hàng!)
  export const A3D_MISSIONS = [
    {
      id: 'M1',
      titleJa: '任務1: GSE待機所 → 構内通路 → NGO Spot 7 (A320) 右舷前部貨物室へ接近',
      titleVi: 'Nhiệm vụ 1: Khu GSE → Đường nội bộ → Tiếp cận hầm hàng PHẢI Spot 7 (A320)',
      descJa: '構内通路（30km/h以下）を経由し、Spot 7右舷側（西側）のERA赤線手前でブレーキ点検停止（Space）後、8km/h以下で緑のLow-Deck搭載ポイントへ停止してください。',
      descVi: 'Đi theo đường nội bộ (≤30 km/h), dừng phanh kiểm tra (Space) ngoài vạch đỏ ERA phía PHẢI (mạn Tây) Spot 7, rồi tiến chậm (≤8 km/h) vào điểm xếp hàng xanh.',
      start: { x: -112, z: 28, heading: Math.PI / 2 },
      beacon101: true,
      target: { x: -10, z: 20, r: 5.5 },
      requireBrakeOutsideEra: true,
      waypoints: [{ x: -100, z: 50 }, { x: -12, z: 50 }, { x: -12, z: 38 }, { x: -10, z: 20 }]
    },
    {
      id: 'M2',
      titleJa: '任務2: 貨物上屋 → NGO Spot 6 (B737) ビーコン点灯待機→消灯後右舷バルク室へ進入',
      titleVi: 'Nhiệm vụ 2: Kho hàng → Spot 6 (B737) Chờ tắt đèn Beacon rồi vào hầm hàng PHẢI',
      descJa: 'Spot 6（B737・バルク機）は赤色ビーコン点灯中！ERA赤線手前の黄色待機枠で完全停止し、「Spot 6 ビーコンOFF」後に右舷側緑ポイントへ進入してください。',
      descVi: 'Spot 6 (B737 dùng Belt Loader) đang bật đèn Beacon đỏ! Dừng hẳn ở ô vàng ngoài vạch đỏ ERA, tắt Beacon Spot 6 rồi mới lái chậm vào hầm hàng bên phải.',
      start: { x: 84, z: 50, heading: Math.PI },
      beacon101: true,
      holdPt: { x: -78, z: 39, r: 6.5 },
      target: { x: -78, z: 20, r: 5.5 },
      requireBeaconOff: true,
      waypoints: [{ x: -78, z: 50 }, { x: -78, z: 39 }, { x: -78, z: 20 }]
    },
    {
      id: 'M3',
      titleJa: '任務3: エプロン外周サービスロード安全巡回（誘導路越境禁止）',
      titleVi: 'Nhiệm vụ 3: Tuần tra an toàn quanh đường nội bộ sân đỗ (Cấm lấn đường lăn)',
      descJa: 'GSE待機所から南側通路→東側通路→北側エプロン外周通路（誘導路境界線の手前！）を制限速度内で巡回し、北西チェックポイントへ戻ってください。',
      descVi: 'Chạy đúng đường nội bộ vòng quanh sân đỗ: Đường phía Nam → Đường phía Đông → Đường ngoài rìa phía Bắc (không lấn sang đường lăn!) về điểm cuối Tây Bắc.',
      start: { x: -112, z: 28, heading: Math.PI / 2 },
      beacon101: true,
      checkpoints: [{ x: 0, z: 50, r: 8 }, { x: 102, z: -10, r: 8 }, { x: -98, z: -38, r: 8 }],
      target: { x: -98, z: -38, r: 8 },
      waypoints: [{ x: -100, z: 50 }, { x: 0, z: 50 }, { x: 102, z: 50 }, { x: 102, z: -38 }, { x: -98, z: -38 }]
    }
  ];

  // HÀM THUẦN (PURE FUNCTION) ĐÁNH GIÁ VÙNG AN TOÀN / CẤM LÁI CHUẨN NGO CENTRAIR (JA / VI / EN)
export function evaluateAirportZone(x, z, speedKmh, spot101BeaconOn, opts = {}) {
    const towingCarts = Boolean(opts.towingCarts);
    const over38m = Boolean(opts.over38m);
    const ilsRedOn = Boolean(opts.ilsRedOn);
    const blastActive = Boolean(opts.blastActive);

    // 0. Đường vành đai sân bay 3 mặt (場周道路: Tây z=-150..-134, Nam x=-274..-254, Bắc x=254..274, 40 km/h) & Khu hạn chế ILS
    const onWestPerim = z <= -134 && z >= -152 && x >= -274 && x <= 274;
    const onSidePerim = (x <= -254 && x >= -274 || x >= 254 && x <= 274) && z >= -152 && z <= 115;
    if (onWestPerim || onSidePerim) {
      const inIls = onWestPerim && ((x >= -145 && x <= -85) || (x >= 85 && x <= 145));
      if (inIls && ilsRedOn) {
        return {
          zone: 'ILS_RESTRICTED',
          allowed: false,
          severity: 'critical',
          speedLimit: 0,
          penalty: 25,
          ja: 'ILS制限区域（赤灯点灯中 — 進入禁止！反対側へ迂回せよ）',
          vi: 'Khu vực hạn chế ILS (Đèn đỏ đang sáng — CẤM vào, đi vòng phía đối diện!)',
          en: 'ILS Restricted Area (Red Lamp ON — NO ENTRY! Detour via opposite side)'
        };
      }
      const lim = towingCarts ? 15 : 40;
      const speeding = speedKmh > lim + 1.5;
      return {
        zone: 'PERIMETER_ROAD',
        allowed: true,
        severity: speeding ? 'warn' : 'ok',
        speedLimit: lim,
        speeding,
        penalty: speeding ? 5 : 0,
        ja: speeding ? `場周道路 速度超過（制限${lim}km/h！）` : `場周道路（制限${lim}km/h${inIls ? '・ILS駐停車禁止50m区間' : ''}）`,
        vi: speeding ? `Quá tốc độ Đường vành đai (Tối đa ${lim} km/h!)` : `Đường vành đai sân bay (Tối đa ${lim} km/h${inIls ? ' · Đoạn ILS cấm dừng đỗ' : ''})`,
        en: speeding ? `Perimeter Road Speeding (Max ${lim} km/h!)` : `Airport Perimeter Road (Max ${lim} km/h${inIls ? ' · ILS No-Stopping Zone' : ''})`
      };
    }

    // 1. Đường băng & Dải hạ cánh (滑走路・着陸帯等: z <= -78)
    if (z <= -78) {
      return {
        zone: 'RUNWAY',
        allowed: false,
        severity: 'critical',
        speedLimit: 0,
        penalty: 30,
        ja: '滑走路・着陸帯等（管制許可なき進入厳禁！滑走路誤進入）',
        vi: 'Đường băng / Dải hạ cánh (CẤM TUYỆT ĐỐI khi chưa có phép ATC!)',
        en: 'Active Runway / Landing Strip (Runway Incursion — ATC Clearance Mandatory!)'
      };
    }

    // 1b. 3 tuyến Service Lane cắt ngang Đường lăn (x = -31, -155, +118; z = -70..-42)
    const inSrvLane = (z > -70 && z < -42) && ((x >= -38 && x <= -24) || (x >= -162 && x <= -148) || (x >= 111 && x <= 125));
    if (inSrvLane) {
      const lim = towingCarts ? 15 : 30;
      const speeding = speedKmh > lim + 1.5;
      return {
        zone: 'SERVICE_LANE_CROSS',
        allowed: true,
        severity: speeding ? 'warn' : 'ok',
        speedLimit: lim,
        speeding,
        penalty: speeding ? 5 : 0,
        ja: speeding ? `サービスレーン 速度超過（制限${lim}km/h・追越禁止！）` : `サービスレーン横断中（制限${lim}km/h・航空機後方100m確認・出口赤線停止禁止）`,
        vi: speeding ? `Quá tốc độ trong Service Lane (Tối đa ${lim} km/h, cấm vượt!)` : `Đang qua Service Lane (Tối đa ${lim} km/h · Đợi máy bay ≥100m · Không dừng vạch đỏ ra)`,
        en: speeding ? `Service Lane Speeding (Max ${lim} km/h · No Overtaking!)` : `Service Lane Crossing (Max ${lim} km/h · 100m behind aircraft · Do not stop on exit red line)`
      };
    }

    // 2. Đường lăn tàu bay (誘導路・赤実線ABL越境: z < -42)
    if (z < -42) {
      return {
        zone: 'TAXIWAY',
        allowed: false,
        severity: 'critical',
        speedLimit: 0,
        penalty: 25,
        ja: '誘導路・赤実線（ABL）越境（無許可進入禁止！サービスレーンを使用せよ）',
        vi: 'Đường lăn tàu bay / Vượt vạch đỏ ABL (Cấm vào trái phép! Hãy đi qua Service Lane)',
        en: 'Taxiway / Crossed Red ABL Line (Unauthorized Entry — Use Service Lane!)'
      };
    }

    // 2b. 2 Khu vực cảnh báo luồng phản lực T2 (#71 tại -117,-17 và #77 tại -228,52)
    const inBlast71 = x >= -130 && x <= -104 && z >= -26 && z <= -8;
    const inBlast77 = x >= -241 && x <= -215 && z >= 43 && z <= 61;
    if (inBlast71 || inBlast77) {
      if (blastActive) {
        return {
          zone: 'BLAST_CAUTION_ACTIVE',
          allowed: false,
          severity: 'critical',
          speedLimit: 0,
          penalty: 20,
          ja: 'ブラスト注意区域（#71/#77 自走アウト中 — 進入・停車禁止！）',
          vi: 'Vùng cảnh báo Jet Blast (#71/#77 tàu bay đang tự chạy ra — CẤM vào/dừng!)',
          en: 'Blast Caution Zone (#71/#77 Self-Taxi-Out Active — NO ENTRY / NO STOPPING!)'
        };
      }
      const lim = 15;
      const speeding = speedKmh > lim + 1.5;
      return {
        zone: 'BLAST_CAUTION',
        allowed: true,
        severity: speeding ? 'warn' : 'ok',
        speedLimit: lim,
        speeding,
        penalty: speeding ? 5 : 0,
        ja: 'ブラスト注意区域（#71/#77 黄色枠 — 減速・航空機動向確認）',
        vi: 'Vùng cảnh báo Jet Blast (#71/#77 khung vàng — Giảm tốc quan sát tàu bay)',
        en: 'Blast Caution Zone (#71/#77 Yellow Box — Slow down & verify aircraft status)'
      };
    }

    // 3. Kiểm tra vùng nguy hiểm quanh 3 tàu bay (PBB nguy hiểm, Động cơ, Dưới cánh/bụng, ERA)
    for (let i = 0; i < A3D_SPOTS.length; i++) {
      const sp = A3D_SPOTS[i];
      const beaconOn = sp.id === '101' && Boolean(spot101BeaconOn);
      const dx = x - sp.cx;
      const dz = z - sp.cz;

      // PBB Danger Zone (gạch chéo đỏ mạn trái +X) — CẤM XE TUYỆT ĐỐI
      const pbbX1 = sp.cx + 3.2, pbbX2 = sp.cx + 21.5;
      const pbbZ1 = sp.cz + 6.5, pbbZ2 = sp.cz + 16.5;
      if (x >= pbbX1 && x <= pbbX2 && z >= pbbZ1 && z <= pbbZ2) {
        return {
          zone: 'PBB_DANGER',
          allowed: false,
          severity: 'critical',
          speedLimit: 0,
          penalty: 20,
          ja: `${sp.name} PBB危険区域（赤斜線 — 車両進入・駐停車・PBB下通過は例外なく禁止！）`,
          vi: `Vùng nguy hiểm PBB ${sp.name} (Gạch chéo đỏ — Cấm tuyệt đối mọi loại xe & cấm chui gầm PBB!)`,
          en: `${sp.name} PBB Danger Zone (Red Hatched — Strictly No Vehicles & Never Drive Under PBB!)`
        };
      }

      if (beaconOn) {
        const inIntakeL = dx >= -9.5 && dx <= -2.5 && dz >= 2 && dz <= 12;
        const inIntakeR = dx >= 2.5 && dx <= 9.5 && dz >= 2 && dz <= 12;
        const inBlastL = dx >= -11 && dx <= -1.5 && dz >= -26 && dz <= -1;
        const inBlastR = dx >= 1.5 && dx <= 11 && dz >= -26 && dz <= -1;
        if (inIntakeL || inIntakeR || inBlastL || inBlastR) {
          return {
            zone: 'ENGINE_DANGER',
            allowed: false,
            severity: 'critical',
            speedLimit: 0,
            penalty: 25,
            ja: `${sp.name} エンジン吸込・ジェットブラスト危険区域（ビーコン点灯中！）`,
            vi: `Vùng hút động cơ / Luồng phản lực ${sp.name} (Đèn Beacon đang sáng!)`,
            en: `${sp.name} Engine Suction / Jet Blast Danger Zone (Beacon ON!)`
          };
        }
      }

      const underFuselage = Math.abs(dx) <= 3.6 && dz >= -18 && dz <= 19;
      const underWings = Math.abs(dx) <= sp.wingHalf && dz >= -7 && dz <= 3;
      if (underFuselage || underWings) {
        return {
          zone: 'UNDER_WING',
          allowed: false,
          severity: 'critical',
          speedLimit: 0,
          penalty: 20,
          ja: `${sp.name} 航空機前方・後方・翼下走行禁止区域（機体接触危険！）`,
          vi: `Cấm thao tác xe trước/sau/dưới cánh tàu bay ${sp.name} (Nguy cơ va chạm!)`,
          en: `${sp.name} Prohibited Zone Under Wings / Fuselage (Collision Risk!)`
        };
      }

      if (x >= sp.era.x1 && x <= sp.era.x2 && z >= sp.era.z1 && z <= sp.era.z2) {
        if (beaconOn) {
          return {
            zone: 'ERA_BEACON_ON',
            allowed: false,
            severity: 'critical',
            speedLimit: 0,
            penalty: 20,
            ja: `${sp.name} ERA機材制限区域内（ビーコン点灯中は進入厳禁！）`,
            vi: `Trong vạch đỏ ERA ${sp.name} (CẤM vào khi đèn Beacon đang sáng!)`,
            en: `${sp.name} Inside ERA Red Line (Entry Strictly Prohibited While Beacon ON!)`
          };
        }
        const near5m = Math.hypot(dx, dz) <= 18;
        const lim = near5m ? 10 : 15;
        const speeding = speedKmh > lim + 1.2;
        return {
          zone: 'ERA_SAFE',
          spotId: sp.id,
          allowed: true,
          severity: speeding ? 'warn' : 'ok',
          speedLimit: lim,
          speeding,
          penalty: speeding ? 5 : 0,
          ja: speeding ? `${sp.name} ERA内 速度超過（制限${lim}km/h！）` : `${sp.name} ERA内（安全接近 制限${lim}km/h）`,
          vi: speeding ? `Quá tốc độ trong vùng ERA ${sp.name} (Tối đa ${lim} km/h!)` : `Trong vùng ERA ${sp.name} (Tiếp cận an toàn ≤${lim} km/h)`,
          en: speeding ? `${sp.name} ERA Speeding (Max ${lim} km/h!)` : `${sp.name} Inside ERA (Safe Approach Max ${lim} km/h)`
        };
      }
    }

    // 4. Đường GSE sát nhà ga (3.8m Fixed Bridge Clearance) & Đường xe sau bãi đỗ
    const onHeadRoad = z >= 44 && z <= 56 && x >= -136 && x <= 136;
    const onOuterRoad = z >= -42 && z <= -34 && x >= -136 && x <= 136;
    if (onHeadRoad) {
      const underFixedBridge = over38m && (Math.abs(x + 48) < 6 || Math.abs(x - 19) < 6 || Math.abs(x - 92) < 6);
      if (underFixedBridge) {
        return {
          zone: 'HEIGHT_LIMIT_38M',
          allowed: false,
          severity: 'critical',
          speedLimit: 0,
          penalty: 25,
          ja: '全高3.8m超過 — 固定橋下通行不可！（スポット後方車両通行帯へ迂回せよ）',
          vi: 'Vi phạm chiều cao >3.8m — Cấm qua gầm cầu cố định! (Phải đi vòng Đường sau bãi đỗ)',
          en: 'Over 3.8m Height Violation — Fixed Bridge Clearance Exceeded! (Use Behind-Stand Road)'
        };
      }
      const lim = towingCarts ? 15 : 30;
      const speeding = speedKmh > lim + 1.5;
      return {
        zone: 'SERVICE_ROAD',
        allowed: true,
        severity: speeding ? 'warn' : 'ok',
        speedLimit: lim,
        speeding,
        penalty: speeding ? 5 : 0,
        ja: speeding ? `ターミナル脇GSE通行帯 速度超過（制限${lim}km/h！）` : `ターミナル脇GSE通行帯（制限${lim}km/h・高さ制限3.8m）`,
        vi: speeding ? `Quá tốc độ đường GSE sát nhà ga (Tối đa ${lim} km/h!)` : `Đường GSE sát nhà ga (Tối đa ${lim} km/h · Giới hạn cao 3.8m)`,
        en: speeding ? `Terminal GSE Lane Speeding (Max ${lim} km/h!)` : `Terminal GSE Road (Max ${lim} km/h · 3.8m Height Limit)`
      };
    }
    if (onOuterRoad) {
      const lim = towingCarts ? 15 : 30;
      const speeding = speedKmh > lim + 1.5;
      return {
        zone: 'BEHIND_STAND_ROAD',
        allowed: true,
        severity: speeding ? 'warn' : 'ok',
        speedLimit: lim,
        speeding,
        penalty: speeding ? 5 : 0,
        ja: speeding ? `スポット後方車両通行帯 速度超過（制限${lim}km/h！）` : `スポット後方車両通行帯（車両専用・制限${lim}km/h・3.8m超可）`,
        vi: speeding ? `Quá tốc độ Đường sau bãi đỗ (Tối đa ${lim} km/h!)` : `Đường xe sau bãi đỗ (Chỉ xe cơ giới · Tối đa ${lim} km/h · Xe >3.8m đi được)`,
        en: speeding ? `Behind-Stand Road Speeding (Max ${lim} km/h!)` : `Behind-Stand Vehicle Road (Vehicles Only · Max ${lim} km/h · >3.8m OK)`
      };
    }

    // 5. Khu tập kết GSE (GSE Staging Area — Max 15 km/h)
    if (x >= -135 && x <= -104 && z >= -8 && z <= 44) {
      const speeding = speedKmh > 16.5;
      return {
        zone: 'GSE_STAGING',
        allowed: true,
        severity: speeding ? 'warn' : 'ok',
        speedLimit: 15,
        speeding,
        penalty: speeding ? 5 : 0,
        ja: speeding ? 'GSE待機エリア 速度超過（制限15km/h）' : 'GSE待機エリア（白線内整頓駐機・制限15km/h）',
        vi: speeding ? 'Quá tốc độ trong khu GSE (Tối đa 15 km/h)' : 'Khu tập kết GSE (Đỗ đúng vạch trắng · Tối đa 15 km/h)',
        en: speeding ? 'GSE Staging Area Speeding (Max 15 km/h)' : 'GSE Staging Bay (White-Line Parking · Max 15 km/h)'
      };
    }

    // 6. Sân đỗ Apron / trong bán kính 30m quanh tàu bay (Max 15 km/h)
    const speeding = speedKmh > 16.5;
    return {
      zone: 'APRON',
      allowed: true,
      severity: speeding ? 'warn' : 'ok',
      speedLimit: 15,
      speeding,
      penalty: speeding ? 5 : 0,
      ja: speeding ? 'エプロン・航空機周辺30m以内 速度超過（制限15km/h！）' : 'エプロン・航空機周辺30m以内（制限15km/h以下）',
      vi: speeding ? 'Quá tốc độ trên Apron / bán kính 30m quanh tàu bay (≤15 km/h!)' : 'Sân đỗ Apron / Trong bán kính 30m quanh tàu bay (Tối đa 15 km/h)',
      en: speeding ? 'Apron / Within 30m of Aircraft Speeding (Max 15 km/h!)' : 'Apron / Within 30m of Aircraft (Max 15 km/h)'
    };
  }

  // =========================================================================
  // MÔ PHỎNG CHU TRÌNH CẤT / HẠ CÁNH 10 GIAI ĐOẠN & VAI TRÒ NHÂN VIÊN MẶT ĐẤT
  // =========================================================================

export const A3D_FLIGHT_PHASES = [
    {
      id: 'landing', duration: 9, tagJa: '着陸', tagVi: 'Hạ cánh',
      titleJa: '1. 最終進入・着陸（NGO RWY 36 Final Approach & Landing）',
      titleVi: '1. Tiếp cận cuối & Hạ cánh (NGO Centrair RWY 36)',
      safetyJa: '滑走路36・誘導路は完全閉鎖（GSE進入厳禁）。到着NGO Spot 7のFOD点検を完了し、機材はERA赤線の外で待機。',
      safetyVi: 'Đường băng 36 & đường lăn tuyệt đối không có xe GSE. Bãi NGO Spot 7 đã quét sạch FOD, toàn bộ thiết bị & nhân sự chờ ngoài vạch đỏ ERA.',
      roles: [
        { roleJa: '中部管制塔 (Chubu Tower ATC)', roleVi: 'Kiểm soát viên không lưu (Chubu Tower)', badge: 'TOWER',
          tasksJa: ['滑走路36着陸許可（Cleared to Land RWY 36）を発出', '着陸後の滑走路離脱ルート（誘導路A → NGO Spot 7）を指示'],
          tasksVi: ['Cấp huấn lệnh hạ cánh đường băng 36 (Cleared to Land RWY 36)', 'Hướng dẫn thoát đường băng sang đường lăn A về NGO Spot 7'] },
        { roleJa: 'ランプリダー / 到着チーム', roleVi: 'Trưởng ca sân đỗ & Đội đón tàu bay', badge: 'NGO SPOT 7',
          tasksJa: ['NGO Spot 7のFOD（異物）最終点検・回収', 'ローデッキローダー・ベルトローダー・GPUをERA赤線外に待機配置'],
          tasksVi: ['Kiểm tra & thu gom sạch FOD toàn bãi đỗ NGO Spot 7', 'Tập kết Low-Deck Loader, Belt Loader, chèn bánh & GPU sẵn ngoài vạch đỏ ERA'] },
        { roleJa: '空港消防隊 (ARFF)', roleVi: 'Đội cứu hỏa sân bay', badge: 'STANDBY',
          tasksJa: ['着陸時のブレーキ過熱・異常に備え消防署で即時出動待機'],
          tasksVi: ['Trực sẵn sàng ứng phó sự cố hạ cánh / quá nhiệt phanh tại trạm cứu hỏa'] }
      ]
    },
    {
      id: 'taxi_in', duration: 10, tagJa: '駐機誘導', tagVi: 'Dẫn vào bãi',
      titleJa: '2. 誘導路走行・駐機誘導（Taxi-in & Marshalling — NGO Spot 7）',
      titleVi: '2. Lăn vào bãi & Dẫn tàu bay vào NGO Spot 7 (駐機誘導)',
      safetyJa: '赤色ビーコン点灯・エンジン稼働中！PBBは左舷側待機位置へ完全収納し、マーシャラー・ウイングウォーカーのみ所定位置へ。',
      safetyVi: 'Đèn beacon đỏ đang nháy! PBB thu gọn hoàn toàn về mạn trái (+X); chỉ Marshaller và Wing Walker đứng đúng vị trí an toàn.',
      roles: [
        { roleJa: 'マーシャラー（誘導員）', roleVi: 'Nhân viên dẫn tàu bay (Marshaller)', badge: 'PADDLE',
          tasksJa: ['停止線前方に立ち、オレンジパドルで中心線合わせ・減速・停止を指示', '前輪がA320停止バーに一致した瞬間に「停止（クロス）」合図'],
          tasksVi: ['Đứng trước vạch dừng dùng gậy phát sáng căn tim, điều chỉnh tốc độ', 'Bắt chéo gậy báo dừng (STOP) chuẩn xác khi bánh mũi chạm vạch T của A320'] },
        { roleJa: 'ウイングウォーカー（両翼監視）', roleVi: 'Nhân viên canh đầu cánh trái/phải (Wing Walker)', badge: 'WINGS',
          tasksJa: ['左右主翼端と左舷PBBロータンダ・隣接機材のクリアランスを常時監視', '接触危険があれば即座に緊急停止合図を送る'],
          tasksVi: ['Giám sát khoảng trống đầu cánh trái (phía tháp xoay PBB) và đầu cánh phải', 'Phát tín hiệu dừng khẩn cấp ngay nếu có nguy cơ va chạm'] },
        { roleJa: 'チョック・コーン担当', roleVi: 'Nhân viên chèn bánh & đặt cọc tiêu', badge: 'HOLD ERA',
          tasksJa: ['エンジン完全停止とビーコン消灯を確認するまでERA外で待機'],
          tasksVi: ['Đứng chờ tuyệt đối ngoài vạch đỏ ERA cho đến khi động cơ tắt hẳn'] }
      ]
    },
    {
      id: 'onblock', duration: 8, tagJa: '輪止め・PBB', tagVi: 'Chèn bánh & PBB',
      titleJa: '3. オンブロック・輪止め・GPU（右舷）・PBB直角装着（左舷L1）',
      titleVi: '3. On-Block, Chèn bánh, GPU (mạn Phải) & PBB tiến ngang từ mạn Trái (L1)',
      safetyJa: 'エンジン停止・ビーコン消灯を指差呼称で確認後に接近！GPUは右舷機首側、PBBは左舷ロータンダからL1ドアへ真横に装着。',
      safetyVi: 'Chỉ tiếp cận sau khi tắt đèn beacon & 指差呼称! GPU cắm ở mũi mạn PHẢI (-X), PBB tiến VUÔNG GÓC từ tháp xoay mạn TRÁI (+X) vào cửa L1.',
      roles: [
        { roleJa: 'ランプ作業員（チョック＆コーン）', roleVi: 'Nhân viên sân đỗ (Chèn bánh & Cọc tiêu)', badge: 'SAFETY',
          tasksJa: ['前輪・主輪へ輪止め（チョック）を設置し機体移動を防止', '機首・両翼端・エンジン前方に安全コーン配置＆機体損傷点検'],
          tasksVi: ['Chèn bánh mũi và bánh chính (Chock On) cố định tàu bay', 'Đặt cọc tiêu mũi/đầu cánh/động cơ & kiểm tra thân vỏ bằng 指差呼称'] },
        { roleJa: 'GPU操作員（右舷機首）', roleVi: 'Nhân viên GPU (Mũi mạn Phải)', badge: 'STARBOARD',
          tasksJa: ['右舷機首下のレセプタクルへ400Hz地上電源ケーブルを接続・給電開始'],
          tasksVi: ['Cắm cáp nguồn 400Hz vào ổ cắm mũi mạn phải và xác nhận cấp điện ổn định'] },
        { roleJa: 'PBB操作員（左舷側方装着）', roleVi: 'Nhân viên vận hành PBB (Tiến từ hông Trái)', badge: 'PORT L1',
          tasksJa: ['左舷固定橋ロータンダからPBBを機体側面（L1ドア）へ直角に徐行接近・キャノピー密着'],
          tasksVi: ['Điều khiển ống lồng từ Rotunda bên hông TRÁI tiến vuông góc áp sát cửa L1, hạ đệm cao su an toàn'] }
      ]
    },
    {
      id: 'unload', duration: 8, tagJa: 'ULD・バルク取卸', tagVi: 'Dỡ ULD & Bulk',
      titleJa: '4. 降機 ＆ 右舷貨物室取卸し（Low-Deck High-Loader＋Bulk Belt Loader）',
      titleVi: '4. Xuống khách & Dỡ hàng mạn Phải (Low-Deck High-Loader + Belt Loader cho Bulk)',
      safetyJa: '【GSE適正配置】前部コンテナ室（AKH）は「ローデッキ・ハイリフトローダー」、後部バルク室（バラ手荷物）は「ベルトローダー」を右舷側へ装着！',
      safetyVi: '[ĐÚNG LOẠI GSE] Hầm container trước (AKH) dùng Low-Deck High-Lift Loader; hầm Bulk sau (hành lý rời) dùng Belt Loader — cả 2 đều ở mạn PHẢI (-X)!',
      roles: [
        { roleJa: 'ハイリフトローダー操作員（前部AKH室）', roleVi: 'Vận hành Low-Deck High-Lift Loader (Hầm Container)', badge: 'LOW-DECK',
          tasksJa: ['右舷前部貨物室へローデッキ・ハイリフトローダーを装着（ERA手前でブレーキ点検必須）', 'AKH（LD3-45）コンテナを引き出し、後方のコンテナドーリーへ移載'],
          tasksVi: ['Áp sát Low-Deck High-Lift Loader (sàn nâng thấp) vào hầm trước mạn PHẢI sau khi Brake Check', 'Đẩy container AKH (LD3-45) ra bàn nâng hạ xuống Container Dolly'] },
        { roleJa: 'ベルトローダー担当（後部バルク室）', roleVi: 'Nhân viên Belt Loader (Hầm Bulk sau)', badge: 'BULK BELT',
          tasksJa: ['右舷後部バルク室（Hold 5）へベルトローダーを装着し、優先手荷物・ベビーカー等を取卸し', 'トーイングトラクターでバゲージカートを国内/国際ターンテーブルへ搬送'],
          tasksVi: ['Gắn Belt Loader vào hầm Bulk sau mạn PHẢI dỡ hành lý rời, xe đẩy trẻ em, hành lý Priority', 'Kéo xe ba-gát (Baggage Cart) về băng chuyền trả hành lý nhà ga'] },
        { roleJa: '旅客ハンドリング係員（左舷PBB）', roleVi: 'Nhân viên phục vụ khách (Cửa PBB Trái)', badge: 'PORT PAX',
          tasksJa: ['左舷L1ドアのPBBで降機旅客を案内、PRM・乗継旅客を優先誘導'],
          tasksVi: ['Đón khách rời máy bay qua ống lồng L1 bên trái, hỗ trợ PRM & nối chuyến'] }
      ]
    },
    {
      id: 'service', duration: 9, tagJa: '給油・清掃', tagVi: 'Tra dầu & Vệ sinh',
      titleJa: '5. ハイドラント給油（右主翼下）・清掃・ラバトリー（左舷後部）',
      titleVi: '5. Tra dầu Hydrant (dưới cánh Phải), Vệ sinh cabin & Lavatory (sau Trái)',
      safetyJa: 'NGOでは地下配管から給油する「ハイドラント給油車（サービサー）」を右主翼下へ配置。左舷後部のラバトリー作業とは完全分離。',
      safetyVi: 'Tại NGO dùng xe Hydrant Servicer lấy nhiên liệu ngầm đặt dưới cánh PHẢI; xe Lavatory đặt tách biệt ở đuôi mạn TRÁI.',
      roles: [
        { roleJa: '給油作業員（ハイドラントサービサー）', roleVi: 'Nhân viên tra dầu (Hydrant Servicer - Cánh Phải)', badge: 'FUEL',
          tasksJa: ['右主翼下の給油パネルへアース接続・消火器待機後にハイドラントピットからJET A-1を給油', '給油伝票を機長およびロードコントロールへ報告'],
          tasksVi: ['Tiếp địa, đặt bình chữa cháy, nối hố ngầm Hydrant bơm JET A-1 vào cánh PHẢI', 'Xác nhận phiếu nhiên liệu báo Cơ trưởng & Load Control'] },
        { roleJa: '機内清掃・フードローダー（右舷ドア）', roleVi: 'Vệ sinh cabin & Xe suất ăn (Cửa Phải R2)', badge: 'CABIN/R2',
          tasksJa: ['座席清掃・忘れ物確認・保安検査および右舷ドアからの機内食・飲料補給'],
          tasksVi: ['Dọn khoang khách, kiểm tra an ninh cabin & tiếp tế suất ăn qua cửa R2 bên phải'] },
        { roleJa: 'ラバトリー＆ウォーター担当（左舷後部）', roleVi: 'Nhân viên Lavatory & Nước sạch (Đuôi mạn Trái)', badge: 'PORT AFT',
          tasksJa: ['左舷後部パネルにて汚水処理・飲料水補給を衛生分離ルール厳守で実施'],
          tasksVi: ['Hút thải & cấp nước sạch ở đuôi mạn trái, tách biệt tuyệt đối với khu suất ăn & hàng hóa'] }
      ]
    },
    {
      id: 'load_board', duration: 9, tagJa: 'ULD搭載・搭乗', tagVi: 'Xếp ULD & Lên khách',
      titleJa: '6. 搭乗（左舷PBB）・AKHコンテナ/バルク搭載（右舷）・W&B最終確認',
      titleVi: '6. Lên khách (PBB Trái), Xếp AKH bằng Low-Deck Loader + Bulk bằng Belt Loader & Chốt W&B',
      safetyJa: '前部AKHコンテナはローデッキローダーでLIR指定位置（11P/12P）へロック、後部バルクはベルトローダーで搭載しLMC報告を徹底！',
      safetyVi: 'Xếp container AKH vào vị trí LIR (11P/12P) bằng Low-Deck Loader, xếp hàng rời hầm Bulk bằng Belt Loader và chốt Load Sheet!',
      roles: [
        { roleJa: 'ロードマスター / ロードコントロール', roleVi: 'Loadmaster & Load Control (LIR/W&B)', badge: 'W&B / LIR',
          tasksJa: ['前部AKHコンテナ重量・後部バルク重量をLIRと照合、LMC反映後にLoad Sheet・NOTOCを機長へ提出'],
          tasksVi: ['Đối chiếu trọng lượng container AKH hầm trước & hàng rời hầm Bulk khớp LIR, giao Load Sheet & NOTOC'] },
        { roleJa: 'ハイリフト＆ベルト搭載チーム（右舷）', roleVi: 'Đội xếp hàng Low-Deck & Bulk (Mạn Phải)', badge: 'STARBOARD',
          tasksJa: ['ローデッキローダーでAKHコンテナを所定ロックへ固定、ベルトローダーでバルク手荷物を積込みネット固縛'],
          tasksVi: ['Khóa chặt chốt sàn container AKH hầm trước, móc lưới hầm Bulk sau và đóng cửa hầm bằng 指差呼称'] },
        { roleJa: '搭乗口係員（左舷PBB L1）', roleVi: 'Nhân viên Gate (Cửa PBB Trái L1)', badge: 'PORT GATE',
          tasksJa: ['PRM優先搭乗・ゲートチェック手荷物（リチウム電池取出確認）をバルク室へ引き渡し、最終人数確定'],
          tasksVi: ['Ưu tiên khách PRM, chuyển vali gate-check (đã lấy pin lithium) xuống hầm Bulk và chốt sĩ số'] }
      ]
    },
    {
      id: 'clear', duration: 8, tagJa: 'ドア閉・退避', tagVi: 'Đóng cửa & Rút GSE',
      titleJa: '7. ドア閉鎖・GSE退避・PBB切離し・最終指差呼称',
      titleVi: '7. Đóng cửa, Rút toàn bộ xe GSE/PBB & Kiểm tra vòng quanh cuối cùng',
      safetyJa: 'すべてのGSE・コーン・GPUをERA外へ完全退避！出発前ウォークアラウンドで全ドア・パネル閉鎖を指差呼称。',
      safetyVi: 'Toàn bộ xe GSE, cọc tiêu, GPU phải rút gọn ra ngoài vạch đỏ ERA. Đi vòng quanh tàu bay kiểm tra đóng kín mọi nắp/cửa bằng 指差呼称.',
      roles: [
        { roleJa: '地上整備士 / ヘッドセットマン', roleVi: 'Kỹ thuật viên mặt đất / Nhân viên tai nghe', badge: 'HEADSET',
          tasksJa: ['機体周囲ウォークアラウンド（全貨物室ドア・サービスパネル閉鎖、FOD無し確認）', 'GPU切離し・バイパスピン挿入・インターホンで機長と出発準備完了を確認'],
          tasksVi: ['Đi vòng quanh kiểm tra toàn bộ cửa hầm/nắp kỹ thuật đóng kín, mặt sân sạch FOD', 'Ngắt GPU, cắm chốt bypass steering & kết nối tai nghe liên lạc buồng lái'] },
        { roleJa: 'PBB操作員 & ランプ員', roleVi: 'Nhân viên ống lồng & Sân đỗ', badge: 'CLEAR ERA',
          tasksJa: ['客室ドア閉鎖確認後にPBBを収納位置へ退避', 'ベルトローダー・給油車・安全コーンをERA赤線外へ撤収'],
          tasksVi: ['Đợi cửa L1 đóng kín rồi rút ống lồng PBB về vị trí an toàn', 'Rút sạch băng chuyền, xe tra dầu và cọc tiêu ra ngoài vạch đỏ ERA'] },
        { roleJa: 'トーイングカードライバー', roleVi: 'Tài xế xe đẩy lùi (Pushback Tug)', badge: 'TUG',
          tasksJa: ['プッシュバック用トラクターを前輪へ連結し、ブレーキ解除待機'],
          tasksVi: ['Đưa xe đẩy lùi áp sát và khớp chốt vào bánh mũi máy bay sẵn sàng đẩy'] }
      ]
    },
    {
      id: 'pushback', duration: 10, tagJa: 'プッシュバック', tagVi: 'Đẩy lùi & Nổ máy',
      titleJa: '8. プッシュバック ＆ エンジン始動（Pushback & Engine Start）',
      titleVi: '8. Đẩy lùi khỏi bãi đỗ & Khởi động động cơ (プッシュバック)',
      safetyJa: '赤色ビーコン点灯！エンジン始動許可前に周囲の人員・車両クリアを再確認。ゆっくり一定速度で誘導路へ押出し。',
      safetyVi: 'Đèn Beacon đỏ bật sáng! Xác nhận xung quanh hoàn toàn thông thoáng trước khi báo cơ trưởng nổ máy. Đẩy lùi êm, chậm đúng đường dẫn.',
      roles: [
        { roleJa: 'ATC 管制官', roleVi: 'Kiểm soát viên không lưu (ATC)', badge: 'TOWER',
          tasksJa: ['プッシュバックおよびエンジン始動許可（Pushback & Start-up Approved）を発出'],
          tasksVi: ['Cấp huấn lệnh đẩy lùi hướng Tây trên đường lăn A và cho phép nổ máy'] },
        { roleJa: 'トーイングカードライバー', roleVi: 'Tài xế xe Pushback Tug', badge: 'PUSHBACK',
          tasksJa: ['ヘッドセットマンと連携し、誘導路Aの中心線へ機首を西向きに正確に整列させる'],
          tasksVi: ['Phối hợp với Headset Man đẩy lùi và xoay đuôi đưa máy bay nằm chuẩn trên tim đường lăn A'] },
        { roleJa: 'ヘッドセットマン & ウイングウォーカー', roleVi: 'Nhân viên tai nghe & Canh đầu cánh', badge: 'ESCORT',
          tasksJa: ['前輪横を並走監視しつつ、機長へ「エンジン1・2始動安全確認」を伝達', '両翼端のクリアランスと後方車両交錯を最後まで監視'],
          tasksVi: ['Đi bộ song song vùng an toàn giám sát bánh mũi, thông báo cơ trưởng nổ từng động cơ', 'Hai Wing Walker cảnh giới đầu cánh và các xe xung quanh trong suốt quá trình đẩy'] }
      ]
    },
    {
      id: 'waveoff_taxiout', duration: 11, tagJa: 'お見送り・滑走前', tagVi: 'Tiễn bay & Lăn ra',
      titleJa: '9. トーバー切離し・バイパスピン提示（お見送り）→ 誘導路タキシング',
      titleVi: '9. Tháo thanh kéo, Giơ cờ đỏ Bypass Pin tiễn bay (お見送り) & Lăn ra đường băng',
      safetyJa: 'バイパスピン（赤リボン）を確実に抜き、機長から見える左側安全位置で提示・お見送り合図！滑走路手前停止線で待機。',
      safetyVi: 'Rút chốt bypass (cờ đỏ), đứng phía trái mũi máy bay nơi cơ trưởng nhìn rõ để giơ cao xác nhận và vẫy chào tiễn bay (お見送り)!',
      roles: [
        { roleJa: 'ヘッドセットマン（お見送り）', roleVi: 'Nhân viên tai nghe / Tiễn bay (Wave-off)', badge: 'PIN SHOW',
          tasksJa: ['パーキングブレーキ確認後にトーバー切離し・ステアリングバイパスピンを抜去', '左側安全位置へ移動し赤リボン（ピン）を掲げてOKサイン＆お見送り（Wave-off）'],
          tasksVi: ['Sau khi máy bay gài phanh, tháo thanh kéo và rút chốt đỏ Bypass Pin', 'Di chuyển ra vị trí an toàn bên trái giơ cao cờ đỏ xác nhận & cúi chào/vẫy tay tiễn bay'] },
        { roleJa: 'ランプチーム（出発後確認）', roleVi: 'Đội sân đỗ (Kiểm tra sau rời bãi)', badge: 'POST-DEP',
          tasksJa: ['機体離脱後のスポット内FOD・忘れ物・オイル漏れ有無を点検'],
          tasksVi: ['Quét kiểm tra bãi Spot 102 sau khi tàu bay rời đi (FOD, vết dầu, dụng cụ bỏ quên)'] },
        { roleJa: 'ATC 管制官（タキシー指示）', roleVi: 'Kiểm soát viên không lưu (Ground/Tower)', badge: 'TAXI OUT',
          tasksJa: ['誘導路A経由で滑走路09停止位置（Hold Short）までの走行許可を発出'],
          tasksVi: ['Cấp huấn lệnh lăn theo đường lăn A ra đầu đường băng 09 và chờ vào đường băng'] }
      ]
    },
    {
      id: 'takeoff', duration: 9, tagJa: '離陸上昇', tagVi: 'Cất cánh',
      titleJa: '10. 離陸滑走・上昇（Takeoff Roll & Climb-out RWY 09）',
      titleVi: '10. Chạy đà cất cánh & Lấy độ cao (離陸滑走・上昇 RWY 09)',
      safetyJa: '滑走路クリア確認後に離陸許可。運航管理は出発電文（MVT）を送信し、次便到着へ備えます。',
      safetyVi: 'Đường băng thông thoáng hoàn toàn để máy bay tăng tốc, nâng mũi (Rotate) và cất cánh. Bộ phận khai thác phát điện văn khởi hành (MVT).',
      roles: [
        { roleJa: 'ATC 管制官（タワー）', roleVi: 'Kiểm soát viên Đài không lưu (Tower)', badge: 'TAKEOFF',
          tasksJa: ['滑走路09離陸許可（Cleared for Takeoff RWY 09）発出・離陸後に進入管制（Departure）へ移管'],
          tasksVi: ['Cấp huấn lệnh cất cánh RWY 09 và bàn giao tàu bay cho kiểm soát tiếp cận/rời sân bay'] },
        { roleJa: '運航管理・ランプコントロール', roleVi: 'Điều phái bay & Kiểm soát sân đỗ', badge: 'DISPATCH',
          tasksJa: ['実出発時刻（ATOT）を記録し、MVT（運航移動電文）・LDM（搭載電文）を到着空港へ送信', 'スポット102の次便受入れスケジュールを更新'],
          tasksVi: ['Ghi nhận giờ cất cánh thực tế (ATOT), gửi điện văn MVT/LDM cho sân bay đích', 'Cập nhật trạng thái trống bãi Spot 102 cho chuyến tiếp theo'] }
      ]
    }
  ];

  // HÀM THUẦN (PURE FUNCTION) TÍNH TỌA ĐỘ 3D CỦA MÁY BAY, NHÂN VIÊN & GSE THEO GIAI ĐOẠN (0..9) VÀ TIẾN ĐỘ p (0..1)
  export function computeFlightCyclePose(phaseIdx, pRaw) {
    const p = Math.max(0, Math.min(1, pRaw));
    const lerp = (a, b, tVal) => a + (b - a) * Math.max(0, Math.min(1, tVal));
    const ac = { x: 0, y: 0, z: 10, heading: Math.PI / 2, pitch: 0, beaconOn: false };
    let pbbExt = 0; // 0 = thu gọn, 1 = nối sát cửa máy bay
    let conesOn = false;
    let chocksOn = false;
    let smoke = false;
    const crew = []; // { x, z, labelJa, labelVi, vest, waving, pin }
    const gse = [];  // { kind, x, z, heading, label }

    if (phaseIdx === 0) {
      // 1. Final Approach & Landing RWY 09
      ac.beaconOn = true;
      ac.heading = 0;
      ac.z = -97;
      if (p < 0.45) {
        const u = p / 0.45;
        ac.x = lerp(-230, -125, u);
        ac.y = lerp(42, 0, u * u * 0.35 + u * 0.65);
        ac.pitch = u > 0.75 ? 0.08 : -0.04;
      } else {
        const u = (p - 0.45) / 0.55;
        const decel = 1 - Math.pow(1 - u, 1.5);
        ac.x = lerp(-125, 95, decel);
        ac.y = 0;
        ac.pitch = u < 0.12 ? 0.06 * (1 - u / 0.12) : 0;
        smoke = u < 0.12;
      }
      crew.push({ x: -16, z: 38, labelJa: 'ランプ員(FOD確認済)', labelVi: 'Đội sân đỗ (Chờ ngoài ERA)', vest: [190, 242, 100], waving: false });
      gse.push({ kind: 'gpu', x: -18, z: 40, heading: 0 });
    } else if (phaseIdx === 1) {
      // 2. Taxi-in & Marshalling into Spot 102
      ac.beaconOn = true;
      if (p < 0.28) {
        const u = p / 0.28;
        ac.x = 95;
        ac.z = lerp(-97, -55, u);
        ac.heading = Math.PI / 2;
      } else if (p < 0.68) {
        const u = (p - 0.28) / 0.40;
        ac.x = lerp(95, 0, u);
        ac.z = -55;
        ac.heading = Math.PI;
      } else {
        const u = (p - 0.68) / 0.32;
        ac.x = 0;
        ac.z = lerp(-55, 10, u);
        ac.heading = Math.PI / 2;
      }
      // Đội đón tàu bay đứng chuẩn vị trí tại Spot 102
      crew.push({ x: 0, z: 33, labelJa: 'マーシャラー(誘導)', labelVi: 'Marshaller (Dẫn tàu)', vest: [249, 115, 22], waving: true });
      crew.push({ x: -21, z: 8, labelJa: 'ウイングウォーカーL', labelVi: 'Canh cánh trái', vest: [190, 242, 100], waving: true });
      crew.push({ x: 21, z: 8, labelJa: 'ウイングウォーカーR', labelVi: 'Canh cánh phải', vest: [190, 242, 100], waving: true });
      crew.push({ x: -16, z: 39, labelJa: 'チョック担当(待機)', labelVi: 'Đội chèn bánh (Chờ ERA)', vest: [190, 242, 100], waving: false });
      gse.push({ kind: 'gpu', x: -18, z: 40, heading: 0 });
    } else if (phaseIdx === 2) {
      // 3. On-Block, Beacon OFF, Chocks, Cones, GPU (Starboard Nose -X) & Side-Approach PBB (Port L1 +X)
      ac.beaconOn = false;
      pbbExt = p;
      chocksOn = p > 0.2;
      conesOn = p > 0.35;
      crew.push({ x: lerp(-12, -3.5, p), z: lerp(36, 23, p), labelJa: 'チョック・コーン担当', labelVi: 'Chèn bánh & Cọc tiêu', vest: [190, 242, 100], waving: false });
      crew.push({ x: lerp(-16, -8.5, p), z: lerp(38, 26, p), labelJa: 'GPU担当 (右舷機首)', labelVi: 'GPU (Mũi mạn Phải)', vest: [249, 115, 22], waving: false });
      crew.push({ x: 14, z: 26, labelJa: 'PBB操作員 (左舷L1)', labelVi: 'Vận hành PBB (Hông Trái L1)', vest: [59, 130, 246], waving: false });
      gse.push({ kind: 'gpu', x: lerp(-18, -7.2, p), z: lerp(39, 25.5, p), heading: 0 });
    } else if (phaseIdx === 3) {
      // 4. Deplaning (Port PBB +X) & Starboard Cargo Unloading (-X): Low-Deck High-Loader (Fwd AKH) + Belt Loader (Aft Bulk)
      ac.beaconOn = false;
      pbbExt = 1; chocksOn = true; conesOn = true;
      const app = Math.min(1, p * 2.2);
      gse.push({ kind: 'gpu', x: -7.2, z: 25.5, heading: 0 });
      // Hầm trước (Container AKH) -> Low-Deck High-Lift Loader + Container Dolly (bên PHẢI -X)
      gse.push({ kind: 'lowloader', x: lerp(-24, -7.4, app), z: 18.5, heading: 0, hasUld: true, uldType: 'AKH' });
      gse.push({ kind: 'uld_dolly', x: lerp(-32, -15.5, app), z: 18.5, heading: 0 });
      // Hầm Bulk sau (Hành lý rời) -> Belt Loader + Baggage Tractor (bên PHẢI -X)
      gse.push({ kind: 'belt', x: lerp(-24, -7.2, app), z: -7.5, heading: 0 });
      gse.push({ kind: 'tractor', x: lerp(-31, -15.5, app), z: -7.5, heading: 0 });
      crew.push({ x: lerp(-21, -10.5, app), z: 15.0, labelJa: 'ローデッキ・ハイリフト担当 (AKH)', labelVi: 'Low-Deck High-Loader (AKH)', vest: [249, 115, 22], waving: false });
      crew.push({ x: lerp(-21, -10.5, app), z: -10.5, labelJa: 'ベルトローダー担当 (バルク)', labelVi: 'Belt Loader (Hầm Bulk)', vest: [190, 242, 100], waving: false });
      crew.push({ x: 11, z: 26, labelJa: '旅客係員 (左舷PBB)', labelVi: 'Nhân viên hành khách (PBB Trái)', vest: [59, 130, 246], waving: false });
    } else if (phaseIdx === 4) {
      // 5. Hydrant Fueling (Under Starboard Wing -X), Catering/Cleaning (Starboard R2 -X) & Lavatory/Water (Port Aft +X)
      ac.beaconOn = false;
      pbbExt = 1; chocksOn = true; conesOn = true;
      const app = Math.min(1, p * 2.2);
      gse.push({ kind: 'gpu', x: -7.2, z: 25.5, heading: 0 });
      gse.push({ kind: 'hydrant', x: lerp(-26, -11.5, app), z: 7.5, heading: Math.PI / 2 });
      gse.push({ kind: 'catering', x: lerp(-24, -7.8, app), z: -2.0, heading: 0 });
      gse.push({ kind: 'lav', x: lerp(24, 9.5, app), z: -8.5, heading: Math.PI });
      crew.push({ x: -14.8, z: 10.5, labelJa: 'ハイドラント給油員 (右主翼下)', labelVi: 'Tra dầu Hydrant (Cánh Phải)', vest: [249, 115, 22], waving: false });
      crew.push({ x: -12.0, z: -4.5, labelJa: '機内清掃・フードローダー', labelVi: 'Vệ sinh & Suất ăn (R2 Phải)', vest: [190, 242, 100], waving: false });
      crew.push({ x: 13.0, z: -6.0, labelJa: 'ラバトリー/水担当 (左舷後部)', labelVi: 'Lavatory/Nước (Đuôi Trái)', vest: [190, 242, 100], waving: false });
    } else if (phaseIdx === 5) {
      // 6. Boarding (Port PBB +X), Outbound Loading (Starboard Low-Deck Loader + Bulk Belt Loader) & Loadmaster LIR/W&B
      ac.beaconOn = false;
      pbbExt = 1; chocksOn = true; conesOn = true;
      gse.push({ kind: 'gpu', x: -7.2, z: 25.5, heading: 0 });
      gse.push({ kind: 'lowloader', x: -7.4, z: 18.5, heading: 0, hasUld: true, uldType: 'AKH' });
      gse.push({ kind: 'uld_dolly', x: -15.5, z: 18.5, heading: 0 });
      gse.push({ kind: 'belt', x: -7.2, z: -7.5, heading: 0 });
      gse.push({ kind: 'tractor', x: -15.5, z: -7.5, heading: 0 });
      crew.push({ x: -13.5, z: 13.5, labelJa: 'ロードマスター (LIR/W&B照合)', labelVi: 'Loadmaster (Chốt LIR & W&B)', vest: [249, 115, 22], waving: false });
      crew.push({ x: -10.5, z: -10.5, labelJa: 'バルク搭載担当', labelVi: 'Đội xếp hầm Bulk', vest: [190, 242, 100], waving: false });
      crew.push({ x: 11, z: 26, labelJa: '搭乗口係員 (左舷PBB)', labelVi: 'Nhân viên Gate (PBB Trái)', vest: [59, 130, 246], waving: false });
    } else if (phaseIdx === 6) {
      // 7. Door Close, GSE Clear outside ERA, Side PBB Retract (+X) & Pushback Tug Couple
      ac.beaconOn = false;
      pbbExt = 1 - p;
      chocksOn = p < 0.85;
      conesOn = p < 0.45;
      gse.push({ kind: 'gpu', x: lerp(-7.2, -25, p), z: lerp(25.5, 40, p), heading: Math.PI });
      gse.push({ kind: 'lowloader', x: lerp(-7.4, -27, p), z: lerp(18.5, 36, p), heading: Math.PI, hasUld: false });
      gse.push({ kind: 'belt', x: lerp(-7.2, -26, p), z: lerp(-7.5, -24, p), heading: Math.PI });
      gse.push({ kind: 'tug', x: 0, z: lerp(42, 31, p), heading: -Math.PI / 2 });
      crew.push({ x: lerp(-5, -4, p), z: lerp(22, 30, p), labelJa: 'ヘッドセットマン(最終確認)', labelVi: 'Headset Man (指差呼称)', vest: [249, 115, 22], waving: false });
    } else if (phaseIdx === 7) {
      // 8. Pushback & Engine Start
      ac.beaconOn = true;
      if (p < 0.55) {
        const u = p / 0.55;
        ac.x = 0;
        ac.z = lerp(10, -45, u);
        ac.heading = Math.PI / 2;
      } else {
        const u = (p - 0.55) / 0.45;
        ac.x = lerp(0, -8, u);
        ac.z = lerp(-45, -55, u);
        ac.heading = lerp(Math.PI / 2, Math.PI, u);
      }
      const noseX = ac.x + Math.cos(ac.heading) * 21;
      const noseZ = ac.z + Math.sin(ac.heading) * 21;
      gse.push({ kind: 'tug', x: noseX, z: noseZ, heading: ac.heading + Math.PI });
      crew.push({ x: noseX - Math.sin(ac.heading) * 5, z: noseZ + Math.cos(ac.heading) * 5, labelJa: 'ヘッドセットマン', labelVi: 'Headset Man (Tai nghe)', vest: [249, 115, 22], waving: false });
      crew.push({ x: ac.x - Math.sin(ac.heading) * 21, z: ac.z + Math.cos(ac.heading) * 21, labelJa: 'ウイングウォーカー', labelVi: 'Canh đầu cánh', vest: [190, 242, 100], waving: true });
    } else if (phaseIdx === 8) {
      // 9. Disconnect, Bypass Pin Wave-Off & Taxi-out to RWY 36
      ac.beaconOn = true;
      if (p < 0.25) {
        const u = p / 0.25;
        ac.x = -8; ac.z = -55; ac.heading = Math.PI;
        gse.push({ kind: 'tug', x: lerp(-29, -30, u), z: lerp(-55, -36, u), heading: Math.PI / 2 });
        crew.push({ x: -24, z: -46, labelJa: 'バイパスピン提示・お見送り', labelVi: 'Giơ cờ đỏ & Tiễn bay (お見送り)', vest: [249, 115, 22], waving: true, pin: true });
      } else if (p < 0.65) {
        const u = (p - 0.25) / 0.40;
        ac.x = lerp(-8, -95, u); ac.z = -55; ac.heading = Math.PI;
        gse.push({ kind: 'tug', x: -30, z: -36, heading: Math.PI / 2 });
        crew.push({ x: -24, z: -38, labelJa: 'お見送り完了', labelVi: 'Tiễn bay hoàn tất', vest: [249, 115, 22], waving: false });
      } else if (p < 0.88) {
        const u = (p - 0.65) / 0.23;
        ac.x = -95; ac.z = lerp(-55, -97, u); ac.heading = -Math.PI / 2;
      } else {
        const u = (p - 0.88) / 0.12;
        ac.x = -95; ac.z = -97; ac.heading = lerp(-Math.PI / 2, 0, u);
      }
    } else {
      // 10. Takeoff Roll & Climb-out NGO RWY 36
      ac.beaconOn = true;
      ac.z = -97;
      ac.heading = 0;
      if (p < 0.55) {
        const u = p / 0.55;
        ac.x = lerp(-95, 58, u * u);
        ac.y = 0;
        ac.pitch = u > 0.85 ? lerp(0, 0.18, (u - 0.85) / 0.15) : 0;
      } else {
        const u = (p - 0.55) / 0.45;
        ac.x = lerp(58, 235, u);
        ac.y = lerp(0, 56, u * 1.15);
        ac.pitch = 0.22;
      }
      crew.push({ x: -16, z: 38, labelJa: 'ランプ員(次便準備)', labelVi: 'Đội sân đỗ (Chuẩn bị chuyến kế)', vest: [190, 242, 100], waving: false });
    }

    return { ac, pbbExt, conesOn, chocksOn, smoke, crew, gse };
  }

  // Chủ đề thời gian trong ngày (Ngày / Hoàng hôn / Đêm đèn sân bay)

export const A3D_RADIO_COMMS = [
    { ch: 'NGO TWR 118.45', ja: 'Chubu Tower: "Japan Air 102, wind 360 at 10kt, Runway 36, cleared to land."（中部滑走路36着陸許可）', vi: 'Chubu Tower 118.45: "Japan Air 102, gió 360/10kt, Đường băng 36, cho phép hạ cánh."' },
    { ch: 'NGO GND 121.7', ja: 'Chubu Ground: "JP102, taxi to NGO Spot 7 via Taxiway A. Follow marshaller."（誘導路A経由スポット7へ）', vi: 'Chubu Ground 121.7: "JP102, lăn vào NGO Spot 7 qua đường lăn A, theo tín hiệu Marshaller."' },
    { ch: 'RAMP INT', ja: 'Ramp: "オンブロック！ビーコン消灯よし！右舷機首GPU接続、左舷L1へPBB直角装着開始！"', vi: 'Ramp Intercom: "On-block! Đèn Beacon OFF! Cắm GPU mũi phải, PBB tiến ngang từ hông trái vào cửa L1!"' },
    { ch: 'OPS 131.4', ja: 'Ramp: "右舷前部AKH室へローデッキ・ハイリフト装着完了！後部バルク室へベルトローダー装着完了！"', vi: 'Ops 131.4: "Đã gắn Low-Deck High-Lift Loader vào hầm container trước AKH & Belt Loader vào hầm Bulk sau!"' },
    { ch: 'FUEL / OPS', ja: 'Fueler: "右主翼下ハイドラント接続・アース確認よし！給油開始。左舷後部ラバトリー作業並行中。"', vi: 'Fueler: "Đấu nối Hydrant dưới cánh phải & tiếp địa OK! Bắt đầu tra dầu song song vệ sinh đuôi trái."' },
    { ch: 'LOAD CTRL', ja: 'Loadmaster: "AKHコンテナ11P/12Pロック確認・バルク重量LIR照合完了！Load Sheet提出済！"', vi: 'Load Control: "Đã khóa container AKH 11P/12P & khớp tải Bulk theo LIR! Đã giao Load Sheet & NOTOC!"' },
    { ch: 'HEADSET', ja: 'Headset: "全ドア閉鎖・左舷PBB収納・右舷ローダー/GPU退避完了！ウォークアラウンド異常なし！"', vi: 'Headset Man: "Đóng kín cửa, thu gọn PBB mạn trái, rút sạch Low-Deck Loader/GPU ngoài ERA! Walkaround OK!"' },
    { ch: 'NGO GND', ja: 'Headset: "プッシュバック承認取得！パーキングブレーキ解除願います。エンジン1・2始動クリア！"', vi: 'Headset Man: "Đã có phép Pushback! Mời nhả phanh đỗ. Xung quanh an toàn, mời nổ máy 1 & 2!"' },
    { ch: 'HEADSET', ja: 'Headset: "トーバー切離し・バイパスピン抜去確認！左側にて提示します。良い空の旅を！(お見送り)"', vi: 'Headset Man: "Đã tháo thanh kéo & rút chốt đỏ Bypass Pin! Giơ cờ bên trái tiễn bay an toàn!"' },
    { ch: 'NGO TWR 118.45', ja: 'Chubu Tower: "Japan Air 102, Runway 36, cleared for takeoff!"（中部滑走路36離陸許可！）', vi: 'Chubu Tower 118.45: "Japan Air 102, Đường băng 36, cho phép cất cánh!"' }
  ];

  // Đám mây 3D trôi nhẹ trên bầu trời
  export const A3D_CLOUDS = [
    { x: -170, y: 78, z: -175, sx: 46, sz: 22, spd: 2.2 },
    { x: -40, y: 86, z: -195, sx: 62, sz: 26, spd: 1.8 },
    { x: 95, y: 74, z: -165, sx: 50, sz: 20, spd: 2.5 },
    { x: 185, y: 90, z: -210, sx: 58, sz: 24, spd: 1.6 },
    { x: -120, y: 82, z: -230, sx: 54, sz: 22, spd: 2.0 }
  ];

  // Bộ tổng hợp âm thanh Web Audio thuần (100% offline: tiếng phản lực, động cơ GSE, còi cảnh báo, radio squelch)

export const A3D_AIRPORTS = {
    NGO: { id: 'NGO', nameJa: '中部国際 (NGO)', nameVi: 'Centrair NGO', rwy: '36/18', twr: 'Chubu Tower 118.45', island: true, snow: false, city: false, bridge: false, seaCol: [48, 108, 164], landCol: [220, 232, 210] },
    HND: { id: 'HND', nameJa: '羽田空港 (HND)', nameVi: 'Tokyo Haneda HND', rwy: '34R/16L', twr: 'Tokyo Tower 118.1', island: true, snow: false, city: true, bridge: false, seaCol: [44, 96, 148], landCol: [212, 224, 206] },
    NRT: { id: 'NRT', nameJa: '成田国際 (NRT)', nameVi: 'Narita NRT', rwy: '34L/16R', twr: 'Narita Tower 118.2', island: false, snow: false, city: false, bridge: false, seaCol: [104, 138, 84], landCol: [216, 232, 204] },
    KIX: { id: 'KIX', nameJa: '関西国際 (KIX)', nameVi: 'Kansai KIX', rwy: '06R/24L', twr: 'Kansai Tower 118.2', island: true, snow: false, city: false, bridge: true, seaCol: [42, 102, 158], landCol: [218, 228, 212] },
    CTS: { id: 'CTS', nameJa: '新千歳空港 (CTS)', nameVi: 'Shin-Chitose CTS (Tuyết)', rwy: '01L/19R', twr: 'Chitose Tower 118.8', island: false, snow: true, city: false, bridge: false, seaCol: [224, 236, 248], landCol: [242, 248, 255] }
  };

export const A3D_VIEWPOINTS = [
    { id: 'flight_follow', key: '1', ja: '✈ 機体追従', vi: '✈ Theo máy bay', descJa: 'JP102機体を斜め後方から自動追従する3Dシネマティック視点', descVi: 'Camera 3D tự động bám theo chuyến bay JP102 từ hạ cánh đến cất cánh' },
    { id: 'pilot', key: '2', ja: '🧑‍✈️ コックピット', vi: '🧑‍✈️ Buồng lái', descJa: '機長席（コックピット）からの実視野：進入PAPI灯・マーシャラー誘導・バイパスピン提示・離陸滑走を体験', descVi: 'Góc nhìn Cơ trưởng trong buồng lái: nhìn đèn PAPI khi hạ cánh, Marshaller vẫy gậy, cờ đỏ Bypass Pin và chạy đà cất cánh' },
    { id: 'tower', key: '3', ja: '🗼 管制塔 (ATC)', vi: '🗼 Đài không lưu', descJa: '管制塔ガラスキャブ（地上30m）から滑走路・誘導路・エプロン全体を見渡す管制官視点', descVi: 'Đứng trên buồng kính Đài không lưu (cao 30m) quan sát toàn cảnh đường băng, đường lăn và sân đỗ' },
    { id: 'marshaller', key: '4', ja: '🦺 マーシャラー', vi: '🦺 Marshaller', descJa: 'Spot 102 停止バー前方（目線高さ1.8m）から進入してくる機首と双発エンジンを見る誘導員視点', descVi: 'Tầm mắt nhân viên dẫn tàu (1.8m) ngay trước mũi máy bay tại vạch dừng Spot 102' },
    { id: 'headset', key: '5', ja: '🎧 ヘッドセットマン', vi: '🎧 Headset Man', descJa: '前輪横を並走する地上整備士／ヘッドセットマン目線：プッシュバック・お見送り位置を体感', descVi: 'Tầm mắt nhân viên tai nghe đi cạnh bánh mũi khi kiểm tra vòng quanh, đẩy lùi và giơ cờ đỏ tiễn bay' },
    { id: 'loadmaster', key: '6', ja: '📦 貨物室・LIR', vi: '📦 Loadmaster', descJa: '右舷貨物室横からの視点：ベルトローダー・給油車・翼下クリアランスを至近距離で確認', descVi: 'Đứng sát cửa hầm hàng phải Spot 102 quan sát băng chuyền hành lý, xe tra dầu và khoảng trống dưới cánh' },
    { id: 'terminal', key: '7', ja: '🪟 展望デッキ', vi: '🪟 Sảnh quan sát', descJa: '旅客ターミナル展望デッキ＆PBBゲートからのパノラマ視点（背後に富士山を望む）', descVi: 'Góc nhìn từ đài quan sát nhà ga & ống lồng PBB hướng ra sân đỗ, đường băng và núi Phú Sĩ' },
    { id: 'gse_cab', key: '8', ja: '🚜 GSE運転席', vi: '🚜 Khoang lái GSE', descJa: '地上支援車両（GSE）の運転席一人称視点：構内通路の白線・ERA赤線をドライバー目線で確認', descVi: 'Góc nhìn thứ nhất trong cabin tài xế xe GSE — cực thực tế khi lái xe ở Tab 2' },
    { id: 'backing', key: 'B', ja: '🅿 牽引バック視点', vi: '🅿 Lùi chuồng đầu kéo', descJa: 'トレーラー牽引バック車庫入れ専用カメラ：TT頭・ヒッチ折れ角・荷台後端と枠線を一望', descVi: 'Góc nhìn chuyên dụng lùi rơ-moóc vào chuồng như xe đầu kéo: quan sát rõ đầu xe TT, góc gập moóc và đuôi moóc vào vạch' },
    { id: 'orbit', key: '9', ja: '🔄 3D自由回転', vi: '🔄 Xoay 3D tự do', descJa: 'マウスドラッグで360度回転・ホイールでズームできる自由観察カメラ', descVi: 'Kéo chuột xoay tự do 360° & cuộn zoom mọi ngóc ngách sân bay' },
    { id: 'top', key: '0', ja: '🗺 俯瞰マップ', vi: '🗺 Bản đồ từ trên', descJa: '空港全体と進入禁止区域の配置を真上から確認できる戦術マップ視点', descVi: 'Nhìn thẳng từ trên cao xuống toàn bộ bố cục sân bay & vùng cấm lái' }
  ];

  // Hàm thuần tính vị trí & hướng nhìn Camera cho từng vị trí công tác

export function computeViewpointCamera(camMode, isFlightMode, flightPose, veh, orbitCam, phaseIdx, extra = null) {
    const ac = flightPose ? flightPose.ac : { x: 0, y: 0, z: 10, heading: Math.PI / 2, pitch: 0 };
    const ch = Math.cos(ac.heading), sh = Math.sin(ac.heading);
    const cp = Math.cos(ac.pitch || 0), sp = Math.sin(ac.pitch || 0);
    const acLocalToW = (lx, ly, lz) => {
      const ly1 = ly * cp + lz * sp;
      const lz1 = -ly * sp + lz * cp;
      return [ac.x - lx * sh + lz1 * ch, ac.y + ly1, ac.z + lx * ch + lz1 * sh];
    };

    if (camMode === 'pilot') {
      return {
        pos: acLocalToW(0, 4.7, 15.8),
        target: acLocalToW(0, 3.3, 72.0),
        fov: 58,
        povKind: 'pilot'
      };
    }
    if (camMode === 'tower') {
      const lookAt = isFlightMode ? [ac.x, Math.max(1.5, ac.y + 2), ac.z] : [veh.x, 1.5, veh.z];
      return { pos: [-115, 30.2, 71.5], target: lookAt, fov: 46, povKind: 'tower' };
    }
    if (camMode === 'marshaller') {
      const targetPt = (isFlightMode && phaseIdx <= 1) ? [ac.x, Math.max(2, ac.y + 3), ac.z] : [0, 3.4, 14];
      return { pos: [0, 1.95, 35.5], target: targetPt, fov: 56, povKind: 'marshaller' };
    }
    if (camMode === 'headset') {
      if (isFlightMode && (phaseIdx === 7 || phaseIdx === 8)) {
        const pCrew = (flightPose && flightPose.crew[0]) ? [flightPose.crew[0].x, 1.85, flightPose.crew[0].z] : acLocalToW(-5.5, 1.85, 22);
        return { pos: pCrew, target: [ac.x, Math.max(2.5, ac.y + 3.2), ac.z], fov: 58, povKind: 'headset' };
      }
      return { pos: [-6.8, 1.85, 29.5], target: [0.5, 3.2, 11.5], fov: 56, povKind: 'headset' };
    }
    if (camMode === 'loadmaster') {
      // Đứng bên mạn PHẢI (-X) nhìn trực diện Low-Deck High-Lift Loader (Hầm trước AKH), Hydrant Fuel & Belt Loader (Hầm Bulk sau)!
      return { pos: [-22.5, 2.7, 11.5], target: [-2.0, 2.5, 9.5], fov: 56, povKind: 'loadmaster' };
    }
    if (camMode === 'terminal') {
      // Đứng ngay mũi Đài quan sát ngoài trời Centrair Sky Deck (スカイデッキ) nhìn toàn cảnh Spot 7, PBB ngang & Vịnh Ise!
      const look = isFlightMode ? [ac.x * 0.65, Math.max(2, ac.y * 0.7 + 2), Math.min(20, ac.z)] : [0, 2, -10];
      return { pos: [0, 16.0, 47.0], target: look, fov: 54, povKind: 'terminal' };
    }
    if (camMode === 'gse_cab') {
      const vch = Math.cos(veh.heading), vsh = Math.sin(veh.heading);
      return {
        pos: [veh.x + vch * 0.4, 2.35, veh.z + vsh * 0.4],
        target: [veh.x + vch * 28, 1.65, veh.z + vsh * 28],
        fov: 64,
        povKind: 'gse_cab'
      };
    }
    if (camMode === 'backing') {
      // Dedicated semi-truck / TT trailer reverse bay-parking camera (supports smooth driveZoom!)
      const zMul = (extra && extra.driveZoom) ? extra.driveZoom : 1.0;
      const tr = (extra && extra.trailerPose) ? extra.trailerPose : veh;
      const bay = (extra && extra.backingBay) ? extra.backingBay : null;
      const focusX = bay ? (tr.x * 0.62 + bay.cx * 0.38) : (veh.x * 0.45 + tr.x * 0.55);
      const focusZ = bay ? (tr.z * 0.62 + bay.cz * 0.38) : (veh.z * 0.45 + tr.z * 0.55);
      return {
        pos: [focusX - 18.5 * zMul, 14.5 * zMul, focusZ + 17.5 * zMul],
        target: [focusX + 1.5, 1.4, focusZ],
        fov: 50,
        povKind: 'backing'
      };
    }
    if (camMode === 'top') {
      const zMul = (extra && extra.driveZoom) ? extra.driveZoom : 1.0;
      if (!isFlightMode && extra && extra.backingBay) {
        const bay = extra.backingBay;
        const midX = (veh.x + bay.cx) * 0.5;
        const midZ = (veh.z + bay.cz) * 0.5;
        return { pos: [midX, Math.min(180, 38 * zMul), midZ + 2.5], target: [midX, 0, midZ], fov: 48, povKind: 'top' };
      }
      return { pos: [0, Math.min(340, 228 * zMul), 18], target: [0, 0, -6], fov: 52, povKind: 'top' };
    }
    if (camMode === 'orbit') {
      const c = orbitCam;
      const ccp = Math.cos(c.pitch), ssp = Math.sin(c.pitch);
      return {
        pos: [c.tx + Math.sin(c.yaw) * ccp * c.dist, Math.max(3.5, c.ty + ssp * c.dist), c.tz + Math.cos(c.yaw) * ccp * c.dist],
        target: [c.tx, c.ty, c.tz],
        fov: 48,
        povKind: 'orbit'
      };
    }
    if (!isFlightMode && camMode === 'chase') {
      const zMul = (extra && extra.driveZoom) ? extra.driveZoom : 1.0;
      const vch = Math.cos(veh.heading), vsh = Math.sin(veh.heading);
      return {
        pos: [veh.x - vch * 22 * zMul, Math.max(5, 11.5 * zMul), veh.z - vsh * 22 * zMul],
        target: [veh.x + vch * 14, 1.8, veh.z + vsh * 14],
        fov: 54,
        povKind: 'chase'
      };
    }
    // Mặc định: flight_follow bám sát máy bay JP102
    const dist = (phaseIdx === 0 || phaseIdx === 9) ? 74 : 56;
    const elev = (phaseIdx === 0 || phaseIdx === 9) ? 24 : 22;
    return {
      pos: [ac.x + dist * 0.56, Math.max(8, ac.y + elev), ac.z + dist * 0.80],
      target: [ac.x, ac.y + 3.2, ac.z],
      fov: 48,
      povKind: 'flight_follow'
    };
  }

  // =========================================================================
