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
  const cells = document.querySelectorAll('.
