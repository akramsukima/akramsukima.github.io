function opendetails(id, Devices) {
    if (client.width < 768) {
        document.querySelector('.details-mobile').style.display = 'block'
    } else {
        document.querySelector('.details-pc').style.display = 'block'
        document.querySelector('.body').style.position = 'fixed'
        document.querySelector('#cover').src = Devices[id].Image
        document.querySelector("#name").value = ""
        document.querySelector("#model").innerHTML = Devices[id].Model
        document.querySelector("#cost").value = ""
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
}
function cancelDetails() {
    if (client.width < 768) {} else {
        document.querySelector('.details-pc').style.display = 'none'
        document.querySelector('.body').style.position = 'absolute'
    }
}
function failedDetails() {
    if (client.width < 768) {} else {
        document.querySelector('.details-pc').style.display = 'none'
        document.querySelector('.body').style.position = 'absolute'
    }
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
}
function NextStep() {
    if (client.width < 768) {} else {
        document.querySelector('.details-pc').style.display = 'none'
        document.querySelector('.body').style.position = 'absolute'
    }
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
}
function closeDetails() {
    if (client.width < 768) {} else {
        document.querySelector('.details-pc').style.display = 'none'
        document.querySelector('.body').style.position = 'absolute'
    }
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
}