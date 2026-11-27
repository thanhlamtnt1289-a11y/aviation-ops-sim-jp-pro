# T02 — Viết lại giao diện cho iPhone / iPad: dễ nhìn, dễ bấm (Antigravity)

## Mục tiêu
Người dùng chính học trên **iPhone và iPad** (PWA cài lên màn hình chính). Viết lại lớp giao diện theo hướng **mobile-first**: chữ to, rõ, ít chữ trên một màn, nút to bấm bằng ngón cái, không cuộn ngang, bố cục gọn và thẳng hàng.

## Hiện trạng đo được (Claude đo bằng Playwright, 2026-11-27)
| Lỗi | Số liệu |
|---|---|
| Trang rộng hơn màn hình iPhone | viewport 390px nhưng trang rộng **524px** → iOS tự thu nhỏ cả trang, mọi chữ bé đi |
| Thanh trên (tìm kiếm · Sáng/Tối · JA/VI/EN) | bị tràn: nút ☰ bị cắt, nút ngôn ngữ VI/EN nằm ngoài màn hình, không thấy tiêu đề màn |
| Vùng bấm < 40px | **80–90% số nút** ở mọi module (vd. Thi: 46/55, W&B: 59/64, 3D: 50/55) |
| Chữ < 13px | W&B 167 chỗ, Turnaround 68, Cargo 62, 3D 37, Thi 35, Dashboard 30 |
| Màn 3D | nhãn HUD đè lên nhau, thanh công cụ 2 hàng chiếm chỗ, khung 3D bị bóp |
| Thi | nhóm chủ đề chiếm hết màn đầu tiên, phải cuộn mới tới câu hỏi |

## Kích thước phải kiểm tra
| Thiết bị | Viewport (CSS px) |
|---|---|
| iPhone SE | 375 × 667 |
| iPhone 15 (dọc / ngang) | 390 × 844 / 844 × 390 |
| iPhone 15 Pro Max | 430 × 932 |
| iPad (dọc / ngang) | 820 × 1180 / 1180 × 820 |

## Phạm vi file
- **Chủ yếu:** `src/styles/app.css` — được tái cấu trúc lại phần responsive; nên tách phần mobile ra `src/styles/mobile.css` (nhớ thêm vào `index.html`, `public/sw.js` và tăng `CACHE_NAME`).
- **Được sửa markup / JS giao diện** (thêm class, wrapper, nút bật/tắt; không đổi id, không đổi logic nghiệp vụ): `index.html`, `src/main.js`, `src/core/roadmap.js`, `src/modules/*.js`.
- **Không sửa:** `src/three3d/*`, `src/data/*`, `src/engines/*`, `src/core/state.js` (trừ khi thêm 1 cờ giao diện), nội dung câu hỏi.

## Thiết kế yêu cầu

### 1. Khung chung (≤ 900px)
- `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`. Không phần tử nào được có `min-width` cố định lớn hơn màn.
- **Thanh trên gọn 1 hàng, cao 52px:** ☰ · tiêu đề màn (rút gọn, 1 dòng, cắt bằng `…` cả cụm từ) · nút 🔍 · nút 🌐 mở menu nhỏ (JA/VI/EN + Sáng/Tối). Bỏ ô tìm kiếm dài trên điện thoại.
- **Thanh tab dưới (bottom tab bar), cao 56px + safe area:** 5 mục `Lộ trình · 3D · Thi · Xếp hàng · Thêm`. Mục "Thêm" mở danh sách các module còn lại.
- Menu lộ trình bên trái thành **ngăn kéo trượt** (nút ☰). Bấm ra ngoài thì đóng, chọn mục xong tự đóng.
- iPad dọc: dùng ngăn kéo như điện thoại nhưng nội dung 2 cột khi hợp lý. iPad ngang (≥ 1024px): giữ thanh bên như desktop.

### 2. Chữ và khoảng cách
- Chữ thân **16px** trên điện thoại (tối thiểu 14px cho chú thích phụ, **không chỗ nào < 12px**). Tiêu đề màn 18–20px. Line-height 1.55 cho JA/VI.
- Lề 16px hai bên, khoảng cách các thẻ 12px. Mỗi thẻ (card) một cột.
- Bảng dữ liệu rộng (W&B, Turnaround): đặt trong khung cuộn ngang riêng **bên trong thẻ**, cột đầu dính (sticky), không đẩy cả trang.
- Giữ quy tắc ngắt dòng: **không cắt đôi một từ** (đã có `word-break: keep-all` + `jaPhraseWrap.js`) — cấm thêm `word-break: break-all` / `overflow-wrap: anywhere`.

### 3. Nút và vùng bấm
- **Mọi** nút, lựa chọn, chip chủ đề: vùng bấm **≥ 44 × 44px**, cách nhau ≥ 8px.
- Nhóm nút nhiều (chip chủ đề, nút tín hiệu, nút tốc độ) → 1 hàng cuộn ngang có snap, hoặc gom vào menu thả xuống.

### 4. Màn Thi (`quizModule`)
- Màn đầu là **câu hỏi**, không phải danh sách chủ đề: chủ đề đưa vào 1 nút "📚 Chủ đề: …" mở bảng chọn (bottom sheet).
- Câu hỏi 17px, 4 lựa chọn là thẻ to cao ≥ 52px, chữ 16px. Nút "Câu trước / Câu tiếp" dính đáy màn, ngón cái bấm được.
- Thi bấm giờ: đồng hồ + tiến độ dính trên cùng.

### 5. Màn 3D (`airport3dModule`)
- iPhone dọc: khung 3D rộng 100%, cao ≈ 58% màn; HUD chỉ giữ 1 dòng trạng thái (pha · tốc độ) — các nhãn khác ẩn sau nút ⓘ. Thanh công cụ còn 1 hàng icon (▶ · tốc độ · 🎥 Góc nhìn · 🗺 · ⚙), các bảng chi tiết xuống dưới dạng thẻ gập/mở.
- iPhone ngang: 3D toàn màn, thanh công cụ nổi mờ ở mép dưới, bảng ẩn sau nút ☰.
- Bản đồ nhỏ (minimap) trên điện thoại: mặc định tắt, bật bằng nút 🗺.

### 6. Các module khác
- Dashboard/Lộ trình: mỗi chặng 1 thẻ to (số chặng, tên, % tiến độ, nút "Tiếp tục").
- Xếp ULD, W&B, Turnaround: bảng điều khiển xuống dưới khung hình 3D/biểu đồ, thao tác chính luôn nhìn thấy.
- Marshaller/Ops: nút tín hiệu dạng lưới 2–3 cột, mỗi nút ≥ 64px có icon + chữ.

### 7. Chung
- Tôn trọng safe area (tai thỏ, thanh Home): `env(safe-area-inset-*)`.
- Giữ phong cách hiện tại (màu, font, bo góc): gọn, thẳng hàng, **không thêm màu hay hiệu ứng mới**. Cả chế độ Sáng và Tối phải đủ tương phản (chữ phụ tối thiểu 4.5:1).
- Desktop 1440 × 900 **không thay đổi**.

## Tiêu chí nghiệm thu
- [ ] Ở mọi kích thước trên và mọi module: `document.documentElement.scrollWidth <= window.innerWidth`.
- [ ] Ở iPhone 390 × 844: ≥ 95% nút có vùng bấm ≥ 44px; không có chữ hiển thị < 12px; chữ thân ≥ 16px.
- [ ] Ảnh chụp **iPhone dọc, iPhone ngang, iPad dọc × 6 màn** (Lộ trình, Sân bay 3D, Thi luyện tập, Thi bấm giờ, Xếp ULD, W&B) đính kèm PR, kèm ảnh desktop trước/sau để chứng minh không đổi.
- [ ] Không lỗi console ở JA/VI/EN; `python3 scripts/build_singlefile.py` chạy OK; bản offline cũng đúng giao diện.
- [ ] PR có mục **Cần Claude xác minh** cho chỗ nào phải đổi markup trong module.
