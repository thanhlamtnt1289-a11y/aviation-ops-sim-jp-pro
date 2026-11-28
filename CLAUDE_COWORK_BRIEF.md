# Aviation Ops Sim JP Pro — Tài liệu Bàn giao & Đặc tả Kỹ thuật cho Claude Cowork

> **Mục đích:** Tài liệu này cung cấp toàn bộ ngữ cảnh kiến trúc, hệ tọa độ 3D, quy chuẩn đào tạo hàng không Nhật Bản (JEAE / NGO Chubu Centrair), quy tắc đa ngôn ngữ (`JA / VI / EN`) và quy trình build offline để **Claude Cowork** có thể đọc hiểu ngay và chỉnh sửa dự án chính xác mà không làm hỏng hệ thống.

---

## 1. Thông tin Tổng quan Dự án

- **Tên dự án:** Aviation Ops Sim JP Pro (`aviation-ops-sim-jp-pro`)
- **Mục tiêu:** Ứng dụng mô phỏng đào tạo nghiệp vụ mặt đất hàng không Nhật Bản (SSW Ground Handling, Weight & Balance, ULD Buildup, DGR, Lái xe sân đỗ chuẩn Chubu Centrair NGO / RJGG và Turnaround 3D tại 5 sân bay lớn Nhật Bản: `NGO`, `HND`, `NRT`, `KIX`, `CTS`).
- **Kiến trúc kỹ thuật:**
  - **100% Vanilla ES Modules + Three.js PBR** (không phụ thuộc framework nặng hay CDN bên ngoài).
  - Hoạt động ở **2 chế độ song song**:
    1. **PWA Web App (`index.html` + `src/` + `sw.js` (thư mục gốc))** — triển khai tự động lên GitHub Pages qua `.github/workflows/`.
    2. **100% Offline Single-File (`offline-singlefile.html`)** — nhúng toàn bộ 26 ES modules, CSS, Three.js (`vendor/three.module.min.js`) và 4 model máy bay `.glb` (`vendor/models/*.glb`) vào duy nhất 1 file `.html` để mở trực tiếp không cần Internet hay server.

---

## 2. Cấu trúc Thư mục & Vai trò từng File

### File gốc
- `index.html` — Điểm vào chính của PWA, khai báo font chữ và load `src/main.js`.
- `offline-singlefile.html` — Bản đóng gói offline 1 file duy nhất (~3.96 MB), **bắt buộc phải build lại** sau mỗi lần sửa code bằng `python3 scripts/build_singlefile.py`.
- `scripts/build_singlefile.py` — Script Python tự động đóng gói toàn bộ `src/`, `vendor/`, `public/` thành `offline-singlefile.html`.
- `sw.js` (thư mục gốc) — Service Worker cache tài nguyên offline (`CACHE_NAME = 'aviation-ops-sim-jp-pro-v21'`, cần tăng version `v22`, `v23`... khi cập nhật).

### Lõi ứng dụng (`src/core/`, `src/engines/`, `src/main.js`)
- `src/main.js` — Khởi tạo app, điều hướng các module/tab, thanh chuyển đổi 3 ngôn ngữ (`JA` / `VI` / `EN`), Command Palette.
- `src/core/state.js` — Quản lý trạng thái toàn cục (`appState`), lưu `localStorage`, hàm dịch 3 ngôn ngữ **`t(ja, vi, en)`** và song ngữ **`bi(ja, vi, en)`**.
- `src/core/commandPalette.js` — Phím tắt / tìm kiếm nhanh các tính năng.
- `src/core/roadmap.js` — **Menu theo lộ trình thi** (`ROADMAP`): ① 特定技能1号 → ② GSE運転許可 (NGO) → ③ 搭載・ULD → ④ 特定技能2号, mỗi mục trỏ tới module + tab con / chủ đề thi. Cấp độ `appState.userLevel` = `basic` (Người mới, ẩn các phần tử `.pro-only`) / `pro` (đầy đủ).
- `src/core/jaPhraseWrap.js` — Ngắt dòng tiếng Nhật theo cụm từ (dùng `Intl.Segmenter`, chèn `<wbr>`), kết hợp `word-break: keep-all` trong `app.css` để không bao giờ cắt đôi một từ (VD: `シミ / ュレーション`). Tự chạy cho mọi nội dung render mới qua `MutationObserver`; thêm class `no-phrase-wrap` để bỏ qua một vùng.
- `src/engines/wbEngine.js` — Động cơ tính toán Weight & Balance (`calculateWB`, giới hạn `PAX_ZONE`, `ULD_POS`, `HOLD`, `MZFW/MTOW/MLW`, `%MAC`, hậu quả mất cân bằng & gợi ý điều chỉnh).
- `src/engines/audioEngine.js` — Âm thanh cảnh báo, còi, va chạm tổng hợp bằng Web Audio API (offline 100%).

### Cơ sở dữ liệu đào tạo & Địa lý (`src/data/`)
- `src/data/aircraft.js` — Hồ sơ 10 dòng tàu bay (B789, B77W, B77F, A359, A321, A320, B738, B763, DHC8...) + 14 tình huống W&B (`WB_SCENARIOS`).
- `src/data/airport_geo_data.js` — Tọa độ địa lý chuẩn WGS84 (`Lat/Lon/Alt`) và hàm `convertAirportToCartesian()` đổi sang mét 3D cho 5 sân bay: `NGO`, `HND`, `NRT`, `KIX`, `CTS`.
- `src/data/airports.js` — Dữ liệu chi tiết 1:1 mét của sân bay **Chubu Centrair (NGO / RJGG)**: `A3D_SPOTS`, `A3D_OBSTACLES`, `A3D_FACILITIES`, `A3D_MISSIONS`, `evaluateAirportZone()`, `A3D_FLIGHT_PHASES` (10 pha), `computeFlightCyclePose()`, `A3D_VIEWPOINTS` (11 góc camera), `computeViewpointCamera()`, `TA_EVENTS`, `PAX_SCENARIOS`, `DGR_CASES`, `ULD_CATALOG`.
- `src/data/centrairNgo.js` — Bộ dữ liệu & **50 câu hỏi thi lái xe sân bay NGO** (`JA / VI / EN`).
- `src/data/quizBank.js` — **110 câu hỏi thi SSW Hàng không Nhật Bản (`Q01`–`Q110`)** đầy đủ `qJa/qVi/qEn`, `optsJa/optsVi/optsEn`, `expJa/expVi/expEn`.
- `src/data/dictionary.js` — Từ điển thuật ngữ mặt đất, tín hiệu Marshaller (`OPS_MARSHALLING_SIGNALS`) và các bước Pushback (`OPS_PUSHBACK_STEPS`).

### Mô-đun giao diện (`src/modules/`)
- `src/modules/dashboard.js` — Tổng quan & tiến độ học tập.
- `src/modules/airport3dModule.js` — Module 3D Chubu Centrair (Flight 10 pha, Drive TT/Xe đầu kéo lùi chuồng `SC1–SC5`, Ops3D click trực tiếp FOD/PBB/Loader, minimap 1:1).
- `src/modules/wbModule.js` — Thực hành Weight & Balance.
- `src/modules/uldBuildupModule.js` — Thực hành xếp hàng ULD (AKE, AKH, PMC, PLA, PGA; hàng nhẹ xếp tay vs hàng nặng dùng Forklift + ván Spreader + đo Contour).
- `src/modules/opsModules.js` — Turnaround Simulator 5 sân bay (`TurnaroundScene3D`), kiểm tra DGR, An toàn sân đỗ.
- `src/modules/fieldDrillsModule.js` — Thực hành Marshaller, Pushback, Hành khách & Hành lý.
- `src/modules/quizModule.js` — Hệ thống thi thử 160 câu (`JA / VI / EN`).

### Engine 3D Three.js (`src/three3d/` & `vendor/`)
- `src/three3d/AirportScene3D.js` — Cảnh 3D tỷ lệ 1:1 đảo Chubu Centrair NGO (`4.370m × 1.920m`), đường băng `3.500m × 60m`, Center Pier 300m, T1/T2/Cargo/Fire/Fuel Farm/Coast Guard, cầu Skyway 2,5km và hệ thống giao thông đa làn đồng bộ (A-TWY/C-TWY jets, GSE Spine Road 2 làn trái đường, Behind-Stand Road, Perimeter 40km/h, tàu Meitetsu μ-SKY).
- `src/three3d/TurnaroundScene3D.js` — Cảnh 3D Turnaround cho 5 sân bay `NGO/HND/NRT/KIX/CTS` với ERA cánh chim hở đuôi (Open-back Wing-Hugging Red ERA), ESA nét đứt trắng, 4 hố kỹ thuật sân đỗ, xe GSE có nâng hạ/chân chống/ống nối thật và giao thông nền.
- `src/three3d/aircraft_3d_models.js` — Nạp và gắn livery ANA/JAL lên các model GLB (`B787`, `A350`, `A320`, `B737`) + hiệu ứng Jet Blast Hazard Zone.
- `src/three3d/aircraftBuilder3D.js` — Dựng tàu bay cánh quạt `DHC8` (loại duy nhất không có model GLB).
- `src/three3d/gseLibrary3D.js` — **Thư viện GSE dùng chung cho cả 2 cảnh 3D** (`buildGse(kind, targetHeightY, extra)`): stairs, catering, cabinClean, highloader, lowloader, mdl (main-deck loader tàu hàng), belt, fuel, gpu, lav, water, tug, dolly_train, uld_dolly, tractor, ramp_bus, patrol_suv, deice, forklift, cargo_truck. Cùng bảng màu (thân trắng + dải navy + bộ phận nâng vàng an toàn + gầm tối + đèn xoay vàng), cùng cabin, bánh xe, kích thước thật.
- `src/three3d/crewBuilder3D.js` — Nhân vật 3D có khớp tay chân (`marshaller`, `watchman`, `headset`, `loadmaster`, `fueler`, `spotter`, `guideman`) + xe kéo `TT mui trần` (`createOpenCabTowingTractor3D`) và xe dolly hành lý.

---

## 3. Quy chuẩn Bắt buộc khi Claude Cowork Chỉnh sửa

1. **Hệ tọa độ 3D Chubu Centrair NGO (`AirportScene3D.js` ↔ `airports.js` ↔ `airport3dModule.js`):**
   - `-X` = Hướng Nam (`RWY 36` threshold, T2 LCC, Flight of Dreams, Sky Expo).
   - `+X` = Hướng Bắc (`RWY 18` threshold, Cargo `#101–#119`, Trạm cứu hỏa ARFF, Kho xăng, Hải cảnh `N1–N6`).
   - `-Z` = Hướng Tây (Vịnh Ise, Đường vành đai `z = -685`, `RWY 36/18` dài `3.500m` tại `z = -580`, `A-TWY -415`, `B-TWY -335`, `C-TWY -235`).
   - `+Z` = Hướng Đông (Nhà ga T1, Tháp ATC `(-146, 227)` cao `86.75m`, Access Plaza, Cầu Skyway `2,5km`).
   - **Mũi Center Pier 300m** nằm tại `x = 46` (`x ∈ [28, 64]`), vươn tới `z = -180` (cách đường băng `z = -580` đúng `400m`).
   - Nếu thay đổi vị trí vật cản, đường, Spot hay Bay 01 (`(218, 26)`), **phải cập nhật đồng bộ cả 3 file**: `airports.js`, `airport3dModule.js` và `AirportScene3D.js`.

2. **Quy tắc Đa ngôn ngữ (`JA / VI / EN`):**
   - Mọi chuỗi hiển thị mới hoặc sửa đổi **bắt buộc dùng đủ 3 tham số** `t(ja, vi, en)` hoặc `bi(ja, vi, en)` — tuyệt đối không viết dạng 2 tham số `t(ja, vi)`.
   - Khi thêm câu hỏi/tình huống mới, phải có đủ cả 3 ngôn ngữ (`Ja`, `Vi`, `En`) và đảm bảo không để lọt dấu tiếng Việt vào trường tiếng Anh.

3. **Quy chuẩn Bố cục & Ngắt dòng:**
   - Không dùng `text-overflow: ellipsis` cho tên mục menu — cho xuống tối đa 2 dòng.
   - Thẻ `.card` đặt trong lưới/flex có `gap` không được có `margin-top` (đã có rule chung trong `app.css`) để các thẻ luôn thẳng hàng.
   - Không đặt `overflow-wrap: anywhere` cho văn bản tiếng Nhật (gây cắt giữa từ).

4. **Quy chuẩn Đồ họa 3D (đồng bộ máy bay / GSE / camera):**
   - Mọi máy bay tạo qua `createFleetAircraft3D(profileId, liveryId)` (`aircraft_3d_models.js`) → cùng model GLB + shader livery, kích thước thật 1:1 theo từng loại (A320, A321, B738, E190, B788, B789, B763, A359, B77W, B77F). Không dùng `createDetailedAirliner3D` trực tiếp (chỉ dành cho DHC8).
   - Mọi xe GSE tạo qua `buildGse()` trong `gseLibrary3D.js`. Không tự dựng xe bằng BoxGeometry riêng lẻ.
   - Spot 7 (`AirportScene3D._computeSpot7Layout`): vị trí xe, nhân viên, chèn bánh, cọc tiêu, PBB **tính từ attach points cửa thật** của máy bay đang chọn — không ghi số cứng. Máy bay thân rộng tại Spot 7 được thu nhỏ vừa đủ để đầu cánh cách tường Center Pier ≥ 5m (ngoại lệ duy nhất của 1:1).
   - Camera (`computeViewpointCamera` + rig trong `renderFrame`): góc POV đặt tại đầu nhân vật 3D thật và luôn nhìn vào máy bay; chuyển góc dùng blend 0,6s (xa > 450m thì cắt thẳng); damping theo thời gian thực.

5. **Bản đồ NGO (dữ liệu dùng chung):**
   - Tháp ATC **Đông Bắc T1** tại `(330, 175)` (Centrair Tower 118.85).
   - Khu cargo phía Bắc: mảng `NGO_CARGO_DISTRICT` trong `airports.js` là nguồn duy nhất cho cảnh 3D, `A3D_OBSTACLES` (va chạm) và minimap. Cảnh Turnaround dùng cùng vị trí (quy đổi: `along = x − 46`, `rightM = z + 580`).

6. **Giao diện theo cấp độ & chuyển động thật:**
   - Thêm tính năng mới vào đúng chặng trong `ROADMAP`; mục nâng cao gắn `pro: true`. Phần tử giao diện nâng cao dùng class `pro-only`.
   - Màn 3D: nút phụ đặt trong ngăn "Góc nhìn" / "Cài đặt"; bảng bên phải dùng `panel(id, title, body, open)` (thu gọn được, nhớ trạng thái).
   - Chuyển động máy bay dùng `NGO_MOTION` (`airports.js`): đường taxi theo taxiway thật có cung rẽ, tốc độ thật (taxi ~18kt, rẽ ~10kt, vào spot đi bộ, pushback ~4km/h); thời lượng pha tự tính (1x = thời gian thật).
   - Tập dẫn tàu (`startMarshalDrill`): máy bay phản ứng theo tín hiệu tay; chấm điểm theo vạch dừng chữ T của từng loại máy bay.

7. **Chuẩn 100% Offline Single-File:**
   - Không thêm `<script>` hay `fetch()` từ CDN/API bên ngoài.
   - Mọi asset/model phải nằm trong `src/` hoặc `vendor/`.
   - Sau khi sửa xong, **luôn chạy lệnh build và kiểm tra**:
     ```bash
     python3 scripts/build_singlefile.py
     ```
   - Nếu thay đổi danh sách file JS hoặc cần làm mới cache PWA, tăng số phiên bản `CACHE_NAME` trong `sw.js` (thư mục gốc).

---

## 5. Nhật ký Chỉnh sửa

- **2026-11-26:** Ngắt dòng tiếng Nhật theo cụm từ trên toàn app; menu trái hiện đủ tên (2 dòng, bỏ "…"); sửa thẻ bị lệch hàng (Dashboard, Light Gun…); dịch 3 nút camera ULD còn cứng tiếng Nhật; bỏ chữ Việt trong chuỗi JA ở module 3D; sửa chú thích tọa độ BAY 01 cũ `(192, 26)` → `(218, 26)`; bổ sung font hệ thống dự phòng khi offline; `CACHE_NAME` → `v19`; build lại `offline-singlefile.html`.

- **2026-11-27:** Thư viện GSE thống nhất `gseLibrary3D.js` (thay 3 bộ dựng cũ); mọi máy bay dùng chung model GLB + livery, đúng kích thước từng loại (thêm A320, E190, B788, B763, A359, B77F tàu hàng không cửa sổ); vị trí GSE/nhân viên/chèn bánh/cọc tiêu/PBB ở Spot 7 tính theo cửa thật; viết lại camera (POV gắn nhân vật, chuyển góc mượt, sửa xoay vòng ở Turnaround, Sky Deck không bị mái che, mây mềm hơn); dời tháp ATC sang Đông Bắc T1, sửa tần số Tower 118.85; dựng khu cargo thật (第1・第2・第3国際貨物上屋, 国内エアライン上屋, 国内フォワーダー上屋, 燻蒸施設, 貨物事務棟, トラック待機場, 北ゲート, mái che 20m, làn 無ナンバー車両通行帯, tàu hàng #103 với main-deck loader); đồng bộ cảnh Turnaround; `CACHE_NAME` → `v20`.

- **2026-11-27 (2):** Menu theo lộ trình thi 4 chặng + chế độ Người mới/Pro; trang chủ thành bản đồ lộ trình; màn 3D gọn (thanh công cụ, ngăn Góc nhìn/Cài đặt, bản đồ nhỏ bật/tắt, bảng thu gọn); góc "Sau lưng Marshaller" + chế độ tập dẫn tàu (máy bay phản ứng theo tín hiệu, chấm điểm vạch dừng); đường taxi/tốc độ thật cho hạ cánh, lăn vào, đẩy lùi, lăn ra, cất cánh; sửa biển 前方優先道路 bị chồng ở giao service lane; Ground 121.8; `CACHE_NAME` → `v21`.

## 6. Yêu cầu Chỉnh sửa Tiếp theo (Dành cho Người dùng điền khi gửi Claude Cowork)

> *(Bạn có thể giữ nguyên hoặc ghi thêm yêu cầu cụ thể bên dưới trước khi gửi cho Claude Cowork)*

- [ ] **Yêu cầu 1:** *(Điền nội dung cần chỉnh sửa tại đây, ví dụ: tinh chỉnh UI, thêm tính năng mới, sửa lỗi cụ thể...)*
- [ ] **Yêu cầu 2:** Kiểm tra lại toàn bộ 3 ngôn ngữ (`JA / VI / EN`) sau khi chỉnh sửa.
- [ ] **Yêu cầu 3:** Chạy `python3 scripts/build_singlefile.py` để cập nhật `offline-singlefile.html` và đảm bảo chạy offline 100% không lỗi console.
