import { tns } from 'tiny-slider/src/tiny-slider';

export default function () {
  const support_sliders = document.querySelector('#slider-support');
  if (support_sliders) {
    let default_opts = {
      container: support_sliders.querySelector('.tns-slider'),
      axis: 'horizontal',
      items: 1,
      startIndex: 0,
      gutter: 52,
      fixedWidth: false,
      autoWidth: false,
      mode: 'carousel',
      center: true,
      mouseDrag: true,
      loop: false,
      rewind: true,
      autoplay: true,
      speed: 600,
      autoplayTimeout: 3000,
      // autoplayHoverPause: true,
      // autoplayButtonOutput: false,
      controls: true,
      controlsText: ['', ''],
      controlsContainer: support_sliders.querySelector('.tns-controls'),
      nav: false,
      // navContainer: support_sliders.querySelector('.tns-nav'),
      responsive: {
        768: {
          controls: false,
          nav: true
        }
      }
    }

    tns(default_opts);
  }
}