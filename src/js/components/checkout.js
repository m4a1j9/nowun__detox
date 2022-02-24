const bodyElem = document.querySelector('body');
const stripePopupElem = document.getElementById('stripe');
const stripeBtn = document.querySelector('.stripe-button');
const PUBLISHABLE_KEY =
    'pk_test_51IsNCwLBx5miI8AdCWt5J1FhYZ2UmGgbM3RF2ysUGZZWMHuMEcbUN109480eC4Pfwirsv6LDCx59pcaFrT3iJaQk00c1d0A68w';

let cardElement;
let cardElement2;
let cardElement3;

const stripe = Stripe(PUBLISHABLE_KEY, {
    locale: 'cs',
    apiVersion: '2020-08-27',
});

//АВТОВЫПОЛНЯЕТСЯ <---------------------------------------------------!!!!!!!!!!!!!!!!!!!!!
(function initStripe() {
    const elements = stripe.elements();

    cardElement = elements.create('cardNumber');
    cardElement2 = elements.create('cardExpiry');
    cardElement3 = elements.create('cardCvc');

    cardElement.mount('#card-element');
    cardElement2.mount('#card-element2');
    cardElement3.mount('#card-element3');

    cardElement.on('change', function (event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = 'Vaše číslo karty je neplatné.';
            Object.assign(displayError.style, {
                color: '#f00',
                fontSize: '16px',
                marginTop: '5px',
            });
            stripeBtn.disabled = true;
        } else {
            displayError.textContent = '';
            Object.assign(displayError.style, {
                color: '#fa755a',
                iconColor: '#fa755a',
            });
            // stripeBtn.innerHTML = 'Get your free 14-day trial';
            stripeBtn.disabled = false;
        }
    });

    cardElement.on('focus', function (event) {
        dataLayer.push({
            event: 'input_card_number',
            category: 'quiz long cz done pay',
            action: 'click',
            label: 'input_card_number',
        });
    });
    cardElement2.on('focus', function (event) {
        dataLayer.push({
            event: 'input_mm/yy',
            category: 'quiz long cz done pay',
            action: 'click',
            label: 'input_mm/yy',
        });
    });
    cardElement3.on('focus', function (event) {
        dataLayer.push({
            event: 'input_cvc',
            category: 'quiz long cz done pay',
            action: 'click',
            label: 'input_cvc',
        });
    });
})();

async function onPayClick() {
    stripeBtn.disabled = true;
    document.querySelector('.wrapper-loader').css('display', 'flex');
    try {
        const response = await fetch('stripe.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        })
            .then((res) => res.json())
            .then((data) =>
                stripe
                    .confirmCardPayment(data.client_secret, {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                name: `${localStorage.getItem('name')}`,
                                email: `${localStorage.getItem('email')}`,
                                phone: `${localStorage.getItem('phone')}`,
                            },
                        },
                    })
                    .then((result) => {
                        console.log(result);

                        if (result.error) {
                            return;
                        }
                        dataLayer.push({
                            event: 'Subscribe',
                            category: 'quiz pay',
                            action: 'click',
                            label: 'Subscribe',
                        });

                        setTimeout(() => {
                            window.location.href = 'thanks.html';
                        }, 10000);
                    }),
            );
    } catch (error) {
        console.log(error);
    }
}

const cardHolder = document.querySelector('.cardHolder');
cardHolder.addEventListener('input', (e) => {
    console.log(cardHolder.value.length);
    if (cardHolder.value.length > 2) {
        console.log(cardHolder.value.length > 2);
        cardHolder.style.border = '1px solid #858585';

        stripeBtn.removeAttribute('disabled', 'disabled');
    } else {
        console.log(cardHolder.value.length > 2);
        cardHolder.style.border = '1px solid red';
        stripeBtn.setAttribute('disabled', 'disabled');
    }
});

cardHolder.addEventListener('click', (e) => {
    dataLayer.push({
        event: 'input_name',
        category: 'quiz long cz done pay',
        action: 'click',
        label: 'input_name',
    });
});

const paymentBtn = document.querySelectorAll('.btn-buy');

paymentBtn.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        if (
            paymentRequest._canMakePaymentAvailability.BROWSER ||
            paymentRequest._canMakePaymentAvailability.APPLE_PAY ||
            paymentRequest._canMakePaymentAvailability.GOOGLE_PAY
        ) {
            paymentRequest.show();
        }
    });
});

// создаем объект запроса платежа
var paymentRequest = stripe.paymentRequest({
    country: 'US',
    currency: 'usd',
    total: {
        label: 'SKIN RESTART',
        amount: 99,
    },
    requestPayerEmail: true,
});

// создаем нашу кнопку оплаты
const elements = stripe.elements();
const prButton = elements.create('paymentRequestButton', {
    paymentRequest: paymentRequest,
    allow: 'paymentmethod',
});

// проверка на возможность оплаты и подлкюченную карту оплаты скрываем открываем кнопку
paymentRequest.canMakePayment().then(function (result) {
    if (result && result.applePay == true) {
        prButton.mount('#payment-request-button-apple');
        prButton.on('click', () => {
            dataLayer.push({
                'event': 'apay/gpay',
                'category': 'quiz checkout',
                'action': 'click',
                'label': 'apay/gpay'
            })
        })
        console.log('aple');
    } else if (result && result.googlePay == true) {
        prButton.mount('#payment-request-button');
        prButton.on('click', () => {
            dataLayer.push({
                'event': 'apay/gpay',
                'category': 'quiz checkout',
                'action': 'click',
                'label': 'apay/gpay'
            })
        })
        console.log('google');
    }
});

// subscribe and check payment for Vean
async function quizCheckoutPayment(paymentMethod) {
    console.log(paymentMethod);

    let response = await fetch('stripe.php', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            is_agree_research_policy: true,
            stripe_payment_method_id: paymentMethod,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((resp) => resp.json())
        .then((json) => json)
        .catch((error) => {
            console.error('Error:', error);
        });

    return response;
}

paymentRequest.on('paymentmethod', async function (ev) {
    document.querySelector('.wrapper-loader').css('display', 'flex');
    const response = await fetch('stripe.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            paymentMethodType: 'card',
            currency: 'usd',
        }),
    })
        .then((res) => res.json())
        .then((data) =>
            stripe
                .confirmCardPayment(
                    data.client_secret,
                    { payment_method: ev.paymentMethod.id },
                    {
                        billing_details: {
                            name: `${localStorage.getItem('name')}`,
                            email: `${localStorage.getItem('email')}`,
                            phone: `${localStorage.getItem('phone')}`,
                        },
                    },
                    { handleActions: false },
                )
                .then(function (confirmResult) {
                    if (confirmResult.error) {
                        ev.complete('fail');
                    } else {
                        dataLayer.push({
                            event: 'Subscribe',
                            category: 'quiz pay',
                            action: 'click',
                            label: 'Subscribe',
                        });
                        ev.complete('success');

                        setTimeout(() => {
                            window.location.href = 'thanks.html';
                        }, 10000);

                        // Check if the PaymentIntent requires any actions and if so let Stripe.js
                        // handle the flow. If using an API version older than "2019-02-11"
                        // instead check for: `paymentIntent.status === "requires_source_action"`.
                        if (confirmResult.paymentIntent.status === 'requires_action') {
                            // Let Stripe.js handle the rest of the payment flow.
                            stripe.confirmCardPayment(clientSecret).then(function (result) {
                                if (result.error) {
                                    // The payment failed -- ask your customer for a new payment method.
                                } else {
                                    // The payment has succeeded.
                                }
                            });
                        } else {
                            // The payment has succeeded.
                        }
                    }
                }),
        );
    localStorage.setItem('resp', JSON.stringify(response));
});




paymentRequest.canMakePayment().then(function (result) {
    if (result && result.applePay == true) {
        prButton.mount('#payment-request-button-apple');
        prButton.on('click', () => {
            dataLayer.push({
                'event': 'apay/gpay',
                'category': 'quiz checkout',
                'action': 'click',
                'label': 'apay/gpay'
            })
        })

    } else if (result && result.googlePay == true) {
        prButton.mount('#payment-request-button');
        prButton.on('click', () => {
            dataLayer.push({
                'event': 'apay/gpay',
                'category': 'quiz checkout',
                'action': 'click',
                'label': 'apay/gpay'
            })
        })
    }
});
