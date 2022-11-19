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
    const name = document.querySelector('#name').value
    const user = document.querySelector('#user').value
    const pass = document.querySelector('#pass').value

    if (name+user+pass == '') {
        alert('Bitte füllen sie alle Felder aus')
    } else {
        auth.createUserWithEmailAndPassword(user, pass).then((uc)=>{
            db.collection("UserData").doc(uc.user.uid).set({
                name: name,
                email: user   
            }).then(() => {
                window.location.href = '../'
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        }).catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
        });
    }
})
