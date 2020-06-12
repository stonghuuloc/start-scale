(function () {
  class CustomSelect {
    constructor(element) {
      this.element = element;
      this.select = this.element.querySelector('select');
      this.options = this.element.querySelectorAll('option');
      this.showClass = "select--is-visible";
      this.isVisible = false;
      this.selectPlaceholder = null;
      this.selectDropdown = null;
      this.selectOptions = null;
      this.initCustomSelect();
    }

    initCustomSelect() {
      this.select.style.display = 'none';

      let select_options_dropdown_wrapper = document.createElement('div');
      Util.addClass(select_options_dropdown_wrapper, 'select__dropdown-wrapper');
      let select_options_dropdown = document.createElement('div');
      Util.addClass(select_options_dropdown, 'select__dropdown');
      select_options_dropdown_wrapper.appendChild(select_options_dropdown);
      this.element.insertBefore(select_options_dropdown_wrapper, this.element.firstElementChild);
      this.selectDropdown = this.element.querySelector('.select__dropdown');

      let select__trigger = document.createElement('span');
      Util.addClass(select__trigger, 'select__trigger');
      select__trigger.innerHTML = '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.58253 13.625C9.10141 14.4583 7.89859 14.4583 7.41747 13.625L3.52035 6.875C3.03923 6.04167 3.64063 5 4.60289 5L12.3971 5C13.3594 5 13.9608 6.04166 13.4796 6.875L9.58253 13.625Z" fill="#FFCDBD" stroke="#0F145B" stroke-width="1.5" stroke-linecap="round"/></svg>';
      this.element.insertBefore(select__trigger, this.element.firstElementChild);

      let select_placeholder = document.createElement('div');
      Util.addClass(select_placeholder, 'select__placeholder');
      if (this.options[0].dataset.thumbnail) {
        let option_thumbnail = document.createElement('img');
        option_thumbnail.setAttribute('src', this.options[0].dataset.thumbnail);
        option_thumbnail.setAttribute('alt', this.options[0].value);
        Util.addClass(option_thumbnail, 'margin-right-xxs');
        select_placeholder.appendChild(option_thumbnail)
      }
      select_placeholder.appendChild(document.createTextNode(this.options[0].innerHTML));
      this.element.insertBefore(select_placeholder, this.element.firstElementChild);
      this.selectPlaceholder = this.element.querySelector('.select__placeholder');

      for (let index = 1; index < this.options.length; index++) {
        const option = this.options[index];
        
        let select_option = document.createElement('div');
        Util.addClass(select_option, 'select__option');
        if (option.dataset.thumbnail) {
          let option_thumbnail = document.createElement('img');
          option_thumbnail.setAttribute('src', option.dataset.thumbnail);
          option_thumbnail.setAttribute('alt', option.value);
          Util.addClass(option_thumbnail, 'margin-right-xxs');
          select_option.appendChild(option_thumbnail)
        }
        select_option.appendChild(document.createTextNode(option.innerHTML));
        this.selectDropdown.appendChild(select_option);
      }
      this.selectOptions = this.element.querySelectorAll('.select__option');

      this.initSelectEvents();
    }

    initSelectEvents() {
      // Toggling the `.active` state on the `.sel`.
      const self = this;
      this.element.addEventListener('click', function () {
        self.isVisible = !self.isVisible;

        if (self.isVisible) {
          let bounds_bottom = self.element.getBoundingClientRect().bottom;

          if (window.innerHeight - bounds_bottom < 250) {
            Util.addClass(self.element, 'reverse');
          }
        } else {
          setTimeout(() => {
            Util.removeClass(self.element, 'reverse');
          }, 300);
        }

        Util.toggleClass(self.element, self.showClass, self.isVisible);
      })

      for (let index = 0; index < this.selectOptions.length; index++) {
        const option = this.selectOptions[index];
        let label = option.innerText;
        option.addEventListener('click', function () {
          if (self.element.querySelector('.select__option.selected'))
            Util.removeClass(self.element.querySelector('.select__option.selected'), 'selected');
          Util.addClass(option, 'selected');

          self.selectPlaceholder.innerText = label;
          self.select.selectedIndex = index + 1;
        })
      }
    }
  }
  const selectEls = document.querySelectorAll('.custom-select');
  for (let index = 0; index < selectEls.length; index++) {
    const element = selectEls[index];
    new CustomSelect(element);
  }
}());

// export default function () {
//   const selectEls = document.querySelectorAll('.custom-select');
//   for (let index = 0; index < selectEls.length; index++) {
//     const element = selectEls[index];
//     new CustomSelect(element);
//   }
// }