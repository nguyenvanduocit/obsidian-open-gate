# Hướng dẫn Release Phiên Bản Mới

Tài liệu này hướng dẫn chi tiết quy trình release một phiên bản mới của plugin Open Gate. Vui lòng tuân thủ từng bước để đảm bảo process release diễn ra suôn sẻ.

## Các bước release

### 1. Cập nhật code và kiểm tra trạng thái

```bash
# Fetch tất cả các thay đổi mới nhất từ repository
git fetch --all

# Kiểm tra trạng thái hiện tại của repository
git status
```

Đảm bảo working tree của bạn sạch sẽ (clean) trước khi bắt đầu quy trình release.

### 2. Kiểm tra phiên bản hiện tại

```bash
# Xem các tag gần đây để xác định phiên bản hiện tại
git tag -l --sort=-v:refname | head -5
```

### 3. Xem các commit gần đây

```bash
# Xem 5 commit gần nhất để hiểu những thay đổi sẽ được bao gồm trong phiên bản mới
git log -5 --pretty=format:"%h - %s (%cr)" | cat
```

### 4. Cập nhật phiên bản trong các file

Cần cập nhật số phiên bản trong 3 file:

1. `manifest.json`
2. `package.json`
3. `versions.json`

Ví dụ, để cập nhật từ phiên bản 1.11.8 lên 1.11.9:

#### Cập nhật manifest.json
```json
{
    "id": "open-gate",
    "name": "Open Gate",
    "version": "1.11.9",  // Cập nhật phiên bản tại đây
    "minAppVersion": "0.15.0",
    // ...
}
```

#### Cập nhật package.json
```json
{
  "name": "obsidian-open-gate",
  "version": "1.11.9",  // Cập nhật phiên bản tại đây
  // ...
}
```

#### Cập nhật versions.json
```json
{
    // ... các phiên bản trước ...
    "1.11.8": "0.15.0",
    "1.11.9": "0.15.0"  // Thêm phiên bản mới và minAppVersion
}
```

### 5. Commit các thay đổi

```bash
# Add các file đã thay đổi
git add manifest.json package.json versions.json

# Commit với thông điệp mô tả rõ ràng
git commit -m "chore: release version 1.11.9"
```

### 6. Tạo tag cho phiên bản mới

```bash
# Tạo annotated tag với message
git tag -a "1.11.9" -m "Release version 1.11.9"

# Kiểm tra lại tag vừa tạo
git tag -l --sort=-v:refname | head -3
```

### 7. Push commit và tag lên repository

```bash
# Push commit lên nhánh chính (thường là main)
git push

# Push tag lên repository
git push --tags
```

## Lưu ý

- Luôn đảm bảo bạn đã test kỹ tất cả các tính năng trước khi thực hiện release
- Tuân thủ quy tắc semantic versioning (SemVer):
  - MAJOR: thay đổi không tương thích với API cũ
  - MINOR: thêm tính năng mới nhưng vẫn tương thích ngược
  - PATCH: sửa lỗi, cải thiện hiệu suất mà không thay đổi API
- Nếu có nhiều thay đổi lớn, cân nhắc cập nhật changelog trong README hoặc tạo file CHANGELOG.md

## Quy trình sau khi release

Sau khi release thành công, bạn nên:

1. Kiểm tra repository trên GitHub để xác nhận tag mới đã xuất hiện
2. Xác minh rằng phiên bản mới được hiển thị trong Obsidian Community Plugins
3. Nếu có bất kỳ vấn đề nào, phản hồi nhanh chóng và cân nhắc việc release hotfix nếu cần thiết 