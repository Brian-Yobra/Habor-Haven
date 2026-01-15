export const ApiService = {
    async getListings() {
        try {
            const response = await fetch('data/listings.json');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('ApiService.getListings failed:', error);
            throw error;
        }
    },

    async getListingById(id) {
        const listings = await this.getListings();
        return listings.find(item => item.id === id);
    }
};

export const StorageService = {
    KEYS: {
        SELECTED_LISTING_ID: 'selectedListingId',
        BOOKINGS: 'bookings'
    },

    getSelectedListingId() {
        return localStorage.getItem(this.KEYS.SELECTED_LISTING_ID);
    },

    setSelectedListingId(id) {
        localStorage.setItem(this.KEYS.SELECTED_LISTING_ID, id);
    },

    getBookings() {
        return JSON.parse(localStorage.getItem(this.KEYS.BOOKINGS)) || [];
    },

    addBooking(booking) {
        const bookings = this.getBookings();
        bookings.push(booking);
        localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(bookings));
    },

    removeBooking(index) {
        const bookings = this.getBookings();
        bookings.splice(index, 1);
        localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(bookings));
    }
};
