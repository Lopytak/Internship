export class YandexMap {
    defaultCfg = {
        center: [55.154, 61.4291],
        zoom: 10
    };

    constructor (element) {
        this.element = element;
        this.config = JSON.parse(this.element.getAttribute('data-js-map'));

        // eslint-disable-next-line no-undef
        const myMap = new ymaps.Map(this.element, { ...this.defaultCfg, ...this.config });
    }
}

export default class YandexAPI {
    static selector = '[data-js-map]';

    static url = '';

    constructor (selector = YandexAPI.selector) {
        this.maps = document.querySelectorAll(selector);
        if (this.maps.length) {
            window.initMaps = this.init.bind(this);
            this.load()
                .then(() => {
                    console.log('Yandex Maps API готово к использованию');
                })
                .catch(() => {
                    console.log('Произошла ошибка загрузки Yandex Maps API или ключ был удален');
                });
        }
    }

    async load () {
        const scriptMapAPI = document.createElement('script');
        scriptMapAPI.src = YandexAPI.url;

        const promise = new Promise((resolve, reject) => {
            scriptMapAPI.onload = () => resolve(scriptMapAPI);
            scriptMapAPI.onerror = () => reject(new Error());
        });

        document.head.append(scriptMapAPI);
        return promise;
    }

    init () {
        this.maps.forEach(element => {
            const map = new YandexMap(element);
        });
    }
}
