const emailInputBox = document.getElementById("email-input-box");
const emailList = document.getElementById("email-list");

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const addEmail = (email) => {
  if (!isValidEmail(email)) {
    alert("유효하지 않은 이메일입니다.");
    return;
  }

  const emailItem = document.createElement("div");
  emailItem.className = "email-input__email-item";

  emailItem.innerHTML = `
    <div class="profile-picture"></div>
    <div class="email-address">${email}</div>
    <button class="remove-button">&times;</button>
  `;

  emailList.insertBefore(emailItem, emailInputBox);

  const removeButton = emailItem.querySelector(".remove-button");
  removeButton.addEventListener("click", () => {
    emailItem.remove();
  });
};

emailInputBox.addEventListener("keydown", (event) => {
  const email = emailInputBox.textContent.trim();

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (email) {
      addEmail(email);
      emailInputBox.textContent = "";
    }
  }

  if (event.key === "Backspace") {
    if (email.length === 0) {
      event.preventDefault();
      const emailItems = emailList.querySelectorAll(".email-input__email-item");
      const lastEmail = Array.from(emailItems)[emailItems.length - 1];
      if (lastEmail) {
        lastEmail.remove();
      }
    }
  }
});

emailInputBox.addEventListener("blur", () => {
  const email = emailInputBox.textContent.trim();
  if (email) {
    addEmail(email);
    emailInputBox.textContent = "";
  }
});
