let fetchedData;
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
document.getElementById('btn').style.display='none';
// Function to fetch data and store it
const apikey = '483dde5b5daa465a880a4513e112102e';
function fetchData() {
  correctAnswersCount = 0;
  currentQuestionIndex = 0;
  
  fetch(`https://opentdb.com/api.php?amount=10`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      fetchedData = data;
      showNextQuestion();
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to show the next question
function showNextQuestion() {

//  const restartButtonContainer = document.getElementById('restart');
document.getElementById('btn').style.display='block';
  // Hide the restart button container
  //restartButtonContainer.style.display = 'none';
  document.getElementById('heading').innerHTML="QUIZ🔍🔍"
  if (currentQuestionIndex < fetchedData.results.length) {
    const item = fetchedData.results[currentQuestionIndex];
    currentQuestionIndex++;

    document.getElementById('question').innerHTML = "Question - " + " " + currentQuestionIndex + " " + item.question;

    if (item.type === 'multiple') {
      const options = [
        item.correct_answer,
        item.incorrect_answers[0],
        item.incorrect_answers[1],
        item.incorrect_answers[2]
      ];

      const shuffledOptions = shuffleArray(options);

      let optionsHTML = '';
      for (let i = 0; i < 4; i++) {
        const inp = `<input type="radio" name="answer" value="${shuffledOptions[i]}">`;
        const lab = `<label>${shuffledOptions[i]}</label><br>`;
        optionsHTML += inp + lab;
      }

      document.getElementById('option').innerHTML = optionsHTML;
     // document.getElementById('btn').innerHTML = `<button onclick="checkAnswer()">Next</button>`;

    } else {
      const options = [
        item.correct_answer,
        item.incorrect_answers[0]
      ];

      const shuffledOptions = shuffleArray(options);

      let optionsHTML = '';
      for (let i = 0; i < 2; i++) {
        const inp = `<input type="radio" name="answer" value="${shuffledOptions[i]}">`;
        const lab = `<label>${shuffledOptions[i]}</label><br>`;
        optionsHTML += inp + lab;
      }

      document.getElementById('option').innerHTML = optionsHTML;
      //document.getElementById('btn').innerHTML = `<button onclick="checkAnswer()">Next</button>`;
    }
  } else {
    document.getElementById('question').innerHTML = `Quiz completed! Correct Answers: ${correctAnswersCount}`;
    document.getElementById('option').innerHTML = "";
   // document.getElementById('restart').innerHTML = `<button onclick="fetchData()">Restart</button>`;
   document.getElementById('btn').innerHTML='Restart';
   document.getElementById('btn').addEventListener('click', ()=>{
    showNextQuestion()
   })  }
}

// Function to check the selected answer
function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;
    const currentQuestion = fetchedData.results[currentQuestionIndex - 1];
    const correctAnswer = currentQuestion.correct_answer;

    if (userAnswer === correctAnswer) {
      correctAnswersCount++;
    }

    showNextQuestion();
  }
}

// Shuffle array function
function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Initial data fetch
fetchData();
