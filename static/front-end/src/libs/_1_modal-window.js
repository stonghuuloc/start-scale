// File#: _1_modal-window
// Usage: codyhouse.co/license
(function() {
  class Modal {
    constructor(element) {
      this.element = element;
      this.triggers = document.querySelectorAll('[aria-controls="' + this.element.getAttribute('id') + '"]');
      this.firstFocusable = null;
      this.lastFocusable = null;
      this.moveFocusEl = null; // focus will be moved to this element when modal is open
      this.modalFocus = this.element.getAttribute('data-modal-first-focus') ? this.element.querySelector(this.element.getAttribute('data-modal-first-focus')) : null;
      this.selectedTrigger = null;
      this.showClass = "modal--is-visible";
      this.initModal();
    }
    initModal() {
      var self = this;
      //open modal when clicking on trigger buttons
      if (this.triggers) {
        for (var i = 0; i < this.triggers.length; i++) {
          this.triggers[i].addEventListener('click', function (event) {
            event.preventDefault();
            if (Util.hasClass(self.element, self.showClass)) {
              self.closeModal();
              return;
            }
            self.selectedTrigger = event.target;
            self.showModal();
            self.initModalEvents();
          });
        }
      }
      // listen to the openModal event -> open modal without a trigger button
      this.element.addEventListener('openModal', function (event) {
        if (event.detail)
          self.selectedTrigger = event.detail;
        self.showModal();
        self.initModalEvents();
      });
      // listen to the closeModal event -> close modal without a trigger button
      this.element.addEventListener('closeModal', function (event) {
        if (event.detail)
          self.selectedTrigger = event.detail;
        self.closeModal();
      });
      // if modal is open by default -> initialise modal events
      if (Util.hasClass(this.element, this.showClass))
        this.initModalEvents();
    }
    showModal() {
      var self = this;
      Util.addClass(this.element, this.showClass);
      this.getFocusableElements();
      this.moveFocusEl.focus();
      // wait for the end of transitions before moving focus
      this.element.addEventListener("transitionend", function cb(event) {
        self.moveFocusEl.focus();
        self.element.removeEventListener("transitionend", cb);
      });
      this.emitModalEvents('modalIsOpen');
    }
    closeModal() {
      if (!Util.hasClass(this.element, this.showClass))
        return;
      Util.removeClass(this.element, this.showClass);
      this.firstFocusable = null;
      this.lastFocusable = null;
      this.moveFocusEl = null;
      if (this.selectedTrigger)
        this.selectedTrigger.focus();
      //remove listeners
      this.cancelModalEvents();
      this.emitModalEvents('modalIsClose');
    }
    initModalEvents() {
      //add event listeners
      this.element.addEventListener('keydown', this);
      this.element.addEventListener('click', this);
    }
    cancelModalEvents() {
      //remove event listeners
      this.element.removeEventListener('keydown', this);
      this.element.removeEventListener('click', this);
    }
    handleEvent(event) {
      switch (event.type) {
        case 'click': {
          this.initClick(event);
        }
        case 'keydown': {
          this.initKeyDown(event);
        }
      }
    }
    initKeyDown(event) {
      if (event.keyCode && event.keyCode == 9 || event.key && event.key == 'Tab') {
        //trap focus inside modal
        this.trapFocus(event);
      }
      else if ((event.keyCode && event.keyCode == 13 || event.key && event.key == 'Enter') && event.target.closest('.js-modal__close')) {
        event.preventDefault();
        this.closeModal(); // close modal when pressing Enter on close button
      }
    }
    initClick(event) {
      //close modal when clicking on close button or modal bg layer 
      if (!event.target.closest('.js-modal__close') && !Util.hasClass(event.target, 'js-modal'))
        return;
      event.preventDefault();
      this.closeModal();
    }
    trapFocus(event) {
      if (this.firstFocusable == document.activeElement && event.shiftKey) {
        //on Shift+Tab -> focus last focusable element when focus moves out of modal
        event.preventDefault();
        this.lastFocusable.focus();
      }
      if (this.lastFocusable == document.activeElement && !event.shiftKey) {
        //on Tab -> focus first focusable element when focus moves out of modal
        event.preventDefault();
        this.firstFocusable.focus();
      }
    }
    getFocusableElements() {
      //get all focusable elements inside the modal
      var allFocusable = this.element.querySelectorAll(focusableElString);
      this.getFirstVisible(allFocusable);
      this.getLastVisible(allFocusable);
      this.getFirstFocusable();
    }
    getFirstVisible(elements) {
      //get first visible focusable element inside the modal
      for (var i = 0; i < elements.length; i++) {
        if (isVisible(elements[i])) {
          this.firstFocusable = elements[i];
          break;
        }
      }
    }
    getLastVisible(elements) {
      //get last visible focusable element inside the modal
      for (var i = elements.length - 1; i >= 0; i--) {
        if (isVisible(elements[i])) {
          this.lastFocusable = elements[i];
          break;
        }
      }
    }
    getFirstFocusable() {
      if (!this.modalFocus || !Element.prototype.matches) {
        this.moveFocusEl = this.firstFocusable;
        return;
      }
      var containerIsFocusable = this.modalFocus.matches(focusableElString);
      if (containerIsFocusable) {
        this.moveFocusEl = this.modalFocus;
      }
      else {
        var elements = this.modalFocus.querySelectorAll(focusableElString);
        for (var i = 0; i < elements.length; i++) {
          if (isVisible(elements[i])) {
            this.moveFocusEl = elements[i];
            break;
          }
        }
      }
    }
    emitModalEvents(eventName) {
      var event = new CustomEvent(eventName, { detail: this.selectedTrigger });
      this.element.dispatchEvent(event);
    }
  }















  function isVisible(element) {
    return element.offsetWidth || element.offsetHeight || element.getClientRects().length;
  };

  //initialize the Modal objects
  var modals = document.getElementsByClassName('js-modal');
  // generic focusable elements string selector
  var focusableElString = '[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable], audio[controls], video[controls], summary';
  if( modals.length > 0 ) {
    var modalArrays = [];
    for( var i = 0; i < modals.length; i++) {
      (function(i){modalArrays.push(new Modal(modals[i]));})(i);
    }

    window.addEventListener('keydown', function(event){ //close modal window on esc
      if(event.keyCode && event.keyCode == 27 || event.key && event.key.toLowerCase() == 'escape') {
        for( var i = 0; i < modalArrays.length; i++) {
          (function(i){modalArrays[i].closeModal();})(i);
        };
      }
    });
  }
}());