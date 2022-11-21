var uid = null;


auth.onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid
        if (uid == "LPIR3dFJxXhRlnesiSwqp7uOTok1") {
            document.querySelector('.menu').innerHTML += '<a href="/admin/devices">Dashboard</a>'
            document.querySelector('.mobile-menu').innerHTML += '<a href="/admin/devices">Dashboard</a>'
        }
    } else {
        document.getElementById('myAccount').href = '/auth/login/'
        document.getElementById('myAccountMobile').href = '/auth/login/'
    }
});

GetHtml('../navbar/structure.html').then(x => {
    document.querySelector('.nav').innerHTML = x
    addNavListener()
})