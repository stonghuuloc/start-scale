/*! For license information please see 1.js.LICENSE */
(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{28:function(e,t){!function(){var e=document.getElementsByClassName("js-hide-nav");if(e.length>0&&window.requestAnimationFrame){var t=Array.prototype.filter.call(e,(function(e){return Util.hasClass(e,"js-hide-nav--main")})),n=Array.prototype.filter.call(e,(function(e){return Util.hasClass(e,"js-hide-nav--sub")})),i=!1,a=window.scrollY,r=window.scrollY,s=150,l=0,o=!1;t.length>0&&Util.hasClass(t[0],"hide-nav--fixed")&&(o=!0);var d=function(){var t=e[0].getAttribute("data-mobile-trigger");if(!t)return!1;if(0==t.indexOf("#")){if(n=document.getElementById(t.replace("#","")))return n}else{var n;if((n=e[0].getElementsByClassName(t)).length>0)return n[0]}return!1}(),u=function(){if(t.length<1)return!1;var e=document.createElement("div");e.setAttribute("aria-hidden","true"),t[0].parentElement.insertBefore(e,t[0]);var n=t[0].previousElementSibling;return n.style.opacity="0",n}(),f=0,c=e[0].getAttribute("data-nav-target-class"),g=[];function h(){l=t[0].offsetHeight}function v(){n.length<1||t.length<1||(n[0].style.top=l+"px")}function m(){!o||t.length<1||(t[0].style.marginBottom="-"+l+"px")}function w(){(r=window.scrollY)-a>10&&r>s?function(){if(n.length>0&&n[0].getBoundingClientRect().top>l)return;if(d&&"true"==d.getAttribute("aria-expanded"))return;!(t.length>0)||c&&function(){for(var e=!1,n=0;n<g.length;n++)if(Util.hasClass(t[0],g[n].trim())){e=!0;break}return e}()||(y(t[0],"-100%"),t[0].addEventListener("transitionend",C));n.length>0&&y(n[0],"-"+l+"px")}():a-r>10||a-r>0&&r<s?p():a-r>0&&n.length>0&&n[0].getBoundingClientRect().top>0&&y(n[0],"0%");var e=window.scrollY||window.pageYOffset;Util.toggleClass(t[0],"hide-nav--has-bg",e>l+f),a=r,i=!1}function p(){t.length>0&&(y(t[0],"0%"),Util.removeClass(t[0],"hide-nav--off-canvas"),t[0].removeEventListener("transitionend",C)),n.length>0&&y(n[0],"0%")}function C(){t[0].removeEventListener("transitionend",C),Util.addClass(t[0],"hide-nav--off-canvas")}function y(e,t){e.style.transform="translateY("+t+")"}function b(){u&&(f=u.getBoundingClientRect().top+window.scrollY)}c&&(g=c.split(" ")),b(),f>0&&(s+=f),h(),v(),m(),w(),window.addEventListener("scroll",(function(e){i||(i=!0,window.requestAnimationFrame(w))})),window.addEventListener("resize",(function(e){i||(i=!0,window.requestAnimationFrame((function(){l>0&&(b(),h(),v(),m()),p(),i=!1})))}))}else{if((t=document.getElementsByClassName("js-hide-nav--main")).length<1)return;Util.hasClass(t[0],"hide-nav--fixed")&&Util.addClass(t[0],"hide-nav--has-bg")}}()}}]);