const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");
const mobileToggle = document.getElementById("mobileToggle");
const sidebarItems = document.querySelectorAll(
  ".sidebar-nav li:not(.has-submenu)"
);
const submenuParents = document.querySelectorAll(".has-submenu");

// Toggle sidebar on desktop
toggleBtn.addEventListener("click", function () {
  sidebar.classList.toggle("collapsed");
});

// Toggle sidebar on mobile
mobileToggle.addEventListener("click", function () {
  sidebar.classList.toggle("show");
});

// Close sidebar when clicking outside on mobile
document.addEventListener("click", function (e) {
  if (
    window.innerWidth <= 992 &&
    !sidebar.contains(e.target) &&
    e.target !== mobileToggle
  ) {
    sidebar.classList.remove("show");
  }
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
