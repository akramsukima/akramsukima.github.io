loadingStart();


auth.onAuthStateChanged((user) => {
    GetHtml('../../navbar/structure.html').then(x => {
        document.querySelector('.nav').innerHTML = x
        addNavListener()
    }).then(()=>{
        if (user) {
            window.location.href = '/'
        } else {
            document.getElementById('myAccount').href = '/auth/login/'
            document.getElementById('myAccountMobile').href = '/auth/login/'
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
    const user = document.querySelector('#user').value
    const pass = document.querySelector('#pass').value

    if (user+pass == '') {
        error('Bitte alle Felder ausfüllen.')
    } else {
        auth.signInWithEmailAndPassword(user, pass).then((uc) => {
            window.location.href = '/'
        }).catch((error) => {
            document.querySelector('#error').style.display = 'block'
            document.querySelector('#error').innerHTML = 'Email und/oder Password falsch.'
        });
    }
})
