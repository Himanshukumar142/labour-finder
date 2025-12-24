document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('resultsGrid');
    const btnSearch = document.getElementById('btnSearch');
    const roleInput = document.getElementById('roleInput');
    const cityInput = document.getElementById('cityInput');

    // Render Function
    const renderCards = (data) => {
        grid.innerHTML = '';
        if (data.length === 0) {
            grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 2rem;">
                                <h3>No professionals found matching your criteria.</h3>
                              </div>`;
            return;
        }

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-header">
                    <h3 class="card-title">${item.name}</h3>
                    <span class="badge">${item.role}</span>
                </div>
                <div class="info-row">📍 ${item.location.city}, ${item.location.state}</div>
                <div class="info-row">🕒 ${item.timing}</div>
                <div class="info-row">📅 ${item.experience} Years Experience</div>
                <div class="info-row">📞 ${item.mobile}</div>
                <div class="info-row rating">★ ${item.rating} / 5.0</div>
                <div class="price">₹${item.rate} <span style="font-size:0.8rem; font-weight:400">/ day</span></div>
            `;
            grid.appendChild(card);
        });
    };

    // Filter Logic
    const handleSearch = () => {
        const role = roleInput.value;
        const city = cityInput.value.toLowerCase().trim();
        const allData = DataManager.getAll();

        const filtered = allData.filter(item => {
            const matchRole = role ? item.role === role : true;
            const matchCity = city ? item.location.city.toLowerCase() === city : true;
            return matchRole && matchCity;
        });

        renderCards(filtered);
    };

    // Listeners
    btnSearch.addEventListener('click', handleSearch);
    
    // Initial Load
    renderCards(DataManager.getAll());
});