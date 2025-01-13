const timerTime = document.getElementById("timer-time");
const circleProgress = document.querySelector(".circle-progress");
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resetButton = document.getElementById("reset-button");
const setMinutesInput = document.getElementById("set-minutes");
const setTimerButton = document.getElementById("set-timer-button");

let timerInterval = null;
let timeRemaining = 0;
let totalDuration = 0;

const updateTimerDisplay = () => {
  const hours = String(Math.floor(timeRemaining / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeRemaining % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(timeRemaining % 60).padStart(2, "0");
  timerTime.textContent = `${hours}:${minutes}:${seconds}`;

  const progress = (timeRemaining / totalDuration) * 628.318530718;
  circleProgress.style.strokeDashoffset = 628.318530718 - progress;
};

const startTimer = () => {
  if (timeRemaining <= 0 || timerInterval) return;

  circleProgress.classList.remove("paused");
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimerDisplay();

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      alert("타이머가 종료되었습니다!");
    }
  }, 1000);
};

const pauseTimer = () => {
  if (timerInterval) {
    circleProgress.classList.add("paused");
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

const resetTimer = () => {
  pauseTimer();
  circleProgress.classList.remove("paused");
  timeRemaining = totalDuration;
  updateTimerDisplay();
};

const setTimer = () => {
  const minutes = parseInt(setMinutesInput.value, 10);
  if (isNaN(minutes) || minutes < 0 || minutes > 60) {
    alert("0~60분 사이의 숫자를 입력해주세요.");
    return;
  }

  totalDuration = minutes * 60;
  timeRemaining = totalDuration;
  updateTimerDisplay();
};

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
setTimerButton.addEventListener("click", setTimer);

setTimer();
