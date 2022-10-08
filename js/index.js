import {checkTotalCredit, checkRegularPayment} from "./check.js";
import RangeSlider from "./range_slaider.js";
import {InputRange, indexRangeList} from "./input_range.js";
import checkMinWidht from "./adaptive_320px.js";

export const totalPayment = [document.querySelector(`.payment__percentage`), null];

export function getRangeValue(name) {
    return Number(rangeClassList.get(name).output.getAttribute('value'));
}

export function total(total, fr) {
    return total * fr / 100;
}

const minWidth = window.matchMedia('(max-width: 320px)');

let rangeClassList = new Map();
indexRangeList.forEach((item, index) => {
    rangeClassList.set(item.id ,new InputRange(item.id, index));
});

rangeClassList.forEach(item => item.addListenerRange());
window.addEventListener('DOMContentLoaded', () => {
    totalPayment[1] = total(getRangeValue('payment'), getRangeValue('price'));
    totalPayment[0].textContent = new Intl.NumberFormat('ru', {style: "currency", currency: "RUB", maximumFractionDigits: 0}).format(total(getRangeValue('payment'), getRangeValue('price')));
    checkRegularPayment();
    checkTotalCredit();
});

window.addEventListener('resize', () => checkMinWidht(minWidth));


let lizingRangeList = new RangeSlider('progressBar', 'input_type_range');

lizingRangeList.addListener();

import submitForm from "./request.js";

document.querySelector('#form__submit').addEventListener('mouseup', (e) => {
    e.preventDefault();
    submitForm(e);
})
