# T03 — Rà soát thuật ngữ 3 ngôn ngữ toàn app (Gemini)

## Mục tiêu
Cùng một khái niệm đang được dịch nhiều kiểu khác nhau giữa các module (ví dụ "dẫn tàu" / "điều hướng máy bay" / "hướng dẫn đỗ"). Cần **một bảng thuật ngữ chuẩn** và áp dụng thống nhất, để người học không bị rối.

## Phạm vi file
- **Tạo mới:** `docs/glossary.md` — bảng thuật ngữ chuẩn.
- **Được sửa nội dung chuỗi (chỉ văn bản trong `t()/bi()` và các trường Ja/Vi/En):** `src/data/*.js`, `src/modules/*.js`, `src/core/roadmap.js`.
- **Không đổi** id, key, logic, cấu trúc dữ liệu, tọa độ.

## Bước làm
1. Quét toàn bộ chuỗi hiển thị trong phạm vi trên, gom các khái niệm nghiệp vụ xuất hiện ≥ 2 lần.
2. Lập `docs/glossary.md`, mỗi dòng: **JA chuẩn | VI chuẩn | EN chuẩn | ghi chú** (ví dụ `マーシャラー | Marshaller (người dẫn tàu) | Marshaller | ...`). Ít nhất **120 thuật ngữ**, nhóm theo: Sân đỗ & an toàn · Máy bay & cửa · GSE · Hàng hóa & ULD · W&B · Hành khách · Lái xe NGO · Bộ đàm.
3. Ưu tiên cách gọi **thực tế ngoài hiện trường ở Nhật** (người Việt làm ở sân bay Nhật thường giữ nguyên katakana/kanji: "PBB", "トーイングトラクター (TT)", "ULD"...). Bản VI nên giữ thuật ngữ Nhật trong ngoặc ở lần đầu.
4. Sửa các chuỗi trong app cho khớp bảng. Mỗi thay đổi phải giữ đúng nghĩa câu.
5. Kiểm tra lại: không còn tiếng Việt có dấu trong trường EN; không còn lời gọi `t()` thiếu tham số.

## Tiêu chí nghiệm thu
- [ ] `docs/glossary.md` ≥ 120 thuật ngữ, có đủ 3 cột ngôn ngữ.
- [ ] PR liệt kê **bảng thay đổi**: file · chuỗi cũ → chuỗi mới (tối đa 300 dòng; dài hơn thì đính kèm file CSV).
- [ ] Không đổi id/logic (diff chỉ chạm vào chuỗi văn bản).
- [ ] `node --check` mọi file .js đã sửa: OK; build offline OK; không lỗi console ở 3 ngôn ngữ.
- [ ] Mục **Cần Claude xác minh** cho những thuật ngữ không chắc.
