const carouselButtonPrev = document.getElementById("carousel-button-prev");
const carouselButtonNext = document.getElementById("carousel-button-next");
const carouselImages = document.getElementById("carousel-images");
const slides = document.querySelectorAll(".carousel-image-slide__image");

let currentSlide = 1;

carouselButtonPrev.addEventListener("click", () => {
  if (currentSlide === 0) currentSlide = slides.length - 1;
  const from = -(1024 * currentSlide);
  const to = from + 1024;
  carouselImages.animate(
    {
      left: [from + "px", to + "px"],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );
  currentSlide--;
});

carouselButtonNext.addEventListener("click", () => {
  if (currentSlide === slides.length - 1) currentSlide = 0;
  const from = -(1024 * currentSlide);
  const to = from - 1024;
  carouselImages.animate(
    {
      left: [from + "px", to + "px"],
    },
    {
      duration: 500,
      easing: "ease",
      iterations: 1,
      fill: "both",
    }
  );
  currentSlide++;
});
