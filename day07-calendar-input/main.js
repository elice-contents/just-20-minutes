const dateInput = document.getElementById("date-input");
const calendarDropdown = document.getElementById("calendar-dropdown");
const calendarTitle = document.getElementById("calendar-title");
const calendarDays = document.getElementById("calendar-days");

let currentDate = new Date();
let selectedDate = null;

const renderCalendar = () => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarTitle.textContent = `${year}년 ${month + 1}월`;

  calendarDays.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += `<span></span>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayButton = document.createElement("button");
    dayButton.textContent = day;

    if (
      selectedDate &&
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    ) {
      dayButton.classList.add("active");
    }

    dayButton.addEventListener("click", () => {
      selectedDate = new Date(year, month, day);
      const formattedDate = `${year}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      dateInput.value = formattedDate;

      const prevActive = calendarDays.querySelector(".active");
      if (prevActive) prevActive.classList.remove("active");

      dayButton.classList.add("active");
    });

    calendarDays.appendChild(dayButton);
  }
};

document.getElementById("prev-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("next-month").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

calendarDropdown.addEventListener("mousedown", (event) => {
  event.preventDefault();
});

renderCalendar();
