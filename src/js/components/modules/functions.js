const
    sections = document.querySelectorAll('.container section'),
    progress = document.querySelector('.static-top__progress'),
    header = document.querySelector('header'),
    footer = document.querySelector('footer')
    ;
// Проверка поддержки webp, добавление класса webp или no-webp для HTML


export function isWebp() {
    function testWebP(callback) {
        // Проверка поддержки webp
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    // Добавление класса _webp иои _np-webp для HTML
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });
}


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


export function validCheck() {
    var
        valid = this.value.replace(/[^0-9]/g, '');
    this.value = valid;

    if (this.value) {
        this.classList.add('_active');
    } else {
        this.classList.remove('_active');
    }
}


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


export function saveProgressLine() {
    let progressLine = localStorage.getItem('progressLine');

    //console.log(progressValue);
    progress.setAttribute(`value`, progressLine);

}


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


export function storageLoad() {
    var i = localStorage.getItem('progress');
    var section = sections[i];

    if (!(isNaN(i) == true || +i == 0)) {
        (sections[0]).classList.remove('_show');

        section.classList.add('_show');

        footer.classList.remove('_show');
        header.classList.add('_show');
    }
}


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


export function timer(deadline) {
    // id таймера
    let
        timerId = null;
    // склонение числительных
    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {
        // сейчас
        let
            now = new Date().getTime();
        let
            diff = deadline - now;
        //console.log(now);
        if (diff <= 0) {
            clearInterval(timerId);
        }
        let
            hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0,
            minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0,
            seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        //console.log(diff);
        //console.log(hours,minutes,seconds);
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
        $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    // получаем элементы, содержащие компоненты даты
    const
        $hours = document.querySelector('.hours__value'),
        $minutes = document.querySelector('.minutes__value'),
        $seconds = document.querySelector('.seconds__value');
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
}


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


export function setEndOfSubscribe() {
    let
        endOfSubscribeV = new Date().getTime() + (7 * 24 * 3600 * 1000),
        endOfSubscribe = new Date();
    endOfSubscribe.setTime(endOfSubscribeV);
    let
        endYear = endOfSubscribe.getFullYear(),
        endMonthV = endOfSubscribe.getMonth(),
        endDate = endOfSubscribe.getDate(),
        endMonth;

    switch (endMonthV) {
        case 0:
            endMonth = '01';
            break;
        case 1:
            endMonth = '02';
            break;
        case 2:
            endMonth = '03';
            break;
        case 3:
            endMonth = '04';
            break;
        case 4:
            endMonth = '05';
            break;
        case 5:
            endMonth = '06';
            break;
        case 6:
            endMonth = '07';
            break;
        case 7:
            endMonth = '08';
            break;
        case 8:
            endMonth = '09';
            break;
        case 9:
            endMonth = '10';
            break;
        case 10:
            endMonth = '11';
            break;
        case 11:
            endMonth = '12';
            break;
        default:
            break;
    }

    end__of__subscribes.forEach((end__of__subscribe) => {
        if (typeof end__of__subscribe.textContent !== "undefined") {
            end__of__subscribe.textContent = `${endDate}.${endMonth}.${endYear}`;
        } else {
            end__of__subscribe.innerText = `${endDate}.${endMonth}.${endYear}`;
        }

        end__of__subscribe.innetHTML = `${endDate}.${endMonth}.${endYear}`;
    })
}


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||


// loader


// counterPercent

export function counter(ms) {
    let
        counter = 0,
        interval = setInterval(() => {
            percent.innerHTML = counter++
            counter > 100 ? clearInterval(interval) : false;
        }, ms)
}

let
    loader = document.querySelector('.loader'),
    percent = loader.querySelector('.percent'),
    loaderTitleOne = loader.querySelector('.loader__title:nth-of-type(1)'),
    loaderTitleTwo = loader.querySelector('.loader__title:nth-of-type(2)'),
    loaderTitleThree = loader.querySelector('.loader__title:nth-of-type(3)'),
    loaderTitleFour = loader.querySelector('.loader__title:nth-of-type(4)')
    ;

// loader

export function loaderStart(contactsMainPage) {
    loader.style.cssText = 'display: grid;';
    let loaderProgress = new ldBar("#loader");
    let loaderWidth = document.querySelector('.ldBar').getAttribute('data-value');

    if (loaderWidth < 10) {
        setTimeout(() => {
            loaderProgress.set(10);
        }, 100);
    };

    setTimeout(() => {
        if (loaderWidth = 10) {
            loaderProgress.set(30);
            document.querySelector('.mainline').style.stroke = '#F79E1B';
            loaderTitleOne.style.display = 'none';
            loaderTitleTwo.style.display = 'block';
        };
    }, 1500);

    setTimeout(() => {
        if (loaderWidth = 30) {
            loaderProgress.set(60);
            document.querySelector('.mainline').style.stroke = '#EEDC3C';
            loaderTitleTwo.style.display = 'none';
            loaderTitleThree.style.display = 'block';
        };
    }, 3000);

    setTimeout(() => {
        if (loaderWidth = 60) {
            loaderProgress.set(100);
            document.querySelector('.mainline').style.stroke = '#75C94E';
            loaderTitleThree.style.display = 'none';
            loaderTitleFour.style.display = 'block';
        }
    }, 4500);


    setTimeout(() => {
        if (loaderWidth = 100) {
            loader.style.display = 'none';
            contactsMainPage.classList.add('_show');
            // setTimeout(function () {
            // }, 400);
        }
    }, 6500);
};


//!||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
