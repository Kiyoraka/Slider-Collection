// DOM Elements
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');
const totalPhotos = document.getElementById('total-photos');

// Initialize photo counter
let photoCount = 0;

// Function to count files recursively in a directory
async function countFiles(directory) {
    try {
        const files = await window.fs.readdir(directory);
        let count = 0;

        for (const file of files) {
            const path = `${directory}/${file}`;
            const stats = await window.fs.stat(path);

            if (stats.isDirectory()) {
                // If it's a directory, recursively count files inside
                count += await countFiles(path);
            } else {
                // If it's a file, increment counter
                count++;
            }
        }

        return count;
    } catch (error) {
        console.error('Error counting files:', error);
        return 0;
    }
}

// Function to update photo count
function updatePhotoCount(count) {
    photoCount = count;
    totalPhotos.textContent = photoCount;
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

// Initialize file count
async function initializeFileCount() {
    const count = await countFiles('assets');
    updatePhotoCount(count);
}

// Start the counting process when the page loads
initializeFileCount();