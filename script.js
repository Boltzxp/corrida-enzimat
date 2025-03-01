// Variáveis globais
const board = document.getElementById('board');
const rollDiceButton = document.getElementById('roll-dice');
const diceElement = document.getElementById('dice');
const questionArea = document.getElementById('question-area');
const questionText = document.getElementById('question-text');
const answerButtons = [
  document.getElementById('answer-1'),
  document.getElementById('answer-2'),
  document.getElementById('answer-3')
];

let playerPosition = 0; // Posição inicial do jogador
const totalCells = 100; // Número total de casas no tabuleiro
const questions = [
  {
    question: "Qual é o papel do ATP na célula?",
    answers: ["Armazenar energia", "Transportar oxigênio", "Sintetizar DNA"],
    correctAnswer: 0
  },
  {
    question: "Qual é o produto final da glicólise?",
    answers: ["Piruvato", "Glicose", "CO2"],
    correctAnswer: 0
  }
];

// Função para criar o tabuleiro
function createBoard() {
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // Adiciona emojis especiais para algumas casas
    if (i === 0) {
      cell.textContent = "🏁"; // Casa inicial
    } else if (i === totalCells - 1) {
      cell.textContent = "🏆"; // Casa final
    } else if (i % 5 === 0) {
      cell.textContent = "🔍"; // Casa com pergunta
    } else {
      cell.textContent = "🟩"; // Casa normal
    }

    board.appendChild(cell);
  }
}

// Função para mover o jogador
function movePlayer(steps) {
  playerPosition += steps;
  if (playerPosition >= totalCells) playerPosition = totalCells - 1;

  // Atualiza a posição do jogador no tabuleiro
  updatePlayerPosition();
}

// Função para atualizar a posição do jogador
function updatePlayerPosition() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.innerHTML = cell.textContent); // Limpa as células
  cells[playerPosition].innerHTML += '<div class="player"></div>';
}

// Função para exibir uma pergunta
function showQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const currentQuestion = questions[randomIndex];

  questionText.textContent = currentQuestion.question;
  answerButtons.forEach((button, index) => {
    button.textContent = currentQuestion.answers[index];
    button.onclick = () => checkAnswer(index, currentQuestion.correctAnswer);
  });

  questionArea.style.display = 'block';
}

// Função para verificar a resposta
function checkAnswer(selectedAnswer, correctAnswer) {
  if (selectedAnswer === correctAnswer) {
    alert("Resposta correta! Avance mais uma casa.");
    movePlayer(1);
  } else {
    alert("Resposta incorreta! Fique onde está.");
  }
  questionArea.style.display = 'none';
}

// Evento de lançar o dado
rollDiceButton.addEventListener('click', () => {
  // Array com os emojis das faces do dado
  const diceEmojis = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

  // Inicia a animação de giro
  let rotationInterval = setInterval(() => {
    const randomEmoji = diceEmojis[Math.floor(Math.random() * diceEmojis.length)];
    diceElement.textContent = randomEmoji; // Atualiza o emoji do dado
  }, 200); // Troca o emoji a cada 200ms (ajustado para ser mais lento)

  // Após 1.5 segundos, exibe o resultado do dado
  setTimeout(() => {
    clearInterval(rotationInterval); // Para a animação
    const diceRoll = Math.floor(Math.random() * 6) + 1; // Gera um número entre 1 e 6
    diceElement.textContent = diceEmojis[diceRoll - 1]; // Mostra o emoji correto

    alert(`Você tirou ${diceRoll} no dado.`);
    movePlayer(diceRoll);

    // Verifica se o jogador caiu em uma casa especial
    if (playerPosition % 5 === 0 && playerPosition !== 0) {
      showQuestion();
    }

    // Verifica se o jogador venceu
    if (playerPosition === totalCells - 1) {
      alert("Parabéns! Você venceu a Corrida Enzimática!");
    }
  }, 1500); // Aumentamos o tempo para 1.5 segundos para dar mais tempo à animação
});

// Inicializa o jogo
createBoard();
updatePlayerPosition();
createBoard();
updatePlayerPosition();
