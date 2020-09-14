document.getElementById("dataToTable").addEventListener("click", function() {
	//Make letiables
	let lineSep1 = document.getElementById("lineSep1").checked;
	let lineSep2 = document.getElementById("lineSep2").checked;
	let lineSep3 = document.getElementById("lineSep3").checked;
	let lineSep4 = document.getElementById("lineSep4").checked;
	let lineSep5 = document.getElementById("lineSepCustom").checked;
  
	let oldText = document.getElementById("oldText").value;
	let oldTextAfter = oldText.split("\n");
  
	let newText = "";
	let linesep;
  
	for (i = 0; i < oldTextAfter.length; i++) {
	  oldTextAfter[i] = oldTextAfter[i].replace(/\r/, "");
	  oldTextAfter[i] = oldTextAfter[i].replace(/^\'/, "");
	  oldTextAfter[i] = oldTextAfter[i].replace(/^\"/, "");
	  oldTextAfter[i] = oldTextAfter[i].replace(/"$/, "");
	  oldTextAfter[i] = oldTextAfter[i].replace(/'$/, "");
	  oldTextAfter[i] = "<tr><td>" + oldTextAfter[i] + "</td></tr>";
	}
  
	//Separators
	if (lineSep1 == true) {
	  linesep = ",";
	} else if (lineSep2 == true) {
	  linesep = "	";
	} else if (lineSep3 == true) {
	  linesep = "\\|";
	} else if (lineSep4 == true) {
	  linesep = " ";
	} else if (lineSep5 == true) {
	  linesep = document.getElementById("CustomSeprator").value;
	} else {
	  linesep = "	";
	}
  
	let decor = document.getElementById("NewSeprator").value;
	console.log(linesep);
	console.log(decor);
	//make table
	for (i = 0; i < oldTextAfter.length; i++) {
	  if (decor != "") {
		  rep = "</td><td>" + decor + "</td><td>"
		  oldTextAfter[i] = oldTextAfter[i].replace(
			  new RegExp(linesep, "gi"),
			  rep
			);
	  }else{
	  oldTextAfter[i] = oldTextAfter[i].replace(
		new RegExp(linesep, "gi"),
		"</td><td>"
	  );
	  }
	  newText = newText + oldTextAfter[i]+"\n";
	  
	}
  
	newText = "<table>\n" + newText + "</table>\n";
  
	let newHTML = document.getElementById("newHTML");
	newHTML.value = newText;
	newHTML.style.display = "block";
	document.getElementById("copyHTML").style.display = "block";
  
	let newTable = document.getElementById("newTable");
	newTable.style.border = "1px gray dotted";
	newTable.innerHTML = newText;
	document.getElementById("copyTable").style.display = "block";
  });
  
  //reset text areas
  document.getElementById("clearText").addEventListener("click", function() {
	document.getElementById("oldText").value = "";
  
	document.getElementById("newTable").innerHTML = "";
	document.getElementById("copyTable").style.display = "none";
  
	document.getElementById("newHTML").style.display = "none";
	document.getElementById("copyHTML").style.display = "none";
  
	document.getElementById("newTable").style.border = "none";
	document.getElementById("oldText").focus();
  });
  
  let textBox = document.getElementById("newHTML");
  textBox.onfocus = function() {
	textBox.select();
	textBox.onmouseup = function() {
	  textBox.onmouseup = null;
	  return false;
	};
  };
  