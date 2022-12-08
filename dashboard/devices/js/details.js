var currid = null;
var reperationadded = false

function getDeviceDiv() {
    if (document.documentElement.clientWidth < 768) {
        document.querySelector('.details-mobile').style.display = 'block'
        return 'div.details-mobile '
    } else {
        document.querySelector('.details-pc').style.display = 'block'
        return 'div.details-pc '
    }
}
function haschanged(devDiv) {
    var value = 0
    console.log(document.querySelector(devDiv + '.batterie'), devDiv + '.batterie')
    value += Number(Number(document.querySelector(devDiv + '.batterie').value) == Devices[currid]['device']['battery'])
    value += Number(document.querySelector(devDiv + '.imei').value == Devices[currid]['device']['imei'])
    value += Number(document.querySelector(devDiv + '.seriennummer').value == Devices[currid]['device']['serialnumber'])
    value += Number(Number(document.querySelector(devDiv + '.speicher').value) == Devices[currid]['device']['storage'])
    value += Number(document.querySelector(devDiv + '.anzeige-id').value == Devices[currid]['purchase']['ebay-id'])
    value += Number(Number(document.querySelector(devDiv + '.kaufpreis').value) == Devices[currid]['purchase']['price'])

    value += Number(document.querySelector(devDiv + '.seller-email').value == Devices[currid]['seller']['email'])
    value += Number(document.querySelector(devDiv + '.seller-name').value == Devices[currid]['seller']['name'])

    value += Number(document.querySelector(devDiv + '.empfänger').value == Devices[currid]['shipment']['empfänger'])
    value += Number(Number(document.querySelector(devDiv + '.sendungsnummer').value) == Devices[currid]['shipment']['shipment-id'])
    
    if (reperationadded) {
        return true
    } else {
        if (value!=10) {
            return true
        }
    }
    return false
}

function opendetails(id, Devices) {
    currid = id
    reperationadded = false
    var devDiv = getDeviceDiv()


    document.querySelector('.body').style.position = 'fixed'
    document.querySelector(devDiv + '#cover').src = Devices[id]['infos']['image']
    document.querySelector(devDiv + "#model").innerHTML = Devices[id]['device']['model']
    document.querySelector(devDiv + "#id").innerHTML = `ID: ${id}`

    document.querySelector(devDiv + '.speicher').value = Devices[id]['device']['storage']
    document.querySelector(devDiv + '.batterie').value = Devices[id]['device']['battery']
    document.querySelector(devDiv + '.imei').value = Devices[id]['device']['imei']
    document.querySelector(devDiv + '.seriennummer').value = Devices[id]['device']['serialnumber']

    document.querySelector(devDiv + '.kaufpreis').value = Devices[id]['purchase']['price']
    document.querySelector(devDiv + '.anzeige-id').value = Devices[id]['purchase']['ebay-id']

    document.querySelector(devDiv + '.seller-name').value = Devices[id]['seller']['name']
    document.querySelector(devDiv + '.seller-email').value = Devices[id]['seller']['email']

    document.querySelector(devDiv + '.sendungsnummer').value = Devices[id]['shipment']['shipment-id']
    document.querySelector(devDiv + '.empfänger').value = Devices[id]['shipment']['empfänger']

    document.querySelector(devDiv + "#name").value = ""
    document.querySelector(devDiv + "#cost").value = ""
    document.querySelector(devDiv + ".list").innerHTML = ""

    
    if (Devices[id]['infos']['status'] == 1 || Devices[id]['infos']['status'] == 2) {
        var totalrep = 0
        document.querySelector(devDiv + ".reperatur").style.display = 'block'
        document.querySelector(devDiv + ".addrep").style.display = 'flex'
        for (var key2 of Object.keys(Devices[id]['reperations'])) {
            document.querySelector(devDiv + ".list").innerHTML += `
            <div class="repitem">
                <div id="repname">
                    <h4>${key2}</h4>
                </div>
                <h5>${Devices[id]['reperations'][key2]} Euro</h5>
            </div>
            `
            totalrep += Devices[id]['reperations'][key2]
        }
        document.querySelector(devDiv + ".list").innerHTML += `<h5 id="tot">Total: ${totalrep} Euro</h5>`
        if (totalrep == 0) {
            document.querySelector(devDiv + ".list").innerHTML = '<h5>Noch keine Reperaturen gemeldet</h5>'
        }
    } else {
        document.querySelector(devDiv + ".reperatur").style.display = 'none'
    }
    if (Devices[id]['infos']['status'] == 2) {
        document.querySelector(devDiv + "#NextStep").innerHTML = "Verkauft"
        document.querySelector(devDiv + ".reperatur").style.display = 'block'
        document.querySelector(devDiv + ".addrep").style.display = 'none'
    } else {
        document.querySelector(devDiv + "#NextStep").innerHTML = "Nächster Schritt"
    }
}
function cancelDetails() {
    var devDiv = getDeviceDiv()
    if (haschanged(devDiv)) {
        var proceed = confirm("Sicher das sie die Änderungen verwerfen wollen?");
        if (proceed) {
            document.querySelector(devDiv).style.display = 'none'
            document.querySelector('.body').style.position = 'absolute'
        } else {
            //reset reperationadded
        }
    } else {
        document.querySelector(devDiv).style.display = 'none'
        document.querySelector('.body').style.position = 'absolute'
    }
}
function failedDetails() {
    var devDiv = getDeviceDiv()
    document.querySelector(devDiv).style.display = 'none'
    document.querySelector('.body').style.position = 'absolute'

    db.collection('Devices').doc('failed').set({
        [currid]: Devices[currid]
    }, {merge: true})
    db.collection('Devices').doc('Iphones').update({
        [currid]: firebase.firestore.FieldValue.delete()
    })
}
function lastStep() {
    var devDiv = getDeviceDiv()
    document.querySelector(devDiv).style.display = 'none'
    document.querySelector('.body').style.position = 'absolute'

    if (Devices[currid]['infos']['status'] > 0) {
        Devices[currid]['infos']['status'] -= 1
        db.collection('Devices').doc('Iphones').set({
            [currid]: Devices[currid]
        }, {merge: true})
    }
}
function NextStep() {
    var devDiv = getDeviceDiv()
    document.querySelector(devDiv).style.display = 'none'
    document.querySelector('.body').style.position = 'absolute'

    if (Devices[currid]['infos']['status'] == 2) {
        db.collection('Devices').doc('sold').set({
            [currid]: Devices[currid]
        }, {merge: true})
        db.collection('Devices').doc('Iphones').update({
            [currid]: firebase.firestore.FieldValue.delete()
        })
    } else {
        Devices[currid]['infos']['status'] += 1
        db.collection('Devices').doc('Iphones').set({
            [currid]: Devices[currid]
        }, {merge: true})
    }
}
function closeDetails() {
    var devDiv = getDeviceDiv()
    document.querySelector(devDiv).style.display = 'none'
    document.querySelector('.body').style.position = 'absolute'


    var Device = {
        datatypeversion: 2,
        device: {
            battery: Number(document.querySelector(devDiv + '.batterie').value),
            imei: document.querySelector(devDiv + '.imei').value,
            model: Devices[currid]['device']['model'],
            serialnumber: document.querySelector(devDiv + '.seriennummer').value,
            storage: Number(document.querySelector(devDiv + '.speicher').value),
        },
        infos: {
            image: Devices[currid]['infos']['image'],
            status: Devices[currid]['infos']['status'],
            timeadded: Devices[currid]['infos']['timeadded'],
        },
        purchase: {
            'ebay-id': document.querySelector(devDiv + '.anzeige-id').value,
            price: Number(document.querySelector(devDiv + '.kaufpreis').value),
        },
        reperations: Devices[currid]['reperations'],
        seller: {
            email: document.querySelector(devDiv + '.seller-email').value,
            name: document.querySelector(devDiv + '.seller-name').value,
        },
        shipment: {
            empfänger: document.querySelector(devDiv + '.empfänger').value,
            'shipment-id': Number(document.querySelector(devDiv + '.sendungsnummer').value),
        },
    }

    db.collection('Devices').doc('Iphones').update({
        [currid]: firebase.firestore.FieldValue.delete()
    })
    db.collection('Devices').doc('Iphones').set({
        [currid]: Device
    }, {merge: true}).catch((error) => {
        console.error(error);
    });
}
function addrep() {
    var devDiv = getDeviceDiv()
    var name = document.querySelector(devDiv + "#name").value
    var cost = document.querySelector(devDiv + "#cost").value
    document.querySelector(devDiv + ".list").innerHTML = ""
    if (name+cost != '') {
        Devices[currid]['reperations'][name] = Number(cost)
        var totalrep = 0
        for (var key2 of Object.keys(Devices[currid]['reperations'])) {
            document.querySelector(devDiv + ".list").innerHTML += `
            <div class="repitem">
                <div id="repname">
                    <h4>${key2}</h4>
                </div>
                <h5>${Devices[currid]['reperations'][key2]} Euro</h5>
            </div>
            `
            totalrep += Devices[currid]['reperations'][key2]
        }
        reperationadded = true
        document.querySelector(devDiv + ".list").innerHTML += `<h5 id="tot">Total: ${totalrep} Euro</h5>`
    }
    document.querySelector(devDiv + "#cost").value = ""
    document.querySelector(devDiv + "#name").value = ""
}