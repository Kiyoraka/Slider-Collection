// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');
const totalPhotos = document.getElementById('total-photos');
const totalSliders = document.getElementById('total-sliders');

// Initialize counters
let photoCount = 0;
let sliderCount = 0;

// Function to count all images in the DOM
function countImages() {
    // Get all img elements across all sliders
    const images = document.querySelectorAll('img');
    return images.length;
}

// Function to count menu items excluding main
function countSliders() {
    const sliderItems = Array.from(menuItems).filter(item => 
        item.getAttribute('data-page') !== 'main'
    );
    return sliderItems.length;
}

// Function to update photo count
function updatePhotoCount() {
    photoCount = countImages();
    totalPhotos.textContent = photoCount;
}

// Function to update slider count
function updateSliderCount() {
    sliderCount = countSliders();
    totalSliders.textContent = sliderCount;
}

// Navigation functionality
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all menu items and pages
        menuItems.forEach(i => i.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));

        // Add active class to clicked menu item and corresponding page
        item.classList.add('active');
        const pageId = item.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
    });
});

// Initialize counters
function initializeCounts() {
    updatePhotoCount();
    updateSliderCount();
}

// Start the counting process when the page loads
// Wait for all images to load before counting
window.addEventListener('load', initializeCounts);