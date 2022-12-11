var Images = {
    "1": "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-11-black.png?v=11",
    "2": "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,dpr=2,fit=contain,format=auto/swappie-iphone-11-pro-space-gray.png?v=11",
    "3": "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,dpr=2,fit=contain,format=auto/swappie-iphone-11-pro-max-space-gray.png?v=11",
    "4": "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,dpr=2,fit=contain,format=auto/swappie-iphone-se-2020-black.png?v=11",
    "5": "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-12-mini-black.png?v=11",
    "6": "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-12-black.png?v=11",
    "7": "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,dpr=2,fit=contain,format=auto/swappie-iphone-12-pro-pacific-blue.png?v=11",
    "8": "https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-12-pro-max-graphite.png?v=11"
}
var Values = {
    "1": "iPhone 11",
    "2": "iPhone 11 Pro",
    "3": "iPhone 11 Pro Max",
    "4": "iPhone SE 2.Gen 2020",
    "5": "iPhone 12 mini",
    "6": "iPhone 12",
    "7": "iPhone 12 Pro",
    "8": "iPhone 12 Pro Max"
}
function getDeviceDivAdd() {
    if (document.documentElement.clientWidth < 768) {
        document.querySelector('.add-device-mobile').style.display = 'block'
        return 'div.add-device-mobile '
    } else {
        document.querySelector('.add-device-mobile').style.display = 'block'
        return 'div.add-device-mobile '
    }
}
function getCurrentTimestamp () {
    return Date.now()
}

function open_add_dev() {
    var devDiv = getDeviceDivAdd()
    document.querySelector('.body').style.position = 'fixed'

    document.querySelector(devDiv + '.speicher').value = ''
    document.querySelector(devDiv + '.batterie').value = ''
    document.querySelector(devDiv + '.kaufpreis').value = ''
    document.querySelector(devDiv + '.anzeige-id').value = ''
    document.querySelector(devDiv + '.seller-name').value = ''
    document.querySelector(devDiv + '.seller-email').value = ''
    document.querySelector(devDiv + '.sendungsnummer').value = ''
    document.querySelector(devDiv + '.empfänger').value = ''

    document.querySelector(devDiv + '.model').addEventListener('change', ()=>{
        document.querySelector(devDiv + '#cover').src = Images[document.querySelector(devDiv + '.model').value]
    })
}



function save_add_dev() {

    var devDiv = getDeviceDivAdd()
    var Device = {
        datatypeversion: 2,
        device: {
            battery: Number(document.querySelector(devDiv + '.batterie').value),
            imei: '',
            model: Values[document.querySelector(devDiv + '.model').value],
            serialnumber: '',
            storage: Number(document.querySelector(devDiv + '.speicher').value),
        },
        infos: {
            image: Images[document.querySelector(devDiv + '.model').value],
            status: '0',
            timeadded: getCurrentTimestamp(),
        },
        purchase: {
            'ebay-id': document.querySelector(devDiv + '.anzeige-id').value,
            price: Number(document.querySelector(devDiv + '.kaufpreis').value),
        },
        reperations: {},
        seller: {
            email: document.querySelector(devDiv + '.seller-email').value,
            name: document.querySelector(devDiv + '.seller-name').value,
        },
        shipment: {
            empfänger: document.querySelector(devDiv + '.empfänger').value,
            'shipment-id': Number(document.querySelector(devDiv + '.sendungsnummer').value),
        },
    }
    var currentid = null
    db.collection('Devices').doc('Iphones').get().then((doc) => {
        currentid = Number(doc.data()['CurrentID'])
        currentid += 1
        db.collection('Devices').doc('Iphones').set({
            [currentid]: Device,
            CurrentID: currentid
        }, {merge: true})
    })

    document.querySelector('.add-device-mobile').style.display = 'none'
    document.querySelector('.add-device-mobile').style.display = 'none'
    document.querySelector('.body').style.position = 'absolute'
}
function cancle_add_dev() {
    document.querySelector('.add-device-mobile').style.display = 'none'
    document.querySelector('.body').style.position = 'absolute'
}