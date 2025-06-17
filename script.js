const questions = [
  {
    question: "1. Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: "CSS"
  },
  {
    question: "2. Which HTML tag is used to link JavaScript?",
    options: ["style", "script", "link", "js"],
    answer: "script"
  },
  {
    question: "3. Which of the following is a JavaScript framework?",
    options: ["Laravel", "React", "Django", "Flask"],
    answer: "React"
  }
];

function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function loadQuiz() {
  const quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = '';
  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${q.question}</p>
      ${q.options.map(opt => `
        <label>
          <input type="radio" name="q${index}" value="${opt}"> ${escapeHTML(opt)}
        </label><br/>
      `).join('')}
    `;
    quizContainer.appendChild(div);
  });
}

function submitQuiz() {
  let score = 0;
  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected && selected.value === q.answer) score++;
  });
  document.getElementById('quiz-result').textContent = `You scored ${score}/${questions.length}`;
}

function fetchJoke() {
  fetch('https://official-joke-api.appspot.com/jokes/random')
    .then(res => res.json())
    .then(data => {
      document.getElementById('joke').textContent = `${data.setup} - ${data.punchline}`;
    })
    .catch(() => {
      document.getElementById('joke').textContent = "Failed to fetch a joke!";
    });
}

window.onload = loadQuiz;
