let userAnswers = [];
let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = 120;
let timer;
let timerElement = document.getElementById('timer');
let timerDisplay = document.getElementById('timer-display');

function startTest() {
  let questionContainer = document.getElementById('question-container');
  let resultContainer = document.getElementById('result-container');
  let toggleResultContainer = document.getElementById('toggle-result-container');
  let startButton = document.getElementById('start-button');

  questionContainer.innerHTML = '';
  questionContainer.style.display = 'block'; // 質問コンテナを表示
  resultContainer.style.display = 'none';
  toggleResultContainer.style.display = 'none'; // 結果表示ボタンを非表示
  timerElement.style.display = 'block';
  userAnswers = [];
  currentQuestionIndex = 0;
  score = 0;
  timer = 120 * 60; // 120分を秒に変換

  showQuestion();
  startTimer();
  setTimeout(endTest, timer * 1000); // タイマー終了時にテストを終了

  startButton.style.display = 'none'; // テスト開始ボタンを非表示にする
}

function showQuestion() {
  if (currentQuestionIndex >= totalQuestions) {
      endTest();
      return;
  }

  let q = questions[Math.floor(Math.random() * questions.length)];
  let container = document.getElementById('question-container');
  container.innerHTML = `<h3>${q.question}</h3>`;
  let optionsHTML = '<div class="options-container">';
  for (let i = 0; i < q.options.length; i++) {
      optionsHTML += `<div>${i + 1}: ${q.options[i]}</div>`;
  }
  optionsHTML += '</div>';
  container.innerHTML += optionsHTML;
  
  let buttonHTML = '<div class="button-container">';
  for (let i = 0; i < q.options.length; i++) {
      buttonHTML += `<button onclick="saveAnswer(${currentQuestionIndex}, ${i}, ${q.correct}, '${q.explanation}')">${i + 1}</button>`;
  }
  buttonHTML += '</div>';
  container.innerHTML += buttonHTML;

  userAnswers.push({question: q, selected: null});
  currentQuestionIndex++;
}

function saveAnswer(questionIndex, selected, correct, explanation) {
  userAnswers[questionIndex].selected = selected;
  userAnswers[questionIndex].correct = correct;
  userAnswers[questionIndex].explanation = explanation;
  if (selected === correct) {
      score++;
  }
  showQuestion();
}

function endTest() {
  let questionContainer = document.getElementById('question-container');
  let resultContainer = document.getElementById('result-container');
  let scoreDisplay = document.getElementById('score');
  let totalDisplay = document.getElementById('total');
  let resultTableBody = document.getElementById('result-table-body');
  let toggleResultContainer = document.getElementById('toggle-result-container');
  let startButton = document.getElementById('start-button');

  questionContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  timerElement.style.display = 'none';
  toggleResultContainer.style.display = 'block';
  startButton.style.display = 'block'; // テスト開始ボタンを表示

  // スコアと総問題数を表示
  scoreDisplay.textContent = score;
  totalDisplay.textContent = totalQuestions;

  // テスト結果の表を生成
  resultTableBody.innerHTML = '';
  userAnswers.forEach((answer, index) => {
      let row = document.createElement('tr');
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${answer.question.options[answer.selected]}</td>
          <td>${answer.question.options[answer.correct]}</td>
          <td>${answer.selected === answer.correct ? '正解' : '不正解'}</td>
      `;
      resultTableBody.appendChild(row);
  });
}

function toggleResult() {
  let resultContainer = document.getElementById('result-container');
  if (resultContainer.style.display === 'none') {
      resultContainer.style.display = 'block';
      document.getElementById('toggle-result').textContent = '結果を非表示';
  } else {
      resultContainer.style.display = 'none';
      document.getElementById('toggle-result').textContent = '結果を表示';
  }
}

function startTimer() {
  timerDisplay.textContent = formatTime(timer);
  let interval = setInterval(function() {
      timer--;
      timerDisplay.textContent = formatTime(timer);
      if (timer <= 0) {
          clearInterval(interval);
          endTest();
      }
  }, 1000);
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
