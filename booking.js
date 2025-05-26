document.addEventListener('DOMContentLoaded', () => {
  const selectedListingId = localStorage.getItem('selectedListingId');

  if (!selectedListingId) {
    alert('No listing selected for booking.');
    window.location.href = 'index.html';
    return;
  }

  fetch('listings.json')
    .then(response => response.json())
    .then(data => {
      const listing = data.find(item => item.id === selectedListingId);
      if (!listing) {
        alert('Listing not found.');
        window.location.href = 'index.html';
        return;
      }

      document.getElementById('booking-image').src = listing.image;
      document.getElementById('booking-image').alt = listing.title;
      document.getElementById('booking-title').textContent = listing.title;
      document.getElementById('booking-price').textContent = `$${listing.price}/night`;
      document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
      
        // Show the modal
        document.getElementById('confirmation-modal').style.display = 'block';
      
        // Disable inputs and button if you want
        this.querySelectorAll('input, button').forEach(elem => elem.disabled = true);
      });
      
      // Close modal button
      document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('confirmation-modal').style.display = 'none';
      });
      window.addEventListener('click', function(event) {
        const modal = document.getElementById('confirmation-modal');
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
      
      

      const form = document.getElementById('booking-form');
      const confirmation = document.getElementById('confirmation');

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // You can add validation and booking logic here
        const name = document.getElementById('name').value;
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;

        // Save booking data to localStorage or send to backend
        const booking = {
          listingId: selectedListingId,
          name,
          checkin,
          checkout,
          title: listing.title,
          price: listing.price
        };

        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        confirmation.textContent = `Thank you, ${name}! Your booking for "${listing.title}" from ${checkin} to ${checkout} is confirmed.`;
        form.style.display = 'none';
      });
    })
    .catch(error => {
      alert('Error loading booking info.');
      console.error(error);
      window.location.href = 'index.html';
    });
});
