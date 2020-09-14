function submitEventHandeler(event) {

    event.preventDefault();

    let aa=Number(a.value);
    let bb=Number(b.value);
    let cc=Number(c.value);
    
    let areaText = document.querySelector('#display-result');

    if (aa + bb > cc && aa + cc > bb && bb + cc > aa){
    // https://zh.wikipedia.org/zh-hans/海伦公式
    let s = (aa + bb + cc) / 2;
    let area = Math.sqrt(s * (s - aa) * (s - bb) * (s - cc))
    let perimeter = aa + bb + cc
    areaText.innerHTML = "The Triangle Area is " + area + '</br>Perimeter is ' + perimeter + ".";
    areaText.style.color = 'rgb(27, 118, 172)';
    }else{
        areaText.textContent = "This triangle is not possible. ";
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
