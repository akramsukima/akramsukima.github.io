function loadingStart() {
    document.querySelector('.body').style.display = 'none'
    document.querySelector('.loadingscreen').style.display = 'block'
}
function loadingEnd() {
    document.querySelector('.body').style.display = 'block'
    document.querySelector('.loadingscreen').style.display = 'none'
}