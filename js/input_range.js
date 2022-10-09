import {checkTotalPayment, checkTotalCredit, checkRegularPayment} from "./check.js";

class InputRange {
    constructor(name, index) {
        this.name = name;
        this.range = indexRangeList[index];
        this.output = document.querySelector(`#output_${this.name}`);
        this.max = Number(this.range.max);
        this.min = Number(this.range.min);
    }

    listenerOutput(e) {
        this.range.setAttribute('value', +e.target.value);
        this.range.value = +e.target.value;
        this.output.setAttribute('value', +e.target.value);

        this.output.value = +e.target.value;

        checkTotalPayment(e);
        checkRegularPayment();
        checkTotalCredit();
    }

    addListenerRange() {
        this.range.addEventListener('input', (e) => {
            checkInput(e, this.min, this.max);

            this.output.setAttribute('value', e.target.value);
            this.output.value = checkNumberFormat(e.target);
            this.range.setAttribute('value', +e.target.value);

            checkTotalPayment(e);
            checkRegularPayment();
            checkTotalCredit();
        });

        this.output.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/, "");

            if (e.target.value > this.min && e.target.value < this.max) {
                this.listenerOutput(e);
            }
        });

        this.output.addEventListener('change', (e) => {
            checkInput(e, +this.min, +this.max);
            this.listenerOutput(e)
        });

        window.addEventListener('DOMContentLoaded', () => {
            this.output.value = checkNumberFormat(this.range);
            this.output.setAttribute('value', this.range.value);
        });
    }
}

function checkInput(e, min, max) {
    if (e.target.value < min || e.target.getAttribute('value') < min) {
        e.target.value = min;
        e.target.setAttribute('value', min);
    } else if (e.target.value > max || Number(e.target.getAttribute('value')) > max) {
        console.log(max);
        e.target.value = max;
        e.target.setAttribute('value', max);
    }
}

export function checkNumberFormat(target) {
    if (target.id == 'payment' || target.id == 'output_payment') {
        return new Intl.NumberFormat('en', {style: "percent"}).format(target.value / 100);
    } else if (target.classList.contains('payment__percentage')) {
        return new Intl.NumberFormat('ru', {style: "currency", currency: "RUB", maximumFractionDigits: 0}).format(target.value);
    } else {
        return new Intl.NumberFormat('ru').format(target.value);
    }
}

const indexRangeList = Array.from(document.querySelectorAll('.input_type_range'));

export {InputRange, indexRangeList};
