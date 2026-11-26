# T01 — Ngân hàng 60 câu hỏi 特定技能2号 (Gemini)

## Mục tiêu
Chặng ④ 特定技能2号 trong lộ trình hiện chỉ dùng lại câu hỏi của số 1. Cần **60 câu mới ở trình độ số 2** (trưởng ca / người phụ trách hiện trường), đủ 3 ngôn ngữ, đúng thực tế ngành mặt đất ở Nhật.

## Phạm vi file
- **Tạo mới:** `src/data/quizBankTg2.js`
- **Sửa nhẹ:** `src/modules/quizModule.js` — chỉ để gộp bộ câu mới vào danh sách câu hỏi và vào chủ đề `stage_tg2` (xem "Tích hợp").
- **Sửa:** `public/sw.js` — thêm file mới vào danh sách cache, tăng `CACHE_NAME` 1 bậc.
- Không sửa file nào khác.

## Định dạng (giống hệt `src/data/quizBank.js`)
```js
export const QUIZ_BANK_TG2 = [
  { id: 'T2Q001', topic: 'tg2_loadcontrol', level: 2,
    qJa: '...', qVi: '...', qEn: '...',
    optsJa: ['...', '...', '...', '...'], optsVi: [...], optsEn: [...],
    ans: 0,                       // chỉ số đáp án đúng (0–3)
    expJa: '...', expVi: '...', expEn: '...' },
];
```
- 4 lựa chọn mỗi câu, chỉ 1 đáp án đúng. **Phân bố đáp án đúng đều** giữa 0/1/2/3 (không dồn vào 0).
- Lựa chọn sai phải hợp lý (lỗi thường gặp thực tế), không lố bịch.
- Độ dài lựa chọn tương đương nhau — không để đáp án đúng luôn là câu dài nhất.

## Phân bổ 60 câu theo chủ đề (`topic`)
| topic | Số câu | Nội dung |
|---|---|---|
| `tg2_loadcontrol` | 12 | Load control: LIR / Loadsheet, LMC, NOTOC, trọng tâm %MAC, giới hạn tải sàn & khoang, ULD contour |
| `tg2_leadership` | 10 | Trách nhiệm người phụ trách (作業責任者): phân công, briefing, giám sát, báo cáo, đào tạo nhân viên mới |
| `tg2_safety_sms` | 10 | SMS, ヒヤリハット, báo cáo sự cố, phân tích nguyên nhân, biện pháp tái phát, FOD, an toàn sân đỗ |
| `tg2_irregular` | 10 | Vận hành bất thường: trễ chuyến, đổi tàu, chuyển hướng, AOG, hành lý thất lạc, xử lý khẩn cấp |
| `tg2_winter_wx` | 8 | 除雪・防除氷 (de/anti-icing, holdover time), giông sét (雷接近時の作業中断), gió mạnh |
| `tg2_dgr_advanced` | 10 | DGR nâng cao: kiểm tra chấp nhận, phân tách hàng không tương thích, NOTOC, sự cố rò rỉ, CAO |

## Yêu cầu nội dung
- Bám sát phạm vi **航空分野 特定技能評価試験（グランドハンドリング）2号** do **日本航空技術協会 (JAEA)** tổ chức, và quy định thực tế của các hãng / công ty handling Nhật. Tham khảo IATA AHM / DGR / IGOM cho phần quốc tế.
- Thuật ngữ tiếng Nhật đúng như dùng ngoài hiện trường (ví dụ ロードシート, 搭載指示書, 作業責任者, ヒヤリハット, 防除雪氷).
- Bản VI: tự nhiên, dễ hiểu cho người Việt đang làm ở Nhật; **giữ thuật ngữ tiếng Nhật quan trọng trong ngoặc** ở lần xuất hiện đầu (ví dụ "trưởng nhóm tác nghiệp (作業責任者)").
- Bản EN: tiếng Anh chuẩn ngành (IATA), **không có dấu tiếng Việt**.
- Mỗi giải thích (exp) 1–3 câu: vì sao đúng + vì sao lựa chọn sai nguy hiểm/sai.
- Không chắc về một con số/quy định → **không đưa vào câu hỏi**; ghi vào PR mục "Cần Claude xác minh".

## Tích hợp (trong `quizModule.js`)
1. `import { QUIZ_BANK_TG2 } from '../data/quizBankTg2.js';`
2. Gộp vào mảng câu hỏi tổng (`ALL_QUESTIONS`).
3. Trong `STAGE_TOPICS`, đổi `stage_tg2` thành: tất cả topic bắt đầu bằng `tg2_` **cộng** `cargo` và `wb`.
4. Thêm 6 topic mới vào `UNIFIED_TOPICS` với nhãn 3 ngôn ngữ.

## Tiêu chí nghiệm thu
- [ ] Đúng 60 câu, id `T2Q001`–`T2Q060`, không trùng id với bộ cũ.
- [ ] Mọi câu có đủ 12 trường văn bản (q/opts/exp × JA/VI/EN), `optsXx` đều 4 phần tử.
- [ ] Phân bố `ans`: mỗi giá trị 0/1/2/3 có từ 12 đến 18 câu.
- [ ] Không có ký tự tiếng Việt có dấu trong `qEn/optsEn/expEn`.
- [ ] Mở app → Lộ trình → ④ → "Thi thử Số 2 tổng hợp" hiện được câu mới, không lỗi console.
- [ ] PR có mục **Nguồn tham khảo** và mục **Cần Claude xác minh**.
