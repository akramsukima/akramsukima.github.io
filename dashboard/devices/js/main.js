loadingStart();

const client = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
}
var Devices = {}
var CurrentID = []

function details(id) {
    opendetails(id, Devices)
}

auth.onAuthStateChanged((user) => {
    GetHtml('html/page.html').then(x => {
        document.querySelector('.body').innerHTML += x
    })
    GetHtml('html/AddDevice.html').then(x => {
        document.querySelector('.add-device-mobile').innerHTML = x
    })
    GetHtml('html/details.html').then(x => {
        document.querySelector('.details-pc').innerHTML = x
        document.querySelector('.details-mobile').innerHTML = x
    })
    GetHtml('html/navbar.html').then(x => {
        document.querySelector('.nav').innerHTML = x
        addNavListener()
    })
    if (user) {
        if (user.uid == 'LPIR3dFJxXhRlnesiSwqp7uOTok1') {
        } else {
            window.location.href = '/'
        }
    } else {
        window.location.href = '/'
    }
});
db.collection('Devices').doc('Iphones').onSnapshot({
    includeMetadataChanges: true
}, (doc) => {
    document.querySelector('.RFS').innerHTML = ""
    document.querySelector('.IR').innerHTML = ""
    document.querySelector('.WFS').innerHTML = ""
    GetDevices(doc).then((res) => {
        for (var key of Object.keys(res.Devices)) {
            var PhoneValue = res.Devices[key]['purchase']['price']
            for (var k of Object.keys(res.Devices[key]['reperations'])) {
                PhoneValue += res.Devices[key]['reperations'][k]
            }
            let html = `
            <div id="device" onclick=details('${key}')>
                <img src="${res.Devices[key]['infos']['image']}">
                <h3>${res.Devices[key]['device']['model']}</h3>
                <h6>
                ID: ${key} 
                ${res.Devices[key]['device']['storage']}gb 
                ${res.Devices[key]['device']['battery']}% 
                ${PhoneValue}€
                </h6>
            </div>
            `
            document.querySelector('.' + Stats[res.Devices[key]['infos']['status']]).innerHTML += html
        }
        if (!document.querySelector('.RFS').innerHTML == "") {
            document.querySelector('#nodevrfs').style.display = 'none'
        } else {
            document.querySelector('#nodevrfs').style.display = 'block'
        }
        if (!document.querySelector('.IR').innerHTML == "") {
            document.querySelector('#nodevir').style.display = 'none'
        } else {
            document.querySelector('#nodevir').style.display = 'block'
        }
        if (!document.querySelector('.WFS').innerHTML == "") {
            document.querySelector('#nodevwfs').style.display = 'none'
        } else {
            document.querySelector('#nodevwfs').style.display = 'block'
        }
        Devices = res.Devices
        loadingEnd()
    })
});