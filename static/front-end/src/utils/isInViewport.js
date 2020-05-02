import { debounce } from '.';

// Check if element is in viewport
var isMobile = window.innerWidth < 768;
window.addEventListener('resize', debounce(() => {
  isMobile = window.innerWidth < 768;
}))

export default function isInViewport(el) {
  let offset = isMobile ? 100 : 200;
  const scroll = window.scrollY + offset || window.pageYOffset + offset;
  const boundsTop = el.getBoundingClientRect().top;

  const viewport = {
    top: scroll,
    bottom: scroll + window.innerHeight - offset
  };

  const bounds = {
    top: boundsTop + el.clientHeight / 4,
    bottom: boundsTop + el.clientHeight
  };

  return bounds.bottom > viewport.top && bounds.top < viewport.bottom;
}