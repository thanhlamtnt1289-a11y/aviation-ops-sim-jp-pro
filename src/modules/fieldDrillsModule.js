// Module H: Marshalling, Headset Pushback, Interactive Light Gun Drill, MCA Radio + Phonetic, NGO Rules & 92-Term Trilingual Dictionary
import { OPS_DICTIONARY, OPS_MARSHALLING_SIGNALS, OPS_PUSHBACK_STEPS } from '../data/dictionary.js';
import {
  NGO_LIGHT_GUN_SIGNALS, ICAO_PHONETIC_CODE, NGO_MCA_RADIO_DRILLS,
  NGO_QUICK_REFERENCE, NGO_EXTRA_DICTIONARY, renderNgoVisualSvg
} from '../data/centrairNgo.js';
import { renderQuizVisualSvg } from '../data/quizBank.js';
import { a3dAudio, speakJapaneseTerm } from '../engines/audioEngine.js';
import { appState, saveState, t } from '../core/state.js';

export const FULL_DICTIONARY = [...OPS_DICTIONARY, ...NGO_EXTRA_DICTIONARY];

const PHONETIC_CHALLENGES = [
  { code: 'JA819A', focus: '9', promptJa: '機体記号「JA819A」の正しいフォネティック読み（特に9）は？', promptVi: 'Cách đọc ICAO Phonetic chuẩn cho số đăng bạ tàu bay "JA819A" (chú ý số 9) là gì?', promptEn: 'Which is the correct ICAO phonetic readback for aircraft registration "JA819A" (note 9)?',
    opts: [
      { ok: true, txt: 'Juliett – Alfa – Eight – One – Niner – Alfa' },
      { ok: false, txt: 'Japan – Apple – Eight – One – Nine – Alfa' },
      { ok: false, txt: 'Juliett – Alfa – Eight – One – Nine – America' }
    ],
    expJa: 'J＝Juliett、A＝Alfa、9＝Niner（ナイナー）と発音し「5（Five）」との聞き間違いを防ぎます。',
    expVi: 'J = Juliett, A = Alfa, và số 9 luôn đọc là Niner (ナイナー) để tránh nghe nhầm trên sóng vô tuyến.',
    expEn: 'J = Juliett, A = Alfa, and 9 = Niner to prevent radio confusion.' },
  { code: 'TWY-C9', focus: 'C', promptJa: '誘導路「C9」を管制塔へ復唱するときの正しい読み方は？', promptVi: 'Khi nhắc lại tên đường lăn "C9" với Đài kiểm soát, cách đọc chuẩn là gì?', promptEn: 'What is the correct ATC readback for Taxiway "C9"?',
    opts: [
      { ok: true, txt: 'Taxiway Charlie Niner' },
      { ok: false, txt: 'Taxiway Canada Nine' },
      { ok: false, txt: 'Taxiway Control Niner' }
    ],
    expJa: 'C＝Charlie、9＝Niner。地名や一般単語（Canada等）に置き換えてはいけません。',
    expVi: 'C đọc là Charlie và 9 đọc là Niner; tuyệt đối không tự chế từ khác như Canada.',
    expEn: 'C = Charlie and 9 = Niner; never substitute non-standard words.' },
  { code: 'NGO-W4', focus: 'W', promptJa: 'コールサイン「NGO-W4」の「N」「W」を含む正しい読み方は？', promptVi: 'Cách đọc chuẩn cho mã gọi "NGO-W4" (chú ý chữ N và W) là gì?', promptEn: 'Which is the correct phonetic readback for callsign "NGO-W4"?',
    opts: [
      { ok: true, txt: 'November – Golf – Oscar – Whiskey – Four' },
      { ok: false, txt: 'Nancy – Golf – Oscar – Water – Four' },
      { ok: false, txt: 'North – Green – Oscar – Wind – Four' }
    ],
    expJa: 'N＝November、G＝Golf、O＝Oscar、W＝Whiskey。NGO構内運転試験でも頻出の組み合わせです。',
    expVi: 'N = November, G = Golf, O = Oscar, W = Whiskey — cụm chữ rất hay ra trong đề thi lái xe NGO.',
    expEn: 'N = November, G = Golf, O = Oscar, W = Whiskey — frequently tested in NGO airside driving exams.' },
  { code: 'SPOT-14J', focus: 'J', promptJa: '「SPOT 14J」を無線で明確に伝えるときの読み方は？', promptVi: 'Cách đọc qua bộ đàm rõ ràng nhất cho "SPOT 14J" là gì?', promptEn: 'How should "SPOT 14J" be pronounced clearly over MCA radio?',
    opts: [
      { ok: true, txt: 'Spot One – Four – Juliett' },
      { ok: false, txt: 'Spot Fourteen – Japan' },
      { ok: false, txt: 'Spot One – Four – Jumbo' }
    ],
    expJa: '数字は原則1桁ずつ「One – Four」、Jは「Juliett」と読みます。',
    expVi: 'Số đọc từng chữ số rời "One – Four" và J đọc là "Juliett".',
    expEn: 'Digits are spoken individually ("One – Four") and J is "Juliett".' }
];

const PAX_COUNTER_DRILLS = [
  {
    id: 'PAX1', badge: '32kg LIMIT',
    titleJa: 'ケース1：預け入れ手荷物 1個 36kg', titleVi: 'Ca 1: Hành lý ký gửi 1 kiện nặng 36 kg', titleEn: 'Case 1: Single 36 kg Checked Suitcase',
    sitJa: '国際線チェックインカウンターで旅客が36kgのスーツケース1個を預けようとしています（手荷物上限は単体32kg）。',
    sitVi: 'Tại quầy check-in quốc tế, hành khách đặt 1 vali nặng 36 kg lên cân (ngưỡng an toàn lao động tối đa 32 kg/kiện).',
    sitEn: 'At international check-in, a passenger places a single 36 kg suitcase on the scale (occupational safety cap is 32 kg per piece).',
    opts: [
      { ok: true, ja: '32kg上限を丁寧に説明し、2個へ分割（リパック）または航空貨物（Cargo）扱いを案内する', vi: 'Giải thích lịch sự giới hạn 32 kg/kiện, đề nghị khách chia thành 2 kiện (repack) hoặc gửi đường Hàng hóa (Cargo)', en: 'Politely explain the 32 kg single-piece cap and ask to repack into 2 bags or ship as Air Cargo' },
      { ok: false, ja: 'HEAVYタグを2枚貼って1個のまま受託し、ランプへそのまま流す', vi: 'Dán 2 thẻ HEAVY rồi vẫn nhận nguyên kiện 36 kg đẩy xuống hầm hàng', en: 'Attach two HEAVY tags and accept the 36 kg piece unchanged' },
      { ok: false, ja: '客室の頭上収納棚へ機内持込手荷物として持ち込ませる', vi: 'Cho hành khách mang thẳng vali 36 kg lên khoang hành lý xách tay cabin', en: 'Permit the 36 kg suitcase as cabin carry-on baggage' }
    ],
    expJa: '単体32kg（70lb）超の手荷物は作業員の腰痛・負傷防止のため受託不可です。分割または貨物扱いが原則です。',
    expVi: 'Vượt 32 kg/kiện cấm nhận ký gửi để bảo vệ sức khỏe nhân viên bốc xếp — bắt buộc chia kiện hoặc chuyển Cargo.',
    expEn: 'Single bags over 32 kg (70 lb) cannot be accepted as checked baggage for handler safety; split or ship as cargo.'
  },
  {
    id: 'PAX2', badge: 'LITHIUM',
    titleJa: 'ケース2：ゲートチェック時のモバイルバッテリー', titleVi: 'Ca 2: Sạc dự phòng khi Gate-check tại cửa lên tàu', titleEn: 'Case 2: Power Bank During Gate-Check',
    sitJa: '満席便の搭乗口で規格外キャリーバッグを貨物室預け（ゲートチェック）にする際、中にモバイルバッテリー（80Wh）が入っていました。',
    sitVi: 'Tại cửa khởi hành cần chuyển vali xách tay quá khổ xuống hầm hàng (gate-check), bên trong có 1 cục sạc dự phòng 80Wh.',
    sitEn: 'An oversized carry-on must be gate-checked at the boarding gate, and it contains an 80 Wh lithium-ion power bank.',
    opts: [
      { ok: true, ja: 'バッテリーを必ず取り出し、端子を保護して旅客本人が機内持込として携行するよう依頼する', vi: 'Bắt buộc lấy sạc dự phòng ra khỏi vali, bảo vệ chống đoản mạch và để khách mang xách tay lên cabin', en: 'Remove the power bank from the bag, protect terminals from short-circuit, and have the passenger carry it in the cabin' },
      { ok: false, ja: '100Wh以下なのでスーツケースに入れたまま貨物室へ預け入れてよい', vi: 'Vì dưới 100Wh nên cứ để nguyên trong vali gửi xuống hầm hàng bình thường', en: 'Since it is under 100 Wh, leave it inside the gate-checked suitcase for the cargo hold' },
      { ok: false, ja: 'すべてのモバイルバッテリーは機内持込も不可なので没収・廃棄する', vi: 'Tịch thu và tiêu hủy ngay vì mọi sạc dự phòng đều bị cấm mang lên máy bay', en: 'Confiscate and dispose of it because all power banks are banned onboard' }
    ],
    expJa: '予備リチウム電池・モバイルバッテリーは発火時に客室乗務員が即時消火できるよう貨物室預け厳禁・機内持込必須です。',
    expVi: 'Pin dự phòng tuyệt đối cấm trong hầm hàng — luôn phải mang lên cabin để tiếp viên xử lý ngay nếu quá nhiệt.',
    expEn: 'Spare lithium batteries are strictly prohibited in checked holds and must remain in the cabin.'
  },
  {
    id: 'PAX3', badge: 'PPBM',
    titleJa: 'ケース3：国際線チェックイン済み旅客のNo-show', titleVi: 'Ca 3: Khách quốc tế đã gửi hành lý nhưng No-show', titleEn: 'Case 3: International Checked-In Passenger No-Show',
    sitJa: '出発10分前、預け入れ手荷物2個を持つ国際線旅客がファイナルコール後も搭乗口に現れません。',
    sitVi: 'Còn 10 phút tới giờ bay, một hành khách quốc tế có 2 kiện hành lý ký gửi vẫn không xuất hiện sau lần gọi cuối (Final Call).',
    sitEn: 'Ten minutes before departure, an international passenger with 2 checked bags fails to appear after final boarding call.',
    opts: [
      { ok: true, ja: 'PPBM規則に基づき直ちにランプへ連絡し、当該旅客の手荷物2個を機体から取卸す（オフロード）', vi: 'Theo quy tắc an ninh PPBM, báo ngay xuống sân đỗ tìm và dỡ (offload) cả 2 kiện hành lý đó trước khi đóng cửa', en: 'Under PPBM security rules, immediately instruct ramp to locate and offload both checked bags before departure' },
      { ok: false, ja: '定時出発を最優先し、手荷物2個だけ先に目的地空港へ輸送して保管する', vi: 'Ưu tiên đúng giờ cất cánh, cứ chở 2 kiện hành lý tới sân bay đích trước để khách lấy sau', en: 'Prioritize on-time departure and fly the 2 bags ahead to be stored at destination' },
      { ok: false, ja: '手荷物タグの控えを破棄してシステム上だけ搭乗済みに書き換える', vi: 'Hủy cuống thẻ hành lý và sửa trạng thái hệ thống thành đã lên máy bay', en: 'Discard the bag stubs and mark the passenger as boarded in the system' }
    ],
    expJa: 'PPBM（旅客手荷物照合）により、本人が搭乗していない無主手荷物を搭載したまま出発することは保安上厳禁です。',
    expVi: 'An ninh hàng không (PPBM) nghiêm cấm chở hành lý ký gửi mà chủ nhân không có mặt trên chuyến bay.',
    expEn: 'Positive Passenger Bag Match (PPBM) prohibits departing with unaccompanied checked baggage.'
  },
  {
    id: 'PAX4', badge: 'EXIT ROW / PRM',
    titleJa: 'ケース4：非常口座席とWCHC旅客の対応', titleVi: 'Ca 4: Hàng ghế thoát hiểm & khách xe lăn WCHC', titleEn: 'Case 4: Exit Row & WCHC Wheelchair Passenger',
    sitJa: '機内歩行不可でアイルチェアが必要な旅客（SSR: WCHC）が「足元が広いので非常口座席にしたい」と希望されました。',
    sitVi: 'Một hành khách không tự đi lại trong cabin (mã SSR: WCHC) muốn đổi sang ngồi hàng ghế cửa thoát hiểm (Exit Row) vì rộng chân.',
    sitEn: 'A passenger requiring an onboard aisle chair (SSR: WCHC) requests an Emergency Exit Row seat for extra legroom.',
    opts: [
      { ok: true, ja: '法令上の非常口座席条件を丁寧に説明してお断りし、介助しやすい通常通路側・バルクヘッド席等を手配する', vi: 'Giải thích lịch sự quy định an toàn hàng ghế thoát hiểm để từ chối và bố trí ghế lối đi / vách ngăn thuận tiện hỗ trợ WCHC', en: 'Politely explain exit-row safety regulations to decline, and arrange an accessible aisle/bulkhead seat with aisle-chair support' },
      { ok: false, ja: '顧客満足を優先して希望通り非常口座席をそのまま指定する', vi: 'Ưu tiên sự hài lòng của khách, xếp luôn hàng ghế cửa thoát hiểm theo yêu cầu', en: 'Prioritize customer preference and assign the exit row seat as requested' },
      { ok: false, ja: '搭乗自体を拒否して予約をキャンセルする', vi: 'Từ chối vận chuyển và hủy vé chuyến bay của hành khách', en: 'Refuse boarding entirely and cancel the booking' }
    ],
    expJa: '非常口座席は緊急脱出時にドア開放・他旅客援助ができる健常な旅客限定です。PRM旅客には安全な代替席と丁寧な介助を提供します。',
    expVi: 'Hàng ghế thoát hiểm chỉ dành cho người đủ năng lực hỗ trợ sơ tán; với khách WCHC cần từ chối khéo và xếp ghế hỗ trợ thuận tiện.',
    expEn: 'Exit rows are legally restricted to passengers able to assist in evacuation; offer a comfortable accessible seat instead.'
  },
  {
    id: 'PAX5', badge: 'OVERBOOKING',
    titleJa: 'ケース5：満席オーバーブッキング発生時の初動', titleVi: 'Ca 5: Xử lý bước đầu khi chuyến bay Overbooking', titleEn: 'Case 5: Initial Step for Flight Overbooking',
    sitJa: '搭乗予定者が座席数を3名上回るオーバーブッキングが発生しました。最初に取るべき標準対応は？',
    sitVi: 'Chuyến bay bị bán quá chỗ 3 hành khách so với số ghế thực tế. Quy trình tiêu chuẩn đầu tiên cần làm là gì?',
    sitEn: 'Three more checked-in passengers hold bookings than available cabin seats. What is the standard first step?',
    opts: [
      { ok: true, ja: '協力金・振替便・食事券等を案内し、自発的な便変更協力者（ボランティア／フレックストラベラー）を募る', vi: 'Thông báo tìm hành khách tình nguyện đổi chuyến (Flex Traveler / Volunteer) kèm khoản bồi thường và chuyến thay thế', en: 'Solicit volunteers (Flex Travelers) willing to take a later flight with compensation and rebooking support' },
      { ok: false, ja: '最後にカウンターへ来た3名を事前説明なく強制的に降機対象とする', vi: 'Lập tức hủy chỗ 3 khách tới muộn nhất mà không cần thông báo kêu gọi tình nguyện', en: 'Immediately deny boarding to the last 3 arrivals without seeking volunteers' },
      { ok: false, ja: '客室乗務員のジャンプシートに一般旅客3名を着席させる', vi: 'Bố trí 3 hành khách ngồi vào ghế gấp Jumpseat của tiếp viên hàng không', en: 'Seat the 3 extra passengers on cabin crew jumpseats' }
    ],
    expJa: 'まずは自発的協力者（Voluntary Denied Boarding）を募り、合意のうえで振替便と補償を提供するのが国際標準です。',
    expVi: 'Luôn kêu gọi khách tình nguyện đổi chuyến trước với chính sách đền bù minh bạch trước khi xét biện pháp bắt buộc.',
    expEn: 'Always call for voluntary denied boarding with agreed compensation before any involuntary offloading.'
  },
  {
    id: 'PAX6', badge: 'MCT',
    titleJa: 'ケース6：前便遅延による最低乗継時間（MCT）割れ', titleVi: 'Ca 6: Chuyến đến bị trễ khiến thời gian nối chuyến < MCT', titleEn: 'Case 6: Inbound Delay Violating MCT',
    sitJa: '到着便の遅延により、国際線への乗継残り時間が空港規定のMCT（60分）を下回り25分しかありません。',
    sitVi: 'Do chuyến bay đến bị trễ, thời gian còn lại để khách nối sang chuyến quốc tế chỉ còn 25 phút (thấp hơn MCT quy định 60 phút).',
    sitEn: 'An inbound delay leaves only 25 minutes before a passenger\'s international connection, below the published 60-minute MCT.',
    opts: [
      { ok: true, ja: 'MCT未達で手荷物・出国手続が間に合わないため、代替便への振替手配と手荷物タグ再発行を迅速に行う', vi: 'Vì dưới ngưỡng MCT không kịp chuyển khách & hành lý, chủ động đổi sang chuyến kế tiếp và cập nhật lại thẻ hành lý', en: 'Because connection time is below MCT, proactively rebook onto the next eligible flight and re-tag checked baggage' },
      { ok: false, ja: '何も手配せず旅客にターミナル内を全力疾走させるだけにする', vi: 'Không xử lý gì, chỉ bảo hành khách tự chạy thật nhanh sang ga quốc tế', en: 'Take no action and simply tell the passenger to sprint through the terminal' },
      { ok: false, ja: '乗継便の出発を地上係員の独断で1時間遅らせる', vi: 'Nhân viên quầy tự ý quyết định giữ chuyến bay quốc tế chậm lại 1 tiếng', en: 'Unilaterally hold the international departure for 1 hour at the counter' }
    ],
    expJa: 'MCTを下回る場合は乗継不成立となるため、到着前から代替便確保・バゲージリタグ・旅客案内を連携して行います。',
    expVi: 'Khi thời gian nối chuyến < MCT, cần phối hợp đặt lại chuyến thay thế, đổi thẻ hành lý và hướng dẫn khách ngay khi vừa hạ cánh.',
    expEn: 'When inbound delays break MCT, coordinate proactive rebooking, bag re-tagging, and passenger care upon arrival.'
  }
];

export const opsState = {
  subtab: 'lightgun', // 'lightgun' | 'mca' | 'ngoguide' | 'marshal' | 'pushback' | 'paxbag' | 'dict'
  // Light Gun drill state
  lgMode: 'study', // 'study' | 'drill'
  lgIdx: 0,
  lgAnswered: null,
  lgScore: 0,
  lgStreak: 0,
  // MCA Radio & Phonetic state
  mcaMode: 'radio', // 'radio' | 'phonetic'
  mcaIdx: 0,
  mcaChosen: null,
  phonIdx: 0,
  phonChosen: null,
  phonScore: 0,
  // Marshalling state
  marshalMode: 'study',
  marshalQuizIdx: 0,
  marshalScore: 0,
  marshalAnswered: null,
  // Pushback state
  pbStepIdx: 0,
  pbChosen: null,
  pbScore: 0,
  // Pax & Baggage Counter state
  paxIdx: 0,
  paxChosen: null,
  paxScore: 0,
  // Dictionary state
  dictQuery: '',
  dictCat: 'all'
};

export function openFieldSubtab(tab) {
  const valid = ['lightgun', 'mca', 'ngoguide', 'marshal', 'pushback', 'paxbag', 'dict'];
  opsState.subtab = valid.includes(tab) ? tab : 'lightgun';
  renderFieldDrillsModule();
}

export function openDictionaryQuery(q) {
  opsState.subtab = 'dict';
  opsState.dictCat = 'all';
  opsState.dictQuery = q || '';
  renderFieldDrillsModule();
}

function renderLightGunLamp(sig) {
  const animStyle = sig.mode === 'flash'
    ? 'animation: lgFlash 0.85s infinite;'
    : (sig.mode === 'alt' ? 'animation: lgAlt 0.9s infinite;' : '');
  const glow = sig.mode === 'alt' ? '0 0 28px #F59E0B' : `0 0 32px ${sig.color}`;
  return `
    <style>
      @keyframes lgFlash { 0%,45%{opacity:1;transform:scale(1);} 50%,95%{opacity:0.15;transform:scale(0.92);} 100%{opacity:1;} }
      @keyframes lgAlt { 0%,48%{background:#EF4444;box-shadow:0 0 32px #EF4444;} 52%,100%{background:#22C55E;box-shadow:0 0 32px #22C55E;} }
    </style>
    <div style="display:flex;align-items:center;justify-content:center;padding:20px;border-radius:12px;background:#090F1D;border:2px solid #334155;">
      <div style="width:82px;height:82px;border-radius:50%;background:${sig.color};box-shadow:${glow};border:4px solid #E2E8F0;${animStyle}"></div>
    </div>
  `;
}

export function renderFieldDrillsModule() {
  const mount = document.getElementById('ops-mount');
  if (!mount) return;

  const tabsHtml = `
    <div class="subtabs">
      <button class="subtab ${opsState.subtab === 'lightgun' ? 'active' : ''}" data-ost="lightgun">🔦 ${t('1. 指向信号灯 (ライトガン)', '1. Đèn Light Gun (5 tín hiệu)', '1. ATC Light Gun Drill')}</button>
      <button class="subtab ${opsState.subtab === 'mca' ? 'active' : ''}" data-ost="mca">📻 ${t('2. MCA無線・フォネティック', '2. MCA Radio & Phonetic', '2. MCA Radio & Phonetic')}</button>
      <button class="subtab ${opsState.subtab === 'ngoguide' ? 'active' : ''}" data-ost="ngoguide">📘 ${t('3. NGOセントレア運転早見表', '3. Sổ tay Luật Lái xe NGO', '3. NGO Centrair Quick Guide')}</button>
      <button class="subtab ${opsState.subtab === 'marshal' ? 'active' : ''}" data-ost="marshal">🚧 ${t('4. マーシャリング (8種)', '4. Marshalling (8 tín hiệu)', '4. Marshalling Signals (8)')}</button>
      <button class="subtab ${opsState.subtab === 'pushback' ? 'active' : ''}" data-ost="pushback">🎧 ${t('5. プッシュバック交信', '5. Headset Pushback', '5. Pushback Intercom')}</button>
      <button class="subtab ${opsState.subtab === 'paxbag' ? 'active' : ''}" data-ost="paxbag">🧳 ${t('6. 旅客・手荷物カウンター', '6. Quầy Khách & Hành lý (6 ca)', '6. Pax & Baggage Counter (6)')}</button>
      <button class="subtab ${opsState.subtab === 'dict' ? 'active' : ''}" data-ost="dict">📖 ${t(`7. 3言語航空辞典 (${FULL_DICTIONARY.length}語)`, `7. Từ điển 3 Ngôn ngữ (${FULL_DICTIONARY.length} từ)`, `7. Trilingual Dictionary (${FULL_DICTIONARY.length})`)}</button>
    </div>
  `;

  if (opsState.subtab === 'lightgun') {
    const sig = NGO_LIGHT_GUN_SIGNALS[opsState.lgIdx % NGO_LIGHT_GUN_SIGNALS.length];
    mount.innerHTML = tabsHtml + `
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
        <button class="btn btn-sm ${opsState.lgMode === 'study' ? 'btn-primary' : ''}" id="lg-mode-study">${t('5信号 発光確認カード', 'Thẻ học 5 tín hiệu phát sáng', '5-Signal Study Cards')}</button>
        <button class="btn btn-sm ${opsState.lgMode === 'drill' ? 'btn-primary' : ''}" id="lg-mode-drill">${t('無線故障時 瞬時判別ドリル', 'Bài test phản xạ khi mất sóng radio', 'Radio-Failure Reflex Drill')}</button>
      </div>
      ${opsState.lgMode === 'study' ? `
        <div class="alert alert-warn" style="margin-bottom:12px;font-size:12.5px;">
          ${t('着陸帯等で管制塔（TWR）との無線通信ができなくなった場合、必ず指向信号灯（ライトガン）の指示に従わなければなりません。',
              'Khi mất liên lạc bộ đàm với Đài kiểm soát (TWR) trên đường băng/đường lăn, bắt buộc phải tuân thủ tín hiệu đèn Light Gun.',
              'If radio contact with Control Tower (TWR) is lost on a runway or taxiway, you must strictly obey ATC Light Gun signals.')}
        </div>
        <div class="ops-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:12px;">
          ${NGO_LIGHT_GUN_SIGNALS.map(s => `
            <div class="card" style="margin-bottom:0;">
              ${renderLightGunLamp(s)}
              <div style="font-weight:800;font-size:14px;color:var(--accent);margin-top:10px;">${t(s.labelJa, s.labelVi, s.labelEn)}</div>
              <div class="ja" style="font-weight:700;font-size:14px;margin-top:4px;">${t(s.meaningJa, s.meaningVi, s.meaningEn)}</div>
              <div class="ja" style="font-size:12px;color:var(--text-secondary);margin-top:5px;">${t(s.detailJa, s.detailVi, s.detailEn)}</div>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="workspace-grid">
          <div class="card">
            <div class="card-title">
              <span class="ja">${t('管制塔から照射されたライトガンの指示を選択してください', 'Chọn đúng mệnh lệnh của tín hiệu Light Gun từ Đài kiểm soát', 'Select the correct ATC Light Gun instruction from Control Tower')}</span>
              <span class="badge badge-accent">${(opsState.lgIdx % 5) + 1} / 5</span>
            </div>
            <div style="margin:12px 0;">${renderLightGunLamp(sig)}</div>
            <div style="text-align:center;font-weight:700;margin-bottom:10px;color:${opsState.lgAnswered !== null ? 'var(--accent)' : 'var(--text-secondary)'};">
              ${opsState.lgAnswered !== null ? t(sig.labelJa, sig.labelVi, sig.labelEn) : t('🔦 発光パターンを目視判別してください（実戦モード）', '🔦 Quan sát màu & kiểu nhấp nháy của đèn (Chế độ thực chiến)', '🔦 Identify the flashing/steady lamp pattern directly (Blind Reflex Mode)')}
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${NGO_LIGHT_GUN_SIGNALS.map(o => {
                let cls = '';
                if (opsState.lgAnswered !== null) cls = o.id === sig.id ? 'correct' : (o.id === opsState.lgAnswered ? 'wrong' : '');
                return `<button class="quiz-opt ${cls}" data-lgans="${o.id}" ${opsState.lgAnswered !== null ? 'disabled' : ''}>${t(o.meaningJa, o.meaningVi, o.meaningEn)}</button>`;
              }).join('')}
            </div>
            ${opsState.lgAnswered !== null ? `
              <div class="alert ${opsState.lgAnswered === sig.id ? 'alert-ok' : 'alert-danger'}" style="margin-top:10px;">${t(sig.detailJa, sig.detailVi, sig.detailEn)}</div>
              <button class="btn btn-sm btn-primary" id="lg-next">${t('次の信号 →', 'Tín hiệu tiếp →', 'Next Signal →')}</button>
            ` : ''}
          </div>
          <div class="card">
            <div class="card-title"><span>${t('ライトガン判別スコア', 'Điểm phản xạ Light Gun', 'Light Gun Drill Score')}</span></div>
            <div class="kpi-grid">
              <div class="kpi-box ok"><div class="kpi-label">${t('現在スコア', 'Hiện tại', 'Score')}</div><div class="kpi-val">${opsState.lgScore}</div></div>
              <div class="kpi-box"><div class="kpi-label">${t('連続正解', 'Chuỗi đúng', 'Streak')}</div><div class="kpi-val">${opsState.lgStreak || 0}</div></div>
              <div class="kpi-box"><div class="kpi-label">${t('最高記録', 'Cao nhất', 'Best')}</div><div class="kpi-val">${appState.opsBestLightGun || 0}</div></div>
            </div>
          </div>
        </div>
      `}
    `;
    document.getElementById('lg-mode-study').onclick = () => { opsState.lgMode = 'study'; renderFieldDrillsModule(); };
    document.getElementById('lg-mode-drill').onclick = () => { opsState.lgMode = 'drill'; opsState.lgAnswered = null; renderFieldDrillsModule(); };
    mount.querySelectorAll('[data-lgans]').forEach(b => {
      b.onclick = () => {
        opsState.lgAnswered = b.dataset.lgans;
        if (b.dataset.lgans === sig.id) {
          opsState.lgScore += 1;
          opsState.lgStreak = (opsState.lgStreak || 0) + 1;
          a3dAudio.playChirp();
          if (opsState.lgScore > (appState.opsBestLightGun || 0)) { appState.opsBestLightGun = opsState.lgScore; saveState(); }
        } else {
          opsState.lgStreak = 0;
          a3dAudio.playBeep(360, 0.2);
        }
        renderFieldDrillsModule();
      };
    });
    const lgn = document.getElementById('lg-next');
    if (lgn) lgn.onclick = () => { opsState.lgIdx = (opsState.lgIdx + 1) % NGO_LIGHT_GUN_SIGNALS.length; opsState.lgAnswered = null; renderFieldDrillsModule(); };
  } else if (opsState.subtab === 'mca') {
    const st = NGO_MCA_RADIO_DRILLS[opsState.mcaIdx];
    const pc = PHONETIC_CHALLENGES[opsState.phonIdx % PHONETIC_CHALLENGES.length];
    mount.innerHTML = tabsHtml + `
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
        <button class="btn btn-sm ${opsState.mcaMode === 'radio' ? 'btn-primary' : ''}" id="mca-mode-radio">📻 ${t('管制塔交信手順 (MCA)', 'Quy trình bộ đàm MCA', 'MCA Tower Intercom')}</button>
        <button class="btn btn-sm ${opsState.mcaMode === 'phonetic' ? 'btn-primary' : ''}" id="mca-mode-phon">🔤 ${t('コールサイン復唱テスト', 'Test đọc mã Phonetic', 'Callsign Phonetic Drill')} (${opsState.phonScore}/${PHONETIC_CHALLENGES.length})</button>
      </div>
      <div class="workspace-grid">
        ${opsState.mcaMode === 'radio' ? `
        <div class="card">
          <div class="card-title">
            <span class="ja">${t(st.phaseJa, st.phaseVi, st.phaseEn)}</span>
            <span class="badge badge-accent">STEP ${st.step} / ${NGO_MCA_RADIO_DRILLS.length}</span>
          </div>
          <div class="radio-bar" style="margin-bottom:12px;"><span class="radio-dot"></span><strong style="color:#38BDF8;">[MCA RADIO]</strong><span class="ja">${st.towerLine}</span></div>
          <p class="ja" style="font-weight:700;margin:0 0 10px;">${t(st.qJa, st.qVi, st.qEn)}</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${st.opts.map((o, idx) => {
              let cls = '';
              if (opsState.mcaChosen !== null) cls = o.ok ? 'correct' : (opsState.mcaChosen === idx ? 'wrong' : '');
              return `<button class="quiz-opt ${cls}" data-mca="${idx}" ${opsState.mcaChosen !== null ? 'disabled' : ''}>${String.fromCharCode(65 + idx)}. ${t(o.ja, o.vi, o.en)}</button>`;
            }).join('')}
          </div>
          ${opsState.mcaChosen !== null ? `
            <div class="alert ${st.opts[opsState.mcaChosen].ok ? 'alert-ok' : 'alert-danger'}" style="margin-top:10px;">${t(st.expJa, st.expVi, st.expEn)}</div>
            <button class="btn btn-sm btn-primary" id="mca-next">${opsState.mcaIdx < NGO_MCA_RADIO_DRILLS.length - 1 ? t('次の手順 →', 'Bước tiếp theo →', 'Next Step →') : t('最初から復習', 'Luyện lại từ đầu', 'Restart Drill')}</button>
          ` : ''}
        </div>
        ` : `
        <div class="card">
          <div class="card-title">
            <span class="ja">🎙 ${t('フォネティック・コールサイン実践テスト', 'Bài test đọc Callsign chuẩn ICAO', 'ICAO Callsign Phonetic Test')}</span>
            <span class="badge badge-accent">${(opsState.phonIdx % PHONETIC_CHALLENGES.length) + 1} / ${PHONETIC_CHALLENGES.length}</span>
          </div>
          <div style="text-align:center;padding:16px;border-radius:10px;background:var(--surface-2);margin-bottom:12px;border:1px solid var(--border-strong);">
            <div style="font-size:11px;color:var(--text-secondary);letter-spacing:1px;">${t('送信コード', 'MÃ CẦN ĐỌC QUA BỘ ĐÀM', 'CALLSIGN TO READ BACK')}</div>
            <div style="font-family:var(--font-mono);font-size:28px;font-weight:800;color:var(--accent);letter-spacing:2px;margin-top:4px;">${pc.code}</div>
          </div>
          <p class="ja" style="font-weight:700;margin:0 0 10px;">${t(pc.promptJa, pc.promptVi, pc.promptEn)}</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${pc.opts.map((o, idx) => {
              let cls = '';
              if (opsState.phonChosen !== null) cls = o.ok ? 'correct' : (opsState.phonChosen === idx ? 'wrong' : '');
              return `<button class="quiz-opt ${cls}" data-phonans="${idx}" ${opsState.phonChosen !== null ? 'disabled' : ''}>${String.fromCharCode(65 + idx)}. ${o.txt}</button>`;
            }).join('')}
          </div>
          ${opsState.phonChosen !== null ? `
            <div class="alert ${pc.opts[opsState.phonChosen].ok ? 'alert-ok' : 'alert-danger'}" style="margin-top:10px;">${t(pc.expJa, pc.expVi, pc.expEn)}</div>
            <button class="btn btn-sm btn-primary" id="phon-next">${t('次のコード →', 'Mã tiếp theo →', 'Next Callsign →')}</button>
          ` : ''}
        </div>
        `}
        <div class="card">
          <div class="card-title"><span class="ja">🔤 ${t('世界共通フォネティックコード表 (クリックで発音)', 'Bảng ICAO Phonetic Code (Click để nghe phát âm)', 'ICAO Phonetic Alphabet (Click to Speak)')}</span></div>
          <div class="ops-phon-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(108px,1fr));gap:6px;max-height:460px;overflow-y:auto;">
            ${ICAO_PHONETIC_CODE.map(([ch, word, kana]) => `
              <button class="btn btn-sm" data-phon="${kana}" style="justify-content:space-between;padding:6px 8px;height:auto;">
                <strong style="font-family:var(--font-mono);color:var(--accent);">${ch}</strong>
                <span style="font-size:11.5px;">${word}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    document.getElementById('mca-mode-radio').onclick = () => { opsState.mcaMode = 'radio'; renderFieldDrillsModule(); };
    document.getElementById('mca-mode-phon').onclick = () => { opsState.mcaMode = 'phonetic'; renderFieldDrillsModule(); };
    mount.querySelectorAll('[data-mca]').forEach(b => {
      b.onclick = () => {
        const idx = Number(b.dataset.mca);
        opsState.mcaChosen = idx;
        if (st.opts[idx].ok) a3dAudio.playChirp(); else a3dAudio.playBeep(360, 0.2);
        renderFieldDrillsModule();
      };
    });
    const mcan = document.getElementById('mca-next');
    if (mcan) mcan.onclick = () => { opsState.mcaIdx = (opsState.mcaIdx + 1) % NGO_MCA_RADIO_DRILLS.length; opsState.mcaChosen = null; renderFieldDrillsModule(); };
    mount.querySelectorAll('[data-phonans]').forEach(b => {
      b.onclick = () => {
        const idx = Number(b.dataset.phonans);
        opsState.phonChosen = idx;
        if (pc.opts[idx].ok) {
          opsState.phonScore += 1;
          a3dAudio.playChirp();
          if (opsState.phonScore > (appState.opsBestPhonetic || 0)) { appState.opsBestPhonetic = opsState.phonScore; saveState(); }
        } else {
          a3dAudio.playBeep(360, 0.2);
        }
        renderFieldDrillsModule();
      };
    });
    const phn = document.getElementById('phon-next');
    if (phn) phn.onclick = () => { opsState.phonIdx = (opsState.phonIdx + 1) % PHONETIC_CHALLENGES.length; opsState.phonChosen = null; renderFieldDrillsModule(); };
    mount.querySelectorAll('[data-phon]').forEach(b => { b.onclick = () => speakJapaneseTerm(b.dataset.phon); });
  } else if (opsState.subtab === 'ngoguide') {
    const ref = NGO_QUICK_REFERENCE;
    mount.innerHTML = tabsHtml + `
      <div class="workspace-grid">
        <div class="card">
          <div class="card-title"><span class="ja">⚡ ${t('NGOセントレア 制限速度一覧（7区分）', 'Bảng 7 Mức Tốc độ Giới hạn NGO Centrair', 'NGO Centrair 7-Tier Speed Limits')}</span></div>
          <div class="table-wrap">
            <table>
              <thead><tr><th>${t('区域・条件', 'Khu vực / Điều kiện', 'Area / Condition')}</th><th>${t('制限速度', 'Tốc độ', 'Limit')}</th><th>${t('要点', 'Lưu ý', 'Key Rule')}</th></tr></thead>
              <tbody>
                ${ref.speeds.map(s => `
                  <tr>
                    <td class="ja" style="font-weight:600;">${t(s.areaJa, s.areaVi, s.areaEn)}</td>
                    <td style="font-family:var(--font-mono);font-weight:800;color:var(--accent);white-space:nowrap;">${s.limit}</td>
                    <td class="ja" style="font-size:12px;">${t(s.noteJa, s.noteVi, s.noteEn)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div class="card">
          <div class="card-title"><span class="ja">🪪 ${t('制限区域立入証（5色のパス）', '5 Loại Màu Thẻ Ra Vào Khu Hạn Chế', '5 Restricted Area Pass Colors')}</span></div>
          <div style="margin-bottom:10px;">${renderNgoVisualSvg('ngo_pass_colors')}</div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            ${ref.passes.map(p => `
              <div style="padding:8px 10px;border-radius:8px;border-left:5px solid ${p.color};background:var(--surface-2);font-size:12.5px;">
                <div style="display:flex;justify-content:space-between;"><strong>${t(p.nameJa, p.nameVi, p.nameEn)}</strong><span class="badge badge-neutral">${p.issuer}</span></div>
                <div class="ja" style="color:var(--text-secondary);margin-top:2px;">${t(p.scopeJa, p.scopeVi, p.scopeEn)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="workspace-grid" style="margin-top:14px;">
        <div class="card">
          <div class="card-title"><span class="ja">🛫 ${t('プッシュバック・自走アウト 6つの合図', '6 Dấu hiệu Pushback & Tàu bay tự chạy ra', '6 Indicators of Pushback & Self-Taxi-Out')}</span></div>
          <ol style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px;font-size:13px;">
            ${ref.pushbackSigns.map(s => `<li class="ja">${t(s.ja, s.vi, s.en)}</li>`).join('')}
          </ol>
          <div style="margin-top:12px;">${renderNgoVisualSvg('ngo_front_priority')}</div>
        </div>
        <div class="card">
          <div class="card-title"><span class="ja">🚨 ${t(ref.coc.nameJa, ref.coc.nameVi, ref.coc.nameEn)}</span><span class="badge badge-danger">${ref.coc.tel}</span></div>
          <ul style="margin:0 0 12px;padding-left:18px;display:flex;flex-direction:column;gap:5px;font-size:12.5px;">
            ${t(ref.coc.itemsJa, ref.coc.itemsVi, ref.coc.itemsEn).map(it => `<li class="ja">${it}</li>`).join('')}
          </ul>
          <div>${renderNgoVisualSvg('ngo_ils_sign')}</div>
        </div>
      </div>
    `;
  } else if (opsState.subtab === 'marshal') {
    const sig = OPS_MARSHALLING_SIGNALS[opsState.marshalQuizIdx % OPS_MARSHALLING_SIGNALS.length];
    const opts = [sig];
    OPS_MARSHALLING_SIGNALS.forEach(s => { if (opts.length < 4 && s.id !== sig.id) opts.push(s); });
    opts.sort((a, b) => a.id.localeCompare(b.id));

    mount.innerHTML = tabsHtml + `
      <div style="display:flex;gap:8px;margin-bottom:12px;">
        <button class="btn btn-sm ${opsState.marshalMode === 'study' ? 'btn-primary' : ''}" id="m-mode-study">${t('学習カード', 'Thẻ học trực quan', 'Study Cards')}</button>
        <button class="btn btn-sm ${opsState.marshalMode === 'drill' ? 'btn-primary' : ''}" id="m-mode-drill">${t('瞬時判別ドリル', 'Bài tập phản xạ', 'Reflex Drill')}</button>
      </div>
      ${opsState.marshalMode === 'study' ? `
        <div class="ops-cards-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:12px;">
          ${OPS_MARSHALLING_SIGNALS.map(s => `
            <div class="card" style="margin-bottom:0;">
              <div style="margin-bottom:8px;">${renderQuizVisualSvg(s.id)}</div>
              <div style="font-weight:700;font-size:13.5px;color:var(--accent);">${t(s.ja, s.vi, s.en)}</div>
              <div class="ja" style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${t(s.descJa, s.descVi, s.descEn || s.en)}</div>
              <button class="btn btn-sm" style="margin-top:8px;" data-speak="${s.ja}">🔊 JA</button>
            </div>
          `).join('')}
        </div>
      ` : `
        <div class="workspace-grid">
          <div class="card">
            <div class="card-title"><span class="ja">${t('合図の意味を選択', 'Chọn ý nghĩa tín hiệu', 'Select Signal Meaning')}</span><span class="badge badge-accent">${(opsState.marshalQuizIdx % 8) + 1}/8</span></div>
            <div style="margin:12px 0;">${renderQuizVisualSvg(sig.id)}</div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${opts.map(o => {
                let cls = '';
                if (opsState.marshalAnswered !== null) cls = o.id === sig.id ? 'correct' : (o.id === opsState.marshalAnswered ? 'wrong' : '');
                return `<button class="quiz-opt ${cls}" data-mans="${o.id}" ${opsState.marshalAnswered !== null ? 'disabled' : ''}>${t(o.ja, o.vi, o.en)}</button>`;
              }).join('')}
            </div>
            ${opsState.marshalAnswered !== null ? `<div class="alert ${opsState.marshalAnswered === sig.id ? 'alert-ok' : 'alert-danger'}" style="margin-top:10px;">${t(sig.descJa, sig.descVi, sig.descEn || sig.en)}</div><button class="btn btn-sm btn-primary" id="m-next">${t('次へ →', 'Tiếp →', 'Next →')}</button>` : ''}
          </div>
          <div class="card"><div class="card-title"><span>${t('スコア', 'Điểm số', 'Score')}</span></div><div class="kpi-grid"><div class="kpi-box ok"><div class="kpi-label">${t('現在', 'Hiện tại', 'Score')}</div><div class="kpi-val">${opsState.marshalScore}</div></div><div class="kpi-box"><div class="kpi-label">${t('最高', 'Cao nhất', 'Best')}</div><div class="kpi-val">${appState.opsBestMarshal || 0}</div></div></div></div>
        </div>
      `}
    `;
    document.getElementById('m-mode-study').onclick = () => { opsState.marshalMode = 'study'; renderFieldDrillsModule(); };
    document.getElementById('m-mode-drill').onclick = () => { opsState.marshalMode = 'drill'; opsState.marshalAnswered = null; renderFieldDrillsModule(); };
    mount.querySelectorAll('[data-speak]').forEach(b => { b.onclick = () => speakJapaneseTerm(b.dataset.speak); });
    mount.querySelectorAll('[data-mans]').forEach(b => {
      b.onclick = () => {
        opsState.marshalAnswered = b.dataset.mans;
        if (b.dataset.mans === sig.id) {
          opsState.marshalScore += 1;
          if (opsState.marshalScore > (appState.opsBestMarshal || 0)) { appState.opsBestMarshal = opsState.marshalScore; saveState(); }
        }
        renderFieldDrillsModule();
      };
    });
    const mn = document.getElementById('m-next');
    if (mn) mn.onclick = () => { opsState.marshalQuizIdx = (opsState.marshalQuizIdx + 1) % 8; opsState.marshalAnswered = null; renderFieldDrillsModule(); };
  } else if (opsState.subtab === 'pushback') {
    const st = OPS_PUSHBACK_STEPS[opsState.pbStepIdx];
    mount.innerHTML = tabsHtml + `
      <div class="workspace-grid">
        <div class="card">
          <div class="card-title"><span class="ja">${t(st.phaseJa, st.phaseVi, st.phaseEn)}</span><span class="badge badge-accent">STEP ${st.step}/5</span></div>
          <div class="radio-bar" style="margin-bottom:12px;"><span class="radio-dot"></span><strong style="color:#38BDF8;">[INTERCOM]</strong><span>${st.pilotLine}</span></div>
          <p class="ja" style="font-weight:600;margin:0 0 10px;">${t(st.qJa, st.qVi, st.qEn)}</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${st.opts.map((o, idx) => {
              let cls = '';
              if (opsState.pbChosen !== null) cls = o.ok ? 'correct' : (opsState.pbChosen === idx ? 'wrong' : '');
              return `<button class="quiz-opt ${cls}" data-pb="${idx}" ${opsState.pbChosen !== null ? 'disabled' : ''}>${String.fromCharCode(65 + idx)}. ${t(o.ja, o.vi, o.en)}</button>`;
            }).join('')}
          </div>
          ${opsState.pbChosen !== null ? `<div class="alert ${st.opts[opsState.pbChosen].ok ? 'alert-ok' : 'alert-danger'}" style="margin-top:10px;">${t(st.expJa, st.expVi, st.expEn)}</div><button class="btn btn-sm btn-primary" id="pb-next">${opsState.pbStepIdx < 4 ? t('次へ →', 'Bước tiếp →', 'Next Step →') : t('最初から', 'Làm lại', 'Restart')}</button>` : ''}
        </div>
        <div class="card">
          <div class="card-title"><span>${t('プッシュバック手順', 'Quy trình Pushback', 'Pushback Intercom Flow')}</span></div>
          ${OPS_PUSHBACK_STEPS.map((s, i) => `<div class="timeline-item ${i < opsState.pbStepIdx ? 'done' : ''}" style="margin-bottom:6px;padding:8px 10px;"><div class="timeline-step-num">${s.step}</div><div style="font-size:12.5px;">${t(s.phaseJa, s.phaseVi, s.phaseEn)}</div></div>`).join('')}
        </div>
      </div>
    `;
    mount.querySelectorAll('[data-pb]').forEach(b => {
      b.onclick = () => {
        const idx = Number(b.dataset.pb);
        opsState.pbChosen = idx;
        if (st.opts[idx].ok) {
          opsState.pbScore += 1;
          a3dAudio.playChirp();
          if (opsState.pbStepIdx === 4) { appState.opsPushbackDone = true; saveState(); }
        }
        renderFieldDrillsModule();
      };
    });
    const pn = document.getElementById('pb-next');
    if (pn) pn.onclick = () => {
      if (opsState.pbStepIdx < 4) opsState.pbStepIdx += 1;
      else { opsState.pbStepIdx = 0; opsState.pbScore = 0; }
      opsState.pbChosen = null;
      renderFieldDrillsModule();
    };
  } else if (opsState.subtab === 'paxbag') {
    const px = PAX_COUNTER_DRILLS[opsState.paxIdx % PAX_COUNTER_DRILLS.length];
    mount.innerHTML = tabsHtml + `
      <div class="workspace-grid">
        <div class="card">
          <div class="card-title">
            <span class="ja">🧳 ${t(px.titleJa, px.titleVi, px.titleEn)}</span>
            <span class="badge badge-warn">${px.badge} · ${(opsState.paxIdx % PAX_COUNTER_DRILLS.length) + 1}/${PAX_COUNTER_DRILLS.length}</span>
          </div>
          <div class="alert alert-info" style="margin-bottom:12px;font-size:13px;">${t(px.sitJa, px.sitVi, px.sitEn)}</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${px.opts.map((o, idx) => {
              let cls = '';
              if (opsState.paxChosen !== null) cls = o.ok ? 'correct' : (opsState.paxChosen === idx ? 'wrong' : '');
              return `<button class="quiz-opt ${cls}" data-paxans="${idx}" ${opsState.paxChosen !== null ? 'disabled' : ''}>${String.fromCharCode(65 + idx)}. ${t(o.ja, o.vi, o.en)}</button>`;
            }).join('')}
          </div>
          ${opsState.paxChosen !== null ? `
            <div class="alert ${px.opts[opsState.paxChosen].ok ? 'alert-ok' : 'alert-danger'}" style="margin-top:10px;">${t(px.expJa, px.expVi, px.expEn)}</div>
            <button class="btn btn-sm btn-primary" id="pax-next">${opsState.paxIdx < PAX_COUNTER_DRILLS.length - 1 ? t('次のケース →', 'Tình huống tiếp →', 'Next Case →') : t('最初から復習', 'Làm lại từ đầu', 'Restart Cases')}</button>
          ` : ''}
        </div>
        <div class="card">
          <div class="card-title"><span>${t('旅客・手荷物スコア', 'Điểm Quầy Khách & Hành lý', 'Pax & Baggage Drill Score')}</span></div>
          <div class="kpi-grid" style="margin-bottom:10px;">
            <div class="kpi-box ok"><div class="kpi-label">${t('現在スコア', 'Hiện tại', 'Score')}</div><div class="kpi-val">${opsState.paxScore}/${PAX_COUNTER_DRILLS.length}</div></div>
            <div class="kpi-box"><div class="kpi-label">${t('最高記録', 'Cao nhất', 'Best')}</div><div class="kpi-val">${appState.opsBestPaxCounter || 0}/${PAX_COUNTER_DRILLS.length}</div></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:5px;">
            ${PAX_COUNTER_DRILLS.map((c, i) => `
              <button class="btn btn-sm ${i === (opsState.paxIdx % PAX_COUNTER_DRILLS.length) ? 'btn-primary' : ''}" data-paxjump="${i}" style="justify-content:space-between;height:auto;padding:7px 10px;">
                <span class="ja" style="text-align:left;">${t(c.titleJa, c.titleVi, c.titleEn)}</span>
                <span class="badge badge-neutral">${c.badge}</span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    mount.querySelectorAll('[data-paxans]').forEach(b => {
      b.onclick = () => {
        const idx = Number(b.dataset.paxans);
        opsState.paxChosen = idx;
        if (px.opts[idx].ok) {
          opsState.paxScore = Math.min(PAX_COUNTER_DRILLS.length, opsState.paxScore + 1);
          a3dAudio.playChirp();
          if (opsState.paxScore > (appState.opsBestPaxCounter || 0)) { appState.opsBestPaxCounter = opsState.paxScore; saveState(); }
        } else {
          a3dAudio.playBeep(360, 0.2);
        }
        renderFieldDrillsModule();
      };
    });
    mount.querySelectorAll('[data-paxjump]').forEach(b => {
      b.onclick = () => { opsState.paxIdx = Number(b.dataset.paxjump); opsState.paxChosen = null; renderFieldDrillsModule(); };
    });
    const pxn = document.getElementById('pax-next');
    if (pxn) pxn.onclick = () => {
      if (opsState.paxIdx < PAX_COUNTER_DRILLS.length - 1) opsState.paxIdx += 1;
      else { opsState.paxIdx = 0; opsState.paxScore = 0; }
      opsState.paxChosen = null;
      renderFieldDrillsModule();
    };
  } else {
    const q = (opsState.dictQuery || '').trim().toLowerCase();
    const filtered = FULL_DICTIONARY.filter(d => (opsState.dictCat === 'all' || d.cat === opsState.dictCat) && (!q || d.ja.toLowerCase().includes(q) || d.kana.toLowerCase().includes(q) || d.en.toLowerCase().includes(q) || d.vi.toLowerCase().includes(q)));
    const cats = [
      ['all', t('すべて', 'Tất cả', 'All')],
      ['ramp', t('ランプ・GSE', 'Ramp/GSE', 'Ramp/GSE')],
      ['wb', 'W&B'],
      ['cargo', t('貨物・DGR', 'Cargo/DGR', 'Cargo/DGR')],
      ['pax', t('旅客', 'Hành khách', 'Pax')],
      ['safety', t('安全・NGO運転', 'An toàn / NGO', 'Safety / NGO')]
    ];
    mount.innerHTML = tabsHtml + `
      <div class="card">
        <div class="card-title"><span class="ja">${t('日・英・越 3言語航空専門辞典 (音声付)', 'Từ điển Hàng không 3 Ngôn ngữ Nhật–Anh–Việt (Phát âm)', 'Trilingual Aviation & NGO Dictionary (JA · EN · VI + Audio)')}</span><span class="badge badge-accent">${filtered.length}/${FULL_DICTIONARY.length}</span></div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
          <input type="text" id="ops-dict-search" value="${opsState.dictQuery}" placeholder="${t('日本語・読み・English・Tiếng Việt で検索…', 'Tìm kiếm tiếng Nhật, Kana, tiếng Anh, tiếng Việt…', 'Search Japanese, Kana, English, or Vietnamese…')}" style="flex:1;min-width:220px;padding:7px 10px;border:1px solid var(--border-strong);border-radius:6px;" />
          <div class="h-scroll-row" style="display:flex;gap:4px;flex-wrap:wrap;">${cats.map(([id, lbl]) => `<button class="btn btn-sm ${opsState.dictCat === id ? 'btn-primary' : ''}" data-dcat="${id}">${lbl}</button>`).join('')}</div>
        </div>
        <div class="table-wrap" style="max-height:520px;overflow-y:auto;">
          <table><thead><tr><th>日本語 / 読み</th><th>English</th><th>Tiếng Việt</th><th>🔊</th></tr></thead><tbody>
            ${filtered.map(d => `<tr><td><strong class="ja">${d.ja}</strong><div style="font-size:11px;color:var(--text-muted);">${d.kana}</div></td><td style="font-family:var(--font-mono);font-size:12px;">${d.en}</td><td>${d.vi}</td><td><button class="btn btn-sm" data-speak="${d.ja}">🔊</button></td></tr>`).join('')}
          </tbody></table>
        </div>
      </div>
    `;
    const inp = document.getElementById('ops-dict-search');
    if (inp) inp.oninput = () => { opsState.dictQuery = inp.value; const pos = inp.selectionStart; renderFieldDrillsModule(); const re = document.getElementById('ops-dict-search'); if (re) { re.focus(); try { re.setSelectionRange(pos, pos); } catch {} } };
    mount.querySelectorAll('[data-dcat]').forEach(b => { b.onclick = () => { opsState.dictCat = b.dataset.dcat; renderFieldDrillsModule(); }; });
    mount.querySelectorAll('[data-speak]').forEach(b => { b.onclick = () => speakJapaneseTerm(b.dataset.speak); });
  }

  mount.querySelectorAll('[data-ost]').forEach(b => { b.onclick = () => { opsState.subtab = b.dataset.ost; renderFieldDrillsModule(); }; });
}
