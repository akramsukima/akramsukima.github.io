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

function sold(abs) {
    var solamount = document.querySelector('#sol' + abs).value;

    db.collection('Money').doc('devices').get().then((doc) => {
        var dev = doc.data()[''+abs]
        db.collection('Money').doc('devices').update({
            [abs]: {
                amount: dev['amount'],
                expences: dev['expences'],
                name: dev['name'],
                sold: true,
                soldamount: Number(solamount),
            }
        }).then(()=>{
            db.collection('Money').doc('Amount').update({
                Ava: Amount + Number(solamount),
            }).then(()=>{
                db.collection("Money").doc("Amount").get().then((doc) => {
                    Amount = available
                    var available = Number(doc.data()["Ava"]);
                    document.querySelector('.availableamount').innerHTML = 'Available: ' + available + ' Euro'
                    window.location.href="../pages/current.html";
                })
            })
        })
    })
}
function expence(abs) {
    var expamount = document.querySelector('#exp' + abs).value;

    db.collection('Money').doc('devices').get().then((doc) => {
        var dev = doc.data()[''+abs]
        db.collection('Money').doc('devices').update({
            [abs]: {
                amount: dev['amount'],
                expences: dev['expences'] + Number(expamount),
                name: dev['name'],
                sold: dev['sold']
            }
        }).then(()=>{
            db.collection('Money').doc('Amount').update({
                Ava: Amount - Number(expamount),
            }).then(()=>{
                db.collection("Money").doc("Amount").get().then((doc) => {
                    var available = Number(doc.data()["Ava"]);
                    Amount = available
                    document.querySelector('.availableamount').innerHTML = 'Available: ' + available + ' Euro'
                    window.location.href="../pages/current.html";
                })
            })
        })
    })
}




db.collection('Money').doc('devices').get().then((doc) => {
    for (var key of Object.keys(doc.data())) {
        if (!doc.data()[key]['sold']) {
            const date = new Date(key*1000);
            const div = `
            <div class="device">
                <h4>${doc.data()[key]['name']}</h4>
                <h5>Purchased on: ${date.toLocaleDateString("en-US")}</h5>
                <h5>Price: ${doc.data()[key]['amount']}</h5>
                <h5>Expences: ${doc.data()[key]['expences']}</h5>
                <input id="exp${key}" type="text" placeholder="expences">
                <button onclick="expence(${key})">Submit</button>
                <input id="sol${key}" type="text" placeholder="Sold for">
                <button onclick="sold(${key})">Sold</button>
                
            </div>
            `
            document.querySelector('#body').innerHTML += div 
        }
    }
})
