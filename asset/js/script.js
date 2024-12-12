// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');
const totalPhotos = document.getElementById('total-photos');
const totalSliders = document.getElementById('total-sliders');

// Initialize counters
let photoCount = 0;
let sliderCount = 0;

// Function to count unique images based on src attribute
function countUniqueImages() {
    // Get all img elements
    const images = document.querySelectorAll('.slide img');
    const uniqueImages = new Set();

    // Track unique image sources
    images.forEach(img => {
        if (img.src) {
            const imagePath = img.src.split('/').pop(); // Get filename from path
            uniqueImages.add(imagePath);
        }
    });

    const imageList = [...uniqueImages];
    console.log('Found unique images:', imageList);
    return imageList.length;
}

// Function to count menu items excluding main
function countSliders() {
    const sliderItems = Array.from(menuItems).filter(item => 
        item.getAttribute('data-page') !== 'main'
    );
    console.log('Found slider items:', sliderItems.map(item => item.textContent));
    return sliderItems.length;
}

// Function to update photo count
function updatePhotoCount() {
    console.log('Updating photo count...');
    const count = countUniqueImages();
    photoCount = count;
    totalPhotos.textContent = count;
    console.log('Photo count updated to:', count);
}

// Function to update slider count
function updateSliderCount() {
    sliderCount = countSliders();
    totalSliders.textContent = sliderCount;
    console.log('Slider count updated to:', sliderCount);
}

// Navigation functionality
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('Menu item clicked:', item.getAttribute('data-page'));
        
        // Remove active class from all menu items and pages
        menuItems.forEach(i => i.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));

        // Add active class to clicked menu item and corresponding page
        item.classList.add('active');
        const pageId = item.getAttribute('data-page');
        document.getElementById(pageId).classList.add('active');
        
        // Update counts after page change
        updatePhotoCount();
    });
});

// Set up MutationObserver to watch for image changes
const observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;
    
    mutations.forEach(mutation => {
        // Check for added/removed nodes
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeName === 'IMG') shouldUpdate = true;
            });
            mutation.removedNodes.forEach(node => {
                if (node.nodeName === 'IMG') shouldUpdate = true;
            });
        }
        // Check for src attribute changes
        else if (mutation.type === 'attributes' && 
                 mutation.attributeName === 'src' && 
                 mutation.target.nodeName === 'IMG') {
            shouldUpdate = true;
        }
    });
    
    if (shouldUpdate) {
        console.log('Image changes detected, updating count...');
        updatePhotoCount();
    }
});

// Configure the observer
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['src']
});

// Initialize counters
function initializeCounts() {
    console.log('Initializing counts...');
    updatePhotoCount();
    updateSliderCount();
    console.log('Initialization complete');
}

// Start the counting process when the page loads
window.addEventListener('load', () => {
    console.log('Window loaded, starting initialization');
    initializeCounts();
});