const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const myApp = (function () {
   const web = $('.website');
   const expandNavBtn = $('.header__expandBtn');
   const navRes_UlNode = $('.navRes__ul');
   const sliderBtn = $$('.slider__sliderBtn');
   const sliderItems = $$('.slider__item');
   let currentIndexSlider = 0;

   const backToTopBtn = $('.footer__bottomBackToTopBtn');

   const contentRightNode = $('.contentRight');
   const contentColRightNode = $('.content__colRight');
   const contentAboutNode = $('.about');
   let heightOrigin;
   return {
      handleFixedContentRight(scrollY) {
         heightOrigin = contentRightNode.offsetHeight;
         // offset bottom
         const offsetBottom = 150;
         // width
         // window offset height
         const windowOffsetHeightAboutNode = contentAboutNode.getBoundingClientRect().top;
         const windowOffsetHeight = window.outerHeight - contentRightNode.getBoundingClientRect().bottom;
         const topCol = contentColRightNode.offsetTop;
         const t = window.outerHeight - contentColRightNode.getBoundingClientRect().bottom;
         const z = window.outerHeight - contentRightNode.getBoundingClientRect().bottom;
         if (scrollY >= topCol && t <= 0) {
            if (windowOffsetHeight >= offsetBottom) {
               contentRightNode.style.cssText = `
                    min-height: ${z + heightOrigin - offsetBottom}px;
                  `;
            } else if (windowOffsetHeightAboutNode >= 0) {
               contentRightNode.style.cssText = `
                    min-height: ${contentRightNode.offsetHeight - windowOffsetHeightAboutNode}px;
                  `;
            }
         }
      },
      changeSlider(index) {
         sliderItems.forEach(item => {
            if (item.dataset.index === index) {
               this.resetActive(sliderItems);
               item.classList.add('active');
            }
         });
      },
      resetActive(listBtn) {
         // tìm element nào có class active gỡ active
         listBtn.forEach(element => {
            if (element.className.includes('active')) {
               element.classList.remove('active');
            }
         });
      },
      handleAsync() {
         setInterval(() => {
            const index = parseInt(currentIndexSlider);
            if (sliderBtn[index + 1]) {
               sliderBtn[index + 1].click();
            } else {
               sliderBtn[0].click();
            }
         }, 6000);
      },
      handleEvent() {
         // xử lý scroll window
         window.onscroll = () => {
            const scrollY = window.scrollY;
            this.handleFixedContentRight(scrollY);
         }
         // xử lý khi ấn vào nút expand navigation cho responsive
         expandNavBtn.onclick = function () {
            const iconOpen = this.querySelector('.header__expandBtnOpen');
            const iconClose = this.querySelector('.header__expandBtnClose');
            iconOpen.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
            navRes_UlNode.classList.toggle('active');
            web.classList.toggle('activeNav');
         }
         // xử lý khi ấn vào các nút slider
         sliderBtn.forEach(btn => {
            btn.onclick = () => {
               currentIndexSlider = btn.dataset.index;
               this.resetActive(sliderBtn);
               this.changeSlider(currentIndexSlider);
               btn.classList.add('active');
            }
         });
         // xử lý back to top button
         backToTopBtn.onclick = function () {
            window.scrollTo({
               behavior: 'auto',
               top: 0
            });
         }
      },
      start() {
         this.handleEvent();
         this.handleAsync();
      }
   }
}());
myApp.start();