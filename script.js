const ball = document.querySelector(".ball");
const playground = document.getElementById("playground");

let ballPosition = { left: 0, top: 0 };
let rotation = 0;

// Переміщення м'яча
function moveBall(direction, step) {
  switch (direction) {
    case "left":
      ballPosition.left = Math.max(ballPosition.left - step, 0);
      break;
    case "right":
      ballPosition.left = Math.min(
        ballPosition.left + step,
        playground.clientWidth - ball.offsetWidth
      );
      break;
    case "up":
      ballPosition.top = Math.max(ballPosition.top - step, 0);
      break;
    case "down":
      ballPosition.top = Math.min(
        ballPosition.top + step,
        playground.clientHeight - ball.offsetHeight
      );
      break;
  }

  ball.style.left = `${ballPosition.left}px`;
  ball.style.top = `${ballPosition.top}px`;
}

// Обертання м'яча
function rotateBall(degrees) {
  rotation = (rotation + degrees) % 360;
  ball.style.transform = `rotate(${rotation}deg)`;
}

// Обробка клавіш
function ballKeydownListener(event) {
  let direction;
  let step = 100;

  if (event.ctrlKey) step = 1;
  else if (event.shiftKey) step = 10;

  switch (event.key) {
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowRight":
      direction = "right";
      break;
    case "ArrowUp":
      direction = "up";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case " ":
      event.preventDefault();
      rotateBall(90);
      return;
  }

  if (direction) moveBall(direction, step);
}

// Drag-and-Drop
ball.addEventListener("mousedown", (event) => {
  const shiftX = event.clientX - ball.getBoundingClientRect().left;
  const shiftY = event.clientY - ball.getBoundingClientRect().top;

  function moveAt(pageX, pageY) {
    ballPosition.left = Math.min(
      Math.max(pageX - shiftX, 0),
      playground.clientWidth - ball.offsetWidth
    );
    ballPosition.top = Math.min(
      Math.max(pageY - shiftY, 0),
      playground.clientHeight - ball.offsetHeight
    );

    ball.style.left = `${ballPosition.left}px`;
    ball.style.top = `${ballPosition.top}px`;
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", onMouseMove);

  document.addEventListener(
    "mouseup",
    () => {
      document.removeEventListener("mousemove", onMouseMove);
    },
    { once: true }
  );
});

ball.addEventListener("keydown", ballKeydownListener);
ball.addEventListener("click", () => rotateBall(90));
document.addEventListener("keydown", ballKeydownListener);

ball.ondragstart = () => false;
