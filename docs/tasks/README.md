# Bảng điều phối task — Aviation Ops Sim JP Pro

Claude (đầu não) viết đặc tả · Antigravity / Gemini thực hiện · Claude review & gộp.

## Cách giao việc (người dùng làm)

Mở **Google Antigravity** với repo này (hoặc Gemini có quyền đọc/ghi repo) và gõ đúng 1 câu:

> Đọc `AGENTS.md` rồi thực hiện task **T0x** theo `docs/tasks/T0x-....md`. Tạo nhánh, mở Pull Request, không merge.

Xong thì báo Claude: **"review PR T0x"** — Claude sẽ kiểm tra, sửa nếu cần và gộp.

## Task đợt 1

| ID | Task | Giao cho | Ưu tiên | Trạng thái |
|---|---|---|---|---|
| [T01](T01-tg2-question-bank.md) | Ngân hàng 60 câu hỏi 特定技能2号 (JA/VI/EN) | **Gemini** | Cao | Chờ làm |
| [T02](T02-responsive-mobile.md) | Giao diện chuẩn iPhone / iPad cho mọi màn hình | **Antigravity** | Cao | Chờ làm |
| [T03](T03-glossary-consistency.md) | Rà soát thuật ngữ 3 ngôn ngữ thống nhất toàn app | **Gemini** | Trung bình | Chờ làm |

Làm **song song** được: T01 và T03 sửa file dữ liệu khác nhau, T02 chỉ sửa CSS/markup. Mỗi task 1 PR riêng.

## Mẫu mô tả Pull Request

```
## Task
[T0x] <tên task> — đặc tả: docs/tasks/T0x-....md

## Đã làm
- ...

## File đã sửa
- ...

## Nguồn tham khảo (task nội dung)
- ...

## Checklist
- [ ] Chỉ sửa file trong phạm vi cho phép
- [ ] node --check các file .js đã sửa: OK
- [ ] python3 scripts/build_singlefile.py: OK
- [ ] Đủ 3 ngôn ngữ JA / VI / EN, không lẫn tiếng Việt vào EN
- [ ] Không thêm CDN / API / dependency
- [ ] (Giao diện) ảnh chụp trước/sau đính kèm
```
