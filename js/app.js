window.onload = () => setTimeout(() => {
    document.body.classList.add('loaded')
}, 1500);

document.addEventListener('DOMContentLoaded', function () {
    // VARIABLES

    const questions = document.querySelectorAll('.section'),
        progress = document.querySelector('.header__progress'),
        header = document.querySelector('.header'),
        footer = document.querySelector('.footer'),
        currentProgress = document.querySelector('.count-header__active'),
        btnBack = document.querySelector('.header__back'),
        controls = document.querySelectorAll('.select'),
        loader = document.querySelector('.loader'),
        age = document.querySelector('.age'),
        contact = document.querySelector('.contact'),
        start = document.querySelector('.start'),

        btnUnit = document.querySelectorAll('.unit-btn'),

        unitTallFt = document.querySelector('#unit-tall-ft'),
        unitTallIn = document.querySelector('#unit-tall-in'),
        unitTallCm = document.querySelector('#unit-tall-cm'),
        tallError = document.querySelector('.tall-error'),

        unitWeightKg = document.querySelector('#unit-weight-kg'),
        unitWeightLbs = document.querySelector('#unit-weight-lbs'),
        weightError = document.querySelector('.weight-error'),

        unitPerfectKg = document.querySelector('#unit-perfect-kg'),
        unitPerfectLbs = document.querySelector('#unit-perfect-lbs'),
        perfectError = document.querySelector('.perfect-error'),
        unitAge = document.querySelector('#age'),
        ageError = document.querySelector('.age-error');

    let question,
        questionNext,
        questionPrev,
        checkProgress,
        progressValue;

    // FUNCTIONS
    for (let index = 0; index < questions.length; index++) {
        let
            question = questions[index],
            questionNext = questions[+index + 1],
            currentProgressValue = +index;
        const
            btnNext = question.querySelectorAll('.btn-next'),
            inputs = question.querySelectorAll('input');

        for (const input of inputs) {
            input.addEventListener('input', () => {
                if (input.getAttribute('type') === 'radio' && input.getAttribute('name') !== 'control-tall' && input.getAttribute('name') !== 'control-weigth' && input.getAttribute('name') !== 'control-perfect') {
                    if (input.checked) {
                        localStorage.setItem('answear', input.getAttribute('id'))
                        setTimeout(() => {
                            question.classList.add('hidden')
                            questionNext.classList.remove('hidden')
                            currentProgress.textContent = currentProgressValue
                            progressValue = +(progress.getAttribute('value')) + 1
                            progress.setAttribute(`value`, progressValue)
                            localStorage.setItem('progressLine', index)
                            localStorage.setItem('progress', (+index + 1))
                        }, 500);
                        dataLayer.push({
                            'event': `question_${index + 1}`,
                            'category': 'quiz',
                            'action': 'click',
                            'label': `question_${index + 1}`,
                        });
                    }
                } else if (input.getAttribute('type') === 'checkbox') {
                    for (let p = 0; p < inputs.length; p++) {
                        const input = inputs[p];
                        if (input.checked) {
                            for (const button of btnNext) {
                                button.disabled = false
                                button.classList.remove('disabled')
                            }
                            break;
                        } else {
                            for (const button of btnNext) {
                                button.disabled = true
                                button.classList.add('disabled')
                            }
                        }
                    }

                    if (input.getAttribute('id') === 'habits_6') {
                        if (input.checked) {
                            for (let habits of document.querySelectorAll('.step-habits__input')) {
                                habits.checked = false
                                habits.addEventListener('input', () => {
                                    input.checked = false
                                })
                            }
                            input.checked = true
                        }
                    }
                } else if (input.getAttribute('type') === 'tel') {
                    function validateTel() {
                        input.value = input.value.replace(/[^\d.]/g, '');
                    }

                    validateTel()

                    if (input.value) {
                        for (const button of btnNext) {
                            button.disabled = false
                            button.classList.remove('disabled')
                        }
                    } else {
                        for (const button of btnNext) {
                            button.disabled = true
                            button.classList.add('disabled')
                        }
                    }

                    const checkUnitTall = () => {
                        if (unitTallFt.value && unitTallIn.value) {
                            for (const button of btnNext) {
                                button.disabled = false
                                button.classList.remove('disabled')
                            }
                        } else {
                            for (const button of btnNext) {
                                button.disabled = true
                                button.classList.add('disabled')
                            }
                        }
                    }

                    // const checkUnitTallCm = () => {
                    //     if (unitTallCm.value > 39 && unitTallCm.value < 251) {
                    //         tallError.classList.add('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = false
                    //             button.classList.remove('disabled')
                    //         }
                    //     } else {
                    //         tallError.classList.remove('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = true
                    //             button.classList.add('disabled')
                    //         }
                    //     }
                    // }

                    // if (unitTallFt.value.length > 0 && unitTallFt.value > 3 && unitTallFt.value < 8) {
                    //     unitTallIn.focus()
                    // }

                    if (input.getAttribute('id') === 'unit-tall-ft') {
                        checkUnitTall()
                    }

                    if (input.getAttribute('id') === 'unit-tall-in') {
                        checkUnitTall()
                    }

                    // if (input.getAttribute('id') === 'unit-tall-cm') {
                    //     checkUnitTallCm()
                    // }

                    // const checkUnitWeigthKg = () => {
                    //     if (unitWeightKg.value > 29 && unitWeightKg.value < 151) {
                    //         weightError.classList.add('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = false
                    //             button.classList.remove('disabled')
                    //         }
                    //     } else {
                    //         weightError.classList.remove('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = true
                    //             button.classList.add('disabled')
                    //         }
                    //     }
                    // }

                    // const checkUnitWeigthLbs = () => {
                    //     if (unitWeightLbs.value > 65 && unitWeightLbs.value < 330) {
                    //         weightError.classList.add('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = false
                    //             button.classList.remove('disabled')
                    //         }
                    //     } else {
                    //         weightError.classList.remove('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = true
                    //             button.classList.add('disabled')
                    //         }
                    //     }
                    // }

                    // if (input.getAttribute('id') === 'unit-weight-kg') {
                    //     weightError.textContent = 'Enter a value from 30 to 150 kg'
                    //     checkUnitWeigthKg()
                    // }

                    // if (input.getAttribute('id') === 'unit-weight-lbs') {
                    //     weightError.textContent = 'Enter a value from 66 to 329 lbs'
                    //     checkUnitWeigthLbs()
                    // }

                    // const checkUnitPerfectKg = () => {
                    //     if (unitPerfectKg.value > 29 && unitPerfectKg.value < 151) {
                    //         perfectError.classList.add('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = false
                    //             button.classList.remove('disabled')
                    //         }
                    //     } else {
                    //         perfectError.classList.remove('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = true
                    //             button.classList.add('disabled')
                    //         }
                    //     }
                    // }

                    // const checkUnitPerfectLbs = () => {
                    //     if (unitPerfectLbs.value > 65 && unitPerfectLbs.value < 330) {
                    //         perfectError.classList.add('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = false
                    //             button.classList.remove('disabled')
                    //         }
                    //     } else {
                    //         perfectError.classList.remove('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = true
                    //             button.classList.add('disabled')
                    //         }
                    //     }
                    // }

                    // if (input.getAttribute('id') === 'unit-perfect-kg') {
                    //     perfectError.textContent = 'Enter a value from 30 to 150 kg'
                    //     checkUnitPerfectKg()
                    // }

                    // if (input.getAttribute('id') === 'unit-perfect-lbs') {
                    //     perfectError.textContent = 'Enter a value from 66 to 329 lbs'
                    //     checkUnitPerfectLbs()
                    // }

                    // const checkUnitAge = () => {
                    //     if (unitAge.value > 15 && unitAge.value < 100) {
                    //         ageError.classList.add('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = false
                    //             button.classList.remove('disabled')
                    //         }
                    //     } else {
                    //         ageError.classList.remove('hidden')
                    //         for (const button of btnNext) {
                    //             button.disabled = true
                    //             button.classList.add('disabled')
                    //         }
                    //     }
                    // }

                    // if (input.getAttribute('id') === 'age') {
                    //     checkUnitAge()
                    // }

                } else if (input.getAttribute('type') === 'email') {
                    function validateEmail(input) {
                        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        return re.test(input);
                    };

                    function validate() {
                        const email = input.value;
                        if (validateEmail(email)) {
                            document.querySelector('.step-contact__wrap').classList.remove('error')
                            document.querySelector('.step-contact__wrap').classList.add('success')
                            document.querySelector('.step-contact__err').textContent = 'Perfect'
                            for (const button of btnNext) {
                                button.disabled = false
                                button.classList.remove('disabled')
                            }
                        } else {
                            document.querySelector('.step-contact__wrap').classList.add('error')
                            document.querySelector('.step-contact__wrap').classList.remove('success')
                            for (const button of btnNext) {
                                button.disabled = true
                                button.classList.add('disabled')
                            }
                        }
                        return false;
                    }

                    validate()

                    localStorage.setItem('email', input.value)
                }
            })
        }

        for (const button of btnNext) {
            button.addEventListener('click', () => {

                if (index == 0) {
                    footer.classList.add('hidden')
                    dataLayer.push({
                        'event': 'question_1',
                        'category': 'quiz',
                        'action': 'click',
                        'label': 'question_1'
                    });
                }
                if (index == 1) {
                    header.classList.add('start-quiz')
                    dataLayer.push({
                        'event': 'question_2',
                        'category': 'quiz',
                        'action': 'click',
                        'label': 'question_2'
                    });
                }
                if (index > 1 && index < 27) {
                    dataLayer.push({
                        'event': `question_${index + 1}`,
                        'category': 'quiz',
                        'action': 'click',
                        'label': `question_${index + 1}`,
                    });
                }
                if (index < 26) {

                    question.classList.add('hidden')
                    questionNext.classList.remove('hidden')
                    currentProgress.textContent = currentProgressValue
                    localStorage.setItem('progress', (+index + 1))
                    localStorage.setItem('progressLine', index)
                    progress.setAttribute(`value`, +index)
                }
                if (index === 26) {

                    currentProgress.textContent = currentProgressValue
                    localStorage.setItem('progress', (+index + 1))
                    localStorage.setItem('progressLine', index)
                    progress.setAttribute(`value`, +index)

                    header.classList.remove('start-quiz')

                    loaderStart();
                    counter(87);

                    index = 28;
                }

                if (index === 28) {

                    question.classList.add('hidden')
                    questionNext.classList.remove('hidden')
                    header.classList.remove('start-quiz')

                    localStorage.setItem('progress', (+index + 1))
                }

                if (index === 29) {
                    localStorage.setItem('progress', (+index + 1))

                    question.classList.add('hidden')
                    questionNext.classList.remove('hidden')

                    dataLayer.push({
                        'event': `question_29`,
                        'category': 'quiz',
                        'action': 'click',
                        'label': `question_29`,
                    });
                }
                if (index === 30) {
                    localStorage.removeItem('progress')
                    localStorage.removeItem('answear')
                    dataLayer.push({
                        'event': `question_30`,
                        'category': 'quiz',
                        'action': 'click',
                        'label': `question_30`,
                    });
                }

                window.scrollTo(0, 0);
            });
        }
    }

    for (let control of controls) {
        const selectInputs = control.querySelectorAll('input');
        for (const selectInput of selectInputs) {
            selectInput.addEventListener('input', function () {
                for (const btn of btnUnit) {
                    btn.disabled = true
                    btn.classList.add('disabled')
                }
                unitTallFt.value = ''
                unitTallIn.value = ''
                unitTallCm.value = ''
                unitWeightLbs.value = ''
                unitWeightKg.value = ''
                unitPerfectKg.value = ''
                unitPerfectLbs.value = ''
                // tallError.classList.add('hidden')
                // weightError.classList.add('hidden')
                // perfectError.classList.add('hidden')
                if (control.querySelector('[data-select="2"]').checked) {
                    control.nextElementSibling.querySelector('[data-unit="1"]').classList.add('hidden');
                    control.nextElementSibling.querySelector('[data-unit="2"]').classList.remove('hidden');
                } else if (control.querySelector('[data-select="1"]').checked) {
                    control.nextElementSibling.querySelector('[data-unit="2"]').classList.add('hidden');
                    control.nextElementSibling.querySelector('[data-unit="1"]').classList.remove('hidden');
                }
            })
        }
    }

    btnBack.addEventListener('click', () => {
        var i = localStorage.getItem('progress')

        let currentProgressValue = (+i - 2)

        if (+i == 2) {
            questions[1].classList.remove('hidden')
            questions[2].classList.add('hidden')
            progress.setAttribute(`value`, 0)
            header.classList.remove('start-quiz')
        }

        if (+i > 2 && +i <= 26) {
            questions[i].classList.add('hidden')
            questions[i - 1].classList.remove('hidden')
            currentProgress.textContent = currentProgressValue
            localStorage.setItem('progress', (+i - 1))
            localStorage.setItem('progressLine', (+i - 2))
            progress.setAttribute(`value`, (+i - 2))
        }

        if (+i == 29) {
            console.log(i);
            header.classList.remove('start-quiz')
            contact.classList.add('hidden')
            loader.classList.remove('hidden')
            localStorage.setItem('progress', (+i - 1))
            localStorage.setItem('progressLine', (+i - 2))
            loaderStart();
            counter(87);
        }

        let inputActive = localStorage.getItem('answear')

        document.querySelector(`#${inputActive}`).checked = false
    })

    // loader

    // counterPercent

    function counter(ms) {
        let
            counter = 0,
            interval = setInterval(() => {
                percent.innerHTML = counter++
                counter > 100 ? clearInterval(interval) : false;
            }, ms)
    }

    let
        percent = document.querySelector('.percent'),
        LoaderTitle = document.querySelectorAll('.loader__title');

    // loader

    function loaderStart() {
        age.classList.add('hidden')
        loader.classList.remove('hidden')
        let loaderProgress = new ldBar("#loader");
        let loaderWidth = document.querySelector('.ldBar').getAttribute('data-value');

        if (loaderWidth < 17) {
            setTimeout(() => {
                loaderProgress.set(17);
            }, 100);
        };

        setTimeout(() => {
            if (loaderWidth = 17) {
                loaderProgress.set(34);
                LoaderTitle[0].style.display = 'none';
                LoaderTitle[1].style.display = 'block';
            };
        }, 1500);

        setTimeout(() => {
            if (loaderWidth = 34) {
                loaderProgress.set(51);
                LoaderTitle[1].style.display = 'none';
                LoaderTitle[2].style.display = 'block';
            };
        }, 3000);

        setTimeout(() => {
            if (loaderWidth = 51) {
                loaderProgress.set(68);
                LoaderTitle[2].style.display = 'none';
                LoaderTitle[3].style.display = 'block';
            }
        }, 4500);

        setTimeout(() => {
            if (loaderWidth = 68) {
                loaderProgress.set(85);
                LoaderTitle[3].style.display = 'none';
                LoaderTitle[4].style.display = 'block';
            }
        }, 6000);

        setTimeout(() => {
            if (loaderWidth = 85) {
                LoaderTitle[4].style.display = 'none';
                LoaderTitle[5].style.display = 'block';
                loaderProgress.set(100);
            }
        }, 7500);

        setTimeout(() => {
            if (loaderWidth = 100) {
                loader.classList.add('hidden')
                contact.classList.remove('hidden')
                currentProgress.textContent = '27'
                localStorage.setItem('progress', '29')
                localStorage.setItem('progressLine', '27')
                progress.setAttribute(`value`, '27')
                header.classList.add('start-quiz')

                for (const title of LoaderTitle) {
                    title.style.display = 'none';
                }
                LoaderTitle[0].style.display = 'block';
                loaderProgress.set(0);
                loaderWidth = 0
            }
        }, 9500);
    };

    function saveProgressLine() {
        let progressLine = localStorage.getItem('progressLine');

        for (let index = 0; index < +progressLine; index++) {
            progressValue = +(progress.getAttribute('value')) + 1;
            progress.setAttribute(`value`, progressValue);
        }

        for (let index = 27; + progressLine <= index; index--) {
            try {
                progressValue = 1;
            } catch (error) {}
        }

        currentProgress.textContent = progressLine
    }

    function storageLoad() {
        let i = localStorage.getItem('progress');
        question = questions[i];

        if (+i == 0) {
            start.classList.remove('hidden')
        } else if (+i == 1) {
            start.classList.add('hidden')
            footer.classList.add('hidden')
            question.classList.remove('hidden')
        } else if (+i > 28) {
            start.classList.add('hidden')
            footer.classList.add('hidden')
            header.classList.remove('start-quiz')
            question.classList.remove('hidden')
        } else if (i) {
            start.classList.add('hidden')
            footer.classList.add('hidden')
            header.classList.add('start-quiz')
            question.classList.remove('hidden')
        } else {
            question.classList.remove('hidden')
        }
    }

    storageLoad()
    saveProgressLine()
})