const pageSize = 5; 
let pageNumber = 1; 

// Flag to track if lazy load has been triggered
let lazyLoadTriggered = false; 

/**
 * Fetches SpaceX data from the API.
 * @param {number} pageNumber - The page number to fetch data for.
 * @param {number} pageSize - The number of items per page.
 * @returns {Promise<Array>} - The fetched data.
 */
async function getSpaceXData(pageNumber, pageSize) {
    const response = await fetch(`https://api.spacexdata.com/v4/launches/?limit=${pageSize}&offset=${pageNumber * pageSize}`);
    const data = await response.json();
    return data;
}

/**
 * Unpacks and displays SpaceX data.
 * @param {Object} object - The SpaceX data object.
 */
function unpack(object) {
    const { name, details, flight_number, date_utc } = object;

    if (name && details && flight_number && date_utc) {
        const container = document.querySelector(".inner-container");
        const content = document.createElement("div");
        content.setAttribute("class", "content");
        content.setAttribute("data-name", name.toLowerCase());
        
        content.innerHTML = `
            <p>${flight_number}: ${name} ${new Date(date_utc).getFullYear()}</p>
            <p>Details: ${details}</p><br>
        `;

        container.appendChild(content);
    }
}

/**
 * Lazy loads SpaceX data.
 * @param {number} pageNumber - The page number to fetch data for.
 * @param {number} pageSize - The number of items per page.
 */
async function lazyLoadData(pageNumber, pageSize) {
    const innerContainer = document.querySelector(".inner-container");
    const loadingIndicator = document.getElementById("loadingIndicator");

    loadingIndicator.style.display = "block"
    innerContainer.style.boxShadow = "none";

    const data = await getSpaceXData(pageNumber, pageSize);

    const container = document.querySelector(".inner-container");
    container.innerHTML = "";

    data.forEach(item => unpack(item));

    loadingIndicator.style.display = "none";
    innerContainer.style.boxShadow = "1px 2px 3px grey";
    innerContainer.style.borderRadius = "9px";
}

// Intersection observer for lazy loading
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !lazyLoadTriggered) {
            pageNumber++;
            lazyLoadData(pageNumber, pageSize);
            lazyLoadTriggered = true; // Set flag to true to prevent further lazy loading
        } 
    });
});

const target = document.querySelector(".lazy-load-trigger");
observer.observe(target);

/**
 * Filters and displays content based on search keyword.
 * @param {string} keyword - The keyword to filter content by.
 */
function filterContent(keyword) {
    const contents = document.querySelectorAll(".content");
    contents.forEach(content => {
        const contentName = content.getAttribute("data-name").toLowerCase();
        if (contentName.includes(keyword.toLowerCase())) {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    });
}

// Event listener for input field to perform search
const keywordsInput = document.getElementById("keywords");
keywordsInput.addEventListener("input", (event) => {
    filterContent(event.target.value);
});
