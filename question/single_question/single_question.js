const question = {...H20_1cp1};

function loadQuestion() {
  let container = document.getElementById('question');
  let resultContainer = document.getElementById('result');
  resultContainer.innerHTML = '';
  let q = questions[Math.floor(Math.random() * questions.length)];
  container.innerHTML = `<h3>${q.question}</h3>`;
  for (let i = 0; i < q.options.length; i++) {
      container.innerHTML += `<button onclick="checkAnswer(${q.correct}, ${i}, '${q.explanation}')">${i + 1}: ${q.options[i]}</button>`;
  }
}

function checkAnswer(correct, selected, explanation) {
  let resultContainer = document.getElementById('result');
  if (selected === correct) {
      resultContainer.innerHTML = `<p style="color: green;">正解！</p><p>${explanation}</p>`;
  } else {
      resultContainer.innerHTML = `<p style="color: red;">不正解！</p><p>正しい回答は ${correct + 1} 番目: ${questions.find(q => q.correct === correct).options[correct]}</p><p>${explanation}</p>`;
  }
}
