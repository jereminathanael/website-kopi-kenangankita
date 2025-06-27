// Toggle class active for hamburger menu
const navbarNav = document.querySelector('.navbar-nav');
const menu = document.getElementById('hamburger-menu');

menu.addEventListener('click', () => {
  navbarNav.classList.toggle('active');
});

// Toggle class active for search form
const searchForm = document.querySelector('.search-form');
const search = document.getElementById('search');
const searchBox = document.getElementById('search-box');

search.addEventListener('click', (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
});

// Toggle class active for shopping cart
const shoppingBtn = document.getElementById('shopping-cart');
const shoppingCart = document.querySelector('.shopping-cart');

shoppingBtn.addEventListener('click', (e) => {
  shoppingCart.classList.toggle('active');
  e.preventDefault();
})


// remove when click outside box and buttonEvent
document.addEventListener('click', (e) => {
  if(!menu.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }

  if(!search.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }

  if(!shoppingBtn.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// Modal Box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

itemDetailButtons.forEach((btn) => {
  btn.onclick = (e) => {
    itemDetailModal.style.display = 'flex';
    e.preventDefault();
  };
});


// Click the close button
document.querySelector('.modal .close-icon').onclick = (e) => {
  itemDetailModal.style.display = 'none';
  e.preventDefault();
}

// Click outside of the box
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
}
