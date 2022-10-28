db.collection("Money").doc("Amount").get().then((doc) => {
    var available = Number(doc.data()["Ava"]);
    document.querySelector('.availableamount').innerHTML = 'Available: ' + available + ' Euro'
})






const NavAdd = document.querySelector('#navAdd')
NavAdd.addEventListener('click', () => {
    window.location.href="pages/add.html";
})
const NavCurrent = document.querySelector('#navCurOrd')
NavCurrent.addEventListener('click', () => {
    window.location.href="../pages/current.html";
})
