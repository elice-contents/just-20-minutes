const progressBarList = document.getElementById("progress-bar-list");
const progressBar = document.getElementById("progress-bar");
const h1 = document.querySelector("h1");
const h2s = document.querySelectorAll("h2");

const li = document.createElement("li");
li.textContent = h1.textContent;
li.classList.add("progress-bar__item");
progressBarList.appendChild(li);

h2s.forEach((h2) => {
  const li = document.createElement("li");
  li.textContent = h2.textContent;
  li.classList.add("progress-bar__item");
  progressBarList.appendChild(li);
});

window.addEventListener("scroll", () => {
  const { scrollY, innerHeight } = window;
  const { offsetHeight } = document.body;
  const max = offsetHeight - innerHeight;
  const percentage = (scrollY / max) * 100;
  progressBar.style.width = `${percentage}%`;

  let currentH2;
  let index = 0;
  for (const h2 of Array.from(h2s)) {
    const { offsetTop } = h2;
    if (offsetTop > scrollY) break;
    currentH2 = h2;
    index++;
  }

  progressBarList.style.top = `-${4 * index}rem`;
});
