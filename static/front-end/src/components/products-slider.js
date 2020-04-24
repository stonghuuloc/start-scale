import { tns } from 'tiny-slider/src/tiny-slider';

export default function () {
  if (document.querySelector('.products-slider')) {
    const products_sliders = document.querySelectorAll('.products-slider');

    for (let i = 0; i < products_sliders.length; i++) {
      const element = products_sliders[i];

      let default_opts = {
        container: element.querySelector('.tns-slider'),
        axis: 'horizontal',
        items: 1,
        startIndex: 0,
        gutter: 32,
        fixedWidth: false,
        autoWidth: false,
        mode: 'carousel',
        center: false,
        mouseDrag: false,
        loop: false,
        rewind: true,
        autoplay: false,
        // autoplayTimeout: this.autoplayTimeout,
        // autoplayHoverPause: true,
        // autoplayButtonOutput: false,
        controls: true,
        controlsText: ['', ''],
        controlsContainer: element.querySelector('.tns-controls'),
        nav: true,
        // navContainer: element.querySelector('.tns-nav'),
        responsive: {
          1200: { items: 4 },
          992: { items: 3 },
          768: { items: 2 }
        }
      }

      tns(default_opts);
    }
  }
}