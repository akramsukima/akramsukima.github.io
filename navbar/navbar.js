function addNavListener() {
    const hamburger = document.querySelector('.hamburger')
    const mobile_menu = document.querySelector('.mobile-menu');
    hamburger.addEventListener('click', () => {
        document.querySelector('.hamburger').classList.toggle('is-active')
        mobile_menu.classList.toggle('is-open');
    })
}