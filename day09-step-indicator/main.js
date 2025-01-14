const steps = [
  { title: "기본 정보" },
  { title: "주소 입력" },
  { title: "결제 정보" },
  { title: "확인 및 제출" },
  { title: "완료" },
];

let currentStep = 0;

const stepIndicatorSteps = document.getElementById("step-indicator-steps");
const prevButton = document.getElementById("prev-step");
const nextButton = document.getElementById("next-step");

const renderSteps = () => {
  stepIndicatorSteps.innerHTML = steps.reduce(
    (acc, step, index) =>
      acc +
      `
        <li class="${
          index < currentStep || currentStep === steps.length - 1
            ? "completed"
            : index === currentStep
            ? "active"
            : ""
        }">
          <div class="step-indicator-steps__step-circle">${index + 1}</div>
          <div class="step-indicator-steps__step-title">${step.title}</div>
        </li>`,
    ""
  );
};

const updateControls = () => {
  prevButton.disabled = currentStep === 0;
  nextButton.disabled = currentStep === steps.length - 1;
  renderSteps();
};

prevButton.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updateControls();
  }
});

nextButton.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateControls();
  }
});

updateControls();
