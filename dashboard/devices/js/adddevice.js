function open_add_dev() {
    var devDiv = ''
    if (document.documentElement.clientWidth < 768) {
        document.querySelector('.add-device-mobile').style.display = 'block'
        devDiv = 'div.add-device-mobile '
    } else {
    }
    document.querySelector('.body').style.position = 'fixed'
    document.querySelector(devDiv+'.kaufpreis').value = ''
    document.querySelector(devDiv+'.bild').value = ''
    document.querySelector(devDiv+'.batterie').value = ''
    document.querySelector(devDiv+'.speicher').value = ''
    document.querySelector(devDiv+'.model').value = ''
    document.querySelector(devDiv+'#textarea').value = ''
}
function save_add_dev() {
    var devDiv = ''
    if (document.documentElement.clientWidth < 768) {
        document.querySelector('.add-device-mobile').style.display = 'none'
        devDiv = 'div.add-device-mobile '
    } else {
    }
    console.log(document.querySelector(devDiv+'.model').value)
    document.querySelector('.body').style.position = 'absolute'
    var currentid = null
    db.collection('Devices').doc('Iphones').get().then((doc) => {
        currentid = Number(doc.data()['CurrentID'])
        currentid += 1
        db.collection('Devices').doc('Iphones').set({
            [currentid]: {
                IMEI: '',
                KaufPreis: document.querySelector(devDiv+'.kaufpreis').value,
                Model: document.querySelector(devDiv+'.model').value,
                Seriennummer: '',
                Storage: document.querySelector(devDiv+'.speicher').value,
                batterie: document.querySelector(devDiv+'.batterie').value,
                image: document.querySelector(devDiv+'.bild').value,
                notes: document.querySelector(devDiv+'#textarea').value,
                status: "0",
                reperaturen: {}
            },
            CurrentID: currentid
        }, {merge: true})
    })
}
function cancle_add_dev() {
    document.querySelector('.add-device-mobile').style.display = 'none'
    document.querySelector('.body').style.position = 'absolute'
}