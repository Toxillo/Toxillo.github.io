var hamburger = document.querySelector(".hamburger");
var mobileNav = document.querySelector(".mobile-nav");
var backdrop = document.querySelector(".backdrop");


backdrop.addEventListener("click", function() {
  mobileNav.classList.remove("open");
  backdrop.classList.remove("open");
  setTimeout(function() {
    backdrop.style.display = "none";
  }, 200);
});

hamburger.addEventListener("click", function() {
  mobileNav.classList.toggle("open");
  hamburger.classList.toggle("is_active");
  backdrop.style.display = "block";
  setTimeout(function() {
    backdrop.classList.toggle("open");
  }, 10);
});
