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
    GetHtml('html/details-pc.html').then(x => {
        document.querySelector('.details-pc').innerHTML = x
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
            let html = `
            <div id="device" onclick=details('${key}')>
                <img src="${res.Devices[key].Image}">
                <h3>${res.Devices[key].Model}</h3>
                <h6>${res.Devices[key].Storage}gb ${res.Devices[key].Batterie}%</h6>
            </div>
            `
            document.querySelector('.' + Stats[res.Devices[key].Status]).innerHTML += html
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