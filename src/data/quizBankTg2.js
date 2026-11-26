// 特定技能2号（航空分野・グランドハンドリング）60問試験対策バンク
// JAEA 特定技能2号評価試験範囲・IATA AHM / IGOM / DGR 準拠 (JA / VI / EN)

export const QUIZ_BANK_TG2 = [
  {
    id: 'T2Q001', topic: 'tg2_loadcontrol', level: 2,
    qJa: '搭載完了後に乗客2名と受託手荷物2個（計45kg）が直前キャンセルとなった。ロードコントロールへのLMC（直前変更）報告として正しい対応は？',
    qVi: 'Sau khi xếp tải xong có 2 khách và 2 kiện hành lý (tổng 45 kg) hủy sát giờ. Cách báo cáo thay đổi giờ chót (LMC / 直前変更) lên Load Control nào là đúng?',
    qEn: 'After loading is complete, 2 passengers and 2 checked bags (total 45 kg) are offloaded last-minute. What is the correct LMC (Last Minute Change) action with Load Control?',
    optsJa: [
      '重量が軽くなる方向の変更なので、LMC連絡を省略してそのままドアを閉める',
      '搭載位置・減量値を直ちにロードコントロールへ連絡し、LMC反映後のロードシート再確認を行う',
      '次便の記録と合算すればよいため、定時出発を優先して事後報告にする',
      '45kg未満の変更は常に制限値に影響しないため、作業責任者の判断だけで完結する'
    ],
    optsVi: [
      'Vì thay đổi làm máy bay nhẹ đi nên bỏ qua báo LMC và đóng cửa khởi hành luôn',
      'Báo ngay vị trí dỡ và mức giảm tải cho Load Control để cập nhật LMC và xác nhận lại Loadsheet',
      'Ưu tiên đúng giờ rồi gộp báo cáo sau khi máy bay đã cất cánh sang chuyến kế tiếp',
      'Dưới 50 kg không ảnh hưởng trọng tâm nên trưởng nhóm tác nghiệp (作業責任者) tự quyết không cần báo'
    ],
    optsEn: [
      'Skip LMC notification and close doors since a weight reduction is always safe',
      'Report exact position and weight deduction to Load Control immediately and re-verify the updated Loadsheet',
      'Prioritize on-time departure and file the weight adjustment after takeoff',
      'Under-50 kg changes never affect trim, so the supervisor may finalize without Load Control'
    ],
    ans: 1,
    expJa: '重量が増える場合だけでなく減少する場合でも重心位置（%MAC）や離陸トリム設定が変化するため、規定範囲内のLMCでも必ずロードコントロールへ報告し最新値を確定させる必要があります。',
    expVi: 'Dù tăng hay giảm trọng lượng đều làm thay đổi trọng tâm (%MAC) và góc trim cất cánh. Bỏ qua LMC khiến cơ trưởng dùng số liệu sai để tính cất cánh, rất nguy hiểm.',
    expEn: 'Both weight additions and deductions shift %MAC and takeoff stabilizer trim. Omitting an LMC leaves the flight crew with inaccurate takeoff performance data.'
  },
  {
    id: 'T2Q002', topic: 'tg2_loadcontrol', level: 2,
    qJa: '搭載指示書（LIR）と現物のULDタグを照合した際、番号は一致しているが実測重量がLIR記載より800kg重かった。作業責任者として取るべき行動は？',
    qVi: 'Khi đối chiếu phiếu chỉ thị xếp tải (LIR / 搭載指示書) với thẻ ULD thực tế, số hiệu khớp nhưng cân nặng thực tế nặng hơn LIR 800 kg. Trưởng nhóm (作業責任者) phải làm gì?',
    qEn: 'During LIR-to-ULD tag verification, the ULD ID matches but the actual scale weight is 800 kg heavier than listed on the LIR. What must the supervisor do?',
    optsJa: [
      '搭載してもLIRの合計値の範囲内なら問題ないため、そのまま機内へロックする',
      'タグの記載ミスとみなし、LIR側の数字をボールペンで修正して搭載を続行する',
      '800kg分を後部バルク室へ手作業で移し替えればLIRを書き換えずに済む',
      '搭載を一時保留し、直ちにロードコントロールへ実測重量を報告して再計算・新LIRの指示を待つ'
    ],
    optsVi: [
      'Vẫn xếp và khóa chốt bình thường nếu tổng tải toàn tàu chưa vượt giới hạn',
      'Coi là lỗi in thẻ, tự lấy bút sửa số trên LIR rồi tiếp tục xếp lên máy bay',
      'Chuyển bớt 800 kg sang hầm Bulk phía sau để khỏi phải báo sửa LIR',
      'Tạm dừng xếp thùng đó, báo ngay trọng lượng thực tế cho Load Control tính lại và chờ LIR mới'
    ],
    optsEn: [
      'Proceed with loading and lock the ULD if total aircraft weight still looks within limits',
      'Assume a tag typo, manually alter the LIR figure with a pen, and continue loading',
      'Manually shift 800 kg into the aft bulk hold so the LIR does not need updating',
      'Hold loading the ULD, report the actual scale weight to Load Control, and await recalculated LIR instructions'
    ],
    ans: 3,
    expJa: '800kgの差異は個別ポジション上限・線形荷重制限・%MAC・MTOW超過に直結する重大事項です。現場判断での搭載やLIRの無断改ざんは厳禁であり、必ずロードコントロールの再計算を待ちます。',
    expVi: 'Chênh lệch 800 kg có thể làm vượt tải vị trí sàn, lệch %MAC hoặc quá MTOW. Tự ý xếp hoặc tự sửa LIR là vi phạm nghiêm trọng quy trình kiểm soát tải.',
    expEn: 'An 800 kg discrepancy can exceed compartment/position limits, %MAC, or MTOW. Never load or alter an LIR without Load Control recalculation.'
  },
  {
    id: 'T2Q003', topic: 'tg2_loadcontrol', level: 2,
    qJa: '貨物の重心が偏って積まれたULD（偏荷重）をそのまま貨物室ポジションに搭載した場合、どのようなリスクがあるか？',
    qVi: 'Nếu đưa một ULD xếp lệch tâm (偏荷重) nguyên trạng vào vị trí khóa trong hầm hàng tàu bay thì phát sinh rủi ro gì?',
    qEn: 'What risk arises if a ULD with severe internal eccentric loading (off-center weight) is loaded into an aircraft cargo position?',
    optsJa: [
      '機体床面構造への局所過荷重、ロール方向のバランス悪化、およびロック装置破損の原因となる',
      'コンテナの外部バーコードが読み取りにくくなるだけで、機体構造には影響しない',
      '客室の空調効率がわずかに低下するだけで、飛行性能への影響はない',
      '着陸時のブレーキ制動距離が短くなるため、むしろ安全性が高まる'
    ],
    optsVi: [
      'Gây quá tải cục bộ sàn hầm hàng, mất cân bằng ngang (roll) và hỏng chốt khóa sàn',
      'Chỉ làm khó quét mã vạch bên ngoài thùng chứ không ảnh hưởng kết cấu tàu bay',
      'Chỉ làm giảm nhẹ hiệu suất điều hòa cabin, không ảnh hưởng tính năng bay',
      'Giúp rút ngắn quãng đường phanh khi hạ cánh nên an toàn hơn'
    ],
    optsEn: [
      'It causes localized floor structural overload, lateral roll imbalance, and lock latch failure',
      'It only makes the external ULD barcode harder to scan without affecting airframe limits',
      'It slightly reduces cabin air-conditioning efficiency with zero impact on flight performance',
      'It improves landing braking performance by adding downward tire grip'
    ],
    ans: 0,
    expJa: '偏荷重ULDは床面強度（Area Load / Linear Load）の局所超過やラッチへの過大応力、横方向重心の偏りを招くため、ビルドアップ段階で均等積載と補強板（スプレッダー）施工が必須です。',
    expVi: 'ULD lệch tâm gây quá tải cục bộ mặt sàn, gãy chốt khóa và lệch cân bằng ngang. Phải xếp đều tải và lót ván phân tải (補強板) ngay từ khâu buildup.',
    expEn: 'Eccentric ULD loads overload localized floor structure, stress restraint latches, and skew lateral balance; balanced build-up and shoring planks are mandatory.'
  },
  {
    id: 'T2Q004', topic: 'tg2_loadcontrol', level: 2,
    qJa: 'ロードシートにおける「%MAC」が後方限界（Aft Limit）を超えた状態で離陸した場合の最も危険な現象はどれか？',
    qVi: 'Nếu máy bay cất cánh khi chỉ số trọng tâm %MAC trên Loadsheet (ロードシート) vượt quá giới hạn sau (Aft Limit), hiện tượng nguy hiểm nhất là gì?',
    qEn: 'What is the most dangerous aerodynamic consequence if an aircraft takes off with %MAC beyond the Aft CG Limit on the Loadsheet?',
    optsJa: [
      '主翼の揚力が増大しすぎて巡航高度まで到達できなくなる',
      '機首が極端に重くなり、滑走路上で前輪が上がらず離陸できなくなる',
      '機首が上がりすぎて縦安定性が低下し、失速（ストール）や回復困難なピッチアップを招く',
      '燃料消費率が大幅に改善するが、脚収納速度が少し遅くなる'
    ],
    optsVi: [
      'Lực nâng cánh tăng quá mạnh làm tàu bay không giữ được độ cao hành trình',
      'Mũi quá nặng khiến bánh mũi không nhấc lên được trên đường băng',
      'Mũi ngóc quá mức, giảm ổn định dọc, dễ thất tốc (stall) và khó cứu ngóc mũi',
      'Tiết kiệm nhiên liệu hơn nhưng tốc độ thu càng hơi chậm lại'
    ],
    optsEn: [
      'Excessive wing lift preventing the aircraft from leveling off at cruise altitude',
      'Extreme nose-heavy attitude preventing nose-wheel liftoff during takeoff rotation',
      'Excessive nose-up tendency and reduced longitudinal stability, risking stall and unrecoverable pitch-up',
      'Improved fuel burn accompanied only by slightly slower landing gear retraction'
    ],
    ans: 2,
    expJa: '重心が後方限界を超えると静的縦安定性が失われ、離陸時や低速時に過度な機首上げ・失速から回復不能になる恐れがあります。なお地上駐機中（取卸順序ミス）は尻もち（テイルティップ）の危険もあります。',
    expVi: 'CG lệch sau quá giới hạn làm mất ổn định dọc, dễ ngóc mũi mất kiểm soát và thất tốc. Khi đỗ trên mặt đất dỡ sai thứ tự còn gây chúi đuôi (tail-tip).',
    expEn: 'Exceeding the Aft CG limit degrades longitudinal stability and risks uncontrollable pitch-up and stall; on the ground, improper offload order can also cause tail-tipping.'
  },
  {
    id: 'T2Q005', topic: 'tg2_loadcontrol', level: 2,
    qJa: '大型貨物機やワイドボディ機でパレット貨物（PMC/PAG等）を搭載する前、コンターゲージ（Contour Gauge）確認を行う最大の理由は？',
    qVi: 'Lý do quan trọng nhất của việc kiểm tra khung giới hạn biên dạng (Contour Gauge / コンター確認) trước khi xếp pallet PMC/PAG lên máy bay là gì?',
    qEn: 'What is the primary reason for checking palletized cargo (PMC/PAG) against a Contour Gauge before aircraft loading?',
    optsJa: [
      '貨物の見た目を美しく整え、荷主からのクレームを防ぐため',
      'ハイリフトローダーのエンジン回転数を一定に保つため',
      '機体胴体の湾曲内壁・天井消火設備・スプリンクラー/煙探知機との接触損傷を防ぐため',
      '通関検査時のX線透過率を均一にするため'
    ],
    optsVi: [
      'Giúp kiện hàng trông gọn đẹp hơn để tránh khiếu nại từ chủ hàng',
      'Giữ vòng tua động cơ xe nâng High-Lift Loader luôn ổn định',
      'Ngăn hàng hóa chạm làm hư hỏng vách cong thân tàu bay, cảm biến khói và hệ thống chữa cháy trần hầm',
      'Đảm bảo tia X soi chiếu hải quan xuyên qua đồng đều'
    ],
    optsEn: [
      'To keep cargo appearance neat and prevent shipper complaints',
      'To maintain constant engine RPM on the High-Lift Loader',
      'To prevent contact damage to curved fuselage walls, ceiling fire suppression, and smoke detectors',
      'To ensure uniform X-ray penetration during customs screening'
    ],
    ans: 2,
    expJa: 'コンター逸脱したパレットを無理に押し込むと、圧力隔壁や側壁パネル、天井の煙探知機・消火配管を破損させ、重大な機体損傷（AOG）を引き起こします。',
    expVi: 'Đẩy pallet vượt Contour vào hầm sẽ làm rách vách chịu áp suất, gãy cảm biến khói hoặc ống chữa cháy trần hầm, gây hư hại tàu bay nghiêm trọng (AOG).',
    expEn: 'Forcing an over-contour pallet into a hold can rupture pressure liners, walls, or overhead fire/smoke detection systems, causing an AOG incident.'
  },
  {
    id: 'T2Q006', topic: 'tg2_loadcontrol', level: 2,
    qJa: '重機や大型金属部品など接地面積が小さく高重量の貨物をパレットに積む際、床面荷重制限を守るために必ず実施する処置は？',
    qVi: 'Khi xếp hàng nặng có diện tích tiếp xúc đáy nhỏ (như máy móc, khối kim loại) lên pallet, biện pháp bắt buộc để không vượt giới hạn tải sàn là gì?',
    qEn: 'When loading dense, heavy cargo with a small footprint onto an aircraft pallet, what mandatory measure protects the aircraft floor load limit?',
    optsJa: [
      '角材や合板などの補強板（スプレッダー/ショアリング）を敷いて荷重を広い面積に分散させる',
      'パレット中央の1点に集中させて動かないようロープだけで縛る',
      '金属部品の下に段ボールを1枚敷くだけで十分である',
      'パレットを使わず、そのままバルク室の床に直接置いてネットで押さえる'
    ],
    optsVi: [
      'Kê thanh gỗ/tấm ván phân tải (補強板 / Spreader-Shoring) để trải đều trọng lượng ra diện tích rộng',
      'Đặt tập trung đúng 1 điểm chính giữa pallet rồi chỉ buộc dây thừng',
      'Chỉ cần lót 1 lớp bìa carton mỏng dưới khối kim loại là đủ',
      'Không dùng pallet mà đặt thẳng trực tiếp lên sàn hầm Bulk rồi phủ lưới'
    ],
    optsEn: [
      'Place wooden spreader planks/shoring beneath the load to distribute weight over a wider area',
      'Center it on a single point of the pallet and secure only with rope',
      'Place a single sheet of cardboard under the metal base',
      'Skip the pallet and place it directly onto the bulk hold floor under a net'
    ],
    ans: 0,
    expJa: '単位面積あたりの床面荷重（Floor Load Limit）や線形荷重制限（Linear Load Limit）を超えると床構造が陥没するため、算出した必要面積以上の補強板（スプレッダー）と適切なタイダウンが必須です。',
    expVi: 'Vượt giới hạn tải điểm/tải tuyến sẽ làm sập sàn tàu bay. Bắt buộc lót ván phân tải (補強板) đủ diện tích tính toán và chằng buộc (タイダウン) đúng quy chuẩn.',
    expEn: 'Exceeding floor area or linear load limits causes structural floor collapse; properly sized shoring/spreader planks and tie-down straps are mandatory.'
  },
  {
    id: 'T2Q007', topic: 'tg2_loadcontrol', level: 2,
    qJa: '貨物室へのULD搭載完了後、「クローズ・アンド・ロック（Close & Lock）」確認で作業責任者が最終点検すべき項目として最も適切なものは？',
    qVi: 'Sau khi đẩy hết ULD vào hầm hàng, trong bước kiểm tra cuối "Close & Lock" (クローズ・アンド・ロック), trưởng nhóm phải kiểm tra gì?',
    qEn: 'After ULD loading is complete, what must the supervisor verify during the final "Close & Lock" inspection?',
    optsJa: [
      '空コンテナ（EMPTY ULD）は軽いためロックを省略してよい',
      '手前の1ポジションだけロックが上がっていれば奥は固定されているとみなす',
      'ドアを閉める直前にロックを下げておかないと、次の空港で開かなくなる',
      '全ポジションのフロアロック（ストッパー）が確実に起立・施錠されていることと、LIRとの位置一致'
    ],
    optsVi: [
      'Container rỗng (EMPTY ULD) rất nhẹ nên có thể bỏ qua khóa sàn',
      'Chỉ cần chốt vị trí ngoài cùng dựng lên là đủ giữ các thùng phía trong',
      'Phải hạ hết chốt khóa trước khi đóng cửa để sân bay đến mở ra dễ hơn',
      'Toàn bộ chốt khóa sàn (フロアロック) ở mọi vị trí đều đã dựng khóa chắc chắn và khớp vị trí trên LIR'
    ],
    optsEn: [
      'Empty ULDs are light enough that floor locks are unnecessary',
      'Only the outermost lock near the cargo door needs to be raised',
      'Floor locks must be lowered before closing the cargo door so destination staff can offload easily',
      'All floor locks/stops across every occupied position are raised and latched, matching the LIR'
    ],
    ans: 3,
    expJa: '空コンテナであっても飛行中の気流や加速・減速で移動すれば機体破損やCG急変を招きます。すべての搭載ポジションのロック起立・施錠を「指差呼称」で確認するのが鉄則です。',
    expVi: 'Kể cả thùng rỗng, nếu không khóa chốt sẽ trượt va đập khi bay gây hỏng vách hoặc lệch CG đột ngột. Phải kiểm tra bằng chỉ tay hô xác nhận (指差呼称) toàn bộ chốt.',
    expEn: 'Even empty ULDs can shift during turbulence or acceleration if unlatched, damaging bulkheads or shifting CG. Point-and-call verification of every lock is mandatory.'
  },
  {
    id: 'T2Q008', topic: 'tg2_loadcontrol', level: 2,
    qJa: '到着機の取卸し時、前部貨物室（FWD Hold）より先に後部貨物室（AFT Hold）から一気に出すべきでない（または前部から降ろすべきでない）など「取卸順序」が指定される主な理由は？',
    qVi: 'Khi dỡ hàng tàu đến, tại sao LIR thường quy định chặt chẽ thứ tự dỡ hầm trước/hầm sau (ví dụ không dỡ hết khoang trước khi khoang sau còn nặng)?',
    qEn: 'Why does an offload LIR specify strict hold/position unloading sequences (such as not emptying the forward hold while the aft hold remains heavy)?',
    optsJa: [
      '作業員の歩行距離を均等にして疲労を減らすため',
      '駐機中の急激な重心移動による機体の尻もち（テイルティップ）事故を防ぐため',
      'ベルトローダーとハイリフトローダーが同じ電源を共有しているため',
      '客室乗務員の降機完了時刻と合わせるため'
    ],
    optsVi: [
      'Để chia đều quãng đường đi bộ cho công nhân đỡ mỏi',
      'Để ngăn trọng tâm dịch chuyển đột ngột về sau gây tai nạn chúi đuôi (テイルティップ / Tail-tip) khi tàu đang đỗ',
      'Vì Belt Loader và High-Lift Loader dùng chung một nguồn điện mặt đất',
      'Để khớp với thời điểm tiếp viên rời máy bay'
    ],
    optsEn: [
      'To equalize walking distance and reduce ramp crew fatigue',
      'To prevent sudden CG shift while parked that could cause an aircraft tail-tipping accident',
      'Because the belt loader and high-lift loader share one GPU power cable',
      'To synchronize cargo offload with cabin crew deplaning time'
    ],
    ans: 1,
    expJa: '特にB737やA321、貨物専用機などでは、乗客降機と重なって前部貨物室を先に空にすると重心が主脚より後ろへ移り、機首が浮き上がる「テイルティップ」事故を起こす危険があります。',
    expVi: 'Đặc biệt trên tàu thân hẹp hoặc tàu hàng, nếu dỡ trống hầm trước khi khách xuống hết hoặc hầm sau còn nặng, trọng tâm lùi sau càng chính khiến mũi bổng lên (tail-tip).',
    expEn: 'Especially on narrowbodies and freighters, emptying the forward hold while aft cargo remains loaded can shift CG behind the main gear and tip the aircraft onto its tail.'
  },
  {
    id: 'T2Q009', topic: 'tg2_loadcontrol', level: 2,
    qJa: 'ロードシート上の3つの主要重量制限「MZFW」「MTOW」「MLW」の関係として正しい説明はどれか？',
    qVi: 'Giải thích nào đúng về 3 giới hạn trọng lượng chính trên Loadsheet: MZFW, MTOW và MLW?',
    qEn: 'Which statement accurately describes the three primary structural weight limits on a Loadsheet: MZFW, MTOW, and MLW?',
    optsJa: [
      'ZFWとTOWの差は乗客の総重量を表している',
      'MTOWが常に最も軽い制限値であり、ZFWはMTOWより重くても問題ない',
      'MLWは着陸時にのみ関係するため、出発前のロードコントロールでは確認不要である',
      'MZFWは燃料を含まない最大重量であり、離陸燃料搭載後のTOWはMTOW以下、到着予定重量LWはMLW以下でなければならない'
    ],
    optsVi: [
      'Hiệu số giữa TOW và ZFW chính là tổng trọng lượng hành khách',
      'MTOW luôn là ngưỡng nhẹ nhất, còn ZFW nặng hơn MTOW cũng không sao',
      'MLW chỉ liên quan lúc hạ cánh nên khâu Load Control trước giờ bay không cần kiểm tra',
      'MZFW là trọng lượng tối đa không tính nhiên liệu; sau khi nạp dầu TOW phải ≤ MTOW và trọng lượng hạ cánh dự kiến LW phải ≤ MLW'
    ],
    optsEn: [
      'The difference between TOW and ZFW represents total passenger weight',
      'MTOW is always the lowest limit, and ZFW is permitted to exceed MTOW',
      'MLW only applies upon arrival and does not need to be checked during pre-departure load planning',
      'MZFW limits weight without usable fuel; TOW (ZFW + takeoff fuel) must not exceed MTOW, and estimated LW must not exceed MLW'
    ],
    ans: 3,
    expJa: 'ZFW ≤ MZFW、TOW (= ZFW + Takeoff Fuel) ≤ MTOW、LW (= TOW − Trip Fuel) ≤ MLW の3条件をすべて満たすことが安全運航の基本です。',
    expVi: 'Tàu bay phải đồng thời thỏa mãn cả 3 giới hạn: ZFW ≤ MZFW, TOW ≤ MTOW và LW (TOW trừ nhiên liệu chặng bay) ≤ MLW trước khi phát hành Loadsheet.',
    expEn: 'Safe dispatch requires satisfying all three limits simultaneously: ZFW ≤ MZFW, TOW ≤ MTOW, and estimated LW (TOW minus trip fuel) ≤ MLW.'
  },
  {
    id: 'T2Q010', topic: 'tg2_loadcontrol', level: 2,
    qJa: '貨物用ULDの「ロック（固縛）」が1か所故障・破損しているポジションにコンテナを搭載せざるを得ない場合、作業責任者が取るべき正規の手順は？',
    qVi: 'Nếu phát hiện 1 chốt khóa sàn (フロアロック) tại một vị trí trong hầm hàng bị hỏng/gãy, trưởng nhóm phải xử lý theo quy trình chuẩn nào?',
    qEn: 'If a cargo floor lock/restraint latch at a specific hold position is found broken or inoperative, what is the proper procedure?',
    optsJa: [
      '隣に重いコンテナを密着させて動かないようにし、そのまま搭載する',
      '直ちに整備士およびロードコントロールへ報告し、MEL規定に基づく搭載制限（空ポジション扱い・減載等）の指示を仰ぐ',
      'ガムテープとタイラップで仮固定し、到着地の整備士へ口頭で引き継ぐ',
      '小さなAKHコンテナであればロックが1つ欠けても規定上問題ない'
    ],
    optsVi: [
      'Đẩy sát 1 thùng nặng bên cạnh chèn vào cho khỏi xê dịch rồi vẫn xếp bình thường',
      'Báo ngay cho Bảo dưỡng (整備士) và Load Control để xử lý theo MEL (bỏ trống vị trí hoặc giới hạn tải theo hướng dẫn)',
      'Buộc tạm bằng dây rút/băng keo rồi nhắn miệng cho đầu đến sửa',
      'Với thùng nhỏ AKH thì thiếu 1 chốt khóa vẫn đạt chuẩn an toàn'
    ],
    optsEn: [
      'Block it in tightly with an adjacent heavy ULD and proceed with normal loading',
      'Report immediately to Maintenance and Load Control to apply MEL restrictions (e.g., blocking the position or weight limits)',
      'Temporarily secure it with tape or zip-ties and verbally notify destination maintenance',
      'A missing latch is acceptable for smaller AKH containers without reporting'
    ],
    ans: 1,
    expJa: '貨物室ロック装置の破損は機体耐空性・MEL（Minimum Equipment List）に直結します。自己判断での仮固定や無断搭載は違法かつ極めて危険なため、必ず整備士とロードコントロールの正規判定を受けます。',
    expVi: 'Hỏng chốt khóa sàn liên quan trực tiếp đến danh mục thiết bị tối thiểu (MEL). Tự ý chằng tạm hoặc xếp tải khi chưa có xác nhận của Bảo dưỡng là vi phạm an toàn bay.',
    expEn: 'Inoperative cargo restraints fall under the aircraft MEL. Never improvise restraints; Maintenance and Load Control must authorize any MEL load restriction.'
  },
  {
    id: 'T2Q011', topic: 'tg2_loadcontrol', level: 2,
    qJa: 'バルク貨物室（Bulk Hold）に手荷物・一般貨物を積み込む際、作業責任者が徹底させるべき基本ルールとして誤っているものはどれか？',
    qVi: 'Khi xếp hành lý và hàng rời vào hầm Bulk (バルク室), quy tắc nào sau đây là SAI mà trưởng nhóm phải nghiêm cấm?',
    qEn: 'Which of the following practices is INCORRECT and must be prohibited by the supervisor when loading a Bulk Cargo Hold?',
    optsJa: [
      '天井の消火ノズル・煙探知機との規定クリアランス（最低5cm等の空間）を確保する',
      '「天地無用（This Way Up）」マークの貨物を逆さまにせず指定向きで積む',
      '隙間をなくすため、重いスーツケースを一番上に載せて下の段ボールを押し潰しながら固定する',
      '積付完了後、バルクネット（仕切り網）を規定のアンカーポイントへ確実に掛け張る'
    ],
    optsVi: [
      'Giữ khoảng hở an toàn tối thiểu (như ≥5 cm) dưới đầu phun chữa cháy và cảm biến khói trần hầm',
      'Xếp đúng chiều mũi tên đối với kiện hàng có nhãn không lật ngược (天地無用)',
      'Đặt vali nặng đè lên trên cùng để ép chặt các thùng carton bên dưới cho đỡ xê dịch',
      'Mắc đầy đủ lưới ngăn hầm Bulk (バルクネット) vào đúng điểm neo quy định sau khi xếp xong'
    ],
    optsEn: [
      'Maintain required clearance below ceiling fire suppression nozzles and smoke detectors',
      'Keep "This Way Up" marked packages upright in their specified orientation',
      'Stack heavy suitcases on top to crush and compress lighter cardboard cartons underneath',
      'Attach and tension the bulk restraint net securely to all designated floor/wall anchors'
    ],
    ans: 2,
    expJa: '積付の基本は「重下軽上（重いものを下、軽い・壊れやすいものを上）」です。重い荷物を上に載せると荷崩れや破損、さらに危険物梱包破損による漏洩事故を引き起こします。',
    expVi: 'Nguyên tắc vàng khi xếp hàng là "Nặng dưới – Nhẹ trên" (重下軽上). Đặt vật nặng lên trên làm bẹp thùng dưới, gây đổ khối hàng và có thể làm vỡ bao bì hàng nguy hiểm.',
    expEn: 'Fundamental build-up requires "heavy on bottom, light on top." Placing heavy bags atop cartons crushes packaging and risks load shift or cargo/DG leakage.'
  },
  {
    id: 'T2Q012', topic: 'tg2_loadcontrol', level: 2,
    qJa: '旅客手荷物と乗客の一致確認「PPBM（Positive Passenger Bag Match）」の原則として、特定技能2号の責任者が厳守すべき事項は？',
    qVi: 'Theo nguyên tắc an ninh đối chiếu hành khách – hành lý (PPBM), người phụ trách trình độ số 2 phải tuân thủ nghiêm ngặt điều gì?',
    qEn: 'Under Positive Passenger Bag Match (PPBM) aviation security rules, what must a Level 2 ramp/passenger supervisor strictly enforce?',
    optsJa: [
      '搭乗ゲートで乗客が搭乗しなかった（No-Show）場合、その乗客の預け入れ手荷物を必ず機内から取り卸す（オフロード）',
      '出発時刻に遅れそうな場合は、手荷物だけ先に飛ばして乗客は次便に乗せてもよい',
      '国内線・国際線を問わず、PPBMは手荷物が3個以上ある乗客にのみ適用される',
      'ロードシートの重量が合っていれば、乗客が乗らなくても手荷物を降ろす必要はない'
    ],
    optsVi: [
      'Nếu hành khách không lên máy bay (No-Show) tại cửa khởi hành, bắt buộc phải tìm và dỡ toàn bộ hành lý ký gửi của khách đó xuống tàu',
      'Nếu sát giờ bay quá thì có thể cho hành lý bay trước, khách bay chuyến sau',
      'PPBM chỉ áp dụng cho hành khách gửi từ 3 kiện hành lý trở lên',
      'Miễn tổng cân nặng trên Loadsheet khớp thì không cần dỡ hành lý của khách bỏ chuyến'
    ],
    optsEn: [
      'If a checked-in passenger fails to board (No-Show), their checked baggage must be located and offloaded before departure',
      'When behind schedule, baggage may fly ahead while the passenger is rebooked onto a later flight',
      'PPBM only applies to passengers checking three or more bags',
      'As long as Loadsheet weight is accurate, baggage from a no-show passenger may remain onboard'
    ],
    ans: 0,
    expJa: '航空保安上の最重要原則（PPBM）により、乗客が自発的・非自発的に搭乗しない場合、その預け入れ手荷物を単独で輸送することは禁止されています。迅速にULD/バルクから取り卸し、LMC報告まで連動させます。',
    expVi: 'Theo nguyên tắc an ninh hàng không PPBM, cấm tuyệt đối chở hành lý ký gửi khi hành khách không có mặt trên chuyến bay đó. Phải dỡ hành lý xuống và báo LMC ngay.',
    expEn: 'Aviation security (PPBM) prohibits transporting unaccompanied checked bags of no-show passengers; staff must offload the bags promptly and report the LMC.'
  },
  {
    id: 'T2Q013', topic: 'tg2_leadership', level: 2,
    qJa: '作業責任者（ランプリーダー）が到着機受入前の「事前ブリーフィング（Pre-arrival Briefing）」で全員に必ず共有すべき内容として最も適切な組み合わせは？',
    qVi: 'Trong buổi họp ngắn trước khi đón tàu (事前ブリーフィング), trưởng nhóm tác nghiệp (作業責任者) cần phổ biến những nội dung cốt lõi nào cho cả đội?',
    qEn: 'During a Pre-Arrival Briefing, what essential items must the ramp supervisor (作業責任者) share with the handling team?',
    optsJa: [
      '機種・スポット番号・予定到着時刻（ETA）・各自の担当配置・特別貨物/DGR有無・天候や安全上の注意点',
      '今月のシフト希望提出期限と休憩室の清掃当番のみ',
      '作業が終わった後の打ち上げ場所と定時退社時間のみ',
      '前日の他社便の遅延理由と個人の評価スコアのみ'
    ],
    optsVi: [
      'Loại tàu bay, số Spot, giờ đến dự kiến (ETA), phân công từng người, hàng đặc biệt/DGR và điểm lưu ý thời tiết/an toàn',
      'Chỉ nhắc hạn nộp lịch ca tháng sau và lịch trực vệ sinh phòng nghỉ',
      'Chỉ thống nhất giờ tan ca và không cần nhắc vị trí đỗ hay loại tàu bay',
      'Chỉ kể lại lỗi của ca trước mà không phân công nhiệm vụ cụ thể cho ca này'
    ],
    optsEn: [
      'Aircraft type, stand number, ETA, individual role assignments, special loads/DGR, and weather/safety hazards',
      'Only next month’s shift request deadline and breakroom cleaning schedule',
      'Only end-of-shift departure times without reviewing stand or aircraft details',
      'Only mistakes from yesterday’s other airline shifts without assigning current roles'
    ],
    ans: 0,
    expJa: '機種（A320/B787等）によりGSEの種類やドア高さが変わり、特殊貨物・気象条件でリスクも変化します。作業前の短いブリーフィングで「誰が何をするか・何が危険か」を全員で共有することが事故防止の基本です。',
    expVi: 'Mỗi loại tàu bay dùng GSE và chiều cao cửa khác nhau; hàng đặc biệt và thời tiết cũng tạo rủi ro riêng. Briefing giúp mọi thành viên nắm rõ vai trò và mối nguy trước khi tàu vào bãi.',
    expEn: 'Aircraft type dictates GSE and sill heights, while special cargo and weather alter hazards. A concise briefing ensures every team member knows their role and risks.'
  },
  {
    id: 'T2Q014', topic: 'tg2_leadership', level: 2,
    qJa: 'ターンアラウンド中に作業員が2名不足し定時出発が厳しい状況になった。特定技能2号の作業責任者として正しい判断は？',
    qVi: 'Trong lúc phục vụ turnaround, đội bị thiếu 2 người khiến quỹ thời gian sát giờ bay. Quyết định đúng của trưởng nhóm (作業責任者) là gì?',
    qEn: 'During a tight turnaround, your ramp team is short by 2 handlers. What is the correct decision for a Level 2 supervisor?',
    optsJa: [
      '時間短縮のため、車両後退時のガイドマン配置と指差呼称を省略して一人でバックさせる',
      '赤色ビーコンが消える前にGSEをERA赤線内へ入れ始めるよう指示する',
      'スーパーバイザーへ応援を要請し、クリティカルパスを優先配分しつつ安全監視・指差呼称は絶対に省略しない',
      '負荷を減らすため、出発前のFOD点検とロック確認を次便まで見送る'
    ],
    optsVi: [
      'Để tiết kiệm thời gian, bỏ người xi-nhan (ガイドマン) và bỏ 指差呼称 để tự lùi xe nhanh hơn',
      'Cho phép xe GSE tiến vào trong vạch đỏ ERA trước khi đèn beacon tắt hẳn',
      'Báo Supervisor xin tăng cường, ưu tiên phân bổ nhân lực cho đường găng nhưng tuyệt đối KHÔNG cắt bỏ người xi-nhan hay bước an toàn',
      'Cắt bỏ bước kiểm tra FOD và chốt khóa sàn trước khi đóng cửa'
    ],
    optsEn: [
      'Omit guideman spotting and Point-and-Call checks so drivers can reverse GSE faster solo',
      'Instruct GSE drivers to cross the red ERA line before the anti-collision beacon turns off',
      'Request backup from the Duty Supervisor, prioritize critical-path tasks, and never skip guidemen or safety checks',
      'Skip the pre-departure FOD walkaround and floor-lock check to recover schedule time'
    ],
    ans: 2,
    expJa: '人員不足や遅延の焦りがある時こそ機体接触事故や重大エラーが多発します。安全手順（ビーコン待機・ガイドマン・5m停止・指差呼称・ロック確認）は定時性より常に優先されます。',
    expVi: 'Áp lực thiếu người và trễ giờ là nguyên nhân hàng đầu gây va quẹt tàu bay. Tuyệt đối không đánh đổi các chốt an toàn (chờ beacon, guideman, dừng 5m, khóa sàn) lấy thời gian.',
    expEn: 'Time pressure during short-staffed turnarounds is a prime trigger for aircraft damage. Core safety barriers (beacon hold, guideman, 5m stop, locks) never yield to schedule.'
  },
  {
    id: 'T2Q015', topic: 'tg2_leadership', level: 2,
    qJa: '入社1か月の新人作業員（1号）がベルトローダーの操作で機体接触しそうな角度で進入してきた。指導・監視役の2号責任者としてまず取るべき行動は？',
    qVi: 'Một nhân viên mới (trình độ 1) đang lái Belt Loader tiếp cận tàu bay ở góc lệch có nguy cơ va chạm. Là người giám sát (特定技能2号), bạn phải làm gì đầu tiên?',
    qEn: 'A new Level 1 handler is driving a Belt Loader toward the aircraft at an unsafe angle risking fuselage contact. What should you do first as the Level 2 supervisor?',
    optsJa: [
      'そのまま装着させてみて、接触したら後から注意する',
      '「ストップ！（長音ホイッスル＋明確な停止合図）」で直ちに車両を止め、安全な角度へやり直させた上で理由を指導する',
      '運転席から無理やり引きずり下ろして、無言で自分が運転する',
      '危険だが本人の経験になるため、声をかけずに最後まで見守る'
    ],
    optsVi: [
      'Cứ để họ chạy áp sát thử, nếu quẹt vào vỏ tàu bay thì mới nhắc nhở sau',
      'Thổi còi dài + ra hiệu DỪNG NGAY LẬP TỨC, cho lùi chỉnh lại góc chuẩn rồi giải thích ngắn gọn lý do an toàn',
      'Kéo họ xuống khỏi ghế lái và tự mình lái thay mà không nói lời nào',
      'Tuy thấy nguy hiểm nhưng để họ tự trải nghiệm nên im lặng đứng nhìn'
    ],
    optsEn: [
      'Let them complete the dock and only correct them afterward if contact occurs',
      'Immediately halt the vehicle with a long whistle blast and STOP signal, reset the approach angle, and coach the reason',
      'Pull them out of the cab without explanation and take over silently',
      'Remain silent so the trainee learns from experience'
    ],
    ans: 1,
    expJa: '危険を察知した瞬間に躊躇なく「停止」を掛けることが監督者の最重要責務です。止めた後に正しい5m一旦停止・進入角・車体感覚をその場で具体的に教えることで定着します。',
    expVi: 'Khi thấy nguy cơ va chạm, trách nhiệm số 1 là ra lệnh DỪNG ngay không do dự, sau đó hướng dẫn cụ thể góc tiếp cận và điểm dừng thử phanh 5m để học viên rút kinh nghiệm an toàn.',
    expEn: 'Stopping an unsafe movement without hesitation is a supervisor’s primary duty; once safe, immediate constructive coaching builds correct habits.'
  },
  {
    id: 'T2Q016', topic: 'tg2_leadership', level: 2,
    qJa: '日本語に不慣れな外国人作業員を含む多国籍チームへ緊急指示や安全ルールを伝える際、作業責任者として最も確実なコミュニケーション方法は？',
    qVi: 'Khi truyền đạt mệnh lệnh khẩn hoặc quy tắc an toàn cho đội ngũ đa quốc tịch có nhân viên mới chưa thạo tiếng Nhật, cách nào đảm bảo chính xác nhất?',
    qEn: 'When briefing safety rules or urgent instructions to a multicultural ramp team including staff with limited Japanese, what communication method is most reliable?',
    optsJa: [
      '早口の専門略語だけで一斉に指示し、返事があれば理解したとみなす',
      '指示を出さず、ベテランの動きを黙って見様見真似で覚えさせる',
      '全員が母国語で書かれた100ページのマニュアルを暗記している前提で進める',
      '短い平易な言葉（やさしい日本語）＋指差しや図・ジェスチャーを併用し、相手自身に要点を復唱（リードバック）してもらう'
    ],
    optsVi: [
      'Nói thật nhanh bằng thuật ngữ viết tắt, thấy họ gật đầu là coi như đã hiểu',
      'Không cần nói, cứ để nhân viên tự nhìn người cũ làm theo',
      'Mặc định mọi người đều đã thuộc lòng sổ tay 100 trang từ trước',
      'Dùng câu ngắn rõ ràng kết hợp chỉ tay/hình ảnh và yêu cầu người nghe nhắc lại (リードバック) nội dung chính'
    ],
    optsEn: [
      'Deliver rapid jargon-filled orders and assume a nod means full comprehension',
      'Avoid verbal instructions and expect trainees to copy veterans silently',
      'Assume everyone memorized the entire 100-page manual beforehand',
      'Use clear, simple phrasing paired with pointing/gestures and require the listener to read back key points'
    ],
    ans: 3,
    expJa: '曖昧な「はい」という返事だけでは誤解が残ります。やさしい日本語・標準ジェスチャー・現物確認に加え、相手に復唱（Lead-back / 復唱確認）させることで指示のズレをゼロにできます。',
    expVi: 'Chỉ gật đầu "vâng" dễ dẫn đến hiểu nhầm. Dùng từ đơn giản, chỉ trực quan và yêu cầu nhắc lại (復唱確認 / Read-back) giúp loại bỏ sai sót thao tác.',
    expEn: 'A simple "yes" often masks misunderstanding. Combining plain language, visual pointing, and mandatory read-back prevents operational errors.'
  },
  {
    id: 'T2Q017', topic: 'tg2_leadership', level: 2,
    qJa: 'シフト交代（ハンドオーバー）の際、前番の作業責任者が次番の責任者へ必ず引き継ぐべき情報として最も重要なものは？',
    qVi: 'Khi giao ca (ハンドオーバー / Handover), nhóm trưởng ca trước bắt buộc phải bàn giao thông tin nào quan trọng nhất cho nhóm trưởng ca sau?',
    qEn: 'During a shift handover, which set of information is most critical for the outgoing supervisor to brief to the incoming supervisor?',
    optsJa: [
      '前番メンバーの趣味や週末の予定',
      '休憩室の冷蔵庫に入っている私物の名前',
      '遅延便・スポット変更・GSE故障/整備中状況・特殊貨物/DGR残件・天候警報や滑走路/誘導路制限',
      'すでに完了して問題なかった通常便の定時記録のみ'
    ],
    optsVi: [
      'Sở thích cá nhân và kế hoạch cuối tuần của nhân viên ca trước',
      'Tên đồ ăn cá nhân để trong tủ lạnh phòng nghỉ',
      'Các chuyến trễ/đổi Spot, tình trạng xe GSE hỏng đang sửa, hàng đặc biệt/DGR tồn đọng, cảnh báo thời tiết và hạn chế đường băng/đường lăn',
      'Chỉ báo cáo các chuyến bay bình thường đã xong suôi từ đầu ca'
    ],
    optsEn: [
      'Personal hobbies and weekend plans of outgoing team members',
      'Names of personal snacks stored in the breakroom refrigerator',
      'Delayed flights, stand changes, unserviceable GSE, pending special/DGR loads, weather alerts, and runway/taxiway restrictions',
      'Only routine on-time flights that already departed without issues'
    ],
    ans: 2,
    expJa: 'シフトの切れ目は情報漏れ（SHELLモデルのL-L間エラー）が起きやすい時間帯です。機材故障・未処理DGR・スポット変更・気象制限を文書やチェックリストで確実に引き継ぎます。',
    expVi: 'Thời điểm giao ca rất dễ đứt gãy thông tin (lỗi L-L trong mô hình SHELL). Bắt buộc bàn giao rõ các xe hỏng, hàng DGR tồn, đổi Spot và cảnh báo thời tiết.',
    expEn: 'Shift changeovers are prime points for information loss (SHELL L-L failure). Equipment faults, pending DGR, gate changes, and weather warnings must be explicitly handed over.'
  },
  {
    id: 'T2Q018', topic: 'tg2_leadership', level: 2,
    qJa: '作業中にGSE車両を後退させて機体付近へ寄せる際、作業責任者が「ガイドマン（誘導員）」の立ち位置として絶対に禁止すべき場所はどこですか？',
    qVi: 'Khi lùi xe GSE tiếp cận tàu bay, trưởng nhóm (作業責任者) tuyệt đối CẤM người xi-nhan (ガイドマン) đứng ở vị trí nào?',
    qEn: 'When guiding a reversing GSE vehicle toward an aircraft, where must the supervisor strictly PROHIBIT the guideman from standing?',
    optsJa: [
      'ドライバーの運転席側ミラーから姿が見え、かつ安全な横方向距離がある位置',
      'ホイッスルと停止合図がドライバーに届く安全圏内',
      '車両進行ラインの外側で、機体との距離を目視しやすい斜め前方',
      '後退する車両の後端と機体胴体（または障害物）に挟まれる死角・挟圧危険位置'
    ],
    optsVi: [
      'Vị trí lệch sang bên hông dễ nhìn qua gương chiếu hậu của tài xế',
      'Trong tầm nghe rõ còi và thấy rõ tín hiệu dừng của tài xế',
      'Bên ngoài quỹ đạo lùi xe để dễ quan sát khoảng cách tới vỏ tàu bay',
      'Khu vực kẹp giữa đuôi xe đang lùi và thân tàu bay (hoặc vật cản phía sau)'
    ],
    optsEn: [
      'Offset to the driver’s mirror side with clear lateral separation',
      'Within clear sight and whistle range of the driver',
      'Outside the vehicle’s backing path where clearance to the aircraft is clearly visible',
      'Directly between the reversing vehicle’s rear bumper and the aircraft fuselage or obstacle (pinch zone)'
    ],
    ans: 3,
    expJa: '車両と機体の間に挟まれる死亡・重傷災害（挟まれ事故）は地上作業で最も警戒すべき労働災害の一つです。ガイドマンは必ず車両側面の安全位置（逃避スペースあり）から誘導します。',
    expVi: 'Tai nạn bị kẹp giữa đuôi xe đang lùi và thân tàu bay là tai nạn lao động cực kỳ nghiêm trọng. Guideman bắt buộc đứng lệch sang bên hông có lối thoát thân.',
    expEn: 'Pinch/crush fatalities between reversing GSE and the fuselage are a top ramp hazard; guidemen must always stand laterally outside the vehicle path with an escape route.'
  },
  {
    id: 'T2Q019', topic: 'tg2_leadership', level: 2,
    qJa: '作業員がハイリフトローダーを航空機貨物室へ近づける際、「5m手前一旦停止（ブレーキチェック）」が徹底されている理由として正しいものは？',
    qVi: 'Lý do trưởng nhóm phải yêu cầu mọi xe GSE dừng hẳn kiểm tra phanh ở khoảng cách 5 m trước tàu bay (5m手前一旦停止) là gì?',
    qEn: 'Why must supervisors enforce a mandatory full stop (brake check) 5 meters from the aircraft before final GSE approach?',
    optsJa: [
      'ブレーキの効き具合（故障・凍結・ウェット路面での滑り）を機体接触前に確認し、最終微速接近へ切り替えるため',
      'エンジンの排気ガスを5分間冷ますため',
      'タイヤの空気圧を毎回ゲージで測り直すため',
      '空港の駐車料金タイマーをリセットするため'
    ],
    optsVi: [
      'Để kiểm tra chắc chắn phanh hoạt động tốt (tránh mất phanh, trơn trượt) trước khi chuyển sang bò chậm tiếp cận vỏ tàu',
      'Để làm nguội khí xả động cơ xe GSE trong 5 phút',
      'Để xuống xe đo lại áp suất lốp mỗi lần vào bãi',
      'Để reset đồng hồ tính phí đỗ xe sân bay'
    ],
    optsEn: [
      'To confirm brake effectiveness (no hydraulic failure or wet-surface skid) before creeping in for final docking',
      'To cool down the GSE exhaust manifold for 5 minutes',
      'To manually measure tire pressure with a gauge on every approach',
      'To reset the airport apron parking timer'
    ],
    ans: 0,
    expJa: '万一ブレーキ不良や路面凍結で止まれない場合でも、5m手前であれば機体へ激突する前に回避・停止できます。一旦完全停止→指差呼称→最微速で装着、が日本の基本手順です。',
    expVi: 'Nếu phanh gặp trục trặc hoặc mặt sân trơn, việc thử phanh ở cự ly 5 m giúp kịp xử lý trước khi đâm vào thân tàu bay. Dừng hẳn → 指差呼称 → bò chậm áp sát là chuẩn Nhật Bản.',
    expEn: 'Testing brakes at 5 m provides stopping margin if brakes fail or the apron is slick; full stop → Point-and-Call → creep speed is standard Japanese ramp SOP.'
  },
  {
    id: 'T2Q020', topic: 'tg2_leadership', level: 2,
    qJa: '到着した国際線便で、搭乗橋（PBB）を操作してL1ドアへ装着する際、作業責任者が事前確認を徹底すべき事項はどれか？',
    qVi: 'Khi vận hành cầu hành khách (PBB / 搭乗橋) nối vào cửa L1 của tàu bay vừa vào bãi, trưởng nhóm phải kiểm tra điều kiện tiên quyết nào?',
    qEn: 'Before docking a Passenger Boarding Bridge (PBB) onto aircraft door L1, what precondition must the supervisor ensure?',
    optsJa: [
      '機体が停止バーの5m手前まで来た時点で時間節約のためPBBを動かし始める',
      'PBB稼働区域（赤斜線）内に車両・人や障害物が無いこと、および機体完全停止・ビーコン消灯・輪止め完了を確認する',
      '作業効率のため、PBBの下の赤斜線エリアにGPUカートを待機させておく',
      'キャビンアテンダントがスライドを「ARMED」のまま外からドアを開ける'
    ],
    optsVi: [
      'Cho PBB chạy ra đón trước khi tàu bay lăn tới vạch dừng khoảng 5 m để tiết kiệm thời gian',
      'Khu vực hoạt động của PBB (gạch chéo đỏ) hoàn toàn trống không có xe/người, tàu đã dừng hẳn, tắt beacon và chèn bánh xong',
      'Cho xe GPU đỗ tạm ngay dưới vùng gạch chéo đỏ của PBB cho gọn bãi',
      'Mở cửa máy bay từ bên ngoài ngay cả khi cầu trượt thoát hiểm đang ở chế độ ARMED'
    ],
    optsEn: [
      'Start moving the PBB toward the aircraft while it is still rolling 5 m short of the stop bar',
      'The red-hatched PBB operating zone is clear of all GSE/personnel, the aircraft is stopped, beacon is OFF, and chocks are set',
      'Stage the GPU cart inside the red-hatched PBB zone to save ramp space',
      'Open the cabin door from outside while the emergency slide is still ARMED'
    ],
    ans: 1,
    expJa: 'PBB稼働区域（赤斜線）への車両進入・下通過は例外なく厳禁です。またドア開扉前には必ず窓越し等にスライドのDISARM確認を行います（誤展開は重大インシデント）。',
    expVi: 'Vùng gạch chéo đỏ của PBB cấm tuyệt đối mọi xe cộ đỗ hoặc chui qua. Trước khi mở cửa L1 bắt buộc kiểm tra đã DISARM cầu trượt thoát hiểm qua ô kính.',
    expEn: 'Vehicles are strictly banned from the red-hatched PBB zone, and slide DISARM verification must occur before opening any cabin door to prevent inadvertent slide deployment.'
  },
  {
    id: 'T2Q021', topic: 'tg2_leadership', level: 2,
    qJa: '作業責任者が現場の「安全文化（Just Culture / 公正な文化）」を育てる上で、部下が作業ミスやヒヤリハットを正直に報告してきた際の最適な対応は？',
    qVi: 'Để xây dựng văn hóa an toàn công bằng (Just Culture) trong tổ, khi nhân viên trung thực báo cáo sự cố suýt xảy ra (ヒヤリハット) hoặc sai sót nhỏ, trưởng nhóm nên ứng xử thế nào?',
    qEn: 'To foster a healthy Safety Culture (Just Culture), how should a supervisor respond when a team member honestly reports a near-miss (ヒヤリハット) or minor mistake?',
    optsJa: [
      '二度と報告しないよう全員の前で厳しく叱責し、減給処分を言い渡す',
      'まず報告した勇気を評価し、責めるのではなく「なぜ起きたか（手順・環境・疲弊等）」を一緒に分析して再発防止に活かす',
      '面倒な報告書が増えるため、軽微な傷なら見なかったことにして揉み消す',
      '本人の注意力不足だけが原因と決めつけ、具体的な対策は考えない'
    ],
    optsVi: [
      'Quát mắng trước mặt cả đội và dọa cắt lương để làm gương',
      'Ghi nhận sự trung thực khi báo cáo, không quy chụp trừng phạt vô cớ mà cùng phân tích nguyên nhân hệ thống để phòng ngừa tái diễn',
      'Bỏ qua và giấu nhẹm nếu vết xước nhỏ để khỏi phải viết báo cáo phức tạp',
      'Kết luận hoàn toàn do nhân viên bất cẩn và không cần cải tiến quy trình'
    ],
    optsEn: [
      'Reprimand them harshly in front of the entire crew and threaten pay cuts',
      'Thank them for speaking up honestly, avoid punitive blame, and analyze systemic root causes together to prevent recurrence',
      'Cover up minor scratches so extra paperwork is avoided',
      'Blame carelessness alone without reviewing procedures or ergonomics'
    ],
    ans: 1,
    expJa: '正直な報告を罰すると隠蔽（隠れ傷・未報告FOD等）を招き、大事故に繋がります。故意や悪質な違反を除き、組織的要因（SHELLモデル）を探る「公正な文化」がSMSの基本です。',
    expVi: 'Trừng phạt người trung thực sẽ khiến nhân viên giấu lỗi (như giấu vết va quẹt tàu bay), dẫn tới thảm họa lớn. Just Culture phân tích nguyên nhân hệ thống (SHELL) để ngăn ngừa.',
    expEn: 'Punishing honest reporting drives concealment of aircraft damage or hazards. Just Culture separates willful negligence from human error and fixes systemic factors.'
  },
  {
    id: 'T2Q022', topic: 'tg2_leadership', level: 2,
    qJa: '真夏の猛暑日における屋外ランプ作業で、作業責任者が熱中症予防のために行うべき管理策として適切なものは？',
    qVi: 'Vào những ngày nắng nóng gay gắt mùa hè trên sân đỗ bê tông, trưởng nhóm (作業責任者) cần quản lý phòng chống say nắng (熱中症) như thế nào?',
    qEn: 'During severe summer heat on the concrete apron, what heat-stress (熱中症) management action must the supervisor implement?',
    optsJa: [
      '夏場だけは高視認性ベストとヘルメットを脱いでTシャツのみで作業させる',
      '休憩を取るとフライトに遅れるため、全員に水分を控えさせて一気に作業させる',
      '空調の効いた車両内に全員を常に待機させ、到着機が来ても外に出さない',
      'WBGT（暑さ指数）を確認し、定期的な水分・塩分補給休憩、日陰待機、作業員の顔色・発汗異常の相互確認を徹底する'
    ],
    optsVi: [
      'Cho phép cởi bỏ mũ bảo hộ và áo phản quang vào mùa hè cho mát',
      'Hạn chế cho uống nước để đỡ mất thời gian đi vệ sinh và làm liên tục cho kịp giờ bay',
      'Cho toàn bộ nhân viên ngồi trong xe bật điều hòa và không ra ngoài đón tàu',
      'Theo dõi chỉ số nhiệt WBGT, bố trí nghỉ uống nước/bù muối định kỳ, chờ trong bóng râm và kiểm tra sắc mặt lẫn nhau'
    ],
    optsEn: [
      'Allow staff to remove safety helmets and high-vis vests during summer',
      'Discourage water breaks so handlers finish turnarounds without interruptions',
      'Keep all crew inside air-conditioned vehicles even when aircraft arrive',
      'Monitor WBGT heat index, schedule hydration/electrolyte breaks in shade, and conduct buddy checks for heat symptoms'
    ],
    ans: 3,
    expJa: '輻射熱の強いエプロンでは熱中症が意識障害や転倒・操作ミスを招きます。PPE（ベスト・ヘルメット）は外せないため、WBGT管理・水分塩分補給・ローテーション休憩が責任者の重要任務です。',
    expVi: 'Mặt sân bê tông phản xạ nhiệt rất mạnh dễ gây sốc nhiệt dẫn tới ngất hoặc thao tác nhầm. Vì không được bỏ đồ bảo hộ (PPE), phải luân phiên nghỉ, bù nước/muối theo WBGT.',
    expEn: 'Concrete aprons radiate extreme heat that impairs judgment. Because PPE remains mandatory, supervisors must manage WBGT limits, hydration, and shaded rotation.'
  },
  {
    id: 'T2Q023', topic: 'tg2_safety_sms', level: 2,
    qJa: 'ハインリッヒの法則（1:29:300）を空港グランドハンドリングのSMS（安全管理システム）に当てはめた場合、現場責任者が最も注力すべき活動は？',
    qVi: 'Khi áp dụng quy luật Heinrich (1:29:300) vào Hệ thống quản lý an toàn SMS trên sân đỗ, trưởng nhóm cần tập trung mạnh nhất vào khâu nào?',
    qEn: 'Applying Heinrich’s Law (1:29:300) within airport ramp SMS (Safety Management System), where should a supervisor focus prevention efforts?',
    optsJa: [
      '底辺にある「300件のヒヤリハット（無傷・未接触の危険事象）」を積極的に収集・共有し、根本原因を潰すこと',
      '重大事故（1件）が起きてから初めて調査委員会を立ち上げること',
      '軽微な物損（29件）は統計に入れないことで安全成績を良く見せること',
      'ベテラン社員の勘だけに頼り、書面での報告をなくすこと'
    ],
    optsVi: [
      'Tích cực thu thập và xử lý triệt để phần đáy tháp là 300 vụ suýt xảy ra (ヒヤリハット) trước khi biến thành tai nạn thật',
      'Đợi khi tai nạn nghiêm trọng (1 vụ) xảy ra rồi mới lập hội đồng điều tra',
      'Không thống kê các va quẹt nhẹ (29 vụ) để báo cáo thành tích trông đẹp hơn',
      'Chỉ dựa vào kinh nghiệm truyền miệng, bỏ hết việc ghi nhận báo cáo sự cố'
    ],
    optsEn: [
      'Actively collect, share, and eliminate root causes of the 300 near-misses (ヒヤリハット) at the base of the pyramid',
      'Wait until 1 major accident occurs before initiating safety investigations',
      'Exclude minor property damage cases (29 incidents) from metrics to improve safety scores',
      'Rely solely on veteran intuition and eliminate written hazard reporting'
    ],
    ans: 0,
    expJa: '1件の重大事故の背後には29件の軽微な事故と300件のヒヤリハットが存在します。底辺のヒヤリハットを潰すことが重大機体損傷や人身災害を防ぐ最も確実な方法です。',
    expVi: 'Đằng sau 1 tai nạn thảm khốc luôn có 29 va chạm nhẹ và 300 tình huống suýt xảy ra (ヒヤリハット). Dập tắt từ 300 vụ suýt xảy ra là cốt lõi của SMS.',
    expEn: 'Every major accident is preceded by 29 minor incidents and 300 near-misses. Addressing the 300 near-misses prevents catastrophic aircraft damage and injuries.'
  },
  {
    id: 'T2Q024', topic: 'tg2_safety_sms', level: 2,
    qJa: 'GSE車両のドアやコンテナドーリーの一部が駐機中の航空機外板（胴体）に軽く接触した。「傷がほとんど見えない」場合でも取るべき唯一の正しい行動は？',
    qVi: 'Một phần xe GSE hoặc dolly vừa quẹt nhẹ vào vỏ thân máy bay đang đỗ. Dù nhìn bằng mắt thường "gần như không thấy vết xước", hành động đúng duy nhất là gì?',
    qEn: 'A GSE vehicle or dolly lightly brushes against a parked aircraft’s fuselage skin. Even if "no dent or scratch is clearly visible," what is the ONLY correct action?',
    optsJa: [
      '証拠が残らないよう直ちに車両を別のスポットへ移動させてから電話する',
      '傷が浅そうなので雑巾で拭き取り、誰にも言わずに出発させる',
      '現場をそのまま保存し（車両を勝手に動かさず）、直ちに整備士・スーパーバイザー・空港運用（COC等）へ連絡する',
      '乗客が搭乗する前であれば報告義務はない'
    ],
    optsVi: [
      'Lái xe sang bãi đỗ khác cho khỏi vướng rồi mới gọi điện báo sau',
      'Thấy vết mờ nên lấy giẻ lau sạch và im lặng cho tàu bay cất cánh luôn',
      'Giữ nguyên hiện trường (không tự ý đánh xe đi chỗ khác) và báo ngay cho Bảo dưỡng (整備士), Supervisor và trung tâm điều hành sân bay',
      'Nếu hành khách chưa lên tàu thì không có nghĩa vụ phải báo cáo'
    ],
    optsEn: [
      'Move the GSE to another stand first so it is out of the way before calling',
      'Wipe off the mark with a cloth and dispatch the aircraft without telling anyone',
      'Freeze the scene (do not move the vehicle) and immediately notify Maintenance, Supervisor, and Airport Operations',
      'No report is required as long as passengers have not boarded yet'
    ],
    ans: 2,
    expJa: '航空機は与圧構造・複合材（CFRP等）のため、外見上わずかな接触でも内部剥離や構造損傷を起こしている恐れがあります。無報告で飛ばすことは墜落リスクに直結する重大違反です。',
    expVi: 'Vỏ tàu bay (đặc biệt vật liệu composite như B787) có thể bị tách lớp bên trong dù ngoài chỉ xước nhẹ. Giấu vết va chạm là hành vi uy hiếp nghiêm trọng an toàn bay.',
    expEn: 'Aircraft pressurized skins and composites (e.g., B787 CFRP) can suffer hidden delamination from light impacts. Concealing contact endangers flight safety.'
  },
  {
    id: 'T2Q025', topic: 'tg2_safety_sms', level: 2,
    qJa: '人的要因分析の「SHELLモデル」において、マニュアル・作業手順書・チェックリストと作業員（Liveware）の関わりを表す組み合わせはどれか？',
    qVi: 'Trong mô hình nhân tố con người SHELL (SHELLモデル), cặp thành phần nào thể hiện mối quan hệ giữa nhân viên (Liveware) với sổ tay, quy trình và checklist?',
    qEn: 'In the ICAO SHELL human factors model, which interface represents the relationship between the human operator (Liveware) and manuals, SOPs, and checklists?',
    optsJa: [
      'L − H（Liveware − Hardware）',
      'L − E（Liveware − Environment）',
      'L − S（Liveware − Software）',
      'L − L（Liveware − Liveware）'
    ],
    optsVi: [
      'L − H (Liveware − Hardware)',
      'L − E (Liveware − Environment)',
      'L − S (Liveware − Software)',
      'L − L (Liveware − Liveware)'
    ],
    optsEn: [
      'L − H (Liveware − Hardware)',
      'L − E (Liveware − Environment)',
      'L − S (Liveware − Software)',
      'L − L (Liveware − Liveware)'
    ],
    ans: 2,
    expJa: 'SHELLモデルのS（Software）はコンピュータだけでなく規則・手順書（SOP）・チェックリスト・LIR様式等を指します。Hは機材/車両、Eは気象/騒音/照度、L-Lはチーム連携・コミュニケーションです。',
    expVi: 'Trong mô hình SHELL, S (Software) chỉ quy trình, sổ tay SOP, checklist, mẫu biểu LIR; H là thiết bị/xe GSE; E là môi trường (mưa, ồn, tối); L-L là giao tiếp đồng đội.',
    expEn: 'In SHELL, Software (S) covers SOPs, rules, checklists, and LIR formats; Hardware (H) is equipment, Environment (E) is weather/noise/lighting, and L-L is teamwork.'
  },
  {
    id: 'T2Q026', topic: 'tg2_safety_sms', level: 2,
    qJa: '強風・荒天や繁忙時間帯のランプにおいて、FOD（異物）によるエンジン吸込損傷を防ぐため作業責任者が取るべき対策として最も適切なものは？',
    qVi: 'Trong điều kiện gió mạnh hoặc giờ cao điểm trên sân đỗ, biện pháp hiệu quả nhất để trưởng nhóm ngăn ngừa FOD (dị vật) bị hút vào động cơ là gì?',
    qEn: 'During windy conditions or peak ramp operations, what is the best supervisor practice to prevent FOD ingestion into aircraft engines?',
    optsJa: [
      '到着前後のFOD点検に加え、ビニールシート・空パレットネット・空き缶等の飛散物を風下へ放置せず専用FODボックスへ即回収させる',
      '滑走路上のFODだけを空港会社に任せ、スポット内の小さなネジやプラスチック片は放置する',
      'エンジンがアイドル回転中であれば小さな紙や袋を吸い込んでも壊れないため問題ない',
      'FOD回収は夜間点検チームだけの仕事であり、日中のランプ作業員は行わなくてよい'
    ],
    optsVi: [
      'Ngoài kiểm tra FOD trước/sau chuyến bay, bắt buộc thu gom ngay bạt nilon, lưới pallet rỗng, rác dễ bay vào thùng FOD chuyên dụng (không để gió thổi bay)',
      'Chỉ cần quan tâm FOD trên đường băng, còn ốc vít và mảnh nhựa nhỏ trong bãi đỗ không đáng kể',
      'Khi động cơ nổ garanty (idle) thì hút phải túi nilon hay giấy nhỏ không gây hại',
      'Nhặt FOD chỉ là việc của tổ trực đêm, ca ngày không cần thực hiện'
    ],
    optsEn: [
      'Conduct pre/post-flight FOD walks and ensure plastic sheets, loose tags, and wraps are immediately secured in FOD bins so wind cannot blow them',
      'Leave apron bolts and plastic scraps alone since runway sweeping is handled by airport authority',
      'Small plastic wraps or paper pose no risk to engines at idle power',
      'FOD sweeps are exclusively a night-shift maintenance duty'
    ],
    ans: 0,
    expJa: 'ターボファンエンジンはアイドリング中でも極めて強い吸引力があり、小さなボルト1本やビニール袋でもブレード破損・エンジン停止（高額修理＋欠航）を招きます。',
    expVi: 'Động cơ phản lực dù ở chế độ chờ vẫn có lực hút rất lớn; chỉ một con ốc hoặc tấm nilon lọt vào cũng có thể làm gãy cánh quạt động cơ, gây hủy chuyến và thiệt hại cực lớn.',
    expEn: 'Even at idle, turbofan intake suction is strong enough to ingest bolts or plastic sheets, destroying fan blades and causing costly AOG delays.'
  },
  {
    id: 'T2Q027', topic: 'tg2_safety_sms', level: 2,
    qJa: '制限区域内を走行するGSE車両（特にハイドラント給油車やハイリフト車等）について、エプロン上の「地下ピット（燃料・電力・空調等）」に対する基本ルールは？',
    qVi: 'Đối với xe GSE lưu thông trong sân đỗ, quy tắc an toàn cơ bản liên quan đến các nắp hố ngầm kỹ thuật (地下ピット: nhiên liệu, điện, điều hòa) là gì?',
    qEn: 'What is the fundamental ramp safety rule regarding GSE vehicles and underground apron utility pits (hydrant fuel, GPU power, PC-Air)?',
    optsJa: [
      'ピット蓋が開いていても作業中でなければそのまま踏んで通過してよい',
      '金属製の蓋は頑丈なので、重いハイリフトローダーのアウトリガーを蓋の真上に下ろすと安定する',
      '白枠のハイドラントピットの上は燃料車以外の車両の標準駐車スペースである',
      'ピット蓋の上や真上に車両を駐停車させてはならず（給油中の緊急遮断弁アクセス阻害・蓋破損防止）、周囲のマーキングを常に確認する'
    ],
    optsVi: [
      'Kể cả khi nắp hố đang mở, nếu không thấy ai bên trong thì cứ lái qua bình thường',
      'Nắp hố bằng thép rất cứng nên hạ chân chống thủy lực đè thẳng lên nắp sẽ càng vững',
      'Ô hố trắng Hydrant là vị trí đỗ tiêu chuẩn cho xe chở hành lý',
      'Tuyệt đối không đỗ xe hoặc đặt chân chống đè lên nắp hố ngầm (tránh sập nắp và cản trở tiếp cận van ngắt khẩn cấp khi tra dầu)'
    ],
    optsEn: [
      'Open pit covers may be driven over if no technician is standing inside',
      'Heavy steel pit covers are ideal pads for resting catering or loader hydraulic outriggers',
      'White hydrant fuel pits serve as designated parking spots for baggage tractors',
      'Never park vehicles or place outriggers over utility pit covers (prevents cover damage and preserves emergency shutoff access)'
    ],
    ans: 3,
    expJa: '地下ピット（白＝燃料、青＝GPU電力、黄＝PC-Air、赤＝アース等）の上への駐停車は、緊急時の燃料遮断弁（Emergency Shut-off）操作を妨げ、また蓋破損によるFOD・陥没事故を招きます。',
    expVi: 'Đỗ xe đè lên nắp hố ngầm làm hỏng nắp tạo FOD và đặc biệt cản trở tiếp cận van ngắt nhiên liệu khẩn cấp khi có sự cố cháy nổ lúc tra dầu.',
    expEn: 'Parking over utility pits risks structural cover failure and blocks rapid access to emergency fuel shutoff valves or electrical disconnects.'
  },
  {
    id: 'T2Q028', topic: 'tg2_safety_sms', level: 2,
    qJa: '再発防止策（Corrective Action）を立案する際、作業責任者として「再発防止効果が最も高い」対策の考え方はどれか？',
    qVi: 'Khi lập biện pháp phòng ngừa tái diễn (再発防止策) sau một sự cố thao tác, cách tiếp cận nào mang lại hiệu quả bền vững cao nhất?',
    qEn: 'When designing corrective actions after a ramp incident, which approach provides the most reliable long-term prevention?',
    optsJa: [
      '「以後気をつけます」という精神論の反省文を書かせるだけにする',
      '人的ミスが起きにくい仕組み（物理的ガイド・チェックリスト改訂・動線分離・相互確認体制等）へ改善する',
      '同じ作業員が二度とその作業をしないよう別部署へ異動させる',
      'すべての作業制限速度を1km/hに下げる'
    ],
    optsVi: [
      'Chỉ bắt nhân viên viết bản kiểm điểm hứa "lần sau sẽ cẩn thận hơn"',
      'Cải tiến hệ thống để khó xảy ra lỗi (vạch dẫn hướng, sửa checklist, tách luồng xe, quy trình kiểm tra chéo)',
      'Điều chuyển nhân viên đó sang bộ phận khác để khỏi làm lại việc cũ',
      'Hạ toàn bộ tốc độ xe sân đỗ xuống còn 1 km/h'
    ],
    optsEn: [
      'Have the employee sign a pledge promising to "be more careful next time"',
      'Redesign processes and defenses (physical guides, revised checklists, separated traffic lanes, cross-checks) to make errors harder to repeat',
      'Transfer the individual permanently to another department without changing procedures',
      'Lower every airside driving speed limit to 1 km/h'
    ],
    ans: 1,
    expJa: '「気をつける」だけの対策では同じミスが必ず別の人によって再発します。工程設計・表示視認性・ダブルチェックなど仕組み側を変える対策（フールプルーフ等）がSMSでは重視されます。',
    expVi: 'Chỉ nhắc "cẩn thận hơn" thì người khác vẫn sẽ mắc lại lỗi tương tự. SMS luôn ưu tiên giải pháp cải tiến quy trình, vạch cảnh báo và cơ chế kiểm tra chéo.',
    expEn: 'Exhorting staff to "be careful" fails when another person faces the same conditions; SMS prioritizes systemic engineering and procedural safeguards.'
  },
  {
    id: 'T2Q029', topic: 'tg2_safety_sms', level: 2,
    qJa: '給油作業（ハイドラント・サービサー使用）の安全監視を行う際、作業責任者が必ず確認すべき「火気・静電気・退避路」の要件はどれか？',
    qVi: 'Khi giám sát quy trình tra dầu bằng xe Hydrant Servicer, trưởng nhóm phải kiểm tra đầy đủ những yêu cầu nào về tĩnh điện, chữa cháy và lối thoát hiểm?',
    qEn: 'When supervising aircraft hydrant refueling, which static-grounding, fire-safety, and escape-route requirements must the supervisor verify?',
    optsJa: [
      '旅客の搭乗中（Refueling with Passengers on Board）は給油自体が法律で全面禁止されている',
      '給油中は静電気を逃がすため、同じ主翼下でバッテリー交換や溶接作業を同時に行う',
      '緊急時にすぐ逃げられるよう、サービサーは必ず機体胴体へ向けて頭から突っ込んで駐車する',
      'ボンディング（アース線）の確実な接続、消火器の風上側への適切配置、サービサーの前方退避路（車頭外向き）の確保'
    ],
    optsVi: [
      'Luật cấm tuyệt đối việc tra dầu khi có hành khách đang ở trên tàu bay',
      'Tranh thủ thay ắc quy hoặc hàn sửa dưới cánh cùng lúc tra dầu để tiết kiệm thời gian',
      'Đỗ xe hướng mũi đâm thẳng vào thân máy bay để dễ quan sát đồng hồ',
      'Kẹp dây tiếp địa chống tĩnh điện (ボンディング), đặt bình chữa cháy ở đầu hướng gió và đỗ xe quay đầu ra ngoài giữ lối thoát hiểm'
    ],
    optsEn: [
      'Refueling with passengers onboard is universally illegal under all circumstances',
      'Perform battery swaps or electrical maintenance under the same wing during fueling',
      'Park the fuel servicer nose-in directly facing the fuselage',
      'Proper bonding/grounding connection, fire extinguisher positioned upwind, and servicer parked nose-out with an unobstructed forward escape path'
    ],
    ans: 3,
    expJa: 'ボンディング未接続は静電気火花による引火を招き、前向き（機体向き）駐車は緊急時の即座退避を妨げます。なお旅客在機中給油は所定の安全措置（消防待機・非常口・アナウンス等）下で実施可能です。',
    expVi: 'Thiếu dây tiếp địa dễ phát tia lửa tĩnh điện; đỗ quay đầu vào thân tàu làm kẹt đường thoát khi cháy. Tra dầu khi có khách vẫn được phép nếu đủ biện pháp an toàn theo quy định.',
    expEn: 'Unbonded fueling risks static-spark ignition, and nose-in parking blocks emergency escape. Refueling with passengers onboard is permitted when specific safety protocols are met.'
  },
  {
    id: 'T2Q030', topic: 'tg2_safety_sms', level: 2,
    qJa: 'GSE車両に搭載されている消火器や非常停止ボタンの日常点検（始業前点検）において、責任者が特に確認すべき点は？',
    qVi: 'Trong kiểm tra đầu ca (始業前点検) đối với bình chữa cháy và nút dừng khẩn cấp trên xe GSE, người phụ trách cần đặc biệt kiểm tra điều gì?',
    qEn: 'During pre-shift inspection of GSE fire extinguishers and emergency stop buttons, what must the supervisor specifically verify?',
    optsJa: [
      '消火器が荷台の奥に鎖で固定されて絶対に取り出せないこと',
      '消火器の圧力ゲージが緑色適正範囲にあり安全ピン・有効期限が正常であること、および非常停止ボタンが物理的に固着せず作動すること',
      '圧力ゲージがゼロを指していれば軽いので持ち運びやすいこと',
      '非常停止ボタンは故障防止のためプラスチックカバーを接着剤で封印しておくこと'
    ],
    optsVi: [
      'Bình chữa cháy được xích khóa chặt vào thùng xe để tránh mất trộm',
      'Đồng hồ áp suất bình chữa cháy nằm trong vạch xanh, còn chốt/hạn sử dụng; nút Emergency Stop không kẹt và hoạt động tốt',
      'Kim đồng hồ áp suất chỉ về số 0 để bình nhẹ dễ mang vác',
      'Dán keo kín nút dừng khẩn cấp để tránh nhân viên bấm nhầm'
    ],
    optsEn: [
      'Extinguishers are padlocked inside storage boxes so they cannot be removed',
      'Extinguisher gauge is in the green zone with intact seal/validity, and the emergency stop button operates freely without sticking',
      'The pressure gauge reads zero so the cylinder stays lightweight',
      'Emergency stop buttons are taped or glued shut to prevent accidental presses'
    ],
    ans: 1,
    expJa: '緊急時に圧力抜けの消火器や固着した非常停止ボタンでは初期消火・緊急遮断ができず被害が拡大します。始業前点検での不具合発見時は使用禁止タグを付け代替車を手配します。',
    expVi: 'Khi sự cố xảy ra mà bình hết áp suất hoặc nút Emergency Stop bị kẹt sẽ không kịp dập lửa/ngắt máy. Phát hiện lỗi đầu ca phải gắn thẻ cấm dùng và đổi xe ngay.',
    expEn: 'Depressurized extinguishers or jammed e-stops fail during emergencies. Faulty equipment must be tagged out of service during pre-shift checks.'
  },
  {
    id: 'T2Q031', topic: 'tg2_safety_sms', level: 2,
    qJa: '高所作業となる大型機のメインデッキ貨物室ドア付近や高床作業台（地上2m以上）での作業において、日本の労働安全衛生規則上、作業責任者が遵守させるべき措置は？',
    qVi: 'Khi làm việc ở vị trí cao từ 2 m trở lên (như cửa khoang chính tàu hàng hoặc sàn nâng), trưởng nhóm phải tuân thủ quy định An toàn lao động Nhật Bản nào?',
    qEn: 'When ramp work takes place at heights of 2 meters or more (such as main-deck cargo doors or elevated platforms), what Japanese occupational safety rule applies?',
    optsJa: [
      '安全靴さえ履いていれば高さ5mまで墜落防止措置は免除される',
      '作業が短時間（5分以内）であれば手すりも安全帯も不要である',
      '手すり等の墜落防止設備（作業床の安全柵）が確保されているか、無い場合は墜落制止用器具（フルハーネス等）を確実に使用させる',
      '足を滑らせないよう、作業台の上では常に走って移動させる'
    ],
    optsVi: [
      'Chỉ cần mang giày bảo hộ chống trượt là được miễn biện pháp chống ngã tới độ cao 5 m',
      'Nếu thao tác nhanh dưới 5 phút thì không cần lan can hay dây an toàn',
      'Đảm bảo có lan can bảo vệ đạt chuẩn; nếu không có lan can hoặc có nguy cơ rơi ngã thì bắt buộc đeo dây đai an toàn toàn thân (フルハーネス)',
      'Di chuyển thật nhanh trên sàn nâng để rút ngắn thời gian ở trên cao'
    ],
    optsEn: [
      'Safety shoes alone exempt workers from fall protection up to 5 meters',
      'Fall protection is unnecessary if the task takes less than 5 minutes',
      'Ensure compliant guardrails/fall protection platforms are in place, or require certified fall-arrest harnesses when guardrails are absent',
      'Workers should run across elevated platforms to minimize time at height'
    ],
    ans: 2,
    expJa: '日本の労働安全衛生法では高さ2m以上の箇所で作業床・手すり等が設けられない場合、墜落制止用器具（フルハーネス型等）の使用が義務付けられています。手すりの開き忘れ確認も重要です。',
    expVi: 'Luật An toàn Vệ sinh Lao động Nhật Bản quy định từ 2 m trở lên phải có sàn thao tác có lan can chắc chắn, hoặc bắt buộc dùng dây đai toàn thân (フルハーネス) móc đúng điểm neo.',
    expEn: 'Japanese Industrial Safety & Health regulations mandate guardrails or fall-arrest harnesses for work at ≥2 m; supervisors must also verify platform safety rails are raised.'
  },
  {
    id: 'T2Q032', topic: 'tg2_safety_sms', level: 2,
    qJa: '作業中に不意に強いジェットブラストに遭遇し、地上作業員や軽量機材が吹き飛ばされる危険を避けるため、責任者が徹底すべき誘導路・エプロン間の横断ルールは？',
    qVi: 'Để tránh nguy cơ luồng phản lực (ジェットブラスト / Jet Blast) thổi bay người và thiết bị nhẹ khi băng qua đường nội bộ sau đuôi tàu bay, trưởng nhóm phải quán triệt quy tắc nào?',
    qEn: 'To protect ramp crew and light equipment from sudden jet blast when crossing behind taxiing aircraft, what rule must supervisors enforce?',
    optsJa: [
      '自走中・エンジン稼働中の航空機後方100m以内（または空港規定のブラスト危険距離・監視員停止指示）では絶対に横断・停止させない',
      '機体から10m離れていればジェットブラストは届かないので急いで横断してよい',
      'ライトバンやカートであれば重いのでエンジン真後ろをそのまま通過できる',
      '地上監視員の赤色合図があっても、自分の判断で前方を駆け抜けてよい'
    ],
    optsVi: [
      'Tuyệt đối không vượt hoặc dừng trong phạm vi nguy hiểm sau đuôi tàu bay đang tự lăn/nổ máy (như chuẩn cách ≥100 m và tuân thủ hiệu lệnh dừng của giám sát viên)',
      'Chỉ cần cách đuôi máy bay 10 m là hết gió phản lực nên có thể chạy vọt qua',
      'Xe tải nhẹ hoặc xe kéo hàng đủ nặng nên chạy ngay sau ống xả động cơ cũng không sao',
      'Dù giám sát viên đang phất cờ đỏ chặn lại vẫn có thể tự ý vượt nếu thấy trống'
    ],
    optsEn: [
      'Never cross or stop behind a live taxiing aircraft within the mandated jet-blast clearance (e.g., ≥100 m) and always obey spotter stop signals',
      'Ten meters behind an aircraft tail is outside jet blast range, so quick crossing is safe',
      'Light vans and dollies are heavy enough to drive directly behind running jet exhaust',
      'Drivers may ignore a spotter’s red stop flag if the lane looks clear to them'
    ],
    ans: 0,
    expJa: '離陸・タキシング開始時のエンジン出力上昇（Breakaway Thrust）によるジェットブラストは車両を横転させるほどの威力があります。NGO等のサービスレーンでは後方100m以上の離隔と監視員指示厳守が必須です。',
    expVi: 'Lực đẩy khi tàu bay bắt đầu lăn (Breakaway Thrust) tạo luồng Jet Blast cực mạnh đủ lật xe hoặc thổi bay hàng hóa. Luôn giữ khoảng cách chuẩn (≥100 m) và tuân lệnh giám sát viên.',
    expEn: 'Breakaway jet blast during taxi-out can overturn carts and injure crew; strict adherence to 100 m clearance and spotter stop commands is essential.'
  },
  {
    id: 'T2Q033', topic: 'tg2_irregular', level: 2,
    qJa: '悪天候や機材故障によりダイバート（目的地外着陸）してきた臨時便を自空港で受け入れる際、ランプ作業責任者が最初に行うべき確認は？',
    qVi: 'Khi tiếp nhận một chuyến bay hạ cánh chuyển hướng đột xuất (ダイバート / Divert) do thời tiết xấu hoặc sự cố kỹ thuật, trưởng nhóm mặt đất phải kiểm tra gì đầu tiên?',
    qEn: 'When receiving an unscheduled diverted flight (ダイバート) due to weather or technical issues, what should the ramp supervisor verify first?',
    optsJa: [
      '機種・スポット・特別対応要否（医療緊急・燃料/AOG・乗客降機有無）・適合GSEと人員の即時手配を確認する',
      '予定外の便なので受入を断り、パイロットに自力で地上作業をさせる',
      '通常便と同じ扱いとし、事前のスポット確認やFOD点検を行わずそのまま誘導する',
      '到着した瞬間に乗客へ無許可でドアを開放して自由降機させる'
    ],
    optsVi: [
      'Xác nhận ngay loại tàu bay, Spot đỗ, lý do divert (khẩn y tế/AOG/cần tra dầu/có cho khách xuống hay không) để điều đúng GSE và nhân lực',
      'Vì là chuyến ngoài lịch nên từ chối phục vụ mặt đất',
      'Bỏ qua kiểm tra FOD và kích thước bãi đỗ để dẫn vào ngay',
      'Mở cửa cho toàn bộ hành khách tự ý đi bộ xuống sân đỗ ngay khi tàu vừa dừng'
    ],
    optsEn: [
      'Verify aircraft type, assigned stand, divert reason (medical/AOG/fuel/deplaning), and dispatch compatible GSE and crew',
      'Decline ground support since the flight was not on the original schedule',
      'Skip pre-arrival stand and FOD checks and marshal the aircraft immediately',
      'Allow passengers to open doors and walk across the apron unescorted'
    ],
    ans: 0,
    expJa: 'ダイバート便は通常運航していない大型機種や緊急患者（MEDEVAC）・技術故障（AOG）を含む場合があります。機種適合性・スポットクリアランス・関係機関（CIQ/消防/整備）連携を最優先します。',
    expVi: 'Chuyến bay divert có thể là dòng tàu lạ, có ca cấp cứu y tế hoặc lỗi kỹ thuật (AOG). Cần xác nhận nhanh loại tàu, độ vừa Spot, nhu cầu nhiên liệu/y tế và phối hợp các bộ phận.',
    expEn: 'Diversions may involve unfamiliar aircraft types, medical emergencies, or technical AOG issues; stand compatibility, GSE matching, and cross-unit coordination come first.'
  },
  {
    id: 'T2Q034', topic: 'tg2_irregular', level: 2,
    qJa: '出発直前に機体故障が発生し「AOG（Aircraft On Ground）」・機材交換（Aircraft Swap）が決定した。貨物・手荷物チーム責任者として最適な動きは？',
    qVi: 'Sát giờ khởi hành, tàu bay bị hỏng nặng (AOG) và hãng quyết định đổi sang tàu bay dự phòng (機材交換 / Aircraft Swap). Trưởng nhóm bốc xếp cần xử lý ra sao?',
    qEn: 'Just before departure, an aircraft suffers an AOG technical fault and an Aircraft Swap is ordered. What is the ramp cargo supervisor’s priority action?',
    optsJa: [
      '故障機の貨物室を開けたまま電源を切り、翌日まで放置する',
      '時間が惜しいためタグを見ずに適当に代替機へ詰め込み、LIRは旧機体のまま使う',
      '現行LIRに基づき全ULD・バルク・DGR・特別手荷物を順番に正確取卸しし、代替機の機種適合（AKE/AKH等）と新LIRを確認して移載する',
      '乗客の預け手荷物だけは代替機へ載せず、すべて宅配便で送ることにする'
    ],
    optsVi: [
      'Mở toang cửa hầm hàng tàu hỏng rồi cắt điện bỏ đó tới ngày hôm sau',
      'Gấp quá nên cứ bốc đại sang tàu mới mà không cần kiểm tra lại thẻ ULD hay xin LIR mới',
      'Dỡ toàn bộ ULD, hàng Bulk, DGR theo đúng trình tự an toàn (tránh tail-tip), kiểm tra tương thích ULD với tàu thay thế và xếp lại theo LIR mới',
      'Không chuyển hành lý sang tàu thay thế mà tự ý chuyển hết qua bưu điện'
    ],
    optsEn: [
      'Leave cargo doors open, power down the AOG aircraft, and leave the load until next day',
      'Transfer ULDs quickly onto the swap aircraft without checking ULD compatibility or requesting a new LIR',
      'Offload all ULDs, bulk, and DGR in safe sequence (preventing tail-tip), verify ULD compatibility for the replacement aircraft, and reload per the new LIR',
      'Leave all checked baggage behind and send it by courier instead'
    ],
    ans: 2,
    expJa: '機材交換で型式が変わる場合（例：B787→A321、B738→A320等）、コンテナ種別（AKEとAKH等）や搭載可能位置・W&B制限が全く異なります。新LIR受領とテイルティップ防止の取卸順序が不可欠です。',
    expVi: 'Khi đổi sang dòng tàu bay khác (ví dụ B787 đổi sang A321 hoặc B738), loại ULD (AKE vs AKH) và giới hạn W&B thay đổi hoàn toàn. Bắt buộc kiểm tra tương thích và làm theo LIR mới.',
    expEn: 'Aircraft swaps often change ULD compatibility (e.g., AKE vs. AKH) and W&B envelopes; safe offload sequencing and a recalculated LIR are mandatory.'
  },
  {
    id: 'T2Q035', topic: 'tg2_irregular', level: 2,
    qJa: '搭乗締切後、出発スポットからプッシュバックしようとした瞬間に、システム上1個だけ行方不明の乗継手荷物（またはゲート受託漏れ）が判明した。責任者の対応は？',
    qVi: 'Ngay lúc chuẩn bị pushback thì phát hiện thiếu 1 kiện hành lý nối chuyến (hoặc sót hành lý gate-check) chưa được xác nhận vị trí. Trưởng nhóm phải làm gì?',
    qEn: 'Just as pushback is about to begin, dispatch discovers 1 unaccounted transfer bag (or missed gate-check bag) for a boarded passenger. What should the supervisor do?',
    optsJa: [
      '1個くらいなら到着後に別便で追送すればよいため、確認せずプッシュバックを強行する',
      'プッシュバック開始前であれば一旦停止・待機し、ランプ/手荷物エリアを即時捜索して搭載可否とLMC/PPBMを確定させる',
      '見当たらなくても「搭載済み」と仮入力してシステム上のアラートを消す',
      'トーイングカーで誘導路まで出てから路上で手荷物を積み込む'
    ],
    optsVi: [
      'Thiếu có 1 kiện nên cứ đẩy lùi bay luôn rồi gửi bù chuyến sau',
      'Tạm hoãn pushback ngay nếu chưa lăn, huy động tìm nhanh khu vực sân đỗ/băng chuyền để xác định vị trí và chốt lại LMC/PPBM',
      'Nhập bừa là "đã xếp" lên hệ thống cho tắt cảnh báo',
      'Cứ đẩy lùi ra đường lăn rồi mang hành lý ra ném lên hầm sau'
    ],
    optsEn: [
      'Proceed with pushback anyway and rush-tag the bag onto a later flight without verifying',
      'Hold pushback immediately, conduct a rapid ramp/make-up search to locate the bag, and reconcile LMC/PPBM',
      'Manually mark the bag as "loaded" in the system to clear the alert',
      'Push onto the taxiway and load the bag onto the fuselage out on the apron'
    ],
    ans: 1,
    expJa: '不審物・保安照合漏れ（PPBM）および手荷物不着クレームを防ぐため、プッシュバック前であれば即時停止して所在確認・搭載またはオフロード処理を行うのが原則です。',
    expVi: 'Dừng trước khi pushback giúp kiểm tra nhanh tránh rủi ro an ninh (PPBM) và thất lạc hành lý (Mishandled Baggage), đồng thời cập nhật chính xác Loadsheet.',
    expEn: 'Holding before pushback prevents security/PPBM discrepancies and mishandled baggage, ensuring accurate final Loadsheet reconciliation.'
  },
  {
    id: 'T2Q036', topic: 'tg2_irregular', level: 2,
    qJa: '作業中に到着機の貨物室から動物の鳴き声や、キャリーケージ（AVI：生きた動物）の破損・脱走リスクを発見した。作業責任者がまず行うべき対応は？',
    qVi: 'Khi mở hầm hàng phát hiện lồng vận chuyển động vật sống (AVI / 生きた動物) bị nứt gãy có nguy cơ con vật sổng ra sân đỗ. Trưởng nhóm phải làm gì trước tiên?',
    qEn: 'Upon opening a cargo hold, crew notice a damaged live-animal (AVI) kennel with risk of the animal escaping onto the apron. What is the supervisor’s first action?',
    optsJa: [
      'ケージを別の重い荷物で上から押し潰して押さえ込む',
      '驚いた動物を落ち着かせるため、大声で叫びながら素手でケージから外へ出す',
      'エプロンに逃がしてしまえば滑走路へは行かないため、そのままドアを全開にする',
      '貨物室ドアを不用意に開け広げず（脱走・滑走路進入防止）、直ちに空港運用・獣医/関係部署およびオーナー側調整へ連絡し安全確保する'
    ],
    optsVi: [
      'Đặt thùng hàng nặng đè lên nóc lồng để ép lại',
      'Hét lớn cho động vật bình tĩnh rồi dùng tay không lôi ra ngoài lồng',
      'Mở toang cửa cho chạy ra sân đỗ vì động vật sẽ không bao giờ chạy ra đường băng',
      'Không mở toang cửa hầm để tránh thú chạy ra đường băng (nguy cơ va chạm tàu bay), báo ngay cho điều hành sân bay & bộ phận xử lý chuyên trách'
    ],
    optsEn: [
      'Stack heavy cargo on top of the damaged kennel to pin it down',
      'Shout loudly and pull the animal out of the kennel by hand',
      'Open the hold fully since an escaped pet will not wander toward the runway',
      'Keep containment (do not leave doors wide open risking runway wildlife incursion) and immediately alert Airport Ops and specialized handlers'
    ],
    ans: 3,
    expJa: 'エプロンや滑走路への動物脱走は離着陸機のバード/アニマルストライク（滑走路閉鎖）を引き起こします。封じ込めを保ったまま空港運用（野生動物対策班等）と連携します。',
    expVi: 'Động vật sổng ra khu bay có thể chạy lên đường băng buộc đóng cửa đường băng hoặc gây tai nạn khi tàu cất/hạ cánh. Phải giữ khoanh vùng và báo ngay điều hành sân bay.',
    expEn: 'An animal loose on the movement area can force runway closures or cause a strike hazard. Maintain containment and coordinate immediately with Airport Ops.'
  },
  {
    id: 'T2Q037', topic: 'tg2_irregular', level: 2,
    qJa: 'プッシュバック中に機長とのインターホン（ヘッドセット）が突然途絶し、音声が全く通じなくなった。ヘッドセットマン／作業責任者の正しい緊急対応は？',
    qVi: 'Đang trong quá trình đẩy lùi (Pushback) thì tai nghe liên lạc với cơ trưởng đột ngột mất tín hiệu hoàn toàn. Nhân viên Headset Man / trưởng nhóm phải làm gì?',
    qEn: 'Mid-pushback, headset intercom communication with the flight deck suddenly fails completely. What is the correct emergency procedure?',
    optsJa: [
      'プッシュバックを続けながらスマートフォンで航空会社の予約センターへ電話する',
      'あと少しなので通信なしの勘だけで押し切り、トーブレードを外す',
      '直ちにTugドライバーへ緊急停止合図を出しプッシュバックを停止させ、標準ハンドシグナル（目視合図）または代替手段で安全確認後に再開判断する',
      'エンジンの音で聞こえないだけとみなし、速度を上げて誘導路へ押し出す'
    ],
    optsVi: [
      'Vừa đẩy lùi vừa lấy điện thoại gọi tổng đài đặt vé của hãng bay',
      'Thấy gần xong rồi nên cứ đẩy mù tiếp cho tới vị trí đường lăn rồi tự tháo thanh kéo',
      'Ra hiệu DỪNG xe đẩy lùi ngay lập tức, chuyển sang giao tiếp bằng tín hiệu tay chuẩn (ハンドシグナル) với buồng lái hoặc khắc phục kết nối rồi mới xử lý tiếp',
      'Tăng tốc đẩy nhanh hơn để thoát khỏi tiếng ồn động cơ'
    ],
    optsEn: [
      'Keep pushing while calling the airline’s customer reservations hotline on a mobile phone',
      'Continue pushing by guesswork since the tug is almost at the taxiway centerline',
      'Immediately signal the Tug driver to STOP pushback, establish visual hand signals with the flight deck, and resolve communication before moving again',
      'Speed up pushback to move away from engine noise'
    ],
    ans: 2,
    expJa: '機長がブレーキ操作や緊急停止を伝えられない状態でのプッシュバック継続は極めて危険です。即停止し、目視できる位置で国際標準ハンドシグナルに切り替えて安全を確保します。',
    expVi: 'Tiếp tục đẩy lùi khi mất liên lạc khiến cơ trưởng không thể báo phanh hay dừng khẩn cấp. Phải dừng ngay lập tức và dùng tín hiệu tay tiêu chuẩn ở vị trí cơ trưởng nhìn rõ.',
    expEn: 'Continuing pushback without flight-deck communication prevents coordinated braking or emergency stops. Halt immediately and revert to standard visual hand signals.'
  },
  {
    id: 'T2Q038', topic: 'tg2_irregular', level: 2,
    qJa: '乗客の「電動車椅子（バッテリー内蔵）」を預かる際、機種やバッテリー種類によって取扱い手順が大きく変わる。作業責任者が確認すべき必須ポイントは？',
    qVi: 'Khi tiếp nhận xe lăn điện (電動車椅子) của hành khách, quy trình xử lý phụ thuộc rất lớn vào loại pin/ắc quy. Trưởng nhóm phải kiểm tra điều kiện cốt lõi nào?',
    qEn: 'When accepting a passenger’s battery-powered wheelchair, handling depends strictly on battery chemistry. What critical checks must the supervisor verify?',
    optsJa: [
      '湿式（液漏れ型）バッテリーでも横倒しにして積み込めば場所を取らない',
      'タイヤの空気圧が規定通りならバッテリーの種類は確認不要',
      'リチウムイオン電池は機内持込できないため、常に容量無制限で貨物室へそのまま積む',
      'バッテリー種別（乾式/湿式/リチウムイオンとWh容量）、短絡防止（絶縁措置）・電源完全OFF、および必要に応じた機長通知（NOTOC）有無'
    ],
    optsVi: [
      'Ắc quy nước (wet-cell) có thể đặt nằm ngang cho gọn chỗ trong hầm',
      'Chỉ cần kiểm tra áp suất lốp xe lăn là đủ, không cần xem loại pin',
      'Pin lithium dung lượng bao nhiêu cũng xếp tự do xuống hầm hàng không cần tháo hay bảo vệ',
      'Kiểm tra loại ắc quy/pin (khô/ướt/lithium & dung lượng Wh), cách điện chống đoản mạch đầu cực, tắt nguồn hoàn toàn và ghi NOTOC nếu thuộc diện phải báo cơ trưởng'
    ],
    optsEn: [
      'Spillable wet-cell batteries may be laid sideways to save space in the hold',
      'If wheelchair tire pressure is adequate, battery type verification is unnecessary',
      'Lithium batteries of unlimited Wh may always be loaded loose in the cargo hold',
      'Verify battery type (non-spillable/spillable/lithium Wh rating), terminal short-circuit insulation, main switch OFF, and NOTOC entry if required'
    ],
    ans: 3,
    expJa: '電動車椅子はDGR（危険物規則）の特別規定の対象であり、誤った積載（湿式バッテリーの横倒しや非保護リチウム電池の短絡）は機内発火・腐食に直結します。',
    expVi: 'Xe lăn điện thuộc đối tượng kiểm soát chặt của IATA DGR. Đặt nghiêng ắc quy nước hoặc để chập cực pin lithium có thể gây rò rỉ axit ăn mòn khung tàu hoặc cháy hầm hàng.',
    expEn: 'Battery-powered wheelchairs are governed by IATA DGR special provisions; tipped wet batteries or uninsulated lithium terminals risk acid corrosion or thermal fire.'
  },
  {
    id: 'T2Q039', topic: 'tg2_irregular', level: 2,
    qJa: '空港内で「非常事態宣言（Emergency / 油圧漏れ・エンジン片発停止・急病人等）」を発出した到着機を迎える際、ランプ責任者が厳守すべき行動は？',
    qVi: 'Khi đón một chuyến bay tuyên bố tình trạng khẩn cấp (Emergency: rò thủy lực, tắt 1 động cơ, cấp cứu y tế...), trưởng nhóm sân đỗ phải tuân thủ nguyên tắc nào?',
    qEn: 'When an inbound flight declares an Emergency (e.g., hydraulic leak, single-engine shutdown, medical emergency), what must the ramp supervisor strictly observe?',
    optsJa: [
      '消防（ARFF）・医療・空港運用からの安全確認（クリアランス）が出るまで、ランプ作業員・GSEをERAおよび指定待機線より内側へ絶対に進入させない',
      '誰よりも早く到着点検を始めるため、緊急着陸中の滑走路脇まで車で追いかける',
      '消防車が放水している横をすり抜けてベルトローダーを装着する',
      '記念撮影のために誘導路の近くまで全員で集まる'
    ],
    optsVi: [
      'Tuyệt đối giữ toàn bộ nhân sự và xe GSE ngoài vạch chờ an toàn cho đến khi lực lượng Cứu hỏa (ARFF), Y tế và Điều hành sân bay xác nhận an toàn cho phép tiếp cận',
      'Lái xe GSE đuổi theo dọc đường băng để kịp đón tàu ngay khi vừa chạm bánh',
      'Lách qua cạnh xe cứu hỏa đang phun bọt để gắn băng chuyền hành lý cho nhanh',
      'Tập trung cả đội ra sát đường lăn để quay video làm tư liệu'
    ],
    optsEn: [
      'Hold all ramp crew and GSE outside the ERA/safe perimeter until ARFF Fire Rescue, Medical, and Airport Ops grant explicit clearance to approach',
      'Chase the aircraft down the runway shoulder in GSE vehicles to start servicing faster',
      'Drive around active fire trucks spraying foam to dock the belt loader immediately',
      'Gather the entire ramp team near the taxiway edge to record video'
    ],
    ans: 0,
    expJa: '緊急着陸機ではブレーキ過熱（タイヤ破裂危険）・燃料漏洩・片側エンジン高出力等の二次災害リスクがあります。必ず空港消防・司令（Commander）の安全宣言を待ちます。',
    expVi: 'Tàu bay hạ cánh khẩn cấp có nguy cơ cháy phanh/nổ lốp, rò rỉ nhiên liệu hoặc động cơ còn chạy. Bắt buộc chờ chỉ huy cứu hỏa ARFF xác nhận an toàn mới được tiếp cận.',
    expEn: 'Emergency arrivals carry severe secondary risks such as overheated brakes/tire burst or fuel leaks; wait for ARFF Incident Command clearance before approaching.'
  },
  {
    id: 'T2Q040', topic: 'tg2_irregular', level: 2,
    qJa: 'ターミナルのチェックイン/仕分けベルトシステム（BHS）が突然故障し、手動仕分けへ切り替えることになった。作業責任者としての優先対応は？',
    qVi: 'Hệ thống băng chuyền phân loại hành lý (BHS) của nhà ga bất ngờ gặp sự cố phải chuyển sang phân loại thủ công. Ưu tiên của trưởng nhóm là gì?',
    qEn: 'When the terminal Baggage Handling System (BHS) breaks down and manual sorting is activated, what is the supervisor’s priority?',
    optsJa: [
      '見分けがつきにくいため、行き先タグを見ずに全部同じ便のドーリーへ積む',
      '出発時刻が近い便・乗継時間が短い便（Hot Transfer）と優先/特別手荷物を最優先に仕分け人員を集中し、BHS側とタグ照合ミスを防ぐ',
      'BHSが直るまで数時間何もしないで全員で待機する',
      '行先不明の荷物はすべて空港の外へ持ち出す'
    ],
    optsVi: [
      'Không cần đọc thẻ chuyến bay, cứ chất chung hết lên một đoàn dolly cho nhanh',
      'Tập trung nhân lực ưu tiên phân loại các chuyến sắp cất cánh, hành lý nối chuyến gấp (Hot Transfer) và kiểm soát chặt mã thẻ tránh nhầm chuyến',
      'Ngồi chờ nhiều giờ không làm gì cho tới khi BHS sửa xong',
      'Đưa toàn bộ hành lý chưa rõ chuyến ra ngoài cổng sân bay'
    ],
    optsEn: [
      'Skip reading destination tags and stack all bags onto the same dolly train',
      'Focus sorting staff on imminent departures and tight-connection (Hot Transfer) bags while enforcing strict tag verification to prevent misrouting',
      'Suspend all baggage handling for hours until BHS repairs are finished',
      'Move unidentified bags outside the airport terminal perimeter'
    ],
    ans: 1,
    expJa: '手動切替時は誤仕分け（Misrouted Bag）と出発遅延が急増します。出発順の優先制御と「1個ずつの行先コード（3レター＋便名）指差呼称」でミスを最小化します。',
    expVi: 'Khi phân loại thủ công rất dễ lẫn hành lý sang chuyến khác (Misrouted Bag). Cần ưu tiên theo giờ khởi hành và kiểm tra kỹ mã 3 chữ cái + số hiệu chuyến bay.',
    expEn: 'Manual sorting elevates misrouting and delay risks; prioritizing imminent flights and verifying 3-letter codes and flight numbers minimizes errors.'
  },
  {
    id: 'T2Q041', topic: 'tg2_irregular', level: 2,
    qJa: '到着した国際線受託手荷物に「税関・検疫の検査対象」あるいは「破損・開披（水濡れ・破れ）」が見つかった場合、作業責任者が取るべき正規処置は？',
    qVi: 'Khi dỡ hành lý chuyến quốc tế phát hiện kiện bị rách vỡ/ngấm nước hoặc có dấu hiệu bất thường cần kiểm tra, trưởng nhóm phải xử lý theo quy trình nào?',
    qEn: 'When offloading international checked baggage, a bag is found torn open, water-soaked, or damaged. What is the proper supervisory procedure?',
    optsJa: [
      '中身がこぼれていても見なかったことにしてベルトへ投げ込む',
      '現状を写真・損傷報告書（Damage Report）に記録し、必要に応じビニール袋等で保護した上で旅客係員（バゲージサービス）および保税/税関ルールに沿って引き渡す',
      '作業員が個人で中身を別の私物カバンへ詰め替える',
      '破損した荷物はそのままエプロンの隅に捨てておく'
    ],
    optsVi: [
      'Mặc kệ đồ bên trong rơi vãi và ném thẳng lên băng chuyền trả khách',
      'Ghi nhận hiện trạng/lập biên bản hư hỏng (Damage Report), bọc bảo vệ (như túi nilon) và bàn giao cho bộ phận hành lý (Baggage Service) đúng quy trình hải quan',
      'Tự ý lấy túi cá nhân của nhân viên nhét đồ của khách vào rồi mang đi',
      'Bỏ mặc kiện hành lý hỏng ở góc sân đỗ'
    ],
    optsEn: [
      'Ignore spilled items and toss the torn bag onto the arrival claim belt',
      'Document the condition on a Damage Report, protect contents with a protective bag if needed, and hand over to Baggage Services per customs rules',
      'Repack the passenger’s belongings into a staff member’s personal bag',
      'Leave the damaged bag unattended in a corner of the apron'
    ],
    ans: 1,
    expJa: '国際線手荷物は保税管理下にあるため、破損時は内容物の散逸防止と責任所在明確化（航空会社損傷か空港搬送損傷かの記録）のため、即時記録・保護・引継ぎが必須です。',
    expVi: 'Hành lý quốc tế đang thuộc sự quản lý ngoại quan. Việc ghi nhận hiện trạng, bọc bảo vệ chống thất thoát đồ và bàn giao cho Baggage Service giúp bảo vệ quyền lợi hành khách và hãng bay.',
    expEn: 'International bags remain under customs control; prompt documentation, protective bagging, and handover to Baggage Services protect contents and clarify liability.'
  },
  {
    id: 'T2Q042', topic: 'tg2_irregular', level: 2,
    qJa: 'プッシュバック開始直前に、別のスポットへ進入してくる他機（着陸機）との誘導路上の干渉が管制（Ground）から指摘された。作業責任者の対応は？',
    qVi: 'Ngay trước lúc đẩy lùi, Kiểm soát mặt đất (Ground ATC) thông báo có tàu bay khác đang lăn vào bãi kế bên cắt ngang đường lăn sau lưng. Trưởng nhóm làm gì?',
    qEn: 'Right before pushback, Ground Control alerts the crew of another arriving aircraft taxiing behind the stand. What is the supervisor’s action?',
    optsJa: [
      'ブレーキを解除したままエンジンだけを先に全開にする',
      '他機より先に抜けられそうなので、管制指示を無視して急いで押し出す',
      'ヘッドセットマンに他機の前に飛び出して手で止めさせる',
      '管制指示に従いプッシュバックを確実にホールド（待機）させ、他機の完全通過と翼端クリアランスを確認後に再承認を得て開始する'
    ],
    optsVi: [
      'Nhả phanh đỗ và tăng ga động cơ tối đa tại chỗ trong lúc chờ',
      'Thấy vẫn kịp lách trước nên phớt lờ ATC và đẩy lùi thật nhanh',
      'Bảo Headset Man chạy ra giữa đường lăn giơ tay chặn tàu bay đang lăn',
      'Giữ tàu đứng yên chờ (Hold) theo đúng huấn lệnh ATC, đợi tàu kia đi qua hẳn an toàn và có phép mới bắt đầu đẩy lùi'
    ],
    optsEn: [
      'Release parking brakes and spool engines to high thrust while holding at the gate',
      'Ignore the ATC hold and push back rapidly to beat the taxiing aircraft',
      'Send the headset operator onto the taxiway to stop the arriving aircraft by hand',
      'Hold pushback per ATC instruction, confirm the conflicting aircraft has passed clear, and await renewed ATC clearance before moving'
    ],
    ans: 3,
    expJa: '誘導路上の他機との翼端接触・インカージョンを防ぐため、プッシュバックは必ず管制承認と周囲の物理的クリアランス（ウイングウォーカー目視確認）の両方が揃ってから開始します。',
    expVi: 'Đẩy lùi ra đường lăn bắt buộc phải có cả huấn lệnh ATC lẫn xác nhận không gian trống thực tế từ nhân viên canh đầu cánh để tránh va quẹt đầu cánh.',
    expEn: 'Pushback onto an active taxilane requires both valid ATC clearance and confirmed physical wingtip clearance from wingwalkers.'
  },
  {
    id: 'T2Q043', topic: 'tg2_winter_wx', level: 2,
    qJa: '降雪・着氷気象下で航空機主翼の「防除氷作業（De-icing / Anti-icing）」を行う際、作業責任者が徹底させるべき「クリーンエアクラフトコンセプト」の原則は？',
    qVi: 'Trong mùa đông có tuyết/đóng băng, nguyên tắc "Clean Aircraft Concept" (クリーンエアクラフト) khi phun chất chống/tan băng (防除雪氷) quy định điều gì?',
    qEn: 'Under winter snow or icing conditions, what does the "Clean Aircraft Concept" require during aircraft De-icing / Anti-icing operations?',
    optsJa: [
      '離陸前に主翼・尾翼・操縦翼面等の霜・氷・雪を完全に除去し、汚染物が一切残っていない状態で離陸させること',
      '主翼の先端だけ溶けていれば、付け根や尾翼に雪が乗っていても離陸時に風で飛ぶので問題ない',
      '客室の窓ガラスだけ拭けば飛行性能には影響しない',
      'デアイシング液を節約するため、右側主翼だけに散布する'
    ],
    optsVi: [
      'Loại bỏ hoàn toàn sương giá, băng và tuyết trên cánh chính, cánh đuôi và các bề mặt điều khiển trước khi cất cánh',
      'Chỉ cần đầu cánh sạch, phần tuyết ở gốc cánh hoặc đuôi sẽ tự bay mất khi chạy đà',
      'Chỉ cần lau sạch kính cửa sổ hành khách là đủ an toàn bay',
      'Để tiết kiệm dung dịch chống băng, chỉ cần phun lên cánh bên phải'
    ],
    optsEn: [
      'No frost, ice, or snow may adhere to wings, tail surfaces, or control surfaces prior to takeoff',
      'Only the wingtips need clearing since snow near the wing root will blow off during takeoff roll',
      'Cleaning only passenger cabin windows is sufficient for winter dispatch',
      'Apply de-icing fluid only to the starboard wing to conserve chemical supply'
    ],
    ans: 0,
    expJa: '主翼上のわずかな霜や氷でも空気の流れを乱し揚力を著しく低下させ、離陸直後の失速墜落を招きます。左右対称に完全除去・防氷することが絶対条件です。',
    expVi: 'Ngay cả một lớp sương băng mỏng trên cánh cũng phá vỡ dòng khí nâng, gây mất lực nâng và rơi ngay khi cất cánh. Bắt buộc làm sạch đối xứng cả hai bên cánh và đuôi.',
    expEn: 'Even thin frost or ice severely disrupts airflow and lift, risking stall immediately after takeoff. Symmetrical, complete surface clearance is mandatory.'
  },
  {
    id: 'T2Q044', topic: 'tg2_winter_wx', level: 2,
    qJa: '防除氷作業の「ホールドオーバータイム（Holdover Time：HOT / 有効保持時間）」の意味として正しいものはどれか？',
    qVi: 'Thời gian giữ hiệu lực "Holdover Time (HOT / ホールドオーバータイム)" trong quy trình phun chất chống đóng băng (Anti-icing) có nghĩa là gì?',
    qEn: 'What does "Holdover Time (HOT)" mean in winter aircraft Anti-icing operations?',
    optsJa: [
      '作業員が防寒休憩室に入ってよい最長休憩時間',
      'デアイサー車のタンク内の液体が温まるまでの待ち時間',
      '防氷液（Type II/IV等）の散布開始時から、着氷性降水下でも機体表面への氷雪の再付着を防げると見込まれる推定有効時間',
      '滑走路の除雪車が作業を終えるまでの所要時間'
    ],
    optsVi: [
      'Thời gian tối đa nhân viên được phép nghỉ sưởi ấm trong nhà',
      'Thời gian chờ đun nóng dung dịch trong bồn xe De-icer',
      'Khoảng thời gian ước tính tính từ lúc bắt đầu phun dung dịch chống băng (Type II/IV...) mà chất lỏng vẫn ngăn được băng tuyết bám lại trên bề mặt tàu bay',
      'Thời gian cần thiết để xe cày tuyết dọn xong đường băng'
    ],
    optsEn: [
      'The maximum indoor break duration allowed for ramp crew in winter',
      'The warm-up time required to heat fluid inside the de-icing truck tank',
      'The estimated time from the start of anti-icing fluid application during which the fluid prevents ice/snow accumulation on treated surfaces',
      'The time required for snowplows to clear the active runway'
    ],
    ans: 2,
    expJa: 'HOTを超過して離陸待ちが続いた場合は、防氷効果が切れて再着氷する危険があるため、離陸前点検（Pre-takeoff Contamination Check）または再散布（Re-deicing）が必要になります。',
    expVi: 'Nếu tàu bay chờ cất cánh quá thời gian HOT, lớp màng chống băng mất tác dụng, buộc phải kiểm tra lại bề mặt cánh hoặc phun lại (Re-deicing) trước khi bay.',
    expEn: 'If departure is delayed beyond Holdover Time, fluid protection may fail, requiring a pre-takeoff contamination check or full re-application.'
  },
  {
    id: 'T2Q045', topic: 'tg2_winter_wx', level: 2,
    qJa: '防除氷作業（De-icing）を実施する際、機体への損傷や故障を防ぐため、デアイサー車ノズルから高圧・高温液を直接噴射してはいけない「噴射禁止箇所（No-Spray Zones）」に含まれるものは？',
    qVi: 'Khi phun tan băng/chống băng bằng vòi áp lực cao, khu vực nào trên tàu bay thuộc diện CẤM phun trực tiếp (No-Spray Zones) để tránh hỏng thiết bị?',
    qEn: 'During high-pressure/heated de-icing spray, which aircraft areas are strictly "No-Spray Zones" to prevent component damage?',
    optsJa: [
      '垂直尾翼の上端表面',
      '主翼上面のアルミ外板エリア全体',
      'ピトー管・AOAセンサー等のセンサー類、エンジン吸気口内部、APU吸排気口、ブレーキ・ホイール周辺、コックピット窓への直接高圧噴射',
      '水平尾翼の上面全体'
    ],
    optsVi: [
      'Phần mặt trên của cánh đuôi đứng',
      'Toàn bộ mặt trên cánh chính',
      'Các cảm biến (ống Pitot, cảm biến góc tấn AOA), bên trong cửa hút động cơ, cửa hút/xả APU, cụm phanh bánh xe và phun áp lực thẳng vào kính buồng lái',
      'Toàn bộ mặt trên cánh đuôi ngang'
    ],
    optsEn: [
      'The upper leading edge of the vertical stabilizer',
      'The upper wing skin panels',
      'Pitot tubes, AOA vanes/sensors, inside engine intakes, APU inlets/exhausts, wheel/brake assemblies, and direct high-pressure spray on flight-deck windows',
      'The upper horizontal stabilizer surface'
    ],
    ans: 2,
    expJa: 'センサー類（ピトー管・静圧孔等）やエンジン内部・ブレーキへの直接高圧噴射は、計器誤差・冷却による破損・液体残留凍結（機内悪臭や部品固着）を引き起こすため厳禁です。',
    expVi: 'Phun áp lực cao trực tiếp vào ống Pitot, cảm biến, cửa hút động cơ hoặc phanh gây sai lệch đồng hồ bay, nứt vỡ nhiệt hoặc đọng dịch đóng băng kẹt chi tiết.',
    expEn: 'Directing high-pressure heated fluid into pitot/static probes, intakes, or brakes can damage sensors, cause thermal shock, or leave residue inside systems.'
  },
  {
    id: 'T2Q046', topic: 'tg2_winter_wx', level: 2,
    qJa: '空港周辺に「雷警報（Thunderstorm / Lightning Alert）」が発令され、雷雲が規定距離内に接近した。作業責任者がまず取るべき対応は？',
    qVi: 'Khi sân bay phát cảnh báo giông sét ở cự ly gần (雷接近 / Lightning Alert), trưởng nhóm (作業責任者) phải ra lệnh xử lý như thế nào?',
    qEn: 'When the airport issues a close-proximity Lightning Alert (雷接近), what immediate action must the ramp supervisor take?',
    optsJa: [
      '屋外のランプ作業（特に給油・PBB・ヘッドセット有線接続・高所作業）を直ちに中断し、全作業員をターミナル内等の安全な避雷エリアへ退避させる',
      'ゴム長靴を履いていれば感電しないため、給油とヘッドセット作業を通常通り継続する',
      '金属製のハイリフトローダーの屋根の上に全員を避難させる',
      '雷が落ちる確率は低いため、定時出発を優先して作業を急がせる'
    ],
    optsVi: [
      'Đình chỉ ngay lập tức mọi thao tác ngoài trời (đặc biệt tra dầu, PBB, cắm tai nghe dây, làm việc trên cao) và sơ tán toàn bộ nhân sự vào trong nhà ga/nơi trú sét an toàn',
      'Vì đi giày/ủng cao su cách điện nên cứ tiếp tục tra dầu và cắm tai nghe bình thường',
      'Cho toàn bộ nhân viên trèo lên nóc xe nâng kim loại để tránh sét',
      'Xác suất sét đánh thấp nên vẫn thúc giục làm nhanh để giữ giờ bay'
    ],
    optsEn: [
      'Immediately suspend all outdoor ramp tasks (especially fueling, PBB, wired headsets, elevated work) and evacuate crew into designated indoor lightning shelters',
      'Continue fueling and wired headset duties since rubber-soled safety boots provide full insulation',
      'Gather all handlers on top of metallic high-loader platforms for shelter',
      'Speed up turnaround work to beat the storm since lightning strikes are rare'
    ],
    ans: 0,
    expJa: '開けたエプロンや金属製GSE、有線ヘッドセット、給油作業は落雷・誘導電流による感電・引火の極めて高い危険に晒されます。警報発令時は迷わず即時中断・屋内退避を指示します。',
    expVi: 'Sân đỗ trống trải, xe GSE kim loại, dây tai nghe nối thân tàu và hơi xăng dầu cực kỳ nguy hiểm khi có sét. Phải dừng việc ngay lập tức và sơ tán vào tòa nhà kiên cố.',
    expEn: 'Open aprons, metal GSE, wired headsets, and fuel vapors pose extreme electrocution and ignition risks during lightning; immediate work stoppage and indoor shelter are mandatory.'
  },
  {
    id: 'T2Q047', topic: 'tg2_winter_wx', level: 2,
    qJa: '台風や強い季節風による「強風警報（High Wind Warning）」時、駐機中の空コンテナ（AKE等）や軽量GSE（階段車・ベルト等）について責任者が実施すべき安全対策は？',
    qVi: 'Khi có cảnh báo gió giật mạnh/bão (強風警報), trưởng nhóm phải triển khai biện pháp gì đối với thùng ULD rỗng, xe thang, xe dolly và thiết bị nhẹ trên bãi?',
    qEn: 'During a High Wind Warning, what ramp safety precautions must the supervisor enforce for empty ULDs (e.g., AKE) and light GSE?',
    optsJa: [
      '強風時でも階段車（パッセンジャーステップ）の輪止めは不要である',
      '空コンテナは風で飛ばないよう、滑走路の端へ一列に並べて放置する',
      '風を受ける面積を減らすため、ドーリーの車輪ロックをすべて外して自由に転がるようにしておく',
      '空コンテナのタイダウン固定・ドーリーのロックとPブレーキ＆輪止め徹底、および機体接触を防ぐための風上側退避・アウトリガー張出を行う'
    ],
    optsVi: [
      'Khi gió mạnh không cần chèn bánh xe thang hành khách',
      'Xếp thùng ULD rỗng thành hàng dọc mép đường băng cho khuất gió',
      'Tháo hết khóa bánh dolly để xe tự lăn theo chiều gió giảm lực cản',
      'Chằng cố định chặt thùng ULD rỗng, gạt khóa sàn dolly, kéo phanh tay + chèn bánh toàn bộ GSE, thu gọn hoặc hạ chân chống tránh gió thổi va vào tàu bay'
    ],
    optsEn: [
      'Skip wheel chocks on passenger stairs during high winds',
      'Line up empty ULDs along the active runway shoulder',
      'Release dolly wheel brakes so carts roll freely with wind gusts',
      'Tie down or lock empty ULDs onto dollies, set parking brakes and wheel chocks on all GSE, deploy outriggers on high units, and clear windward aircraft zones'
    ],
    ans: 3,
    expJa: '空のアルミコンテナやベルトローダー等は強風で容易に滑走し、駐機中の機体や隣接施設へ衝突します。輪止め・ロック・タイダウン・風向きに応じた配置管理が不可欠です。',
    expVi: 'Thùng nhôm rỗng rất nhẹ, dễ bị gió mạnh thổi bay đâm vào thân tàu bay tạo tai nạn lớn. Bắt buộc khóa chốt dolly, chằng dây, kéo phanh tay và chèn bánh đầy đủ.',
    expEn: 'Empty aluminum ULDs and light GSE easily roll or blow into parked aircraft during gusts; positive locking, tie-downs, brakes, and chocks are mandatory.'
  },
  {
    id: 'T2Q048', topic: 'tg2_winter_wx', level: 2,
    qJa: '積雪・凍結（アイスバーン）したエプロン上で車両運転を行う際、作業責任者がドライバー全員へ徹底させるべき運転ルールは？',
    qVi: 'Khi lái xe GSE trên mặt sân đỗ có tuyết hoặc đóng băng trơn trượt (アイスバーン), trưởng nhóm phải quán triệt nguyên tắc lái xe nào cho toàn đội?',
    qEn: 'When operating GSE on snow-covered or icy aprons, what driving rules must the supervisor enforce across all drivers?',
    optsJa: [
      '滑りにくくするため、凍結路面では時速40km以上で勢いよく駆け抜ける',
      '急発進・急ハンドル・急ブレーキ（3急）を厳禁し、通常よりさらに減速・車間距離拡大を行い、5m手前でのブレーキ効き確認を早めに行う',
      'ブレーキが効かない場合は機体の主脚タイヤに軽く当てて止まる',
      'ドーリー牽引時は急ブレーキを連続で踏んで氷を削りながら走る'
    ],
    optsVi: [
      'Chạy tốc độ trên 40 km/h lấy đà để bánh xe không bị kẹt trên băng',
      'Cấm tuyệt đối 3 hành động gấp (tăng ga gấp, đánh lái gấp, phanh gấp), giảm tốc sâu, giữ khoảng cách xa và thử phanh sớm trước 5 m',
      'Nếu trượt phanh thì cho mũi xe húc nhẹ vào lốp càng chính tàu bay để hãm lại',
      'Khi kéo dolly thì nhấp phanh gấp liên tục để cào tan băng trên đường'
    ],
    optsEn: [
      'Maintain speeds above 40 km/h on ice to prevent tires from losing momentum',
      'Strictly prohibit sudden starts, turns, or braking; reduce speed further, increase following distance, and test brakes early prior to the 5 m stop',
      'Use the aircraft main landing gear tires as a gentle backstop if the GSE slides',
      'Slam brakes repeatedly while towing dollies to break up apron ice'
    ],
    ans: 1,
    expJa: '凍結路面（ブラックアイスバーン等）では制動距離が乾燥路面の数倍に伸びます。「急」のつく操作を避け、早めの減速・十分な車間距離と5m手前確認が接触事故を防ぎます。',
    expVi: 'Trên mặt băng tuyết, quãng đường phanh dài gấp nhiều lần bình thường. Cấm thao tác gấp, đi chậm và thử phanh sớm là cách duy nhất tránh trượt đâm vào tàu bay.',
    expEn: 'Icy aprons multiply stopping distances severalfold; avoiding abrupt inputs, reducing speed, and testing brakes early prevent slide collisions.'
  },
  {
    id: 'T2Q049', topic: 'tg2_winter_wx', level: 2,
    qJa: '低視程運航（霧や猛吹雪によるLVP：Low Visibility Procedures発動中）の空港制限区域内で、作業責任者が強化すべき安全措置は？',
    qVi: 'Khi sân bay áp dụng quy trình tầm nhìn hạn chế (LVP: sương mù dày hoặc bão tuyết), trưởng nhóm cần tăng cường biện pháp an toàn nào trong khu bay?',
    qEn: 'When Low Visibility Procedures (LVP) are active due to dense fog or heavy snow, what safety controls must the ramp supervisor reinforce?',
    optsJa: [
      '視界が悪い時ほど作業員の反射ベストを脱いで目立たなくする',
      '霧の中でライトを点けると眩しいため、すべての車両のライトを消灯して走行する',
      '誘導路と滑走路の境界線（ILS保護区域）へ一時的に車両を並べて待機させる',
      '車両のヘッドライト・回転灯（黄色ビーコン）を常時点灯し、誘導路横断・サービスレーンでの確認を強化し、不要不急の車両移動を制限する'
    ],
    optsVi: [
      'Cởi bỏ áo phản quang vì đèn xe dễ làm chói mắt',
      'Tắt hết đèn xe để tránh bị lóa trong sương mù',
      'Đỗ xe chờ tạm ngay bên trong khu vực bảo vệ ILS cạnh đường băng',
      'Bật toàn bộ đèn pha và đèn xoay vàng trên xe GSE, siết chặt kiểm tra khi qua Service Lane/đường lăn và hạn chế xe không cần thiết'
    ],
    optsEn: [
      'Remove high-visibility vests to reduce reflection',
      'Turn off all vehicle headlights to avoid glare in dense fog',
      'Stage spare GSE inside ILS critical/sensitive areas beside the runway',
      'Keep GSE headlights and amber beacons ON, enforce strict hold/cross checks at service lanes, and restrict non-essential airside vehicle movements'
    ],
    ans: 3,
    expJa: 'LVP発動中はパイロットや管制塔からの地上視認性が著しく低下し、ILS保護区域の厳格な防護が求められます。灯火点灯と不要車両の抑制、停止線厳守が不可欠です。',
    expVi: 'Trong điều kiện LVP, phi công và đài không lưu rất khó quan sát mặt đất, đồng thời vùng bảo vệ ILS phải được giữ trống tuyệt đối. Cần bật đủ đèn xe và hạn chế tối đa di chuyển.',
    expEn: 'During LVP, tower and cockpit visibility drops sharply and ILS critical areas must remain clear; full lighting and movement discipline are essential.'
  },
  {
    id: 'T2Q050', topic: 'tg2_winter_wx', level: 2,
    qJa: '防除氷作業完了後、デアイサー車から操縦室（機長）へ最終引き継ぎとして必ず伝達すべき必須情報（Anti-icing Code）に含まれるものは？',
    qVi: 'Sau khi phun chống đóng băng (防除氷) xong, bộ phận mặt đất bắt buộc phải thông báo mã Anti-icing Code nào cho Cơ trưởng trước khi tàu bay lăn ra?',
    qEn: 'After completing anti-icing treatment, what mandatory Anti-icing Code elements must ground crew transmit to the Captain?',
    optsJa: [
      '作業を担当した運転手の生年月日と血液型のみ',
      '使用した液体タイプ（Type I/II/IV等）、混合比率（濃度）、最終ステップの散布開始時刻（HOT起算点）、および全面クリア確認',
      'デアイサー車の走行距離メーターの数値のみ',
      '使用した液体の単価と請求書番号のみ'
    ],
    optsVi: [
      'Chỉ báo tên tuổi và nhóm máu của tài xế xe phun',
      'Loại dung dịch đã dùng (Type I/II/IV), tỷ lệ pha trộn, thời điểm bắt đầu phun bước cuối (mốc tính HOT) và xác nhận bề mặt đã sạch băng tuyết',
      'Chỉ báo số công-tơ-mét của xe De-icer',
      'Chỉ báo đơn giá dung dịch và mã hóa đơn thanh toán'
    ],
    optsEn: [
      'Only the operator’s date of birth and blood type',
      'Fluid type (e.g., Type I/II/IV), fluid/water mix ratio, start time of the final step (HOT start), and post-treatment clear confirmation',
      'Only the de-icing truck’s odometer reading',
      'Only the chemical unit price and invoice reference number'
    ],
    ans: 1,
    expJa: '機長は「液種・濃度・最終散布開始時刻」の3点をもとに、自機のホールドオーバータイム（HOT）表から離陸可能な残り時間を正確に算出します。これらが欠けると離陸判断ができません。',
    expVi: 'Cơ trưởng cần chính xác 3 thông số (Loại dung dịch, Tỷ lệ pha, Giờ bắt đầu phun bước cuối) để tra bảng Holdover Time (HOT) và quyết định thời hạn cất cánh an toàn.',
    expEn: 'The flight crew relies on fluid type, concentration ratio, and final-step start time to calculate valid Holdover Time from official HOT tables.'
  },
  {
    id: 'T2Q051', topic: 'tg2_dgr_advanced', level: 2,
    qJa: 'IATA DGR（危険物規則）に基づき、荷送人から提出された危険物貨物の「受託チェックリスト（Acceptance Checklist）」で不備が見つかった場合の正しい処置は？',
    qVi: 'Theo quy định IATA DGR, khi kiểm tra hàng nguy hiểm bằng Acceptance Checklist (危険物受託チェックリスト) mà phát hiện sai sót bao bì hoặc tờ khai DGD, xử lý thế nào?',
    qEn: 'Under IATA DGR, if a discrepancy is found on the Dangerous Goods Acceptance Checklist (packaging, labels, or DGD), what is the required action?',
    optsJa: [
      '危険物申告書（DGD）の荷送人署名が抜けていても、定時出発のため係員が代筆して通す',
      'ラベルが斜めに貼られていても文字が読めるため、係員が油性ペンで書き足して受託する',
      'その場で受託を拒否（REJECT）し、荷送人側で不備を是正しない限り絶対に航空機へ搭載しない',
      '包装等級（PG）の誤記は到着地で修正すればよいため、そのまま搭載する'
    ],
    optsVi: [
      'Nếu tờ khai DGD thiếu chữ ký người gửi thì nhân viên tự ký thay cho kịp chuyến',
      'Nếu thiếu nhãn hoặc mờ chữ thì nhân viên tự lấy bút lông viết bổ sung lên thùng rồi nhận',
      'Từ chối tiếp nhận (REJECT) ngay và tuyệt đối không xếp lên tàu bay cho tới khi chủ hàng khắc phục đúng chuẩn',
      'Sai nhóm đóng gói (PG) có thể cho bay trước rồi sửa hồ sơ ở sân bay đến'
    ],
    optsEn: [
      'Sign the missing shipper signature on the DGD on their behalf to avoid flight delay',
      'Use a marker pen to hand-draw missing labels or marks and accept the box',
      'REJECT the shipment immediately and do not load it unless the shipper corrects all discrepancies and passes re-inspection',
      'Accept incorrect Packing Group entries and fix the paperwork at the destination'
    ],
    ans: 2,
    expJa: '危険物の係員による改ざん・代筆・見切り搭載は法令違反であり重大な航空事故の原因となります。チェックリストの全項目が「YES」になるまで受託は不可です。',
    expVi: 'Nhân viên không bao giờ được tự ý sửa tờ khai DGD hay cho qua kiện hàng sai quy chuẩn DGR. Mọi mục trên Acceptance Checklist phải đạt chuẩn 100% mới được nhận.',
    expEn: 'Airlines may never alter a shipper’s DGD or accept non-compliant DG; every item on the Acceptance Checklist must be satisfied before acceptance.'
  },
  {
    id: 'T2Q052', topic: 'tg2_dgr_advanced', level: 2,
    qJa: '異なる分類の危険物を同一のULDまたは同一区画へ混載する際、IATA DGRの「隔離表（Segregation Table）」に従い原則として離隔・混載禁止とされる組み合わせの例は？',
    qVi: 'Khi xếp chung các loại hàng nguy hiểm vào cùng một ULD hoặc khoang hàng theo Bảng phân tách IATA DGR (Segregation Table), cặp chất nào CẤM xếp sát/chung với nhau?',
    qEn: 'According to the IATA DGR Segregation Table, which pair of dangerous goods classes generally requires strict segregation (must not be loaded together/adjacent)?',
    optsJa: [
      'Class 3（引火性液体）や Class 4.1（可燃性固体）と、Class 5.1（酸化性物質）または Class 8（腐食性物質と他クラス規定）の組合せ',
      'Class 9（ドライアイス）と一般衣料品（非危険物）の組合せ',
      '同じUN番号・同じ分類の貨物同士の組合せ',
      'リチウム電池組込機器（UN3481）とプラスチック製文房具の組合せ'
    ],
    optsVi: [
      'Chất lỏng dễ cháy (Class 3) / Chất rắn dễ cháy (4.1) xếp chung sát với Chất oxy hóa (Class 5.1) hoặc các cặp xung khắc hóa học theo bảng DGR',
      'Đá khô (Class 9) xếp chung với quần áo thông thường',
      'Hai kiện hàng có cùng số UN và cùng phân loại nguy hiểm',
      'Laptop chứa pin UN3481 xếp chung với đồ dùng văn phòng phẩm bằng nhựa'
    ],
    optsEn: [
      'Flammable Liquids (Class 3) or Solids (4.1) loaded next to Oxidizers (Class 5.1) or other incompatible pairs listed in the DGR Segregation Table',
      'Dry Ice (Class 9) loaded alongside general non-DG garments',
      'Two packages sharing the exact same UN number and hazard class',
      'Laptops with UN3481 batteries packed near plastic office supplies'
    ],
    ans: 0,
    expJa: '酸化性物質（5.1）は可燃性・引火性物質（Class 3/4）と接触すると激しい燃焼・爆発を引き起こすため、同一ULDへの混載禁止および機内での隔離搭載が義務付けられています。',
    expVi: 'Chất oxy hóa (Class 5.1) khi tiếp xúc hoặc rò rỉ lẫn với chất dễ cháy (Class 3, 4) sẽ kích hoạt cháy nổ cực mạnh, nên bị cấm xếp chung sát nhau theo Bảng phân tách DGR.',
    expEn: 'Oxidizers (Class 5.1) react violently with flammable materials (Class 3/4), requiring strict separation in ULD build-up and aircraft stowage per the Segregation Table.'
  },
  {
    id: 'T2Q053', topic: 'tg2_dgr_advanced', level: 2,
    qJa: '特別搭載通知書「NOTOC（Notification to Captain）」について、特定技能2号の作業責任者が必ず確認すべき運用ルールはどれか？',
    qVi: 'Đối với Phiếu thông báo hàng đặc biệt gửi Cơ trưởng "NOTOC", trưởng nhóm trình độ số 2 bắt buộc phải đảm bảo quy tắc nào?',
    qEn: 'Regarding the Special Load — Notification to Captain (NOTOC), what operational rule must the Level 2 supervisor strictly enforce?',
    optsJa: [
      '搭載した全危険物（UN番号・クラス・個数・正味量・CAO有無・正確なULD/搭載位置）および特別貨物を正確に記載し、出発前に機長の受領署名を得ること',
      'ドライアイスや放射性物質はNOTOCに記載する必要がない',
      '機長が出発を急いでいる場合は、離陸後に到着地へFAXで送ればよい',
      '搭載位置（Position）がLIRから変更になっても、NOTOC側は書き直さなくてよい'
    ],
    optsVi: [
      'Ghi chính xác mọi hàng nguy hiểm (số UN, Class, số kiện, khối lượng, CAO, vị trí ULD/hầm thực tế) và trình Cơ trưởng ký nhận trước giờ khởi hành',
      'Đá khô và chất phóng xạ được miễn ghi vào NOTOC',
      'Nếu cơ trưởng vội cất cánh thì có thể gửi bản NOTOC sau khi máy bay đã bay',
      'Nếu đổi vị trí xếp ULD trên LIR thì không cần sửa lại vị trí trên NOTOC'
    ],
    optsEn: [
      'Accurately list all DG (UN number, class, pieces, net qty, CAO status, exact ULD/hold position) and obtain the Captain’s signature before departure',
      'Dry ice and radioactive materials are exempt from NOTOC reporting',
      'If the Captain is rushed, the NOTOC can be faxed to the destination after takeoff',
      'Changing a ULD’s hold position on the LIR does not require updating the NOTOC'
    ],
    ans: 0,
    expJa: '機長は緊急時の消火判断や不時着時の救助隊連絡のため、何がどこに積まれているかを正確に把握する必要があります。位置変更時は必ずNOTOCも再発行・署名し直します。',
    expVi: 'Cơ trưởng phải biết chính xác vị trí và chủng loại hàng nguy hiểm để xử lý chữa cháy hoặc báo cứu hộ khi khẩn cấp. Đổi vị trí ULD bắt buộc phải cập nhật lại NOTOC và ký lại.',
    expEn: 'The Captain needs exact DG identity and location for in-flight fire response and emergency rescue coordination; any position change requires an updated, re-signed NOTOC.'
  },
  {
    id: 'T2Q054', topic: 'tg2_dgr_advanced', level: 2,
    qJa: '貨物上屋またはランプ作業中に「危険物ラベルの貼られた梱包からの液漏れ・異臭・発煙」を発見した。作業責任者が最優先で行うべき初動対応は？',
    qVi: 'Trong kho hàng hoặc trên sân đỗ, phát hiện một kiện hàng dán nhãn nguy hiểm bị rò rỉ chất lỏng, bốc mùi lạ hoặc bốc khói. Hành động đầu tiên của trưởng nhóm là gì?',
    qEn: 'In the cargo warehouse or on the ramp, crew discover liquid leakage, odor, or smoke from a DG-labeled package. What is the supervisor’s immediate priority?',
    optsJa: [
      '被害を隠すため、段ボールごと他の一般貨物の奥へ押し込んで封をする',
      'まず雑巾で素早く拭き取り、どんな液体か鼻を近づけて匂いで判別する',
      '作業を即時停止し風上側へ人員を退避・立入禁止措置を取り、素手で触れずに消防・DGR責任者・空港運用へ緊急通報（物質名・UN番号を伝達）する',
      '水を大量に掛けて洗い流し、通常の排水溝へ流す'
    ],
    optsVi: [
      'Đẩy giấu thùng bị rò vào sâu bên trong đống hàng thường rồi đóng kín lại',
      'Lấy giẻ lau sạch ngay và ghé sát mũi ngửi thử xem là chất gì',
      'Dừng việc ngay, sơ tán mọi người về đầu hướng gió và phong tỏa khu vực; tuyệt đối không chạm tay trần, báo ngay Cứu hỏa/Chuyên trách DGR (kèm tên chất & số UN)',
      'Dội thật nhiều nước rửa trôi thẳng xuống cống thoát nước sân bay'
    ],
    optsEn: [
      'Push the leaking carton behind general cargo and seal the container',
      'Wipe up the spill quickly with a rag and sniff closely to identify the chemical',
      'Stop work immediately, evacuate personnel upwind, isolate the area without touching with bare hands, and alert Fire/DG specialists with UN number/name',
      'Flush the spill with heavy water hoses straight into the apron storm drain'
    ],
    ans: 2,
    expJa: '危険物には水と反応して爆発・有毒ガスを発生する物質（Class 4.3等）や吸入毒性物質があります。絶対に素手で触れず・匂いを嗅がず・水で流さず、風上退避とUN番号に基づく専門通報を行います。',
    expVi: 'Một số chất nguy hiểm phản ứng nổ hoặc sinh khí độc khi gặp nước (Class 4.3), hoặc gây ngộ độc đường hô hấp. Cấm chạm, cấm ngửi, cấm xịt nước bừa bãi; sơ tán đầu gió và báo số UN.',
    expEn: 'Some DG react violently with water (e.g., Class 4.3) or emit toxic fumes. Never touch, sniff, or wash down; evacuate upwind and report the UN number to specialists.'
  },
  {
    id: 'T2Q055', topic: 'tg2_dgr_advanced', level: 2,
    qJa: 'オレンジ色の「CARGO AIRCRAFT ONLY（CAO / 貨物専用機限定）」ラベルが貼られた貨物の搭載ルールとして正しいものは？',
    qVi: 'Quy tắc xếp tải đối với hàng nguy hiểm dán nhãn cam "CARGO AIRCRAFT ONLY (CAO)" là gì?',
    qEn: 'What is the mandatory loading rule for dangerous goods bearing the orange "CARGO AIRCRAFT ONLY (CAO)" label?',
    optsJa: [
      '旅客機の後部バルク室であれば少量は搭載してもよい',
      '旅客機への搭載は絶対禁止であり、貨物専用機（Freighter）の指定区画（原則として乗員がアクセス可能なメインデッキ等、規定条件適合箇所）にのみ搭載可能',
      '乗客が10名以下のチャーター旅客機ならCAOでも搭載できる',
      'CAO貨物は機内への固定（固縛）をせず床に置くだけでよい'
    ],
    optsVi: [
      'Có thể xếp lượng nhỏ vào hầm Bulk phía sau của máy bay chở khách',
      'CẤM tuyệt đối lên máy bay chở khách; chỉ được xếp lên tàu chở hàng (Freighter) tại khoang đúng quy định DGR (như khoang chính tiếp cận được)',
      'Nếu chuyến bay chở khách có dưới 10 người thì vẫn được phép xếp hàng CAO',
      'Hàng CAO chỉ cần đặt lên sàn tàu hàng mà không cần chằng buộc hay khóa chốt'
    ],
    optsEn: [
      'Small quantities may be loaded into the aft bulk hold of a passenger airliner',
      'Strictly forbidden on passenger aircraft; permitted only on Cargo Aircraft (Freighter) in DGR-compliant accessible compartments',
      'Permitted on passenger flights carrying fewer than 10 passengers',
      'CAO shipments do not require tie-down or restraint on freighter aircraft'
    ],
    ans: 1,
    expJa: 'CAO貨物は旅客機での輸送が認められない高リスクまたは大容量危険物です。誤って旅客便（例：A320/B787旅客便）へ搭載することは最も重大な航空法違反の一つです。',
    expVi: 'Nhãn CAO chỉ định hàng chỉ được bay tàu chở hàng (Freighter). Để lọt dù chỉ 1 kiện CAO lên chuyến bay chở khách là vi phạm cực kỳ nghiêm trọng Luật Hàng không và IATA DGR.',
    expEn: 'CAO shipments exceed passenger aircraft limits; loading even one CAO package onto a passenger flight is a severe regulatory violation.'
  },
  {
    id: 'T2Q056', topic: 'tg2_dgr_advanced', level: 2,
    qJa: '旅客機に放射性物質（Class 7：区分II黄色・III黄色等）を搭載する場合、作業責任者がLIR・NOTOCおよび積み付け位置で確認すべき「TI（輸送指数）」の原則は？',
    qVi: 'Khi xếp chất phóng xạ (Class 7: nhãn Vàng II / III) lên máy bay chở khách, trưởng nhóm phải kiểm tra quy tắc "Chỉ số vận chuyển (TI)" trên LIR/NOTOC như thế nào?',
    qEn: 'When loading Class 7 Radioactive Material (Yellow-II / Yellow-III) on a passenger aircraft, what Transport Index (TI) rule must the supervisor verify?',
    optsJa: [
      'TI値は貨物専用機のみで確認し、旅客機では確認不要である',
      'TI値が高ければ高いほど安全なため、100以上集めて同じ場所に積む',
      '放射性物質は生きた動物（AVI）の真横に密着させて保温する',
      '1機あたりの総TI値（通常旅客機上限50）および客室・動物・未現像フィルムとの規定離隔距離（Separation Distance）を厳守する'
    ],
    optsVi: [
      'Chỉ số TI chỉ kiểm tra trên tàu hàng, máy bay chở khách không cần kiểm',
      'Chỉ số TI càng cao càng tốt nên cứ gom trên 100 xếp chung một chỗ',
      'Xếp chất phóng xạ sát cạnh lồng động vật sống (AVI) để giữ ấm',
      'Tổng chỉ số TI trên một tàu bay chở khách không vượt ngưỡng quy định (tổng TI ≤ 50) và giữ đủ khoảng cách ly với khoang khách, động vật sống (AVI) và phim ảnh'
    ],
    optsEn: [
      'TI limits apply only to freighters and are ignored on passenger aircraft',
      'Higher TI numbers indicate safer packaging, so consolidate TI ≥ 100 together',
      'Stow radioactive packages directly beside live animal (AVI) kennels for warmth',
      'Verify total aircraft TI stays within passenger limits (total TI ≤ 50) and enforce mandated separation distances from cabin floor, live animals (AVI), and undeveloped film'
    ],
    ans: 3,
    expJa: '放射性物質（Class 7）は放射線被ばく防止のため、総TI上限（旅客機50）だけでなく、客室床面やAVI（生きた動物）・未現像フィルムからの距離基準を確実に守って搭載します。',
    expVi: 'Chất phóng xạ Class 7 vừa giới hạn tổng TI trên tàu khách (≤ 50), vừa bắt buộc giữ khoảng cách an toàn với sàn khoang hành khách, động vật sống (AVI) và phim chưa tráng.',
    expEn: 'Class 7 cargo requires both total TI compliance (≤ 50 on pax flights) and strict separation distances from passenger decks, live animals, and undeveloped film.'
  },
  {
    id: 'T2Q057', topic: 'tg2_dgr_advanced', level: 2,
    qJa: 'ドライアイス（UN1845 / Class 9）を大量に搭載する便で、作業責任者が「同一貨物室の積付限界量」と「生きた動物（AVI）との隔離」に注意すべき理由は？',
    qVi: 'Trên chuyến bay chở nhiều Đá khô (UN1845 / Class 9), vì sao trưởng nhóm phải kiểm soát chặt giới hạn khối lượng theo khoang và tách biệt với động vật sống (AVI)?',
    qEn: 'When loading significant quantities of Dry Ice (UN1845 / Class 9), why must the supervisor strictly enforce compartment limits and separation from live animals (AVI)?',
    optsJa: [
      'CO2ガスは空気より非常に軽く、瞬時に機外へ抜けるため制限は不要だが慣例で分けている',
      'ドライアイスは時間経過で水になって床を濡らすだけだから',
      'ドライアイスが昇華して重い二酸化炭素（CO2）ガスを大量発生し、生きた動物の窒息死や機内CO2濃度上昇を招くため',
      'ドライアイスが動物に食べられてしまうのを防ぐためだけである'
    ],
    optsVi: [
      'Khí CO2 nhẹ hơn không khí nên bay hết ra ngoài nhưng vẫn tách cho đẹp',
      'Vì đá khô tan ra thành nước làm ướt sàn tàu bay',
      'Vì đá khô thăng hoa sinh khí CO2 nặng chìm xuống đáy khoang, gây ngạt chết động vật sống (AVI) và làm tăng nồng độ CO2',
      'Chỉ để ngăn động vật ăn nhầm đá khô'
    ],
    optsEn: [
      'CO2 gas is lighter than air and vents immediately, so separation is purely cosmetic',
      'Dry ice merely melts into liquid water puddles on the hold floor',
      'Dry ice sublimates into heavy CO2 gas that displaces oxygen, risking asphyxiation of live animals (AVI) and excessive cabin/hold CO2 buildup',
      'Only to prevent live animals from eating dry ice pellets'
    ],
    ans: 2,
    expJa: 'CO2は空気より重いため貨物室下部（特に通気の低いバルクや下層）に滞留し、AVIの窒息事故を引き起こします。機種別換気能力に応じた最大搭載量遵守とAVI分離が絶対です。',
    expVi: 'Khí CO2 nặng hơn không khí nên đọng lại dưới đáy khoang, gây ngạt chết động vật sống. Phải tuân thủ giới hạn kg đá khô theo hệ thống thông gió từng loại tàu và tách xa AVI.',
    expEn: 'CO2 is heavier than air and pools in lower holds, suffocating animals. Strict aircraft-specific dry-ice weight limits and AVI separation are mandatory.'
  },
  {
    id: 'T2Q058', topic: 'tg2_dgr_advanced', level: 2,
    qJa: '危険物の「向上矢印マーク（Package Orientation：矢印2本上向き）」が貼られた液体入り外装容器をULDへビルドアップする際の必須ルールは？',
    qVi: 'Khi xếp kiện hàng nguy hiểm dạng lỏng có dán nhãn "Mũi tên hướng lên (Package Orientation)" vào thùng ULD, quy tắc bắt buộc là gì?',
    qEn: 'When building up a ULD with liquid dangerous goods bearing "Package Orientation" (double up-arrows) labels, what rule is mandatory?',
    optsJa: [
      '1段目だけ上向きにして、2段目は逆さまに積むと噛み合って安定する',
      'ULDのコンターに合わせるためなら、横倒しにしても蓋が閉まっていれば問題ない',
      '矢印は倉庫保管中だけの目印であり、航空機内では横積みしてよい',
      '必ず矢印が真上を向く正立姿勢で積み、横倒し・逆さ積み・傾斜積みを絶対にせず、荷崩れしないよう隙間を緩衝材・ネットで固定する'
    ],
    optsVi: [
      'Xếp tầng 1 hướng lên, tầng 2 lật ngược lại để khóa khớp cho chắc',
      'Nếu cần ép vào vòm Contour của ULD thì có thể đặt nằm ngang miễn vặn chặt nắp',
      'Nhãn mũi tên chỉ áp dụng trong kho, lên máy bay có thể xoay ngang cho vừa',
      'Bắt buộc xếp đứng thẳng đúng chiều mũi tên hướng lên trên, tuyệt đối không đặt nằm ngang/ngược và chèn lót chống đổ ngã'
    ],
    optsEn: [
      'Alternate upright and inverted layers so cartons interlock tightly',
      'Packages may be laid sideways to fit inside a contoured ULD roof as long as caps are tight',
      'Orientation arrows apply only to warehouse shelving, not inside aircraft ULDs',
      'Keep packages strictly upright with arrows pointing straight up—never lay them sideways or inverted—and brace against tipping'
    ],
    ans: 3,
    expJa: '液体の入った危険物（Class 3/6.1/8等）を横倒し・逆さ積みにすると、気圧変化で内蓋から漏洩する危険が極めて高くなります。常に正立維持と転倒防止が必須です。',
    expVi: 'Hàng lỏng nguy hiểm đặt ngang hoặc ngược dễ bị rò rỉ qua nắp chai khi áp suất thay đổi trên cao. Luôn giữ thẳng đứng đúng chiều mũi tên và chèn chống đổ.',
    expEn: 'Tilting or inverting liquid DG packages risks cap leakage under altitude pressure changes; upright orientation and bracing are mandatory.'
  },
  {
    id: 'T2Q059', topic: 'tg2_dgr_advanced', level: 2,
    qJa: '予備のリチウムイオン電池単体（UN3480 / PI965）の航空貨物としての輸送について、現行IATA DGRに基づく正しい理解はどれか？',
    qVi: 'Theo quy định IATA DGR hiện hành về vận chuyển pin Lithium-ion rời (UN3480 / PI965) dưới dạng hàng hóa, nhận định nào sau đây là ĐÚNG?',
    qEn: 'Under current IATA DGR rules for air cargo shipments of standalone lithium-ion batteries (UN3480 / PI965), which statement is CORRECT?',
    optsJa: [
      'UN3480（リチウムイオン電池単体）の貨物輸送は原則として旅客機搭載禁止（CAO限定）であり、さらに規定の充電率（SoC ≤ 30%等）や厳格な基準を満たす必要がある',
      'UN3480は一般貨物と同じ扱いであり、旅客機の客室や貨物室へ無制限に混載できる',
      '充電率100%の満充電状態でないと輸送できない',
      '「CARGO AIRCRAFT ONLY」ラベルはUN3480には一切不要である'
    ],
    optsVi: [
      'Hàng pin rời UN3480 bị CẤM chở trên máy bay chở khách (bắt buộc đi tàu chở hàng CAO) và phải tuân thủ mức sạc (SoC ≤ 30%...) cùng quy chuẩn đóng gói nghiêm ngặt',
      'UN3480 được coi như hàng thường, xếp tự do lên máy bay chở khách không giới hạn',
      'Bắt buộc phải sạc đầy 100% pin trước khi đưa lên máy bay',
      'UN3480 không cần dán nhãn CARGO AIRCRAFT ONLY'
    ],
    optsEn: [
      'Standalone UN3480 lithium-ion cargo is forbidden on passenger aircraft (CAO only) and must meet strict packaging and state-of-charge limits (e.g., SoC ≤ 30%)',
      'UN3480 is treated as general cargo and allowed on passenger aircraft without limits',
      'Batteries must be charged to 100% SoC prior to air shipment',
      'CARGO AIRCRAFT ONLY labels are never required for UN3480 shipments'
    ],
    ans: 0,
    expJa: 'リチウムイオン電池単体（UN3480）は熱暴走火災リスクが高いため旅客機への貨物搭載は禁止（CAO限定）され、充電率30%以下制限やUN規格梱包が厳格に課されています。',
    expVi: 'Pin lithium rời UN3480 có nguy cơ cháy nhiệt (thermal runaway) rất cao nên cấm bay tàu chở khách (chỉ đi CAO) và giới hạn mức sạc SoC ≤ 30% theo PI965.',
    expEn: 'Standalone UN3480 lithium-ion batteries pose severe thermal runaway fire risk, so passenger-flight cargo transport is banned (CAO only) with ≤30% SoC limits.'
  },
  {
    id: 'T2Q060', topic: 'tg2_dgr_advanced', level: 2,
    qJa: '一般貨物（Non-DG）として搬入された荷物に「未申告危険物（Hidden / Undeclared DG）」が疑われるサイン（例：ガス缶のX線影、強い溶剤臭、COMAT内のスプレー缶等）を発見した。責任者の対応は？',
    qVi: 'Khi kiểm tra lô hàng khai là "hàng thường" nhưng phát hiện dấu hiệu nghi ngờ Hàng nguy hiểm không khai báo (未申告危険物 / Undeclared DG như bình gas trên X-ray, mùi dung môi, bình xịt), trưởng nhóm phải làm gì?',
    qEn: 'When screening cargo declared as "General Cargo" and spotting signs of Undeclared/Hidden Dangerous Goods (e.g., X-ray gas canisters, solvent odor, aerosol cans), what must the supervisor do?',
    optsJa: [
      '荷送人の悪意がなさそうなので、問題のスプレー缶だけ作業員がゴミ箱へ捨てて残りを搭載する',
      '直ちに受託・搭載を停止して隔離し、社内安全管理部門および航空当局（JCAB等）への報告手順に従って正式報告する',
      '通常貨物としてそのまま飛行機へ積み、次回から気をつけるよう荷送人に口頭で伝える',
      'ラベルが貼られていないので危険物ではないと判断して通す'
    ],
    optsVi: [
      'Thấy chủ hàng không cố ý nên tự lấy bình xịt vứt vào thùng rác rồi cho phần hàng còn lại bay luôn',
      'Dừng ngay việc tiếp nhận/xếp lên tàu, cách ly lô hàng và báo cáo chính thức theo quy trình an toàn của hãng và cơ quan hàng không (JCAB)',
      'Vẫn cho xếp lên máy bay bình thường và chỉ nhắc miệng chủ hàng rút kinh nghiệm lần sau',
      'Vì ngoài thùng không dán nhãn nguy hiểm nên coi như hàng thường cho qua'
    ],
    optsEn: [
      'Assume no ill intent, discard the aerosol cans into a ramp trash bin, and load the rest',
      'Immediately halt acceptance/loading, quarantine the shipment, and file an official Undeclared DG report per airline SMS and JCAB regulations',
      'Load it as general cargo anyway and verbally remind the shipper for next time',
      'Clear it because no hazard diamond label is visible on the outer box'
    ],
    ans: 1,
    expJa: '未申告危険物は適切な梱包・表示・NOTOC記載が一切ないため航空火災の最大脅威です。発見時は勝手に廃棄・抜取りせず、証拠保全の上で即時隔離と当局規定報告を実施します。',
    expVi: 'Hàng nguy hiểm không khai báo không có bao bì đạt chuẩn và không nằm trên NOTOC nên cực kỳ nguy hiểm trên không. Phải cách ly giữ nguyên hiện trạng và báo cáo chính thức ngay.',
    expEn: 'Undeclared DG bypasses packaging, labeling, and NOTOC safeguards, creating extreme in-flight fire risk. Quarantine intact and file mandatory regulatory reports.'
  }
];
