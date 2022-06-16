var GeldMenge = 0
var GrammZahl = 0
var Preis = 0



function UpdateData() {
    db.collection('Tijara').doc("Geld").get().then((doc) => {
        GeldMenge = Number(doc.data()['Menge'])
        document.querySelector('#umsatz').innerHTML = doc.data()['Menge'] + '€'
    
    
        db.collection('Tijara').doc('Infos').get().then((doc) => {
            GrammZahl = Number(doc.data()['GrammZahl'])
            Preis = Number(doc.data()['Preis'])
    
            var Profit = GeldMenge - GrammZahl * Preis
            document.querySelector('#profit').innerHTML = Profit + '€'
        })
    
    })
}


UpdateData()


const MenuTypeChange = document.querySelector('#type')
MenuTypeChange.addEventListener('change', e=>{
    if(e.target.checked) {
        document.querySelector('.Verkauf').style.visibility = 'visible'
        document.querySelector('.Verkauf').style.position = 'relative'
        document.querySelector('.Minus').style.visibility = 'hidden'
        document.querySelector('.Minus').style.position = 'absolute'
    } else {
        document.querySelector('.Minus').style.visibility = 'visible'
        document.querySelector('.Minus').style.position = 'relative'
        document.querySelector('.Verkauf').style.visibility = 'hidden'
        document.querySelector('.Verkauf').style.position = 'absolute'
    }
})

const MinusAdd = document.querySelector('#MinusAdd')
MinusAdd.addEventListener('click', ()=>{
    GeldMenge -= document.querySelector('#MinusMenge').value

    db.collection('Tijara').doc("Geld").set({
        Menge: GeldMenge.toString()
    }, { merge: true }).then(() => {
        document.querySelector('#MinusMenge').value = null
        UpdateData()
    })
})



const VerkaufAdd = document.querySelector('#VerkaufAdd')
VerkaufAdd.addEventListener('click', ()=>{
    console.log(typeof GrammZahl)
    GrammZahl += Number(document.querySelector('#VerkaufGramm').value)
    GeldMenge += Number(document.querySelector('#VerkaufGeld').value)

    console.log(typeof GrammZahl)


    db.collection('Tijara').doc("Geld").set({
        Menge: GeldMenge.toString()
    }, { merge: true }).then(() => {
        db.collection('Tijara').doc('Infos').set({
            GrammZahl: GrammZahl.toString(),
        }, {merge: true}).then(() => {
            document.querySelector('#VerkaufGramm').value = null
            document.querySelector('#VerkaufGeld').value = null
            UpdateData()
        })
    })

})
