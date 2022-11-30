loadingStart();

auth.onAuthStateChanged((user) => {
    GetHtml('../../navbar/structure.html').then(x => {
        document.querySelector('.nav').innerHTML = x
        addNavListener()
    }).then(()=>{
        if (user) {
            window.location.href = '/'
        } else {
            document.getElementById('myAccount').href = '/auth/signup/'
            document.getElementById('myAccountMobile').href = '/auth/signup/'
        }
        loadingEnd()
    })
});

function error(message){
    document.querySelector('#error').style.display = 'block'
    document.querySelector('#error').innerHTML = message
} 


const signup = document.querySelector('#submit')
signup.addEventListener('click', ()=>{
    const name = document.querySelector('#name').value
    const user = document.querySelector('#user').value
    const pass = document.querySelector('#pass').value

    if (name+user+pass == '') {
        error('Bitte alle Felder ausfüllen.')
    } else {
        auth.createUserWithEmailAndPassword(user, pass).then((uc)=>{
            db.collection("UserData").doc(uc.user.uid).set({
                name: name,
                email: user   
            }).then(() => {
                window.location.href = '/'
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }).catch((error) => {
            document.querySelector('#error').style.display = 'block'
            document.querySelector('#error').innerHTML = 'Email ungültig oder Password zu kurz.'
        });
    }
})
