(function () {
  class Portfolio {
    constructor(element) {
      this.element = element;
      this.items = this.element.querySelectorAll('.portfolio-item');
      this.triggers = this.element.querySelectorAll('.portfolio__trigger');
      this.modal = document.querySelector('.portfolio__popup');
      this.modalTitle = this.modal.querySelector('.portfolio-detail__title');
      this.modalDescription = this.modal.querySelector('.portfolio-detail__description');
      this.modalImage = this.modal.querySelector('.portfolio-detail__logo');
      this.modalGallery = this.modal.querySelector('.portfolio-detail__gallery');

      this.init()
    }

    init() {
      for (let index = 0; index < this.triggers.length; index++) {
        const trigger = this.triggers[index];
        const self = this;

        trigger.addEventListener('click', function () {
          const selected_index = event.target.dataset.index;
          const selected_el = self.items[selected_index];
          const title = selected_el.dataset.title;
          const description = selected_el.dataset.description;
          const details = JSON.parse(selected_el.dataset.details);

          self.modalGallery.innerHTML = "";
          self.modalTitle.innerHTML = title;
          self.modalDescription.innerHTML = description;
          self.modalImage.setAttribute('src', details.logo);

          for (let indexGallery = 0; indexGallery < details.gallery.length; indexGallery++) {
            const galleryItem = details.gallery[indexGallery];

            let galleryEl = document.createElement('div');
            Util.addClass(galleryEl, 'col-4@lg col-6');
            galleryEl.innerHTML = `
              <div class="crop crop--fit width-100%">
                <img src="${galleryItem}" alt="gallery" class="crop__content">
              </div>
            `;

            self.modalGallery.appendChild(galleryEl);
          }
        })
      }
    }
  }
  const portfolio = document.querySelector('.portfolio-list');
  if (portfolio) new Portfolio(portfolio);
}());
// export default function () {
//   const portfolio = document.querySelector('.portfolio-list');
//   if (portfolio) new Portfolio(portfolio);
// }