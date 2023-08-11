import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
export default class RangeSlider {
    defaultCfg = {
        start: [0, 100],
        range: {
            min: 0,
            max: 100
        },
        tooltips: [
            wNumb({
                decimals: 0,
                prefix: 'От ',
                suffix: ' $'
            }),
            wNumb({
                decimals: 0,
                prefix: 'До ',
                suffix: ' $'
            })
        ],
        behaviour: 'tap-drag',
        connect: true
    };

    constructor (selector = '[data-js-rangeSlider]', config = this.defaultCfg) {
        this.node = document.querySelector(selector);
        this.config = JSON.parse(this.node.getAttribute('data-js-rangeSlider')) || config;

        if (this.node) {
            this.slider = new noUiSlider.create(this.node, { ...this.defaultCfg, ...this.config });
        }
    }

    static getValues (slider) {
        return slider.get();
    }
}
