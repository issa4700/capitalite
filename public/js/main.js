let a = document.querySelectorAll(".currency");
for (let i = 0, len = a.length; i < len; i++) {
    let num = new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR' }).format(Number(a[i].innerHTML))
    a[i].innerHTML = num;
} 

let b = document.querySelectorAll(".percentage");
b.forEach(b => {
    val = Number(b.innerHTML.trim().slice(0,-1))
    if (val > 0) {
        b.classList.add('text-teal-400')
    } else if (val < 0) {
        b.classList.add('text-red-400')
    }
    console.log(val)
})