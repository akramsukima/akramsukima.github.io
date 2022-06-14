
var Amount = 0




function UpdateAmount() {
    db.collection('Geld').doc("Menge").get().then((doc) => {
        document.querySelector('#amount').innerHTML = doc.data()['menge'] + " Euro"
        Amount = Number(doc.data()['menge'])
    })
}
function AddAmount() {
    db.collection('Geld').doc("Menge").set({
        menge: Amount + Number(document.querySelector('#menge').value)
    }, { merge: true }).then(() => {
        document.querySelector('#menge').value = 0
        UpdateAmount()
    })
}



UpdateAmount()


const button = document.querySelector('#submit')
button.addEventListener('click', () => {
    AddAmount()
})