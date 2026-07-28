# Chiến khu Đ

Website giới thiệu di tích lịch sử Chiến khu Đ (Bình Dương), dựng theo thiết kế Figma bằng React + Tailwind CSS.

## Chạy dự án

```bash
npm install
npm run dev
```

## Routes

| Path | Trang |
|------|-------|
| `/` | Trang chủ |
| `/lich-su` | Dòng thời gian |
| `/tham-quan` | Thông tin tham quan |
| `/audio` | Audio thuyết minh |
| `/thu-vien` | Thư viện |
| `/lien-he` | Liên hệ |

Toggle **VN/EN** trên header để đổi ngôn ngữ.

## Font

- Tiêu đề: **EB Garamond** (serif cổ điển)
- Nội dung: **Be Vietnam Pro** (hỗ trợ tiếng Việt tốt)

## Thả file của bạn vào đâu

| Loại | Thư mục |
|------|---------|
| Audio (mp3/ogg/wav) | `public/audio/` |
| Text / thông tin / Word / Markdown | `content/` |
| Ảnh | `src/assets/images/` |

Chi tiết xem `content/README.md`. Sau khi bỏ file audio, tên mặc định đang map trong `src/data/content.ts` là:

- `hinh-thanh.mp3`
- `huyen-thoai.mp3`
- `trung-uong-cuc.mp3`
- `mua-xuan-1975.mp3`

Đổi tên file cho khớp, hoặc nhắn mình để gắn lại.
