const questions = [...H20_1ch1]; // 質問データを取得

function loadQuestion() {
    let questionContainer = document.getElementById('question'); // 質問を表示するコンテナ
    let optionsContainer = document.getElementById('options'); // 選択肢を表示するコンテナ
    let buttonsContainer = document.getElementById('buttons'); // ボタンを表示するコンテナ
    let resultContainer = document.getElementById('result'); // 結果を表示するコンテナ

    questionContainer.innerHTML = ''; // 質問コンテナをクリア
    optionsContainer.innerHTML = ''; // 選択肢コンテナをクリア
    buttonsContainer.innerHTML = ''; // ボタンコンテナをクリア
    resultContainer.innerHTML = ''; // 結果コンテナをクリア

    let q = questions[Math.floor(Math.random() * questions.length)]; // ランダムな質問を選択

    questionContainer.innerHTML = `<h3>${q.question}</h3>`; // 質問のタイトルを表示

    // 表を表示する部分
    if (q.table) {
        let tableHTML = '<table>';
        tableHTML += '<tr>';
        q.table.header.forEach(headerItem => {
            tableHTML += `<th>${headerItem}</th>`;
        });
        tableHTML += '</tr>';
        q.table.raws.forEach(row => {
            tableHTML += '<tr>';
            row.forEach(cell => {
                tableHTML += `<td>${cell}</td>`;
            });
            tableHTML += '</tr>';
        });
        tableHTML += '</table>';
        questionContainer.innerHTML += tableHTML;
    }

const questions = [...H20_1ch1]; // 質問データを取得

function loadQuestion() {
    let questionContainer = document.getElementById('question'); // 質問を表示するコンテナ
    let optionsContainer = document.getElementById('options'); // 選択肢を表示するコンテナ
    let buttonsContainer = document.getElementById('buttons'); // ボタンを表示するコンテナ
    let resultContainer = document.getElementById('result'); // 結果を表示するコンテナ

    questionContainer.innerHTML = ''; // 質問コンテナをクリア
    optionsContainer.innerHTML = ''; // 選択肢コンテナをクリア
    buttonsContainer.innerHTML = ''; // ボタンコンテナをクリア
    resultContainer.innerHTML = ''; // 結果コンテナをクリア

    let q = questions[Math.floor(Math.random() * questions.length)]; // ランダムな質問を選択

    questionContainer.innerHTML = `<h3>${q.question}</h3>`; // 質問のタイトルを表示

    // 表を表示する部分
    if (q.table) {
        let tableHTML = '<table>';
        tableHTML += '<tr>';
        q.table.header.forEach(headerItem => {
            tableHTML += `<th>${headerItem}</th>`;
        });
        tableHTML += '</tr>';
        q.table.raws.forEach(row => {
            tableHTML += '<tr>';
            row.forEach(cell => {
                tableHTML += `<td>${cell}</td>`;
            });
            tableHTML += '</tr>';
        });
        tableHTML += '</table>';
        questionContainer.innerHTML += tableHTML;
    }

    // 選択肢を表示する部分
    q.options.forEach((option, index) => {
        if (option.trim() !== '') { // 選択肢のテキストが空でない場合のみ表示
            let optionText = document.createElement('div');
            optionText.className = 'option-text';
            optionText.innerText = `${index + 1}: ${option}`;
            optionsContainer.appendChild(optionText);
        }
    });

    // ボタンを表示する部分
    for (let i = 0; i < q.options.length; i++) {
        let button = document.createElement('button');
        button.innerText = i + 1;
        button.onclick = () => checkAnswer(q.correct, i);
        buttonsContainer.appendChild(button);
    }
}

function checkAnswer(correct, selected) {
    let resultContainer = document.getElementById('result'); // 結果を表示するコンテナ
    if (selected === correct) {
        resultContainer.innerHTML = `<p style="color: green;">正解！</p>`;
    } else {
        resultContainer.innerHTML = `<p style="color: red;">不正解！</p><p>正しい回答は ${correct + 1} 番目: ${questions.find(q => q.correct === correct).options[correct]}</p>`;
    }
}

// 初回ロード時に質問を表示
window.onload = loadQuestion;


function checkAnswer(correct, selected) {
    let resultContainer = document.getElementById('result'); // 結果を表示するコンテナ
    if (selected === correct) {
        resultContainer.innerHTML = `<p style="color: green;">正解！</p>`;
    } else {
        resultContainer.innerHTML = `<p style="color: red;">不正解！</p><p>正しい回答は ${correct + 1} 番目: ${questions.find(q => q.correct === correct).options[correct]}</p>`;
    }
}

// 初回ロード時に質問を表示
window.onload = loadQuestion;
