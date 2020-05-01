(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./src/libs/custom-select.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass CustomSelect {\n  constructor(element) {\n    this.element = element;\n    this.select = this.element.querySelector('select');\n    this.options = this.element.querySelectorAll('option');\n    this.showClass = \"select--is-visible\";\n    this.isVisible = false;\n    this.selectPlaceholder = null;\n    this.selectDropdown = null;\n    this.selectOptions = null;\n    this.initCustomSelect();\n  }\n\n  initCustomSelect() {\n    this.select.style.display = 'none';\n    let select_options_dropdown_wrapper = document.createElement('div');\n    Util.addClass(select_options_dropdown_wrapper, 'select__dropdown-wrapper');\n    let select_options_dropdown = document.createElement('div');\n    Util.addClass(select_options_dropdown, 'select__dropdown');\n    select_options_dropdown_wrapper.appendChild(select_options_dropdown);\n    this.element.insertBefore(select_options_dropdown_wrapper, this.element.firstElementChild);\n    this.selectDropdown = this.element.querySelector('.select__dropdown');\n    let select__trigger = document.createElement('span');\n    Util.addClass(select__trigger, 'select__trigger');\n    select__trigger.innerHTML = '<svg width=\"17\" height=\"17\" viewBox=\"0 0 17 17\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9.58253 13.625C9.10141 14.4583 7.89859 14.4583 7.41747 13.625L3.52035 6.875C3.03923 6.04167 3.64063 5 4.60289 5L12.3971 5C13.3594 5 13.9608 6.04166 13.4796 6.875L9.58253 13.625Z\" fill=\"#FFCDBD\" stroke=\"#0F145B\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg>';\n    this.element.insertBefore(select__trigger, this.element.firstElementChild);\n    let select_placeholder = document.createElement('div');\n    Util.addClass(select_placeholder, 'select__placeholder');\n    select_placeholder.innerHTML = this.options[0].innerHTML;\n    this.element.insertBefore(select_placeholder, this.element.firstElementChild);\n    this.selectPlaceholder = this.element.querySelector('.select__placeholder');\n\n    for (let index = 1; index < this.options.length; index++) {\n      const option = this.options[index];\n      let select_option = document.createElement('div');\n      Util.addClass(select_option, 'select__option');\n      select_option.innerHTML = option.innerHTML;\n      this.selectDropdown.appendChild(select_option);\n    }\n\n    this.selectOptions = this.element.querySelectorAll('.select__option');\n    this.initSelectEvents();\n  }\n\n  initSelectEvents() {\n    // Toggling the `.active` state on the `.sel`.\n    const self = this;\n    this.element.addEventListener('click', function () {\n      self.isVisible = !self.isVisible;\n      Util.toggleClass(self.element, self.showClass, self.isVisible);\n    });\n\n    for (let index = 0; index < this.selectOptions.length; index++) {\n      const option = this.selectOptions[index];\n      let label = option.innerText;\n      option.addEventListener('click', function () {\n        if (self.element.querySelector('.select__option.selected')) Util.removeClass(self.element.querySelector('.select__option.selected'), 'selected');\n        Util.addClass(option, 'selected');\n        self.selectPlaceholder.innerText = label;\n        self.select.selectedIndex = index + 1;\n      });\n    }\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (function () {\n  const selectEls = document.querySelectorAll('.custom-select');\n\n  for (let index = 0; index < selectEls.length; index++) {\n    const element = selectEls[index];\n    new CustomSelect(element);\n  }\n});\n\n//# sourceURL=webpack:///./src/libs/custom-select.js?");

/***/ })

}]);