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

// Browse Items page

const browseItemsContainer = document.getElementById("browse-items-container");
const searchInput = document.getElementById("search-input");
const typeFilter = document.getElementById("type-filter");

function displayBrowseItems(filteredItems) {
    let output = "";

    for (let i = 0; i < filteredItems.length; i++) {
        output += `
            <div class="item-card">
                <span class="item-type">${filteredItems[i].type}</span>

                <h3>${filteredItems[i].name}</h3>

                <p><strong>Category:</strong> ${filteredItems[i].category}</p>
                <p><strong>Location:</strong> ${filteredItems[i].location}</p>
                <p><strong>Date:</strong> ${filteredItems[i].date}</p>

                <a href="details.html?id=${filteredItems[i].id}" class="details-link">
                    View Details
                </a>
            </div>
        `;
    }

    if (filteredItems.length === 0) {
        output = "<p>No matching items found.</p>";
    }

    browseItemsContainer.innerHTML = output;
}

if (browseItemsContainer) {
    displayBrowseItems(items);
}


// Search and filter reported items

function filterItems() {
    const searchText = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;

    let matchingItems = [];

    for (let i = 0; i < items.length; i++) {
        const itemName = items[i].name.toLowerCase();
        const itemLocation = items[i].location.toLowerCase();

        const matchesSearch =
            itemName.includes(searchText) ||
            itemLocation.includes(searchText);

        const matchesType =
            selectedType === "All" ||
            items[i].type === selectedType;

        if (matchesSearch && matchesType) {
            matchingItems.push(items[i]);
        }
    }

    displayBrowseItems(matchingItems);
}

if (browseItemsContainer) {
    searchInput.addEventListener("input", filterItems);
    typeFilter.addEventListener("change", filterItems);
}

// Report an Item form

const reportForm = document.getElementById("report-form");
const formMessage = document.getElementById("form-message");

if (reportForm) {
    reportForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const itemType = document.getElementById("item-type").value;
        const itemName = document.getElementById("item-name").value.trim();
        const itemCategory = document.getElementById("item-category").value;
        const itemLocation = document.getElementById("item-location").value.trim();
        const itemDate = document.getElementById("item-date").value;
        const itemDescription = document.getElementById("item-description").value.trim();

        if (
            itemType === "" ||
            itemName === "" ||
            itemCategory === "" ||
            itemLocation === "" ||
            itemDate === "" ||
            itemDescription === ""
        ) {
            formMessage.textContent = "Please fill in all fields.";
            formMessage.style.color = "red";
        } else {
            formMessage.textContent =
                "Your report has been validated successfully! This is a demo, so the report has not been saved.";

            formMessage.style.color = "green";

            reportForm.reset();
        }
    });
}

// Item Details page

const itemDetailsContainer = document.getElementById("item-details-container");

if (itemDetailsContainer) {

    // Get the item ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = Number(urlParams.get("id"));

    let selectedItem = null;

    // Find the item with the matching ID
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === itemId) {
            selectedItem = items[i];
            break;
        }
    }

    // Display the selected item
    if (selectedItem !== null) {
        itemDetailsContainer.innerHTML = `
            <div class="item-card">
                <span class="item-type">${selectedItem.type}</span>

                <h2>${selectedItem.name}</h2>

                <p><strong>Category:</strong> ${selectedItem.category}</p>
                <p><strong>Location:</strong> ${selectedItem.location}</p>
                <p><strong>Date:</strong> ${selectedItem.date}</p>
                <p><strong>Description:</strong> ${selectedItem.description}</p>
            </div>
        `;
    } else {
        itemDetailsContainer.textContent = "Item not found.";
    }
}