function submitEventHandeler(event) {

    event.preventDefault();

    let radius=Number(a.value);
    
    let bb=Number(b.value);
    let cc=Number(c.value);
    
    let areaText = document.querySelector('#display-result');

    if (typeof(radius)=="number"){
    let volume = (4/3 * Math.PI * radius ** 3).toFixed(5)
    let area = (Math.PI * radius * radius).toFixed(5)
    let perimeter = (2 * Math.PI * radius).toFixed(5)
    volText = "The Circle Area is " + volume + '(' + (4/3 * radius ** 3).toFixed(3) + 'π)' + '</br>'
    areaText.innerHTML = volText + "The Circle Area is " + area + '(' + radius ** 2 + 'π)' + '</br>The Circle Perimeter is ' + perimeter + ".";
    areaText.style.color = 'rgb(27, 118, 172)';
    }else{
        areaText.textContent = "This circle is not possible. ";
    }

}

function resetb(){ 

 event.preventDefault();
 a.value="";
 b.value="";
 c.value="";

}

let form = document.querySelector('#input-box');
let a = document.querySelector('#input-box #a');
let b = document.querySelector('#input-box #b');
let c = document.querySelector('#input-box #c');

form.onsubmit = submitEventHandeler;
