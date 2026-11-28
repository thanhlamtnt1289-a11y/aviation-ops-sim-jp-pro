// 特定技能2号（航空分野・グランドハンドリング）60問試験対策バンク
// JAEA 特定技能2号評価試験範囲・IATA AHM / IGOM / DGR 準拠 (JA / VI / EN)

export const QUIZ_BANK_TG2 = [
  {
    id: 'T2Q001', topic: 'tg2_loadcontrol', level: 2,
    qJa: '搭載完了後に乗客2名と受託手荷物2個（計45kg）が直前キャンセルとなった。ロードコントロールへのLMC（直前変更）報告として正しい対応は？',
    qVi: 'Sau khi xếp tải xong có 2 khách và 2 kiện hành lý (tổng 45 kg) hủy sát giờ. Cách báo cáo thay đổi giờ chót (LMC / 直前変更) lên Load Control nào là đúng?',
    qEn: 'After loading is complete, 2 passengers and 2 checked bags (total 45 kg) are offloaded last-minute. What is the correct LMC (Last Minute Change) action with Load Control?',
    optsJa: [
      '総重量が軽くなる方向の変更であるため、LMC連絡を省略してそのまま貨物室ドアを閉鎖する',
      '搭載位置と減量値を直ちにロードコントロールへ連絡し、LMC反映後のロードシートを確認する',
      '定時出発を最優先するため、この便の減量分は出発後に次便の記録と合算して事後報告する',
      '50kg未満の軽微な変更はトリムに影響しないため、作業責任者の判断だけで搭載記録を確定する'
    ],
    optsVi: [
      'Vì thay đổi làm tàu bay nhẹ đi nên bỏ qua báo LMC và đóng ngay cửa hầm hàng để khởi hành',
      'Báo ngay vị trí dỡ và mức giảm tải cho Load Control để cập nhật LMC và xác nhận Loadsheet',
      'Ưu tiên khởi hành đúng giờ trước rồi gộp báo cáo giảm tải sau khi tàu bay đã cất cánh xong',
      'Thay đổi dưới 50 kg không ảnh hưởng trim nên trưởng nhóm tác nghiệp (作業責任者) tự chốt tải'
    ],
    optsEn: [
      'Skip LMC notification and close the cargo hold door immediately because the aircraft is lighter',
      'Report offload position and weight reduction to Load Control and verify the updated Loadsheet',
      'Prioritize on-time departure first and submit the weight adjustment report after takeoff',
      'Finalize the load record at ramp level since changes under 50 kg do not affect takeoff trim'
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
      'LIRの総搭載重量の上限に収まっていると判断できる場合は、そのまま機内へ搭載しロックする',
      'タグ印字の誤りと判断し、LIR記載の重量欄をボールペンで書き直してから搭載作業を続行する',
      'LIRを修正せずに済ませるため、超過した800kg分の貨物を後部バルク室へ手作業で移し替える',
      '搭載を保留してロードコントロールへ実測重量を報告し、再計算後の新LIRの指示を待機する'
    ],
    optsVi: [
      'Vẫn đẩy thùng vào khóa chốt nếu ước lượng tổng tải toàn tàu chưa vượt giới hạn cho phép',
      'Coi là lỗi in thẻ ULD, tự dùng bút sửa trực tiếp con số trên LIR rồi tiếp tục xếp hàng',
      'Chuyển bớt 800 kg hàng hóa sang hầm Bulk phía sau để không phải yêu cầu phát hành LIR mới',
      'Tạm dừng xếp thùng đó, báo trọng lượng thực tế cho Load Control tính lại và chờ LIR mới'
    ],
    optsEn: [
      'Proceed with loading and latch the ULD if total aircraft payload still appears within limits',
      'Treat it as a tag printing error, correct the LIR figure with a pen, and continue loading',
      'Transfer 800 kg of cargo manually into the aft bulk hold to avoid requesting a revised LIR',
      'Hold loading the ULD, report the actual scale weight to Load Control, and await a new LIR'
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
      '床面構造の局所過荷重、ロール方向のバランス悪化、およびロック装置破損を招く',
      'コンテナ外側のバーコードが読み取りにくくなるだけで、機体構造への悪影響はない',
      '貨物室内の空調循環がわずかに低下するだけで、飛行性能や安定性への影響は生じない',
      '着陸時の接地荷重が片側へ寄ることで制動距離が短くなり、むしろ安全余裕が高まる'
    ],
    optsVi: [
      'Gây quá tải cục bộ mặt sàn, lệch cân bằng ngang (roll) và hỏng chốt khóa sàn',
      'Chỉ làm khó quét mã vạch bên ngoài thùng ULD, không ảnh hưởng kết cấu thân tàu',
      'Chỉ làm giảm nhẹ lưu thông khí hầm hàng, không tác động tới tính năng hay ổn định bay',
      'Tăng độ bám bánh càng chính khi hạ cánh giúp rút ngắn quãng đường phanh an toàn hơn'
    ],
    optsEn: [
      'Localized floor overload, lateral roll imbalance, and restraint latch failure',
      'Difficulty scanning external ULD barcodes without affecting airframe structural limits',
      'Slightly reduced cargo-hold airflow efficiency with zero effect on flight stability',
      'Stronger main-gear tire grip during touchdown that shortens landing braking distance'
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
      '主翼の揚力が必要以上に増大し、巡航高度を維持できず上昇し続けてしまう現象',
      '機首が極端に重くなり、滑走中に前輪が上がらず規定速度で離陸できなくなる現象',
      '機首が上がりすぎて縦安定性が低下し、失速や回復困難なピッチアップを招く現象',
      '空気抵抗が減って燃費が改善する一方、離陸後の脚収納速度だけがわずかに遅れる現象'
    ],
    optsVi: [
      'Lực nâng cánh tăng quá mức khiến tàu bay không thể duy trì ổn định độ cao hành trình',
      'Mũi máy bay quá nặng khiến bánh mũi không thể nhấc lên đúng tốc độ chạy đà cất cánh',
      'Mũi ngóc quá mức, mất ổn định dọc, dễ thất tốc (stall) và khó cứu ngóc mũi',
      'Giảm lực cản giúp tiết kiệm dầu nhưng làm tốc độ thu càng hạ cánh chậm hơn bình thường'
    ],
    optsEn: [
      'Excessive wing lift that prevents the aircraft from leveling off at cruise altitude',
      'Severe nose-heavy attitude that prevents nose-wheel liftoff during takeoff rotation',
      'Severe nose-up pitch and low stability, risking stall and unrecoverable pitch-up',
      'Lower cruise drag and fuel burn accompanied only by slightly slower gear retraction'
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
      'パレットの荷姿を美しく整え、荷主やフォワーダーからの外観クレームを防止するため',
      'ハイリフトローダーの昇降速度と油圧負荷を一定に保ち、機械の摩耗を抑えるため',
      '機体の湾曲内壁や天井の煙探知機・消火設備との接触損傷を防ぐため',
      '輸出入の保安検査でX線装置を通す際の透過率を均一にし、再検査を減らすため'
    ],
    optsVi: [
      'Giúp kiện hàng trên pallet vuông vắn gọn gàng, tránh khiếu nại hình thức từ chủ hàng',
      'Giữ tải trọng thủy lực và tốc độ nâng của xe High-Lift Loader luôn ổn định khi làm việc',
      'Ngăn hàng chạm hỏng vách cong thân tàu, cảm biến khói và đầu phun chữa cháy trần hầm',
      'Đảm bảo tia X soi chiếu an ninh xuyên qua đồng đều để giảm tỷ lệ kiểm tra lại tại kho'
    ],
    optsEn: [
      'To keep pallet build-up tidy and avoid visual presentation complaints from shippers',
      'To keep hydraulic pressure steady and reduce mechanical wear on the High-Lift Loader',
      'To prevent contact damage to curved fuselage walls, smoke detectors, and fire lines',
      'To ensure uniform X-ray penetration during security screening and reduce re-checks'
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
      '角材や合板などの補強板（スプレッダー）を敷き、荷重を広い面積に分散させる',
      'パレット中央の1点へ正確に配置し、移動しないようロープのみで周囲を縛り付ける',
      '金属部品の底面保護として厚手の段ボールを1枚敷き、通常のネットを掛けて固定する',
      'パレットを使用せずバルク貨物室の床へ直接置き、仕切りネットを強く張って押さえる'
    ],
    optsVi: [
      'Kê thanh gỗ/ván phân tải (補強板 / Spreader) để trải đều tải ra diện tích rộng',
      'Đặt đúng một điểm giữa pallet rồi chỉ dùng dây thừng buộc chặt cố định quanh chân đế',
      'Lót một tấm bìa carton dày dưới đáy khối kim loại rồi phủ lưới tiêu chuẩn siết chặt',
      'Không dùng pallet mà đặt thẳng lên sàn hầm Bulk rồi kéo căng lưới ngăn để giữ cố định'
    ],
    optsEn: [
      'Place wooden spreader planks or shoring beneath the load to spread weight evenly',
      'Position the cargo at a single central point on the pallet and secure it only with rope',
      'Slide a thick sheet of cardboard beneath the metal base and tighten a standard cargo net',
      'Omit the pallet, place the piece directly on the bulk hold floor, and tension a bulk net'
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
      '空コンテナは重量が極めて軽いため、飛行中の移動リスクはなくロック確認を省略する',
      '貨物室ドアに最も近い手前1ポジションのロックが起立していれば奥も固定済とみなす',
      '到着空港での取卸し作業を迅速化するため、ドア閉鎖直前に全ロックを下げておく',
      '全搭載ポジションのフロアロック起立・施錠と、LIR記載位置との一致を確認する'
    ],
    optsVi: [
      'Container rỗng (EMPTY ULD) rất nhẹ nên không dịch chuyển khi bay và có thể bỏ khóa',
      'Chỉ cần kiểm tra chốt khóa vị trí sát cửa hầm dựng lên là đủ giữ các thùng phía trong',
      'Hạ toàn bộ chốt khóa sàn ngay trước khi đóng cửa để đầu sân bay đến dỡ hàng nhanh hơn',
      'Kiểm tra mọi chốt khóa sàn (フロアロック) đã dựng khóa chặt và đúng vị trí trên LIR'
    ],
    optsEn: [
      'Empty ULDs are light enough to remain stationary in flight, so floor locks may be skipped',
      'Verify only the outermost lock nearest the cargo door to confirm all inner ULDs are held',
      'Lower every cargo floor lock right before closing the door to speed up destination offload',
      'Confirm every occupied position has raised, latched floor locks matching the final LIR'
    ],
    ans: 3,
    expJa: '空コンテナであっても飛行中の気流や加速・減速で移動すれば機体破損やCG急変を招きます。すべての搭載ポジションのロック起立・施錠を「指差呼称」で確認するのが鉄則です。',
    expVi: 'Kể cả thùng rỗng, nếu không khóa chốt sẽ trượt va đập khi bay gây hỏng vách hoặc lệch CG đột ngột. Phải kiểm tra bằng chỉ tay hô xác nhận (指差呼称) toàn bộ chốt.',
    expEn: 'Even empty ULDs can shift during turbulence or acceleration if unlatched, damaging bulkheads or shifting CG. Point-and-call verification of every lock is mandatory.'
  },
  {
    id: 'T2Q008', topic: 'tg2_loadcontrol', level: 2,
    qJa: '到着機の取卸し時、「後部貨物室にまだ重い搭載物が残っている状態で前部貨物室だけを先に空にしない」など、LIRで取卸順序が厳しく指定される主な理由は？',
    qVi: 'Khi dỡ hàng tàu đến, tại sao LIR thường quy định chặt chẽ thứ tự dỡ hầm trước/hầm sau (ví dụ không dỡ hết khoang trước khi khoang sau còn nặng)?',
    qEn: 'Why does an offload LIR specify strict hold/position unloading sequences (such as not emptying the forward hold while the aft hold remains heavy)?',
    optsJa: [
      '前部と後部で作業員の移動距離を均等化し、連続便における身体的疲労を軽減するため',
      '駐機中の急激な重心移動による機体の尻もち（テイルティップ）事故を防ぐため',
      'ベルトローダーとハイリフトローダーが同一の地上電源ケーブルを共有しているため',
      '乗客の降機完了時刻と客室乗務員の退室時刻に合わせて両貨物室を同時完了するため'
    ],
    optsVi: [
      'Chia đều quãng đường di chuyển cho đội bốc xếp nhằm giảm mệt mỏi trong các ca liên tục',
      'Ngăn trọng tâm lệch đột ngột gây tai nạn chúi đuôi (テイルティップ) khi tàu đang đỗ',
      'Do xe Belt Loader và xe High-Lift Loader phải dùng chung một dây nguồn điện mặt đất',
      'Đồng bộ thời điểm dỡ xong hai hầm hàng khớp đúng với lúc tiếp viên rời khỏi khoang khách'
    ],
    optsEn: [
      'To balance walking distances between holds and reduce crew fatigue on consecutive flights',
      'To prevent sudden parked CG shift that could cause an aircraft tail-tipping accident',
      'Because the belt loader and high-lift loader share one ground power connection point',
      'To align completion of both cargo holds with cabin crew deplaning at the passenger door'
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
      'ZFWとTOWの差は乗客と受託手荷物の合計重量であり、燃料は含まれない',
      'MTOWが常に最も小さい制限値となり、ZFWはMTOWを上回っても運航できる',
      'MLWは着陸直前に確認する項目であり、出発前のロード管理では照合不要である',
      'ZFWはMZFW以下、燃料搭載後のTOWはMTOW以下、到着予定LWはMLW以下とする'
    ],
    optsVi: [
      'Hiệu số giữa TOW và ZFW chính là tổng khối lượng khách cùng hành lý, không gồm dầu',
      'MTOW luôn là ngưỡng giới hạn nhỏ nhất, còn ZFW được phép vượt quá giá trị MTOW',
      'MLW chỉ cần kiểm tra ngay trước khi hạ cánh nên không cần đối chiếu trước lúc khởi hành',
      'ZFW phải ≤ MZFW, TOW sau nạp dầu phải ≤ MTOW và trọng lượng hạ cánh LW phải ≤ MLW'
    ],
    optsEn: [
      'The difference between TOW and ZFW equals total passenger and baggage weight without fuel',
      'MTOW is always the lowest structural limit, and ZFW is allowed to exceed MTOW safely',
      'MLW applies only prior to touchdown and is not verified during pre-departure load planning',
      'ZFW must be ≤ MZFW, TOW (with fuel) must be ≤ MTOW, and estimated LW must be ≤ MLW'
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
      '隣接するポジションに重いコンテナを隙間なく密着させ、動かないようにして搭載する',
      '整備士とロードコントロールへ報告し、MEL規定に基づく搭載制限の指示を仰ぐ',
      '粘着テープと結束バンドで仮固定を行い、到着空港の整備担当へ口頭で引き継ぐ',
      '小型のAKHコンテナであればロックが1か所欠けても規定上はそのまま搭載できる'
    ],
    optsVi: [
      'Đẩy sát một thùng ULD nặng ở ô bên cạnh chèn chặt vào cho khỏi trượt rồi vẫn xếp tải',
      'Báo ngay Bảo dưỡng (整備士) và Load Control để áp dụng giới hạn tải theo MEL',
      'Buộc cố định tạm bằng băng keo cùng dây rút rồi nhắn miệng cho đầu đến sửa chữa',
      'Với container cỡ nhỏ AKH thì thiếu một chốt khóa vẫn nằm trong giới hạn cho phép'
    ],
    optsEn: [
      'Tightly wedge an adjacent heavy ULD against the container to block movement and proceed',
      'Notify Maintenance and Load Control immediately to apply MEL load restrictions',
      'Temporarily secure the latch with heavy tape and zip-ties and brief destination staff',
      'Proceed normally because one missing floor latch is acceptable for small AKH containers'
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
      '天井の消火ノズルや煙探知機との間に規定のクリアランス空間を確実に確保して積む',
      '「天地無用（This Way Up）」表示のある貨物は逆さまにせず指定の向きで積み付ける',
      '隙間をなくすため重いスーツケースを上に載せ、下の段ボールを押し潰しながら固定する',
      '積付完了後、バルクネットを所定のアンカーポイントへ漏れなく掛けて確実に張る'
    ],
    optsVi: [
      'Giữ đúng khoảng hở an toàn quy định (như ≥5 cm) dưới đầu phun chữa cháy và cảm biến khói',
      'Xếp đúng chiều mũi tên đối với mọi kiện hàng dán nhãn không lật ngược (天地無用)',
      'Đặt vali nặng lên trên cùng để đè ép chặt các thùng carton bên dưới khỏi xê dịch',
      'Mắc đầy đủ lưới ngăn hầm Bulk (バルクネット) vào toàn bộ điểm neo sau khi xếp xong'
    ],
    optsEn: [
      'Maintain mandatory clearance below ceiling fire nozzles and smoke detection sensors',
      'Keep packages marked "This Way Up" strictly upright in their indicated orientation',
      'Place heavy suitcases on top to compress and hold down lighter cardboard cartons',
      'Attach and tension the bulk restraint net firmly to every designated hold anchor'
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
      '乗客が搭乗しなかった場合、その乗客の預け手荷物を必ず機内から取り卸す',
      '出発時刻が迫っている場合は手荷物だけ先に搭載し、乗客は後続便へ振り替える',
      '国内線・国際線を問わず、PPBMの照合対象は手荷物が3個以上の乗客に限定される',
      'ロードシート上の総重量とバランスが合っていれば、未搭乗客の荷物は降ろさない'
    ],
    optsVi: [
      'Khi hành khách bỏ chuyến (No-Show), bắt buộc tìm và dỡ toàn bộ hành lý của khách xuống',
      'Khi sát giờ khởi hành thì cho hành lý bay trước rồi chuyển hành khách sang chuyến kế tiếp',
      'Quy trình đối chiếu PPBM chỉ áp dụng bắt buộc với hành khách gửi từ 3 kiện trở lên',
      'Miễn tổng trọng lượng và %MAC trên Loadsheet khớp thì không cần dỡ hành lý khách vắng'
    ],
    optsEn: [
      'Locate and offload all checked bags whenever a checked-in passenger fails to board',
      'Dispatch the checked bags on time and rebook the missing passenger onto the next flight',
      'Apply PPBM baggage reconciliation only to passengers checking three or more pieces',
      'Leave no-show passenger bags onboard as long as Loadsheet weight and trim remain valid'
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
      '機種・スポット・ETA・担当配置・特別貨物やDGR有無・天候や安全点',
      '翌月のシフト希望の提出締切日と、ランプ休憩室における清掃当番の割当表のみ',
      '当日の作業終了後に予定されている退社時刻と、チーム懇親会の集合場所のみ',
      '前日に発生した他社便の遅延理由と、各作業員の月間個人評価スコアの結果のみ'
    ],
    optsVi: [
      'Loại tàu bay, Spot, ETA, phân công vị trí, hàng đặc biệt/DGR và lưu ý thời tiết/an toàn',
      'Lịch nộp nguyện vọng chia ca tháng sau cùng danh sách phân công trực vệ sinh phòng nghỉ',
      'Giờ kết thúc ca làm việc dự kiến và các thủ tục chấm công cuối ngày của nhân viên',
      'Thống kê lý do chậm chuyến ngày hôm trước của các hãng khác mà không phân công vị trí mới'
    ],
    optsEn: [
      'Aircraft type, stand, ETA, role assignments, special/DGR loads, and weather/safety risks',
      'Next month’s shift request submission deadline and the ramp breakroom cleaning roster',
      'Planned end-of-shift sign-out times without reviewing the incoming stand or aircraft type',
      'Delay statistics from yesterday’s other flights without assigning current turnaround roles'
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
      '時間短縮のため車両後退時のガイドマン配置を省き、運転手単独で素早くバックさせる',
      '赤色ビーコン消灯前でもエンジン音が下がればGSEをERA赤線内へ入れ始める',
      'スーパーバイザーへ応援を要請し、優先工程へ配置しつつ安全監視と指差呼称を厳守する',
      '遅延回復を優先して出発前のFOD点検とフロアロック確認を次便まで見送る'
    ],
    optsVi: [
      'Bỏ bớt người xi-nhan (ガイドマン) để tài xế tự quan sát gương và lùi xe nhanh hơn',
      'Cho xe GSE tiến vào vạch đỏ ERA ngay khi tiếng động cơ giảm trước lúc đèn beacon tắt',
      'Báo Supervisor xin tăng cường, ưu tiên đường găng nhưng giữ nguyên mọi chốt an toàn',
      'Tạm bỏ qua vòng kiểm tra FOD và rà soát chốt khóa sàn để kịp đóng cửa đúng giờ bay'
    ],
    optsEn: [
      'Omit guideman spotting so experienced GSE drivers can reverse alone and save time',
      'Allow GSE to cross the red ERA line as engine noise drops before the beacon turns off',
      'Request backup, prioritize critical tasks, and keep all guidemen and safety checks',
      'Defer the pre-departure FOD walkaround and final floor-lock check to recover the schedule'
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
      'そのまま装着作業を最後まで行わせ、万一機体へ接触した段階で注意喚起を行う',
      '長音ホイッスルと停止合図で即停止させ、進入角を直させて理由を指導する',
      '運転席から無言で新人を引きずり下ろし、理由を説明せず責任者が代わって運転する',
      '危険な角度だが本人の実地経験になるため、声を掛けずに最後まで静かに見守り続ける'
    ],
    optsVi: [
      'Để nhân viên tự lái áp sát hết quãng đường rồi mới nhắc nhở nếu xảy ra quẹt vào vỏ tàu',
      'Thổi còi dài ra hiệu DỪNG ngay, cho chỉnh lại góc tiếp cận chuẩn và giải thích lý do',
      'Kéo nhân viên xuống khỏi ghế lái và tự mình vận hành thay mà không giải thích nguyên nhân',
      'Dù thấy góc lái nguy hiểm nhưng vẫn im lặng quan sát để nhân viên tự rút kinh nghiệm'
    ],
    optsEn: [
      'Allow them to finish the approach and correct their technique only if fuselage contact occurs',
      'Sound a long whistle and STOP signal immediately, reset the angle, and coach the reason',
      'Remove the trainee from the cab without explanation and finish docking the loader silently',
      'Stay silent during the risky approach so the new handler learns directly from experience'
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
      '専門略語を交えて早口で一斉に指示を出し、返事やうなずきがあれば理解済とみなす',
      '言葉での細かい説明は省き、ベテラン作業員の動きを黙って見て覚えるよう徹底させる',
      '全員が母国語版の100ページに及ぶ作業マニュアルを事前に暗記している前提で進める',
      '平易な言葉に指差し・動作を併用し、相手に要点を復唱（リードバック）させる'
    ],
    optsVi: [
      'Dùng nhiều từ viết tắt chuyên ngành nói thật nhanh, thấy nhân viên gật đầu là coi như hiểu',
      'Hạn chế giải thích bằng lời, yêu cầu nhân viên mới tự quan sát người cũ để bắt chước theo',
      'Mặc định mọi nhân viên đều đã thuộc lòng bộ sổ tay quy trình 100 trang trước khi nhận ca',
      'Dùng câu ngắn dễ hiểu kèm chỉ tay/ký hiệu và yêu cầu người nghe nhắc lại (リードバック)'
    ],
    optsEn: [
      'Give rapid orders using technical abbreviations and assume a nod confirms full understanding',
      'Avoid detailed verbal briefings and instruct new hires to copy veteran handlers silently',
      'Operate on the assumption that every crew member memorized the full 100-page SOP manual',
      'Use plain phrasing with gestures or pointing and require listeners to read back key points'
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
      '前番メンバーのシフト希望状況と、翌週以降の休暇取得予定リストの詳細な確認',
      '休憩室やロッカーの清掃状況および共用備品の在庫数に関する日常的な引き継ぎ',
      '遅延便・スポット変更・GSE故障・DGR残件・天候警報や制限の共有',
      'すでに定時で出発を完了し一切のトラブルがなかった通常便の作業時刻記録のみ'
    ],
    optsVi: [
      'Chi tiết nguyện vọng đổi ca và lịch đăng ký nghỉ phép tuần sau của nhân sự ca trước',
      'Tình hình vệ sinh phòng nghỉ, tủ đồ cá nhân và số lượng vật tư văn phòng còn trong kho',
      'Chuyến trễ/đổi Spot, xe GSE hỏng, DGR tồn đọng, cảnh báo thời tiết và hạn chế đường lăn',
      'Danh sách các chuyến bay bình thường đã khởi hành đúng giờ không phát sinh bất kỳ lỗi nào'
    ],
    optsEn: [
      'Detailed shift-swap preferences and upcoming vacation requests from outgoing team members',
      'Routine breakroom tidiness updates and current inventory counts of shared office supplies',
      'Delayed flights, stand swaps, faulty GSE, pending DGR, weather alerts, and runway limits',
      'Completion timestamps solely for routine on-time flights that departed without any issues'
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
      'ドライバーの運転席側ミラーから姿が確認でき、横方向へ十分な離隔を保てる位置',
      'ホイッスル音と明確な停止ハンドシグナルがドライバーへ確実に届く安全な待機圏内',
      '車両の進行ライン外側に立ち、機体胴体との残り距離を目視確認しやすい斜め前方',
      '後退する車両の後端と機体胴体または障害物に挟まれる死角・挟圧危険位置'
    ],
    optsVi: [
      'Vị trí lệch sang bên hông nằm rõ trong gương chiếu hậu phía ghế lái của tài xế',
      'Trong tầm nhìn trực diện và tầm nghe rõ còi cùng tín hiệu dừng khẩn cấp của tài xế',
      'Đứng bên ngoài quỹ đạo lùi xe để dễ quan sát khoảng cách an toàn với vỏ tàu bay',
      'Vùng điểm mù kẹp giữa đuôi xe đang lùi và thân tàu bay hoặc vật cản phía sau'
    ],
    optsEn: [
      'Offset to the driver’s mirror side with clear lateral separation from the vehicle body',
      'Inside the driver’s direct line of sight and clear hearing range for whistle stop signals',
      'Outside the reversing track at an angle where clearance to the fuselage is clearly visible',
      'In the pinch zone directly between the reversing vehicle rear and fuselage or obstacle'
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
      'ブレーキ効きや滑りを接触前に確認し、微速接近へ切り替えるため',
      'ハイリフトローダーのエンジン排気温度を安定させ、過熱警報を防ぐため',
      '降車して前後タイヤの空気圧とナット緩みをゲージで毎回測定し直すため',
      '車両搭載のセンサーを初期化し、空港エプロンの駐機タイマーを更新するため'
    ],
    optsVi: [
      'Kiểm tra chắc chắn phanh ăn (tránh mất phanh/trơn trượt) trước khi bò chậm áp sát tàu',
      'Giúp hệ thống xả và dầu thủy lực của xe High-Lift Loader hạ nhiệt ổn định trước khi nâng',
      'Xuống xe kiểm tra lại áp suất lốp và độ chặt của toàn bộ ốc bánh xe trước mỗi lần vào bãi',
      'Khởi động lại cảm biến khoảng cách và cập nhật bộ đếm thời gian đỗ xe trên sân đỗ'
    ],
    optsEn: [
      'To verify brake effectiveness and surface grip before switching to creep-speed docking',
      'To stabilize exhaust and hydraulic fluid temperatures before raising the loader deck',
      'To step out and re-measure tire pressure and lug nuts before every aircraft approach',
      'To reset onboard proximity sensors and update the apron stand-occupancy timer'
    ],
    ans: 0,
    expJa: '万一ブレーキ不良や路面凍結で止まれない場合でも、5m手前であれば機体へ激突する前に回避・停止できます。一旦完全停止→指差呼称→最微速で装着、が日本の基本手順です。',
    expVi: 'Nếu phanh gặp trục trặc hoặc mặt sân trơn, việc thử phanh ở cự ly 5 m giúp kịp xử lý trước khi đâm vào thân tàu bay. Dừng hẳn → 指差呼称 → bò chậm áp sát là chuẩn Nhật Bản.',
    expEn: 'Testing brakes at 5 m provides stopping margin if brakes fail or the apron is slick; full stop → Point-and-Call → creep speed is standard Japanese ramp SOP.'
  },
  {
    id: 'T2Q020', topic: 'tg2_leadership', level: 2,
    qJa: '到着した国際線便で、搭乗橋（PBB）を操作してL1ドアへ装着する際、作業責任者が事前確認を徹底すべき事項はどれか？',
    qVi: 'Khi vận hành ống lồng PBB (搭乗橋) nối vào cửa L1 của tàu bay vừa vào bãi, trưởng nhóm phải kiểm tra điều kiện tiên quyết nào?',
    qEn: 'Before docking a Passenger Boarding Bridge (PBB) onto aircraft door L1, what precondition must the supervisor ensure?',
    optsJa: [
      '時間短縮のため、機体が停止バーの5m手前を通過した時点でPBBを動かし始める',
      '赤斜線区域に人や車が無く、機体完全停止・ビーコン消灯・輪止め完了を確認する',
      '作業動線を短くするため、PBB下の赤斜線エリアへGPUカートを待機させておく',
      '乗客の降機を急ぐため、スライドがARMEDの状態でも外からドアを開放する'
    ],
    optsVi: [
      'Cho cầu PBB di chuyển ra đón khi tàu bay còn cách vạch dừng khoảng 5 m để tiết kiệm giờ',
      'Vùng gạch chéo đỏ PBB trống hẳn, tàu dừng hẳn, đèn beacon tắt và chèn bánh hoàn tất',
      'Đỗ tạm xe GPU ngay trong vùng gạch chéo đỏ dưới gầm PBB để rút ngắn khoảng cách kéo dây',
      'Mở cửa cabin từ bên ngoài ngay cả khi cầu trượt thoát hiểm vẫn đang ở chế độ ARMED'
    ],
    optsEn: [
      'Begin extending the PBB once the aircraft rolls within 5 m of the stop bar to save time',
      'Verify the red PBB zone is clear, aircraft stopped, beacon OFF, and wheel chocks set',
      'Stage the GPU cart inside the red-hatched PBB zone underneath to shorten cable runs',
      'Open the cabin door from outside even if the emergency evacuation slide remains ARMED'
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
      '再発を防ぐ見せしめとして全員の前で厳しく叱責し、評価減点や処分を言い渡す',
      '正直な報告を評価し、責めずに手順や環境の要因を共に分析して再発防止に活かす',
      '報告書作成の手間を省くため、軽微な事象であれば記録に残さず現場限りで済ませる',
      '作業員個人の注意力不足だけが原因と結論付け、手順や配置の見直しは行わない'
    ],
    optsVi: [
      'Phê bình gay gắt trước cả tổ và trừ điểm đánh giá để làm gương ngăn nhân viên mắc lỗi',
      'Ghi nhận sự trung thực, không quy chụp mà cùng phân tích nguyên nhân hệ thống để phòng ngừa',
      'Bỏ qua không lập biên bản với các sự cố nhẹ để giảm khối lượng giấy tờ báo cáo cho ca trực',
      'Kết luận hoàn toàn do cá nhân bất cẩn và giữ nguyên quy trình thao tác mà không cải tiến'
    ],
    optsEn: [
      'Reprimand the worker publicly and apply disciplinary penalties to deter future mistakes',
      'Welcome honest reports, avoid blame, and analyze systemic causes to prevent recurrence',
      'Omit minor near-misses from official logs so the shift avoids extra incident paperwork',
      'Attribute the issue solely to individual carelessness without reviewing SOPs or layout'
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
      '熱中症対策を優先し、真夏日だけは高視認性ベストとヘルメットを外して作業させる',
      '定時出発を守るため、作業中の水分補給休憩は省いて短時間で一気に終わらせる',
      '到着機がスポットへ進入しても、全員を空調の効いた車両内へ待機させ続ける',
      'WBGTを確認し、定期的な水分・塩分休憩と日陰待機、体調相互確認を行う'
    ],
    optsVi: [
      'Cho phép tháo mũ bảo hộ và áo phản quang vào những ngày nắng đỉnh điểm để giảm nhiệt',
      'Hạn chế nghỉ uống nước giữa chừng để hoàn thành turnaround liền mạch đúng kế hoạch bay',
      'Giữ toàn bộ nhân sự ngồi trong xe bật điều hòa và ngừng ra bãi kể cả khi tàu vào Spot',
      'Theo dõi WBGT, bố trí nghỉ uống nước/bù muối trong bóng râm và kiểm tra sức khỏe nhau'
    ],
    optsEn: [
      'Permit staff to remove high-vis vests and helmets during extreme summer heatwaves',
      'Skip hydration breaks during turnarounds so handlers finish faster and stay on schedule',
      'Keep the entire handling team seated inside air-conditioned vehicles even during arrivals',
      'Track WBGT levels, schedule shaded hydration/salt breaks, and run buddy health checks'
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
      '底辺の300件のマイナー・エラーや29件のヒヤリハットを集め、根本原因を先手で潰すこと',
      '重大事故（1件）が発生した段階で初めて専門の調査委員会を立ち上げること',
      'ヒヤリハット（29件）は統計から除外し、部署の安全達成率を高く維持すること',
      '書面での報告手続きを廃止し、ベテラン作業員の口頭指導と勘のみに委ねること'
    ],
    optsVi: [
      'Thu thập 300 lỗi nhỏ (マイナー・エラー) và 29 sự cố suýt xảy ra (ヒヤリハット) ở đáy tháp, xử lý tận gốc từ sớm',
      'Chờ khi tai nạn nghiêm trọng (1 vụ) xảy ra rồi mới thành lập hội đồng điều tra chuyên trách',
      'Loại 29 vụ suýt xảy ra (ヒヤリハット) khỏi bảng thống kê để giữ tỷ lệ chỉ số an toàn đạt mức cao',
      'Bỏ quy trình ghi chép báo cáo sự cố, chỉ dựa vào kinh nghiệm và nhắc nhở miệng của người cũ'
    ],
    optsEn: [
      'Collect the 300 minor errors and 29 near-miss incidents at the base and remove root causes early',
      'Wait until 1 major accident occurs before convening a formal safety investigation board',
      'Exclude the 29 near-miss incidents from metrics to keep departmental safety scores high',
      'Eliminate written hazard reports and rely purely on veteran intuition and verbal advice'
    ],
    ans: 0,
    expJa: '教材ではアクシデント1件の背後に、インシデント（ヒヤリハット）29件とマイナー・エラー300件があるとしています。目立たないマイナー・エラーやヒヤリハットにこそ光を当てて対策することが、重大事故を防ぐ最も確実な方法です。',
    expVi: 'Theo giáo trình, đằng sau 1 tai nạn (アクシデント) có 29 sự cố suýt xảy ra (インシデント/ヒヤリハット) và 300 lỗi nhỏ (マイナー・エラー). Tập trung xử lý các lỗi nhỏ và ヒヤリハット là cách chắc chắn nhất để ngăn tai nạn lớn.',
    expEn: 'Per the textbook, behind 1 accident lie 29 incidents (near-misses) and 300 minor errors. Focusing on these frequent minor errors and near-misses is the surest way to prevent serious accidents.'
  },
  {
    id: 'T2Q024', topic: 'tg2_safety_sms', level: 2,
    qJa: 'GSE車両のドアやコンテナドーリーの一部が駐機中の航空機外板（胴体）に軽く接触した。「傷がほとんど見えない」場合でも取るべき唯一の正しい行動は？',
    qVi: 'Một phần xe GSE hoặc dolly vừa quẹt nhẹ vào vỏ thân máy bay đang đỗ. Dù nhìn bằng mắt thường "gần như không thấy vết xước", hành động đúng duy nhất là gì?',
    qEn: 'A GSE vehicle or dolly lightly brushes against a parked aircraft’s fuselage skin. Even if "no dent or scratch is clearly visible," what is the ONLY correct action?',
    optsJa: [
      '他車の通行を妨げないよう、まず接触した車両を別スポットへ移動してから報告する',
      '塗装の擦れ程度であれば布で綺麗に拭き取り、遅延を防ぐためそのまま出発させる',
      '車両を動かさず現場を保存し、直ちに整備士・スーパーバイザー・空港運用へ連絡する',
      '乗客の搭乗開始前かつ肉眼で凹みが見えない場合は、事後報告も一切不要とする'
    ],
    optsVi: [
      'Lái xe GSE sang bãi đỗ khác tránh cản trở giao thông rồi mới gọi điện báo cáo sự việc',
      'Lau sạch vết xước mờ bằng khăn mềm và giữ im lặng cho tàu bay cất cánh đúng giờ quy định',
      'Giữ nguyên hiện trường không di chuyển xe, báo ngay Bảo dưỡng (整備士), Supervisor và COC',
      'Miễn hành khách chưa lên tàu và mắt thường không thấy móp sâu thì không cần báo cáo'
    ],
    optsEn: [
      'Drive the GSE to another stand so traffic stays clear before calling in the contact',
      'Wipe away the faint scuff mark with a cloth and release the flight to avoid a delay',
      'Freeze the scene without moving the GSE and immediately alert Maintenance, Supervisor, and Ops',
      'Skip reporting whenever passengers have not boarded and no deep dent is visible by eye'
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
      '到着前後のFOD点検を徹底し、飛散しやすいビニールやタグを即FOD箱へ回収する',
      '滑走路や誘導路の清掃を空港会社へ任せ、スポット内の小片やボルトは後回しにする',
      'エンジンがアイドリング状態であれば小さな袋や紙を吸い込んでも損傷しないため放置する',
      'FOD回収は夜間点検専門班の業務とし、日中のターンアラウンド中は実施を省略する'
    ],
    optsVi: [
      'Kiểm tra FOD trước/sau chuyến và thu gom ngay nilon, thẻ rời dễ bay vào thùng FOD',
      'Giao việc quét FOD cho đơn vị đường băng, bỏ qua ốc vít và mảnh nhựa nhỏ trong bãi đỗ',
      'Khi động cơ nổ garanty (idle) thì túi nilon nhỏ bị hút vào không gây hư hại cánh quạt',
      'Giao toàn bộ việc nhặt FOD cho đội kiểm tra ban đêm, ca ban ngày bỏ qua để kịp chuyến'
    ],
    optsEn: [
      'Run pre/post-flight FOD walks and immediately secure plastic wraps and tags in FOD bins',
      'Leave apron bolts and plastic scraps alone since airport authority sweeps active runways',
      'Ignore light plastic or paper near stands because idle engines cannot be damaged by them',
      'Treat FOD collection strictly as a night-shift inspection duty rather than daytime ramp work'
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
      'ピット蓋が開いていても中に整備員がいなければ、そのままタイヤで跨いで通過してよい',
      '金属製のピット蓋は高強度なため、ハイリフト車のアウトリガーを真上に降ろすと安定する',
      'ハイドラントピットの上は、給油作業が行われていない時間帯であればGSEの駐車枠として使える',
      'ピット蓋上への駐停車やアウトリガー設置を禁じ、緊急遮断弁のアクセスを確保する'
    ],
    optsVi: [
      'Kể cả khi nắp hố đang mở, nếu không thấy kỹ thuật viên bên trong thì cứ lái xe băng qua',
      'Nắp hố thép chịu lực cao nên hạ chân chống xe High-Lift đè thẳng lên nắp sẽ vững chắc hơn',
      'Nắp hố Hydrant có thể dùng làm chỗ đỗ xe GSE trong lúc không có hoạt động tra dầu',
      'Cấm đỗ xe hay đặt chân chống lên nắp hố ngầm để tránh sập nắp và giữ lối van ngắt khẩn'
    ],
    optsEn: [
      'Drive straight over open utility pit covers whenever no technician is working inside',
      'Lower hydraulic loader outriggers directly onto steel pit covers for firmer ground support',
      'Hydrant pits may be used as GSE parking whenever no fueling is in progress',
      'Never park or set outriggers on pit covers to avoid damage and preserve shutoff access'
    ],
    ans: 3,
    expJa: 'ピットの上に駐停車すると蓋の破損やFODにつながり、緊急時の燃料遮断弁などの操作も妨げます。羽田の制限区域規程では、ピット周囲を駐車禁止区域（NPA）として色分け表示しています（白＝ハイドラント、青＝エアコン、赤＝電力・給油アースリング等、黄＝避雷アースリング）。',
    expVi: 'Đỗ xe đè lên nắp hố ngầm có thể làm hỏng nắp, tạo FOD và cản trở thao tác van ngắt nhiên liệu khẩn cấp. Theo quy định khu hạn chế sân bay Haneda, quanh các hố được kẻ vùng cấm đỗ (NPA) theo màu: trắng = Hydrant, xanh dương = điều hòa, đỏ = điện / dây tiếp đất tra dầu, vàng = tiếp đất chống sét.',
    expEn: 'Parking over a pit can break the cover, create FOD and block emergency fuel shutoff access. Under the Haneda restricted-area rules, pits are surrounded by colour-coded No Parking Areas (NPA): white = hydrant, blue = air-conditioning, red = power / fueling earth ring, yellow = lightning earth ring.'
  },
  {
    id: 'T2Q028', topic: 'tg2_safety_sms', level: 2,
    qJa: '再発防止策（Corrective Action）を立案する際、作業責任者として「再発防止効果が最も高い」対策の考え方はどれか？',
    qVi: 'Khi lập biện pháp phòng ngừa tái diễn (再発防止策) sau một sự cố thao tác, cách tiếp cận nào mang lại hiệu quả bền vững cao nhất?',
    qEn: 'When designing corrective actions after a ramp incident, which approach provides the most reliable long-term prevention?',
    optsJa: [
      '当事者に「今後は一層注意する」と記した反省文を提出させて対策を完了とする',
      'ガイド設置・チェックリスト改訂・動線分離・相互確認など仕組み側を改善する',
      '手順や設備は一切変えず、ミスを起こした作業員を別部署へ異動させて終結とする',
      '原因分析を行わず、空港構内すべての車両制限速度を一律で極端に引き下げる'
    ],
    optsVi: [
      'Yêu cầu nhân viên viết bản kiểm điểm cam kết "lần sau sẽ chú ý hơn" rồi kết thúc hồ sơ',
      'Cải tiến hệ thống như vạch dẫn, sửa checklist, tách luồng xe và thiết lập kiểm tra chéo',
      'Giữ nguyên quy trình cũ và điều chuyển nhân viên mắc lỗi sang bộ phận khác để tránh lặp lại',
      'Không phân tích nguyên nhân gốc mà giảm đồng loạt toàn bộ tốc độ xe sân đỗ xuống cực thấp'
    ],
    optsEn: [
      'Require the handler to sign a written pledge promising greater personal care next time',
      'Improve systemic barriers via physical guides, updated checklists, lane splits, and cross-checks',
      'Transfer the individual to another department while leaving existing procedures unchanged',
      'Skip root-cause analysis and impose an arbitrary crawl speed limit across the entire airport'
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
      '乗客が機内に搭乗している状態での給油作業は、条件を問わず法令で全面禁止されている',
      '作業効率を上げるため、給油中の主翼下でバッテリー交換や電気工具作業を同時進行する',
      'メーター類を正面から監視しやすいよう、サービサーは機体胴体へ向けて頭から駐車する',
      'ボンディング接続、風上側への消火器配置、および車頭外向きの退避路を確保する'
    ],
    optsVi: [
      'Pháp luật cấm tuyệt đối việc tra dầu khi đang có hành khách ở trên tàu bay trong mọi trường hợp',
      'Kết hợp thay ắc quy hoặc dùng thiết bị điện dưới cùng bên cánh đang tra dầu để tiết kiệm giờ',
      'Đỗ xe Hydrant hướng đầu thẳng vào thân tàu bay để thuận tiện quan sát đồng hồ áp suất',
      'Kẹp dây tiếp địa (ボンディング), đặt bình chữa cháy đầu gió và đỗ xe quay đầu ra lối thoát'
    ],
    optsEn: [
      'Refueling with passengers onboard is strictly prohibited by law under every circumstance',
      'Conduct battery swaps or electrical tool work under the fueling wing to save turnaround time',
      'Park the hydrant servicer nose-in facing the fuselage so gauges remain directly in view',
      'Verify bonding cable, place extinguisher upwind, and park nose-out with clear escape path'
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
      '盗難や紛失を防止するため、消火器が荷台奥の箱へ南京錠で施錠固定されていること',
      '消火器の圧力緑範囲・ピン・期限が正常で、非常停止が固着なく作動すること',
      '軽量で持ち運びやすいよう、消火器の圧力ゲージ針がゼロ付近を指していること',
      '誤操作による作業中断を防ぐため、非常停止ボタンのカバーがテープで封印されていること'
    ],
    optsVi: [
      'Bình chữa cháy được khóa móc chặt trong hộp kín ở thùng xe để tránh bị thất lạc khi chạy',
      'Kim áp suất nằm vạch xanh, còn chốt/hạn dùng và nút Emergency Stop hoạt động không kẹt',
      'Kim đồng hồ áp suất chỉ gần vạch số 0 để bình có trọng lượng nhẹ giúp nhân viên dễ nhấc',
      'Nút dừng khẩn cấp được dán băng keo cố định nắp che để tránh nhân viên vô tình bấm nhầm'
    ],
    optsEn: [
      'Fire extinguishers are padlocked inside rear storage boxes so they cannot be misplaced',
      'Extinguisher gauge is green with valid seal/pin and the emergency stop works without sticking',
      'The extinguisher pressure needle sits near zero so the cylinder remains light to carry',
      'Emergency stop covers are taped shut to prevent staff from triggering accidental halts'
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
      '滑り止め付きの安全靴を着用していれば、高さ5m未満では墜落防止措置が免除される',
      'ドア付近の作業時間が5分以内の短時間であれば、手すり設置や安全帯着用は不要である',
      '規定の手すり等を備えた作業床を確保し、無い場合はフルハーネス等を確実に使用させる',
      '高所での滞留時間を減らすため、昇降プラットフォーム上では常に駆け足で移動させる'
    ],
    optsVi: [
      'Chỉ cần mang giày bảo hộ chống trượt là được miễn biện pháp chống ngã dưới độ cao 5 m',
      'Nếu thao tác trên sàn nâng kéo dài dưới 5 phút thì không cần dựng lan can hay đeo dây đai',
      'Đảm bảo sàn có lan can đạt chuẩn; nếu thiếu lan can bắt buộc đeo dây đai toàn thân (フルハーネス)',
      'Yêu cầu di chuyển thật nhanh trên mặt sàn nâng để rút ngắn thời gian đứng ở vị trí cao'
    ],
    optsEn: [
      'Slip-resistant safety boots exempt handlers from fall protection up to 5 meters high',
      'Guardrails and harnesses are not required whenever elevated door tasks last under 5 minutes',
      'Ensure compliant guardrails are raised, or require certified fall-arrest harnesses if absent',
      'Have workers jog across elevated loader platforms to minimize time spent at working height'
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
      '接近機があれば停止線で待機し、通過後は後方100m以上（約2スポット分）離れてから横断させる',
      'エンジン後方から10m以上離れていればブラストは届かないため、素早く横断させてよい',
      'ライトバンや積載済みドーリーは重量があるため、エンジン真後ろでもそのまま通過できる',
      '地上監視員が赤色停止合図を出していても、前方が空いていれば運転手判断で駆け抜ける'
    ],
    optsVi: [
      'Nếu có tàu bay đang tới thì dừng chờ ở vạch dừng; sau khi tàu qua, chỉ băng qua khi đã cách đuôi ≥100 m (khoảng 2 bãi đỗ)',
      'Chỉ cần cách đuôi tàu từ 10 m trở ra là hết gió phản lực nên có thể cho xe chạy vọt qua',
      'Xe tải nhẹ hoặc đoàn dolly đang chở hàng đủ nặng để chạy cắt ngay sau ống xả động cơ',
      'Dù giám sát viên đang phất cờ đỏ chặn lại, tài xế vẫn được tự ý chạy qua nếu thấy làn trống'
    ],
    optsEn: [
      'Hold at the stop line for approaching aircraft; after it passes, cross only once it is 100 m+ away (about 2 stands)',
      'Allow rapid crossing once 10 meters behind the tail because jet blast fades quickly past it',
      'Permit light vans and loaded dollies to cross directly behind running exhaust due to weight',
      'Override a spotter’s red stop flag whenever the driver judges the service lane looks clear'
    ],
    ans: 0,
    expJa: '航空機直後の横断はジェットブラストで車両ごと吹き飛ばされる危険があります。接近機の前方は横断せず停止線で待機し、通過後は後方100m以上（約2スポット分）の離隔を取ってから横断します（NGO教材2 J03-6／SSW2テキスト10-3：地上走行中の航空機後方100m以内は走行禁止）。',
    expVi: 'Băng qua ngay sau đuôi tàu bay có thể bị luồng phản lực (ジェットブラスト) thổi bay cả xe. Không cắt ngang phía trước tàu đang tới, dừng chờ ở vạch dừng, và chỉ băng qua khi tàu đã cách ≥100 m (khoảng 2 bãi đỗ) (Giáo trình NGO 2 J03-6 / SSW2 10-3: cấm chạy trong phạm vi 100 m phía sau tàu bay đang lăn).',
    expEn: 'Crossing right behind an aircraft risks being blown over by jet blast. Never cross in front of an approaching aircraft; wait at the stop line, then cross only after it is at least 100 m (about 2 stands) away (NGO Text 2 J03-6; SSW2 text 10-3: no driving within 100 m behind a taxiing aircraft).'
  },
  {
    id: 'T2Q033', topic: 'tg2_irregular', level: 2,
    qJa: '悪天候や機材故障によりダイバート（目的地外着陸）してきた臨時便を自空港で受け入れる際、ランプ作業責任者が最初に行うべき確認は？',
    qVi: 'Khi tiếp nhận một chuyến bay hạ cánh chuyển hướng đột xuất (ダイバート / Divert) do thời tiết xấu hoặc sự cố kỹ thuật, trưởng nhóm mặt đất phải kiểm tra gì đầu tiên?',
    qEn: 'When receiving an unscheduled diverted flight (ダイバート) due to weather or technical issues, what should the ramp supervisor verify first?',
    optsJa: [
      '機種・スポット・受入理由（急病/AOG/降機有無）を確認し適合GSEと人員を手配する',
      '当初の運航計画に含まれていない臨時便のため、地上支援の受入自体を原則として断る',
      '遅延を最小限に抑えるため、スポット寸法やFOD点検を省いて直ちに機体を誘導する',
      '到着して駐機した直後に許可を待たず客室ドアを開け、乗客を徒歩で降機開始させる'
    ],
    optsVi: [
      'Xác nhận loại tàu, Spot, lý do divert (y tế/AOG/xuống khách) để điều đúng GSE và nhân lực',
      'Từ chối cung cấp dịch vụ mặt đất vì đây là chuyến bay ngoài lịch trình phân công ban đầu',
      'Bỏ qua bước rà soát kích thước bãi đỗ và kiểm tra FOD để dẫn tàu vào bãi nhanh nhất có thể',
      'Mở cửa cabin ngay khi tàu vừa dừng mà chưa có lệnh, để hành khách tự đi bộ xuống sân đỗ'
    ],
    optsEn: [
      'Verify aircraft type, stand, and divert reason (medical/AOG) to dispatch proper GSE and crew',
      'Decline ground handling support because the unscheduled flight was not on the daily roster',
      'Skip pre-arrival stand compatibility and FOD checks to marshal the diverted jet in faster',
      'Open cabin doors immediately upon parking and let passengers walk across the apron unescorted'
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
      '代替便の手配が確定するまで故障機の貨物室ドアを開放し、地上電源を切って放置する',
      '出発遅延を抑えるためULD適合確認や新LIR発行を省き、旧LIRのまま代替機へ移す',
      '安全順序で全搭載物を取卸しし、代替機のULD適合と新LIRを確認した上で移載する',
      '乗客の預け手荷物だけは代替機へ載せ替えず、すべて陸上宅配便で後日配送とする'
    ],
    optsVi: [
      'Mở sẵn cửa hầm hàng tàu hỏng, ngắt nguồn điện mặt đất rồi tạm bỏ đó chờ ca sau xử lý',
      'Bỏ qua kiểm tra tương thích ULD và xin LIR mới, dùng luôn LIR cũ để chuyển nhanh sang tàu mới',
      'Dỡ tải đúng trình tự an toàn, kiểm tra tương thích ULD với tàu mới và xếp theo LIR mới',
      'Không chuyển hành lý ký gửi sang tàu thay thế mà tự ý tách ra gửi toàn bộ qua dịch vụ bưu điện'
    ],
    optsEn: [
      'Leave the AOG cargo doors open, disconnect ground power, and leave the load for the next shift',
      'Move ULDs quickly onto the swap jet using the original LIR without checking ULD compatibility',
      'Offload all loads in safe sequence, verify ULD fit for the swap jet, and reload per the new LIR',
      'Hold all checked baggage off the replacement aircraft and ship every piece later by ground courier'
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
      '手荷物1個のみであれば到着後に別便で追送できるため、確認せずプッシュバックを進める',
      '開始前なら即待機させ、ランプと仕分け場を捜索して搭載可否とLMC/PPBMを確定する',
      '出発遅延を防ぐためシステム上だけ「搭載済」と仮入力し、アラート表示を解除する',
      '先にトーイングカーで誘導路手前まで押し出し、路上で該当の手荷物だけ追加搭載する'
    ],
    optsVi: [
      'Thiếu một kiện có thể gửi bù chuyến sau nên cứ đẩy lùi khởi hành trước không cần xác minh',
      'Tạm dừng pushback ngay, tìm nhanh sân đỗ/khu chia hành lý để chốt vị trí và LMC/PPBM',
      'Tạm nhập thủ công trạng thái "đã xếp lên tàu" trên hệ thống để tắt cảnh báo kịp giờ bay',
      'Đẩy lùi tàu ra sát đường lăn trước rồi cho nhân viên mang kiện hành lý ra xếp bổ sung sau'
    ],
    optsEn: [
      'Proceed with pushback anyway and forward the single missing bag on a later flight unverified',
      'Hold pushback immediately, search ramp and make-up areas, and reconcile LMC and PPBM status',
      'Manually key the bag as loaded in the system to clear the departure alert and avoid delay',
      'Push the aircraft out to the taxilane first and load the missing bag afterward on the apron'
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
      '動物が外へ出ないよう、破損したケージの上から重い一般貨物を載せて強く押さえ込む',
      '驚いた動物を素早く確保するため、大声で呼びかけながら素手でケージの外へ取り出す',
      '動物が滑走路側へ走る可能性は低いため、状況確認を優先して貨物室ドアを全開にする',
      'ドアを開け広げず封じ込めを保ち、直ちに空港運用や専門部署へ連絡する'
    ],
    optsVi: [
      'Đặt thùng hàng nặng đè lên nóc lồng bị nứt để ép giữ con vật không chui được ra ngoài',
      'Gọi lớn cho con vật bình tĩnh lại rồi dùng tay trần lôi thẳng ra khỏi lồng để kiểm soát',
      'Mở toang cửa hầm hàng để quan sát rõ vì động vật hiếm khi chạy ra khu vực đường băng',
      'Không mở rộng cửa hầm để giữ khoanh vùng và báo ngay Điều hành cùng tổ chuyên trách'
    ],
    optsEn: [
      'Stack heavy general cargo directly on top of the damaged kennel to pin the lid closed',
      'Call out loudly to calm the startled animal and pull it out of the broken kennel by hand',
      'Open the cargo door fully for inspection since escaped animals rarely approach the runway',
      'Keep the hold closed to prevent runway incursion and alert Airport Ops and specialists'
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
      'プッシュバックを継続したまま携帯電話から航空会社の予約センターへ連絡して指示を仰ぐ',
      '誘導路中心線まで残りわずかなため、通信なしの目測だけで押し切ってトーバーを外す',
      '直ちに停止合図を出して移動を止め、標準ハンドシグナル等で安全確認後に再開判断する',
      'エンジン騒音で音声が途切れたと判断し、移動速度を上げて素早くスポット外へ押し出す'
    ],
    optsVi: [
      'Tiếp tục đẩy lùi đồng thời dùng điện thoại cá nhân gọi tổng đài hãng bay để hỏi hướng xử lý',
      'Do gần tới vạch đường lăn nên tự ước lượng đẩy nốt quãng ngắn còn lại rồi tháo thanh kéo',
      'Ra hiệu DỪNG đẩy lùi ngay lập tức, chuyển sang tín hiệu tay chuẩn hoặc khôi phục liên lạc',
      'Cho rằng chỉ bị át tiếng động cơ nên tăng tốc đẩy nhanh ra khỏi bãi để sớm kết thúc thao tác'
    ],
    optsEn: [
      'Keep pushing back while dialing the airline customer hotline on a mobile phone for guidance',
      'Finish the last few meters to the taxiway centerline by guesswork and disconnect the towbar',
      'Signal an immediate STOP to the tug, switch to standard hand signals, and verify before moving',
      'Assume engine noise drowned out the audio and speed up pushback to clear the stand faster'
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
      '湿式バッテリー搭載車でも貨物室の空間節約のため横倒しにして確実に固定搭載する',
      'タイヤの空気圧とブレーキロックが正常であれば、バッテリー種別の確認は省略できる',
      'リチウムイオン電池は客室持込不可のため、容量を問わず外さずに貨物室へ搭載する',
      'バッテリー種別・Wh容量、端子絶縁と電源OFF、およびNOTOC記載要否を確認する'
    ],
    optsVi: [
      'Xe dùng ắc quy nước (wet-cell) vẫn có thể đặt nằm ngang để tiết kiệm diện tích hầm hàng',
      'Miễn áp suất lốp và khóa phanh xe lăn hoạt động tốt thì không cần kiểm tra chủng loại pin',
      'Pin lithium không được xách tay nên cứ để nguyên mọi mức dung lượng Wh xếp xuống hầm hàng',
      'Kiểm tra loại pin/Wh, cách điện cực chống chập, tắt nguồn hẳn và đối chiếu yêu cầu NOTOC'
    ],
    optsEn: [
      'Lay spillable wet-cell wheelchairs sideways in the hold to save space and secure with nets',
      'Skip battery chemistry checks whenever tire pressure and wheel locks are in good condition',
      'Load lithium-powered wheelchairs of unlimited Wh in the hold since batteries are banned in cabin',
      'Verify battery type and Wh rating, terminal insulation, main power OFF, and NOTOC requirement'
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
      '消防・医療・空港運用の安全宣言が出るまで、人員とGSEを待機線外へ留め置く',
      '到着点検を少しでも早く始めるため、緊急着陸中の滑走路脇までGSE車両で並走する',
      '消防車が消火剤を放水している脇を低速ですり抜け、直ちにベルトローダーを装着する',
      '事後の社内報告資料に使うため、誘導路付近へ全員を集めて着陸の様子を撮影させる'
    ],
    optsVi: [
      'Giữ toàn bộ nhân sự và xe GSE ngoài vạch chờ cho tới khi Cứu hỏa (ARFF) và COC cho phép',
      'Lái xe GSE chạy dọc mép đường băng bám theo tàu hạ cánh khẩn để tiếp cận nhanh hơn',
      'Lách chậm qua cạnh xe cứu hỏa đang phun bọt để gắn ngay xe băng chuyền hành lý vào cửa hầm',
      'Tập trung cả đội ra sát mép đường lăn quay video hiện trường làm tư liệu báo cáo nội bộ'
    ],
    optsEn: [
      'Hold crew and GSE outside the safe line until ARFF Fire, Medical, and Ops grant clearance',
      'Follow the emergency arrival along the runway shoulder in GSE to begin ground checks earlier',
      'Drive slowly past fire trucks spraying foam so the belt loader can dock without extra delay',
      'Gather the ramp team near the taxiway shoulder to record arrival video for internal reports'
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
      '仕分け遅延を抑えるため、行先タグの照合を省いて全手荷物を同一便のドーリーへ積む',
      '出発間近便や短時間乗継便と優先手荷物へ人員を集中し、タグ照合ミスを徹底防止する',
      '誤仕分け防止を最優先し、BHSが完全復旧するまで数時間すべての仕分け作業を止める',
      '行先コードが判別しにくい手荷物は一時的に制限区域外の一般エリアへ移動して保管する'
    ],
    optsVi: [
      'Bỏ qua bước đọc mã thẻ đích để tránh ùn tắc và gom chung hết lên một đoàn dolly duy nhất',
      'Ưu tiên nhân lực cho chuyến sắp bay, nối chuyến gấp (Hot Transfer) và kiểm chặt mã thẻ',
      'Dừng hoàn toàn việc phân loại trong nhiều giờ chờ hệ thống BHS sửa xong để tránh nhầm lẫn',
      'Chuyển tạm các kiện khó đọc mã chuyến ra bên ngoài khu vực hạn chế để giải phóng mặt bằng'
    ],
    optsEn: [
      'Skip reading destination tags to clear congestion and stack all bags onto one dolly train',
      'Prioritize imminent departures and hot transfers while enforcing strict tag cross-checks',
      'Halt all baggage sorting for several hours until BHS engineers complete full system repairs',
      'Move bags with hard-to-read flight codes outside the airside security area for temporary storage'
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
      '荷物の引き渡し遅延を防ぐため、中身がはみ出していてもそのまま到着ベルトへ投入する',
      '損傷記録を取り必要に応じ袋等で保護した上、旅客係員と税関手順に沿って引き継ぐ',
      '内容物の散逸を防ぐため、作業員が個人の予備バッグへ無断で中身を移し替えて運ぶ',
      '所有者が名乗り出るまで、破損した手荷物はそのままエプロンの端へ仮置きしておく'
    ],
    optsVi: [
      'Bỏ qua phần đồ bị bung rách và đặt thẳng lên băng chuyền trả khách để tránh chậm trễ',
      'Lập biên bản hư hỏng (Damage Report), bọc bảo vệ và bàn giao Baggage Service đúng quy trình',
      'Tự ý lấy túi dự phòng cá nhân của nhân viên nhét toàn bộ đồ bên trong sang rồi chuyển đi',
      'Đặt tạm kiện hành lý bị rách ở góc sân đỗ chờ đến khi hành khách tự liên hệ tìm kiếm'
    ],
    optsEn: [
      'Place the torn bag straight onto the claim belt despite exposed items to avoid claim delays',
      'Log a Damage Report, bag contents safely, and hand over to Baggage Services per rules',
      'Transfer the passenger’s spilled belongings into a handler’s spare personal bag for delivery',
      'Set the damaged suitcase aside in an apron corner until the passenger reports it missing'
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
      '待機時間を短縮するため、パーキングブレーキを解除したままエンジンを先に高出力にする',
      '到着機より先に誘導路へ抜けられると判断し、管制の待機指示を無視して素早く押し出す',
      '他機を一旦停止させるため、ヘッドセットマンを誘導路中央へ出して手で合図を送らせる',
      '管制指示に従い待機し、他機通過とクリアランス確認後に再承認を得て開始する'
    ],
    optsVi: [
      'Nhả sẵn phanh đỗ và tăng lực đẩy động cơ tại chỗ để rút ngắn thời gian chờ trên bãi',
      'Thấy còn đủ khoảng trống vượt trước nên bỏ qua lệnh chờ của ATC và đẩy lùi thật nhanh',
      'Cho nhân viên Headset Man chạy ra giữa đường lăn giơ tay ra hiệu chặn tàu bay đang tới',
      'Giữ tàu đứng chờ (Hold) theo ATC, đợi tàu kia qua hẳn an toàn và có lệnh mới rồi mới đẩy'
    ],
    optsEn: [
      'Release parking brakes and spool engines to high thrust while waiting to cut departure delay',
      'Disregard the Ground hold and push back quickly whenever you think you can clear in front',
      'Send the headset operator onto the active taxilane to wave the arriving aircraft to a stop',
      'Hold pushback per ATC, verify the passing jet clears safely, and await renewed clearance'
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
      '離陸前に主翼・尾翼・操縦翼面の霜・氷・雪を完全に除去した状態にすること',
      '主翼先端だけ除去すれば、付け根や尾翼の雪は離陸滑走の風圧で飛ぶため問題ない',
      '操縦室と客室の窓ガラスだけ完全に除氷すれば、主翼の薄い霜は飛行へ影響しない',
      '防除氷液の消費量を抑えるため、風上側となる片側の主翼だけ優先的に散布すること'
    ],
    optsVi: [
      'Làm sạch hoàn toàn sương giá, băng và tuyết trên cánh chính, đuôi và bề mặt điều khiển',
      'Chỉ cần làm sạch đầu cánh, tuyết đọng ở gốc cánh hoặc đuôi sẽ tự bay mất khi chạy đà',
      'Chỉ cần làm sạch kính buồng lái và cửa sổ khách, lớp băng mỏng trên cánh không ảnh hưởng',
      'Để tiết kiệm dung dịch chống băng, chỉ cần ưu tiên phun lên bên cánh hướng đón gió'
    ],
    optsEn: [
      'Remove all frost, ice, and snow from wings, tail, and control surfaces before takeoff',
      'Clear only the wingtips because snow near the root and tail blows away during takeoff roll',
      'De-ice cockpit and cabin windows only, as thin frost on wing skins does not degrade lift',
      'Conserve de-icing fluid by spraying only the upwind wing and horizontal stabilizer side'
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
      '氷点下の悪天候時に、屋外作業員が防寒休憩室へ連続して入ってよい最長待機時間',
      'デアイサー車のタンク内で防氷液が規定散布温度まで加熱されるのに要する準備時間',
      '防氷液の散布開始から、着氷性降水下で再付着を防げると見込まれる推定有効時間',
      '空港の除雪車編隊が滑走路と主要誘導路の除雪作業を完了するまでの標準所要時間'
    ],
    optsVi: [
      'Thời gian tối đa nhân viên sân đỗ được phép nghỉ sưởi ấm liên tục trong phòng kín mùa đông',
      'Thời gian cần thiết để làm nóng dung dịch chống băng trong bồn xe De-icer đạt nhiệt độ chuẩn',
      'Thời gian ước tính từ lúc phun mà dung dịch còn ngăn được băng tuyết bám lại bề mặt tàu',
      'Tổng thời gian dự kiến để đoàn xe cày tuyết dọn sạch toàn bộ đường băng và đường lăn chính'
    ],
    optsEn: [
      'Maximum indoor warming break allowed for ramp workers during sub-zero winter shifts',
      'Heating duration needed to bring anti-icing fluid in the truck tank up to spray temperature',
      'Estimated time from application start during which fluid prevents ice or snow re-accumulation',
      'Standard clearing duration required for airport snowplows to reopen the active runway'
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
      '垂直尾翼の上端および前縁付近における塗装された外板パネル表面の全域',
      '主翼上面のアルミ外板パネル全体とエルロン付近のフラップ格納部外側表面',
      'ピトー管等のセンサー類、エンジン・APU吸排気口、ブレーキ周辺、操縦室窓への直接噴射',
      '水平尾翼の上面パネル全体と胴体上部フェアリングの平滑な外板エリア全域'
    ],
    optsVi: [
      'Toàn bộ bề mặt sơn phía mép trước và đỉnh trên của cánh đuôi đứng tàu bay',
      'Toàn bộ mặt trên cánh chính bằng hợp kim và bề mặt ngoài khu vực cánh tà',
      'Cảm biến Pitot/AOA, bên trong cửa hút động cơ/APU, cụm phanh và phun thẳng kính buồng lái',
      'Toàn bộ bề mặt phẳng phía trên cánh đuôi ngang và phần sống lưng phía trên thân tàu bay'
    ],
    optsEn: [
      'The painted upper leading edge and exterior skin panels of the vertical stabilizer',
      'The main upper wing alloy skin panels and exterior surfaces above the flap track area',
      'Pitot/AOA sensors, engine/APU inlets, wheel brakes, and direct spray on cockpit windows',
      'The entire upper skin of the horizontal stabilizer and smooth upper fuselage fairing'
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
      '屋外作業を直ちに中断し、全作業員をターミナル内などの安全な避雷場所へ退避させる',
      '絶縁性のあるゴム底安全靴を着用していれば感電しないため、給油やヘッドセットを続ける',
      '地面からの地電流を避けるため、全員を金属製ハイリフトローダーの荷台上へ避難させる',
      'エプロンへの直撃確率は極めて低いため、定時出発を優先して通常より作業を急がせる'
    ],
    optsVi: [
      'Dừng ngay mọi việc ngoài trời (tra dầu, PBB, tai nghe dây) và sơ tán toàn bộ vào trong nhà',
      'Tiếp tục tra dầu và cắm tai nghe bình thường vì giày bảo hộ đế cao su đã cách điện hoàn toàn',
      'Cho toàn bộ nhân viên leo lên sàn xe nâng kim loại đứng để tránh dòng điện lan dưới mặt đất',
      'Tăng tốc thao tác cho kịp giờ khởi hành vì xác suất sét đánh trực tiếp xuống bãi đỗ rất thấp'
    ],
    optsEn: [
      'Suspend all outdoor ramp tasks immediately and evacuate crew to indoor lightning shelters',
      'Continue fueling and wired headset duties since rubber-soled boots insulate against strikes',
      'Move all handlers onto elevated metal high-loader decks to stay off the concrete apron',
      'Accelerate turnaround tasks to beat the storm since direct apron strikes are statistically rare'
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
      '強風警報の発令中でも階段車は自重があるため、輪止め設置や固定確認は省略してよい',
      '空コンテナが風で散乱しないよう、見通しの良い滑走路脇の路肩へ一列に並べておく',
      '風圧による転倒を防ぐため、ドーリーの車輪ブレーキをすべて解除して逃がせる状態にする',
      '空コンテナのロック・固縛、全GSEのブレーキと輪止め、風上側退避とアウトリガー張出を行う'
    ],
    optsVi: [
      'Kể cả khi có cảnh báo gió mạnh, xe thang có tự trọng lớn nên không cần chèn thêm bánh xe',
      'Xếp hàng dài các thùng ULD rỗng sát dọc mép đường băng cho gọn gàng và dễ quan sát từ xa',
      'Nhả toàn bộ phanh hãm bánh xe dolly để xe tự lăn theo chiều gió giúp giảm lực cản bị lật',
      'Chằng chặt ULD rỗng, gài khóa dolly, kéo phanh + chèn bánh mọi GSE và hạ chân chống an toàn'
    ],
    optsEn: [
      'Omit wheel chocks on passenger stairs during gusts because their steel frame is self-weighted',
      'Line up empty aluminum ULDs neatly along the active runway shoulder so they stay in view',
      'Release dolly parking brakes so empty carts can roll freely with wind gusts instead of tipping',
      'Lock/tie down empty ULDs, set GSE brakes and chocks, deploy outriggers, and clear windward zones'
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
      'タイヤが空転して立ち往生しないよう、凍結路面では時速40km以上で勢いよく走行する',
      '3急を厳禁し、通常より減速と車間拡大を行い5m手前のブレーキ確認を早めに実施する',
      '制動が効かず滑り出した場合は、機体の主脚タイヤへ軽く当てて確実に車体を停止させる',
      'ドーリー牽引時は急ブレーキを小刻みに連続で踏み、路面の氷を削りながら減速走行する'
    ],
    optsVi: [
      'Duy trì tốc độ trên 40 km/h trên mặt băng để tạo đà giúp bánh xe không bị trượt kẹt tại chỗ',
      'Cấm 3 thao tác gấp, giảm tốc sâu, giữ khoảng cách xa và thử phanh sớm trước cự ly 5 m',
      'Nếu xe trượt mất phanh thì cho mũi xe tì nhẹ vào lốp càng chính tàu bay để hãm dừng lại',
      'Khi kéo đoàn dolly thì đạp phanh gấp liên tục nhiều nhịp để bánh xe cào bớt lớp băng trên sân'
    ],
    optsEn: [
      'Drive above 40 km/h across icy lanes to keep momentum and prevent tires from getting stuck',
      'Ban abrupt inputs, slow down, widen following gaps, and test brakes early before the 5 m stop',
      'Steer gently into the aircraft main-gear tires as a backstop if the GSE begins to slide',
      'Pump brakes aggressively while towing dollies so locked tires scrape grooves into apron ice'
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
      '霧の中でライト光が乱反射して眩しくなるため、作業員の高視認性ベスト着用を外させる',
      '対向車やパイロットの幻惑を防ぐため、走行中のすべてのGSE車両のライトを消灯する',
      '見失いを防ぐため、待機車両を滑走路脇のILS保護区域内へ一列に集めて整列待機させる',
      '車両のヘッドライトと黄色回転灯を常時点灯し、横断確認の強化と不要移動の制限を行う'
    ],
    optsVi: [
      'Yêu cầu nhân viên cởi bỏ áo phản quang để tránh ánh đèn pha dội ngược gây chói mắt trong sương',
      'Tắt toàn bộ đèn pha và đèn xoay của xe GSE để không làm lóa mắt phi công khi tầm nhìn kém',
      'Tập kết toàn bộ xe dự phòng xếp hàng ngay trong khu vực bảo vệ ILS cạnh đường băng cho dễ tìm',
      'Bật liên tục đèn pha và đèn xoay vàng GSE, siết chặt kiểm tra khi qua làn và hạn chế xe dư thừa'
    ],
    optsEn: [
      'Have ramp crew remove high-visibility vests so reflective strips do not cause glare in fog',
      'Switch off all GSE headlights and beacons to prevent blinding taxiing pilots in heavy fog',
      'Stage standby GSE inside ILS critical areas alongside the runway so vehicles stay grouped',
      'Keep headlights and amber beacons ON, tighten crossing checks, and cut non-essential traffic'
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
      '防除氷車を担当したオペレーターの氏名・生年月日および社内資格番号の3点のみ',
      '使用液種、混合濃度、最終散布開始時刻（HOT起算点）、全面クリア確認',
      '作業開始前と終了後におけるデアイサー車の走行距離計と残液タンク容量の数値のみ',
      '散布した防氷液の単価、合計使用リットル数、および航空会社向け請求書番号のみ'
    ],
    optsVi: [
      'Chỉ báo họ tên, ngày sinh và mã số chứng chỉ vận hành của tài xế xe phun chống băng',
      'Loại dung dịch (Type I/II/IV), tỷ lệ pha, giờ bắt đầu phun bước cuối (HOT) và xác nhận sạch băng',
      'Chỉ báo chỉ số công-tơ-mét trước/sau khi phun và lượng dung dịch còn dư lại trong bồn xe',
      'Chỉ báo đơn giá hóa chất, tổng số lít đã tiêu thụ và mã hóa đơn thanh toán cho hãng bay'
    ],
    optsEn: [
      'Only the de-icing operator’s full name, date of birth, and company license number',
      'Fluid type, mix ratio, final-step start time (HOT), and post-spray clear check',
      'Only the de-icing truck’s odometer readings and remaining tank fluid volume after spraying',
      'Only the chemical unit price, total liters consumed, and airline billing invoice reference'
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
      'DGDの荷送人署名が抜けている場合でも、定時出発を守るため受託係員が代筆して通す',
      '危険物ラベルが擦れて不鮮明な場合は、係員が油性ペンで枠や記号を書き足して受託する',
      'その場で受託を拒否し、荷送人側で不備を是正し再点検を通るまで絶対に搭載しない',
      '包装等級（PG）の記載誤りは軽微な書類不備とみなし、到着地で修正する前提で搭載する'
    ],
    optsVi: [
      'Nếu tờ khai DGD thiếu chữ ký chủ hàng thì nhân viên ký thay để tránh chậm giờ bay',
      'Nếu nhãn nguy hiểm bị mờ chữ thì nhân viên tự dùng bút lông tô bổ sung rồi cho qua',
      'Từ chối tiếp nhận (REJECT) ngay và cấm xếp lên tàu cho đến khi chủ hàng khắc phục đạt chuẩn',
      'Coi sai sót nhóm đóng gói (PG) là lỗi giấy tờ nhỏ, vẫn cho bay rồi điều chỉnh ở đầu đến'
    ],
    optsEn: [
      'Sign a missing shipper signature on the DGD yourself so the shipment makes the flight',
      'Touch up faded or incomplete hazard labels with a permanent marker pen and accept the box',
      'REJECT the shipment immediately and do not load it until the shipper corrects all defects',
      'Accept minor Packing Group typos on the DGD and have destination staff amend the paperwork'
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
      'Class 3（引火性液体）・4.1（可燃性固体）と、Class 5.1（酸化性物質）等の組合せ',
      'Class 9（ドライアイス）と、温度管理の不要な一般衣料品や印刷物などの非危険物',
      '同一のUN番号および同一の危険分類に属し、包装等級も一致している危険物同士の組合せ',
      'リチウム電池組込機器（UN3481）と、一般的なプラスチック製文房具や日用品の組合せ'
    ],
    optsVi: [
      'Chất dễ cháy (Class 3/4.1) xếp sát cùng Chất oxy hóa (Class 5.1) theo bảng phân tách DGR',
      'Đá khô (Class 9) xếp chung cùng lô quần áo thông thường hoặc ấn phẩm không phải hàng nguy hiểm',
      'Hai kiện hàng nguy hiểm có cùng số UN, cùng phân loại rủi ro và cùng nhóm đóng gói (PG)',
      'Thiết bị lắp sẵn pin lithium (UN3481) xếp cạnh đồ văn phòng phẩm bằng nhựa thông thường'
    ],
    optsEn: [
      'Flammable liquids/solids (Class 3/4.1) stowed beside Oxidizers (Class 5.1) per DGR table',
      'Dry Ice (Class 9) consolidated alongside general non-dangerous garments or printed goods',
      'Two dangerous goods cartons sharing the exact same UN number, hazard class, and packing group',
      'Equipment containing UN3481 lithium batteries loaded near ordinary plastic office supplies'
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
      '全危険物のUN番号・分類・個数・正味量・CAO有無・搭載位置を記載し出発前に機長署名を得る',
      'ドライアイスや放射性物質は日常的な輸送品目のため、NOTOCへの記載対象から除外される',
      '出発準備が逼迫している場合は口頭連絡で済ませ、書面のNOTOCは離陸後に到着地へ送付する',
      '現場判断でULDの搭載位置を変更しても、LIRへ反映すればNOTOC側の書き直しは不要である'
    ],
    optsVi: [
      'Ghi đủ số UN, Class, số kiện, khối lượng, CAO, vị trí thực tế và lấy chữ ký Cơ trưởng trước bay',
      'Đá khô và chất phóng xạ là nhóm hàng quen thuộc nên được miễn ghi vào bản thông báo NOTOC',
      'Khi sát giờ bay chỉ cần báo miệng qua bộ đàm, sau khi cất cánh sẽ gửi bản NOTOC sang đầu đến',
      'Nếu đổi vị trí xếp ULD trên LIR thì không cần cập nhật lại vị trí hay xin ký lại bản NOTOC'
    ],
    optsEn: [
      'List all DG details (UN#, class, qty, CAO, hold position) and get Captain signature pre-flight',
      'Omit dry ice and radioactive shipments from the NOTOC because they are handled on routine flights',
      'Brief the Captain verbally when rushed and transmit the written NOTOC to destination after takeoff',
      'Update only the LIR after shifting a ULD position without revising or re-signing the NOTOC'
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
      '臭気拡散を防ぐため、漏洩した段ボールごと一般貨物の奥へ押し込んでコンテナを閉める',
      'まず雑巾で漏れた液体を拭き取り、物質を特定するため鼻を近づけて臭気の種類を判別する',
      '作業を止め風上退避・立入禁止とし、触れずに消防・DGR責任者へUN番号等を緊急通報する',
      '希釈して無害化するため、大量のホース水で洗い流して通常のエプロン排水溝へ流出させる'
    ],
    optsVi: [
      'Đẩy sâu thùng hàng rò rỉ vào góc trong đống hàng thường rồi đóng kín cửa thùng để chặn mùi',
      'Dùng giẻ lau nhanh vết chất lỏng và đưa sát mũi ngửi thử để xác định xem thuộc loại hóa chất nào',
      'Dừng việc, sơ tán đầu gió, cách ly hiện trường, không chạm tay và báo Cứu hỏa/DGR kèm số UN',
      'Dùng vòi áp lực xịt thật nhiều nước pha loãng rồi xả trôi toàn bộ xuống cống thoát nước sân đỗ'
    ],
    optsEn: [
      'Push the leaking box behind general cargo and seal the container doors to trap any vapors',
      'Wipe the spill with a shop rag and sniff closely to identify the leaked substance quickly',
      'Stop work, evacuate upwind, isolate without touching, and alert Fire/DG with the UN#',
      'Wash the leaked chemical down with heavy water hoses straight into the apron storm drain'
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
      '規定量以下の小型梱包であれば、旅客機の後部バルク貨物室へ例外的に搭載してもよい',
      '旅客機は絶対禁止で、貨物専用機の規定適合区画（メインデッキ等）にのみ搭載できる',
      '乗客数が10名以下の臨時チャーター旅客便であれば、機長承認によりCAOも搭載できる',
      '貨物専用機へ搭載する場合、CAO貨物は緊急確認しやすいよう固縛せず床へ置くだけとする'
    ],
    optsVi: [
      'Nếu kiện nhỏ dưới mức quy định vẫn có thể xếp ngoại lệ vào hầm Bulk sau của máy bay chở khách',
      'Cấm tuyệt đối trên máy bay chở khách; chỉ xếp lên tàu chở hàng (Freighter) đúng khoang quy định',
      'Nếu chuyến bay thuê bao chở khách có dưới 10 hành khách thì được phép xếp hàng CAO khi có phép',
      'Khi xếp lên tàu hàng thì không cần chằng buộc hàng CAO để phi hành đoàn dễ kéo ra kiểm tra'
    ],
    optsEn: [
      'Small CAO cartons below net limits may be loaded in the aft bulk hold of passenger airliners',
      'Forbidden on passenger flights; permitted only on Cargo Aircraft in DGR-compliant holds',
      'Permitted on passenger charter flights carrying fewer than 10 passengers with Captain consent',
      'Leave CAO packages unrestrained on freighter floors so crew can pull them out rapidly in flight'
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
      'TI値の合算チェックは貨物専用機のみの規定であり、旅客機では個数確認だけで足りる',
      'TI値が大きいほど遮蔽性能が高く安全なため、総TI100以上を1か所へまとめて搭載する',
      '放射性物質は温度変化を防ぐため、生きた動物（AVI）のケージ真横へ密着させて積む',
      '1機の総TI上限（旅客機50）と、客室・動物・未現像フィルムとの規定離隔距離を守る'
    ],
    optsVi: [
      'Quy định cộng dồn chỉ số TI chỉ áp dụng cho tàu chở hàng, tàu chở khách chỉ cần đếm số kiện',
      'Chỉ số TI càng cao chứng tỏ vỏ bọc càng an toàn nên ưu tiên gom tổng TI trên 100 vào một ô',
      'Xếp kiện phóng xạ áp sát ngay cạnh lồng động vật sống (AVI) để tận dụng nhiệt độ ổn định',
      'Giữ tổng TI tàu khách ≤ 50 và đảm bảo khoảng cách ly với khoang khách, AVI và phim ảnh'
    ],
    optsEn: [
      'Total TI limits apply only to freighters; passenger flights only verify total package count',
      'Higher TI ratings indicate stronger shielding, so group packages totaling TI ≥ 100 together',
      'Stow radioactive cartons directly beside live-animal (AVI) kennels to maintain steady warmth',
      'Enforce total pax-aircraft TI ≤ 50 and required separation from cabin, AVI, and raw film'
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
      '二酸化炭素ガスは空気より軽く即座に機外へ抜けるが、社内慣例として隔離している',
      'ドライアイスは飛行中に液体の水へ溶け出し、貨物室の床や周囲の荷物を濡らすため',
      '昇華した重い二酸化炭素が滞留し、生きた動物の窒息やCO2上昇を招くため',
      '梱包の隙間から零れ落ちたドライアイス粒を生きた動物が誤飲する恐れがあるためだけ'
    ],
    optsVi: [
      'Khí CO2 nhẹ hơn không khí nên thoát nhanh ra ngoài, việc tách khoang chỉ là thói quen cũ',
      'Đá khô tan chảy nhanh thành nước lỏng trong quá trình bay làm ướt sàn và hỏng hàng xung quanh',
      'Đá khô thăng hoa sinh khí CO2 nặng chìm đáy khoang, gây ngạt động vật (AVI) và tăng CO2',
      'Chỉ nhằm tránh trường hợp các hạt đá khô rơi ra ngoài khiến động vật sống ăn nhầm gây bỏng'
    ],
    optsEn: [
      'CO2 gas is lighter than air and vents quickly, so AVI separation is only a legacy custom',
      'Dry ice melts rapidly into liquid water during flight and floods the cargo hold floor',
      'Sublimating heavy CO2 gas pools in the hold, risking AVI asphyxiation and high CO2 levels',
      'Separation exists solely to prevent live animals from chewing loose dry-ice pellets'
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
      '荷崩れ防止のため1段目を上向き、2段目を逆さまに組んで互い違いに噛み合わせて積む',
      'ULDの天井コンターへ収める目的なら、内蓋が確実に締まっていれば横倒しにしてよい',
      '向上矢印マークは倉庫内での保管指示であり、航空機ULDへの積付時は横積みできる',
      '矢印が真上を向く正立姿勢を厳守し、横倒し・逆さ積みを禁じて転倒防止の固定を行う'
    ],
    optsVi: [
      'Xếp xen kẽ tầng 1 dựng đứng, tầng 2 lật ngược lại để các thùng khóa khớp chắc chắn hơn',
      'Nếu cần xếp vừa vòm Contour của ULD thì có thể đặt nằm ngang miễn đã vặn chặt nắp bình',
      'Nhãn mũi tên hướng lên chỉ áp dụng khi lưu kho, lúc đóng vào ULD có thể xoay ngang cho gọn',
      'Giữ đứng thẳng đúng chiều mũi tên hướng lên, cấm đặt ngang/ngược và chèn lót chống đổ ngã'
    ],
    optsEn: [
      'Alternate upright and inverted layers so liquid cartons interlock tightly against shifting',
      'Lay packages sideways to fit curved ULD roof contours whenever inner bottle caps are tight',
      'Follow orientation arrows only on warehouse racks, not when building tight aircraft ULDs',
      'Keep packages strictly upright with arrows pointing up, never tilted, and braced firmly'
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
      '原則として旅客機搭載禁止（CAO限定）であり、充電率30%以下等の厳格基準を満たす',
      '一般電子部品と同じ扱いであり、旅客機の客室や貨物室へ数量制限なく混載搭載できる',
      '輸送中の劣化を防ぐため、充電率100%の満充電状態にしてから航空機へ搭載する規定がある',
      '小型リチウム電池貨物には「CARGO AIRCRAFT ONLY」ラベル貼付は一切不要である'
    ],
    optsVi: [
      'Cấm chở trên tàu khách (chỉ đi CAO) và bắt buộc đạt mức sạc SoC ≤ 30% cùng chuẩn đóng gói',
      'Được xếp chung như linh kiện điện tử thông thường lên tàu bay chở khách không giới hạn số lượng',
      'Quy định yêu cầu sạc đầy 100% dung lượng pin trước khi giao lên tàu bay để tránh hỏng cell',
      'Các lô pin lithium rời dạng hàng hóa đều được miễn dán nhãn cam CARGO AIRCRAFT ONLY'
    ],
    optsEn: [
      'Forbidden on passenger flights (CAO only) with strict packaging and ≤30% SoC limits',
      'Treated as general electronics and permitted on passenger aircraft without quantity limits',
      'Must be charged to 100% state of charge prior to air transport to prevent cell degradation',
      'Exempt from displaying orange CARGO AIRCRAFT ONLY labels under standard IATA cargo rules'
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
      '荷送人に悪意がなさそうなら、問題の缶だけ作業員が抜き取って廃棄し残りを搭載する',
      '直ちに受託・搭載を停止して隔離し、社内SMSおよび航空当局規定に沿って正式報告する',
      '今回は一般貨物としてそのまま搭載し、次回以降は適切に申告するよう荷送人へ口頭注意する',
      '外装に危険物ラベルが貼られていない以上、現場では非危険物と判断してそのまま通過させる'
    ],
    optsVi: [
      'Thấy chủ hàng không cố ý nên tự lấy bình xịt vứt bỏ rồi vẫn cho xếp phần hàng còn lại lên tàu',
      'Dừng ngay tiếp nhận/xếp tải, cách ly lô hàng và báo cáo chính thức theo quy trình SMS/JCAB',
      'Vẫn cho bay như hàng thường chuyến này và nhắc miệng chủ hàng khai báo đúng vào lần gửi sau',
      'Vì vỏ thùng không dán nhãn nguy hiểm nên hiện trường mặc định coi là hàng thường cho thông qua'
    ],
    optsEn: [
      'Assume an honest mistake, discard the aerosol cans in ramp trash, and load the remaining box',
      'Halt acceptance/loading, quarantine intact, and file an official SMS and JCAB DG report',
      'Load it as general cargo this time and verbally remind the shipper to declare properly next time',
      'Clear the shipment as non-dangerous cargo whenever no hazard diamond is pasted on the carton'
    ],
    ans: 1,
    expJa: '未申告危険物は適切な梱包・表示・NOTOC記載が一切ないため航空火災の最大脅威です。発見時は勝手に廃棄・抜取りせず、証拠保全の上で即時隔離と当局規定報告を実施します。',
    expVi: 'Hàng nguy hiểm không khai báo không có bao bì đạt chuẩn và không nằm trên NOTOC nên cực kỳ nguy hiểm trên không. Phải cách ly giữ nguyên hiện trạng và báo cáo chính thức ngay.',
    expEn: 'Undeclared DG bypasses packaging, labeling, and NOTOC safeguards, creating extreme in-flight fire risk. Quarantine intact and file mandatory regulatory reports.'
  }
];
