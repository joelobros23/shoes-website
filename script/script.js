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

    // Hide the "arrow-up" button when on the first page (current page is 0)
    if (currentPage === 0) {
      document.querySelector('.arrow-up').style.display = 'none';
    } else {
      document.querySelector('.arrow-up').style.display = 'flex';
    }
    if (currentPage === 3) {
      document.querySelector('.arrow-down').style.display = 'none';
    } else {
      document.querySelector('.arrow-down').style.display = 'flex';
    }
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

    // Hide the "arrow-up" button when on the first page (current page is 0)
    if (currentPage === 0) {
      document.querySelector('.arrow-up').style.display = 'none';
    } else {
      document.querySelector('.arrow-up').style.display = 'flex';
    } 
    
    // Hide the "arrow-up" button when on the first page (current page is 0)
    if (currentPage === 3) {
      document.querySelector('.arrow-down').style.display = 'none';
    } else {
      document.querySelector('.arrow-down').style.display = 'flex';
    } 
  }
}

if (currentPage === 0) {
  document.querySelector('.arrow-up').style.display = 'none';
} else {
  document.querySelector('.arrow-up').style.display = 'flex';
}
if (currentPage === 3) {
  document.querySelector('.arrow-down').style.display = 'none';
} else {
  document.querySelector('.arrow-down').style.display = 'flex';
}
// Apply the initial transform classes
for (let i = 1; i < pages.length; i++) {
  pages[i].classList.add('next');

}

// Set the initial active page after the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  pages[currentPage].classList.add('active');
});



// Function to handle arrow button click
function handleArrowButtonClick(direction) {
  if (direction === 1) {
    scrollToNextPage();
  } else if (direction === -1) {
    scrollToPreviousPage();
  }
}


// Listen for keydown events on the document
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowDown') {
    scrollToNextPage();
  }
  if (event.key === 'ArrowUp') {
    scrollToPreviousPage();
  }
});