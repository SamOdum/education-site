/* Created by Sam Odum for Sam Odum (c) 2017 */

/* ==== Greeting ==== */

//Create a new date object
// Find the current hour
// Display the appropriate greeting based on the current time

const today = new Date();
const hourNow = today.getHours();

const greeting = hourNow => {
    let greet;
    
    if (hourNow >= 16)
    greet = 'Good evening.';
    else if (hourNow >= 12) 
    greet = 'Good afternoon.';
    else if (hourNow > 0) 
    greet = 'Good morning.';
    
    return greet;
}


// document.getElementById('greeting').textContent = greeting();


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
let slideIndex = 1;
let slides = document.querySelectorAll(".large-hero__carousel-content");
let dots = document.querySelectorAll(".dot");
showSlides(slideIndex);

slides.forEach(slide=>{
  slide.addEventListener('click', console.log('clicked'))
})

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active'); 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" selected", "");
  }
  slides[slideIndex-1].classList.add('active'); 
  dots[slideIndex-1].className += " selected";
}


//Automatic Carousel slide
// let slideIndex = 0;
// showSlides();

// function showSlides() {
//   let i;
//   let slides = document.getElementsByClassName("large-hero__carousel-content");
//   for (i = 0; i < slides.length; i++) {
//     slides[i].classList.remove(".active"); 
//   }
//   slideIndex++;
//   if (slideIndex > slides.length) {slideIndex = 1} 
//   slides[slideIndex-1].classList.add(".active"); 
//   setTimeout(showSlides, 2000); // Change image every 2 seconds
// }





// /* When the user clicks on the button,
// toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
// }

// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {

//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// };

// //Hambuger Animation
// function myFunction(x) {
//     x.classList.toggle("change");
// }
