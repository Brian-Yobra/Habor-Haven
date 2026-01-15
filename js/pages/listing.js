import { ApiService, StorageService } from '../services/services.js';

const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get('id');

ApiService.getListingById(listingId)
  .then(listing => {
    if (listing) {
      document.getElementById('image').src = listing.image;
      document.getElementById('image').alt = listing.title;
      document.getElementById('title').textContent = listing.title;
      document.getElementById('price').textContent = `$${listing.price}/night`;
      document.getElementById('description').textContent = listing.description || "No description available.";

      const bookButton = document.createElement('button');
      bookButton.textContent = `Book for $${listing.price}/night`;
      bookButton.className = 'book-btn';
      document.getElementById('booking-cta').appendChild(bookButton);

      bookButton.addEventListener('click', () => {
        StorageService.setSelectedListingId(listing.id);
        window.location.href = 'booking.html';
      });
    } else {
      document.getElementById('image').style.display = 'none';
      document.getElementById('title').textContent = 'Listing not found';
    }
  })
  .catch(error => {
    document.getElementById('title').textContent = 'Error loading listing';
    console.error('Error fetching listing data:', error);
  });
