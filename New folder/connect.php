<?php
// Thông tin kết nối
$host = 'sql202.infinityfree.com'; // Thay đổi nếu cần
$user = 'if0_37077436';        // Tên người dùng MySQL
$password = 'Kingof56!!!';    // Mật khẩu MySQL
$database = 'if0_37077436_english';        // Tên cơ sở dữ liệu

// Tạo kết nối
$conn = new mysqli($host, $user, $password, $database);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối không thành công: " . $conn->connect_error);
}
echo "Kết nối thành công!";

// Thực hiện truy vấn (Ví dụ: lấy dữ liệu từ bảng)
$sql = "SELECT * FROM User"; // Thay bằng tên bảng của bạn
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Hiển thị dữ liệu
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"]. " - Name: " . $row["name"]. "<br>"; // Thay đổi theo cấu trúc bảng của bạn
    }
} else {
    echo "Không có dữ liệu";
}

// Đóng kết nối
$conn->close();
?>
