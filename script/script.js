// Get all the page elements with the class "page"
const pages = document.querySelectorAll('.page');
let currentPage = 0;

function scrollToNextPage() {
  if (currentPage < pages.length - 1) {
    pages[currentPage].classList.remove('active');
    currentPage++;
    const nextPageOffset = pages[currentPage].offsetTop;
    window.scrollTo({
      top: nextPageOffset,
      behavior: 'auto'
    });
    pages[currentPage].classList.add('active');
    pages[currentPage].classList.remove('next');
    pages[currentPage - 1].classList.add('previous');
  }
}

function scrollToPreviousPage() {
  if (currentPage > 0) {
    pages[currentPage].classList.remove('active');
    currentPage--;
    const previousPageOffset = pages[currentPage].offsetTop;
    window.scrollTo({
      top: previousPageOffset,
      behavior: 'auto'
    });
    pages[currentPage].classList.add('active');
    pages[currentPage].classList.remove('previous');
    pages[currentPage + 1].classList.add('next');
  }
}

// Apply the initial transform classes
for (let i = 1; i < pages.length; i++) {
  pages[i].classList.add('next');
}

// Set the initial active page after the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  pages[currentPage].classList.add('active');
});

// Listen for keydown events on the document
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    scrollToNextPage();
  }
  if (event.key === 'ArrowUp') {
    scrollToPreviousPage();
  }
});

// Listen for wheel events on the document
document.addEventListener('wheel', (event) => {
  // Get the delta value to determine the scroll direction
  const delta = event.deltaY;

  // Check if the scroll direction is down and the delta is within the range of 0 to 100
  if (delta > 0 && delta <= 100) {
    scrollToNextPage();
  }

  // Check if the scroll direction is up and the delta is within the range of 0 to -100
  if (delta < 0 && delta >= -100) {
    scrollToPreviousPage();
  }
});