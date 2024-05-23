// script.js
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackType = document.getElementById('feedbackType');
    const emailLabel = document.getElementById('emailLabel');
    const email = document.getElementById('email');
    
    // 問い合わせの場合、メールアドレスを必須にする
    feedbackType.addEventListener('change', function() {
        if (feedbackType.value === 'inquiry') {
            email.required = true;
            emailLabel.style.display = 'block';
            email.style.display = 'block';
        } else {
            email.required = false;
            emailLabel.style.display = 'none';
            email.style.display = 'none';
        }
    });
    
    // 初期状態でメールアドレスフィールドを非表示にする
    emailLabel.style.display = 'none';
    email.style.display = 'none';
    
    // フォームの送信時にバリデーションを実行
    feedbackForm.addEventListener('submit', function(event) {
        if (feedbackType.value === '') {
            alert('フィードバックの種類を選択してください。');
            event.preventDefault();
        } else if (feedbackType.value === 'inquiry' && email.value === '') {
            alert('問い合わせの場合、メールアドレスは必須です。');
            event.preventDefault();
        }
    });
});
