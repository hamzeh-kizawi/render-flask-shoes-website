// slider js

const slider = document.querySelector('.slider');
let sliderIndex = 0;

function autoSlider(){
  sliderIndex = (sliderIndex + 1) % slider.children.length;
  const offset = sliderIndex * slider.clientWidth;
  slider.scrollTo({left: offset, behavior: 'smooth'})
}

setInterval(autoSlider, 5000);

// end slider

// blur slider

let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
}
// end blur slider

// about function

document.addEventListener("DOMContentLoaded", () => {
  const smallImages = document.querySelectorAll(".about_small_image img");

  smallImages.forEach((small) => {
      small.addEventListener("click", () => {
          const full = document.getElementById("image-box");
          full.src = small.src; 
      });
  });
});

document.getElementById("Men-shop").addEventListener("click", (event)=>{
 event.preventDefault();
 window.scroll({top:0, behavior: "smooth"});
});

//end about function