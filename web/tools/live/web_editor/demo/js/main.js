var htmlInput = document.querySelector(".html-input");
var cssInput = document.querySelector(".css-input");
var jsInput = document.querySelector(".js-input");
var htmlCode = htmlInput.innerText;
var cssCode = cssInput.innerText
var output = document.querySelector(".output");

var styleElem = document.createElement('style');
var headElem = document.querySelector('head');
headElem.appendChild(styleElem);

var jsElem = document.createElement('script');
var bodyElem = document.querySelector('body');
bodyElem.appendChild(jsElem);

function stringToEntity() {
  var pr = $('pre');
  var co = $("pre>code");
  for (i = 0; i < pr.length; i++) {
    // console.log(pr[i].innerText);
    // console.log(pr[i].innerHTML);
    var code = document.createElement('code');
    if (i===0){
    code.className = "html";}
    else if (i===1){
      code.className = "css";
    }else{
      code.className = "javascript";
    }
    code.innerText = co[i].innerHTML.replace(/^\s+|[^\S\r\n]{19,}|\s+$/gm, '');
    // console.log(co[i].innerHTML);
    pr[i].replaceChild(code, co[i]);
  }
}
stringToEntity();

function drawOutput() {
// added
maxwidth = Math.max.apply(Math, $('.code').map(function(){ return $(this).width(); }).get());
maxheight = Math.max.apply(Math, $('.code').map(function(){ return $(this).height(); }).get());
$(".code").each(function(){
  $(this).width(maxwidth);
  $(this).height(maxwidth);
});

var htmlInput = document.querySelector(".html-input");
var cssInput = document.querySelector(".css-input");
var jsInput = document.querySelector(".js-input");
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
jsElem.textContent = jsInput.innerText;
}

hljs.initHighlightingOnLoad();

$(document).ready(function() {
  $('pre code').each(function(i, block) {
     hljs.highlightBlock(block)
  });
});


htmlInput.addEventListener("click", drawOutput);
cssInput.addEventListener("click", drawOutput);
jsInput.addEventListener("click", drawOutput);
window.addEventListener("load", drawOutput);

function checkRefresh() {
  if (document.refreshForm.visited.value == "") {
      // This is a fresh page load
      document.refreshForm.visited.value = "1";
      // You may want to add code here special for
      // fresh page loads
      generate();
  } else {
      // This is a page refresh
      // Insert code here representing what to do on
      // a refresh
  }
}

/* save */
var saveKeywords = function (i, k) { localStorage.setItem("kw" + i, k); }


function generate() {
  var kw1 = document.querySelector("#html code").innerText.replace(/^\s*/, '').replace(/\s*$/, '').split("\n");
  var kw2 = document.querySelector("#css code").innerText.replace(/^\s*/, '').replace(/\s*$/, '').split("\n");
  var kw3 = document.querySelector("#js code").innerText.replace(/^\s*/, '').replace(/\s*$/, '').split("\n");
  if (!localStorage.getItem("kw1") && kw1 !== null) {
      saveKeywords(1, kw1)

  } else if ((kw1.join("\n") !== localStorage.getItem("kw1").split(",").join("\n"))&&(kw1.join("\n") !== "")) {
      saveKeywords(1, kw1)
  }
  else {
      var kw1 = localStorage.getItem("kw1").split(",");
      document.querySelector("#html code").innerText = kw1.join("\n")

  }

  if (!localStorage.getItem("kw2") && kw2 !== null) {

      saveKeywords(2, kw2)

  } else if ((kw2.join("\n") !== localStorage.getItem("kw2").split(",").join("\n"))&& (kw2.join("\n") !== "")) {
      saveKeywords(2, kw2)
  }
  else {
      var kw2 = localStorage.getItem("kw2").split(",");
      document.querySelector("#css code").innerText  = kw2.join("\n")

  }
  if (!localStorage.getItem("kw3") && kw3 !== null) {

  saveKeywords(3, kw3)

  } else if ((kw3.join("\n") !== localStorage.getItem("kw3").split(";,").join("\n"))&& (kw3.join("\n") !== "")) {
  saveKeywords(3, kw3)
  }
  else {
  var kw3 = localStorage.getItem("kw3").split(";,");
  document.querySelector("#js code").innerText = kw3.join("\n")

  }
}


htmlInput.addEventListener("click", generate);
cssInput.addEventListener("click", generate);
jsInput.addEventListener("click", generate);
window.addEventListener("load", generate);

