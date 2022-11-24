loadingStart();

auth.onAuthStateChanged((user) => {
    addNavListener()
    if (user) {
        if (user.uid == 'LPIR3dFJxXhRlnesiSwqp7uOTok1') {
        } else {
            window.location.href = '/'
        }
    } else {
        window.location.href = '/'
    }
    loadingEnd()

});