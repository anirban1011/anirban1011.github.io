/**
 * index.js — Home page script (Snake game + typed role animation)
 * Shared utilities are in shared.js
 */

// Snippets code text that scrolls on skip/win
const codeSnippets = `
function initializeModelChunk<T>(chunk: ResolvedModelChunk): T {
  const value: T = parseModel(chunk._response, chunk._value);
  const initializedChunk: InitializedChunk<T> = (chunk: any);
  initializedChunk._status = INITIALIZED;
  initializedChunk._value = value;
  return value;
}

class BroadcastService : Service() {
  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    val notification = createNotification()
    startForeground(NOTIFICATION_ID, notification)
    return START_STICKY
  }
}

import socket
import threading

def handle_client(client_socket):
    while True:
        request = client_socket.recv(1024)
        if not request:
            break
        client_socket.send(b"ACK")

# REST API Call
import urllib.request
req = urllib.request.Request(
    url, 
    headers={'User-Agent': 'Mozilla/5.0'}
)
`;

document.addEventListener("DOMContentLoaded", () => {
  // ── Typed role animation ────────────────────────────────────
  const roles = [
    "> Software Developer",
    "> Android Developer",
    "> App Automation Expert",
    "> Backend Integrator",
  ];
  const typedEl = document.getElementById("typedRole");
  if (typedEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
      const current = roles[roleIndex];
      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex--);
      } else {
        typedEl.textContent = current.substring(0, charIndex++);
      }

      let delay = isDeleting ? 50 : 80;
      if (!isDeleting && charIndex > current.length) {
        delay = 1800;
        isDeleting = true;
      } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
      }
      setTimeout(typeLoop, delay);
    }
    typeLoop();
  }

  // ── Sidebar link actions ────────────────────────────────────
  const githubNode = document.querySelector('[data-action="go-github"]');
  if (githubNode) {
    githubNode.addEventListener("click", () => {
      window.open("https://github.com/anirban1011", "_blank", "noopener,noreferrer");
    });
  }

  // ── Initialize Snake Game ───────────────────────────────────
  initSnakeGame();
});

// ─────────────────── SNAKE GAME ────────────────────────────────
function initSnakeGame() {
  const canvas = document.getElementById("gameCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const gridCellSize = 20;
  const cols = 12;
  const rows = 19;

  let snake = [];
  let direction = { x: 0, y: -1 };
  let nextDirection = { x: 0, y: -1 };
  let food = { x: 0, y: 0 };
  let score = 0;
  let foodLeft = 10;
  let gameInterval = null;
  let isPlaying = false;

  const foodDots = document.querySelectorAll("#foodDots .food-dot");
  const overlay = document.getElementById("gameOverlay");
  const overlayTitle = document.getElementById("gameOverlayTitle");
  const btnStart = document.getElementById("btnStartGame");

  if (btnStart) {
    btnStart.addEventListener("click", () => {
      startGame();
      if (overlay) overlay.style.display = "none";
    });
  }

  document.getElementById("btnUp")?.addEventListener("click", () => changeDirection(0, -1));
  document.getElementById("btnLeft")?.addEventListener("click", () => changeDirection(-1, 0));
  document.getElementById("btnDown")?.addEventListener("click", () => changeDirection(0, 1));
  document.getElementById("btnRight")?.addEventListener("click", () => changeDirection(1, 0));

  window.addEventListener("keydown", (e) => {
    if (!isPlaying) return;
    if (["ArrowUp", "KeyW"].includes(e.code)) { e.preventDefault(); changeDirection(0, -1); }
    else if (["ArrowLeft", "KeyA"].includes(e.code)) { e.preventDefault(); changeDirection(-1, 0); }
    else if (["ArrowDown", "KeyS"].includes(e.code)) { e.preventDefault(); changeDirection(0, 1); }
    else if (["ArrowRight", "KeyD"].includes(e.code)) { e.preventDefault(); changeDirection(1, 0); }
  });

  function startGame() {
    snake = [
      { x: 5, y: 10 }, { x: 5, y: 11 }, { x: 5, y: 12 }, { x: 5, y: 13 }
    ];
    direction = { x: 0, y: -1 };
    nextDirection = { x: 0, y: -1 };
    score = 0;
    foodLeft = 10;
    isPlaying = true;
    foodDots.forEach(dot => dot.classList.add("active"));
    spawnFood();
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(gameTick, 140);
  }

  function gameTick() {
    direction = nextDirection;
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
      gameOver(); return;
    }
    for (let seg of snake) {
      if (head.x === seg.x && head.y === seg.y) { gameOver(); return; }
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      foodLeft = Math.max(0, 10 - score);
      if (foodDots[10 - foodLeft - 1]) foodDots[10 - foodLeft - 1].classList.remove("active");
      if (foodLeft === 0) { gameWin(); return; } else { spawnFood(); }
    } else {
      snake.pop();
    }
    drawGame();
  }

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(30, 45, 61, 0.2)";
    ctx.lineWidth = 1;
    for (let c = 0; c < cols; c++) {
      ctx.beginPath(); ctx.moveTo(c * gridCellSize, 0); ctx.lineTo(c * gridCellSize, canvas.height); ctx.stroke();
    }
    for (let r = 0; r < rows; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * gridCellSize); ctx.lineTo(canvas.width, r * gridCellSize); ctx.stroke();
    }
    snake.forEach((seg, idx) => {
      ctx.fillStyle = idx === 0 ? "#43d9ad" : "#32a584";
      ctx.fillRect(seg.x * gridCellSize + 2, seg.y * gridCellSize + 2, gridCellSize - 4, gridCellSize - 4);
      if (idx === 0) {
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(seg.x * gridCellSize + gridCellSize / 2, seg.y * gridCellSize + gridCellSize / 2 - 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.fillStyle = "#fea15f";
    ctx.beginPath();
    ctx.arc(food.x * gridCellSize + gridCellSize / 2, food.y * gridCellSize + gridCellSize / 2, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#fea15f";
    ctx.beginPath();
    ctx.arc(food.x * gridCellSize + gridCellSize / 2, food.y * gridCellSize + gridCellSize / 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  function changeDirection(x, y) {
    if (snake.length > 0 && x === -direction.x && y === -direction.y) return;
    nextDirection = { x, y };
  }

  function spawnFood() {
    let valid = false;
    while (!valid) {
      food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
      valid = true;
      for (let seg of snake) {
        if (food.x === seg.x && food.y === seg.y) { valid = false; break; }
      }
    }
  }

  function gameOver() {
    isPlaying = false;
    clearInterval(gameInterval);
    drawGame();
    if (overlayTitle) {
      overlayTitle.textContent = "GAME OVER!";
      overlayTitle.classList.add("game-over");
    }
    if (btnStart) btnStart.textContent = "play-again";
    if (overlay) overlay.style.display = "flex";
  }

  function gameWin() {
    isPlaying = false;
    clearInterval(gameInterval);
    drawGame();
    if (overlayTitle) {
      overlayTitle.textContent = "YOU WIN!";
      overlayTitle.classList.remove("game-over");
    }
    if (btnStart) btnStart.textContent = "play-again";
    if (overlay) overlay.style.display = "flex";
  }

  // Initial draw (paused)
  startGame();
  isPlaying = false;
  clearInterval(gameInterval);
  drawGame();
}
