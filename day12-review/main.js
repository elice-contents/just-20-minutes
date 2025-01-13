const starRating = document.getElementById("star-rating");
const ratingValue = document.getElementById("rating-value");
const keywords = document.getElementById("keywords");
const reviewForm = document.getElementById("review-form");
const stars = starRating.querySelectorAll(".star");

let currentRating = 0;

const setRatingByStep = (rawValue) => {
  return Math.ceil(rawValue / 0.5) / 2;
};

starRating.addEventListener("mousemove", (event) => {
  const { left } = starRating.getBoundingClientRect();
  const offsetX = event.clientX - left;
  const rawValue = (offsetX / starRating.offsetWidth) * 5;
  currentRating = setRatingByStep(rawValue);
  ratingValue.textContent = currentRating + "점";

  stars.forEach((star, index) => {
    if (index + 1 <= currentRating) star.textContent = "star";
    else if (index < currentRating && currentRating <= index + 1)
      star.textContent = "star_half";
    else star.textContent = "star_outline";
  });
});

let selectedKeywords = [];
keywords.addEventListener("click", (event) => {
  if (!event.target.classList.contains("keyword")) return;

  const keyword = event.target.textContent;
  if (selectedKeywords.includes(keyword)) {
    selectedKeywords = selectedKeywords.filter((k) => k !== keyword);
    event.target.classList.remove("active");
  } else if (selectedKeywords.length < 3) {
    selectedKeywords.push(keyword);
    event.target.classList.add("active");
  } else {
    alert("최대 3개의 키워드를 선택할 수 있습니다.");
  }
});

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("리뷰가 제출되었습니다!");
});
