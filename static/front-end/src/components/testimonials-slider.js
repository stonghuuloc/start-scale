import { tns } from 'tiny-slider/src/tiny-slider';

export default function () {
  const testimonials_sliders = document.querySelector('#slider-testimonials');
  if (testimonials_sliders) {
    let default_opts = {
      container: testimonials_sliders.querySelector('.tns-slider'),
      axis: 'horizontal',
      items: 1,
      startIndex: 0,
      gutter: 0,
      fixedWidth: false,
      autoWidth: false,
      mode: 'carousel',
      center: false,
      mouseDrag: true,
      loop: false,
      rewind: true,
      autoplay: false,
      // autoplayTimeout: this.autoplayTimeout,
      // autoplayHoverPause: true,
      // autoplayButtonOutput: false,
      controls: true,
      controlsText: ['', ''],
      controlsContainer: testimonials_sliders.querySelector('.tns-controls'),
      nav: false,
      // navContainer: testimonials_sliders.querySelector('.tns-nav'),
      responsive: {
        768: {
          items: 2,
          gutter: 30,
        },
        992: {
          items: 3,
          gutter: 30,
          mouseDrag: false,
          // controls: false,
        },
        1200: {
          gutter: 60
        }
      }
    }

    tns(default_opts);
  }
}