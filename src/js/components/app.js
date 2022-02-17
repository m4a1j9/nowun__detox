import * as fisFunctions from "./modules/functions.js";
import * as EmailValidator from 'email-validator';

/* import Swiper, { Navigation, Pagination } from 'swiper';

const swiper = new Swiper(); */

window.onload = function () {
    fisFunctions.isWebp();
    fisFunctions.timer(deadline);
    fisFunctions.storageLoad();
    fisFunctions.saveProgressLine();
    //fisFunctions.setEndOfSubscribe();
};


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


const
    dimensions = document.querySelectorAll(`[name='dimensions']`),
    sections = document.querySelectorAll('.container section'),
    header = document.querySelector('header'),
    footer = document.querySelector('footer');

// счетчик скидки
var
    hoursValue = document.querySelector('.hours__value'),
    minutesValue = document.querySelector('.minutes__value'),
    secondsValue = document.querySelector('.seconds__value'),
    deadline = new Date().getTime() + (900 * 1000),
    end__of__subscribes = document.querySelectorAll('.end__of__subscribe'),
    overlay = document.querySelector('.js-overlay-modal')
    ;

var
    sectionsWithAnimate = [], // секции с анимационными элементами
    nthAnimItems = [];


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


// buttons block
dimensions.forEach(e => {
    e.addEventListener('input', fisFunctions.validCheck);
});


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


for (let index = 0; index < sections.length; index++) {
    // init
    const
        section = sections[index],
        sectionPrev = sections[+index - 1],
        sectionNext = sections[+index + 1];

    const
        buttons = section.querySelectorAll('.test__button'),
        buttonsB = section.querySelectorAll('.test__buttonB');

    const
        test__nothing = section.querySelector('.test__nothing'),
        tests__nothing = section.querySelectorAll('.test__nothing'),
        test__inputs = section.querySelectorAll('.test__input'),
        test__uncorrect = section.querySelector('.test__uncorrect');

    for (const input of test__inputs) {

        input.addEventListener('input', () => {

            if (input.getAttribute('type') === 'text') {
                if (input.value) {
                    for (const button of buttons) {
                        button.disabled = false;
                    }
                } else {
                    for (const button of buttons) {
                        button.disabled = true;
                    }
                }

                try {
                    test__nothing.checked = false
                } catch (error) { }

            } else if (input.getAttribute('type') === 'email') {
                test__uncorrect.classList.remove('_active');

                if (EmailValidator.validate(input.value) === false) {

                    setTimeout(() => {
                        test__uncorrect.classList.add('_active');
                    }, 2000);

                    for (const button of buttons) {
                        button.disabled = true;
                    }

                } else {

                    test__uncorrect.classList.remove('_active');
                    for (const button of buttons) {
                        button.disabled = false;
                    }
                }

                if (input.value) {
                    input.classList.add('_active');
                } else {
                    input.classList.remove('_active');
                }

            } else {

                for (let p = 0; p < test__inputs.length; p++) {
                    const input = test__inputs[p];

                    if (input.checked) {
                        for (const button of buttons) {
                            button.disabled = false;
                        }
                        break
                    } else {
                        for (const button of buttons) {
                            button.disabled = true;
                        }
                    }
                }

                try {
                    test__nothing.checked = false
                } catch (error) { }
            }
        });
    }

    tests__nothing.forEach((input, i, a) => {
        input.addEventListener('input', () => {
            if (input.checked) {
                for (const button of buttons) {
                    button.disabled = false;
                }
            } else {
                for (const button of buttons) {
                    button.disabled = true;
                }
            }

            test__inputs.forEach((v, i, a) => {
                v.checked = false
            })
        })
    })

    for (const button of buttons) {
        button.addEventListener('click', () => {
            if (index === 0) { //! Главная страница

                footer.classList.remove('_show');
                header.classList.add('_show');

                localStorage.setItem('progressLine', index);
                fisFunctions.saveProgressLine();

                // dataLayer.push({
                //     'event': 'пройди_тест',
                //     'category': 'quiz',
                //     'action': 'click',
                //     'label': 'пройди_тест'
                // });

            } else if (index < 19) {

                localStorage.setItem('progressLine', index);
                fisFunctions.saveProgressLine()

                // dataLayer.push({
                //     'event': `question_${index}`,
                //     'category': 'quiz',
                //     'action': 'click',
                //     'label': `question_${index}`
                // });

            } else if (index === 19) { //! Последний вопрос

                localStorage.setItem('progressLine', index);
                fisFunctions.saveProgressLine()

                fisFunctions.loaderStart(sectionNext);
                fisFunctions.counter(80);

                // dataLayer.push({
                //     'event': `question_${index}`,
                //     'category': 'quiz',
                //     'action': 'click',
                //     'label': `question_${index}`
                // });

            } else if (index === 20) { //! contacts

                var modalId = button.getAttribute('data-modal'),
                    modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');



                modalElem.classList.add('_active');
                overlay.classList.add('_active');

                //localStorage.clear();


                // button.classList.contains('up_checkout') ?

                //     dataLayer.push({
                //         'event': 'up_checkout',
                //         'category': 'quiz checkout',
                //         'action': 'click',
                //         'label': 'up_checkout'
                //     })

                //     :

                //     button.classList.contains('middle_checkout') ?

                //         dataLayer.push({
                //             'event': 'middle_checkout',
                //             'category': 'quiz checkout',
                //             'action': 'click',
                //             'label': 'middle_checkout'
                //         })

                //         :

                //         dataLayer.push({
                //             'event': 'down_checkout',
                //             'category': 'quiz checkout',
                //             'action': 'click',
                //             'label': 'down_checkout'
                //         })

            } else if (index === 22) { //! pay

                var modalId = button.getAttribute('data-modal'),
                    modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');



                modalElem.classList.add('_active');
                overlay.classList.add('_active');

                localStorage.clear();

            }
            section.classList.remove('_show');

            if (index !== 19) {
                sectionNext.classList.add('_show')
            }

            localStorage.setItem('progress', (+index + 1));

            window.scrollTo(0, 0);
        });

    }

    for (const buttonB of buttonsB) {
        buttonB.addEventListener('click', () => {

            section.classList.remove('_show');
            sectionPrev.classList.add('_show');

            localStorage.setItem('progress', (+index - 1));
            localStorage.setItem('progressLine', (+index - 2));
            fisFunctions.saveProgressLine()

            window.scrollTo(0, 0);
        });
    }


    let observer = new MutationObserver(mutationRecords => {
        var
            target = mutationRecords[0].target;

        setTimeout(() => {

            if (target.classList.contains('_show')) {

                target.querySelectorAll('.anim_item').forEach(e => e.classList.add('_animated'))
            } else {

                target.querySelectorAll('.anim_item').forEach(e => e.classList.remove('_animated'))
            }
        }, 500);
    });
    observer.observe(section, {
        attributes: true,
        characterData: true,
        characterDataOldValue: true,
    })
}
