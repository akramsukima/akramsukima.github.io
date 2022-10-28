db.collection("Money").doc("Amount").get().then((doc) => {
    var available = Number(doc.data()["Ava"]);
    document.querySelector('.availableamount').innerHTML = 'Available: ' + available + ' Euro'

    db.collection('Money').doc('devices').get().then((doc) => {
        var networth = available
        for (var key of Object.keys(doc.data())) {
            if (!doc.data()[key]['sold']) {
                networth += doc.data()[key]['amount'] + doc.data()[key]['expences']
            }
        }
        document.querySelector('.netamount').innerHTML = 'Net: ' + networth + ' Euro'
    })
    
})

const NavAdd = document.querySelector('#navAdd')
NavAdd.addEventListener('click', () => {
    window.location.href="../pages/add.html";
})
const NavCurrent = document.querySelector('#navCurOrd')
NavCurrent.addEventListener('click', () => {
    window.location.href="../pages/current.html";
})
function getUnixTime() {
    return (Date.now() / 1000) | 0;  
}
var Amount = 0
db.collection("Money").doc("Amount").get().then((doc) => {
    Amount = Number(doc.data()["Ava"])
})




const expensesubmit = document.querySelector('#expense-submit')
expensesubmit.addEventListener('click', () => {
    var reason = document.getElementById("expense-reason").value
    var amount = document.getElementById("expense-amount").value
    if (!reason=='' && !amount==''){
        db.collection("Money").doc("Amount").get().then((doc) => {
            Amount = Number(doc.data()["Ava"])
            db.collection('Money').doc('expenses').set({
                [getUnixTime()] : {
                    reason: reason,
                    amount: Number(amount)
                },
            }, { merge: true }).then(()=>{
                db.collection('Money').doc('Amount').update({
                    Ava: Amount - Number(amount),
                }).then(()=>{
                    Amount -= Number(amount)
                    document.getElementById("expense-reason").value = '';
                    document.getElementById("expense-amount").value = '';
                })
                db.collection("Money").doc("Amount").get().then((doc) => {
                    var available = Number(doc.data()["Ava"]);
                    Amount = available
                    document.querySelector('.availableamount').innerHTML = 'Available: ' + available + ' Euro'
                })
            });
        })
    }   
})
const addmoneysubmit = document.querySelector('#addmoney-submit')
addmoneysubmit.addEventListener('click', () => {
    var reason = document.getElementById("addmoney-reason").value
    var amount = document.getElementById('addmoney-amount').value
    if (!reason=='' && !amount=='') {
        console.log(1);
        db.collection("Money").doc("Amount").get().then((doc) => {
            Amount = Number(doc.data()["Ava"])
            db.collection('Money').doc('income').set({
                [getUnixTime()] : {
                    reason: reason,
                    amount: Number(amount)
                },
            }, { merge: true }).then(()=>{
                db.collection('Money').doc('Amount').update({
                    Ava: Amount + Number(amount),
                }).then(()=>{
                    Amount += Number(amount)
                    document.getElementById("addmoney-reason").value = '';
                    document.getElementById("addmoney-amount").value = '';
                    db.collection("Money").doc("Amount").get().then((doc) => {
                        var available = Number(doc.data()["Ava"]);
                        Amount = available
                        document.querySelector('.availableamount').innerHTML = 'Available: ' + available + ' Euro'
                    })
                })
            });
        })
    }
})
const devicesubmit = document.querySelector('#device-submit')
devicesubmit.addEventListener('click', () => {
    var name = document.getElementById("device-name").value;
    var amount = document.getElementById("device-amount").value;

    if (!name == '' && !amount == '') {
        db.collection('Money').doc('devices').set({
            [getUnixTime()] : {
                name: name,
                amount: Number(amount),
                sold: false,
                expences: 0,
            },
        }, { merge: true }).then(()=>{
            db.collection('Money').doc('Amount').update({
                Ava: Amount - Number(amount),
            }).then(()=>{
                Amount -= Number(amount)
                document.getElementById("addmoney-reason").value = '';
                document.getElementById("addmoney-amount").value = '';
                db.collection("Money").doc("Amount").get().then((doc) => {
                    var available = Number(doc.data()["Ava"]);
                    Amount = available
                    document.querySelector('.availableamount').innerHTML = 'Available: ' + available + ' Euro'
                })
            })
            document.getElementById("device-name").value = '';
            document.getElementById("device-amount").value = '';
            document.getElementById("device-ID").value = '';
        });
    }
})
