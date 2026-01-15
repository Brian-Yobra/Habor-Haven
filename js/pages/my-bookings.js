import { ApiService, StorageService } from '../services/services.js';

document.addEventListener('DOMContentLoaded', () => {
    const bookingsList = document.getElementById('bookings-list');
    const noBookings = document.getElementById('no-bookings');

    async function loadBookings() {
        const bookings = StorageService.getBookings();

        if (bookings.length === 0) {
            bookingsList.style.display = 'none';
            noBookings.style.display = 'block';
            return;
        }

        bookingsList.style.display = 'grid';
        noBookings.style.display = 'none';
        bookingsList.innerHTML = '';

        try {
            const listings = await ApiService.getListings();
            bookings.forEach((booking, index) => {
                const listing = listings.find(l => l.id === booking.listingId);
                const card = document.createElement('div');
                card.className = 'booking-card';
                card.innerHTML = `
                    <img src="${listing ? listing.image : 'https://via.placeholder.com/150'}" alt="${booking.title}">
                    <div class="booking-details">
                        <h2>${booking.title}</h2>
                        <p class="dates">${booking.checkin} to ${booking.checkout}</p>
                        <p class="price">$${booking.price} total</p>
                        <button class="cancel-btn" data-index="${index}">Cancel Booking</button>
                    </div>
                `;
                bookingsList.appendChild(card);
            });

            document.querySelectorAll('.cancel-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    cancelBooking(e.target.dataset.index);
                });
            });
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    }

    function cancelBooking(index) {
        if (confirm('Are you sure you want to cancel this booking?')) {
            StorageService.removeBooking(index);
            loadBookings();
        }
    }

    loadBookings();
});
