const sidebar = document.querySelector(".sidebar");
const toggleBtn = document.querySelector(".toggle-btn");
const mobileToggle = document.querySelector(".mobile-toggle");
const overlay = document.querySelector(".overlay");
const logo = document.querySelector(".logo");

const sidebarItems = document.querySelectorAll(
  ".sidebar-nav li:not(.has-submenu)"
);
const submenuParents = document.querySelectorAll(".has-submenu");

// Toggle sidebar on desktop
toggleBtn.addEventListener("click", function () {
  sidebar.classList.toggle("collapsed");

  // Toggle between two logo versions
  if (logo.src.includes("logo.svg")) {
    logo.src = "assets/images/logo-collapsed.svg";
  } else {
    logo.src = "assets/images/logo.svg";
  }
});

// Toggle sidebar on mobile
mobileToggle.addEventListener("click", function () {
  sidebar.classList.toggle("show");
  overlay.classList.toggle("is-active");
});

overlay.addEventListener("click", function () {
  sidebar.classList.remove("show");
  overlay.classList.remove("is-active");
});

// Active menu item (for non-submenu items)
sidebarItems.forEach((item) => {
  item.addEventListener("click", function () {
    sidebarItems.forEach((i) => i.classList.remove("active"));
    this.classList.add("active");

    // Close sidebar on mobile after selection
    if (window.innerWidth <= 992) {
      sidebar.classList.remove("show");
    }
  });
});

// Submenu functionality
submenuParents.forEach((item) => {
  const link = item.querySelector("a:first-child");

  link.addEventListener("click", function (e) {
    if (window.innerWidth > 992 && !sidebar.classList.contains("collapsed")) {
      e.preventDefault();
      item.classList.toggle("active");

      // Close other submenus
      submenuParents.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
    }
  });
});

// Responsive adjustments
function handleResize() {
  if (window.innerWidth > 992) {
    sidebar.classList.remove("show");

    // Close all submenus when switching to desktop if sidebar is collapsed
    if (sidebar.classList.contains("collapsed")) {
      submenuParents.forEach((item) => {
        item.classList.remove("active");
      });
    }
  }
}

window.addEventListener("resize", handleResize);

// Tabs navigation pour page de details
// Récupère tous les liens d'onglets
const tabLinks = document.querySelectorAll(".nav-link");
const tabPanes = document.querySelectorAll(".tab-pane");

// Ajoute un écouteur d'événement à chaque lien
tabLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Retire la classe active de tous les liens et panneaux
    tabLinks.forEach((el) => el.classList.remove("active"));
    tabPanes.forEach((el) => el.classList.remove("active"));

    // Ajoute la classe active au lien cliqué
    this.classList.add("active");

    // Affiche le panneau correspondant
    const targetId = this.getAttribute("data-target");
    document.getElementById(targetId).classList.add("active");
  });
});
