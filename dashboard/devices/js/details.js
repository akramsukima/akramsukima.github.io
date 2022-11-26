function opendetails(id, Devices) {
    var devDiv = ''
    if (document.documentElement.clientWidth < 768) {
        document.querySelector('.details-mobile').style.display = 'block'
        devDiv = 'div.details-mobile '
    } else {
        document.querySelector('.details-pc').style.display = 'block'
        devDiv = 'div.details-pc '
    }
    console.log(Devices[id], id,Devices[id].Image)
    document.querySelector('.body').style.position = 'fixed'
    document.querySelector(devDiv + '#cover').src = Devices[id].Image
    document.querySelector(devDiv + "#name").value = ""
    document.querySelector(devDiv + "#model").innerHTML = Devices[id].Model
    document.querySelector(devDiv + "#cost").value = ""
    document.querySelector(devDiv + '.id').value = id
    document.querySelector(devDiv + '.imei').value = Devices[id].IMEI
    document.querySelector(devDiv + '.kaufpreis').value = Devices[id].Kaufpreis
    document.querySelector(devDiv + '.seriennummer').value = Devices[id].Seriannummer
    document.querySelector(devDiv + '.speicher').value = Devices[id].Storage
    document.querySelector(devDiv + '.batterie').value = Devices[id].Batterie
    document.querySelector(devDiv + '.bild').value = Devices[id].Image
    document.querySelector(devDiv + ".list").innerHTML = ""
    document.querySelector(devDiv + '#textarea').value = Devices[id].Notes
    if (Devices[id].Status == '1') {
        var totalrep = 0
        document.querySelector(devDiv + ".reperatur").style.display = 'block'
        document.querySelector(devDiv + ".addrep").style.display = 'flex'
        for (var key2 of Object.keys(Devices[id].Reperaturen)) {
            document.querySelector(devDiv + ".list").innerHTML += `
            <div class="repitem">
                <h4>${key2}</h4>
                <h5>${Devices[id].Reperaturen[key2]} Euro</h5>
            </div>
            `
            totalrep += Devices[id].Reperaturen[key2]
        }
        console.log(Devices[id].Reperaturen)
        document.querySelector(devDiv + ".list").innerHTML += `
            <h5 id="tot">Total: ${totalrep} Euro</h5>`
        if (totalrep == 0) {
            document.querySelector(devDiv + ".list").innerHTML = `
            <h5>Noch keine Reperaturen gemeldet</h5>
            `
        }
    } else {
        document.querySelector(devDiv + ".reperatur").style.display = 'none'
    }
    if (Devices[id].Status == '2') {
        document.querySelector(devDiv + "#NextStep").innerHTML = "Verkauft"
        var totalrep = 0
        document.querySelector(devDiv + ".reperatur").style.display = 'block'
        document.querySelector(devDiv + ".addrep").style.display = 'none'
        for (var key2 of Object.keys(Devices[id].Reperaturen)) {
            document.querySelector(devDiv + ".list").innerHTML += `
            <div class="repitem">
                <h4>${key2}</h4>
                <h5>${Devices[id].Reperaturen[key2]} Euro</h5>
            </div>
            `
            totalrep += Devices[id].Reperaturen[key2]
        }
        document.querySelector(devDiv + ".list").innerHTML += `
            <h5 id="tot">Total: ${totalrep} Euro</h5>`
        if (totalrep == 0) {
            document.querySelector(devDiv + ".list").innerHTML = `
            <h5>Noch keine Reperaturen gemeldet</h5>
            `
        }
    } else {
        document.querySelector(devDiv + "#NextStep").innerHTML = "Nächster Schritt"
    }
}
function cancelDetails() {
    if (document.documentElement.clientWidth < 768) {
        document.querySelector('.details-mobile').style.display = 'none'
        document.querySelector('.body').style.position = 'absolute'
    } else {
        document.querySelector('.details-pc').style.display = 'none'
        document.querySelector('.body').style.position = 'absolute'
    }
}
function failedDetails() {
    var devDiv = ''
    if (document.documentElement.clientWidth < 768) {
        document.querySelector('.details-mobile').style.display = 'none'
        devDiv = 'div.details-mobile '
    } else {
        document.querySelector('.details-pc').style.display = 'none'
        devDiv = 'div.details-pc '
    }
    document.querySelector('.body').style.position = 'absolute'
    var id = document.querySelector(devDiv + '.id').value
    db.collection('Devices').doc('failed').set({
        [id]: {
            IMEI: document.querySelector(devDiv + '.imei').value,
            KaufPreis: document.querySelector(devDiv + '.kaufpreis').value,
            Model: Devices[id].Model,
            Seriennummer: document.querySelector(devDiv + '.seriennummer').value,
            Storage: document.querySelector(devDiv + '.speicher').value,
            batterie: document.querySelector(devDiv + '.batterie').value,
            image: document.querySelector(devDiv + '.bild').value,
            status: Devices[id].Status,
            notes: Devices[id].Notes,
            reperaturen: Devices[id].Reperaturen

        }
    }, {merge: true})
    db.collection('Devices').doc('Iphones').update({
        [id]: firebase.firestore.FieldValue.delete()
    })
}
function NextStep() {
    var devDiv = ''
    if (document.documentElement.clientWidth < 768) {
        document.querySelector('.details-mobile').style.display = 'none'
        devDiv = 'div.details-mobile '
    } else {
        document.querySelector('.details-pc').style.display = 'none'
        devDiv = 'div.details-pc '
    }
    document.querySelector('.body').style.position = 'absolute'
    var id = document.querySelector(devDiv + '.id').value
    if (Devices[id].Status == "2") {
        db.collection('Devices').doc('sold').set({
            [id]: {
                IMEI: document.querySelector(devDiv + '.imei').value,
                KaufPreis: document.querySelector(devDiv + '.kaufpreis').value,
                Model: Devices[id].Model,
                Seriennummer: document.querySelector(devDiv + '.seriennummer').value,
                Storage: document.querySelector(devDiv + '.speicher').value,
                batterie: document.querySelector(devDiv + '.batterie').value,
                image: document.querySelector(devDiv + '.bild').value,
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
                IMEI: document.querySelector(devDiv + '.imei').value,
                KaufPreis: document.querySelector(devDiv + '.kaufpreis').value,
                Model: Devices[id].Model,
                Seriennummer: document.querySelector(devDiv + '.seriennummer').value,
                Storage: document.querySelector(devDiv + '.speicher').value,
                batterie: document.querySelector(devDiv + '.batterie').value,
                image: document.querySelector(devDiv + '.bild').value,
                status: "2",
                notes: Devices[id].Notes,
                reperaturen: Devices[id].Reperaturen
            }
        }, {merge: true})
    }
    if (Devices[id].Status == "0") { 
        db.collection('Devices').doc('Iphones').set({
            [id]: {
                IMEI: document.querySelector(devDiv + '.imei').value,
                KaufPreis: document.querySelector(devDiv + '.kaufpreis').value,
                Model: Devices[id].Model,
                Seriennummer: document.querySelector(devDiv + '.seriennummer').value,
                Storage: document.querySelector(devDiv + '.speicher').value,
                batterie: document.querySelector(devDiv + '.batterie').value,
                image: document.querySelector(devDiv + '.bild').value,
                status: "1",
                notes: Devices[id].Notes,
                reperaturen: Devices[id].Reperaturen
            }
        }, {merge: true})
    }
}
function closeDetails() {
    var devDiv = ''
    if (document.documentElement.clientWidth < 768) {
        document.querySelector('.details-mobile').style.display = 'none'
        devDiv = 'div.details-mobile '
    } else {
        document.querySelector('.details-pc').style.display = 'none'
        devDiv = 'div.details-pc '
    }
    document.querySelector('.body').style.position = 'absolute'
    var id = document.querySelector(devDiv + '.id').value
    db.collection('Devices').doc('Iphones').set({
        [id]: {
            IMEI: document.querySelector(devDiv + '.imei').value,
            KaufPreis: document.querySelector(devDiv + '.kaufpreis').value,
            Model: Devices[id].Model,
            Seriennummer: document.querySelector(devDiv + '.seriennummer').value,
            Storage: document.querySelector(devDiv + '.speicher').value,
            batterie: document.querySelector(devDiv + '.batterie').value,
            image: document.querySelector(devDiv + '.bild').value,
            status: Devices[id].Status,
            notes: document.querySelector(devDiv + '#notes').value,
            reperaturen: Devices[id].Reperaturen
        }
    }, {merge: true})
}
function addrep() {
    var devDiv = ''
    if (document.documentElement.clientWidth < 768) {
        devDiv = 'div.details-mobile '
    } else {
        devDiv = 'div.details-pc '
    }
    var name = document.querySelector(devDiv + "#name").value
    var cost = document.querySelector(devDiv + "#cost").value
    var id = document.querySelector(devDiv + '.id').value
    if (name+cost != '') {
        Devices[id].Reperaturen[name] = Number(cost)
        var totalrep = 0
        document.querySelector(devDiv + ".list").innerHTML = ''
        for (var key2 of Object.keys(Devices[id].Reperaturen)) {
            document.querySelector(devDiv + ".list").innerHTML += `
            <div class="repitem">
                <h4>${key2}</h4>
                <h5>${Devices[id].Reperaturen[key2]} Euro</h5>
            </div>
            `
            totalrep += Devices[id].Reperaturen[key2]
        }
        document.querySelector(devDiv + ".list").innerHTML += `<h5 id="tot">Total: ${totalrep} Euro</h5>`
    }
    document.querySelector(devDiv + "#cost").value = ""
    document.querySelector(devDiv + "#name").value = ""
}