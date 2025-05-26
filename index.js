fetch('listings.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const listingsContainer = document.getElementById('listings');
    const galleryContainer = document.getElementById('image-gallery');

    data.forEach(listing => {
      // Create listing card
      const card = document.createElement('a');
      // card.href = listing.link;
      card.href = `listing.html?id=${listing.id}`;
      card.className = 'listing-link';
      card.innerHTML = `
        <article>
          <img src="${listing.image}" alt="${listing.title}">
          <h2>${listing.title}</h2>
          <p>Price: $${listing.price}/night</p>
        </article>
      `;
      listingsContainer.appendChild(card);

      // Add to image gallery
      const thumb = document.createElement('img');
      thumb.src = listing.image;
      thumb.alt = listing.title;
      galleryContainer.appendChild(thumb);
    });
  })
  .catch(error => {
    console.error('Failed to load listings:', error);
  });
