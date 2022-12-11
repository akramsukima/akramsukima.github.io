var Stats = {
    0: "WFS",
    1: "IR",
    2: "RFS",
}

async function GetDevices(doc) {
    var devices = {}
    var CurrentID = 0
    for (var key of Object.keys(doc.data())) {
        if (key == 'CurrentID') {
            CurrentID = doc.data()[key]
        } else {
            if (doc.data()[key]['datatypeversion'] != 2) {
                var Device = {
                    datatypeversion: 2,
                    device: {
                        battery: Number(doc.data()[key]['batterie']),
                        imei: doc.data()[key]['IMEI'],
                        model: doc.data()[key]['Model'],
                        serialnumber: doc.data()[key]['Seriennummer'],
                        storage: Number(doc.data()[key]['Storage'])
                    },
                    infos: {
                        image: doc.data()[key]['image'],
                        status: Number(doc.data()[key]['status']),
                        timeadded: '',
                    },
                    purchase: {
                        'ebay-id': '',
                        price: Number(doc.data()[key]['KaufPreis']),
                    },
                    reperations: doc.data()[key]['reperaturen'],
                    seller: {
                        email: '',
                        name: '',
                    },
                    shipment: {
                        empfänger: '',
                        'shipment-id': '',
                    },
                }
                devices[key] = Device
            }else{
                var Device = {
                }
                devices[key] = doc.data()[key]
            }
        }
    }
    return {Devices: devices, ID: CurrentID}
}

