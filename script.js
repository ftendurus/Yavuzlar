let questions = JSON.parse(localStorage.getItem('questions')) || [];
let userPoints = parseInt(localStorage.getItem('userPoints')) || 0;

function saveToLocalStorage() {
  localStorage.setItem('questions', JSON.stringify(questions));
}

function saveQuestion() {
  let questionText = document.getElementById("question-text").value;
  let difficulty = document.getElementById("difficulty").value;
  let options = Array.from(document.querySelectorAll(".option-text"))
      .map(input => input.value);
  let correct = document.querySelector("input[name='option']:checked").value;

  questions.push({ question: questionText, options: options, correct: correct, difficulty: difficulty });
  saveToLocalStorage(); 
  alert("Soru eklendi!");
  window.location.href = "list-questions.html";
}

function loadEditQuestion() {
  let questions = JSON.parse(localStorage.getItem('questions')) || [];
  const params = new URLSearchParams(window.location.search);
  const index = params.get('index');

  if (index !== null && questions[index]) {
    const question = questions[index];

    document.getElementById("question-text").value = question.question;
    document.getElementById("difficulty").value = question.difficulty;

    document.querySelectorAll(".option-text").forEach((input, i) => {
      input.value = question.options[i] || "";  
    });

    document.querySelectorAll("input[name='option']").forEach((radio, i) => {
      if (i === parseInt(question.correct)) {
        radio.checked = true;
      }
    });
  }
}

function searchQuestion() {
  const searchInput = document.getElementById("search") || document.getElementById("search-term");
  if (!searchInput) {
      console.error("Arama input elemanı bulunamadı.");
      return;
  }
  
  const searchTerm = searchInput.value.toLowerCase();
  const filteredQuestions = questions.filter(q => q.question.toLowerCase().includes(searchTerm));
  showQuestionList(filteredQuestions);
}

function showQuestionList(filteredQuestions = questions) {
  const questionList = document.getElementById("questions");
  questionList.innerHTML = "";

  if (filteredQuestions.length === 0) {
      questionList.innerHTML = "<li>Aradığınız kriterlere uygun soru bulunamadı.</li>";
  } else {
      filteredQuestions.forEach((q, index) => {
          let li = document.createElement("li");
          li.innerHTML = `${q.question} 
              <button onclick="editQuestion(${index})">Düzenle</button> 
              <button onclick="deleteQuestion(${index})">Sil</button> 
              <button onclick="viewQuestion(${index})">Göster</button>`;
          questionList.appendChild(li);
      });
  }
}

function viewQuestion(index) {
  window.location.href = `question-view.html?index=${index}`;
}

function deleteQuestion(index) {
  if (confirm("Bu soruyu silmek istediğinizden emin misiniz?")) {
      questions.splice(index, 1);
      saveToLocalStorage();
      alert("Soru başarıyla silindi.");
      searchQuestion(); 
  }
}

function editQuestion(index) {
  window.location.href = `edit-question.html?index=${index}`;
}

function loadQuestion() {
  let questions = JSON.parse(localStorage.getItem('questions')) || [];
  const params = new URLSearchParams(window.location.search);
  const index = params.get('index');

  if (index !== null && questions[index]) {
      const question = questions[index];
      document.getElementById("question-text").innerText = question.question;
      document.getElementById("difficulty").innerText = question.difficulty;

      const optionsList = document.getElementById("options-list");
      optionsList.innerHTML = ''; 
      question.options.forEach((option, i) => {
          let li = document.createElement("li");
          li.innerHTML = `
              <label>
                  <input type="radio" name="question-options" value="${i}">
                  ${String.fromCharCode(65 + i)}. ${option}
              </label>
          `;
          optionsList.appendChild(li);
      });
  } else {
      alert("Soru bulunamadı.");
      window.location.href = "list-questions.html"; 
  }
}

function submitAnswer() {
  let questions = JSON.parse(localStorage.getItem('questions')) || [];
  const params = new URLSearchParams(window.location.search);
  const index = params.get('index');

  if (index !== null && questions[index]) {
      const question = questions[index];
      const selectedOption = document.querySelector("input[name='question-options']:checked");

      if (selectedOption) {
          const selectedValue = selectedOption.value;
          let userPoints = parseInt(localStorage.getItem('userPoints')) || 0;

          if (parseInt(selectedValue) === parseInt(question.correct)) {
              userPoints += 10; 
              localStorage.setItem('userPoints', userPoints); 
              alert("Tebrikler! Doğru cevap verdiniz. 10 puan kazandınız.");
          } else {
              alert("Yanlış cevap verdiniz. Lütfen tekrar deneyin.");
          }

          window.location.href = "list-questions.html";
      } else {
          alert("Lütfen bir şık seçin.");
      }
  } else {
      alert("Geçersiz soru.");
  }
}

function saveUserPoints(points) {
  localStorage.setItem('userPoints', points);
}

function getUserPoints() {
  return parseInt(localStorage.getItem('userPoints')) || 0;
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("question-text")) {
    loadEditQuestion(); 
  } else {
    const userPointsElement = document.getElementById("user-points");
    if (userPointsElement) {
      userPointsElement.innerText = `Puanınız: ${getUserPoints()}`;
    }
    showQuestionList();
  }
});
