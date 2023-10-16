//* Image Slider
const slides = document.querySelectorAll(".img-slider__slide");
const btns = document.querySelectorAll(".btn");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const numberOfSlides = slides.length;
let currentSlide = 0;

//* function for manual navigation using buttons
const manualNav = function (element) {
  slides.forEach((slide) => {
    slide.classList.remove("active");

    btns.forEach((btn) => {
      btn.classList.remove("active");
    });
  });

  slides[element].classList.add("active");
  btns[element].classList.add("active");
};

btns.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    manualNav(i);
    currentSlide = i;
  });
});

//* function for manual navigation using arrows
//* Next button
nextBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });
  currentSlide++;

  if (currentSlide > numberOfSlides - 1) {
    currentSlide = 0;
  }

  slides[currentSlide].classList.add("active");
  btns[currentSlide].classList.add("active");
});

//* Prev button
prevBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  btns.forEach((btn) => {
    btn.classList.remove("active");
  });

  currentSlide--;

  if (currentSlide < 0) {
    currentSlide = numberOfSlides - 1;
  }

  slides[currentSlide].classList.add("active");
  btns[currentSlide].classList.add("active");
});

//* function for autoplay navigation
let playSlider;

const autoplayNav = () => {
  if (playSlider) {
    clearInterval(playSlider); //* Clear the existing interval if it exists
  }

  playSlider = setInterval(function () {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });
    btns.forEach((btn) => {
      btn.classList.remove("active");
    });

    currentSlide++;

    if (currentSlide > numberOfSlides - 1) {
      currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
    btns[currentSlide].classList.add("active");
  }, 5000);
};
autoplayNav();

// const searchInput = document.getElementById("search");

// searchInput.addEventListener("keyup", (e) => {
//   console.log(e);
// });

//* Fetch data to the Books section

const bookCardTemplate = document.querySelector("[data-book-template]");
const bookCardContainer = document.querySelector(".books__grid");

fetch("http://localhost:3000/books?_start=0&_limit=10")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((book) => {
      const card = bookCardTemplate.content.cloneNode(true).children[0];
      const bookAuthor = card.querySelector(".book__author");
      const bookTitle = card.querySelector(".book__title");
      const bookImage = card.querySelector(".book__img");
      bookImage.src = book.image;
      bookAuthor.textContent = book.author;
      bookTitle.textContent = book.title;
      bookCardContainer.appendChild(card);
    });
  });