export default class RangeSlider {
    constructor(progressBar, slider) {
        this.progressBarList = Array.from(document.querySelectorAll(`.${progressBar}`));
        this.sliderList      = Array.from(document.querySelectorAll(`.${slider}`));
    }

    addListener() {
        this.sliderList.forEach((item, index) => {
            window.addEventListener('input', () => {

                let result = (a, b) => b * 100 / a;
                this.progressBarList[index].style.width = result(item.max - item.min, item.value - item.min) + '%';
            })
        })
    }
}
