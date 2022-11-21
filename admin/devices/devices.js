var currentid = 0
var Devices = {}
addNavListener()

var Stats = {
    "0": "WFS",
    "1": "IR",
    "2": "RFS",
}


function details(id) {
    document.querySelector("#name").value = ""
    document.querySelector("#model").innerHTML = Devices[id].Model
    document.querySelector("#cost").value = ""
    document.querySelector('.details').style.display = 'block'
    document.querySelector('.id').value = id
    document.querySelector('.imei').value = Devices[id].IMEI
    document.querySelector('.kaufpreis').value = Devices[id].Kaufpreis
    document.querySelector('.seriennummer').value = Devices[id].Seriannummer
    document.querySelector('.speicher').value = Devices[id].Storage
    document.querySelector('.batterie').value = Devices[id].Batterie
    document.querySelector('.bild').value = Devices[id].Image
    document.querySelector(".list").innerHTML = ""
    document.querySelector('#notes').value = Devices[id].Notes
    if (Devices[id].Status == '1') {
        var totalrep = 0
        document.querySelector(".reperatur").style.display = 'block'
        for (var key2 of Object.keys(Devices[id].Reperaturen)) {
            document.querySelector(".list").innerHTML += `
            <div class="repitem">
                <h4>${key2}</h4>
                <h5>${Devices[id].Reperaturen[key2]} Euro</h5>
            </div>
            `
            totalrep += Devices[id].Reperaturen[key2]
        }
        document.querySelector(".list").innerHTML += `
            <h5 id="tot">Total: ${totalrep} Euro</h5>`
        if (totalrep == 0) {
            document.querySelector(".list").innerHTML = `
            <h5>Noch keine Reperaturen gemeldet</h5>
            `
        }
    } else {
        document.querySelector(".reperatur").style.display = 'none'
    }
    if (Devices[id].Status == '2') {
        document.querySelector("#NextStep").innerHTML = "Sold"
    } else {
        document.querySelector("#NextStep").innerHTML = "Next Step"
    }
}
function addrep() {
    var name = document.querySelector("#name").value
    var cost = document.querySelector("#cost").value
    var id = document.querySelector('.id').value
    if (!name+cost == '') {
        Devices[id].Reperaturen[name] = Number(cost)
        var totalrep = 0
        document.querySelector(".list").innerHTML = ''
        for (var key2 of Object.keys(Devices[id].Reperaturen)) {
            document.querySelector(".list").innerHTML += `
            <div class="repitem">
                <h4>${key2}</h4>
                <h5>${Devices[id].Reperaturen[key2]} Euro</h5>
            </div>
            `
            totalrep += Devices[id].Reperaturen[key2]
        }
        document.querySelector(".list").innerHTML += `
            <h5 id="tot">Total: ${totalrep} Euro</h5>`
    }
    document.querySelector("#cost").value = ""
    document.querySelector("#name").value = ""
}
document.querySelector('#search').addEventListener('change', ()=>{
    document.querySelector('.RFS').innerHTML = ""
    document.querySelector('.IR').innerHTML = ""
    document.querySelector('.WFS').innerHTML = ""
    for (var key of Object.keys(Devices)) {
        var match = false
        if (Devices[key].Model.toLowerCase().includes(document.querySelector('#search').value.toLowerCase())) {
            match = true
        }
        if (Devices[key].IMEI.toLowerCase().includes(document.querySelector('#search').value.toLowerCase())) {
            match = true
        }
        if (Devices[key].Seriannummer.toLowerCase().includes(document.querySelector('#search').value.toLowerCase())) {
            match = true
        }
        if (match) {
            let html = `
            <div id="device" onclick=details('${key}')>
                <img 
                src="${Devices[key].Image}"
                alt="https://assets.swappie.com/cdn-cgi/image/width=600,height=600,dpr=2,fit=contain,format=auto/swappie-iphone-xr-black.png?v=11">
                <h3>${Devices[key].Model}</h3>
                <h6>${Devices[key].Storage}gb  ${Devices[key].Batterie}%</h6>
            </div>
            `
            document.querySelector(`.${Stats[Devices[key].Status]}`).innerHTML += html
        }
    } 
})
document.querySelector('#closeDetails').addEventListener('click', ()=>{
    document.querySelector('.details').style.display = 'none'
    var id = document.querySelector('.id').value
    db.collection('Devices').doc('Iphones').set({
        [id]: {
            IMEI: document.querySelector('.imei').value,
            KaufPreis: document.querySelector('.kaufpreis').value,
            Model: Devices[id].Model,
            Seriennummer: document.querySelector('.seriennummer').value,
            Storage: document.querySelector('.speicher').value,
            batterie: document.querySelector('.batterie').value,
            image: document.querySelector('.bild').value,
            status: Devices[id].Status,
            notes: document.querySelector('#notes').value,
            reperaturen: Devices[id].Reperaturen
        }
    }, {merge: true})
})
document.querySelector('#cancelDetails').addEventListener('click', ()=> {
    document.querySelector('.details').style.display = 'none'
})
document.querySelector('#failedDetails').addEventListener('click', ()=> {
    document.querySelector('.details').style.display = 'none'
    var id = document.querySelector('.id').value
    db.collection('Devices').doc('failed').set({
        [id]: {
            IMEI: document.querySelector('.imei').value,
            KaufPreis: document.querySelector('.kaufpreis').value,
            Model: Devices[id].Model,
            Seriennummer: document.querySelector('.seriennummer').value,
            Storage: document.querySelector('.speicher').value,
            batterie: document.querySelector('.batterie').value,
            image: document.querySelector('.bild').value,
            status: Devices[id].Status,
            notes: Devices[id].Notes,
            reperaturen: Devices[id].Reperaturen

        }
    }, {merge: true})
    db.collection('Devices').doc('Iphones').update({
        [id]: firebase.firestore.FieldValue.delete()
    })
})
document.querySelector("#NextStep").addEventListener('click', ()=> {
    document.querySelector('.details').style.display = 'none'
    var id = document.querySelector('.id').value
    if (Devices[id].Status == "2") {
        db.collection('Devices').doc('sold').set({
            [id]: {
                IMEI: document.querySelector('.imei').value,
                KaufPreis: document.querySelector('.kaufpreis').value,
                Model: Devices[id].Model,
                Seriennummer: document.querySelector('.seriennummer').value,
                Storage: document.querySelector('.speicher').value,
                batterie: document.querySelector('.batterie').value,
                image: document.querySelector('.bild').value,
                status: Devices[id].Status,
                notes: Devices[id].Notes,
                reperaturen: Devices[id].Reperaturen
            }
        }, {merge: true})
        db.collection('Devices').doc('Iphones').update({
            [id]: firebase.firestore.FieldValue.delete()
        })
    } 
    if (Devices[id].Status == "1") {
        db.collection('Devices').doc('Iphones').set({
            [id]: {
                IMEI: document.querySelector('.imei').value,
                KaufPreis: document.querySelector('.kaufpreis').value,
                Model: Devices[id].Model,
                Seriennummer: document.querySelector('.seriennummer').value,
                Storage: document.querySelector('.speicher').value,
                batterie: document.querySelector('.batterie').value,
                image: document.querySelector('.bild').value,
                status: "2",
                notes: Devices[id].Notes,
                reperaturen: Devices[id].Reperaturen
            }
        }, {merge: true})
    }
    if (Devices[id].Status == "0") { 
        db.collection('Devices').doc('Iphones').set({
            [id]: {
                IMEI: document.querySelector('.imei').value,
                KaufPreis: document.querySelector('.kaufpreis').value,
                Model: Devices[id].Model,
                Seriennummer: document.querySelector('.seriennummer').value,
                Storage: document.querySelector('.speicher').value,
                batterie: document.querySelector('.batterie').value,
                image: document.querySelector('.bild').value,
                status: "1",
                notes: Devices[id].Notes,
                reperaturen: Devices[id].Reperaturen
            }
        }, {merge: true})
    }
})





document.querySelector('#closeAdd').addEventListener('click', ()=> {
    document.querySelector('.add').style.display = 'none'
    db.collection('Devices').doc('Iphones').get().then((doc) => {
        currentid = doc.data()['CurrentID']
    })
    var id = document.querySelector('.id').value
    currentid += 1
    db.collection('Devices').doc('Iphones').set({
        [currentid]: {
            IMEI: document.querySelector('.add-imei').value,
            KaufPreis: document.querySelector('.add-kaufpreis').value,
            Model: document.querySelector('.add-model').value,
            Seriennummer: document.querySelector('.add-seriennummer').value,
            Storage: document.querySelector('.add-speicher').value,
            batterie: document.querySelector('.add-batterie').value,
            image: document.querySelector('.add-bild').value,
            notes: '',
            status: "0",
            reperaturen: {}
        },
        CurrentID: currentid
    }, {merge: true})
})
document.querySelector('#cancelAdd').addEventListener('click', ()=> {
    document.querySelector('.add').style.display = 'none'
})
function openAdd() {
    document.querySelector('.add').style.display = 'block'
    document.querySelector('.add-model').value = ''
    document.querySelector('.add-imei').value = ''
    document.querySelector('.add-kaufpreis').value = ''
    document.querySelector('.add-seriennummer').value = ''
    document.querySelector('.add-speicher').value = ''
    document.querySelector('.add-batterie').value = ''
    document.querySelector('.add-bild').value = ''
}




db.collection('Devices').doc('Iphones').onSnapshot({
    includeMetadataChanges: true
}, (doc) => {
    Devices = []
    document.querySelector('.RFS').innerHTML = ""
    document.querySelector('.IR').innerHTML = ""
    document.querySelector('.WFS').innerHTML = ""
    for (var key of Object.keys(doc.data())) {
        if (key == 'CurrentID') {
            currentid = doc.data()[key]
        } else {
            var Device = {
                IMEI: doc.data()[key]['IMEI'],
                Kaufpreis: doc.data()[key]['KaufPreis'],
                Model: doc.data()[key]['Model'],
                Seriannummer: doc.data()[key]['Seriennummer'],
                Storage: doc.data()[key]['Storage'],
                Batterie: doc.data()[key]['batterie'],
                Image: doc.data()[key]['image'],
                Status: doc.data()[key]['status'],
                Reperaturen: doc.data()[key]['reperaturen'],
                Notes: doc.data()[key]['notes']
            }
            Devices[key] = Device
            var PhoneValue = Number(Device.Kaufpreis)
            for (var k of Object.keys(Device.Reperaturen)) {
                PhoneValue += Device.Reperaturen[k]
            }
            let html = `
            <div id="device" onclick=details('${key}')>
                <img src="${Device.Image}">
                <h3>${Device.Model}</h3>
                <h6>${Device.Storage}gb  ${PhoneValue}€ ${Device.Batterie}%</h6>
            </div>
            `
            document.querySelector('.' + Stats[doc.data()[key]['status']]).innerHTML += html            
        }
    }
});