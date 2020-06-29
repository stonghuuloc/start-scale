import { debounce } from '.';

// Check if element is in viewport
var isMobile = window.innerWidth < 768;
window.addEventListener('resize', debounce(() => {
  isMobile = window.innerWidth < 768;
}))

export default function isInViewport(el) {
  const HEADER_CLASS = '.f-header';
  const offsetHeader = document.querySelector(HEADER_CLASS).clientHeight;
  // const scroll = window.scrollY + offset || window.pageYOffset + offset;
  const boundsTop = el.getBoundingClientRect().top;
  const boundsBottom = el.getBoundingClientRect().bottom;

  const viewport = {
    top: window.innerHeight / 4 + offsetHeader,
    bottom: window.innerHeight * 3 / 4 + offsetHeader
  };

  const bounds = {
    top: boundsTop,
    bottom: boundsBottom
  };

  return bounds.bottom > viewport.top && bounds.top < viewport.bottom;
}