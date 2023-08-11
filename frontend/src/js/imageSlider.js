import Swiper, { Navigation } from 'swiper';
Swiper.use([Navigation]);

export default class ImageSlider {
    defaultCfg = {
        navigation: {
            prevEl: '.leftArrow',
            nextEl: '.rightArrow'
        },
        allowTouchMove: false

    };

    constructor (selector = '[data-js-imageSlider]', config = this.defaultCfg, currentSlideSelector = '[currentSlide]', amountSlidesSelector = '[amountSlides]') {
        this.node = document.querySelector(selector);
        const currentSlideNode = document.querySelector(currentSlideSelector);
        this.amountSlidesNode = document.querySelector(amountSlidesSelector);
        this.config = JSON.parse(this.node.getAttribute('data-js-rangeSlider')) || config;

        if (this.node) {
            this.swiper = new Swiper(this.node, { ...this.defaultCfg, ...this.config });

            this.swiper.on('realIndexChange', function (swiper) {
                let currentIndex = swiper.realIndex;
                currentSlideNode.innerHTML = ++currentIndex;
                if (+currentSlideNode.innerHTML < 10) currentSlideNode.innerHTML = '0' + currentSlideNode.innerHTML;
            });

            this.amountSlidesNode.innerHTML = this.swiper.slides.length.toString();
            if (this.swiper.slides.length < 10) this.amountSlidesNode.innerHTML = '0' + this.amountSlidesNode.innerHTML;
        }
    }
}
