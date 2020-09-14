var htmlInput = document.querySelector(".html-input");
var cssInput = document.querySelector(".css-input");

var htmlCode = htmlInput.innerText;
var cssCode = cssInput.innerText
var output = document.querySelector(".output");

var styleElem = document.createElement('style');
var headElem = document.querySelector('head');
headElem.appendChild(styleElem);

function stringToEntity() {
  var pr = $('pre');
  var co = $("pre>code");
  for (i = 0; i < pr.length; i++) {
    // console.log(pr[i].innerText);
    // console.log(pr[i].innerHTML);
    var code = document.createElement('code');
    if (i===1){
    code.className = "css";}
    else{
      code.className = "html";
    }
    code.innerText = co[i].innerHTML.replace(/^\s+|[^\S\r\n]{50,}|\s+$/gm, '');
    // console.log(co[i].innerHTML);
    pr[i].replaceChild(code, co[i]);
  }
}
stringToEntity();

function drawOutput() {
var htmlInput = document.querySelector(".html-input");
var cssInput = document.querySelector(".css-input");
cssInput = cssInput.innerText.replace(/^\s*\n/gm,"")
var array = cssInput.split(/\}/);
array.pop()
array = array.filter(item => item !== "\n")
var newCss = [];
array.forEach( function(element){
  if (element.search(/@|from|to|%\s+\{/)===-1){

   newCss.push( ".output " + element +"}");
}else{
   newCss.push( element +"}");
}

});
newCss.join('\n')
output.innerHTML = htmlInput.innerText;
styleElem.textContent = newCss.join('\n');
}

hljs.initHighlightingOnLoad();
$('pre code').each(function (i, block) {
  hljs.highlightBlock(block)
});


htmlInput.addEventListener("click", drawOutput);
cssInput.addEventListener("click", drawOutput);
window.addEventListener("load", drawOutput);


