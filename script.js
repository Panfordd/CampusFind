const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");
    menuToggle.setAttribute("aria-expanded", isOpen);
});


// Display recently reported items on the homepage

const recentItemsContainer = document.getElementById("recent-items-container");

function displayRecentItems() {
    let output = "";

    for (let i = 0; i < items.length; i++) {
        output += `
            <div class="item-card">
                <span class="item-type">${items[i].type}</span>

                <h3>${items[i].name}</h3>

                <p><strong>Category:</strong> ${items[i].category}</p>
                <p><strong>Location:</strong> ${items[i].location}</p>
                <p><strong>Date:</strong> ${items[i].date}</p>

                <a href="details.html?id=${items[i].id}" class="details-link">
                    View Details
                </a>
            </div>
        `;
    }

    recentItemsContainer.innerHTML = output;
}

if (recentItemsContainer) {
    displayRecentItems();
}