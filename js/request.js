export default async function submitForm(event) {
    let sendData = {};
    let formData = new FormData(document.forms.lizing);
    let inputsItemArray = arrayFromCollection('.inputs__item');
    let inputsArray = arrayFromCollection('input');

    function formatTextToNumber(selector) {
        return document.querySelector(selector).textContent.split('')
                            .slice(0, -2).map(item => {
                                if (item.codePointAt(0) != 160) return item;
                            })
                            .join('');
    }

    function getKey(selector) {
        let target = document.querySelector(selector);

        if (target.hasAttribute('name')) {
            target.getAttribute('name');
        } else if (target.dataset.name) {
            return target.dataset.name;
        }
    }

    function appendKeyInForm(selector) {
        let result = [getKey(selector), formatTextToNumber(selector)];
        formData.append(result[0], result[1]);
    }

    function arrayFromCollection(selector) {
        return Array.from(document.querySelectorAll(selector));
    }

    function changeFormStatus() {
        event.target.classList.toggle('onload');
        inputsItemArray.forEach(item => item.classList.toggle('item_disabled'));
        inputsArray.forEach(item => {
            item.classList.toggle('input_disabled');
            item.disabled = !item.disabled;
        });
    }

    appendKeyInForm('.payment__percentage');
    appendKeyInForm('.credit-total__content');
    appendKeyInForm('.credit-regular-payment__content');

    formData.forEach((value, key) => sendData[key] = value);
    sendData = JSON.stringify(sendData);
    console.log(sendData);


    changeFormStatus();

    let response = await fetch('https://hookb.in/eK160jgYJ6UlaRPldJ1P', {
        method: "POST",
        header: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: sendData
    });

    let result = await response.json();

    changeFormStatus();

    console.log(result);



    /*
    new Promise(res => {
        event.target.classList.toggle('onload');
        inputsItemArray.forEach(item => item.classList.toggle('item_disabled'));
        inputsArray.forEach(item => item.classList.toggle('input_disabled'));
        return fetch('https://hookb.in/eK160jgYJ6UlaRPldJ1P', {
            method: "POST",
            header: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: sendData
        });
    }).then(response => {
        return response.json();
    }).then(result => {
        event.target.classList.toggle('onload');
        inputsItemArray.forEach(item => item.classList.toggle('item_disabled'));
        inputsArray.forEach(item => item.classList.toggle('input_disabled'));
        console.log(result);
    })
    */
}
