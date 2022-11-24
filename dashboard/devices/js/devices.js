var Stats = {
    "0": "WFS",
    "1": "IR",
    "2": "RFS",
}

async function GetDevices(doc) {
    var devices = {}
    var CurrentID = 0
    for (var key of Object.keys(doc.data())) {
        if (key == 'CurrentID') {
            CurrentID = doc.data()[key]
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
            devices[key] = Device
        }
    }
    return {Devices: devices, ID: CurrentID}
}

