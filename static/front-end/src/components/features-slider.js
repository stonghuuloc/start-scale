import { tns } from 'tiny-slider/src/tiny-slider';

export default function () {
  const features_sliders = document.querySelector('#slider-features');
  if (features_sliders) {
    let default_opts = {
      container: features_sliders.querySelector('.tns-slider'),
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
      autoplay: false,
      // autoplayTimeout: this.autoplayTimeout,
      // autoplayHoverPause: true,
      // autoplayButtonOutput: false,
      controls: true,
      controlsText: ['', ''],
      controlsContainer: features_sliders.querySelector('.tns-controls'),
      nav: false,
      // navContainer: features_sliders.querySelector('.tns-nav'),
    }

    tns(default_opts);
  }
}