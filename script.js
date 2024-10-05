document.addEventListener("DOMContentLoaded", () => {
  const puzzleContainer = document.getElementById("puzzle");
  const moveCounter = document.getElementById("moveCounter");
  const timerElement = document.getElementById("timer");
  const resetButton = document.getElementById("resetButton");
  const modal = document.getElementById("winModal");
  const closeModal = document.querySelector(".close");
  const finalTime = document.getElementById("finalTime");
  const finalMoves = document.getElementById("finalMoves");
  
  let moveCount = 0;
  let emptyTileIndex = 15;
  let tiles = [];
  let startTime, timerInterval;

  // Create and shuffle tiles
  function createTiles() {
      const numbers = [...Array(15).keys()].map(n => n + 1);
      numbers.push(""); // Add empty tile
      numbers.sort(() => Math.random() - 0.5); // Shuffle tiles

      puzzleContainer.innerHTML = ""; // Clear puzzle

      numbers.forEach((number, index) => {
          const tile = document.createElement("div");
          tile.classList.add("tile");
          tile.innerText = number;
          if (number === "") {
              tile.classList.add("empty");
              emptyTileIndex = index;
          }
          tile.addEventListener("click", () => moveTile(index));
          puzzleContainer.appendChild(tile);
          tiles.push(tile);
      });
  }

  // Move tile if it's adjacent to the empty space
  function moveTile(index) {
      const adjacentTiles = [emptyTileIndex - 1, emptyTileIndex + 1, emptyTileIndex - 4, emptyTileIndex + 4];
      if (adjacentTiles.includes(index)) {
          // Swap tiles
          [tiles[emptyTileIndex].innerText, tiles[index].innerText] = [tiles[index].innerText, tiles[emptyTileIndex].innerText];
          tiles[emptyTileIndex].classList.toggle("empty");
          tiles[index].classList.toggle("empty");

          emptyTileIndex = index;
          moveCount++;
          moveCounter.textContent = moveCount;

          checkWin();
      }
  }

  // Check if the tiles are in order
  function checkWin() {
      const currentOrder = tiles.map(tile => tile.innerText).join("");
      if (currentOrder === "123456789101112131415") {
          clearInterval(timerInterval);
          displayWinMessage();
      }
  }

  // Timer functionality
  function startTimer() {
      startTime = new Date();
      timerInterval = setInterval(() => {
          const elapsedTime = Math.floor((new Date() - startTime) / 1000);
          const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
          const seconds = String(elapsedTime % 60).padStart(2, '0');
          timerElement.textContent = `${minutes}:${seconds}`;
      }, 1000);
  }

  // Display win message
  function displayWinMessage() {
      finalTime.textContent = timerElement.textContent;
      finalMoves.textContent = moveCount;
      modal.style.display = "block";
  }

  // Close modal
  closeModal.addEventListener("click", () => {
      modal.style.display = "none";
  });

  // Reset game
  resetButton.addEventListener("click", resetGame);

  function resetGame() {
      clearInterval(timerInterval);
      moveCount = 0;
      moveCounter.textContent = "0";
      timerElement.textContent = "00:00";
      createTiles();
      startTimer();
  }

  // Initialize the game
  createTiles();
  startTimer();
});
