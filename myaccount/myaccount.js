var uid = null;


auth.onAuthStateChanged((user) => {
    if (user) {
        uid = user.uid
        if (uid == "LPIR3dFJxXhRlnesiSwqp7uOTok1") {
            document.querySelector('.menu').innerHTML += '<a href="/admin/devices">Dashboard</a>'
            document.querySelector('.mobile-menu').innerHTML += '<a href="/admin/devices">Dashboard</a>'
        }

        document.querySelector('#created').innerHTML = "Beigetreten am: " + user.metadata.creationTime        
        document.querySelector('#last').innerHTML = "Zuletzt gesehen: " + user.metadata.lastSignInTime
        document.querySelector('#email').innerHTML = "Email: " + user.email        
        
    } else {
        window.location.href = "/" 
    }
});

const signoutbtn = document.querySelector('#signout')
signoutbtn.addEventListener('click', ()=> {
    auth.signOut().then(() => {
        window.location.href = "/"    
    })
})

const changepass = document.querySelector('#changepass')
changepass.addEventListener('click', ()=>{
    var user = auth.currentUser;
    var newPassword = document.querySelector('#newpass').value
    user.updatePassword(newPassword).then(function() {
        document.querySelector('#newpass').value = ''
    }).catch(function(error) {
    // An error happened.
        console.log(error)
    });
})
