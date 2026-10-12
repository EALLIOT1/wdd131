/* ElddyTechSolution WDD131 project JavaScript */
"use strict";

const BUSINESS = {
  name: "ElddyTechSolution",
  motto: "Tech Made Simple",
  storageKey: "elddytechsolution-inquiries"
};

const serviceOptions = [
  { value: "Business website", label: "Business Website" },
  { value: "Social media setup", label: "Social Media Setup" },
  { value: "Digital business support", label: "Digital Business Support" }
];

function setCurrentYear() {
  const yearElement = document.querySelector("#current-year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function setupMobileNavigation() {
  const menuButton = document.querySelector("#menu-toggle");
  const navigation = document.querySelector("#primary-nav");
  if (!menuButton || !navigation) return;

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("open", !isOpen);
    menuButton.textContent = isOpen ? "Menu" : "Close";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    });
  });
}

function getSavedInquiries() {
  try {
    const saved = localStorage.getItem(BUSINESS.storageKey);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn("Saved inquiries could not be read.", error);
    return [];
  }
}

function saveInquiries(inquiries) {
  try {
    localStorage.setItem(BUSINESS.storageKey, JSON.stringify(inquiries));
    return true;
  } catch (error) {
    console.error("Saved inquiries could not be stored.", error);
    return false;
  }
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(dateString));
}

function renderSavedInquiries() {
  const list = document.querySelector("#saved-inquiries");
  if (!list) return;

  const inquiries = getSavedInquiries();
  if (inquiries.length === 0) {
    list.innerHTML = `<p class="empty-state">No inquiries saved on this browser yet.</p>`;
    return;
  }

  list.innerHTML = inquiries
    .slice()
    .reverse()
    .map((inquiry) => `
      <article class="saved-item">
        <strong>${escapeHTML(inquiry.fullName)} — ${escapeHTML(inquiry.service)}</strong>
        <p>${escapeHTML(inquiry.businessName || "Business name not provided")} · ${escapeHTML(inquiry.email)}</p>
        <p>${escapeHTML(inquiry.message)}</p>
        <time datetime="${escapeHTML(inquiry.createdAt)}">Saved ${escapeHTML(formatDate(inquiry.createdAt))}</time>
      </article>
    `).join("");
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };
    return replacements[character];
  });
}

function handleContactForm() {
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = "Please complete the required fields before saving.";
      status.classList.add("error");
      return;
    }

    const formData = new FormData(form);
    const inquiry = {
      fullName: String(formData.get("fullName")).trim(),
      businessName: String(formData.get("businessName")).trim(),
      email: String(formData.get("email")).trim(),
      service: String(formData.get("service")),
      message: String(formData.get("message")).trim(),
      createdAt: new Date().toISOString()
    };

    // Conditional branching gives clear feedback when browser storage is unavailable.
    if (inquiry.fullName.length < 2 || inquiry.message.length < 10) {
      status.textContent = "Please enter your name and a little more detail about your project.";
      status.classList.add("error");
      return;
    }

    const inquiries = getSavedInquiries();
    inquiries.push(inquiry);

    if (saveInquiries(inquiries)) {
      status.textContent = `Thank you, ${inquiry.fullName}! Your inquiry has been saved in this browser.`;
      status.classList.remove("error");
      form.reset();
      renderSavedInquiries();
    } else {
      status.textContent = "This browser could not save your inquiry. Please try another browser or device.";
      status.classList.add("error");
    }
  });
}

function setupClearButton() {
  const clearButton = document.querySelector("#clear-inquiries");
  const status = document.querySelector("#form-status");
  if (!clearButton) return;

  clearButton.addEventListener("click", () => {
    const inquiries = getSavedInquiries();
    if (inquiries.length === 0) {
      if (status) status.textContent = "There are no saved inquiries to clear.";
      return;
    }

    const confirmed = window.confirm("Delete all inquiries saved in this browser?");
    if (confirmed) {
      localStorage.removeItem(BUSINESS.storageKey);
      renderSavedInquiries();
      if (status) {
        status.textContent = "Saved inquiries have been cleared from this browser.";
        status.classList.remove("error");
      }
    }
  });
}

function addServiceSummary() {
  const serviceContainer = document.querySelector("#featured-services");
  if (!serviceContainer) return;

  // The array method find() is used to select a relevant service object.
  const websiteService = serviceOptions.find((service) => service.value === "Business website");
  if (websiteService) {
    serviceContainer.setAttribute("aria-label", `${BUSINESS.name} services include ${serviceOptions.map((service) => service.label).join(", ")}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  setupMobileNavigation();
  addServiceSummary();
  handleContactForm();
  setupClearButton();
  renderSavedInquiries();
});
