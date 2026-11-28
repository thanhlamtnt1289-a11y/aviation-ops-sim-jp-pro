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
      titleEn: 'Lightning & High-Wind Warning — Mandatory Ramp Closure',
      descJa: '空港周辺で落雷および強風警報が発令されました。給油・貨物搭載など屋外ランプ作業が危険な状態です。どう対応しますか？',
      descVi: 'Phát hiện sét gần sân bay và gió giật mạnh. Mọi hoạt động ngoài sân đỗ (tra dầu, bốc xếp) đang cực kỳ nguy hiểm. Bạn xử lý thế nào?',
      descEn: 'Lightning and gale-force wind alerts have been issued around the airport. Outdoor fueling and ramp loading are acutely hazardous. How do you respond?',
      options: [
        { ok: true, timeDelta: 5, safetyDelta: 0, procDelta: 0,
          ja: '直ちに給油・屋外ランプ作業を中断し、作業員を屋内へ退避（解除後に再開）',
          vi: 'Tạm dừng ngay lập tức tra dầu & thao tác ngoài trời, sơ tán nhân viên vào nơi an toàn (+5 phút chờ tạnh)',
          en: 'Immediately suspend refueling & outdoor ramp work and evacuate crew to indoor shelter (+5 min weather hold)' },
        { ok: false, timeDelta: 0, safetyDelta: -18, procDelta: -5,
          ja: '定時出発を優先し、小雨のうちに給油と積み込みを続行する',
          vi: 'Ưu tiên đúng giờ, cố tiếp tục tra dầu và xếp hàng trước khi mưa lớn',
          en: 'Prioritize on-time departure and continue refueling/loading while rain is still light' }
      ],
      reasonJa: '雷警報発令中のランプ作業・給油続行は感電・引火の重大リスクがあり、定時性より人命安全が絶対優先です。',
      reasonVi: 'Tuyệt đối không làm việc ngoài trời hay tra dầu khi có cảnh báo sét. An toàn tính mạng luôn đặt trên chỉ tiêu đúng giờ.',
      reasonEn: 'Working outdoors or refueling during a lightning alert carries lethal electrocution and vapor-ignition risks; life safety always overrides on-time departure.'
    },
    {
      id: 'defect',
      titleJa: '機材不具合発見（後部貨物室ドア付近の軽微な凹み・油漏れ疑い）',
      titleVi: 'Phát hiện lỗi kỹ thuật (Vết móp cửa hầm hàng / nghi rò rỉ dầu thủy lực)',
      titleEn: 'Airframe Defect Found (Minor Dent & Suspected Hydraulic Leak Near Aft Cargo Door)',
      descJa: '搭載作業員が後部貨物室フレーム付近に傷と液体のにじみを発見しました。',
      descVi: 'Nhân viên bốc xếp phát hiện vết xước móp gần khung cửa hầm hàng sau kèm vệt chất lỏng nghi dầu.',
      descEn: 'Ramp loaders spot a surface dent and fluid seepage near the aft cargo door frame.',
      options: [
        { ok: true, timeDelta: 4, safetyDelta: 0, procDelta: 0,
          ja: '作業を一時停止し、直ちに整備士（Maintenance）へ報告して耐空性点検を依頼',
          vi: 'Dừng thao tác khu vực đó và báo ngay cho Kỹ thuật viên bảo dưỡng (整備士) kiểm tra xác nhận (+4 phút)',
          en: 'Pause loading at that door and immediately summon Aircraft Maintenance for airworthiness sign-off (+4 min)' },
        { ok: false, timeDelta: 0, safetyDelta: -20, procDelta: -10,
          ja: '軽微に見えるため拭き取って報告せず、そのままドアを閉めて出発させる',
          vi: 'Thấy vết nhỏ nên lau sạch, không báo cáo để khỏi trễ chuyến',
          en: 'Wipe away the fluid without reporting and close the door to avoid delay' }
      ],
      reasonJa: '機体損傷や油漏れの隠蔽・未報告は重大航空事故に直結します。疑わしい事象は必ず整備部門へ報告します。',
      reasonVi: 'Che giấu hư hỏng thân vỏ hay rò rỉ kỹ thuật có thể dẫn đến tai nạn nghiêm trọng. Mọi bất thường bắt buộc phải báo Maintenance.',
      reasonEn: 'Concealing skin damage or fluid leaks can cause catastrophic in-flight failure; every suspected defect must be inspected by Maintenance.'
    },
    {
      id: 'late_cargo',
      titleJa: '遅着乗継手荷物・緊急貨物（120kg）が締切直前に到着',
      titleVi: 'Hành lý nối chuyến / Hàng khẩn (120 kg) đến sát giờ đóng hầm',
      titleEn: 'Late Transfer Baggage / Rush Cargo (120 kg) Arrives Just Before Close-out',
      descJa: '他便からの遅着乗継手荷物120kgが到着しました。すでにLoad Sheet暫定版が出ています。',
      descVi: '120 kg hành lý nối chuyến từ chuyến bay trễ vừa tới sân đỗ khi Load Sheet tạm đã phát hành.',
      descEn: '120 kg of late connecting baggage arrives on stand after the preliminary Load Sheet has been issued.',
      options: [
        { ok: true, timeDelta: 3, safetyDelta: 0, procDelta: 0,
          ja: 'ロードコントロールへ連絡し、LMC（直前変更）と制限重量・CGを確認した上で搭載可否を決定',
          vi: 'Báo Load Control kiểm tra giới hạn tải/CG và lập LMC (Last Minute Change) trước khi xếp lên hầm (+3 phút)',
          en: 'Contact Load Control to verify weight/CG limits and record an official LMC (Last Minute Change) before loading (+3 min)' },
        { ok: false, timeDelta: 0, safetyDelta: -15, procDelta: -12,
          ja: '時間が惜しいためロードマスターに報告せずバルク室へそのまま積み込む',
          vi: 'Gấp quá nên cứ chất đại lên hầm Bulk mà không báo Load Control',
          en: 'Load it directly into the Bulk hold without notifying Load Control to save time' }
      ],
      reasonJa: '無報告搭載は重量重心計算（Load Sheet）の誤差を生み、離陸性能やCG制限逸脱を引き起こす重大違反です。',
      reasonVi: 'Xếp tải không khai báo làm sai lệch Load Sheet và trọng tâm máy bay (CG) — vi phạm an toàn bay nghiêm trọng.',
      reasonEn: 'Unreported loading invalidates Load Sheet CG and stabilizer trim calculations — a severe flight safety violation.'
    },
    {
      id: 'staff',
      titleJa: '人員不足発生（隣接スポット遅延により応援要員が遅れ）',
      titleVi: 'Thiếu nhân lực đột xuất (Nhân sự hỗ trợ bị kẹt ở bãi đỗ kế bên)',
      titleEn: 'Ramp Staffing Shortage (Support Crew Delayed at Adjacent Gate)',
      descJa: '搭載チームが2名不足しています。安全手順を守りながら遅延を最小化する対応は？',
      descVi: 'Đội bốc xếp thiếu 2 người do chuyến kế bên trễ. Cách xử lý tối ưu vừa đảm bảo an toàn vừa giảm trễ là gì?',
      descEn: 'Your loading team is short by 2 handlers due to an adjacent late arrival. How do you minimize delay safely?',
      options: [
        { ok: true, timeDelta: 3, safetyDelta: 0, procDelta: 0,
          ja: 'スーパーバイザーへ応援要請し、クリティカルパス（降機・清掃・搭載）を優先しつつ安全確認は省略しない',
          vi: 'Báo Supervisor điều phối hỗ trợ, ưu tiên đường găng (dỡ/vệ sinh/xếp) và KHÔNG cắt bỏ bước kiểm tra an toàn (+3 phút)',
          en: 'Request backup from Supervisor, prioritize critical-path tasks, and NEVER skip guidemen or Point-and-Call safety checks (+3 min)' },
        { ok: false, timeDelta: 0, safetyDelta: -14, procDelta: -10,
          ja: '時間短縮のため安全監視員（ガイドマン）や指差呼称を省いて一人で車両を後退させる',
          vi: 'Bỏ người xi-nhan (guideman) và bỏ bước 指差呼称 để lùi xe GSE nhanh hơn',
          en: 'Skip guideman marshalling and Point-and-Call to reverse GSE solo and save time' }
      ],
      reasonJa: '人員不足時こそ車両接触事故が多発します。ガイドマン配置や指差呼称などの安全基本動作は絶対に省略できません。',
      reasonVi: 'Thiếu người là lúc dễ xảy ra va chạm xe GSE vào tàu bay nhất. Tuyệt đối không được cắt bỏ người xi-nhan hay bước 指差呼称.',
      reasonEn: 'Understaffed rushes cause most GSE-to-aircraft collisions; guidemen and Point-and-Call checks must never be omitted.'
    },
    {
      id: 'delay_arr',
      titleJa: '到着遅延（機材繰りにより5分遅れでオンブロック）',
      titleVi: 'Tàu bay đến trễ 5 phút (Arrival Delay)',
      titleEn: 'Late Inbound Arrival (On-Block 5 Minutes Behind Schedule)',
      descJa: '到着が5分遅れ、定時出発までの余裕が圧迫されています。どう進めますか？',
      descVi: 'Chuyến bay vào bãi trễ 5 phút, quỹ thời gian turnaround bị thu hẹp. Bạn điều phối ra sao?',
      descEn: 'The inbound aircraft arrives 5 minutes late, compressing turnaround margin. How do you proceed?',
      options: [
        { ok: true, timeDelta: 4, safetyDelta: 0, procDelta: 0,
          ja: '安全条件を満たす並行作業（降機取卸し・給油・ラバトリー等）を効率化し、関係部門へ見込み出発時刻を共有',
          vi: 'Tối ưu làm song song các công việc hợp lệ (dỡ hàng, tra dầu, vệ sinh) đúng chuẩn an toàn và báo sớm giờ ETD mới',
          en: 'Streamline approved parallel tasks (offload, fueling, lavatory) after safety clearance and coordinate updated ETD early' },
        { ok: false, timeDelta: 1, safetyDelta: -15, procDelta: -10,
          ja: '輪止め設置とエンジン完全停止を待たずに車両を接近させ作業を開始する',
          vi: 'Cho xe GSE lao vào tiếp cận trước khi chèn bánh và tắt đèn beacon để tiết kiệm thời gian',
          en: 'Rush GSE inside ERA before wheel chocks are set and before the red beacon turns OFF' }
      ],
      reasonJa: 'エンジン稼働中・衝突防止灯点灯中の接近は吸込・ブラストによる死亡事故リスクがあり厳禁です。',
      reasonVi: 'Tiếp cận tàu bay khi đèn beacon còn sáng / động cơ chưa tắt hoàn toàn là lỗi cực kỳ nguy hiểm (rủi ro hút vào động cơ / luồng phản lực).',
      reasonEn: 'Approaching while engines are spooling down or the red beacon is ON risks fatal engine ingestion or jet-blast injury.'
    }
  ];

export const PAX_SCENARIOS = [
    {
      id: 'P1',
      titleJa: 'ケース1: オーバーブッキング（座席超過）発生',
      titleVi: 'Case 1: Overbooking (Bán vé vượt số ghế thực tế)',
      titleEn: 'Case 1: Overbooked Flight (2 Seats Short at Gate)',
      descJa: '羽田発便が満席で2名分の座席が不足しています。地上係員として最初に取るべき適切な対応は？',
      descVi: 'Chuyến khởi hành từ Haneda bị dư 2 khách so với số ghế thực tế. Nhân viên mặt đất nên xử lý bước đầu thế nào?',
      descEn: 'A departing Haneda flight is oversold by 2 seats. What is the proper first action for passenger service staff?',
      options: [
        { ok: true, ja: '搭乗口でフレキシブル・トラベラー（協力金・振替便提供のボランティア）を募集し、丁寧にお詫びと代替便手配を行う', vi: 'Thông báo tìm hành khách tình nguyện đổi chuyến (Volunteer) kèm bồi thường + chuyển chuyến thay thế và xin lỗi trang trọng', en: 'Solicit Flex-Traveler volunteers at the gate with compensation and rebooking onto an alternate flight, offering a sincere apology' },
        { ok: false, ja: '一番最後にチェックインした乗客を事前説明なしで強制降機させる', vi: 'Tự ý từ chối khách check-in cuối cùng mà không kêu gọi tình nguyện viên trước', en: 'Involuntarily offload the last checked-in passenger without explanation or seeking volunteers' },
        { ok: false, ja: '補助席（ジャンプシート）に一般旅客を座らせて出発する', vi: 'Cho hành khách thường ngồi tạm ghế jumpseat của tiếp viên', en: 'Seat regular passengers on cabin crew jumpseats' },
        { ok: false, ja: '出発直前まで告知せず搭乗口を閉鎖する', vi: 'Im lặng tới sát giờ rồi đóng cửa boarding gate', en: 'Say nothing until departure time and abruptly close the boarding gate' }
      ],
      expJa: '日本の航空実務ではまず協力者（ボランティア）を募り、協力金・代替便・宿泊等の補償案内を行うのが原則です。',
      expVi: 'Theo thông lệ hàng không Nhật Bản & quốc tế, luôn kêu gọi tình nguyện viên (Flex Traveler) kèm bồi thường/đổi chuyến trước khi áp dụng từ chối vận chuyển bắt buộc.',
      expEn: 'Standard Japanese and IATA practice requires soliciting voluntary Flex Travelers with compensation, meals/hotel, and rebooking before involuntary denied boarding.'
    },
    {
      id: 'P2',
      titleJa: 'ケース2: 国際線チェックイン時のパスポート紛失',
      titleVi: 'Case 2: Hành khách làm mất hộ chiếu tại quầy check-in quốc tế',
      titleEn: 'Case 2: Lost Physical Passport at International Check-in',
      descJa: '成田発国際線のお客様が「空港内でパスポートを落とした、写真コピーならスマホにある」と申し出ました。',
      descVi: 'Hành khách chuyến quốc tế tại Narita báo rơi hộ chiếu trong sân bay và chỉ có ảnh chụp hộ chiếu trên điện thoại.',
      descEn: 'An international passenger at Narita reports losing their physical passport inside the terminal and shows only a smartphone photo.',
      options: [
        { ok: true, ja: '原本なしでは搭乗不可であることを丁寧に説明し、空港遺失物センター・警察届出・予約変更・手荷物返却を案内する', vi: 'Giải thích lịch sự rằng ảnh chụp không thể xuất cảnh, hỗ trợ báo trung tâm thất lạc/cảnh sát sân bay, đổi vé & trả hành lý nếu đã gửi', en: 'Politely explain that an original passport is mandatory, assist with Airport Lost & Found / Police report, rebook, and offload/return any checked bags' },
        { ok: false, ja: 'スマホの鮮明な画像があれば搭乗券を発券して出国審査へ案内する', vi: 'Ảnh chụp rõ nét nên vẫn cấp thẻ lên tàu cho khách đi qua hải quan', en: 'Issue a boarding pass based on the clear smartphone photo' },
        { ok: false, ja: '誓約書を書かせて搭乗させる', vi: 'Cho khách viết giấy cam kết rồi cho lên máy bay', en: 'Have the passenger sign a waiver form and board the international flight' },
        { ok: false, ja: '手荷物だけ先に目的地へ送る', vi: 'Vẫn gửi hành lý ký gửi đi trước cho nhẹ', en: 'Dispatch the passenger\'s checked baggage ahead to the destination alone' }
      ],
      expJa: '国際線は有効なパスポート原本が必須です。また旅客が搭乗しない手荷物を単独搭載すること（PPBM違反）は航空保安上厳禁です。',
      expVi: 'Bay quốc tế bắt buộc có hộ chiếu gốc hợp lệ. Đặc biệt cấm gửi hành lý khi hành khách không lên máy bay (vi phạm nguyên tắc an ninh PPBM).',
      expEn: 'International travel requires a valid physical passport, and sending checked bags without the passenger onboard violates PPBM aviation security rules.'
    },
    {
      id: 'P3',
      titleJa: 'ケース3: 預け入れ手荷物が1個36kg（単体重量上限超過）',
      titleVi: 'Case 3: Một kiện hành lý ký gửi nặng 36 kg (Vượt ngưỡng đơn kiện 32 kg)',
      titleEn: 'Case 3: Single Checked Bag Weighing 36 kg (Over 32 kg Safety Cap)',
      descJa: 'お客様が大型スーツケース1個（36kg）を預けたいと希望。超過料金を払うからこのまま預けてほしいと言っています。',
      descVi: 'Hành khách mang 1 vali nặng 36 kg và sẵn sàng đóng phí quá cân để gửi nguyên kiện.',
      descEn: 'A passenger presents one 36 kg suitcase and offers to pay excess baggage fees to check it as a single piece.',
      options: [
        { ok: true, ja: '地上作業員の労働安全および航空会社規定（単体最大32kg）を説明し、2個に分割していただくか航空貨物扱いをご案内する', vi: 'Giải thích quy định an toàn lao động tối đa 32 kg/kiện, đề nghị chia sang 2 kiện nhỏ hơn hoặc chuyển gửi theo đường hàng hóa (Cargo)', en: 'Explain the 32 kg occupational safety limit per piece and assist with repacking into 2 bags or shipping via Air Cargo' },
        { ok: false, ja: '超過料金を徴収すれば何キロでもHEAVYタグを貼って受託する', vi: 'Chỉ cần thu đủ phí quá cân và dán nhãn HEAVY là nhận không giới hạn', en: 'Collect excess fees, attach a HEAVY tag, and accept any weight' },
        { ok: false, ja: '計量器の表示を32kgと手入力で修正して通す', vi: 'Nhập tay 32 kg lên hệ thống cho xong thủ tục', en: 'Manually override the scale weight to 32 kg in the system' },
        { ok: false, ja: 'そのまま機内持込手荷物にしてもらう', vi: 'Bảo khách xách tay luôn lên cabin', en: 'Tell the passenger to carry the 36 kg suitcase into the cabin' }
      ],
      expJa: '多くの航空会社・労働安全基準では1個あたり最大32kgが上限です。重量虚偽入力はW&B計算の誤差を招き絶対厳禁です。',
      expVi: 'Quy chuẩn an toàn sân đỗ giới hạn tối đa 32 kg/kiện để tránh chấn thương nhân viên bốc xếp. Tuyệt đối không khai sai trọng lượng vì làm sai lệch W&B.',
      expEn: 'Single checked bags are capped at 32 kg to protect ramp handlers from injury, and falsifying bag weights corrupts aircraft W&B calculations.'
    },
    {
      id: 'P4',
      titleJa: 'ケース4: 搭乗口での機内持込サイズ超過（ゲートチェック）',
      titleVi: 'Case 4: Hành lý xách tay quá kích thước tại cửa lên tàu (Gate Check)',
      titleEn: 'Case 4: Oversized Carry-on Gate-Checked at Boarding Gate',
      descJa: '搭乗口で規格外キャリーケースを貨物室預け（ゲートチェック）に切り替える際、必ず確認すべき最重要事項は？',
      descVi: 'Khi phải chuyển vali xách tay quá khổ xuống hầm hàng ngay tại cửa lên tàu (gate-check), điều quan trọng nhất phải kiểm tra là gì?',
      descEn: 'When converting an oversized carry-on roller bag to gate-checked hold baggage, what critical check is mandatory?',
      options: [
        { ok: true, ja: 'モバイルバッテリー・予備リチウム電池・電子タバコ・貴重品・常備薬を必ず取り出して機内へお持ちいただく', vi: 'Bắt buộc yêu cầu khách lấy ra toàn bộ pin dự phòng/pin lithium rời, thuốc lá điện tử, giấy tờ & đồ quý giá mang lên cabin', en: 'Ensure all power banks, spare lithium batteries, e-cigarettes, valuables, and essential medications are removed and carried into the cabin' },
        { ok: false, ja: 'タグだけ貼ってそのまま素早く貨物室へ運ぶ', vi: 'Dán thẻ ngay và chuyển thẳng xuống hầm hàng cho kịp giờ', en: 'Tag it immediately and send it straight down to the cargo hold without asking' },
        { ok: false, ja: '電源が切れていればモバイルバッテリーは入れたままでよい', vi: 'Pin dự phòng tắt nguồn rồi thì để nguyên trong vali ký gửi được', en: 'Power banks may stay inside checked bags as long as they are switched off' },
        { ok: false, ja: 'お客様に自分で貨物室ベルトまで運んでもらう', vi: 'Nhờ khách tự mang xuống băng chuyền sân đỗ', en: 'Ask the passenger to walk onto the apron and load it onto the belt loader themselves' }
      ],
      expJa: '予備リチウムイオン電池（モバイルバッテリー）は発火リスクのため貨物室への預け入れが法令・IATA規定で禁止されています。',
      expVi: 'Pin lithium rời / sạc dự phòng bị CẤM tuyệt đối trong hành lý ký gửi do nguy cơ cháy nhiệt trong hầm hàng không thể dập trực tiếp.',
      expEn: 'Spare lithium-ion batteries and power banks are strictly prohibited in cargo holds under Civil Aeronautics Law and IATA DGR due to thermal runaway fire risk.'
    },
    {
      id: 'P5',
      titleJa: 'ケース5: 電動車椅子（WCHC）旅客とタイトな乗継',
      titleVi: 'Case 5: Hành khách xe lăn điện (WCHC) & Nối chuyến thời gian sát',
      titleEn: 'Case 5: Electric Wheelchair (WCHC) Passenger with Tight Connection',
      descJa: '歩行困難で電動車椅子を使用されるお客様（WCHC）がチェックイン。乗継時間も短めです。適切な対応は？',
      descVi: 'Hành khách không tự đi lại được dùng xe lăn điện (WCHC) làm thủ tục và có chuyến nối tiếp khá sát giờ. Cần làm gì?',
      descEn: 'An immobile passenger using a battery-powered wheelchair (SSR WCHC) checks in with a tight onward connection. What is the proper procedure?',
      options: [
        { ok: true, ja: 'バッテリー種別（乾式/湿式/リチウム）と短絡防止措置を確認し、非常口以外の適切な座席指定・搭乗口/乗継先への事前連携を行う', vi: 'Kiểm tra loại ắc quy/pin & ngắt cực chống đoản mạch, xếp ghế phù hợp (KHÔNG phải hàng thoát hiểm), thông báo trước cho cửa khởi hành & điểm nối chuyến', en: 'Verify battery type (dry/wet/lithium) & terminal insulation per DGR, assign a non-exit-row seat, arrange aisle-chair priority boarding, and pre-alert transfer staff' },
        { ok: false, ja: '足元が広いため非常口座席（Exit Row）を割り当てる', vi: 'Xếp khách vào hàng ghế thoát hiểm (Exit Row) vì chỗ để chân rộng', en: 'Assign an Emergency Exit Row seat for extra legroom' },
        { ok: false, ja: '電動車椅子はそのままバッテリー点検なしで貨物室に載せる', vi: 'Cứ đưa xe lăn điện xuống hầm hàng mà không cần kiểm tra pin', en: 'Load the electric wheelchair into the hold without checking battery specifications' },
        { ok: false, ja: '乗継先への連絡はお客様自身に行ってもらう', vi: 'Để khách tự liên hệ nhân viên ở sân bay nối chuyến', en: 'Tell the passenger to arrange their own transfer assistance upon arrival' }
      ],
      expJa: '非常口座席は緊急脱出援助ができる旅客限定です。電動車椅子は危険物規定に基づきバッテリー確認・絶縁処理、WCHCは事前連携と優先搭乗が必須です。',
      expVi: 'Hàng ghế thoát hiểm cấm xếp hành khách PRM/xe lăn. Xe lăn điện phải kiểm tra pin & cách điện theo quy định DGR, đồng thời phối hợp sớm với cổng nối chuyến.',
      expEn: 'PRM passengers cannot sit in exit rows; electric wheelchairs require DGR battery inspection/insulation, pre-boarding aisle chair support, and downline transfer coordination.'
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
      titleEn: 'DGR-1: Lithium-ion Batteries Contained in Equipment (UN3481 / Section II)',
      descJa: 'ノートPC 5台（1梱包あたり電池100Wh以下）。外装に「リチウム電池マーク（UN3481）」が明瞭に貼付され、損傷なし。旅客便への受託は？',
      descVi: '5 laptop (pin ≤100Wh/pin), kiện nguyên vẹn, dán rõ nhãn Lithium Battery Mark (UN3481). Có chấp nhận lên chuyến chở khách không?',
      descEn: '5 laptops (each battery ≤100 Wh) in an undamaged outer carton clearly displaying the Lithium Battery Mark (UN3481). Can this be accepted on a passenger flight?',
      options: [
        { ok: true, ja: '受託可（ACCEPT）— Section II基準およびリチウム電池マーク・梱包健全性を満たす', vi: 'CHẤP NHẬN (ACCEPT) — Đạt tiêu chuẩn Section II, nhãn UN3481 rõ ràng, bao bì nguyên vẹn', en: 'ACCEPT — Complies with PI967 Section II limits, UN3481 Lithium Battery Mark, and undamaged packaging' },
        { ok: false, ja: '受託不可（REJECT）— リチウム電池はすべて貨物専用機（CAO）のみ', vi: 'TỪ CHỐI (REJECT) — Mọi pin lithium đều cấm lên máy bay chở khách', en: 'REJECT — All lithium batteries are restricted to Cargo Aircraft Only (CAO)' }
      ],
      expJa: 'UN3481（機器同梱/組込）でSection II基準を満たし適切に表示・梱包されていれば、旅客機へ受託可能です（UN3480単体電池は旅客機禁止）。',
      expVi: 'UN3481 (pin kèm/trong thiết bị) đạt chuẩn Section II được phép đi máy bay chở khách. Ngược lại, pin rời UN3480 bị cấm trên máy bay chở khách.',
      expEn: 'UN3481 (contained in/packed with equipment) meeting Section II criteria is acceptable on passenger aircraft, whereas standalone UN3480 cargo is forbidden on passenger flights.'
    },
    {
      id: 'D2',
      labelType: 'class9_dryice',
      titleJa: 'DGR-2: ドライアイス（UN1845 / Class 9）保冷貨物',
      titleVi: 'DGR-2: Đá khô bảo quản lạnh (UN1845 / Class 9)',
      titleEn: 'DGR-2: Dry Ice Refrigerant Shipment (UN1845 / Class 9)',
      descJa: '生鮮食品の保冷用ドライアイス（正味3.0kg）。ガス抜き可能な発泡箱、Class 9ラベル＋UN1845＋正味重量(3.0kg)記載あり。危険物申告書（DGD）は無い。',
      descVi: 'Đá khô làm lạnh thực phẩm (3.0 kg net), thùng xốp thoát khí tốt, có nhãn Class 9 + UN1845 + ghi 3.0 kg net, KHÔNG kèm tờ khai DGD.',
      descEn: '3.0 kg net Dry Ice cooling non-dangerous seafood in a vented insulated carton bearing Class 9 label, UN1845, and "Net Wt 3.0 kg", without a Shipper\'s Declaration (DGD).',
      options: [
        { ok: true, ja: '受託可（ACCEPT）— 非危険物の保冷用ドライアイスはAWB記載・Class 9表示・正味重量表示があればDGD不要', vi: 'CHẤP NHẬN (ACCEPT) — Đá khô dùng làm lạnh hàng thường không cần DGD nếu đã có nhãn Class 9, UN1845, ghi net weight & khai trên AWB', en: 'ACCEPT — Dry Ice refrigerating non-DG cargo requires no DGD when vented, labeled Class 9 / UN1845 + Net Weight, and declared on the AWB' },
        { ok: false, ja: '受託不可（REJECT）— 密閉容器に入れ替えさせないと受託できない', vi: 'TỪ CHỐI (REJECT) — Phải yêu cầu đóng kín khí hoàn toàn mới nhận', en: 'REJECT — Require the shipper to repack Dry Ice into a hermetically sealed airtight drum' }
      ],
      expJa: 'ドライアイスは昇華してCO2ガスを発生するため、密閉容器は破裂の危険があり厳禁です。換気可能容器＋正味重量表示＋NOTOC確認が重要です。',
      expVi: 'Đá khô thăng hoa sinh khí CO2 nên CẤM đóng kín khí (nguy cơ nổ thùng). Cần bao bì thoát khí, ghi rõ khối lượng tịnh và báo NOTOC cho cơ trưởng.',
      expEn: 'Dry Ice sublimates into CO2 gas and will burst airtight containers; vented packaging, Class 9/UN1845 net weight marking, and NOTOC entry are required.'
    },
    {
      id: 'D3',
      labelType: 'class3',
      titleJa: 'DGR-3: 香水類（UN1266 / Class 3 引火性液体）— 梱包濡れ・申告書不備',
      titleVi: 'DGR-3: Nước hoa (UN1266 / Class 3 Chất lỏng dễ cháy) — Thùng ướt & thiếu DGD',
      titleEn: 'DGR-3: Perfumery Products (UN1266 / Class 3) — Leaking Stain & Unsigned DGD',
      descJa: 'Class 3ラベル貼付の段ボール箱に液漏れによるシミがあり、危険物申告書（Shipper\'s Declaration）の荷送人署名も抜けています。',
      descVi: 'Thùng hàng dán nhãn Class 3 có vết ẩm ướt nghi rò rỉ chất lỏng, tờ khai Shipper\'s Declaration thiếu chữ ký người gửi.',
      descEn: 'A fiberboard box with a Class 3 Flammable Liquid label shows damp staining/odor, and the Shipper\'s Declaration (DGD) is missing the shipper\'s signature.',
      options: [
        { ok: false, ja: '受託可（ACCEPT）— テープで補強し、係員が代わりに署名して搭載する', vi: 'CHẤP NHẬN (ACCEPT) — Dán băng keo gia cố lại và nhân viên ký thay cho kịp chuyến', en: 'ACCEPT — Tape over the wet corner and sign the DGD on the shipper\'s behalf' },
        { ok: true, ja: '受託拒否（REJECT）— 液漏れ疑い・梱包損傷・DGD不備はいずれもIATA DGRチェックリスト不合格', vi: 'TỪ CHỐI (REJECT) — Rò rỉ/hư hỏng bao bì và thiếu chữ ký trên DGD đều không đạt IATA DGR Acceptance Checklist', en: 'REJECT — Suspected leakage/damaged packaging and an unsigned DGD both fail the IATA DGR Acceptance Checklist' }
      ],
      expJa: '漏れや損傷がある危険物、および申告書不備のある貨物は絶対に受託できません。係員による代筆・改ざんも厳禁です。',
      expVi: 'Kiện hàng nguy hiểm bị rò rỉ/rách hoặc thiếu chữ ký chủ hàng trên DGD bắt buộc phải TỪ CHỐI. Tuyệt đối không sửa hộ tờ khai.',
      expEn: 'Damaged or leaking DG packages and incomplete DGDs must always be rejected; airline staff may never sign or alter a Shipper\'s Declaration.'
    },
    {
      id: 'D4',
      labelType: 'class2',
      titleJa: 'DGR-4: 一般貨物申告だが「キャンプ用品」からガス缶反応（未申告危険物）',
      titleVi: 'DGR-4: Hàng thường khai "Đồ cắm trại" nhưng X-ray phát hiện bình gas (Hàng nguy hiểm không khai báo)',
      titleEn: 'DGR-4: General Cargo "Camping Gear" Reveals Butane Gas Canisters on X-Ray (Undeclared DG)',
      descJa: '「Camping Equipment（一般貨物）」として搬入された箱をX線検査したところ、カセットガスボンベ（引火性ガス Class 2.1）が複数本写りました。',
      descVi: 'Kiện hàng khai là "Camping Equipment" (hàng thường) nhưng soi X-ray thấy nhiều bình gas mini (Class 2.1 Khí dễ cháy).',
      descEn: 'X-ray screening of general cargo declared as "Camping Equipment" reveals multiple pressurized butane gas cartridges (Class 2.1 Flammable Gas).',
      options: [
        { ok: true, ja: '即時受託停止・隔離し、未申告危険物（Undeclared DG）として保安・安全部門および当局規程に従い報告する', vi: 'Dừng tiếp nhận & cách ly ngay, báo cáo theo quy trình Hàng nguy hiểm không khai báo (Undeclared DG)', en: 'Immediately stop acceptance, quarantine the shipment, and report it as Undeclared Dangerous Goods per JCAB/SMS security procedures' },
        { ok: false, ja: '一般貨物としてそのまま搭載し、到着後に注意する', vi: 'Cho qua lần này rồi nhắc nhở người gửi sau', en: 'Load it as general cargo anyway and warn the shipper after arrival' }
      ],
      expJa: '未申告危険物（Hidden / Undeclared DG）は航空火災の最大要因の一つです。発見時は即時受託拒否・所定報告を行います。',
      expVi: 'Hàng nguy hiểm ẩn / không khai báo (Undeclared DG) là mối nguy cháy nổ hàng đầu trên không. Phải từ chối và lập báo cáo sự cố ngay.',
      expEn: 'Hidden/Undeclared Dangerous Goods are a leading cause of in-flight cargo fires; intercept, isolate, and file an official DG occurrence report immediately.'
    },
    {
      id: 'D5',
      labelType: 'cao',
      titleJa: 'DGR-5: 「CAO（Cargo Aircraft Only）」ラベル貼付貨物を旅客便へ予約',
      titleVi: 'DGR-5: Kiện hàng dán nhãn CAO (Chỉ bay tàu chở hàng) đặt chỗ trên chuyến chở khách',
      titleEn: 'DGR-5: "CAO (Cargo Aircraft Only)" Corrosive Shipment Booked on Passenger Flight',
      descJa: '腐食性物質（Class 8）にオレンジ色の「CARGO AIRCRAFT ONLY（CAO）」ラベルが貼られた貨物が、旅客便（A320）の搭載予定リストに入っています。',
      descVi: 'Kiện chất ăn mòn (Class 8) có dán nhãn cam "CARGO AIRCRAFT ONLY (CAO)" được lên danh sách xếp lên chuyến bay chở khách A320.',
      descEn: 'A Class 8 Corrosive drum bearing an orange "CARGO AIRCRAFT ONLY (CAO)" label appears on the planned load list for a passenger A320.',
      options: [
        { ok: true, ja: '旅客便への搭載を拒否（REJECT）し、貨物専用機（Freighter）への振替を手配する', vi: 'TỪ CHỐI xếp lên chuyến chở khách và yêu cầu chuyển sang tàu bay chuyên chở hàng (Freighter)', en: 'REJECT from the passenger flight and rebook onto an all-cargo Freighter aircraft' },
        { ok: false, ja: 'バルク室の奥に積めば旅客室と離れているので搭載してよい', vi: 'Xếp sâu vào hầm Bulk cho xa khoang khách là bay được', en: 'Load it in the rear bulk hold away from passengers' }
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

// Spot 7 stand centreline (scene x). Placed midway between Spot 6's wingtip and the Centre Pier wall
// (x = 28.75) so every type in the fleet — incl. B777-300ER / A350 / B777F (span ≈ 65 m) — parks at 1:1
// scale with ≥ 6 m wingtip clearance to the pier and ≥ 7 m to an aircraft on Spot 6.
export const NGO_STAND7_X = -10;

export const A3D_SPOTS = [
    { id: '101', ngoNo: '6', name: 'NGO Spot 6 (B737-800 / Bulk)', acType: 'B738', cx: -68, cz: 10, wingHalf: 18, fuseLen: 39, bodyColor: [242, 245, 250], tailColor: [27, 79, 156], era: { x1: -90, x2: -45, z1: -14, z2: 34 }, loadPt: { x: -78, z: 20 } },
    { id: '102', ngoNo: '7', name: 'NGO Spot 7 (A320 – B777 / Code E)', acType: 'A320', cx: NGO_STAND7_X, cz: 10, wingHalf: 32.5, eraHalfL: 39, eraCz: -8, fuseLen: 74, bodyColor: [245, 247, 250], tailColor: [20, 92, 168], era: { x1: NGO_STAND7_X - 34, x2: NGO_STAND7_X + 34, z1: -28, z2: 48 }, loadPt: { x: NGO_STAND7_X - 10, z: 20 } },
    { id: '103', ngoNo: '14', name: 'NGO Spot 14 (B787-8 / Dual PBB)', acType: 'B788', cx: 98, cz: 10, wingHalf: 24, fuseLen: 56, bodyColor: [244, 246, 250], tailColor: [30, 64, 128], era: { x1: 70, x2: 126, z1: -18, z2: 38 }, loadPt: { x: 84, z: 21 } }
  ];

  // Solid 1:1 Meter Building & Infrastructure Colliders on Chubu Centrair (RJGG) Island
  // ===================================================================================
  // NGO NORTH CARGO DISTRICT (貨物地区) — single source of truth for 3D scene, obstacles & minimap
  // Source: Centrair 将来構想 (2021) facility list & floor areas; centrair.jp cargo facility guide
  //   第1国際貨物上屋 41,757㎡ · 第2 13,772㎡ · 第3 16,351㎡ · 国内エアライン上屋 2,020㎡ ·
  //   国内フォワーダー上屋 1,590㎡ (all 2-storey steel) + トラック待機場, 燻蒸施設, 貨物事務棟, 北ゲート.
  //   Landside faces carry the 20m truck canopy (庇); airside faces open onto the cargo apron (#101–#119).
  // Footprints = floor area ÷ 2 floors. Building order along the apron is approximate.
  // Coordinates: +X North, +Z East (airside face = low Z, landside/truck face = high Z).
  // ===================================================================================
  export const NGO_CARGO_DISTRICT = [
    { id: 'ict1', kind: 'intl', x1: 560, x2: 830, z1: 78, z2: 156, h: 15.5, floorM2: 41757, canopy: true,
      ja: '第1国際貨物上屋', vi: 'Kho hàng Quốc tế số 1', en: "Int'l Cargo Terminal 1", sign: 'INTERNATIONAL CARGO TERMINAL 1' },
    { id: 'ict2', kind: 'intl', x1: 850, x2: 965, z1: 78, z2: 138, h: 13.5, floorM2: 13772, canopy: true,
      ja: '第2国際貨物上屋', vi: 'Kho hàng Quốc tế số 2', en: "Int'l Cargo Terminal 2", sign: 'INTERNATIONAL CARGO TERMINAL 2' },
    { id: 'ict3', kind: 'intl', x1: 985, x2: 1115, z1: 78, z2: 141, h: 13.5, floorM2: 16351, canopy: true,
      ja: '第3国際貨物上屋', vi: 'Kho hàng Quốc tế số 3', en: "Int'l Cargo Terminal 3", sign: 'INTERNATIONAL CARGO TERMINAL 3' },
    { id: 'dom_air', kind: 'dom', x1: 1135, x2: 1180, z1: 78, z2: 100, h: 9.5, floorM2: 2020, canopy: false,
      ja: '国内エアライン上屋', vi: 'Kho hàng Nội địa (Hãng bay)', en: 'Domestic Airline Cargo Shed', sign: 'DOMESTIC AIRLINE CARGO' },
    { id: 'dom_fwd', kind: 'dom', x1: 1135, x2: 1175, z1: 114, z2: 134, h: 9.5, floorM2: 1590, canopy: false,
      ja: '国内フォワーダー上屋', vi: 'Kho Đại lý Nội địa (Forwarder)', en: 'Domestic Forwarder Shed', sign: 'DOMESTIC FORWARDER' },
    { id: 'fumig', kind: 'fumig', x1: 1200, x2: 1232, z1: 80, z2: 102, h: 7.5, floorM2: 0, canopy: false,
      ja: '燻蒸施設', vi: 'Khu xông khử trùng', en: 'Fumigation Facility', sign: 'FUMIGATION' },
    { id: 'cargo_office', kind: 'office', x1: 598, x2: 662, z1: 196, z2: 224, h: 19, floorM2: 0, canopy: false,
      ja: '貨物事務棟（1F ローソン）', vi: 'Tòa văn phòng Cargo (Lawson tầng 1)', en: 'Cargo Office Building (Lawson 1F)', sign: 'CARGO OFFICE' },
    { id: 'truck_yard', kind: 'truckyard', x1: 690, x2: 1010, z1: 186, z2: 242, h: 0, floorM2: 0, canopy: false,
      ja: 'トラック待機場', vi: 'Bãi chờ xe tải', en: 'Truck Waiting Area', sign: 'TRUCK WAITING AREA' },
    { id: 'north_gate', kind: 'gate', x1: 548, x2: 572, z1: 238, z2: 262, h: 4.5, floorM2: 0, canopy: false,
      ja: '北ゲート（有人ゲート・貨物地区入口）', vi: 'Cổng Bắc (có bảo vệ · lối vào khu Cargo)', en: 'North Gate (manned · Cargo District entry)', sign: 'NORTH GATE' }
  ];
  // Cargo handling companies named by Centrair for the cargo district (assignment per building is not published here)
  export const NGO_CARGO_HANDLERS = [
    { ja: 'ANA中部空港（ANA Cargo）', vi: 'ANA Chubu Airport (ANA Cargo)', en: 'ANA Chubu Airport (ANA Cargo)' },
    { ja: 'ドリームスカイ名古屋／中部スカイサポート（JALグループ）', vi: 'Dream Sky Nagoya / Chubu Sky Support (nhóm JAL)', en: 'Dream Sky Nagoya / Chubu Sky Support (JAL Group)' },
    { ja: 'スカイポートサービス', vi: 'Skyport Service', en: 'Skyport Service' }
  ];

  export const A3D_OBSTACLES = [
    { id: 't1_main', x1: -165, x2: 185, z1: 68, z2: 175, name: 'Terminal 1 Main' },
    { id: 't1_nwing', x1: 185, x2: 430, z1: 66, z2: 112, name: 'T1 North Wing' },
    { id: 't1_swing', x1: -435, x2: -165, z1: 66, z2: 112, name: 'T1 South Wing' },
    { id: 'center_pier', x1: 28, x2: 64, z1: -180, z2: 40, name: 'T1 Center Pier (300m)' },
    { id: 'tower', x1: 318, x2: 342, z1: 163, z2: 187, name: 'Centrair ATC Tower (86.75m, NE of T1)' },
    { id: 'fod_hall', x1: -535, x2: -455, z1: 145, z2: 225, name: 'Flight of Dreams' },
    { id: 't2_main', x1: -960, x2: -565, z1: 95, z2: 168, name: 'Terminal 2 LCC' },
    { id: 'fire', x1: 465, x2: 515, z1: 62, z2: 102, name: 'Airport Fire Station' },
    ...NGO_CARGO_DISTRICT.filter(b => b.h > 0).map(b => ({ id: b.id, x1: b.x1, x2: b.x2, z1: b.z1, z2: b.z2, name: b.en })),
    { id: 'fuel_farm', x1: 1330, x2: 1510, z1: 150, z2: 290, name: 'Jet A-1 Fuel Farm' },
    { id: 'coast_guard', x1: 1620, x2: 1820, z1: 68, z2: 135, name: 'Japan Coast Guard Base' }
  ];

  // Official Chubu Centrair (NGO / RJGG) 1:1 Scale Facility Guide (JA / VI / EN)
  export const A3D_FACILITIES = [
    {
      id: 'runway', cam: { tx: 0, ty: 0, tz: -580, dist: 920, yaw: 0.35, pitch: 0.48 }, badge: 'FORBIDDEN', badgeCls: 'badge-danger',
      ja: '滑走路 RWY 36/18（実寸 3,500m × 60m・ピア先端から400m）',
      vi: 'Đường băng RWY 36/18 (Tỷ lệ thật 3.500m × 60m · Cách mũi Pier 400m)',
      en: 'Runway 36/18 (True 1:1 Scale 3,500m × 60m · 400m West of Pier Tip)',
      ruleJa: '【絶対進入禁止】中部国際空港（RJGG）実寸の3,500m×60m滑走路。地上車両の無許可進入は滑走路誤進入（Runway Incursion）となります。',
      ruleVi: '[CẤM TUYỆT ĐỐI] Đường băng chuẩn 3.500m × 60m của Centrair NGO. Xe mặt đất đi vào khi chưa có phép ATC là vi phạm xâm nhập đường băng.',
      ruleEn: '[STRICTLY FORBIDDEN] Full-scale 3,500m × 60m Centrair runway. Entering without ATC Tower clearance constitutes a Runway Incursion.'
    },
    {
      id: 'taxiway', cam: { tx: 0, ty: 0, tz: -335, dist: 520, yaw: 0.42, pitch: 0.50 }, badge: 'FORBIDDEN', badgeCls: 'badge-danger',
      ja: '平行誘導路 A・B・C ＆ 高速離脱誘導路 (A1〜A10)',
      vi: 'Hệ thống Đường lăn A · B · C & Thoát nhanh (A1–A10)',
      en: 'Parallel Taxiways A, B, C & Rapid Exits (A1–A10)',
      ruleJa: '【進入禁止】航空機専用。地上車両は赤実線（ABL）を越えて誘導路へ出てはなりません（横断はサービスレーンのみ）。',
      ruleVi: '[CẤM LÁI VÀO] Đường lăn chỉ dành cho tàu bay. Xe GSE cấm vượt vạch đỏ ABL (chỉ được băng qua tại đúng vạch trắng Service Lane).',
      ruleEn: '[NO GSE ENTRY] Taxiways are aircraft-only. GSE must never cross the solid red ABL boundary except via marked Service Lanes.'
    },
    {
      id: 'engine', cam: { tx: -68, ty: 2, tz: 8, dist: 64, yaw: 0.65, pitch: 0.55 }, badge: 'DANGER', badgeCls: 'badge-danger',
      ja: 'エンジン吸込・ブラスト危険区域 & 翼下走行禁止',
      vi: 'Vùng hút động cơ, Luồng phản lực Jet Blast & Cấm chui cánh',
      en: 'Engine Suction, Jet Blast Hazard Zone & No Under-Wing Driving',
      ruleJa: '【危険区域】赤色ビーコン点灯時はエンジン前方（吸込）・後方（ジェットブラスト）へ絶対接近禁止。消灯時も翼下・胴体下走行は厳禁。',
      ruleVi: '[NGUY HIỂM] Khi đèn beacon sáng cấm vào vùng hút phía trước & luồng phản lực sau. Luôn cấm lái xe luồn dưới cánh/bụng máy bay.',
      ruleEn: '[DANGER ZONE] Never approach forward intake or aft jet blast while the red beacon is ON; driving beneath wings or fuselage is always prohibited.'
    },
    {
      id: 'gse_holds', cam: { tx: -8, ty: 2.5, tz: 12, dist: 56, yaw: -0.95, pitch: 0.45 }, badge: 'GSE MATCH', badgeCls: 'badge-accent',
      ja: '右舷貨物室 GSE配置（Low-Deck High-Loader vs Belt Loader）',
      vi: 'Vị trí GSE Hầm hàng Phải: Low-Deck High-Loader & Belt Loader',
      en: 'Starboard Cargo GSE Layout (High-Lift Loader vs Belt Loader)',
      ruleJa: '【機材別GSE使い分け】A320(Spot 7)・B787(Spot 14)の前・後部コンテナ室は「ローデッキ・ハイリフトローダー」、バルク室とB737(Spot 6)全室は「ベルトローダー」を右舷側へ装着。',
      ruleVi: '[CHUẨN DÙNG ĐÚNG GSE] Hầm container A320 (Spot 7) & B787 (Spot 14) dùng Low-Deck High-Lift Loader; hầm Bulk & toàn bộ B737 (Spot 6) dùng Belt Loader ở mạn PHẢI.',
      ruleEn: '[FLEET GSE MATCH] A320 (Spot 7) and B787 (Spot 14) container holds use Low-Deck High-Lift Loaders; Bulk holds and B737 (Spot 6) use Belt Loaders on Starboard.'
    },
    {
      id: 'pbb_ngo', cam: { tx: 16, ty: 5, tz: 24, dist: 58, yaw: 0.72, pitch: 0.42 }, badge: 'PORT SIDE', badgeCls: 'badge-warn',
      ja: 'NGO準拠 PBB（左舷側ロータンダから直角装着）＆ 300mセンターピア',
      vi: 'Ống lồng PBB tiến ngang từ mạn Trái (L1/L2) & Center Pier 300m',
      en: 'Port-Side PBB Docking (L1/L2) & 300m Center Pier Sky Deck',
      ruleJa: '【PBB標準動線】PBB（搭乗橋）は左舷（Port側）の固定橋ロータンダからL1/L2ドアへ真横に接続。赤斜線のPBB危険区域は車両進入厳禁。',
      ruleVi: '[CHUẨN PBB] Ống lồng PBB tiến VUÔNG GÓC từ tháp xoay Rotunda mạn TRÁI vào cửa L1/L2; vùng gạch chéo đỏ dưới gầm PBB cấm tuyệt đối mọi loại xe.',
      ruleEn: '[PBB CLEARANCE] PBBs dock perpendicular to Port doors L1/L2; the red cross-hatched PBB operating zone is strictly off-limits to all vehicles.'
    },
    {
      id: 'serviceroad', cam: { tx: 0, ty: 0, tz: 48, dist: 160, yaw: 0.15, pitch: 0.56 }, badge: 'MAX 30km/h', badgeCls: 'badge-ok',
      ja: '構内車両通路（全長2.8km T2〜T1〜貨物地区幹線道路）',
      vi: 'Đường giao thông GSE nội bộ (Trục chính 2,8km nối T2 – T1 – Kho Cargo)',
      en: 'Airside GSE Spine Road (2.8km T2 – T1 – Cargo Multi-Lane Arterial)',
      ruleJa: '【走行可能】左側通行・制限速度30km/h以下（牽引時15km/h）・固定橋下は高さ制限3.8m・航空機最優先。',
      ruleVi: '[ĐƯỢC PHÉP LÁI] Đi bên trái, tối đa 30 km/h (kéo moóc 15 km/h), gầm cầu cố định giới hạn cao 3,8m, luôn nhường tàu bay.',
      ruleEn: '[AUTHORIZED ROAD] Keep left, max 30 km/h (15 km/h towing), 3.8m height clearance under fixed bridges, and always yield to aircraft.'
    },
    {
      id: 'gse', cam: { tx: -116, ty: 2, tz: 18, dist: 78, yaw: 0.72, pitch: 0.55 }, badge: 'MAX 15km/h', badgeCls: 'badge-ok',
      ja: 'GSE待機エリア・機材待機区域 (ESA)',
      vi: 'Khu đỗ & Tập kết xe GSE (ESA / GSE待機エリア)',
      en: 'Equipment Staging Area (ESA)',
      ruleJa: '【待機・駐車区域】白破線枠内に整頓駐車し、降車時はPブレーキ・エンジン停止・輪止めを徹底。',
      ruleVi: '[KHU TẬP KẾT GSE] Đỗ gọn trong ô vạch trắng đứt nét bên ngoài ERA; rời xe bắt buộc kéo phanh tay, tắt máy & chèn bánh.',
      ruleEn: '[GSE STAGING] Park neatly inside white-dashed ESA bays outside red ERA; set parking brake, shut off engine, and chock wheels.'
    },
    {
      id: 'tower', cam: { tx: 330, ty: 42, tz: 175, dist: 185, yaw: 0.65, pitch: 0.36 }, badge: 'ATC 86.75m', badgeCls: 'badge-accent',
      ja: '中部管制塔 (Centrair Tower · 高さ86.75m)',
      vi: 'Đài kiểm soát không lưu Chubu (Cao 86,75m)',
      en: 'Chubu ATC Control Tower (Height 86.75m)',
      ruleJa: '高さ86.75mの管制塔から滑走路36/18・誘導路A/B/C・全エプロン・場周道路を見渡し統括します。',
      ruleVi: 'Đài không lưu cao 86,75m điều hành toàn bộ đường băng 36/18, đường lăn A/B/C, sân đỗ T1/T2/沖留/Cargo.',
      ruleEn: 'Standing 86.75m tall, Centrair Tower oversees RWY 36/18, Taxiways A/B/C, T1, T2, Remote, and Cargo aprons.'
    },
    {
      id: 'cargo_fire', cam: { tx: 680, ty: 12, tz: 55, dist: 420, yaw: -0.55, pitch: 0.48 }, badge: 'CARGO #101-119', badgeCls: 'badge-accent',
      ja: '北貨物地区 (#101〜#119)・空港消防所・燃料タンク群・海保N地区',
      vi: 'Khu Hàng hóa Bắc (#101–#119), Trạm Cứu hỏa, Kho xăng & Căn cứ Hải cảnh N',
      en: 'North Cargo Apron (#101–#119), ARFF Fire Station, Fuel Farm & Coast Guard N-Area',
      ruleJa: 'B777F大型貨物機スポット#101〜#119、赤回転灯付きの空港消防所、燃料タンク群、北端の海上保安庁航空基地を再現。',
      ruleVi: 'Dãy bãi tàu hàng #101–#119, Trạm cứu hỏa đèn xoay đỏ, kho bồn Jet A-1 và căn cứ tuần duyên N1–N6.',
      ruleEn: 'Freighter stands #101–#119, ARFF Fire Station, Jet A-1 tank farm and Coast Guard N-Area.'
    },
    {
      id: 'cargo_wh', cam: { tx: 840, ty: 8, tz: 120, dist: 380, yaw: -0.35, pitch: 0.55 }, badge: '貨物地区 26ha', badgeCls: 'badge-accent',
      ja: '貨物地区：第1〜第3国際貨物上屋・国内上屋・トラック待機場・北ゲート',
      vi: 'Khu Cargo: Kho Quốc tế số 1–3, Kho Nội địa, Bãi chờ xe tải & Cổng Bắc',
      en: 'Cargo District: Int\'l Cargo Terminals 1–3, Domestic Sheds, Truck Waiting Area & North Gate',
      ruleJa: '空港島北側の貨物地区（約26ha）。第1国際貨物上屋（41,757㎡）・第2（13,772㎡）・第3（16,351㎡）・国内エアライン上屋・国内フォワーダー上屋（各2階建）、10トン車が入る20mの庇、トラック待機場、燻蒸施設、貨物事務棟（1Fローソン）、有人の北ゲート。上屋とフォワーダー上屋間は無ナンバー車両通行帯でTT・ドーリーによるインタクト輸送。主なハンドリング会社：ANA中部空港／ドリームスカイ名古屋・中部スカイサポート／スカイポートサービス。',
      ruleVi: 'Khu Cargo phía Bắc đảo (~26ha). Kho Quốc tế số 1 (41.757㎡), số 2 (13.772㎡), số 3 (16.351㎡), Kho Nội địa hãng bay & Kho Forwarder nội địa (đều 2 tầng); mái che 20m đủ cho xe 10 tấn; bãi chờ xe tải; khu xông khử trùng; tòa văn phòng Cargo (Lawson tầng 1); Cổng Bắc có bảo vệ. Giữa kho và kho forwarder có làn xe không biển số cho TT kéo dolly chở nguyên ULD (インタクト輸送). Các công ty handling chính: ANA Chubu Airport / Dream Sky Nagoya – Chubu Sky Support / Skyport Service.',
      ruleEn: 'North Cargo District (~26ha): Int\'l Cargo Terminal 1 (41,757㎡), 2 (13,772㎡), 3 (16,351㎡), Domestic Airline Shed and Domestic Forwarder Shed (all 2-storey); 20m truck canopy for 10t trucks; truck waiting area; fumigation facility; Cargo Office Building (Lawson 1F); manned North Gate. An unregistered-vehicle lane lets TTs tow ULD dollies intact to forwarder sheds. Main handlers: ANA Chubu Airport / Dream Sky Nagoya – Chubu Sky Support / Skyport Service.'
    }
  ];

  // 3 Guided Airside GSE Missions (JA / VI / EN)
  export const A3D_MISSIONS = [
    {
      id: 'M1',
      titleJa: '任務1: GSE待機所 → 構内通路 → NGO Spot 7 (A320) 右舷前部貨物室へ接近',
      titleVi: 'Nhiệm vụ 1: Khu GSE → Đường nội bộ → Tiếp cận hầm hàng PHẢI Spot 7 (A320)',
      titleEn: 'Mission 1: GSE Staging → Service Road → Dock at Spot 7 Starboard Fwd Hold',
      descJa: '構内通路（30km/h以下）を経由し、Spot 7右舷側のERA赤線手前でブレーキ点検停止（Space）後、10km/h以下で緑の搭載ポイントへ停止してください。',
      descVi: 'Đi theo đường nội bộ (≤30 km/h), dừng phanh kiểm tra (Space) ngoài vạch đỏ ERA mạn PHẢI Spot 7, rồi tiến chậm (≤10 km/h) vào điểm xếp hàng.',
      descEn: 'Drive via the GSE road (≤30 km/h), make a brake-check stop (Space) outside Spot 7\'s starboard red ERA line, then creep (≤10 km/h) to the load point.',
      start: { x: -112, z: 28, heading: Math.PI / 2 },
      beacon101: true,
      target: { x: -10, z: 20, r: 5.5 },
      requireBrakeOutsideEra: true,
      waypoints: [{ x: -100, z: 50 }, { x: -12, z: 50 }, { x: -12, z: 38 }, { x: -10, z: 20 }]
    },
    {
      id: 'M2',
      titleJa: '任務2: 東側通路 → NGO Spot 6 (B737) ビーコン点灯待機→消灯後右舷バルク室へ進入',
      titleVi: 'Nhiệm vụ 2: Đường nội bộ → Spot 6 (B737) Chờ tắt đèn Beacon rồi vào hầm hàng PHẢI',
      titleEn: 'Mission 2: Service Road → Hold Outside Spot 6 Red Beacon → Enter Starboard Hold',
      descJa: 'Spot 6（B737）は赤色ビーコン点灯中！ERA赤線手前で完全停止し、「S6ビーコンOFF」後に右舷側ポイントへ進入してください。',
      descVi: 'Spot 6 (B737) đang bật đèn Beacon đỏ! Dừng hẳn ngoài vạch đỏ ERA, bấm tắt Beacon Spot 6 rồi mới lái chậm vào hầm hàng bên phải.',
      descEn: 'Spot 6 (B737) has its red beacon ON! Stop completely outside the red ERA line, switch S6 Beacon OFF, then creep to the starboard hold.',
      start: { x: 84, z: 50, heading: Math.PI },
      beacon101: true,
      holdPt: { x: -78, z: 39, r: 6.5 },
      target: { x: -78, z: 20, r: 5.5 },
      requireBeaconOff: true,
      waypoints: [{ x: -78, z: 50 }, { x: -78, z: 39 }, { x: -78, z: 20 }]
    },
    {
      id: 'M3',
      titleJa: '任務3: センターピア先端迂回・サービスロード安全巡回（誘導路越境禁止）',
      titleVi: 'Nhiệm vụ 3: Tuần tra vòng mũi Center Pier 300m & Đường sau bãi đỗ (Cấm lấn đường lăn)',
      titleEn: 'Mission 3: 300m Center Pier Tip Loop & Behind-Stand Patrol (Zero Taxiway Incursion)',
      descJa: 'GSE待機所からターミナル脇通路→センターピア先端周回道路（z=-194m）→後方車両通行帯を制限速度内で巡回してください。',
      descVi: 'Lái theo đường GSE sát nhà ga → vòng qua mũi Center Pier 300m (z=-194m) → về đường xe sau bãi đỗ đúng tốc độ, không lấn vạch đỏ ABL.',
      descEn: 'Patrol along the Terminal GSE Road, loop around the 300m Center Pier West Tip (z=-194m), and return via the Behind-Stand Road without crossing red ABL.',
      start: { x: -112, z: 28, heading: Math.PI / 2 },
      beacon101: true,
      checkpoints: [{ x: 0, z: 50, r: 9 }, { x: 46, z: -194, r: 12 }, { x: -98, z: -38, r: 9 }],
      target: { x: -98, z: -38, r: 9 },
      waypoints: [{ x: -100, z: 50 }, { x: 18, z: 50 }, { x: 18, z: -194 }, { x: 74, z: -194 }, { x: -98, z: -38 }]
    }
  ];

  // PURE FUNCTION: EVALUATE 1:1 SCALE NGO CENTRAIR AIRSIDE ZONES & SPEED RULES (JA / VI / EN)
export function evaluateAirportZone(x, z, speedKmh, spot101BeaconOn, opts = {}) {
    const towingCarts = Boolean(opts.towingCarts);
    const over38m = Boolean(opts.over38m);
    const ilsRedOn = Boolean(opts.ilsRedOn);
    const blastActive = Boolean(opts.blastActive);

    // 0. Full 8.5km Airport Perimeter Road (場周道路: West Seawall z=-696..-674, South x=-2072..-2048, North x=2118..2142; Max 40 km/h) + Dual ILS Zones
    const onWestPerim = z <= -672 && z >= -702 && x >= -2074 && x <= 2144;
    const onSidePerim = ((x <= -2046 && x >= -2074) || (x >= 2116 && x <= 2144)) && z >= -702 && z <= 620;
    if (onWestPerim || onSidePerim) {
      const inIls = onWestPerim && ((x >= -1460 && x <= -1140) || (x >= 1140 && x <= 1460) || (x >= -260 && x <= -140));
      if (inIls && ilsRedOn) {
        return {
          zone: 'ILS_RESTRICTED',
          allowed: false,
          severity: 'critical',
          speedLimit: 0,
          penalty: 25,
          ja: 'ILS制限区域（赤灯点灯中 — 進入禁止！反対側へ迂回せよ）',
          vi: 'Khu vực hạn chế ILS (Đèn đỏ đang sáng — CẤM vào, phải đi vòng hướng đối diện!)',
          en: 'ILS Restricted Area (Red Lamp ON — NO ENTRY! Detour via opposite perimeter)'
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
        ja: speeding ? `場周道路 速度超過（制限${lim}km/h！）` : `場周道路（制限${lim}km/h${inIls ? '・ILS駐停車禁止区間' : ''}）`,
        vi: speeding ? `Quá tốc độ Đường vành đai (Tối đa ${lim} km/h!)` : `Đường vành đai sân bay 8,5km (Tối đa ${lim} km/h${inIls ? ' · Đoạn ILS cấm dừng đỗ' : ''})`,
        en: speeding ? `Perimeter Road Speeding (Max ${lim} km/h!)` : `8.5km Airport Perimeter Road (Max ${lim} km/h${inIls ? ' · ILS No-Stopping Zone' : ''})`
      };
    }

    // 1. 1:1 Scale Runway 36/18 & Landing Strip (滑走路 3,500m × 60m at z=-580; Strip z <= -455)
    if (z <= -455) {
      return {
        zone: 'RUNWAY',
        allowed: false,
        severity: 'critical',
        speedLimit: 0,
        penalty: 30,
        ja: '滑走路 RWY 36/18・着陸帯（管制許可なき進入厳禁！滑走路誤進入）',
        vi: 'Đường băng RWY 36/18 / Dải hạ cánh (CẤM TUYỆT ĐỐI khi chưa có phép ATC!)',
        en: 'Active Runway 36/18 / Landing Strip (Runway Incursion — ATC Clearance Mandatory!)'
      };
    }

    // 1b. Center Pier 300m Tip Perimeter Loop Road (x ∈ [14, 78], z ∈ [-202, -42])
    const onPierTipRoad = (z >= -202 && z < -42) && (
      (z <= -180 && x >= 14 && x <= 78) ||
      ((x >= 14 && x <= 27) && z >= -202 && z < -42) ||
      ((x >= 65 && x <= 78) && z >= -202 && z < -42)
    );
    if (onPierTipRoad) {
      const lim = towingCarts ? 15 : 30;
      const speeding = speedKmh > lim + 1.5;
      return {
        zone: 'BEHIND_STAND_ROAD',
        allowed: true,
        severity: speeding ? 'warn' : 'ok',
        speedLimit: lim,
        speeding,
        penalty: speeding ? 5 : 0,
        ja: speeding ? `センターピア先端周回道路 速度超過（制限${lim}km/h！）` : `センターピア先端周回道路（制限${lim}km/h・3.8m超車両迂回路）`,
        vi: speeding ? `Quá tốc độ Đường vòng mũi Center Pier (${lim} km/h!)` : `Đường vòng mũi Center Pier 300m (Tối đa ${lim} km/h · Lối vòng cho xe >3.8m)`,
        en: speeding ? `Center Pier Tip Road Speeding (Max ${lim} km/h!)` : `300m Center Pier Tip Road (Max ${lim} km/h · High-Vehicle >3.8m Detour)`
      };
    }

    // 1c. Official Service Lanes Crossing Taxilanes & C-TWY (サービスレーン)
    const inInnerSrvLane = (z > -76 && z < -42) && (
      (x >= -38 && x <= -24) || (x >= -162 && x <= -148) || (x >= 141 && x <= 155) ||
      (x >= -528 && x <= -512) || (x >= 512 && x <= 528)
    );
    const inOuterSrvLane = (z >= -256 && z <= -208) && (
      (x >= -116 && x <= -100) || (x >= 141 && x <= 155) ||
      (x >= -528 && x <= -512) || (x >= 512 && x <= 528)
    );
    if (inInnerSrvLane || inOuterSrvLane) {
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
        en: speeding ? `Service Lane Speeding (Max ${lim} km/h · No Overtaking!)` : `Service Lane Crossing (Max ${lim} km/h · ≥100m behind aircraft · Do not stop on exit red line)`
      };
    }

    // 1d. Remote Apron Island (#200 / #300-#600) & Cargo Apron (#101-#119) Pads (between C-TWY z=-210 and Taxilane z=-76)
    const inRemoteOrCargoPad = (z >= -208 && z <= -76) && (
      (x >= 185 && x <= 1560) || (x >= -1180 && x <= -195)
    );
    if (inRemoteOrCargoPad) {
      const lim = 15;
      const speeding = speedKmh > lim + 1.5;
      return {
        zone: 'APRON',
        allowed: true,
        severity: speeding ? 'warn' : 'ok',
        speedLimit: lim,
        speeding,
        penalty: speeding ? 5 : 0,
        ja: speeding ? '沖留・貨物エプロン内 速度超過（制限15km/h！）' : '沖留（#200〜#600）・北貨物（#101〜#119）エプロン（制限15km/h）',
        vi: speeding ? 'Quá tốc độ Sân đỗ từ xa / Cargo (≤15 km/h!)' : 'Sân đỗ từ xa (#200–#600) / Sân đỗ Hàng hóa (#101–#119) (Tối đa 15 km/h)',
        en: speeding ? 'Remote / Cargo Apron Speeding (Max 15 km/h!)' : 'Remote (#200–#600) & Cargo (#101–#119) Apron (Max 15 km/h)'
      };
    }

    // 2. Parallel Taxiways A/B/C & Taxilanes (誘導路・赤実線ABL越境: z < -42)
    if (z < -42) {
      return {
        zone: 'TAXIWAY',
        allowed: false,
        severity: 'critical',
        speedLimit: 0,
        penalty: 25,
        ja: '誘導路（A/B/C-TWY）・赤実線（ABL）越境（無許可進入禁止！サービスレーンを使用せよ）',
        vi: 'Đường lăn tàu bay (A/B/C-TWY) / Vượt vạch đỏ ABL (Cấm vào! Hãy đi đúng Service Lane)',
        en: 'Active Taxiway (A/B/C-TWY) / Crossed Red ABL Line (Unauthorized Entry — Use Service Lane!)'
      };
    }

    // 2b. T2 Jet Blast Caution Zones (#71 & #77 Yellow Boxes)
    const inBlast71 = (x >= -130 && x <= -104 && z >= -26 && z <= -8) || (x >= -590 && x <= -550 && z >= 22 && z <= 46);
    const inBlast77 = x >= -995 && x <= -955 && z >= 62 && z <= 96;
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

    // 3. Primary Stand Safety Envelopes (PBB Danger Zone, Engine Hazard, Under-Wing, Textbook Wing-Hugging ERA)
    for (let i = 0; i < A3D_SPOTS.length; i++) {
      const sp = A3D_SPOTS[i];
      const beaconOn = sp.id === '101' && Boolean(spot101BeaconOn);
      const dx = x - sp.cx;
      const dz = z - sp.cz;

      const pbbX1 = sp.cx + 3.2, pbbX2 = sp.cx + 22.5;
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

      const halfSpan = sp.wingHalf || 18;
      const halfL = halfSpan > 20 ? 23.0 : 18.5;
      const bodyW = halfSpan > 20 ? 9.6 : 8.4;
      const wingW = halfSpan + 3.8;
      const absX = Math.abs(dx);
      let inEraContour = false;
      if (dz >= -(halfL + 4.0) && dz <= halfL + 6.5 && absX <= wingW) {
        if (dz > halfL + 1.5) {
          const tVal = (dz - (halfL + 1.5)) / 5.0;
          inEraContour = absX <= bodyW * (1 - tVal * 0.95);
        } else if (dz > 4.5) {
          inEraContour = absX <= bodyW;
        } else if (dz >= -9.5) {
          inEraContour = absX <= wingW;
        } else {
          inEraContour = absX <= bodyW;
        }
      }

      if (inEraContour) {
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

    // 4. 2.8km Continuous Head-of-Stand GSE Spine Road (z=44..56, 3.8m Bridge Clearance) & Behind-Stand Road (z=-42..-34)
    const onHeadRoad = z >= 44 && z <= 58 && x >= -1280 && x <= 1860;
    const onOuterRoad = z >= -42 && z <= -33 && x >= -1280 && x <= 1860;
    if (onHeadRoad) {
      const underFixedBridge = over38m && (Math.abs(x + 48) < 6 || Math.abs(x - 21) < 6 || Math.abs(x - 46) < 18 || Math.abs(x - 122) < 6);
      if (underFixedBridge) {
        return {
          zone: 'HEIGHT_LIMIT_38M',
          allowed: false,
          severity: 'critical',
          speedLimit: 0,
          penalty: 25,
          ja: '全高3.8m超過 — 固定橋・センターピア下通行不可！（ピア先端周回道路へ迂回せよ）',
          vi: 'Vi phạm chiều cao >3.8m — Cấm chui gầm cầu cố định / Center Pier! (Phải vòng qua mũi Pier)',
          en: 'Over 3.8m Height Violation — Fixed Bridge / Center Pier Clearance Exceeded! (Detour via Pier Tip)'
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
        ja: speeding ? `幹線GSE車両通路 速度超過（制限${lim}km/h！）` : `幹線GSE車両通路（左側通行・制限${lim}km/h・固定橋下3.8m）`,
        vi: speeding ? `Quá tốc độ Trục đường GSE (Tối đa ${lim} km/h!)` : `Trục đường GSE 2,8km (Đi bên trái · Tối đa ${lim} km/h · Gầm cầu 3.8m)`,
        en: speeding ? `GSE Spine Road Speeding (Max ${lim} km/h!)` : `2.8km GSE Spine Road (Keep Left · Max ${lim} km/h · 3.8m Bridge Limit)`
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

    // 5. GSE Staging Area (Max 15 km/h)
    if (x >= -145 && x <= -98 && z >= -8 && z <= 44) {
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

    // 6. General Apron / Within 30m of Aircraft (Max 15 km/h)
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
  // 10-PHASE FLIGHT & TURNAROUND CYCLE ON 1:1 NGO 3,500m RUNWAY (JA / VI / EN)
  // =========================================================================

export const A3D_FLIGHT_PHASES = [
    {
      id: 'landing', duration: 10, tagJa: '着陸', tagVi: 'Hạ cánh', tagEn: 'Landing',
      titleJa: '1. 最終進入・着陸（NGO 3,500m 滑走路36 Final Approach & Landing）',
      titleVi: '1. Tiếp cận cuối & Hạ cánh trên đường băng thật 3.500m (NGO RWY 36)',
      titleEn: '1. Final Approach & Touchdown on 3,500m Runway 36 (NGO RJGG)',
      safetyJa: '3,500m×60m滑走路36・誘導路は完全クリア。到着Spot 7のFOD点検を完了し、全GSE・作業員はERA赤線の外で待機。',
      safetyVi: 'Đường băng 3.500m × 60m (RWY 36) thông thoáng. Bãi Spot 7 đã quét sạch FOD, toàn bộ xe GSE & nhân sự đứng ngoài vạch đỏ ERA.',
      safetyEn: 'Full-scale 3,500m × 60m RWY 36 and taxiways are clear. Spot 7 FOD sweep complete; all GSE and ramp crew hold outside red ERA.',
      roles: [
        { roleJa: '中部管制塔 (Centrair Tower 86.75m)', roleVi: 'Đài kiểm soát không lưu Chubu', roleEn: 'Centrair Tower ATC (118.85 MHz)', badge: 'TOWER',
          tasksJa: ['滑走路36着陸許可（Cleared to Land RWY 36）を発出', '着陸後の高速離脱誘導路 A6 → A-TWY → C-TWY → Spot 7 ルートを指示'],
          tasksVi: ['Cấp huấn lệnh hạ cánh đường băng 36 (Cleared to Land RWY 36)', 'Hướng dẫn thoát nhanh qua đường lăn A6 → A-TWY → C-TWY về Spot 7'],
          tasksEn: ['Issue landing clearance on 3,500m Runway 36', 'Assign high-speed exit A6 → A-TWY → C-TWY → Spot 7 taxi route'] },
        { roleJa: 'ランプリダー / 到着チーム', roleVi: 'Trưởng ca sân đỗ & Đội đón tàu', roleEn: 'Ramp Team Leader & Arrival Crew', badge: 'NGO SPOT 7',
          tasksJa: ['Spot 7内のFOD（異物）最終点検・回収', 'ハイリフト・ベルト・GPUを白破線ESA枠内に整頓待機'],
          tasksVi: ['Kiểm tra & thu gom sạch FOD toàn bãi đỗ Spot 7', 'Tập kết Low-Deck Loader, Belt Loader & GPU gọn trong ô trắng ESA ngoài vạch đỏ ERA'],
          tasksEn: ['Complete pre-arrival FOD walkaround on Spot 7', 'Stage High-Lift Loader, Belt Loader, and GPU inside white-dashed ESA bays'] },
        { roleJa: '空港消防所 (ARFF)', roleVi: 'Trạm cứu hỏa sân bay (ARFF)', roleEn: 'Airport Fire Rescue (ARFF)', badge: 'STANDBY',
          tasksJa: ['北貨物手前の空港消防所にて着陸時の緊急出動体制を維持'],
          tasksVi: ['Trực sẵn sàng ứng cứu khẩn cấp tại Trạm cứu hỏa sân bay cạnh khu Cargo'],
          tasksEn: ['Maintain immediate crash-fire-rescue readiness at the North Apron Fire Station'] }
      ]
    },
    {
      id: 'taxi_in', duration: 11, tagJa: '駐機誘導', tagVi: 'Dẫn vào bãi', tagEn: 'Taxi-in & Marshal',
      titleJa: '2. 高速離脱 A6 → 誘導路 A/C 走行 → Spot 7 駐機誘導（Marshalling）',
      titleVi: '2. Thoát nhanh A6 → Lăn qua A-TWY / C-TWY → Dẫn vào Spot 7 (駐機誘導)',
      titleEn: '2. Vacate via A6 → Taxiways A & C → Spot 7 Marshalling',
      safetyJa: '赤色ビーコン点灯・エンジン稼働中！センターピア先端（滑走路から400m）を通過し、マーシャラーと両翼監視員（エンジン外側5m以上）が誘導。',
      safetyVi: 'Đèn beacon đỏ đang nháy! Tàu bay lăn qua mũi Center Pier (cách đường băng 400m) vào Spot 7 theo gậy Marshaller & 2 Watchman (cách vỏ động cơ ≥5m).',
      safetyEn: 'Red anti-collision beacon ON! Aircraft taxis past the 300m Center Pier tip into Spot 7 guided by the Marshaller and Watchmen (≥5m outside engines).',
      roles: [
        { roleJa: 'マーシャラー（誘導員）', roleVi: 'Nhân viên dẫn tàu bay (Marshaller)', roleEn: 'Aircraft Marshaller', badge: 'PADDLE',
          tasksJa: ['停止線前方に立ち、パドルで直進・減速・停止（頭上クロス）を明確に指示', '前輪が停止バーに一致した瞬間に「Normal Stop」合図'],
          tasksVi: ['Đứng trước vạch dừng dùng gậy phát sáng ra hiệu Tiến thẳng, Giảm tốc và Dừng (chéo chữ X)', 'Ra lệnh dừng chuẩn xác khi bánh mũi chạm vạch dừng'],
          tasksEn: ['Stand ahead of the stop bar signaling Straight Ahead, Slow Down, and overhead X Normal Stop', 'Command full stop precisely as nose wheels reach the aircraft stop bar'] },
        { roleJa: 'ウイングウォーカー（両翼監視）', roleVi: 'Nhân viên canh đầu cánh trái/phải', roleEn: 'Port & Starboard Wingwalkers', badge: 'WINGS ≥5m',
          tasksJa: ['左右主翼端とPBBロータンダ・隣接機のクリアランス（目測誤差±3m）を監視', '接触危険時は直ちに頭上急交差で緊急停止を送る'],
          tasksVi: ['Giám sát khoảng trống hai đầu cánh (bù sai số mắt phi công ±3m) và đứng cách động cơ ≥5m', 'Phát tín hiệu Dừng khẩn cấp ngay nếu có nguy cơ va quẹt'],
          tasksEn: ['Monitor wingtip clearances (±3m cockpit visual error) while staying ≥5m outside engines', 'Give immediate Emergency Stop overhead X if any obstacle threatens clearance'] },
        { roleJa: 'チョック・コーン担当', roleVi: 'Nhân viên chèn bánh & cọc tiêu', roleEn: 'Chock & Cone Handler', badge: 'HOLD ERA',
          tasksJa: ['エンジン停止・赤ビーコン消灯を確認するまでERA赤線外で絶対待機'],
          tasksVi: ['Đứng chờ tuyệt đối ngoài vạch đỏ ERA cho đến khi động cơ dừng và đèn Beacon đỏ tắt hẳn'],
          tasksEn: ['Remain strictly outside the red ERA boundary until engines spool down and red beacon is OFF'] }
      ]
    },
    {
      id: 'onblock', duration: 8, tagJa: '輪止め・PBB', tagVi: 'Chèn bánh & PBB', tagEn: 'On-Block & PBB',
      titleJa: '3. オンブロック・輪止め・GPU（右舷）・PBB直角装着（左舷L1）',
      titleVi: '3. On-Block, Chèn bánh, GPU (mạn Phải) & PBB tiến ngang từ mạn Trái (L1)',
      titleEn: '3. On-Block, Wheel Chocks, Starboard GPU & Port L1 PBB Docking',
      safetyJa: 'ビーコン消灯を指差呼称で確認後に接近！GPUは右舷機首（AC 115V/400Hz）、PBBはセンターピア側ロータンダから左舷L1へ直角装着。',
      safetyVi: 'Chỉ tiếp cận sau khi tắt đèn beacon & 指差呼称! GPU cắm mũi mạn PHẢI (-X), PBB nối ngang từ Center Pier vào cửa L1 mạn TRÁI (+X).',
      safetyEn: 'Approach only after Point-and-Call confirmation of Beacon OFF! Connect 115V/400Hz GPU at starboard nose and dock PBB onto port door L1.',
      roles: [
        { roleJa: 'ランプ作業員（チョック＆コーン）', roleVi: 'Nhân viên sân đỗ (Chèn bánh & Cọc tiêu)', roleEn: 'Ramp Safety Mechanic', badge: 'SAFETY',
          tasksJa: ['前輪・主輪へ輪止め（チョック）を設置し機体移動を防止', '機首・両翼端・エンジン前へコーン配置＆到着外部点検'],
          tasksVi: ['Chèn bánh mũi và bánh chính (Chock On) cố định tàu bay', 'Đặt cọc tiêu mũi/đầu cánh/động cơ & kiểm tra thân vỏ bằng 指差呼称'],
          tasksEn: ['Insert nose and main gear wheel chocks to secure aircraft', 'Place safety cones at nose, wingtips, and engines & conduct arrival walkaround'] },
        { roleJa: 'GPU操作員（右舷機首）', roleVi: 'Nhân viên GPU (Mũi mạn Phải)', roleEn: 'GPU Operator (Starboard Nose)', badge: '400Hz',
          tasksJa: ['5m手前ブレーキ点検後、右舷機首下へAC 115V/400Hzケーブルを接続・給電'],
          tasksVi: ['Dừng thử phanh ở 5m, cắm cáp nguồn AC 115V/400Hz vào ổ mũi phải và xác nhận đèn cấp điện'],
          tasksEn: ['Perform 5m brake-check, connect AC 115V/400Hz cable to starboard nose receptacle, and verify power'] },
        { roleJa: 'PBB操作員（左舷L1）', roleVi: 'Nhân viên vận hành PBB (Hông Trái L1)', roleEn: 'PBB Operator (Port L1)', badge: 'PORT L1',
          tasksJa: ['キャビン側のディスアーム確認後、PBBをL1ドアへ直角装着し開扉'],
          tasksVi: ['Xác nhận tiếp viên đã Disarm cầu trượt thoát hiểm rồi mới áp sát PBB và mở cửa L1'],
          tasksEn: ['Dock PBB squarely to Port L1 and verify slide DISARMED via door window before opening'] }
      ]
    },
    {
      id: 'unload', duration: 8, tagJa: 'ULD・バルク取卸', tagVi: 'Dỡ ULD & Bulk', tagEn: 'Offload ULD/Bulk',
      titleJa: '4. 降機 ＆ 右舷貨物室取卸し（Low-Deck High-Loader＋Bulk Belt Loader）',
      titleVi: '4. Xuống khách & Dỡ hàng mạn Phải (Low-Deck High-Loader + Belt Loader cho Bulk)',
      titleEn: '4. Passenger Deplaning & Starboard ULD / Bulk Baggage Offloading',
      safetyJa: '前部コンテナ室は「ローデッキ・ハイリフトローダー」、後部バルク室は「ベルトローダー」を5mブレーキ点検後に右舷側へ装着！',
      safetyVi: 'Hầm container trước dùng Low-Deck High-Lift Loader; hầm Bulk sau dùng Belt Loader — dừng thử phanh 5m trước khi áp vào mạn PHẢI!',
      safetyEn: 'Dock Low-Deck High-Lift Loader to Fwd ULD hold and Belt Loader to Aft Bulk hold on Starboard after mandatory 5m brake check!',
      roles: [
        { roleJa: 'ハイリフトローダー操作員', roleVi: 'Vận hành Low-Deck High-Lift Loader', roleEn: 'High-Lift Loader Operator', badge: 'LOW-DECK',
          tasksJa: ['ガイドマン誘導で右舷前部貨物室へ装着し、ULDをコンテナドーリーへ移載'],
          tasksVi: ['Theo còi xi-nhan Guideman áp sát hầm trước mạn PHẢI, hạ container ULD xuống đoàn xe Dolly'],
          tasksEn: ['Follow guideman whistle signals to dock at Fwd cargo door and transfer ULDs onto dollies'] },
        { roleJa: 'ベルトローダー担当（バルク室）', roleVi: 'Nhân viên Belt Loader (Hầm Bulk)', roleEn: 'Bulk Hold Belt Loader Crew', badge: 'BULK BELT',
          tasksJa: ['右舷後部バルク室から手荷物を50cm間隔で取卸し、TT牽引車列で手荷物仕分け場へ搬送'],
          tasksVi: ['Dỡ hành lý rời cách nhau 50cm trên băng chuyền hầm Bulk và dùng xe TT kéo về nhà ga'],
          tasksEn: ['Offload loose bags spaced 50cm apart on the belt conveyor and tow baggage carts to sorting'] },
        { roleJa: '旅客係員（左舷PBB）', roleVi: 'Nhân viên phục vụ khách (PBB Trái)', roleEn: 'Gate & PRM Agent (Port PBB)', badge: 'PORT PAX',
          tasksJa: ['降機旅客の案内およびWCHC/WCHS/WCHR旅客の介助・乗継誘導'],
          tasksVi: ['Đón khách rời tàu qua PBB bên trái, hỗ trợ xe lăn PRM & hành khách nối chuyến'],
          tasksEn: ['Guide deplaning passengers via Port PBB and assist PRM wheelchair & connecting travelers'] }
      ]
    },
    {
      id: 'service', duration: 9, tagJa: '給油・機内食・水', tagVi: 'Tra dầu, Suất ăn & Nước', tagEn: 'Fuel, Catering & Water',
      titleJa: '5. ハイドラント給油（右翼下）・ケータリング（-19cm）・汚水/給水衛生分離',
      titleVi: '5. Tra dầu Hydrant (cánh Phải), Xe suất ăn (-19cm) & Lavatory/Nước sạch tách biệt',
      titleEn: '5. Hydrant Refueling, Catering (-19cm Sill) & Hygienic Lavatory/Water Service',
      safetyJa: 'サービサーは前方退避路を確保して白ピット＆赤アース接続。フードローダーはアウトリガー張出＋床面-19cmセット。',
      safetyVi: 'Xe Hydrant quay đầu ra ngoài giữ lối thoát hiểm, nối hố Trắng & kẹp tiếp địa Đỏ. Xe suất ăn hạ 4 chân chống & đặt sàn thấp hơn 19cm.',
      safetyEn: 'Park Hydrant Servicer facing forward escape path with white pit hose & red bonding wire; deploy catering outriggers at -19cm sill offset.',
      roles: [
        { roleJa: '給油作業員（乙種第4類）', roleVi: 'Nhân viên tra dầu (Chứng chỉ 乙4)', roleEn: 'Certified HazMat Class 4 Fueler', badge: 'JET A-1',
          tasksJa: ['ボンディング接続・消火器風上配置を確認し、白ピットから右主翼下へJet A-1給油'],
          tasksVi: ['Kẹp dây tiếp địa chống tĩnh điện, đặt bình chữa cháy đầu gió và bơm Jet A-1 vào cánh phải'],
          tasksEn: ['Connect bonding wire, stage fire extinguisher upwind, and pump Jet A-1 from white hydrant pit'] },
        { roleJa: 'ケータリング＆機内清掃', roleVi: 'Xe suất ăn & Vệ sinh khoang khách', roleEn: 'Catering High-Loader & Cabin Crew', badge: 'R1 -19cm',
          tasksJa: ['アウトリガー完全張出後にバンを上昇させ、機内沈み込み対策として床面-19cmで装着'],
          tasksVi: ['Hạ 4 chân chống thủy lực, nâng thùng xe thấp hơn sàn cabin ~19cm tránh cạ cửa khi máy bay nặng dần'],
          tasksEn: ['Extend all 4 outriggers before lifting van body ~19cm below cabin floor to allow strut settling'] },
        { roleJa: 'ラバトリー＆ウォーター担当', roleVi: 'Nhân viên Lavatory & Nước sạch', roleEn: 'Lavatory & Potable Water Techs', badge: 'HYGIENE',
          tasksJa: ['汚水車（右後部）と給水車（左後部・当日水のみ使用）を完全分離して作業'],
          tasksVi: ['Tách biệt hoàn toàn xe hút thải và xe cấp nước sạch trong ngày (không dùng nước lưu qua đêm)'],
          tasksEn: ['Service waste and fresh same-day potable water using strictly segregated trucks and hoses'] }
      ]
    },
    {
      id: 'load_board', duration: 9, tagJa: 'ULD搭載・搭乗', tagVi: 'Xếp ULD & Lên khách', tagEn: 'Load ULD & Board',
      titleJa: '6. 搭乗（左舷PBB）・ULD/バルク搭載（右舷）・LIR照合＆W&B確定',
      titleVi: '6. Lên khách (PBB Trái), Xếp ULD/Bulk theo LIR & Chốt Load Sheet / NOTOC',
      titleEn: '6. Passenger Boarding, LIR-Verified ULD/Bulk Loading & Final Load Sheet',
      safetyJa: 'ULDタグとLIR指定位置を指差呼称で照合し、フロアロックを完全施錠（Close & Lock）。LMCがあれば即時報告！',
      safetyVi: 'Đối chiếu thẻ ULD khớp 100% vị trí LIR, gạt đủ chốt khóa sàn (Close & Lock) và báo ngay mọi thay đổi giờ chót (LMC)!',
      safetyEn: 'Match ULD tags to LIR positions via Point-and-Call, engage all sill/floor locks, and report any Last Minute Change (LMC)!',
      roles: [
        { roleJa: 'ロードマスター / ロードコントロール', roleVi: 'Loadmaster & Load Control (LIR/W&B)', roleEn: 'Loadmaster & Load Controller', badge: 'W&B / LIR',
          tasksJa: ['実搭載ULD番号・重量とLIRの一致を確認し、最終Load Sheet・NOTOCを機長へ手交'],
          tasksVi: ['Kiểm tra số thùng/trọng lượng thực tế khớp LIR, trình ký Load Sheet & NOTOC cho Cơ trưởng'],
          tasksEn: ['Reconcile actual ULD positions/weights against LIR and deliver signed Load Sheet & NOTOC to Captain'] },
        { roleJa: 'ハイリフト＆バルク搭載班', roleVi: 'Đội xếp hầm ULD & Bulk', roleEn: 'Starboard Cargo Loading Team', badge: 'CLOSE&LOCK',
          tasksJa: ['コンター逸脱・偏荷重なきことを確認し、全ロック施錠とネット固縛を実施'],
          tasksVi: ['Kiểm tra không vượt biên dạng Contour / không lệch tải, khóa sàn và cài lưới hầm Bulk chắc chắn'],
          tasksEn: ['Verify zero contour overhang or eccentric load, latch all floor locks, and secure bulk nets'] },
        { roleJa: '搭乗口係員（ゲートチェック＆PPBM）', roleVi: 'Nhân viên Gate (Xách tay & PPBM)', roleEn: 'Boarding Gate Agent (PPBM)', badge: 'PORT GATE',
          tasksJa: ['ゲート預け手荷物から予備リチウム電池を取り出し確認、搭乗者数と預け手荷物をPPBM照合'],
          tasksVi: ['Kiểm tra lấy pin dự phòng khỏi vali gate-check, chốt tổng khách lên tàu khớp hành lý PPBM'],
          tasksEn: ['Remove power banks from gate-checked bags and reconcile final passenger headcount with PPBM'] }
      ]
    },
    {
      id: 'clear', duration: 8, tagJa: 'ドア閉・退避', tagVi: 'Đóng cửa & Rút GSE', tagEn: 'Clear ERA & Tug',
      titleJa: '7. 全ドア閉鎖・GSE/PBB完全退避・ウォークアラウンド・トーイングカー連結',
      titleVi: '7. Đóng kín cửa, Rút toàn bộ GSE/PBB khỏi ERA, Walkaround & Nối xe kéo Tug',
      titleEn: '7. Doors Closed, GSE/PBB Retracted Outside ERA, Walkaround & Tug Coupling',
      safetyJa: '全GSE・PBB・コーンをERA赤線外（白破線ESA・PBB待機枠）へ完全撤収！バイパスピンを前脚へ挿入。',
      safetyVi: 'Rút sạch toàn bộ xe GSE, PBB và cọc tiêu ra ngoài vạch đỏ ERA. Cắm chốt đỏ Steering Bypass Pin vào càng mũi và nối thanh kéo.',
      safetyEn: 'Retract all GSE, cones, and PBB completely outside red ERA into standby boxes; insert nose-gear steering bypass pin and couple tug.',
      roles: [
        { roleJa: '地上整備士 / ヘッドセットマン', roleVi: 'Kỹ thuật viên mặt đất / Headset Man', roleEn: 'Ground Mechanic / Headset Man', badge: 'HEADSET',
          tasksJa: ['機体1周ウォークアラウンドで全扉・ラッチ・給油パネル閉鎖を指差呼称確認', 'ステアリング・バイパスピン挿入＆インターホン接続'],
          tasksVi: ['Đi vòng 360° kiểm tra đóng kín mọi cửa hầm/nắp kỹ thuật bằng 指差呼称', 'Cắm chốt Bypass Pin càng mũi và kết nối tai nghe với Cơ trưởng'],
          tasksEn: ['Perform 360° pre-departure walkaround verifying all doors/panels latched via Point-and-Call', 'Insert steering bypass pin and establish cockpit intercom contact'] },
        { roleJa: 'PBB＆GSE退避担当', roleVi: 'Nhân viên rút PBB & GSE', roleEn: 'PBB & GSE Clearance Crew', badge: 'CLEAR ERA',
          tasksJa: ['L1ドア閉鎖後にPBBを白枠待機位置へ収納し、全GSEをERA外へ退避'],
          tasksVi: ['Đợi cửa L1 đóng kín rồi rút PBB về ô trắng chờ, đưa toàn bộ xe GSE ra ngoài vạch đỏ ERA'],
          tasksEn: ['Retract PBB into its white standby box after L1 closure and clear all GSE outside red ERA'] },
        { roleJa: 'プッシュバックTugドライバー', roleVi: 'Tài xế xe đẩy lùi (Pushback Tug)', roleEn: 'Pushback Tractor Driver', badge: 'TUG',
          tasksJa: ['トーバーを前脚へ確実に連結し、管制承認とブレーキ解除指示を待機'],
          tasksVi: ['Khớp chắc chắn thanh kéo Towbar vào càng mũi, chờ huấn lệnh ATC và lệnh nhả phanh đỗ'],
          tasksEn: ['Couple towbar securely to nose gear and stand by for ATC clearance and brake release'] }
      ]
    },
    {
      id: 'pushback', duration: 10, tagJa: 'プッシュバック', tagVi: 'Đẩy lùi & Nổ máy', tagEn: 'Pushback & Start',
      titleJa: '8. プッシュバック ＆ エンジン始動（後方車両通行帯の地上監視員ブロック）',
      titleVi: '8. Đẩy lùi khỏi Spot 7 & Khởi động động cơ (Cảnh giới đường xe phía sau)',
      titleEn: '8. Pushback onto Apron Taxilane & Engine Start',
      safetyJa: '赤色ビーコン点灯！後方車両通行帯のGSE車両を停止させ、周囲安全確認後にエンジン始動クリアランスを発出。',
      safetyVi: 'Đèn Beacon đỏ bật sáng! Chặn luồng xe GSE phía sau, đi bộ cảnh giới hai đầu cánh và cấp phép khởi động động cơ.',
      safetyEn: 'Red beacon ON! Hold behind-stand vehicle traffic, escort nose and wingtips on foot, and issue Engine Start clearance.',
      roles: [
        { roleJa: '中部グランド管制 (Chubu Ground)', roleVi: 'Kiểm soát mặt đất (Chubu Ground)', roleEn: 'Chubu Ground ATC (121.7 MHz)', badge: 'ATC GND',
          tasksJa: ['プッシュバックおよびエンジン始動を承認（Pushback & Start-up Approved）'],
          tasksVi: ['Cấp huấn lệnh cho phép đẩy lùi và khởi động động cơ'],
          tasksEn: ['Approve aircraft pushback and engine start sequence'] },
        { roleJa: 'プッシュバックTugドライバー', roleVi: 'Tài xế xe Pushback Tug', roleEn: 'Pushback Tug Operator', badge: 'PUSHBACK',
          tasksJa: ['一定低速で後退し、エプロン誘導路の中心線へ機首を正確に整列'],
          tasksVi: ['Đẩy lùi êm ở tốc độ chậm ổn định, xoay đuôi đưa tàu bay nằm chuẩn trên tim đường lăn'],
          tasksEn: ['Push smoothly at walking pace and align aircraft nose cleanly on taxilane centerline'] },
        { roleJa: 'ヘッドセットマン＆ウイングウォーカー', roleVi: 'Headset Man & Canh đầu cánh', roleEn: 'Headset Man & Wingwalkers', badge: 'ESCORT',
          tasksJa: ['前脚横・両翼端外側を並走警戒し、「Clear to start Engine 2 & 1」を伝達'],
          tasksVi: ['Đi bộ song song cảnh giới bánh mũi & hai đầu cánh, báo Cơ trưởng nổ máy số 2 & số 1'],
          tasksEn: ['Walk alongside nose gear and wingtips maintaining clearance and call "Clear to start Engines 2 & 1"'] }
      ]
    },
    {
      id: 'waveoff_taxiout', duration: 12, tagJa: 'お見送り・滑走へ', tagVi: 'Tiễn bay & Lăn ra', tagEn: 'Pin Show & Taxi-Out',
      titleJa: '9. トーバー切離し・左前方バイパスピン提示（お見送り）→ 3,500m滑走路36端へタキシー',
      titleVi: '9. Tháo Towbar, Giơ cờ đỏ Bypass Pin bên trái (お見送り) & Lăn ra đầu RWY 36',
      titleEn: '9. Towbar Disconnect, Forward-Left Bypass Pin Salute & Taxi to RWY 36 Threshold',
      safetyJa: 'パーキングブレーキSET確認後にトーバー切離し！機長から見える左前方で赤リボン付きピンを掲げお見送り後、A-TWY経由で南端A1へ。',
      safetyVi: 'Chờ Cơ trưởng xác nhận Parking Brake SET mới tháo Towbar! Đứng chếch TRÁI mũi tàu giơ cờ đỏ Bypass Pin & vẫy chào tiễn bay ra đầu băng A1.',
      safetyEn: 'Confirm Parking Brake SET before uncoupling! Display the red-streamer bypass pin forward-left of the nose, wave off, and taxi via C-TWY/A-TWY to A1.',
      roles: [
        { roleJa: 'ヘッドセットマン（お見送り）', roleVi: 'Headset Man (Giơ chốt & Tiễn bay)', roleEn: 'Headset Man (Pin Show & Salute)', badge: 'PIN SHOW',
          tasksJa: ['バイパスピンを抜去し、左前方安全位置で赤リボンを高く提示して敬礼・お見送り'],
          tasksVi: ['Rút chốt Bypass Pin, di chuyển ra phía trước bên trái giơ cao cờ đỏ xác nhận rồi cúi chào/vẫy tay'],
          tasksEn: ['Remove steering bypass pin, step to Captain\'s forward-left view, hold up red streamer, and wave off'] },
        { roleJa: 'ランプチーム（整列お見送り＆FOD確認）', roleVi: 'Đội sân đỗ (Vẫy chào お見送り)', roleEn: 'Ramp Team (Omiokuri Wave-Off)', badge: 'WAVE-OFF',
          tasksJa: ['エプロン安全線に沿って整列お見送り後、スポット内の出発後FOD点検を実施'],
          tasksVi: ['Xếp hàng ngay ngắn vẫy tay chào tiễn bay (お見送り), sau đó kiểm tra lại mặt sân Spot 7'],
          tasksEn: ['Line up along apron edge for traditional Japanese wave-off, then conduct post-departure FOD check'] },
        { roleJa: '中部グランド管制', roleVi: 'Kiểm soát mặt đất (Taxi-Out)', roleEn: 'Chubu Ground Control', badge: 'TAXI A1',
          tasksJa: ['C-TWY → A-TWY 経由で滑走路36南端 A1 停止位置（Hold Short）まで走行指示'],
          tasksVi: ['Hướng dẫn lăn dọc đường lăn song song A-TWY ra đầu Nam đường băng 36 (vạch dừng A1)'],
          tasksEn: ['Clear aircraft to taxi South via C-TWY and 3,500m A-TWY to Hold Short RWY 36 at A1'] }
      ]
    },
    {
      id: 'takeoff', duration: 10, tagJa: '離陸上昇', tagVi: 'Cất cánh', tagEn: 'Takeoff & Climb',
      titleJa: '10. 3,500m 滑走路36 離陸滑走・ローテーション・伊勢湾上空へ上昇',
      titleVi: '10. Chạy đà trên đường băng 3.500m RWY 36, Nâng mũi VR & Lấy độ cao trên Vịnh Ise',
      titleEn: '10. Full-Scale Takeoff Roll on 3,500m RWY 36, Rotation (VR) & Climb-Out over Ise Bay',
      safetyJa: '南端閾値（x=-1,680m）から約2,000m滑走してVRで機首上げ離陸！ギア格納後、伊勢湾北側へ上昇します。',
      safetyVi: 'Tàu bay tăng tốc dọc đường băng thật 3.500m từ ngưỡng Nam (-1.680m), đạt VR kéo mũi rời đất, thu càng và vươn cao trên Vịnh Ise!',
      safetyEn: 'Aircraft accelerates ~2,000m down full-scale RWY 36 from South threshold (-1,680m), rotates at VR, retracts gear, and climbs over Ise Bay.',
      roles: [
        { roleJa: '中部管制塔（タワー）', roleVi: 'Đài kiểm soát không lưu (Tower)', roleEn: 'Centrair Tower & Departure ATC', badge: 'TAKEOFF',
          tasksJa: ['滑走路36離陸許可（Cleared for Takeoff RWY 36）発出・離陸後にセントレア進入管制へ移管'],
          tasksVi: ['Cấp huấn lệnh cất cánh RWY 36 và chuyển giao cho kiểm soát tiếp cận Centrair Departure'],
          tasksEn: ['Issue takeoff clearance on RWY 36 and hand off airborne flight to Centrair Departure'] },
        { roleJa: '運航管理・ランプコントロール', roleVi: 'Điều phái bay & Kiểm soát sân đỗ', roleEn: 'Flight Dispatch & Ramp Control', badge: 'DISPATCH',
          tasksJa: ['実離陸時刻（ATOT）を記録し、MVT・LDM電文を到着空港へ発信、次便受入準備へ移行'],
          tasksVi: ['Ghi nhận giờ cất cánh thực tế (ATOT), phát điện văn MVT/LDM và mở bãi đón chuyến kế tiếp'],
          tasksEn: ['Log Actual Takeoff Time (ATOT), transmit MVT/LDM telexes, and ready Spot 7 for next arrival'] }
      ]
    }
  ];

  // PURE FUNCTION: 1:1 NGO 3,500m RUNWAY & APRON 3D FLIGHT POSE GENERATOR (JA / VI / EN CREW CALLOUTS)
  // ===================================================================================
  // REALISTIC GROUND MOVEMENT: taxi routes on the real taxiway network with filleted turns
  // and physically plausible speed profiles (ICAO/airline SOP typical values):
  //   runway exit ≤ 30kt · straight taxi ≈ 18kt (9 m/s) · turns ≈ 10kt (5 m/s) ·
  //   apron taxilane ≈ 10kt · marshaller lead-in ≤ walking pace, stop at the stop line ·
  //   pushback ≈ 3–5 km/h (1.2 m/s). Phase durations are derived from these profiles (1x = real time).
  // ===================================================================================
  function buildTaxiPath(points, radius = 30) {
    const out = [];
    const push = (x, z, turn) => {
      const last = out[out.length - 1];
      if (last && Math.hypot(x - last.x, z - last.z) < 0.25) return;
      out.push({ x, z, turn });
    };
    push(points[0][0], points[0][1], false);
    for (let i = 1; i < points.length; i++) {
      const B = points[i];
      if (i === points.length - 1) { push(B[0], B[1], false); break; }
      const A = points[i - 1], C = points[i + 1];
      const l1 = Math.hypot(B[0] - A[0], B[1] - A[1]), l2 = Math.hypot(C[0] - B[0], C[1] - B[1]);
      const d1 = [(B[0] - A[0]) / l1, (B[1] - A[1]) / l1], d2 = [(C[0] - B[0]) / l2, (C[1] - B[1]) / l2];
      const theta = Math.acos(Math.max(-1, Math.min(1, d1[0] * d2[0] + d1[1] * d2[1])));
      const tl = Math.min(radius * Math.tan(theta / 2), l1 * 0.48, l2 * 0.48);
      const P1 = [B[0] - d1[0] * tl, B[1] - d1[1] * tl], P2 = [B[0] + d2[0] * tl, B[1] + d2[1] * tl];
      push(P1[0], P1[1], false);
      const n = Math.max(6, Math.ceil(theta * 14));
      for (let k = 1; k <= n; k++) {
        const u = k / n;
        push((1 - u) * (1 - u) * P1[0] + 2 * (1 - u) * u * B[0] + u * u * P2[0],
             (1 - u) * (1 - u) * P1[1] + 2 * (1 - u) * u * B[1] + u * u * P2[1], theta > 0.05);
      }
    }
    // Resample at ~1m with cumulative distance & heading (heading: forward = (cos h, sin h) in x/z)
    const res = [];
    let acc = 0;
    for (let i = 0; i < out.length - 1; i++) {
      const a = out[i], b = out[i + 1];
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      const h = Math.atan2(b.z - a.z, b.x - a.x);
      const n = Math.max(1, Math.round(len));
      for (let k = 0; k < n; k++) {
        const u = k / n;
        res.push({ x: a.x + (b.x - a.x) * u, z: a.z + (b.z - a.z) * u, h, s: acc + len * u, turn: a.turn || b.turn });
      }
      acc += len;
    }
    const lastPt = out[out.length - 1];
    res.push({ x: lastPt.x, z: lastPt.z, h: res.length ? res[res.length - 1].h : 0, s: acc, turn: false });
    return res;
  }

  function buildMotion(points, o) {
    const path = buildTaxiPath(points, o.radius || 30);
    const n = path.length;
    const L = path[n - 1].s;
    const v = path.map(pt => {
      let lim = pt.turn ? o.vTurn : o.vMax;
      if (o.zones) o.zones.forEach(zn => { if (pt.s >= zn.from && pt.s <= zn.to) lim = Math.min(lim, zn.v); });
      const toEnd = L - pt.s;
      if (o.leadIn && toEnd < o.leadIn) lim = Math.min(lim, o.vLeadEnd + (o.vLeadIn - o.vLeadEnd) * (toEnd / o.leadIn));
      return lim;
    });
    v[0] = Math.min(v[0], o.vStart ?? 0.5);
    v[n - 1] = Math.min(v[n - 1], o.vEnd ?? 0.3);
    for (let i = 1; i < n; i++) { const ds = path[i].s - path[i - 1].s; v[i] = Math.min(v[i], Math.sqrt(v[i - 1] * v[i - 1] + 2 * o.accel * ds)); }
    for (let i = n - 2; i >= 0; i--) { const ds = path[i + 1].s - path[i].s; v[i] = Math.min(v[i], Math.sqrt(v[i + 1] * v[i + 1] + 2 * o.decel * ds)); }
    const t = [0];
    for (let i = 1; i < n; i++) {
      const ds = path[i].s - path[i - 1].s;
      t.push(t[i - 1] + ds / Math.max(0.15, (v[i] + v[i - 1]) * 0.5));
    }
    const hold = o.holdStart || 0;
    const T = t[n - 1] + hold;
    const sampleAt = time => {
      const tt = Math.max(0, time - hold);
      let lo = 0, hi = n - 1;
      while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (t[mid] <= tt) lo = mid; else hi = mid; }
      const u = t[hi] > t[lo] ? Math.min(1, (tt - t[lo]) / (t[hi] - t[lo])) : 0;
      const a = path[lo], b = path[hi];
      let dh = b.h - a.h; dh = Math.atan2(Math.sin(dh), Math.cos(dh));
      return { x: a.x + (b.x - a.x) * u, z: a.z + (b.z - a.z) * u, h: a.h + dh * u, gs: time < hold ? 0 : v[lo] + (v[hi] - v[lo]) * u, s: a.s + (b.s - a.s) * u, L };
    };
    return { T, L, sampleAt };
  }

  // Taxi-in: RWY 36 exit A6 (high-speed) → crossover x=255 → C-TWY southbound → apron link x=0 → Spot 7 lead-in
  export const NGO_MOTION = {
    taxiIn: buildMotion([[180, -580], [255, -415], [255, -235], [NGO_STAND7_X, -235], [NGO_STAND7_X, 10]], {
      radius: 40, vMax: 9.0, vTurn: 5.0, accel: 0.5, decel: 0.7, vStart: 14, vEnd: 0.0, 
      zones: [{ from: 0, to: 120, v: 14 }],                       // still decelerating on the exit
      leadIn: 70, vLeadIn: 2.6, vLeadEnd: 0.5                     // marshaller lead-in: walking pace, creep to the stop line
    }),
    // Pushback (tail first) from Spot 7 onto the inner taxilane, nose ends pointing south (-X)
    push: buildMotion([[NGO_STAND7_X, 10], [NGO_STAND7_X, -62], [NGO_STAND7_X + 30, -62]], { radius: 26, vMax: 1.3, vTurn: 1.0, accel: 0.15, decel: 0.2, vStart: 0, vEnd: 0 }),
    // Taxi-out: wave-off hold → taxilane → crossover x=-108 → A-TWY southbound → RWY 36 threshold (A1 area)
    taxiOut: buildMotion([[NGO_STAND7_X + 30, -62], [-108, -62], [-108, -415], [-1680, -415], [-1680, -580], [-1650, -580]], {
      radius: 40, vMax: 9.5, vTurn: 5.0, accel: 0.45, decel: 0.7, vStart: 0, vEnd: 0, holdStart: 14,
      zones: [{ from: 0, to: 150, v: 5.0 }]                       // apron taxilane ≤ 10kt
    })
  };
  // Landing: 3° approach at Vref ≈ 140kt (70 m/s), touchdown x=-1450, decel 1.43 m/s² to 15 m/s at exit A6 (x=180)
  const LANDING = { vRef: 70, xStart: -2350, xTd: -1450, yStart: 112, xExit: 180, vExit: 15 };
  LANDING.tApp = (LANDING.xTd - LANDING.xStart) / LANDING.vRef;
  LANDING.decel = (LANDING.vRef ** 2 - LANDING.vExit ** 2) / (2 * (LANDING.xExit - LANDING.xTd));
  LANDING.tRoll = (LANDING.vRef - LANDING.vExit) / LANDING.decel;
  LANDING.T = LANDING.tApp + LANDING.tRoll;
  // Takeoff: line-up at x=-1650, accel 2.0 m/s² to Vr 75 m/s (~1,400m roll), rotate, climb 80 m/s / 8 m/s
  const TAKEOFF = { x0: -1650, a: 2.0, vr: 75, climbT: 26 };
  TAKEOFF.tRoll = TAKEOFF.vr / TAKEOFF.a;
  TAKEOFF.T = TAKEOFF.tRoll + TAKEOFF.climbT;

  export function computeFlightCyclePose(phaseIdx, pRaw) {
    const p = Math.max(0, Math.min(1, pRaw));
    const lerp = (a, b, tVal) => a + (b - a) * Math.max(0, Math.min(1, tVal));
    const ac = { x: NGO_STAND7_X, y: 0, z: 10, heading: Math.PI / 2, pitch: 0, beaconOn: false };
    let pbbExt = 0;
    let conesOn = false;
    let chocksOn = false;
    let smoke = false;
    const crew = [];
    const gse = [];

    if (phaseIdx === 0) {
      // 1. Final approach (Vref 70 m/s, 3° path) & rollout on RWY 36 — real-time kinematics
      ac.beaconOn = true;
      ac.heading = 0;
      ac.z = -580;
      const tm = p * LANDING.T;
      if (tm < LANDING.tApp) {
        const u = tm / LANDING.tApp;
        ac.x = LANDING.xStart + LANDING.vRef * tm;
        ac.y = LANDING.yStart * (1 - u);
        ac.pitch = u > 0.85 ? 0.08 : 0.03;
        ac.gs = LANDING.vRef;
      } else {
        const tr = tm - LANDING.tApp;
        ac.gs = Math.max(LANDING.vExit, LANDING.vRef - LANDING.decel * tr);
        ac.x = LANDING.xTd + LANDING.vRef * tr - 0.5 * LANDING.decel * tr * tr;
        ac.y = 0;
        ac.pitch = tr < 3 ? 0.06 * (1 - tr / 3) : 0;
        smoke = tr < 1.2;
      }
      crew.push({ x: -16, z: 38, labelJa: 'ランプ員 (ERA外待機・FOD確認済)', labelVi: 'Đội sân đỗ (Chờ ngoài ERA)', labelEn: 'Ramp Crew (Holding Outside ERA)', vest: [190, 242, 100], waving: false });
      gse.push({ kind: 'gpu', x: -18, z: 40, heading: 0 });
    } else if (phaseIdx === 1) {
      // 2. Vacate A6 → crossover → C-TWY → apron link x=0 → marshaller lead-in to Spot 7 stop line (real speeds)
      ac.beaconOn = true;
      const m = NGO_MOTION.taxiIn.sampleAt(p * NGO_MOTION.taxiIn.T);
      ac.x = m.x; ac.z = m.z; ac.heading = m.h; ac.gs = m.gs;
      ac.toStopM = m.L - m.s;
      crew.push({ x: 0, z: 33.5, labelJa: 'マーシャラー (駐機誘導)', labelVi: 'Marshaller (Dẫn tàu)', labelEn: 'Marshaller (Lead-in Signals)', vest: [249, 115, 22], waving: true });
      crew.push({ x: -22.5, z: 8, labelJa: 'ウォッチマン右 (≥5m)', labelVi: 'Canh cánh phải (≥5m)', labelEn: 'Starboard Watchman (≥5m)', vest: [190, 242, 100], waving: true });
      crew.push({ x: 22.5, z: 8, labelJa: 'ウォッチマン左 (≥5m)', labelVi: 'Canh cánh trái (≥5m)', labelEn: 'Port Watchman (≥5m)', vest: [190, 242, 100], waving: true });
      crew.push({ x: -13.5, z: 36, labelJa: 'チョック担当 (ERA外待機)', labelVi: 'Chèn bánh (Chờ ngoài ERA)', labelEn: 'Chock Crew (Hold Outside ERA)', vest: [190, 242, 100], waving: false });
      gse.push({ kind: 'gpu', x: -18, z: 40, heading: 0 });
    } else if (phaseIdx === 2) {
      // 3. On-Block, Beacon OFF, Chocks, Cones, Starboard GPU & Port L1 PBB
      ac.beaconOn = false;
      pbbExt = p;
      chocksOn = p > 0.2;
      conesOn = p > 0.35;
      crew.push({ x: -3.2, z: 24.8, labelJa: '整備士 (輪止め・指差呼称)', labelVi: 'Cơ giới (Chèn bánh & 指差呼称)', labelEn: 'Mechanic (Chocks & Point-and-Call)', vest: [190, 242, 100], waving: false });
      crew.push({ x: -8.5, z: 26.5, labelJa: 'GPU担当 (AC 115V/400Hz)', labelVi: 'Nhân viên GPU (400Hz)', labelEn: 'GPU Operator (115V/400Hz)', vest: [249, 115, 22], waving: false });
      crew.push({ x: 12.0, z: 23.5, labelJa: 'PBB操作員 (左舷L1)', labelVi: 'Vận hành PBB (Cửa L1)', labelEn: 'PBB Operator (Port L1)', vest: [59, 130, 246], waving: false });
      gse.push({ kind: 'gpu', x: lerp(-17.5, -5.4, p), z: lerp(34.5, 26.2, p), heading: 0 });
    } else if (phaseIdx === 3) {
      // 4. Deplaning & Starboard Offloading
      ac.beaconOn = false;
      pbbExt = 1; chocksOn = true; conesOn = true;
      const app = Math.min(1, p * 2.0);
      gse.push({ kind: 'gpu', x: -5.4, z: 26.2, heading: 0 });
      gse.push({ kind: 'lowloader', x: lerp(-18.5, -6.4, app), z: 18.5, heading: 0, hasUld: true, uldType: 'AKH' });
      gse.push({ kind: 'uld_dolly', x: lerp(-20.0, -12.8, app), z: 18.0, heading: 0 });
      gse.push({ kind: 'belt', x: lerp(-17.8, -5.8, app), z: -6.2, heading: 0 });
      crew.push({ x: -9.5, z: 21.8, labelJa: 'ハイリフト誘導員 (5m確認)', labelVi: 'Guideman High-Loader (5m)', labelEn: 'High-Loader Guideman (5m Stop)', vest: [249, 115, 22], waving: false });
      crew.push({ x: -12.2, z: 12.8, labelJa: 'ロードマスター (LIR照合)', labelVi: 'Loadmaster (Kiểm LIR)', labelEn: 'Loadmaster (LIR Check)', vest: [190, 242, 100], waving: false });
      crew.push({ x: 12.5, z: 25.5, labelJa: '旅客係員 (左舷PBB)', labelVi: 'Nhân viên hành khách (PBB)', labelEn: 'Gate Agent (Port PBB)', vest: [59, 130, 246], waving: false });
    } else if (phaseIdx === 4) {
      // 5. Hydrant Fueling, Catering (-19cm) & Lavatory/Water
      ac.beaconOn = false;
      pbbExt = 1; chocksOn = true; conesOn = true;
      crew.push({ x: -13.4, z: 9.2, labelJa: '給油員 (乙4・アース確認)', labelVi: 'Tra dầu Hydrant (Tiếp địa)', labelEn: 'Fueler (Hydrant & Bonding)', vest: [249, 115, 22], waving: false });
      crew.push({ x: -9.5, z: 25.5, labelJa: 'フードローダー誘導 (-19cm)', labelVi: 'Suất ăn R1 (Sàn -19cm)', labelEn: 'Catering R1 (-19cm Sill)', vest: [190, 242, 100], waving: false });
      crew.push({ x: 8.5, z: -6.5, labelJa: '給水担当 (衛生分離)', labelVi: 'Cấp nước sạch (Tách biệt)', labelEn: 'Potable Water (Sanitary)', vest: [59, 130, 246], waving: false });
    } else if (phaseIdx === 5) {
      // 6. Boarding, Outbound ULD/Bulk Loading & Final W&B
      ac.beaconOn = false;
      pbbExt = 1; chocksOn = true; conesOn = true;
      crew.push({ x: -12.2, z: 12.8, labelJa: 'ロードマスター (LIR/ロック確認)', labelVi: 'Loadmaster (Chốt LIR & Khóa)', labelEn: 'Loadmaster (LIR & Sill Locks)', vest: [249, 115, 22], waving: false });
      crew.push({ x: -9.5, z: 21.8, labelJa: '搭載チーム (Close & Lock)', labelVi: 'Đội xếp tải (Close & Lock)', labelEn: 'Cargo Crew (Close & Lock)', vest: [190, 242, 100], waving: false });
      crew.push({ x: 12.5, z: 25.5, labelJa: '搭乗口係員 (PPBM確認)', labelVi: 'Nhân viên Gate (PPBM)', labelEn: 'Gate Agent (PPBM Verified)', vest: [59, 130, 246], waving: false });
    } else if (phaseIdx === 6) {
      // 7. Door Close, GSE Clear outside ERA, Walkaround & Tug Couple
      ac.beaconOn = false;
      pbbExt = 1 - p;
      chocksOn = p < 0.85;
      conesOn = p < 0.45;
      const ang = p * Math.PI * 1.4;
      crew.push({ x: -Math.cos(ang) * 6.5, z: 14 + Math.sin(ang) * 14, labelJa: 'ヘッドセットマン (最終指差呼称)', labelVi: 'Headset Man (Walkaround 指差呼称)', labelEn: 'Headset Man (360° Walkaround)', vest: [249, 115, 22], waving: false });
    } else if (phaseIdx === 7) {
      // 8. Pushback (tail first, ≈4 km/h) onto the inner taxilane & engine start
      ac.beaconOn = true;
      const m = NGO_MOTION.push.sampleAt(p * NGO_MOTION.push.T);
      ac.x = m.x; ac.z = m.z; ac.heading = m.h + Math.PI; ac.gs = m.gs;
      const noseX = ac.x + Math.cos(ac.heading) * 19.5;
      const noseZ = ac.z + Math.sin(ac.heading) * 19.5;
      const portDX = -Math.sin(ac.heading), portDZ = Math.cos(ac.heading);
      crew.push({ x: noseX + portDX * 5.2, z: noseZ + portDZ * 5.2, labelJa: 'ヘッドセットマン (並走)', labelVi: 'Headset Man (Đi kèm mũi)', labelEn: 'Headset Man (Nose Escort)', vest: [249, 115, 22], waving: false });
      crew.push({ x: ac.x + portDX * 21.5, z: ac.z + portDZ * 21.5, labelJa: 'ウイングウォーカー', labelVi: 'Canh đầu cánh', labelEn: 'Wingwalker Escort', vest: [190, 242, 100], waving: true });
    } else if (phaseIdx === 8) {
      // 9. Bypass-pin show & wave-off hold, then taxi-out via taxilane → x=-108 → A-TWY → RWY 36 threshold
      ac.beaconOn = true;
      const m = NGO_MOTION.taxiOut.sampleAt(p * NGO_MOTION.taxiOut.T);
      ac.x = m.x; ac.z = m.z; ac.heading = m.h; ac.gs = m.gs;
        crew.push({ x: -29.0, z: -53.0, labelJa: 'バイパスピン左前方提示・お見送り', labelVi: 'Giơ cờ đỏ Bypass Pin bên trái & Tiễn bay', labelEn: 'Bypass Pin Shown on Left & Wave-Off!', vest: [56, 189, 248], waving: true, pin: true });
        crew.push({ x: -19.0, z: -40.5, labelJa: 'ランプチーム お見送り', labelVi: 'Đội sân đỗ vẫy chào (お見送り)', labelEn: 'Ramp Team Wave-Off (Omiokuri)', vest: [190, 242, 100], waving: true });
    } else {
      // 10. Takeoff roll (2.0 m/s² to Vr 75 m/s ≈ 1,400m) & initial climb on RWY 36
      ac.beaconOn = true;
      ac.z = -580;
      ac.heading = 0;
      const tm = p * TAKEOFF.T;
      if (tm < TAKEOFF.tRoll) {
        ac.x = TAKEOFF.x0 + 0.5 * TAKEOFF.a * tm * tm;
        ac.y = 0;
        ac.gs = TAKEOFF.a * tm;
        ac.pitch = tm > TAKEOFF.tRoll - 3 ? 0.17 * (1 - (TAKEOFF.tRoll - tm) / 3) : 0;
      } else {
        const tc = tm - TAKEOFF.tRoll;
        ac.x = TAKEOFF.x0 + 0.5 * TAKEOFF.a * TAKEOFF.tRoll ** 2 + 80 * tc;
        ac.y = 8 * tc;
        ac.gs = 80;
        ac.pitch = 0.2;
      }
    }

    // Crew & GSE markers above are authored relative to the Spot 7 centreline → move them with the stand
    crew.forEach(c => { c.x += NGO_STAND7_X; });
    gse.forEach(g => { g.x += NGO_STAND7_X; });
    return { ac, pbbExt, conesOn, chocksOn, smoke, crew, gse };
  }

export const A3D_RADIO_COMMS = [
    { ch: 'NGO TWR 118.85',
      ja: 'Centrair Tower: "All Nippon 102, wind 360 at 10kt, Runway 36 (3,500m), cleared to land."（中部滑走路36着陸許可）',
      vi: 'Centrair Tower 118.85: "ANA 102, gió 360/10kt, Đường băng 36 (3.500m), cho phép hạ cánh."',
      en: 'Centrair Tower 118.85: "All Nippon 102, wind 360 at 10kt, Runway 36 (3,500m), cleared to land."' },
    { ch: 'NGO GND 121.8',
      ja: 'Centrair Ground 121.8: "NH102, vacate A6, taxi via A-TWY and C-TWY to Spot 7."（A6離脱→誘導路A・C経由スポット7へ）',
      vi: 'Centrair Ground 121.8: "NH102, rời đường băng qua A6, lăn theo A-TWY và C-TWY vào Spot 7."',
      en: 'Centrair Ground 121.8: "NH102, vacate via A6, taxi via A-TWY and C-TWY to Spot 7. Follow marshaller."' },
    { ch: 'RAMP INT',
      ja: 'Ramp: "オンブロック！赤ビーコン消灯よし！輪止め装着・右舷GPU接続・左舷L1へPBB装着開始！"',
      vi: 'Ramp Intercom: "On-block! Beacon đỏ OFF! Chèn bánh, cắm GPU mũi phải & nối PBB ngang vào cửa L1!"',
      en: 'Ramp Intercom: "On-block! Red beacon OFF verified! Chocks inserted, starboard GPU connected, docking Port L1 PBB!"' },
    { ch: 'OPS 131.4',
      ja: 'Ramp: "5mブレーキ点検よし！右舷前部へハイリフト装着、後部バルク室へベルトローダー装着完了！"',
      vi: 'Ops 131.4: "Thử phanh 5m OK! Đã áp sát High-Lift Loader hầm trước & Belt Loader hầm Bulk sau!"',
      en: 'Ops 131.4: "5m brake-check complete! High-Lift Loader docked at Fwd hold and Belt Loader docked at Aft Bulk!"' },
    { ch: 'FUEL / OPS',
      ja: 'Fueler: "白ピット接続・赤アースよし！Jet A-1給油開始。フードローダー床面-19cm・アウトリガーよし！"',
      vi: 'Fueler: "Nối hố Trắng & tiếp địa Đỏ OK! Bơm Jet A-1. Xe suất ăn hạ chân chống & căn sàn -19cm OK!"',
      en: 'Fueler: "White hydrant pit & red bonding verified! Pumping Jet A-1. Catering outriggers set at -19cm sill!"' },
    { ch: 'LOAD CTRL',
      ja: 'Loadmaster: "LIR照合・コンター異常なし・全フロアロック施錠よし！最終Load Sheet機長提出済！"',
      vi: 'Load Control: "Khớp LIR, không vượt Contour, đã gạt đủ khóa sàn Close & Lock! Đã giao Load Sheet & NOTOC!"',
      en: 'Loadmaster: "LIR positions matched, contour clear, all floor locks engaged! Signed Load Sheet & NOTOC delivered!"' },
    { ch: 'HEADSET',
      ja: 'Headset: "全ドア閉鎖・PBB収納・全GSEがERA赤線外へ退避完了！バイパスピン挿入・ブレーキSET確認！"',
      vi: 'Headset Man: "Đóng kín mọi cửa, thu PBB, rút sạch GSE ngoài vạch đỏ ERA! Đã cắm Bypass Pin & xác nhận phanh SET!"',
      en: 'Headset Man: "All doors closed, PBB retracted, all GSE clear of red ERA! Bypass pin inserted, confirm brakes SET!"' },
    { ch: 'NGO GND 121.8',
      ja: 'Headset: "プッシュバック承認取得！ブレーキ解除願います。周囲クリア、エンジン2・1始動どうぞ！"',
      vi: 'Headset Man: "Đã có phép Pushback! Mời nhả phanh đỗ. Xung quanh trống an toàn, mời nổ máy số 2 & số 1!"',
      en: 'Headset Man: "Pushback approved! Release parking brake. Area clear, clear to start Engines 2 and 1!"' },
    { ch: 'HEADSET',
      ja: 'Headset: "トーバー切離し・バイパスピン抜去！左前方で提示します。行ってらっしゃいませ！(お見送り)"',
      vi: 'Headset Man: "Đã tháo thanh kéo & rút chốt đỏ Bypass Pin! Mời nhìn bên trái, chúc chuyến bay thượng lộ bình an!"',
      en: 'Headset Man: "Towbar disconnected, bypass pin removed! Showing pin on your forward-left. Have a safe flight!"' },
    { ch: 'NGO TWR 118.85',
      ja: 'Centrair Tower: "All Nippon 102, Runway 36 (3,500m), cleared for takeoff!"（中部滑走路36離陸許可！）',
      vi: 'Centrair Tower 118.85: "ANA 102, Đường băng 36 (3.500m), cho phép cất cánh!"',
      en: 'Centrair Tower 118.85: "All Nippon 102, Runway 36 (3,500m), cleared for takeoff!"' }
  ];

  // 3D Volumetric Clouds Spanning the 4.37km Island & Ise Bay
  export const A3D_CLOUDS = [
    { x: -1450, y: 340, z: -920, sx: 220, sz: 95, spd: 5.2 },
    { x: -480, y: 390, z: -1150, sx: 280, sz: 110, spd: 4.4 },
    { x: 520, y: 360, z: -860, sx: 240, sz: 95, spd: 5.8 },
    { x: 1380, y: 410, z: -1080, sx: 260, sz: 105, spd: 4.1 },
    { x: -920, y: 375, z: 680, sx: 230, sz: 90, spd: 4.8 },
    { x: 860, y: 355, z: 740, sx: 250, sz: 98, spd: 5.0 }
  ];

export const A3D_AIRPORTS = {
    NGO: { id: 'NGO', nameJa: '中部国際 セントレア (NGO · 実寸4.37km島)', nameVi: 'Chubu Centrair NGO (Đảo thật 4,37km)', nameEn: 'Chubu Centrair NGO (1:1 4.37km Island)', rwy: '36/18', twr: 'Centrair Tower 118.85', island: true, snow: false, city: false, bridge: true, seaCol: [28, 92, 148], landCol: [212, 224, 204] },
    HND: { id: 'HND', nameJa: '羽田空港 (HND)', nameVi: 'Tokyo Haneda HND', nameEn: 'Tokyo Haneda (HND)', rwy: '34R/16L', twr: 'Tokyo Tower 118.1', island: true, snow: false, city: true, bridge: false, seaCol: [44, 96, 148], landCol: [212, 224, 206] },
    NRT: { id: 'NRT', nameJa: '成田国際 (NRT)', nameVi: 'Narita NRT', nameEn: 'Tokyo Narita (NRT)', rwy: '34L/16R', twr: 'Narita Tower 118.2', island: false, snow: false, city: false, bridge: false, seaCol: [104, 138, 84], landCol: [216, 232, 204] },
    KIX: { id: 'KIX', nameJa: '関西国際 (KIX)', nameVi: 'Kansai KIX', nameEn: 'Kansai Intl (KIX)', rwy: '06R/24L', twr: 'Kansai Tower 118.2', island: true, snow: false, city: false, bridge: true, seaCol: [42, 102, 158], landCol: [218, 228, 212] },
    CTS: { id: 'CTS', nameJa: '新千歳空港 (CTS)', nameVi: 'Shin-Chitose CTS (Tuyết)', nameEn: 'New Chitose (CTS · Snow)', rwy: '01L/19R', twr: 'Chitose Tower 118.8', island: false, snow: true, city: false, bridge: false, seaCol: [224, 236, 248], landCol: [242, 248, 255] }
  };

export const A3D_VIEWPOINTS = [
    { id: 'flight_follow', key: '1', ja: '✈ 機体追従', vi: '✈ Theo máy bay', en: '✈ Aircraft Follow',
      descJa: '3,500m滑走路の着陸からスポット7駐機・離陸まで機体を自動追従する3Dシネマティック視点',
      descVi: 'Camera 3D tự động bám theo tàu bay từ hạ cánh trên đường băng 3.500m tới Spot 7 và cất cánh',
      descEn: 'Cinematic 3D chase camera tracking the aircraft across the 3,500m runway, taxiways, Spot 7, and climb-out' },
    { id: 'pilot', key: '2', ja: '🧑‍✈️ コックピット', vi: '🧑‍✈️ Buồng lái', en: '🧑‍✈️ Cockpit HUD',
      descJa: '機長席からの実視野：3,500m滑走路PAPI灯・誘導路・マーシャラー・左前方バイパスピン提示を体験',
      descVi: 'Góc nhìn Cơ trưởng trong buồng lái: nhìn đèn PAPI đường băng 3.500m, Marshaller & cờ đỏ Bypass Pin',
      descEn: 'Captain\'s first-person cockpit view: 3,500m runway PAPI, taxiway signs, marshaller wands & bypass pin salute' },
    { id: 'tower', key: '3', ja: '🗼 管制塔 (86.7m)', vi: '🗼 Đài không lưu', en: '🗼 ATC Tower (86.7m)',
      descJa: '高さ86.75mの中部管制塔キャブから4.37km空港島・3,500m滑走路・T1/T2/貨物地区を一望',
      descVi: 'Từ buồng kính Đài không lưu Chubu (cao 86,75m) quan sát toàn đảo 4,37km, đường băng 3.500m, T1, T2 & Cargo',
      descEn: 'Panoramic view from the 86.75m Centrair ATC Tower cab overlooking the 4.37km island, 3,500m runway & terminals' },
    { id: 'marshaller', key: '4', ja: '🦺 マーシャラー', vi: '🦺 Marshaller', en: '🦺 Marshaller POV',
      descJa: 'Spot 7 停止バー前方（目線1.8m）から進入してくる機首と両エンジンを見る誘導員視点',
      descVi: 'Tầm mắt nhân viên dẫn tàu (1,8m) ngay trước mũi máy bay tại vạch dừng Spot 7',
      descEn: 'Eye-level (1.8m) marshaller view ahead of Spot 7 stop bar facing the approaching nose and engines' },
    { id: 'headset', key: '5', ja: '🎧 ヘッドセットマン', vi: '🎧 Headset Man', en: '🎧 Headset Man',
      descJa: '前輪横を並走するヘッドセットマン目線：ウォークアラウンド・プッシュバック・お見送りを体感',
      descVi: 'Tầm mắt nhân viên tai nghe đi cạnh bánh mũi khi kiểm tra vòng quanh, đẩy lùi & giơ cờ đỏ tiễn bay',
      descEn: 'First-person Headset Man perspective beside the nose gear during walkaround, pushback, and bypass pin salute' },
    { id: 'loadmaster', key: '6', ja: '📦 貨物室・LIR', vi: '📦 Loadmaster', en: '📦 Starboard GSE',
      descJa: '右舷貨物室横からの視点：ハイリフト・ベルト・ハイドラント給油車・フードローダーを至近確認',
      descVi: 'Đứng bên mạn phải Spot 7 quan sát cận cảnh High-Loader, Belt Loader, xe tra dầu Hydrant & xe suất ăn',
      descEn: 'Close-up starboard ramp view of High-Lift Loader, Belt Loader, Hydrant Servicer, and Catering operations' },
    { id: 'terminal', key: '7', ja: '🪟 スカイデッキ', vi: '🪟 Sky Deck 300m', en: '🪟 300m Sky Deck',
      descJa: 'セントレア名物「300mセンターピア・スカイデッキ」先端付近から駐機機材と滑走路・伊勢湾を望む視点',
      descVi: 'Đứng trên đài quan sát ngoài trời Centrair Sky Deck (Center Pier 300m) ngắm dàn tàu bay, đường băng & Vịnh Ise',
      descEn: 'Observation view from Centrair\'s famous 300m Center Pier Sky Deck overlooking the apron, runway, and Ise Bay' },
    { id: 'gse_cab', key: '8', ja: '🚜 GSE運転席', vi: '🚜 Cabin xe TT', en: '🚜 TT Driver Cab',
      descJa: 'オープンキャブTT牽引車の運転席一人称視点：白線通路・ERA赤線・監視員合図をドライバー目線で確認',
      descVi: 'Góc nhìn thứ nhất trên ghế lái xe kéo TT mui trần — quan sát vạch đường, ERA đỏ & giám sát viên cực thật',
      descEn: 'First-person open-cab TT tractor driver view for airside lane markings, red ERA lines, and spotter signals' },
    { id: 'backing', key: 'B', ja: '🅿 牽引バック視点', vi: '🅿 Lùi chuồng đầu kéo', en: '🅿 Trailer Backing',
      descJa: 'トレーラー牽引バック車庫入れ専用カメラ：TT頭・ヒッチ折れ角・荷台後端とBAY 01枠線を一望',
      descVi: 'Góc nhìn chuyên dụng lùi rơ-moóc vào chuồng như xe đầu kéo: thấy rõ góc gập moóc và vạch BAY 01',
      descEn: 'Dedicated semi-trailer reverse bay-parking camera showing tractor, hitch angle, trailer tail, and BAY 01' },
    { id: 'marshal_rear', key: 'M', ja: '🧍 マーシャラー後方', vi: '🧍 Sau lưng Marshaller', en: '🧍 Behind Marshaller',
      descJa: 'マーシャラーの背後から：腕・パドルの動きと、合図に反応する航空機を同時に確認',
      descVi: 'Đứng sau lưng Marshaller: thấy rõ động tác tay/gậy và máy bay phản ứng theo từng tín hiệu',
      descEn: 'From behind the marshaller: see the arm/wand signals and how the aircraft responds to each one' },
    { id: 'orbit', key: '9', ja: '🔄 3D自由回転', vi: '🔄 Xoay 3D tự do', en: '🔄 Free 3D Orbit',
      descJa: 'マウスドラッグで360度回転・ホイールで最大3,800mまでズームできる自由観察カメラ',
      descVi: 'Kéo chuột xoay 360° & cuộn bánh xe zoom mượt từ cận cảnh 18m tới toàn đảo 3.800m',
      descEn: 'Free 360° orbit camera with smooth scroll zoom from 18m close-up out to 3,800m full-island scale' },
    { id: 'top', key: '0', ja: '🗺 空港島全体俯瞰', vi: '🗺 Toàn cảnh đảo 1:1', en: '🗺 Full Island Map',
      descJa: '中部国際空港の4.37km人工島・3,500m滑走路・T1/T2/沖留/貨物/連絡橋と交通流を一望する俯瞰視点',
      descVi: 'Góc nhìn đại cảnh toàn bộ đảo sân bay NGO 4,37km, đường băng 3.500m, T1, T2, Cargo, cầu Skyway & luồng giao thông',
      descEn: 'Full-scale aerial overview of Chubu Centrair\'s 4.37km island, 3,500m runway, T1, T2, Cargo, Skyway Bridge & live traffic' }
  ];

export function computeViewpointCamera(camMode, isFlightMode, flightPose, veh, orbitCam, phaseIdx, extra = null) {
    const ac = flightPose ? flightPose.ac : { x: NGO_STAND7_X, y: 0, z: 10, heading: Math.PI / 2, pitch: 0 };
    const ch = Math.cos(ac.heading), sh = Math.sin(ac.heading);
    const cp = Math.cos(ac.pitch || 0), sp = Math.sin(ac.pitch || 0);
    const refOffL = (extra && extra.acInfo && extra.acInfo.refOff) || 0;
    const acLocalToW = (lx, ly, lz0) => {
      const lz = lz0 + refOffL;
      const ly1 = ly * cp + lz * sp;
      const lz1 = -ly * sp + lz * cp;
      return [ac.x - lx * sh + lz1 * ch, ac.y + ly1, ac.z + lx * ch + lz1 * sh];
    };

    const acInfo = (extra && extra.acInfo) || { halfL: 18.8, cockpitY: 4.7 };
    // Point on the aircraft every ground-crew POV looks at (cockpit window) — follows the moving jet
    const acCockpit = acLocalToW(0, acInfo.cockpitY - 0.6, acInfo.halfL - 3.0);
    const crewEye = (pt, fallback) => (pt ? [pt[0], 1.68, pt[1]] : fallback);
    if (camMode === 'pilot') {
      return {
        pos: acLocalToW(0, acInfo.cockpitY, acInfo.halfL - 2.6),
        target: acLocalToW(0, acInfo.cockpitY - 1.2, acInfo.halfL + 120.0),
        fov: 58,
        povKind: 'pilot'
      };
    }
    if (camMode === 'tower') {
      const lookAt = isFlightMode ? [ac.x, Math.max(1.5, ac.y + 2), ac.z] : [veh.x, 1.5, veh.z];
      return { pos: [330, 82.5, 172], target: lookAt, fov: 46, povKind: 'tower' };
    }
    // Ground-crew POVs: eye = the actual 3D crew member's head (1.68m), always looking at the aircraft
    const crew = (extra && extra.crew) || {};
    if (camMode === 'marshaller') {
      const eye = crewEye(crew.marshaller, [NGO_STAND7_X, 1.68, (extra && extra.noseZ ? extra.noseZ : 29) + 6]);
      return { pos: eye, target: acCockpit, fov: 55, povKind: 'marshaller' };
    }
    if (camMode === 'marshal_rear') {
      // Over-the-shoulder: behind & slightly left of the marshaller, so the trainee sees his arm signals AND the aircraft reacting
      const mp = crew.marshaller || [0, (extra && extra.noseZ ? extra.noseZ : 29) + 6];
      const dx = mp[0] - ac.x, dz = mp[1] - ac.z;
      const d = Math.max(1, Math.hypot(dx, dz));
      const ux = dx / d, uz = dz / d;
      const pos = [mp[0] + ux * 9.5 - uz * 2.6, 2.5, mp[1] + uz * 9.5 + ux * 2.6];
      const tgt = [mp[0] * 0.3 + acCockpit[0] * 0.7, 3.2, mp[1] * 0.3 + acCockpit[2] * 0.7];
      return { pos, target: tgt, fov: 58, povKind: 'marshal_rear' };
    }
    if (camMode === 'headset') {
      const eye = crewEye(crew.headset, acLocalToW(3.5, 1.68, acInfo.halfL - 4));
      return { pos: eye, target: acLocalToW(0, 1.2, acInfo.halfL - 5.5), fov: 60, povKind: 'headset' };
    }
    if (camMode === 'loadmaster') {
      const cargo = (extra && extra.cargoDoor) || [-2.0, 2.2, 18];
      const eye = crew.loadmaster ? [crew.loadmaster[0], 1.68, crew.loadmaster[1]] : [cargo[0] - 9.5, 1.68, cargo[2] - 6.5];
      return { pos: eye, target: cargo, fov: 58, povKind: 'loadmaster' };
    }
    if (camMode === 'terminal') {
      // Centrair Sky Deck (roof of the 300m Center Pier, deck floor y ≈ 15.6m)
      const look = isFlightMode ? [ac.x, Math.max(2, ac.y + 3), ac.z] : [0, 3.5, 10];
      const nearStands = look[2] > -120 && look[0] < 300 && look[0] > -300;
      const pos = nearStands
        ? [30.2, 17.4, Math.max(-168, Math.min(-12, look[2] - 28))]   // at the pier-roof edge rail, facing Spot 7
        : [46, 18.2, -176.4];                                           // at the deck-tip rail, facing the runway
      return { pos, target: look, fov: 52, povKind: 'terminal' };
    }
    if ((camMode === 'gse_cab' || camMode === 'backing') && isFlightMode && extra && extra.beltCab) {
      return { pos: extra.beltCab.pos, target: extra.beltCab.target, fov: 62, povKind: 'gse_cab' };
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
        return { pos: [midX, Math.min(220, 38 * zMul), midZ + 2.5], target: [midX, 0, midZ], fov: 48, povKind: 'top' };
      }
      // Full 1:1 Chubu Centrair 4.37km Island Aerial Panorama!
      return { pos: [40, Math.min(3600, 1850 * zMul), 520], target: [40, 0, -210], fov: 52, povKind: 'top' };
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
    // Cinematic chase: behind-left of the aircraft, rotates with its heading (never swings across the scene)
    const isRwyPhase = (phaseIdx === 0 || phaseIdx === 1 || phaseIdx === 8 || phaseIdx === 9);
    const dist = (isRwyPhase ? 3.2 : 2.4) * Math.max(16, acInfo.halfL);
    const elev = isRwyPhase ? 0.42 : 0.5;
    const back = acLocalToW(-dist * 0.45, 0, -dist * 0.85);
    return {
      pos: [back[0], Math.max(8, ac.y + dist * elev), back[2]],
      target: [ac.x, ac.y + 3.2, ac.z],
      fov: 48,
      povKind: 'flight_follow'
    };
  }

// Phase durations follow the real-time kinematics above (1x = real time)
(() => {
  const set = (id, T) => { const ph = A3D_FLIGHT_PHASES.find(x => x.id === id); if (ph) ph.duration = Math.round(T * 10) / 10; };
  set('landing', LANDING.T);
  set('taxi_in', NGO_MOTION.taxiIn.T);
  set('pushback', NGO_MOTION.push.T);
  set('waveoff_taxiout', NGO_MOTION.taxiOut.T);
  set('takeoff', TAKEOFF.T);
})();
