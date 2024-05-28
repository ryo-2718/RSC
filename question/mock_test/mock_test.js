let userAnswers = [];
let currentQuestionIndex = 0;
let score = 0;
let questions = [];
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
  questionContainer.style.display = 'block';
  resultContainer.style.display = 'none';
  toggleResultContainer.style.display = 'none';
  timerElement.style.display = 'block';
  userAnswers = [];
  currentQuestionIndex = 0;
  score = 0;
  timer = 120 * 60;

  const urlParams = new URLSearchParams(window.location.search);
  const mockTestMode = urlParams.get('mockTestMode') === 'true';

  if (mockTestMode) {
    questions = selectRandomQuestions();
  } else {
    const selectedIds = JSON.parse(localStorage.getItem('selectedIds')) || [];
    questions = selectedIds.flatMap(id => getQuestionsById(id));
  }

  showQuestion();
  startTimer();
  setTimeout(endTest, timer * 1000);

  startButton.style.display = 'none';
}

function selectRandomQuestions() {
  const ch1 = [];
  const ch2 = [];
  const ch3 = [];
  const ch4 = [];
  const ch5 = [];

  allQuestions.forEach(question => {
    if (question.id.endsWith('ch1')) ch1.push(question);
    if (question.id.endsWith('ch2')) ch2.push(question);
    if (question.id.endsWith('ch3')) ch3.push(question);
    if (question.id.endsWith('ch4')) ch4.push(question);
    if (question.id.endsWith('ch5')) ch5.push(question);
  });

  const selectedQuestions = [];
  selectedQuestions.push(...getRandomQuestions(ch1, 20));
  selectedQuestions.push(...getRandomQuestions(ch2, 20));
  selectedQuestions.push(...getRandomQuestions(ch4, 20));
  selectedQuestions.push(...getRandomQuestions(ch5, 20));
  selectedQuestions.push(...getRandomQuestions(ch3, 40));

  return selectedQuestions;
}

function getRandomQuestions(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

function getQuestionsById(id) {
  return allQuestions.filter(question => question.id.startsWith(id));
}

function showQuestion() {
  if (currentQuestionIndex >= questions.length) {
    endTest();
    return;
  }

  let q = questions[currentQuestionIndex];
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

  userAnswers.push({ question: q, selected: null });
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
  startButton.style.display = 'block';

  scoreDisplay.textContent = score;
  totalDisplay.textContent = totalQuestions;

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
