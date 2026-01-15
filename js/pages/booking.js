import { ApiService, StorageService } from '../services/services.js';

document.addEventListener('DOMContentLoaded', async () => {
  const selectedListingId = StorageService.getSelectedListingId();

  if (!selectedListingId) {
    alert('No listing selected for booking.');
    window.location.href = 'index.html';
    return;
  }

  try {
    const listing = await ApiService.getListingById(selectedListingId);
    if (!listing) {
      alert('Listing not found.');
      window.location.href = 'index.html';
      return;
    }

    document.getElementById('booking-image').src = listing.image;
    document.getElementById('booking-image').alt = listing.title;
    document.getElementById('booking-title').textContent = listing.title;
    document.getElementById('booking-price').textContent = `$${listing.price}/night`;

    document.getElementById('booking-form').addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const checkin = document.getElementById('checkin').value;
      const checkout = document.getElementById('checkout').value;

      const booking = {
        listingId: selectedListingId,
        name,
        checkin,
        checkout,
        title: listing.title,
        price: listing.price
      };

      StorageService.addBooking(booking);

      document.getElementById('confirmation-modal').style.display = 'block';
      const confirmation = document.getElementById('confirmation');
      if (confirmation) {
        confirmation.textContent = `Success! Booking for "${listing.title}" is confirmed.`;
        confirmation.style.display = 'block';
      }

      this.querySelectorAll('input, button').forEach(elem => elem.disabled = true);
    });

    document.getElementById('close-modal').addEventListener('click', () => {
      document.getElementById('confirmation-modal').style.display = 'none';
      window.location.href = 'index.html';
    });

  } catch (error) {
    alert('Error loading booking info.');
    console.error(error);
    window.location.href = 'index.html';
  }
});
