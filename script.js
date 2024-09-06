let questions = [
  { question: "Soru 1", options: ["A şıkkı", "B şıkkı", "C şıkkı", "D şıkkı"], correct: 0, difficulty: "Kolay" },
  { question: "Soru 2", options: ["A şıkkı", "B şıkkı", "C şıkkı", "D şıkkı"], correct: 1, difficulty: "Orta" }
];

// Function to save a new question
function saveQuestion() {
  let questionText = document.getElementById("question-text").value;
  let difficulty = document.getElementById("difficulty").value;
  let options = Array.from(document.querySelectorAll("input[type='text']"))
      .map(input => input.value);
  let correct = document.querySelector("input[type='radio']:checked").value;

  questions.push({ question: questionText, options: options, correct: correct, difficulty: difficulty });
  alert("Soru eklendi!");
  window.location.href = "list-questions.html";
}

// Function to display all questions in the list page
function showQuestionList() {
  const questionList = document.getElementById("questions");
  questionList.innerHTML = "";

  questions.forEach((q, index) => {
      let li = document.createElement("li");
      li.innerHTML = `${q.question} <button onclick="editQuestion(${index})">Düzenle</button> <button onclick="deleteQuestion(${index})">Sil</button>`;
      questionList.appendChild(li);
  });
}

// Function to delete a question
function deleteQuestion(index) {
  questions.splice(index, 1);
  showQuestionList();
}

// Function to edit a question (for edit-question.html)
function editQuestion(index) {
  const question = questions[index];
  window.location.href = `edit-question.html?index=${index}`;
}

// Function to load question into edit form in the edit page
function loadEditQuestion() {
  const params = new URLSearchParams(window.location.search);
  const index = params.get('index');
  const question = questions[index];

  document.getElementById("question-text").value = question.question;
  document.getElementById("difficulty").value = question.difficulty;
  document.querySelectorAll("input[type='text']").forEach((input, i) => {
      input.value = question.options[i];
  });
}
