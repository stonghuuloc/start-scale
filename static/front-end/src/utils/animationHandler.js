import "typesplit";

import isInViewport from './isInViewport';
import { throttle } from ".";

export default function () {
  const toAnimateEl = document.querySelectorAll('.to-animate');

  const splitTypeEls = document.querySelectorAll('[data-animate=type]');
  [...splitTypeEls].forEach(el => { SplitType(el, { split: 'lines, words' }); });

  toggleAnimate();
  window.addEventListener('scroll', throttle(toggleAnimate));

  function toggleAnimate() {
    [...toAnimateEl].forEach(el => {
      if (isInViewport(el) && !Util.hasClass(el, 'animated')) {
        let anim = el.dataset.animate || "up";
        let delay = parseInt(el.dataset.delay) || 0;
        if (window.innerWidth < 768 && delay) 
          delay = 1;
        // default animate options
        let animateCls = `animated delay-${delay}`;
        switch (anim) {
          case 'up':
            animateCls += ' fadeInUp';
            break;
          case 'down':
            animateCls += ' fadeInDown';
            break;
          case 'left':
            animateCls += ' fadeInLeft';
            break;
          case 'right':
            animateCls += ' fadeInRight';
            break;
          case 'zoom-in':
            animateCls += ' zoomIn';
            break;
          case 'type':
            let animTarget = el.getElementsByClassName('line');
            for (let lineIndex = 0; lineIndex < animTarget.length; lineIndex++) {
              const target = animTarget[lineIndex];
              setTimeout(() => {
                Util.addClass(target, "animated fadeInUp");
              }, lineIndex * 400);
            }
            break;
          default:
            break;
        }

        Util.removeClass(el, 'to-animate');
        Util.addClass(el, animateCls)
      }
    })
  }
}