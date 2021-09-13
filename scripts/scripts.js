var slideIndex = 1;
var dots = document.getElementsByClassName("dot");
var slides = document.getElementsByClassName("slides");
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

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

showSlides(slideIndex);