import LazyLoad from "vanilla-lazyload";
import FontFaceObserver from "fontfaceobserver";
// import Scrollbar from "smooth-scrollbar";
import SmoothScroll from "smooth-scroll";
import "./libs/_2_hiding-nav";
import "./libs/custom-select";
import "./components/portfolio";
// import ScrollMagic from "scrollmagic";
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
// -------------------------
// FONT AWESOME
// -------------------------
import { library, dom } from "@fortawesome/fontawesome-svg-core";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faTimes } from "@fortawesome/free-solid-svg-icons/faTimes";
import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faMediumM } from '@fortawesome/free-brands-svg-icons/faMediumM';
import { faCcMastercard } from '@fortawesome/free-brands-svg-icons/faCcMastercard';
import { faCcVisa } from '@fortawesome/free-brands-svg-icons/faCcVisa';
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons/faCcPaypal';
import { faCcStripe } from '@fortawesome/free-brands-svg-icons/faCcStripe';

library.add(
  faChevronLeft,
  faChevronRight,
  faTimes,
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faMediumM,
  faCcMastercard,
  faCcVisa,
  faCcPaypal,
  faCcStripe
);

// -------------------------
import "./libs/_1_anim-menu-btn";
import "./libs/_1_modal-window";
// import "./libs/_1_tabs";
import "./libs/_1_read-more";
import "./libs/_2_flexi-header";
// import "./libs/_2_hiding-nav";
// -------------------------
import initAnimation from "./utils/animationHandler";
import initFeaturesliders from './components/features-slider';
import initSupportliders from './components/support-slider';
import initTestimonialsliders from './components/testimonials-slider';

import "assets/css/main.scss";
import { throttle } from "./utils";
import isInViewport from "./utils/isInViewport";

(function () {
  Util.addClass(document.documentElement, 'js');
  const $ = document.querySelectorAll.bind(document);
  const scroll = new SmoothScroll('a[href*="#"]', { speed: 200 });

  const font_primary = new FontFaceObserver('Source Sans Pro');
  const font_heading = new FontFaceObserver('Cabin');

  Promise.all([font_primary.load(), font_heading.load()]).then(() => {
    Util.addClass(document.documentElement, 'fonts-loaded');
    setTimeout(function(){ 
      $('#layout')[0].style.opacity = 1
    }, 500);
  })

  if (!window.location.pathname.slice(1)) {
    Util.addClass(document.querySelector('.js-f-header'), 'f-header--transparent');
  }

  // NAV SCROLLSPY
  const navLinks = document.querySelectorAll('.f-header__link');
  let anchors = [];
  for (let index = 0; index < navLinks.length; index++) {
    const element = navLinks[index];
    let url = new URL(element.href);
    if (url.hash) {
      anchors.push({
        index,
        hash: url.hash.slice(1)
      });
    }
  }

  if (anchors.length) {
    let currentActive = [];
    window.addEventListener('scroll', throttle(() => {
      if (!currentActive.length) {
        for (let i = 0; i < anchors.length; i++) {
          const element = anchors[i];
          const target = document.getElementById(element.hash);
          if (target && isInViewport(target)) {
            Util.addClass(document.querySelectorAll('.f-header__item')[element.index], 'active');
            currentActive.push(element);
            break;
          }
        }
      } else {
        const target = document.getElementById(currentActive[0].hash);
        if (target && !isInViewport(target)) {
          Util.removeClass(document.querySelectorAll('.f-header__item')[currentActive[0].index], 'active');
          currentActive = [];
        }
      }
    }))
  }
  // END OF NAV SCROLLSPY


  // if ($('.custom-select').length) {
  //   import('./libs/custom-select').then(module => module.default());
  // }

  // if ($('.portfolio-list').length) {
  //   import('./components/portfolio').then(module => module.default());
  // }


  // init custom libs
  initAnimation();
  initFeaturesliders();
  initSupportliders();
  initTestimonialsliders();

  const inputFiles = $('input[type="file"]');
  if (inputFiles.length) {
    for (let index = 0; index < inputFiles.length; index++) {
      const element = inputFiles[index];
      const label = element.previousElementSibling;

      element.addEventListener('change', function () {
        let fileName = element.files[0].name;
        label.childNodes[1].textContent = fileName;
      })
    }
  }

  // init LazyLoadInstance at last
  const lazyLoadInstance = new LazyLoad({elements_selector: "[data-src], [data-bg], [data-srcset]"});
  dom.watch();
}())