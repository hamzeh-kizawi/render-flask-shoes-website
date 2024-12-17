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