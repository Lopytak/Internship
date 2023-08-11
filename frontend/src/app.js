import './styles/global.pcss';
import RangeSlider from './js/rangeSlider.js';
import ImageSlider from './js/imageSlider.js';
import YandexAPI from './js/map.js';
import Popup from './js/popup.js';

const range = new RangeSlider("[id='rangeSlider']");

const swiper = new ImageSlider("[id='imageSlider']", 0, '.currentSlide__item', '.amountSlides__item');

const map = new YandexAPI("[id='map']");

const popup = new Popup("[id='blockWithPopup']", "[id='blockWithPopupBtn']");
