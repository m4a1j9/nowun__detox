const buttonsHref = document.querySelectorAll('.test-button-href');

for (let buttonHref of buttonsHref) {
    buttonHref.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = buttonHref.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}
