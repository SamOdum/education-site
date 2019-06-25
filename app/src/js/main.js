/* ==== Drop Mobile Nav ==== */

//Link to navbar toggle input
//link to navbar links
//For each navbar link clicked close navbar and goto link

var toggle = document.querySelector('.header__navbar--toggle-bar');
var toggler = document.querySelector('.header__navbar--navigation-container');
var navbarLinks = document.querySelectorAll('.header__navbar--link');

toggle.addEventListener('click', function() {
  return toggler.classList.toggle('is-open');
});

navbarLinks.forEach(function(navbarLink) {
  navbarLink.addEventListener('click', function() {
    return toggler.classList.toggle('is-open');
    }
  );
});

document.addEventListener('click', function(e) {
  if (!e.target.matches('.header__navbar--toggle-bar')) {
  return console.log('clicked', + e.target);
  }

  // return toggler.classList.toggle('is-open');
});

//Carousel manual slide
let slides = document.querySelectorAll(".large-hero__carousel-content");
let dots = document.querySelectorAll(".dot");
// showSlides(slideIndex);

//Automatic Carousel slide
let slideIndex = 0;
showSlides();

 function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active"); 
    dots[i].classList.remove("selected"); 
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1} 
  slides[slideIndex-1].classList.add("active"); 
  dots[slideIndex-1].classList.add("selected"); 
  setTimeout(showSlides, 5000); // Change image every 2 seconds
};

dots.forEach((dot, index)=>{
  dot.addEventListener('click',()=>{
    for (let i=0; i<dots.length; i++){
      dots[i].classList.remove('selected');
      slides[i].classList.remove('active');
    }
    dot.classList.add('selected');

    matchSlide();
  })
})


function matchSlide() {
  for (let j = 0; j < slides.length; j++) {
    if (dots[j].classList.contains('selected')) {
      slides[j].classList.add('active');
      slideIndex = j;
    }
  }
}
// //Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   if (n > slides.length) {slideIndex = 1} 
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].classList.remove('active'); 
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace("selected", "");
//   }
//   slides[slideIndex-1].classList.add('active'); 
//   dots[slideIndex-1].className += "selected";
// }


