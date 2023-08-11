import { Fancybox } from '@fancyapps/ui';

export default class Popup {

    static selectors = {
        instance: '[data-js-blockWithPopup]',
        btn: '[data-js-blockWithPopupBtn]'
    };

    constructor (instance = Popup.selectors.instance, btn = Popup.selectors.btn) {
        this.instance = document.querySelector(instance);
        if (this.instance) {
            this.btn = this.instance.querySelector(btn);
            this.bindEvents();
        }
    }

    #handleClick (e) {
        e.preventDefault();
        const fancybox = new Fancybox([
            {
                src: document.querySelector("[class='modal']"),
                type: 'inline',
                on: {
                    loaded: this.#onModalShow()
                }
            }
        ]);
        console.log(120);
    }

    #onModalShow () {
        // Метод, вызываемый, когда попап окно отрендерилось. Здесь вставляются значения из бегунка и из карты посредством обращения к ним через window.App, например:
        // const rangeData = window.RangeSlider.getValues(range);
        // const mapData = window.YandexMap.getValues(map);
        console.log(1);
    }

    bindEvents () {
        this.btn.addEventListener('click', (e) => this.#handleClick(e));
    }
}
