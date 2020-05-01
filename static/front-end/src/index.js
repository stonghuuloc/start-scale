import LazyLoad from "vanilla-lazyload";
import FontFaceObserver from "fontfaceobserver";
// import Scrollbar from "smooth-scrollbar";
import SmoothScroll from "smooth-scroll";
import ScrollMagic from "scrollmagic";
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
// -------------------------
// FONT AWESOME
// -------------------------
import { library, dom } from "@fortawesome/fontawesome-svg-core";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
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
import "./libs/_2_flexi-header";
import "./libs/_2_hiding-nav";
import "./libs/_1_tabs";
// -------------------------
import initAnimation from "./utils/animationHandler";
import initFeaturesliders from './components/features-slider';
import initSupportliders from './components/support-slider';
import initTestimonialsliders from './components/testimonials-slider';

import "assets/css/main.scss";

(function () {
  Util.addClass(document.documentElement, 'js');

  const font_primary = new FontFaceObserver('Source Sans Pro');
  const font_heading = new FontFaceObserver('Cabin');

  Promise.all([font_primary.load(), font_heading.load()]).then(() => {
    Util.addClass(document.documentElement, 'fonts-loaded');
  })

  if (!window.location.pathname) {
    Util.addClass($('.js-f-header')[0], 'hide-nav--fixed');
  }

  const scroll = new SmoothScroll('a[href*="#"]', { speed: 200 });

  const $ = document.querySelectorAll.bind(document);

  // init custom libs
  initAnimation();
  initFeaturesliders();
  initSupportliders();
  initTestimonialsliders();

  // Hero scroll parallax
  const controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: 'onEnter', duration: '200%'}});

  new ScrollMagic.Scene({triggerElement: '.hero--full-screen'})
    .setTween('.hero__background', {y: '30%', ease: Linear.easeNone})
    .addTo(controller)

  // init LazyLoadInstance at last
  const lazyLoadInstance = new LazyLoad({elements_selector: "[data-src], [data-bg], [data-srcset]"});
  dom.watch();
}())