# AGENTS.md — Quy tắc chung cho mọi AI agent (Google Antigravity, Gemini, Claude)

Dự án: **Aviation Ops Sim JP Pro** — app mô phỏng đào tạo nghiệp vụ mặt đất hàng không Nhật (NGO Centrair), JA / VI / EN, chạy 100% offline.

## Vai trò

| Agent | Vai trò |
|---|---|
| **Claude** (đầu não) | Thiết kế, viết đặc tả công việc trong `docs/tasks/`, review mọi Pull Request, quyết định gộp vào `main`. |
| **Google Antigravity** | Làm các task **code** khối lượng lớn theo đặc tả (giao diện, responsive, refactor có phạm vi rõ). |
| **Gemini** | Làm các task **nội dung** khối lượng lớn theo đặc tả (câu hỏi thi, dịch 3 ngôn ngữ, giải thích, rà soát thuật ngữ). |

## Quy trình bắt buộc (mọi agent)

1. Đọc `CLAUDE_COWORK_BRIEF.md` (kiến trúc, hệ tọa độ 3D, quy chuẩn) và đặc tả task `docs/tasks/<ID>.md` **trước khi sửa bất cứ thứ gì**.
2. Tạo nhánh mới từ `main`: `agent/<ID>-<mo-ta-ngan>` (ví dụ `agent/T01-tg2-questions`). **Không bao giờ commit thẳng vào `main`.**
3. Chỉ sửa đúng các file mà đặc tả cho phép (mục "Phạm vi file"). Cần sửa thêm file khác → ghi lý do trong PR.
4. Chạy kiểm tra trước khi mở PR:
   ```bash
   node --check <mỗi file .js đã sửa>
   python3 scripts/build_singlefile.py
   ```
5. Mở Pull Request vào `main`, tiêu đề `[<ID>] <tên task>`, mô tả theo mẫu trong `docs/tasks/README.md` (có checklist và ảnh chụp nếu đổi giao diện).
6. **Không tự merge.** Claude review rồi mới gộp.

## Quy chuẩn kỹ thuật (tóm tắt — chi tiết trong `CLAUDE_COWORK_BRIEF.md`)

- **3 ngôn ngữ:** mọi chuỗi hiển thị dùng `t(ja, vi, en)` hoặc `bi(ja, vi, en)` đủ 3 tham số. Không để chữ tiếng Việt lọt vào trường EN.
- **Offline 100%:** không thêm `<script>`/`fetch()`/font/ảnh từ CDN hay API ngoài. Mọi asset nằm trong `src/` hoặc `vendor/`.
- **Vanilla ES Modules + Three.js** — không thêm framework, không thêm dependency npm.
- **3D:** máy bay chỉ tạo qua `createFleetAircraft3D()`, xe GSE chỉ tạo qua `buildGse()` (`src/three3d/gseLibrary3D.js`). Không đổi tọa độ NGO trừ khi đặc tả yêu cầu (phải đồng bộ `airports.js` ↔ `airport3dModule.js` ↔ `AirportScene3D.js`).
- **Giao diện:** gọn, thẳng hàng; không cắt đôi một từ khi xuống dòng (tiếng Nhật đã có `src/core/jaPhraseWrap.js`); phần nâng cao gắn class `pro-only`.
- **Nội dung chuyên môn:** phải đúng quy định thực tế ở Nhật. Ghi nguồn tham khảo cho từng nhóm nội dung trong PR. Không chắc → ghi `TODO(verify)` thay vì bịa.
- Khi thay đổi danh sách file JS hoặc cache: tăng `CACHE_NAME` trong `sw.js` (thư mục gốc).
