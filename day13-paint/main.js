const canvas = document.getElementById("drawing-canvas");
const ctx = canvas.getContext("2d");

const lineWidthInput = document.getElementById("line-width");
const lineColorInput = document.getElementById("line-color");
const clearButton = document.getElementById("clear-button");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "#000000";

let isDrawing = false;
let lastX = 0;
let lastY = 0;

const startDrawing = (event) => {
  isDrawing = true;
  const { offsetX, offsetY } = event;
  lastX = offsetX;
  lastY = offsetY;
};

const draw = (event) => {
  if (!isDrawing) return;
  const { offsetX, offsetY } = event;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(offsetX, offsetY);
  ctx.stroke();

  lastX = offsetX;
  lastY = offsetY;
};

const stopDrawing = () => {
  isDrawing = false;
};

lineWidthInput.addEventListener("input", (event) => {
  ctx.lineWidth = event.target.value;
});

lineColorInput.addEventListener("input", (event) => {
  ctx.strokeStyle = event.target.value;
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
