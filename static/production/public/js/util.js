function Util(){}if(Util.hasClass=function(t,e){return t.classList?t.classList.contains(e):!!t.className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))},Util.addClass=function(t,e){var n=e.split(" ");t.classList?t.classList.add(n[0]):Util.hasClass(t,n[0])||(t.className+=" "+n[0]),1<n.length&&Util.addClass(t,n.slice(1).join(" "))},Util.removeClass=function(t,e){var n=e.split(" ");if(t.classList)t.classList.remove(n[0]);else if(Util.hasClass(t,n[0])){var o=new RegExp("(\\s|^)"+n[0]+"(\\s|$)");t.className=t.className.replace(o," ")}1<n.length&&Util.removeClass(t,n.slice(1).join(" "))},Util.toggleClass=function(t,e,n){n?Util.addClass(t,e):Util.removeClass(t,e)},Util.setAttributes=function(t,e){for(var n in e)t.setAttribute(n,e[n])},Util.getChildrenByClassName=function(t,e){t.children;for(var n=[],o=0;o<t.children.length;o++)Util.hasClass(t.children[o],e)&&n.push(t.children[o]);return n},Util.is=function(t,e){if(e.nodeType)return t===e;for(var n="string"==typeof e?document.querySelectorAll(e):e,o=n.length;o--;)if(n[o]===t)return!0;return!1},Util.setHeight=function(o,t,s,i,r){var a=t-o,l=null,u=function(t){var e=t-(l=l||t),n=parseInt(e/i*a+o);s.style.height=n+"px",e<i?window.requestAnimationFrame(u):r()};s.style.height=o+"px",window.requestAnimationFrame(u)},Util.scrollTo=function(o,s,i,t){var r=t||window,a=r.scrollTop||document.documentElement.scrollTop,l=null;t||(a=window.scrollY||document.documentElement.scrollTop);var u=function(t){var e=t-(l=l||t);s<e&&(e=s);var n=Math.easeInOutQuad(e,a,o-a,s);r.scrollTo(0,n),e<s?window.requestAnimationFrame(u):i&&i()};window.requestAnimationFrame(u)},Util.moveFocus=function(t){(t=t||document.getElementsByTagName("body")[0]).focus(),document.activeElement!==t&&(t.setAttribute("tabindex","-1"),t.focus())},Util.getIndexInArray=function(t,e){return Array.prototype.indexOf.call(t,e)},Util.cssSupports=function(t,e){return"CSS"in window?CSS.supports(t,e):t.replace(/-([a-z])/g,function(t){return t[1].toUpperCase()})in document.body.style},Util.extend=function(){var n={},o=!1,t=0,e=arguments.length;"[object Boolean]"===Object.prototype.toString.call(arguments[0])&&(o=arguments[0],t++);function s(t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(o&&"[object Object]"===Object.prototype.toString.call(t[e])?n[e]=extend(!0,n[e],t[e]):n[e]=t[e])}for(;t<e;t++){s(arguments[t])}return n},Util.osHasReducedMotion=function(){if(!window.matchMedia)return!1;var t=window.matchMedia("(prefers-reduced-motion: reduce)");return!!t&&t.matches},Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(t){var e=this;if(!document.documentElement.contains(e))return null;do{if(e.matches(t))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null}),"function"!=typeof window.CustomEvent){function CustomEvent(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}CustomEvent.prototype=window.Event.prototype,window.CustomEvent=CustomEvent}Math.easeInOutQuad=function(t,e,n,o){return(t/=o/2)<1?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e},Math.easeInQuart=function(t,e,n,o){return n*(t/=o)*t*t*t+e},Math.easeOutQuart=function(t,e,n,o){return t/=o,-n*(--t*t*t*t-1)+e},Math.easeInOutQuart=function(t,e,n,o){return(t/=o/2)<1?n/2*t*t*t*t+e:-n/2*((t-=2)*t*t*t-2)+e},Math.easeOutElastic=function(t,e,n,o){var s=1.70158,i=.7*o,r=n;if(0==t)return e;if(1==(t/=o))return e+n;if(i=i||.3*o,r<Math.abs(n)){r=n;s=i/4}else s=i/(2*Math.PI)*Math.asin(n/r);return r*Math.pow(2,-10*t)*Math.sin((t*o-s)*(2*Math.PI)/i)+n+e},function(){var o=document.getElementsByClassName("js-tab-focus");function e(){0<o.length&&(s(!1),window.addEventListener("keydown",n)),window.removeEventListener("mousedown",e)}function n(t){9===t.keyCode&&(s(!0),window.removeEventListener("keydown",n),window.addEventListener("mousedown",e))}function s(t){for(var e=t?"":"none",n=0;n<o.length;n++)o[n].style.setProperty("outline",e)}window.addEventListener("mousedown",e)}();