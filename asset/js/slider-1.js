// Slider Elements
const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Current slide state
let currentSlide = 0;

// Slider functionality
function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

// Add event listeners for slider buttons
if (prevButton && nextButton) {
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
}