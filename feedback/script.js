// script.js
document.addEventListener('DOMContentLoaded', () => {
    const typeSelect = document.getElementById('type');
    const emailLabel = document.getElementById('emailLabel');
    const emailInput = document.getElementById('email');
    
    typeSelect.addEventListener('change', () => {
        if (typeSelect.value === 'inquiry') {
            emailLabel.style.display = 'block';
            emailInput.style.display = 'block';
            emailInput.required = true;
        } else {
            emailLabel.style.display = 'none';
            emailInput.style.display = 'none';
            emailInput.required = false;
        }
    });

    const form = document.getElementById('feedbackForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        sendFeedback();
    });

    function sendFeedback() {
        const formData = new FormData(form);
        const data = {
            type: formData.get('type'),
            name: formData.get('name'),
            message: formData.get('message'),
            email: formData.get('email') || '',
        };

        // GoogleフォームのURL
        const googleFormURL = 'https://docs.google.com/forms/d/e/FORM_ID_HERE/formResponse';
        
        const queryString = new URLSearchParams({
            'entry.XXXXX': data.type, // GoogleフォームのエントリーID
            'entry.YYYYY': data.name, // GoogleフォームのエントリーID
            'entry.ZZZZZ': data.message, // GoogleフォームのエントリーID
            'entry.AAAAA': data.email // GoogleフォームのエントリーID
        }).toString();

        fetch(`${googleFormURL}?${queryString}`, {
            method: 'POST',
            mode: 'no-cors'
        }).then(() => {
            alert('フィードバックを送信しました。');
            form.reset();
        }).catch((error) => {
            alert('フィードバックの送信に失敗しました。');
            console.error('Error:', error);
        });
    }
});
