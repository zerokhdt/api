// Tải dữ liệu từ API khi trang load
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/subjects')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('subjects-container');
            const noDataMessage = document.getElementById('no-data-message');

            if (data.success) {
                data.data.forEach(subject => {
                    const card = document.createElement('div');
                    card.classList.add('subject-card');
                    card.innerHTML = `
                        <h3>${subject.name}</h3>
                        <p>${subject.description}</p>
                    `;
                    container.appendChild(card);
                });
            } else {
                noDataMessage.classList.remove('hidden');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Chuyển đến trang thêm đề khi nhấn nút
document.getElementById('add-subject-btn').addEventListener('click', function() {
    window.location.href = 'add-subject.html'; // Đảm bảo bạn có trang này
});
