loadingStart();

auth.onAuthStateChanged((user) => {
    GetHtml('../../navbar/structure.html').then(x => {
        document.querySelector('.nav').innerHTML = x
        addNavListener()
    }).then(()=>{
        if (user) {
            if (user.uid == "LPIR3dFJxXhRlnesiSwqp7uOTok1") {
                document.querySelector('.menu').innerHTML += '<a href="/admin/devices">Dashboard</a>'
                document.querySelector('.mobile-menu').innerHTML += '<a href="/admin/devices">Dashboard</a>'
            }
            document.querySelector('#created').innerHTML = "Beigetreten am: " + user.metadata.creationTime        
            document.querySelector('#last').innerHTML = "Zuletzt gesehen: " + user.metadata.lastSignInTime
            document.querySelector('#email').innerHTML = "Email: " + user.email        
        } else {
            window.location.href = "/home/" 
        }
        loadingEnd()
    })
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
        alert(error)
    });
})
