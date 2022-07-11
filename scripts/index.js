var Price = 0
var ProfitMargin = 0
var MoneyCollected = 0
var AmountSold = 0
var Profit = 0

function CalculateProfit(){
    return (MoneyCollected-AmountSold*Price)-Profit
}


function UpdateGUI() {
    document.querySelector('#money-collected').innerHTML = MoneyCollected.toString() + '€' 
    document.querySelector('#profits').innerHTML = CalculateProfit() + '€' 
}

function UpdateData() {
    db.collection('Data').doc('configs').get().then((doc) => {
        Price = Number(doc.data()['price'])
        ProfitMargin = Number(doc.data()['profit-margin'])
    }).then(()=>{
        db.collection('Data').doc('stats').get().then((d) => {
            MoneyCollected = Number(d.data()['money-collected'])
            AmountSold = Number(d.data()['amount-sold'])
            Profit = Number(d.data()['profits'])
        }).then(()=>{
            UpdateGUI()
        })
    })
}


UpdateData()


const ConfirmSale = document.querySelector('#confirmSale')
ConfirmSale.addEventListener('click', ()=>{
    AmountSold += Number(document.querySelector('#amount').value)
    MoneyCollected += Number(document.querySelector('#money').value)

    Profit += (Number(document.querySelector('#money').value)-Number(document.querySelector('#amount').value)*Price)*(1-ProfitMargin)

    db.collection('Data').doc('stats').set({
        "amount-sold":AmountSold.toString(),
        "money-collected":MoneyCollected.toString(),
        "profits":Profit.toString()
    }, {merge:true}).then(()=> {
        document.querySelector('#money').value = ""
        document.querySelector('#amount').value = ""
        UpdateData()
    })
})
const ConfirmSpend = document.querySelector('#confirmSpend')
ConfirmSpend.addEventListener('click', ()=>{
    MoneyCollected -= Number(document.querySelector('#moneyspend').value)

    db.collection('Data').doc('stats').set({
        "money-collected":MoneyCollected.toString()
    }, {merge:true}).then(()=>{
        document.querySelector('#moneyspend').value = ""
        UpdateData()
    })
})