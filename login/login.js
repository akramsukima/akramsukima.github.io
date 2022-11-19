auth.onAuthStateChanged((user) => {
    if (user) {
        window.location.href = '/'
    }
});
function isEmail(emailAdress){
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regex)) 
        return true; 
    else 
        return false; 
}

const signup = document.querySelector('#submit')
signup.addEventListener('click', ()=>{
    const user = document.querySelector('#user').value
    const pass = document.querySelector('#pass').value

    if (user+pass == '') {
        alert('Bitte füllen sie alle Felder aus')
    } else {
        auth.signInWithEmailAndPassword(user, pass).then((uc) => {
            window.location.href = '../'
        }).catch((error) => {
            var errorMessage = error.message;
            console.log(errorMessage)
        });
    }
})
