# T04 — Cân độ dài phương án nhiễu (TG1 + NGO) (Gemini)

## Vì sao
Trong `QUIZ_BANK` (110 câu số 1) đáp án đúng là phương án **dài nhất ở 103/110 câu**, `NGO_DRIVING_QUIZ` là **43/50 câu**. Người học chỉ cần chọn câu dài nhất là đúng → đề mất giá trị. (Vị trí A/B/C/D đã được app tự xáo, task này **không** cần đổi `ans`.)

## Phạm vi file
- Chỉ sửa chuỗi trong `optsJa` / `optsVi` / `optsEn` của `src/data/quizBank.js` và `NGO_DRIVING_QUIZ` trong `src/data/centrairNgo.js`.
- **Không** đổi `id`, `ans`, `topic`, `visual`, đề bài, giải thích, và **không đổi nội dung phương án đúng** (chỉ được rút gọn câu chữ nếu giữ nguyên nghĩa).

## Bước làm
1. Với mỗi câu: viết lại 3 phương án sai cho **dài tương đương** phương án đúng (chênh tối đa ~1.5 lần), cùng văn phong, cùng mức chi tiết — sai ở **một điểm nghiệp vụ cụ thể** (con số, thứ tự bước, người chịu trách nhiệm…), không sai lộ liễu.
2. Nếu phương án đúng quá dài (> 60 ký tự JA), được rút gọn câu chữ, giữ đủ các ý.
3. Làm đủ 3 ngôn ngữ, cùng thứ tự.
4. Không bịa số liệu mới làm đáp án đúng; số liệu trong phương án sai phải sai rõ so với đáp án.

## Tiêu chí nghiệm thu
- [ ] Đáp án đúng là phương án dài nhất ở **≤ 30%** số câu mỗi ngân hàng, ở cả JA/VI/EN.
- [ ] `ans`, `id`, đề bài, giải thích không đổi (diff chỉ chạm vào opts*).
- [ ] `node --check` OK; `python3 scripts/build_singlefile.py` OK.
- [ ] PR có bảng thống kê trước/sau (số câu "đáp án dài nhất" theo từng ngôn ngữ).
