async function GetHtml(path) {
    return await fetch(path).then(res=>res.text())
}