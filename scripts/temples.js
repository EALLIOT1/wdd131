// Array of Temple Objects
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/temples/bc/TEMPLE/thumbnail/aba-nigeria-temple.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/temples/bc/TEMPLE/thumbnail/manti-temple.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/temples/bc/TEMPLE/thumbnail/payson-utah-temple.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/temples/bc/TEMPLE/thumbnail/yigo-guam-temple.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/temples/bc/TEMPLE/thumbnail/washington-dc-temple.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/temples/bc/TEMPLE/thumbnail/lima-peru-temple.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/temples/bc/TEMPLE/thumbnail/mexico-city-temple.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://content.churchofjesuschrist.org/temples/bc/TEMPLE/thumbnail/accra-ghana-temple.jpg"
  },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19184,
    imageUrl:
      "https://content.churchofjesuschrist.org/temples/bc/TEMPLE/thumbnail/johannesburg-south-africa-temple.jpg"
  }
];

// DOM Element Targets
const container = document.querySelector(".res-grid");
const pageHeading = document.querySelector("main h2");
const navLinks = document.querySelectorAll("nav a");

// Function to Render Temple Cards
function createTempleCard(filteredTemples) {
  container.innerHTML = ""; // Clear existing cards
  
  filteredTemples.forEach((temple) => {
    let card = document.createElement("section");
    card.classList.add("temple-card");

    let name = document.createElement("h3");
    name.textContent = temple.templeName;

    let location = document.createElement("p");
    location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

    let dedicated = document.createElement("p");
    dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

    let area = document.createElement("p");
    area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

    let img = document.createElement("img");
    img.setAttribute("src", temple.imageUrl);
    img.setAttribute("alt", `${temple.templeName} Temple`);
    img.setAttribute("loading", "lazy");
    img.setAttribute("width", "400");
    img.setAttribute("height", "250");

    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);
    card.appendChild(img);

    container.appendChild(card);
  });
}

// Event Listeners for Filtering
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = e.target.textContent;
    pageHeading.textContent = filter;

    switch (filter) {
      case "Old":
        createTempleCard(
          temples.filter((t) => {
            let year = parseInt(t.dedicated.split(",")[0]);
            return year < 1900;
          })
        );
        break;
      case "New":
        createTempleCard(
          temples.filter((t) => {
            let year = parseInt(t.dedicated.split(",")[0]);
            return year > 2000;
          })
        );
        break;
      case "Large":
        createTempleCard(temples.filter((t) => t.area > 90000));
        break;
      case "Small":
        createTempleCard(temples.filter((t) => t.area < 10000));
        break;
      default: // "Home"
        createTempleCard(temples);
        break;
    }
  });
});

// Footer Dates Logic
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

// Initial Render on Page Load
createTempleCard(temples);
