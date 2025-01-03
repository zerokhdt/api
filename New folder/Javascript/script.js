document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            // Chuyển đến trang chính (thay đổi URL theo ý muốn)
            window.location.href = 'home.html';
        } else {
            document.getElementById('error-message').textContent = 'Tên đăng nhập hoặc mật khẩu không đúng.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('error-message').textContent = 'Đã xảy ra lỗi. Vui lòng thử lại sau.';
    }
});
