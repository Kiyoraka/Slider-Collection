// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');
const totalPhotos = document.getElementById('total-photos');

// Initialize photo counter
let photoCount = 0;

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

// Function to update photo count
function updatePhotoCount(count) {
    photoCount = count;
    totalPhotos.textContent = photoCount;
}

// Initialize with some demo data
updatePhotoCount(12);