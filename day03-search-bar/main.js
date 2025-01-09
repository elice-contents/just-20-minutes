const searchInput = document.getElementById("query");
const keyword = document.getElementById("keyword");

let timeoutId;

searchInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    keyword.textContent = searchInput.value;
  }, 300);
});
