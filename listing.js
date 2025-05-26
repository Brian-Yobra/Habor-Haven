const urlParams = new URLSearchParams(window.location.search);
const listingId = urlParams.get('id');

fetch('listings.json')
  .then(response => response.json())
  .then(data => {
    const listing = data.find(item => item.id === listingId);

    if (listing) {
      document.getElementById('image').src = listing.image;
      document.getElementById('image').alt = listing.title;
      document.getElementById('title').textContent = listing.title;
      document.getElementById('price').textContent = `$${listing.price}/night`;
      document.getElementById('description').textContent = listing.description || "No description available.";

      // Create Book button dynamically
      const bookButton = document.createElement('button');
      bookButton.textContent = 'Book Now';
      bookButton.className = 'book-btn';
      document.querySelector('.container').appendChild(bookButton);

      bookButton.addEventListener('click', () => {
        localStorage.setItem('selectedListingId', listing.id);
        window.location.href = 'booking.html';
      });
    } else {
      document.getElementById('image').style.display = 'none';
      document.getElementById('title').textContent = 'Listing not found';
      document.getElementById('price').textContent = '';
      document.getElementById('description').textContent = '';
    }
  })
  .catch(error => {
    document.getElementById('title').textContent = 'Error loading listing';
    console.error('Error fetching listing data:', error);
  });
