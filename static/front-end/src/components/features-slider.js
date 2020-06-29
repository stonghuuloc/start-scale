import { tns } from 'tiny-slider/src/tiny-slider';

export default function () {
  const features_sliders = document.querySelectorAll('.slider--features');

  if (features_sliders.length) {
    for (let index = 0; index < features_sliders.length; index++) {
      const element = features_sliders[index];

      let default_opts = {
        container: element.querySelector('.tns-slider'),
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
        controlsContainer: element.querySelector('.tns-controls'),
        nav: false,
        // navContainer: element.querySelector('.tns-nav'),
      }

      tns(default_opts);
    }
  }
}