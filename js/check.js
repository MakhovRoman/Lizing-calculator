const creditTotal = document.querySelector('.credit-total__content');
const creditRegularPayment = document.querySelector('.credit-regular-payment__content');
const creditMultiply = 0.035;

import {getRangeValue, totalPayment, total} from "./index.js";
import {checkNumberFormat} from "./input_range.js";

function checkTotalPayment(e) {
    if (e.target.id != 'term' && e.target.id != 'output_term') {
        totalPayment[1] = total(getRangeValue('payment'), getRangeValue('price'));
        totalPayment[0].textContent = new Intl.NumberFormat('ru', {style: "currency", currency: "RUB", maximumFractionDigits: 0}).format(total(getRangeValue('payment'), getRangeValue('price')));
    }
}

function checkTotalCredit() {
    let result = getRangeValue('payment') + getRangeValue('term') * checkRegularPayment();
    creditTotal.textContent = new Intl.NumberFormat('ru', {style: "currency", currency: "RUB", maximumFractionDigits: 0}).format(result);
}

function checkRegularPayment() {
    let result = Math.round((getRangeValue('price') - Number(totalPayment[1])) * ((creditMultiply * Math.pow((1 + creditMultiply), getRangeValue('term'))) / (Math.pow((1 + creditMultiply), getRangeValue('term')) - 1)));
    creditRegularPayment.textContent = new Intl.NumberFormat('ru', {style: "currency", currency: "RUB", maximumFractionDigits: 0}).format(result);
    return result;
}

export {creditTotal, creditRegularPayment, creditMultiply, checkTotalPayment, checkTotalCredit, checkRegularPayment, getRangeValue};
