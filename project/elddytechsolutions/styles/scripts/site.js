
/* ElddyTechSolutions — Tech Made Simple */

const siteInfo = {
  name: `ElddyTechSolutions`,
  motto: `Tech Made Simple`
};

const services = [
  {
    title: `Web Development`,
    description: `Responsive websites that help businesses build a professional online presence.`
  },
  {
    title: `IT Support`,
    description: `Practical troubleshooting and technology guidance for everyday challenges.`
  },
  {
    title: `Cloud Solutions`,
    description: `Digital tools that support collaboration, flexibility, and productivity.`
  }
];

function readSavedTheme() {
  try {
    return localStorage.getItem(`elddytech-theme`) || `dark`;
  } catch (error) {
    return `dark`;
  }
}

function applyTheme(theme) {
  const isLight = theme === `light`;

  document.body.classList.toggle(`light-theme`, isLight);

  const themeButton = document.querySelector(
    `.theme-toggle, #theme-toggle`
  );

  if (themeButton) {
    themeButton.setAttribute(
      `aria-pressed`,
      String(isLight)
    );

    themeButton.textContent = isLight
      ? `Switch to dark mode`
      : `Switch to light mode`;
  }

  try {
    localStorage.setItem(`elddytech-theme`, isLight ? `light` : `dark`);
  } catch (error) {
    // The theme still works for the current page if storage is unavailable.
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains(`light-theme`);
  applyTheme(isLight ? `dark` : `light`);
}

function setupThemeButton() {
  const themeButton = document.querySelector(
    `.theme-toggle, #theme-toggle`
  );

  applyTheme(readSavedTheme());

  if (themeButton) {
    themeButton.addEventListener(`click`, toggleTheme);
  }
}

function setupMobileMenu() {
  const menuButton = document.querySelector(
    `.menu-toggle, #menu-toggle`
  );

  const menu = document.querySelector(
    `#primary-menu, .nav-links`
  );

  if (!menuButton || !menu) {
    return;
  }

  menuButton.setAttribute(`aria-expanded`, `false`);

  menuButton.addEventListener(`click`, () => {
    const isOpen = menu.classList.toggle(`is-open`);

    menuButton.setAttribute(`aria-expanded`, String(isOpen));
    menuButton.setAttribute(
      `aria-label`,
      isOpen ? `Close navigation menu` : `Open navigation menu`
    );
  });

  menu.querySelectorAll(`a`).forEach((link) => {
    link.addEventListener(`click`, () => {
      menu.classList.remove(`is-open`);
      menuButton.setAttribute(`aria-expanded`, `false`);
      menuButton.setAttribute(`aria-label`, `Open navigation menu`);
    });
  });

  window.addEventListener(`resize`, () => {
    if (window.innerWidth > 760) {
      menu.classList.remove(`is-open`);
      menuButton.setAttribute(`aria-expanded`, `false`);
    }
  });
}

function updateCopyrightYear() {
  const yearElement = document.querySelector(
    `.current-year, #current-year`
  );

  if (yearElement) {
    yearElement.textContent = `${new Date().getFullYear()}`;
  }
}

function renderServices() {
  const serviceContainer = document.querySelector(`#dynamic-services`);

  if (!serviceContainer) {
    return;
  }

  serviceContainer.innerHTML = services.map((service) => `
    <article class="service-card">
      <h3>${service.title}</h3>
      <p>${service.description}</p>
    </article>
  `).join(``);
}

function setupContactForm() {
  const form = document.querySelector(`#contact-form`);
  const status = document.querySelector(`#form-status`);

  if (!form || !status) {
    return;
  }

  form.addEventListener(`submit`, (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);

    const submission = {
      name: formData.get(`name`)?.toString().trim() || ``,
      email: formData.get(`email`)?.toString().trim() || ``,
      service: formData.get(`service`)?.toString() || ``,
      message: formData.get(`message`)?.toString().trim() || ``,
      submittedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(
        `elddytech-contact-draft`,
        JSON.stringify(submission)
      );

      status.textContent =
        `Thank you, ${submission.name}. Your form passed validation, and a local draft was saved. This demo does not send your message to ElddyTechSolutions.`;
    } catch (error) {
      status.textContent =
        `Your form passed validation, but this browser could not save a local draft. No message was sent.`;
    }
  });
}

function initializeSite() {
  document.querySelectorAll(`[data-site-name]`).forEach((element) => {
    element.textContent = siteInfo.name;
  });

  setupThemeButton();
  setupMobileMenu();
  updateCopyrightYear();
  renderServices();
  setupContactForm();
}

document.addEventListener(`DOMContentLoaded`, initializeSite);

