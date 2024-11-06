const questions = [
  {
      question: "¿QUÉ ES LA NEGOCIACIÓN INTERNACIONAL?",
      options: [
          "ES UNA IMPOSICIÓN O SUBORDINACIÓN",
          "PROCESO EN EL QUE DOS PARTES DE DISTINTOS PAISES BUSCAN ENFRENTAR SUS PROPIOS INTERESES PARA LLEGAR A UN ACUERDO MUTUO",
          "NO ES UNA SOLUCIÓN ES DEFINITIVA A TODOS LOS PROBLEMAS"
      ],
      correct: 1
  },
  {
      question: "¿CUÁL NO ES UN TIP PARA NEGOCIAR CON CLIENTES?",
      options: [
          "PREPARACIÓN Y PLANIFICACIÓN",
          "ESCUCHA ACTIVA",
          "SUBESTIMAR EL IDIOMA"
      ],
      correct: 2
  },
  {
      question: "¿QUÉ HABILIDADES SON ESENCIALES PARA UN BUEN NEGOCIADOR?",
      options: [
          "FALTA DE CONTROL EMOCIONAL",
          "DESHONESTIDAD",
          "COMUNICACIÓN EFECTIVA"
      ],
      correct: 2
  },
  {
      question: "¿PARA NEGOCIAR CON PROVEEDORES NO ES NECESARIO CONSTRUIR RELACIONES SÓLIDAS?",
      options: ["Tal vez", "Falso", "Verdadero"],
      correct: 1
  },
  {
      question: "¿POR QUÉ ES IMPORTANTE LA NEGOCIACIÓN INTERNACIONAL?",
      options: [
          "Pérdida de control y autonomía",
          "Posible desigualdad de poder",
          "Incremento de la competencia",
          "Facilita el comercio y la inversión"
      ],
      correct: 3
  }
];

let currentQuestion = 0;
let correctAnswers = 0;
let fiftyFiftyUsed = false;
let phoneUsed = false;
let playerName = '';

function showQuestion() {
  const questionEl = document.getElementById('question');
  const optionsEl = document.getElementById('options');
  
  questionEl.textContent = questions[currentQuestion].question;
  optionsEl.innerHTML = '';
  
  questions[currentQuestion].options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = 'option';
      button.textContent = `${String.fromCharCode(65 + index)}. ${option}`;
      button.onclick = () => checkAnswer(index);
      optionsEl.appendChild(button);
  });
}

function checkAnswer(selectedIndex) {
  const correct = questions[currentQuestion].correct;
  
  if (selectedIndex === correct) {
      correctAnswers++;
      showModal(`¡Correcto, ${playerName}!`);
  } else {
      showModal(`Lo siento, ${playerName}, respuesta incorrecta.`);
  }

  setTimeout(() => {
      closeModal();
      if (currentQuestion < questions.length - 1) {
          currentQuestion++;
          showQuestion();
      } else {
          showFinalScore();
      }
  }, 2000);
}

function showFinalScore() {
  let message = `¡Juego terminado, ${playerName}! Calificación: ${correctAnswers}/5. `;
  if (correctAnswers === 5) {
      message += "¡Excelente, todas correctas!";
  } else if (correctAnswers >= 3) {
      message += "¡Buen trabajo!";
  } else {
      message += "Puedes intentarlo nuevamente para mejorar.";
  }
  showModal(message);
}

function useFiftyFifty() {
  if (fiftyFiftyUsed) return;
  
  const options = document.querySelectorAll('.option');
  const correct = questions[currentQuestion].correct;
  let eliminated = 0;
  
  for (let i = 0; i < options.length && eliminated < 2; i++) {
      if (i !== correct) {
          options[i].classList.add('disabled');
          options[i].onclick = null;
          eliminated++;
      }
  }
  
  fiftyFiftyUsed = true;
  document.getElementById('fifty-fifty').classList.add('used');
}

function phoneAFriend() {
  if (phoneUsed) return;
  
  const correct = questions[currentQuestion].correct;
  const options = ['A', 'B', 'C', 'D'];
  showModal(`Tu amigo dice: "Estoy casi seguro de que la respuesta es ${options[correct]}"`);
  
  phoneUsed = true;
  document.getElementById('phone-friend').classList.add('used');
}

function showModal(text) {
  const modal = document.getElementById('modal');
  const modalText = document.getElementById('modal-text');
  modalText.textContent = text;
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function startGame() {
  playerName = document.getElementById('player-name-input').value.trim();
  if (playerName) {
      document.getElementById('player-name-modal').style.display = 'none';
      showQuestion();
  } else {
      alert('Por favor, ingresa tu nombre antes de comenzar.');
  }
}

function resetGame() {
  currentQuestion = 0;
  correctAnswers = 0;
  fiftyFiftyUsed = false;
  phoneUsed = false;
  document.getElementById('fifty-fifty').classList.remove('used');
  document.getElementById('phone-friend').classList.remove('used');
  closeModal();
  document.getElementById('player-name-modal').style.display = 'flex';
}

// Event listeners
document.getElementById('fifty-fifty').onclick = useFiftyFifty;
document.getElementById('phone-friend').onclick = phoneAFriend;

// Start game
document.getElementById('player-name-modal').style.display = 'flex';
