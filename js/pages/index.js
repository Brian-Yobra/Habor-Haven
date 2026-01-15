import { ApiService } from '../services/services.js';

let allListings = [];
let currentCategory = 'All';
let searchQuery = '';

const listingsContainer = document.getElementById('listings');
const galleryContainer = document.getElementById('image-gallery');
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.category-chip');

function renderListings() {
  listingsContainer.innerHTML = '';

  const filtered = allListings.filter(listing => {
    const matchesCategory = currentCategory === 'All' || listing.title.includes(currentCategory) || (listing.description && listing.description.includes(currentCategory));
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (listing.description && listing.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    listingsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">No listings found matching your criteria.</p>';
    return;
  }

  filtered.forEach(listing => {
    const card = document.createElement('a');
    card.href = `listing.html?id=${listing.id}`;
    card.className = 'listing-card';
    card.innerHTML = `
      <article>
        <img src="${listing.image}" alt="${listing.title}">
        <div class="listing-info">
          <h2>${listing.title}</h2>
          <p class="description">${(listing.description || '').substring(0, 60)}...</p>
          <p class="price-tag"><span>$${listing.price}</span> / night</p>
        </div>
      </article>
    `;
    listingsContainer.appendChild(card);
  });
}

function initializeGallery() {
  allListings.slice(0, 6).forEach(listing => {
    const thumb = document.createElement('img');
    thumb.src = listing.image;
    thumb.alt = listing.title;
    galleryContainer.appendChild(thumb);
  });
}

ApiService.getListings()
  .then(data => {
    allListings = data;
    renderListings();
    initializeGallery();
  })
  .catch(error => console.error('Failed to load listings:', error));

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderListings();
});

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.category;
    renderListings();
  });
});
