const hamburger = document.querySelector(".hamburger");
// const menuClose = document.querySelector(".menu-close");
const navigationMenu = document.querySelector(".navigation-menu");

hamburger.addEventListener("click", function () {
  navigationMenu.classList.toggle("open");
  hamburger.classList.toggle("open");
});

menuClose.addEventListener("click", function () {
  navigationMenu.classList.remove("open");
});
