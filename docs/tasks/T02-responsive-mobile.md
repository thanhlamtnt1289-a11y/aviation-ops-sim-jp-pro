# T02 — Giao diện chuẩn iPhone / iPad (Antigravity)

## Mục tiêu
Người dùng chính học trên **iPhone và iPad** (PWA cài lên màn hình chính). Mọi màn hình phải dùng thoải mái trên điện thoại: không cuộn ngang, nút đủ to để bấm bằng ngón tay, chữ không bị cắt.

## Kích thước phải kiểm tra
| Thiết bị | Viewport (CSS px) |
|---|---|
| iPhone (dọc) | 390 × 844 |
| iPhone (ngang) | 844 × 390 |
| iPad (dọc) | 820 × 1180 |
| iPad (ngang) | 1180 × 820 |

## Phạm vi file
- **Chủ yếu:** `src/styles/app.css` (thêm/sửa media query).
- **Được sửa markup** (chỉ thêm class / wrapper, không đổi id, không đổi logic): `index.html`, `src/modules/*.js`.
- **Không sửa:** `src/three3d/*`, `src/data/*`, `src/engines/*`, `src/core/state.js`.

## Yêu cầu
1. **Thanh menu trái (lộ trình):** trên màn ≤ 900px chuyển thành ngăn kéo trượt từ trái (nút ☰ ở thanh trên), bấm ra ngoài thì đóng; chọn mục xong tự đóng.
2. **Không cuộn ngang** ở mọi module, mọi kích thước trên.
3. **Vùng bấm ≥ 44×44 px** cho mọi nút trên màn ≤ 900px (đặc biệt: nút tín hiệu Marshaller, nút tốc độ 3D, lựa chọn đáp án thi).
4. **Màn 3D (`airport3dModule`)** trên điện thoại:
   - Khung 3D chiếm toàn bộ chiều ngang, cao ≈ 56% màn hình; bảng bên phải xuống dưới khung 3D.
   - Thanh công cụ 3D: nếu không đủ chỗ thì cuộn ngang **bên trong thanh** (không đẩy cả trang).
   - Ở iPhone ngang: khung 3D tối đa chiều cao, các bảng ẩn sau nút "☰ Bảng điều khiển".
5. **Màn thi (`quizModule`):** câu hỏi và 4 lựa chọn đọc được không cần phóng to (chữ ≥ 16px trên điện thoại).
6. Tôn trọng **safe area** của iPhone (tai thỏ, thanh Home): `env(safe-area-inset-*)`.
7. Giữ nguyên quy tắc ngắt dòng: không cắt đôi một từ (đã có `word-break: keep-all` + `jaPhraseWrap.js`) — không được thêm `word-break: break-all` hay `overflow-wrap: anywhere`.
8. Giữ phong cách hiện tại: gọn, thẳng hàng, không thêm màu/hiệu ứng mới.

## Tiêu chí nghiệm thu
- [ ] Ảnh chụp **4 kích thước × 5 màn hình** (Trang chủ, Lộ trình mở chặng 2, Sân bay 3D, Thi thử, Xếp ULD) đính kèm PR.
- [ ] `document.documentElement.scrollWidth <= window.innerWidth` ở mọi màn hình + kích thước trên.
- [ ] Không lỗi console; `python3 scripts/build_singlefile.py` chạy OK; bản offline cũng đúng giao diện.
- [ ] Màn hình desktop (1440 × 900) **không thay đổi** so với trước (ảnh so sánh).
