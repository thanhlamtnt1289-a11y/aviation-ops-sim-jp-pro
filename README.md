# Aviation Ops Sim JP Pro (Vite + Three.js PBR + PWA)

Ứng dụng mô phỏng nghiệp vụ mặt đất & ôn thi **特定技能 Hàng không (Ground Handling)** tại Nhật Bản — kiến trúc module hiện đại với **Three.js PBR + Shadow Maps + UnrealBloom**, **Click tương tác 3D (Raycasting)**, **Split-Screen W&B × 3D**, **Dashboard Trang chủ**, **Command Palette (`Ctrl+K` / `⌘K`)** và **PWA chạy Offline**.

> **Lưu ý:** Toàn bộ thông số tàu bay, hiệu năng cất cánh và sân bay là **dữ liệu mô phỏng dùng cho đào tạo**, tuyệt đối không sử dụng cho vận hành bay thực tế.

## 1. Cách chạy nhanh trên máy tính (1 chạm)
- **Cách 1 (Không cần cài Node.js — chạy ngay trên macOS):**
  - Nhấp đúp file `start-local.command` hoặc chạy:
    ```bash
    cd /Users/dothanhlam/.gemini/antigravity/scratch/aviation-ops-sim-jp-pro
    python3 -m http.server 8080
    ```
  - Mở `http://localhost:8080` trên Chrome/Safari/Edge (trình duyệt sẽ tự cache toàn bộ app + Three.js qua Service Worker để dùng offline từ lần sau).
- **Cách 2 (Dùng Vite + Node.js — đóng gói bản production):**
  ```bash
  npm install
  npm run dev      # Chạy local tại http://localhost:5173
  npm run build    # Xuất thư mục dist/ sẵn sàng deploy
  ```

## 2. Cài thành App trên iPad / iPhone / Mac (PWA)
1. Deploy thư mục dự án (hoặc `dist/`) miễn phí lên **Cloudflare Pages**, **Netlify**, hoặc **GitHub Pages**.
2. Mở link trên Safari (iPad/iPhone) → bấm **Share → Add to Home Screen** (hoặc nút **Install App** trên Chrome).
3. Từ đó mở 1 chạm như ứng dụng gốc, chạy mượt kể cả khi không có mạng!

## 3. Phím tắt truy cập nhanh
- **`⌘K` / `Ctrl+K`**: Mở Command Palette tìm kiếm nhanh mọi module, 10 máy bay, 14 kịch bản, 5 sân bay, 66 thuật ngữ.
- **`1–9, 0`** (trong Sân bay 3D): Chuyển nhanh 10 góc nhìn POV (Phi công, Đài không lưu, Marshaller, Headset Man, Loadmaster, Sky Deck, Cabin GSE...).
- **`W A S D` / Phím mũi tên + `Space`**: Lái xe GSE & Phanh kiểm tra (Brake Check).
- **Deep Links URL**: `#dashboard`, `#wb/B77F`, `#wb/S12`, `#3d/CTS`, `#quiz`, `#ops/dict`.
