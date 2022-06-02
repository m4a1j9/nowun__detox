// VARIABLES
const planItems = document.querySelectorAll('.prices-item'),
    header = document.querySelector('.header'),
    overlay = document.querySelector('.overlay'),
    modalClose = document.querySelector('.modal__close'),
    payment = document.querySelector('.modal-payment'),
    sure = document.querySelector('.modal-sure'),
    sureBtn = document.querySelector('.sure__btn'),
    timerBlock = document.querySelector('.top-main'),
    gift = document.querySelector('.main-gift'),
    dollarOnItem = document.querySelectorAll('.price'),
    centOnItem = document.querySelectorAll('.cent');

let modalPrice = document.querySelector('.price-modal'),
    modalSale = document.querySelector('.price-sale'),
    totalPrice = document.querySelector('.total-price'),
    priceSale = 33,
    finalPercent = document.querySelector('.modal-plan__percent'),
    headerPercent = document.querySelector('.sale'),
    finalPer = document.querySelector('.per-select'),
    priceFast = 99;

// FUNCTIONS

localStorage.setItem('plan', '1.49')
localStorage.setItem('inputId', 'one_week')
localStorage.setItem('perPlan', `1 week`)
localStorage.setItem('amount', `0.99`)

if (window.pageYOffset > 30) {
    header.classList.add('fixed')
} else {
    header.classList.remove('fixed')
}

window.addEventListener('scroll', () => {
    if (scrollY > 30) {
        header.classList.add('fixed')
    } else {
        header.classList.remove('fixed')
    }
})



document.querySelector('.header__btn').addEventListener('click', () => {
    if (priceSale == 33) {
        if (localStorage.getItem('inputId') == 'one_week') {
            dataLayer.push({
                'event': '33%_getmyplanup_1week',
                'category': 'quiz checkout',
                'action': 'click',
                'label': '33%_getmyplanup_1week'
            })
        } else {
            dataLayer.push({
                'event': '33%_getmyplanup_2month',
                'category': 'quiz checkout',
                'action': 'click',
                'label': '33%_getmyplanup_2month'
            })
        }
    } else {
        if (localStorage.getItem('inputId') == 'one_week') {
            dataLayer.push({
                'event': '53%_getmyplanup_1week',
                'category': 'quiz checkout',
                'action': 'click',
                'label': '53%_getmyplanup_1week'
            });
        } else {
            dataLayer.push({
                'event': '53%_getmyplanup_2month',
                'category': 'quiz checkout',
                'action': 'click',
                'label': '53%_getmyplanup_2month'
            });
        }
    }
})

document.querySelector('.main__btn').addEventListener('click', () => {
    if (priceSale == 33) {
        if (localStorage.getItem('inputId') == 'one_week') {
            dataLayer.push({
                'event': '33%_getmyplandown_1week',
                'category': 'quiz checkout',
                'action': 'click',
                'label': '33%_getmyplandown_1week'
            })
        } else {
            dataLayer.push({
                'event': '33%_getmyplandown_2month',
                'category': 'quiz checkout',
                'action': 'click',
                'label': '33%_getmyplandown_2month'
            })
        }
    } else {
        if (localStorage.getItem('inputId') == 'one_week') {
            dataLayer.push({
                'event': '53%_getmyplandown_1week',
                'category': 'quiz checkout',
                'action': 'click',
                'label': '53%_getmyplandown_1week'
            });
        } else {
            dataLayer.push({
                'event': '53%_getmyplandown_2month',
                'category': 'quiz checkout',
                'action': 'click',
                'label': '53%_getmyplandown_2month'
            });
        }
    }
})

modalClose.addEventListener('click', () => {
    dataLayer.push({
        'event': 'close_popap_payment',
        'category': 'quiz checkout',
        'action': 'click',
        'label': 'close_popap_payment'
    })
    if (document.querySelector('.modal-sure')) {
        sure.classList.remove('hidden')
        priceSale = 53
    } else {
        overlay.classList.add('hidden')
        payment.classList.add('hidden')
    }
})

overlay.addEventListener('click', () => {
    if (sure.classList.contains('hidden')) {
        sure.classList.remove('hidden')
        payment.classList.add('hidden')
    } else {
        priceSale = 53
        window.scrollTo(0, 0);
        overlay.classList.add('hidden')
        gift.classList.remove('hidden')
        payment.classList.add('hidden')
        timerBlock.classList.add('hidden')
        sure.remove()
        headerPercent.textContent = `${priceSale}`;
        checkChange()
        dollarOnItem[0].textContent = 0
        dollarOnItem[1].textContent = 62
        centOnItem[0].textContent = 69
        centOnItem[1].textContent = 99

        dollarOnItem[0].setAttribute('data-price', '0.69')
        dollarOnItem[1].setAttribute('data-price', '62.99')

        if (localStorage.getItem('inputId') == 'one_week') {
            localStorage.setItem('amount', '0.69')
        } else if (localStorage.getItem('inputId') == 'two_month') {
            localStorage.setItem('amount', '62.99')
        }

        priceFast = Number(`${localStorage.getItem('amount')}`.replace(/[0.]/g, ''))

        paymentRequest.update({
            total: {
                label: "FASTEASY",
                amount: +priceFast
            }
        })
    }

    if (priceSale == 33) {
        dataLayer.push({
            'event': 'special discount_popap_got_it',
            'category': 'quiz checkout',
            'action': 'click',
            'label': 'special discount_popap_got_it'
        })
    }
})

sureBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
    overlay.classList.add('hidden')
    gift.classList.remove('hidden')
    payment.classList.add('hidden')
    timerBlock.classList.add('hidden')
    sure.remove()
    headerPercent.textContent = `${priceSale}`;
    checkChange()
    dollarOnItem[0].textContent = 0
    dollarOnItem[1].textContent = 62
    centOnItem[0].textContent = 69
    centOnItem[1].textContent = 99

    dollarOnItem[0].setAttribute('data-price', '0.69')
    dollarOnItem[1].setAttribute('data-price', '62.99')

    if (localStorage.getItem('inputId') == 'one_week') {
        localStorage.setItem('amount', '0.69')
    } else if (localStorage.getItem('inputId') == 'two_month') {
        localStorage.setItem('amount', '62.99')
    }

    priceFast = Number(`${localStorage.getItem('amount')}`.replace(/[0.]/g, ''))

    paymentRequest.update({
        total: {
            label: "FASTEASY",
            amount: +priceFast
        }
    })

    dataLayer.push({
        'event': 'special discount_popap_got_it',
        'category': 'quiz checkout',
        'action': 'click',
        'label': 'special discount_popap_got_it'
    });
})


document.addEventListener('DOMContentLoaded', function () {

    //timer

    let hour = $('#clock').data('hour');
    let minutes = $('#clock').data('minutes');
    let time = (hour * 60 + minutes) * 60000;
    let fiveSeconds = new Date().getTime() + time;

    $('#clock').countdown(fiveSeconds, {
        elapse: true,
    }).on('update.countdown', function (event) {
        let $this = $(this);
        if (event.elapsed) {
            $this.html(`<p class="top-main__pad">33% discount reserved for:&nbsp;</p>
            <div class="timer__item">
                00
            </div>
            <span>:</span>
            <div class="timer__item">
                00
            </div>`);
        } else {
            $this.html(
                event.strftime(
                    `<p class="top-main__pad">33% discount reserved for:&nbsp;</p>
                    <div class="timer__item">
                        %M
                    </div>
                    <span>:</span>
                    <div class="timer__item">
                        %S
                    </div>`,
                ),
            )
        }
    })

    $('.header__timer').countdown(fiveSeconds, {
        elapse: true,
    }).on('update.countdown', function (event) {
        let $this = $(this);
        if (event.elapsed) {
            $this.html('00:00');
        } else {
            $this.html(
                event.strftime(
                    `<div class="timer__item">
                    %M
                    </div>
                    <span>:</span>
                    <div class="timer__item">
                    %S
                    </div>`,
                ),
            )
        }
    })
})

const stripeBtn = document.querySelector('.modal-pay');
const PUBLISHABLE_KEY = 'pk_live_PnXRLRwVcPBYyoaAWWaEJxDK00Fq7wGY8a';

let cardElement;
let cardElement2;
let cardElement3;


const stripe = Stripe(PUBLISHABLE_KEY, {
    locale: 'EN',
    apiVersion: "2020-08-27",
});

//АВТОВЫПОЛНЯЕТСЯ <---------------------------------------------------!!!!!!!!!!!!!!!!!!!!!
(function initStripe() {
    const elements = stripe.elements();

    cardElement = elements.create('cardNumber');
    cardElement2 = elements.create("cardExpiry");
    cardElement3 = elements.create("cardCvc");

    cardElement.mount('#card-element');
    cardElement2.mount('#card-element2');
    cardElement3.mount('#card-element3');

    cardElement.on('change', function (event) {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = 'Your card number is invalid.';
            Object.assign(displayError.style, {
                color: '#f00',
                fontSize: '16px',
                marginBottom: '5px',
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
            'event': 'input_cardnumber',
            'category': 'quiz checkout',
            'action': 'click',
            'label': 'input_cardnumber'
        });
    })
    cardElement2.on('focus', function (event) {
        dataLayer.push({
            'event': 'input_date',
            'category': 'quiz checkout',
            'action': 'click',
            'label': 'input_date'
        });
    })
    cardElement3.on('focus', function (event) {
        dataLayer.push({
            'event': 'input_cvc',
            'category': 'quiz checkout',
            'action': 'click',
            'label': 'input_cvc'
        });
    })
})();

async function onPayClick() {
    stripeBtn.disabled = true;
    stripeBtn.style.display = "none"
    $('.modal-loader').css('display', 'flex');
    $('.main__btn').css('display', 'none');
    try {

        const response = await fetch('stripe.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                site: window.location.href,
                amount: `${localStorage.getItem('amount')}`
            })
        }).then(res => res.json()).then(data =>
            stripe
                .confirmCardPayment(data.client_secret, {
                    payment_method: {
                        card: cardElement,
                        billing_details: {
                            email: `${localStorage.getItem('email')}`,
                        }
                    },
                })
                .then((result) => {
                    if (result.error) {
                        return;
                    }

                    dataLayer.push({
                        'event': 'Subscribe',
                        'category': 'quiz checkout',
                        'action': 'click',
                        'label': 'Subscribe'
                    });

                    setTimeout(() => {
                        window.location.href = 'thanks.html'
                    }, 10000)
                }))

    } catch (error) {
        stripeBtn.style.display = "block"
        $('.modal-loader').css('display', 'none')
        $('.main__btn').css('display', 'block')
    }

}

stripeBtn.addEventListener('click', () => {
    onPayClick()
})

const openModal = document.querySelectorAll('.open-modal')

for (const open of openModal) {
    open.addEventListener('click', () => {
        checkChange()
        if ((paymentRequest._canMakePaymentAvailability.BROWSER) || (paymentRequest._canMakePaymentAvailability.APPLE_PAY) || (paymentRequest._canMakePaymentAvailability.GOOGLE_PAY)) {
            paymentRequest.show();
        } else {
            overlay.classList.remove('hidden')
            payment.classList.remove('hidden')
            finalPercent.textContent = `${priceSale}`
        }
    })
}


// создаем объект запроса платежа
var paymentRequest = stripe.paymentRequest({
    country: 'US',
    currency: 'usd',
    total: {
        label: 'FASTEASY',
        amount: priceFast
    },
    requestPayerEmail: true,
});


// создаем нашу кнопку оплаты
const elements = stripe.elements();
const prButton = elements.create('paymentRequestButton', {
    paymentRequest: paymentRequest,
    allow: "paymentmethod"
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


// subscribe and check payment for Vean
async function quizCheckoutPayment(paymentMethod) {
    let response = await fetch('stripe.php', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            is_agree_research_policy: true,
            stripe_payment_method_id: paymentMethod,
            site: window.location.href
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
    stripeBtn.style.display = "none"
    $('.main__btn').css('display', 'none');
    $('.main-loader').css('display', 'flex');
    const response = await fetch('stripe.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            paymentMethodType: 'card',
            currency: 'usd',
            site: window.location.href,
            amount: `${localStorage.getItem('amount')}`
        })
    }).then(res => res.json()).then(data => stripe.confirmCardPayment(
        data.client_secret, {
        payment_method: ev.paymentMethod.id
    }, {
        billing_details: {
            email: `${localStorage.getItem('email')}`,
        }
    }, {
        handleActions: false
    }
    ).then(function (confirmResult) {
        if (confirmResult.error) {
            ev.complete('fail');
        } else {
            ev.complete('success');

            dataLayer.push({
                'event': 'Subscribe',
                'category': 'quiz checkout',
                'action': 'click',
                'label': 'Subscribe'
            });

            setTimeout(() => {
                window.location.href = 'thanks.html'
            }, 10000)

            // Check if the PaymentIntent requires any actions and if so let Stripe.js
            // handle the flow. If using an API version older than "2019-02-11"
            // instead check for: `paymentIntent.status === "requires_source_action"`.
            if (confirmResult.paymentIntent.status === "requires_action") {
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
    }))
    localStorage.setItem('resp', JSON.stringify(response));
})

paymentRequest.on('cancel', function () {
    if (document.querySelector('.modal-sure')) {
        sure.classList.remove('hidden')
        overlay.classList.remove('hidden')
        priceSale = 53
        if (localStorage.getItem('inputId') == 'one_week') {
            localStorage.setItem('amount', '0.69')
        } else if (localStorage.getItem('inputId') == 'one_week') {
            localStorage.setItem('amount', '62.99')
        }
        priceFast = localStorage.getItem('amount').replace(/[0.]/g, '')

    }
});

for (const planItem of planItems) {
    // берем прайс-план с нажатого инпута; запоминаем инпут; берем продолжительность курса с нажатого инпута
    let pricePlan = Number(planItem.querySelector('.plan').textContent.replace(/[$]/g, '')),
        priceInput = planItem.querySelector('input'),
        perPlan = planItem.querySelector('.per-item').textContent.replace(/[-]/g, ' ');
    // запускаем функцию при клике на инпут
    priceInput.addEventListener('input', function () {
        let priceOnItem = planItem.querySelector('.price').getAttribute('data-price');
        localStorage.setItem('amount', `${priceOnItem}`)
        priceFast = `${priceOnItem}`.replace(/[0.]/g, '')

        paymentRequest.update({
            total: {
                label: "FASTEASY",
                amount: +priceFast
            }
        })
        if (priceInput.checked) {
            // записываем в storage нажатый прайс-план и запоминаем id инпута для проверки последних изменений (см. функцию checkChange())
            localStorage.setItem('plan', pricePlan)
            localStorage.setItem('inputId', priceInput.getAttribute('id'))
            localStorage.setItem('perPlan', `${perPlan}`)
        }
    })
}

function checkChange() {
    let pricePlan = localStorage.getItem('plan'),
        inputId = localStorage.getItem('inputId'),
        perPlan = localStorage.getItem('perPlan'),

        // сокращаем финальный план до 2х знаков после точки
        pricePlanFinal = pricePlan,
        // находим финальную скидку поделив финальный план на скидку
        // priceSaleFinal = (pricePlan / 100) * priceSale;
        priceSaleFinal = ((pricePlanFinal / 100 * priceSale) + 0.01).toFixed(1);

    // записываем финальный план в модалку
    modalPrice.textContent = pricePlan

    // записываем продолжительность плана в модалку
    finalPer.textContent = `${perPlan}`

    // записываем финальную скидку в модалку
    modalSale.textContent = +priceSaleFinal

    // записываем высчитанный тотал в модалку
    totalPrice.textContent = Math.round((pricePlanFinal - priceSaleFinal) * 100) / 100

    // делаем проверки инпутов для изменения тотал-прайс без клика на инпут и триммируем значения до 2х знаков после точки;
    if (inputId === 'one_week') {
        totalPrice.textContent = (pricePlanFinal - priceSaleFinal).toFixed(2)
    } else if (inputId === ('two_month')) {
        totalPrice.textContent = (pricePlanFinal - (Math.ceil(+priceSaleFinal))).toFixed(2)
        modalSale.textContent = Math.ceil(+priceSaleFinal)
    }
}
